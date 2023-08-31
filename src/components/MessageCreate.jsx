// import React, { useState } from 'react';

// const MessageCreate = ({ API, fetchMessageData }) => {
//   const [inputValue, setInputValue] = useState('');

//   const handleCreate = async (e) => {
//     e.preventDefault();
//     const response = await fetch(`${API}/messages`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         text: inputValue,
//       }),
//     });

//     const info = await response.json();
//     setInputValue('');
//     fetchMessageData();
//   };

//   const handleChange = (e) => {
//     setInputValue(e.target.value);
//   };

//   return (
//     <form onSubmit={handleCreate}>
//       <input
//         onChange={handleChange}
//         type="text"
//         placeholder="What's your message?"
//         value={inputValue}
//       />
//       <button type="submit">Post Message</button>
//     </form>
//   );
// };

// export default MessageCreate;
