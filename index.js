let themeButton = document.getElementById("theme-button");
const toggleDarkMode = (event) => {
    event.preventDefault();
    document.body.classList.toggle("dark-mode");
}
themeButton.addEventListener("click", toggleDarkMode);

let animation = {
    revealDistance: 150,
    initialOpacity: 0,
    transitionDelay: 0,
    transitionDuration: '2s',
    transitionProperty: 'all',
    transitionTimingFunction: 'ease'
}
revealableContainers = document.querySelectorAll(".revealable");
const reveal = () => {
    for(let i = 0; i < revealableContainers.length; i++){
        let windowHeight = window.innerHeight;
        let topOfRevealableContainer = revealableContainers[i].getBoundingClientRect().top;
        if (topOfRevealableContainer < windowHeight - animation.revealDistance) {
            revealableContainers[i].classList.add("active");
          } else {
            revealableContainers[i].classList.remove("active");
          }
    }
}
window.addEventListener("scroll", reveal);

const signNowButton = document.getElementById("sign-now-button");
const addSignature = (person) => {
    const newSignature = document.createElement("p");
    newSignature.textContent = `🖊️ ${person.name} from ${person.hometown} supports this cause.`;

    const signaturesSection = document.querySelector(".signatures");
    signaturesSection.appendChild(newSignature);
}


const validateForm = () => {

    let petitionInputs = document.getElementById("sign-petition").elements;

    let person = {
        name: petitionInputs[0].value,
        hometown: petitionInputs[1].value,
        email: petitionInputs[2].value
    }

    let containsErrors = false;
    
   
    for(let i = 0; i < petitionInputs.length; i++){
        if(petitionInputs[i].value.length < 2){
            petitionInputs[i].classList.add("error");
            containsErrors = true;
        }
        else{
            petitionInputs[i].classList.remove("error");
        }
    }
    if(containsErrors == false){
        addSignature(person);
        toggleModal(person);
        for(let i = 0; i < petitionInputs.length; i++){
            petitionInputs[i].value = "";
            containsErrors = false;
        }
    }
}
  
  signNowButton.addEventListener('click', validateForm);

  const toggleModal = (person) => {
    let modal = document.querySelector("#thanks-modal");
    let modalContent = document.querySelector("#thanks-modal-content");
    let modalImage = document.querySelector("#modal-image");

    modal.style.display = "flex";
    modalContent.textContent = `Thank you so much ${person.name}! ${person.hometown} represent!`;
    

  let scaleFactor = 1;
  const scaleImage = () => {
    scaleFactor = scaleFactor === 1 ? 0.8 : 1;
    modalImage.style.transform = `scale(${scaleFactor})`;
  }

  const intervalID = setInterval(scaleImage, 500);

  setTimeout(() => {
      modal.style.display = "none";
      clearInterval(intervalID); 
  }, 4000);
}