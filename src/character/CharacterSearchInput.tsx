import React, { ChangeEventHandler, useCallback, useRef } from "react";
import "./CharacterSearchInput.scss";

import { Server } from "./ServerSelectionForm";

interface CharacterSearchInputProps {
    selectedServer?: Server;
    onCharacterNameChanged: (characterName: string) => unknown;
}

export const CharacterSearchInput: React.FC<CharacterSearchInputProps> = ({
    selectedServer,
    onCharacterNameChanged
}) => {
    const inputTimeout = useRef<ReturnType<typeof setTimeout>>();

    const handleInputChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
        e => {
            const target = e.target;
            if (inputTimeout.current !== undefined) {
                clearTimeout(inputTimeout.current);
            }
            inputTimeout.current = setTimeout(() => {
                inputTimeout.current = undefined;
                onCharacterNameChanged(target.value.toLowerCase());
            }, 1000);
        },
        [onCharacterNameChanged]
    );

    return (
        <div className="CharacterSearchInput">
            <input
                name="characterName"
                type="text"
                onChange={handleInputChange}
                autoFocus
                placeholder="Character name"
            />
        </div>
    );
};
