package yatodo.Controller;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import yatodo.Model.TodoUser;
import yatodo.Repository.TodoUserRepository;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.security.Principal;
import java.util.*;




/**
 * Created by pachevjoseph on 4/13/17.
 */
@RestController
@RequestMapping("/api")
public class AuthController {

    @Autowired
    private TodoUserRepository todoUserRepository;

    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public ResponseEntity<TodoUser> createUser(@RequestBody TodoUser todoUser) {
        if(todoUserRepository.findOneByUsername(todoUser.getUsername()) != null){
            throw new RuntimeException("Username already exist");
        }
        List<String> roles = new ArrayList<>();
        roles.add("User");
        todoUser.setRoles(roles);

        return new ResponseEntity<TodoUser>(todoUserRepository.save(todoUser), HttpStatus.CREATED);
    }
    @RequestMapping("/user")
    public TodoUser user(Principal principal) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String loggedUsername = auth.getName();
        return todoUserRepository.findOneByUsername(loggedUsername);
    }

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public ResponseEntity<Map<String, Object>> login(@RequestBody TodoUser td,
                                                     HttpServletResponse response) throws IOException {

        String token = null;
        TodoUser todoUser = todoUserRepository.findOneByUsername(td.getUsername());
        Map<String, Object> tokenMap = new HashMap<String, Object>();

        if (todoUser != null && todoUser.getPassword().equals(td.getPassword())) {
            token = Jwts.builder().setSubject(td.getUsername()).claim("roles", todoUser.getRoles()).setIssuedAt(new Date())
                    .signWith(SignatureAlgorithm.HS256, "secretkey").compact();

            tokenMap.put("token", token);
            tokenMap.put("user", todoUser);
            return new ResponseEntity<Map<String, Object>>(tokenMap, HttpStatus.OK);
        } else {
            tokenMap.put("token", null);
            return new ResponseEntity<Map<String, Object>>(tokenMap, HttpStatus.UNAUTHORIZED);
        }

    }

}
