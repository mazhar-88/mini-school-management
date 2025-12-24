import axios from "axios";
import { useEffect, useState } from "react";
import {
    Row,
    Col,
    Button,
    Modal,
    Form,
} from "react-bootstrap";
import axiosInstance from "../../../shared/utils/axiosInstance";

function SectionModal({ showModal, handleCloseModal, handleSaveModal, sectionObj, classes, isEditMode }) {
    const API =  import.meta.env.VITE_API_BASE_URL;
    const [formData, setFormData] = useState({
        sectionname: "",
        classId: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const onCloseModal = () => {
        handleCloseModal(false);
    }

    const onSaveModal = async () => {


        let loadUpdatedData;
        try {
            const obj = { section_name: formData.sectionname, class_id: formData.classId };
            let result;
            if (isEditMode) {
                const url = `/section?id=${sectionObj.section_id}`;
                result = await axiosInstance.put(url, obj);
            } else {
                const url = `${API}/section`;
                result = await axiosInstance.post(url, obj);
            }

            loadUpdatedData = true;
            setFormData({
                sectionname: "",
                classId: ""
            })

        } catch (error) {
            loadUpdatedData = false;
            throw error;
        }
        handleSaveModal(false, loadUpdatedData);
    }

    useEffect(() => {
        const selectedClass = classes?.find(id => id.class_id == sectionObj?.class_id);
        setFormData({
            ...formData,
            sectionname: sectionObj?.section_name,
            classId: selectedClass?.class_name
        })
    }, [sectionObj])

    return (
        <>
            <Modal show={showModal} size="lg">
                <Modal.Header className="primary-bg-color">
                    <Modal.Title className="primary-text-color">Add Section</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form>
                        <Row className="mb-3">
                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label>Select Class</Form.Label>
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

                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label>Section</Form.Label>
                                    <Form.Control
                                        name="sectionname"
                                        placeholder="Enter Section Name"
                                        type="text"
                                        required
                                        value={formData.sectionname}
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
                            {
                                isEditMode ? "Update Changes" : "Save Changes"
                            }
                        </Button>
                    </Modal.Footer>
                </Modal.Body>
            </Modal>
        </>
    )
};
export default SectionModal;