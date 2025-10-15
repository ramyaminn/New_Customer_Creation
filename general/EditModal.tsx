// import React from 'react';

// interface EditModalProps {
//   show: boolean;
//   onClose: () => void;
//   editData: { firstname: string; lastname: string };
//   setEditData: React.Dispatch<React.SetStateAction<{ firstname: string; lastname: string }>>;
//   onSave: () => void;
// }

// const EditModal: React.FC<EditModalProps> = ({ show, onClose, editData, setEditData, onSave }) => {
//   if (!show) return null;

//   return (
//     <div className="modal">
//       <h2>Edit Information</h2>
//       <input
//         type="text"
//         value={editData.firstname}
//         onChange={(e) => setEditData({ ...editData, firstname: e.target.value })}
//       />
//       <input
//         type="text"
//         value={editData.lastname}
//         onChange={(e) => setEditData({ ...editData, lastname: e.target.value })}
//       />
//       <button onClick={onSave}>Save</button>
//       <button onClick={onClose}>Cancel</button>
//     </div>
//   );
// };

// export default EditModal;