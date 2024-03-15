package edu.phystech.myplant.service.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BlogCommentDto {
    private Long id;
    private String content;
    private Long indexNumber;
    private BlogDto blog;
    private UserDto user;
}
