const formulario=document.getElementById("formulario");



formulario.addEventListener("submit", e=>{
    e.preventDefault()
   
    const usuario=  formulario.elements[0].value;
    const pass=  formulario.elements[1].value;
    

    enviarPost(usuario,pass)
   
})

async function enviarPost(usuario,pass){
    try {
        const res= await 
        fetch("http://localhost:4000", {
            method:"POST",
            body:JSON.stringify({
                "usuario":usuario,
                "pass":pass
            }),
            headers:{
                "Content-Type":"application/json"
            }
        });

        const datos= await res.json();
        if (datos.success) {
            window.location.href="../src/login.html"
        }
        
    } catch (error) {
        console.log(error)
        
    }
};