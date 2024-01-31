import React from 'react';
import SideNav from "../../Components/SideNav/SideNav";
import "./styles.css";
import { Box } from "@mui/material";
import NavBar from '../../Components/NavBar/NavBar';
import ListProducts from './ListProducts';

export default function Products() {
    return (
        <div>
            <NavBar />
            <Box height={50} ></Box>
            <Box sx={{ display: 'flex' }}>
                <SideNav />
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <h1>Products Page</h1>
                    <ListProducts />
                </Box>
            </Box>
        </div>
    );
}

