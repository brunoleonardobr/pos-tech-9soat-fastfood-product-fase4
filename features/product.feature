Feature: Criação do produto
    Scenario: Criar um novo produto
        Given Tenho um produto com descrição "Sanduíche", preço 10 e categoria "LANCHE"
        When Quando crio o Produto
        Then Então o reusultado deve ser "Produto criado com sucesso"
        