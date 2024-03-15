package edu.phystech.myplant.service.dto;

import edu.phystech.myplant.data.Image;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {
    private Long id;
    private String username;
    private String email;
    private String name;
    private String surname;
    private String password;
    private ImageDto image;
    private List<RoleDto> roles;
}