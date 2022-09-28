# <a href="https://passageiro.alissoncoelho.repl.co/">Passageiro</a>

### Autor

[Alisson Henrique Coelho](https://replit.com/@AlissonCoelho/Passageiro)

## Descrição

O aplicativo `Passageiro` é um gerenciador de viagens. Com ele é possível cadastrar viagens e se planejar. Por exemplo, se você quer ir para Europa, mas ainda não sabe quais cidades visitar e quantos dias em cada cidade irá ficar, então você pode cadastrar cada cidade desejada, colocando o destino, data de inicio e quantos dias irá ficar, e ainda você pode descrever o que você quer fazer em cada dia que passará no destino.

## Telas

O `Passageiro` contém 3 telas:

1. Minhas Viagens - **Principal**
   - Funções:
     - Exibir Viagens cadastradas
     - Chamar tela de cadastrar viagens (botão com figura de +)
     - Chamar Tela de Edição (botão com figura de lapis)
     - Deletar alguma viagem (botão com figura de lixeira)
     - Chamar tela de Descrição de dias
     - Ordenar pelo Destino (Clicar no cabeçalho 'Destino')
     - Ordenar pelo Início (Clicar no cabeçalho 'Início')
     - Objeto de exibição da quatidade de viagens cadastradas (ao clicar chama a tela principal de qualquer outra tela)
   - ![Principal](/Images/TelaViagens.png)
2. Adicionar Viagem
   - Funções:
     - Cadastrar Viagem (unico campo obrigátorio é o Destino)
     - Cancelar cadastro de viagem (volta para tela principal)
   - ![Adicionar](/Images/TelaCadastrar.png)
3. Editar Viagens
   - Funções:
     - Editar viagem
     - Cancelar edição de viagem (volta para tela principal)

- ![Editar](/Images/TelaEditar.png)

4. Descrição dos dias
   - Funções:
     - O usuário pode descrever o que planeja para cada dia da viagem
     - Salvar as alteração (volta para tela principal)
   - ![Dias](/Images/TelaDias.png)

## Estrutura dos Dados

Para criar o `Passageiro` foi necessário utilizar um vetor de objetos com os seguintes atributos:

- id - Tipo String
- Destino - Tipo String
- Inicio - Tipo String (mas corresponde a uma data)
- Dias - Tipo vetor dinâmico de string

Segue um exemplo de um objeto correspondete a uma posição do vetor:
```
id: "8694073441543624"
Destino: "Paris"
Inicio: "2023-01-23"
Dias: ["Visitar torre Torre eiffel", "Museu de Louvre", "Arco do triunfo ", "", ""]
```
