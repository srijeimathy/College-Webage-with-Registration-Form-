
// import { useState, useEffect } from "react";
// import { useLocation } from "react-router-dom";
// import "./User.css";

// function TRY() {
//     const url = "https://jsonplaceholder.typicode.com/users";

//     // All students: registration form + API users
//     const [students, SetStudents] = useState([]);

//     const [loading, SetLoading] = useState(false);
//     const [error, SetError] = useState("");
//     const [message, SetMessage] = useState("");

//     // Edit form data
//     const [formdata, setFormdata] = useState({
//         name: "",
//         username: "",
//         email: "",
//         dob:"",
//         mobile:""
//     });

//     const [editid, SetEditid] = useState(null);
//     const [editType, SetEditType] = useState("");

//     // Receive registration data
//     const location = useLocation();
//     const newStudent = location.state?.student;

//     // Add the student submitted from Registration page
//     useEffect(() => {
//         if (newStudent) {
//             const studentWithId = {
//                 ...newStudent,
//                 id: `reg-${Date.now()}`,
//                 source: "registration"
//             };

//             SetStudents((previousStudents) => [
//                 ...previousStudents,
//                 studentWithId
//             ]);

//             console.log("Registered Student:", studentWithId);
//         }
//     }, [newStudent]);

//     // GET: Fetch API users and combine them with registered students
//     async function getStudents() {
//         try {
//             SetLoading(true);
//             SetError("");
//             SetMessage("");

//             const response = await fetch(url);

//             if (!response.ok) {
//                 throw new Error("Failed to fetch students");
//             }

//             const result = await response.json();

//             SetStudents((previousStudents) => {
//                 // Find API users already added to the list
//                 const existingApiIds = new Set(
//                     previousStudents
//                         .filter((student) => student.source === "api")
//                         .map((student) => student.id)
//                 );

//                 // Add only API users that are not already present
//                 const newApiStudents = result
//                     .filter((user) => !existingApiIds.has(user.id))
//                     .map((user) => ({
//                         ...user,
//                         source: "api"
//                     }));

//                 return [...previousStudents, ...newApiStudents];
//             });

//             console.log("GET Students:", result);
//             SetMessage("Students fetched successfully!");
//         } catch (error) {
//             console.log("GET Error:", error);
//             SetError(error.message);
//         } finally {
//             SetLoading(false);
//         }
//     }

//     // EDIT: Open the edit form
//     function handleEdit(student) {
//         SetEditid(student.id);
//         SetEditType(student.source);

//         setFormdata({
//             name: student.name || "",
//             username: student.username || "",
//             email: student.email || "",
//             dob:student.dob|| "",
//             mobile:student.mobile||""
//         });

//         SetError("");
//         SetMessage("");

//         window.scrollTo({
//             top: 0,
//             behavior: "smooth"
//         });
//     }

//     // Handle changes in the edit form
//     function handleChange(event) {
//         const { name, value } = event.target;

//         setFormdata((previousData) => ({
//             ...previousData,
//             [name]: value
//         }));

//         console.log(`${name}:`, value);
//     }

//     // UPDATE: Update a registered student or an API user
//     async function handleUpdate(event) {
//         event.preventDefault();

//         if (!formdata.name.trim() || !formdata.email.trim()) {
//             SetError("Name and email are required.");
//             return;
//         }

//         // Update a student submitted from the registration form
//         if (editType === "registration") {
//             SetStudents((previousStudents) =>
//                 previousStudents.map((student) =>
//                     student.id === editid
//                         ? {
//                             ...student,
//                             name: formdata.name,
//                             email: formdata.email,
//                             dob:formdata.dob,
//                             mobile:formdata.mobile
//                         }
//                         : student
//                 )
//             );

//             SetMessage("Registered student updated successfully!");
//             SetError("");
//             handleCancel();
//             return;
//         }

//         // Update an API user using PUT
//         try {
//             SetLoading(true);
//             SetError("");
//             SetMessage("");

//             const response = await fetch(`${url}/${editid}`, {
//                 method: "PUT",
//                 headers: {
//                     "Content-Type": "application/json"
//                 },
//                 body: JSON.stringify({
//                     name: formdata.name,
//                     username: formdata.username,
//                     email: formdata.email,
//                     dob:formdata.dob
//                 })
//             });

//             if (!response.ok) {
//                 throw new Error("Failed to update user");
//             }

//             const result = await response.json();

//             SetStudents((previousStudents) =>
//                 previousStudents.map((student) =>
//                     student.id === editid && student.source === "api"
//                         ? { ...student, ...result }
//                         : student
//                 )
//             );

//             console.log("PUT Updated User:", result);
//             SetMessage("User updated successfully!");

//             handleCancel();
//         } catch (error) {
//             console.log("PUT Error:", error);
//             SetError(error.message);
//         } finally {
//             SetLoading(false);
//         }
//     }

//     // CANCEL: Close the edit form
//     function handleCancel() {
//         SetEditid(null);
//         SetEditType("");

//         setFormdata({
//             name: "",
//             username: "",
//             email: "",
//             dob:""
//         });
//     }

//     // DELETE: Delete a registered student from the current list
//     function deleteStudent(id) {
//         const confirmDelete = window.confirm(
//             "Are you sure you want to delete this student?"
//         );

//         if (!confirmDelete) {
//             return;
//         }

//         SetStudents((previousStudents) =>
//             previousStudents.filter((student) => student.id !== id)
//         );

//         if (editid === id) {
//             handleCancel();
//         }

//         SetError("");
//         SetMessage("Registered student deleted successfully!");
//     }

//     // DELETE: Delete an API user
//     async function deleteUser(id) {
//         const confirmDelete = window.confirm(
//             "Are you sure you want to delete this user?"
//         );

//         if (!confirmDelete) {
//             return;
//         }

//         try {
//             SetLoading(true);
//             SetError("");
//             SetMessage("");

//             const response = await fetch(`${url}/${id}`, {
//                 method: "DELETE"
//             });

//             if (!response.ok) {
//                 throw new Error("Failed to delete user");
//             }

//             SetStudents((previousStudents) =>
//                 previousStudents.filter(
//                     (student) =>
//                         !(student.id === id && student.source === "api")
//                 )
//             );

//             if (editid === id) {
//                 handleCancel();
//             }

//             console.log("DELETE User ID:", id);
//             SetMessage("User deleted successfully!");
//         } catch (error) {
//             console.log("DELETE Error:", error);
//             SetError(error.message);
//         } finally {
//             SetLoading(false);
//         }
//     }

//     return (
//         <div className="user-page">

//             <h1>Student Management</h1>

//             {/* SUCCESS MESSAGE */}
//             {message && (
//                 <div className="success">
//                     {message}
//                 </div>
//             )}

//             {/* ERROR MESSAGE */}
//             {error && (
//                 <div className="error">
//                     {error}
//                 </div>
//             )}

//             {/* LOADING MESSAGE */}
//             {loading && (
//                 <div className="loading">
//                     Loading...
//                 </div>
//             )}

//             {/* EDIT FORM */}
//             {editid !== null && (
//                 <form
//                     className="edit-form"
//                     onSubmit={handleUpdate}
//                 >
//                     <h2>
//                         Edit {editType === "api" ? "User" : "Student"}
//                     </h2>

//                     <label htmlFor="name">Name</label>
//                     <input
//                         id="name"
//                         type="text"
//                         name="name"
//                         value={formdata.name}
//                         onChange={handleChange}
//                         required
//                     />

//                     {editType === "api" && (
//                         <>
//                             <label htmlFor="username">Username</label>
//                             <input
//                                 id="username"
//                                 type="text"
//                                 name="username"
//                                 value={formdata.username}
//                                 onChange={handleChange}
//                             />
//                         </>
//                     )}

//                     <label htmlFor="email">Email</label>
//                     <input
//                         id="email"
//                         type="email"
//                         name="email"
//                         value={formdata.email}
//                         onChange={handleChange}
//                         required
//                     />

//                     <label htmlFor="dob">Date of Birth</label>
//                     <input
//                         id="dob"
//                         type="date"
//                         name="dob"
//                         value={formdata.dob}
//                         onChange={handleChange}
//                         required
//                     />
                    
//                     <div className="card-button">
//                         <button
//                             type="submit"
//                             className="edit-button"
//                             disabled={loading}
//                         >
//                             UPDATE
//                         </button>

//                         <button
//                             type="button"
//                             className="delete-button"
//                             onClick={handleCancel}
//                         >
//                             CANCEL
//                         </button>
//                     </div>
//                 </form>
//             )}

//             {/* ALL STUDENTS IN ONE SECTION */}
//             <h2>Students</h2>

//             <button
//                 className="get-button"
//                 onClick={getStudents}
//                 disabled={loading}
//             >
//                 GET STUDENTS
//             </button>

//             <div className="posts-container">

//                 {students.length === 0 ? (
//                     <p>
//                         No students available. Submit the registration
//                         form or click GET STUDENTS.
//                     </p>
//                 ) : (
//                     students.map((student) => (
//                         <div
//                             className="post-card"
//                             key={`${student.source}-${student.id}`}
//                         >
//                             <div className="post-id">
//                                 Student ID: {student.id}
//                             </div>

//                             <h3>
//                                 {student.name} {student.lastname || ""}
//                             </h3>

//                             {/* API USER DETAILS */}
//                             {student.source === "api" ? (
//                                 <>
//                                     <p>
//                                         Username: {student.username}
//                                     </p>

//                                     <p>
//                                         Email ID: {student.email}
//                                     </p>
//                                 </>
//                             ) : (
//                                 /* REGISTRATION FORM DETAILS */
//                                 <>
//                                     <p>
//                                         Date of Birth: {student.dob}
//                                     </p>

//                                     <p>
//                                         Gender: {student.gender}
//                                     </p>

//                                     <p>
//                                         Email ID: {student.email}
//                                     </p>

//                                     <p>
//                                         Mobile Number: {student.mobile}
//                                     </p>

//                                     <p>
//                                         10th Percentage: {student.tenth}%
//                                     </p>

//                                     <p>
//                                         10th Passing Year: {student.tenthyear}
//                                     </p>

//                                     <p>
//                                         12th Percentage: {student.twelfth}%
//                                     </p>

//                                     <p>
//                                         12th Passing Year: {student.twelfthyear}
//                                     </p>

//                                     <p>
//                                         Department: {student.department}
//                                     </p>
//                                 </>
//                             )}

//                             <p>
//                                 Source:{" "}
//                                 {student.source === "api"
//                                     ? "API"
//                                     : "Registration Form"}
//                             </p>

//                             <div className="card-button">
//                                 <button
//                                     className="edit-button"
//                                     onClick={() => handleEdit(student)}
//                                 >
//                                     EDIT
//                                 </button>

//                                 <button
//                                     className="delete-button"
//                                     onClick={() => {
//                                         if (student.source === "api") {
//                                             deleteUser(student.id);
//                                         } else {
//                                             deleteStudent(student.id);
//                                         }
//                                     }}
//                                 >
//                                     DELETE
//                                 </button>
//                             </div>
//                         </div>
//                     ))
//                 )}

//             </div>
//         </div>
//     );
// }

// export default TRY;
