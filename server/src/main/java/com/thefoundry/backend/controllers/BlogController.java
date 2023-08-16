package com.thefoundry.backend.controllers;

import com.thefoundry.backend.models.Blog;
import com.thefoundry.backend.repository.BlogRepository;
import com.thefoundry.backend.repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@CrossOrigin("*")
public class BlogController {

    private final BlogRepository blogRepository;
    private final UserRepository userRepository;

    @PostMapping("/{username}/write/save")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Blog> save(@PathVariable(value="username") String username, @RequestBody Map<String, Object> blogRequest, HttpServletRequest request) {
            String url = (String) blogRequest.get("url");
            String parsedUrl = url.toLowerCase().replace(" ", "-");
            Blog blog = userRepository.findByUsername(username).map(user -> {
                Blog test = Blog.builder().user(user).blogData((Map<String, Object>) blogRequest.get("data")).title((String) blogRequest.get("title")).url(parsedUrl).paragraph((String) blogRequest.get("paragraph")).previewImage((String) blogRequest.get("image")).build();
                return blogRepository.save(test);
            }).orElseThrow(() -> new UsernameNotFoundException("Username not found"));

            return new ResponseEntity<>(blog, HttpStatus.CREATED);
    }

    @GetMapping("/{username}/{url}")
    public Blog loadBlog(@PathVariable(value="username") String username, @PathVariable(value="url") String url) {
        return blogRepository.findByUrl(url).orElseThrow(() -> new NullPointerException("Blog Id not found."));
    }

    @GetMapping
    public List<Blog> homeBlogs() {
        return blogRepository.findRandomTitles();
    }
}
