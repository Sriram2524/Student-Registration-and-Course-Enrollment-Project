package com.rava.studentportal.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.List;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    private final List<String> allowedOrigins;

    public WebConfig(@Value("${app.cors.allowed-origins}") List<String> allowedOrigins) {
        this.allowedOrigins = allowedOrigins;
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOriginPatterns(getAllowedOriginPatterns())
                .allowedMethods("GET", "POST", "OPTIONS")
                .allowedHeaders("*");
    }

    private String[] getAllowedOriginPatterns() {
        List<String> patterns = new java.util.ArrayList<>(allowedOrigins);
        patterns.add("https://*.vercel.app");
        return patterns.toArray(String[]::new);
    }
}
