// components/GenerateExcel.tsx
import * as XLSX from 'xlsx';
import { IUser } from '../interfaces/userInterface';
import { Button } from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';



interface GenerateExcelProps {
  users: IUser[];
}

const GenerateExcel: React.FC<GenerateExcelProps> = ({ users }) => {
  const generateExcel = () => {
    const usersForExcel = users.map(user => ({
      ID: user.id,
      Nome: user.name,
      Email: user.email,
      Telefone: user.phone,
      'Data de Nascimento': user.birthDate,
      Cargo: user.role
    }));

    const worksheet = XLSX.utils.json_to_sheet(usersForExcel);
    const totalRow = {
      ID: '',
      Nome: '',
      Email: '',
      Telefone: '',
      'Data de Nascimento': '',
      Cargo: `Total de usuários: ${users.length}`
    };
    XLSX.utils.sheet_add_json(worksheet, [totalRow], { skipHeader: true, origin: -1 });

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Usuários');
    XLSX.writeFile(workbook, 'relatorio_usuarios.xlsx');
  };

  return (
    <Button variant="contained" color="secondary" onClick={generateExcel} title="Emitir em XLS" sx={{ backgroundColor: 'transparent', boxShadow: 'none', color: 'chocolate' }}>
      <DescriptionIcon />
    </Button>
  );
};

export default GenerateExcel;


