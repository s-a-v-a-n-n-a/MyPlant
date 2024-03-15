package edu.phystech.myplant.service.dto;

import edu.phystech.myplant.data.BlogComment;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BlogDto {
    private Long id;
    private String title;
    private String content;
    private String snippet;
    private UserDto user;
    private PlantDto plant;
    private ImageDto image;
}
