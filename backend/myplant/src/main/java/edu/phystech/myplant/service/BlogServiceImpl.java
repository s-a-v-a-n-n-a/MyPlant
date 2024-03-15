package edu.phystech.myplant.service;

import edu.phystech.myplant.data.Blog;
import edu.phystech.myplant.data.repo.BlogRepository;
import edu.phystech.myplant.service.api.BlogService;
import edu.phystech.myplant.service.converters.BlogConverter;
import edu.phystech.myplant.service.dto.BlogDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BlogServiceImpl implements BlogService {

    private final BlogRepository blogRepository;
    private final BlogConverter blogConverter;

    @Override
    public BlogDto createBlog(BlogDto blogDto) {
        Blog blog = blogConverter.toEntity(blogDto);
        Blog savedBlog = blogRepository.save(blog);
        return blogConverter.toDto(savedBlog);
    }

    @Override
    public BlogDto getBlogById(Long blogId) {
        Blog blog = blogRepository.findById(blogId).orElse(null);
        if (blog == null) {
            return null;
        }
        return blogConverter.toDto(blog);
    }

    @Override
    public BlogDto updateBlog(Long blogId, BlogDto blogDto) {
        Blog existingBlog = blogRepository.findById(blogId).orElse(null);
        if (existingBlog == null) {
            return null;
        }

        existingBlog.setTitle(blogDto.getTitle());
        existingBlog.setContent(blogDto.getContent());
        existingBlog.setSnippet(blogDto.getSnippet());

        Blog updatedBlog = blogRepository.save(existingBlog);
        return blogConverter.toDto(updatedBlog);
    }

    @Override
    public void deleteBlog(Long blogId) {
        blogRepository.deleteById(blogId);
    }

    @Override
    public List<BlogDto> getBlogsByUser(Long userId) {
        List<Blog> blogs = blogRepository.findByUserId(userId);
        return blogs.stream()
            .map(blogConverter::toDto)
            .toList();
    }

    @Override
    public BlogDto getBlogByPlant(Long plantId) {
        Blog blog = blogRepository.findByPlantId(plantId);
        if (blog == null) {
            return null;
        }
        return blogConverter.toDto(blog);
    }

    @Override
    public List<BlogDto> getPopularBlogs() {
        List<Long> popularBlogIds = blogRepository.findPopularBlogs();
        List<Blog> popularBlogs = new ArrayList<>();
        for (Long id: popularBlogIds) {
            Blog blog = blogRepository.findById(id).orElse(null);
            if (blog == null) {
                continue;
            }
            popularBlogs.add(blog);
        }

        return popularBlogs.stream()
            .map(blogConverter::toDto)
            .toList();
    }
}
