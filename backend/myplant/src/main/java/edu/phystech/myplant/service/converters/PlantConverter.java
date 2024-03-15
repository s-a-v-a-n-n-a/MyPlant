package edu.phystech.myplant.service.converters;

import edu.phystech.myplant.data.Plant;
import edu.phystech.myplant.service.dto.PlantDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class PlantConverter {

    private final UserConverter userConverter;
    private final ImageConverter imageConverter;
    public PlantDto toDto(Plant plant) {
        PlantDto plantDto = new PlantDto();
        plantDto.setId(plant.getId());
        plantDto.setName(plant.getName());
        plantDto.setWateringInterval(plant.getWateringInterval());
        plantDto.setFirstWateringDate(plant.getFirstWateringDate());
        plantDto.setUser(userConverter.toDto(plant.getUser()));
        plantDto.setImage(imageConverter.toDto(plant.getImage()));
        return plantDto;
    }

    public Plant toEntity(PlantDto plantDto) {
        Plant plant = new Plant();
        plant.setId(plantDto.getId());
        plant.setName(plantDto.getName());
        plant.setWateringInterval(plantDto.getWateringInterval());
        plant.setFirstWateringDate(plantDto.getFirstWateringDate());
        plant.setUser(userConverter.toEntity(plantDto.getUser()));
        plant.setImage(imageConverter.toEntity(plantDto.getImage()));
        return plant;
    }
}
