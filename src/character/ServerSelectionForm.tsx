import React, { ChangeEventHandler, useCallback, useState, useEffect } from "react";
import "./ServerSelectionForm.scss";

import { fetchRealmList } from "battlenet/realm";

interface Server {
    name: string;
    id: number;
    slug: string;
}

export const ServerSelectionForm: React.FC = () => {
    const [serverList, setServerList] = useState<Server[]>([]);
    const [selectedServer, setSelectedServer] = useState<number>(0);

    const handleOptionChange = useCallback<ChangeEventHandler<HTMLSelectElement>>(e => {
        setSelectedServer(Number.parseInt(e.target.value));
    }, []);

    useEffect(() => {
        let ignore = false;

        async function fetchData() {
            try {
                const result = await fetchRealmList();
                if (!ignore) {
                    setServerList(
                        result.realms.map(realm => ({
                            name: realm.name,
                            id: realm.id,
                            slug: realm.slug
                        }))
                    );
                }
            } catch (error) {
                console.error(error);
                setServerList([]);
            }
        }

        fetchData();
        return () => {
            ignore = true;
        };
    }, []);

    return (
        <div className="ServerSelectionForm">
            <select onChange={handleOptionChange}>
                {serverList.length > 0 ? (
                    serverList.map((server, index) => (
                        <option key={index} value={server.id}>
                            {server.name}
                        </option>
                    ))
                ) : (
                    <option disabled>No servers found</option>
                )}
            </select>
            <br />
            {selectedServer}
        </div>
    );
};
