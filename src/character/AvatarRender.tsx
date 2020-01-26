import React, { useEffect } from "react";
import "./AvatarRender.scss";
import { fetchCharacterMedia } from "battlenet/profile/characterMedia";
import { useSafeState } from "../hooks/useSafeState";

interface AvatarRenderProps {
    selectedServer: string;
    selectedCharacter: string;
}

export const AvatarRender: React.FC<AvatarRenderProps> = ({ selectedServer, selectedCharacter }) => {
    const [imgUrl, setImgUrl] = useSafeState<string>("");

    useEffect(() => {
        fetchCharacterMedia(selectedServer, selectedCharacter)
            .then(result => setImgUrl(result.render_url))
            .catch(error => console.error(error));
    }, [selectedServer, selectedCharacter, setImgUrl]);

    return (
        <div className="AvatarRender">
            {imgUrl ? (
                <img src={imgUrl} alt="The character rendering" className="render-image" />
            ) : (
                "No character selected"
            )}
        </div>
    );
};
