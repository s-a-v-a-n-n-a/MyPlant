package edu.phystech.myplant.data;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.sql.Date;

@Entity
@Table(name = "plants")
@Getter
@Setter
public class Plant {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;
    private String name;
    private Long age;
    private Integer wateringInterval;
    private Date firstWateringDate;
    
    @ManyToOne
    private User user;

    @OneToOne(mappedBy = "plant")
    private Image image;
    
}
