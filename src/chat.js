let users=[]

module.exports=(io)=>{
    io.on("connection", (socket)=>{
        socket.on("mensage", (msg, name)=>{

           if(users.indexOf(name) === -1){
                users.push(name)
            }
            // se emite a el cliente o usuario
            socket.broadcast.emit("mensajedev", {
                body:msg,
                from:name,
                id:socket.id
            });

            socket.broadcast.emit("userlist", users);
        });
        //desconeccion del socket o usuario 


    })
    

}