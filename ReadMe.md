# Layers DDD

## Domain 
Camada onde se tem a logica da aplicação , vamos ter Entity , Aggregate , ValueObjects , ela foi gerada dentro de src/Core/Invoice/Domain e também é uma camada totalmente sem relação com Framework ( NestJs )

- Contracts = Parte de contrato das command and queries , totalmente tipadas para o Mongo
- Enums  = Reuni todos os Enums da entidade de Invoice 
- Interfaces = Toda a parte de tipagem relacionado a classe Invoice ( Entity )
- Mocks = Parte de mocks para fazer testes unit e e2e 

## Application
Camada onde se tem os use-cases da aplicação . Ela foi gerada dentro de src/Core/Invoice/Application/ , dentro demos a divisão em uma lógica de CQRS ( Command e Query ) .

## Infra
Camada que lida com toda a parte de apis , integração de dados , resumindo onde vão entrar os MongoDb/Postgree e Nest . Ela fica na parte de src/Modules/Invoices e src/Modules/Infra ( parte relacionada ao Mongo )

- Controllers = Parte de controllers do nest
- Handlers = Implementação da parte de CommandHandlers e QueryHandlers
- Injection = Injeção de dependencia do Nest