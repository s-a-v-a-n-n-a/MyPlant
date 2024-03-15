package edu.phystech.myplant.service.converters;

import edu.phystech.myplant.data.Blog;
import edu.phystech.myplant.service.dto.BlogDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class BlogConverter {

  private final UserConverter userConverter;
  private final PlantConverter plantConverter;

  public BlogDto toDto(Blog blog) {
    BlogDto blogDto = new BlogDto();
    blogDto.setId(blog.getId());
    blogDto.setTitle(blog.getTitle());
    blogDto.setContent(blog.getContent());
    blogDto.setSnippet(blog.getSnippet());
    blogDto.setUser(userConverter.toDto(blog.getUser()));
    blogDto.setPlant(plantConverter.toDto(blog.getPlant()));


    return blogDto;
  }

  public Blog toEntity(BlogDto blogDto) {
    Blog blog = new Blog();
    blog.setId(blogDto.getId());
    blog.setTitle(blogDto.getTitle());
    blog.setContent(blogDto.getContent());
    blog.setSnippet(blogDto.getSnippet());
    blog.setUser(userConverter.toEntity(blogDto.getUser()));
    blog.setPlant(plantConverter.toEntity(blogDto.getPlant()));
    return blog;
  }
}
