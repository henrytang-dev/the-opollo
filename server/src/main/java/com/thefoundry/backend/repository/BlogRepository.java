package com.thefoundry.backend.repository;

import com.thefoundry.backend.models.Blog;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface BlogRepository extends JpaRepository<Blog, Integer> {
    List<Blog> findByUserUsername(String username);

    Optional<Blog> findByTitle(String title);

    @Query(nativeQuery=true, value="SELECT * FROM blog ORDER BY random() LIMIT 10")
    List<Blog> findRandomTitles();

    Optional<Blog> findByUrl(String url);
}
