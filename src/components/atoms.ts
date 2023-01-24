import { atom } from 'recoil';

export const textInput1State = atom({
    key: 'textInput1',
    default: '',
});

export const textInput2State = atom({
    key: 'textInput2',
    default: '',
});

export const radState = atom({
    key: 'rad',
    default: '',
});

const circle1Color = '#ff0000';
const circle2Color = '#0000ff';
export const canvasState = atom({
    key: 'canvasState',
    default: {
        circle1: {
            color: circle1Color,
            r: 40
        },
        circle2: {
            color: circle2Color,
            r: 40
        }
    },
});


// Other atoms can be defined here as well
