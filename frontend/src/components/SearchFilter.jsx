import {Box, TextField, MenuItem, InputAdornment, IconButton} from "@mui/material";
import BasicDatePicker from "./BasicDatePicker.jsx";
import {useCallback, useState} from "react";
import {debounce} from "lodash";
import { Clear } from '@mui/icons-material';

const SearchFilter = ({onSearch, filterStatus, setFilterStatus}) => {

    const [searchTerm, setSearchTerm] = useState("");

    // Debounced function (delays the search call by 500ms)
    const debouncedSearch = useCallback(
        debounce((query) => {
            onSearch(query); // Calls the parent function
        }, 500),
        [onSearch]
    );

    // Handle input change
    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        debouncedSearch(value); // Call debounced function
    };

    // Function to clear the search input
    const handleClearSearch = () => {
        setSearchTerm("");
        debouncedSearch("");
    };

    return (
        <Box display="flex" gap={2} mb={2}>
            {/*Search Field*/}
            <TextField
                label="Search task by name..."
                variant="outlined"
                sx={{flex: "2 1 60%"}}
                value={searchTerm}
                onChange={handleSearchChange}
                slotProps={{
                    input: {
                        endAdornment: searchTerm && (
                            <InputAdornment position="end">
                                <IconButton onClick={handleClearSearch} edge="end">
                                    <Clear />
                                </IconButton>
                            </InputAdornment>
                        ),
                    },
                }}
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
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="To Do">To Do</MenuItem>
                <MenuItem value="In Progress">In Progress</MenuItem>
                <MenuItem value="Done">Done</MenuItem>
            </TextField>

            <BasicDatePicker
                labelText="Filter by due date"/>
        </Box>
    );
};

export default SearchFilter;
