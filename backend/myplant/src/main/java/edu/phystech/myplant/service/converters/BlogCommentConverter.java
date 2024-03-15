package edu.phystech.myplant.service.converters;

import edu.phystech.myplant.data.BlogComment;
import edu.phystech.myplant.service.dto.BlogCommentDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class BlogCommentConverter {

    private final BlogConverter blogConverter;
    private final UserConverter userConverter;

    public BlogCommentDto toDto(BlogComment blogComment) {
        BlogCommentDto commentDto = new BlogCommentDto();
        commentDto.setId(blogComment.getId());
        commentDto.setContent(blogComment.getContent());
        commentDto.setIndexNumber(blogComment.getIndexNumber());
        commentDto.setUser(userConverter.toDto(blogComment.getUser()));
        commentDto.setBlog(blogConverter.toDto(blogComment.getBlog()));
        return commentDto;
    }

    public BlogComment toEntity(BlogCommentDto commentDto) {
        BlogComment blogComment = new BlogComment();
        blogComment.setId(commentDto.getId());
        blogComment.setContent(commentDto.getContent());
        blogComment.setIndexNumber(commentDto.getIndexNumber());
        blogComment.setUser(userConverter.toEntity(commentDto.getUser()));
        blogComment.setBlog(blogConverter.toEntity(commentDto.getBlog()));
        return blogComment;
    }
}
