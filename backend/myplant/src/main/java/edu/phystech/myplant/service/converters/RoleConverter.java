package edu.phystech.myplant.service.converters;

import edu.phystech.myplant.data.Role;
import edu.phystech.myplant.service.dto.RoleDto;
import org.springframework.stereotype.Component;

@Component
public class RoleConverter {
    public RoleDto toDto(Role role) {
        RoleDto roleDto = new RoleDto();
        roleDto.setId(role.getId());
        roleDto.setName(role.getName());
        return roleDto;
    }

    public Role toEntity(RoleDto roleDto) {
        Role role = new Role();
        role.setId(roleDto.getId());
        role.setName(roleDto.getName());
        return role;
    }
}
