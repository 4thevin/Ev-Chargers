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
  const [stations, setStations] = useState([]);
  const [zipCode, setZipCode] = useState<string>();
  const [selectedAddress, setSelectedAddress] = useState("");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleSearch = async () => {
    if (!zipCode) return;

    try {
      const { lat, lng } = await getCoordsFromZip(zipCode);
      const data = await getNearbyStation(lat, lng);
      setStations(data);
    } catch (err) {
      console.error("Search Error:", err);
      alert("Could not find chargers for the ZIP. Try another one.");
    }
  };

  const handleKeyPress = (e: any) => {
    if (e.key == "enter") handleSearch();
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
    <Box sx={{ p: 4 }}>
      <Typography textAlign={"center"} variant={"h3"} mb={4}>
        Nearby EV Chargers
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
        {stations.map((station: any) => (
          <Grid2 size={{ xs: 8, sm: 4 }} key={station.ID}>
            <Card
              key={station.ID}
              onClick={(e) =>
                handleCardClick(station.AddressInfo.AddressLine1, e)
              }
              sx={{
                cursor: "pointer",
                "&:hover": { boxShadow: 6 },
                backgroundColor: "rgb(153, 153, 153)",
              }}
            >
              <CardContent>
                <Typography variant={"h6"}>
                  {station.AddressInfo.Title}
                </Typography>
                <Typography variant={"h6"}>
                  {station.AddressInfo.stateOrProvince}
                </Typography>
                <Typography variant={"h6"}>
                  {station.AddressInfo.Distance.toFixed(2)} mi
                </Typography>
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
