import { useEffect, useState } from "react";
import "./User.css";

function User() {
    const url = "https://jsonplaceholder.typicode.com/users";

    const [data, Setdata] = useState([]);
    const [formdata, setFormdata] = useState({
        name: "",
        lastname: "",
        dob: "",
        gender: "",
        email: "",
        mobile: "",
        tenth: "",
        tenthyear: "",
        twelfth: "",
        twelfthyear: ""
    });

    const [editid, SetEditid] = useState(null);
    const [loading, SetLoading] = useState(false);
    const [error, SetError] = useState("");
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
            console.log("User Detail:", result);
            Setdata(result);
        }
        catch (error) {
            console.log("User Detail Error:", error);
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
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formdata)
            });
            if (!response.ok) {
                throw new Error("Failed to Update User");
            }
            const result = await response.json();
            console.log("PUT:", result);
            Setdata((previousData) =>
                previousData.map((user) =>
                    user.id === id ? { ...user, ...result } : user
                )
            );
            SetMessage("User Updated Successfully!");
            SetEditid(null);
            setFormdata({
                name: "",
                lastname: "",
                dob: "",
                gender: "",
                email: "",
                mobile: "",
                tenth: "",
                tenthyear: "",
                twelfth: "",
                twelfthyear: ""
            });
        }
        catch (error) {
            console.log("Edit User Error:", error);
            SetError(error.message);
        }
        finally {
            SetLoading(false);
        }
    }
    async function deleteuser(id) {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this user?"
        );
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
            SetMessage("User Deleted Successfully!");
        }
        catch (error) {
            console.log("Delete User Error:", error);
            SetError(error.message);
        }
        finally {
            SetLoading(false);
        }
    }
    function handleEdit(user) {

        SetEditid(user.id);
        setFormdata({
            name: user.name || "",
            lastname: user.lastname || "",
            dob: user.dob || "",
            gender: user.gender || "",
            email: user.email || "",
            mobile: user.mobile || "",
            tenth: user.tenth || "",
            tenthyear: user.tenthyear || "",
            twelfth: user.twelfth || "",
            twelfthyear: user.twelfthyear || ""
        });
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
            lastname: "",
            dob: "",
            gender: "",
            email: "",
            mobile: "",
            tenth: "",
            tenthyear: "",
            twelfth: "",
            twelfthyear: ""
        });
        SetMessage("");
        SetError("");
    }
    function handleChange(event) {
        const { id, value } = event.target;
        setFormdata({
            ...formdata,
            [id]: value
        });
    }
    useEffect(()=>{
        getuser();  
    },[]);
    return (
        <div className="user-page">
            {message && (
                <div className="success">
                    {message}
                </div>
            )}
            {error && (
                <div className="error">
                    {error}
                </div>
            )}
            {loading && (
                <div className="loading">
                    Loading....
                </div>
            )}
            {editid && (
                <div className="edit-form">
                    <h2>Update User</h2>
                    <input
                        type="text"
                        id="name"
                        placeholder="Enter Name"
                        value={formdata.name}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        id="username"
                        placeholder="Enter Username"
                        value={formdata.username}
                        onChange={handleChange}
                    />
                    <input
                        type="email"
                        id="email"
                        placeholder="Enter Email"
                        value={formdata.email}
                        onChange={handleChange}
                    />
                    <button className="put-button" onClick={() => edituser(editid)}>PUT</button>
                    <button className="cancel-button" onClick={handlecancel}>Cancel</button>
                </div>
            )}
            {/* <button className="get-button" onClick={getuser}>GET</button> */}
            <div className="posts-container">
                {data.map((users) => (
                    <div className="post-card" key={users.id}>
                        <div className="post-id">
                            User Id: {users.id}
                        </div>
                        <h3>{users.name}</h3>
                        <p>Username: {users.username}</p>
                        <p>Email Id: {users.email}</p>
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