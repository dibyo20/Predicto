const mongoose = require("mongoose");

const songSchema = new mongoose.Schema({
    songUrl: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    posterUrl:{
        type: String,
        required: true,
    },
    mood:{
        type: String,
        enum: {
            type: String,
            values: ["happy", "sad", "surprised", "very happy"]
        }
    }
})

const songModel = mongoose.model("Song", songSchema);

module.exports = songModel;