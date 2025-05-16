import React, { useState } from 'react';
import HomeNavbar from '../../components/navbar/HomeNavbar';
import "./ClassPageStyle.css";
import ClassCard from '../../components/classcard/ClassCard';

function ClassPage() {
    const [allClass, setAllClass] = useState([
        { title: "Javascript Lesson1 Abstract TItle", students: 10, quizzes: 20 },
        { title: "Java Lesson1 Abstract TItle", students: 40, quizzes: 10 },
        { title: "Python Lesson1 Abstract TItle", students: 8, quizzes: 22 },
        { title: "Bisaya++ Lesson1 Abstract TItle", students: 18, quizzes: 30 },
        { title: "Bisaya++ Lesson1 Abstract TItle", students: 18, quizzes: 30 },
        { title: "Bisaya++ Lesson1 Abstract TItle", students: 18, quizzes: 30 },
        { title: "Bisaya++ Lesson1 Abstract TItle", students: 18, quizzes: 30 },
        { title: "Bisaya++ Lesson1 Abstract TItle", students: 18, quizzes: 30 },
        { title: "Bisaya++ Lesson1 Abstract TItle", students: 18, quizzes: 30 },
        { title: "Bisaya++ Lesson1 Abstract TItle", students: 18, quizzes: 30 },
        { title: "Bisaya++ Lesson1 Abstract TItle", students: 18, quizzes: 30 },
        { title: "Bisaya++ Lesson1 Abstract TItle", students: 18, quizzes: 30 },
        { title: "Bisaya++ Lesson1 Abstract TItle", students: 18, quizzes: 30 },
    ]);

    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [newClassTitle, setNewClassTitle] = useState("");
    const [indexToDelete, setIndexToDelete] = useState(null);

    const handleAddClass = () => {
        if (newClassTitle.trim() === "") return;
        setAllClass(prev => [...prev, { title: newClassTitle, students: 0, quizzes: 0 }]);
        setNewClassTitle("");
        setShowModal(false);
    };

    const handleDeleteClass = () => {
        if (indexToDelete !== null) {
            const updated = allClass.filter((_, i) => i !== indexToDelete);
            setAllClass(updated);
            setIndexToDelete(null);
            setShowDeleteModal(false);
        }
    };

    return (
        <>
            <div>
                <HomeNavbar />
            </div>

            <div className='d-flex flex-row justify-content-end mt-5' style={{ marginRight: '100px' }}>
                <button className='btn btn-danger' onClick={() => setShowModal(true)}>Add Class</button>
            </div>

            <div className='d-flex flex-row mt-3' style={{ paddingBottom: "40px" }}>
                <div className="container">
                    <div className="row g-4 ">
                        {allClass.map((elem, index) => (
                            <ClassCard
                                key={index}
                                title={elem.title}
                                students_num={elem.students}
                                quizzes_num={elem.quizzes}
                                onDelete={() => {
                                    setIndexToDelete(index);
                                    setShowDeleteModal(true);
                                }}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Add Class Modal */}
            {showModal && (
                <div className="modal d-block fade show" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Create New Class</h5>
                                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter class name"
                                    value={newClassTitle}
                                    onChange={(e) => setNewClassTitle(e.target.value)}
                                />
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
                                <button className="btn btn-primary" onClick={handleAddClass}>Create</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <div className="modal d-block fade show" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Confirm Delete</h5>
                                <button type="button" className="btn-close" onClick={() => setShowDeleteModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                Are you sure you want to delete this class?
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary" onClick={() => setShowDeleteModal(false)}>Cancel</button>
                                <button className="btn btn-danger" onClick={handleDeleteClass}>Confirm</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default ClassPage;
