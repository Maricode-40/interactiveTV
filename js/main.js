const buttons = document.getElementsByClassName("button");

let arrayButtons = Array.from(buttons);

let offScreen = document.getElementById("offScreen");

let indexContent = document.getElementById("indexContent");
//Aqui están todas las variables necesarias llamdas
const powerBtn = document.getElementById("onOff");

const selectedChannel = document.getElementsByClassName("selectedChannel");

const clock = document.querySelector(".clockAndDate");

let Ontv = false;

//The power-on screen is hidden out of the box, so that it only becomes visible when the Power button is pressed.

indexContent.style.display = "none";

powerBtn.addEventListener("click", (e) => {
  //Ontv is given a boolean value to control the click event on the remote control's power button
  Ontv = !Ontv;

  if (Ontv === true) {
    indexContent.style.display = "flex";
    //mapped the array of buttons in such a way that we can add or remove classes will trigger the event ‘channel choice
    arrayButtons.map((item) => {
      item.addEventListener("click", (evento) => {
        if (Ontv === true) {
          offScreen.classList.remove(
            offScreen.classList[offScreen.classList.length - 1]
          );
          //Remove the previous class so as not to accumulate a record of clicked channels.

          offScreen.classList.add("Channel" + evento.target.id.slice(-1));
        }
        //The start screen is hidden and then the channel number is run in a corner for two seconds via setTimeOut

        if (Ontv === true) {
          indexContent.style.display = "none";

          channelNumber.textContent = evento.target.id.slice(-1);
          setTimeout(() => {
            channelNumber.textContent = ""; // after the channel number is displayed, its value reverts to an empty string
          }, 500);
        }
      });
    });
  } else {
    indexContent.style.display = "none"; // if pressing power returns Ontv false, the home screen is removed and the tv is turned off.
    offScreen.classList.remove(
      offScreen.classList[offScreen.classList.length - 1]
    );
    offScreen.classList.add("portada");
  }
});

function actualizarReloj() {
  const ahora = new Date();
  const horas = ahora.getHours().toString().padStart(2, "0");
  const minutos = ahora.getMinutes().toString().padStart(2, "0");
  const segundos = ahora.getSeconds().toString().padStart(2, "0");

  const horaActual = `${horas}:${minutos}:${segundos}`;
  clock.textContent = horaActual; // display the time

  // show date
  const fecha = ahora.toLocaleDateString("es-ES", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });

  clock.textContent += ` | ${fecha}`;
}

// Clock update every second
setInterval(actualizarReloj, 1000);
