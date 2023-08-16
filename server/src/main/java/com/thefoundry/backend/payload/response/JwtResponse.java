package com.thefoundry.backend.payload.response;

import com.thefoundry.backend.models.Role;
import lombok.*;

import java.util.Set;

@Data
@RequiredArgsConstructor
@AllArgsConstructor
@Builder
public class JwtResponse {
    private String token;
    private String username;
    private String firstName;
    private String lastName;
    private String email;
    private Set<Role> roles;
    private Integer id;
}
