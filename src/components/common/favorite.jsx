import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Favorite = ({ favorite, onClick }) => {
    let icon = ['far', 'heart'];

    if (favorite) {
        icon = ['fas', 'heart'];
    }

    return ( 
        <div>
            <FontAwesomeIcon className="cursor-pointer" onClick={onClick} icon={icon} />
        </div>
    );
}
 
export default Favorite;