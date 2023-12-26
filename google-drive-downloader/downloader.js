const axios = require("axios");
const fs = require("fs");

function extractFileId(videoLink) {
  const match = videoLink.match(
    /(?:drive\.google\.com\/file\/d\/|drive\.google\.com\/open\?id=)([\w-]+)/
  );
  return match ? match[1] : null;
}

async function downloadGoogleDriveVideo(videoLink) {
  try {
    // Extract file ID from the Google Drive link
    const fileId = extractFileId(videoLink);

    if (!fileId) {
      console.error("Invalid Google Drive link");
      return;
    }

    // Specify the destination path on your system
    const destinationPath = `./${fileId}.mp4`;

    // Get the direct download link
    const directDownloadLink = `https://drive.google.com/uc?id=${fileId}`;

    // Download the file from Google Drive
    const response = await axios({
      method: "get",
      url: directDownloadLink,
      responseType: "stream",
    });

    // Pipe the file stream to a local file
    const writer = fs.createWriteStream(destinationPath);
    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
      writer.on("finish", resolve);
      writer.on("error", reject);
    });
  } catch (error) {
    console.error("Error:", error.message);
  }
}

// Example usage
const googleDriveVideoLink =
  "https://drive.google.com/file/d/1x81r3q83seEQ4qoFD5xXxj4U-O_D1CjD/view?usp=sharing";
downloadGoogleDriveVideo(googleDriveVideoLink).then(() => {
  console.log("File downloaded successfully");
});
