import React, { ChangeEventHandler, useCallback, useState, useEffect, useRef } from "react";
import "./CharacterSearchInput.scss";

import { CharacterProfileSummary as Character, fetchCharacterProfileSummary } from "battlenet/profile/characterProfile";
import { Server } from "./ServerSelectionForm";

interface CharacterSearchInputProps {
    selectedServer?: Server;
}

export const CharacterSearchInput: React.FC<CharacterSearchInputProps> = ({ selectedServer }) => {
    const inputTimeout = useRef<ReturnType<typeof setTimeout>>();
    const [name, setName] = useState<string>();
    const [character, setCharacter] = useState<Character>();

    const handleInputChange = useCallback<ChangeEventHandler<HTMLInputElement>>(e => {
        const target = e.target;
        if (inputTimeout.current !== undefined) {
            clearTimeout(inputTimeout.current);
        }
        inputTimeout.current = setTimeout(() => {
            inputTimeout.current = undefined;
            setName(target.value.toLowerCase());
            setCharacter(undefined);
        }, 1000);
    }, []);

    useEffect(() => {
        let ignore = false;

        async function fetchData() {
            if (name && selectedServer) {
                try {
                    const result = await fetchCharacterProfileSummary(selectedServer.slug, name);
                    if (!ignore) {
                        setCharacter(result);
                    }
                } catch (error) {
                    console.error(error);
                    setCharacter(undefined);
                }
            }
        }

        fetchData();

        return () => {
            ignore = true;
        };
    }, [name, selectedServer]);

    return (
        <div className="CharacterSearchInput">
            <input
                name="characterName"
                type="text"
                onChange={handleInputChange}
                autoFocus
                placeholder="Character name"
            />
            <br />
            {character !== undefined ? (
                `${character.gender.name} ${character.race.name} ${character.character_class.name}`
            ) : (
                <>No character selected</>
            )}
        </div>
    );
};
