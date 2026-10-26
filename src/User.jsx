import { useState } from "react";
import "./User.css";

function User() {
    const url = "https://jsonplaceholder.typicode.com/users";
    const [data, Setdata] = useState([]);
    const [loading, SetLoading] = useState(false);
    const [error, SetError] = useState([]);
    const [message, SetMessage] = useState("");
    async function getuser() {
        try {
            SetLoading(true);
            SetError("");
            SetMessage("");
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("Failed to get User");
            }
            const result = await response.json();
            console.log("GET:", result);
            Setdata(result);
        }
        catch (error) {
            console.log("GET Error:", error);
            SetError(error.message);

        }
        finally {
            SetLoading(false);
        }
    }
    async function deleteuser(id) {
        const confirmDelete = window.confirm("Are you sure you want to delete this user?");
        if (!confirmDelete) {
            return;
        }
        try {
            SetLoading(true);
            SetError("");
            SetMessage("");
            const response = await fetch(`${url}/${id}`, {
                method: "DELETE"
            });
            if (!response.ok) {
                throw new Error("Failed to Delete User");
            }
            console.log("DELETE:", id);
            console.log("DELETE Response: User deleted successfully");
            Setdata((previousData) =>
                previousData.filter((user) => user.id !== id)
            );
            SetMessage("User Deleted Sucessfully!");
        }
        catch (error) {
            console.log("DELETE Error:", error);
            SetError(error.message);
        }
        finally {
            SetLoading(false);
        }
    }
    async function edituser(id) {
        try {
            SetLoading(true);
            SetError("");
            SetMessage("");
            const response = await fetch(`${url}/${id}`, {
                method: "PUT",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(formdata)
            });
            if (!response.ok) {
                throw new Error("Failed to Update User");
            }
            const result = await response.json();
            console.log("PUT:", result);
            Setdata((previousData) =>
                previousData.map((user) => user.id === id ? {...user,...result} : user)
            );
            SetMessage(console.log("User Updated Sucessfully!"));
            SetEditid(null);
            setFormdata({
                name:"",
                username:"",
                email:""
            });
        }
        catch (error) {
            console.log("PUT Error:", error);
            SetError(error.message);
        }
        finally {
            SetLoading(false);
        }
    }
    function handleEdit(user) {
        SetEditid(user.id);
        setFormdata({
            name: user.name,
            username: user.username,
            email: user.email
        });
        SetShowPost(true);
        SetShowGet(false);
        SetMessage("");
        SetError("");
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }
    function handlecancel() {
        SetEditid(null);
        setFormdata({
            name: "",
            username: "",
            email: ""
        });
    }
    return (

        <div className="user-page">
            {message && (
                <div className="success">{message}</div>
            )}
            {error && (
                <div className="error">{error}</div>
            )}
            {loading && (
                <div className="loading">Loading....</div>
            )}
            <h2>Registered Student</h2>
            <div className="post-container">
                {students.map((student) => (
                    <div className="post-card" key={student.id}>
                        <div className="post-id">
                            Student Id:{student.id}
                        </div>
                        <h3>{student.name} {student.lastname}</h3>
                        <p>Date of Birth: {student.dob}</p>
                        <p>Gender: {student.gender}</p>
                        <p>Email Id: {student.email}</p>
                        <p>Mobile Number: {student.mobile}</p>
                        <p>10th%: {student.tenth}%</p>
                        <p>10th Year of Passing: {student.tenthyear}</p>
                        <p>12th%: {student.twelfth}%</p>
                        <p>12th Year of Passing: {student.twelfthyear}</p>
                        <div className="card-button">
                            <button className="edit-button" onClick={() => handleEdit(student)}>EDIT</button>
                            <button className="delete-button" onClick={() => deletestudent(student.id)}>DELETE</button>
                        </div>
                    </div>
                ))}
            </div>
            <button className="get-button" onClick={getuser}>GET</button>
            <div className="posts-container">
                {data.map((users) => (
                    <div className="post-card" key={users.id}>
                        <div className="post-id">User Id:{users.id}</div>
                        <h3>{users.name}</h3>
                        <p>Username:{users.username}</p>
                        <p>Email Id:{users.email}</p>
                        <div className="card-button">
                            <button className="edit-button" onClick={() => handleEdit(users)}>EDIT</button>
                            <button className="delete-button" onClick={() => deleteuser(users.id)}>DELETE</button>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
}
export default User;