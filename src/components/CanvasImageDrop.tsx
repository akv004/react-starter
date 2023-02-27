// """
// React Typescrip Code to draw  image in  a canvas
// 1. image can be added by drag androp it into canvas area
// """
import React, {useRef, useState} from "react";
import {atom, useRecoilState} from "recoil";
import {imagesState} from "./atoms";
import {fromEvent} from "rxjs";




const CanvasImageDrop = () => {
    const canvasRef = useRef<any>(null);
    const [imagesData, setImagesData] = useRecoilState(imagesState);
    //const [image, setImage] = useState<any>(null);


    const handleDrop = (e: any) => {
        e.preventDefault();
        if (e.dataTransfer.files.length) {
            const reader = new FileReader();

            reader.onload = (e: any) => {
                const image = new Image();
                image.onload = () => {
                    // @ts-ignore
                    const context = canvasRef.current.getContext("2d");
                    context!.drawImage(image, 0, 0);
                   // setImage(image);
                };
                image.src = e.target.result;

                setImagesData(pd => ({
                    images:  [...pd.images, image]
                }))
            };
            reader.readAsDataURL(e.dataTransfer.files[0]);
        }
    };

    const handleDragOver = (e: any) => {
        e.preventDefault();
    };

    if (canvasRef.current){
        console.log("canvas current is availalbe")
        const mousedown$ = fromEvent<MouseEvent>(canvasRef?.current, 'mousedown');
        const mouseup$ = fromEvent<MouseEvent>(canvasRef?.current, 'mouseup');
        const mousemove$ = fromEvent<MouseEvent>(canvasRef?.current, 'mousemove');
    }





    // React.useEffect(() => {
    //     const subscription = mousemove$ .subscribe(pos => {
    //         console.log(JSON.stringify(pos))
    //     });
    //     return () => subscription.unsubscribe();
    // }, [mousemove$ ]);

    return (
        <>
            <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                style={{width: 4000, height: 4000, backgroundColor: "lightgrey"}}
            >

                <canvas style={{border: "1px solid black"}} ref={canvasRef} width={4000} height={4000}/>
            </div>
            <h1>Count {JSON.stringify(imagesData)}</h1>
        </>
    );
};

export default CanvasImageDrop;
