import React, { ChangeEventHandler, useCallback, useState, useEffect } from "react";
import "./ServerSelectionForm.scss";

import { RealmShort, fetchRealmsShort } from "battlenet/gameData/realm";
import { useSafeState } from "../hooks/useSafeState";

export type Server = Pick<RealmShort, "name" | "id" | "slug">;

interface ServerSelectionFormProps {
    onServerSelected: (server: Server) => unknown;
}

const realmToServer = (realm: RealmShort) => ({
    name: realm.name,
    id: realm.id,
    slug: realm.slug
});

export const ServerSelectionForm: React.FC<ServerSelectionFormProps> = ({ onServerSelected }) => {
    const [serverList, setServerList] = useSafeState<Server[]>([]);

    const handleOptionChange = useCallback<ChangeEventHandler<HTMLSelectElement>>(
        e => {
            const selectionIndex = Number.parseInt(e.target.value);
            onServerSelected(serverList[selectionIndex]);
        },
        [serverList, onServerSelected]
    );

    useEffect(() => {
        fetchRealmsShort().then(realms => setServerList(realms.map(realmToServer)));
    }, [setServerList]);

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
