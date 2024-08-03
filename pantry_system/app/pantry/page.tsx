"use client";
import React, { useState } from "react";
import { Button, Container, Typography, TextField, Box } from "@mui/material";
import { styled } from "@mui/system";
import PantryItem from "../components/PantryItem";
import PantryForm from "../components/PantryForm";
import UpdatePantryForm from "../components/UpdatePantryForm";

interface PantryItem {
  id: number;
  title: string;
  quantity: number;
}

const Pantry: React.FC = () => {
  const [pantryItems, setPantryItems] = useState<PantryItem[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isUpdateFormOpen, setIsUpdateFormOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<PantryItem | null>(null);
  const [searchText, setSearchText] = useState("");

  const handleAddPantryItem = (title: string) => {
    const existingItem = pantryItems.find(
      (item) => item.title.toLowerCase() === title.toLowerCase()
    );
    if (existingItem) {
      setPantryItems(
        pantryItems.map((item) =>
          item.title.toLowerCase() === title.toLowerCase()
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      const newItem = {
        id: pantryItems.length + 1,
        title,
        quantity: 1,
      };
      setPantryItems([...pantryItems, newItem]);
    }
  };

  const handleDeletePantryItem = (id: number) => {
    setPantryItems(pantryItems.filter((item) => item.id !== id));
  };

  const handleIncrementQuantity = (id: number) => {
    setPantryItems(
      pantryItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrementQuantity = (id: number) => {
    setPantryItems(
      pantryItems.map((item) =>
        item.id === id && item.quantity > 0
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const handleUpdatePantryItem = (id: number, newTitle: string) => {
    setPantryItems(
      pantryItems.map((item) =>
        item.id === id ? { ...item, title: newTitle } : item
      )
    );
    setIsUpdateFormOpen(false);
  };

  const filteredPantryItems = pantryItems.filter((item) =>
    item.title.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography variant="h1" gutterBottom>
        Pantry
      </Typography>
      <TextField
        label="Search Pantry"
        variant="outlined"
        margin="normal"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        sx={{
          backgroundColor: "white",
          borderRadius: "30px",
          width: "50%",
          "& .MuiOutlinedInput-root": {
            borderRadius: "30px",
            "& fieldset": {
              borderRadius: "30px",
            },
            "& input": {
              padding: "8px 14px",
              fontSize: "14px",
            },
          },
        }}
      />

      {filteredPantryItems.map((item) => (
        <PantryItem
          key={item.id}
          title={item.title}
          quantity={item.quantity}
          onDelete={() => handleDeletePantryItem(item.id)}
          onIncrement={() => handleIncrementQuantity(item.id)}
          onDecrement={() => handleDecrementQuantity(item.id)}
          onUpdate={() => {
            setCurrentItem(item);
            setIsUpdateFormOpen(true);
          }}
        />
      ))}
      <Button
        variant="contained"
        color="primary"
        onClick={() => setIsFormOpen(true)}
        sx={{ marginTop: "2rem" }}
      >
        <Typography variant="body1">Add Pantry</Typography>
      </Button>
      <PantryForm
        open={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleAddPantryItem}
      />
      {currentItem && (
        <UpdatePantryForm
          open={isUpdateFormOpen}
          onClose={() => setIsUpdateFormOpen(false)}
          onSubmit={(newTitle: string) =>
            handleUpdatePantryItem(currentItem.id, newTitle)
          }
          currentTitle={currentItem.title}
        />
      )}
    </Container>
  );
};

export default Pantry;
