package edu.phystech.myplant.data;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "blogComments")
@Getter
@Setter
public class BlogComment {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;
    private String content;
    private Long indexNumber;
    
    @ManyToOne
    private Blog blog;

    @ManyToOne
    private User user;

}
