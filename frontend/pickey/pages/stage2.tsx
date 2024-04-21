import * as React from 'react';
import { useAutocomplete, AutocompleteGetTagProps } from '@mui/base/useAutocomplete';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';
import Autocomplete, { autocompleteClasses } from '@mui/material/Autocomplete';
import { Box, Button, Select, TextField } from '@mui/material';
import { useRouter } from 'next/router';

const stage2 = () => {
    const router = useRouter();
    return (
        <div className='container flexed-column'>
        <h1>Welcome to Stage 2</h1>
        <Box>
            <Autocomplete
            style={{ width: 300, marginBottom: 40 }}
                freeSolo
                options={openPositions.map((option) => option.title)}
                renderInput={(params) => <TextField {...params} label="Select Position" />}
            />
            <Autocomplete
            style={{ width: 300, marginBottom: 40 }}
                multiple
                id="tags-outlined"
                options={top50Skills}
                getOptionLabel={(option: SkillOptionType) => option.title}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        variant="outlined"
                        label="Select Skills"
                        placeholder="Skills"
                    />
                )}
            />
        <Button
            variant="contained"
            sx={{ m: 1 }}
            onClick={() => {
                router.push("/stage3");
            }}
        >
            Next
        </Button>
        </Box>
        </div>
    );
}

interface SkillOptionType {
    title: string;
    id: number;
}

const top50Skills = [
    { id: 1, title: 'React' },
    { id: 2, title: 'Vue' },
    { id: 3, title: 'Angular' },
    { id: 4, title: 'Svelte' },
    { id: 5, title: 'NextJS' },
    { id: 6, title: 'Gatsby' },
    { id: 7, title: 'Nuxt' },
    { id: 8, title: 'React Native' },
    { id: 9, title: 'Flutter' },
    { id: 10, title: 'Ionic' },
    { id: 11, title: 'Swift' },
    { id: 12, title: 'Kotlin' },
    { id: 13, title: 'Java' },
    { id: 14, title: 'Python' },
    { id: 15, title: 'Ruby' },
    { id: 16, title: 'PHP' },
    { id: 17, title: 'C#' },
    { id: 18, title: 'C++' },
    { id: 19, title: 'C' },
    { id: 20, title: 'Rust' },
    { id: 21, title: 'Go' },
    { id: 22, title: 'Dart' },
    { id: 23, title: 'JavaScript' },
    { id: 24, title: 'TypeScript' },
    { id: 25, title: 'HTML' },
    { id: 26, title: 'CSS' },
    { id: 27, title: 'SCSS' },
    { id: 28, title: 'LESS' },
    { id: 29, title: 'Tailwind CSS' },
    { id: 30, title: 'Bootstrap' },
    { id: 31, title: 'Material UI' },
    { id: 32, title: 'Chakra UI' },
    { id: 33, title: 'Ant Design' },
    { id: 34, title: 'Redux' },
    { id: 35, title: 'MobX' },
    { id: 36, title: 'GraphQL' },
    { id: 37, title: 'REST' },
    { id: 38, title: 'Firebase' },
    { id: 39, title: 'MongoDB' },
    { id: 40, title: 'MySQL' },
    { id: 41, title: 'PostgreSQL' },
    { id: 42, title: 'SQLite' },
];

const openPositions = [
    { id: 1, title: 'Frontend Developer' },
    { id: 2, title: 'Backend Developer' },
    { id: 3, title: 'Fullstack Developer' },
    { id: 4, title: 'Mobile Developer' },
    { id: 5, title: 'DevOps Engineer' },
    { id: 6, title: 'Data Scientist' },
    { id: 7, title: 'Machine Learning Engineer' },
    { id: 8, title: 'Software Engineer' },
    { id: 9, title: 'QA Engineer' },
    { id: 10, title: 'UI/UX Designer' },
];


export default stage2;