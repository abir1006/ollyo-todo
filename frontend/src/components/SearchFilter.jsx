import {Box, TextField, MenuItem} from "@mui/material";
import BasicDatePicker from "./BasicDatePicker.jsx";

const SearchFilter = ({searchTerm, setSearchTerm, filterStatus, setFilterStatus}) => {
    return (
        <Box display="flex" gap={2} mb={2}>
            {/* Search Field */}
            <TextField
                label="Search task by name, description ..."
                variant="outlined"
                sx={{flex: "2 1 60%"}}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            {/* Filter Dropdown */}
            <TextField
                select
                label="Filter Status"
                variant="outlined"
                sx={{flex: "1 1 20%"}}
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
            >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="Pending">Pending</MenuItem>
                <MenuItem value="In Progress">In Progress</MenuItem>
                <MenuItem value="Completed">Completed</MenuItem>
            </TextField>

            <BasicDatePicker
                labelText="Filter by due date"/>
        </Box>
    );
};

export default SearchFilter;
