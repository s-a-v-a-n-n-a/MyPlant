package edu.phystech.myplant.service.api;

import edu.phystech.myplant.service.dto.UserDto;
import java.util.List;

public interface UserService {
    UserDto createUser(UserDto userDto);
    UserDto getUserById(Long userId);
    UserDto getUserByEmail(String email);
    UserDto updateUser(Long userId, UserDto userDto);
    boolean saveUser(UserDto user);
    void deleteUser(Long userId);
    List<UserDto> getAllUsers();

    UserDto authenticateUser(String email, String password);
}
