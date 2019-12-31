import React, { useState, useCallback } from "react";
import "./App.scss";
import { CharacterSearchInput } from "./character/CharacterSearchInput";
import { ServerSelectionForm, Server } from "./character/ServerSelectionForm";

export const App: React.FC = () => {
    const [selectedServer, setSelectedServer] = useState<Server>();
    const onServerSelected = useCallback((server: Server) => setSelectedServer(server), []);
    return (
        <div className="App">
            <header className="App-header">
                <ServerSelectionForm onServerSelected={onServerSelected} />
                <CharacterSearchInput selectedServer={selectedServer} />
            </header>
            <main className="App-main"></main>
        </div>
    );
};
