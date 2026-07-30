const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");

const client = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

async function uploadFile(req, res) {
    console.log(req.file);
    const file = await client.files.upload({
        file: await toFile(Buffer.from(req.file.buffer), "file"),
        fileName: "Song",
        folder: "Predicto"
    });

    return res.status(200).json({
        message: "File uploaded successfully on ImageKit",
        file: file
    });
}

module.exports = {
    uploadFile
};