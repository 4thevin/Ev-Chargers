import { Box, Button, Typography } from "@mui/material";
import { Station } from "./Types.ts";
import React from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import { TimelineOppositeContent } from "@mui/lab";
import CustomDialog from "./CustomDialog.tsx";

interface EVResultsProps {
  stations: Station[];
  selectedStation: Station | null;
  setSelectedStation: (s: Station | null) => void;
  handleCardClick: (
    station: Station,
    address: string,
    e: React.MouseEvent,
  ) => void;
  anchorEl: HTMLElement | null;
  setAnchorEl: (el: HTMLElement | null) => void;
  handleNewSearch: () => void;
}

const buttonStyles = {
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
};

const EVResults = ({
  stations,
  selectedStation,
  setSelectedStation,
  handleCardClick,
  setAnchorEl,
  handleNewSearch,
}: EVResultsProps) => {
  return (
    <Box className={"animated-bg"}>
      <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
        <Button sx={buttonStyles} onClick={handleNewSearch}>
          New Search
        </Button>
      </Box>
      <Timeline position="alternate" sx={{ mt: 0, mb: 0 }}>
        {stations.map((station, i) => (
          <TimelineItem key={station.id} sx={{ color: "#FFFFFFCC" }}>
            <TimelineOppositeContent
              sx={{ m: "auto 0", fontFamily: "'Orbitron', sans-serif" }}
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
              <Typography
                variant="h6"
                component="span"
                sx={{
                  color: "#FFFFFFCC",
                  fontFamily: "'Orbitron', sans-serif",
                }}
              >
                {station.name}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "#FFFFFFCC",
                  fontFamily: "'Orbitron', sans-serif",
                }}
              >
                {station.city}, {station.state}
              </Typography>
              {station.chargerTypes?.length > 0 &&
                station.chargerTypes.map((type: string, i: number) => (
                  <Typography
                    variant="body2"
                    sx={{
                      mt: 1,
                      color: "#FFFFFFCC",
                      fontFamily: "'Orbitron', sans-serif",
                    }}
                    key={i}
                  >
                    Type: {type}
                  </Typography>
                ))}

              <Button
                size="small"
                variant="outlined"
                sx={buttonStyles}
                onClick={(e) => handleCardClick(station, station.address, e)}
              >
                View Details
              </Button>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
      <CustomDialog
        selectedStation={selectedStation}
        setAnchorEl={setAnchorEl}
        setSelectedStation={setSelectedStation}
      />
    </Box>
  );
};

export default EVResults;
