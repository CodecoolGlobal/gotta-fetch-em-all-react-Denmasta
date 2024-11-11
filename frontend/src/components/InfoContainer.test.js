import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import InfoContainer from './InfoContainer';
import battlehelper from './battlehelper';

const mockSetItem = jest.fn();
global.localStorage.setItem = mockSetItem;

jest.mock('./battlehelper', () => ({
    gameLoop: jest.fn(),
    gameData: {
        gameOver: false,
        info: 'Ally used attack!',
        winner: '',
    },
    resetBattle: jest.fn(),
}));

describe('InfoContainer Component', () => {
    const setGameData = jest.fn();
    const setPage = jest.fn();
    const enemyPokemon = {
        name: 'Charizard',
    };
    const allyPokemon = {
        name: 'Bulbasaur',
    };

    beforeEach(() => {
        setGameData.mockClear();
        setPage.mockClear();
    });

    it('renders battle info and attack button when the game is ongoing', () => {
        render(
            <InfoContainer
                enemyPokemon={enemyPokemon}
                allyPokemon={allyPokemon}
                setGameData={setGameData}
                setPage={setPage}
            />
        );

        const infoText = screen.getByText('Ally used attack!');
        expect(infoText).toBeInTheDocument();

        const attackButton = screen.getByText('Attack');
        expect(attackButton).toBeInTheDocument();
    });

    it('calls handleAttack and updates game data when the attack button is clicked', async () => {
        battlehelper.gameLoop.mockImplementation(() => {
            battlehelper.gameData.info = 'Bulbasaur dealt damage to Charizard!';
            battlehelper.gameData.gameOver = false;
        });

        render(
            <InfoContainer
                enemyPokemon={enemyPokemon}
                allyPokemon={allyPokemon}
                setGameData={setGameData}
                setPage={setPage}
            />
        );

        jest.useFakeTimers();

        const attackButton = screen.getByText('Attack');
        fireEvent.click(attackButton);

        jest.runAllTimers();

        await waitFor(() => {

            expect(setGameData).toHaveBeenCalledTimes(2);

            expect(setGameData).toHaveBeenCalledWith({
                ...battlehelper.gameData,
            });
        });
    });

    it('renders the winner message and Go home button when the game is over', () => {
        localStorage.setItem('currentPokemons', 'https://pokeapi.co/api/v2/pokemon/bulbasaur');
        battlehelper.gameData.gameOver = true;
        battlehelper.gameData.winner = 'You won';

        render(
            <InfoContainer
                enemyPokemon={enemyPokemon}
                allyPokemon={allyPokemon}
                setGameData={setGameData}
                setPage={setPage}
            />
        );

        const winnerMessage = screen.getByText('You won');
        expect(winnerMessage).toBeInTheDocument();

        const goHomeButton = screen.getByText('Go home');
        expect(goHomeButton).toBeInTheDocument();
    });

    it('displays a message when the enemy has been caught', () => {
        localStorage.setItem('currentPokemons', 'Charizard');

        battlehelper.gameData.gameOver = true;
        battlehelper.gameData.winner = 'You won';

        render(
            <InfoContainer
                enemyPokemon={enemyPokemon}
                allyPokemon={allyPokemon}
                setGameData={setGameData}
                setPage={setPage}
            />
        );

        const caughtMessage = screen.getByText('Charizard is already in your pokemon collection!');
        expect(caughtMessage).toBeInTheDocument();
    });

    it('resets battle and navigates to home when Go home button is clicked', () => {
        render(
            <InfoContainer
                enemyPokemon={enemyPokemon}
                allyPokemon={allyPokemon}
                setGameData={setGameData}
                setPage={setPage}
            />
        );

        battlehelper.gameData.gameOver = true;
        battlehelper.gameData.winner = 'You won';

        const goHomeButton = screen.getByText('Go home');
        fireEvent.click(goHomeButton);

        expect(battlehelper.resetBattle).toHaveBeenCalled();
        expect(setPage).toHaveBeenCalledWith('home');
    });
});