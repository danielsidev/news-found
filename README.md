News-Found
==============

Um middleware para buscar/ler notícias baseado em estruturas html genéricas e feeds rss.

> *Permite ler de feeds rss e fazer scraping de notícias com alocação dinâmica e genérica de html/css .*

Estrutura de Rotas
==============
#### http://localhost:9001/news
|   Método      |     Caminho     |  Descrição  |
| ------------  | ------------    |------------ |
|   POST        | /findmediarss   | Retorna uma lista de notícias a partir de um feed rss |
|               |                 |             |
|   POST        | /findmediascrap | Retorna uma lista de notícias a partir de uma página html |
|               |                 |             |
|   POST        | /readmedia      | Retorna o título e todo o texto da notícia organizado por parágrafos |



### Instalação

1. Faça o download ou clone do projeto com `git clone https://github.com/danielsidev/news-found.git`
2. Entre na pasta do projeto e instale as dependências com `npm install`
3. Rode a aplicação com `node index.js ou npm start`

### Testando a aplicação

- Importe o json que está dentro da pasta  **testes** para o **Postman**  => [Donwload do Postman Aqui!](https://www.getpostman.com/)
- Teste pelo postman, seguindo a ordem de execução abaixo.

#### Ordem de execução

1 `./findmediarss ou ./findmediascrap`  

2 `Selecione uma url da lista e preencha o valor da proprieda url da rota ./readmedia`

3 `Na página html da notícia procure pelo padrão de formatação html/css da exibição da notícia`

4 `Preencha as propriedades [ element_title ] e [ element_description ] com as tags html acompanhadas das classes `

5 `Acione o send do postman para retornar o título e o texto da matéria. Para as demais matérias, altere somente a url.`

### Exemplo de Requisição

**Consultar feed rss da Exame:**


```
Exemplo (A): Recuperando a lista de notícias de um feed rss

Configure o Content-Type para application/json :

{
  "url":"https://exame.abril.com.br/economia/feed/"
}	  

> ROTA => *send => POST* *http://localhost:9001/news/listmediarss*

> response:
{
    "success": true,
    "err": null,
    "error": false,
    "data": [
        {
            "titulo": "Brasil deve exportar 67 mi t de soja em 2018/19, queda de 2%",
            "descricao": "O volume esperado para o atual ciclo foi revisado para cima, de 66,75 milhões na previsão de outubro<img alt=\"\" border=\"0\" src=\"https://pixel.wp.com/b.gif?host=exame.abril.com.br&#038;blog=114407448&#038;post=2769707&#038;subd=abrilexame&#038;ref=&#038;feed=1\" width=\"1\" height=\"1\" />",
            "url": "https://exame.abril.com.br/economia/brasil-deve-exportar-67-mi-t-de-soja-em-2018-19-queda-de-2/",
            "data_hora": "05/January/2018 04:02 pm"
        },
        {
            "titulo": "Poupança tem menor captação líquida desde 2014, diz BC",
            "descricao": "Iniciativas como a liberação das contas inativas do FGTS e a liberação do PIS/Pasep para idosos aumentaram os recursos disponíveis para os trabalhadores<img alt=\"\" border=\"0\" src=\"https://pixel.wp.com/b.gif?host=exame.abril.com.br&#038;blog=114407448&#038;post=2769699&#038;subd=abrilexame&#038;ref=&#038;feed=1\" width=\"1\" height=\"1\" />",
            "url": "https://exame.abril.com.br/economia/poupanca-tem-menor-captacao-liquida-desde-2014-diz-bc/",
            "data_hora": "05/January/2018 03:53 pm"
        },
        .
        .
        .
  ],
    "message": "Notícias recuperadas com sucesso!"
}
```

**Obtendo a lista de notícias, selecionamos uma delas para ler:**

Exemplo (B): Lendo uma notícia proveniente de uma url da lista do feed rss

```
Configure o Content-Type para application/json :
{
  "page":{
	"url": "https://exame.abril.com.br/economia/brasil-deve-exportar-67-mi-t-de-soja-em-2018-19-queda-de-2/",
	"element_title":"h1.article-title",
	"element_description":".article-content p"
	}
}
> ROTA => *send => POST* *http://localhost:9001/news/readmedia* 		 

> response:

{
    "success": true,
    "err": null,
    "error": false,
    "data": {
        "titulo": "Brasil deve exportar 67 mi t de soja em 2018/19, queda de 2%",
        "descricao": "<p>Soja: Segundo a consultoria, a oferta total de soja deverá subir 1% em 2018/19 (JC Patricio/Getty Images)</p><p>São Paulo – O Brasil deverá exportar 67 milhões de toneladas de soja no ano comercial 2018/19 (fevereiro a janeiro), queda de 2% na comparação com as 68,5 milhões de toneladas estimadas para 2017/18, projetou nesta sexta-feira a consultoria Safras & Mercado.</p><p>O volume esperado para o atual ciclo foi revisado para cima, de 66,75 milhões na previsão de outubro, em razão do “ritmo acima do esperado dos embarques no final de 2017”. As 67 milhões de toneladas consideradas para 2018/19 foram mantidas em relação à projeção anterior.</p><p>Já as previsões de esmagamento foram elevadas para 41,5 milhões de toneladas em 2017/18, de 41 milhões, e para 42,9 milhões em 2018/19, de 42,8 milhões.</p><p>Segundo a consultoria, a oferta total de soja deverá subir 1% em 2018/19, para 118,8 milhões de toneladas. Com a demanda total projetada em 113,1 milhões de toneladas, a expectativa é de que os estoques finais alcancem 5,7 milhões de toneladas, alta de 43%cento ante 2017/18.</p><p>Para o farelo, a produção estimada pela Safras é de 32,65 milhões de toneladas, alta de 3%, com exportações de 14,5 milhões de toneladas (alta de 4%).</p><p>A produção de óleo de soja deverá ficar em 8,48 milhões de toneladas, com embarques de 1,15 milhão de toneladas, queda de 8%.</p><p></p>",
        "url": "https://exame.abril.com.br/economia/brasil-deve-exportar-67-mi-t-de-soja-em-2018-19-queda-de-2/"
    },
    "message": "Notícia recuperada com sucesso!"
}
```
**Para  veículos de mídia que não tenham RSS, utilize  a rota ./findmediascrap  conforme exemplo abaixo:**

Exemplo (C): Lendo uma lista de notícias proveniente de uma url html

```
Configure o Content-Type para application/json :

{
  "page":{
	"url":"http://revistapegn.globo.com/noticia/plantao.html",
	"element_news":"div.materia__item, div.materia__item--horizontal",
	"element_title":"h3.materia__item-titulo",
	"element_description":"h4.materia__item-resumo"
	}
}

> ROTA => *send => POST* *http://localhost:9001/news/listmediascrap*

> response:

{
    "success": true,
    "err": null,
    "error": false,
    "data": [
        {
            "titulo": "Inovação é o caminho",
            "descricao": "Mais do que manter um negócio é preciso reinventá-lo e fazer as coisas de maneira diferente, a fim de ganhar competitividade",
            "url": "http://revistapegn.globo.com/Publicidade/Novo-Citroen-Jumpy/noticia/2018/01/inovacao-e-o-caminho.html",
            "data_hora": "05/01/2018 16:57"
        },
        {
            "titulo": "Pesquisa aponta que população do interior é a mais satisfeita com a vida",
            "descricao": "Os menos satisfeitos são os que vivem nas periferias",
            "url": "http://revistapegn.globo.com/Noticias/noticia/2018/01/pesquisa-aponta-que-populacao-do-interior-e-mais-satisfeita-com-vida.html",
            "data_hora": "05/01/2018 16:57"
        },
        .
        .
        .
  ],
    "message": "Notícias recuperadas com sucesso!"
}

```
### E para ler uma dessas notícias, seguir o mesmo passo a passo do Exemplo(B).
