module.exports = app => {
    const sessions = require("../controllers/session.controller.js");
    const auth = require("../controllers/auth.js");

    var router = require("express").Router();

    // Create a new Sessions
    router.post("/", auth.isAuthenticated, sessions.create);

    // Retrieve all Sessions
    router.get("/", auth.isAuthenticated, sessions.findAll);

    // Retrieve a single Sessions with id
    router.get("/:id", auth.isAuthenticated, sessions.findOne);

    // Retrieve all sessions equals an id
    router.get("/user/:id", auth.isAuthenticated, sessions.findAllByUserId);

    // Update a Sessions with id
    router.put("/:id", auth.isAuthenticated, sessions.update);

    // Delete a Sessions with id
    router.delete("/:id", auth.isAuthenticated, sessions.delete);

    app.use('/api/sessions', router);
};