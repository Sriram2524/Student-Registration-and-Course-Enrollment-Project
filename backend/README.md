# Student Portal Backend

Spring Boot + Apache Camel backend for the Student Registration and Course Enrollment Portal.

## Required Database

Create a PostgreSQL database:

```sql
CREATE DATABASE student_portal;
```

Default connection in `src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/student_portal
spring.datasource.username=${DB_USERNAME:postgres}
spring.datasource.password=${DB_PASSWORD:postgres}
```

If your local PostgreSQL password is not `postgres`, set environment variables before running:

```bash
set DB_USERNAME=postgres
set DB_PASSWORD=your_password
```

## Run

From `backend/`:

```bash
mvn spring-boot:run
```

The backend runs at:

```text
http://localhost:8080
```

## APIs

- `POST /api/students`
- `GET /api/students`
- `GET /api/courses`
- `POST /api/enrollments`
- `GET /api/enrollments`
