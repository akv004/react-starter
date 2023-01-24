import React, { useRef, useState, useEffect, KeyboardEvent, MouseEvent, } from 'react';

function TextInput() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [text, setText] = useState('');
    const [focused, setFocused] = useState(false);

    const handleKeyPress = (event: any) => {
        if (event.key === 'Enter') {
            setText('');
        } else {
            setText(text + event.key);
        }
    };

    const handleClick = (event:any) => {
        setFocused(true);
    };

    // Handling input onBlur event
    const handleBlur = (event:any) => {
        setFocused(false);
    };


    const handleFocus = (event:any) => {
        setFocused(true);
    };

    const handleRender = () => {
        const canvas = canvasRef.current;
        if (canvas == null) return; // current may be null
        const ctx = canvas?.getContext!('2d');
        if (ctx == null) return; // context may be null
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (focused) {
            ctx.font = '20px Arial';
            ctx.fillText(text, 10, 30);
        }
    };

    useEffect(() => {
        handleRender();
    }, [text, focused]);

    return (
        <canvas
            ref={canvasRef}
            width={800}
            height={500}
            onClick={handleClick}
            onKeyPress={handleKeyPress}
            onBlur={()=> handleBlur}
            onFocus={()=> handleFocus}
            tabIndex={0}
        />
    );
}

export default TextInput;
