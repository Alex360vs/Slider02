import { Component, ElementRef, ViewChild } from "@angular/core"
import KeenSlider, { KeenSliderInstance } from "keen-slider"

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: [
    "../../node_modules/keen-slider/keen-slider.min.css",
    "./app.component.css",
  ],
})
export class AppComponent {
  @ViewChild("sliderRef") sliderRef: ElementRef<HTMLElement>

  currentSlide: number = 1
  dotHelper: Array<Number> = []
  slider: KeenSliderInstance = null

  
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
        slides: {
          perView: 4,
          spacing: 5,
        },
        
      
      },
      [
        (slider) => {
          let timeout
          let mouseOver = false
          function clearNextTimeout() {
            clearTimeout(timeout)
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
