package com.rava.studentportal.repositories;

import com.rava.studentportal.models.Student;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.util.List;

@Repository
public class StudentRepository {
    private final JdbcTemplate jdbcTemplate;

    private final RowMapper<Student> rowMapper = (rs, rowNum) -> {
        Student student = new Student();
        student.setId(rs.getInt("id"));
        student.setFirstName(rs.getString("first_name"));
        student.setLastName(rs.getString("last_name"));
        student.setEmail(rs.getString("email"));
        student.setPhoneNumber(rs.getString("phone_number"));
        student.setCreatedAt(rs.getTimestamp("created_at").toLocalDateTime());
        return student;
    };

    public StudentRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public Student save(Student student) {
        String sql = """
                INSERT INTO students(first_name, last_name, email, phone_number)
                VALUES (?, ?, ?, ?)
                """;
        KeyHolder keyHolder = new GeneratedKeyHolder();
        jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, new String[]{"id"});
            ps.setString(1, student.getFirstName());
            ps.setString(2, student.getLastName());
            ps.setString(3, student.getEmail());
            ps.setString(4, student.getPhoneNumber());
            return ps;
        }, keyHolder);

        Number key = keyHolder.getKey();
        if (key != null) {
            student.setId(key.intValue());
        }
        return student;
    }

    public List<Student> findAll() {
        return jdbcTemplate.query("""
                SELECT id, first_name, last_name, email, phone_number, created_at
                FROM students
                ORDER BY id
                """, rowMapper);
    }

    public boolean existsById(Integer id) {
        Integer count = jdbcTemplate.queryForObject(
                "SELECT COUNT(*) FROM students WHERE id = ?",
                Integer.class,
                id
        );
        return count != null && count > 0;
    }
}
