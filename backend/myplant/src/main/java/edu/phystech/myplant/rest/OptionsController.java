package edu.phystech.myplant.rest;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.io.IOException;

//@Controller
//public class OptionsController {
//
//    @RequestMapping(method = RequestMethod.OPTIONS, value="/**")
//    public HttpServletResponse handle(HttpServletResponse theHttpServletResponse) {
//        theHttpServletResponse.addHeader("Access-Control-Allow-Headers", "origin, content-type, accept, x-requested-with");
//        theHttpServletResponse.addHeader("Access-Control-Max-Age", "3600");
//        theHttpServletResponse.addHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
//        theHttpServletResponse.addHeader("Access-Control-Allow-Origin", "*");
//        return theHttpServletResponse;
//    }
//
//}
