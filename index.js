const ffmpeg = require("fluent-ffmpeg");

function transcodeVideo(inputPath, outputBasePath, resolution) {
  return new Promise((resolve, reject) => {
    const outputFilePath = `${outputBasePath}\\video_(${resolution}).mp4`; // Use double backslashes for Windows paths

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

// Example usage for multiple resolutions
const inputVideoPath = "C:\\Users\\sahil\\OneDrive\\Desktop\\Countdown10.mp4";
const outputBasePath =
  "C:\\Users\\sahil\\OneDrive\\Desktop\\Projects\\Video Transcoder\\Vedio-Transcoder\\outputs";

transcodeVideo(inputVideoPath, outputBasePath, "426x240")
  .then(() => transcodeVideo(inputVideoPath, outputBasePath, "640x360"))
  .then(() => transcodeVideo(inputVideoPath, outputBasePath, "854x480"))
  .then(() => transcodeVideo(inputVideoPath, outputBasePath, "1920x1080"))
  .catch((err) => console.error("Error during transcoding:", err));
