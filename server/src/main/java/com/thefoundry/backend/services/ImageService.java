package com.thefoundry.backend.services;

import com.thefoundry.backend.models.Image;
import com.thefoundry.backend.models.User;
import com.thefoundry.backend.repository.ImageRepository;
import com.thefoundry.backend.repository.UserRepository;
import com.thefoundry.backend.utils.ImageUtils;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.swing.text.html.Option;
import java.io.IOException;
import java.util.Optional;
import java.util.zip.DataFormatException;

@Service
@RequiredArgsConstructor
public class ImageService {

    private final ImageRepository imageRepository;
    private final UserRepository userRepository;

    public String uploadImage(MultipartFile imageFile, Integer id) throws IOException {
        User user = userRepository.findById(id).orElseThrow();
        var imageToSave = Image.builder()
                .name(imageFile.getOriginalFilename())
                .type(imageFile.getContentType())
                .imageData(ImageUtils.compressImage(imageFile.getBytes()))
                .user(user)
                .build();

        imageRepository.save(imageToSave);
        return "file uploaded successfully : " + imageFile.getOriginalFilename();
    }


    @Transactional
    public Image updateImage (MultipartFile imageFile, Integer id) throws IOException {
        User user = userRepository.findById(id).orElseThrow();
        var imageToSave = Image.builder()
                .name(imageFile.getOriginalFilename())
                .type(imageFile.getContentType())
                .imageData(ImageUtils.compressImage(imageFile.getBytes()))
                .user(user)
                .build();

        return imageRepository.findByUserId(id).map(image -> {
            try {
                image.setImageData(ImageUtils.compressImage(imageFile.getBytes()));
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
            image.setName(imageFile.getOriginalFilename());
            image.setType(imageFile.getContentType());
            image.setUser(user);

            return imageRepository.save(image);
        }).orElseGet(() -> {
            return imageRepository.save(imageToSave);
        });
    }

    @Transactional
    public byte[] downloadImage(Integer id) {
        Optional<Image> dbImage =  imageRepository.findByUserId(id);
        return dbImage.map(image -> {
            try {
                return ImageUtils.decompressImage(image.getImageData());
            } catch (DataFormatException | IOException exception) {
                throw new RuntimeException("Error downloading an image", exception);
            }
        }).orElse(null);
    }
}
