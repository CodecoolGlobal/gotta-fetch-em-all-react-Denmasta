import React from 'react';
import { render, screen } from '@testing-library/react';
import Battle from './Battle';



jest.mock('./battlehelper', () => ({
    gameData: {
        enemy: {
            hp: 50,
        },
        ally: {},
        gameStart: true,
        gameOver: false,
        winner: '',
        info: ''
    },
    gameLoop: jest.fn(),
    resetBattle: jest.fn(),
}));

describe('Battle component', () => {
    const mockSetPage = jest.fn();
    const allyPokemon = { name: 'Pikachu', stats: [{ base_stat: 100 }], sprites: { front_default: 'pikachu.png' } };
    const enemyPokemon = { name: 'Bulbasaur', stats: [{ base_stat: 100 }], sprites: { front_default: 'bulbasaur.png' } };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should render the battle layout correctly', () => {
        render(<Battle allyPokemon={allyPokemon} enemyPokemon={enemyPokemon} setPage={mockSetPage} />);

        expect(screen.getByTestId('enemy-container')).toBeInTheDocument();
        expect(screen.getByTestId('ally-container')).toBeInTheDocument();
        expect(screen.getByTestId('info-container')).toBeInTheDocument();
    });
});