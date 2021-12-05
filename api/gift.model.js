const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

const GiftSchema = new mongoose.Schema({
    person: String, 
    giftTitle: String,
    description: String,
    url: String,
});

const Gift = mongoose.model("Gifts", GiftSchema);
