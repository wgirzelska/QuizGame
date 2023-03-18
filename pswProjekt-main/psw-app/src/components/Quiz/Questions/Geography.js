export const questionsGeography = [
    {
        question: "Jaki jest największy kontynent na Ziemi?",
        answersList: ["Africa", "Asia", "Europe", "North America"],
        correctAnswer: "Asia",
        category: "Geography",
        type: "singleChoice"
    },
    {
        question: "What is the smallest continent on Earth?",
        answersList: ["Africa", "Antarctica", "Europe", "Australia"],
        correctAnswer: "Australia",
        category: "Geography",
        type: "singleChoice"
    },
    {
        question: "The highest point on Earth is Mount Everest. True or false?",
        answersList: [],
        correctAnswer: "true",
        category: "Geography",
        type: "trueFalse"
    },
    {
        question: "Which countries are part of the European Union?",
        answersList: [
          { text: "Germany", correct: true },
          { text: "United Kingdom", correct: true },
          { text: "Russia", correct: false },
          { text: "Brazil", correct: false }
        ],
        category: "Geography",
        type: "multipleChoice"
    },
    {
        question: "Which is the largest desert in the world?",
        answersList: ["Sahara", "Antarctica", "Arabian", "Gobi"],
        correctAnswer: "Sahara",
        category: "Geography",
        type: "singleChoice"
    },  
    {
        question: "What is the longest river in the world?",
        answersList: [],
        correctAnswer: "The Nile",
        category: "Geography",
        type: "shortAnswer"
    },
    {
        question: "Which of the following is the largest ocean?",
        answersList: ["Atlantic", "Indian", "Arctic", "Pacific"],
        correctAnswer: "Pacific",
        category: "Geography",
        type: "pickFrom"
    },
    {
        question: "The highest mountain in _____ is Mount Everest.",
        correctAnswer: "Nepal",
        category: "geography",
        type: "fillIn"
    },
    {
        question: "Which of the following are types of climate?",
        answersList: [
            { text: "Tropical", correct: true },
            { text: "Temperate", correct: true },
            { text: "Polar", correct: true },
            { text: "Arid", correct: false }
          ],
        category: "geography",
        type: "multipleChoice"
    },
    {
        question: "The equator is the line of latitude that separates the Northern Hemisphere from the Southern Hemisphere.",
        correctAnswer: "True",
        category: "geography",
        type: "trueFalse"
    },
    {
        question: "The capital of _____ is Rome.",
        answersList: [],
        correctAnswer: "Italy",
        category: "Geography",
        type: "fillIn"
    },
   
    {
        question: "Sort the following countries in order of size from largest to smallest:",
        answersList: ["Russia", "Brazil", "India", "China"],
        correctAnswer: ["Brazil", "Russia", "China", "India"],
        category: "Geography",
        type: "sortElem"
    },
    {
        question: "Match the following countries with their capitals:",
        elements1: ["France", "Germany", "Spain"],
        answersList: ["Madrit", "Berlin", "Paris"],
        correctAnswer: ["Paris", "Berlin", "Madrit"],
        category: "Geography",
        type: "matchElem"
    },
    {
        question: "Sort the following countries in order of size from largest to smallest: Canada, Mexico, United States, Brazil, Argentina",
        answersList: ["United States", "Brazil", "Candada", "Mexico", "Argentina"],
        correctAnswer: ["Canada", "United States", "Brazil", "Mexico", "Argentina"],
        category: "geography",
        type: "sortElem"
    },
    
    {
      question: '',
      answersList: [],
      type: '-'
    }
]

export function addItem2(item) {
    questionsGeography.push(item);
}

export function getItems2() {
    return questionsGeography;
  }

export default questionsGeography;