const routes = require('express').Router();
const Users = require("../controller/userController")
const College = require("../controller/collegeController")
const Student = require("../controller/studentController")
const Marksheet = require("../controller/marksheetController")
const middleware = require("../middileware/middleware")
const checkToken = middleware.checkToken;
routes.post('/login', Users.login);

// User routes
routes.get('/users', checkToken, Users.users);
routes.post('/user', checkToken, Users.createUser);
routes.post('/user-update', checkToken, Users.updateUser);
routes.post('/user-delete', checkToken, Users.deleteUser);

// college routes
routes.get('/college', checkToken, College.college);
routes.post('/college', checkToken, College.createCollege);
routes.post('/college-update', checkToken, College.updateCollege);
routes.post('/college-delete', checkToken, College.deleteCollege);
routes.post('/college-id', checkToken, College.getById);

// student routes

routes.get('/student', checkToken, Student.student);
routes.post('/student', checkToken, Student.createStudent);
routes.post('/student-update', checkToken, Student.updateStudent);
routes.post('/student-delete', checkToken, Student.deleteStudent);

// marksheet routes

routes.get('/marksheet', checkToken, Marksheet.marksheet);
routes.post('/marksheet', checkToken, Marksheet.createMarksheet);
routes.post('/marksheet-update', checkToken, Marksheet.updateMarksheet);
routes.post('/marksheet-delete', checkToken, Marksheet.deleteMarksheet);

module.exports = routes;