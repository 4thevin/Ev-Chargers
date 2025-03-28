package com.evfinder.backend.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class GeometryDTO {
    private Double lat;

    @JsonProperty("lng")
    private Double lon;
}
