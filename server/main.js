const express = require("express");
const bodyParser = require("body-parser");
const transcodeVideo = require("./transcoder");

const app = express();
const port = 3000;
app.use(bodyParser.json());

app.post("/transcode", async (req, res) => {
  const { inputVideoPath, outputBasePath, resolutions } = req.body;

  try {
    await Promise.all(
      resolutions.map((resolution) =>
        transcodeVideo(inputVideoPath, outputBasePath, resolution)
      )
    );

    res
      .status(200)
      .json({ success: true, message: "Video transcoded successfully" });
  } catch (error) {
    console.error("Error during transcoding:", error);
    res
      .status(500)
      .json({ success: false, message: "Error during transcoding" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

//current postman req-body looks like
// {
//   "inputVideoPath": "C:\\Users\\sahil\\OneDrive\\Desktop\\video (1080p).mp4",
//   "outputBasePath": "C:\\Users\\sahil\\OneDrive\\Desktop\\Projects\\Video Transcoder\\Vedio-Transcoder\\outputs",
//   "resolutions": ["426x240", "640x360", "854x480", "1920x1080"]
// }
