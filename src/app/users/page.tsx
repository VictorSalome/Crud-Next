"use client";
import { useState } from 'react';
import useAxios from 'axios-hooks';
import { useTheme, useMediaQuery, Box, Snackbar, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Button } from '@mui/material';
import { AddUser, UserTableMobile, UserTableWeb } from './components';
import ConfirmDialog from '../components/ConfirmDialog';
import { IUser } from '../interfaces/userInterface';
import axios from 'axios';
import GeneratePDF from '../utils/GeneratePDF';
import GenerateExcel from '../utils/GenerateExcel';
import { Loading } from '../components/Loading';

import AddIcon from '@mui/icons-material/Add';

import CloseIcon from '@mui/icons-material/Close';

export default function UsersPage() {
    const [open, setOpen] = useState(false);
    const [openAddUserModal, setOpenAddUserModal] = useState(false);
    const [userIdToDelete, setUserIdToDelete] = useState<number | null>(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const [{ data: users = [], loading, error }, refetch] = useAxios<IUser[]>('/api/user');

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <p>Ocorreu um erro ao carregar os dados.</p>;
    }

    // Abrir modal de confirmação ao clicar em excluir
    const handleClickOpen = (id: number) => {
        setUserIdToDelete(id);
        setOpen(true); // Adiciona essa linha para abrir o diálogo de confirmação
    };

    const handleClickOpenModal = () => {
        setOpenAddUserModal(true);
    };

    const handleClose = () => {
        setOpen(false); // Fecha o modal de confirmação
        setUserIdToDelete(null);
        setOpenAddUserModal(false); // Fecha o modal de adicionar usuário
    };

    // Função de deletar usuário
    const handleDelete = async () => {
        if (userIdToDelete !== null) {
            try {
                await axios.delete(`/api/user?id=${userIdToDelete}`);
                refetch();
                handleClose();
                setSnackbarOpen(true); // Abre o Snackbar após exclusão
            } catch (err) {
                console.error('Erro ao deletar usuário.', err);
            }
        }
    };
    

    return (
        <main className="mt-[2.30rem] flex flex-col items-center sm:items-start">
            <div className="flex justify-between w-full px-5">
                <h1 className="mb-9 text-4xl font-archivo">Usuários</h1>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2, gap: 2, marginRight: '5rem' }}>
                    <GeneratePDF users={users} />
                    <GenerateExcel users={users} />
                    <IconButton color="primary" aria-label="add" title='Adicionar Usuário' onClick={handleClickOpenModal}>
                        <AddIcon />
                    </IconButton>
                </Box>
            </div>
            {isMobile ? (
                <UserTableMobile users={users} handleDelete={handleClickOpen} />
            ) : (
                <UserTableWeb users={users} handleDelete={handleClickOpen} />
            )}

            {/* Diálogo de confirmação para exclusão */}
            <ConfirmDialog
                open={open}
                title="Confirmar Exclusão"
                message="Tem certeza de que deseja excluir este usuário? Esta ação não pode ser desfeita."
                onConfirm={handleDelete} // Chama handleDelete ao confirmar exclusão
                onCancel={handleClose} // Fecha o modal ao cancelar
            />

            {/* Snackbar para mensagem de sucesso */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={() => setSnackbarOpen(false)}
                message="Usuário deletado com sucesso!"
            />

            {/* Modal de adicionar usuário */}
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
                    <AddUser onSuccess={() => { handleClose(); refetch(); }} /> {/* Fecha o modal e atualiza a tabela */}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancelar</Button>
                </DialogActions>
            </Dialog>

        </main>
    );
}
