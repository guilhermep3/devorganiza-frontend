readme2.md

# DevOrganiza

<img width="1366" height="768" alt="Image" src="https://github.com/user-attachments/assets/a196c97f-1ff0-4552-91b9-c5b081178c18" />

A DevOrganiza é um web-app Full-stack para desenvolvedores organizarem seus estudos e tarefas, acompanhar seu desempenho e praticar com quizzes.

Acesse aqui: <a href="https://devorganiza.vercel.app/" target="_blank">Link DevOrganiza</a>


## 🎯 Objetivo do projeto

- Organizar e facilitar os estudos dos Devs.
- Praticar conhecimentos com quiz.
- Analisar seu desempenho no dashboard.
- Demonstrar domínio em Desenvolvimento Web com Next.js e Node.js.
- Simular um ambiente próximo ao mundo real / produção.
- Consumir uma API REST organizada, escalável e validada.
- Trabalhar com estado global, requisições, formulários e types complexos.


## 🚀 Funcionalidades Principais

- Cadastro e login de usuários.
- Upload de imagem de perfil (Cloudinary).
- Autenticação com JWT e Google OAuth.
- Organização de estudos por temas, com criação de tarefas vinculadas.
- Sistema de quizzes desbloqueáveis conforme os estudos cadastrados.
- Anotações com texto livre, listas, e tabelas separada por blocos.
- Dashboard com visualização de desempenho através de gráficos.
- Controle de tema claro, escuro, e do sistema.


## 🏗️ Arquitetura

- **/components**: Componentes
- **/components/layout**: Componentes de sessões, de layout
- **/api**: Hooks de acesso a api
- **/context**: Contexto para dados da aplicação
- **/data**: Dados da aplicação, como links de navegação, textos da home
- **/schema**: Esquemas do Zod para validar dados
- **/store**: Zustand para persistência de dados globais
- **/types**: Tipagem de dados
- **/utils**: Funções úteis


## 🧩 Tecnologias Utilizadas

- **Next.js**: Framework React com renderização híbrida
- **React**: Construção de interfaces baseadas em componentes
- **TypeScript**: Superset do JavaScript com tipagem estática
- **Tailwind**: Framework para estilização utilitária e responsiva
- **Next Themes**: Dark e light mode.
- **Lucide React**: Biblioteca de ícones SVG para React
- **Motion**: Biblioteca para animações e transições fluidas
- **Recharts**: Visualização de dados e gráficos
- **React Hook Form**: Gerenciamento de formulários
- **Tanstack Query**: Cachê, e controle de requisições
- **Zod**: Validação de dados
- **Zustand**: Gerenciamento de estado global


## 🧠 Regras de Negócio

- Um quiz só é desbloqueado quando existe um estudo com o mesmo nome cadastrado pelo usuário
- O progresso do usuário é calculado com base nas tarefas concluídas
- Tarefas podem ser marcadas como concluídas e atualizam o progresso em tempo real
- Cada estudo pode conter múltiplas tarefas associadas
- Links externos podem ser adicionados às tarefas como material de apoio



## ⚠️ Desafios Técnicos

### Sincronização de UI após mutações (Modal + Refetch)

**Problema:**
Fechar o modal e atualizar os dados da interface após uma ação.

Inicialmente, isso foi feito utilizando `useEffect` com dependência em `isSuccess` da mutation.
Porém essa abordagem gerava erros, como o modal não fechar sempre e o refetch não acontecer.

**Solução adotada:**  
Centralizei o controle da ação diretamente no `onSuccess` do `useMutation`, tornando o fluxo mais previsível e desacoplado da UI.

Criei uma função externa (`onSuccess`) como parâmetro para o hook, 

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

  // uso do hook:
  useCreateTask(studyId, {
    onSuccess: () => {
      setIsOpen(false);
      setTitle('');
      setLink('');
      refetch();
    },
  });
```

### Recomendar nomes dos Quizzes ao adicionar tarefa

**Problema:**
Mostrar os nomes dos quizzes no input de nome de estudo.

**Solução adotada:**
Utilizei a tag nativa `datalist` do HTML para fornecer sugestões dinâmicas com base nos dados retornados da API, implementando assim o autocomplete com os nomes dos quizzes.

```typescript
<datalist id="study">
  {data?.map((q, i) => (
    <option key={q.id} value={q.title}></option>
  ))}
</datalist>
```


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