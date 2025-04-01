package com.evfinder.backend.controller;

import com.evfinder.backend.dto.StationDTO;
import com.evfinder.backend.service.ChargingStationService;
import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/chargers")
public class ChargingStationController {

    private final ChargingStationService chargingStationService;

    @GetMapping("/nearby")
    public ResponseEntity<List<StationDTO>> getNearbyStation(
            @RequestParam double lat,
            @RequestParam double lng,
            @RequestParam(defaultValue = "10") int radius
    ) throws JsonProcessingException {
        return ResponseEntity.ok(chargingStationService.getChargingStations(lat, lng, radius));
    }
}
