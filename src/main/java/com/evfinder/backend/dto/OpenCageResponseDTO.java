package com.evfinder.backend.dto;

import lombok.Data;

import java.util.List;

@Data
public class OpenCageResponseDTO {
    private List<ResultDTO> resultDTOS;
}
