import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const EditProjectTask = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Button onClick={() => navigate(`/projectTask`)}>back</Button>
    </div>
  );
};

export default EditProjectTask;
