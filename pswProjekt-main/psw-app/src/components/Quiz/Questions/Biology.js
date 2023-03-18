export const questionsBiology = [
    {
        question: "What is the function of ribosomes?",
        answersList: ["Make proteins", "Transport molecules", "Store energy", "Replicate DNA"],
        correctAnswer: "Make proteins",
        category: "Cell Biology",
        type: "singleChoice"
    },
    {
        question: "The heart pumps oxygenated blood to the body.",
        correctAnswer: "true",
        category: "Biology",
        type: "trueFalse"
    },
    {
        question: "The _____ is the process by which living organisms produce new individuals that have the same genetic makeup as themselves.",
        correctAnswer: "reproduction",
        category: "biology",
        type: "fillIn"
    },
    {
        question: "Which organ is responsible for filtering blood in the human body?",
        answersList: ["Liver", "Kidneys", "Lungs", "Stomach"],
        correctAnswer: "Kidneys",
        category: "Biology",
        type: "pickFrom"
    },
    {
        question: "The _____ is the scientific study of the structure, function, growth, evolution, and distribution of organisms.",
        correctAnswer: "biology",
        category: "biology",
        type: "fillIn"
    },
    {
        question: "Which of the following is a function of enzymes?",
        answersList: ["Catalyzing reactions", "Transport molecules", "Store energy", "Replicate DNA"],
        correctAnswer: "Catalyzing reactions",
        category: "biology",
        type: "singleChoice"
    },
    {
        question: "Match the kings to the countries:",
        elements1: ["cardiologist", "neurologist", "laryngologist"],
        answersList: ["ears", "head", "heart"],
        correctAnswer: ["heart", "head", "ears"],
        category: "biology",
        type: "matchElem"
    },
    {
        question: '',
        type: '-'
    }
]

export function addItem(item) {
    questionsBiology.push(item);
}

export function getItems() {
    return questionsBiology;
}

export default questionsBiology;