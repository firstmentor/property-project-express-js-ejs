const AppointmentModel = require("../Model/appointment");
const checkUseAuth = require("../Middleware/auth");

class AppointmentController {
  static Fixappointment = async (req, res) => {
    try {
      //console.log(req.body);
      const { id } = req.body;
      const { name, email, mobile, date } = req.body;

      const result = new AppointmentModel({
        name: name,
        email: email,
        phone: mobile,
        date: date,
      });
      await result.save();
      req.flash("success","Appointment fixed Successfully")
      res.redirect("/contact");
    } catch (error) {
      console.log(error);
    }
  };
  static AppointmentDisplay = async (req, res) => {
    try {
      //console.log (req.body)
      const {image} = req.data
      const { name,email, phone,date} = req.data;
      const data = await AppointmentModel.find().sort({ name: -1 });

      //console.log(data);
      res.render("admin/appointment", {
        n: name,
        e: email,
        p: phone,
        dt: date,
        d: data,
        i: image,
        msg: req.flash("success"),
      });
    } catch (error) {
      console.log(error);
    }
  };
}

module.exports = AppointmentController;