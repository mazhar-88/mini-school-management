import axios from "axios";
import { useState, useContext } from "react";
import { Container, Row, Col, Card, Form, Button, Alert } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";

function SignIn() {
    const navigate = useNavigate();
    const API =  import.meta.env.VITE_API_BASE_URL;
    const { login } = useContext(AuthContext);

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            setLoading(true);
            const url = `${API}/login`;
            const result = await axios.post(url, formData);
            console.log('result', result)
            if (result.status === 200) {
                login(result.data.user);
                navigate("/");
            }
        } catch (err) {
            if (err.response) {
                setError(err.response.data.message || "Something went wrong");
            } else {
                setError(err.message);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container fluid className="min-vh-100 d-flex align-items-center bg-light">
            <Row className="w-100 justify-content-center">
                <Col md={6} lg={4}>

                    {/* Intro */}
                    <div className="text-center mb-3">
                        <h2 className="fw-bold mb-1 primary-color">
                            Mini School System
                        </h2>
                        <p className="text-muted mb-0">
                            Secure school login to manage your dashboard
                        </p>
                    </div>

                    <Card className="shadow border-0">
                        <Card.Body className="p-3">
                            {error && (
                                <Alert variant="danger" className="py-2 mb-3">
                                    {error}
                                </Alert>
                            )}

                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-2">
                                    <Form.Label className="small">
                                        Email
                                    </Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        placeholder="Enter school email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label className="small">
                                        Password
                                    </Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="password"
                                        placeholder="Enter password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>

                                <Button
                                    type="submit"
                                    className="primary-bg-color with-out-border w-100"
                                    disabled={loading}
                                >
                                    {loading ? "Logging in..." : "Login"}
                                </Button>
                            </Form>

                            <div className="text-center mt-2">
                                <small>
                                    Don’t have an account?{" "}
                                    <Link to="/sign-up" className="fw-semibold primary-color">
                                        Sign Up
                                    </Link>
                                </small>
                            </div>

                        </Card.Body>
                    </Card>

                </Col>
            </Row>
        </Container>
    );
}

export default SignIn;
