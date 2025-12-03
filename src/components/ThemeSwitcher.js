import React, { useContext } from "react";
import { ThemeContext } from "../theme/ThemeContext";
import { FormControlLabel, Switch } from "@mui/material";

const ThemeSwitcher = () => {
  const { mode, toggleTheme } = useContext(ThemeContext);

  return (
    <div className="theme-switcher">
      <FormControlLabel
        control={
          <Switch
            checked={mode === "dark"}
            onChange={toggleTheme}
            color="primary"
            slotProps={{
              input: { 'aria-label': 'Dark mode toggle' }
            }}
          />
        }
        label="Dark mode"
        className="theme-switcher-label"
      />
    </div>
  );
};

export default ThemeSwitcher;