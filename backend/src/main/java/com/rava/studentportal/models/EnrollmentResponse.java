package com.rava.studentportal.models;

public class EnrollmentResponse {
    private Integer id;
    private Integer studentId;
    private Integer courseId;
    private String enrollmentDate;

    public EnrollmentResponse(Enrollment enrollment) {
        this.id = enrollment.getId();
        this.studentId = enrollment.getStudentId();
        this.courseId = enrollment.getCourseId();
        this.enrollmentDate = enrollment.getEnrollmentDate() != null
                ? enrollment.getEnrollmentDate().toString()
                : null;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getStudentId() {
        return studentId;
    }

    public void setStudentId(Integer studentId) {
        this.studentId = studentId;
    }

    public Integer getCourseId() {
        return courseId;
    }

    public void setCourseId(Integer courseId) {
        this.courseId = courseId;
    }

    public String getEnrollmentDate() {
        return enrollmentDate;
    }

    public void setEnrollmentDate(String enrollmentDate) {
        this.enrollmentDate = enrollmentDate;
    }
}
