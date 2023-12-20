<h1>API Express</h1>
<p>Este é um aplicativo Node.js que utiliza o framework Express.js para roteamento e middleware. Além disso, emprega o Prisma, um ORM compatível com PostgreSQL, MySQL, SQLite, SQL Server, MongoDB e CockroachDB.</p>
<h2>Configuração</h2>
<h3>Pré-requisitos</h3>
<ul>
  <li>Node.js</li>
  <li>Prisma</li>
</ul>
<h3>Instalação</h3>
<ol>
  <li>Clone o repositório</li>
  <li>Instale as dependências com <code>npm install</code></li>
  <li>Configure as variáveis de ambiente no arquivo <code>.env</code></li>
</ol>
<h2>Uso</h2>
<p>Inicie o servidor com <code>npm start</code>. O servidor será iniciado na porta 3333.</p>
<h2>Rotas</h2>
<h3>GET /users</h3>
<p>Lista todos os usuários. As senhas dos usuários são excluídas das respostas.</p>
<h3>GET /users/:id</h3>
<p>Obtém detalhes de um usuário específico pelo ID. Se o usuário não for encontrado, retorna um erro 404. A senha do usuário é excluída da resposta.</p>
<h3>POST /users</h3>
<p>Cria um novo usuário. Espera um corpo de solicitação com os seguintes campos:</p>
<ul>
  <li><code>fullName</code>: Nome completo do usuário (mínimo de 3 caracteres)</li>
  <li><code>email</code>: Email do usuário (deve ser um email válido)</li>
  <li><code>password</code>: Senha do usuário (mínimo de 3 caracteres)</li>
  <li><code>password_confirmation</code>: Confirmação da senha (deve ser igual à senha)</li>
  <li><code>cpf</code>: CPF do usuário</li>
  <li><code>phone</code>: Telefone do usuário</li>
  <li><code>zipCode</code>: CEP do usuário</li>
  <li><code>state</code>: Estado do usuário</li>
  <li><code>city</code>: Cidade do usuário</li>
  <li><code>neighborhood</code>: Bairro do usuário</li>
  <li><code>address</code>: Endereço do usuário</li>
  <li><code>number</code>: Número do endereço do usuário</li>
  <li><code>complement</code>: Complemento do endereço do usuário</li>
</ul>
<p>Se o email ou CPF já estiverem registrados, retorna um erro 409. A senha do usuário é excluída da resposta.</p>
<h3>PUT /users/:id</h3>
<p>Atualiza um usuário existente pelo ID. Espera um corpo de solicitação com os mesmos campos que a rota POST /users, mas todos os campos são opcionais. Se o usuário não for encontrado, retorna um erro 404.</p>
<h2>Autenticação</h2>
<p>A autenticação é feita através de tokens JWT. A chave secreta para assinar e verificar os tokens é definida na variável de ambiente <code>JWT_SECRET_KEY</code>.</p>
<h2>Banco de dados</h2>
<p>O aplicativo usa um banco de dados SQLite local. A string de conexão para o banco de dados é definida na variável de ambiente <code>DATABASE_URL</code>.</p>
<h2>Contribuição</h2>
<p>Contribuições são bem-vindas. Para contribuir, por favor, faça um fork do repositório e crie um pull request.</p>
<h2>Licença</h2>
<p>MIT</p>
<h1>Exemplos de Requisições da API</h1>
<h3>Listar todos os usuários (GET /users)</h3>
<p>Esta rota pode requerer autenticação e permissões de administrador.</p>
<pre><div class="bg-black rounded-md"><div class="flex items-center relative text-gray-200 bg-gray-800 dark:bg-token-surface-primary px-4 py-2 text-xs font-sans justify-between rounded-t-md"><span>bash</span><button class="flex gap-1 items-center"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon-sm"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 4C10.8954 4 10 4.89543 10 6H14C14 4.89543 13.1046 4 12 4ZM8.53513 4C9.22675 2.8044 10.5194 2 12 2C13.4806 2 14.7733 2.8044 15.4649 4H17C18.6569 4 20 5.34315 20 7V19C20 20.6569 18.6569 22 17 22H7C5.34315 22 4 20.6569 4 19V7C4 5.34315 5.34315 4 7 4H8.53513ZM8 6H7C6.44772 6 6 6.44772 6 7V19C6 19.5523 6.44772 20 7 20H17C17.5523 20 18 19.5523 18 19V7C18 6.44772 17.5523 6 17 6H16C16 7.10457 15.1046 8 14 8H10C8.89543 8 8 7.10457 8 6Z" fill="currentColor"></path></svg>Copy code</button></div><div class="p-4 overflow-y-auto"><code class="!whitespace-pre hljs language-bash">curl -H <span class="hljs-string">"Authorization: Bearer &lt;seu_token_jwt&gt;"</span> http://localhost:3333/users
</code></div></div></pre>
<h3>Obter detalhes de um usuário (GET /users/:id)</h3>
<p>Esta rota pode requerer autenticação.</p>
<pre><div class="bg-black rounded-md"><div class="flex items-center relative text-gray-200 bg-gray-800 dark:bg-token-surface-primary px-4 py-2 text-xs font-sans justify-between rounded-t-md"><span>bash</span><button class="flex gap-1 items-center"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon-sm"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 4C10.8954 4 10 4.89543 10 6H14C14 4.89543 13.1046 4 12 4ZM8.53513 4C9.22675 2.8044 10.5194 2 12 2C13.4806 2 14.7733 2.8044 15.4649 4H17C18.6569 4 20 5.34315 20 7V19C20 20.6569 18.6569 22 17 22H7C5.34315 22 4 20.6569 4 19V7C4 5.34315 5.34315 4 7 4H8.53513ZM8 6H7C6.44772 6 6 6.44772 6 7V19C6 19.5523 6.44772 20 7 20H17C17.5523 20 18 19.5523 18 19V7C18 6.44772 17.5523 6 17 6H16C16 7.10457 15.1046 8 14 8H10C8.89543 8 8 7.10457 8 6Z" fill="currentColor"></path></svg>Copy code</button></div><div class="p-4 overflow-y-auto"><code class="!whitespace-pre hljs language-bash">curl -H <span class="hljs-string">"Authorization: Bearer &lt;seu_token_jwt&gt;"</span> http://localhost:3333/users/&lt;id_do_usuario&gt;
</code></div></div></pre>
<h3>Criar um novo usuário (POST /users)</h3>
<p>Esta rota não requer autenticação.</p>
<pre><div class="bg-black rounded-md"><div class="flex items-center relative text-gray-200 bg-gray-800 dark:bg-token-surface-primary px-4 py-2 text-xs font-sans justify-between rounded-t-md"><span>bash</span><button class="flex gap-1 items-center"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon-sm"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 4C10.8954 4 10 4.89543 10 6H14C14 4.89543 13.1046 4 12 4ZM8.53513 4C9.22675 2.8044 10.5194 2 12 2C13.4806 2 14.7733 2.8044 15.4649 4H17C18.6569 4 20 5.34315 20 7V19C20 20.6569 18.6569 22 17 22H7C5.34315 22 4 20.6569 4 19V7C4 5.34315 5.34315 4 7 4H8.53513ZM8 6H7C6.44772 6 6 6.44772 6 7V19C6 19.5523 6.44772 20 7 20H17C17.5523 20 18 19.5523 18 19V7C18 6.44772 17.5523 6 17 6H16C16 7.10457 15.1046 8 14 8H10C8.89543 8 8 7.10457 8 6Z" fill="currentColor"></path></svg>Copy code</button></div><div class="p-4 overflow-y-auto"><code class="!whitespace-pre hljs language-bash">curl -X POST -H <span class="hljs-string">"Content-Type: application/json"</span> -d <span class="hljs-string">'{
    "fullName": "&lt;nome_completo&gt;",
    "email": "&lt;email&gt;",
    "password": "&lt;senha&gt;",
    "password_confirmation": "&lt;confirmação_de_senha&gt;",
    "cpf": "&lt;cpf&gt;",
    "phone": "&lt;telefone&gt;",
    "zipCode": "&lt;cep&gt;",
    "state": "&lt;estado&gt;",
    "city": "&lt;cidade&gt;",
    "neighborhood": "&lt;bairro&gt;",
    "address": "&lt;endereço&gt;",
    "number": "&lt;número&gt;",
    "complement": "&lt;complemento&gt;"
}'</span> http://localhost:3333/users
</code></div></div></pre>
<h3>Atualizar um usuário existente (PUT /users/:id)</h3>
<p>Esta rota requer autenticação e pode requerer permissões de administrador.</p>
<pre><div class="bg-black rounded-md"><div class="flex items-center relative text-gray-200 bg-gray-800 dark:bg-token-surface-primary px-4 py-2 text-xs font-sans justify-between rounded-t-md"><span>bash</span><button class="flex gap-1 items-center"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon-sm"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 4C10.8954 4 10 4.89543 10 6H14C14 4.89543 13.1046 4 12 4ZM8.53513 4C9.22675 2.8044 10.5194 2 12 2C13.4806 2 14.7733 2.8044 15.4649 4H17C18.6569 4 20 5.34315 20 7V19C20 20.6569 18.6569 22 17 22H7C5.34315 22 4 20.6569 4 19V7C4 5.34315 5.34315 4 7 4H8.53513ZM8 6H7C6.44772 6 6 6.44772 6 7V19C6 19.5523 6.44772 20 7 20H17C17.5523 20 18 19.5523 18 19V7C18 6.44772 17.5523 6 17 6H16C16 7.10457 15.1046 8 14 8H10C8.89543 8 8 7.10457 8 6Z" fill="currentColor"></path></svg>Copy code</button></div><div class="p-4 overflow-y-auto"><code class="!whitespace-pre hljs language-bash">curl -X PUT -H <span class="hljs-string">"Content-Type: application/json"</span> -H <span class="hljs-string">"Authorization: Bearer &lt;seu_token_jwt&gt;"</span> -d <span class="hljs-string">'{
    "fullName": "&lt;novo_nome_completo&gt;",
    "email": "&lt;novo_email&gt;",
    "cpf": "&lt;novo_cpf&gt;",
    "phone": "&lt;novo_telefone&gt;",
    "zipCode": "&lt;novo_cep&gt;",
    "state": "&lt;novo_estado&gt;",
    "city": "&lt;nova_cidade&gt;",
    "neighborhood": "&lt;novo_bairro&gt;",
    "address": "&lt;novo_endereço&gt;",
    "number": "&lt;novo_número&gt;",
    "complement": "&lt;novo_complemento&gt;"
}'</span> http://localhost:3333/users/&lt;id_do_usuario&gt;
</code></div></div></pre>
<p>Por favor, substitua <code>&lt;seu_token_jwt&gt;</code>, <code>&lt;id_do_usuario&gt;</code> e outros valores entre <code>&lt; &gt;</code> com os valores reais ao fazer as solicitações. As rotas que requerem autenticação precisarão de um token JWT válido no cabeçalho de autorização. As rotas que requerem permissões de administrador só poderão ser acessadas por um usuário com o status de administrador.</p>
</div>
