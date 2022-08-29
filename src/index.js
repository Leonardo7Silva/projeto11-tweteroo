import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

let usuarios =[
    {
        username: 'bobesponja', 
        avatar: "https://super.abril.com.br/wp-content/uploads/2020/09/04-09_gato_SITE.jpg?quality=70&strip=info" 
    },
    {
        username: 'cao', 
        avatar: "https://img.freepik.com/fotos-gratis/lindo-retrato-de-cachorro_23-2149218452.jpg?w=2000" 
    }
];

let tweets = [
    {
        username: "bobesponja",
        tweet: "eu amo o hub"
    },
    {
        username: "cao",
        tweet: "au au"
    }
];

app.get("/sign-up", (req,res) => {
    res.send(usuarios);
});

app.post("/sign-up", (req,res)=>{
    let {username, avatar} = req.body;
    if(!username || !avatar){
        return res.status(400).send("Todos os campos são obrigatórios!")
    }
    usuarios.push({username, avatar});
    res.status(201).send("OK");
});

app.post("/tweets", (req,res)=>{
    let {tweet} = req.body;
    let username = req.headers.user;

    if(!tweet){
        return res.status(400).send("Todos os campos são obrigatórios!")
    }
    tweets.push({username, tweet});
    res.status(201).send("OK");
});

app.get("/tweets", (req,res)=>{
    let controle = [];
    let page = parseInt(req.query.page);
    let aux = 0;
    if (page === NaN){
        page = 1;
    }

    if(page < 1){
        return res.status(400).send("informe uma página válida");
    }
    if(tweets.length > 10*page){
        aux = tweets.length - 10*page;
    }

    for (let i = (tweets.length - 10*(page-1)-1); i > aux -1; i--) {
        let {avatar} = usuarios.find(value=> tweets[i].username === value.username)
        controle.push({
            ...tweets[i],
            avatar
        }); 
    }
    res.send(controle);
});

app.get("/tweets/:username", (req,res)=>{
    let controle = [];
    let aux = 0;
    let {username} = req.params;
    if(tweets.length > 10){
        aux = tweets.length - 10
    }

    for (let i = tweets.length -1; i > aux-1; i--) {
        let {avatar} = usuarios.find(value=> tweets[i].username === value.username)
        controle.push({
            ...tweets[i],
            avatar
        }); 
    }

    if(username){
        let controleFiltrado = controle.filter( value => value.username === username);
        return res.send(controleFiltrado);
    }
    res.send(controle);
});


app.listen(5000);