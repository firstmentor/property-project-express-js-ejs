const BookpropertyModel = require("../Model/bookproperty");
const checkUseAuth = require("../Middleware/auth");


class BookPropertyController {
  static bookproperty = async (req, res) => {
    try {
      //console.log(req.body);
      const { id } = req.body;
      const { name, email, address, mobile } = req.body;

      const result = new BookpropertyModel({
        name: name,
        email: email,
        address: address,
        phone: mobile,
      });
      await result.save();
      req.flash("success", "Property booked successfully")
      res.redirect("/property");
    } catch (error) {
      console.log(error);
    }
  };
  static bookpropertyDisplay = async (req, res) => {
    try {
      //console.log (req.body)
      const { name, email, address, image, phone } = req.data;
      const data = await BookpropertyModel.find().sort({ name: -1 });

      //console.log(data);
      res.render("admin/bookproperty", {
        n: name,
        e: email,
        add: address,
        p: phone,
        d: data,
        i: image,
        msg: req.flash("success"),
      });
    } catch (error) {
      console.log(error);
    }
  };
  
}

module.exports = BookPropertyController;
