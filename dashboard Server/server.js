const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;
const signup = require("./routes/signup");
const login = require("./routes/login");
const shipment = require("./routes/shipment");
const userModel = require("./routes/dbConnection").userModel;
const shipmentsModel = require("./routes/dbConnection").shipmentsModel;

app.use(cors());
app.use(express.json());
app.use("/user", signup);
app.use("/authenticate-user", login);
app.use("/shipments", shipment);
app.use(userModel);
app.use(shipmentsModel);

app.listen(port, () => { console.log("Server is started") });