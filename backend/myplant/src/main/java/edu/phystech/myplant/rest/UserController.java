package edu.phystech.myplant.rest;

import edu.phystech.myplant.data.User;
import edu.phystech.myplant.security.JwtTokenProvider;
import edu.phystech.myplant.service.api.JwtTokenService;
import edu.phystech.myplant.service.api.PlantService;
import edu.phystech.myplant.service.api.RoleService;
import edu.phystech.myplant.service.api.UserService;
import edu.phystech.myplant.service.converters.UserConverter;
import edu.phystech.myplant.service.dto.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;
import java.util.UUID;

import edu.phystech.myplant.security.UserPrincipal;

@CrossOrigin(origins="http://localhost:3000", maxAge = 3600)
@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    @Autowired
    private final UserService userService;
    private final PlantService plantService;
    private final RoleService roleService;
    @Autowired
    private final JwtTokenProvider jwtTokenProvider;
    private final JwtTokenService jwtTokenService;
    private final UserConverter userConverter;

    @GetMapping("/info/{userId}")
    public ResponseEntity<?> getInfoById(
            @RequestHeader("Authorization") final String jwtToken,
            @PathVariable Long userId
    ) {
        JwtTokenDto token = jwtTokenService.getTokenByName(jwtToken);
        if (!jwtTokenProvider.validateToken(jwtToken) || token == null) {
            return ResponseEntity.badRequest().body("No such token");
        }

        Long userIdFromDb = jwtTokenProvider.getUserIdFromToken(jwtToken);
        if (!Objects.equals(userIdFromDb, userId)) {
            return ResponseEntity.badRequest().body("Invalid operation");
        }

        UserDto userDto = userService.getUserById(userId);
        return ResponseEntity.ok(userDto);
    }

    @PutMapping("/{userId}")
    public ResponseEntity<?> putUserInfo(
            @RequestHeader("Authorization") final String jwtToken,
            @PathVariable Long userId,
            @RequestBody UserDto userInfo
    ) {
        JwtTokenDto token = jwtTokenService.getTokenByName(jwtToken);
        if (!jwtTokenProvider.validateToken(jwtToken) || token == null) {
            return ResponseEntity.badRequest().body("No such token");
        }

        Long userIdFromDb = jwtTokenProvider.getUserIdFromToken(jwtToken);
        if (!userIdFromDb.equals(userId)) {
            return ResponseEntity.badRequest().body("Invalid request");
        }

        UserDto user = userService.updateUser(userId, userInfo);
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(user);
    }

    @PostMapping("/auth/signin")
    public ResponseEntity<?> authenticateUser(@RequestBody AuthRequest authRequest) {
        if (userService.getUserByEmail(authRequest.getEmail()) == null) {
            return ResponseEntity.badRequest().body("Invalid credentials");
        }

        UserDto user = userService.authenticateUser(authRequest.getEmail(), authRequest.getPassword());
        if (user == null) {
            return ResponseEntity.badRequest().body("Invalid credentials");
        }

        String token = jwtTokenProvider.createToken(user.getId(), user.getEmail(), user.getUsername(), user.getRoles());
        jwtTokenService.createToken(new JwtTokenDto(Math.abs(UUID.randomUUID().getLeastSignificantBits()), token));
        return ResponseEntity.ok(new AuthResponse(token));
    }

    @GetMapping("/auth/signup")
    public ResponseEntity<?> registerUser(@RequestHeader("Authorization") final String jwtToken){
        if (!jwtTokenProvider.validateToken(jwtToken)) {
            return ResponseEntity.badRequest().body("No such token");
        }

        Long id = jwtTokenProvider.getUserIdFromToken(jwtToken);
        UserDto user = userService.getUserById(id);

        return ResponseEntity.ok(user);
    }

    @GetMapping("/logout")
    public ResponseEntity<?> logout(@RequestHeader("Authorization") final String jwtToken) {
        JwtTokenDto token = jwtTokenService.getTokenByName(jwtToken);
        if (!jwtTokenProvider.validateToken(jwtToken) || token == null) {
            return ResponseEntity.badRequest().body("No such token");
        } else {
            jwtTokenService.deleteById(token.getId());
        }

        return ResponseEntity.ok().body("Logged out");
    }

    @PostMapping("/auth/signup")
    public ResponseEntity<?> registerUser(@RequestBody final UserDto userDto) {
        RoleDto role = roleService.getRoleByName("USER");
        if (role == null) {
            role = roleService.createRole(new RoleDto(Math.abs(UUID.randomUUID().getLeastSignificantBits()), "USER"));
        }
        userDto.setRoles(List.of(role));
        if (!userService.saveUser(userDto)) {
            return ResponseEntity.badRequest().body("User with such email exists");
        }

        User user = userConverter.toEntity(userService.getUserByEmail(userDto.getEmail()));
        String token = jwtTokenProvider.generateToken(new UserPrincipal(user.getId(), user.getEmail(),
                user.getPassword(), user.getRoles()));
        jwtTokenService.createToken(new JwtTokenDto(Math.abs(UUID.randomUUID().getLeastSignificantBits()), token));
        return ResponseEntity.ok(new AuthResponse(token));
    }

    @GetMapping("/plants")
    public ResponseEntity<?> getPlants(@RequestHeader("Authorization") final String jwtToken) {
        JwtTokenDto token = jwtTokenService.getTokenByName(jwtToken);
        if (!jwtTokenProvider.validateToken(jwtToken) || token == null) {
            return ResponseEntity.badRequest().body("No such token");
        }

        Long userId = jwtTokenProvider.getUserIdFromToken(jwtToken);
        List<PlantDto> plants = plantService.getUserPlants(userId);

        return ResponseEntity.ok(plants);
    }
}
