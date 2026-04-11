# DevOrganiza

<img width="1350" height="760" alt="Image" src="https://github.com/user-attachments/assets/c64811c7-cc49-4740-9e3e-0fd9dd0986fe" />

A DevOrganiza é um web-app Full-stack onde o usuário pode organizar seus estudos e tarefas, além de desbloquear quizzes relacionados aos conteúdos cadastrados para praticar o aprendizado.
O objetivo da DevOrganiza é organizar e facilitar os estudos dos desenvolvedores, tornando mais visível as suas metas e encurtando o tempo de alcançá-las.

Acesse aqui: <a href="https://devorganiza.vercel.app/" target="_blank">Link do projeto</a>

## 📌 Visão Geral

Este repositório é a camada frontend da DevOrganiza, desenvolvida em Next.js e TailwindCSS, com foco em experiência do usuário, organização de estado, consumo de APIs e visualização de dados.


## 🎯 Objetivo do projeto

- Demonstrar domínio em Next.js e TailwindCSS
- Simular um ambiente próximo ao mundo real / produção
- Consumir uma API REST organizada, escalável e validada
- Aplicar boas práticas de organização de código e UI
- Implementar autenticação e autorização com JWT
- Trabalhar com estado global e formulários complexos


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


## 🧩 Tecnologias Utilizadas

- **Next.js**: Framework React com renderização híbrida
- **React**: Construção de interfaces baseadas em componentes
- **TypeScript**: Superset do JavaScript com tipagem estática
- **Tailwind**: Framework para estilização utilitária e responsiva
- **clsx / tailwind-merge**: Composição e organização de classes
- **Next Themes**: Dark e light mode.
- **Lucide React**: Biblioteca de ícones SVG para React
- **Motion**: Biblioteca para animações e transições fluidas
- **Recharts**: Visualização de dados e gráficos
- **React Hook Form**: Gerenciamento de formulários
- **Tanstack Query**: Cachê, e controle de requisições
- **Zod**: Validação de dados
- **Zustand**: Gerenciamento de estado global


## 🧠 Regras de Negócio

- Um quiz só é desbloqueado quando existe um estudo com o mesmo tema cadastrado pelo usuário
- O progresso do usuário é calculado com base nas tarefas concluídas
- Tarefas podem ser marcadas como concluídas e atualizam o progresso em tempo real
- Cada estudo pode conter múltiplas tarefas associadas
- Links externos podem ser adicionados às tarefas como material de apoio


## ⚠️ Desafios Técnicos

### Sincronização de UI após mutações (Modal + Refetch)

**Problema:**
Ao criar uma tarefa, era necessário fechar o modal e atualizar os dados da interface.

Inicialmente, isso foi feito utilizando `useEffect` com dependência em `isSuccess` da mutation.

O problema era que essa abordagem gerava comportamentos inconsistentes, como:
- O modal nem sempre fechava corretamente
- O refetch nem sempre acontecia no momento esperado
- Dependência indireta do estado da mutation, dificultando o controle

**Solução adotada:**  
Centralizei o controle da ação diretamente no `onSuccess` do `useMutation`, tornando o fluxo mais previsível e desacoplado da UI.

Também passei uma função externa (`onSuccess`) como parâmetro para o hook, permitindo maior reutilização e controle do comportamento após a mutation.

```typescript
export const useCreateTask = (taskId: string | null, options?: { onSuccess?: () => void }) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const mutation = useMutation({
    mutationFn: async () => {
      // requisição...
    },
    onSuccess: () => {
      setTimeout(() => {
        if (options?.onSuccess) options.onSuccess();
        mutation.reset();
      }, 2000);
    }
  })
```

### Recomendar nomes dos Quizzes ao adicionar tarefa

**Problema:**
No modal de criação de estudo, era necessário que o nome do estudo fosse compatível com o do quiz, para evitar inconsistências e desbloquear o quiz.

**Solução adotada:**
Utilizei a tag nativa `datalist` do HTML para fornecer sugestões dinâmicas com base nos dados retornados da API, implementando assim o autocomplete com os nomes dos quizzes.

```typescript
<datalist id="study">
  {data?.map((q, i) => (
    <option key={q.id} value={q.title}></option>
  ))}
</datalist>
```

### Cookie HTTP Only

**Problema:**
Durante a implementação da autenticação, foi adotado o uso de cookies para armazenar o token JWT.
Inicialmente, o token era manipulado tanto no backend quanto no frontend, onde o frontend criava manualmente o cookie utilizando document.cookie.

Isso gerava inconsistências, principalmente no fluxo de login com Google OAuth, como:
- Falha na criação ou envio do cookie em navegadores mais restritivos (ex: Brave)
- Conflito entre cookies com o mesmo nome (token)
- Token não sendo enviado corretamente nas requisições → erro 401 (não autorizado)
- Comportamento inconsistente entre navegadores

Esses problemas ocorrem porque cookies criados no frontend não possuem as mesmas flags de segurança (httpOnly, sameSite, secure)

**Solução adotada:**
Padronizei o fluxo de autenticação para utilizar apenas cookies HTTP Only gerados pelo backend, removendo completamente a manipulação de cookies no frontend, e utilizando credentials include nas requisições.

```typescript
const cookieOptions = {
  httpOnly: true,
  secure: isProduction,
  sameSite: isProduction ? "none" as const : "lax" as const,
  path: "/",
  maxAge: 86400 * 3 * 1000,
};

res.cookie("token", token, cookieOptions);
```


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