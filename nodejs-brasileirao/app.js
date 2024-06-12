import tabela2024 from "./tabela.js";
import express from 'express'

const app = express();

app.use(express.json());

app.get('/', (requisicao, resposta) => {
    resposta.status(200).send(tabela2024);
});

app.get('/:sigla', (requisicao, resposta) => {
    const siglaInformada = requisicao.params.sigla.toUpperCase();
    const time = tabela2024.find(infoTime => infoTime.sigla === siglaInformada);
    if (!time) { //undefined se comporta como falso sempre que definimos ele como boolean
        resposta.status(404).send(
            'Não existe na série A do brasileirão um time com a sigla informada'
        );
        return;
    }
    resposta.status(200).send(time);
});

app.put('/:sigla', (req, res) => {
    const siglaInformada = req.params.sigla.toUpperCase();
    const timeSelecionado = tabela2024.find((t) => t.sigla === siglaInformada);
    if (!timeSelecionado) {
        res.status(404).send('Não existe na Séria A do brasileirão um time com a sigla informada');
        return;
    }
    const campos = Object.keys(req.body);
    for (let campo of campos) {
        timeSelecionado[campo] = req.body[campo]
    }
    res.status(200).send(timeSelecionado);
});

app.post('/', (req, res) => {
    const novoTime = req.body;
    tabela2024.push(novoTime);
    res.status(200).send(novoTime);
});

app.delete('/:sigla', (req, res) => {
    const siglaInformada = req.params.sigla.toUpperCase();
    const indiceTimeSelecionado = tabela2024.findIndex((t) => t.sigla === siglaInformada);
    if (indiceTimeSelecionado === -1) {
        res.status(404).send('Não existe na Séria A do brasileirão um time com a sigla informada');
        return;
    }
    const timeRemovido = tabela2024.splice(indiceTimeSelecionado, 1); //splice remove elemento indicado
    res.status(200).send(timeRemovido);
})

app.listen(300, () => console.log('servidor rodando com sucesso'));