### Passo a Passo

1. **Instalação das Dependências:**
   Para começar, execute o comando abaixo para instalar todas as dependências necessárias:
   ```bash
   npm install
   ```

2. **Migração do Banco de Dados:**
   Utilize o seguinte comando para criar o banco de dados com as migrações necessárias:
   ```bash
   npx prisma migrate dev --name init
   ```

3. **Configuração do Arquivo '.env':**
   Crie um arquivo chamado ***'.env'*** na raiz do seu projeto e insira suas credenciais. Substitua "SuaAPIKeyAqui" pela sua chave de API e "URLdoSeuBancoDeDadosAqui" pelo link do seu banco de dados. Exemplo:
   ```plaintext
   API_KEY=SuaAPIKeyAqui
   DATABASE_URL=URLdoSeuBancoDeDadosAqui
   ```

4. **Execução da Aplicação:**
   Por fim, inicie a aplicação com o seguinte comando:
   ```bash
   npm run dev
   ```
