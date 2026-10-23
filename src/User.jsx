function User() {
    const url = "https://jsonplaceholder.typicode.com/users";
    const [data, Setdata] = useState([]);
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
    return (
        <>
            <button className="get-button" onClick={getuser}>GET</button>
            <div className="posts-container">
                {data.map((users) => (
                    <div className="post-card" key={users.id}>
                        <div className="post-id">User Id:{users.id}</div>
                        <h3>{users.name}</h3>
                        <p>Username:{users.username}</p>
                        <p>Email Id:{users.email}</p>
                    </div>
                ))}
            </div>
        </>

    );
}
export default User;