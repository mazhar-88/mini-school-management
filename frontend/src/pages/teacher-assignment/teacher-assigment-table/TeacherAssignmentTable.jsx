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

function TeacherAssignmentTable({ teacher, handleEditStudent, handleDelete, handleEditMode }) {

    const onEditModal = (teacher) => {
        handleEditStudent(true, teacher);
        handleEditMode(true);
    }

    const onDeleteModal = (teacher) => {
        handleDelete(teacher);
    }
    

    return (
        <>
            <Table bordered hover responsive>
                <thead>
                    <tr>
                        <th>Sr</th>
                        <th>Teacher</th>
                        <th>Class</th>
                        <th>Section</th>
                        <th>Role</th>
                        <th className="text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {teacher?.map((obj, index) => (
                        <tr key={obj.id}>
                            <td>{index + 1}</td>
                            <td>{obj.name}</td>
                            <td>{obj.class_name}</td>
                            <td>{obj.section_name}</td>
                            <td>{obj.role}</td>
                            <td className="text-center">
                                <Button
                                    size="sm"
                                    className="me-2 warning-color with-out-border"
                                    onClick={(e) => onEditModal(obj)}
                                >
                                    Edit
                                </Button>
                                <Button
                                    size="sm"
                                    variant="danger"
                                    onClick={(e) => onDeleteModal(obj)}
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

export default TeacherAssignmentTable;