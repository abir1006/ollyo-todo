import {List, ListItem, ListItemText, Typography, IconButton, Box} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import PaginationComponent from "./PaginationComponent.jsx";
import {useState} from "react";

const TaskList = ({tasks, removeTask, page, perPage, totalPages, setPage}) => {
    return (
        <div>
            <List>
                {tasks.length > 0 ? (
                    tasks.map((task, index) => (
                        <ListItem key={index} divider alignItems="flex-start">
                            <Box width="100%" display="flex" justifyContent="space-between" alignItems="center">
                                <ListItemText
                                    primary={<Typography variant="h6" fontWeight="bold">{task.name}</Typography>}
                                    secondary={
                                        <>
                                            <Typography variant="body2" color="textSecondary">
                                                {task.description}
                                            </Typography>
                                            <Typography variant="body2"
                                                        color={task.status === "Done" ? "green" : "orange"}>
                                                Status: {task.status}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                Due: {task.due_date}
                                            </Typography>
                                        </>
                                    }
                                />
                                <IconButton edge="end" onClick={() => removeTask(task.id)} color="error">
                                    <DeleteIcon/>
                                </IconButton>
                            </Box>
                        </ListItem>
                    ))
                ) : (
                    <Typography variant="body2" color="textSecondary">
                        No tasks available.
                    </Typography>
                )}
            </List>
            {/* Pagination Component */}
            {totalPages > 1 && <PaginationComponent
                page={page}
                setPage={setPage}
                totalPages={totalPages}/>}
        </div>
    );
};

export default TaskList;
