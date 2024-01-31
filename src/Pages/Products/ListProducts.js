import * as React from 'react';
import "./styles.css"
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Typography } from '@mui/material';
import Divider from "@mui/material/Divider";
import { useState, useEffect } from 'react';
import Stack from "@mui/material/Stack";
import { db } from "../../FireBase/FireBase";
import { collection, getDocs,deleteDoc, doc, } from "firebase/firestore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import AddProduct from './AddProduct';
import { useAppStore } from '../../appStore';
import EditProduct from './EditProduct';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


export default function ListProducts() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(6);
    const setRows = useAppStore((state) => state.setRows)
    const rows = useAppStore((state) => state.rows)
    const [open, setOpen] = useState(false);
    const [EditOpen, setEditOpen] = useState(false);
    const [Formid, setFormid] = useState("");
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleEditOpen = () => setEditOpen(true);
    const handleEditClose = () => setEditOpen(false);


    const getUsers = async () => {
        const data = await getDocs(collection(db, 'Products'))
        setRows(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }

    const deleteUser = async (id) => {
        const shouldDelete = window.confirm("Do you want to delete it?");

        if (shouldDelete) {
            try {
                await deleteDoc(doc(db, 'Products', id));
                window.alert("Product have been sucessfully deleted");
                getUsers();
            } catch (error) {
                console.log(error);
            }
        } else {
            // User clicked "Cancel" or closed the dialog
        }
    }

    useEffect(() => {
        getUsers()
    }, [])


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const editUser = (id, name, price, category, date) => {
        const data = {
            id: id,
            name: name,
            price: price,
            category: category,
            date: date
        };
        setFormid(data);
        handleEditOpen();
    };

    return (
        <>
            <div>
                { /*<Button onClick={handleOpen}>Open modal</Button> */}
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <AddProduct closeEvent={handleClose} />
                    </Box>
                </Modal>
                <Modal
                    open={EditOpen}
                    onClose={handleEditClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <EditProduct closeEvent={handleEditClose} fid={Formid} />
                    </Box>
                </Modal>
            </div>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    sx={{ padding: "20px" }}
                >
                    Products List
                    <button className='btn-add' onClick={handleOpen} > Add New</button>
                </Typography>
                <Divider />
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell align='left' style={{ minWidth: "100px" }} >
                                    <b> Name </b>
                                </TableCell>
                                <TableCell align='left' style={{ minWidth: "100px" }} >
                                    <b>Price</b>
                                </TableCell>
                                <TableCell align='left' style={{ minWidth: "100px" }} >
                                    <b>Category</b>
                                </TableCell>
                                <TableCell align='left' style={{ minWidth: "100px" }} >
                                    <b>Date</b>
                                </TableCell>
                                <TableCell align='left' style={{ minWidth: "100px" }} >
                                    <b>Actions</b>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    console.log(row.name, row.price, row.category, row.date);
                                    console.log(row.id);

                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                            <TableCell key={`${row.id}-name`} align='left'> {row.name} </TableCell>
                                            <TableCell key={`${row.id}-price`} align='left'> {JSON.stringify(row.price)} </TableCell>
                                            <TableCell key={`${row.id}-category`} align='left'> {row.category} </TableCell>
                                            <TableCell key={`${row.id}-date`} align='left'> {row.date} </TableCell>
                                            <TableCell align="left">
                                                <Stack spacing={2} direction="row">
                                                    <EditIcon
                                                        style={{
                                                            fontSize: "20px",
                                                            color: "blue",
                                                            cursor: "pointer",
                                                        }}
                                                        className="cursor-pointer"
                                                        onClick={() =>
                                                            editUser(row.id, row.name, row.price, row.category, row.date)}
                                                    />
                                                    <DeleteIcon
                                                        style={{
                                                            fontSize: "20px",
                                                            color: "darkred",
                                                            cursor: "pointer",
                                                        }}
                                                        onClick={() => {
                                                            deleteUser(row.id);
                                                        }}
                                                    />
                                                </Stack>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[6, 10, 16]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </>
    );
}
