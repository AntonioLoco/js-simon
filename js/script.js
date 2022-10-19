/*
* Visualizzare in pagina 5 numeri casuali. Da lì parte un timer di 30 secondi.
* Dopo 30 secondi i numeri spariscono e l'utente deve inserire, uno alla volta, i numeri che ha visto precedentemente, tramite il prompt().
* Dopo che sono stati inseriti i 5 numeri, il software dice quanti e quali dei numeri da indovinare sono stati individuati.
*/

const randomNumberPage = document.getElementById("random-number");
const timerOnPage = document.getElementById("timer");
const result = document.getElementById("result");
const numberUserPage = document.getElementById("number-user");
const guessedNumberPage = document.getElementById("guessed-number");


//[*] Genero un array di 5 numeri casuali
const randomArray = getRndArrayNumber(5,1,100);
console.log(randomArray);

//[*] mostro i numeri generati in pagina
printArrayOnPage(randomArray, randomNumberPage);

//[*] partire un timer di 30 secondi
    //[*] nascondo i numeri dalla pagina
let count = 10;
let userNumbers = [];
let resultUserNumber = [];

const timer = setInterval(function (){
    timerOnPage.innerHTML = count;

    if(count > 0){
        count--;
    } else {
        //Nascondo i numeri generati
        hiddenOnPage(randomNumberPage);
        clearInterval(timer);

        setTimeout(function(){
            
            //[*] chiedere all'utente di inserire 5 numeri uno alla volta dal prompt
            for(let i = 0; i < 5; i++){
                const userNum = parseInt(prompt("Inserisci il numero:"));
                userNumbers.push(userNum);
            }
            console.log(userNumbers);
            
            //[*] SE i numeri inseriti dall'utente sono presenti nei numeri generati li inserisco in un array
            for(let i = 0; i < randomArray.length; i++){
                if(randomArray.includes(userNumbers[i])){
                    resultUserNumber.push(userNumbers[i]);
                }
            }


            //Mostro i numeri generatiì
            removeHiddenOnPage(randomNumberPage);
            removeHiddenOnPage(result);

            //Stampo i numeri inseriti dall'utente
            printArrayOnPage(userNumbers,numberUserPage);
            
            //stampo quanti numeri ha indovinato
            guessedNumberPage.textContent = `${resultUserNumber.length} numeri e sono: `;

            // stampo quali numeri ha indovinato
            printArrayOnPage(resultUserNumber, guessedNumberPage);

        }, 1000);
    }
},1000);
















// FUNCTION
/**
 * Description: Funzione che ci genera un array di lunghezza pari a arrayLength riempito con numeri random compresi tra min e max non ripetuti
 * @param {number} arrayLength - lunghezza dell'array da generare
 * @param {number} minNumber - numero minimo che possiamo generare
 * @param {number} maxNumber - numero massimo che possiamo generare
 * @returns {Array} Ritorna l'array generato con i numeri random
 */
function getRndArrayNumber(arrayLength, minNumber, maxNumber){
    let array = [];

    while( array.length < arrayLength){
        let rndNumber = getRndInteger(minNumber,maxNumber);

        if(!array.includes(rndNumber)){
            array.push(rndNumber);
        }
    }

    return array;
}

/**
 * Description: Funzione che ci genera un numero random compreso tra min e max
 * @param {number} min - valore minimo che possiamo generare
 * @param {number} max - valore massimo che possiamo generare
 * @returns {number} ritorno il numero random generato
 */
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}



// UI FUNCTIONS
/**
 * Description: Funzione che ci nasconde un elemento della pagina
 * @param {Object} elementOnPage - elemento della pagina che vogliamo nascondere
 */
function hiddenOnPage(elementOnPage){
    elementOnPage.classList.add("hidden");
}

/**
 * Description: Funzione che ci mostra un elemento della pagina
 * @param {Object} elementOnPage - elemento della pagina che vogliamo mostrare
 */
function removeHiddenOnPage(elementOnPage){
    elementOnPage.classList.remove("hidden");
}


/**
 * Description: Funzione che ci permette di stampare l'array nell'elemento della pagina html
 * @param {Array} array - array da stampare sulla pagina 
 * @param {Object} elementOnPage - elemento in cui stampare l'array
 */
function printArrayOnPage(array, elementOnPage){
    for(let i = 0; i < array.length; i++){
        elementOnPage.textContent += " " + array[i] + " ";
    }
}