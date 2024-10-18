create TABLE user(
    id SERIAL PRIMARY KEY, 
    balance INTEGER
);

create TABLE history_of_actions(
    id SERIAL PRIMARY KEY,
    user_id INTEGER 
    actions VARCHAR(255)
    amount INTEGER
    ts DATE
    FOREIGN KEY (user_id) REFERENCES user (id)
);
