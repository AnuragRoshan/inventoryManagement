const mongoose = require("mongoose");

// Define the product schema
const productSchema = mongoose.Schema(
    {
        product_id: { type: String, required: true, unique: true },
        product_name: { type: String, required: true },
        Cost_Price: { type: String, required: true },
        Selling_Price: { type: String, required: true },
        Current_Stock: { type: Number, required: true },
        Brand: { type: String, required: true },
        Category: { type: String, required: true },
        Subcategory: { type: String, required: true },
        Introduction_Date: { type: Date, required: true },
        Discontinuation_Date: { type: Date, default: null },
        Marketing_Campaigns: { type: [String], default: [] },
        Referral_Source: { type: [String], default: [] },
        Target_Audience: { type: [String], default: [] },
        Material: { type: String },
        Color_Options: { type: [String], default: [] },
        Size: { type: String },
        Weight: { type: String },
        Warranty_Period: { type: String },
        Supplier_Name: { type: String },
        Lead_Time: { type: String },
        Purchase_Frequency: { type: String },
        Cross_Selling_Opportunities: { type: [String], default: [] },
        Customization_Options: { type: [String], default: [] },
        Personalization_Data: { type: [String], default: [] },
        Sustainable_Materials: { type: Boolean, default: false },
        Carbon_Footprint: { type: String }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
