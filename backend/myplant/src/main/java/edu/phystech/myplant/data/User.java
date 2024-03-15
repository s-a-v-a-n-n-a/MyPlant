package edu.phystech.myplant.data;

import jakarta.persistence.*;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "users")
@Getter
@Setter
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;
    private String username;
    private String name;
    private String surname;
    private String email;
    private String password;

    @OneToOne(mappedBy = "user")
    private Image image;

    @ManyToMany(fetch = FetchType.EAGER)
    private List<Role> roles;
    
    @OneToMany(mappedBy = "user")
    private List<Plant> plants;
    
    @OneToMany(mappedBy = "user")
    private List<Blog> blogs;
    
    @OneToMany(mappedBy = "user")
    private List<LikeReaction> likes;
    
    @OneToMany(mappedBy = "user")
    private List<DislikeReaction> dislikes;


}
