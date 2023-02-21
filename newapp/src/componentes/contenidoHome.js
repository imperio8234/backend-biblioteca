import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/localHome.css"
import { useNavigate} from "react-router-dom";
import { CambioVistas } from "./cambioVistas";
import { Videos } from "./verVideos";
import { Imagenes } from "./cerImagenes";
import useUser from "../hooks/useUser";




export const Contenido=()=>{


    const { name }=useUser();    

    const [resultados, setResultados]=useState([]);
    const [objetos, setObjetos]=useState([]);
    const [imagenes, setImagenes]=useState([]);
    const [videos, setVideos]=useState([]);
    const [actualizar, setActualizar]=useState(false)
    const [cambioVistas, setCambioVistas]=useState();
    const [user, setUser]=useState();


   const comprobar=()=>{
    if (resultados == 404) {
        setCambioVistas(false)
        
        
    }else{
        setObjetos(resultados)
        setCambioVistas(true)
    }
   };
   

  

    const datosApi=async ()=>{
        axios.get("http://localhost:4000/login/home",{
            withCredentials:true,
        }).then(res=> {
            if (res) {
                
            setResultados(res.data.result.tareasConImagenes)
            
            
        }else{
            console.log("no hay archivos")

        }
        
        }).catch(err=> setResultados(err.response.status))
        
    };
    useEffect(()=>{
        comprobar();

    }, [resultados])

    useEffect(()=>{
        filtrarVideo()
    },[objetos])


useEffect(()=>{
        datosApi();
        setActualizar(false)
        
    },[actualizar]);



    const filtrarVideo=()=>{
        let setimag=[];
        let setvid=[]
        for (const obj of objetos) {
           if (obj.tipo.includes("video")) {
            setvid.push(obj)
            
           }else if (obj.tipo.includes("image")) {
            setimag.push(obj)
            
           }
            
        }
        setImagenes(setimag);
        setVideos(setvid);


    };    
    
 const eliminar= async(id, name)=>{
    
    const config={ withCredentials:true}
 await axios.delete(`http://localhost:4000/login/home/eliminar/${id}/${name}`, config)
 .then(res=>{
    if (res.data.success) {

        setActualizar(true)   
    }
    
 })
 .catch(err=>console.log(err))

 };  
 
    return (
        <div className="contedeBody">

            <h2> {name}, esta es tu biblioteca</h2>

           <div className="contResultado">
            
            {
                        //iteracion de los videos
             cambioVistas? videos.map(e=>{
               
          return <Videos
                 key={e.id} 
                 id={e.id}
                 nombre={e.nombre}
                 descripcion={e.descripcion}
                 eliminar={eliminar}
                 ></Videos>
                 
                               })
                   :""                 
            }
            {
               cambioVistas?  imagenes.map(e=>{
                  return  <Imagenes 
                    key={e.id} 
                    id={e.id}
                    nombre={e.nombre}
                    descripcion={e.descripcion}
                    eliminar={eliminar}
                    />  
                   
                      })
                      :<CambioVistas />
            }
           </div>
        </div>
    )

}