package com.rava.studentportal.services;

import com.rava.studentportal.models.Enrollment;
import com.rava.studentportal.models.EnrollmentRequest;
import com.rava.studentportal.models.EnrollmentView;
import com.rava.studentportal.repositories.CourseRepository;
import com.rava.studentportal.repositories.EnrollmentRepository;
import com.rava.studentportal.repositories.StudentRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class EnrollmentService {
    private final EnrollmentRepository enrollmentRepository;
    private final StudentRepository studentRepository;
    private final CourseRepository courseRepository;

    public EnrollmentService(
            EnrollmentRepository enrollmentRepository,
            StudentRepository studentRepository,
            CourseRepository courseRepository
    ) {
        this.enrollmentRepository = enrollmentRepository;
        this.studentRepository = studentRepository;
        this.courseRepository = courseRepository;
    }

    public Enrollment createEnrollment(Enrollment enrollment) {
        validate(enrollment);
        return enrollmentRepository.save(enrollment);
    }

    public Enrollment createEnrollment(EnrollmentRequest request) {
        Enrollment enrollment = new Enrollment();
        enrollment.setStudentId(request.getStudentId());
        enrollment.setCourseId(request.getCourseId());
        enrollment.setEnrollmentDate(parseEnrollmentDate(request.getEnrollmentDate()));
        return createEnrollment(enrollment);
    }

    public List<EnrollmentView> getEnrollments() {
        return enrollmentRepository.findAll();
    }

    private void validate(Enrollment enrollment) {
        if (enrollment.getStudentId() == null || !studentRepository.existsById(enrollment.getStudentId())) {
            throw new ValidationException("Student must exist.");
        }
        if (enrollment.getCourseId() == null || !courseRepository.existsById(enrollment.getCourseId())) {
            throw new ValidationException("Course must exist.");
        }
        if (enrollment.getEnrollmentDate() == null) {
            throw new ValidationException("Enrollment date is required.");
        }
        if (enrollment.getEnrollmentDate().isAfter(LocalDate.now())) {
            throw new ValidationException("Enrollment date cannot be a future date.");
        }
    }

    private LocalDate parseEnrollmentDate(String value) {
        if (value == null || value.trim().isEmpty()) {
            throw new ValidationException("Enrollment date is required.");
        }
        try {
            return LocalDate.parse(value);
        } catch (RuntimeException ex) {
            throw new ValidationException("Enrollment date must be in yyyy-MM-dd format.");
        }
    }
}
