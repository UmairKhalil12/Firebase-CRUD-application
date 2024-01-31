import React from 'react';
import SideNav from "../../Components/SideNav/SideNav";
import "./styles.css";
import { Box } from "@mui/material";
import NavBar from '../../Components/NavBar/NavBar';

export default function Home() {
    return (
        <div>
            <NavBar />
            <Box height={30} ></Box>
            <Box sx={{ display: 'flex' }}>
                <SideNav />
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <h1>Settings Page</h1>
                </Box>
            </Box>
        </div>
    );
}
