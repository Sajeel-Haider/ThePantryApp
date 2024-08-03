import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

interface PantryFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (title: string) => void;
}

const PantryForm: React.FC<PantryFormProps> = ({ open, onClose, onSubmit }) => {
  const [title, setTitle] = useState("");

  const handleSubmit = () => {
    onSubmit(title);
    setTitle("");
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Pantry Item</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Title"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>
          <Typography variant="body1">Cancel</Typography>
        </Button>
        <Button onClick={handleSubmit} color="primary">
          <Typography variant="body1">Submit</Typography>
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PantryForm;
