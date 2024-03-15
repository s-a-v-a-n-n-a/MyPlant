package edu.phystech.myplant.service;


import edu.phystech.myplant.data.Role;
import edu.phystech.myplant.data.repo.RoleRepository;
import edu.phystech.myplant.service.api.RoleService;
import edu.phystech.myplant.service.converters.RoleConverter;
import edu.phystech.myplant.service.dto.RoleDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RoleServiceImpl implements RoleService {
    private final RoleRepository roleRepository;
    private final RoleConverter roleConverter;

    @Override
    public RoleDto createRole(RoleDto roleDto) {
        Role role = roleConverter.toEntity(roleDto);
        Role savedRole = roleRepository.save(role);
        return roleConverter.toDto(savedRole);
    }

    @Override
    public boolean saveRole(RoleDto role) {
        Role roleFromDB = roleRepository.findById(role.getId()).orElse(null);
        if (roleFromDB == null) {
            return false;
        }

        RoleDto newRole = new RoleDto();
        newRole.setId(role.getId());
        newRole.setName(role.getName());

        roleRepository.save(roleConverter.toEntity(newRole));

        return true;
    }

    @Override
    public RoleDto getRoleById(Long roleId) {
        Role role = roleRepository.findById(roleId).orElse(null);
        if (role == null) {
            return null;
        }
        return roleConverter.toDto(role);
    }

    @Override
    public RoleDto getRoleByName(String roleName) {
        Role role = roleRepository.findByName(roleName);
        if (role == null) {
            return null;
        }
        return roleConverter.toDto(role);
    }
}
