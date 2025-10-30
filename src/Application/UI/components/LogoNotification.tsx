import React, { useState, useEffect, useRef } from 'react';
import './LogoNotification.css';

const LogoNotification: React.FC = () => {
    const [showNotification, setShowNotification] = useState(false);
    const [isRotating, setIsRotating] = useState(false);
    const logoRef = useRef<HTMLDivElement>(null);

    const handleLogoClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        if (showNotification) {
            // Close notification if already open
            handleCloseNotification();
        } else {
            // Open notification and rotate
            setIsRotating(true);
            setShowNotification(true);
        }
    };

    const handleLogoMouseDown = (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
    };

    const handleCloseNotification = () => {
        setShowNotification(false);
        setIsRotating(false);
    };

    useEffect(() => {
        if (isRotating && logoRef.current) {
            // Reset animation by removing and re-adding the class
            const logo = logoRef.current;
            logo.classList.remove('rotated');
            // Trigger reflow
            void logo.offsetWidth;
            logo.classList.add('rotated');
            
            // Remove the class after animation completes
            const handleAnimationEnd = () => {
                setIsRotating(false);
                logo.removeEventListener('animationend', handleAnimationEnd);
            };
            
            logo.addEventListener('animationend', handleAnimationEnd);
            
            return () => {
                logo.removeEventListener('animationend', handleAnimationEnd);
            };
        }
    }, [isRotating]);

    // Auto-close notification after 5 seconds
    useEffect(() => {
        if (showNotification) {
            const timer = setTimeout(() => {
                handleCloseNotification();
            }, 5000);

            return () => {
                clearTimeout(timer);
            };
        }
    }, [showNotification]);

    return (
        <>
            {/* SVG Filter (include once in your document) */}
            <svg width="0" height="0" style={{ position: 'absolute' }}>
                <defs>
                    <filter id="glass-distortion" x="0%" y="0%" width="100%" height="100%">
                        <feTurbulence 
                            type="fractalNoise" 
                            baseFrequency="0.015 0.015"
                            numOctaves={2} 
                            seed={92} 
                            result="noise" 
                        />
                        <feGaussianBlur 
                            in="noise" 
                            stdDeviation="2" 
                            result="blurred" 
                        />
                        <feDisplacementMap 
                            in="SourceGraphic" 
                            in2="blurred" 
                            scale={95}
                            xChannelSelector="R" 
                            yChannelSelector="G" 
                        />
                    </filter>
                </defs>
            </svg>

            {/* Logo Button */}
            <div 
                ref={logoRef}
                className={`logo-container ${isRotating ? 'rotated' : ''}`}
                onClick={handleLogoClick}
                onMouseDown={handleLogoMouseDown}
                onMouseUp={(e) => e.stopPropagation()}
                style={{ pointerEvents: 'auto' }}
            >
                <img src="/logo.png" alt="DigitiNexus Logo" className="logo-image" />
            </div>

            {/* Notification Tooltip - positioned to the left of logo */}
            {showNotification && (
                <div 
                    className="notification-tooltip"
                    style={{ pointerEvents: 'auto' }}
                    onClick={handleCloseNotification}
                >
                    <div className="liquid-glass-card" onClick={(e) => e.stopPropagation()}>
                        <div className="card-content">
                            <p>Click on the computer to discover DigitiNexus</p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default LogoNotification;

