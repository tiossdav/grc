const { Pool } = require('pg');
const pool = require('../config/database');
const sql = `
  CREATE TABLE IF NOT EXISTS courses (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      instructor VARCHAR(255),
      duration VARCHAR(100),
      level VARCHAR(50),
      skills TEXT[],
      status VARCHAR(50) DEFAULT 'active',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
  
  CREATE TABLE IF NOT EXISTS podcasts (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      host VARCHAR(255),
      description TEXT,
      media_url VARCHAR(500),
      status VARCHAR(50) DEFAULT 'published' CHECK (status IN ('published', 'upcoming', 'live', 'archived')),
      date TIMESTAMP,
      participants_count INTEGER,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`;
pool.query(sql).then(() => {
  console.log('Tables created successfully');
  process.exit(0);
}).catch(err => {
  console.error(err);
  process.exit(1);
});
