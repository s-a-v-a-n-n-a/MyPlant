package edu.phystech.myplant.data.repo;

import edu.phystech.myplant.data.JwtToken;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JwtTokenRepository extends JpaRepository<JwtToken, Long> {
    JwtToken findByToken(String token);
}
