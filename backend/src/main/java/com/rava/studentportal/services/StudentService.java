package com.rava.studentportal.services;

import com.rava.studentportal.models.Student;
import com.rava.studentportal.repositories.StudentRepository;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.regex.Pattern;

@Service
public class StudentService {
    private static final Pattern EMAIL_PATTERN = Pattern.compile("^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$");
    private static final Pattern PHONE_PATTERN = Pattern.compile("^\\d+$");

    private final StudentRepository studentRepository;

    public StudentService(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    public Student createStudent(Student student) {
        validate(student);
        try {
            return studentRepository.save(student);
        } catch (DuplicateKeyException ex) {
            throw new ValidationException("Email already exists.");
        }
    }

    public List<Student> getStudents() {
        return studentRepository.findAll();
    }

    private void validate(Student student) {
        if (isBlank(student.getFirstName())) {
            throw new ValidationException("First name is required.");
        }
        if (isBlank(student.getLastName())) {
            throw new ValidationException("Last name is required.");
        }
        if (isBlank(student.getEmail()) || !EMAIL_PATTERN.matcher(student.getEmail()).matches()) {
            throw new ValidationException("Valid email is required.");
        }
        if (isBlank(student.getPhoneNumber()) || !PHONE_PATTERN.matcher(student.getPhoneNumber()).matches()) {
            throw new ValidationException("Phone number must be numeric.");
        }
    }

    private boolean isBlank(String value) {
        return value == null || value.trim().isEmpty();
    }
}
