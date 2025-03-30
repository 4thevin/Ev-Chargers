import { Box, Button, TextField, Typography } from "@mui/material";
import React from "react";

interface EvChargerProps {
  zipCode: string;
  handleKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  handleSearch: () => void;
  setZipCode: (val: string) => void;
}

const EvCharger = ({
  handleSearch,
  zipCode,
  handleKeyPress,
  setZipCode,
}: EvChargerProps) => {
  return (
    <Box
      className="animated-bg"
      sx={{
        p: 4,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        px: 2,
        color: "white",
      }}
    >
      <Typography textAlign={"center"} variant={"h3"} mb={4}>
        Search for EV Chargers
      </Typography>
      <Box display={"flex"} justifyContent={"center"} mb={4} gap={2}>
        <TextField
          label={"Type in your zip code"}
          variant={"outlined"}
          value={zipCode}
          onChange={(e) => setZipCode(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <Button variant={"contained"} onClick={handleSearch}>
          Search
        </Button>
      </Box>
    </Box>
  );
};

export default EvCharger;
