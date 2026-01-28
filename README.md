# DevOrganiza

<img width="1351" height="760" alt="Image" src="https://github.com/user-attachments/assets/c64811c7-cc49-4740-9e3e-0fd9dd0986fe" />

A DevOrganiza é um web-app Full-stack onde o usuário pode organizar seus estudos e tarefas, além de desbloquear quizzes relacionados aos conteúdos cadastrados para praticar o aprendizado.
O objetivo da DevOrganiza é organizar e facilitar os estudos dos desenvolvedores, tornando mais visível as suas metas e encurtando o tempo de alcançá-las.

## 📌 Visão Geral

Este repositório é a camada frontend da DevOrganiza, desenvolvida em Next.js e TailwindCSS, com foco em experiência do usuário, organização de estado, consumo de APIs e visualização de dados.

## 🎯 Objetivo do projeto

- Demonstrar domínio em Next.js e TailwindCSS
- Simular um ambiente próximo ao mundo real / produção
- Consumir uma API REST organizada, escalável e validada
- Aplicar boas práticas de organização de código e UI
- Implementar autenticação e autorização com JWT
- Trabalhar com estado global e formulários complexos

## 🧩 Tecnologias Utilizadas

- **Next.js**: Framework React com renderização híbrida
- **React**: Construção de interfaces baseadas em componentes
- **TypeScript**: Superset do JavaScript com tipagem estática
- **Tailwind**: Framework para estilização utilitária e responsiva
- **clsx / tailwind-merge**: Composição e organização de classes

## 🧩 Bibliotecas

- **Next Themes**: Dark e light mode.
- **Lucide React**: Biblioteca de ícones SVG para React
- **Motion**: Biblioteca para animações e transições fluidas
- **Recharts**: Visualização de dados e gráficos
- **React Hook Form**: Gerenciamento de formulários
- **Zod** — Validação de dados
- **Zustand** — Gerenciamento de estado global

## 🚀 Funcionalidades Principais

- Cadastro e login de usuários
- Upload de imagem de perfil (Cloudinary)
- Autenticação com JWT armazenado em cookies HTTP-only
- Organização de estudos por temas, com criação de tarefas vinculadas
- Sistema de quizzes desbloqueáveis conforme os estudos cadastrados
- Dashboard com visualização de desempenho através de gráficos

## 🏗️ Arquitetura

- Aplicação desacoplada do backend
- Consumo de API REST autenticada
- Organização por componentes, páginas e hooks
- Hooks customizados para chamadas HTTP
- Estado global com Zustand
- Validação de formulários com React Hook Form + Zod
- Controle de tema e preferências do usuário

## 🧠 Regras de Negócio

- Atualização imediata da UI após ações do usuário
- Sincronização visual do progresso do usuário
- Um quiz só é liberado quando o usuário cadastra um estudo com o mesmo nome do quiz
- Usuários podem marcar tarefas como concluídas e adicionar links de referência

## ⚠️ Desafios Técnicos

- Implementação de autenticação baseada em cookies
- Sincronização entre estudos cadastrados e desbloqueio de quizzes
- Organização do estado global para refletir progresso do usuário
- Criação de dashboard com dados agregados de performance

## 🧪 Qualidade & Testes

- **Jest**: Framework de testes unitários.
- **Testing Library**: Testes focados na experiência do usuário
- **ESLint**: Padronização e análise de código.

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