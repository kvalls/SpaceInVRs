require('dotenv').config();

module.exports = {
  development: {
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    host: process.env.DB_HOST,
    dialect: 'mysql'
  },
  test: {
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    host: process.env.DB_HOST,
    dialect: 'mysql'
  },
  production: {
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    host: process.env.DB_HOST,
    dialect: 'mysql'
  }
}

// user token
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6InBydWViYWN1YXRyIiwiZW1haWwiOiJ0ZXN0NDQiLCJwYXNzd29yZCI6IiQyYSQxMCQvdjhkNHFMY0kwNTl4cnMxRm9JRnplUnFHL0ZaRk51Q2FjeDNvbU1iU1hDbGxqRHdMd1FVUyIsImlhdCI6MTY2OTczNTQwNiwiZXhwIjoxNjY5ODIxODA2fQ.rMXvu2GCwSYD9Dw0kzweLVkj-snc3TZlg4MvUN1PhJ0
