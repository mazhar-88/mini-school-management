import React, { useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";

function Dashboard() {
    const { user } = useContext(AuthContext);

    return (
        <Container fluid className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
            <Row className="w-100 justify-content-center">
                <Col md={8} className="text-center">
                    <h1 className="fw-bold mb-3">
                        Welcome to {user?.name || "Your School"}
                    </h1>
                    <p className="text-muted fs-5">
                        Manage your students, teachers, classes, and sections from this dashboard.
                        Everything you need to run your school efficiently is right here.
                    </p>
                </Col>
            </Row>
        </Container>
    );
}

export default Dashboard;