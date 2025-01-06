import { Component } from '@angular/core';
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.css'
})
export class SliderComponent {
  currentSlide = 0;
  totalSlides = 4;

  // Go to the previous slide
  prevSlide() {
    if (this.currentSlide === 0) {
      this.currentSlide = this.totalSlides - 1;
    } else {
      this.currentSlide--;
    }
    this.updateSliderPosition();
  }


  nextSlide() {
    if (this.currentSlide === this.totalSlides - 1) {
      this.currentSlide = 0;
    } else {
      this.currentSlide++;
    }
    this.updateSliderPosition();
  }


  updateSliderPosition() {
    const slider = document.querySelector('.slider') as HTMLElement;
    slider.style.transform = `translateX(-${this.currentSlide * 100}%)`;
  }
}
