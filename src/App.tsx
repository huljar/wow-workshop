import React from "react";
import "./App.scss";
import { CharacterSearchInput } from "./character/CharacterSearchInput";
import { ServerSelectionForm } from "./character/ServerSelectionForm";

export const App: React.FC = () => {
    return (
        <div className="App">
            <header className="App-header">
                <CharacterSearchInput />
                <ServerSelectionForm />
            </header>
        </div>
    );
};
