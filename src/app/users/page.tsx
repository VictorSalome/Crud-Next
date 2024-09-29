"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useTheme, useMediaQuery } from '@mui/material';
import { UserTableMobile, UserTableWeb } from './components';





interface User {
    id: number;
    name: string;
    email: string;
    phone: string;
    birthDate: string;
    role: string;
}

export default function UsersPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await axios.get('/api/user');
                setUsers(res.data);
            } catch (err) {
                setError('Erro ao carregar usuários.');
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    const handleDelete = async (id: number) => {
        try {
            await axios.delete(`/api/users?id=${id}`);
            setUsers(users.filter(user => user.id !== id));
        } catch (err) {
            setError('Erro ao deletar usuário.');
        }
    };

    if (loading) return <p>Carregando...</p>;
    if (error) return <p>{error}</p>;

    return (
        <main className="mt-10 flex flex-col items-center sm:items-start">
            <h1 className="mb-9 text-4xl font-archivo">Usuários</h1>
            {isMobile ? (
                <UserTableMobile users={users} handleDelete={handleDelete} />
            ) : (
                <UserTableWeb users={users} handleDelete={handleDelete} />
            )}
        </main>
    );
}
