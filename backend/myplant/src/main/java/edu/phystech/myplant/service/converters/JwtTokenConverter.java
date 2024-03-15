package edu.phystech.myplant.service.converters;

import edu.phystech.myplant.data.JwtToken;
import edu.phystech.myplant.service.dto.JwtTokenDto;
import org.springframework.stereotype.Component;

@Component
public class JwtTokenConverter {

    public JwtTokenDto toDto(JwtToken token) {
        JwtTokenDto tokenDto = new JwtTokenDto();
        tokenDto.setId(token.getId());
        tokenDto.setToken(token.getToken());
        return tokenDto;
    }

    public JwtToken toEntity(JwtTokenDto tokenDto) {
        JwtToken token = new JwtToken();
        token.setId(tokenDto.getId());
        token.setToken(tokenDto.getToken());
        return token;
    }
}
