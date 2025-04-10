import {useNavigate} from "react-router-dom";
import {useState} from "react";
import Header from "../components/Header.jsx";
import {Button, MenuItem, TextField} from "@mui/material";
import PageLayout from "../components/PageLayout.jsx";

const CreateTask = () => {
    const [task, setTask] = useState({
        name: "",
        description: "",
        status: "pending",
        due_date: "",
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setTask({ ...task, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${API_URL}/tasks`, task);
            navigate("/tasks"); // Redirect to task list after creation
        } catch (error) {
            console.error("Error creating task", error);
        }
    };

    return (
        <PageLayout>
            <Header title="Create New Task" />

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px", maxWidth: "400px", margin: "0 auto" }}>
                <TextField label="Task Name" name="name" value={task.name} onChange={handleChange} required />
                <TextField label="Description" name="description" value={task.description} onChange={handleChange} required multiline rows={3} />
                <TextField label="Due Date" type="date" name="due_date" value={task.due_date} onChange={handleChange} required InputLabelProps={{ shrink: true }} />
                <TextField select label="Status" name="status" value={task.status} onChange={handleChange}>
                    <MenuItem value="pending">Pending</MenuItem>
                    <MenuItem value="in-progress">In Progress</MenuItem>
                    <MenuItem value="completed">Completed</MenuItem>
                </TextField>
                <Button type="submit" variant="contained" color="primary">Submit</Button>
            </form>
        </PageLayout>
    );
}
export default CreateTask;
