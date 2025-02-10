require("./DatabseConnection/db");

const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

const app = express();
app.use(cors());
app.options('*', cors());
const limiter = rateLimit({
    windowMs: 60000,
    max: 3000,
    message: 'Too many requests from this IP, please try again later.'
});

app.use(limiter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const routes = require("./Routes/index");


app.use("", routes);








module.exports = app;
