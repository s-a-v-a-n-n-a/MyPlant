package edu.phystech.myplant.data.repo;

import edu.phystech.myplant.data.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Role findByName(String name);
}
