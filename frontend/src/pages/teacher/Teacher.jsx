import { useEffect, useState } from "react";
import {
    Container,
    Row,
    Col,
    Button,
    Pagination,
} from "react-bootstrap";
import TeacherTable from "./teacher-table/TeacherTable";
import TeacherModal from "./teacher-modal/TeacherModal";
import axiosInstance from "../../shared/utils/axiosInstance";

function Teacher() {
    const [showModal, setShowModal] = useState(false);
    const [teacherObj, setTeacherObj] = useState(null);
    const [teacher, setTeacher] = useState([]);
    const [isEditMode, setIsEditMode] = useState(false);
    const [totalCount, setTotalCoutn] = useState(null);
    const [defaultRecord, setDefaultRecord] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);

    const handleAdd = () => {
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

    const handleSaveModal = (isModalOpen, getUpdatedData) => {
        setShowModal(isModalOpen);
        if (getUpdatedData) {
            loadData()
        }
    };

    const handleEditStudent = (isModalOpen, teacher) => {
        setShowModal(isModalOpen);
        setTeacherObj(teacher)
    };

    const handleDelete = async (teacher) => {
        try {
            const url = `/teacher?id=${teacher.teacher_id}`;
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
            const url = `/teacher?${param.toString()}`;
            const result = await axiosInstance.get(url);
            if (result.status == 200) {
                setTeacher(result.data.data);
                const count = Math.ceil(result.data.total / defaultRecord);
                setTotalCoutn(count);
                setCurrentPage(page);
            }
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
                        <h2 className="fw-bold">Teacher Management</h2>
                    </Col>
                    <Col className="text-end">
                        <Button className="primary-bg-color with-out-border" onClick={handleAdd}>
                            + Add Teacher
                        </Button>
                    </Col>
                </Row>

                <TeacherTable
                    teacher={teacher}
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
            <TeacherModal
                showModal={showModal}
                handleCloseModal={handleCloseModal}
                handleSaveModal={handleSaveModal}
                teacherObj={teacherObj}
                isEditMode={isEditMode}
            />
        </>
    )
}

export default Teacher;