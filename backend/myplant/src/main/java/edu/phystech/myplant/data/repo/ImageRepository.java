package edu.phystech.myplant.data.repo;

import edu.phystech.myplant.data.Blog;
import edu.phystech.myplant.data.Image;
import edu.phystech.myplant.data.Plant;
import edu.phystech.myplant.data.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ImageRepository extends JpaRepository<Image, Long> {
    Image findByUser(User user);
    Image findByUserId(Long userId);

    Image findByBlog(Blog blog);
    Image findByBlogId(Long blogId);

    Image findByPlant(Plant plant);
    Image findByPlantId(Long plantId);
}
