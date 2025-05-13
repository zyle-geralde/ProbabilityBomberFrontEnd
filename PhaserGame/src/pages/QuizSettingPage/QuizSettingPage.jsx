import React from 'react';
import './QuizSettingPage.css';
import HomeNavbar from '../../components/navbar/HomeNavbar';

export default function QuizSettingPage() {
  return (
    <>
      <div className="quiz-settings-navbar-container">
        <HomeNavbar />
      </div>

      <div className="quiz-settings-main-container">
        <div className='quiz-settings-title-container'>
          <h2>Question List Editor</h2>
          <div>
            <button className="quiz-settings-delete-quiz-button" > - Delete Quiz </button>
            <button className="quiz-settings-add-question-button" > + Add Question </button>
          </div>
        </div>
        <div className="quiz-table-scrollable">
            <table className="quiz-settings-table">
                <thead>
                <tr>
                    <th className="quiz-settings-th">Question</th>
                    <th className="quiz-settings-th">Answer</th>
                    <th className="quiz-settings-th">Action</th>
                </tr>
                </thead>
                <tbody>
                {[...Array(3)].map((_, index) => (
                    <tr key={index}>
                    <td className="quiz-settings-td">
                        <input
                        type="text"
                        className="quiz-settings-input"
                        placeholder="Enter question"
                        />
                    </td>
                    <td className="quiz-settings-td">
                        <input
                        type="text"
                        className="quiz-settings-input"
                        placeholder="Enter answer"
                        />
                    </td>
                    <td className="quiz-settings-td">
                        <button className="quiz-settings-edit-button">Edit</button>
                        <button className="quiz-settings-delete-row-button">Delete</button>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>

      </div>

      <div className="quiz-settings-footer"></div>
    </>
  );
}