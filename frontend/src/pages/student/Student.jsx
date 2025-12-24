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
import StudentModal from "./student-modal/StudentModal";
import StudentTable from "./student-table/StudentTable";
import axios, { Axios } from "axios";
import axiosInstance from "../../shared/utils/axiosInstance";

function Students() {
    const [showModal, setShowModal] = useState(false);
    const [studentObj, setStudentObj] = useState(null);
    const [students, setStudents] = useState([]);
    const [isEditMode, setIsEditMode] = useState(false)
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

    const handleSaveModal = (isModalOpen, loadUpdatedData) => {
        setShowModal(isModalOpen);
        if (loadUpdatedData) {
            loadData();
        }
    };

    const handleEditStudent = (isModalOpen, student) => {
        setShowModal(isModalOpen);
        setStudentObj(student)
        console.log(student);
    };

    const handleDelete = async (student) => {
        console.log(student);
        const studentId = student?.id;
        try {
            const url = `/student?id=${studentId}`;
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

            const url = `/student?${param.toString()}`;
            const result = await axiosInstance.get(url);
            if (result.status == 200) {
                const count = Math.ceil(result.data.total / defaultRecord);
                setTotalCoutn(count);
                setCurrentPage(page);
            }
            setStudents(result.data.data);
        } catch (error) {
            throw error;
        }
    }

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
                        <h2 className="fw-bold">Student Management</h2>
                    </Col>
                    <Col className="text-end">
                        <Button className="primary-bg-color with-out-border" onClick={handleAddStudent}>
                            + Add Student
                        </Button>
                    </Col>
                </Row>

                <StudentTable
                    students={students}
                    handleEditStudent={handleEditStudent}
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
            <StudentModal
                showModal={showModal}
                handleCloseModal={handleCloseModal}
                handleSaveModal={handleSaveModal}
                studentObj={studentObj}
                isEditMode={isEditMode}
            />
        </>

    );
}

export default Students;
