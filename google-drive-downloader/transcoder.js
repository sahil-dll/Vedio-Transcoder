const ffmpeg = require("fluent-ffmpeg");
const fs = require("fs");

function transcodeVideo(inputPath, outputBasePath, resolution) {
  return new Promise((resolve, reject) => {
    const outputDirectory = `${outputBasePath}/transcoded`;

    // Create the 'transcoded' directory if it doesn't exist
    if (!fs.existsSync(outputDirectory)) {
      fs.mkdirSync(outputDirectory, { recursive: true });
    }

    const outputFilePath = `${outputDirectory}/video_(${resolution}).mp4`;

    ffmpeg(inputPath)
      .videoCodec("libx264")
      .audioCodec("aac")
      .size(resolution)
      .on("end", () => {
        console.log(
          `Transcoding to ${resolution} finished. Output saved to: ${outputFilePath}`
        );
        resolve();
      })
      .on("error", (err) => {
        console.error(`Error transcoding to ${resolution}:`, err);
        reject(err);
      })
      .save(outputFilePath);
  });
}

module.exports = transcodeVideo;
