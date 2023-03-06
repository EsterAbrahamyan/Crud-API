const express = require('express')
const sqlite = require('sqlite3').verbose()
const app = express()
const port = 3001
const cors=require('cors')
app.use(express.json())
app.use(cors())

const db = new sqlite.Database('cakes.db', (err) => {
    if (err) {
        console.log(err)
    }
    else {
        console.log("OK")
    }
})

app.get('/', (req, res) => {
    db.all('SELECT * FROM cakes', [], (err, data) => {
        console.log(data)
        res.send(data)

    })
})
// app.post('/new',(req,res)=>{

//   res.send(req.body)
// })

app.get('/get/:id', (req, res) => {
    const id = req.params.id
    console.log(id);
    db.get('SELECT * FROM cakes WHERE id=?', [id], (err, data) => {
        res.send(data)
    })
    // res.send(data[id])
})
app.post('/post',(req,res)=>{
    const imgSrc = req.body.imgSrc;
    const name = req.body.name;
    const price = req.body.price;
    const recept = req.body.recept;
    
    console.log(req.body.name);
    db.run('INSERT INTO cakes(imgSrc,name,price,recept) values (?,?,?,?)',[imgSrc,name,price,recept],(err)=>{
        res.send("OKAY")
    });
    // res.send(req.body.key)
    app.put('/put/:id', (req, res) => {
        const id = req.params.id;
        const imgSrc = req.body.imgSrc;
        const name = req.body.name;
        const price = req.body.price;
        const recept = req.body.recept;
        
        db.run('UPDATE cakes SET imgSrc=?, name=?, price=?, recept=? WHERE id=?',[imgSrc,name,price,recept,id],(err)=>{
            
                res.send("OKAY")
            
        })
    })
    app.delete('/delete/:id', (req, res) => {
        const id = req.params.id
        
        db.run('DELETE FROM cakes WHERE id=?', [id], (err) => {
            
                res.send("OKAY")
            
        })
    })
    // app.listen(port,()=>{
    //     console.log('Example app listening on port ${port}')

    // })
})
app.listen(port);