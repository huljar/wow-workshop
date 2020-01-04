import React, { ChangeEventHandler, useCallback, useState, useEffect } from "react";
import "./ServerSelectionForm.scss";

import { RealmShort, fetchRealmIndex } from "battlenet/gameData/realm";

export type Server = Pick<RealmShort, "name" | "id" | "slug">;

interface ServerSelectionFormProps {
    onServerSelected: (server: Server) => unknown;
}

export const ServerSelectionForm: React.FC<ServerSelectionFormProps> = ({ onServerSelected }) => {
    const [serverList, setServerList] = useState<Server[]>([]);

    const handleOptionChange = useCallback<ChangeEventHandler<HTMLSelectElement>>(
        e => {
            const selectionIndex = Number.parseInt(e.target.value);
            onServerSelected(serverList[selectionIndex]);
        },
        [serverList, onServerSelected]
    );

    useEffect(() => {
        let ignore = false;

        async function fetchData() {
            try {
                const result = await fetchRealmIndex();
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
                    serverList
                        .sort((s1, s2) => {
                            return s1.name < s2.name ? -1 : 1;
                        })
                        .map((server, index) => (
                            <option key={index} value={index}>
                                {server.name}
                            </option>
                        ))
                ) : (
                    <option disabled>No servers found</option>
                )}
            </select>
        </div>
    );
};
