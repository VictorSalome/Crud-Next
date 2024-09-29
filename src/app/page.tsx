


import Link from "next/link";



const HomePage = () => {
  return (


    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-cover bg-center relative" style={{ backgroundImage: "url('/imgHome.jpeg')" }}>
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="w-full md:w-1/2 text-left relative z-10 p-4">
        <h1 className="text-2xl md:text-4xl font-extrabold text-white">Bem Vindo ao Sistema de cadastro</h1>
        <p className="text-white mt-4 font-semibold text-1xl">
          Nosso software de cadastro de produtos é a solução ideal para gerenciar seu inventário de forma rápida e eficiente. Com uma interface intuitiva e funcionalidades avançadas, você poderá adicionar, editar e visualizar produtos com facilidade. Experimente agora e veja como é prático!
        </p>
        <div className="flex flex-col md:flex-row mt-6">
          <div className="flex gap-4">
            <Link href="/users/create">
              <span className="bg-[#3A3831] text-white px-6 py-3 rounded-xl hover:bg-[#42413e] transition duration-300">Adicionar Usuário</span>
            </Link>
            <Link href="/users">
              <span className="bg-[#7B7460] text-white px-6 py-3 rounded-xl mb-2 md:mb-0 md:ml-2 hover:bg-[#7f7b6f] transition duration-300">Ver Usuários</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;