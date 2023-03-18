export const questionsHistory = [
    {
        question: "Which empire was founded by Alexander the Great?",
        answersList: ["Roman", "Byzantine", "Macedonian", "Ottoman"],
        correctAnswer: "Macedonian",
        category: "History",
        type: "singleChoice"
    },
    {
        question: "Match the kings to the countries:",
        elements1: ["Kazimierz Wielki", "Karol V Habsburg","Mikołaj II Aleksandrowicz Romanow"],
        answersList: ["Poland", "Russia", "Spain"],
        correctAnswer: ["Russia", "Poland", "Spain"],
        category: "history",
        type: "matchElem"
    },
    {
        question: "Which ancient civilization is credited with inventing the concept of zero?",
        answersList: ["Ancient Egyptians", "Ancient Greeks", "Ancient Romans", "Mayans"],
        correctAnswer: "Mayans",
        category: "History",
        type: "pickFrom"
    },
    {
        question: "Which ancient civilization built the Great Pyramid of Giza?",
        answersList: ["Egyptian", "Mesopotamian", "Mayan", "Indus"],
        correctAnswer: "Egyptian",
        category: "History",
        type: "singleChoice"
    },
    {
        question: "The American Civil War ended in the year 1864",
        correctAnswer: "false",
        category: "History",
        type: "trueFalse"
    },
    {
        question: "Napoleon Bonaparte died in exile on the island of __.",
        correctAnswer: "Elba",
        category: "history",
        type: "fillIn"
    },
    {
        question: "The ___ was a period of great cultural and intellectual activity in Europe during the 14th and 15th centuries.",
        correctAnswer: "Renaissance",
        category: "history",
        type: "fillIn"
    },
    {
        question: '',
        type: '-'
    }
]

export function addItem3(item) {
    questionsHistory.push(item);
}

export function getItems3() {
    return questionsHistory;
  }

export default questionsHistory;