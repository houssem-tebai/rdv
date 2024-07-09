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
RUN ./mvnw clean install -DskipTests && \
    mkdir -p target/dependency && (cd target/dependency; jar -xf ../*.jar) && ls -l target/dependency

# Copy unpacked jar from builder image
COPY /opt/app/target/dependency/BOOT-INF/lib /opt/app/lib
COPY /opt/app/target/dependency/META-INF /opt/app/META-INF
COPY /opt/app/target/dependency/BOOT-INF/classes /opt/app

# Base image
FROM eclipse-temurin:17-jre-alpine as runtime

# Create user
RUN addgroup -g 1003 esprit ; adduser --ingroup esprit --disabled-password --uid 1003 esprit

# Use user
USER esprit

# Path to unpacked jar from builder image
ARG DEPENDENCY=/opt/app/target/dependency

# Run the application
ENTRYPOINT ["java","-cp","opt/app:opt/app/lib/*","-Dspring.config.location=/opt/app/application-qa.properties","com.DSI.springjwt.SpringBootSecurityJwtApplication"]
