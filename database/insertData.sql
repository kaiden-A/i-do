-- users
INSERT INTO users VALUES 
('u001','Amir','amir@gmail.com','$2b$10$K8ZpQnVh3e4yL9tYx7C0uOZfXc1AqR9m2P5H6sJdE8WkL0vUq', SYSTIMESTAMP);

INSERT INTO users VALUES 
('u002','Aishah','aishah@yahoo.com','$2b$10$XH2Y9BqM8C5P0LZVJdNwK3FQ4A7S1R6TEmUo', SYSTIMESTAMP);

INSERT INTO users VALUES 
('u003','Faris','faris@gmail.com','$2b$10$RkFZP0e8nS7A5TqB1JxVdM9hUQ6yE2oL', SYSTIMESTAMP);

INSERT INTO users VALUES 
('u004','Nurul','nurul@yahoo.com','$2b$10$9A8U7P0JH6FZ5S2QkB3MVeRCL1x4nDyT', SYSTIMESTAMP);

INSERT INTO users VALUES 
('u005','Hafiz','hafiz@gmail.com','$2b$10$S4JY2A5D6C9kH8B7ZPqN1eF0EULxv', SYSTIMESTAMP);

INSERT INTO users VALUES 
('u006','Siti','siti@yahoo.com','$2b$10$QZ0J6T4D5L3P2N7S9A1xBHFY8UkM', SYSTIMESTAMP);

INSERT INTO users VALUES 
('u007','Irfan','irfan@gmail.com','$2b$10$8E9HkP0Z5M4FJY7TQ2A3Sx1UL6D', SYSTIMESTAMP);

INSERT INTO users VALUES 
('u008','Lina','lina@yahoo.com','$2b$10$A6Q4T2LZJ8H0S5xF7N9M1E3CkDPY', SYSTIMESTAMP);

INSERT INTO users VALUES 
('u009','Fadli','fadli@gmail.com','$2b$10$3S6F5A1J0ZxH2L9M8NQkT7YEDBP4', SYSTIMESTAMP);

INSERT INTO users VALUES 
('u010','Rina','rina@yahoo.com','$2b$10$H9Q6Z2C5J1P4YF8N0A7LkTSDM3xE', SYSTIMESTAMP);


--groups
INSERT INTO project_groups VALUES ('g001','web project',SYSTIMESTAMP,'u001');
INSERT INTO project_groups VALUES ('g002','database project',SYSTIMESTAMP,'u002');
INSERT INTO project_groups VALUES ('g003','mobile app',SYSTIMESTAMP,'u003');
INSERT INTO project_groups VALUES ('g004','system design',SYSTIMESTAMP,'u004');
INSERT INTO project_groups VALUES ('g005','final year project',SYSTIMESTAMP,'u005');
INSERT INTO project_groups VALUES ('g006','mini project',SYSTIMESTAMP,'u006');
INSERT INTO project_groups VALUES ('g007','group assignment',SYSTIMESTAMP,'u007');
INSERT INTO project_groups VALUES ('g008','software project',SYSTIMESTAMP,'u008');
INSERT INTO project_groups VALUES ('g009','testing project',SYSTIMESTAMP,'u009');
INSERT INTO project_groups VALUES ('g010','demo project',SYSTIMESTAMP,'u010');

--members
insert into members values ('g001','u001',systimestamp);
insert into members values ('g001','u002',systimestamp);
insert into members values ('g002','u002',systimestamp);
insert into members values ('g002','u003',systimestamp);
insert into members values ('g003','u003',systimestamp);
insert into members values ('g003','u004',systimestamp);
insert into members values ('g004','u004',systimestamp);
insert into members values ('g004','u005',systimestamp);
insert into members values ('g005','u005',systimestamp);
insert into members values ('g005','u006',systimestamp);

--task
insert into tasks values ('t001','g001','setup repo','create github repository','pending',null,'u001','u002');
insert into tasks values ('t002','g001','design logo','make project logo','in_progress',null,'u001','u001');
insert into tasks values ('t003','g002','gather requirements','talk to users','pending',null,'u002','u003');
insert into tasks values ('t004','g002','write plan','prepare project plan','completed',null,'u002','u003');
insert into tasks values ('t005','g003','create database','create tables','pending',null,'u003','u004');
insert into tasks values ('t006','g003','design api','plan api endpoints','in_progress',null,'u003','u004');
insert into tasks values ('t007','g004','ui design','draw ui screens','pending',null,'u004','u005');
insert into tasks values ('t008','g004','backend setup','setup server','completed',null,'u004','u005');
insert into tasks values ('t009','g005','testing','test the system','pending',null,'u005','u006');
insert into tasks values ('t010','g005','deployment','deploy system','in_progress',null,'u005','u006');


--notes
insert into notes values ('n001','g001','first meeting notes','u001');
insert into notes values ('n002','g001','logo ideas','u002');
insert into notes values ('n003','g002','requirements list','u003');
insert into notes values ('n004','g002','plan draft','u002');
insert into notes values ('n005','g003','database design','u004');
insert into notes values ('n006','g003','api notes','u003');
insert into notes values ('n007','g004','ui sketches','u005');
insert into notes values ('n008','g004','server setup','u004');
insert into notes values ('n009','g005','test cases','u006');
insert into notes values ('n010','g005','deploy steps','u005');


--group_invites
insert into group_invites values ('i001','g001','inv001',null,0,'u001',systimestamp);
insert into group_invites values ('i002','g002','inv002',null,0,'u002',systimestamp);
insert into group_invites values ('i003','g003','inv003',null,0,'u003',systimestamp);
insert into group_invites values ('i004','g004','inv004',null,0,'u004',systimestamp);
insert into group_invites values ('i005','g005','inv005',null,0,'u005',systimestamp);
insert into group_invites values ('i006','g006','inv006',null,0,'u006',systimestamp);
insert into group_invites values ('i007','g007','inv007',null,0,'u007',systimestamp);
insert into group_invites values ('i008','g008','inv008',null,0,'u008',systimestamp);
insert into group_invites values ('i009','g009','inv009',null,0,'u009',systimestamp);
insert into group_invites values ('i010','g010','inv010',null,0,'u010',systimestamp);
 
commit;


