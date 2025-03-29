package com.evfinder.backend.service;

import com.evfinder.backend.dto.StationDTO;
import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class GeoCodeService {

    public List<StationDTO> mapOCMToDTO(JsonNode response) {
        List<StationDTO> stationDTOList = new ArrayList<>();

        for (JsonNode station : response) {
            JsonNode address = station.path("AddressInfo");
            JsonNode usageTypeNode = station.path("UsageType");
            String usageTitle = usageTypeNode.path("Title").asText("").toLowerCase();

            if(!usageTitle.contains("public")) continue;

            String name = address.path("Title").asText();
            String street = address.path("AddressLine1").asText();
            String city = address.path("Town").asText();
            String state = address.path("StateOrProvince").asText();
            String distance = address.path("Distance").asText();
            double lat = address.path("Latitude").asDouble();
            double lng = address.path("Longitude").asDouble();
            String contact = address.path("PhonePrimaryContact").asText(null);

            List<String> chargerTypes = new ArrayList<>();
            for (JsonNode charger : station.path("Connections")) {
                String type = charger.path("ConnectionType").path("Title").asText(null);
                if (type != null) {
                    chargerTypes.add(type);
                }
            }

            String operator = station.path("OperatorInfo").path("Title").asText(null);
            String websiteUrl = station.path("OperatorInfo").path("WebsiteURL").asText(null);
            String usageCost = station.path("UsageCost").asText(null);
            String usageType = usageTypeNode.path("Title").asText();

            stationDTOList.add(new StationDTO(
                    name, street, city, state, distance, lat, lng, chargerTypes, operator, websiteUrl, contact, usageCost, usageType
            ));
        }

        return stationDTOList;
    }
}

