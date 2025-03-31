import { useState } from "react";
import { getNearbyStation } from "./api/chargers.ts";
import { Box, CircularProgress, Typography } from "@mui/material";
import { getCoordsFromZip } from "./api/geoCode.ts";
import EvCharger from "./EVSearch.tsx";
import EVResults from "./EVResults.tsx";

function App() {
  const [view, setView] = useState<"search" | "loading" | "results">("search");
  const [stations, setStations] = useState<any[]>([]);
  const [zipCode, setZipCode] = useState<string>("");
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
      console.error("Search error:", err);
      setStations([]);
      setView("search");
    }
  };

  const handleKeyPress = (e: any) => {
    if (e.key == "Enter")
      handleSearch().then((r) => console.log(r + "key pressed"));
  };

  const handleCardClick = (address: string, e: any) => {
    setSelectedAddress(address);
    setAnchorEl(e.currentTarget);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedAddress).then((r) => console.log(r));
    setAnchorEl(null);
  };

  const handleGoogleMaps = () => {
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedAddress)}`;
    window.open(mapsUrl, "_blank");
    setAnchorEl(null);
  };

  if (view == "search")
    return (
      <EvCharger
        handleKeyPress={handleKeyPress}
        zipCode={zipCode}
        handleSearch={handleSearch}
        setZipCode={setZipCode}
      />
    );

  if (view == "loading")
    return (
      <Box
        className="animated-bg"
        textAlign={"center"}
        display={"flex"}
        sx={{
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          width: "100%",
        }}
      >
        <CircularProgress color={"secondary"} />
        <Typography fontSize={"12px"} ml={2}>
          Finding nearby chargers...
        </Typography>
      </Box>
    );

  if (view == "results")
    return (
      <EVResults
        handleCardClick={handleCardClick}
        handleCopy={handleCopy}
        handleGoogleMaps={handleGoogleMaps}
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
        stations={stations}
      />
    );
}

export default App;
