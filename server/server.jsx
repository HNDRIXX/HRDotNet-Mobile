const express = require('express')
const app = express()
const cors = require('cors')

const Sequelize = require('sequelize')
const sequelize = new Sequelize('HRDotNetMobile', 'pat', '09082612', {
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

app.get('/api/tChangeOfSchedule', async (req, res) => {
  try {
    const result = await sequelize.query('SELECT * FROM tChangeOfSchedule')
    res.json(result[0])
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).json({ message: 'Error connecting to the database' })
  }
})

app.listen(3000, () => {
  console.log('Server started on port 3000')
})
