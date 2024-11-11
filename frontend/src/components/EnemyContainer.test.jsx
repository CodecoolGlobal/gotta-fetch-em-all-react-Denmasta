import React from 'react';
import { render, screen } from '@testing-library/react';
import EnemyContainer from './EnemyContainer';
import battlehelper from './battlehelper';

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

describe('EnemyContainer Component', () => {
    const enemyPokemon = {
        name: 'Pikachu',
        stats: [{ base_stat: 100 }],
        sprites: { front_default: 'pikachu.png' },
    };

    it('renders the enemy name correctly', () => {
        render(<EnemyContainer enemyPokemon={enemyPokemon} />);

        const enemyName = screen.getByText('Pikachu');
        expect(enemyName).toBeInTheDocument();
    });

    it('renders the Healtbar with correct props', () => {
        render(<EnemyContainer enemyPokemon={enemyPokemon} />);

        const healtbar = screen.getByTestId('healt-bar');
        expect(healtbar).toHaveStyle('width: 50%');
    });

    it('renders the enemy image correctly', () => {
        render(<EnemyContainer enemyPokemon={enemyPokemon} />);

        const enemyImg = screen.getByAltText('Pikachu');
        expect(enemyImg).toBeInTheDocument();
        expect(enemyImg).toHaveAttribute('src', 'pikachu.png');
    });

    it('correctly handles health changes after a player attack', () => {
        battlehelper.gameData.enemy.hp = 50;
        const updatedEnemyPokemon = {
            ...enemyPokemon,
            stats: [{ base_stat: 100 }],
        };

        battlehelper.gameData.enemy.hp = 25;
        render(<EnemyContainer enemyPokemon={updatedEnemyPokemon} />);

        const healtbar = screen.getByTestId('healt-bar');
        expect(healtbar).toHaveStyle('width: 25%');

        const enemyName = screen.getByText('Pikachu');
        expect(enemyName).toBeInTheDocument();
    });
});