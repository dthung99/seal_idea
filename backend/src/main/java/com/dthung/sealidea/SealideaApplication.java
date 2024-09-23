package com.dthung.sealidea;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.filter.ForwardedHeaderFilter;

@SpringBootApplication
public class SealideaApplication {

	public static void main(String[] args) {
		SpringApplication.run(SealideaApplication.class, args);
	}

	public ForwardedHeaderFilter forwardedHeaderFilter() {
		return new ForwardedHeaderFilter();
	}
}
