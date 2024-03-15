package edu.phystech.myplant.rest;

import edu.phystech.myplant.service.api.DislikeService;
import edu.phystech.myplant.service.dto.DislikeDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins="*")
@RestController
@RequestMapping("/comments/{blogCommentId}/dislikes")
@RequiredArgsConstructor
public class DislikeController {

  private final DislikeService dislikeService;

  @PostMapping
  public ResponseEntity<DislikeDto> addDislikeToBlogComment(@PathVariable Long blogCommentId) {
    DislikeDto dislike = dislikeService.addDislike(blogCommentId);
    return ResponseEntity.status(HttpStatus.CREATED).body(dislike);
  }

  @DeleteMapping("/{dislikeId}")
  public ResponseEntity<Void> removeDislikeFromBlogComment(@PathVariable Long dislikeId) {
    dislikeService.removeDislike(dislikeId);
    return ResponseEntity.noContent().build();
  }
}