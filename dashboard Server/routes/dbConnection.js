const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const mongoString = process.env.DATABASE_URL
mongoose.connect(mongoString);
database = mongoose.connection;

database.on("error", (error) => {
    console.log(error);
})

database.once("connected", () => {
    console.log("Database Connected");
});

const userSchema = new mongoose.Schema({
    firstName: {
        required: true,
        type: String
    },
    lastName: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String,
        // unique: true
    },
    password: {
        required: true,
        type: String,
    }
});
const userModel = new mongoose.model("allUsers", userSchema);

const shipmentsSchema = new mongoose.Schema({
    fullName: {
        required: true,
        type: String
    }, phoneNo: {
        required: true,
        type: Number
    }, amount: {
        required: true,
        type: Number
    }, address: {
        required: true,
        type: String
    }, consigneeCity: {
        required: true,
        type: String
    }, location: {
        required: true,
        type: String
    }, trackingNumber: {
        required: true,
        type: String
    }, Sno: {
        required: true,
        type: Number
    }, clientNo: {
        required: true,
        type: String
    }, email: {
        required: true,
        type: String
    }, brand: {
        required: true,
        type: String
    }, date: {
        required: true,
        type: String
    }
});
const shipmentsModel = mongoose.model("allShipments", shipmentsSchema);

module.exports = {
    userModel: userModel,
    shipmentsModel: shipmentsModel
};