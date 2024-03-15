package edu.phystech.myplant.service;

import edu.phystech.myplant.data.BlogComment;
import edu.phystech.myplant.data.LikeReaction;
import edu.phystech.myplant.data.repo.BlogCommentRepository;
import edu.phystech.myplant.data.repo.LikeReactionRepository;
import edu.phystech.myplant.service.api.LikeService;
import edu.phystech.myplant.service.converters.LikeConverter;
import edu.phystech.myplant.service.dto.LikeDto;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LikeServiceImpl implements LikeService {

    private final LikeReactionRepository likeRepository;
    private final LikeConverter likeConverter;
    private final BlogCommentRepository blogCommentRepository;

    @Override
    public LikeDto addLike(Long commentId) {
        BlogComment comment = blogCommentRepository.findById(commentId).orElse(null);
        if (comment == null) {
            return null;
        }

        LikeReaction like = new LikeReaction();
        like.setComment(comment);

        LikeReaction savedLike = likeRepository.save(like);
        return likeConverter.toDto(savedLike);
    }

    @Override
    public void removeLike(Long likeId) {
        likeRepository.deleteById(likeId);
    }

    @Override
    public List<LikeDto> getLikesByComment(Long commentId) {
        List<LikeReaction> likes = likeRepository.findByCommentId(commentId);
        return likes.stream()
                .map(likeConverter::toDto)
                .toList();
    }

    public static class RoleServiceImpl {
    }
}
