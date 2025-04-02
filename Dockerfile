# Build stage
FROM eclipse-temurin:17-jdk AS build

WORKDIR /app

COPY build.gradle settings.gradle ./
COPY gradlew ./
COPY gradle gradle
COPY src ./src

RUN chmod +x ./gradlew && ./gradlew clean build -x test

# Runtime stage
FROM eclipse-temurin:17-jre

WORKDIR /app

COPY --from=build /app/build/libs/*.jar app.jar

EXPOSE 8080

CMD ["java", "-jar", "app.jar"]
