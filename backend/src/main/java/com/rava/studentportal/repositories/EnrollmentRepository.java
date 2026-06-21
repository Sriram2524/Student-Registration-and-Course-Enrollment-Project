package com.rava.studentportal.repositories;

import com.rava.studentportal.models.Enrollment;
import com.rava.studentportal.models.EnrollmentView;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.sql.PreparedStatement;
import java.util.List;

@Repository
public class EnrollmentRepository {
    private final JdbcTemplate jdbcTemplate;

    public EnrollmentRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public Enrollment save(Enrollment enrollment) {
        String sql = """
                INSERT INTO enrollments(student_id, course_id, enrollment_date)
                VALUES (?, ?, ?)
                """;
        KeyHolder keyHolder = new GeneratedKeyHolder();
        jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, new String[]{"id"});
            ps.setInt(1, enrollment.getStudentId());
            ps.setInt(2, enrollment.getCourseId());
            ps.setDate(3, Date.valueOf(enrollment.getEnrollmentDate()));
            return ps;
        }, keyHolder);

        Number key = keyHolder.getKey();
        if (key != null) {
            enrollment.setId(key.intValue());
        }
        return enrollment;
    }

    public List<EnrollmentView> findAll() {
        return jdbcTemplate.query("""
                SELECT e.id,
                       CONCAT(s.first_name, ' ', s.last_name) AS student_name,
                       c.course_name,
                       e.enrollment_date
                FROM enrollments e
                JOIN students s ON s.id = e.student_id
                JOIN courses c ON c.id = e.course_id
                ORDER BY e.id
                """, (rs, rowNum) -> {
            EnrollmentView view = new EnrollmentView();
            view.setId(rs.getInt("id"));
            view.setStudentName(rs.getString("student_name"));
            view.setCourseName(rs.getString("course_name"));
            Date enrollmentDate = rs.getDate("enrollment_date");
            view.setEnrollmentDate(enrollmentDate != null ? enrollmentDate.toLocalDate().toString() : null);
            return view;
        });
    }
}
