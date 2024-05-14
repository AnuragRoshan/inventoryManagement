const Product = require("../models/product"); // Assuming your Product model is in a models folder

exports.inventoryDetails = async (req, res) => {
    try {
        // Get total inventory count
        const totalInventoryCount = await Product.aggregate([
            {
                $group: {
                    _id: null,
                    totalInventoryCount: { $sum: "$Current_Stock" }
                }
            }
        ]);

        // If no products are found, set totalInventoryCount to 0
        const count = totalInventoryCount.length > 0 ? totalInventoryCount[0].totalInventoryCount : 0;

        // Calculate total stocked value
        const products = await Product.find();
        const totalStockedValue = products.reduce((total, product) => {
            return total + (parseFloat(product.Cost_Price.replace('$', '')) * product.Current_Stock);
        }, 0);

        // Get total unique products
        const totalUniqueProducts = await Product.distinct('product_id').countDocuments();

        res.status(200).json({
            totalInventoryCount: count,
            totalStockedValue,
            totalUniqueProducts
        });
    } catch (error) {
        console.error("Error in inventoryDetails:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


exports.lastSevenDaysOrders = async (req, res) => {
    try {
        // Calculate the date 7 days ago
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        // Query sales records for the last 7 days
        const lastSevenDaysSales = await Sales.aggregate([
            {
                $match: {
                    Date: { $gte: sevenDaysAgo } // Filter sales records for the last 7 days
                }
            },
            {
                $group: {
                    _id: null,
                    totalOrders: { $sum: "$Sale_Count" } // Sum up the Sale_Count values
                }
            }
        ]);

        // If no sales records are found, set totalOrders to 0
        const totalOrders = lastSevenDaysSales.length > 0 ? lastSevenDaysSales[0].totalOrders : 0;

        res.status(200).json({
            totalOrders
        });
    } catch (error) {
        console.error("Error in lastSevenDaysOrders:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({}, { product_id: 1, product_name: 1, _id: 0 }); // Projection
        res.status(200).json(products);
    } catch (error) {
        console.error("Error in getAllProducts:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
