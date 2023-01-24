import React, { useEffect, useRef } from 'react';
import {atom, useRecoilState} from 'recoil';
import { fromEvent } from 'rxjs';
import { tap } from 'rxjs/operators';

const circle1Color = '#ff0000';
const circle2Color = '#0000ff';

const canvasState = atom({
    key: 'canvasState',
    default: {
        circle1: {
            color: circle1Color,
        },
        circle2: {
            color: circle2Color,
        }
    },
});

export const TwoCircle: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [canvasData, setCanvasData] = useRecoilState(canvasState);

    /**
     * You're correct, in TypeScript the clientX and clientY
     * properties are not available on the Event
     * type by default. To fix this issue, you can use a type assertion to
     * tell TypeScript that the event is of type MouseEvent which has these properties:
     *
     */
    const event = (e: Event) => e as MouseEvent;

    useEffect(() => {
        const canvas = canvasRef.current!;
        const ctx = canvas.getContext('2d')!;

        ctx.beginPath();
        ctx.arc(50, 50, 40, 0, 2 * Math.PI);
        ctx.fillStyle = canvasData.circle1.color;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(150, 50, 40, 0, 2 * Math.PI);
        ctx.fillStyle = canvasData.circle2.color;
        ctx.fill();

        fromEvent(canvas, 'click')
            .pipe(
                tap(e => {
                    const x = event(e).clientX;
                    const y = event(e).clientY;
                    const circle1 = canvas.getBoundingClientRect().left + 50;
                    const circle2 = canvas.getBoundingClientRect().left + 150;
                    if (x >= circle1 - 40 && x <= circle1 + 40 && y >= 50 - 40 && y <= 50 + 40) {
                        setCanvasData(prevData => ({
                            ...prevData,
                            circle1: {
                                color: prevData.circle1.color === circle1Color ? '#ffffff' : circle1Color
                            }
                        }))
                    }
                    if (x >= circle2 - 40 && x <= circle2 + 40 && y >= 50 - 40 && y <= 50 + 40) {
                        setCanvasData(prevData => ({
                            ...prevData,
                            circle2: {
                                color: prevData.circle2.color === circle2Color ? '#ffffff' : circle2Color
                            }
                        }))
                    }
                })
            ).subscribe();
    }, [canvasData, setCanvasData]);

    return (
        <canvas ref={canvasRef} width={300} height={100} />
    );
}
