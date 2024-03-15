package edu.phystech.myplant.data.repo;

import edu.phystech.myplant.data.BlogComment;
import edu.phystech.myplant.data.LikeReaction;
import edu.phystech.myplant.data.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LikeReactionRepository extends JpaRepository<LikeReaction, Long> {
  List<LikeReaction> findByUser(User user);

  List<LikeReaction> findByComment(BlogComment comment);

  List<LikeReaction> findByCommentId(Long commentId);
}
