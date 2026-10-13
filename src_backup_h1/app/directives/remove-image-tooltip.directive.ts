import { Directive, ElementRef, AfterViewInit, Renderer2 } from '@angular/core';

@Directive({
  selector: 'img',
  standalone: true,
})
export class RemoveImageTooltipDirective implements AfterViewInit {

  constructor(
    private el: ElementRef<HTMLImageElement>,
    private renderer: Renderer2
  ) {}

  ngAfterViewInit(): void {
    const image = this.el.nativeElement;

    const titleText = image.getAttribute('title');

    if (titleText !== null) {
      // Keep the original title value
      this.renderer.setAttribute(
        image,
        'data-image-title',
        titleText
      );

      // Remove the browser's native tooltip
      this.renderer.removeAttribute(image, 'title');
    }
  }
}