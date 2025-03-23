import {useState} from "react";
import {Box, Button} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import PageLayout from "../components/PageLayout.jsx";
import Header from "../components/Header.jsx";
import SearchFilter from "../components/SearchFilter.jsx";
import TaskList from "../components/TaskList.jsx";


const Tasks = ({userName, handleLogout}) => {
    const [tasks, setTasks] = useState([
        {
            title: "Complete React Project",
            description: "Finish UI components",
            status: "In Progress",
            dueDate: "2025-03-30"
        },
        {
            title: "Review PRs",
            description: "Provide feedback on pull requests",
            status: "Pending",
            dueDate: "2025-03-25"
        }
    ]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("");

    // Add Task (Placeholder function)
    const addTask = () => {
        const newTask = {title: "New Task", description: "Task details", status: "Pending", dueDate: "2025-04-01"};
        setTasks([...tasks, newTask]);
    };

    // Remove Task
    const removeTask = (index) => {
        setTasks(tasks.filter((_, i) => i !== index));
    };

    // Filter and Search Logic
    const filteredTasks = tasks.filter((task) => {
        return (
            (searchTerm === "" || task.title.toLowerCase().includes(searchTerm.toLowerCase())) &&
            (filterStatus === "" || task.status === filterStatus)
        );
    });

    return (
        <PageLayout>
            {/* Header */}
            <Header
                title="All Tasks"
                userName={userName}
                handleLogout={handleLogout}/>

            {/* Add New Task Button */}

            <Button
                variant="contained"
                color="primary"
                startIcon={<AddCircleIcon/>}
                onClick={addTask}
                sx={{width: "200px", marginBottom: "15px"}}>
                Add Task
            </Button>

            {/* Search and Filter */}
            <SearchFilter
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                filterStatus={filterStatus}
                setFilterStatus={setFilterStatus}/>

            {/* Task List */}
            <TaskList
                tasks={filteredTasks}
                removeTask={removeTask}/>
        </PageLayout>
    );
};

export default Tasks;
