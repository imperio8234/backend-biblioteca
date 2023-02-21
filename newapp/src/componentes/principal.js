import React, {useEffect} from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import "../../node_modules/bootstrap/dist/js/bootstrap"


export const Home=()=>{
    
    return (
        
         <div>
            <div className="conte">
      <nav>
        <div class="nav nav-tabs p-3 mb-2 bg-black text-white" id="nav-tab" role="tablist ">
           <button class="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true"><Link className="btn" to="contenido">home</Link></button>
           <button class="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false"><Link className="btn" to="agregar">agregar a la boblioteca</Link></button>
            <button class="nav-link" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected="false"><Link className="btn">cerrar</Link></button>
        </div>
      </nav>
           </div>
           <div id="detail">
            <Outlet />
           </div>
           
        </div>
    )

}