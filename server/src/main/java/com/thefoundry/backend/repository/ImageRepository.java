package com.thefoundry.backend.repository;


import com.thefoundry.backend.models.Image;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ImageRepository extends JpaRepository<Image, Integer> {
    Optional<Image> findByName(String name);

    Optional<Image> findByUserId(Integer id);

//    Optional<Image> findByUser(Integer id);
}
