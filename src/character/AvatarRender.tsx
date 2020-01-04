import React, { useState, useEffect } from "react";
import "./AvatarRender.scss";
import { fetchCharacterMedia } from "battlenet/profile/characterMedia";

interface AvatarRenderProps {
    selectedServer: string;
    selectedCharacter: string;
}

export const AvatarRender: React.FC<AvatarRenderProps> = ({ selectedServer, selectedCharacter }) => {
    const [imgUrl, setImgUrl] = useState<string>();

    useEffect(() => {
        let ignore = false;

        const fetchData = async () => {
            try {
                const result = await fetchCharacterMedia(selectedServer, selectedCharacter);
                if (!ignore) {
                    setImgUrl(result.render_url);
                }
            } catch (error) {
                console.error(error);
                setImgUrl(undefined);
            }
        };

        fetchData();

        return () => {
            ignore = true;
        };
    }, [selectedServer, selectedCharacter]);

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
