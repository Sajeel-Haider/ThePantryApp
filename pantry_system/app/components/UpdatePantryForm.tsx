import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";

interface UpdatePantryFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (newTitle: string) => void;
  currentTitle: string;
}

const UpdatePantryForm: React.FC<UpdatePantryFormProps> = ({
  open,
  onClose,
  onSubmit,
  currentTitle,
}) => {
  const [title, setTitle] = useState(currentTitle);

  const handleSubmit = () => {
    onSubmit(title);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Update Pantry Item</DialogTitle>
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
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdatePantryForm;
