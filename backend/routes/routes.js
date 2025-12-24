const ClassController = require("../controller/ClassController");
const TeacherController = require("../controller/TeacherController");
const SectionController = require("../controller/SectionController");
const StudentController = require("../controller/StudentController");
const AuthenticationController = require("../controller/authentication/AuthenticationController");
const AssignmentController = require("../controller/assignmentController");
const authenticateMiddleware = require("../utils/authenticateMiddleware");

function routeMapping(req, res, urlObject) {

    const pathname = urlObject.pathname;

    if (pathname === "/login" && req.method === "POST") return AuthenticationController.LoginController(req, res);
    if (pathname === "/signup" && req.method === "POST") return AuthenticationController.SignupController(req, res);
    if (pathname === "/logout" && req.method === "POST") return AuthenticationController.LogoutController(req, res);

    if (pathname.includes("/class") && req.method === "GET") return authenticateMiddleware(req, res, () => ClassController.classList(req, res));
    if (pathname === "/getallclass" && req.method === "GET") return authenticateMiddleware(req, res, () => ClassController.allClass(req, res));
    if (pathname === "/class" && req.method === "POST") return authenticateMiddleware(req, res, () => ClassController.saveClass(req, res));
    if (pathname === "/class" && req.method === "PUT") return authenticateMiddleware(req, res, () => ClassController.updateClass(req, res, urlObject));
    if (pathname === "/class" && req.method === "DELETE") return authenticateMiddleware(req, res, () => ClassController.deleteClass(req, res, urlObject));

    if (pathname === "/assignment" && req.method === "GET") return authenticateMiddleware(req, res, () => AssignmentController.assignmentList(req, res));
    if (pathname === "/assignment" && req.method === "POST") return authenticateMiddleware(req, res, () => AssignmentController.saveassignment(req, res));
    if (pathname === "/assignment" && req.method === "PUT") return authenticateMiddleware(req, res, () => AssignmentController.updateassignment(req, res, urlObject));
    if (pathname === "/assignment" && req.method === "DELETE") return authenticateMiddleware(req, res, () => AssignmentController.deleteassignment(req, res, urlObject));

    if (pathname === "/teacher" && req.method === "GET") return authenticateMiddleware(req, res, () => TeacherController.teacherList(req, res));
    if (pathname === "/getAllTeacher" && req.method === "GET") return authenticateMiddleware(req, res, () => TeacherController.getAllTeacher(req, res));

    if (pathname === "/teacher" && req.method === "POST") return authenticateMiddleware(req, res, () => TeacherController.saveteacher(req, res));
    if (pathname === "/teacher" && req.method === "PUT") return authenticateMiddleware(req, res, () => TeacherController.updateteacher(req, res, urlObject));
    if (pathname === "/teacher" && req.method === "DELETE") return authenticateMiddleware(req, res, () => TeacherController.deleteteacher(req, res, urlObject));

    if (pathname === "/section" && req.method === "GET") return authenticateMiddleware(req, res, () => SectionController.sectionList(req, res));
    if (pathname === "/selectedsection" && req.method === "GET") return authenticateMiddleware(req, res, () => SectionController.selectedSection(req, res, urlObject));
    if (pathname === "/section" && req.method === "POST") return authenticateMiddleware(req, res, () => SectionController.savesection(req, res));
    if (pathname === "/section" && req.method === "PUT") return authenticateMiddleware(req, res, () => SectionController.updatesection(req, res, urlObject));
    if (pathname === "/section" && req.method === "DELETE") return authenticateMiddleware(req, res, () => SectionController.deletesection(req, res, urlObject));

    if (pathname === "/student" && req.method === "GET") return authenticateMiddleware(req, res, () => StudentController.studentList(req, res));
    if (pathname === "/student" && req.method === "POST") return authenticateMiddleware(req, res, () => StudentController.savestudent(req, res));
    if (pathname === "/student" && req.method === "PUT") return authenticateMiddleware(req, res, () => StudentController.updatestudent(req, res, urlObject));
    if (pathname === "/student" && req.method === "DELETE") return authenticateMiddleware(req, res, () => StudentController.deletestudent(req, res, urlObject));


    res.writeHead(404, { "content-type": "application/json" });
    res.end(JSON.stringify({ status: "404", message: "Route Not Found" }));
}

module.exports = routeMapping;