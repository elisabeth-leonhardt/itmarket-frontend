import { cyan } from "@mui/material/colors"

describe('My First Test', () => {
    it('does not do much!', () => {
        cy.visit('localhost:3000');
        cy.contains('Productos')
    })
})