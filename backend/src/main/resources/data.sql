INSERT INTO courses(course_name)
SELECT 'Java Fundamentals'
WHERE NOT EXISTS (SELECT 1 FROM courses WHERE course_name = 'Java Fundamentals');

INSERT INTO courses(course_name)
SELECT 'React Basics'
WHERE NOT EXISTS (SELECT 1 FROM courses WHERE course_name = 'React Basics');

INSERT INTO courses(course_name)
SELECT 'Database Essentials'
WHERE NOT EXISTS (SELECT 1 FROM courses WHERE course_name = 'Database Essentials');
