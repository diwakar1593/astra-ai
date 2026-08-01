package com.astra.ai.controller;

import com.astra.ai.common.ApiResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
public class HealthController {

    @GetMapping("/api/v1/health")
    public ApiResponse<String> health() {

        log.info("Health API called");

        return new ApiResponse<>(
                true,
                "Health check successful",
                "Astra AI Backend is Running Successfully!"
        );
    }

//    @RestController
//    @RequestMapping("/test")
//    public class TestController {
//
//        @Value("${spring.ai.google.genai.api-key}")
//        private String apiKey;
//
//        @GetMapping("/key")
//        public String key() {
//            return "Loaded: " + (apiKey != null && !apiKey.isBlank());
//        }
//    }
}
