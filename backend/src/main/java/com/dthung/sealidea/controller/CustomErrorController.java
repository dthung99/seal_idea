package com.dthung.sealidea.controller;

import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class CustomErrorController implements ErrorController {
    @RequestMapping("/error")
    public String handleError() {
        // Redirect to a custom error page (e.g., error.html)
        return "error";
    }
}
