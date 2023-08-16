package com.thefoundry.backend.models;


import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.annotations.Type;

@AllArgsConstructor
@Data
@NoArgsConstructor
@Builder
@Table(name="image")
@Entity
public class Image {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Integer id;
    private String name;
    private String type;

    @OneToOne
    @JoinColumn(name="user_id")
    private User user;

    @Lob
    @Column(name="imagedata", length=1000)
    private byte[] imageData;

}
