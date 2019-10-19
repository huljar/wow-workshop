import React, { useCallback, useState } from "react";
import "./CharacterSearchInput.scss";

type CharacterSearchInputProps = {};

export const CharacterSearchInput: React.FC = () => {
    const [name, setName] = useState<string>("DummyCharacterName");

    const handleInputChange = useCallback(e => {
        setName(e.target.value);
    }, []);

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
            {name}
        </div>
    );
};
