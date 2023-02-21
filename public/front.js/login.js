const form=document.getElementById("formulario");

form.addEventListener("submit", e=>{
    e.preventDefault()
   
    const usuario=  form.elements[0].value;
    const pass=  form.elements[1].value;
    

    enviarPost(usuario,pass)
   
})

async function enviarPost(usuario,pass){
    try {
        const res= await 
        fetch("http://localhost:4000/login", {
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
            window.location.href="../src/home.html"
        }
        
    } catch (error) {
        console.log(error)
        
    }
};