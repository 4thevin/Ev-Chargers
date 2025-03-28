package com.evfinder.backend;

import com.evfinder.backend.dto.StationDTO;
import com.evfinder.backend.service.GeoCodeService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/chargers")
public class ChargingStationController {

    private final GeoCodeService geoCodeService;
    private final RestTemplate restTemplate = new RestTemplate();

    @Value("${openchargemap.api.key}")
    private String apiKey;

    @GetMapping("/nearby")
    public ResponseEntity<List<StationDTO>> getNearbyStation(
            @RequestParam double lat,
            @RequestParam double lng,
            @RequestParam(defaultValue = "10") int radius
    ) throws JsonProcessingException {
        String url =  "https://api.openchargemap.io/v3/poi/?output=json&latitude=" + lat +
                "&longitude=" + lng +
                "&distance=" + radius +
                "&distanceunit=Miles&compact=false&verbose=false&maxresults=20&key=" + apiKey;


        ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);
        JsonNode jsonNode = new ObjectMapper().readTree(response.getBody());

        List<StationDTO> stationDTOList = geoCodeService.OCMResoponseToStationDTO(jsonNode);
        return ResponseEntity.ok(stationDTOList);
    }
}
