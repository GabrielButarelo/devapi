# Teste Integração - DEVAPI

### Sobre O Projeto

Esse projeto tem como objetivo realizar a integração de uma planilha do `Google Sheets` com uma conta do crm `HubSpot`, na planilha deve conter os dados de cadastro de um novo contato dentro do crm, esses dados são validados e enviados para a plataforma, onde o cadastro é realizado de forma automática.

### Colunas da Planilha

    | Nome da Empresa | Nome Completo | Email | Telefone | Website |

- O campo de email é validado para que seja aceito apenas emails corporativos (que sejam similares ao dominio do website).
- Ao realizar o cadastro no crm apenas o primeiro e ultimo nome são enviados para a plataforma.

### Tecnologias & Bibliotecas Utilizadas

- node (v18.2.0)
- dotenv
- pino
- google-spreadsheet
- @hubspot/api-client
- eslint
- prettier
- jest

### Rodando O Projeto

Para rodar o projeto é necessário clonar o repositório, instalar as dependências com `npm i`, configurar o arquivo `.env` conforme as informações do próximo tópico e rodar o comando `npm start` que ao executa-lo irá iniciar o processo de integração dos contatos.

### Arquivo .env

    -- API Google Sheets --
    SHEET_API_CLIENT_EMAIL=
    SHEET_API_PRIVATE_KEY=

    -- API HubSpot --
    HUBSPOT_TOKEN=

    -- Google Sheet Id --
    SHEET_ID=
