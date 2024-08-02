
import { removeConnecteUser } from "../lib/store.js" 

const disconnectHandler = (socket)=>{
    removeConnecteUser(socket.id)
}

export default disconnectHandler