const ImageKit = require("@imagekit/nodejs");

const client = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

async function uploadFile({ buffer, filename, folder = "" }) {

  const file = await client.files.upload({
    file: await toFile(Buffer.from(buffer), filename),
    fileName: filename,
    folder
  });

  return file;
}

async function toFile(buffer, filename) {
  const tempFile = new File([buffer], filename, {
    type: "audio/mpeg",
  });

  return tempFile;
}

module.exports = {
  uploadFile
};