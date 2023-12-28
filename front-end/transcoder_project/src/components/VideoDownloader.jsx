// src/components/VideoDownloader.js
import React, { useState } from "react";
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Box,
} from "@mui/material";
import axios from "axios";

const VideoDownloader = () => {
  const [videoLink, setVideoLink] = useState("");
  const [resolutions, setResolutions] = useState(["1080p"]);

  const handleGenerateClick = async () => {
    try {
      const response = await axios.post("http://localhost:3000/download", {
        videoLink,
        resolutions,
      });
      console.log(response.data);
      // Handle the response as needed (e.g., show a success message)
    } catch (error) {
      console.error("Error:", error.message);
      // Handle the error (e.g., show an error message)
    }
  };

  return (
    <Box sx={{ marginTop: 2, textAlign: "center" }}>
      <TextField
        label="Video Link"
        variant="outlined"
        fullWidth
        InputProps={{
          style: { color: "white" },
        }}
        InputLabelProps={{ style: { color: "white" } }}
        value={videoLink}
        onChange={(e) => setVideoLink(e.target.value)}
      />
      <FormControl fullWidth sx={{ marginTop: 2 }}>
        <InputLabel id="resolution-label" sx={{ color: "white" }}>
          Resolutions
        </InputLabel>
        <Select
          labelId="resolution-label"
          id="resolutions"
          multiple
          value={resolutions}
          label="Resolutions"
          onChange={(e) => setResolutions(e.target.value)}
          sx={{ color: "white" }}>
          <MenuItem value="480p">480p</MenuItem>
          <MenuItem value="720p">720p</MenuItem>
          <MenuItem value="1080p">1080p</MenuItem>
          {/* Add more resolutions as needed */}
        </Select>
      </FormControl>

      <Button
        variant="contained"
        onClick={handleGenerateClick}
        sx={{ marginTop: 2 }}>
        Generate
      </Button>
    </Box>
  );
};

export default VideoDownloader;
