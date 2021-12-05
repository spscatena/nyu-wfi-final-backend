const express = require("express");
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");

if (process.env.NODE_ENV === "production") {
    require("dotenv").config();
}

console.log("process.env.NODE_ENV = ", process.env.NODE_ENV);

const giftModel = require("./api/gift.model");
const giftControllers = require("./api/gift.controllers");

const app = express();

const dataBaseURL = process.env.DATABASE || "mongodb://localhost:27017";

console.log("dataBaseURL::", dataBaseURL);

mongoose
    .connect(dataBaseURL, { useNewUrlParser: true })
    .then(() => console.log("MongoDb connected"))
    .catch((err) => console.log(err));

app.use(express.static("public"));
app.use(express.json({ extended: false })); // for parsing application/json
app.use(express.urlencoded({ extended: false })); // for parsing application/x-www-form-urlencoded
app.use(fileUpload());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    next();
});

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/public/index.html");
});

app.get("/api/gifts", giftControllers.findAll);
app.get("/api/gifts/:id", giftControllers.findById);
app.post("/api/gifts", giftControllers.add);
app.put("/api/gifts/:id", giftControllers.update);
app.delete("/api/gifts/:id", giftControllers.delete);
app.get("/api/import", giftControllers.import);
app.get("/api/killall", giftControllers.killall);
app.post("/api/upload", giftControllers.upload);

const PORT = process.env.PORT || 3456;

app.listen(PORT, () =>
    console.log(`Server running at port ${PORT}. Process Env db: ${process.env.DATABASE});
`)
);
