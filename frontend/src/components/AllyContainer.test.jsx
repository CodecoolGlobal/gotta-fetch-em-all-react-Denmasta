import React from 'react';
import { render, screen } from '@testing-library/react';
import AllyContainer from './AllyContainer';

const mockGameData = {
    ally: {
        hp: 80,
    },
};

describe('AllyContainer Component', () => {
    const allyPokemon = {
        name: 'Charizard',
        stats: [{ base_stat: 100 }],
        sprites: { back_default: 'charizard.png' },
    };

    it('renders the ally name correctly', () => {
        render(<AllyContainer allyPokemon={allyPokemon} gameData={mockGameData} />);

        const allyName = screen.getByText('Charizard');
        expect(allyName).toBeInTheDocument();
    });

    it('renders the Healtbar with correct props', () => {
        render(<AllyContainer allyPokemon={allyPokemon} gameData={mockGameData} />);

        const healtbar = screen.getByTestId('healt-bar');
        expect(healtbar).toHaveStyle('width: 80%');
    });

    it('renders the ally image correctly', () => {
        render(<AllyContainer allyPokemon={allyPokemon} gameData={mockGameData} />);

        const allyImg = screen.getByAltText('Charizard');
        expect(allyImg).toBeInTheDocument();
        expect(allyImg).toHaveAttribute('src', 'charizard.png');
    });

    it('correctly handles health changes after damage', () => {
        mockGameData.ally.hp = 80;
        const updatedAllyPokemon = {
            ...allyPokemon,
            stats: [{ base_stat: 100 }],
        };

        mockGameData.ally.hp = 40;
        render(<AllyContainer allyPokemon={updatedAllyPokemon} gameData={mockGameData} />);

        const healtbar = screen.getByTestId('healt-bar');
        expect(healtbar).toHaveStyle('width: 40%');

        const allyName = screen.getByText('Charizard');
        expect(allyName).toBeInTheDocument();
    });
});