

describe('template spec', () => {
  it('First test', () => {
    cy.visit('http://127.0.0.1:3000/') 
    cy.findByText(/log in/i).click()
    cy.findByRole('textbox').type("younesse")
    cy.findByPlaceholderText(/password/i).type("123456")
    cy.findByRole('button', {
      name: /login/i
    }).click()
    // clicking new
    cy.findByText(/new quiz/i).click()
    // typing some quiz 
    cy.findByRole('textbox').type("Testing")
    // clicking next
    cy.findByRole('button', {
      name: /next/i
    }).click()
    const QuestionLength = 4
    for (let i = 0; i < QuestionLength; i++){
      // enter question // click enter
      cy.findByRole('textbox').type(`Question${i+1}{enter}`)
      // enter options
      cy.findByPlaceholderText(/add option/i).type("option1{enter}")
      cy.findByPlaceholderText(/add option/i).type("option2{enter}")
      cy.findByPlaceholderText(/add option/i).type("option3{enter}")
      // chosing correct option
      cy.findByText(`option${2}`).click()
      // deleting option
      cy.get(`#quiz-form-container > div > div:nth-child(2) > div:nth-child(2) > div:nth-child(${3}) > i`).click()
      // clicking next
      cy.findByRole('button', {
        name: /next/i
      }).click()
    }
    cy.findByRole('button', {
      name: /back/i
    }).click()
    cy.get(`#quiz-form-container > div > div:nth-child(2) > div:nth-child(2) > div:nth-child(${1}) > i`).click()
    // click plus 
    cy.get('#add-option-btn').click()
    // type option
    cy.findByPlaceholderText(/add option/i).type("Option4{enter}")
    for(let i = 0; i < QuestionLength+1; i++){
      cy.wait(500)
      cy.findByRole('button', {
        name: /back/i
      }).click()
    }
    // modifing quiz name
    cy.findByRole('textbox').type("QUiz modififed")
    // click save
    cy.findByText("Save").click()
  })
})