package com.evfinder.backend;

import io.github.cdimascio.dotenv.Dotenv;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class EvChargerFinderApplicationTests {

	@BeforeAll
	static void loadEnv() {
		Dotenv dotenv = Dotenv.configure().ignoreIfMissing().load();
		System.setProperty("REDIS_HOST", dotenv.get("REDIS_HOST"));
		System.setProperty("REDIS_PORT", dotenv.get("REDIS_PORT"));
		System.setProperty("REDIS_PASSWORD", dotenv.get("REDIS_PASSWORD"));
		System.setProperty("OPENCAGE_API_KEY", dotenv.get("OPENCAGE_API_KEY"));
		System.setProperty("OPENCHARGEMAP_API_KEY", dotenv.get("OPENCHARGEMAP_API_KEY"));
	}

	@Test
	void contextLoads() {
	}

}
