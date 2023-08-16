package com.thefoundry.backend.controllers;

import com.thefoundry.backend.services.ImageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/image")
@RequiredArgsConstructor
@CrossOrigin("*")
public class ImageController {

    private final ImageService imageService;

    @PostMapping("/post/{id}")
    public ResponseEntity<?> uploadImage(@RequestPart("image") MultipartFile file, @PathVariable Integer id) throws IOException {
        String uploadImage = imageService.uploadImage(file, id);
        return ResponseEntity.ok(uploadImage);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> downloadImage(@PathVariable Integer id) {
        byte[] imageData = imageService.downloadImage(id);
        return ResponseEntity.status(HttpStatus.OK)
                .contentType(MediaType.valueOf(MediaType.IMAGE_PNG_VALUE))
                .body(imageData);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateImage(@RequestParam("image") MultipartFile file, @PathVariable Integer id) throws IOException {
        return ResponseEntity.ok(imageService.updateImage(file, id));
    }
}
