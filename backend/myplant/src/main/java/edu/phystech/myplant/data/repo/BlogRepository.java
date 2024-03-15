package edu.phystech.myplant.data.repo;

import edu.phystech.myplant.data.Blog;
import edu.phystech.myplant.data.Plant;
import edu.phystech.myplant.data.User;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BlogRepository extends JpaRepository<Blog, Long> {
  List<Blog> findByUser(User user);

  List<Blog> findByPlant(Plant plant);

  Blog findByPlantId(Long plantId);

  List<Long> findPopularBlogs();

  List<Blog> findByUserId(Long userId);
}
