const { Console } = require("console");
const fs = require("fs");
const { format } = require("path");
const qrcode = require("qrcode-terminal");

const { Client } = require("whatsapp-web.js");

const SESSION_FILE_PATH = "./session.json";

const country_code = "598";
const number = "93330445";
const msg = "Mensaje automático";

// let sessionData;
// if (fs.existsSync(SESSION_FILE_PATH)) {
//     sessionData = require(SESSION_FILE_PATH);
// }

const client = new Client(
    // session: sessionData,
);

client.initialize();


client.on("qr", qr => {
    qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
    console.log("El cliente está listo")

    let chatId = country_code + number + "@c.us";

    client.sendMessage(chatId, msg)
                    .then(response =>{
                        if (response.id.fromMe) {
                            console.log("El mensaje fue enviado");
                        }
                    })
})

// client.on("authenticated", session => {
//     sessionData = session;

//     fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), err => {
//         if (err) {
//             console.error(err);           
//         }
//     })
// })

client.on("auth_failure", msg => {
    console.error("Hubo un fallo en la autenticación", msg);
})

var mapaClienteMensajeRepartidor = new Map();
var mapaClienteFase = new Map();
var mapaClienteMensajeEnviado = new Map();
var mapaClienteKilaje = new Map();
var mapaClienteCantidad = new Map();
var mapaClientePrecio = new Map();
var mapaClienteNombre = new Map();
var mapaClienteDireccion = new Map();

var mapaClienteDatosJSON = new Map();

var listaJSON = [];


client.on("message", msg => {
    let date = new Date();
    let fechaHoy = date.getDate() + "/" + date.getMonth() + 1 + "/" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    try {
        let fase;
        let telefonoCliente = msg.from;
        let texto = msg.body.toLowerCase();
        mapaClienteMensajeEnviado.set(telefonoCliente, texto);

        if (!mapaClienteFase.has(telefonoCliente)) {
            mapaClienteFase.set(telefonoCliente, "Inicio");
            mapaClienteMensajeRepartidor.set(telefonoCliente, "")
        }
        fase = mapaClienteFase.get(telefonoCliente);
        textoCliente = mapaClienteMensajeEnviado.get(telefonoCliente);
        if (fase == "Inicio") {         
            if (textoCliente == "1") {
                mapaClienteFase.set(telefonoCliente, "Kilaje");
                client.sendMessage(msg.from, "Ingrese el kilaje de la/s garrafa/s (3kg - 13kg - 45kg)\n" +
                    "(Ejemplo: 13)");
                console.log(`Msj enviado ${msg.from} en FASE 1`);
            }
            else if (textoCliente == "2") {
                client.sendMessage(telefonoCliente, "Precios Garrafas (envío incluído):\n \n" +
                    "*3 Kg*: 95$\n" + 
                    "*13 Kg*: 815$\n" +
                    "*45 Kg*: 2527$")
                console.log(`Msj enviado ${telefonoCliente}, PRECIOS`)
            }
            else if (textoCliente == "3") {
                client.sendMessage(telefonoCliente, "*Lunes a Sábado:* 8:00 a 14:00\n" +
                                                    "                               16:00 a 20:00\n \n" + 
                                                    "*Domingo:* 8:00 a 14:00");
            }
            else if (textoCliente.includes("hola") || textoCliente.includes("garrafa")){
                client.sendMessage(msg.from, "¿Hola como estás? 😄\n" +
                    "Bienvenido a *Beltrán Gas*\n" +
                    "Elija el número de opción deacuerdo a su necesidad:\n \n" +
                    "*1* - Realizar Pedido 🛒\n" +
                    "*2* - Ver Precios 💲\n" +
                    "*3* - Ver Horario 🕖\n")
            }
        }
        else if (fase == "Kilaje") {
            if (textoCliente == "3" || textoCliente == "13" || textoCliente == "45") {
                mapaClienteKilaje.set(telefonoCliente, textoCliente);
                mapaClienteFase.set(telefonoCliente, "Nombre");
                let mensajeRepartidor = "*Garrafa:*" + " " + textoCliente + "kg" + "\n";
                mapaClienteMensajeRepartidor.set(telefonoCliente, mensajeRepartidor);
                client.sendMessage(msg.from, "¿Cuantas Garrafas desea?\n" +
                    "(Ejemplo: 1)");

                console.log(`Msj enviado ${msg.from} en FASE 2`); 
            }
            else {
                client.sendMessage(telefonoCliente, "Kilaje inválido, inserte el kilaje denuevo");
            }
            

        }

        else if (fase == "Nombre") {           
            if (!isNaN(textoCliente)) {   
                let mensajeAnterior = mapaClienteMensajeRepartidor.get(telefonoCliente);
                let cantidad = parseInt(textoCliente);
                if (cantidad >= 1 && cantidad < 20) {    
                    mapaClienteFase.set(telefonoCliente, "Direccion");
                    let precioK;
                    mapaClienteCantidad.set(telefonoCliente, cantidad)
                    let textoNumero = mapaClienteCantidad.get(telefonoCliente);
                    if (mapaClienteKilaje.get(telefonoCliente) == "3") {
                        precioK = 95;
                    }
                    else if (mapaClienteKilaje.get(telefonoCliente) == "13") {
                        precioK = 815;
                    }
                    else {
                        precioK = 2527;
                    }
                    let precioCantidad = textoNumero * precioK;
                    mapaClientePrecio.set(telefonoCliente, precioCantidad);
                    let mensajeRepartidor = "*Cantidad:*" + " " + textoNumero + "\n";
                    mapaClienteMensajeRepartidor.set(telefonoCliente, mensajeAnterior + mensajeRepartidor);
                    client.sendMessage(msg.from, "Ingrese su nombre\n" +
                        "(Ejemplo: Juan Pérez)");
                    console.log(`Msj enviado ${msg.from} en FASE 3`);
                }
                else {
                    console.log(telefonoCliente + " Puso una cantidad fuera de los límites");
                    client.sendMessage(telefonoCliente, "Valor muy grande o no válido\n" + "Vuelva a poner cantidad")
                }
            }
                
                
            else {
                console.log("Puso un caracter no parseable");
                client.sendMessage(telefonoCliente, "Respuesta no válida\n" + "Vuelva a poner cantidad")
            }
            
            

        }
        else if (fase == "Direccion") {
            let textoCliente = msg.body;
            mapaClienteNombre.set(telefonoCliente, textoCliente)
            mapaClienteFase.set(telefonoCliente, "Confirmacion");
            let mensajeAnterior = mapaClienteMensajeRepartidor.get(telefonoCliente);
            let mensajeRepartidor = "*Nombre:*" + " " + textoCliente + "\n";
            mapaClienteMensajeRepartidor.set(telefonoCliente, mensajeAnterior + mensajeRepartidor);
            client.sendMessage(msg.from, "Ingrese su dirección\n" +
                                         "(Ejemplo: 'Calle' 'Número')");
            console.log(`Msj enviado ${msg.from} en FASE 4`);

        }
        else if (fase == "Confirmacion") {
            let textoCliente = msg.body;
            mapaClienteDireccion.set(telefonoCliente, textoCliente);
            mapaClienteFase.set(telefonoCliente, "Final");
            let mensajeAnterior = mapaClienteMensajeRepartidor.get(telefonoCliente);
            let mensajeRepartidor = "*Dirección:*" + " " + textoCliente + "\n" +
            "*Precio:*" + " $" + mapaClientePrecio.get(telefonoCliente);
            mapaClienteMensajeRepartidor.set(telefonoCliente, mensajeAnterior + mensajeRepartidor);
            client.sendMessage(msg.from, "*" + fechaHoy + "*" + "\n \n" + "Su pedido:\n \n" +
                                         mapaClienteMensajeRepartidor.get(telefonoCliente) + "\n \n" +
                                         "Para Confirmar responda: Si\n" +
                                         "Para Cancelar responda: No")
            console.log(`Msj enviado ${msg.from} en FASE 5`);

        }
            
        else if (fase == "Final") {
            let textoCliente = mapaClienteMensajeEnviado.get(telefonoCliente);
            if (textoCliente == "si" || textoCliente == "sí") {
                client.sendMessage(msg.from, "Su pedido será enviado pronto\n" +
                                             "Gracias por preferirnos 😋");                           
                client.sendMessage(country_code + number + "@c.us", "*" + fechaHoy + "*" +"\n \n" + mapaClienteMensajeRepartidor.get(telefonoCliente));
                mapaClienteFase.set(telefonoCliente, "Inicio");
                
                let dataParaJSON = {
                    "numero": msg.from,
                    "nombre": mapaClienteNombre.get(telefonoCliente),
                    "direccion": mapaClienteDireccion.get(telefonoCliente),
                    "cantidad": mapaClienteCantidad.get(telefonoCliente),
                    "kilaje": mapaClienteKilaje.get(telefonoCliente),
                    "precio": mapaClientePrecio.get(telefonoCliente)
                }
                listaJSON.push(dataParaJSON);
                let data = JSON.stringify(listaJSON, null, 2);

                fs.writeFileSync("clientes.json", data);

            }
            else if (textoCliente == "no") {
                client.sendMessage(msg.from, "Su pedido se canceló\n" +
                    "En caso de volver a intentarlo envíenos un mensaje que contenga la palabra 'Garrafa' 😉");
                mapaClienteFase.set(telefonoCliente, "Inicio");
            }
            else {
                client.sendMessage(msg.from, "No ingresó una opción válida\n" +
                    "Ingrese Si / No")
                mapaClienteFase.set(telefonoCliente, "Final");
            }
            
            console.log(`Msj enviado ${msg.from} en FASE FINAL`);
        }
    } catch (error) {
        console.log(error);
    }   
})


