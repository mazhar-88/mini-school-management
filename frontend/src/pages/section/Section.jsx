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
import SectionModal from "./section-modal/SectionModal";
import SectionTable from "./section-table/SectionTable";
import axios from "axios";
import axiosInstance from "../../shared/utils/axiosInstance";

function Section() {
    const [showModal, setShowModal] = useState(false);
    const [sectionObj, setSectionObj] = useState(null);
    const [classes, setClasses] = useState([]);
    const [section, setSection] = useState([]);
    const [isEditMode, setIsEditMode] = useState(false)
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
        setShowModal(isModalOpen);

    };

    const handleSaveModal = (isModalOpen, loadUpdatedData) => {
        setShowModal(isModalOpen);
        if (loadUpdatedData) {
            loadSections();
        }
    };

    const handleEdit = (isModalOpen, section) => {
        setShowModal(isModalOpen);
        setSectionObj(section)
    };

    const handleDelete = async (section) => {
        try {
            const url = `/section?id=${section.section_id}`;
            const result = await axiosInstance.delete(url);
            if (result.status == 200) {
                loadSections();
            }
        } catch (error) {
            throw error;
        }

    }

    const loadClasses = async () => {
        try {
            const url = `/getallclass`;
            const result = await axiosInstance.get(url);
            if (result.status == 200) {
                setClasses(result.data.data)
            }
        } catch (error) {
            throw error;
        }
    }

    const loadSections = async (page = 1) => {
        try {
            const param = new URLSearchParams();
            param.set("defaultRecord", defaultRecord);
            param.set("currentpage", page);
            const url = `/section?${param.toString()}`;
            const result = await axiosInstance.get(url);
            if (result.status == 200) {
                setSection(result.data.data);
                const count = Math.ceil(result.data.total / defaultRecord);
                
                setTotalCoutn(count);
                setCurrentPage(page);
            }
        } catch (error) {
            throw error;
        }
    }

    const handlePageClick = (page) => {
        loadSections(page);
    };

    const handlePrev = () => {
        if (currentPage > 1) {
            loadSections(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalCount) {
            loadSections(currentPage + 1);
        }
    };

    useEffect(() => {
        loadClasses();
        loadSections();
    }, [])
    return (
        <>
            <Container fluid className="p-4">
                <Row className="mb-3 align-items-center">
                    <Col>
                        <h2 className="fw-bold">Section Management</h2>
                    </Col>
                    <Col className="text-end">
                        <Button className="primary-bg-color with-out-border" onClick={handleAdd}>
                            + Add Section
                        </Button>
                    </Col>
                </Row>

                <SectionTable
                    section={section}
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
            <SectionModal
                showModal={showModal}
                handleCloseModal={handleCloseModal}
                handleSaveModal={handleSaveModal}
                sectionObj={sectionObj}
                classes={classes}
                isEditMode={isEditMode}

            />
        </>
    )
}
export default Section;