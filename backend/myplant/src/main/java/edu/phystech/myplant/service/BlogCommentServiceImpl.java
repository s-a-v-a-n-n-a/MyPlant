package edu.phystech.myplant.service;

import edu.phystech.myplant.data.BlogComment;
import edu.phystech.myplant.data.repo.BlogCommentRepository;
import edu.phystech.myplant.service.api.BlogCommentService;
import edu.phystech.myplant.service.converters.BlogCommentConverter;
import edu.phystech.myplant.service.dto.BlogCommentDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BlogCommentServiceImpl implements BlogCommentService {

    private final BlogCommentConverter blogCommentConverter;
    private final BlogCommentRepository blogCommentRepository;


    @Override
    public BlogCommentDto createComment(BlogCommentDto commentDto) {
        BlogComment comment = blogCommentConverter.toEntity(commentDto);
        BlogComment savedComment = blogCommentRepository.save(comment);
        return blogCommentConverter.toDto(savedComment);
    }

    @Override
    public BlogCommentDto getCommentById(Long commentId) {
        BlogComment comment = blogCommentRepository.findById(commentId).orElse(null);
        return blogCommentConverter.toDto(comment);
    }

    @Override
    public BlogCommentDto updateComment(Long commentId, BlogCommentDto commentDto) {
        BlogComment existingComment = blogCommentRepository.findById(commentId).orElse(null);
        if (existingComment == null) {
            return null;
        }

        existingComment.setContent(commentDto.getContent());

        BlogComment updatedComment = blogCommentRepository.save(existingComment);
        return blogCommentConverter.toDto(updatedComment);
    }

    @Override
    public void deleteComment(Long commentId) {
        blogCommentRepository.deleteById(commentId);
    }

    @Override
    public List<BlogCommentDto> getCommentsByBlog(Long blogId) {
        List<BlogComment> comments = blogCommentRepository.findByBlogId(blogId);
        comments.sort((c1, c2) -> Math.toIntExact(c1.getIndexNumber() - c2.getIndexNumber()));
        return comments.stream()
            .map(blogCommentConverter::toDto)
            .toList();
    }
}
