package edu.phystech.myplant.service.api;

import edu.phystech.myplant.service.dto.BlogDto;
import java.util.List;

public interface BlogService {
    BlogDto createBlog(BlogDto blogDto);
    BlogDto getBlogById(Long blogId);
    BlogDto updateBlog(Long blogId, BlogDto blogDto);
    void deleteBlog(Long blogId);
    List<BlogDto> getBlogsByUser(Long userId);
    BlogDto getBlogByPlant(Long plantId);
    List<BlogDto> getPopularBlogs();
}
