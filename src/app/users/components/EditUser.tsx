import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Modal, Box, Typography, Button } from '@mui/material';

interface UserFormInputs {
    name: string;
    email: string;
    phone: string;
    birthDate: string;
    role: string;
}

interface EditUserPageModalProps {
    user: {
        id: number;
        name: string;
        email: string;
        phone: string;
        birthDate: string;
        role: string;
    };
    open: boolean;
    onClose: () => void;
    onSuccess: () => void; // Adiciona a prop onSuccess
}

const EditUserPageModal: React.FC<EditUserPageModalProps> = ({ user, open, onClose, onSuccess }) => {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<UserFormInputs>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        // Preenche os campos do formulário com os dados do usuário
        setValue('name', user.name);
        setValue('email', user.email);
        setValue('phone', user.phone);
        setValue('birthDate', user.birthDate);
        setValue('role', user.role);
    }, [user, setValue]);

    const onSubmit = async (data: UserFormInputs) => {
        setLoading(true);
        setError('');
        setSuccess(false);

        try {
            await axios.put(`/api/user?id=${user.id}`, data); // Atualizei a rota da API
            setSuccess(true);

            // Chama a função onSuccess após o sucesso
            onSuccess();

            // Fecha o modal ou redireciona
            setTimeout(() => {
                window.location.reload();
            }, 500);
        } catch (err) {
            setError('Erro ao atualizar usuário.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="edit-user-modal-title"
            aria-describedby="edit-user-modal-description"
        >
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 400,
                bgcolor: 'background.paper',
                borderRadius: 2,
                boxShadow: 24,
                p: 4
            }}>
                <Typography id="edit-user-modal-title" variant="h6" component="h2">
                    Editar Usuário
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    {success && <p style={{ color: 'green' }}>Usuário atualizado com sucesso!</p>}

                    <label htmlFor="name">Nome</label>
                    <input
                        id="name"
                        className="shadow-md border rounded-xl w-full h-12 py-2 px-3"
                        {...register('name', { required: 'Nome é obrigatório' })}
                    />
                    {errors.name && <p className="text-red-500">{errors.name.message}</p>}

                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        className="shadow-md border rounded-xl w-full h-12 py-2 px-3"
                        {...register('email', { required: 'Email é obrigatório' })}
                    />
                    {errors.email && <p className="text-red-500">{errors.email.message}</p>}

                    <label htmlFor="phone">Telefone</label>
                    <input
                        id="phone"
                        className="shadow-md border rounded-xl w-full h-12 py-2 px-3"
                        {...register('phone')}
                    />

                    <label htmlFor="birthDate">Data de nascimento</label>
                    <input
                        id="birthDate"
                        type="date"
                        className="shadow-md border rounded-xl w-full h-12 py-2 px-3"
                        {...register('birthDate')}
                    />

                    <label htmlFor="role">Cargo</label>
                    <input
                        id="role"
                        className="shadow-md border rounded-xl w-full h-12 py-2 px-3"
                        {...register('role')}
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        sx={{ mt: 2, width: '100%' }}
                        disabled={loading}


                    >

                        {loading ? 'Salvando...' : 'Salvar'}
                    </Button>
                </form>
            </Box>
        </Modal>
    );
};



export default EditUserPageModal;
