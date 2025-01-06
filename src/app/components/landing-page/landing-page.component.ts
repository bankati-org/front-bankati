import { Component } from '@angular/core';
import {SliderComponent} from "../slider/slider.component";

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    SliderComponent
  ],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent {
  currentSlide = 0; // Tracks the current slide index
  totalSlides = 4; // Update based on the number of slides

  // Go to the previous slide
  prevSlide() {
    this.currentSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
    this.updateSliderPosition();
  }

  // Go to the next slide
  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
    this.updateSliderPosition();
  }

  // Update the slider's transform property
  updateSliderPosition() {
    const slider = document.querySelector('.slider') as HTMLElement;
    slider.style.transform = `translateX(-${this.currentSlide * 100}%)`;
  }
}
