import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

let usuarios =[
    {
        username: 'bobesponja', 
        avatar: "https://super.abril.com.br/wp-content/uploads/2020/09/04-09_gato_SITE.jpg?quality=70&strip=info" 
    }
];

let tweets = [
    {
        username: "bobesponja",
        tweet: "eu amo o hub"
    }
];

app.get("/sign-up", (req,res) => {
    res.send(usuarios);
});

app.post("/sign-up", (req,res)=>{
    let {username, avatar} = req.body
    usuarios.push({username, avatar});
    res.send("OK");
});

app.post("/tweets", (req,res)=>{
    let {username, tweet} = req.body
    tweets.push({username, tweet});
    res.send("OK");
});

app.get("/tweets", (req,res)=>{
    let controle = [];
    let aux = 0;
    if(tweets.length > 10){
        aux = tweets.length - 10
    }

    for (let i = aux; i < tweets.length; i++) {
        let {avatar} = usuarios.find(value=> tweets[i].username === value.username)
        console.log(avatar);
        controle.push({
            ...tweets[i],
            avatar
        }); 
    }
    res.send(controle);
});

app.listen(5000);