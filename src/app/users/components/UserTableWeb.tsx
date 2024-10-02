import { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TablePagination, Dialog, DialogActions, DialogContent, Snackbar, Alert } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import EditUserPageModal from './EditUser'; // Importando corretamente o modal



interface User {
    id: number;
    name: string;
    email: string;
    phone: string;
    birthDate: string;
    role: string;
}

interface UserTableWebProps {
    users: User[];
    handleDelete: (id: number) => void;
}

const UserTableWeb: React.FC<UserTableWebProps> = ({ users, handleDelete }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [open, setOpen] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [editingUser, setEditingUser] = useState<User | null>(null); // Estado para o usuário em edição

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleClose = () => {
        setOpen(false);
        setEditingUser(null); // Reseta o usuário em edição
    };

    const handleCloseSnackbar = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleClickOpen = (user: User) => {
        setEditingUser(user); // Define o usuário em edição
        setOpen(true); // Abre o modal
    };

    const handleSuccessUpdate = () => {
        setOpen(false); // Fecha o modal
        setOpenSnackbar(true); // Exibe o Snackbar de sucesso
    };

    return (
        <>
            <TableContainer component={Paper} sx={{ padding: '1rem' }}>
                <Table>
                    <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Nome</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Telefone</TableCell>
                            <TableCell>Data de Nascimento</TableCell>
                            <TableCell>Cargo</TableCell>
                            <TableCell sx={{ textAlign: 'center' }}>Ações</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user) => (
                            <TableRow
                                key={user.id}
                                sx={{ '&:hover': { backgroundColor: '#f0f0f0' } }} // Adicionando o efeito de hover
                            >
                                <TableCell>{user.id}</TableCell>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.phone}</TableCell>
                                <TableCell>{user.birthDate}</TableCell>
                                <TableCell>{user.role}</TableCell>
                                <TableCell>
                                    <div className="flex justify-around ">
                                        <Button
                                            variant="contained"
                                            color="inherit"
                                            className="mr-2"
                                            sx={{ backgroundColor: 'transparent', boxShadow: 'none' }}
                                            onClick={() => handleClickOpen(user)}
                                        >
                                            <EditIcon />
                                        </Button>

                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            onClick={() => handleDelete(user.id)}
                                            sx={{ backgroundColor: 'transparent', boxShadow: 'none', color: 'red' }}
                                        >
                                            <DeleteIcon />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>

                </Table>
                <TablePagination
                    component="div"
                    labelRowsPerPage="Usuários por página: "
                    labelDisplayedRows={({ from, to, count }) => `${from} - ${to} de ${count}`}
                    count={users.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </TableContainer>

            {/* Modal de edição de usuário */}
            <Dialog open={open} onClose={handleClose}>
                <DialogContent>
                    {editingUser && (
                        <EditUserPageModal
                            user={editingUser}
                            open={open}
                            onClose={handleClose}
                            onSuccess={handleSuccessUpdate}
                        />
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">Cancelar</Button>
                </DialogActions>
            </Dialog>

            {/* Snackbar de sucesso */}
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                    Usuário atualizado com sucesso!
                </Alert>
            </Snackbar>
        </>
    );
};

export default UserTableWeb;
