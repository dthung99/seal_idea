package com.dthung.sealidea.security;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.cors.CorsConfigurationSource;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig {

    @Bean
    UserDetailsService userDetailsService() {
        return new CustomUserDetailsService();
    }

    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    DaoAuthenticationProvider authenticationProvider() {
        // Set the DaoAuthenticationProvider to use user from the database
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService());
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }

    // Handle CORS for react request
    // Get environment variable for cors origin host
    @Value("${CORS_ORIGIN_HOST}")
    private String corsOriginHost;

    @Bean
    CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedMethods(Arrays.asList("*"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setExposedHeaders(Arrays.asList("*"));
        configuration.setAllowedOrigins(Arrays.asList(this.corsOriginHost));
        configuration.setMaxAge(3600L);
        configuration.setAllowCredentials(true);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/api/**", configuration);
        return source;
    }

    // Get environment variable for SPRING REMEMBER ME KEY
    @Value("${SPRING_REMEMBER_ME_KEY}")
    private String rememberMeKey;

    @Bean
    SecurityFilterChain configure(HttpSecurity http) throws Exception {
        // Declare the server ip
        // String ipAddress = "http://localhost:8080";
        String ipAddress = ""; // The host is set in nginx config so no need for this
        // Set the authenticationProvider
        http.authenticationProvider(authenticationProvider());
        http
                // configurate CORS (Not having effect until you turn csrf off)
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .csrf(crsf -> crsf.disable()) // Turn off csrf
                .authorizeHttpRequests((requests) -> requests
                        .requestMatchers("/api/personal/*").authenticated() // Limit to only personal page
                        .anyRequest().permitAll()) // Allow access to all the rest
                // .requestMatchers("/api/login_is_required", "/api/register",
                // "/api/logout_success").permitAll()
                .formLogin((form) -> form
                        .loginPage(ipAddress + "/api/login_is_required") // Redirect here if user don't have permission
                        .loginProcessingUrl("/api/login") // Login api page for authentication
                        .usernameParameter("email") // The key of username
                        .passwordParameter("password") // The key of password
                        .defaultSuccessUrl(ipAddress + "/api/login_success", true) // Redirect to the home page on
                                                                                   // success
                        .permitAll())
                .logout((logout) -> logout.logoutUrl("/api/logout")
                        .logoutSuccessUrl(ipAddress + "/api/logout_success")
                        .invalidateHttpSession(true)
                        .deleteCookies("JSESSIONID"))
                .rememberMe(remember -> remember
                        .userDetailsService(userDetailsService())
                        .key(this.rememberMeKey) // TODO: Change key at production
                        .tokenValiditySeconds(2592000) // 30 day
                        .alwaysRemember(true));
        return http.build();
    }
}