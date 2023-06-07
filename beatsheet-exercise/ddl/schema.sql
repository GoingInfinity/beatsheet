create sequence act_seq
    increment by 1;

alter sequence act_seq owner to admin;

create sequence beat_seq
    increment by 1;

alter sequence beat_seq owner to admin;

create table act
(
    id   bigint not null
        primary key,
    name varchar(255)
);

alter table act
    owner to admin;

create table beat
(
    act_id      bigint
        constraint fkci646g4xssfx68hrucs2u8y4
            references act,
    id          bigint not null
        primary key,
    cameraangle varchar(255),
    content     varchar(255),
    name        varchar(255),
    notes       varchar(255),
    time        varchar(255)
);

alter table beat
    owner to admin;

INSERT INTO act (id, name) VALUES (nextval('act_seq'), 'Introduction');
INSERT INTO act (id, name) VALUES (nextval('act_seq'), 'The Dream');
INSERT INTO act (id, name) VALUES (nextval('act_seq'), 'The Preparation');
INSERT INTO act (id, name) VALUES (nextval('act_seq'), 'The Launch');
INSERT INTO act (id, name) VALUES (nextval('act_seq'), 'The Adventure');
INSERT INTO act (id, name) VALUES (nextval('act_seq'), 'The Problem');
INSERT INTO act (id, name) VALUES (nextval('act_seq'), 'The Solution');
INSERT INTO act (id, name) VALUES (nextval('act_seq'), 'The Return');
INSERT INTO act (id, name) VALUES (nextval('act_seq'), 'The Resolution');


-- Inserting beats for 'Introduction' Act
INSERT INTO beat (id, act_id, cameraangle, content, name, notes, time) VALUES (nextval('beat_seq'), 1, 'Medium shot', 'We meet our hero, a bright and imaginative 8-year-old named Alex who is fascinated by everything about space.', 'Beat 1', 'Establish Alex passion for space', '0:00-0:30');
INSERT INTO beat (id, act_id, cameraangle, content, name, notes, time) VALUES (nextval('beat_seq'), 1, 'Wide shot', 'Alex at school, getting reprimanded for daydreaming about space during class.', 'Beat 2', 'Show contrast between Alex imagination and the drab classroom', '0:30-1:00');
INSERT INTO beat (id, act_id, cameraangle, content, name, notes, time) VALUES (nextval('beat_seq'), 1, 'Low angle shot', 'At home, Alex constructs a makeshift rocket ship from cardboard boxes. His mother gives him a piece of candy as a snack.', 'Beat 3', 'Emphasize the scale of Alex imagination, introduce the candy element', '1:00-2:00');

-- Inserting beats for 'The Dream' Act
INSERT INTO beat (id, act_id, cameraangle, content, name, notes, time) VALUES (nextval('beat_seq'), 2, 'Point of view shot', 'That night, Alex dreams of soaring through space in his cardboard rocket ship.', 'Beat 1', 'Capture the magic of Alex dream', '2:00-2:30');
INSERT INTO beat (id, act_id, cameraangle, content, name, notes, time) VALUES (nextval('beat_seq'), 2, 'Wide shot', 'In the dream, Alex marvels at the sight of distant stars and galaxies.', 'Beat 2', 'Show the beauty of space', '2:30-3:00');
INSERT INTO beat (id, act_id, cameraangle, content, name, notes, time) VALUES (nextval('beat_seq'), 2, 'Medium shot', 'Alex spots a planet made entirely of candy and decides to land.', 'Beat 3', 'Introduce the candy planet', '3:00-3:30');

-- Inserting beats for 'The Preparation' Act
INSERT INTO beat (id, act_id, cameraangle, content, name, notes, time) VALUES (nextval('beat_seq'), 3, 'Close up shot', 'Alex wakes up excited and starts preparing for his space adventure.', 'Beat 1', 'Show Alex determination', '3:30-4:00');
INSERT INTO beat (id, act_id, cameraangle, content, name, notes, time) VALUES (nextval('beat_seq'), 3, 'Wide shot', 'He collects candy and stores it in his rocket ship for his journey.', 'Beat 2', 'Emphasize the preparation for the journey', '4:00-4:30');
INSERT INTO beat (id, act_id, cameraangle, content, name, notes, time) VALUES (nextval('beat_seq'), 3, 'Medium shot', 'Alex says goodnight to his parents, ready for his space adventure.', 'Beat 3', 'Show Alex eagerness for the journey', '4:30-5:00');

-- Inserting beats for 'The Launch' Act
INSERT INTO beat (id, act_id, cameraangle, content, name, notes, time) VALUES (nextval('beat_seq'), 4, 'Low angle shot', 'Alex goes to bed and starts dreaming. His cardboard rocket ship takes off from his bedroom.', 'Beat 1', 'Capture the moment of launch', '5:00-5:30');
INSERT INTO beat (id, act_id, cameraangle, content, name, notes, time) VALUES (nextval('beat_seq'), 4, 'Point of view shot', 'The rocket navigates through clouds, stars, and the moon.', 'Beat 2', 'Show the thrill of space travel', '5:30-6:00');
INSERT INTO beat (id, act_id, cameraangle, content, name, notes, time) VALUES (nextval('beat_seq'), 4, 'Medium shot', 'Alex sets course to the candy planet he saw in his previous dream.', 'Beat 3', 'Create anticipation for the candy planet', '6:00-6:30');

-- Inserting beats for 'The Adventure' Act
INSERT INTO beat (id, act_id, cameraangle, content, name, notes, time) VALUES (nextval('beat_seq'), 5, 'Wide shot', 'Alex lands on the candy planet and starts exploring.', 'Beat 1', 'Show the wonders of the candy planet', '6:30-7:00');
INSERT INTO beat (id, act_id, cameraangle, content, name, notes, time) VALUES (nextval('beat_seq'), 5, 'Close up shot', 'He tastes different types of candy - from chocolate mountains to jellybean fields.', 'Beat 2', 'Showcase the variety of candy', '7:00-7:30');
INSERT INTO beat (id, act_id, cameraangle, content, name, notes, time) VALUES (nextval('beat_seq'), 5, 'Point of view shot', 'Alex spends the day exploring and enjoying his time.', 'Beat 3', 'Capture Alex joy and excitement', '7:30-8:00');

-- Inserting beats for 'The Problem' Act
INSERT INTO beat (id, act_id, cameraangle, content, name, notes, time) VALUES (nextval('beat_seq'), 6, 'Medium shot', 'Suddenly, Alex ship starts beeping - it running out of fuel.', 'Beat 1', 'Introduce the problem', '8:00-8:30');
INSERT INTO beat (id, act_id, cameraangle, content, name, notes, time) VALUES (nextval('beat_seq'), 6, 'Close up shot', 'He realizes he needs to find a fuel source to get back home.', 'Beat 2', 'Emphasize Alex determination', '8:30-9:00');

-- Inserting beats for 'The Solution' Act
INSERT INTO beat (id, act_id, cameraangle, content, name, notes, time) VALUES (nextval('beat_seq'), 7, 'Medium shot', 'Alex gets an idea and decides to use the sugar from the candy as fuel.', 'Beat 1', 'Show Alex resourcefulness', '9:00-9:30');
INSERT INTO beat (id, act_id, cameraangle, content, name, notes, time) VALUES (nextval('beat_seq'), 7, 'Wide shot', 'He works hard and manages to convert the candy into fuel for his ship.', 'Beat 2', 'Capture Alex efforts and success', '9:30-10:00');

-- Inserting beats for 'The Return' Act
INSERT INTO beat (id, act_id, cameraangle, content, name, notes, time) VALUES (nextval('beat_seq'), 8, 'Low angle shot', 'With the fuel problem solved, Alex blasts off from the candy planet.', 'Beat 1', 'Capture the moment of return', '10:00-10:30');
INSERT INTO beat (id, act_id, cameraangle, content, name, notes, time) VALUES (nextval('beat_seq'), 8, 'Point of view shot', 'He successfully navigates back to Earth.', 'Beat 2', 'Show the safe journey back home', '10:30-11:00');
INSERT INTO beat (id, act_id, cameraangle, content, name, notes, time) VALUES (nextval('beat_seq'), 8, 'Medium shot', 'Alex wakes up in his bed, happy from his space adventure.', 'Beat 3', 'Show Alex satisfaction from his dream adventure', '11:00-11:30');

INSERT INTO beat (id, act_id, cameraangle, content, name, notes, time) VALUES (nextval('beat_seq'), 9, 'Medium shot', 'Alex wakes up from his dream, inspired and full of joy.', 'Beat 1', 'Capture Alex contentment', '11:00-11:30');
INSERT INTO beat (id, act_id, cameraangle, content, name, notes, time) VALUES (nextval('beat_seq'), 9, 'Wide shot', 'He rushes to share his space adventure with his parents at the breakfast table.', 'Beat 2', 'Show Alex enthusiasm and happiness', '11:30-12:00');
INSERT INTO beat (id, act_id, cameraangle, content, name, notes, time) VALUES (nextval('beat_seq'), 9, 'Medium shot', 'Alex starts the new day, eager to continue exploring the world and space around him.', 'Beat 3', 'End on a positive and hopeful note', '12:00-12:30');

SELECT setval('beat_seq', 26);
SELECT setval('act_seq', 10);
