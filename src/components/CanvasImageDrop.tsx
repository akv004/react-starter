// """
// React Typescrip Code to draw  image in  a canvas
// 1. image can be added by drag androp it into canvas area
// """
import React, {useRef, useState} from "react";
import {atom, useRecoilState} from "recoil";
import {imagesState} from "./atoms";




const CanvasImageDrop = () => {
    const canvasRef = useRef(null);
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

    return (
        <>
            <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                style={{width: 4000, height: 4000, backgroundColor: "lightgrey"}}
            >

                <canvas style={{border: "1px solid black"}} ref={canvasRef} width={4000} height={4000}/>
            </div>
            <h1>Count {imagesData?.images?.length}</h1>
        </>
    );
};

export default CanvasImageDrop;
