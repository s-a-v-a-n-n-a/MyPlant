FROM openjdk:17-jdk-slim as builder
EXPOSE 8080
WORKDIR /app
ADD ./target/*.jar app.jar
# RUN java -Djarmode=layertools -jar app.jar extract

# FROM adoptopenjdk:16_36-jre-hotspot
# WORKDIR application
#COPY --from=builder extracted/dependencies/ ./
#COPY --from=builder extracted/spring-boot-loader/ ./
#COPY --from=builder extracted/snapshot-dependencies/ ./
#COPY --from=builder extracted/application/ ./


# ENTRYPOINT ["java", "org.springframework.boot.loader.JarLauncher"]
#FROM adoptopenjdk:17-jre-hotspot
#ARG JAR_FILE=*.jar
#COPY ${JAR_FILE} application.jar
ENTRYPOINT ["java", "-jar", "app.jar"]