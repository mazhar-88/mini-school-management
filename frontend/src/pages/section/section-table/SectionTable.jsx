import { useState } from "react";
import {
    Button,
    Table
} from "react-bootstrap";

function SectionTable({ section, handleEdit, handleDelete,handleEditMode }) {

    const onEditModal = (section) => {
        handleEdit(true, section)
        handleEditMode(true)
    }

    const onDeleteModal = (section) => {
        handleDelete(section)
    }
    return (
        <>
            <Table bordered hover responsive>
                <thead>
                    <tr>
                        <th>Sr</th>
                        <th>Class Name</th>
                        <th>Section Name</th>
                        <th className="text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {section.map((obj, index) => (
                        <tr key={obj.id}>
                            <td>{index + 1}</td>
                            <td>{obj.class_name}</td>
                            <td>{obj.section_name}</td>
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
export default SectionTable;