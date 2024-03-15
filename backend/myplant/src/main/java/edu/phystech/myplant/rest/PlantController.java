package edu.phystech.myplant.rest;

import edu.phystech.myplant.data.JwtToken;
import edu.phystech.myplant.data.User;
import edu.phystech.myplant.data.repo.JwtTokenRepository;
import edu.phystech.myplant.data.repo.UserRepository;
import edu.phystech.myplant.security.JwtTokenProvider;
import edu.phystech.myplant.service.api.JwtTokenService;
import edu.phystech.myplant.service.api.PlantService;
import edu.phystech.myplant.service.api.UserService;
import edu.phystech.myplant.service.converters.UserConverter;
import edu.phystech.myplant.service.dto.AuthRequest;
import edu.phystech.myplant.service.dto.JwtTokenDto;
import edu.phystech.myplant.service.dto.PlantDto;
import edu.phystech.myplant.service.dto.UserDto;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;

@CrossOrigin(origins="http://localhost:3000", maxAge = 3600)
@RestController
@RequestMapping("/plants")
@RequiredArgsConstructor
public class PlantController {

    private final PlantService plantService;

    @Autowired
    private final JwtTokenProvider jwtTokenProvider;
    private final JwtTokenService jwtTokenService;
//    private final JwtTokenRepository tokenRepository;

    @Autowired
    private final UserService userService;
    private final UserConverter userConverter;
    @GetMapping("/info")
    public ResponseEntity<PlantDto> getPlantInfo(@RequestParam String plantName) {
        PlantDto plant = plantService.getPlantInfo(plantName);
        if (plant == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(plant);
    }

    @PostMapping
    public ResponseEntity<?> postPlantInfo(@RequestHeader("Authorization") final String jwtToken,
                                                  @RequestBody PlantDto plantInfo) {
        JwtTokenDto token = jwtTokenService.getTokenByName(jwtToken);
        if (!jwtTokenProvider.validateToken(jwtToken) || token == null) {
            return ResponseEntity.badRequest().body("No such token");
        }
        UserDto user = userService.getUserById(jwtTokenProvider.getUserIdFromToken(jwtToken));
        if (user == null) {
            return ResponseEntity.badRequest().body("Invalid token");
        }
        plantInfo.setUser(user);

        PlantDto plant = plantService.createPlant(plantInfo);
        return ResponseEntity.ok(plant);
    }
    
    @GetMapping("/default-watering-interval")
    public ResponseEntity<Integer> getDefaultWateringInterval(@RequestParam String plantName) {
        Integer defaultWateringInterval = plantService.getDefaultWateringInterval(plantName);
        if (defaultWateringInterval == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(defaultWateringInterval);
    }

    @GetMapping("/{$plantId}/first-watering-date")
    public ResponseEntity<Date> getFirstWateringDate(@PathVariable Long plantId) {
        PlantDto plant = plantService.getPlantById(plantId);
        if (plant == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(plant.getFirstWateringDate());
    }

    @PutMapping("/{$plantId}/first-watering-date")
    public ResponseEntity<PlantDto> putFirstWateringDate(
            @PathVariable Long plantId,
            @RequestParam Date firstWateringDate) {
        PlantDto plant = plantService.getPlantById(plantId);
        if (plant == null) {
            return ResponseEntity.notFound().build();
        }
        PlantDto resultPlant = plantService.putFirstWateringDate(plant.getName(), firstWateringDate);
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(resultPlant);
    }

    @DeleteMapping("/{plantId}")
    public ResponseEntity<?> removePlantFromUser(@RequestHeader("Authorization") final String jwtToken,
                                                    @PathVariable Long plantId) {
        JwtTokenDto token = jwtTokenService.getTokenByName(jwtToken);
        if (!jwtTokenProvider.validateToken(jwtToken) || token == null) {
            return ResponseEntity.badRequest().body("No such token");
        }
        plantService.deletePlant(plantId);
        return ResponseEntity.ok(plantId);
    }
}
