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
      <Typography
        textAlign={"center"}
        variant={"h3"}
        mb={4}
        sx={{
          fontFamily: "'Orbitron', sans-serif",
          color: "#FFFFFFCC",
          letterSpacing: "1px",
          textShadow: "0 0 8px rgba(255,255,255,0.2)",
        }}
      >
        Search for EV Chargers
      </Typography>
      <Box display={"flex"} justifyContent={"center"} mb={4} gap={2}>
        <TextField
          sx={{
            input: {
              color: "#FFFFFFCC",
              backgroundColor: "black",
              borderRadius: "8px",
            },
            label: { color: "#FFFFFFCC", fontFamily: "'Orbitron', sans-serif" },
            "& label.Mui-focused": { color: "#FFFFFFCC" },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "transparent",
              },
              "&.Mui-focused fieldset": {
                borderColor: "transparent",
              },
              "&:hover fieldset": {
                backgroundColor: "#222120",
                boxShadow: "0 0 10px rgba(162,112,138,0.6)",
              },
            },
            width: "280px",
          }}
          label={"Type in your zip code"}
          variant={"outlined"}
          value={zipCode}
          onChange={(e) => setZipCode(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <Button
          variant={"contained"}
          onClick={handleSearch}
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
          Search
        </Button>
      </Box>
    </Box>
  );
};

export default EvCharger;
