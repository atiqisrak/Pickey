import React from "react";
import { Box, Button, Input, InputAdornment, TextField } from "@mui/material";
import { useRouter } from "next/router";

const stage1 = () => {
  const router = useRouter();
  return (
    <div className="container flexed-column">
      <h1>Welcome to Stage 1</h1>

      {/* Job Candidate Basic info */}
      <div className="basicInfo">
        <h2>Basic Information</h2>
        <div className="input-group">
          <Box sx={{display: "flex", flexDirection: "column", flexWrap: 'wrap', width: "100%"}}>
            <div>
              <TextField
                id="outlined-basic"
                label="Name"
                variant="outlined"
                sx={{ m: 1, width: "100%" }}
                placeholder="Full Name"
              />
              <TextField
                id="outlined-basic"
                label="Email"
                variant="outlined"
                sx={{ m: 1, width: "100%" }}
                placeholder="user@example.com"
                type="email"
              />
              <TextField
                id="outlined-basic"
                label="Phone"
                variant="outlined"
                sx={{ m: 1, width: "100%" }}
                placeholder="01234567890"
                type="tel"
                InputProps={{ 
                inputProps: { pattern: "[0-9]{11}" },
                startAdornment: <InputAdornment position="start">+88</InputAdornment>,
              }}
              />
            </div>
            <Button
              variant="contained"
              sx={{ m: 1, width: "100%" }}
              onClick={() => {
                router.push("/stage2");
              }}
            >
              Next
            </Button>
            </Box>
          </div>
      </div>
    </div>
  );
}

export default stage1;