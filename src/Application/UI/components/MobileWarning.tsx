import React, { useEffect, useRef, useState } from 'react';
import UIEventBus from '../EventBus';
import './MobileWarning.css';

const MobileWarning: React.FC = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [showWarning, setShowWarning] = useState(false);
    const overlayRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const checkMobile = () => {
            const mobile = window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
            setIsMobile(mobile);
            if (mobile) {
                setShowWarning(true);
            }
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        return () => {
            window.removeEventListener('resize', checkMobile);
        };
    }, []);

    useEffect(() => {
        if (!showWarning || !overlayRef.current) return;

        const overlay = overlayRef.current;
        
        const handleInteraction = (e: Event) => {
            e.preventDefault();
            e.stopPropagation();
            // Signal the app that the user interacted so audio can resume
            UIEventBus.dispatch('resumeAudio', {});
            // Redirect to responsive site after user acknowledges
            try {
                window.location.href = 'https://resp.digitinexus.com';
            } catch {}
        };

        // Add multiple event listeners to catch all touch events
        overlay.addEventListener('click', handleInteraction);
        overlay.addEventListener('touchstart', handleInteraction, { passive: false });
        overlay.addEventListener('touchend', handleInteraction, { passive: false });
        overlay.addEventListener('mousedown', handleInteraction);

        return () => {
            overlay.removeEventListener('click', handleInteraction);
            overlay.removeEventListener('touchstart', handleInteraction);
            overlay.removeEventListener('touchend', handleInteraction);
            overlay.removeEventListener('mousedown', handleInteraction);
        };
    }, [showWarning]);

    if (!isMobile || !showWarning) {
        return null;
    }

    return (
        <div ref={overlayRef} className="mobile-warning-overlay">
            <div className="mobile-warning-content">
                <img src="/logo.png" alt="DigitiNexus" className="mobile-warning-logo" />
                <p className="mobile-warning-text">
                    For now, the digitinexus.com website <br />
                    isn’t available on mobile devices.
                </p>
                <p className="mobile-warning-text">We apologize for the inconvenience</p>
                <p className="mobile-warning-text">
                    Please visit the site from a desktop or laptop computer.
                </p>
            </div>
        </div>
    );
};

export default MobileWarning;

