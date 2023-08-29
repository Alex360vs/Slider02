import { Component, ElementRef, ViewChild,OnInit,OnDestroy,AfterViewInit} from "@angular/core"
import KeenSlider, { KeenSliderInstance } from "keen-slider"
import { RouterModule } from '@angular/router';
import { NgFor } from "@angular/common";

@Component({
  
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: [
    "../../node_modules/keen-slider/keen-slider.min.css",
    "./app.component.css",
  ],
  standalone: true,
  imports:[  
    
     RouterModule,
     NgFor
    ]
})
export class AppComponent implements AfterViewInit,OnDestroy {
  
  slider!: KeenSliderInstance;
  timeout!: number; 

  @ViewChild("sliderRef") sliderRef!: ElementRef<HTMLElement>

  currentSlide: number = 1
  dotHelper: Array<Number> = []

 
  ngAfterViewInit() {
    
    setTimeout(() => {
    this.slider = new KeenSlider(
      this.sliderRef.nativeElement,{
        initial: this.currentSlide,
        slideChanged: (s) => {
          this.currentSlide = s.track.details.rel
        },
        loop: true,
        rtl: true,
        
        breakpoints: {
          '(max-width: 700px)': {
            
            slides: {
              perView: 1,
              spacing: 5,
            }
          },
          '(min-width: 800px)': {
            
            slides: {
              perView: 2,
              spacing: 5,
            }
          },
          '(min-width: 1000px)': {
           
            slides: {
              perView: 3,
              spacing: 5,
            }
          },
          '(min-width: 1400px)': {
           
            slides: {
              perView: 4,
              spacing: 5,
            }
          },
        },
        
      
      },
      [
        (slider) => {
          let timeout: string | number | NodeJS.Timeout | undefined
          let mouseOver = false
          function clearNextTimeout() {
            clearTimeout(timeout)
          }
          const slidesConfig = {
            perView: 4,
            spacing: 5,
          };
          function divideSlides() {
            const width = window.innerWidth;
            if (width <= 800) {
              slidesConfig.perView = 2;
            } else {
              slidesConfig.perView = 4;
            }
          }
          function nextTimeout() {
            clearTimeout(timeout)
            if (mouseOver) return
            timeout = setTimeout(() => {
              slider.next()
            }, 2000)
          }
          slider.on("created", () => {
            slider.container.addEventListener("mouseover", () => {
              mouseOver = true
              clearNextTimeout()
            })
            slider.container.addEventListener("mouseout", () => {
              mouseOver = false
              nextTimeout()
            })
            nextTimeout()
          })
          slider.on("dragStarted", clearNextTimeout)
          slider.on("animationEnded", nextTimeout)
          slider.on("updated", nextTimeout)
        },
      ]
      
    )
    this.dotHelper = [
      ...Array(this.slider.track.details.slides.length).keys(),
    ]
  })
  }
  ngOnDestroy() {
    if (this.slider) this.slider.destroy()
  }
}
