import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react'
import CloseIcon from "@mui/icons-material/Close"
import { Grid } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '../../FireBase/FireBase';
import { useAppStore } from '../../appStore';



function AddProduct({ closeEvent }) {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [date, setDate] = useState('');
    const setRows = useAppStore((state)=>state.setRows)

    const handleNameChange = (event) => {
        setName(event.target.value);
    };
    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
    };
    const handlePriceChange = (event) => {
        setPrice(event.target.value);
    };
    const handleDateChange = (event) => {
        setDate(event.target.value);
    };

    const getUsers = async () => {
        const data = await getDocs(collection(db, 'Products'))
        setRows(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    const createUser = async () => {
        try {
            await addDoc(collection(db, 'Products'), {
                name: name,
                price: Number(price),
                category: category,
                date: date
            });
            getUsers();
            alert("Product has been added sucessfully")
            closeEvent();
            setName('');
            setPrice('');
            setCategory('');
            setDate('');
        } catch(error){
            console.log(error)
        }   
    };

    return (
        <div>

            <Box sx={{ m: 2 }} />
            <Typography variant="h5" align="center">Add Product</Typography>
            <IconButton style={{ position: 'absolute', right: '0', top: '0' }}
                onClick={closeEvent}
            >
                <CloseIcon />
            </IconButton>

            <Grid container spacing={2}>

                <Box height={30}></Box>
                <Grid item xs={12}>
                    <TextField id="standard-basic" value={name} label="Name" variant="outlined" sx={{ minWidth: "100%" }} onChange={handleNameChange} type='string' />
                </Grid>

                <Grid item xs={12}>
                    <TextField id="standard-basic" value={category} label="Category" variant="outlined" sx={{ minWidth: "100%" }} onChange={handleCategoryChange} type='string' />
                </Grid>

                <Grid item xs={6}>
                    <TextField id="standard-basic" value={price} label="Price" variant="outlined" sx={{ minWidth: "100%" }} onChange={handlePriceChange} type='number' />
                </Grid>

                <Grid item xs={6}>
                    <TextField id="standard-basic" value={date} label="Date" variant="outlined" sx={{ minWidth: "100%" }} onChange={handleDateChange} type='string' />
                </Grid>
            </Grid>

            <Button type='submit' onClick={createUser}>Save Changes</Button>



        </div>
    )
}

export default AddProduct
