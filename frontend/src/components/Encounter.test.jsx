import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Encounter from './Encounter';
import '@testing-library/jest-dom/extend-expect';

global.fetch = jest.fn();

describe('Encounter Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("displays a message when no pokémon are available at the location", async () => {
        fetch.mockImplementationOnce(() =>
            Promise.resolve({
                json: () => Promise.resolve({
                    areas: []
                })
            })
        );

        fetch.mockImplementationOnce(() =>
            Promise.resolve({
                json: () => Promise.resolve({
                    name: 'bulbasaur',
                    sprites: { front_default: 'bulbasaur_sprite_url' }
                })
            })
        );

        fetch.mockImplementationOnce(() =>
            Promise.resolve({
                json: () => Promise.resolve({
                    name: 'charizard',
                    sprites: { front_default: 'charizard_sprite_url' }
                })
            })
        );

        localStorage.setItem('currentPokemons', 'https://pokeapi.co/api/v2/pokemon/bulbasaur');

        render(<Encounter encId={1} setPage={jest.fn()} setEnemyPokemon={jest.fn()} setAllyPokemon={jest.fn()} />);

        await waitFor(() => expect(screen.getByText(/This location doesn't seem to have any pokémon/i)).toBeInTheDocument());
    });

});