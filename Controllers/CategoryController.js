const CategoryModel = require("../Model/category");
const cloudinary = require("cloudinary");
const checkUseAuth = require("../Middleware/auth");

class CategoryController {
  static categoryinsert = async (req, res) => {
    try {
      //console.log(req.body);
      const { id } = req.body;
      const { name } = req.body;
      //console.log(req.body)
      const file = req.files.image;
      //image upload cloudinary
      const imageUpload = await cloudinary.uploader.upload(file.tempFilePath, {
        folder: "userprofile",
      });
      const result = new CategoryModel({
        name: name,
        image: {
          public_id: imageUpload.public_id,
          url: imageUpload.secure_url,
        },
      });
      //console.log(result)
      await result.save();
      res.redirect("/admin/categoryDisplay");
    } catch (error) {
      console.log(error);
    }
  };
  static categoryDisplay = async (req, res) => {
    try {
      //console.log (req.body)
      const { name, email, image } = req.data;
      const data = await CategoryModel.find().sort({ name: -1 });

      //console.log(data);
      res.render("admin/property/categoryDisplay", {
        n: name,
        i: image,
        e: email,
        d: data,
        msg: req.flash("success"),
      });
    } catch (error) {
      console.log(error);
    }
  };
  static categoryview = async (req, res) => {
    try {
      // console.log(req.params.id)  // To get id from view button
      // console.log (req.body)
      const { name, image } = req.data;
      const data = await CategoryModel.findById(req.params.id);
      // console.log(data);
      res.render("admin/property/categoryview", {
        n: name,
        i: image,
        d: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
  static categoryedit = async (req, res) => {
    try {
      // console.log(req.params.id)  // To get id from view button
      // console.log (req.body)
      const { name, image } = req.data;
      const data = await CategoryModel.findById(req.params.id);
      // console.log(data);
      res.render("admin/property/categoryedit", {
        n: name,
        i: image,
        d: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
  static categoryUpdate = async (req, res) => {
    try {
      const { id } = req.body;
      const { name } = req.body;
      const file = req.files.image;
      //image upload cloudinary
      const imageUpload = await cloudinary.uploader.upload(file.tempFilePath, {
        folder: "userprofile",
      });
      const update = await CategoryModel.findByIdAndUpdate(req.params.id, {
        name: name,
        image: {
          public_id: imageUpload.public_id,
          url: imageUpload.secure_url,
        },
        user_id: id,
      });
      req.flash("success", "Course Update Successfully.");
      res.redirect("/admin/categoryDisplay");
    } catch (error) {
      console.log(error);
    }
  };
  static categoryDelete = async (req, res) => {
    try {
      await CategoryModel.findByIdAndDelete(req.params.id);
      res.redirect("/admin/categoryDisplay");
    } catch (error) {
      console.log(error);
    }
  };
}

module.exports = CategoryController