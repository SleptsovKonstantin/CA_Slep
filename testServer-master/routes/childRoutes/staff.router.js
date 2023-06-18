const { Router } = require('express');
const { allowLocalCommunication } = require('../../src/modules/Auth');
const { byToken } = require('../../src/modules/Auth');
const {
  getStaff,
  getEmployee,
  updateEmployee,
  addEmployee,
  importStaffArchive,
  removeEmployee,
  getStaffApplicationsPossible,
  getEmployeeSalary,
  updateSalary,
  pullSalaryMonth,
} = require('../../src/controllers/staff.controller');

const router = Router();

// pichugina.exceedteam@gmail.com
router.get('/', allowLocalCommunication, getStaff);
router.get('/applications/possible', byToken, getStaffApplicationsPossible);
router.get('/employee/salary', byToken, getEmployeeSalary);
router.get('/:id', byToken, getEmployee);
router.post('/', byToken, addEmployee);
router.put('/', byToken, updateEmployee);
router.delete('/', byToken, removeEmployee);
router.post('/import/archive', byToken, importStaffArchive);
router.post('/salary', byToken, updateSalary);
router.post('/salary/pull_prev', byToken, pullSalaryMonth);
module.exports = router;
