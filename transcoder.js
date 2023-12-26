const ffmpeg = require("fluent-ffmpeg");

function transcodeVideo(inputPath, outputBasePath, resolution) {
  return new Promise((resolve, reject) => {
    const outputFilePath = `${outputBasePath}\\video_(${resolution}).mp4`;

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
