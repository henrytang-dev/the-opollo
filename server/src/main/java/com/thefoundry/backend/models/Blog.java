package com.thefoundry.backend.models;

import com.thefoundry.backend.converters.HashMapConverter;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;

@Entity
@Table(name="blog")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Blog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name="user_id")
    private User user;

    @Convert(converter = HashMapConverter.class) // this converter will take care of serializing and deserializing
    @Column(columnDefinition = "text")
    private Map<String, Object> blogData;

//    @Convert(converter = HashMapConverter.class)
    private String title;

    private String url;

    @Column(columnDefinition = "text")
    private String paragraph;

    @Column(columnDefinition = "text")
    private String previewImage;
}
