"use client";

import { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { TextField, Button, CircularProgress, Typography, Container, Box, Snackbar, Alert } from '@mui/material';

interface UserFormInputs {
    name: string;
    email: string;
    password: string;
    phone: string;
    birthDate: string;
    role: string;
}

interface AddUserProps {
    onSuccess: () => void; // Função para fechar o modal e atualizar a tabela
}

export default function AddUser({ onSuccess }: AddUserProps) {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<UserFormInputs>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const handleCloseSnackbar = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };

    const onSubmit = async (data: UserFormInputs) => {
        setLoading(true);
        setError('');

        try {
            await axios.post('/api/user', data);
            setOpenSnackbar(true);
            reset();



            setTimeout(() => {
                onSuccess();
            }, 600);
        } catch (err) {
            setError('Erro ao realizar cadastro.');
        } finally {
            setLoading(false);
        }
    };


    return (
        <Container component="main" maxWidth="sm">
            <Typography variant="h4" component="h1" gutterBottom>
                Adicione um Usuário
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
                <TextField
                    id="name"
                    label="Nome"
                    variant="standard"
                    margin="normal"
                    fullWidth
                    {...register('name', { required: 'Nome é obrigatório' })}
                    error={!!errors.name}
                    helperText={errors.name ? errors.name.message : ''}
                />
                <TextField
                    id="email"
                    label="Email"
                    type="email"
                    variant="standard"
                    margin="normal"
                    fullWidth
                    {...register('email', { required: 'Email é obrigatório' })}
                    error={!!errors.email}
                    helperText={errors.email ? errors.email.message : ''}
                />
                <TextField
                    id="password"
                    label="Senha"
                    type="password"
                    variant="standard"
                    margin="normal"
                    fullWidth
                    {...register('password', { required: 'Senha é obrigatória' })}
                    error={!!errors.password}
                    helperText={errors.password ? errors.password.message : ''}
                />
                <TextField
                    id="phone"
                    label="Telefone"
                    variant="standard"
                    margin="normal"
                    fullWidth
                    {...register('phone')}
                />
                <TextField
                    id="birthDate"
                    label="Data de nascimento"
                    type="date"
                    variant="standard"
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    {...register('birthDate')}
                />
                <TextField
                    id="role"
                    label="Cargo"
                    variant="standard"
                    margin="normal"
                    fullWidth
                    {...register('role')}
                />
                <Box mt={2}>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        disabled={loading}
                        style={{ backgroundColor: '#607d8b', color: '#fff' }}
                    >
                        {loading ? <CircularProgress size={24} /> : 'Cadastrar'}
                    </Button>
                </Box>
                {error && <Typography color="error" mt={2}>{error}</Typography>}

                <Snackbar
                    open={openSnackbar}
                    autoHideDuration={3000}
                    onClose={handleCloseSnackbar}
                >
                    <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                        Usuário cadastrado com sucesso!
                    </Alert>
                </Snackbar>
            </form>
        </Container>
    );
}
