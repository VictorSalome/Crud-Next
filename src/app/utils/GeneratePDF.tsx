// components/GeneratePDF.tsx
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { IUser } from '../interfaces/userInterface';
import { Button } from '@mui/material';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';




interface GeneratePDFProps {
    users: IUser[];
}

const GeneratePDF: React.FC<GeneratePDFProps> = ({ users }) => {
    const generatePDF = () => {
        const doc = new jsPDF();

        autoTable(doc, {
            head: [['ID', 'Nome', 'Email', 'Telefone', 'Data de Nascimento', 'Cargo']],
            body: [
                ...users.map(user => [
                    user.id,
                    user.name,
                    user.email,
                    user.phone,
                    user.birthDate,
                    user.role
                ]),
                [
                    {
                        content: `Total de usuários: ${users.length}`,
                        colSpan: 6,
                        styles: { halign: 'right', fillColor: [22, 160, 133], textColor: [255, 255, 255] }
                    }
                ]
            ]
        });

        doc.save('relatorio_usuarios.pdf');
    };

    return (
        <Button variant="contained" color="primary" onClick={generatePDF} title="Emitir em PDF" sx={{ backgroundColor: 'transparent', boxShadow: 'none', color: 'black' }}>
            <PictureAsPdfIcon />
        </Button>
    );
};

export default GeneratePDF;


