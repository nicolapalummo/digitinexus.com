import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import LoadingScreen from './components/LoadingScreen';
import InterfaceUI from './components/InterfaceUI';
import LogoNotification from './components/LogoNotification';
import MobileWarning from './components/MobileWarning';
import eventBus from './EventBus';
import './style.css';

const App = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        eventBus.on('loadingScreenDone', () => {
            setLoading(false);
        });
    }, []);

    // After loading: start audio on first user interaction (desktop/mobile)
    useEffect(() => {
        if (loading) return;
        let handled = false;
        const resume = () => {
            if (handled) return;
            handled = true;
            eventBus.dispatch('resumeAudio', {});
            document.removeEventListener('mousedown', resume, true);
            document.removeEventListener('touchstart', resume, { capture: true } as any);
        };
        document.addEventListener('mousedown', resume, true);
        document.addEventListener('touchstart', resume, { capture: true } as any);
        return () => {
            document.removeEventListener('mousedown', resume, true);
            document.removeEventListener('touchstart', resume, { capture: true } as any);
        };
    }, [loading]);

    return (
        <div id="ui-app">
            {!loading && <LogoNotification />}
            {!loading && <MobileWarning />}
            <LoadingScreen />
        </div>
    );
};

const createUI = () => {
    ReactDOM.render(<App />, document.getElementById('ui'));
};

const createVolumeUI = () => {
    ReactDOM.render(<InterfaceUI />, document.getElementById('ui-interactive'));
};

export { createUI, createVolumeUI };
