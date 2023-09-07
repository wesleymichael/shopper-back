# Shopper- server
API RESTful para Gestão de Preços de Produtos em E-commerce


## Como Executar
Para executar esta aplicação, siga estas etapas:
1. Clone o repositório para sua máquina local.
     ```bash
     git clone https://github.com/wesleymichael/shopper-server.git
     ```

2. Instale as dependências do projeto:
   ```bash
   npm install
   ```
3. Configure as variáveis de ambiente:
   - Faça uma cópia do arquivo `.env.example` e configure a variável de ambiente `.env`

4. Obs: Após preencher as crendenciais necessárias na variável de ambiente, crie o banco de dados mysql local com as mesmas informações inseridas na variável de ambiente e execute o script disponível no projeto `script/database.sql`
 
5. Executando a aplicação:
   ```bash
   npm run dev
   ```

## Stack Principal

- Express
- MySQL
- TypeScript
- Ferramentas de desenvolvimento:
     - Prettier
     - ESLint
     - Nodemon
     - ts-node
     - tsconfig-paths
     - TypeScript-transform-paths

