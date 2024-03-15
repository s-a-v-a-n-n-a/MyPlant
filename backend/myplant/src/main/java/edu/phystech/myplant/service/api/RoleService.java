package edu.phystech.myplant.service.api;

import edu.phystech.myplant.service.dto.RoleDto;

public interface RoleService {
    RoleDto createRole(RoleDto roleDto);
    boolean saveRole(RoleDto role);

    RoleDto getRoleById(Long roleId);
    RoleDto getRoleByName(String roleName);
}
