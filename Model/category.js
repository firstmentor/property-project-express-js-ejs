const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  },
  { timestamps: true }
); // jab hum insert krenge to 2 field dega created data and insert data time and date
const CategoryModel = mongoose.model("category", CategorySchema);
module.exports = CategoryModel;