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

function TeacherAssignmentModal({ showModal, handleCloseModal, handleSaveModal, teacherObj, isEditMode }) {
    const [teacher, setTeacher] = useState([]);
    const [classes, setClasses] = useState([]);
    const [section, setSection] = useState([]);
    const [getClassId, setGetClassId] = useState("");
    const [formData, setFormData] = useState({
        teacherId: "",
        classId: "",
        sectionId: "",
        role: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        if (name == "classId") {
            console.log("val", value)
            setGetClassId(value);
            //selectedsection
        }
    };

    const onCloseModal = () => {
        handleCloseModal(false);
    }

    const onSaveModal = async () => {
        let getUpdatedData;
        try {

        } catch (error) {

        } try {
            const obj = { ...formData }
            console.log("updateobj", obj)
            let result;
            if (isEditMode) {
                const url = `/assignment?id=${teacherObj.assignment_id}`;
                result = await axiosInstance.put(url, obj);
            } else {
                const url = `/assignment`;
                result = await axiosInstance.post(url, obj);
            }
            // if (result.status == 201) {
            getUpdatedData = true;
            setFormData({
                teacherId: "",
                classId: "",
                sectionId: "",
                role: "",
            })
            // }

        } catch (error) {
            getUpdatedData = false
            throw error
        }
        handleSaveModal(false, getUpdatedData);

    }

    const loadTeacher = async () => {
        try {
            const url = `/getAllTeacher`;
            const result = await axiosInstance.get(url);
            setTeacher(result.data.data);
        } catch (error) {
            console.log(error);
        }
    };
    const loadClass = async () => {
        try {
            const url = `/getallclass`;
            const result = await axiosInstance.get(url);
            setClasses(result.data.data);
        } catch (error) {
            console.log(error);
        }
    };
    const loadSection = async () => { };

    useEffect(() => {
        loadTeacher();
        loadClass()
    }, []);

    useEffect(() => {
        setFormData({
            ...formData,
            teacherId: teacherObj?.teacher_id,
            classId: teacherObj?.class_id,
            sectionId: teacherObj?.section_id,
            role: teacherObj?.role,
        })
    }, [teacherObj])

    useEffect(() => {
        async function getSelectedSection() {
            const classId = getClassId;
            try {
                const url = `/selectedsection?id=${classId}`;
                const result = await axiosInstance.get(url);
                setSection(result.data.data);
            } catch (error) {
                console.log(error)
            }
        }
        getSelectedSection();

    }, [getClassId])

    return (
        <>
            <Modal show={showModal} size="lg">
                <Modal.Header className="primary-bg-color">
                    <Modal.Title className="primary-text-color">Teacher Assignment</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form>
                        <Row className="mb-3">
                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label>Teacher</Form.Label>
                                    <Form.Select
                                        name="teacherId"
                                        required
                                        value={formData.teacherId}
                                        onChange={handleChange}
                                    >
                                        <option value="">Select Teacher</option>
                                        {teacher.map((teacher, index) => {
                                            return (
                                                <option key={index + 1} value={teacher.teacher_id}>{teacher.name}</option>
                                            );
                                        })};

                                    </Form.Select>
                                </Form.Group>
                            </Col>

                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label>Class</Form.Label>
                                    <Form.Select
                                        name="classId"
                                        required
                                        value={formData.classId}
                                        onChange={handleChange}
                                    >
                                        <option value="">Select Class</option>
                                        {classes.map((cls, index) => {
                                            return (
                                                <option key={index + 1} value={cls.class_id}>{cls.class_name}</option>
                                            );
                                        })};

                                    </Form.Select>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row className="mb-3">
                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label>Section</Form.Label>
                                    <Form.Select
                                        name="sectionId"
                                        required
                                        value={formData.sectionId}
                                        onChange={handleChange}
                                    >
                                        <option value="">Select Section</option>
                                        {section?.map((section, index) => {
                                            return (
                                                <option key={index + 1} value={section.section_id}>{section.section_name}</option>
                                            );
                                        })};
                                    </Form.Select>
                                </Form.Group>
                            </Col>

                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label>Role</Form.Label>
                                    <Form.Select
                                        name="role"
                                        required
                                        value={formData.role}
                                        onChange={handleChange}
                                    >
                                        <option value="">Select Role</option>
                                        <option value="class-teacher">Class Teacher</option>
                                        <option value="subject-teacher">Subject Teacher</option>
                                        <option value="visiting-teacher">Visiting Teacher</option>
                                        <option value="assistant-teacher">Assistant Teacher</option>
                                    </Form.Select>
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
}

export default TeacherAssignmentModal;