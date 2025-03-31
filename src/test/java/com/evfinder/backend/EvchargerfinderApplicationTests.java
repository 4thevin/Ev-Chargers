package com.evfinder.backend;

import io.github.cdimascio.dotenv.Dotenv;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class EvchargerfinderApplicationTests {

	@BeforeAll
	static void loadEnv() {
		Dotenv dotenv = Dotenv.configure().ignoreIfMissing().load();
		System.setProperty("REDIS_HOST", dotenv.get("REDIS_HOST"));
		System.setProperty("REDIS_PORT", dotenv.get("REDIS_PORT"));
		System.setProperty("REDIS_PASSWORD", dotenv.get("REDIS_PASSWORD"));
	}

	@Test
	void contextLoads() {
	}

}
