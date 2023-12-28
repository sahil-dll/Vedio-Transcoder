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
      return { success: false, error: "Invalid Google Drive link" };
    }

    // Specify the destination directory on your system
    const destinationDirectory = "./downloads";
    const destinationPath = `${destinationDirectory}/${fileId}.mp4`;

    // Create the 'downloads' directory if it doesn't exist
    if (!fs.existsSync(destinationDirectory)) {
      fs.mkdirSync(destinationDirectory);
    }

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

    await new Promise((resolve, reject) => {
      writer.on("finish", resolve);
      writer.on("error", reject);
    });

    return {
      success: true,
      message: "File downloaded successfully",
      filePath: destinationPath,
    };
  } catch (error) {
    console.error("Error:", error.message);
    return { success: false, error: "Internal Server Error" };
  }
}

module.exports = downloadGoogleDriveVideo;
// {
//   "videoLink": "https://drive.google.com/file/d/1x81r3q83seEQ4qoFD5xXxj4U-O_D1CjD/view?usp=sharing"
// }
