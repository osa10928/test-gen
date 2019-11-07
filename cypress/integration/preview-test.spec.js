describe("Test", ()=> {
  beforeEach(() => {
    cy.visit('/');
    cy.get('#test-name').type(Cypress.config('testName'));
    cy.get('#passing-grade').type(Cypress.config('passingGrade'));
    cy.get('#checkbox-published-input').check({ force: true });

    cy.get('#add-question-btn').click();
    cy.get('#selected-question').should('contain', '1');
    cy.get('#question-1').type(Cypress.config('question0'));
    cy.get("#add-answer-btn-0").click().click().click();
    cy.get("#answer-0-0").type(Cypress.config('answer0-0'));
    cy.get("#answer-0-1").type(Cypress.config('answer0-1'));
    cy.get("#answer-0-2").type(Cypress.config('answer0-2'));
    cy.get(`#is-correct-checkbox-${Cypress.config('correct0')}-input`).check({ force: true });

    cy.get('#add-question-btn').click();
    cy.get('#selected-question').should('contain', '2');
    cy.get('#question-2').type(Cypress.config('question1'));
    cy.get("#add-answer-btn-1").click().click().click();
    cy.get("#answer-1-0").type(Cypress.config('answer1-0'));
    cy.get("#answer-1-1").type(Cypress.config('answer1-1'));
    cy.get("#answer-1-2").type(Cypress.config('answer1-2'));
    cy.get(`#is-correct-checkbox-${Cypress.config('correct1')}-input`).check({ force: true });

    cy.get('#add-question-btn').click();
    cy.get('#selected-question').should('contain', '3');
    cy.get('#question-3').type(Cypress.config('question2'));
    cy.get("#add-answer-btn-2").click().click()
    cy.get("#answer-2-0").type(Cypress.config('answer2-0'));
    cy.get("#answer-2-1").type(Cypress.config('answer2-1'));
    cy.get(`#is-correct-checkbox-${Cypress.config('correct2')}-input`).check({ force: true });
  });

  it("should have a preview", () => {
    cy.get('#preview-test-button').click();
    cy.get('#preview-header').should('contain', `Preview ${Cypress.config('testName')}`);

    cy.get('.mat-radio-checked').each((selected, index) => {
      cy.wrap(selected).should('contain', Cypress.config('correctAnswers')[index]);
    });
  });

  it.only("should send a test", () => {
    cy.get('#save-test-button').click()
  })
});
