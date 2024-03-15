package edu.phystech.myplant.service.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ImageDto {
    private Long id;
    private String imageUri;
    private UserDto user;
    private BlogDto blog;
    private PlantDto plant;
}

