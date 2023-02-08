import React, {useRef} from "react"
import {
    RecoilRoot,
    atom,
    selector,
    useRecoilState,
    useRecoilValue,
} from 'recoil';
import TextInput from "./components/TextInput";
import {MyCanvas} from "./components/MyCanvas";
import {TwoCircle} from "./components/TwoCircle";
import {TwoCirclePath2d} from "./components/TwoCirclePath2d";
import {ItemClick} from "./components/ItemClick";
import {CircleController} from "./components/CircleController";
import Canvas2 from "./components/Canvas2";
import CanvasImageDrop from "./components/CanvasImageDrop";



export const Main = () => {
    return (
        <RecoilRoot>
            <div>Hi12</div>
            {/*<CircleController/>*/}
            {/*<TwoCirclePath2d/>*/}
            {/*<ItemClick/>*/}
            <CanvasImageDrop/>
        </RecoilRoot>
    );
};
