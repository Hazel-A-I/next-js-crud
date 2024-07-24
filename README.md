
# Crud NEXT + Prisma

Projeto realizado para a avaliação prática de uma entrevista, 1 semana de prazo.

#### Tecnologias aprendidas:
- Prisma
- Aprofundamento no Next (eu o utilizava apenas para estilização e SEO antes)
- 

## Requisitos

- Node.js instalado e atualizado
- IDEs como VScode (opcional) 
Entre na pasta pelo terminal e execute:
```
    npm i
```

## Próximas etapas:

1. Instalar o MySQL:

Baixe o MySQL Server da página oficial: https://dev.mysql.com/downloads/installer/
Escolha a versão compatível com seu sistema operacional e siga as instruções de instalação.
Durante a instalação, configure o MySQL para iniciar automaticamente e defina uma senha segura para o usuário root. (IMPORTANTE)

2. Criar Banco de Dados:

Após instalar o MySQL, acesse o prompt de comando e conecte-se ao servidor MySQL usando o comando:

```bash 
    mysql -u root -p
```

E insira a senha cadastrada na instalação.

Assim que estiver conectado, crie o banco de dados que você usará com o Prisma:
```sql
    CREATE DATABASE nome_do_banco;
```
## Variável de ambiente (dotenv, .env)

Para rodar o projeto precisamos dessa variável de ambiente num arquivo .env que necessita ser criado na pasta principal do repositório (não é a src/)

```
    DATABASE_URL=mysql://SEUNOME:SUASENHA@localhost:PORTMYSQL/NOMEDOBANCO
```
Se preferir pode fazer um usuário específico pra acessar esse banco.


## Prisma

Agora vamos configurar o prisma:

- Os dados necessários (migrations e seed) já estão préviamente prontos.
Você vai precisar executar:

```
    npx prisma migrate dev
```

Aparentemente há um comando para deploy também, mas como o foco é em localhost eu acabei não usando.

- Agora, para colocar dados iniciais no banco:

```
    npx prisma db seed
```



## Rodar o projeto:

- Muito bom! Agora podemos testar a aplicação (perdão pela falta de estilização e checagem de erros, a primeira implementação, com route handlers, teve problemas e consumiu o tempo que sobraria pra fazer tratamento de erros. :p)

```
    npm run dev
```

# Considerações finais

Não pude implementar o que eu desejava, se desejar ver coisas que marquei para implementar, você pode acessar a aba de projetos do repositório, e ver um Kanban que montei para me organizar nesse projeto! (maioria foi para o tópico de post-deadline pois precisa de revisão)
