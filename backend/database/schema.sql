DROP TABLE MEMBERS;
DROP TABLE NOTES;
DROP TABLE USERS;
DROP TABLE GROUP_TASK;

CREATE TABLE USERS(
	user_id INTEGER,
	user_name VARCHAR(100),
    email VARCHAR(100) ,
    hash_password VARCHAR(200),
    created_at DATE,
    CONSTRAINT users_user_id_pk PRIMARY KEY(user_id),
    CONSTRAINT users_email_uk UNIQUE(email)
);

CREATE TABLE GROUP_TASK(
	group_id INTEGER,
    group_name VARCHAR(30),
    group_admin INTEGER,
    CONSTRAINT group_task_group_id_pk PRIMARY KEY(group_id),
    CONSTRAINT group_task_group_admin_fk FOREIGN KEY(group_admin) REFERENCES USERS(user_id)
		ON DELETE CASCADE
);

CREATE TABLE MEMBERS(
	group_id INTEGER,
    user_id INTEGER,
    joined_at DATE,
    CONSTRAINT members_group_user_id_pk PRIMARY KEY(group_id , user_id),
    CONSTRAINT members_group_id_fk FOREIGN KEY(group_id) REFERENCES GROUP_TASK(group_id) ON DELETE CASCADE,
    CONSTRAINT members_user_id_fk FOREIGN KEY(user_id) REFERENCES USERS(user_id) ON DELETE CASCADE
    
);

CREATE TABLE NOTES(
	note_id INTEGER ,
    group_id INTEGER,
    note_types VARCHAR(100),
    note_details VARCHAR(200),
    CONSTRAINT notes_notes_id_pk PRIMARY KEY(note_id),
    CONSTRAINT notes_group_id_fk FOREIGN KEY(group_id) REFERENCES GROUP_TASK(group_id) ON DELETE CASCADE
);



