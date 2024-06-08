const express = require("express");
const FrontController = require("../Controllers/FrontController");
const route = express.Router();
const AdminController = require("../Controllers/AdminController");
const PropertyController = require("../Controllers/PropertyController");
const checkUseAuth = require("../Middleware/auth");
const CategoryController = require("../Controllers/CategoryController");
const BookPropertyController = require("../Controllers/BookpropertyController");
const AppointmentController = require("../Controllers/AppointmentController");

//router
//FrontController
route.get("/", FrontController.index);
route.get("/about", FrontController.about);
route.get("/aboutreadmore", FrontController.aboutreadmore);
route.get("/contact", FrontController.contact);
route.get("/house", FrontController.house);
route.get("/property", FrontController.property);
route.get("/details/:id", FrontController.details);
route.get("/price", FrontController.price);
route.get("/registration", FrontController.registration);
route.post("/verifyLogin", FrontController.veryLogin);
route.get("/profile", checkUseAuth, AdminController.profile);
//peroperty search
route.get("/propertySearch", FrontController.propertySearch);
route.get("/area", FrontController.propertyArea);
route.get("/bhk/:id", FrontController.propertybhk);






//insert user
route.post("/insertuser", FrontController.insertuser);

//BookPropertyController
route.post("/admin/bookproperty",checkUseAuth, BookPropertyController.bookproperty);
route.get("/admin/bookperpertydisplay",checkUseAuth,BookPropertyController.bookpropertyDisplay);


//AdminController
route.get("/login", AdminController.login);
route.get("/logout", AdminController.logout);
route.get("/admin/dashboard", checkUseAuth, AdminController.dashboard);
route.post("/updateProfile", checkUseAuth, AdminController.updateProfile);
route.post("/changePassword", checkUseAuth, AdminController.changePassword);

//Propertycontroller
route.post("/admin/propertyinsert",checkUseAuth,PropertyController.propertyinsert);
route.get("/admin/propertyDisplay", checkUseAuth,PropertyController.propertyDisplay);
route.get("/admin/property/view/:id", checkUseAuth,PropertyController.propertyview);
route.get("/admin/property/edit/:id", checkUseAuth,PropertyController.propertyedit);
route.post("/admin/propertyUpdate/:id",checkUseAuth,PropertyController.propertyUpdate);
route.get("/admin/property/delete/:id", checkUseAuth,PropertyController.propertyDelete);

//category controller
route.post("/admin/categoryinsert",checkUseAuth,CategoryController.categoryinsert);
route.get("/admin/category/view/:id",checkUseAuth,CategoryController.categoryview);
route.get("/admin/category/edit/:id",checkUseAuth,CategoryController.categoryedit);
route.post("/admin/categoryUpdate/:id",checkUseAuth,CategoryController.categoryUpdate);
route.get("/admin/category/delete/:id",checkUseAuth,CategoryController.categoryDelete);
route.get("/admin/categorydisplay",checkUseAuth,CategoryController.categoryDisplay);


route.post("/bookappointment",checkUseAuth, AppointmentController.Fixappointment);
route.get("/admin/Appointmentdisplay",checkUseAuth,AppointmentController.AppointmentDisplay);


module.exports = route;
