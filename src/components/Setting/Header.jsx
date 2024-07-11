import React, { useState } from "react";
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete"; // Import DeleteIcon for logo removal

const Header = () => {
  const [layout, setLayout] = useState("");
  const [logo, setLogo] = useState(null); // Changed to null for initial state
  const [logoPreview, setLogoPreview] = useState(""); // State to store image preview URL
  const [helpLineNumber, setHelpLineNumber] = useState("");
  const [helpLineText, setHelpLineText] = useState("");
  const [searchBarLayout, setSearchBarLayout] = useState("default");

  // Handle file selection for logo image upload
  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogo(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle logo removal
  const handleLogoRemove = () => {
    setLogo(null);
    setLogoPreview("");
  };

  const handleSaveSettings = () => {
    const settings = {
      layout,
      logo,
      helpLineNumber,
      helpLineText,
      searchBarLayout,
    };
    console.log("Saved Header Settings:", settings);
    // Handle saving settings, e.g., send to backend
  };

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Header Settings
      </Typography>
      <FormControl component="fieldset">
        <FormLabel component="legend">Select Header Layout</FormLabel>
        <RadioGroup
          aria-label="header-layout"
          name="header-layout"
          value={layout}
          onChange={(e) => setLayout(e.target.value)}
        >
          <FormControlLabel value="1" control={<Radio />} label="Layout 1" />
          <FormControlLabel value="2" control={<Radio />} label="Layout 2" />
          <FormControlLabel value="3" control={<Radio />} label="Layout 3" />
        </RadioGroup>
      </FormControl>

      {layout && (
        <>
          <Divider style={{ margin: "20px 0" }} />
          <Typography variant="h5">Layout {layout} Settings</Typography>
          <Box sx={{ mt: 2 }}>
            {/* Image Preview for Layout */}
            {layout && (
              <img
                src={`./header_layout_${layout}.png`}
                alt={`Layout ${layout} Preview`}
                style={{
                  maxWidth: "100%",
                  marginBottom: "10px",
                  border: "1px solid #ddd",
                  padding: "5px",
                }}
              />
            )}

            {/* Logo Image Upload */}
            <input
              accept="image/*"
              id="logo-upload"
              type="file"
              style={{ display: "none" }}
              onChange={handleLogoChange}
            />
            {logo ? (
              <>
                <img
                  src={logoPreview}
                  alt="Logo Preview"
                  style={{
                    maxWidth: "200px",
                    display: "block",
                    marginBottom: "10px",
                  }}
                />
                <IconButton
                  aria-label="remove logo"
                  onClick={handleLogoRemove}
                  style={{ marginBottom: "10px" }}
                >
                  <DeleteIcon />
                </IconButton>
              </>
            ) : (
              <label htmlFor="logo-upload">
                <Button
                  variant="contained"
                  component="span"
                  color="primary"
                  style={{ marginBottom: "10px" }}
                >
                  Upload Logo
                </Button>
              </label>
            )}

            {/* Help Line Number (specific to Layout 1) */}
            {layout === "1" && (
              <>
                <TextField
                  label="Help Line Number"
                  variant="outlined"
                  fullWidth
                  value={helpLineNumber}
                  onChange={(e) => setHelpLineNumber(e.target.value)}
                  style={{ marginBottom: "10px" }}
                />
                <TextField
                  label="Help Line Text"
                  variant="outlined"
                  fullWidth
                  value={helpLineText}
                  onChange={(e) => setHelpLineText(e.target.value)}
                  style={{ marginBottom: "10px" }}
                />
              </>
            )}
            <hr />
            {/* Save Button */}

            <Button
              variant="contained"
              color="primary"
              onClick={handleSaveSettings}
              style={{ marginTop: "10px" }}
            >
              Save Settings
            </Button>
          </Box>
        </>
      )}
    </div>
  );
};

export default Header;
