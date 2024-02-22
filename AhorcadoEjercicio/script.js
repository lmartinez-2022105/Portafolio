//Referencia Iniciales
const letterContainer = document.getElementById("letter-container");
const optionsContainer = document.getElementById("options-container");
const userInputSection = document.getElementById("user-input-section");
const newGameContainer = document.getElementById("new-game-container");
const newGameButton = document.getElementById("new-game-button");
const canvas = document.getElementById("canvas");
const resultText = document.getElementById("result-text");

//Opciones de valores para el Botón
let options = {
  Animales: [
    "Perro",
    "Gato",
    "Vaca",
    "Kiwi",
    "Toro",
    "Hipopotamo",
    "Jirafa"
   ],
  Frutas: [
    "Rambutan",
    "Fresa",
    "Kiwi",
    "Sandia",
    "Melon",
    "Melocoton",
    "Coco",
    "Arandano"
   ],
};

//Contadores
let winCount = 0;
let count = 0;

let chosenWord = "";

//Botones de opciones de visualización
const displayOptions = () => {
  optionsContainer.innerHTML += `<h3>Porfavor Eliga una Opcion</h3>`;
  let buttonCon = document.createElement("div");
  for (let valor in options) {
    buttonCon.innerHTML += `<button class="options" onclick="generadorPalabras('${valor}')">${valor}</button>`;
  }
  optionsContainer.appendChild(buttonCon);
};

//bloquear todos los botones 
const bloqueador = () => {
  let optionsButtons = document.querySelectorAll(".options");
  let letterButtons = document.querySelectorAll(".letters");
   //bloquear todas las opciones
  optionsButtons.forEach((button) => {
    button.disabled = true;
  });

  //desabilitat todas las letras
  letterButtons.forEach((button) => {
    button.disabled.true;
  });
  newGameContainer.classList.remove("hide");
};

//generador De Palabras
const generadorPalabras = (optionValue) => {
  let optionsButtons = document.querySelectorAll(".options");
  //Si opcionesValor coincide con el botton ingresarTexto resalta el botón
  optionsButtons.forEach((button) => {
    if (button.innerText.toLowerCase() === optionValue) {
      button.classList.add("active");
    }
    button.disabled = true;
  });

  //inicializa letras ocultas, limpia la palabra anterior
  letterContainer.classList.remove("hide");
  userInputSection.innerText = "";

  let optionArray = options[optionValue];
  //Elige palabras random
  chosenWord = optionArray[Math.floor(Math.random() * optionArray.length)];
  chosenWord = chosenWord.toUpperCase();

  //remplaza cada letra por un span conteniendo un dash
  let displayItem = chosenWord.replace(/./g, '<span class="dashes">_</span>');

  //Muestra cada elemento como un span
  userInputSection.innerHTML = displayItem;
};

//Inicializa Funcion(Llamada cuando la pagina carga o usuario presiona nuevo juego);
const inicializar = () => {
  winCount = 0;
  count = 0;

 //Inicializa borrar todo el contenido y esconder las letras y botton nuevo juego
  userInputSection.innerHTML = "";
  optionsContainer.innerHTML = "";
  letterContainer.classList.add("hide");
  newGameContainer.classList.add("hide");
  letterContainer.innerHTML = "";

 //For crear botonoes por letra
  for (let i = 65; i < 91; i++) {
    let button = document.createElement("button");
    button.classList.add("letters");
    //Número a ASCII[A-Z]
    button.innerText = String.fromCharCode(i);
    //click en el boton Caracter
    button.addEventListener("click", () => {
      let charArray = chosenWord.split("");
      let dashes = document.getElementsByClassName("dashes");
      //si el array contiene valores de click remplasa el dash que coincida con una letra y dibuja en canvas
      if (charArray.includes(button.innerText)) {
        charArray.forEach((char, index) => {
           //Si el caracter del array es igual al boton clickeado
          if (char === button.innerText) {
            //remplaza el dash por una letra
            dashes[index].innerText = char;
            //Incrementa el contador
            winCount += 1;
            //Si el contador de aciertos es igual al tamaño de la letra
            if (winCount == charArray.length) {
              resultText.innerHTML = `<h2 class='win-msg'>Has Ganado!!</h2><p>La palabra es: <span>${chosenWord}</span></p>`;
              //Bloquea todos los botones
              bloqueador();
            }
          }
        });
      } else {
        //Contador de fallos
        count += 1;
        //for dibujar 
        DibujarMan(count);
        //Count == 7 porque cabeza, cuerpo, mano izquierda, mano derecha, pierna izquierda, piernda derecha
        if (count == 7) {
          resultText.innerHTML = `<h2 class='lose-msg'>Perdiste!! Que Malo Eres!!!</h2><p>La palabra era <span>${chosenWord}</span></p>`;
          bloqueador();
        }
      }
      // desabilita los botones clikeados
      button.disabled = true;
    });
    letterContainer.append(button);
  }

  displayOptions();
  //Llama el creador de canvas (para limpiar los canvas previos y cerar los canvas e inicializarlos)
  let { dibujoInicial } = creadorDeCanvas();
  dibujoInicial();
};

//Canvas
const creadorDeCanvas = () => {
  let context = canvas.getContext("2d");
  context.beginPath();
  context.strokeStyle = "#000";
  context.lineWidth = 2;

  //Para dibujar Lineas
  const dibujarLinea = (fromX, fromY, toX, toY) => {
    context.moveTo(fromX, fromY);
    context.lineTo(toX, toY);
    context.stroke();
  };

  const cabeza = () => {
    context.beginPath();
    context.arc(70, 30, 10, 0, Math.PI * 2, true);
    context.stroke();
  };

  const cuerpo = () => {
    dibujarLinea(70, 40, 70, 80);
  };

  const brazoIz = () => {
    dibujarLinea(70, 50, 50, 70);
  };

  const brazoDr = () => {
    dibujarLinea(70, 50, 90, 70);
  };

  const piernaIz = () => {
    dibujarLinea(70, 80, 50, 110);
  };

  const pierdaDr = () => {
    dibujarLinea(70, 80, 90, 110);
  };

  //Frame Inicial
  const dibujoInicial = () => {
    //Limpiar Canvas
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    //línea de fondo
    dibujarLinea(10, 130, 130, 130);
    //Línea de la izquierda
    dibujarLinea(10, 10, 10, 131);
    //Línea de arriba
    dibujarLinea(10, 10, 70, 10);
    //Pequeña línea de arriba
    dibujarLinea(70, 10, 70, 20);
  };

  return { dibujoInicial, cabeza, cuerpo, brazoIz, brazoDr, piernaIz, pierdaDr };
};

//Dibujar al hombre
const DibujarMan = (count) => {
  optionsContainer.innerHTML = `<h2>Tus Errores</h2><span>${count}</span>`;
  let { cabeza, cuerpo, brazoIz, brazoDr, piernaIz, pierdaDr } = creadorDeCanvas();
  switch (count) {
    case 1:
      cabeza();
      break;
    case 2:
      cuerpo();
      break;
    case 3:
      brazoIz();
      break;
    case 4:
      brazoDr();
      break;
    case 5:
      piernaIz();
      break;
    case 6:
      pierdaDr();
      break;
    default:
      break;
  }
};

//Nuevo Juego
newGameButton.addEventListener("click", inicializar);
window.onload = inicializar;