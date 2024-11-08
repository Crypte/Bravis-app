CREATE TABLE public.articles (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    content TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
