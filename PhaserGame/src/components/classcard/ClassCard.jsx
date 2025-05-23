import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

function ClassCard({ title,userData, onDelete,uid}) {
    const colorList = ["rgb(255, 101, 101)"];
    const navigate = useNavigate();

    console.log(userData.name)
    console.log(title)
    console.log(uid)

    return (
        <div className="col-md-4" style={{ cursor: "pointer", position: "relative" }}>
            <div className="bg-white text-white shadow" style={{ wordBreak: 'break-word', borderRadius: "30px", position: 'relative' }}>
                
                {/* Trash button */}
                <button
                    onClick={onDelete}
                    style={{
                        position: "absolute",
                        top: "10px",
                        right: "15px",
                        background: "transparent",
                        border: "none",
                        color: "white",
                        fontSize: "18px"
                    }}
                >
                    <FontAwesomeIcon icon={faTrash} />
                </button>

                {/* Header */}
                <div className="d-flex flex-row justify-content-center align-items-center"
                    style={{
                        height: "100px",
                        whiteSpace: "nowrap",
                        backgroundColor: colorList[0],
                        borderTopLeftRadius: "30px",
                        borderTopRightRadius: "30px"
                    }}
                onClick={(e) => {
              e.stopPropagation(); // to prevent conflicts with the delete button
            navigate('/lessonPage', { state: { title,uid} });
        }}>
                    <div style={{
                        fontSize: "25px",
                        fontWeight: "bold",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        width: "90%"
                    }} onClick={(e) => {
              e.stopPropagation(); // to prevent conflicts with the delete button
            navigate('/lessonPage', { state: { title,uid} });
        }}>
                        {title}
                    </div>
                </div>

                {/* Body */}
                <div style={{ padding: "10px 20px" }} onClick={(e) => {
              e.stopPropagation(); // to prevent conflicts with the delete button
            navigate('/lessonPage', { state: { title,uid} });
        }}>
                    <div className='d-flex flex-row'>
                        <div style={{ color: "rgb(139, 39, 65)", whiteSpace: "nowrap", fontWeight: "bold", marginRight: "10px" }}>
                            Created By:
                        </div>
                        <div style={{ color: "black", whiteSpace: "nowrap" }}>You</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ClassCard;
