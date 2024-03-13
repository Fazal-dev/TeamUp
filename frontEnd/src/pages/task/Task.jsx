import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import AddIcon from "@mui/icons-material/Add";
import { Box, Button, Container, Typography } from "@mui/material";

const Task = () => {
  return (
    <div>
      <Container sx={{ width: "100vw" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 10,
            mt: 5,
          }}
        >
          <Box>
            <Typography variant="h5">Tasks</Typography>
          </Box>
          <Box>
            <Button variant="contained" startIcon={<AddIcon />}>
              Add
            </Button>
          </Box>
        </Box>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Task Tittle</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Assignee</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>Data structure</TableCell>
                <TableCell>we need to finished modt of the part</TableCell>
                <TableCell>2024/3/4</TableCell>
                <TableCell>fazal</TableCell>
                <TableCell>progress</TableCell>
              </TableRow>
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>Data structure</TableCell>
                <TableCell>we need to finished modt of the part</TableCell>
                <TableCell>2024/3/4</TableCell>
                <TableCell>fazal</TableCell>
                <TableCell>progress</TableCell>
              </TableRow>
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>Data structure</TableCell>
                <TableCell>we need to finished modt of the part</TableCell>
                <TableCell>2024/3/4</TableCell>
                <TableCell>fazal</TableCell>
                <TableCell>progress</TableCell>
              </TableRow>
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>Data structure</TableCell>
                <TableCell>we need to finished modt of the part</TableCell>
                <TableCell>2024/3/4</TableCell>
                <TableCell>fazal</TableCell>
                <TableCell>progress</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
};

export default Task;
