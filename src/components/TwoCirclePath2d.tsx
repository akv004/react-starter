import React, { useEffect, useRef } from 'react';
import {atom, useRecoilState} from 'recoil';
import {fromEvent, Subscription} from 'rxjs';
import { tap } from 'rxjs/operators';
import {canvasState} from "./atoms";

const circle1Color = '#ff0000';
const circle2Color = '#0000ff';



export const TwoCirclePath2d: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [canvasData, setCanvasData] = useRecoilState(canvasState);

    // const canvasDataMemo = React.useMemo(() => {
    //     return canvasData;
    // }, [canvasData.circle1.color, canvasData.circle2.color])


    /**
     * You're correct, in TypeScript the clientX and clientY
     * properties are not available on the Event
     * type by default. To fix this issue, you can use a type assertion to
     * tell TypeScript that the event is of type MouseEvent which has these properties:
     *
     */

    const event = (e: Event) => e as MouseEvent;
    const clickSubscription = useRef<Subscription>();
    useEffect(() => {
        const canvas = canvasRef.current!;

        const ctx = canvas.getContext('2d')!;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const circle1 = new Path2D();
        circle1.arc(50, 50, canvasData.circle1.r, 0, 2 * Math.PI);
        ctx.fillStyle = canvasData.circle1.color;
        ctx.fill(circle1);

        const circle2 = new Path2D();
        circle2.arc(150, 50, canvasData.circle2.r, 0, 2 * Math.PI);
        ctx.fillStyle = canvasData.circle2.color;
        ctx.fill(circle2);
        console.log("useEffect")
        clickSubscription.current = fromEvent(canvas, 'click')
            .pipe(
                tap(e => {
                    const x =  event(e).clientX - canvas.getBoundingClientRect().left;
                    const y = event(e).clientY - canvas.getBoundingClientRect().top;
                    if (ctx.isPointInPath(circle1, x, y)) {
                        console.log("circle 1 clicked")
                        setCanvasData(prevData => ({
                            ...prevData,
                            circle1: {
                                color: prevData.circle1.color === circle1Color ? '#ffffff' : circle1Color,
                                r: 40
                            }
                        }))
                    }
                    if (ctx.isPointInPath(circle2, x, y)) {
                        console.log("circle 2 clicked")
                        setCanvasData(prevData => ({
                            ...prevData,
                            circle2: {
                                color: prevData.circle2.color === circle2Color ? '#ffffff' : circle2Color,
                                r: 40
                            }
                        }))
                    }
                })
            ).subscribe();
        return () => {
            clickSubscription.current?.unsubscribe();
        }
    }, [canvasData]);

    return (
        <canvas ref={canvasRef} width={300} height={100} />
    );
}
