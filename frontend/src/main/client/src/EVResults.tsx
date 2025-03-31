import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { Station } from "./Types.ts";
import React from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import { TimelineOppositeContent } from "@mui/lab";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import MapIcon from "@mui/icons-material/Map";

interface EVResultsProps {
  stations: Station[];
  selectedStation: Station | null;
  handleCardClick: (
    station: Station,
    address: string,
    e: React.MouseEvent,
  ) => void;
  anchorEl: HTMLElement | null;
  setAnchorEl: (el: HTMLElement | null) => void;
}

const EVResults = ({
  stations,
  selectedStation,
  handleCardClick,
  setAnchorEl,
}: EVResultsProps) => {
  return (
    <>
      <Box className={"animated-bg"}>
        <Timeline position="alternate">
          {stations.map((station, i) => (
            <TimelineItem key={station.id} sx={{ color: "#FFFFFFCC" }}>
              <TimelineOppositeContent
                sx={{ m: "auto 0" }}
                align="right"
                variant="body2"
              >
                {Number(station.distance).toFixed(2)} mi
              </TimelineOppositeContent>

              <TimelineSeparator>
                <TimelineDot sx={{ color: "#FFFFFFCC" }} />
                {i !== stations.length - 1 && <TimelineConnector />}
              </TimelineSeparator>

              <TimelineContent sx={{ py: "12px", px: 2 }}>
                <Typography variant="h6" component="span">
                  {station.name}
                </Typography>
                <Typography variant="body2" sx={{ color: "#FFFFFFCC" }}>
                  {station.city}, {station.state}
                </Typography>
                <Button
                  size="small"
                  variant="outlined"
                  sx={{
                    mt: 1,
                    backgroundColor: "black",
                    fontFamily: "'Orbitron', sans-serif",
                    color: "#fff",
                    fontWeight: "bold",
                    borderRadius: "8px",
                    paddingX: 4,
                    "&:hover": {
                      backgroundColor: "#222120",
                      boxShadow: "0 0 10px rgba(162,112,138,0.6)",
                    },
                  }}
                  onClick={(e) => handleCardClick(station, station.address, e)}
                >
                  View Details
                </Button>
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      </Box>
      <Dialog
        open={Boolean(selectedStation)}
        onClose={() => setAnchorEl(null)}
        slotProps={{
          paper: {
            sx: {
              background:
                "linear-gradient(270deg, #56126F, #191308, #37392E, #BDA0BC, #A2708A)",
              backgroundSize: "600% 600%",
              animation: "gradientAnimation 16s ease infinite",
              color: "#FFFFFFCC",
              padding: 2,
              borderRadius: 2,
            },
          },
        }}
      >
        <DialogTitle
          sx={{ color: "#FFFFFFCC", fontFamily: "'Orbitron', sans-serif" }}
        >
          Station Details
        </DialogTitle>
        <DialogContent
          sx={{ color: "#FFFFFFCC", fontFamily: "'Orbitron', sans-serif" }}
        >
          <Typography
            fontWeight="bold"
            sx={{ color: "#FFFFFFCC", fontFamily: "'Orbitron', sans-serif" }}
          >
            Name: {selectedStation?.name}
          </Typography>

          <Box display="flex" alignItems="center" gap={1}>
            <Typography
              sx={{ color: "#FFFFFFCC", fontFamily: "'Orbitron', sans-serif" }}
            >
              Address: {selectedStation?.address}
            </Typography>

            <Tooltip
              sx={{ color: "#FFFFFFCC", fontFamily: "'Orbitron', sans-serif" }}
              title="Copy Address"
            >
              <IconButton
                size="small"
                onClick={() =>
                  navigator.clipboard.writeText(selectedStation?.address || "")
                }
              >
                <ContentCopyIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>

          <Typography
            sx={{ color: "#FFFFFFCC", fontFamily: "'Orbitron', sans-serif" }}
          >
            Distance: {Number(selectedStation?.distance).toFixed(2)} mi
          </Typography>

          {selectedStation?.websiteUrl && (
            <Typography
              sx={{ color: "#FFFFFFCC", fontFamily: "'Orbitron', sans-serif" }}
            >
              Website:{" "}
              <a
                style={{
                  color: "inherit",
                  fontFamily: "'Orbitron', sans-serif",
                }}
                href={selectedStation.websiteUrl}
                target="_blank"
                rel="noreferrer"
              >
                {selectedStation.websiteUrl}
              </a>
            </Typography>
          )}

          <Box mt={2}>
            <Button
              variant="contained"
              startIcon={<MapIcon />}
              onClick={() => {
                const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  selectedStation?.address || "",
                )}`;
                window.open(mapsUrl, "_blank");
              }}
              sx={{
                backgroundColor: "black",
                fontFamily: "'Orbitron', sans-serif",
                color: "#fff",
                fontWeight: "bold",
                borderRadius: "8px",
                paddingX: 4,
                "&:hover": {
                  backgroundColor: "#222120",
                  boxShadow: "0 0 10px rgba(162,112,138,0.6)",
                },
              }}
            >
              Open in Google Maps
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EVResults;
