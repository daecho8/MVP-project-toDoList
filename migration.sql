DROP TABLE IF EXISTS taskList;

CREATE TABLE taskList (
    id SERIAL,
    task_name TEXT,
    task_location TEXT,
    task_number INTEGER
);

INSERT INTO taskList (task_name, task_location, task_number) VALUES ('Study SQL', 'Home', 23);
INSERT INTO taskList (task_name, task_location, task_number) VALUES ('Review Heroku', 'Home', 41);
