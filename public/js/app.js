console.log("Clinet side javascript is loaded!");

const weatherForm = document.querySelector("form");
const searchElement = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

weatherForm.addEventListener("submit", e => {
    e.preventDefault();

    const location = searchElement.value;
    fetch(`http://localhost:3000/weather?address=${location}`).then(respond => {
        messageOne.textContent = 'Loading';
        messageTwo.textContent = '';
        
        respond.json().then(data => {
            if(data.error) {
                messageOne.textContent = data.error;
                return;
            }

            messageOne.textContent = data.location;
            messageTwo.textContent = data.forecastData;
        });
    });
});

