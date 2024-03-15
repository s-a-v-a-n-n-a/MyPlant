package edu.phystech.myplant.data.repo;

import edu.phystech.myplant.data.Blog;
import edu.phystech.myplant.data.BlogComment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BlogCommentRepository extends JpaRepository<BlogComment, Long> {
    List<BlogComment> findByBlog(Blog blog);
    List<BlogComment> findByBlogId(Long blogId);
}
