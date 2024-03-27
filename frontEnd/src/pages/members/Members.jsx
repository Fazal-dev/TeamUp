import { Paper, Box, Button } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import AddMemberModal from "../../Modals/AddMemberModal";
const members = [
  {
    id: 1,
    username: "john_doe",
    email: "john.doe@example.com",
  },
  {
    id: 2,
    username: "alice_smith",
    email: "alice.smith@example.com",
  },
  {
    id: 3,
    username: "bob_johnson",
    email: "bob.johnson@example.com",
  },
  {
    id: 4,
    username: "emily_brown",
    email: "emily.brown@example.com",
  },
  {
    id: 5,
    username: "michael_wilson",
    email: "michael.wilson@example.com",
  },
  {
    id: 6,
    username: "sophia_lee",
    email: "sophia.lee@example.com",
  },
  {
    id: 7,
    username: "david_martinez",
    email: "david.martinez@example.com",
  },
  {
    id: 8,
    username: "olivia_taylor",
    email: "olivia.taylor@example.com",
  },
  {
    id: 9,
    username: "william_anderson",
    email: "william.anderson@example.com",
  },
  {
    id: 10,
    username: "emma_garcia",
    email: "emma.garcia@example.com",
  },
];

const Members = () => {
  return (
    <div>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 5,
          mt: 0,
        }}
      >
        <Box></Box>
        <Box>
          <AddMemberModal />
        </Box>
      </Box>
      <Paper elevation={2} sx={{ p: 1 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {members.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3}>
                  <Typography variant="body1" align="center">
                    No members have been added yet. Click the button above to
                    add a new member.
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              members.map((user) => (
                <TableRow
                  key={user.id}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>

                  <TableCell>
                    <Button>Remove</Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
};

export default Members;
