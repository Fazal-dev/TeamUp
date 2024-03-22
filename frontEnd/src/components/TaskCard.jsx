import { Card } from "@mui/material";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import React from "react";

const TaskCard = ({ task }) => {
  return (
    <>
      <Card sx={{ maxWidth: 340, p: 1 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {task.title}
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {task.description}
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {task.due_date}
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {task.status}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" variant="contained">
            delete edit
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export default TaskCard;
