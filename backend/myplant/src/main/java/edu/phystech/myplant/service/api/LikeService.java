package edu.phystech.myplant.service.api;

import edu.phystech.myplant.service.dto.LikeDto;
import java.util.List;

public interface LikeService {
    LikeDto addLike(Long blogId);
    void removeLike(Long likeId);
    List<LikeDto> getLikesByComment(Long commentId);
}
