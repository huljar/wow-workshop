import React, { ChangeEventHandler, useCallback, useState } from "react";
import "./ServerSelectionForm.scss";

const dummyDataForServerSelection: string[] = ["Server", "Server", "Server", "Server"];

export const ServerSelectionForm: React.FC = () => {
    const [server, setServer] = useState<string>("Dummy Server");

    const handleOptionChange = useCallback<ChangeEventHandler<HTMLSelectElement>>(e => {
        setServer(e.target.value);
    }, []);

    return (
        <div className="ServerSelectionForm">
            <select onChange={handleOptionChange}>
                {dummyDataForServerSelection.map((value: string, index: number) => (
                    <option key={index} value={value + " " + index}>
                        {value + " " + index}
                    </option>
                ))}
            </select>
            <br />
            {server}
        </div>
    );
};
