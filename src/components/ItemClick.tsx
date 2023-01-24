import React, { useEffect, useRef } from 'react';
import { fromEvent } from 'rxjs';
import { tap } from 'rxjs/operators';


/***
 * Yes, you can create a common function to detect clicks on different draw items on a canvas.
 * One way to do this is to create a bounding box for each draw item and check if the click event occurred within the boundaries of the bounding box.

 Here's an example of how you can do that:
 */
const image1 = new Image();
image1.src = 'images/image1.png';
const image2 = new Image();
image2.src = 'images/image2.png';
const image3 = new Image();
image3.src = 'images/bird.jpg';

export const ItemClick: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const items = [
        {
            x: 0,
            y: 10,
            width: image1.width,
            height: image1.height,
            id: 'image1'
        },
        {
            x: 100,
            y: 10,
            width: image2.width,
            height: image2.height,
            id: 'image2'
        },
        {
            x: 500,
            y: 10,
            width: image3.width,
            height: image3.height,
            id: 'image3'
        }
    ];

    useEffect(() => {
        const canvas = canvasRef.current!;
        const ctx = canvas.getContext('2d')!;

        items.forEach(item => {
            ctx.drawImage(eval(item.id), item.x, item.y);
        });

        fromEvent(canvas, 'click')
            .pipe(
                tap(e => {
                    // @ts-ignore
                    const x = e.clientX - canvas.getBoundingClientRect().left;
                    // @ts-ignore
                    const y = e.clientY - canvas.getBoundingClientRect().top;

                    items.forEach(item => {
                        if (x >= item.x && x <= item.x + item.width && y >= item.y && y <= item.y + item.height) {
                            console.log(`${item.id} clicked`);
                        }
                    });
                })
            ).subscribe();
    }, []);

    return (
        <canvas ref={canvasRef} width={1000} height={500} />
    );
}
