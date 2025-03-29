import { useState } from "react";
import { getNearbyStation } from "./api/chargers.ts";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid2,
  Menu,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { getCoordsFromZip } from "./api/geoCode.ts";

function App() {
  const [_view, setView] = useState<"search" | "loading" | "results">("search");
  const [stations, setStations] = useState([]);
  const [zipCode, setZipCode] = useState<string>();
  const [selectedAddress, setSelectedAddress] = useState("");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleSearch = async () => {
    if (!zipCode) return;

    setView("loading");

    try {
      const { lat, lng } = await getCoordsFromZip(zipCode);
      const data = await getNearbyStation(lat, lng);
      setStations(data);
      setView("results");
    } catch (err) {
      console.error("Search Error:", err);
      alert("Could not find chargers for the ZIP. Try another one.");
      setView("search");
    }
  };

  const handleKeyPress = (e: any) => {
    if (e.key == "Enter") handleSearch();
  };

  const handleCardClick = (address: string, e: any) => {
    setSelectedAddress(address);
    setAnchorEl(e.currentTarget);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedAddress);
    setAnchorEl(null);
  };

  const handleGoogleMaps = () => {
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedAddress)}`;
    window.open(mapsUrl, "_blank");
    setAnchorEl(null);
  };

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
      <Grid2 container spacing={2} justifyContent={"center"}>
        {stations.map((station: any, i: number) => (
          <Grid2 size={{ xs: 8, sm: 4 }} key={station.ID}>
            <Card
              key={i}
              onClick={(e) => handleCardClick(station.address, e)}
              sx={{
                cursor: "pointer",
                "&:hover": { boxShadow: 6 },
                backgroundColor: "#FFF1D0",
              }}
            >
              <CardContent>
                <Typography variant={"h6"}>{station.name}</Typography>
                <Typography variant={"h6"}>
                  {station.address}, {station.city}, {station.state}
                </Typography>
                <Typography variant={"body2"}>
                  {" "}
                  Website: {station.websiteUrl}
                </Typography>
                {station.usageCost && (
                  <Typography variant={"body2"}>
                    Cost: {station.usageCost}
                  </Typography>
                )}
                {station.operator && (
                  <Typography variant={"body2"}>
                    Network: {station.operator}
                  </Typography>
                )}
                <Typography variant={"h6"}>
                  {Number(station.distance).toFixed(2)} mi
                </Typography>
                {station.chargerTypes?.length > 0 && (
                  <Box mt={1}>
                    {station.chargerTypes.map((type: string, i: number) => (
                      <Button
                        key={i}
                        size={"small"}
                        variant={"outlined"}
                        sx={{ mr: 1, mb: 1 }}
                      >
                        {type}
                      </Button>
                    ))}
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid2>
        ))}
        <Grid2> </Grid2>
      </Grid2>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem onClick={handleCopy}>Copy Address</MenuItem>
        <MenuItem onClick={handleGoogleMaps}>Open in Google Maps</MenuItem>
      </Menu>
    </Box>
  );
}

export default App;
