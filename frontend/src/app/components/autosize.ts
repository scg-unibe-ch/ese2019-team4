import {Directive, ElementRef, HostListener, OnInit} from '@angular/core';

@Directive({
  selector: 'ion-textarea[autosize]'
})

/** A directive that makes input fields expand downwards
 * instead of staying in the same row and making the text
 * disappear after you write too much. @author Marius
 */
export class Autosize implements OnInit {
  @HostListener('input', ['$event.target'])
  onInput(textArea: HTMLTextAreaElement) {
    this.adjust();
  }

  constructor(public element: ElementRef) {
  }
  // timeout only after 500 since the textareas only load after some time
  ngOnInit() {
    setTimeout(() => this.adjust(), 500);
  }

  // expands the text area once it overflows
  adjust() {
    const textArea = this.element.nativeElement.getElementsByTagName('textarea')[0];
    textArea.style.overflow = 'hidden';
    textArea.style.height = 'auto';
    textArea.style.height = textArea.scrollHeight + 'px';
  }
}
