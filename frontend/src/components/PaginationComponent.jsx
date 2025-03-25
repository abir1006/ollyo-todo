import React from "react";
import { Pagination } from "@mui/material";

const PaginationComponent = ({ page, setPage, totalPages }) => {
    const handlePageChange = (event, newPage) => {
        setPage(newPage); // Update page number
    };

    return (
        <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            color="primary"
            showFirstButton
            showLastButton
        />
    );
};

export default PaginationComponent;
