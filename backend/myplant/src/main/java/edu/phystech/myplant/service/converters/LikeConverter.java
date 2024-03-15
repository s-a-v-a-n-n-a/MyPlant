package edu.phystech.myplant.service.converters;

import edu.phystech.myplant.data.LikeReaction;
import edu.phystech.myplant.service.dto.LikeDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class LikeConverter {

  private final UserConverter userConverter;
  private final BlogCommentConverter blogCommentConverter;

  public LikeDto toDto(LikeReaction like) {
    LikeDto likeDto = new LikeDto();
    likeDto.setId(like.getId());
    likeDto.setUser(userConverter.toDto(like.getUser()));
    likeDto.setComment(blogCommentConverter.toDto(like.getComment()));
    return likeDto;
  }

  public LikeReaction toEntity(LikeDto likeDto) {
    LikeReaction like = new LikeReaction();
    like.setId(likeDto.getId());
    like.setUser(userConverter.toEntity(likeDto.getUser()));
    like.setComment(blogCommentConverter.toEntity(likeDto.getComment()));
    return like;
  }
}
