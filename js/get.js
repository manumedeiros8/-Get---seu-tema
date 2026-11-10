const resposta = document.querySelector('#resposta');
const lista = document.querySelector('#lista-filmes');
const modelo = document.querySelector('#modelo-filme');

const apiKey = 'cv_kd9CBANbTDlFH3IG_d8g-MvPIJZ0r4Ep8x_Rat7Gzyk8zGRdmz0HFBJzjZ_ddFGj';

const apiUrl = 'https://api-ds.codeverse.dev.br/api/filmes';

async function buscarFilmes() {
    
    resposta.textContent = 'Carregando filmes...';

    try {
        
        const retorno = await fetch(apiUrl, {
            method: 'GET',
            headers: { 'x-api-key': apiKey },
        });
       
        if (!retorno.ok) {
            throw new Error('Não foi possível carregar os filmes.');
        }
        
        const resultado = await retorno.json();
        for (const filme of resultado.data) {
          
            const card = modelo.content.cloneNode(true);

            card.querySelector('.nome').textContent = filme.title;
            card.querySelector('.genero').textContent = filme.genero;
            card.querySelector('.ano').textContent = filme.ano;
            card.querySelector('.diretor').textContent = filme.diretor;
            card.querySelector('.nota').textContent = filme.nota;

            const imagem = card.querySelector('.imagem-filme');

            if (filme.imageUrl) {
                imagem.src = filme.imageUrl;
                imagem.alt = filme.title;

                imagem.onerror = () => imagem.remove();
            } else {
                imagem.remove();
            }

            lista.appendChild(card);
            resposta.textContent = '';
        }
    } catch (error) {
        console.error(error);
        resposta.textContent = 'Não foi possível carregar os filmes. Tente novamente!';
    }
}

buscarFilmes();