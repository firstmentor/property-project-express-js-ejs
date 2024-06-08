const AdminModel = require("../Model/admin");
const bcrypt = require("bcrypt");
const cloudinary = require("cloudinary");
const jwt = require("jsonwebtoken");
const checkUseAuth = require("../Middleware/auth");
const categoryModel = require("../Model/category");
const PropertyModel = require("../Model/property");

cloudinary.config({
  cloud_name: "dkqv3l2kh",
  api_key: "182223573185999",
  api_secret: "lXYq1Ctc8i-xuT-JoN98pE0-Y_s",
});

class FrontController {
  static index = async (req, res) => {
    try {
      const category = await categoryModel.find();
      const property = await PropertyModel.find();
      res.render("index", { c: category, p: property });
    } catch (error) {
      console.log(error);
    }
  };

  static about = async (req, res) => {
    try {
      res.render("about");
    } catch (error) {
      console.log(error);
    }
  };

  static property = async (req, res) => {
    try {
      const category = await categoryModel.find();
      const property = await PropertyModel.find();
      res.render("property", { c: category, p: property });
    } catch (error) {
      console.log(error);
    }
  };
  static contact = async (req, res) => {
    try {
      res.render("contact", { msg: req.flash("success") });
    } catch (error) {
      console.log(error);
    }
  };
  static house = async (req, res) => {
    try {
      res.render("house");
    } catch (error) {
      console.log(error);
    }
  };
  // static login = async (req, res) => {
  //   try {
  //     res.render("login", {
  //       msg: req.flash("Success"),
  //       msg1: req.flash("error"),
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  static price = async (req, res) => {
    try {
      res.render("price");
    } catch (error) {
      console.log(error);
    }
  };
  static registration = async (req, res) => {
    try {
      res.render("registration", { msg: req.flash("error") });
    } catch (error) {
      console.log(error);
    }
  };
  // insert user
  static insertuser = async (req, res) => {
    try {
      //console.log(req.files.images)
      const file = req.files.images;
      //image upload cloudinary
      const imageUpload = await cloudinary.uploader.upload(file.tempFilePath, {
        folder: "userprofile",
      });
      // console.log(imageUpload);
      // console.log("hello gwalior");
      // console.log(req.body);
      const { n, e, p, cp } = req.body;
      const user = await AdminModel.findOne({ email: e });
      if (user) {
        req.flash("error", "Email Already exists");
        res.redirect("/registration");
        //console.log(user);
      } else {
        if (n && e && p && cp) {
          if (p == cp) {
            const hashPassword = await bcrypt.hash(p, 10);
            const result = new AdminModel({
              name: n,
              email: e,
              password: hashPassword,
              image: {
                public_id: imageUpload.public_id,
                url: imageUpload.secure_url,
              },
            });
            await result.save();
            req.flash("Success", "Register success! plz Login");
            res.redirect("/login"); //url
          } else {
            req.flash("error", "Password not Match.");
            res.redirect("/registration");
          }
        } else {
          req.flash("error", "All fields are required.");
          res.redirect("/registration");
        }
      }
      const result = new AdminModel({
        name: n,
        email: e,
        password: p,
      });
      await result.save();
      res.redirect("/admin/dashboard"); //url
    } catch (error) {
      console.log(error);
    }
  };
  static veryLogin = async (req, res) => {
    try {
      //console.log(req.body)
      const { email, password } = req.body;
      const user = await AdminModel.findOne({ email: email });
      //console.log(user);
      if (user != null) {
        const ismatch = await bcrypt.compare(password, user.password);
        //console.log(ismatch)
        if (ismatch) {
          //token
          const token = jwt.sign({ ID: user._id }, "kuchbilikhsktehai");
          //console.log(token)
          res.cookie("token", token);

          res.redirect("admin/dashboard");
        } else {
          req.flash("error", "Email or password is not match.");
          res.redirect("/login");
        }
      } else {
        req.flash("error", "You are not registered user.");
        res.redirect("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };
  static details = async (req, res) => {
    try {
      const property = await PropertyModel.findById(req.params.id);
      const category = await categoryModel.findById(req.params.id);
      res.render("details", { c: category, p: property });
    } catch (error) {
      console.log(error);
    }
  };

  //search 
  static aboutreadmore = async (req, res) => {
    try {
      res.render("aboutreadmore");
    } catch (error) {
      console.log(error);
    }
  };

  //search
  static propertySearch = async (req, res) => {
    try {
      let search = ''
     
      if (req.query.search) {
        search = req.query.search;

      }

      const searchData = await PropertyModel.find({
        $or: [

          { state: { $regex: '.*' + search + '.*', $options: 'i' } },
          { city: { $regex: '.*' + search + '.*', $options: 'i' } },
          { address: { $regex: '.*' + search + '.*', $options: 'i' } },
          { category: { $regex: '.*' + search + '.*', $options: 'i' } }


        ]
      })
      // console.log(searchData)
      const cat = await categoryModel.find()

      res.render("propertySearch", { sp: searchData, cat: cat });
    } catch (error) {
      console.log(error);
    }
  };
  static propertyArea = async (req, res) => {
    try {
      let area = ''
    
      if (req.query.area) {
        area = req.query.area;

      }
      console.log(area)
     
      const searchData = await PropertyModel.find({category: area})
      // console.log(searchData)
      const cat = await categoryModel.find()

      res.render("propertyarea", { sp: searchData, cat: cat });
    } catch (error) {
      console.log(error);
    }
  };

  static propertybhk = async (req, res) => {
    try {
      
      const searchData = await PropertyModel.find({category: req.params.id})
      //console.log(searchData)
      const cat = await categoryModel.find()

      res.render("propertyarea", { sp: searchData, cat: cat });
    } catch (error) {
      console.log(error);
    }
  };


}

module.exports = FrontController;
