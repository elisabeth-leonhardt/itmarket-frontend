import {render, screen} from '@testing-library/react';

describe('a ver si funciona Jest', () => {
    it('sumando dos números', () => {
        expect(1 +1 ).toBe(2);
    })
    it('render something', () => {
        const {container, debug} = render(<p>Hola tests!</p>);
        expect(screen.getByText('Hola tests!')).toBeInTheDocument();
    })
})