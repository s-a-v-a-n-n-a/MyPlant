package edu.phystech.myplant.data;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "images")
@Getter
@Setter
public class Image {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    private String imageUri;

    @OneToOne
    User user;

    @OneToOne
    Plant plant;
    @OneToOne
    Blog blog;
}
