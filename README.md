# Student Registration and Course Enrollment Portal

Full-stack project with React frontend, Spring Boot + Apache Camel backend, and PostgreSQL database.

## Tech Stack

- Frontend: React, React Router, Axios, Bootstrap
- Backend: Spring Boot, Apache Camel, JDBC
- Database: PostgreSQL
- Build tools: npm, Maven

## Project Structure

```text
frontend/
backend/
```

## Database Setup

Create PostgreSQL database:

```sql
CREATE DATABASE student_portal;
```

Backend reads database credentials from environment variables:

```bash
set DB_USERNAME=postgres
set DB_PASSWORD=your_password
```

If these are not set, defaults are:

```text
DB_USERNAME=postgres
DB_PASSWORD=postgres
```

## Run Backend

```bash
cd backend
mvn spring-boot:run
```

Backend runs at:

```text
http://localhost:8081
```

## Run Frontend

```bash
npm install
cd frontend
npm install
cd ..
npm run dev
```

Frontend runs at:

```text
http://localhost:3000
```

## API Endpoints

- `POST /api/students`
- `GET /api/students`
- `GET /api/courses`
- `POST /api/enrollments`
- `GET /api/enrollments`
