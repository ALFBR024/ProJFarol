-- Tabela de Usuários
CREATE TABLE Usuario (
    usuarioID INT PRIMARY KEY,
    cpf VARCHAR(11),
    email VARCHAR(255),
    celular VARCHAR(15),
    logradouro VARCHAR(255),
    bairro VARCHAR(255),
    numero INT,
    cidade VARCHAR(100),
    estado VARCHAR(2),
    senha VARCHAR(255),
    cnpj VARCHAR(14),
    disponibilidade INT,
    boolPsicologo BOOLEAN,
    boolAdvogado BOOLEAN,
    boolInstituicao BOOLEAN,
    nomeUsuario VARCHAR(255)
);

-- Tabela de Contatos de Emergência
CREATE TABLE ContatosEmergencia (
    delegaciaID INT,
    usuarioID INT,
    nomeContato VARCHAR(255),
    telefone VARCHAR(20),
    PRIMARY KEY (delegaciaID),
    FOREIGN KEY (usuarioID) REFERENCES Usuario(usuarioID)
);

-- Tabela de Dúvidas
CREATE TABLE Duvidas (
    duvidaID INT PRIMARY KEY,
    usuarioID INT,
    pergunta TEXT,
    resposta TEXT,
    FOREIGN KEY (usuarioID) REFERENCES Usuario(usuarioID)
);

-- Tabela de Agendamento com Psicólogo
CREATE TABLE AgendamentoPsicologo (
    agendamentoID INT PRIMARY KEY,
    usuarioID INT,
    data DATE,
    FOREIGN KEY (usuarioID) REFERENCES Usuario(usuarioID)
);

-- Tabela de Agendamento com Advogado
CREATE TABLE AgendamentoAdvogado (
    agendamentoID INT PRIMARY KEY,
    usuarioID INT,
    data DATE,
    FOREIGN KEY (usuarioID) REFERENCES Usuario(usuarioID)
);

-- Tabela de Reserva de Quarto
CREATE TABLE ReservaQuarto (
    reservaID INT PRIMARY KEY,
    usuarioID INT,
    data DATE,
    FOREIGN KEY (usuarioID) REFERENCES Usuario(usuarioID)
);

-- Tabela de Delegacias
CREATE TABLE Delegacias (
    delegaciaID INT PRIMARY KEY,
    nomeDelegacia VARCHAR(255),
    email VARCHAR(255),
    telefone VARCHAR(20),
    logradouro VARCHAR(255),
    bairro VARCHAR(255),
    numero INT,
    cidade VARCHAR(100),
    estado VARCHAR(2)
);
