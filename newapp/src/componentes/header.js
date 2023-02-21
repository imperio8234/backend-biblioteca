import { Route, Routes } from "react-router-dom"
import { Agregar } from "./agregar"
import { Contenido } from "./contenidoHome"

export const Main=()=>{
    <div>
        <Routes>
        <Route path='/agregar' element={<Agregar></Agregar>}/>
        <Route path='/contenido' element={<Contenido></Contenido>}/>
        </Routes>
    </div>
}