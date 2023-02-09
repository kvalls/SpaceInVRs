module.exports = app => {
    const roles = require("../controllers/role.controller.js");
    const auth = require("../controllers/auth.js");
  
    var router = require("express").Router();
  
    // Create a new Role
    router.post("/", auth.isAuthenticated, roles.create);
  
    // Retrieve all Role
    router.get("/", auth.isAuthenticated, roles.findAll);
    
    // Retrieve a single Role with id
    router.get("/:id", auth.isAuthenticated, roles.findOne);
  
    // Update a Role with id
    router.put("/:id", auth.isAuthenticated, roles.update);
  
    // Delete a Role with id
    router.delete("/:id", auth.isAuthenticated, roles.delete);
  
    app.use('/api/roles', router);
};