package edu.phystech.myplant.data;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "likes")
@Getter
@Setter
public class LikeReaction {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;
    
    @ManyToOne
    private User user;
    
    @ManyToOne
    private BlogComment comment;
    
    
}
