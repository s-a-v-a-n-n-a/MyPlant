package edu.phystech.myplant.rest;
import edu.phystech.myplant.service.api.LikeService;
import edu.phystech.myplant.service.dto.LikeDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins="*")
@RestController
@RequestMapping("/comments/{blogCommentId}/likes")
@RequiredArgsConstructor
public class LikeController {
    
    
    private final LikeService likeService;
    
    // Эндпоинт для добавления лайка к комментарию
    @PostMapping
    public ResponseEntity<LikeDto> addLikeToBlogComment(@PathVariable Long blogCommentId) {
        LikeDto like = likeService.addLike(blogCommentId);
        return ResponseEntity.status(HttpStatus.CREATED).body(like);
    }
    
    // Эндпоинт для удаления лайка из комментария
    @DeleteMapping("/{likeId}")
    public ResponseEntity<Void> removeLikeFromBlogComment(@PathVariable Long likeId) {
        likeService.removeLike(likeId);
        return ResponseEntity.noContent().build();
    }
}

