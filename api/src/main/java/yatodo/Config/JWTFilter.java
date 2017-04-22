package yatodo.Config;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.filter.GenericFilterBean;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureException;

/**
 * Created by pachev on 4/13/17.
 */

public class JWTFilter extends GenericFilterBean {
	private static final String AUTHORIZATION_HEADER = "Authorization";
	private static final String AUTHORITIES_KEY = "roles";

	@Value("${jwt.secretkey}") //Key retrieved from properties to be used for encrypting and decrypting
	private String secret;


    /**
     * This is where the main filter happens for each http request in order to verify auth token
     * that gets sent
     * @param req the request coming in from the client containing the information
     * @param res The response that is meant to be sent back to the user
     * @param filterChain Spring security object that contains all the filters and their responsibilities
     */

	@Override
	public void doFilter(ServletRequest req, ServletResponse res, FilterChain filterChain)
			throws IOException, ServletException {
		HttpServletRequest request = (HttpServletRequest) req;
		String authHeader = request.getHeader(AUTHORIZATION_HEADER);

		//Excluding OPTIONs requests for the token check
		if (request.getMethod().equals("OPTIONS")) {
			filterChain.doFilter(req, res);
			return;
		}
        System.out.println("path" + request.getPathInfo());

		if (authHeader == null || !authHeader.startsWith("Token ")) {
			((HttpServletResponse) res).sendError(HttpServletResponse.SC_UNAUTHORIZED, "Invalid Authorization header.");
			System.out.println("The error is with the header: " + authHeader);
        } else {
            try {
                String token = authHeader.substring(6);
                Claims claims = Jwts.parser().setSigningKey(secret).parseClaimsJws(token).getBody();
                request.setAttribute("claims", claims);
                SecurityContextHolder.getContext().setAuthentication(getAuthentication(claims));
                filterChain.doFilter(req, res);
            } catch (SignatureException e) {
                ((HttpServletResponse) res).sendError(HttpServletResponse.SC_UNAUTHORIZED, "Invalid token");
            }

        }
    }

    /**
     *
     * @param claims token that has been parsed
     * @return Modified UsernamePasswordAuthenticationToken to act as the JWT
     */
    public Authentication getAuthentication(Claims claims) {
        List<SimpleGrantedAuthority> authorities = new ArrayList<SimpleGrantedAuthority>();
        List<String> roles = (List<String>) claims.get(AUTHORITIES_KEY);
        for (String role : roles) {
            authorities.add(new SimpleGrantedAuthority(role));
        }
        User principal = new User(claims.getSubject(), "", authorities);
        UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(
                principal, "", authorities);
        return usernamePasswordAuthenticationToken;
    }
}
