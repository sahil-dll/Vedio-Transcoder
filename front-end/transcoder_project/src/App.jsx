import React from "react";
import { Container, Typography, CssBaseline } from "@mui/material"; // Import CssBaseline for global styling
import VideoDownloader from "./components/VideoDownloader";
import { blue } from "@mui/material/colors";

function App() {
  return (
    <>
      <Container
        maxWidth="sm"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          // Set background color to black

          color: "#fff", // Set text color to white
        }}>
        <Typography variant="h2" gutterBottom style={{ color: "#42a5f5" }}>
          Video Transcoder
        </Typography>
        <VideoDownloader />
      </Container>
    </>
  );
}

export default App;
