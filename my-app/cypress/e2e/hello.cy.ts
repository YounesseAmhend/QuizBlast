interface Quiz {
  quizname: string; // max lenght is 25
  questions: Question[]; // min length is 2
}

interface Question {
  question: string; // min lenght is 5
  options: Option[]; // max is 4 options
  explanation: string; // the max is 500 characters
}

interface Option {
  option: string; // max length is 100
  correct: boolean;
}

// Array of Quizzes
const quizzes: Quiz[] = [
  // Quiz 1: Science
  {
    quizname: "Science Quiz",
    questions: [
      {
        question: "What is the chemical symbol for Gold?",
        options: [
          { option: "Au", correct: true },
          { option: "Ag", correct: false },
          { option: "Fe", correct: false },
          { option: "Hg", correct: false }
        ],
        explanation: "The chemical symbol for Gold is Au, derived from the Latin word 'aurum'. Gold is a precious metal known for its lustrous yellow color and its high value in jewelry and investment."
      },
      {
        question: "What is the largest planet in our solar system?",
        options: [
          { option: "Jupiter", correct: true },
          { option: "Saturn", correct: false },
          { option: "Earth", correct: false },
          { option: "Mars", correct: false }
        ],
        explanation: "Jupiter is the largest planet in our solar system. It is a gas giant with a diameter of about 143,000 kilometers (88,800 miles). Jupiter is known for its iconic swirling storms, including the Great Red Spot, which is a massive storm system larger than Earth."
      },
      {
        question: "Who discovered the theory of relativity?",
        options: [
          { option: "Albert Einstein", correct: true },
          { option: "Isaac Newton", correct: false },
          { option: "Galileo Galilei", correct: false },
          { option: "Nikola Tesla", correct: false }
        ],
        explanation: "Albert Einstein is credited with discovering the theory of relativity, which revolutionized our understanding of space, time, and gravity. His famous equation, E = mc^2, demonstrates the equivalence of energy (E) and mass (m) and the fundamental relationship between matter and energy."
      },
      {
        question: "What is the process of plants converting sunlight into energy called?",
        options: [
          { option: "Photosynthesis", correct: true },
          { option: "Respiration", correct: false },
          { option: "Fermentation", correct: false },
          { option: "Transpiration", correct: false }
        ],
        explanation: "The process of plants converting sunlight into energy is called photosynthesis. During photosynthesis, plants use chlorophyll and other pigments to capture light energy and convert it into chemical energy in the form of glucose. This process is essential for the production of oxygen and the sustenance of life on Earth."
      }
    ]
  },

  // Quiz 2: History
  {
    quizname: "History Quiz",
    questions: [
      {
        question: "Which year did World War II end?",
        options: [
          { option: "1945", correct: true },
          { option: "1939", correct: false },
          { option: "1918", correct: false },
          { option: "1941", correct: false }
        ],
        explanation: "World War II ended in the year 1945. The war began in 1939 and involved many countries across the globe. It was a major conflict characterized by significant military engagements, atrocities, and the use of nuclear weapons, ultimately resulting in the defeat of the Axis powers and the establishment of the United Nations."
      },
      {
        question: "Who was the first President of the United States?",
        options: [
          { option: "George Washington", correct: true },
          { option: "Thomas Jefferson", correct: false },
          { option: "Abraham Lincoln", correct: false },
          { option: "John F. Kennedy", correct: false }
        ],
        explanation: "George Washington was the first President of the United States. He served as the country's president from 1789 to 1797 and played a crucial role in the formation and early years of the United States. Washington is widely regarded as one of the Founding Fathers of the nation."
      },
      {
        question: "Who wrote the famous play 'Romeo and Juliet'?",
        options: [
          { option: "William Shakespeare", correct: true },
          { option: "Jane Austen", correct: false },
          { option: "Charles Dickens", correct: false },
          { option: "Oscar Wilde", correct: false }
        ],
        explanation: "The famous play 'Romeo and Juliet' was written by William Shakespeare, a renowned playwright and poet. The tragic love story of Romeo and Juliet has captivated audiences for centuries and has become one of Shakespeare's most well-known works."
      },
      {
        question: "Which European explorer is credited with discovering America?",
        options: [
          { option: "Christopher Columbus", correct: true },
          { option: "Vasco da Gama", correct: false },
          { option: "Ferdinand Magellan", correct: false },
          { option: "James Cook", correct: false }
        ],
        explanation: "Christopher Columbus is credited with discovering America. In 1492, he embarked on a voyage sponsored by the Spanish monarchs and arrived in the Americas, opening the era of European exploration and colonization in the New World."
      },
      {
        question: "In which year did the French Revolution begin?",
        options: [
          { option: "1789", correct: true },
          { option: "1776", correct: false },
          { option: "1804", correct: false },
          { option: "1848", correct: false }
        ],
        explanation: "The French Revolution began in the year 1789. It was a period of radical social and political upheaval in France that had a significant impact on the country's history and influenced the development of modern political ideologies."
      }
    ]
  },

  // Quiz 3: Geography
  {
    quizname: "Geography Quiz",
    questions: [
      {
        question: "Which is the largest continent by land area?",
        options: [
          { option: "Asia", correct: true },
          { option: "Africa", correct: false },
          { option: "North America", correct: false },
          { option: "South America", correct: false }
        ],
        explanation: "Asia is the largest continent by land area, covering approximately 30% of the Earth's total land area. It is home to diverse landscapes, cultures, and a significant portion of the world's population."
      },
      {
        question: "Which is the longest river in the world?",
        options: [
          { option: "Nile", correct: true },
          { option: "Amazon", correct: false },
          { option: "Yangtze", correct: false },
          { option: "Mississippi", correct: false }
        ],
        explanation: "The Nile River is the longest river in the world, spanning approximately 6,650 kilometers (4,130 miles) in length. It flows through multiple countries in northeastern Africa and has played a crucial role in the development of ancient civilizations."
      },
      {
        question: "Which country is known as the 'Land of the Rising Sun'?",
        options: [
          { option: "Japan", correct: true },
          { option: "China", correct: false },
          { option: "South Korea", correct: false },
          { option: "Vietnam", correct: false }
        ],
        explanation: "Japan is known as the 'Land of the Rising Sun.' The name refers to the country's location to the east of the Asian continent, where the sunrise is visible before other countries. The phrase is symbolic of Japan's cultural heritage and its position as the easternmost major nation."
      },
      {
        question: "What is the capital city of Australia?",
        options: [
          { option: "Canberra", correct: true },
          { option: "Sydney", correct: false },
          { option: "Melbourne", correct: false },
          { option: "Perth", correct: false }
        ],
        explanation: "The capital city of Australia is Canberra. It is located in the Australian Capital Territory and serves as the administrative center of the country. Canberra was purpose-built as the capital in the early 20th century and is known for its planned layout and iconic landmarks."
      },
      {
        question: "Which mountain range is located in South America?",
        options: [
          { option: "Andes", correct: true },
          { option: "Himalayas", correct: false },
          { option: "Rocky Mountains", correct: false },
          { option: "Alps", correct: false }
        ],
        explanation: "The Andes is the mountain range located in South America. It is the longest continental mountain range in the world, stretching over 7,000 kilometers (4,300 miles) along the western coast of the continent. The Andes is known for its stunning peaks, including Mount Aconcagua, the highest peak outside of Asia."
      }
    ]
  },

  // Add more quizzes here...
];


// Add more quizzes here...



describe('template spec', () => {
  it('First test', () => {
    cy.visit('http://127.0.0.1:3000/') 
    cy.findByText(/log in/i).click()
    cy.findByRole('textbox').type("younesse")
    cy.findByPlaceholderText(/password/i).type("123456")
    cy.findByRole('button', { name: /login/i }).click()
    cy.wait(1000);
    for (let i = 0; i < quizzes.length; i++) {
      cy.findByText(/new quiz/i).click()
      cy.wait(1000);
      cy.wait(1000);
      cy.get('#formBasicEmail').type(quizzes[i].quizname)
      cy.wait(1000);
      cy.wait(1000);
      cy.get('button[type="submit"]').contains(/next/i).click();
      cy.wait(1000);
      cy.wait(1000);
      const questions = quizzes[i].questions;
      cy.wait(1000);
      for (let j = 0; j < questions.length; j++) {
        const question = questions[j];
        cy.wait(1000);
        cy.get('#formBasicEmail').type(`${question.question}{enter}`);
        cy.wait(1000);

        const options = question.options;
        for (let k = 0; k < options.length; k++) {
          cy.findByPlaceholderText(/add option/i).type(`${options[k].option}{enter}`);
          if (options[k].correct) {
            cy.wait(1000);
            cy.findByText(options[k].option).click();
          }
        }
        cy.wait(1000);
        cy.get('.relative > .w-full').type(question.explanation);
         cy.wait(1000);
        cy.findByRole('button', { name: /next/i }).click();
      }
     
      cy.wait(1000);
      cy.wait(1000);
      cy.findByText("Save").click();
      cy.wait(1000);
      cy.wait(1000);
      cy.wait(1000);
    }
  })
})
