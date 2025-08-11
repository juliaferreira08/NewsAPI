# Projeto Notícias com Laravel + Vue.js
 
Este projeto consiste em uma aplicação web que exibe notícias da [NewsAPI](https://newsapi.org/) com frontend em Vue.js e backend em Laravel.  
Possui um campo de busca para pesquisar notícias, e as buscas realizadas são salvas em um banco de dados SQL Server.
 
---
 
## Tecnologias usadas
 
- Backend: Laravel (PHP)
- Frontend: Vue.js
- Banco de dados: Microsoft SQL Server
- API externa: NewsAPI (https://newsapi.org/)
 
---
 
## Pré-requisitos
 
- PHP >= 8.2
- Composer
- Node.js >= 14
- NPM ou Yarn
- Microsoft SQL Server (rodando localmente ou remoto)
- Conta e API Key válida no [NewsAPI](https://newsapi.org/)
 
---
 
## Como rodar o projeto localmente
 
1. Clone o repositório
 
```bash
git clone https://github.com/juliaferreira08/NewsAPI.git
cd NOME_DO_REPOSITORIO
 
 
2. Instale as dependências PHP com Composer
composer install
 
 
3. Banco SQL Server:
 
    - É necessário ter o Microsoft SQL Server instalado e rodando, seja localmente ou em um servidor remoto.
    - Certifique-se de instalar o driver ODBC para PHP compatível com o SQL Server, para que o Laravel consiga se conectar ao banco:
    - Para Windows: [Microsoft Drivers for PHP for SQL Server](https://learn.microsoft.com/pt-br/sql/connect/php/microsoft-php-driver-for-sql-server)
    - Para Linux/Mac, seguir as instruções específicas do driver ODBC.
    - No arquivo `.env`, configure as variáveis de conexão, por exemplo:
 
    ```env
        DB_CONNECTION=sqlsrv
        DB_HOST=localhost\MSSQLSERVER01
        DB_PORT=1433
        DB_DATABASE=master
 
 
4. Gere a chave da aplicação Laravel
php artisan key:generate
 
 
5. Rode as migrations para criar as tabelas no banco de dados
php artisan migrate
 
 
6. Instale as dependências do frontend (Vue.js)
npm install
 
 
7. Compile os assets para desenvolvimento
npm run dev
 
 
8. Inicie o servidor local do Laravel
php artisan serve
 
 
9. Abra o navegador e acesse
http://localhost:8000