const db = require("../models");
const Session = db.session;
const Op = db.Sequelize.Op;

// Create and Save a new Session
exports.create = (req, res) => {
    // Validate request
    // if (!req.body.id) {
    //     res.status(400).send({
    //         message: "Content can not be empty!"
    //     });
    //     return;
    // }

    // Create a Session
    const session = {
        id: req.body.id,
        user_id: req.body.user_id,
        score: req.body.score,
        ships_destroyed: req.body.ships_destroyed,
        bullets_fired: req.body.bullets_fired,
        powerups: req.body.powerups
    };

    // Save Session in the database
    Session.create(session)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Session."
            });
        });
};

// Retrieve all Sessions from the database.
exports.findAll = (req, res) => {
    Session.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving sessions."
            });
        });
};

// Retrieve all Sessions from the database.
exports.findAllByUserId = (req, res) => {
    const id = req.params.id;

    Session.findAll({ where: { user_id: id } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving sessions."
            });
        });
};

// Find a single Session with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Session.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Session with id=" + id
            });
        });
};

// Update a Session by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Session.update(req.body, {
            where: { id: id }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Session was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Session with id=${id}. Maybe Session was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Session with id=" + id
            });
        });
};

// Delete a Session with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Session.destroy({
            where: { id: id }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Session was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Session with id=${id}. Maybe Session was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Session with id=" + id
            });
        });
};