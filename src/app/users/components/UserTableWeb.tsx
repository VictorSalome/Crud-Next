
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
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
    return (
        <TableContainer component={Paper} className="w-full sm:w-auto">
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Nome</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Telefone</TableCell>
                        <TableCell>Data de Nascimento</TableCell>
                        <TableCell>Cargo</TableCell>
                        <TableCell>Ações</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map(user => (
                        <TableRow key={user.id}>
                            <TableCell>{user.id}</TableCell>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.phone}</TableCell>
                            <TableCell>{user.birthDate}</TableCell>
                            <TableCell>{user.role}</TableCell>
                            <TableCell>
                                <div className="flex">
                                    <Link href={`/users/${user.id}/edit`}>
                                        <Button variant="contained" color="primary" className="mr-2">
                                            <EditIcon />
                                        </Button>
                                    </Link>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={() => handleDelete(user.id)}
                                    >
                                        <DeleteIcon />
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};


export default UserTableWeb;