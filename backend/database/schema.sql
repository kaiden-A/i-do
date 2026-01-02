

-- -- 1. Users Table
-- CREATE TABLE users (
--     user_id INT PRIMARY KEY,
--     user_name VARCHAR(100),
--     email VARCHAR(100) UNIQUE,
--     hash_password VARCHAR(200),
--     created_at DATE
-- );

-- -- 2. Groups Table
-- CREATE TABLE group_task (
--     group_id INT AUTO_INCREMENT PRIMARY KEY,
--     group_name VARCHAR(100),
--     group_admin INT,
--     group_desc VARCHAR(200),
--     FOREIGN KEY (group_admin) REFERENCES users(user_id) ON DELETE CASCADE
-- );

-- -- 3. Group Members (Linking Users to Groups)
-- CREATE TABLE members (
--     group_id INT,
--     user_id INT,
--     joined_at DATE,
--     PRIMARY KEY (group_id, user_id),
--     FOREIGN KEY (group_id) REFERENCES group_task(group_id) ON DELETE CASCADE,
--     FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
-- );

-- -- 4. Tasks Table
-- CREATE TABLE task (
--     task_id INT AUTO_INCREMENT PRIMARY KEY,
--     group_id INT,
--     created_by INT,
--     user_id INT, -- Assigned User
--     title VARCHAR(100),
--     task_desc VARCHAR(100),
--     status VARCHAR(10),
--     created_at DATE,
--     due_date DATE,
--     FOREIGN KEY (group_id) REFERENCES group_task(group_id) ON DELETE CASCADE,
--     FOREIGN KEY (created_by) REFERENCES users(user_id) ON DELETE CASCADE,
--     FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
-- );

-- -- 5. Notes Table
-- CREATE TABLE notes (
--     note_id INT AUTO_INCREMENT PRIMARY KEY,
--     group_id INT,
--     note_types VARCHAR(100),
--     note_details VARCHAR(200),
--     created_by INT,
--     created_at DATE,
--     notes_link VARCHAR(150),
--     FOREIGN KEY (group_id) REFERENCES group_task(group_id) ON DELETE CASCADE,
--     FOREIGN KEY (created_by) REFERENCES users(user_id)
-- );

-- -- 6. Invites Table
-- CREATE TABLE invites (
--     invite_id INT AUTO_INCREMENT PRIMARY KEY,
--     group_id INT,
--     invite_token VARCHAR(100),
--     expires_at DATE,
--     FOREIGN KEY (group_id) REFERENCES group_task(group_id)
-- );