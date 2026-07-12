const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const product = require("./models/product.model.js");
const category = require("./models/category.model.js");
const order = require("./models/order.model.js");
const products = require("./data/productsData.js");
const categories = require("./data/categoriesData.js");



const connectDB = require("./db/connect.js");
async function connect() {
    await connectDB();
    await importData();
}
connect();



const importData = async () => {
    try {
        //deleting any product before seeding to prevent conflicts
        await order.deleteMany();
        await product.deleteMany();
        await category.deleteMany();

        const insertedCategories = await category.insertMany(categories);
        // filtring products so that any product doesnt have a category from categories data wont be inserted to db
        function filterProducts(p) {
            return insertedCategories.some(c => c.slug == p.category);
        };
        //changing the just string category in categories to a real reference id
        function mapProducts(i) {
            const matchedCategory = insertedCategories.find(c => c.slug == i.category);
            return {
                ...i,
                category: matchedCategory._id
            }
        };

        const filteredProducts = products.filter(filterProducts);
        const finalProducts = filteredProducts.map(mapProducts);


        const insertedProducts = await product.insertMany(finalProducts);
        console.log(`Data imported! ${insertedCategories.length} categories and ${insertedProducts.length} products added.`);
    }
    catch (error) {
        console.log(error, error.message);
    }
    finally {
        await mongoose.disconnect()
    }

};