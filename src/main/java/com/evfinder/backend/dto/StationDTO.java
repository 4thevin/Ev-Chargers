package com.evfinder.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StationDTO {
    private String name;
    private String address;
    private String city;
    private String state;
    private String distance;
    private double lat;
    private double lng;
    private List<String> chargerTypes;
    private String operator;
    private String websiteUrl;
    private String usageCost;
    private String contact;
    private String usageType;
}
