// Pobranie zmiennych
const question = document.querySelector('.question');
const answers = document.querySelector('.answers');
const menu = document.querySelector('.menu');
const startGame = document.querySelector('.startGame');
const howToPlay = document.querySelector('.howToPlay');
const results = document.querySelector('.results');
const resultText = document.querySelector('.resultText');
const howPlaySection = document.querySelector('.HowToPlay');
const resultSection = document.querySelector('.resultSection');
const socialMedia = document.querySelector('.socialMedia');
const closer = document.querySelector('.closerD');
const gameSection = document.querySelector('.gameSection');
const skipQuestion = document.querySelector('.skipQuestion');
const halfOptions = document.querySelector('.halfOptions');
const scoreResult = document.querySelector('.scoreResult');
const score = document.querySelector('.score');
const ranking = document.querySelector('.ranking');
const rankingSection = document.querySelector('.rankingSection');
const rankingMessage = document.querySelector('.rankingMessage');
const container = document.querySelector('.container');

//deklaracja zmiennych
let mixQuestions, questionNumber;
let points=0;
let needValue = 10;
let i = 0;
let finalPoints = 0;
let game = 0;
let skipPrice = 10;
let halfPrice = 20;
let halfChangeUsed = 0;
//funkcje

//rozpoczęcie gry, losowe ułożenie pytań
function startQuiz() {


    game = game + 1;
    resteGame();
    nextQuestion();


}

function resteGame() {
    points = 0;
    skipPrice = 10;
    halfPrice = 20;
    score.innerHTML = points;
    mixQuestions = questions.sort(() => Math.random() - .5);
    questionNumber = 0;
    resultSection.classList.add('hide');
}
//przejście do następnego pytania
function nextQuestion() {

    resetState();
    showQuestion(mixQuestions[questionNumber]);

}

//pokazanie pytania
function showQuestion(questions) {

    helpRingsStatus();
    question.innerHTML = questions.question;
    Array.from(questions.answers).sort(() => Math.random() - .5).forEach(answer => {
        const answerButton = document.createElement('button');
        answerButton.classList.add('answer');
        answerButton.classList.add('hoverEffect');
        answerButton.innerText = answer.text;
        if (answer.correct) {
            answerButton.dataset.correct = answer.correct;

        }
        answerButton.addEventListener('click', selectAnswer)
        answers.appendChild(answerButton)

    })
}

//wariant porażki
function lostGame() {
    gameSection.classList.add('hide');
    resultSection.classList.remove('hide');
    resultText.innerHTML = `Niestety, nie udało Ci się ukończyć gry. Twój wynik  to  ${points}. Możesz spóbować jeszcze raz i pobić swój najlepszy wynik`;
    menu.classList.remove('hide');
    scoreResult.classList.add('hide');
    addRanking();
}
//reset wariantów
function resetState() {
    i = 0;
    while (answers.firstChild) {
        answers.removeChild(answers.firstChild);
    }
}

//wybór odpowiedzi
function selectAnswer(e) {
    const selectedButton = e.target;

    const correct = selectedButton.dataset.correct
    if (correct) {
        selectedButton.classList.add('correct');
        points = points + 15;
        score.innerHTML = points;
        halfChangeUsed = 0;


        if (mixQuestions.length > questionNumber + 1) {

            setTimeout(function () {
                questionNumber++;
                nextQuestion();
            }, 1500);
        } else {
            setTimeout(function () {
                menu.classList.remove('hide');
                gameSection.classList.add('hide');
                resultSection.classList.remove('hide');
                resultText.innerHTML = `Koniec gry! Udało się dojść do końca. Twój uzyskany wynik to ${points}. Gratulacje!`;
                scoreResult.classList.add('hide');
                addRanking();
            }, 1500);

        }
        if (mixQuestions.length == questionNumber + 2) {
            question.innerHTML = "PYTANIE FINAŁOWE " + question.textContent;

            halfChangeUsed = 1;
            helpRingsStatus();
        }


    }
    else {
        setTimeout(function () {
            lostGame();
        }, 1500);



    }



    Array.from(answers.children).forEach(button => {
        button.disabled = true;
        button.style.pointerEvents = "none";
        setStatusClass(button, button.dataset.correct)
    })

}


//pokazanie poprawności odpowiedzi
function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')



    } else {
        element.classList.add('wrong')


    }


}

//czyszczenie poporawności odpowiedzi
function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');

}

//dodatnie rekordu do tablicy wyników
function addRanking() {
    const liElement = document.createElement('li');

    liElement.innerHTML = `Gra ${game} - Wynik: ${points}`;
    ranking.appendChild(liElement);



}

//start gry
startGame.addEventListener('click', () => {
    menu.classList.add('hide');
    gameSection.classList.remove('hide');
    scoreResult.classList.remove('hide');
    startQuiz();
})

//zasady gry
howToPlay.addEventListener('click', () => {
    howPlaySection.classList.remove('hide');
    closer.classList.remove('hide');
    menu.classList.add('hide');
    resultSection.classList.add('hide');

})

closer.addEventListener('click', () => {
    howPlaySection.classList.add('hide');
    closer.classList.add('hide');
    menu.classList.remove('hide');
    rankingSection.classList.add('hide');
    container.classList.remove('hide');
    resultSection.classList.add('hide');

})


//tablica wynikow
results.addEventListener('click', () => {
    rankingSection.classList.remove('hide');
    closer.classList.remove('hide');
    menu.classList.add('hide');
    resultSection.classList.add('hide');

    if (game == 0) {

        rankingMessage.classList.remove('hide');

    }
    else {
        rankingMessage.classList.add('hide');
    }
})
//funkcja koła 50:50
function sprawdzenie() {
    Array.from(answers.children).sort(() => Math.random() - .5).forEach(button => {
        if (i < 2) {
            if (!button.dataset.correct) {
                button.disabled = 'true';
                button.innerHTML.text = "";
                button.style.opacity = "0.5";
                button.style.pointerEvents = "none";
                i++;
            }
        }
    })
}
//wywołanie koła ratunkowe 50:50
halfOptions.addEventListener('click', () => {
    halfChangeUsed = 1;
    helpRingsStatus();
    sprawdzenie();

    points = points - halfPrice;
    score.innerHTML = points;
    halfPrice = halfPrice + 10;




});

function skip() {
    halfChangeUsed = 1;
    questionNumber++;
    nextQuestion();
    points = points - skipPrice;
    score.innerHTML = points;
    skipPrice = skipPrice * 2;

    helpRingsStatus();
}
skipQuestion.addEventListener('click', () => {
    skip();
})
function helpRingsStatus() {

    if (points < skipPrice || halfChangeUsed == 1) {

        skipQuestion.disabled = true;
        skipQuestion.classList.remove('canUse');

    }
    else {

        skipQuestion.disabled = false;
        skipQuestion.classList.add('canUse');
    }
    if (points < halfPrice || halfChangeUsed == 1) {
        halfOptions.disabled = true;
        halfOptions.classList.remove('canUse');

    }
    else {

        halfOptions.disabled = false;
        halfOptions.classList.add('canUse');
    }
}
//Pytania gry
const questions = [
    {
        question: 'Z iloma krajami graniczy Polska?',
        answers: [
            { text: '5', correct: false },
            { text: '6', correct: false },
            { text: '7', correct: true },
            { text: '8', correct: false }
        ]
    },
    {
        question: 'Data ataku terrorystycznego na World Trade Center miał miejsce:',
        answers: [
            { text: '11 września 2001', correct: true },
            { text: '15 października 2003', correct: false },
            { text: '15 września 2003', correct: false },
            { text: '11 października 2001', correct: false }
        ]
    },
    {
        question: 'Na tablicy Mendelejewa symbol P oznacza:',
        answers: [
            { text: 'Fosfor', correct: true },
            { text: 'Potas', correct: false },
            { text: 'Węgiel', correct: false },
            { text: 'Krzem', correct: false }
        ]
    },
    {
        question: 'Dzieło literackie pt" Wesele" napisał:',
        answers: [
            { text: 'Stanisław Wyspiański', correct: true },
            { text: 'Franz Kafka', correct: false },
            { text: 'Adam Mickiewicz', correct: false },
            { text: 'Zofia Nałkowska', correct: false }
        ]
    },
    {
        question: 'Stolicą wojewódzctwa podkarpackiego jest:',
        answers: [
            { text: 'Rzeszów', correct: true },
            { text: 'Kraków', correct: false },
            { text: 'Białystok', correct: false },
            { text: 'Zielona Góra', correct: false }
        ]
    },
    {
        question: 'Kto jest autorem piosenki "Nie płacz Ewka"?',
        answers: [
            { text: 'Perfekt', correct: true },
            { text: 'Lady Pank', correct: false },
            { text: 'Maryla Rodowicz', correct: false },
            { text: 'Mata', correct: false }
        ]
    },
    {
        question: 'Kto jest bohaterem powieści "Ludzie bezdomni" ',
        answers: [
            { text: 'Stanisław Wokulski', correct: false },
            { text: 'Tomasz Judym', correct: true },
            { text: 'Ignacy Rzecki', correct: false },
            { text: 'Cezary Baryka', correct: false }
        ]
    }, {
        question: 'Stolicą Estonii jest: ',
        answers: [
            { text: 'Moskwa', correct: false },
            { text: 'Tallinn', correct: true },
            { text: 'Ryga', correct: false },
            { text: 'Erywań', correct: false }
        ]
    }, {
        question: 'Językiem programowania nie jest: ',
        answers: [
            { text: 'JavaScript', correct: false },
            { text: 'HTML', correct: true },
            { text: 'PHP', correct: false },
            { text: 'Java', correct: false }
        ]
    }, {
        question: 'Który Polski piłkarz, został w przeszłości królem strzelców na Mundialu Mistrzostw Świata? ',
        answers: [
            { text: 'Robert Lewandowski', correct: false },
            { text: 'Grzegorz Lato', correct: true },
            { text: 'Kazimierz Deyna', correct: false },
            { text: 'Zbigniew Boniek', correct: false }
        ]
    }, {
        question: 'Rekord świata w biegu na 100 metrów wynosi: ',
        answers: [
            { text: '9:58', correct: true },
            { text: '10:17', correct: false },
            { text: '7:22', correct: false },
            { text: '8:51', correct: false }
        ]
    },


]
    ;
