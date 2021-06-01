import React, { ChangeEvent, useState } from "react";
import { CustomInput } from "./CustomInput";
import axios from "axios";


const pokemonApiUrl = 'https://pokeapi.co/api/v2/';

type Ability = {
    ability: {
        name: string;
        url: string;
    };
    is_hidden: boolean;
    slot: number;
};

const Pokemon = () => {
    const [pokemonName, setPokemonName] = useState('');
    const [pokemonAbilities, setPokemonAbilities] = useState<Ability[]>([]);
    const [error, setError] = useState(null);

    const handleFetch = async (event: React.MouseEvent) => {
        let result;
        try {
            result = await axios.get(`${pokemonApiUrl}pokemon/${pokemonName}`)
            setPokemonAbilities(result.data.abilities)
        } catch (error) {
            setPokemonAbilities([]);
            setError(error)
        }
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPokemonName(event.target.value)
    };

    return (
        <div>
            <CustomInput value={pokemonName} onChange={handleChange}>
                Pokemon Name:
            </CustomInput>
            <button type="button" onClick={handleFetch}>
                Fetch Pokemon Abilities
            </button>
            {error && <span>Something went wrong ....</span>}
            <ul>
                {pokemonAbilities.map((ability) => (
                    <li key={ability.ability.name}>
                        <a href={ability.ability.url}>{ability.ability.name}</a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export { Pokemon };
