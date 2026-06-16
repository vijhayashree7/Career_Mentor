package com.aimentor.controller;

import com.aimentor.dto.ApiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/career")
public class CareerController {

    @PostMapping("/recommendations")
    public ResponseEntity<ApiResponse> getRecommendations(@RequestBody Map<String, Object> payload) {
        // TODO: connect AI recommendation logic
        return ResponseEntity.ok(new ApiResponse(true, "Career recommendations endpoint is ready."));
    }

    @PostMapping("/resume/analyze")
    public ResponseEntity<ApiResponse> analyzeResume(@RequestBody Map<String, String> payload) {
        // TODO: parse resume PDF with Apache PDFBox
        return ResponseEntity.ok(new ApiResponse(true, "Resume analysis endpoint is ready."));
    }
}
