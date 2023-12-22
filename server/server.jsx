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
    const result = await sequelize.query('SELECT *FROM tBank')
    res.json(result[0])

    console.log(result[0])
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).json({ message: 'Error connecting to the database' })
  }
})

app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    const result = await sequelize.query('SELECT * FROM sys.sql_logins WHERE name = ?', {
      replacements: [username],
    });

    if (result.length === 0) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    if (!(await sequelize.query('EXEC HAS_DBACCESS(?, ?)', { replacements: [username, password] }))) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const token = generateToken(/* ...user details... */);
    res.json({ token });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(3000, () => {
  console.log('Server started on port 3000')
})