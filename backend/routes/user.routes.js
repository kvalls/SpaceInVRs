module.exports = app => {
    const users = require("../controllers/user.controller.js");
    const auth = require("../controllers/auth.js");
    var upload = require('../multer/upload');
  
    var router = require("express").Router();
  
    // Create a new User
    router.post("/", users.create);
  
    // Retrieve all User
    router.get("/", auth.isAuthenticated, auth.isAdmin, users.findAll);
    
    // Retrieve a single User with id
    router.get("/:id", auth.isAuthenticated, users.findOne);
  
    // Update a User with id
    router.put("/:id", auth.isAuthenticated, upload.single('file'), users.update);

    // Sign in
    router.post("/signin", auth.signin);
  
    // Delete a User with id
    router.delete("/:id", auth.isAuthenticated, users.delete);
  
    // // Delete all Users
    // router.delete("/", users.deleteAll);
  
    app.use('/api/users', router);
  };