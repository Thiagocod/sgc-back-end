
# SGC back-end

SGC(Software Grocery Cheaper): Pesquisa e comparação de ofertas de produtos em supermercados.

Esse projeto tem como intuito fazer a comunicação do servidor em express com o banco de dados.


## Regras de negócio
1. Requisitos funcionais:
   - Crud das seguintes entidades:
     - User
     - Business
     - Categories
     - clientnotesProductsprice
     - fisicadresses
     - locationgeografic
     - Products
     - Regions
   - Get das seguintes Views:
      - note_view
      - product_view
      - showbusiness_view
      - showuser_view
2. Requisitos não funcionais:
   - apenas um usuário por e-mail
   - listar apenas registros que não tenham uma data de remoção
   - realizar crud em até 900 ms
        
## Melhorias

Durante a construção foi reestruturado todo banco de dados e estrutura de pasta conforme boas sugestão de boas práticas.


## Uso/Exemplos

```typescript

//react.js @typescript

import axios from 'axios';

    export function ListNotesUser (id: string ) {
    const params = {
        idUser: id
    }
    const [data, setData] = useState<productNote[]>([]);
            axios.get<productNote[]>('http://localhost:3001/api/data/user/notes', { params })
                .then(response => {
                    setData(response.data);
                })
                .catch(error => {
                    console.error('Ocorreu um erro ao buscar os dados!', error);
                });
    return data;
}

```


## Stack utilizada

**Back-end:** Node, Express.


## Autor

- [@Thiagocod](https://www.github.com/Thiagocod)