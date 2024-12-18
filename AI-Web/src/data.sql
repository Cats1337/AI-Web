CREATE TABLE discipline (
    id INT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE knowledge (
    id INT PRIMARY KEY,
    level VARCHAR(255) NOT NULL
);

CREATE TABLE category (
    id INT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE section (
    id INT PRIMARY KEY,
    category_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    FOREIGN KEY (category_id) REFERENCES category(id)
);

CREATE TABLE texts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    discipline_id INT NOT NULL,
    knowledge_id INT NOT NULL,
    category_id INT NOT NULL,
    section_id INT NOT NULL,
    content TEXT,
    FOREIGN KEY (discipline_id) REFERENCES discipline(id),
    FOREIGN KEY (knowledge_id) REFERENCES knowledge(id),
    FOREIGN KEY (category_id) REFERENCES category(id),
    FOREIGN KEY (section_id) REFERENCES section(id)
);



-- Insert data into discipline
INSERT INTO discipline (id, name) VALUES
(1, 'General'), 
(2, 'Art'), 
(3, 'Science'), 
(4, 'Business'), 
(5, 'Literature'), 
(6, 'Mathematics'), 
(7, 'Computer Science');

-- Insert data into knowledge
INSERT INTO knowledge (id, level) VALUES
(1, 'None'), 
(2, 'Novice'), 
(3, 'Intermediate'), 
(4, 'Advanced'), 
(5, 'Expert');

-- Insert data into category
INSERT INTO category (id, name) VALUES
(1, 'What AI Actually Is'), 
(2, 'How AI Works'), 
(3, 'How AI Detectors Work'), 
(4, 'Effects of Using AI'), 
(5, 'AI Detector Issues');

-- Insert data into section
INSERT INTO section (id, category_id, name) VALUES
(1, 1, 'Explanation'), 
(2, 1, 'Comparison'), 
(3, 1, 'Analogy'),
(4, 2, 'Input → Output'), 
(5, 2, 'Human-like Learning'), 
(6, 2, 'Learning and Biases'),
(7, 3, 'Inside Mechanics'), 
(8, 3, 'Limitations and Flaws'), 
(9, 4, 'Confirmation Bias'),
(10, 4, 'Replacing You'), 
(11, 5, 'Applications'), 
(12, 5, 'Misconceptions'),
(13, 5, 'Accuracy Concerns'), 
(14, 5, 'Wrongful Assumptions'), 
(15, 5, 'Ethical Implications');


-- Insert data into texts
INSERT INTO texts (discipline_id, knowledge_id, section_id, category_id, content) VALUES
-- Section 1: What AI Actually Is
-- Explanation
-- General
(1, 1, 1, 1, ''),
(1, 2, 1, 1, 'Artificial Intelligence isn’t as intelligent as we say it is; it’s essentially a vast, organized collection of knowledge, bound by rules and shaped by data.'),
(1, 3, 1, 1, ''),
(1, 4, 1, 1, ''),
(1, 5, 1, 1, ''),
-- Art
(2, 1, 1, 1, ''),
(2, 2, 1, 1, 'Art'),
(2, 3, 1, 1, ''),
(2, 4, 1, 1, ''),
(2, 5, 1, 1, ''),
-- Science
(3, 1, 1, 1, ''),
(3, 2, 1, 1, 'Science'),
(3, 3, 1, 1, ''),
(3, 4, 1, 1, ''),
(3, 5, 1, 1, ''),
-- Business
(4, 1, 1, 1, ''),
(4, 2, 1, 1, 'Business'),
(4, 3, 1, 1, ''),
(4, 4, 1, 1, ''),
(4, 5, 1, 1, ''),
-- Literature
(5, 1, 1, 1, ''),
(5, 2, 1, 1, 'Literature'),
(5, 3, 1, 1, ''),
(5, 4, 1, 1, ''),
(5, 5, 1, 1, ''),
-- Mathematics
(6, 1, 1, 1, ''),
(6, 2, 1, 1, 'Mathematics'),
(6, 3, 1, 1, ''),
(6, 4, 1, 1, ''),
(6, 5, 1, 1, ''),
-- Computer Science
(7, 1, 1, 1, ''),
(7, 2, 1, 1, 'Computer Science'),
(7, 3, 1, 1, ''),
(7, 4, 1, 1, ''),
(7, 5, 1, 1, ''),


-- Comparison
-- General
(1, 1, 2, 1, ''),
(1, 2, 2, 1, 'AI is like a child. It learns quickly, but we’re not entirely sure how it’s learning; its creativity seemingly knows no bounds, but it’s often wrong with the simplest or most obvious things. You can never know what someone, or something, else is truly thinking; we know animals think, but we don’t know what.'),
(1, 3, 2, 1, ''),
(1, 4, 2, 1, ''),
(1, 5, 2, 1, ''),
-- Art
(2, 1, 2, 1, ''),
(2, 2, 2, 1, 'Art'),
(2, 3, 2, 1, ''),
(2, 4, 2, 1, ''),
(2, 5, 2, 1, ''),
-- Science
(3, 1, 2, 1, ''),
(3, 2, 2, 1, 'Science'),
(3, 3, 2, 1, ''),
(3, 4, 2, 1, ''),
(3, 5, 2, 1, ''),
-- Business
(4, 1, 2, 1, ''),
(4, 2, 2, 1, 'Business'),
(4, 3, 2, 1, ''),
(4, 4, 2, 1, ''),
(4, 5, 2, 1, ''),
-- Literature
(5, 1, 2, 1, ''),
(5, 2, 2, 1, 'Literature'),
(5, 3, 2, 1, ''),
(5, 4, 2, 1, ''),
(5, 5, 2, 1, ''),
-- Mathematics
(6, 1, 2, 1, ''),
(6, 2, 2, 1, 'Mathematics'),
(6, 3, 2, 1, ''),
(6, 4, 2, 1, ''),
(6, 5, 2, 1, ''),
-- Computer Science
(7, 1, 2, 1, ''),
(7, 2, 2, 1, 'Computer Science'),
(7, 3, 2, 1, ''),
(7, 4, 2, 1, ''),
(7, 5, 2, 1, ''),

-- Analogy
-- General
(1, 1, 3, 1, ''),
(1, 2, 3, 1, 'Imagine AI’s “brain” as something like the Library of Alexandria—massive and diverse, yet users don’t fully know its contents. It''s always evolving and updating through new data and connections.'),
(1, 3, 3, 1, ''),
(1, 4, 3, 1, ''),
(1, 5, 3, 1, ''),
-- Art
(2, 1, 3, 1, ''),
(2, 2, 3, 1, 'Art'),
(2, 3, 3, 1, ''),
(2, 4, 3, 1, ''),
(2, 5, 3, 1, ''),
-- Science
(3, 1, 3, 1, ''),
(3, 2, 3, 1, 'Science'),
(3, 3, 3, 1, ''),
(3, 4, 3, 1, ''),
(3, 5, 3, 1, ''),
-- Business
(4, 1, 3, 1, ''),
(4, 2, 3, 1, 'Business'),
(4, 3, 3, 1, ''),
(4, 4, 3, 1, ''),
(4, 5, 3, 1, ''),
-- Literature
(5, 1, 3, 1, ''),
(5, 2, 3, 1, 'Literature'),
(5, 3, 3, 1, ''),
(5, 4, 3, 1, ''),
(5, 5, 3, 1, ''),
-- Mathematics
(6, 1, 3, 1, ''),
(6, 2, 3, 1, 'Mathematics'),
(6, 3, 3, 1, ''),
(6, 4, 3, 1, ''),
(6, 5, 3, 1, ''),
-- Computer Science
(7, 1, 3, 1, ''),
(7, 2, 3, 1, 'Computer Science'),
(7, 3, 3, 1, ''),
(7, 4, 3, 1, ''),
(7, 5, 3, 1, ''),


-- Section 2: How AI Works
-- Input → Output
-- General
(1, 1, 4, 2, ''),
(1, 2, 4, 2, 'Just as our minds convert sensory input into thoughts, AI processes data, patterns, and connections to generate an output.'),
(1, 3, 4, 2, ''),
(1, 4, 4, 2, ''),
(1, 5, 4, 2, ''),
-- Art
(2, 1, 4, 2, ''),
(2, 2, 4, 2, 'Art'),
(2, 3, 4, 2, ''),
(2, 4, 4, 2, ''),
(2, 5, 4, 2, ''),
-- Science
(3, 1, 4, 2, ''),
(3, 2, 4, 2, 'Science'),
(3, 3, 4, 2, ''),
(3, 4, 4, 2, ''),
(3, 5, 4, 2, ''),
-- Business
(4, 1, 4, 2, ''),
(4, 2, 4, 2, 'Business'),
(4, 3, 4, 2, ''),
(4, 4, 4, 2, ''),
(4, 5, 4, 2, ''),
-- Literature
(5, 1, 4, 2, ''),
(5, 2, 4, 2, 'Literature'),
(5, 3, 4, 2, ''),
(5, 4, 4, 2, ''),
(5, 5, 4, 2, ''),
-- Mathematics
(6, 1, 4, 2, ''),
(6, 2, 4, 2, 'Mathematics'),
(6, 3, 4, 2, ''),
(6, 4, 4, 2, ''),
(6, 5, 4, 2, ''),
-- Computer Science
(7, 1, 4, 2, ''),
(7, 2, 4, 2, 'Computer Science'),
(7, 3, 4, 2, ''),
(7, 4, 4, 2, ''),
(7, 5, 4, 2, ''),

-- Human-like Learning
-- General
(1, 1, 5, 2, ''),
(1, 2, 5, 2, 'AI’s “thinking” process resembles our own, but with its own form of trial and error via methods like reinforcement learning. However, it’s fundamentally different because it lacks self-awareness or understanding.'),
(1, 3, 5, 2, ''),
(1, 4, 5, 2, ''),
(1, 5, 5, 2, ''),
-- Art
(2, 1, 5, 2, ''),
(2, 2, 5, 2, 'Art'),
(2, 3, 5, 2, ''),
(2, 4, 5, 2, ''),
(2, 5, 5, 2, ''),
-- Science
(3, 1, 5, 2, ''),
(3, 2, 5, 2, 'Science'),
(3, 3, 5, 2, ''),
(3, 4, 5, 2, ''),
(3, 5, 5, 2, ''),
-- Business
(4, 1, 5, 2, ''),
(4, 2, 5, 2, 'Business'),
(4, 3, 5, 2, ''),
(4, 4, 5, 2, ''),
(4, 5, 5, 2, ''),
-- Literature
(5, 1, 5, 2, ''),
(5, 2, 5, 2, 'Literature'),
(5, 3, 5, 2, ''),
(5, 4, 5, 2, ''),
(5, 5, 5, 2, ''),
-- Mathematics
(6, 1, 5, 2, ''),
(6, 2, 5, 2, 'Mathematics'),
(6, 3, 5, 2, ''),
(6, 4, 5, 2, ''),
(6, 5, 5, 2, ''),
-- Computer Science
(7, 1, 5, 2, ''),
(7, 2, 5, 2, 'Computer Science'),
(7, 3, 5, 2, ''),
(7, 4, 5, 2, ''),
(7, 5, 5, 2, ''),

-- Learning and Biases
-- General
(1, 1, 6, 2, ''),
(1, 2, 6, 2, 'We use techniques like reinforcement learning to help AI adjust. It responds based on positive or negative feedback—similar to how we reinforce our own habits and beliefs. Over time, this feedback-driven process allows AI to fine-tune its behavior to reach desired outcomes, though it can also introduce biases if the feedback or data contains unbalanced perspectives.'),
(1, 3, 6, 2, ''),
(1, 4, 6, 2, ''),
(1, 5, 6, 2, ''),
-- Art
(2, 1, 6, 2, ''),
(2, 2, 6, 2, 'Art'),
(2, 3, 6, 2, ''),
(2, 4, 6, 2, ''),
(2, 5, 6, 2, ''),
-- Science
(3, 1, 6, 2, ''),
(3, 2, 6, 2, 'Science'),
(3, 3, 6, 2, ''),
(3, 4, 6, 2, ''),
(3, 5, 6, 2, ''),
-- Business
(4, 1, 6, 2, ''),
(4, 2, 6, 2, 'Business'),
(4, 3, 6, 2, ''),
(4, 4, 6, 2, ''),
(4, 5, 6, 2, ''),
-- Literature
(5, 1, 6, 2, ''),
(5, 2, 6, 2, 'Literature'),
(5, 3, 6, 2, ''),
(5, 4, 6, 2, ''),
(5, 5, 6, 2, ''),
-- Mathematics
(6, 1, 6, 2, ''),
(6, 2, 6, 2, 'Mathematics'),
(6, 3, 6, 2, ''),
(6, 4, 6, 2, ''),
(6, 5, 6, 2, ''),
-- Computer Science
(7, 1, 6, 2, ''),
(7, 2, 6, 2, 'Computer Science'),
(7, 3, 6, 2, ''),
(7, 4, 6, 2, ''),
(7, 5, 6, 2, ''),

-- Section 3: How AI Detectors Work
-- Inside Mechanics
-- General
(1, 1, 7, 3, ''),
(1, 2, 7, 3, 'AI detectors compare outputs to known or indexed data to assess likelihood of “human” or “AI” origin.'),
(1, 3, 7, 3, ''),
(1, 4, 7, 3, ''),
(1, 5, 7, 3, ''),
-- Art
(2, 1, 7, 3, ''),
(2, 2, 7, 3, 'Art'),
(2, 3, 7, 3, ''),
(2, 4, 7, 3, ''),
(2, 5, 7, 3, ''),
-- Science
(3, 1, 7, 3, ''),
(3, 2, 7, 3, 'Science'),
(3, 3, 7, 3, ''),
(3, 4, 7, 3, ''),
(3, 5, 7, 3, ''),
-- Business
(4, 1, 7, 3, ''),
(4, 2, 7, 3, 'Business'),
(4, 3, 7, 3, ''),
(4, 4, 7, 3, ''),
(4, 5, 7, 3, ''),
-- Literature
(5, 1, 7, 3, ''),
(5, 2, 7, 3, 'Literature'),
(5, 3, 7, 3, ''),
(5, 4, 7, 3, ''),
(5, 5, 7, 3, ''),
-- Mathematics
(6, 1, 7, 3, ''),
(6, 2, 7, 3, 'Mathematics'),
(6, 3, 7, 3, ''),
(6, 4, 7, 3, ''),
(6, 5, 7, 3, ''),
-- Computer Science
(7, 1, 7, 3, ''),
(7, 2, 7, 3, 'Computer Science'),
(7, 3, 7, 3, ''),
(7, 4, 7, 3, ''),
(7, 5, 7, 3, ''),

-- Limitations and Flaws
-- General
(1, 1, 8, 3, ''),
(1, 2, 8, 3, 'Detectors often struggle with rephrased or commonly stated concepts, frequently flagging responses as AI-generated if they match widely recognized phrases or templates.'),
(1, 3, 8, 3, ''),
(1, 4, 8, 3, ''),
(1, 5, 8, 3, ''),
-- Art
(2, 1, 8, 3, ''),
(2, 2, 8, 3, 'Art'),
(2, 3, 8, 3, ''),
(2, 4, 8, 3, ''),
(2, 5, 8, 3, ''),
-- Science
(3, 1, 8, 3, ''),
(3, 2, 8, 3, 'Science'),
(3, 3, 8, 3, ''),
(3, 4, 8, 3, ''),
(3, 5, 8, 3, ''),
-- Business
(4, 1, 8, 3, ''),
(4, 2, 8, 3, 'Business'),
(4, 3, 8, 3, ''),
(4, 4, 8, 3, ''),
(4, 5, 8, 3, ''),
-- Literature
(5, 1, 8, 3, ''),
(5, 2, 8, 3, 'Literature'),
(5, 3, 8, 3, ''),
(5, 4, 8, 3, ''),
(5, 5, 8, 3, ''),
-- Mathematics
(6, 1, 8, 3, ''),
(6, 2, 8, 3, 'Mathematics'),
(6, 3, 8, 3, ''),
(6, 4, 8, 3, ''),
(6, 5, 8, 3, ''),
-- Computer Science
(7, 1, 8, 3, ''),
(7, 2, 8, 3, 'Computer Science'),
(7, 3, 8, 3, ''),
(7, 4, 8, 3, ''),
(7, 5, 8, 3, ''),

-- Confirmation Bias
-- General
(1, 1, 9, 3, ''),
(1, 2, 9, 3, 'If you’re already uncertain and turn to a detection tool, you''ve likely unknowingly brought a bias that the content is AI-generated.'),
(1, 3, 9, 3, ''),
(1, 4, 9, 3, ''),
(1, 5, 9, 3, ''),
-- Art
(2, 1, 9, 3, ''),
(2, 2, 9, 3, 'Art'),
(2, 3, 9, 3, ''),
(2, 4, 9, 3, ''),
(2, 5, 9, 3, ''),
-- Science
(3, 1, 9, 3, ''),
(3, 2, 9, 3, 'Science'),
(3, 3, 9, 3, ''),
(3, 4, 9, 3, ''),
(3, 5, 9, 3, ''),
-- Business
(4, 1, 9, 3, ''),
(4, 2, 9, 3, 'Business'),
(4, 3, 9, 3, ''),
(4, 4, 9, 3, ''),
(4, 5, 9, 3, ''),
-- Literature
(5, 1, 9, 3, ''),
(5, 2, 9, 3, 'Literature'),
(5, 3, 9, 3, ''),
(5, 4, 9, 3, ''),
(5, 5, 9, 3, ''),
-- Mathematics
(6, 1, 9, 3, ''),
(6, 2, 9, 3, 'Mathematics'),
(6, 3, 9, 3, ''),
(6, 4, 9, 3, ''),
(6, 5, 9, 3, ''),
-- Computer Science
(7, 1, 9, 3, ''),
(7, 2, 9, 3, 'Computer Science'),
(7, 3, 9, 3, ''),
(7, 4, 9, 3, ''),
(7, 5, 9, 3, ''),

-- Section 4: Effects of Using AI
-- Replacing You
-- General
(1, 1, 10, 4, ''),
(1, 2, 10, 4, 'For many, AI tools are productivity boosters, sparking creativity and offering support rather than replacing jobs. AI functions as an assistant, not a substitute, especially since it lacks the critical thinking and nuanced judgment unique to humans.'),
(1, 3, 10, 4, ''),
(1, 4, 10, 4, ''),
(1, 5, 10, 4, ''),
-- Art
(2, 1, 10, 4, ''),
(2, 2, 10, 4, 'Art'),
(2, 3, 10, 4, ''),
(2, 4, 10, 4, ''),
(2, 5, 10, 4, ''),
-- Science
(3, 1, 10, 4, ''),
(3, 2, 10, 4, 'Science'),
(3, 3, 10, 4, ''),
(3, 4, 10, 4, ''),
(3, 5, 10, 4, ''),
-- Business
(4, 1, 10, 4, ''),
(4, 2, 10, 4, 'Business'),
(4, 3, 10, 4, ''),
(4, 4, 10, 4, ''),
(4, 5, 10, 4, ''),
-- Literature
(5, 1, 10, 4, ''),
(5, 2, 10, 4, 'Literature'),
(5, 3, 10, 4, ''),
(5, 4, 10, 4, ''),
(5, 5, 10, 4, ''),
-- Mathematics
(6, 1, 10, 4, ''),
(6, 2, 10, 4, 'Mathematics'),
(6, 3, 10, 4, ''),
(6, 4, 10, 4, ''),
(6, 5, 10, 4, ''),
-- Computer Science
(7, 1, 10, 4, ''),
(7, 2, 10, 4, 'Computer Science'),
(7, 3, 10, 4, ''),
(7, 4, 10, 4, ''),
(7, 5, 10, 4, ''),

-- Applications
-- General
(1, 1, 11, 4, ''),
(1, 2, 11, 4, 'AI isn’t just a shortcut or a “cheat”—in real-world settings, it’s a powerful aid in tasks like analysis, coding, communication, and data processing, enhancing human abilities rather than undermining them.'),
(1, 3, 11, 4, ''),
(1, 4, 11, 4, ''),
(1, 5, 11, 4, ''),
-- Art
(2, 1, 11, 4, ''),
(2, 2, 11, 4, 'Art'),
(2, 3, 11, 4, ''),
(2, 4, 11, 4, ''),
(2, 5, 11, 4, ''),
-- Science
(3, 1, 11, 4, ''),
(3, 2, 11, 4, 'Science'),
(3, 3, 11, 4, ''),
(3, 4, 11, 4, ''),
(3, 5, 11, 4, ''),
-- Business
(4, 1, 11, 4, ''),
(4, 2, 11, 4, 'Business'),
(4, 3, 11, 4, ''),
(4, 4, 11, 4, ''),
(4, 5, 11, 4, ''),
-- Literature
(5, 1, 11, 4, ''),
(5, 2, 11, 4, 'Literature'),
(5, 3, 11, 4, ''),
(5, 4, 11, 4, ''),
(5, 5, 11, 4, ''),
-- Mathematics
(6, 1, 11, 4, ''),
(6, 2, 11, 4, 'Mathematics'),
(6, 3, 11, 4, ''),
(6, 4, 11, 4, ''),
(6, 5, 11, 4, ''),
-- Computer Science
(7, 1, 11, 4, ''),
(7, 2, 11, 4, 'Computer Science'),
(7, 3, 11, 4, ''),
(7, 4, 11, 4, ''),
(7, 5, 11, 4, ''),

-- Misconceptions
-- General
(1, 1, 12, 4, ''),
(1, 2, 12, 4, 'A widespread misconception is that AI is equivalent to AGI (Artificial General Intelligence) or ASI (Artificial Superintelligence). While AGI would theoretically match human-level reasoning across various tasks and ASI would surpass it and us, current AI remains narrow and specialized.'),
(1, 3, 12, 4, ''),
(1, 4, 12, 4, ''),
(1, 5, 12, 4, ''),
-- Art
(2, 1, 12, 4, ''),
(2, 2, 12, 4, 'Art'),
(2, 3, 12, 4, ''),
(2, 4, 12, 4, ''),
(2, 5, 12, 4, ''),
-- Science
(3, 1, 12, 4, ''),
(3, 2, 12, 4, 'Science'),
(3, 3, 12, 4, ''),
(3, 4, 12, 4, ''),
(3, 5, 12, 4, ''),
-- Business
(4, 1, 12, 4, ''),
(4, 2, 12, 4, 'Business'),
(4, 3, 12, 4, ''),
(4, 4, 12, 4, ''),
(4, 5, 12, 4, ''),
-- Literature
(5, 1, 12, 4, ''),
(5, 2, 12, 4, 'Literature'),
(5, 3, 12, 4, ''),
(5, 4, 12, 4, ''),
(5, 5, 12, 4, ''),
-- Mathematics
(6, 1, 12, 4, ''),
(6, 2, 12, 4, 'Mathematics'),
(6, 3, 12, 4, ''),
(6, 4, 12, 4, ''),
(6, 5, 12, 4, ''),
-- Computer Science
(7, 1, 12, 4, ''),
(7, 2, 12, 4, 'Computer Science'),
(7, 3, 12, 4, ''),
(7, 4, 12, 4, ''),
(7, 5, 12, 4, ''),

-- Section 5: AI Detector Issues
-- Accuracy Concerns
-- General
(1, 1, 13, 5, ''),
(1, 2, 13, 5, 'AI detectors can mistakenly flag individuals as using AI-generated content, stifling creativity and undermining legitimate efforts.'),
(1, 3, 13, 5, ''),
(1, 4, 13, 5, ''),
(1, 5, 13, 5, ''),
-- Art
(2, 1, 13, 5, ''),
(2, 2, 13, 5, 'Art'),
(2, 3, 13, 5, ''),
(2, 4, 13, 5, ''),
(2, 5, 13, 5, ''),
-- Science
(3, 1, 13, 5, ''),
(3, 2, 13, 5, 'Science'),
(3, 3, 13, 5, ''),
(3, 4, 13, 5, ''),
(3, 5, 13, 5, ''),
-- Business
(4, 1, 13, 5, ''),
(4, 2, 13, 5, 'Business'),
(4, 3, 13, 5, ''),
(4, 4, 13, 5, ''),
(4, 5, 13, 5, ''),
-- Literature
(5, 1, 13, 5, ''),
(5, 2, 13, 5, 'Literature'),
(5, 3, 13, 5, ''),
(5, 4, 13, 5, ''),
(5, 5, 13, 5, ''),
-- Mathematics
(6, 1, 13, 5, ''),
(6, 2, 13, 5, 'Mathematics'),
(6, 3, 13, 5, ''),
(6, 4, 13, 5, ''),
(6, 5, 13, 5, ''),
-- Computer Science
(7, 1, 13, 5, ''),
(7, 2, 13, 5, 'Computer Science'),
(7, 3, 13, 5, ''),
(7, 4, 13, 5, ''),
(7, 5, 13, 5, ''),

-- Wrongful Assumptions
-- General
(1, 1, 14, 5, ''),
(1, 2, 14, 5, 'AI detectors can mistakenly flag individuals as using AI-generated content, stifling creativity and undermining legitimate efforts.'),
(1, 3, 14, 5, ''),
(1, 4, 14, 5, ''),
(1, 5, 14, 5, ''),
-- Art
(2, 1, 14, 5, ''),
(2, 2, 14, 5, 'Art'),
(2, 3, 14, 5, ''),
(2, 4, 14, 5, ''),
(2, 5, 14, 5, ''),
-- Science
(3, 1, 14, 5, ''),
(3, 2, 14, 5, 'Science'),
(3, 3, 14, 5, ''),
(3, 4, 14, 5, ''),
(3, 5, 14, 5, ''),
-- Business
(4, 1, 14, 5, ''),
(4, 2, 14, 5, 'Business'),
(4, 3, 14, 5, ''),
(4, 4, 14, 5, ''),
(4, 5, 14, 5, ''),
-- Literature
(5, 1, 14, 5, ''),
(5, 2, 14, 5, 'Literature'),
(5, 3, 14, 5, ''),
(5, 4, 14, 5, ''),
(5, 5, 14, 5, ''),
-- Mathematics
(6, 1, 14, 5, ''),
(6, 2, 14, 5, 'Mathematics'),
(6, 3, 14, 5, ''),
(6, 4, 14, 5, ''),
(6, 5, 14, 5, ''),
-- Computer Science
(7, 1, 14, 5, ''),
(7, 2, 14, 5, 'Computer Science'),
(7, 3, 14, 5, ''),
(7, 4, 14, 5, ''),
(7, 5, 14, 5, ''),

-- Ethical Implications
-- General
(1, 1, 15, 5, ''),
(1, 2, 15, 5, 'Do AI detectors limit innovation, enforce gatekeeping, or create unnecessary barriers? Explore how these questions shape our views on intellectual honesty and creative freedom.'),
(1, 3, 15, 5, ''),
(1, 4, 15, 5, ''),
(1, 5, 15, 5, ''),
-- Art
(2, 1, 15, 5, ''),
(2, 2, 15, 5, 'Art'),
(2, 3, 15, 5, ''),
(2, 4, 15, 5, ''),
(2, 5, 15, 5, ''),
-- Science
(3, 1, 15, 5, ''),
(3, 2, 15, 5, 'Science'),
(3, 3, 15, 5, ''),
(3, 4, 15, 5, ''),
(3, 5, 15, 5, ''),
-- Business
(4, 1, 15, 5, ''),
(4, 2, 15, 5, 'Business'),
(4, 3, 15, 5, ''),
(4, 4, 15, 5, ''),
(4, 5, 15, 5, ''),
-- Literature
(5, 1, 15, 5, ''),
(5, 2, 15, 5, 'Literature'),
(5, 3, 15, 5, ''),
(5, 4, 15, 5, ''),
(5, 5, 15, 5, ''),
-- Mathematics
(6, 1, 15, 5, ''),
(6, 2, 15, 5, 'Mathematics'),
(6, 3, 15, 5, ''),
(6, 4, 15, 5, ''),
(6, 5, 15, 5, ''),
-- Computer Science
(7, 1, 15, 5, ''),
(7, 2, 15, 5, 'Computer Science'),
(7, 3, 15, 5, ''),
(7, 4, 15, 5, ''),
(7, 5, 15, 5, '');

SELECT 
    d.name AS discipline,
    k.level AS knowledge,
    c.name AS category,
    s.name AS section,
    t.content
FROM 
    texts t
LEFT JOIN 
    discipline d ON t.discipline_id = d.id
LEFT JOIN 
    knowledge k ON t.knowledge_id = k.id
LEFT JOIN 
    category c ON t.category_id = c.id
LEFT JOIN 
    section s ON s.id = t.section_id;