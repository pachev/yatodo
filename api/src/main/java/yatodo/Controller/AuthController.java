package yatodo.Controller;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
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
@Api(value = "Authentication", description = "Endpoints for login, register, and retrieve user from token")
public class AuthController {

    @Value("${jwt.secretkey}")
    private String secret;

    @Autowired
    private TodoUserRepository todoUserRepository;

    /**
     *
     * Returns information about the user that was sent to be register
     * @param todoUser
     * @return the user that has been created or an error if username exists
     */
    @RequestMapping(value = "/register", method = RequestMethod.POST)
    @ApiOperation(value = "Regiter a new user", notes = "The user is created and basic info is returned but no token")
    public ResponseEntity<TodoUser> createUser(@RequestBody TodoUser todoUser) {
        if(todoUserRepository.findOneByUsername(todoUser.getUsername()) != null){
            throw new RuntimeException("Username already exist");
        }
        List<String> roles = new ArrayList<>();
        roles.add("User");
        todoUser.setRoles(roles);

        return new ResponseEntity<TodoUser>(todoUserRepository.save(todoUser), HttpStatus.CREATED);
    }

    /**
     * Returns user info after login
      * @param principal
     * @return a user's information or an error if username does not exists
     */
    @RequestMapping(value="/user", method = RequestMethod.POST)
    @ApiOperation(value = "Retrieve user info", notes = "After receiving a login token, retrieve user info from here")
    public TodoUser user(Principal principal) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String loggedUsername = auth.getName();
        return todoUserRepository.findOneByUsername(loggedUsername);
    }

    /**
     *
     * @param td a user that has been registered
     * @param response the request object so that the header is retrieved
     * @return a jwt that is to be used for all other requests
     */
    @RequestMapping(value = "/login", method = RequestMethod.POST)
    @ApiOperation(value = "Login and receive a token", notes = "A Jwt is provided with a 10 day expiry after posting to this endpoint")
    public ResponseEntity<Map<String, Object>> login(@RequestBody TodoUser td,
                                                     HttpServletResponse response) throws IOException {

        String token = null;


        TodoUser todoUser = todoUserRepository.findOneByUsername(td.getUsername());
        Map<String, Object> tokenMap = new HashMap<String, Object>();

        if (todoUser != null && todoUser.getPassword().equals(td.getPassword())) {
            token = Jwts.builder().setSubject(td.getUsername()).claim("roles", todoUser.getRoles()).setIssuedAt(new Date())
                    .signWith(SignatureAlgorithm.HS256,secret ).compact();

            tokenMap.put("token", token);
            tokenMap.put("user", todoUser);
            return new ResponseEntity<Map<String, Object>>(tokenMap, HttpStatus.OK);
        } else {
            tokenMap.put("token", null);
            return new ResponseEntity<Map<String, Object>>(tokenMap, HttpStatus.UNAUTHORIZED);
        }

    }

}
