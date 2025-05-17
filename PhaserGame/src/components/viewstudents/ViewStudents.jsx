import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

function ViewStudents() {
    const [students, setStudents] = useState([
        "Alice Johnson",
        "Bob Smith",
        "Charlie Garcia",
        "Daniela Cruz",
        "Eugene Tan",
        "Francine dela Cruz",
        "Gerry Alvarez",
        "Hannah Lim",
        "menot Lim",
        "HMoent Lim",
    ]);
    const [searchTerm, setSearchTerm] = useState("");
    const [dropdownVisible, setDropdownVisible] = useState(false);

    const filteredStudents = students.filter((name) =>
        name.toLowerCase().includes(searchTerm.toLowerCase()) && searchTerm.trim() !== ""
    );

    const [alert, setAlert] = useState({ type: '', message: '', visible: false });

    const [studentToDelete, setStudentToDelete] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const showAlert = (type, message) => {
        setAlert({ type, message, visible: true });
        setTimeout(() => setAlert({ type: '', message: '', visible: false }), 3000);
    };

    const handleAddStudent = () => {
        const trimmedName = searchTerm.trim();

        if (!trimmedName) {
            showAlert('danger', 'Please enter a valid name.');
            return;
        }

        const exists = students.some(
            (student) => student.toLowerCase() === trimmedName.toLowerCase()
        );

        if (exists) {
            showAlert('warning', 'Student already exists.');
            return;
        }

        setStudents((prev) => [...prev, trimmedName]);
        setSearchTerm("");
        setDropdownVisible(false);
        showAlert('success', 'Student added successfully!');
    };

    const handleDeleteClick = (name) => {
        setStudentToDelete(name);
        setShowModal(true);
    };

    const confirmDelete = () => {
        setStudents((prev) => prev.filter((s) => s !== studentToDelete));
        showAlert('success', `"${studentToDelete}" has been removed.`);
        setStudentToDelete(null);
        setShowModal(false);
    };

    return (
        <div className="container mt-4">
            <div className='d-flex flex-row justify-content-between align-items-center'>
                <h3>Enrolled Students</h3>
                <button className='btn btn-danger' onClick={handleAddStudent}>
                    Add Student
                </button>
            </div>

            {/* Bootstrap Alert */}
            {alert.visible && (
                <div className={`alert alert-${alert.type} alert-dismissible fade show mt-3`} role="alert">
                    {alert.message}
                    <button
                        type="button"
                        className="btn-close"
                        onClick={() => setAlert({ ...alert, visible: false })}
                    ></button>
                </div>
            )}

            {/* Search Input */}
            <div className="mt-3 position-relative">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search student name..."
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setDropdownVisible(true);
                    }}
                    onBlur={() => setTimeout(() => setDropdownVisible(false), 150)}
                />

            </div>

            {/* Enrolled List */}
            <div className="d-flex flex-column gap-2 mt-4">
                {students.map((name, idx) => (
                    <div key={idx} className="d-flex justify-content-between align-items-center border-bottom pb-2">
                        <div style={{ wordBreak: "break-word", flex: 1 }}>
                            {name}
                        </div>
                        <FontAwesomeIcon
                            icon={faTrash}
                            className="text-danger"
                            style={{ cursor: 'pointer', marginLeft: '10px' }}
                            title="Delete"
                            onClick={() => handleDeleteClick(name)}
                        />
                    </div>
                ))}
            </div>

            {/* Delete Confirmation Modal */}
            {showModal && (
                <div className="modal fade show d-block" tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Confirm Deletion</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setShowModal(false)}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <p>Are you sure you want to remove <strong>{studentToDelete}</strong>?</p>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => setShowModal(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={confirmDelete}
                                >
                                    Confirm Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {/* Modal backdrop */}
            {showModal && <div className="modal-backdrop fade show"></div>}
        </div>
    );
}

export default ViewStudents;
