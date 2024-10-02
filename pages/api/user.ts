import { NextApiRequest, NextApiResponse } from "next";

interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
  phone: string;
  birthDate: string;
  role: string;
}

const users: IUser[] = [
  {
    id: 1,
    name: "Andrei Soares",
    email: "andrei232@gmail.com",
    password: "12345",
    phone: "123456789",
    birthDate: "1993-05-01",
    role: "admin",
  },
  {
    id: 2,
    name: "Lucas Lopes",
    email: "lopesluc@hotmail.com",
    password: "1243345",
    phone: "123423789",
    birthDate: "2000-07-04",
    role: "admin",
  },
  {
    id: 3,
    name: "Marta Ferreira",
    email: "martafer@gmail.com",
    password: "12345",
    phone: "123456789",
    birthDate: "1992-03-22",
    role: "admin",
  },
  {
    id: 4,
    name: "Pedro Almeida",
    email: "pedroalmeida@gmail",
    password: "12345",
    phone: "123456789",
    birthDate: "1990-01-01",
    role: "admin",
  },
  {
    id: 5,
    name: "Joaquim Ferreira",
    email: "joaquimfer@gmail",
    password: "12345",
    phone: "123456789",
    birthDate: "1990-01-01",
    role: "admin",
  },
  {
    id: 6,
    name: "Ana Luiza",
    email: "analuiza@gmail",
    password: "12345",
    phone: "123456789",
    birthDate: "1990-01-01",
    role: "admin",
  },
  {
    id: 7,
    name: "Maria Clara",
    email: "mariaclara@gmail",
    password: "12345",
    phone: "123456789",
    birthDate: "1990-01-01",
    role: "admin",
  },
  {
    id: 8,
    name: "Carla Souza",
    email: "carlasouza@gmail",
    password: "12345",
    phone: "123456789",
    birthDate: "1990-01-01",
    role: "admin",
  },
  {
    id: 9,
    name: "Gabriel Costa",
    email: "gabrielcosta@gmail",
    password: "12345",
    phone: "123456789",
    birthDate: "1990-01-01",
    role: "admin",
  },
  {
    id: 10,
    name: "Juliana Almeida",
    email: "julianaalmeida@gmail",
    password: "12345",
    phone: "123456789",
    birthDate: "1990-01-01",
    role: "admin",
  },
];

// Handler para operações de um único usuário
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  // Método GET para buscar todos os usuários ou um usuário específico
  if (req.method === "GET") {
    if (id) {
      const userIndex = users.findIndex(
        (user) => user.id === parseInt(id as string)
      );

      if (userIndex !== -1) {
        return res.status(200).json(users[userIndex]);
      }
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    // Se não houver `id` na query, retornar todos os usuários
    return res.status(200).json(users);
  }

  // Método POST para criar um novo usuário
  if (req.method === "POST") {
    const { name, email, password, phone, birthDate, role } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Campos obrigatórios não preenchidos" });
    }

    const newUser: IUser = {
      id: users.length + 1, // Gerar um novo ID incremental
      name,
      email,
      password,
      phone,
      birthDate,
      role,
    };

    users.push(newUser);
    return res.status(201).json(newUser);
  }

  // Método PUT para atualizar um usuário existente
  if (req.method === "PUT") {
    if (!id) {
      return res.status(400).json({ message: "ID do usuário é obrigatório" });
    }

    const userIndex = users.findIndex(
      (user) => user.id === parseInt(id as string)
    );

    if (userIndex !== -1) {
      const { name, email, password, phone, birthDate, role } = req.body;
      users[userIndex] = {
        id: users[userIndex].id,
        name: name || users[userIndex].name,
        email: email || users[userIndex].email,
        password: password || users[userIndex].password,
        phone: phone || users[userIndex].phone,
        birthDate: birthDate || users[userIndex].birthDate,
        role: role || users[userIndex].role,
      };
      return res.status(200).json(users[userIndex]);
    }
    return res.status(404).json({ message: "Usuário não encontrado" });
  }

  // Método DELETE para remover um usuário existente
  if (req.method === "DELETE") {
    if (!id) {
      return res.status(400).json({ message: "ID do usuário é obrigatório" });
    }

    const userIndex = users.findIndex(
      (user) => user.id === parseInt(id as string)
    );

    if (userIndex !== -1) {
      users.splice(userIndex, 1);
      return res.status(204).end(); // Sucesso sem conteúdo
    }
    return res.status(404).json({ message: "Usuário não encontrado" });
  }

  return res.status(405).json({ message: "Método não permitido" });
}
