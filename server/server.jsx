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

const fetchData = async (sql, params) => {
  const result = await sequelize.query(sql,
    {
      replacements: { ...params },
      type: sequelize.QueryTypes.SELECT,
    }
  )

  return result
}

const msg = (http, status, message) => { return res.status(http).json({ success: status, message: message })}

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

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  fetchData("SELECT name FROM sys.sql_logins WHERE PWDCOMPARE(:password, password_hash) = 1 AND name = :username", { username, password })
    .then(result => {
      if (result.length > 0) {
        return fetchData("SELECT SU.ID_Employee, SU.Name_SysUserGroup, SU.Username, SU.FirstName, SU.MiddleName, SU.LastName, E.ID_Gender, E.ID_Company FROM tSysUser SU LEFT JOIN tEmployee E ON SU.ID_Employee = E.ID WHERE SU.Username = :username", { username })
      } else {
        res.status(400).json({ success: false, message: 'Invalid username or password' })
      }
    })
    .then(result => {
      if (result.length > 0) {
        const user = result[0]

        if (user.Name_SysUserGroup == "WEB USER" || user.Name_SysUserGroup.includes("WEB APPROVER")) {
          res.json(user)
        } else {
          res.status(500).json({ success: false, message: 'User Group Authorization Failed' });
        }
      } else {
        res.status(400).json({ success: false, message: 'Prevented' });
      }
    })
    .catch(error => {
      res.status(500).json({ success: false, message: 'Error connecting to the database' });
    })
})

app.post('/api/home', async (req, res) => {
  try {
    const { IDEmployee } = req.body

    const result = await fetchData("SELECT ID_LeaveParameter, Name_LeaveParameter, DateTransaction, Source, DocumentNo, Amount, BYear FROM tLeaveLedger WHERE ID_Employee = :IDEmployee AND ID_LeaveParameter IN ('1', '2') AND BYear = CAST(YEAR(GETDATE()) AS VARCHAR(4))", { IDEmployee })

    res.json(result)
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error connecting to the database' })
  }
})

app.post('/api/calendar', async (req, res) => {
  try {
    const { IDEmployee, startDate, endDate } = req.body

    const defaultSched = await fetchData("SELECT MON_Name_Schedule, MON_IsRestDay, TUE_Name_Schedule, TUE_IsRestDay, WED_Name_Schedule, WED_IsRestDay, THU_Name_Schedule, THU_IsRestDay, FRI_Name_Schedule, FRI_IsRestDay, SAT_Name_Schedule, SAT_IsRestDay, SUN_Name_Schedule, SUN_IsRestDay FROM tEmploymentRecord WHERE ID_Employee = :IDEmployee",
    {IDEmployee })

    if (defaultSched.length > 0) {
      const workSched = await fetchData("SELECT DayOne_Date, DayOne_Name_Schedule, DayTwo_Date, DayTwo_Name_Schedule, DayThree_Date, DayThree_Name_Schedule, DayFour_Date, DayFour_Name_Schedule, DayFive_Date, DayFive_Name_Schedule, DaySix_Date, DaySix_Name_Schedule, DaySeven_Date, DaySeven_Name_Schedule FROM tWorkSchedule_Detail WHERE ID_Employee = :IDEmployee", { IDEmployee })
      
      const workSchedRD = await fetchData("SELECT DayOne_Date, DayOne_IsRestDay, DayTwo_Date, DayTwo_IsRestDay, DayThree_Date,  DayThree_IsRestDay, DayFour_Date, DayFour_IsRestDay, DayFive_Date, DayFive_IsRestDay, DaySix_Date, DaySix_IsRestDay, DaySeven_Date, DaySeven_IsRestDay FROM tWorkSchedule_Detail WHERE ID_Employee = :IDEmployee", { IDEmployee })

      const TKData = await fetchData("SELECT WorkDate, ActualTimeIn, ActualTimeOut FROM tTKProcessingDaily_Detail WHERE ID_Employee = :IDEmployee AND CAST(WorkDate AS DATE) BETWEEN :startDate AND :endDate", { IDEmployee, startDate, endDate })

      if (workSched.length > 0) {
        const mergedResult = {
          defaultSched: defaultSched,
          workSched: workSched,
          workSchedRD: workSchedRD,
          TKData: TKData,
        }

        console.log(mergedResult.tkData)
  
        res.json(mergedResult)
      }
    } else {
      res.status(400).json({ success: false, message: 'Something went wrong' })
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error connecting to the database' })
  }
})

app.post('/api/profile', async (req, res) => {
  try {
    const { IDEmployee } = req.body

    const result = await fetchData("SELECT E.Code, E.LastName, E.FirstName, E.MiddleName, E.ID_Gender, E.EmailAdd, E.MobileNo, E.Name_Department, ER.Name_Company, ER.Name_Branch, ER.Name_Division, ER.Name_Section FROM tEmploymentRecord ER LEFT JOIN tEmployee E ON E.ID = ER.ID_Employee WHERE ER.ID_Employee = :IDEmployee",
    {IDEmployee })

    if (result.length > 0) {
      res.json(result[0])
    } else {
      res.status(400).json({ success: false, message: 'Something went wrong' })
    }
  } catch (error) {
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

    const result = await fetchData("SELECT * FROM tLoanLedger WHERE ID_Employee = '138'", { IDEmployee })

    if (result.length > 0) {
      res.json(result)
    } else {
      res.status(400).json({ success: false, message: 'Something went wrong' })
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error connecting to the database' })
  }
})

app.post('/api/payslip', async (req, res) => {
  try {
    const { IDEmployee } = req.body

    const result = await fetchData("SELECT P.ID, P.ID_TKProcessing, P.DatePayoutSchedule, P.DocumentNo, PS.GrossPay, PS.NetPay, PS.ID_Payroll FROM tPayroll P LEFT JOIN tPayroll_Summary PS ON P.ID = PS.ID_Payroll WHERE P.IsPosted = 1 AND PS.ID_Employee = :IDEmployee", { IDEmployee })

    if (result.length > 0) {
      const deductions = await fetchData("SELECT PD.ID_Payroll, PD.ID_PayrollItem, PD.Name_PayrollItem, PD.Amount FROM tPayroll_Detail PD LEFT JOIN tPayrollItemMaster PIM ON PD.ID_PayrollItem = PIM.ID WHERE PD.ID_Employee = :IDEmployee AND PIM.ID_Type = 2", { IDEmployee })

      if (deductions) {
        const mergedResult = {
          detail: result,
          deductions: deductions,
        }
  
        res.json(mergedResult)
      } else {
        res.status(400).json({ success: false, message: 'Something went wrong' })
      }
    } else {
      res.status(400).json({ success: false, message: 'Something went wrong' })
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error connecting to the database' })
  }
})

app.post('/api/morePayslip', async (req, res) => {
  try {
    const { IDPayroll, IDTKProcessing, IDEmployee } = req.body

    const firstResult = await fetchData("SELECT Code_Employee, Name_Employee, DateFrom, DateTo, DatePayoutSchedule, GrossPay, NetPay FROM tPayroll_Summary WHERE ID_Employee = :IDEmployee AND ID_Payroll = :IDPayroll", { IDPayroll, IDEmployee })

    if (firstResult) {
      const secondResult = await fetchData("SELECT PD.ID_PayrollItem, PD.Name_PayrollItem, SUM(PD.Amount) AS TotalAmount FROM tPayroll_Detail PD LEFT JOIN tPayrollItemMaster PIM ON PD.ID_PayrollItem = PIM.ID WHERE PD.ID_Employee = :IDEmployee AND PD.ID_Payroll = :IDPayroll AND PIM.ID_Type = 1 GROUP BY PD.ID_PayrollItem, PD.Name_PayrollItem", { IDPayroll, IDEmployee })

      const thirdResult = await fetchData("SELECT SUM(Hours) AS TotalHours, SUM(Amount) AS TotalAmount FROM tPayroll_Detail WHERE ID_PayrollItem = '2' AND ID_Employee = :IDEmployee AND ID_Payroll = :IDPayroll", { IDPayroll, IDEmployee })

      const DateFrom = firstResult[0].DateFrom
      const DateTo = firstResult[0].DateTo

      const fourthResult = await fetchData("SELECT WorkDate, Name_Schedule, Name_Employee, DayType, ActualTimeIn, ActualTimeOut, Leave, Tardy, REG, OT FROM tTKProcessingDaily_Detail WHERE ID_Employee = :IDEmployee AND ID_TKProcessing = :IDTKProcessing AND WorkDate BETWEEN :DateFrom AND :DateTo", { IDEmployee, IDTKProcessing, DateFrom, DateTo })

      const mergedResult = {
        summary: firstResult,
        detail: secondResult,
        restDay: thirdResult,
        tkData: fourthResult,
      }

      res.json(mergedResult)
    } else {
      res.status(400).json({ success: false, message: 'Something went wrong' })
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error connecting to the database' })
  }
})




app.listen(3000, () => {
  console.log('Server started on port 3000')
})