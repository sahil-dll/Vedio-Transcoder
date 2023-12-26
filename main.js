const transcodeVideo = require("./transcoder");

const inputVideoPath = "C:\\Users\\sahil\\OneDrive\\Desktop\\video (1080p).mp4";
const outputBasePath =
  "C:\\Users\\sahil\\OneDrive\\Desktop\\Projects\\Video Transcoder\\Vedio-Transcoder\\outputs";

transcodeVideo(inputVideoPath, outputBasePath, "426x240")
  .then(() => transcodeVideo(inputVideoPath, outputBasePath, "640x360"))
  .then(() => transcodeVideo(inputVideoPath, outputBasePath, "854x480"))
  .then(() => transcodeVideo(inputVideoPath, outputBasePath, "1920x1080"))
  .catch((err) => console.error("Error during transcoding:", err));
