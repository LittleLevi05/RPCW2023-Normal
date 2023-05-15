### Cria o esqueleto de um servidor node na pasta atual

```
npx express-generator
```

### Converte CSV em JSON

````
https://csvjson.com/csv2json
````

### Cria a coleção *fracoes* na base de dados *condominio* 

```
mongoimport -d condominio -c fracoes --file fracao.json  --jsonArray
```

### Entra na *mongo shell*

```
mongosh
```

### Entra na base de dados *condominio*

```
use condominio
```

### Não esquecer de fazer:

* npm install mongoose
* a base de dados é gerada aotumaticamente na connection, ou quando faz-se "use" na mongosh

### Processo de enxugar "esqueleto" gerado pelo *express-generator*

* WWW:
    * na função *onListening* remover corpo todo e deixar algo do tipo:
    ```
    function onListening() {
        console.log('Servidor à escuta na porta ' + port + '...')
    }
    ```
* APP:
    * remover as linhas:
    ```
    var cookieParser = require('cookie-parser');
    app.use(cookieParser());
    ```
    * adicionar as linhas logo no começo:
    ```
    var mongoose = require('mongoose')

    var mongoDB = 'mongodb://127.0.0.1/RPCW2023' // <RPC32023> é o nome da base de dados 
    mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true})
    var db = mongoose.connection
    db.on('error', console.error.bind(console, 'MongoDB connection error...'))
    db.once('open',function(){
        console.log("Conexão ao MongoDB realizada com sucesso...")
    })
    ```
    * Caso for uma API de dados, corrigir a linha handler de erro de "res.render('error');" para:
    ```
     res.json({erro:err, mensagem:"Rota não suporta"});
    ```
    * Caso for uma API de dados, remover a linha:
    ```
    app.use(express.static(path.join(__dirname, 'public')));
    ```
    * Remover o import dos Routers desnecessários, assim como o app.use deles
    * Caso for API de dados, remover:
    ```
    // view engine setup
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'jade');
    ```
 Caso for uma API de dados, remover pasta *public* e *views*
    
### Atenção

Se for disponibilizado um JSON, para fazer o comando *mongoimport -d condominio -c fracoes --file fracao.json  --jsonArray*,
primeiro devo garantir que o JSON não tem chave inicial e começa direto com a lista.
```
    [
        {},
        {},
        {}        
    ]
```
#### Exemplo de rotas que a precendencia deve ser levada em conta!
Caso não fosse ao contrário, nunca chegaria na rota /nomes

```

router.get('/cidades/nomes',function(req,res,next){
  API.getNomesDasCidades()
    .then(dados =>{
      res.status(200).json(dados)
    })
    .catch(erro =>{
      res.status(522).json({erro:erro})
    })
})


router.get('/cidades/:id',function(req,res,next){
  API.getCidade(req.params.id)
    .then(dados =>{
      res.status(200).json(dados)
    })
    .catch(erro =>{
      res.status(521).json({erro:erro})
    })
})

```