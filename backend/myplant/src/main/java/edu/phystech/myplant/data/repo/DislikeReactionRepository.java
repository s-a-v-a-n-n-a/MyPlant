
package edu.phystech.myplant.data.repo;

import edu.phystech.myplant.data.BlogComment;
import edu.phystech.myplant.data.DislikeReaction;
import edu.phystech.myplant.data.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
public interface DislikeReactionRepository extends JpaRepository<DislikeReaction, Long> {
    List<DislikeReaction> findByUser(User user);
    List<DislikeReaction> findByComment(BlogComment comment);

    List<DislikeReaction> findByCommentId(Long commentId);
}
