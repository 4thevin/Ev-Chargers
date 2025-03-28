package com.evfinder.backend.service;

import com.evfinder.backend.dto.StationDTO;
import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class GeoCodeService {

    public List<StationDTO> OCMResoponseToStationDTO(JsonNode response) {
        List<StationDTO> stationDTOList = new ArrayList<>();

        for (JsonNode station : response) {
            JsonNode address = station.path("AddressInfo");

            String name = station.path("Title").asText();
            String street = station.path("AddressLine1").asText();
            String city = station.path("Town").asText();
            String state = station.path("StateOrProvince").asText();
            double lat = station.path("Latitude").asDouble();
            double lng = station.path("Longitude").asDouble();

            List<String> chargerTypes = new ArrayList<>();
            for (JsonNode charger : station.path("Connections")) {
                String type = charger.path("ConnectionType").path("Title").asText(null);
                if (type != null) {
                    chargerTypes.add(type);
                }
            }

            String operator = station.path("OperatorInfo").path("Title").asText(null);
            String websiteUrl = station.path("OperatorInfo").path("WebsiteURL").asText(null);
            String contact = station.path("OperationInfo").path("PhonePrimaryContact").asText(null);
            String usageCost = station.path("UsageCost").asText(null);

            stationDTOList.add(new StationDTO(name, street, city, state, lat, lng, chargerTypes, operator, websiteUrl, contact, usageCost ));
        }

        return stationDTOList;
    }
}

