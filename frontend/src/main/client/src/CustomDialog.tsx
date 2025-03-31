import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Fade,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import MapIcon from "@mui/icons-material/Map";
import { Station } from "./Types.ts";

interface customDialogProps {
  selectedStation: Station | null;
  setAnchorEl: (el: HTMLElement | null) => void;
  setSelectedStation: (s: Station | null) => void;
}

const CustomDialog = ({
  selectedStation,
  setAnchorEl,
  setSelectedStation,
}: customDialogProps) => {
  const handleDialogClose = () => {
    setAnchorEl(null);
    setSelectedStation(null);
  };

  return (
    <Dialog
      open={Boolean(selectedStation)}
      onClose={() => {
        handleDialogClose();
      }}
      transitionDuration={300}
      slotProps={{
        transition: { Fade },
        paper: {
          sx: {
            backdropFilter: "blur(10px)",
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
      <IconButton
        onClick={() => handleDialogClose()}
        sx={{
          position: "absolute",
          top: 8,
          right: 8,
          color: "#FFFFFFAA",
          "&:hover": { color: "#fff" },
        }}
      >
        <CloseIcon />
      </IconButton>
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
  );
};

export default CustomDialog;
