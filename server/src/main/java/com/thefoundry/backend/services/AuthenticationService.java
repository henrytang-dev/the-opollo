package com.thefoundry.backend.services;

import com.thefoundry.backend.models.ERole;
import com.thefoundry.backend.models.Role;
import com.thefoundry.backend.models.User;
import com.thefoundry.backend.payload.request.AuthenticationRequest;
import com.thefoundry.backend.payload.request.RegistrationRequest;
import com.thefoundry.backend.payload.response.JwtResponse;
import com.thefoundry.backend.repository.UserRepository;
import com.thefoundry.backend.security.details.UserDetailsImpl;
import com.thefoundry.backend.security.details.UserDetailsServiceImpl;
import com.thefoundry.backend.security.jwt.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashSet;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public JwtResponse register(RegistrationRequest request) {
        Set<Role> role = new HashSet<>();
        role.add(new Role(ERole.ROLE_USER));
        var user = User.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .username(request.getUsername())
                .password(passwordEncoder.encode(request.getPassword()))
                .email(request.getEmail())
                .roles(role)
                .build();
        userRepository.save(user);
        String jwt = jwtService.generateToken(new UserDetailsImpl(user));
        return JwtResponse.builder()
                .token(jwt)
                .email(user.getEmail())
                .username(user.getUsername())
                .roles(user.getRoles())
                .id(user.getId())
                .build();
    }

    public JwtResponse authenticate(AuthenticationRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        UserDetailsImpl user = (UserDetailsImpl) authentication.getPrincipal();
        String jwt = jwtService.generateToken(user);
        return JwtResponse.builder()
                .token(jwt)
                .email(user.getUser().getEmail())
                .username(user.getUsername())
                .roles(user.getUser().getRoles())
                .id(user.getUser().getId())
                .firstName(user.getUser().getFirstName())
                .lastName(user.getUser().getLastName())
                .build();
    }
}
