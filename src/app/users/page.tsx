"use client";

import React, { useState, useEffect } from 'react';
import useAxios from 'axios-hooks';
import { useTheme, useMediaQuery, Box, Snackbar, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button, Menu, MenuItem } from '@mui/material';
import { AddUser, UserTableMobile, UserTableWeb } from './components';
import ConfirmDialog from '../components/ConfirmDialog';
import { IUser } from '../interfaces/userInterface';
import axios from 'axios';
import GeneratePDF from '../utils/GeneratePDF';
import GenerateExcel from '../utils/GenerateExcel';
import { Loading } from '../components/Loading';

import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';

export default function UsersPage() {
    const [open, setOpen] = useState(false);
    const [openAddUserModal, setOpenAddUserModal] = useState(false);
    const [userIdToDelete, setUserIdToDelete] = useState<number | null>(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [isMobile, setIsMobile] = useState(false);
    
    const theme = useTheme();

    // Verifica se a tela é mobile
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < theme.breakpoints.values.sm);
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Verifica a largura da tela inicialmente

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [theme]);

    const [{ data: users = [], loading, error }, refetch] = useAxios<IUser[]>('/api/user');

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <p>Ocorreu um erro ao carregar os dados.</p>;
    }

    const handleClickOpen = (id: number) => {
        setUserIdToDelete(id);
        setOpen(true);
    };

    const handleClickOpenModal = () => {
        setOpenAddUserModal(true);
    };

    const handleClose = () => {
        setOpen(false);
        setUserIdToDelete(null);
        setOpenAddUserModal(false);
        setAnchorEl(null);
    };

    const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleDelete = async () => {
        if (userIdToDelete !== null) {
            try {
                await axios.delete(`/api/user?id=${userIdToDelete}`);
                refetch();
                handleClose();
                setSnackbarOpen(true);
            } catch (err) {
                console.error('Erro ao deletar usuário.', err);
                setSnackbarOpen(true); // Mostra snackbar mesmo em caso de erro
            }
        }
    };

    return (
        <main className="mt-[2.30rem] flex flex-col items-center sm:items-start ">
            <div className="flex justify-between w-full px-5">
                <h1 className="mb-10 text-3xl font-archivo font-semibold">Usuários</h1>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2, gap: 2, marginRight: '5rem' }}>
                    {isMobile ? (
                        <>
                            <IconButton color="primary" aria-label="add" title='Adicionar Usuário' onClick={handleClickOpenModal}>
                                <AddIcon />
                            </IconButton>

                            <IconButton color="primary" aria-label="menu" onClick={handleMenuClick}>
                                <MenuIcon />
                            </IconButton>

                            <Menu
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={handleMenuClose}
                            >
                                <MenuItem onClick={handleMenuClose}>Gerar PDF</MenuItem>
                                <MenuItem onClick={handleMenuClose}>Gerar Excel</MenuItem>
                            </Menu>
                        </>
                    ) : (
                        <>
                            <GeneratePDF users={users} />
                            <GenerateExcel users={users} />
                            <IconButton color="primary" aria-label="add" title='Adicionar Usuário' onClick={handleClickOpenModal}>
                                <AddIcon />
                            </IconButton>
                        </>
                    )}
                </Box>
            </div>
            {isMobile ? (
                <UserTableMobile users={users} handleDelete={handleClickOpen} />
            ) : (
                <UserTableWeb users={users} handleDelete={handleClickOpen} />
            )}

            <ConfirmDialog
                open={open}
                title="Confirmar Exclusão"
                message="Tem certeza de que deseja excluir este usuário? Esta ação não pode ser desfeita."
                onConfirm={handleDelete}
                onCancel={handleClose}
            />

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={() => setSnackbarOpen(false)}
                message={userIdToDelete !== null ? "Usuário deletado com sucesso!" : "Erro ao deletar usuário."}
            />

            <Dialog
                open={openAddUserModal}
                onClose={handleClose}
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle>
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <AddUser onSuccess={() => { handleClose(); refetch(); }} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancelar</Button>
                </DialogActions>
            </Dialog>
        </main>
    );
}
