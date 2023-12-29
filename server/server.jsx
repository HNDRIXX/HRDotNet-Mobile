const express = require('express')
const app = express()
const cors = require('cors')

app.use(express.json())

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
    )

    if (result.length > 0) {
      // const result = await sequelize.query("SELECT ID_Employee, Name_SysUserGroup, Username, FirstName, MiddleName, LastName FROM    tSysUser WHERE Username = :username", {
      //   replacements: { username },
      //   type: sequelize.QueryTypes.SELECT,
      // })

      const result = await sequelize.query("SELECT SU.ID_Employee, SU.Name_SysUserGroup, SU.Username, SU.FirstName, SU.MiddleName, SU.LastName, E.ID_Gender, E.ID_Company FROM tSysUser SU LEFT JOIN tEmployee E ON SU.ID_Employee = E.ID WHERE SU.Username = :username", {
        replacements: { username },
        type: sequelize.QueryTypes.SELECT,
      })

      if (result.length > 0) {
        const user = result[0]
      
        if (user.Name_SysUserGroup == "WEB USER" || user.Name_SysUserGroup.includes("WEB APPROVER")) {
          res.json(user);
        } else {
          res.status(500).json({ success: false, message: 'User Group Authorization Failed' })
        }
      } else {
        res.status(498).json({ success: false, message: 'Prevented' })
      }    
    } else {
      res.status(401).json({ success: false, message: 'Invalid username or password' })
    }
  } catch (error) {
    console.error('Error executing query', error)
    res.status(500).json({ success: false, message: 'Error connecting to the database' })
  }
})

app.post('/api/home', async (req, res) => {
  try {
    const { IDEmployee } = req.body

    const result = await sequelize.query(
      "SELECT ID_LeaveParameter, Name_LeaveParameter, DateTransaction, Source, DocumentNo, Amount, BYear FROM tLeaveLedger WHERE ID_Employee = :IDEmployee AND ID_LeaveParameter IN ('1', '2')",
      {
        replacements: { IDEmployee },
        type: sequelize.QueryTypes.SELECT,
      }
    )

    if (result.length > 0) {
      res.json(result)
    } else {
      res.status(401).json({ success: false, message: 'Something went wrong' })
    }
  } catch (error) {
    console.error('Error executing query', error)
    res.status(500).json({ success: false, message: 'Error connecting to the database' })
  }
})

app.post('/api/profile', async (req, res) => {
  try {
    const { IDEmployee } = req.body

    const result = await sequelize.query(
      "SELECT E.Code, E.LastName, E.FirstName, E.MiddleName, E.ID_Gender, E.EmailAdd, E.MobileNo, E.Name_Department, ER.Name_Company, ER.Name_Branch, ER.Name_Division, ER.Name_Section FROM tEmploymentRecord ER LEFT JOIN tEmployee E ON E.ID = ER.ID_Employee WHERE ER.ID_Employee = :IDEmployee",
      {
        replacements: { IDEmployee },
        type: sequelize.QueryTypes.SELECT,
      }
    )

    if (result.length > 0) {
      res.json(result[0])
    } else {
      res.status(401).json({ success: false, message: 'Something went wrong' })
    }
  } catch (error) {
    console.error('Error executing query', error)
    res.status(500).json({ success: false, message: 'Error connecting to the database' })
  }
})

app.post('/api/loanLedger', async (req, res) => {
  try {
    const { IDEmployee } = req.body

    const result = await sequelize.query(
      "SELECT * FROM tLoanApplication WHERE ID_Employee = :IDEmployee",
      {
        replacements: { IDEmployee },
        type: sequelize.QueryTypes.SELECT,
      }
    )

    res.json(result)
  } catch (error) {
    console.error('Error executing query', error)
    res.status(500).json({ success: false, message: 'Error connecting to the database' })
  }
})

app.post('/api/loanLedgerDetails', async (req, res) => {
  try {
    const { IDEmployee } = req.body

    const result = await sequelize.query(
      "SELECT * FROM tLoanLedger WHERE ID_Employee = '138'",
      {
        replacements: { IDEmployee },
        type: sequelize.QueryTypes.SELECT,
      }
    )

    if (result.length > 0) {
      res.json(result)
    } else {
      res.status(401).json({ success: false, message: 'Something went wrong' })
    }
  } catch (error) {
    console.error('Error executing query', error)
    res.status(500).json({ success: false, message: 'Error connecting to the database' })
  }
})

app.post('/api/payslip', async (req, res) => {
  try {
    const { IDCompany } = req.body

    const result = await sequelize.query(
      "SELECT * FROM tPayroll WHERE ID_Company = :IDCompany",
      {
        replacements: { IDCompany },
        type: sequelize.QueryTypes.SELECT,
      }
    )

    if (result.length > 0) {
      res.json(result)
    } else {
      res.status(401).json({ success: false, message: 'Something went wrong' })
    }
  } catch (error) {
    console.error('Error executing query', error)
    res.status(500).json({ success: false, message: 'Error connecting to the database' })
  }
})

app.listen(3000, () => {
  console.log('Server started on port 3000')
})