package com.thefoundry.backend.security.jwt;

import com.thefoundry.backend.repository.UserRepository;
import com.thefoundry.backend.security.details.UserDetailsImpl;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
@RequiredArgsConstructor
public class JwtService {

    private final UserRepository userRepository;

    private static final String SIGNING_KEY = "WrfpZFL4/rj8N7zROElZZrRPSYDChWrEfEQfOX3pE6wQ0mULjZILXYLsY3fLdSyl";

    public String extractUsername(String token){
        return extractClaim(token, Claims::getSubject);
    }

    public <T> T extractClaim(String token, Function<Claims,T> claimsResolver) {
        Claims claim = extractAllClaims(token);
        return claimsResolver.apply(claim);
    }

    public Claims extractAllClaims(String token) {
        return Jwts.parserBuilder().setSigningKey(signingKey(SIGNING_KEY)).build().parseClaimsJws(token).getBody();
    }

    public SecretKey signingKey(String secretKey) {
        byte[] key = Decoders.BASE64.decode(secretKey);
        return Keys.hmacShaKeyFor(key);
    }


    public <T> String generateToken(Map<String,T> map, UserDetailsImpl userDetails) {
        return Jwts.builder()
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 24))
                .signWith(signingKey(SIGNING_KEY), SignatureAlgorithm.HS256)
                .compact();
    }

    public <T> String generateToken(UserDetailsImpl userDetails) {
        return generateToken(new HashMap<>(), userDetails);
    }



    public boolean isTokenValid(String token, UserDetailsImpl userDetails) {
        return extractUsername(token).equals(userDetails.getUsername()) && !isTokenExpired(token);
    }

    public boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date(System.currentTimeMillis()));
    }

    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

}
