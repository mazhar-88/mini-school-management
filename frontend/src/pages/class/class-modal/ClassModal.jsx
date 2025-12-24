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

function ClassModal({ showModal, handleCloseModal, handleSaveModal, classObj, isEditMode }) {
    const [formData, setFormData] = useState({
        class_name: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const onCloseModal = () => {
        handleCloseModal(false);
    }

    const onSaveModal = async () => {
        let getupdateData;
        try {
            const obj = { class_name: formData.class_name };
            let result;
           
            if (isEditMode) {
                const url = `/class?id=${classObj.class_id}`;
                result = await axiosInstance.put(url, obj);
            } else {
                const url = `/class`;
                result = await axiosInstance.post(url, obj);
            }

            getupdateData = true;
            setFormData({
                class_name: ""
            })
        } catch (error) {
            getupdateData = false;
            throw error.message;
        }
        handleSaveModal(false, getupdateData);
    }

    useEffect(() => {
        setFormData({
            ...formData,
            class_name: classObj?.class_name,
        })
    }, [classObj])
    return (
        <>
            <Modal show={showModal} size="md">
                <Modal.Header className="primary-bg-color">
                    <Modal.Title className="primary-text-color">Add Class</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form>
                        <Row className="mb-3">
                            <Col>
                                <Form.Group>
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        name="class_name"
                                        placeholder="Enter Class Name"
                                        type="text"
                                        required
                                        value={formData.class_name}
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
export default ClassModal;