CREATE TABLE Users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role_id INTEGER REFERENCES Roles(id) ON DELETE
    SET NULL
);
CREATE TABLE Roles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    permissions JSONB DEFAULT '{}' -- Store role permissions as JSON
);
CREATE TABLE Categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT
);
CREATE TABLE Keywords (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);
CREATE TABLE Blogs (
    id SERIAL PRIMARY KEY,
    title_en VARCHAR(255) NOT NULL,
    title_bn VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    category_id INTEGER REFERENCES Categories(id) ON DELETE
    SET NULL,
        cover_image VARCHAR(255),
        seo_title VARCHAR(255),
        seo_description TEXT,
        seo_keywords VARCHAR(255),
        content TEXT NOT NULL,
        author_id INTEGER REFERENCES Users(id) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE BlogKeywords (
    blog_id INTEGER REFERENCES Blogs(id) ON DELETE CASCADE,
    keyword_id INTEGER REFERENCES Keywords(id) ON DELETE CASCADE,
    PRIMARY KEY (blog_id, keyword_id)
);