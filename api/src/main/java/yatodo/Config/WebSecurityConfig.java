package yatodo.Config;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

// TODO: 4/13/17 Add password encryptor(bcrypt) for user storage

/**
 * Created by pachevjoseph on 4/12/17.
 */
@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    public void configure(WebSecurity web){
        web.ignoring()
                .antMatchers("/api", "/api/login","/api/register");
    }
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http
				// starts authorizing configurations
				.authorizeRequests()
				// authenticate all remaining URLS
				.anyRequest().fullyAuthenticated().and()
				// adding JWT filter
				.addFilterBefore(new JWTFilter(), UsernamePasswordAuthenticationFilter.class)
				// enabling the basic authentication
				.httpBasic().and()
				// configuring the session as state less. Which means there is
				// no session in the server
				.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
				// disabling the CSRF - Cross Site Request Forgery
				.csrf().disable();
	}
}
