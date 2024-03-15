package edu.phystech.myplant.service.api;

import edu.phystech.myplant.service.dto.DislikeDto;
import java.util.List;

public interface DislikeService {
    DislikeDto addDislike(Long blogId);
    void removeDislike(Long dislikeId);
    List<DislikeDto> getDislikesByComment(Long commentId);
}
