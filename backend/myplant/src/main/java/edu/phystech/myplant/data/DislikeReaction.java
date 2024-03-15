package edu.phystech.myplant.data;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "dislikes")
@Getter
@Setter
public class DislikeReaction {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;
    
    @ManyToOne
    private User user;

    @ManyToOne
    private BlogComment comment;
    
    
}
