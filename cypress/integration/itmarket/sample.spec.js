import { cyan } from "@mui/material/colors"

describe('Test Header and Footer', () => {
    it('does not do much!', () => {
        cy.visit('localhost:3000');
        cy.contains('Productos')
    })
})