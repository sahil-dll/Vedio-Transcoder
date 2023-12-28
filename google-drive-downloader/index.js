// app.js
const express = require("express");
const cors = require("cors");
const downloadGoogleDriveVideo = require("./downloader");
const transcodeVideo = require("./transcoder");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.post("/download", async (req, res) => {
  try {
    const { videoLink } = req.body;

    const downloadResult = await downloadGoogleDriveVideo(videoLink);

    if (downloadResult.success) {
      const { filePath } = downloadResult;

      // Transcode the downloaded file
      const transcodedResolutions = ["720x480", "1280x720", "1920x1080"];
      for (const resolution of transcodedResolutions) {
        await transcodeVideo(filePath, "./transcoded", resolution);
      }

      res.json({ success: true, message: "Download and transcode successful" });
    } else {
      res.status(400).json(downloadResult);
    }
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
