import {DrawableElement} from "./interfaces/IDrawableElement";

class ImageElement implements DrawableElement {
    x: number;
    y: number;
    width: number;
    height: number;
    imageSrc: string;
    image: HTMLImageElement | undefined;
    isSelected: boolean | undefined;

    constructor(x: number, y: number, width: number, height: number, imageSrc: string) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.imageSrc = imageSrc;
    }

    draw(context: CanvasRenderingContext2D) {
        const img = new Image();
        img.src = this.imageSrc;
        context.drawImage(img, this.x, this.y, this.width, this.height);
    }

    repaint(context: CanvasRenderingContext2D) {
        this.draw(context);
    }


}
