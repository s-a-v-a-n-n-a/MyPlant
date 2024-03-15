package edu.phystech.myplant.service.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LikeDto {
    private Long id;
    private UserDto user;
    private BlogCommentDto comment;

}
