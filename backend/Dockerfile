# Stage 1: Build the Spring Boot app
FROM maven:3.9.9-eclipse-temurin-22-jammy AS build

# Set the working directory inside the container
WORKDIR /app

# Copy the pom.xml and download project dependencies
COPY pom.xml .
COPY src ./src

# Set environment variables using ARG values
ARG SSL_KEY_STORE
ENV SSL_KEY_STORE=${SSL_KEY_STORE}
# Add the keystore to src/main/resources
RUN echo "$SSL_KEY_STORE" | base64 -d > ./src/main/resources/keystore.p12

# Package the Spring Boot application (run Maven build)
RUN mvn clean package -DskipTests

# Stage 2: Run the Spring Boot app
FROM openjdk:24-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the JAR file from the build stage
COPY --from=build /app/target/sealidea-0.0.1-SNAPSHOT.jar app.jar

# Set environment variables using ARG values
ARG PROD_POSTGRES_DB
ARG PROD_POSTGRES_USERNAME
ARG PROD_POSTGRES_PASSWORD
ARG CORS_ORIGIN_HOST
ARG SSL_KEY_STORE_ALIAS
ARG SSL_KEY_STORE_PASSWORD
ARG SPRING_REMEMBER_ME_KEY

ENV SPRING_PROFILES_ACTIVE=prod
ENV PROD_POSTGRES_DB=${PROD_POSTGRES_DB}
ENV PROD_POSTGRES_USERNAME=${PROD_POSTGRES_USERNAME}
ENV PROD_POSTGRES_PASSWORD=${PROD_POSTGRES_PASSWORD}
ENV CORS_ORIGIN_HOST=${CORS_ORIGIN_HOST}
ENV SSL_KEY_STORE_ALIAS=${SSL_KEY_STORE_ALIAS}
ENV SSL_KEY_STORE_PASSWORD=${SSL_KEY_STORE_PASSWORD}
ENV SPRING_REMEMBER_ME_KEY=${SPRING_REMEMBER_ME_KEY}

# Expose the default Spring Boot port
EXPOSE 8080

# Run the Spring Boot application
CMD ["java", "-jar", "app.jar"]
