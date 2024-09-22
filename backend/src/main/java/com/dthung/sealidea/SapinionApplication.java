package com.dthung.sealidea;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.filter.ForwardedHeaderFilter;

@SpringBootApplication
public class SapinionApplication {

	public static void main(String[] args) {
		SpringApplication.run(SapinionApplication.class, args);
	}

	public ForwardedHeaderFilter forwardedHeaderFilter() {
		return new ForwardedHeaderFilter();
	}
}
