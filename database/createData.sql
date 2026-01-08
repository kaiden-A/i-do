
-- Drop child tables first
DROP TABLE group_invites CASCADE CONSTRAINTS;
DROP TABLE notes CASCADE CONSTRAINTS;
DROP TABLE tasks CASCADE CONSTRAINTS;
DROP TABLE members CASCADE CONSTRAINTS;

-- Drop parent tables
DROP TABLE project_groups CASCADE CONSTRAINTS;
DROP TABLE users CASCADE CONSTRAINTS;


CREATE TABLE users (
    user_id VARCHAR2(6) NOT NULL,
    user_name VARCHAR2(50) NOT NULL,
    email VARCHAR2(50) NOT NULL,
    hash_password VARCHAR2(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT users_user_id_pk PRIMARY KEY (user_id),
    CONSTRAINT users_email_uk UNIQUE (email)
);

CREATE TABLE project_groups (
    group_id VARCHAR2(6) NOT NULL,
    group_name VARCHAR2(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR2(6) NOT NULL,
    CONSTRAINT groups_group_id_pk PRIMARY KEY (group_id),
    CONSTRAINT groups_created_by_fk 
    FOREIGN KEY (created_by) REFERENCES users(user_id)
);

CREATE TABLE members (
    group_id VARCHAR2(6) NOT NULL,
    user_id VARCHAR2(6) NOT NULL,
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT members_group_user_pk 
    PRIMARY KEY (group_id, user_id),
    CONSTRAINT members_group_id_fk 
    FOREIGN KEY (group_id) REFERENCES project_groups(group_id) ON DELETE CASCADE,
    CONSTRAINT members_user_id_fk 
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE tasks (
    task_id VARCHAR2(6) NOT NULL,
    group_id VARCHAR2(6) NOT NULL,
    title VARCHAR2(50) NOT NULL,
    description VARCHAR2(120),
    status VARCHAR2(20) NOT NULL,
    due_date DATE,
    created_by VARCHAR2(6) NOT NULL,
    assigned_to VARCHAR2(6) NOT NULL,
    CONSTRAINT tasks_task_id_pk PRIMARY KEY (task_id),
    CONSTRAINT tasks_group_id_fk 
    FOREIGN KEY (group_id) REFERENCES project_groups(group_id) ON DELETE CASCADE,
    CONSTRAINT tasks_created_by_fk 
    FOREIGN KEY (created_by) REFERENCES users(user_id),
    CONSTRAINT tasks_assigned_to_fk 
    FOREIGN KEY (assigned_to) REFERENCES users(user_id),
    CONSTRAINT tasks_status_ck 
        CHECK (status IN ('pending', 'in_progress', 'completed'))
);

CREATE TABLE notes (
    note_id VARCHAR2(6) NOT NULL,
    group_id VARCHAR2(6) NOT NULL,
    note_details VARCHAR2(50) NOT NULL,
    created_by VARCHAR2(6) NOT NULL,
    CONSTRAINT notes_note_id_pk PRIMARY KEY (note_id),
    CONSTRAINT notes_group_id_fk 
    FOREIGN KEY (group_id) REFERENCES project_groups(group_id) ON DELETE CASCADE,
    CONSTRAINT notes_created_by_fk 
    FOREIGN KEY (created_by) REFERENCES users(user_id)
);

CREATE TABLE group_invites (
    invite_id VARCHAR2(6) NOT NULL,
    group_id VARCHAR2(6) NOT NULL,
    invite_token VARCHAR2(30) NOT NULL,
    expires_at TIMESTAMP,
    CONSTRAINT group_invites_invite_id_pk PRIMARY KEY (invite_id),
    CONSTRAINT group_invites_invite_token_uk 
    UNIQUE (invite_token),
    CONSTRAINT group_invites_group_id_fk 
    FOREIGN KEY (group_id) REFERENCES project_groups(group_id) ON DELETE CASCADE,
    CONSTRAINT group_invites_created_by_fk 
    FOREIGN KEY (created_by) REFERENCES users(user_id)
);
