import tabela2024 from "./tabela.js";
import express from 'express'

const app = express();

app.get('/', (requisicao, resposta) => {
    resposta.status(200).send(tabela2024);
});

app.get('/:sigla', (requisicao, resposta) => {
    const siglaInformada = requisicao.params.sigla.toUpperCase();
    const time = tabela2024.find(infoTime => infoTime.sigla === siglaInformada);
    if (!time) { //undefined se comportal como falso sempre que definimos ele como boolean
        resposta.status(404).send('Não existe na série A do brasileirão um time com a sigla informada');
        return;
    }
    resposta.status(200).send(time);
});

app.listen(300, () => console.log('servidor rodando com sucesso'));