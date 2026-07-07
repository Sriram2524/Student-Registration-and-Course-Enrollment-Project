package com.rava.studentportal.routes;

import com.rava.studentportal.models.ApiError;
import com.rava.studentportal.models.ApiResponse;
import com.rava.studentportal.models.Enrollment;
import com.rava.studentportal.models.EnrollmentRequest;
import com.rava.studentportal.models.EnrollmentResponse;
import com.rava.studentportal.models.Student;
import com.rava.studentportal.services.CourseService;
import com.rava.studentportal.services.EnrollmentService;
import com.rava.studentportal.services.StudentService;
import com.rava.studentportal.services.ValidationException;
import org.apache.camel.Exchange;
import org.apache.camel.builder.RouteBuilder;
import org.apache.camel.model.rest.RestBindingMode;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

@Component
public class ApiRoutes extends RouteBuilder {
    private static final Logger LOGGER = LoggerFactory.getLogger(ApiRoutes.class);

    private final StudentService studentService;
    private final CourseService courseService;
    private final EnrollmentService enrollmentService;

    public ApiRoutes(
            StudentService studentService,
            CourseService courseService,
            EnrollmentService enrollmentService
    ) {
        this.studentService = studentService;
        this.courseService = courseService;
        this.enrollmentService = enrollmentService;
    }

    @Override
    public void configure() {
        onException(ValidationException.class)
                .handled(true)
                .setHeader(Exchange.HTTP_RESPONSE_CODE, constant(HttpStatus.BAD_REQUEST.value()))
                .process(exchange -> {
                    Exception exception = exchange.getProperty(Exchange.EXCEPTION_CAUGHT, Exception.class);
                    exchange.getMessage().setBody(new ApiError(exception.getMessage()));
                });

        onException(Exception.class)
                .handled(true)
                .setHeader(Exchange.HTTP_RESPONSE_CODE, constant(HttpStatus.INTERNAL_SERVER_ERROR.value()))
                .process(exchange -> {
                    Exception exception = exchange.getProperty(Exchange.EXCEPTION_CAUGHT, Exception.class);
                    LOGGER.error("Unexpected API error", exception);
                    exchange.getMessage().setBody(new ApiError("Unexpected server error."));
                });

        restConfiguration()
                .component("servlet")
                .bindingMode(RestBindingMode.json)
                .dataFormatProperty("prettyPrint", "true")

        rest("/")
                .post("/students")
                    .type(Student.class)
                    .to("direct:createStudent")
                .get("/students")
                    .to("direct:getStudents")
                .get("/courses")
                    .to("direct:getCourses")
                .post("/enrollments")
                    .type(EnrollmentRequest.class)
                    .to("direct:createEnrollment")
                .get("/enrollments")
                    .to("direct:getEnrollments");

        from("direct:createStudent")
                .routeId("create-student-route")
                .process(exchange -> {
                    Student request = exchange.getMessage().getBody(Student.class);
                    Student student = studentService.createStudent(request);
                    exchange.getMessage().setBody(new ApiResponse<>("Student registered successfully.", student));
                });

        from("direct:getStudents")
                .routeId("get-students-route")
                .bean(studentService, "getStudents");

        from("direct:getCourses")
                .routeId("get-courses-route")
                .bean(courseService, "getCourses");

        from("direct:createEnrollment")
                .routeId("create-enrollment-route")
                .process(exchange -> {
                    EnrollmentRequest request = exchange.getMessage().getBody(EnrollmentRequest.class);
                    Enrollment enrollment = enrollmentService.createEnrollment(request);
                    exchange.getMessage().setBody(new ApiResponse<>(
                            "Enrollment created successfully.",
                            new EnrollmentResponse(enrollment)
                    ));
                });

        from("direct:getEnrollments")
                .routeId("get-enrollments-route")
                .bean(enrollmentService, "getEnrollments");
    }
}
