import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Delete, Edit } from "@mui/icons-material";
import "./index.css";
import Modal from "./Modal";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type()": {
    backgroundColor: "#eaa1f7",
  },
}));

let idCounter = 1;

const initialRows = [];

const App = () => {
  const [rows, setRows] = useState(initialRows);
  const [editingRowId, setEditingRowId] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts?_limit=20", {})
      .then((response) => response.json())
      .then((data) => setRows(data));
  }, [editingRowId, rows]);

  const handleRowClick = (row) => {
    console.log(row);

    setSelectedRow(row);
    setIsModalOpen(true);
  };

  const handleDelete = async (id, e) => {
    e.stopPropagation(); // prevent event from bubbling up

    await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: "DELETE",
    });
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleAdd = () => {
    setRows([...rows, { id: idCounter++, title: "", body: "" }]);
  };

  const handleEdit = (id,e) => {
    e.stopPropagation(); // prevent event from bubbling up

    setEditingRowId(id);
  };

  const handleSave = async (id,e) => {
    e.stopPropagation(); // prevent event from bubbling up
    const postEdit = rows.find((i) => i.id === id);
    await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: "PATCH",
      body: JSON.stringify(postEdit),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    setEditingRowId(null);
  };

  const handleCancel = (e) => {
    e.stopPropagation()
    if (editingRowId && !editingRowId.id) {
      // remove new row from the list if it's not saved yet
      setRows(rows.filter((row) => row.id !== editingRowId.id));
    }
    setEditingRowId(null);
  };

  const handleChange = (id, field, value) => {
    setRows(
      rows.map((row) => {
        if (row.id === id) {
          return { ...row, [field]: value };
        } else {
          return row;
        }
      })
    );
  };
  return (
    <div classtitle="container">
      <TableContainer
        component={Paper}
        sx={{ minWidth: "calc(100vh )", overflowX: "auto" }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow sx={{ background: "#eaa1f7" }}>
              <TableCell align="left">#</TableCell>
              <TableCell align="center">title</TableCell>
              <TableCell align="center">body</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{ cursor: "pointer" }}>
            {rows.map((row, index) => (
              <StyledTableRow onClick={() => handleRowClick(row)} key={row.id}>
                <TableCell sx={{ width: "15%" }} align="left">
                  {index + 1}
                </TableCell>

                <TableCell
                  sx={{ width: "25%" }}
                  align="center"
                  component="th"
                  scope="row"
                >
                  {editingRowId === row.id ? (
                    <input
                      type="text"
                      value={row.title}
                      onChange={(e) =>
                        handleChange(row.id, "title", e.target.value)
                      }
                    />
                  ) : (
                    row.title
                  )}
                </TableCell>

                <TableCell sx={{ width: "25%" }} align="center">
                  {editingRowId === row.id ? (
                    <textarea
                      type="text"
                      value={row.body}
                      style={{ padding: "25px 10px" }}
                      onChange={(e) =>
                        handleChange(row.id, "body", e.target.value)
                      }
                    />
                  ) : (
                    row.body
                  )}
                </TableCell>
                <TableCell sx={{ width: "35%" }} align="center">
                  {editingRowId === row.id ? (
                    <>
                      <Button
                        sx={{ margin: "0 5px" }}
                        variant="contained"
                        color="primary"
                        onClick={(e) => handleSave(row.id,e)}
                      >
                        Save
                      </Button>
                      <Button
                        sx={{ margin: "0 5px" }}
                        variant="contained"
                        color="error"
                        onClick={(e) => handleCancel(e)}
                      >
                        Cancel
                      </Button>
                      <Button
                        sx={{ margin: "0 5px" }}
                        variant="contained"
                        color="primary"
                        startIcon={<Delete />}
                        onClick={(e) => handleDelete(row.id,e)}
                      >
                        Delete
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        sx={{ margin: "0 4px" }}
                        variant="contained"
                        color="primary"
                        startIcon={<Edit />}
                        onClick={(e) => handleEdit(row.id,e)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        startIcon={<Delete />}
                        onClick={(e) => handleDelete(row.id,e)}
                      >
                        Delete
                      </Button>
                    </>
                  )}
                </TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        sx={{ marginTop: "10px" }}
        variant="contained"
        color="primary"
        onClick={handleAdd}
      >
        Add
      </Button>
      {isModalOpen && (
        <Modal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          selectedRow={selectedRow}
        />
      )}
    </div>
  );
};

export default App;
