CREATE TABLE disciplines (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE knowledge_levels (
    id INT AUTO_INCREMENT PRIMARY KEY,
    level VARCHAR(255) NOT NULL
);

CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE sections (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category_id INT,
    name VARCHAR(255) NOT NULL,
    FOREIGN KEY (category_id) REFERENCES categories(id)
);

CREATE TABLE texts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    discipline_id INT,
    knowledge_level_id INT,
    section_id INT,
    content TEXT,
    FOREIGN KEY (discipline_id) REFERENCES disciplines(id),
    FOREIGN KEY (knowledge_level_id) REFERENCES knowledge_levels(id),
    FOREIGN KEY (section_id) REFERENCES sections(id)
);

-- Insert data into disciplines
INSERT INTO disciplines (name) VALUES
('General'),
('Art'),
('Science'),
('Business'),
('Literature'),
('Mathematics'),
('Computer Science');

-- Insert data into knowledge_levels
INSERT INTO knowledge_levels (level) VALUES
('None'),
('Novice'),
('Intermediate'),
('Advanced'),
('Expert');

-- Insert data into categories
INSERT INTO categories (id, name) VALUES
(1, 'What AI Actually Is'),
(2, 'How AI Works'),
(3, 'How AI Detectors -Work-'),
(4, 'Effects of using AI'),
(5, 'AI Detector Issues');

-- Insert data into sections
INSERT INTO sections (category_id, name) VALUES
(1, 'Explanation'),
(1, 'Comparison'),
(1, 'Analogy');
(2, 'Input → Ouput') -- TODO: continue

-- Insert data into texts
INSERT INTO texts (discipline_id, knowledge_level_id, section_id, content) VALUES
((SELECT id FROM disciplines WHERE name = 'General'), 
    (SELECT id FROM knowledge_levels WHERE level = 'None'), 
        (SELECT id FROM categories WHERE name = 'What AI Actually Is'), 
            '1 Ai is a thing'
        ),
((SELECT id FROM disciplines WHERE name = 'General'), 
    (SELECT id FROM knowledge_levels WHERE level = 'Novice'), 
        (SELECT id FROM categories WHERE name = 'What AI Actually Is'), 
            (SELECT id FROM sections WHERE name = 'Explanation'), 

            'Artificial Intelligence isn’t as intelligent as we say it is; it’s essentially a vast, organized collection of knowledge, bound by rules and shaped by data.'
        ),
((SELECT id FROM disciplines WHERE name = 'General'), 
    (SELECT id FROM knowledge_levels WHERE level = 'Intermediate'), 
        (SELECT id FROM sections WHERE name = 'What AI Actually Is'), 
            '3 Ai learns'
        );
((SELECT id FROM disciplines WHERE name = 'General'), 
    (SELECT id FROM knowledge_levels WHERE level = 'Advanced'), 
        (SELECT id FROM sections WHERE name = 'What AI Actually Is'), 
            '4 Ai is a thing'
        );
((SELECT id FROM disciplines WHERE name = 'General'), 
    (SELECT id FROM knowledge_levels WHERE level = 'Expert'), 
        (SELECT id FROM sections WHERE name = 'What AI Actually Is'), 
            '5 Ai is a thing'
        );