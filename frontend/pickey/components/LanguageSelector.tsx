  import React from "react";
  import { LANGUAGE_VERSIONS } from "./constants";
import { Box, Menu } from "@mui/material";
  
  const languages = Object.entries(LANGUAGE_VERSIONS);
  const ACTIVE_COLOR = "blue.400";
  
  const LanguageSelector = ({ language, onSelect }) => {
    return (
      <Box ml={2} mb={4}>
        <Menu
            id="language-selector"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
            MenuListProps={{
                "aria-labelledby": "basic-button",
            }}
        >
            {languages.map(([lang, version]) => (
                <Box
                key={lang}
                sx={{
                    cursor: "pointer",
                    color: lang === language ? ACTIVE_COLOR : "",
                    "&:hover": { color: ACTIVE_COLOR },
                }}
                onClick={() => onSelect(lang)}
                >
                {lang}
                </Box>
            ))}
        </Menu>
      </Box>
    );
  };
  export default LanguageSelector;
  