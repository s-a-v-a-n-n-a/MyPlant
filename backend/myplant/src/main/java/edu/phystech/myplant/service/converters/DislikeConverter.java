package edu.phystech.myplant.service.converters;

import edu.phystech.myplant.data.DislikeReaction;
import edu.phystech.myplant.service.dto.DislikeDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DislikeConverter {

  private final UserConverter userConverter;
  private final BlogCommentConverter blogCommentConverter;

  public DislikeDto toDto(DislikeReaction dislike) {
    DislikeDto dislikeDto = new DislikeDto();
    dislikeDto.setId(dislike.getId());
    dislikeDto.setUser(userConverter.toDto(dislike.getUser()));
    dislikeDto.setComment(blogCommentConverter.toDto(dislike.getComment()));
    return dislikeDto;
  }

  public DislikeReaction toEntity(DislikeDto dislikeDto) {
    DislikeReaction dislike = new DislikeReaction();
    dislike.setId(dislikeDto.getId());
    dislike.setUser(userConverter.toEntity(dislikeDto.getUser()));
    dislike.setComment(blogCommentConverter.toEntity(dislikeDto.getComment()));
    return dislike;
  }
}
