package edu.phystech.myplant.service;

import edu.phystech.myplant.data.Plant;
import edu.phystech.myplant.data.repo.PlantRepository;
import edu.phystech.myplant.service.api.PlantService;
import edu.phystech.myplant.service.converters.PlantConverter;
import edu.phystech.myplant.service.dto.PlantDto;

import java.sql.Date;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PlantServiceImpl implements PlantService {

  private final PlantRepository plantRepository;
  private final PlantConverter plantConverter;

  @Override
  public PlantDto createPlant(PlantDto plantDto) {
    Plant plant = plantConverter.toEntity(plantDto);
    Plant savedPlant = plantRepository.save(plant);
    return plantConverter.toDto(savedPlant);
  }

  @Override
  public PlantDto getPlantById(Long plantId) {
    Plant plant = plantRepository.findById(plantId).orElse(null);
    return plantConverter.toDto(plant);
  }

  @Override
  public PlantDto updatePlant(Long plantId, PlantDto plantDto) {
    Plant existingPlant = plantRepository.findById(plantId).orElse(null);
    if (existingPlant == null) {
      return null;
    }


    existingPlant.setName(plantDto.getName());
    existingPlant.setWateringInterval(plantDto.getWateringInterval());

    Plant updatedPlant = plantRepository.save(existingPlant);
    return plantConverter.toDto(updatedPlant);
  }

  @Override
  public void deletePlant(Long plantId) {
    plantRepository.deleteById(plantId);
  }

  @Override
  public List<PlantDto> getUserPlants(Long userId) {
    List<Plant> plants = plantRepository.findByUserId(userId);
    return plants.stream()
        .map(plantConverter::toDto)
        .toList();
  }

  @Override
  public Integer getDefaultWateringInterval(String plantName) {
    Plant plant = plantRepository.findByName(plantName);
    return plant.getWateringInterval();
  }

  @Override
  public PlantDto putFirstWateringDate(String plantName, Date firstWateringTime) {
    Plant plant = plantRepository.findByName(plantName);
    plant.setFirstWateringDate(firstWateringTime);
    return plantConverter.toDto(plant);
  }

  @Override
  public PlantDto getPlantInfo(String plantName) {
    Plant plant = plantRepository.findByName(plantName);
    return plantConverter.toDto(plant);
  }
}
