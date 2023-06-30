interface Quiz {
  quizname: string; // max lenght is 25
  questions: Question[]; // min length is 2
}

interface Question {
  question: string; // min lenght is 5
  options: Option[]; // max is 4 options
  explanation: string; // the max is 500 characters
  time: 0 | 15 | 30 | 45 | 60; //
}

interface Option {
  option: string; // max length is 100
  correct: boolean;
}

// Array of Quizzes

const quizzes: Quiz[] = [
  // Quiz 5: Science Discoveries
  {
    quizname: "Scientific Discoveries",
    questions: [
      {
        question: "Which scientist proposed the theory of evolution by natural selection?",
        options: [
          { option: "Isaac Newton", correct: false },
          { option: "Charles Darwin", correct: true },
          { option: "Gregor Mendel", correct: false },
          { option: "Louis Pasteur", correct: false }
        ],
        explanation: "Charles Darwin's theory of evolution by natural selection revolutionized our understanding of species diversity.",
        time: 45
      },
      {
        question: "Which element is the most abundant in the Earth's atmosphere?",
        options: [
          { option: "Oxygen", correct: true },
          { option: "Nitrogen", correct: false },
          { option: "Carbon", correct: false },
          { option: "Hydrogen", correct: false }
        ],
        explanation: "Oxygen is the most abundant element in the Earth's atmosphere, essential for supporting life.",
        time: 30
      },
      {
        question: "Who discovered penicillin, a life-saving antibiotic?",
        options: [
          { option: "Alexander Fleming", correct: true },
          { option: "Marie Curie", correct: false },
          { option: "Louis Pasteur", correct: false },
          { option: "Antoine Lavoisier", correct: false }
        ],
        explanation: "Alexander Fleming's discovery of penicillin revolutionized medicine by introducing the first antibiotic.",
        time: 45
      },
      // Add more questions...
    ]
  },
  // Quiz 6: World Religions
  {
    quizname: "World Religions",
    questions: [
      {
        question: "Which religion follows the teachings of the Prophet Muhammad?",
        options: [
          { option: "Islam", correct: true },
          { option: "Christianity", correct: false },
          { option: "Hinduism", correct: false },
          { option: "Buddhism", correct: false }
        ],
        explanation: "Islam is a monotheistic religion that follows the teachings of the Prophet Muhammad as recorded in the Quran.",
        time: 30
      },
      {
        question: "Which religion believes in the concept of karma and reincarnation?",
        options: [
          { option: "Christianity", correct: false },
          { option: "Buddhism", correct: true },
          { option: "Judaism", correct: false },
          { option: "Sikhism", correct: false }
        ],
        explanation: "Buddhism teaches the belief in karma and reincarnation as part of the cycle of birth, death, and rebirth.",
        time: 45
      },
      {
        question: "Who is considered the central figure of Christianity?",
        options: [
          { option: "Jesus Christ", correct: true },
          { option: "Buddha", correct: false },
          { option: "Muhammad", correct: false },
          { option: "Moses", correct: false }
        ],
        explanation: "Jesus Christ is regarded as the central figure of Christianity, believed to be the Son of God and the savior of humanity.",
        time: 30
      },
      // Add more questions...
    ]
  }
]

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
        cy.wait(2000);

        if(question.time > 0){
          cy.get('.MuiInputBase-root > #time').click()
          cy.get(`[data-value="${question.time}"]`).click()
        }
        const options = question.options;
        for (let k = 0; k < options.length; k++) {
          cy.findByPlaceholderText(/add option/i).type(`${options[k].option}{enter}`);
          if (options[k].correct) {
            cy.wait(2000);
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
