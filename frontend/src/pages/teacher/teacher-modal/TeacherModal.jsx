import axios from "axios";
import { useEffect, useState } from "react";
import {
    Container,
    Row,
    Col,
    Button,
    Modal,
    Form,
    Table,
    Pagination,
} from "react-bootstrap";
import axiosInstance from "../../../shared/utils/axiosInstance";
function TeacherModal({ showModal, handleCloseModal, handleSaveModal, teacherObj, isEditMode }) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        cell: "",
        qualification: "",
        gender: "",
        address: "",
    });


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const onCloseModal = () => {
        handleCloseModal(false);
    }

    const onSaveModal = async () => {
        let getUpdatedData;
        try {
            const obj = { ...formData }
            let result;
            if (isEditMode) {
                const url = `/teacher?id=${teacherObj.teacher_id}`;
                result = await axiosInstance.put(url, obj);
            } else {
                const url = `/teacher`;
                result = await axiosInstance.post(url, obj);
            }
            // if (result.status == 201) {
                getUpdatedData = true;
                setFormData({
                    name: "",
                    email: "",
                    cell: "",
                    qualification: "",
                    gender: "",
                    address: ""
                })
            // }

        } catch (error) {
            getUpdatedData = false
            throw error
        }
        handleSaveModal(false, getUpdatedData);
    }

    useEffect(() => {
        setFormData({
            ...formData,
            name: teacherObj?.name,
            email: teacherObj?.email,
            cell: teacherObj?.cell,
            qualification: teacherObj?.qualification,
            gender: teacherObj?.gender,
            address: teacherObj?.address
        })
    }, [teacherObj])

    return (
        <>
            <Modal show={showModal} size="lg">
                <Modal.Header className="primary-bg-color">
                    <Modal.Title className="primary-text-color">Add Student</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form>
                        <Row className="mb-3">
                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        name="name"
                                        placeholder="Enter Teacher Name"
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </Col>

                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        name="email"
                                        placeholder="Enter Teacher Email"
                                        type="text"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row className="mb-3">
                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label>phone</Form.Label>
                                    <Form.Control
                                        name="cell"
                                        type="number"
                                        placeholder="Enter Teacher Phone Number"
                                        required
                                        value={formData.cell}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </Col>

                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label>Qualification</Form.Label>
                                    <Form.Control
                                        name="qualification"
                                        required
                                        placeholder="Enter Teacher Qualification"
                                        value={formData.qualification}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row className="mb-3">
                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label>Gender</Form.Label>
                                    <Form.Select
                                        name="gender"
                                        required
                                        value={formData.gender}
                                        onChange={handleChange}
                                    >
                                        <option value="">Select Gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>

                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label>Address</Form.Label>
                                    <Form.Control
                                        name="address"
                                        as="textarea"
                                        placeholder="Enter Teacher Address"
                                        rows={1}
                                        required
                                        value={formData.address}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                    </Form>
                    <Modal.Footer>
                        <Button
                            variant="secondary"
                            className="warning-color with-out-border"
                            onClick={onCloseModal}>
                            Close
                        </Button>
                        <Button
                            variant="primary"
                            className="with-out-border primary-bg-color"
                            onClick={onSaveModal}>
                            {isEditMode ? "Update changes" : "Save changes"}

                        </Button>
                    </Modal.Footer>
                </Modal.Body>
            </Modal>
        </>
    )
};
export default TeacherModal;