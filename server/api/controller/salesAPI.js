const salesSchema = require('../models/sales');
const productSchema = require("../models/product");
const marketingSchema = require("../models/userInteraction");

exports.update = async (req, res) => {
    try {
        // Query all sales documents
        const salesData = await marketingSchema.find();

        // Update each sales document
        for (const sale of salesData) {
            // Extract the original date from the sales document
            const originalDate = new Date(sale.Timestamp);
            // return res.json({ messages: originalDate });
            // Generate random time between 00:00:00 and 23:59:59
            const randomHour = Math.floor(Math.random() * 24);
            const randomMinute = Math.floor(Math.random() * 60);
            const randomSecond = Math.floor(Math.random() * 60);

            // Create new Date object with original date and random time
            const newDate = new Date(
                originalDate.getFullYear(),  // Year
                originalDate.getMonth(),     // Month
                originalDate.getDate(),      // Day
                randomHour,                  // Hour
                randomMinute,                // Minute
                randomSecond                 // Second
            );

            // Format new date in ISO string format (YYYY-MM-DDTHH:MM:SS.000Z)
            const formattedDate = newDate.toISOString();
            sale.Timestamp = formattedDate;

            // Save updated document
            await sale.save();
        }

        res.json({ message: 'Sales data updated successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}




exports.getSales = async (req, res) => {
    try {
        const { months } = req.body;
        if (!months) {
            return res.status(400).json({ error: 'Months parameter is required' });
        }

        const currentDate = new Date('May 2024'); // Current month as May 2024
        const startDate = new Date(currentDate);
        startDate.setMonth(startDate.getMonth() - months); // Calculate start date for N months ago

        // Query sales data for the specified date range
        const salesData = await salesSchema.find({
            Date: { $gte: startDate, $lte: currentDate }
        });

        // Get unique product IDs from sales data
        const productIds = Array.from(new Set(salesData.map(sale => sale.Product_ID)));

        // Retrieve product information for the product IDs
        const products = await productSchema.find({ product_id: { $in: productIds } });

        // Calculate total sales for each product
        const totalSales = products.map(product => {
            const salesForProduct = salesData.filter(sale => sale.Product_ID === product.product_id);
            const totalSaleCount = salesForProduct.reduce((acc, curr) => acc + curr.Sale_Count, 0);
            const sellingPrice = parseFloat(product.Selling_Price); // Assuming Selling_Price is in string format
            const totalSalesAmount = totalSaleCount * sellingPrice;
            return {
                product_id: product.product_id,
                product_name: product.product_name,
                total_sales: totalSalesAmount
            };
        });
        // return res.json({ message: products });

        // Calculate total sales for all products
        const totalSalesAmount = totalSales.reduce((acc, curr) => acc + curr.total_sales, 0);

        return res.json({ total_sales: totalSalesAmount, sales_details: totalSales });
        // return res.json({ message: salesData });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


exports.get24hOrders = async (req, res) => {
    try {
        // Calculate the date and time 24 hours ago from the current date
        const hours = req.body.hours;
        const currentDate = new Date('2024-05-04'); // Current date as May 4, 2024
        const twentyFourHoursAgo = new Date(currentDate);
        twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - hours);

        // Query orders in the last 24 hours
        const orders = await marketingSchema.find({
            Timestamp: { $gte: twentyFourHoursAgo, $lte: currentDate }
        });
        // Get unique product IDs from today's orders
        const productIds = Array.from(new Set(orders.map(order => order.Product_ID)));

        // Query product details for the product IDs
        const products = await productSchema.find({ product_id: { $in: productIds } });
        // return res.json({ message: products });

        // Calculate total sales and profit
        let totalSales = 0;
        let totalProfit = 0;
        for (const order of orders) {
            const product = products.find(product => product.product_id === order.Product_ID);
            if (product) {
                const sellingPrice = parseFloat(product.Selling_Price);
                const costPrice = parseFloat(product.Cost_Price);
                const saleCount = order.Purchase_Frequency;
                const profit = (sellingPrice - costPrice) * saleCount;
                totalSales += sellingPrice * saleCount;
                totalProfit += profit;
            }
        }
        const totalOrdersDelivered = Math.floor(Math.random() * (orders.length + 1));


        res.json({
            total_sales_last_nhrs: totalSales.toFixed(2), // Ensure total sales is rounded to 2 decimal places
            total_profit_last_nhrs: totalProfit.toFixed(2), // Ensure total profit is rounded to 2 decimal places
            total_orders_last_nhrs: orders.length,
            total_orders_delivered: totalOrdersDelivered

        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


exports.perMonthSales = async (req, res) => {
    try {
        // Current month as May 2024
        const currentDate = new Date('2024-04-30');

        // Calculate the start date for 7 months ago
        const sevenMonthsAgo = new Date(currentDate);
        sevenMonthsAgo.setMonth(sevenMonthsAgo.getMonth() - 6);


        // Initialize an object to store sales data for each month
        const salesData = {};

        // Loop through the last 7 months
        for (let i = 0; i < 7; i++) {
            // Calculate the month for the current iteration
            const month = sevenMonthsAgo.getMonth() + 1; // Adding 1 to match the format of month (1-based index)
            const year = sevenMonthsAgo.getFullYear();

            // Query sales data for the current month
            const sales = await salesSchema.find({
                Date: {
                    $gte: new Date(year, month - 1, 1), // Start of the month
                    $lte: new Date(year, month, 0, 23, 59, 59) // End of the month
                }
            });

            // Calculate total sales for the current month
            let totalSales = 0;
            for (const sale of sales) {
                // Retrieve selling price for the product from productSchema
                const product = await productSchema.findOne({ product_id: sale.Product_ID });
                if (product) {
                    const sellingPrice = parseFloat(product.Selling_Price);
                    totalSales += sellingPrice * sale.Sale_Count;
                }
            }

            // Store the total sales for the current month
            salesData[i] = totalSales;

            // Move to the next month
            sevenMonthsAgo.setMonth(sevenMonthsAgo.getMonth() + 1);
        }

        return res.json(salesData);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
