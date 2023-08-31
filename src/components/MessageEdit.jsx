// import React, { useState } from 'react';
// import IconContainer from './IconContainer';

// const MessageEdit = ({ API, fetchMessageData, message }) => {
//   const [editedText, setEditedText] = useState(message.text);
//   const [isEditing, setIsEditing] = useState(false);

//   const handleEditChange = (e) => {
//     setEditedText(e.target.value);
//   };

//   const handleSaveClick = async () => {
//     try {
//       const response = await fetch(`${API}/messages/${message.id}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           text: editedText,
//         }),
//       });

//       const info = await response.json();
//       if (info.success) {
//         fetchMessageData();
//         setIsEditing(false);
//       }
//     } catch (error) {
//       console.error('Error editing message:', error);
//     }
//   };

//   const handleCancelClick = () => {
//     setIsEditing(false);
//   };

//   const toggleEdit = () => {
//     setIsEditing(!isEditing);
//   };

//   return (
//     <div className="message-container">
//       <div className="flex-container">
//         {isEditing ? (
//           <>
//             <input
//               type="text"
//               value={editedText}
//               onChange={handleEditChange}
//               readOnly={!isEditing}
//             />
//             <button onClick={handleSaveClick} className="button-emoji">
//               Save
//             </button>
//             <button onClick={handleCancelClick} className="button-emoji">
//               Cancel
//             </button>
//           </>
//         ) : (
//           <>
//             <p>{message.text}</p>
//             <button className="button-emoji" onClick={toggleEdit}>
//               ✏️
//             </button>
//           </>
//         )}
//       </div>
//       <IconContainer message={message} />
//     </div>
//   );
// };

// export default MessageEdit;
