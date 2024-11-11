import React from 'react';
import { render, screen } from '@testing-library/react';
import Healtbar from './Healtbar';

describe('Healtbar Component', () => {
    it('renders correctly with initial healt and current healt', () => {
        const healt = 100;
        const currentHealt = 50;

        render(<Healtbar healt={healt} currentHealt={currentHealt} />);

        const healtBar = screen.getByTestId('healt-bar');
        expect(healtBar).toHaveStyle(`width: 50%`);

        const healtText = screen.getByText('100/50');
        expect(healtText).toBeInTheDocument();
    });


    it('renders correctly with full healt (currentHealt equals healt)', () => {
        const healt = 100;
        const currentHealt = 100;

        render(<Healtbar healt={healt} currentHealt={currentHealt} />);

        const healtBar = screen.getByTestId('healt-bar');
        expect(healtBar).toHaveStyle(`width: 100%`);

        const healtText = screen.getByText('100/100');
        expect(healtText).toBeInTheDocument();
    });

    it('renders with a different healt value (e.g., 75/100)', () => {
        const healt = 100;
        const currentHealt = 75;

        render(<Healtbar healt={healt} currentHealt={currentHealt} />);

        const healtBar = screen.getByTestId('healt-bar');
        expect(healtBar).toHaveStyle(`width: 75%`);

        const healtText = screen.getByText('100/75');
        expect(healtText).toBeInTheDocument();
    });
});