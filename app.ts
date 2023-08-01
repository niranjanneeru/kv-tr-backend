import express from "express"

const server = express();

server.get('/', (req, res)=> {
    const data = "Hello World!"
    res.status(200).send(data);
})


server.get('/*', (req, res)=> {
    res.status(404).send("Not Here");
})

server.listen(3000, () => {
    console.log("Server Works");
});
