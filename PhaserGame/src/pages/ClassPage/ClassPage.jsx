import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate} from 'react-router-dom';
import HomeNavbar from '../../components/navbar/HomeNavbar';
import "./ClassPageStyle.css";
import ClassCard from '../../components/classcard/ClassCard';
import { useTeacherClasses, useCreateClassForTeacher, useRemoveClassFromTeacher } from '../../hooks/UseTeacher';
import { loginUser } from '../../controllers/AuthController';

function ClassPage({ userData,setUserData }) {
    const navigate = useNavigate();

    // ---
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [error, setError] = useState(null);
    const [userDatame, setUserDatame] = useState(null);
    // --

    //console.log(localStorage.getItem("userData"))


    const [refreshKey, setRefreshKey] = useState(0);
    const [success, setSuccess] = useState(false);
    const { classes: allClass, loading } = useTeacherClasses(refreshKey, success);

    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [newClassTitle, setNewClassTitle] = useState("");
    const [classInput, setClassInput] = useState("");
    const [classToDelete, setClassToDelete] = useState(null);
    const [deleteTrigger, setDeleteTrigger] = useState(false);

    const location = useLocation();
    const checkP = location.state?.password;
    


    console.log(userData)

useEffect(() => {
    if (userData) {
        setUserDatame(userData);
        setEmail(userData.email);
        setRole(userData.role);
    }
    if (checkP) {
        setPassword(checkP);
    }
}, [userData, checkP]);

    useEffect(() => {
    // Trigger a refresh when the component mounts
    setSuccess(prev => !prev);
    }, []);

    useEffect(() => {
    // Trigger a refresh when the component mounts
    setSuccess(prev => !prev);
    }, []);

    const {
        success: createSuccess,
        loading: createLoading,
        reset: resetCreate
    } = useCreateClassForTeacher(newClassTitle);

    const {
        success: deleteSuccess,
        loading: deleteLoading,
        reset: resetDelete
    } = useRemoveClassFromTeacher(deleteTrigger ? classToDelete : null);

    // Handle creation success
    useEffect(() => {
        if (createSuccess) {
            loginUser({ email, password, role, setUserData, setError, navigate });
            
            setSuccess(prev => !prev);
            setShowModal(false);
            setClassInput("");
            resetCreate();
        }
    }, [createSuccess, resetCreate]);

    // Handle deletion success
    useEffect(() => {
        if (deleteSuccess) {
            loginUser({ email, password, role, setUserData, setError, navigate });

            setSuccess(prev => !prev);
            setShowDeleteModal(false);
            setClassToDelete(null);
            setDeleteTrigger(false);
            resetDelete();
        }
    }, [deleteSuccess, resetDelete]);

    const handleAddClass = () => {
        if (classInput.trim() === "") return;
        setNewClassTitle(classInput);
    };

    const handleDeleteClass = () => {
        if (classToDelete) {
            // reset trigger and then set it to true to trigger hook
            setDeleteTrigger(false);
            setTimeout(() => setDeleteTrigger(true), 0);
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
                    <div className="row g-4">
                        {loading ? (
                            <div>Loading...</div>
                        ) : (
                            allClass.map((elem, index) => (
                                <ClassCard
                                    key={index}
                                    title={elem}
                                    userData={userData}
                                    onDelete={() => {
                                        setClassToDelete(elem);
                                        setShowDeleteModal(true);
                                    }}
                                    uid={index}
                                />
                            ))
                        )}
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
                                    value={classInput}
                                    onChange={(e) => setClassInput(e.target.value)}
                                />
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
                                <button className="btn btn-primary" onClick={handleAddClass} disabled={createLoading}>
                                    {createLoading ? "Creating..." : "Create"}
                                </button>
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
                                Are you sure you want to delete <strong>{classToDelete}</strong>?
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary" onClick={() => setShowDeleteModal(false)}>Cancel</button>
                                <button className="btn btn-danger" onClick={handleDeleteClass} disabled={deleteLoading}>
                                    {deleteLoading ? "Deleting..." : "Confirm"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default ClassPage;
