import React, { useState } from "react";

const VideoDownloader = () => {
  const [videoLink, setVideoLink] = useState("");

  const handleDownload = async () => {
    try {
      // Extracting the file ID from the Google Drive link
      const fileId = videoLink.match(/\/file\/d\/(.*?)(?:\/|$)/)[1];

      // Constructing the direct download link
      const downloadLink = `https://drive.google.com/uc?id=${fileId}`;

      // Fetching the file as a blob
      const response = await fetch(downloadLink);
      const blob = await response.blob();

      // Creating an object URL from the blob
      const blobUrl = window.URL.createObjectURL(blob);

      // Creating an anchor element to trigger the download
      const anchor = document.createElement("a");
      anchor.href = blobUrl;
      anchor.download = "downloaded_video.mp4"; // You can change the filename if needed

      // Adding the anchor element to the document body
      document.body.appendChild(anchor);

      // Simulating a click on the anchor element to trigger the download
      anchor.click();

      // Removing the anchor element and revoking the object URL
      document.body.removeChild(anchor);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Error downloading the video:", error);
    }
  };

  return (
    <div>
      <label>
        Enter Google Drive Video Linkss:
        <input
          type="text"
          value={videoLink}
          onChange={(e) => setVideoLink(e.target.value)}
        />
      </label>
      <button onClick={handleDownload}>Download Video</button>
    </div>
  );
};

export default VideoDownloader;
