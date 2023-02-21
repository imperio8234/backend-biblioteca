//obtener de la api


async function obtener() {
    try {
        const res= await fetch("http://localhost:4000/login/home")
        const datos= await res.json()
        console.log(datos)
    } catch (error) {
        console.log(error)
        
    }
    
    
}

obtener()