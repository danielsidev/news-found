const express     = require('express');
const bodyParser  = require('body-parser');
const helmet      = require('helmet'); //segurança da aplicação
const compression = require('compression'); //Mais performance: comprimi as resquizições em gzip...mais velocidade
const cors        = require('cors'); // Cross Origin
let path					= require('path');
let app           = express();
let {newsControl}  = require('./middleware/newsControl');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"
app.use(cors());
app.use(express.static(path.join(__dirname, 'view')));
app.use(compression());
app.use(helmet());
app.set('view', __dirname + '/view');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html')
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/news',newsControl);
app.get('/',function(req,res){ res.render('index.html'); });
app.use(function(err,req,res,next) {
  console.log(err.stack);
  res.status(500).send({"success":false, "error":err, "message":err.stack });
});
app.listen(9001,() => console.log("News Found rodando na porta 9001!"));
