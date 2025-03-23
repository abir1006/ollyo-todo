import { List, ListItem, ListItemText, Typography, IconButton, Box } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const TaskList = ({ tasks, removeTask }) => {
    return (
        <List>
            {tasks.length > 0 ? (
                tasks.map((task, index) => (
                    <ListItem key={index} divider alignItems="flex-start">
                        <Box width="100%" display="flex" justifyContent="space-between" alignItems="center">
                            <ListItemText
                                primary={<Typography variant="h6" fontWeight="bold">{task.title}</Typography>}
                                secondary={
                                    <>
                                        <Typography variant="body2" color="textSecondary">
                                            {task.description}
                                        </Typography>
                                        <Typography variant="body2" color={task.status === "Completed" ? "green" : "orange"}>
                                            Status: {task.status}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            Due: {task.dueDate}
                                        </Typography>
                                    </>
                                }
                            />
                            <IconButton edge="end" onClick={() => removeTask(index)} color="error">
                                <DeleteIcon />
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
    );
};

export default TaskList;
