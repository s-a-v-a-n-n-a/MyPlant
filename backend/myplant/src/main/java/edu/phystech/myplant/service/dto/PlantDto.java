package edu.phystech.myplant.service.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PlantDto {
    private Long id;
    private String name;
    private Long age;
    private Integer wateringInterval;
    private Date firstWateringDate;
    private ImageDto image;
    private UserDto user;
}