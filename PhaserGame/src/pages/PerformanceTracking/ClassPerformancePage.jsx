import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import * as XLSX from 'xlsx';

import './ClassPerformancePage.css';
import HomeNavbar from '../../components/navbar/HomeNavbar';

const ClassPerformancePage = () => {
  const generateStudents = () => {
    const students = [];
    const numStudents = 50;
    const numQuizzes = 15;

    for (let i = 1; i <= numStudents; i++) {
      const quizzes = [];
      for (let j = 1; j <= numQuizzes; j++) {
        quizzes.push({
          quizName: `Quiz ${j}`,
          score: Math.floor(Math.random() * 11), // score 0-10
        });
      }
      students.push({
        name: `Student ${i}`,
        quizzes,
      });
    }

    return students;
  };

  const [students, setStudents] = useState(generateStudents());
  const [searchTerm, setSearchTerm] = useState('');
  const [editingStudentIndex, setEditingStudentIndex] = useState(null);
  const [tempScores, setTempScores] = useState({}); // store scores being edited temporarily

  const getUniqueQuizzes = () => {
    const quizSet = new Set();
    students.forEach((student) => {
      student.quizzes.forEach((quiz) => quizSet.add(quiz.quizName));
    });
    return [...quizSet];
  };

  const quizNames = getUniqueQuizzes();

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openEditModal = (index) => {
    setEditingStudentIndex(index);
    // Prepare tempScores object from student's quizzes for easy editing
    const initialScores = {};
    students[index].quizzes.forEach(({ quizName, score }) => {
      initialScores[quizName] = score;
    });
    setTempScores(initialScores);
  };

  const closeModal = () => {
    setEditingStudentIndex(null);
    setTempScores({});
  };

  const handleTempScoreChange = (quizName, newScore) => {
    setTempScores((prev) => ({
      ...prev,
      [quizName]: newScore,
    }));
  };

  const saveScores = () => {
    if (editingStudentIndex === null) return;
    const updatedStudents = [...students];
    // Update quizzes scores based on tempScores
    updatedStudents[editingStudentIndex].quizzes = quizNames.map((qName) => ({
      quizName: qName,
      score: Number(tempScores[qName]) || 0,
    }));
    setStudents(updatedStudents);
    closeModal();
  };

  const exportToExcel = () => {
    const formatted = students.map((student) => {
      const row = { Name: student.name };
      quizNames.forEach((qName) => {
        const quiz = student.quizzes.find((q) => q.quizName === qName);
        row[qName] = quiz ? quiz.score : '';
      });
      return row;
    });

    const worksheet = XLSX.utils.json_to_sheet(formatted);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Scores');
    XLSX.writeFile(workbook, 'student_scores.xlsx');
  };

  const columns = [
    {
      name: 'Name',
      selector: (row) => row.name,
      sortable: true,
    },
    ...quizNames.map((qName) => ({
      name: qName,
      selector: (row) => {
        const quiz = row.quizzes.find((q) => q.quizName === qName);
        return quiz ? quiz.score : '-';
      },
      sortable: true,
      cell: (row) => {
        const quiz = row.quizzes.find((q) => q.quizName === qName);
        return <span>{quiz ? quiz.score : '-'}</span>;
      },
    })),
    {
      name: 'Actions',
      cell: (row, index) => (
        <button
          onClick={() => openEditModal(index)}
          className="performance-btn performance-btn-edit"
        >
          Edit Scores
        </button>
      ),
      ignoreRowClick: true,
    },
  ];

  return (
    <>
      <HomeNavbar />
      <div className="performance-students-page">
        <aside className="performance-sidebar">
          <div className="performance-profile-section">
            <div className="performance-profile-info">
              <h2 className="performance-profile-name">ClassName</h2>
              {/* <p className="performance-profile-role">Student</p> */}
            </div>
          </div>

          <nav className="performance-navigation">
            <button className="performance-nav-button">Student Grades</button>
            {/* <button className="performance-nav-button">Students List</button>
            <button className="performance-nav-button">Attendance Tracking</button>
            <button className="performance-nav-button">Class Stats</button> */}
          </nav>
        </aside>

        <main className="performance-main-content">
          <div className="performance-student-list-container">
            <div className="performance-controls-container">
              <input
                type="text"
                placeholder="Search by name..."
                className="performance-search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="performance-nav-container">
                <button onClick={exportToExcel} className="performance-btn performance-btn-primary">
                  Export to Excel
                </button>
              </div>
            </div>

            <DataTable
            title="Student Quiz Scores"
            columns={columns}
            data={filteredStudents}
            pagination
            highlightOnHover
            fixedHeader
            fixedHeaderScrollHeight="600px" 
            className="performance-class-performance-table"
            />

          </div>
        </main>
      </div>

      {/* Modal */}
      {editingStudentIndex !== null && (
        <div
          className="performance-modal-overlay"
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
        <div className="performance-modal-content" onClick={e => e.stopPropagation()}>
        <h2 id="modal-title" className="performance-modal-title">
            Edit Scores for {students[editingStudentIndex].name}
        </h2>

        <div className="performance-modal-inputs-wrapper">
            {quizNames.map((quizName) => (
            <div key={quizName} className="performance-modal-input-group">
                <label className="performance-modal-label">{quizName}</label>
                <input
                type="number"
                min={0}
                max={100}
                value={tempScores[quizName] ?? ''}
                onChange={(e) => handleTempScoreChange(quizName, e.target.value)}
                className="performance-number-input"
                />
            </div>
            ))}
        </div>

        <div className="performance-modal-buttons">
            <button onClick={closeModal} className="performance-btn performance-btn-cancel">
            Cancel
            </button>
            <button onClick={saveScores} className="performance-btn performance-btn-primary">
            Save Changes
            </button>
        </div>
        </div>

        </div>
      )}
    </>
  );
};

export default ClassPerformancePage;
