import {useRecoilState} from "recoil";
import {canvasState} from "./atoms";

import React, {FC} from "react"

interface CircleControllerProps {
  prop1?: string;
  prop2?: string;
}


export const CircleController = ({ prop1, prop2 }:CircleControllerProps) : JSX.Element => {
    const [canvasData, setCanvasData] = useRecoilState(canvasState);


    const handlePlus =()=>{
        setCanvasData(prevData => ({
            ...prevData,
            circle1: {
                color: prevData.circle1.color,
                r: prevData.circle1.r+12
            }
        }))
    }

    const handleMinus =()=>{
        console.log(JSON.stringify(canvasData))
        if(canvasData.circle1.r>20){
            setCanvasData(prevData => ({
                ...prevData,
                circle1: {
                    color: prevData.circle1.color,
                    r: prevData.circle1.r-12
                }
            }))
        }

    }

    return (
        <>
            <div><button onClick={handlePlus}>+ </button>
                <button onClick={handleMinus}>- </button>
            </div>
        </>
    );
};
