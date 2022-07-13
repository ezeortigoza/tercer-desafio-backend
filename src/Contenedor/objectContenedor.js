import fs from 'fs';


const path = 'articulo.json'

class objectContenedor{//class contenedora
//No todas las clases necesitan un constructor
    getAll = async() =>{
      try{
        if(fs.existsSync(path)){
            let fileData = await fs.promises.readFile(path,'utf-8');
            let articulo = JSON.parse(fileData);
           return articulo;
        }else{
            return [];//No tiene mascotas
        }
      } catch(error){
        console.log('Error de lectura'+ error)
      }
}
    save = async (articulo) =>{
        try{
            let productos = await this.getAll();
            if(productos.length === 0){
                articulo.id = 1;
                productos.push(articulo);
                await fs.promises.writeFile(path,JSON.stringify(productos,null,'\t'));
            }else{//Cuando hay mas mascotas
                articulo.id = productos[productos.length-1].id+1;
                productos.push(articulo);
                await fs.promises.writeFile(path,JSON.stringify(productos,null,'\t'));
            }

        }catch(error){
            console.log('No se pudo leer el archivo' + error);
        }
    }

    getById = async (idNumber) =>{
        try{
            const data = await this.getAll();
             data.find((element)=>{
              element.id == idNumber;
             return data
            })
            console.log('Objeto encontrado:'+ JSON.stringify(data[2]));

        }catch(error){
            console.log('Hay un error' + error)
        }
    
    }  

    deleteById = async (id)=>{
        try {
            const data = await this.getAll();
            let borrar = data.filter((object)=> object.id !== id)
            await fs.promises.writeFile(path,JSON.stringify(borrar,null,'\t'));
        } 
        catch (error) {
            console.log('Hay un error'+ error);
        }
    }
    
    deleteAll = async (deleteAll) =>{
        try{
            const data = await this.getAll();
            let borrar = data.filter((element) =>{
                element.id !== deleteAll;
            })
            await fs.promises.writeFile(path,JSON.stringify(borrar,null,'\t'));
            console.log("Todos los objetos fueron eliminados :" + JSON.stringify((data)));

        }catch(error){
            console.log('Hay un error' + error);
        }
    }

}
export default objectContenedor
