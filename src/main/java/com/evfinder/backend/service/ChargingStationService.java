package com.evfinder.backend.service;

import com.evfinder.backend.dto.StationDTO;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ChargingStationService {

    private final RestTemplate restTemplate;
    private final GeoCodeService geoCodeService;

    @Value("${openchargemap.api.key}")
    private String apiKey;

    @Cacheable(value = "stationsLocationCache", key = "#lat + '-' + #lng + '-' + #radius")
    public List<StationDTO> getChargingStations(double lat, double lng, int radius) throws JsonProcessingException {
        String url = "https://api.openchargemap.io/v3/poi/?output=json&latitude=" + lat +
                "&longitude=" + lng +
                "&distance=" + radius +
                "&distanceunit=Miles&compact=false&verbose=false&maxresults=20&key=" + apiKey;

        System.out.println("OCM Request URL: " + url);

        ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);
        JsonNode jsonNode = new ObjectMapper().readTree(response.getBody());

        return geoCodeService.mapOCMToDTO(jsonNode);
    }

}
