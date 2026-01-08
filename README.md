# DevOrganiza

<img width="1351" height="760" alt="Image" src="https://github.com/user-attachments/assets/c64811c7-cc49-4740-9e3e-0fd9dd0986fe" />

A DevOrganiza é um web-app Full-stack onde o usuário pode organizar seus estudos e tarefas, além de desbloquear quizzes relacionados aos conteúdos cadastrados para praticar o aprendizado.
O objetivo da DevOrganiza é organizar e facilitar os estudos dos desenvolvedores, tornando mais visível as suas metas e encurtando o tempo de alcançá-las.


## 📌 Visão Geral

DevOrganiza é uma aplicação web fullstack voltada para desenvolvedores que desejam organizar estudos, tarefas e acompanhar sua evolução por meio de quizzes e métricas de desempenho.


## 🧩 Tecnologias Utilizadas

- **Next.js**: Framework React para aplicações web modernas com renderização híbrida.
- **React**: Biblioteca para construção de interfaces de usuário.
- **TypeScript**: Superset do JavaScript que adiciona tipagem estática.
- **Tailwind**: Framework utilitário para estilização rápida e responsiva.
- **clsx**: Utilitário para composição condicional de classes CSS.
- **tailwind-merge**: Evita conflitos e duplicações de classes do Tailwind.
- **Lucide React**: Biblioteca de ícones SVG para React.
- **Motion**: Biblioteca para animações e transições fluidas.
- **Next Themes**: Gerenciamento de temas (dark/light mode).
- **Recharts**: Criação de gráficos e visualização de dados.
- **React Hook Form**: Gerenciamento eficiente de formulários.
- **Zod** — Validação e tipagem de dados baseada em schemas.
- **Zustand** — Gerenciamento de estado global simples e performático.


## ⚙️ Ferramentas de Desenvolvimento

- **Node.js**: Ambiente de execução JavaScript.
- **TypeScript Compiler (tsc)**: Compilação e verificação de tipos.
- **PostCSS**: Processamento de CSS para o Tailwind.
- **Babel**: Transpilação de código moderno para compatibilidade.


## 🏗️ Arquitetura

- Front-end desacoplado do back-end, consumindo API REST
- Comunicação via Fetch API utilizando hooks customizados
- Backend estruturado por rotas e camadas de responsabilidade
- Registros de dados em PostgreSQL utilizando Drizzle ORM
- Validação de dados com Zod tanto no front-end quanto no back-end


## 🚀 Funcionalidades Principais

- Autenticação de usuários com JWT armazenado em cookies HTTP-only
- Sistema de cadastro e login com upload de imagem de perfil via Cloudinary
- Organização de estudos por temas, com criação de tarefas vinculadas
- Sistema de quizzes desbloqueáveis conforme os estudos cadastrados
- Registro de pontuação e tempo gasto em cada tentativa de quiz
- Dashboard com visualização de desempenho através de gráficos
- Controle de acesso por tipo de usuário (user/admin) com rotas protegidas

## 🧠 Regras de Negócio

- Um quiz só é liberado quando o usuário cadastra um estudo com o mesmo nome do quiz
- Cada tentativa de quiz registra pontuação e duração
- Usuários podem marcar tarefas como concluídas e adicionar links de referência
- Rotas sensíveis são protegidas por autenticação e autorização


## ⚠️ Desafios Técnicos

- Implementação de autenticação segura utilizando cookies
- Sincronização entre estudos cadastrados e desbloqueio de quizzes
- Organização do estado global para refletir progresso do usuário
- Criação de dashboard com dados agregados de performance


## 🧪 Qualidade & Testes

- **Jest**: Framework de testes unitários.
- **Testing Library**: Testes focados no comportamento do usuário.
- **ESLint**: Padronização e análise estática de código.


## Como Executar o Projeto

Para executar o projeto localmente, siga os passos abaixo:

1. **Clone o repositório:**

  ```bash
  git clone https://github.com/guilhermep3/devorganiza-frontend
  ```

2. **Instale as dependências**

  ```bash
  npm install ou yarn install
  ```

3. **Execute o projeto**

  ```bash
  npm run dev ou yarn dev
  ```

Projeto desenvolvido por <a href="https://github.com/guilhermep3" target="_blank">Guilherme Pereira</a>