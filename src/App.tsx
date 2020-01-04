import React, { useState, useCallback } from "react";
import "./App.scss";
import { CharacterSearchInput } from "character/CharacterSearchInput";
import { ServerSelectionForm, Server } from "character/ServerSelectionForm";
import { AvatarRender } from "character/AvatarRender";

export const App: React.FC = () => {
    const [selectedServer, setSelectedServer] = useState<Server>();
    const [selectedCharacterName, setSelectedCharacterName] = useState<string>("");

    const onServerSelected = useCallback((server: Server) => setSelectedServer(server), []);
    const onCharacterNameChanged = useCallback((characterName: string) => setSelectedCharacterName(characterName), []);

    return (
        <div className="App">
            <header className="App-header">
                <ServerSelectionForm onServerSelected={onServerSelected} />
                <CharacterSearchInput selectedServer={selectedServer} onCharacterNameChanged={onCharacterNameChanged} />
            </header>
            <main className="App-main">
                {selectedServer && selectedCharacterName ? (
                    <AvatarRender selectedServer={selectedServer.slug} selectedCharacter={selectedCharacterName} />
                ) : (
                    ""
                )}
            </main>
        </div>
    );
};
