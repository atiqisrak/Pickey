import React, { use, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { Editor } from "@monaco-editor/react";
import { Autocomplete, Box, Select, TextField } from "@mui/material";


const CodeEditor = ({code,setCode}) => {
    const router = useRouter();
    const [value, setValue] = useState(code || "// write your code here");
    const editorRef = useRef();
    const [language, setLanguage] = useState("javascript");

    useEffect(() => {
        setValue(code || "// write your code here");
    },[code]);

    return (
            <Box className="flexed-column" sx={{
                marginBottom: "2em",
            }}>
            <Autocomplete
                sx={{ width: "20vw", margin: 1}}
                id="free-solo-demo"
                freeSolo
                options={
                    ["javascript", "python", "java", "c", "c++", "ruby", "php", "go", "typescript"]
                }
                renderInput={(params) => <TextField {...params} label="choose language" />}
            />
            <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "1em",
                backgroundColor: "#0d0d0d",
                borderRadius: "10px",
                padding: "1em",
            }}>
            <Editor
                width={"60vw"}
                theme="vs-dark"
                height="75vh"
                defaultLanguage="javascript"
                defaultValue="// write your code here"
                language={language}
                value={value}
                onChange={(newValue) => {
                    setValue(newValue);
                    setCode(newValue);
                }
                }
            />
            </div>
            </Box>
    );
}

export default CodeEditor;