# Base image builder
FROM eclipse-temurin:17-jdk-alpine as builder

# Workdir
WORKDIR /opt/app

# Copy Maven Wrapper
COPY .mvn/ .mvn

# Copy Maven Wrapper script && pom.xml
COPY mvnw pom.xml ./

# Fix mvnw &
RUN dos2unix mvnw && \
    chmod u+x mvnw

# Resolves all project dependencies offline
RUN ./mvnw dependency:go-offline

# Copy source code application
COPY ./src ./src

# Install the package to a local repository
RUN ./mvnw clean install -DskipTests

# Unpacking the jar file and debug step
RUN mkdir -p target/dependency && (cd target/dependency; jar -xf ../target/*.jar)

# Base image
FROM eclipse-temurin:17-jre-alpine as runtime

# Create user
RUN addgroup -g 1003 esprit ; adduser --ingroup esprit --disabled-password --uid 1003 esprit

# Use user
USER esprit

# Path to unpacked jar from builder image
ARG DEPENDENCY=/opt/app/target/dependency

# Copy unpacked jar from builder image
COPY --from=builder ${DEPENDENCY} /opt/app

# Run the application
ENTRYPOINT ["java", "-cp", "/opt/app:/opt/app/BOOT-INF/classes:/opt/app/BOOT-INF/lib/*", "com.DSI.springjwt.SpringBootSecurityJwtApplication", "--spring.config.location=/opt/app/application-qa.properties"]
