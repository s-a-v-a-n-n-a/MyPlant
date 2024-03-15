package edu.phystech.myplant.service.api;

import edu.phystech.myplant.service.dto.PlantDto;

import java.sql.Date;
import java.util.List;

public interface PlantService {
    PlantDto createPlant(PlantDto plantDto);
    PlantDto getPlantById(Long plantId);
    PlantDto updatePlant(Long plantId, PlantDto plantDto);
    PlantDto putFirstWateringDate(String plantName, Date firstWateringTime);
    void deletePlant(Long plantId);
    List<PlantDto> getUserPlants(Long userId);
    Integer getDefaultWateringInterval(String plantName);
    PlantDto getPlantInfo(String plantName);
}
