package com.evfinder.backend.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class ResultDTO {

    @JsonProperty("geometry")
    private GeometryDTO geometryDTO;

    @JsonProperty("components")
    private ComponentsDTO componentsDTO;
}
