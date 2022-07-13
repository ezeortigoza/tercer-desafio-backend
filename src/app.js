import express from 'express';
import moment from 'moment';
import objectContenedor from './Contenedor/objectContenedor.js';

const contenedor = new objectContenedor();

const app = express();//NO SE PONE new express();

const port = 8080;

let counter = 0;

const server = app.listen(port, ()=>{
    console.log(`Listening on port ${port}`);
})
app.get('/',(req,res) =>{
    res.send('<h1>Finalmente bienvenido a express</h1>');
} )
app.get('/papaconqueso', (req,res)=>{
    res.send('Papa con queso');
})
app.get('/visitas', (req,res)=>{
    counter ++;
    res.send(`El endpoint se ha visitado ${counter} veces`);
})
app.get('/fyh',(req,res)=>{
    let currentTime = moment();
    res.send(currentTime.format('DD/MM/YYYY hh:mm:ss'));
})

app.get('/info', (req,res)=>{
    console.log(req.query); //req.query es un objeto!!!!
    let role = req.query.role;
    if(!role) return res.send("No se envio un rol, por favor definir el rol para enviar la info");
    //si llego a este punto entonces si me envio un rol
    if(role!=='admin') return res.send('Informacion confidencial, no puede acceder aqui');
    //Se le envia el send si es el admin, sino es info confidencial
    res.send('Aqui tiene la info');
})
app.get('/productos', async (req,res)=>{
    let productos = await contenedor.getAll();
    console.log(productos);
    res.send(productos);
})
app.get('/productoRandom', async (req,res)=>{
        let producto = await contenedor.getAll();
        res.send( producto[2]);
})