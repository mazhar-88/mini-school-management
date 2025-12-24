import { useEffect, useState } from "react";
import axios from 'axios';
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

function StudentModal({ showModal, handleCloseModal, handleSaveModal, studentObj, isEditMode }) {
    const API =  import.meta.env.VITE_API_BASE_URL;
    const [previewImage, setPreviewImage] = useState("");
    const [getClassId, setGetClassId] = useState("");
    const [classes, setClasses] = useState([]);
    const [section, setSection] = useState([]);
    const [formData, setFormData] = useState({
        studentId: "",
        name: "",
        classId: "",
        sectionId: "",
        rollno: "",
        gender: "",
        dob: "",
        guardianname: "",
        guardiancell: "",
        image: "",
        address: ""
    });



    const loadClass = async () => {
        try {
            const url = `/getallclass`;
            const result = await axiosInstance.get(url);
            setClasses(result.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        if (name == "classId") {
            setGetClassId(value);
        }
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        setFormData(prev => ({
            ...prev,
            image: file
        }));
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setPreviewImage(imageUrl);
        }
    };


    const onCloseModal = () => {
        handleCloseModal(false);
    }

    const onSaveModal = async (e) => {
        e.preventDefault();
        let getUpdatedData;
        const form = new FormData();
        form.append("studentId", formData.studentId);
        form.append("name", formData.name);
        form.append("classId", formData.classId);
        form.append("sectionId", formData.sectionId);
        form.append("rollno", formData.rollno);
        form.append("gender", formData.gender);
        form.append("dob", formData.dob);
        form.append("guardianname", formData.guardianname);
        form.append("guardiancell", formData.guardiancell);
        form.append("address",formData.address);
        
        if (formData.image instanceof File) {
            form.append("image", formData.image, formData.image.name);
        }
        try {
            let result;
            if (isEditMode) {
                const url = `/student?id=${studentObj.id}`;
                result = await axiosInstance.put(url, form);
            } else {
                const url = "/student";
                result = await axiosInstance.post(url, form);
            }
        } catch (error) {
            throw error;
        }
        getUpdatedData = true;
        handleSaveModal(false, getUpdatedData);
        setFormData({
            studentId: "",
            name: "",
            classId: "",
            sectionId: "",
            rollno: "",
            gender: "",
            dob: "",
            guardianname: "",
            guardiancell: "",
            image: "",
            address: ""
        });
        setPreviewImage("");
    }

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

    useEffect(() => {
        if (studentObj) {
            const oldImage = studentObj?.student_image
                ? `${API}/uploads/` + studentObj.student_image
                : "";

            setPreviewImage(oldImage);

            setFormData({
                ...formData,
                studentId: studentObj?.student_id,
                name: studentObj?.student_name,
                classId: studentObj?.class_id,
                sectionId: studentObj?.section_id,
                rollno: studentObj?.roll_no,
                gender: studentObj?.gender,
                dob: studentObj?.dob,
                guardianname: studentObj?.guardian_name,
                guardiancell: studentObj?.guardian_cell,
                image: studentObj?.student_image,
                address: studentObj?.address || "default"
            });
        }
    }, [studentObj]);

    useEffect(() => {

        loadClass()
    }, []);


    return (
        <>
            <Modal show={showModal} size="xl">
                <Modal.Header className="primary-bg-color">
                    <Modal.Title className="primary-text-color">
                        {isEditMode ? "Edit Student" : "Add Student"}
                    </Modal.Title>
                </Modal.Header>

                <Form onSubmit={onSaveModal}>
                    <Modal.Body>
                        <Row className="pb-1">
                            <Col md={4}>
                                <Form.Group>
                                    <Form.Label>Student ID</Form.Label>
                                    <Form.Control
                                        name="studentId"
                                        placeholder="Enter Student Name"
                                        type="text"
                                        required
                                        value={formData.studentId}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </Col>

                            <Col md={4}>
                                <Form.Group>
                                    <Form.Label>Full Name</Form.Label>
                                    <Form.Control
                                        name="name"
                                        placeholder="Enter Full Name."
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group>
                                    <Form.Label>Class</Form.Label>
                                    <Form.Select
                                        name="classId"
                                        required
                                        value={formData.classId}
                                        onChange={handleChange}
                                    >
                                        <option value="">Select Class</option>
                                        {classes.map((cls) => (
                                            <option key={cls.class_id} value={cls.class_id}>
                                                {cls.class_name}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row className="pb-1 pt-1">
                            <Col md={4}>
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
                            <Col md={4}>
                                <Form.Group>
                                    <Form.Label>Roll No</Form.Label>
                                    <Form.Control
                                        name="rollno"
                                        type="text"
                                        placeholder="Enter Roll No"
                                        required
                                        value={formData.rollno}
                                        onChange={handleChange}
                                    >
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                            <Col md={4}>
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
                        </Row>

                        <Row className="pt-1 pb-1">
                            <Col md={4}>
                                <Form.Group>
                                    <Form.Label>Date of Birth</Form.Label>
                                    <Form.Control
                                        name="dob"
                                        type="date"
                                        required
                                        value={formData.dob}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group>
                                    <Form.Label>Parent/Guardian Name</Form.Label>
                                    <Form.Control
                                        name="guardianname"
                                        placeholder="Enter Parent/Guardian Name"
                                        type="text"
                                        required
                                        value={formData.guardianname}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group>
                                    <Form.Label>Parent/Guardian Cell</Form.Label>
                                    <Form.Control
                                        name="guardiancell"
                                        type="tel"
                                        placeholder="03XXXXXXXXX"
                                        required
                                        maxLength={11}
                                        pattern="^03[0-9]{9}$"
                                        title="Phone number must start with 03 and be 11 digits"
                                        value={formData.guardiancell}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className="pt-1 pb-1">
                            <Col md={4}>
                                <Form.Group>
                                    <Form.Label>Image</Form.Label>
                                    <Form.Control
                                        name="image"
                                        type="file"
                                        required
                                        onChange={handleImageUpload}
                                    />
                                </Form.Group>
                                {previewImage && (
                                    <img
                                        src={previewImage}
                                        alt="preview"
                                        style={{
                                            width: "120px",
                                            height: "120px",
                                            objectFit: "cover",
                                            borderRadius: "8px",
                                            marginTop: "10px",
                                            border: "1px solid #ddd"
                                        }}
                                    />
                                )}

                            </Col>
                            <Col md={4}>
                                <Form.Group>
                                    <Form.Label>Address</Form.Label>
                                    <Form.Control
                                        name="address"
                                        placeholder="Enter address"
                                        as="textarea"
                                        rows={1}
                                        required
                                        value={formData.address}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

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
                                type="submit"
                            >
                                {
                                    isEditMode ? "Update Changes" : "Save Changes"
                                }

                            </Button>
                        </Modal.Footer>
                    </Modal.Body>
                </Form>
            </Modal>

        </>
    )
}

export default StudentModal;