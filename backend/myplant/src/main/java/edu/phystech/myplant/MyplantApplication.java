package edu.phystech.myplant;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
//import org.springframework.boot.autoconfigure.data.mongo.MongoDataAutoConfiguration;
//import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
//import org.springframework.boot.autoconfigure.jdbc.DataSourceTransactionManagerAutoConfiguration;
//import org.springframework.boot.autoconfigure.mongo.MongoAutoConfiguration;
//import org.springframework.boot.autoconfigure.orm.jpa.HibernateJpaAutoConfiguration;
//import org.springframework.context.annotation.Bean;
//import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
//import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
//import org.springframework.web.servlet.config.annotation.CorsRegistry;
//import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
//		(exclude = {
//		MongoAutoConfiguration.class,
//		MongoDataAutoConfiguration.class
//		DataSourceAutoConfiguration.class,
//		DataSourceTransactionManagerAutoConfiguration.class,
//		HibernateJpaAutoConfiguration.class
//})
//@EnableMongoRepositories(basePackages = {"edu.phystech.myplant.data.repo"})
public class MyplantApplication {

	public static void main(String[] args) {
		SpringApplication.run(MyplantApplication.class, args);
	}

}
