package com.rava.studentportal.repositories;

import com.rava.studentportal.models.Course;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class CourseRepository {
    private final JdbcTemplate jdbcTemplate;

    private final RowMapper<Course> rowMapper = (rs, rowNum) -> {
        Course course = new Course();
        course.setId(rs.getInt("id"));
        course.setCourseName(rs.getString("course_name"));
        return course;
    };

    public CourseRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<Course> findAll() {
        return jdbcTemplate.query("""
                SELECT id, course_name
                FROM courses
                ORDER BY id
                """, rowMapper);
    }

    public boolean existsById(Integer id) {
        Integer count = jdbcTemplate.queryForObject(
                "SELECT COUNT(*) FROM courses WHERE id = ?",
                Integer.class,
                id
        );
        return count != null && count > 0;
    }
}
