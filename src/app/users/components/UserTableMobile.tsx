import Link from 'next/link';
import { Card, CardContent, Typography, IconButton, Avatar, Grid } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { grey } from '@mui/material/colors';

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
                                <Link href={`/users/${user.id}/edit`}>
                                    <IconButton color="primary" sx={{ backgroundColor: 'transparent', boxShadow: 'none', color: 'black' }} >
                                        <EditIcon />
                                    </IconButton>
                                </Link>
                                <IconButton color="secondary" onClick={() => handleDelete(user.id)}
                                    sx={{ backgroundColor: 'transparent', boxShadow: 'none', color: 'red' }}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};

export default UserTableMobile;
