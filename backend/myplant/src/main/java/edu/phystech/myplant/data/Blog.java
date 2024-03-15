package edu.phystech.myplant.data;
import jakarta.persistence.*;

import java.util.List;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "blogs")
@Getter
@Setter
public class Blog {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;
    private String title;
    private String content;
    private String snippet;

    @ManyToOne
    private User user;
    
    @OneToOne
    private Plant plant;

    @OneToOne(mappedBy = "blog")
    private Image image;
    
    @OneToMany(mappedBy = "blog")
    private List<BlogComment> comments;

}
