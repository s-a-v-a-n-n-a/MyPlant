package edu.phystech.myplant.service.api;

import edu.phystech.myplant.service.dto.JwtTokenDto;

public interface JwtTokenService {
    JwtTokenDto createToken(JwtTokenDto tokenDto);
    boolean saveToken(JwtTokenDto token);

    JwtTokenDto getTokenById(Long id);
    JwtTokenDto getTokenByName(String token);
    boolean deleteById(Long id);
}
