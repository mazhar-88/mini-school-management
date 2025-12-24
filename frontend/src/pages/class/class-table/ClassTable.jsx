import { useState } from "react";
import {
    Button,
    Table,
} from "react-bootstrap";

function ClassTable({ classes, handleEdit, handleDelete, handleEditMode }) {

    const onEditModal = (obj) => {
        handleEdit(true, obj);
        handleEditMode(true)
    }

    const onDeleteModal = (obj) => {
        handleDelete(obj)
    }
    return (
        <>
            <Table bordered hover responsive>
                <thead>
                    <tr>
                        <th>Sr</th>
                        <th>Name</th>
                        <th className="text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {classes?.map((obj, index) => (
                        <tr key={obj.class_id}>
                            <td>{index + 1}</td>
                            <td>{obj.class_name}</td>
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
export default ClassTable;