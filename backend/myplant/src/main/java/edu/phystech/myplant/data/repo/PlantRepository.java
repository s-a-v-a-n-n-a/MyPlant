
package edu.phystech.myplant.data.repo;

import edu.phystech.myplant.data.Plant;
import edu.phystech.myplant.data.User;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlantRepository extends JpaRepository<Plant, Long> {
    List<Plant> findByUser(User user);

    List<Plant> findByUserId(Long userId);

    Plant findByName(String name);
}
