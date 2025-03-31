package com.evfinder.backend;

import com.evfinder.backend.dto.GeometryDTO;
import com.evfinder.backend.dto.OpenCageResponseDTO;
import com.evfinder.backend.dto.ResultDTO;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.util.Map;
import java.util.regex.Pattern;

@RestController
@RequestMapping("/api/geo")
public class GeoCodeController {

    @Value("${opencage.api.key}")
    private String apiKey;

    private static final Pattern US_ZIP_PATTERN = Pattern.compile("^\\d{5}(-\\d{4})?$");

    private final RestTemplate restTemplate = new RestTemplate();

    @GetMapping("/zip")
    public ResponseEntity<Map<String, Double>> getCoordsByZip(@RequestParam String zip) throws JsonProcessingException {
        if (!US_ZIP_PATTERN.matcher(zip).matches()) {
            return ResponseEntity.badRequest().body(Map.of("Incorrect Zipcode format", -999.0));
        }

        String url = "https://api.opencagedata.com/geocode/v1/json?q=" + zip + "&key=" + apiKey + "&countrycode=us";

        ResponseEntity<OpenCageResponseDTO> response = restTemplate.getForEntity(url, OpenCageResponseDTO.class);

        System.out.println("Response body: " + new ObjectMapper().writeValueAsString(response.getBody()));

        OpenCageResponseDTO data = response.getBody();

        if(data == null || data.getResults() == null || data.getResults().isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("Data is null", -999.0));
        }

        ResultDTO results = data.getResults().getFirst();
        if(!"us".equalsIgnoreCase(results.getComponentsDTO().getCountry_code())) {
            return ResponseEntity.badRequest().body(Map.of("Non US zipcode", -999.0));
        }

        GeometryDTO geometryDTO = results.getGeometryDTO();
        Double lat = geometryDTO.getLat();
        Double lon = geometryDTO.getLon();

        if(lat == null || lon == null) {
            return ResponseEntity.badRequest().body(Map.of("lat or lon is null", -999.0));
        }

        return ResponseEntity.ok(Map.of("lat", geometryDTO.getLat(), "lng", geometryDTO.getLon()));
    }
}
