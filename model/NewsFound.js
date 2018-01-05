const request = require('request');
const cheerio = require('cheerio');
const feed    = require('rss-to-json');
class NewsFound{
    constructor(){
    }
    getNewsRss(url, callback) {
      feed.load(url, function(err, rss){
              if(err){
                  console.log("ERRO => "+err);
              }else{
                console.log(rss);
                //res.json( { success:resposta,noticias:rss} );
                let news = rss;
                callback(err, news);
              }

         });
    }

    getNewsScraper(page, callback){
          request(page.url, function(err, res, body){
              if(err){
                  console.log('Erro => '+err);
              } else{
                  let $ = cheerio.load(body);
                  let items       = [];
                  let title       = "";
                  let description = "";
                  let link        = "";
                  /*Example => page{ 'element_news':'div.materia__item, div.materia__item--horizontal'}*/
                  $(page.element_news).each(function(){
                      let item          = {"title":"","description":"", "url":"", "link":"" };
                       item.link        = $(this).find("a").attr("href");
                       item.url         = item.link;
                       /* Example => page{ 'element_title':'h3.materia__item-titulo'}*/
                       item.title       = $(this).find(page.element_title).text().trim();
                       /* Example => page{ 'element_description':'h4.materia__item-resumo'}*/
                       item.description = $(this).find(page.element_description).text().trim();
                       items.push(item);
                  });
                  let materias = {"items":items};
                  callback(err, materias);
              }
          });
      }
      getNews(page, callback){
           /* {"page":{"url":"", "element_title":"", "element_description":""}} */
           request(page.url, function(err, res, body){
             if(err){
               console.log('Erro => '+err);
               return new Error("Não foi possível ler a matéria. Tente mais tarde, por favor.")
             }else{
             let $ = cheerio.load(body);
             let classeTitulo  = page.element_title;
             console.log("Classe do Título: "+classeTitulo);
             classeTitulo = (classeTitulo=="h1.intena__titulo")?"h1.interna__titulo":classeTitulo;
             let titulo = "";
             titulo = $(classeTitulo).text().trim();
             let classDescricao = page.element_description;
             let descricao="";
             $(classDescricao).each(function(){
               descricao+="<p>"+$(this).text().trim()+"</p>";
             });
             let materia = {"titulo":titulo,"descricao":descricao, "url":page.url};
             callback(err, materia);
             }
           });
        }
}

module.exports.NewsFound = NewsFound;
