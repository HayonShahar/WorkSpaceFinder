package com.workSpaceFinder.server;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ServerApplication {

	public static void main(String[] args) {
		try {
			SpringApplication.run(ServerApplication.class, args);
			System.out.println("Server is running");
		}catch (Exception e){
			System.out.println("Server couldn't running");
		}
	}

}
