-- Delete all data from the tables
-- DROP TABLE IF EXISTS blogs;
-- DROP TABLE IF EXISTS categories;
-- DROP TABLE IF EXISTS media;
-- DROP TABLE IF EXISTS rolepermissions;
-- DROP TABLE IF EXISTS userpasswords;
DROP TABLE IF EXISTS users;
-- DROP TABLE IF EXISTS permissions;
DROP TABLE IF EXISTS roles;
-- CREATE TABLE Permissions (
--     id SERIAL PRIMARY KEY,
--     name VARCHAR(255) NOT NULL,
--     description TEXT,
--     createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );
CREATE TABLE Roles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- CREATE TABLE RolePermissions (
--     id SERIAL PRIMARY KEY,
--     role_id INTEGER REFERENCES Roles(id) ON DELETE CASCADE,
--     permission_id INTEGER REFERENCES Permissions(id) ON DELETE CASCADE,
--     createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );
CREATE TABLE Users (
    id SERIAL PRIMARY KEY NOT NULL,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    role_id INTEGER REFERENCES Roles(id) ON DELETE
    SET NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- CREATE TABLE Categories (
--     id SERIAL PRIMARY KEY,
--     name VARCHAR(255) NOT NULL,
--     description TEXT,
--     createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );
-- CREATE TABLE Media (
--     id SERIAL PRIMARY KEY,
--     name VARCHAR(255) NOT NULL,
--     original_filename VARCHAR(255) NOT NULL,
--     path VARCHAR(255) NOT NULL,
--     mime_type VARCHAR(255) NOT NULL,
--     size INTEGER NOT NULL,
--     uploaded_by INTEGER REFERENCES Users(id) NOT NULL,
--     uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );
-- CREATE TABLE Blogs (
--     id SERIAL PRIMARY KEY,
--     title_en VARCHAR(255) NOT NULL,
--     title_bn VARCHAR(255) NOT NULL,
--     slug VARCHAR(255) UNIQUE NOT NULL,
--     category_id INTEGER REFERENCES Categories(id) ON DELETE
--     SET NULL,
--         cover_image_id INTEGER REFERENCES Media(id) ON DELETE
--     SET NULL,
--         seo_title VARCHAR(255),
--         seo_description TEXT,
--         seo_keywords VARCHAR(255),
--         content TEXT NOT NULL,
--         author_id INTEGER REFERENCES Users(id) NOT NULL,
--         createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--         updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );
-- CREATE TABLE UserPasswords (
--     id SERIAL PRIMARY KEY,
--     user_id INTEGER REFERENCES Users(id) ON DELETE CASCADE,
--     password VARCHAR(255) NOT NULL,
--     createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );