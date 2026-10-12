/*

- Remettre la liste des réponses et bonnes réponses à jour

*/



// bouton
const btn_mode = document.querySelector(".dl");
const btn_start = document.querySelectorAll(".btn-start");
const btn_pass = document.querySelectorAll(".btn-pass");
const btn_reponse = document.querySelectorAll(".btn-reponse");
const btn_bonne_rep = document.querySelectorAll(".bonne-rep");
let questionRep = 0;
let bonne_rep = 0;
let historique = [];
let historiqueBonneRep = [];

// interface
const body = document.querySelector("body");
const main = document.querySelector("main");
const screenStart = document.querySelector(".start");
const screenQuestion = document.querySelectorAll(".question");
const btn_validee = document.querySelectorAll(".btn_validee");
const NumQuestion = document.querySelector(".compteur");
const NumBonneRep = document.querySelector(".compteur2");
const listRep = document.querySelectorAll(".listRep");
const listBonneRep = document.querySelectorAll(".listBonneRep");
const tabRecap = document.querySelector(".tabRecap");
const recap = document.querySelector(".recap"); // à continuer là dessus et ainsi le paramétrer


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

// bouton pour commencer ou recommencer
btn_start.forEach(b =>{
    b.addEventListener("pointerup", ()=> {
        console.log(btn_pass.length); // soit 10

        // on reset tout
        questionRep = 0;
        bonne_rep = 0;
        historique = [];
        historiqueBonneRep = [];

        btn_reponse.forEach(btn => {
            btn.classList.remove("selected");
        });

        // permet d'enlever tous les boutons "continuer"
        for (let i = 0; i<btn_pass.length;i++)
        {
            SortieElement(btn_pass[i]);
        }

        if (!recap.classList.contains("masque"))
        {
            SortieElement(recap);
        }

        // on charge la page
        EntreeSortie(screenStart,screenQuestion[questionRep]);
        questionRep++;
        if (NumQuestion.classList.contains("masque"))
            {
                setTimeout(()=>{
                    EntreeElement(NumQuestion);
                },600);
            }
    })

})

// quand tu appuies sur un des boutons de la question, le bouton "continuer" apparaît
btn_reponse.forEach(b => {
    b.addEventListener("pointerup", () => {
        const rep = screenQuestion[questionRep-1].querySelector(".selected");

        // si une autre a été selectionné et que tu appuies sur une autre réponse, alors l'ancienne réponse est désélectionnée
        if (rep)
        {
            rep.classList.remove("selected");
        }
        b.classList.add("selected"); // permet de sélectionner l'option
        EntreeElement(btn_pass[questionRep-1]); // permet l'apparition du bouton "continuer"
    })
})

// bouton continuer
btn_pass.forEach(b => {
    b.addEventListener("pointerup", ()=> {

        // changer la page pour afficher la question suivant
        EntreeSortie(screenQuestion[questionRep-1],screenQuestion[questionRep]);
        console.log(btn_bonne_rep[questionRep-1]);
        console.log(btn_bonne_rep[questionRep-1].textContent);
        console.log("Question actuel : " + (questionRep-1 + " " + "+ 1"))

        // stocke la réponse qu'on a validé 
        const repActuel = screenQuestion[questionRep-1].querySelector(".selected");
        if (repActuel)
        {
            // stocke cette reponse dans l'historique
            historique.push(repActuel.textContent);
            console.log("Action réalisé : "+ historique[questionRep-1]);
        }
        else
        {
            historique.push("Null");
        }

        // stocke la bonne réponse de la question actuelle dans la liste
        const bonneRepActuel = screenQuestion[questionRep-1].querySelector(".bonne-rep");
        historiqueBonneRep.push(bonneRepActuel.textContent);

        // si la bonne réponse de chaque question a été selectionné alors on augmente le compteur
        if (bonneRepActuel && bonneRepActuel.classList.contains("selected"))
        {
            bonne_rep++;
            console.log("bonne réponse : "+ bonne_rep);  
        }


        
        

        if (!recap.classList.contains("masque"))
        {
            
        }

        questionRep++;
        // Enlever l'affichage de nbre question
        if (questionRep > 10)
        {
            SortieElement(NumQuestion);

            // Récapitulatif
            if (recap.classList.contains("masque"))
            {
                console.log("Fini Q" + questionRep)
                EntreeSortie(screenQuestion[questionRep - 2],recap);
                NumBonneRep.classList.remove("masque");
                for (let i = 0;i<listRep.length;i++)
                {
                
                    console.log("Historique stocké : "+historique[i]);
                    // afficher toutes les réponses enregistrés
                    listRep[i].textContent = historique[i];
                    // afficher toutes les bonnes réponses
                    listBonneRep[i].textContent = historiqueBonneRep[i];
                }
            }
        }

        else if (questionRep < 10 && NumQuestion.classList.contains("masque"))
        {
            setTimeout(()=>{
                EntreeElement(NumQuestion);
                NumQuestion.classList.remove("masque");
            },600);
        }
        console.log("Num question : "+questionRep);
    })

    
})



// fonction 

// Changer de page
function EntreeSortie(displayActuel, displaySuivant) {
    displayActuel.classList.remove("spawn");
    displayActuel.classList.add("despawn");
    console.log("Question "+questionRep);
    setTimeout(()=> {
        displayActuel.classList.add("masque");
        displayActuel.classList.remove("despawn");
        setTimeout(()=>{
        NumQuestion.textContent = "Question n°"+questionRep+"/10";
        NumBonneRep.textContent = "Bonne réponse : "+bonne_rep+"/10"; // pas utile ici mais prévoyant
        },240)
        setTimeout(()=>{
            displaySuivant.classList.remove("masque");
            displaySuivant.classList.add("spawn");
            console.log("Question "+questionRep);
            
        },550)
    },400);
}

// faire entrer un élément
function EntreeElement(element) {
    element.classList.remove("despawn-btn-valide");
    element.classList.add("spawn-btn-valide");
    element.classList.remove("masque");
}

// faire sortir un élément
function SortieElement(element) {
    element.classList.remove("spawn-btn-valide");
    element.classList.add("despawn-btn-valide");
    setTimeout(()=>{
        element.classList.add("masque");
    },400);
}
