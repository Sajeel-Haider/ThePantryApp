"use client";
import React, { useState, useEffect } from "react";
import { Button, Container, Typography, TextField } from "@mui/material";
import PantryItem from "../components/PantryItem";
import PantryForm from "../components/PantryForm";
import UpdatePantryForm from "../components/UpdatePantryForm";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

interface PantryItem {
  id: string;
  title: string;
  quantity: number;
}

const Pantry: React.FC = () => {
  const [pantryItems, setPantryItems] = useState<PantryItem[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isUpdateFormOpen, setIsUpdateFormOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<PantryItem | null>(null);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    if (db) {
      fetchPantryItems();
    }
  }, []);

  const fetchPantryItems = async () => {
    const querySnapshot = await getDocs(collection(db, "pantryItems"));
    const items: PantryItem[] = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as PantryItem[];
    setPantryItems(items);
  };

  const handleAddPantryItem = async (title: string) => {
    const existingItem = pantryItems.find(
      (item) => item.title.toLowerCase() === title.toLowerCase()
    );
    if (existingItem) {
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity + 1,
      };
      await updateDoc(doc(db, "pantryItems", existingItem.id), updatedItem);
      fetchPantryItems();
    } else {
      const newItem = {
        title,
        quantity: 1,
      };
      await addDoc(collection(db, "pantryItems"), newItem);
      fetchPantryItems();
    }
  };

  const handleDeletePantryItem = async (id: string) => {
    await deleteDoc(doc(db, "pantryItems", id));
    fetchPantryItems();
  };

  const handleIncrementQuantity = async (id: string) => {
    const item = pantryItems.find((item) => item.id === id);
    if (item) {
      const updatedItem = { ...item, quantity: item.quantity + 1 };
      await updateDoc(doc(db, "pantryItems", id), updatedItem);
      fetchPantryItems();
    }
  };

  const handleDecrementQuantity = async (id: string) => {
    const item = pantryItems.find((item) => item.id === id);
    if (item && item.quantity > 0) {
      const updatedItem = { ...item, quantity: item.quantity - 1 };
      await updateDoc(doc(db, "pantryItems", id), updatedItem);
      fetchPantryItems();
    }
  };

  const handleUpdatePantryItem = async (id: string, newTitle: string) => {
    const item = pantryItems.find((item) => item.id === id);
    if (item) {
      const updatedItem = { ...item, title: newTitle };
      await updateDoc(doc(db, "pantryItems", id), updatedItem);
      fetchPantryItems();
    }
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
      <Button
        variant="contained"
        color="secondary"
        onClick={fetchPantryItems}
        sx={{ marginTop: "1rem" }}
      >
        <Typography variant="body1">Save Changes</Typography>
      </Button>
    </Container>
  );
};

export default Pantry;
