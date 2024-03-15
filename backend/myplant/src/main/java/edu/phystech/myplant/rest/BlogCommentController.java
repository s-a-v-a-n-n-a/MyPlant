package edu.phystech.myplant.rest;

import edu.phystech.myplant.data.JwtToken;
import edu.phystech.myplant.security.JwtTokenProvider;
import edu.phystech.myplant.service.api.BlogCommentService;
import edu.phystech.myplant.service.api.BlogService;
import edu.phystech.myplant.service.api.JwtTokenService;
import edu.phystech.myplant.service.api.UserService;
import edu.phystech.myplant.service.converters.UserConverter;
import edu.phystech.myplant.service.dto.BlogCommentDto;
import edu.phystech.myplant.service.dto.BlogDto;
import edu.phystech.myplant.service.dto.JwtTokenDto;
import edu.phystech.myplant.service.dto.UserDto;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins="http://localhost:3000", maxAge = 3600)
@RestController
@RequestMapping("/blogComments")
@RequiredArgsConstructor
public class BlogCommentController {

    private final BlogCommentService blogCommentService;
    private final BlogService blogService;
    @Autowired
    private final UserService userService;
    private final UserConverter userConverter;
    @Autowired
    private final JwtTokenProvider jwtTokenProvider;
    private final JwtTokenService jwtTokenService;

    @GetMapping("/info")
    public ResponseEntity<BlogCommentDto> getBlogCommentInfo(@RequestParam Long blogCommentId) {
        BlogCommentDto comment = blogCommentService.getCommentById(blogCommentId);
        if (comment == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(comment);
    }

    @PostMapping("/{blogId}")
    public ResponseEntity<?> createBlogComment(
            @RequestHeader("Authorization") final String jwtToken,
            @PathVariable Long blogId,
            @RequestBody BlogCommentDto blogCommentInfo
    ) {
        JwtTokenDto token = jwtTokenService.getTokenByName(jwtToken);
        if (!jwtTokenProvider.validateToken(jwtToken) || token == null) {
            return ResponseEntity.badRequest().body("No such token");
        }

        UserDto user = userService.getUserById(jwtTokenProvider.getUserIdFromToken(jwtToken));
        if (user == null) {
            return ResponseEntity.badRequest().body("Invalid token");
        }
        blogCommentInfo.setUser(user);

        BlogDto blog = blogService.getBlogById(blogId);
        if (blog == null) {
            return ResponseEntity.badRequest().body("Invalid token");
        }
        blogCommentInfo.setBlog(blog);

        BlogCommentDto comment = blogCommentService.createComment(blogCommentInfo);
        return ResponseEntity.ok(comment);
    }

    @GetMapping
    public ResponseEntity<?> getBlogComments(
            @RequestHeader("Authorization") final String jwtToken,
            @RequestParam(name = "blogId") Long blogId
    ) {
        JwtTokenDto token = jwtTokenService.getTokenByName(jwtToken);
        if (!jwtTokenProvider.validateToken(jwtToken) || token == null) {
            return ResponseEntity.badRequest().body("No such token");
        }

        List<BlogCommentDto> blogComments = blogCommentService.getCommentsByBlog(blogId);
        return ResponseEntity.ok(blogComments);
    }

    @DeleteMapping("/{$blogCommentId}")
    public ResponseEntity<Void> removeCommentFromBlog(@PathVariable Long blogCommentId) {
        blogCommentService.deleteComment(blogCommentId);
        return ResponseEntity.noContent().build();
    }
}
