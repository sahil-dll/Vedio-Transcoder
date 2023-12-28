// src/components/VideoDownloader.js

import React, { useState } from "react";
import axios from "axios";

const VideoDownloader = () => {
  const [videoLink, setVideoLink] = useState("");
  const [resolution, setResolution] = useState("1080p");

  const handleGenerateClick = async () => {
    try {
      const response = await axios.post("http://localhost:3000/download", {
        videoLink,
      });
      console.log(response.data);
      // Handle the response as needed (e.g., show a success message)
    } catch (error) {
      console.error("Error:", error.message);
      // Handle the error (e.g., show an error message)
    }
  };

  return (
    <div>
      <label>
        Video Link:
        <input
          type="text"
          value={videoLink}
          onChange={(e) => setVideoLink(e.target.value)}
        />
      </label>

      <label>
        Resolution:
        <select
          value={resolution}
          onChange={(e) => setResolution(e.target.value)}>
          <option value="1080p">1080p</option>
          <option value="720p">720p</option>
          <option value="480p">480p</option>
          <option value="360p">360p</option>
          <option value="240p">240p</option>
        </select>
      </label>

      <button onClick={handleGenerateClick}>Generate</button>
    </div>
  );
};

export default VideoDownloader;
