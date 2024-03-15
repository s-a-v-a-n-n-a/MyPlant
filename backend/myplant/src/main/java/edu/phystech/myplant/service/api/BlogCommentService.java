package edu.phystech.myplant.service.api;

import edu.phystech.myplant.service.dto.BlogCommentDto;
import java.util.List;

public interface BlogCommentService {
    BlogCommentDto createComment(BlogCommentDto commentDto);
    BlogCommentDto getCommentById(Long commentId);
    BlogCommentDto updateComment(Long commentId, BlogCommentDto commentDto);
    void deleteComment(Long commentId);
    List<BlogCommentDto> getCommentsByBlog(Long blogId);
}
