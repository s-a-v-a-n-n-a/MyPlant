package edu.phystech.myplant.rest;

import edu.phystech.myplant.data.JwtToken;
import edu.phystech.myplant.data.repo.JwtTokenRepository;
import edu.phystech.myplant.security.JwtTokenProvider;
import edu.phystech.myplant.service.api.BlogService;
import edu.phystech.myplant.service.api.PlantService;
import edu.phystech.myplant.service.api.UserService;
import edu.phystech.myplant.service.converters.UserConverter;
import edu.phystech.myplant.service.dto.BlogDto;
import java.util.List;
import java.util.Objects;

import edu.phystech.myplant.service.dto.PlantDto;
import edu.phystech.myplant.service.dto.UserDto;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins="http://localhost:3000", maxAge = 3600)
@RestController
@RequestMapping("/blogs")
@RequiredArgsConstructor
public class BlogController {

  private final BlogService blogService;
  private final PlantService plantService;

  @Autowired
  private final JwtTokenProvider jwtTokenProvider;
  private final JwtTokenRepository tokenRepository;

  @Autowired
  private final UserService userService;
  private final UserConverter userConverter;

  @GetMapping("/popular")
  public ResponseEntity<List<BlogDto>> getPopularBlogs() {
    List<BlogDto> popularBlogs = blogService.getPopularBlogs();
    return ResponseEntity.ok(popularBlogs);
  }

  @GetMapping("/info/{blogId}")
  public ResponseEntity<BlogDto> getBlogInfo(@PathVariable Long blogId) {
    BlogDto blog = blogService.getBlogById(blogId);
    if (blog == null) {
      return ResponseEntity.notFound().build();
    }
    return ResponseEntity.ok(blog);
  }

  @GetMapping("/{blogId}")
  public ResponseEntity<?> getBlogByPlantId(@RequestHeader("Authorization") final String jwtToken,
                                            @PathVariable Long blogId) {
    JwtToken token = tokenRepository.findByToken(jwtToken);
    if (!jwtTokenProvider.validateToken(jwtToken) || token == null) {
      return ResponseEntity.badRequest().body("No such token");
    }
    BlogDto blog = blogService.getBlogById(blogId);
    if (blog == null) {
      return ResponseEntity.notFound().build();
    }
    return ResponseEntity.ok(blog);
  }
  @PostMapping("/{plantId}")
  public ResponseEntity<?> createBlog(@RequestHeader("Authorization") final String jwtToken,
                                            @PathVariable Long plantId,
                                            @RequestBody BlogDto blogInfo) {
    JwtToken token = tokenRepository.findByToken(jwtToken);
    if (!jwtTokenProvider.validateToken(jwtToken) || token == null) {
      return ResponseEntity.badRequest().body("No such token");
    }

    PlantDto plant = plantService.getPlantById(plantId);
    if (plant == null) {
      return ResponseEntity.badRequest().body("Invalid token");
    }
    UserDto user = userService.getUserById(jwtTokenProvider.getUserIdFromToken(jwtToken));
    if (user == null) {
      return ResponseEntity.badRequest().body("Invalid token");
    }

    blogInfo.setUser(user);
    blogInfo.setPlant(plant);
    BlogDto blog = blogService.createBlog(blogInfo);
    return ResponseEntity.ok(blog);
  }

  @PutMapping("/{blogId}")
  public ResponseEntity<?> updateBlog(@RequestHeader("Authorization") final String jwtToken,
                                      @PathVariable Long blogId,
                                      @RequestBody BlogDto blogInfo) {
    JwtToken token = tokenRepository.findByToken(jwtToken);
    if (!jwtTokenProvider.validateToken(jwtToken) || token == null) {
      return ResponseEntity.badRequest().body("No such token");
    }

    if (!Objects.equals(blogId, blogInfo.getId())) {
      return ResponseEntity.badRequest().body("Invalid request");
    }

    BlogDto blog = blogService.updateBlog(blogId, blogInfo);
    return ResponseEntity.ok(blog);
  }
}
