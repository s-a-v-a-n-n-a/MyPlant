package edu.phystech.myplant.service;

import edu.phystech.myplant.data.BlogComment;
import edu.phystech.myplant.data.DislikeReaction;
import edu.phystech.myplant.data.repo.*;
import edu.phystech.myplant.service.api.DislikeService;
import edu.phystech.myplant.service.converters.DislikeConverter;
import edu.phystech.myplant.service.dto.DislikeDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DislikeServiceImpl implements DislikeService {

    private final DislikeReactionRepository dislikeRepository;
    private final DislikeConverter dislikeConverter;
    private final BlogCommentRepository blogCommentRepository;

    @Override
    public DislikeDto addDislike(Long blogId) {
        BlogComment comment = blogCommentRepository.findById(blogId).orElse(null);
        if (comment == null) {
            return null;
        }

        DislikeReaction dislike = new DislikeReaction();
        dislike.setComment(comment);

        DislikeReaction savedDislike = dislikeRepository.save(dislike);
        return dislikeConverter.toDto(savedDislike);
    }

    @Override
    public void removeDislike(Long dislikeId) {
        dislikeRepository.deleteById(dislikeId);
    }

    @Override
    public List<DislikeDto> getDislikesByComment(Long commentId) {
        List<DislikeReaction> dislikes = dislikeRepository.findByCommentId(commentId);
        return dislikes.stream()
                .map(dislikeConverter::toDto)
                .toList();
    }
}
