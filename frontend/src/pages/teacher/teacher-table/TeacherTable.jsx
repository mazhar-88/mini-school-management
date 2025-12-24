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

function TeacherTable({ teacher, handleEditStudent, handleDelete, handleEditMode }) {

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

                        <th>Name</th>
                        <th>Email</th>
                        <th>Contact</th>
                        <th>Qualification</th>
                        <th>Gender</th>
                        <th>Address</th>
                        <th className="text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {teacher?.map((obj, index) => (
                        <tr key={obj.id}>
                            <td>{index + 1}</td>
                            <td>{obj.name}</td>
                            <td>{obj.email}</td>
                            <td>{obj.cell}</td>
                            <td>{obj.qualification}</td>
                            <td>{obj.gender}</td>
                            <td>{obj.address}</td>
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
};
export default TeacherTable;