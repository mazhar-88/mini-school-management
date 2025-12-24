import axios from "axios";
import { useState } from "react";
import { Container, Row, Col, Card, Form, Button, Alert } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";

function SignUp() {
    const navigate = useNavigate();
    const API = import.meta.env.VITE_API_BASE_URL;
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
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

    const resetForm = () => {
        setFormData({
            name: "",
            email: "",
            username: "",
            password: "",
            confirmPassword: "",
        });
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        setError("");

        if (formData.password !== formData.confirmPassword) {
            setError("Password and Confirm Password do not match");
            return;
        }

        try {
            setLoading(true);
            const url = `${API}/signup`;
            const result = await axios.post(url, formData);

            if (result.status === 201) {
                resetForm();
                navigate("/sign-in");
            }
        } catch (err) {
            if (err.response) {
                console.log(err)
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
                    <Card className="shadow border-0">
                        <Card.Body className="p-3">

                            <h4 className="text-center primary-color fw-bold mb-1">
                                Create new account as School
                            </h4>
                            <p className="text-center text-muted mb-3">
                            </p>

                            {error && (
                                <Alert variant="danger" className="py-2 mb-3">
                                    {error}
                                </Alert>
                            )}

                            <Form onSubmit={handleSignUp}>
                                <Form.Group className="mb-2">
                                    <Form.Label className="small">
                                        School Name
                                    </Form.Label>
                                    <Form.Control

                                        type="text"
                                        name="name"
                                        placeholder="Enter school name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>

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

                                <Form.Group className="mb-2">
                                    <Form.Label className="small">
                                        Username
                                    </Form.Label>
                                    <Form.Control

                                        type="text"
                                        name="username"
                                        placeholder="Choose a username"
                                        value={formData.username}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-2">
                                    <Form.Label className="small">
                                        Password
                                    </Form.Label>
                                    <Form.Control

                                        type="password"
                                        name="password"
                                        placeholder="Create password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label className="small">
                                        Confirm Password
                                    </Form.Label>
                                    <Form.Control

                                        type="password"
                                        name="confirmPassword"
                                        placeholder="Confirm password"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>

                                <Button
                                    type="submit"
                                    className="w-100 primary-bg-color with-out-border"
                                    disabled={loading}
                                >
                                    {loading ? "Creating..." : "Sign Up"}
                                </Button>
                            </Form>

                            <div className="text-center mt-2">
                                <small>
                                    Already have an account?{" "}
                                    <Link to="/sign-in" className="fw-semibold primary-color">
                                        Login
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

export default SignUp;
