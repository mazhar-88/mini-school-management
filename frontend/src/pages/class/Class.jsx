import { useEffect, useState } from "react";
import {
    Container,
    Row,
    Col,
    Button,
    Pagination,
} from "react-bootstrap";
import ClassModal from "./class-modal/ClassModal";
import ClassTable from "./class-table/ClassTable";
import axios from "axios";
import axiosInstance from "../../shared/utils/axiosInstance";

function Class() {
    const [showModal, setShowModal] = useState(false);
    const [classObj, setClassObj] = useState(null);
    const [classes, setClasses] = useState([]);
    const [isEditMode, setIsEditMode] = useState(false);
    const [totalCount, setTotalCoutn] = useState(null);
    const [defaultRecord, setDefaultRecord] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);

    const handleAddStudent = () => {
        setShowModal(true);
        handleEditMode(false);
    };

    const handleEditMode = (isEdite = false) => {
        if (isEdite) {
            setIsEditMode(true);
        } else {
            setIsEditMode(false);
        }
    }

    const handleCloseModal = (isModalOpen) => {
        setShowModal(isModalOpen)
    };

    const handleSaveModal = (isModalOpen, getupdateData) => {
        setShowModal(isModalOpen);
        if (getupdateData) {
            loadData();
        }
    };

    const handleEdit = (isModalOpen, classObj) => {
        setShowModal(isModalOpen);
        setClassObj(classObj)
    };

    const handleDelete = async (classObj) => {
        try {
            const url = `/class?id=${classObj.class_id}`;
            const result = await axiosInstance.delete(url);

            if (result.status == 200) {
                loadData();
            }
        } catch (error) {
            throw error;
        }
    }

    const loadData = async (page = 1) => {
        try {
            const param = new URLSearchParams();
            param.set("defaultRecord", defaultRecord);
            param.set("currentpage", page);

            const result = await axiosInstance.get(`/class?${param.toString()}`);

            if (result.status === 200) {
                setClasses(result.data.data);

                const count = Math.ceil(result.data.total / defaultRecord);
                setTotalCoutn(count);
                setCurrentPage(page);
            }
        } catch (error) {
            throw error;
        }
    };

    const handlePageClick = (page) => {
        loadData(page);
    };

    const handlePrev = () => {
        if (currentPage > 1) {
            loadData(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalCount) {
            loadData(currentPage + 1);
        }
    };



    useEffect(() => {
        loadData();
    }, [])

    return (
        <>
            <Container fluid className="p-4">
                <Row className="mb-3 align-items-center">
                    <Col>
                        <h2 className="fw-bold">Class Management</h2>
                    </Col>
                    <Col className="text-end">
                        <Button className="primary-bg-color with-out-border" onClick={handleAddStudent}>
                            + Add Class
                        </Button>
                    </Col>
                </Row>
                <ClassTable
                    classes={classes}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                    handleEditMode={handleEditMode}
                />
                <Pagination className="justify-content-end">
                    <Pagination.Prev
                        disabled={currentPage === 1}
                        onClick={handlePrev}
                    />

                    {Array.from({ length: totalCount }, (_, index) => {
                        const pageNumber = index + 1;
                        return (
                            <Pagination.Item
                                key={pageNumber}
                                active={pageNumber === currentPage}
                                onClick={() => handlePageClick(pageNumber)}
                            >
                                {pageNumber}
                            </Pagination.Item>
                        );
                    })}

                    <Pagination.Next
                        disabled={currentPage === totalCount}
                        onClick={handleNext}
                    />
                </Pagination>

            </Container>
            <ClassModal
                showModal={showModal}
                handleCloseModal={handleCloseModal}
                handleSaveModal={handleSaveModal}
                classObj={classObj}
                isEditMode={isEditMode}
            />
        </>
    )
}

export default Class;