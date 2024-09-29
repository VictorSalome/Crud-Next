"use client";
import { useState } from 'react';
import useAxios from 'axios-hooks';
import { useTheme, useMediaQuery, Box, Button } from '@mui/material';
import { UserTableMobile, UserTableWeb } from './components';
import ConfirmDialog from '../components/ConfirmDialog';
import axios from 'axios';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import ArticleIcon from '@mui/icons-material/Article';

interface User {
    id: number;
    name: string;
    email: string;
    phone: string;
    birthDate: string;
    role: string;
}

export default function UsersPage() {
    const [open, setOpen] = useState(false);
    const [userIdToDelete, setUserIdToDelete] = useState<number | null>(null);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const [{ data: users = [], loading, error }, refetch] = useAxios<User[]>('/api/user');

    const handleClickOpen = (id: number) => {
        setUserIdToDelete(id);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setUserIdToDelete(null);
    };

    const handleDelete = async () => {
        if (userIdToDelete !== null) {
            try {
                await axios.delete(`/api/user?id=${userIdToDelete}`);
                refetch();
                handleClose();
            } catch (err) {
                console.error('Erro ao deletar usuário.');
            }
        }
    };

    const generatePDF = () => {
        const doc = new jsPDF();

        autoTable(doc, {
            head: [['ID', 'Nome', 'Email', 'Telefone', 'Data de Nascimento', 'Cargo']],
            body: [
                ...users.map(user => [user.id, user.name, user.email, user.phone, user.birthDate, user.role]),
                [{ content: `Total de usuários: ${users.length}`, colSpan: 6, styles: { halign: 'right', fillColor: [22, 160, 133], textColor: [255, 255, 255] } }]
            ]
        });

        doc.save('relatorio_usuarios.pdf');
    };
    const generateExcel = () => {
        // Mapeia os usuários para personalizar os cabeçalhos em português
        const usersForExcel = users.map(user => ({
            ID: user.id,
            Nome: user.name,
            Email: user.email,
            Telefone: user.phone,
            'Data de Nascimento': user.birthDate,
            Cargo: user.role
        }));

        // Converte os dados para formato de planilha
        const worksheet = XLSX.utils.json_to_sheet(usersForExcel);

        // Adiciona uma linha no final com o total de usuários
        const totalRow = { ID: '', Nome: '', Email: '', Telefone: '', 'Data de Nascimento': '', Cargo: `Total de usuários: ${users.length}` };
        XLSX.utils.sheet_add_json(worksheet, [totalRow], { skipHeader: true, origin: -1 });

        // Cria o livro e adiciona a planilha
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Usuários');

        // Salva o arquivo Excel
        XLSX.writeFile(workbook, 'relatorio_usuarios.xlsx');
    };

    if (loading) return <p>Carregando...</p>;
    if (error) return <p>{error.message}</p>;

    return (
        <main className=" mt-[2.30rem] flex flex-col items-center sm:items-start">
            <div className='flex justify-between w-full px-5'>
                <h1 className="mb-9 text-4xl font-archivo">Usuários</h1>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                    <Button variant="contained" color="primary" onClick={generatePDF} title="Emitir em PDF" sx={{ backgroundColor: 'transparent', boxShadow: 'none', color: 'black' }}>
                        <PictureAsPdfIcon />
                    </Button>
                    <Button variant="contained" color="secondary" onClick={generateExcel} title="Emitir em XLS" sx={{ backgroundColor: 'transparent', boxShadow: 'none', color: 'chocolate' }}>
                        <ArticleIcon />
                    </Button>
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
        </main>
    );
}
