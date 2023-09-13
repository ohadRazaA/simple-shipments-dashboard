const express = require("express");
const route = express.Router();
const shipmentsModel = require("./dbConnection").shipmentsModel;

route.post("/", async (req, res) => {
    const myShipment = new shipmentsModel(
        {
            fullName: req.body.fullName,
            phoneNo: req.body.phoneNo,
            amount: req.body.amount,
            address: req.body.address,
            consigneeCity: req.body.consigneeCity,
            location: req.body.location,
            trackingNumber: req.body.trackingNumber,
            Sno: req.body.Sno,
            clientNo: req.body.clientNo,
            email: req.body.email,
            brand: req.body.brand,
            date: req.body.date
        }
    );
    try {
        const dataToSave = await myShipment.save();
        res.send("form Sumbitted");
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
});

route.get("/", async (req, res) => {
    try {
        const allShipments = await shipmentsModel.find();
        res.json(allShipments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

route.delete("/:id", async (req, res) => {
    const shipmentId = req.params.id;
    try {
        await shipmentsModel.findByIdAndDelete(shipmentId);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

route.put("/:id", async (req, res) => {
    const shipmentId = req.params.id;
    try {
        await shipmentsModel.findByIdAndUpdate(shipmentId, req.body)
        res.send(req.body);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
})

module.exports = route;