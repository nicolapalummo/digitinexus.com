import React, { useCallback, useState } from 'react';
import UIEventBus from '../EventBus';
import './BottomControls.css';

interface BottomControlsProps {}

const BottomControls: React.FC<BottomControlsProps> = ({}) => {
    const [muted, setMuted] = useState(false);
    const [freeCamActive, setFreeCamActive] = useState(false);

    const handleSoundClick = useCallback(() => {
        setMuted(!muted);
        UIEventBus.dispatch('muteToggle', !muted);
    }, [muted]);

    const handleFreeCamClick = useCallback(() => {
        setFreeCamActive(!freeCamActive);
        UIEventBus.dispatch('freeCamToggle', !freeCamActive);
    }, [freeCamActive]);

    return (
        <div className="bottom-controls-container">
            <div className="bottom-controls-row">
                <span 
                    className="bottom-control-item"
                    onClick={handleSoundClick}
                >
                    <span className="bottom-control-label">Sound:</span>
                    <span className="bottom-control-value">{muted ? 'OFF' : 'ON'}</span>
                </span>
                <span 
                    className="bottom-control-item"
                    onClick={handleFreeCamClick}
                >
                    <span className="bottom-control-label">FreeCam:</span>
                    <span className="bottom-control-value">{freeCamActive ? 'ON' : 'OFF'}</span>
                </span>
            </div>
        </div>
    );
};

export default BottomControls;

