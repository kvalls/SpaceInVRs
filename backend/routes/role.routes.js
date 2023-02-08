module.exports = app => {
    const roles = require("../controllers/role.controller.js");
    const auth = require("../controllers/auth.js");
  
    var router = require("express").Router();
  
    // Create a new Role
    router.post("/", auth.isAuthenticated, auth.isAdmin, roles.create);
  
    // Retrieve all Role
    router.get("/", auth.isAuthenticated, auth.isAdmin, roles.findAll);
    
    // Retrieve a single Role with id
    router.get("/:id", auth.isAuthenticated, auth.isAdmin, roles.findOne);
  
    // Update a Role with id
    router.put("/:id", auth.isAuthenticated, auth.isAdmin, roles.update);
  
    // Delete a Role with id
    router.delete("/:id", auth.isAuthenticated, auth.isAdmin, roles.delete);
  
    app.use('/api/roles', router);
  };