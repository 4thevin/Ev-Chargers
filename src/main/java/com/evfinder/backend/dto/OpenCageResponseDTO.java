package com.evfinder.backend.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.List;

@Data
public class OpenCageResponseDTO {

    @JsonProperty("results")
    private List<ResultDTO> resultDTOS;
}
