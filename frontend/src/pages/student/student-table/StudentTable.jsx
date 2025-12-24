import { useState } from "react";
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

function StudentTable({ students, handleEditStudent, handleDelete, handleEditMode }) {
const API =  import.meta.env.VITE_API_BASE_URL;
    const onEditModal = (student) => {
        handleEditStudent(true, student);
        handleEditMode(true)
    }

    const onDeleteModal = (student) => {
        handleDelete(student)
    }
    return (
        <>
            <Table bordered hover responsive>
                <thead>
                    <tr>
                        <th>Sr</th>
                        <th>Student ID</th>
                        <th>Name</th>
                        <th>Class – Section</th>
                        <th>Roll No</th>
                        <th>Gender</th>
                        <th>Photo</th>
                        <th className="text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student, index) => (
                        <tr key={index + 1}>
                            <td>{index + 1}</td>
                            <td>{student.student_id}</td>
                            <td>{student.student_name}</td>
                            <td>{student.class_name + "-" + student.section_name}</td>
                            <td>{student.roll_no}</td>
                            <td>{student.gender}</td>
                            <td>
                                {
                                    <img src={`${API}/uploads/${student.student_image}`}
                                        alt="student"
                                        width="50"
                                        height="50"
                                    />
                                }
                            </td>
                            <td className="text-center">
                                <Button
                                    size="sm"
                                    className="me-2 warning-color with-out-border"
                                    onClick={(e) => onEditModal(student)}
                                >
                                    Edit
                                </Button>
                                <Button
                                    size="sm"
                                    variant="danger"
                                    onClick={(e) => onDeleteModal(student)}
                                >
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    )
}

export default StudentTable;