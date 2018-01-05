let express          = require('express');
let moment           = require('moment');
let {NewsFound}      = require('../model/NewsFound');
let router           = express();
let control          = new NewsFound();
/* Faz a leitura do feed rss da url espcificada recuperando o xml
   e convertendo em um json para consumo por um cliente.*/
 router.post('/listmediarss',function(req,res,next){
     console.log( JSON.stringify(req.body));
       let url = req.body.url;
       if(url.length>0 || url!==""){
       control.getNewsRss(url, function(err,news){
         if(err){
           console.log("ERRO: "+JSON.stringify(err));
           res.json( {"success":false, "err":err , "error":true, "data": null, message:"Não foi possível consultar as notícias. Tente mais tarde." } );
         }else{
           let count = news.items.length;
             if(count>0){
               let News = [];
               for(let n=0; n<count ; n++){
                     let article = {
                       "titulo":news.items[n].title,
                       "descricao":news.items[n].description,
                       "url":(news.items[n].url==undefined || news.items[n].url=="")?news.items[n].link:news.items[n].url,
                       "data_hora":moment(news.items[n].created).format("DD/MM/YYYY HH:mm")
                     };
                     News.push(article)
               }
               res.json( {"success":true, "err":null , "error":false, "data":News, message:"Notícias recuperadas com sucesso!" } );
             }else{
               console.log("Count: "+count+" - Não foram encontradas notícias.");
               res.json( {"success":true, "err":null ,"error":false, "data": null, "message":"A consulta retornou [ "+count+" ] notícias." } );
             }
         }
       });
     }else{
       console.log("ERRO: URL não foi informada corretamente.");
       res.json( {"success":false, "err":"URL não foi informada corretamente." , "error":true, "data": null, "message":"Não foi possível consultar as notícias. Tente mais tarde." } );
     }
  });
  /* Faz o scraping da página html informada, retornando os dados das notícias
     de acordo com os elementos html com classes css especificadas. */
  router.post('/listmediascrap',function(req,res,next){
     /* {"page":{"url":"", "element_news":"", "element_title":"", "element_description":""}} */
        let page = req.body.page;
        if(page.url.length>0 || page.url!==""){
        control.getNewsScraper(page, function(err,news){
          if(err){
            console.log("ERRO: "+JSON.stringify(err));
            res.json( {"success":false, "err":err , "error":true, "data": null, message:"Não foi possível consultar as notícias. Tente mais tarde." } );
          }else{
            let count = news.items.length;
              if(count>0){
                let News = [];
                for(let n=0; n<count ; n++){
                      let article = {
                        "titulo":news.items[n].title,
                        "descricao":news.items[n].description,
                        "url":(news.items[n].url==undefined || news.items[n].url=="")?news.items[n].link:news.items[n].url,
                        "data_hora":moment(news.items[n].created).format("DD/MM/YYYY HH:mm")
                      };
                      News.push(article)
                }
                res.json( {"success":true, "err":null , "error":false, "data":News, message:"Notícias recuperadas com sucesso!" } );
              }else{
                console.log("Count: "+count+" - Não foram encontradas notícias.");
                res.json( {"success":true, "err":null ,"error":false, "data": null, "message":"A consulta retornou [ "+count+" ] notícias." } );
              }
          }
        });
      }else{
        console.log("ERRO: URL não foi informada corretamente.");
        res.json( {"success":false, "err":"URL não foi informada corretamente." , "error":true, "data": null, "message":"Não foi possível consultar as notícias. Tente mais tarde." } );
      }
   });
   /* Recupera o Título e ao Texto puro por parágrafos da página html.*/
   router.post('/readmedia',function(req,res,next){
            /* {"page":{"url":"", "element_title":"", "element_description":""}} */
               let page = req.body.page;
               if(page.url.length>0 || page.url!==""){
               control.getNews(page, function(err,news){
                 if(err){
                   console.log("ERRO: "+JSON.stringify(err));
                   res.json( {"success":false, "err":err , "error":true, "data": null, message:"Não foi possível consultar a notícia. Tente mais tarde." } );
                 }else{
                  res.json( {"success":true, "err":null , "error":false, "data":news, message:"Notícia recuperada com sucesso!" } );
                 }
               });
             }else{
               console.log("ERRO: URL não foi informada corretamente.");
               res.json( {"success":false, "err":"URL não foi informada corretamente." , "error":true, "data": null, "message":"Não foi possível consultar a notícia. Tente mais tarde." } );
             }
    });
 module.exports.newsControl = router;
