const mongoose = require("mongoose")

const ProductSchema = new mongoose.Schema({
    sellerID: {
        type: String,
        required: [true, "Xatolik! Sotuvchining ID malumotlari mavjud emas."],
    },
    productName: {
        type: String,
        required: [true, "Maxsulot nomini kiritmadingiz!"]
    },
    createAt: {
        type: Date,
        default: new Date(),
    },
    updateAt:{
        type: Date,
        default: new Date(),
    },
})


const Product = mongoose.model("Product", ProductSchema)

module.exports = Product