export interface DrawableElement {
    x: number;
    y: number;
    width: number;
    height: number;
    draw(context: CanvasRenderingContext2D): void;
    repaint(context: CanvasRenderingContext2D): void;
    isSelected?: boolean | undefined;
    image?: HTMLImageElement | undefined;
}
