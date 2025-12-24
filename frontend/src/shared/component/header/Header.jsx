import { Container, Nav, Navbar, Button } from "react-bootstrap";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Header() {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
    logout();          
    navigate("/sign-in");
};

    return (
        <Navbar expand="lg" className="shadow-sm" style={{ backgroundColor: '#004080' }} >
            <Container >
                <Navbar.Brand as={NavLink} to="/" className="text-white fw-bold">
                    {user?.name}
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />

                <Navbar.Collapse id="basic-navbar-nav" >
                    <Nav className="ms-auto align-items-center gap-3" >
                        <Nav.Link as={NavLink} to="/student" className="text-white fw-bold">
                            Students
                        </Nav.Link>

                        <Nav.Link as={NavLink} to="/teacher-assignment" className="text-white fw-bold">
                            Teacher Assignment
                        </Nav.Link>

                        <Nav.Link as={NavLink} to="/teacher" className="text-white fw-bold">
                            Teachers
                        </Nav.Link>

                        <Nav.Link as={NavLink} to="/section" className="text-white fw-bold">
                            Sections
                        </Nav.Link>

                        <Nav.Link as={NavLink} to="/class" className="text-white fw-bold">
                            Classes
                        </Nav.Link>

                        <Button variant="danger" size="sm" onClick={handleLogout} >
                            Logout
                        </Button>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;
