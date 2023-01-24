import React, {FC, useEffect, useRef} from "react"
import {useRecoilState} from "recoil";
import {textInput1State} from "./atoms";
import {filter, fromEvent} from 'rxjs';
import {map, switchMap, takeUntil} from 'rxjs/operators';


export const MyCanvas = () => {
    const [textInput, setTextInput] = useRecoilState(textInput1State);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    let canvasCtxRef = React.useRef<CanvasRenderingContext2D | null>(null);

    React.useEffect(() => {
        // Initialize
        if (canvasRef.current) {
            canvasCtxRef.current = canvasRef.current.getContext('2d');
            let ctx = canvasCtxRef.current; // Assigning to a temp variable
            ctx!.beginPath(); // Note the Non Null Assertion
            ctx!.arc(95, 50, 40, 0, 2 * Math.PI);
            ctx!.stroke();
        }
    }, []);

    return (
        <canvas ref={canvasRef}></canvas>
    );
};



