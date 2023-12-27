const express = require('express')
const app = express()
const cors = require('cors')

const Sequelize = require('sequelize')
const sequelize = new Sequelize('HRDotNet', 'sa', 'sql123$%^', {
  dialect: 'mssql',
  dialectOptions: {
    options: {
      useUTC: false,
      dateFirst: 1
    }
  }
})

app.use(express.json());

sequelize.authenticate()
  .then(() => {
    console.log('Connected to the database')
  })
  .catch(error => {
    console.error('Error connecting to the database', error)
})

app.use(cors())

app.get('/api/tAccountType', async (req, res) => {
  try {
    const result = await sequelize.query('SELECT * FROM tBank')
    res.json(result[0])

    console.log(result[0])
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).json({ message: 'Error connecting to the database' })
  }
})

app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body

    const result = await sequelize.query(
      "SELECT name FROM sys.sql_logins WHERE PWDCOMPARE(:password, password_hash) = 1 AND name = :username",
      {
        replacements: { username, password },
        type: sequelize.QueryTypes.SELECT,
      }
    );

    if (result.length > 0) {
      const result = await sequelize.query("SELECT * FROM tSysUser WHERE Username = :username", {
        replacements: { username },
        type: sequelize.QueryTypes.SELECT,
      })

      res.json(result[0])
    } else {
      res.status(401).json({ success: false, message: 'Invalid username or password' })
    }
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).json({ success: false, message: 'Error connecting to the database' })
  }
})

app.listen(3000, () => {
  console.log('Server started on port 3000')
})