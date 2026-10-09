const btn_mode = document.querySelector(".dl");
const btn_pass = document.querySelectorAll(".btn-pass");
const btn_reponse = document.querySelectorAll(".btn-reponse");
const btn_bonne_rep = document.querySelectorAll(".bonne-rep");
let questionRep = 0;
let bonne_rep = 0;

// interface
const body = document.querySelector("body");
const main = document.querySelector("main");
const screenStart = document.querySelector(".start"); // ne sert plus à rien
const screenQuestion = document.querySelectorAll(".question");
const btn_validee = document.querySelectorAll(".btn_validee");
const NumQuestion = document.querySelector(".compteur");


// changer le thème en dark
btn_mode.addEventListener("pointerup", ()=>{
    body.classList.toggle("bg");
    if (body.classList.contains("bg"))
    {
        btn_mode.textContent = "Sombre";
    }
    else
    {
        btn_mode.textContent = "Clair";
    }
})

btn_reponse.forEach(b => {
    b.addEventListener("pointerup", () => {
        EntreeElement(btn_pass[questionRep]);

    })
})

btn_pass.forEach(b => {
    b.addEventListener("pointerup", ()=> {
        EntreeSortie(screenQuestion[questionRep],screenQuestion[questionRep+1]);
        questionRep++;
        if (NumQuestion.classList.contains("masque"))
        {
            setTimeout(()=>{
                EntreeElement(NumQuestion);
                NumQuestion.classList.remove("masque");
            },600);
        }
    })
})

btn_bonne_rep.forEach(b => {
    b.addEventListener("pointerup", ()=> {
    bonne_rep++;
    console.log(bonne_rep);
    })
})

NumQuestion.textContent = "Question n°"+questionRep+"/10";

// fonction 
function EntreeSortie(displayActuel, displaySuivant) {
    displayActuel.classList.remove("spawn");
    displayActuel.classList.add("despawn");
    console.log("Question "+questionRep);
    setTimeout(()=> {
        displayActuel.classList.add("masque");
        displayActuel.classList.remove("despawn");
        console.log(2);
        setTimeout(()=>{
            displaySuivant.classList.remove("masque");
            displaySuivant.classList.add("spawn");
            console.log("Question "+questionRep);
            NumQuestion.textContent = "Question n°"+questionRep+"/10";
        },200)
    },400);
}

function EntreeElement(element) {
    element.classList.remove("despawn-btn-valide");
    element.classList.add("spawn-btn-valide");
    element.classList.remove("masque");
}
