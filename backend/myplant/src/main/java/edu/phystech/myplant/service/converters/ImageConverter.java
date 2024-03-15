package edu.phystech.myplant.service.converters;

import edu.phystech.myplant.data.Image;
import edu.phystech.myplant.service.dto.ImageDto;
import org.springframework.stereotype.Component;

@Component
public class ImageConverter {
    public ImageDto toDto(Image image) {
        if (image == null) {
            return null;
        }
        ImageDto imageDto = new ImageDto();
        imageDto.setId(image.getId());
        imageDto.setImageUri(image.getImageUri());
        return imageDto;
    }

    public Image toEntity(ImageDto imageDto) {
        if (imageDto == null) {
            return null;
        }
        Image image = new Image();
        image.setId(imageDto.getId());
        image.setImageUri(imageDto.getImageUri());
        return image;
    }
}
