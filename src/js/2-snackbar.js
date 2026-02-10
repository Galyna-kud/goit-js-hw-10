import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(".form")


form.addEventListener("submit", handleSubmit);

function handleSubmit(ev) {
    ev.preventDefault()
    const delay = Number(ev.target.elements.delay.value);    
    const chooseRadio = ev.target.elements.state.value;

    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (chooseRadio === "fulfilled") {
               resolve(delay);
            } else {
                reject(delay)
            }}, delay)
    })

    promise
        .then(delay => 
            iziToast.success({ message: `✅ Fulfilled promise in ${delay}ms`, position: "topRight" })
        )
        .catch(delay =>
            iziToast.error({ message: `❌ Rejected promise in ${delay}ms`, position: "topRight" })
    )
    
    form.reset()
}
