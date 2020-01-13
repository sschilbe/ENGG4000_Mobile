DROP TABLE IF EXISTS sensor;

CREATE TABLE IF NOT EXISTS sensor(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  type INTEGER,
  name text
);

INSERT or IGNORE INTO sensor VALUES (1, 0, 'Force_1');
INSERT or IGNORE INTO sensor VALUES (2, 0, 'Force_2');
INSERT or IGNORE INTO sensor VALUES (3, 0, 'Force_3');
INSERT or IGNORE INTO sensor VALUES (4, 0, 'Force_4');
INSERT or IGNORE INTO sensor VALUES (5, 0, 'Force_5');
INSERT or IGNORE INTO sensor VALUES (6, 0, 'Force_6');
INSERT or IGNORE INTO sensor VALUES (7, 0, 'Force_7');
INSERT or IGNORE INTO sensor VALUES (8, 0, 'Force_8');

INSERT or IGNORE INTO sensor VALUES (9, 1, 'IMU');

CREATE TABLE IF NOT EXISTS data(
  id INTEGER PRIMARY KEY AUTOINCREMENT
);
