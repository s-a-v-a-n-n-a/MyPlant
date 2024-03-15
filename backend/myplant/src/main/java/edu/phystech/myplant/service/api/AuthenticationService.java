package edu.phystech.myplant.service.api;

import edu.phystech.myplant.service.dto.AuthRequest;
import edu.phystech.myplant.service.dto.AuthResponse;

public interface AuthenticationService {
    AuthResponse authenticateUser(AuthRequest authRequest);
}
