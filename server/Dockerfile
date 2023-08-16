FROM maven
ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} server.jar
EXPOSE 8080
COPY . .
ENTRYPOINT ["java", "-jar", "/server.jar"]