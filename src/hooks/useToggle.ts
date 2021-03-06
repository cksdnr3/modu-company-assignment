import { useState } from 'react';

export interface useToggleReturnTypes {
    toggle: boolean;
    handleToggle: () => void;
}

export default function useToggle(): useToggleReturnTypes {
    const [toggle, setToggle] = useState(false);

    const handleToggle = () => {
        setToggle(prev => !prev);
    }

    return {toggle, handleToggle};
}