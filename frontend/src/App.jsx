import "./App.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Header from './shared/component/header/Header';
import Student from './pages/student/Student';
import Class from './pages/class/Class';
import Teacher from './pages/teacher/Teacher';
import Section from './pages/section/Section';
import SignUp from "./pages/authentication/sign-up/SignUp";
import SignIn from "./pages/authentication/sign-in/SignIn";
import TeacherAssignment from "./pages/teacher-assignment/TeacherAssignment";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import { useContext } from "react";

function RoutesHandle() {
  const { user } = useContext(AuthContext);

  return (
    <>

      {user && <Header />}

      <Routes>
        <Route path="/sign-in" Component={SignIn} />
        <Route path="/sign-up" Component={SignUp} />
        <Route path='/' Component={Dashboard} />
        <Route path='/student' Component={Student} />
        <Route path="/teacher-assignment" Component={TeacherAssignment} />
        <Route path='/class' Component={Class} />
        <Route path='/teacher' Component={Teacher} />
        <Route path='/section' Component={Section} />

      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <RoutesHandle />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
