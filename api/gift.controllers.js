const mongoose = require("mongoose");
const Gift = mongoose.model("Gifts");

exports.findAll = function (req, res) {
    Gift.find({}, function (err, results) {
        return res.send(results);
    });
};

exports.findById = (req, res) => {
    const id = req.params.id;
    Gift.findOne({ _id: id }, (err, json) => {
        if (err) return console.log(err);
        return res.send(json);
    });
};

exports.add = function (req, res) {
    Gift.create(req.body, function (err, gift) {
        if (err) return console.log(err);
        return res.send(gift);
    });
};

exports.update = function (req, res) {
    console.log(req.body);
    const id = req.params.id;
    Gift.findByIdAndUpdate(id, req.body, { new: true }, (err, response) => {
        if (err) return console.log(err);
        res.send(response);
    });
};

exports.delete = function (req, res) {
    let id = req.params.id;
    Gift.deleteOne({ _id: id }, () => {
        return res.status(202).send("{}");
    });
};

exports.upload = function (req, res) {
    console.log(req.files);
    if (Object.keys(req.files).length == 0) {
        return res.status(400).send("No files were uploaded.");
    }
    let file = req.files.file;
    file.mv(`./public/img/${req.body.filename}`, (err) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json({ file: `public/img/${req.body.filename}` });
        console.log(" res.json", res.json);
    });
};

exports.import = function (req, res) {
    Gift.create(
        {
            person: "Ryan",
            giftTitle: "Apple",
            description: "Apple charging",
            url: "https://www.amazon.com/Apple-MHXH3AM-A-MagSafe-Charger/dp/B08L5NP6NG/ref=asc_df_B08L5NP6NG/",
        },
        {
            person: "Katya",
            giftTitle: "Apple",
            description: "Apple charging",
            url: "lasagna.png",
        },

        {
            person: "Angelo",
            giftTitle: "Apple",
            description: "Apple charging",
            url: "lasagna.png",
        },

        {
            person: "Lorenzo",
            giftTitle: "Apple",
            description: "Apple charging",
            url: "lasagna.png",
        },
        function (err) {
            if (err) return console.log(err);
            return res.sendStatus(201);
        }
    );
};

exports.killall = function (req, res) {
    Gift.deleteMany({}, (err) => {
        if (err) return console.log(err);
        return res.sendStatus(202);
    });
};
