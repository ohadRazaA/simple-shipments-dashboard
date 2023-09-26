const express = require("express");
const route = express.Router();
const userModel = require("./dbConnection").userModel;

route.post('/', async (req, res) => {
    const userEmail = req.body.userEmail;
    const password = req.body.password;

    const myUserFound = await userModel.findOne({ email: userEmail, password: password });

    if (myUserFound) {
        if (myUserFound.password === password && myUserFound.email === userEmail) {
            res.send(myUserFound._id);
        } else {
            res.status(401).json({ message: 'Authentication failed' });
        }
    } else {
        res.status(404).json({ message: 'User not found' });
    }

});

module.exports = route;