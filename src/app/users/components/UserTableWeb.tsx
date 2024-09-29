import { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Box, TablePagination } from '@mui/material';
import Link from 'next/link';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


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

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
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
                        {users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(user => (
                            <TableRow key={user.id}>
                                <TableCell>{user.id}</TableCell>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.phone}</TableCell>
                                <TableCell>{user.birthDate}</TableCell>
                                <TableCell>{user.role}</TableCell>
                                <TableCell>
                                    <div className="flex justify-around ">
                                        <Link href={`/users/${user.id}/edit`}>
                                            <Button variant="contained" color="inherit" className="mr-2" sx={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
                                                <EditIcon />
                                            </Button>
                                        </Link>
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
        </>

    );
};

export default UserTableWeb;
