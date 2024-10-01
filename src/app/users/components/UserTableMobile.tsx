import { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, Typography, IconButton, Avatar, Grid, Dialog, DialogContent, DialogActions, Button, Snackbar, Alert } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { grey } from '@mui/material/colors';
import EditUserPageModal from './EditUser';

interface User {
    id: number;
    name: string;
    email: string;
    phone: string;
    birthDate: string;
    role: string;
}

interface UserTableMobileProps {
    users: User[];
    handleDelete: (id: number) => void;
}

const UserTableMobile: React.FC<UserTableMobileProps> = ({ users, handleDelete }) => {
    const [open, setOpen] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [editingUser, setEditingUser] = useState<User | null>(null);

    const handleClickOpen = (user: User) => {
        setEditingUser(user);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setEditingUser(null);
    };

    const handleSuccessUpdate = () => {
        setOpen(false);
        setOpenSnackbar(true);
    };

    const handleCloseSnackbar = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };

    return (
        <div className="space-y-4 p-4">
            {users.map(user => (
                <Card
                    key={user.id}
                    className="shadow-md hover:shadow-lg transition-shadow duration-300"
                    style={{ marginBottom: '16px' }}
                    elevation={3}
                >
                    <CardContent>
                        <Grid container spacing={2} alignItems="center">
                            <Grid item>
                                <Avatar sx={{ bgcolor: grey[500] }}>
                                    {user.name.charAt(0)}
                                </Avatar>
                            </Grid>
                            <Grid item xs>
                                <Typography variant="h6">{user.name}</Typography>
                                <Typography color="textSecondary">{user.email}</Typography>
                                <Typography color="textSecondary">{user.phone}</Typography>
                                <Typography color="textSecondary">{user.birthDate}</Typography>
                                <Typography color="textSecondary">{user.role}</Typography>
                            </Grid>
                            <Grid item>
                                <IconButton
                                    color="primary"
                                    onClick={() => handleClickOpen(user)}
                                    sx={{ backgroundColor: 'transparent', boxShadow: 'none', color: 'black' }}
                                >
                                    <EditIcon />
                                </IconButton>

                                <IconButton
                                    color="secondary"
                                    onClick={() => handleDelete(user.id)}
                                    sx={{ backgroundColor: 'transparent', boxShadow: 'none', color: 'red' }}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            ))}

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
        </div>
    );
};

export default UserTableMobile;
