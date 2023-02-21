
import { Link, Route, Routes } from 'react-router-dom';
import './App.css';
import { useState } from "react";
import "./css/principal.css";
import "../node_modules/bootstrap/dist/css/bootstrap.css"


function App() {
  const [conectado, setConectado]=useState(false)

  return (
    <div className="contenedor p-3 mb-2 bg-primary-subtle text-emphasis-primary">

    <div className="contenedorBtn">
        <h2>bienvenido a tu biblioteca</h2>
      <div className='cont-botones'>
      <button className="btn btn-outline-dark boton m-3"><Link className="link" to="/login">ingresar</Link></button>
      <button className="btn btn-outline-dark boton"><Link className="link" to="/registro">registro</Link></button>


      </div>
    </div>
  
</div>
  );
}

export default App;
