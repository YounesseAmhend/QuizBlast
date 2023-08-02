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

]

describe('template spec', () => {
  it('First test', () => {
    cy.visit('http://127.0.0.1:8000/') 
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
