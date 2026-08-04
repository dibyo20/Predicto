const songModel = require("../models/song.model.js");
const storageService = require("../services/storage.service.js");
const id3 = require("node-id3");

async function uploadSong(req, res){
    const songBuffer = req.file.buffer;
    const { mood } = req.body;

    const tags = id3.read(songBuffer);

    const [ songFile, posterFile ] = await Promise.all([
        storageService.uploadFile({
            buffer: songBuffer,
            filename: tags.title || "untitled" + ".mp3",
            folder: "Predicto/songs"
        }),
        storageService.uploadFile({
            buffer: tags.image.imageBuffer,
            filename: tags.title || "untitled" + ".jpg",
            folder: "Predicto/posters"
        })
    ]);

    const song = await songModel.create({
        title: tags.title || "untitled",
        url: songFile.url,
        posterUrl: posterFile.url,
        mood
    })

    res.status(201).json({
        message: "Song uploaded successfully",
        song
    });
}

async function getSongsByMood(req, res){
    const { mood } = req.query;

    const songs = await songModel.find({ mood });

    res.status(200).json({
        message: "Songs fetched successfully",
        songs
    });
}

module.exports = {
    uploadSong,
    getSongsByMood
}