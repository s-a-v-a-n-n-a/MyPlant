package edu.phystech.myplant.service;

import edu.phystech.myplant.data.JwtToken;
import edu.phystech.myplant.data.repo.JwtTokenRepository;
import edu.phystech.myplant.service.api.JwtTokenService;
import edu.phystech.myplant.service.converters.JwtTokenConverter;
import edu.phystech.myplant.service.dto.JwtTokenDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class JwtTokenServiceImpl implements JwtTokenService {

    private final JwtTokenConverter jwtTokenConverter;
    private final JwtTokenRepository jwtTokenRepository;

    @Override
    public JwtTokenDto createToken(JwtTokenDto tokenDto) {
        JwtToken token = jwtTokenConverter.toEntity(tokenDto);
        JwtToken savedToken = jwtTokenRepository.save(token);
        return jwtTokenConverter.toDto(savedToken);
    }

    @Override
    public boolean saveToken(JwtTokenDto token) {
        JwtToken tokenFromDB = jwtTokenRepository.findById(token.getId()).orElse(null);
        if (tokenFromDB == null) {
            return false;
        }

        JwtTokenDto newJwtToken = new JwtTokenDto();
        newJwtToken.setId(token.getId());
        newJwtToken.setToken(token.getToken());

        jwtTokenRepository.save(jwtTokenConverter.toEntity(newJwtToken));

        return true;
    }

    @Override
    public JwtTokenDto getTokenById(Long id) {
        JwtToken jwtToken = jwtTokenRepository.findById(id).orElse(null);
        if (jwtToken == null) {
            return null;
        }
        return jwtTokenConverter.toDto(jwtToken);
    }

    @Override
    public JwtTokenDto getTokenByName(String token) {
        JwtToken jwtToken = jwtTokenRepository.findByToken(token);
        if (token == null) {
            return null;
        }
        return jwtTokenConverter.toDto(jwtToken);
    }

    @Override
    public boolean deleteById(Long id) {
        JwtTokenDto tokenPresent = this.getTokenById(id);
        if (tokenPresent == null) {
            return false;
        }

        jwtTokenRepository.deleteById(id);
        return false;
    }
}
