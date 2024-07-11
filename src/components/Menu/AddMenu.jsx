import React, { useState } from "react";
import {
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
  Checkbox,
  IconButton,
  Paper,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import { Delete } from "@mui/icons-material";

// Mock available pages
const availablePages = [
  { id: 1, title: "Home" },
  { id: 2, title: "About" },
  { id: 3, title: "Services" },
  { id: 4, title: "Contact" },
];

// Utility function to generate slugs
const generateSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "");
};

export default function AddMenu() {
  const [menuName, setMenuName] = useState("");
  const [menuItems, setMenuItems] = useState([]);
  const [selectedPages, setSelectedPages] = useState([]);
  const [step, setStep] = useState(1);

  const handleAddMenuItem = () => {
    setStep(2);
  };

  const handleTogglePage = (page) => {
    const currentIndex = selectedPages.indexOf(page);
    const newSelectedPages = [...selectedPages];

    if (currentIndex === -1) {
      newSelectedPages.push(page);
    } else {
      newSelectedPages.splice(currentIndex, 1);
    }

    setSelectedPages(newSelectedPages);
  };

  const handleAddSelectedPages = () => {
    setMenuItems([...menuItems, ...selectedPages]);
    setSelectedPages([]);
  };

  const handleDeleteMenuItem = (id) => {
    setMenuItems(menuItems.filter((item) => item.id !== id));
  };

  const handleSaveMenu = () => {
    const menu = {
      name: menuName,
      items: menuItems.map((item) => ({
        ...item,
        slug: generateSlug(item.title),
      })),
    };
    console.log("Saved Menu:", menu);
    // Handle menu saving, e.g., send to backend
    setMenuName("");
    setMenuItems([]);
    setStep(1);
  };

  return (
    <div style={{ padding: "20px", display: "flex", justifyContent: "center" }}>
      <Card style={{ width: "600px", padding: "20px" }}>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            Menu Builder
          </Typography>

          {step === 1 && (
            <>
              <TextField
                label="Menu Name"
                variant="outlined"
                value={menuName}
                onChange={(e) => setMenuName(e.target.value)}
                style={{ marginBottom: "20px" }}
                fullWidth
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddMenuItem}
                disabled={!menuName.trim()}
              >
                Create Menu
              </Button>
            </>
          )}

          {step === 2 && (
            <>
              <Typography variant="h6" gutterBottom>
                Select Pages
              </Typography>
              <List>
                {availablePages.map((page) => (
                  <ListItem
                    key={page.id}
                    button
                    onClick={() => handleTogglePage(page)}
                  >
                    <Checkbox
                      checked={selectedPages.indexOf(page) !== -1}
                      tabIndex={-1}
                      disableRipple
                    />
                    <ListItemText primary={page.title} />
                  </ListItem>
                ))}
              </List>
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddSelectedPages}
                style={{ marginTop: "20px" }}
                disabled={selectedPages.length === 0}
              >
                Add Selected Pages to Menu
              </Button>
            </>
          )}

          {menuItems.length > 0 && (
            <>
              <Typography
                variant="h6"
                gutterBottom
                style={{ marginTop: "40px" }}
              >
                Menu Items
              </Typography>
              <List component={Paper}>
                {menuItems.map((item) => (
                  <ListItem key={item.id}>
                    <ListItemText primary={item.title} />
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => handleDeleteMenuItem(item.id)}
                    >
                      <Delete />
                    </IconButton>
                  </ListItem>
                ))}
              </List>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleSaveMenu}
                style={{ marginTop: "20px" }}
              >
                Save Menu
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
