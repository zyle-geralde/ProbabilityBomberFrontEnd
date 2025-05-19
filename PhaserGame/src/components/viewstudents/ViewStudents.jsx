import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useShowStudents, useAddStudentToClass, useRemoveStudentFromClass } from '../../hooks/UseTeacher';

function ViewStudents({ userData, className }) {
  const { students, loading } = useShowStudents(className, 0);
  const [localStudents, setLocalStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [alert, setAlert] = useState({ type: '', message: '', visible: false });
  const [studentToDelete, setStudentToDelete] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { remove, loading: removeLoading, success: removeSuccess, reset: resetRemove } = useRemoveStudentFromClass();

  // Sync API → local state when done loading
  useEffect(() => {
    if (!loading) {
      setLocalStudents(students);
    }
  }, [loading, students]);

  const showAlert = (type, message) => {
    setAlert({ type, message, visible: true });
    setTimeout(() => setAlert({ type: '', message: '', visible: false }), 3000);
  };

  // Add student API call + local state update
const handleAddStudent = async () => {
  const trimmedName = searchTerm.trim();
  if (!trimmedName) return showAlert('danger', 'Please enter a valid name.');

  const exists = localStudents.some(s => s.toLowerCase() === trimmedName.toLowerCase());
  if (exists) return showAlert('warning', 'Student already exists.');

  const { success } = await useAddStudentToClass(className, trimmedName);
  if (success) {
    setLocalStudents(prev => [...prev, trimmedName]);
    setSearchTerm("");
    showAlert('success', 'Student added successfully!');
  } else {
    showAlert('danger', 'Failed to add student.');
  }
};

  // Open modal to confirm delete
  const handleDeleteClick = (name) => {
    setStudentToDelete(name);
    setShowModal(true);
  };

  // Confirm and delete via API
const confirmDelete = async () => {
  const didRemove = await remove(className, studentToDelete);

  if (didRemove) {
    setLocalStudents(prev => prev.filter((s) => s !== studentToDelete));
    showAlert('success', `"${studentToDelete}" has been removed.`);
  } else {
    showAlert('danger', `Failed to remove "${studentToDelete}".`);
  }

  setStudentToDelete(null);
  setShowModal(false);
};


  const filteredStudents = localStudents.filter((name) =>
    name.toLowerCase().includes(searchTerm.toLowerCase()) && searchTerm.trim() !== ""
  );

  if (loading) return <div className="text-center mt-4">Loading students...</div>;

  return (
    <div className="container mt-4">
      <div className='d-flex flex-row justify-content-between align-items-center'>
        <h3>Enrolled Students</h3>
        <button className='btn btn-danger' onClick={handleAddStudent}>
          Add Student
        </button>
      </div>

      {alert.visible && (
        <div className={`alert alert-${alert.type} alert-dismissible fade show mt-3`} role="alert">
          {alert.message}
          <button type="button" className="btn-close" onClick={() => setAlert({ ...alert, visible: false })}></button>
        </div>
      )}

      <div className="mt-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search student name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="d-flex flex-column gap-2 mt-4">
        {(searchTerm ? filteredStudents : localStudents).map((name, idx) => (
          <div key={idx} className="d-flex justify-content-between align-items-center border-bottom pb-2">
            <div style={{ wordBreak: "break-word", flex: 1 }}>{name}</div>
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

      {showModal && (
        <>
          <div className="modal fade show d-block" tabIndex="-1">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Confirm Deletion</h5>
                  <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                </div>
                <div className="modal-body">
                  <p>Are you sure you want to remove <strong>{studentToDelete}</strong>?</p>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                  <button className="btn btn-danger" onClick={confirmDelete}>
                    {removeLoading ? "Deleting..." : "Confirm Delete"}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show"></div>
        </>
      )}
    </div>
  );
}

export default ViewStudents;
