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
  Divider,
  Box,
  Fade,
  Tooltip,
} from "@mui/material";
import { Delete, AddCircleOutline } from "@mui/icons-material";

const availablePages = [
  { id: 1, title: "Home" },
  { id: 2, title: "About" },
  { id: 3, title: "Services" },
  { id: 4, title: "Contact" },
];

const generateSlug = (title) => {
  return title.toLowerCase().replace(/\s+/g, "-").replace(/[^\w\-]+/g, "");
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
    const newItems = selectedPages.filter(page => 
      !menuItems.some(item => item.id === page.id)
    );
    setMenuItems([...menuItems, ...newItems]);
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
    setMenuName("");
    setMenuItems([]);
    setStep(1);
  };

  return (
    <Box
      sx={{
        p: 4,
        display: "flex",
        justifyContent: "center",
        backgroundColor: "#f4f6f8",
        minHeight: "100vh",
      }}
    >
      <Card sx={{ width: 600, p: 3, borderRadius: 3, boxShadow: 4 }}>
        <CardContent>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Menu Builder
          </Typography>

          {step === 1 && (
            <Fade in={step === 1}>
              <Box>
                <TextField
                  label="Menu Name"
                  variant="outlined"
                  value={menuName}
                  onChange={(e) => setMenuName(e.target.value)}
                  fullWidth
                  sx={{ mb: 3 }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<AddCircleOutline />}
                  onClick={handleAddMenuItem}
                  disabled={!menuName.trim()}
                  sx={{ textTransform: "none", fontWeight: "bold" }}
                >
                  Create Menu
                </Button>
              </Box>
            </Fade>
          )}

          {step === 2 && (
            <Fade in={step === 2}>
              <Box>
                <Typography variant="h6" fontWeight="medium" gutterBottom>
                  Select Pages
                </Typography>
                <List sx={{ mb: 3 }}>
                  {availablePages.map((page) => (
                    <ListItem
                      key={page.id}
                      button
                      onClick={() => handleTogglePage(page)}
                      sx={{
                        borderRadius: 2,
                        transition: "all 0.3s ease",
                        "&:hover": {
                          backgroundColor: "#f0f4ff",
                        },
                      }}
                    >
                      <Checkbox
                        checked={selectedPages.indexOf(page) !== -1}
                        tabIndex={-1}
                        disableRipple
                        sx={{ color: "#1a73e8" }}
                      />
                      <ListItemText primary={page.title} />
                    </ListItem>
                  ))}
                </List>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleAddSelectedPages}
                  disabled={selectedPages.length === 0}
                  sx={{ textTransform: "none", fontWeight: "bold" }}
                >
                  Add Selected Pages to Menu
                </Button>
              </Box>
            </Fade>
          )}

          {menuItems.length > 0 && (
            <>
              <Divider sx={{ my: 4 }} />
              <Typography variant="h6" fontWeight="medium" gutterBottom>
                Menu Items
              </Typography>
              <Paper variant="outlined" sx={{ mb: 2, borderRadius: 2 }}>
                <List>
                  {menuItems.map((item) => (
                    <ListItem
                      key={item.id}
                      secondaryAction={
                        <Tooltip title="Delete" arrow>
                          <IconButton
                            edge="end"
                            onClick={() => handleDeleteMenuItem(item.id)}
                            sx={{ color: "#e53935" }}
                          >
                            <Delete />
                          </IconButton>
                        </Tooltip>
                      }
                      sx={{
                        "&:hover": {
                          backgroundColor: "#f5f5f5",
                        },
                      }}
                    >
                      <ListItemText primary={item.title} />
                    </ListItem>
                  ))}
                </List>
              </Paper>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleSaveMenu}
                sx={{ textTransform: "none", fontWeight: "bold" }}
              >
                Save Menu
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}
