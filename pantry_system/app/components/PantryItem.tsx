import React from "react";
import { Card, CardContent, Typography, IconButton, Box } from "@mui/material";
import { FaTrashAlt, FaPlus, FaMinus, FaEdit } from "react-icons/fa";

interface PantryItemProps {
  title: string;
  quantity: number;
  onDelete: () => void;
  onIncrement: () => void;
  onDecrement: () => void;
  onUpdate: () => void;
}

const PantryItem: React.FC<PantryItemProps> = ({
  title,
  quantity,
  onDelete,
  onIncrement,
  onDecrement,
  onUpdate,
}) => {
  return (
    <Card variant="outlined" sx={{ marginBottom: 2 }}>
      <CardContent>
        <Typography variant="h5">{title}</Typography>
        <Box display="flex" alignItems="center">
          <IconButton
            onClick={onDecrement}
            color="primary"
            aria-label="decrease"
          >
            <FaMinus />
          </IconButton>
          <Typography variant="body2">Quantity: {quantity}</Typography>
          <IconButton
            onClick={onIncrement}
            color="primary"
            aria-label="increase"
          >
            <FaPlus />
          </IconButton>
          <Box sx={{ marginLeft: "5rem" }}>
            <IconButton onClick={onUpdate} color="primary" aria-label="update">
              <FaEdit />
            </IconButton>
            <IconButton
              onClick={onDelete}
              color="secondary"
              aria-label="delete"
            >
              <FaTrashAlt />
            </IconButton>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PantryItem;
