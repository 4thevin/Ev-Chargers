import {
  Box,
  Button,
  Card,
  CardContent,
  Grid2,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { Station } from "./Types.ts";
import React from "react";

interface EVResultsProps {
  stations: Station[];
  handleCardClick: (address: string, e: React.MouseEvent) => void;
  anchorEl: HTMLElement | null;
  setAnchorEl: (el: HTMLElement | null) => void;
  handleCopy: () => void;
  handleGoogleMaps: () => void;
}

const EVResults = ({
  stations,
  handleCardClick,
  anchorEl,
  setAnchorEl,
  handleCopy,
  handleGoogleMaps,
}: EVResultsProps) => {
  return (
    <Box className="animated-bg">
      <Grid2 container spacing={2} justifyContent={"center"}>
        {stations.map((station: any, i: number) => (
          <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={station.ID}>
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
};

export default EVResults;
