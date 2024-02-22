//Asincrona
//Esperar a que se ejecute por completo una instruccion, sin obstruir 
//el hilo de procesos.

//Formas de manejar la sincronia:

/**
 * 1. Con Callbacks -> desuso
 * 2. Promises
 * 3. Async / await -> La mejor opcion
 */

//Callback
// function getUsersWithCallback(callback) {
//     fetch('https://randomuser.me/api/') //Consulta a un Endpoint (es como una barrita de busqeuda)
//         .then(response => response.json()) //Traducir o entender JSON
//         .then(data => {
//             const {results} = data;
//             callback(null, results) //Siempre espera dos parametros 1. El error 2. La respuesta 
//         })
//         .catch(error => {
//             console.error(error)
//             callback(error, null)
//         })
// }

// getUsersWithCallback((error, results) => {
//     if (error) console.error(error)
//     const name = document.getElementById('name')    
//     const surname = document.getElementById('surname')
//     const phone = document.getElementById('phone')
//     for(const user of results){
//         name.innerText = user.name.first
//         surname.innerText = user.name.last
//         phone.innerText = user.phone
//     }


//     console.log(typeof results) //Para saber que tipo de dato es
// })


//Promises
// const getUsersWithPromise = () => {
//     return new Promise((resolve, reject) => {
//         fetch('https://randomuser.me/api/')
//             .then(response => response.json())
//             .then(data => {
//                 const { results } = data;
//                 resolve(results)
//             })
//             .catch(error => reject(error))
//     })
// }

// getUsersWithPromise()
//     .then(results => {
//         const name = document.getElementById('name')
//         const surname = document.getElementById('surname')
//         const phone = document.getElementById('phone')
//         for (const user of results) {
//             name.innerText = user.name.first
//             surname.innerText = user.name.last
//             phone.innerText = user.phone
//         }
//     })
//     .catch(error => console.error(error))

//Async / Await
// const getUsersWithAsync = async () => {
//     try {
//         const response = await fetch('https://randomuser.me/api/?results=10') //automaticamente lo guarda en la constante //Es para indicar cuantos datos queremos buscar ?results=10
//         const {results} = await response.json() //Desestructuro y lo parseo
//         const name = document.getElementById('name')
//         const surname = document.getElementById('surname')
//         const phone = document.getElementById('phone')
//         for(const user of results){
//             name.innerText = user.name.first
//             surname.innerText = user.name.last
//             phone.innerText = user.phone
//         }
//     } catch (error) {
//         console.error(error)
//     }
// }

//getUsersWithAsync()


//Ejercicio
const getUsersWithAsync = async () => {
    try {
        const response = await fetch('https://randomuser.me/api/?results=10') //automaticamente lo guarda en la constante //Es para indicar cuantos datos queremos buscar ?results=10
        const {results} = await response.json() //Desestructuro y lo parseo
        const users = document.getElementById('users')
        for(const user of results){
            users.innerHTML += `
                <tr>
                    <td>${user.name.first}</td>
                    <td>${user.name.last}</td>
                    <td>${user.phone}</td>
                </tr>
            `
        }
    } catch (error) {
        console.error(error)
    }
}

getUsersWithAsync()
