import React, { useEffect, useRef, useState } from 'react';

interface InfoOverlayProps {
    visible: boolean;
}

const NAME_TEXT = 'Stand Out With';
const TITLE_TEXT = 'DigitiNexus';
const SUBTITLE_TEXT = 'Web Agency Studio';
const MULTIPLIER = 1;

const InfoOverlay: React.FC<InfoOverlayProps> = ({ visible }) => {
    const visRef = useRef(visible);
    const [nameText, setNameText] = useState('');
    const [titleText, setTitleText] = useState('');
    const [subtitleText, setSubtitleText] = useState('');
    const [textDone, setTextDone] = useState(false);
    const [volumeVisible, setVolumeVisible] = useState(false);
    const [freeCamVisible, setFreeCamVisible] = useState(false);

    const typeText = (
        i: number,
        curText: string,
        text: string,
        setText: React.Dispatch<React.SetStateAction<string>>,
        callback: () => void,
        refOverride?: React.MutableRefObject<string>
    ) => {
        if (refOverride) {
            text = refOverride.current;
        }
        if (i < text.length) {
            setTimeout(() => {
                if (visRef.current === true)
                    window.postMessage(
                        { type: 'keydown', key: `_AUTO_${text[i]}` },
                        '*'
                    );

                setText(curText + text[i]);
                typeText(
                    i + 1,
                    curText + text[i],
                    text,
                    setText,
                    callback,
                    refOverride
                );
            }, Math.random() * 50 + 50 * MULTIPLIER);
        } else {
            callback();
        }
    };

    useEffect(() => {
        if (visible && nameText == '') {
            setTimeout(() => {
                typeText(0, '', NAME_TEXT, setNameText, () => {
                    typeText(0, '', TITLE_TEXT, setTitleText, () => {
                        typeText(0, '', SUBTITLE_TEXT, setSubtitleText, () => {
                            setTextDone(true);
                        });
                    });
                });
            }, 400);
        }
        visRef.current = visible;
    }, [visible]);

    useEffect(() => {
        if (textDone) {
            setTimeout(() => {
                setVolumeVisible(true);
                setTimeout(() => {
                    setFreeCamVisible(true);
                }, 250);
            }, 250);
        }
    }, [textDone]);

    useEffect(() => {
        window.postMessage({ type: 'keydown', key: `_AUTO_` }, '*');
    }, [freeCamVisible, volumeVisible]);

    return (
        <div style={styles.wrapper}>
            {nameText !== '' && (
                <div style={styles.container}>
                    <p style={styles.text}>{nameText}</p>
                </div>
            )}
            {titleText !== '' && (
                <div style={styles.container}>
                    <p style={styles.mainTitle}>{titleText}</p>
                </div>
            )}
            {subtitleText !== '' && (
                <div style={styles.container}>
                    <p style={styles.subTitle}>{subtitleText}</p>
                </div>
            )}
        </div>
    );
};

const styles: StyleSheetCSS = {
    container: {
        background: 'transparent',
        padding: 0,
        textAlign: 'left',
        display: 'flex',
        marginBottom: 8,
        boxSizing: 'border-box',
    },
    wrapper: {
        position: 'absolute',
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        top: '20px',
        left: '20px',
        zIndex: 1000,
    },
    blinkingContainer: {
        marginLeft: 8,
        paddingBottom: 2,
        paddingRight: 4,
    },
    lastRow: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    lastRowChild: {
        marginRight: 8,
    },
    subtitleRow: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: '12px',
    },
    iconsContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: '8px',
    },
    iconWrapper: {
        display: 'flex',
        alignItems: 'center',
    },
    text: {
        color: '#000000',
        fontFamily: "'Urbanist', sans-serif",
        fontWeight: '700',
        fontSize: '27px', // 40px - 1/3 = 27px
        margin: 0,
        textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
        lineHeight: '1',
        marginBottom: '-8px', // Ridotto da 8px a 4px (metà)
    },
    mainTitle: {
        color: '#000000',
        fontFamily: "'Urbanist', sans-serif",
        fontWeight: '700',
        fontSize: '43px', // 64px - 1/3 = 43px
        margin: 0,
        textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
        lineHeight: '1',
        marginBottom: '0px', // Ridotto da 8px a 4px (metà)
    },
    subTitle: {
        color: '#000000',
        fontFamily: "'Urbanist', sans-serif",
        fontWeight: '400',
        fontSize: '16px', // 24px - 1/3 = 16px
        margin: 0,
        textShadow: '0 1px 4px rgba(0, 0, 0, 0.3)',
        lineHeight: '1',
    },
};

export default InfoOverlay;
