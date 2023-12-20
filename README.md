## API Express

Este é um aplicativo Node.js que usa o framework Express.js para roteamento e middleware. Ele também usa o Prisma, um ORM para PostgreSQL, MySQL, SQLite, SQL Server, MongoDB e CockroachDB.

## Configuração

### Pré-requisitos

- Node.js
- Prisma

### Instalação

1. Clone o repositório
2. Instale as dependências com `npm install`
3. Configure as variáveis de ambiente no arquivo `.env`

## Uso

Inicie o servidor com `npm run dev`. O servidor começará na porta 3333.

## Configuração

Para testar esse projeto precisa baixar ele na sua máquina e fazer algumas alterações.

Utilizei uma abordagem code first, ou seja, uma vez criado o modelo de dados e configurado o contexto de dados, basta utilizar as migrações. Para isso o comando npm install no terminal instala as dependências e o comando npm start inicia o servidor.

Utilizei para o banco de dados o SQLite, por isso a string de conexão deve ser modificada de acordo com as configurações do seu dispositivo. Para modificá-la basta ir em .env. E adequar o DATABASE_URL.
```json
{
    "DATABASE_URL": "file:./dev.db",
    "JWT_SECRET_KEY": "minhaChaveMuitoSecreta"
}
```

## Tecnologias Utilizadas

A seguir estão as principais tecnologias e ferramentas utilizadas neste projeto, juntamente com suas versões:

- Plataforma: Node.js
- Express.js
- Prisma
- SQLite

## Modelos de Dados

### User

Este modelo é usado para criar ou atualizar um usuário.
```json
{
    "fullName": "string",
    "email": "string",
    "password": "string",
    "password_confirmation": "string",
    "cpf": "string",
    "phone": "string",
    "zipCode": "string",
    "state": "string",
    "city": "string",
    "neighborhood": "string",
    "address": "string",
    "number": "string",
    "complement": "string"
}
```

- fullName (obrigatório, string): O nome completo do usuário.
- email (obrigatório, string): O email do usuário.
- password (obrigatório, string): A senha do usuário.
- password_confirmation (obrigatório, string): A confirmação da senha do usuário.
- cpf (obrigatório, string): O CPF do usuário.
- phone (obrigatório, string): O telefone do usuário.
- zipCode (obrigatório, string): O CEP do usuário.
- state (obrigatório, string): O estado do usuário.
- city (obrigatório, string): A cidade do usuário.
- neighborhood (obrigatório, string): O bairro do usuário.
- address (obrigatório, string): O endereço do usuário.
- number (obrigatório, string): O número do endereço do usuário.
- complement (obrigatório, string): O complemento do endereço do usuário.

## Endpoints

### Listar Usuários
URL: /users

Método: GET

Descrição: Retorna uma lista de todos os usuários disponíveis.

Exemplo de Solicitação:
```http
GET http://localhost:3333/users
```

Resposta de Exemplo:
```json
[
    {
        "id": "f23553cc-bbe4-4a40-b8f9-d7ea9b9cc5f2",
        "fullName": "admin",
        "email": "admin@admin.com",
        "isAdmin": true,
        "created_at": "2023-12-12T23:14:36.855Z",
        "updated_at": "2023-12-12T23:16:27.903Z"
    },
    {
        "id": "f23553cc-bbe4-4a40-b8f9-d7ea9b9cc5f3",
        "fullName": "user",
        "email": "user@user.com",
        "isAdmin": false,
        "created_at": "2023-12-12T23:14:36.855Z",
        "updated_at": "2023-12-12T23:16:27.903Z"
    }
]
```

### Criar Usuário
URL: /users

Método: POST

Descrição: Cria um novo usuário.

Corpo da Solicitação:
```json
{
    "fullName": "Novo Usuário",
    "email": "novo@usuario.com",
    "password": "senha123",
    "password_confirmation": "senha123",
    "cpf": "123.456.789-00",
    "phone": "(11) 98765-4321",
    "zipCode": "12345-678",
    "state": "Estado",
    "city": "Cidade",
    "neighborhood": "Bairro",
    "address": "Endereço",
    "number": "123",
    "complement": "Complemento"
}
```
Exemplo de Solicitação:
```http
POST http://localhost:3333/users
Content-Type: application/json
```

```json
{
    "fullName": "Novo Usuário",
    "email": "novo@usuario.com",
    "password": "senha123",
    "password_confirmation": "senha123",
    "cpf": "123.456.789-00",
    "phone": "(11) 98765-4321",
    "zipCode": "12345-678",
    "state": "Estado",
    "city": "Cidade",
    "neighborhood": "Bairro",
    "address": "Endereço",
    "number": "123",
    "complement": "Complemento"
}
```

Resposta de Exemplo:
```json
{
    "id": "f23553cc-bbe4-4a40-b8f9-d7ea9b9cc5f4",
    "fullName": "Novo Usuário",
    "email": "novo@usuario.com",
    "isAdmin": false,
    "created_at": "2023-12-12T23:14:36.855Z",
    "updated_at": "2023-12-12T23:16:27.903Z"
}
```

### Atualizar Usuário
URL: /users/:id

Método: PUT

Descrição: Atualiza um usuário existente pelo seu ID.

Corpo da Solicitação:

```json
{
    "fullName": "Usuário Atualizado",
    "email": "atualizado@usuario.com",
    "cpf": "987.654.321-00",
    "phone": "(11) 12345-6789",
    "zipCode": "87654-321",
    "state": "Novo Estado",
    "city": "Nova Cidade",
    "neighborhood": "Novo Bairro",
    "address": "Novo Endereço",
    "number": "321",
    "complement": "Novo Complemento"
}
```

Exemplo de Solicitação:
```http
PUT http://localhost:3333/users/f23553cc-bbe4-4a40-b8f9-d7ea9b9cc5f4
Content-Type: application/json
```

```json
{
    "fullName": "Usuário Atualizado",
    "email": "atualizado@usuario.com",
    "cpf": "987.654.321-00",
    "phone": "(11) 12345-6789",
    "zipCode": "87654-321",
    "state": "Novo Estado",
    "city": "Nova Cidade",
    "neighborhood": "Novo Bairro",
    "address": "Novo Endereço",
    "number": "321",
    "complement": "Novo Complemento"
}
```

Resposta de Exemplo:

```json
{
    "id": "f23553cc-bbe4-4a40-b8f9-d7ea9b9cc5f4",
    "fullName": "Usuário Atualizado",
    "email": "atualizado@usuario.com",
    "isAdmin": false,
    "created_at": "2023-12-12T23:14:36.855Z",
    "updated_at": "2023-12-12T23:16:27.903Z"
}
```

## Endpoints de Autenticação

### Criar Autenticação
Realiza a autenticação do usuário e fornece um token de acesso.

#### URL: /sessions
#### Método: POST
#### Descrição: Cria uma nova autenticação.

**Corpo da Solicitação:**
```json
{
    "email": "usuario@dominio.com",
    "password": "senha123"
}
```

#### Exemplo de Solicitação:

```http
POST http://localhost:3333/sessions
Content-Type: application/json
```

```json
{
    "email": "usuario@dominio.com",
    "password": "senha123"
}
```

#### Exemplo de Resposta:

```json
{
    "token": "seuTokenDeAcesso",
    "user": "Nome do Usuário",
    "isAdmin": false
}
```

## Endpoints de Alimentos

### Listar Alimentos
Retorna uma lista de todos os alimentos disponíveis.

#### URL: /foods/list
#### Método: GET
#### Descrição: Retorna uma lista de todos os alimentos disponíveis.

**Exemplo de Solicitação:**
```http
GET http://localhost:3333/foods/list
```

**Exemplo de Resposta:**
```json
[
    {
        "id": "f23553cc-bbe4-4a40-b8f9-d7ea9b9cc5f2",
        "name": "Hamburguer",
        "description": "Delicioso hamburguer com queijo",
        "price": 12.99,
        "imgUrl": "http://example.com/hamburguer.jpg",
        "created_at": "2023-12-12T23:14:36.855Z",
        "updated_at": "2023-12-12T23:16:27.903Z"
    },
    {
        "id": "f23553cc-bbe4-4a40-b8f9-d7ea9b9cc5f3",
        "name": "Pizza",
        "description": "Pizza quatro queijos",
        "price": 19.99,
        "imgUrl": "http://example.com/pizza.jpg",
        "created_at": "2023-12-12T23:14:36.855Z",
        "updated_at": "2023-12-12T23:16:27.903Z"
    }
]
```

**Códigos de Resposta:**
- 200 OK: Lista de alimentos retornada com sucesso.

### Detalhes do Alimento
Retorna os detalhes de um alimento específico.

#### URL: /foods/show/:id
#### Método: GET
#### Descrição: Retorna os detalhes de um alimento específico.

**Parâmetros de URL:**
- `id` (string): ID do alimento.

**Exemplo de Solicitação:**
```http
GET http://localhost:3333/foods/show/f23553cc-bbe4-4a40-b8f9-d7ea9b9cc5f2
```

**Exemplo de Resposta:**
```json
{
    "id": "f23553cc-bbe4-4a40-b8f9-d7ea9b9cc5f2",
    "name": "Hamburguer",
    "description": "Delicioso hamburguer com queijo",
    "price": 12.99,
    "imgUrl": "http://example.com/hamburguer.jpg",
    "created_at": "2023-12-12T23:14:36.855Z",
    "updated_at": "2023-12-12T23:16:27.903Z"
}
```

**Códigos de Resposta:**
- 200 OK: Detalhes do alimento retornados com sucesso.
- 404 Not Found: Alimento não encontrado.

### Criar Alimento (Requer Autenticação de Administrador)
Cria um novo alimento.

#### URL: /foods/create
#### Método: POST
#### Descrição: Cria um novo alimento.

**Corpo da Solicitação:**
```json
{
    "name": "Novo Alimento",
    "description": "Descrição do novo alimento",
    "price": 15.99,
    "imgUrl": "http://example.com/novo-alimento.jpg"
}
```

**Exemplo de Solicitação:**
```http
POST http://localhost:3333/foods/create
Content-Type: application/json
Authorization: Bearer seuTokenDeAcesso

{
    "name": "Novo Alimento",
    "description": "Descrição do novo alimento",
    "price": 15.99,
    "imgUrl": "http://example.com/novo-alimento.jpg"
}
```

**Exemplo de Resposta:**
```json
{
    "id": "f23553cc-bbe4-4a40-b8f9-d7ea9b9cc5f4",
    "name": "Novo Alimento",
    "description": "Descrição do novo alimento",
    "price": 15.99,
    "imgUrl": "http://example.com/novo-alimento.jpg",
    "created_at": "2023-12-12T23:14:36.855Z",
    "updated_at": "2023-12-12T23:16:27.903Z"
}
```

**Códigos de Resposta:**
- 200 OK: Alimento criado com sucesso.
- 400 Bad Request: Erros de validação no corpo da solicitação.
- 401 Unauthorized: Token de acesso ausente ou inválido.
- 403 Forbidden: Apenas administradores podem criar novos alimentos.

### Atualizar Alimento (Requer Autenticação de Administrador)
Atualiza um alimento existente pelo seu ID.

#### URL: /foods/update/:id
#### Método: PUT
#### Descrição: Atualiza um alimento existente pelo seu ID.

**Parâmetros de URL:**
- `id` (string): ID do alimento.

**Corpo da Solicitação:**
```json
{
    "name": "Alimento Atualizado",
    "description": "Nova descrição do alimento",
    "price": 18.99,
    "imgUrl": "http://example.com/alimento-atualizado.jpg"
}
```

**Exemplo de Solicitação:**
```http
PUT http://localhost:3333/foods/update/f23553cc-bbe4-4a40-b8f9-d7ea9b9cc5f4
Content-Type: application/json
Authorization: Bearer seuTokenDeAcesso

{
    "name": "Alimento Atualizado",
    "description": "Nova descrição do alimento",
    "price": 18.99,
    "imgUrl": "http://example.com/alimento-atualizado.jpg"
}
```

**Exemplo de Resposta:**
```json
{
    "id": "f23553cc-bbe4-4a40-b8f9-d7ea9b9cc5f4",
    "name": "Alimento Atualizado",
    "description": "Nova descrição do alimento",
    "price": 18.99,
    "imgUrl": "http://example.com/alimento-atualizado.jpg",
    "created_at": "2023-12-12T23:14:36.855Z",
    "updated_at": "2023-12-12T23:16:27.903Z"
}
```

**Códigos de Resposta:**
- 200 OK: Alimento atualizado com sucesso.
- 400 Bad Request: Erros de validação no corpo da solicitação.
- 401 Unauthorized: Token de acesso ausente ou inválido

.
- 403 Forbidden: Apenas administradores podem atualizar alimentos.
- 404 Not Found: Alimento não encontrado.

### Deletar Alimento (Requer Autenticação de Administrador)
Deleta um alimento existente pelo seu ID.

#### URL: /foods/delete/:id
#### Método: DELETE
#### Descrição: Deleta um alimento existente pelo seu ID.

**Parâmetros de URL:**
- `id` (string): ID do alimento.

**Exemplo de Solicitação:**
```http
DELETE http://localhost:3333/foods/delete/f23553cc-bbe4-4a40-b8f9-d7ea9b9cc5f4
Authorization: Bearer seuTokenDeAcesso
```

**Exemplo de Resposta:**
```json
{
    "id": "f23553cc-bbe4-4a40-b8f9-d7ea9b9cc5f4",
    "name": "Alimento Deletado",
    "description": "Descrição do alimento deletado",
    "price": 21.99,
    "imgUrl": "http://example.com/alimento-deletado.jpg",
    "created_at": "2023-12-12T23:14:36.855Z",
    "updated_at": "2023-12-12T23:16:27.903Z"
}
```

**Códigos de Resposta:**
- 200 OK: Alimento deletado com sucesso.
- 401 Unauthorized: Token de acesso ausente ou inválido.
- 403 Forbidden: Apenas administradores podem deletar alimentos.
```
