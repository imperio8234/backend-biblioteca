import { useEffect, useState, useTransition } from "react"
import {Link, Outlet} from "react-router-dom"
import "../css/local.css"
import axios from  "axios";
import { Buscador } from "./conBuscador";


export const Sala=({ user })=>{

  const [busquedaU, setBusquedau]=useState([]);
  const [Login, setlogin]=useState();
  const [buscadorConte, setBuscadorConte]=useState(false)
  const [inputText, setInputText]=useState("");




 const cerr= async()=>{
  try { const res= await fetch("http://localhost:4000/cerrar",{
    method:"POST",
    body:"",
    credentials: 'include',
    headers:{
      "content-type":"application/json"
    }
  });

  const dat= await res.json();
  console.log(dat)
    
  } catch (error) {
    console.log(error)
    
  }
 };
 //implementacion del buscador
 const buscarInput=(e)=>{
  setInputText(e.target.value)

  if (inputText.length <= 1) {
    setBuscadorConte(false)
    
  }else{
    setBuscadorConte(true)

  }

  
 };


 const buscar=(e)=>{
  e.preventDefault()
  setBusquedau(inputText)
 
 }
 

  return(

  <div>
    {/* bara de navegacion*/ }
      <nav class="navbar bg-dark nave" onClick={()=>setBuscadorConte(false)}>
          
              <ul class="botonesnav">
                   <li ><Link class="btn btn-outline-success me-2"to={"contenido"}>contenido</Link></li>
                   <li ><Link class="btn btn-sm btn-outline-secondary" to={"agregar"}>agregar</Link></li>
                   <li onClick={cerr}  ><Link  class="btn btn-outline-success" to={"/"}>cerrar</Link></li>
              </ul>

               <form class="form" role="search">
                  <input onChange={buscarInput} class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                  <button onClick={buscar} class="btn btn-outline-success" type="submit">buscar</button>
               </form>
          
       </nav>
       
    
    
    {/*aqui se muestra el contenido guardado */}
    <div id="detail" onClick={()=>setBuscadorConte(false)}>
      <Outlet></Outlet>
      {buscadorConte &&<Buscador inputText={inputText}></Buscador>}

    </div>

   </div>
  )
}