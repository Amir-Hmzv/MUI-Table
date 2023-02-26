import React from "react";
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
const Modal = ({ isModalOpen, setIsModalOpen,selectedRow }) => {
  return (
    <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)}>
      <DialogTitle>{selectedRow && selectedRow.title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{selectedRow && selectedRow.body}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setIsModalOpen(false)}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};
export default Modal;
