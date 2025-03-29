package com.evfinder.backend.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class ComponentsDTO {

    @JsonProperty("country_code")
    private String country_code;
}
