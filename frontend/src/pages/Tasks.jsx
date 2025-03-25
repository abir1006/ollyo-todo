import {useEffect, useState} from "react";
import {Box, Button} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import PageLayout from "../components/PageLayout.jsx";
import Header from "../components/Header.jsx";
import SearchFilter from "../components/SearchFilter.jsx";
import TaskList from "../components/TaskList.jsx";
import {useGetTasksQuery} from "../redux/apis/Task/index.js";


const Tasks = () => {

    const [page, setPage] = useState(1); // State to manage the current page
    const perPage = 10;

    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("");

    useEffect(() => {
        setPage(1)
    }, [searchTerm, filterStatus]);

    const { data = [], isLoading, isError } = useGetTasksQuery({
        page:page,
        perPage:perPage,
        search: searchTerm,
        filterStatus
    });

    const filteredTasks = data?.data || []
    const totalPages = Math.ceil(data?.total / perPage) || 0

    const onSearch = query => {
        setSearchTerm(query)
    }

    return (
        <PageLayout>
            {/* Header */}
            <Header title="All Tasks" />

            {/* Add New Task Button */}

            <Button
                variant="contained"
                color="primary"
                startIcon={<AddCircleIcon/>}
                onClick=""
                sx={{width: "200px", marginBottom: "15px"}}>
                Add Task
            </Button>

            {/* Search and Filter */}
            <SearchFilter
                onSearch={onSearch}
                filterStatus={filterStatus}
                setFilterStatus={setFilterStatus}/>

            {/* Task List */}
            <TaskList
                tasks={filteredTasks}
                removeTask=""
                page={page}
                perPage={perPage}
                totalPages={totalPages}
                setPage={setPage}/>
        </PageLayout>
    );
};

export default Tasks;
