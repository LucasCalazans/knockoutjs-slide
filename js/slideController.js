define([], function() {
    return function(slideController) {
        changePage = function(slideController, code) {
            let lastSlider = slideController.lastSlider;
            let currentSlide = slideController.currentSlide();
            
            if(code == "ArrowRight") {
                currentSlide++;
                if(lastSlider < currentSlide) return;
            } else {
                currentSlide--;
                if(currentSlide <= 0) return;
            }
            
            slideController.currentSlide(currentSlide);
        }

        let currentPage = +window.location.hash.substr(1);
        if(Number.isInteger(currentPage) && currentPage > 0 && currentPage <= slideController.lastSlider) {
            slideController.currentSlide(currentPage);
        }

        slideController.currentSlide.subscribe(function(value) {
            window.location.hash = value;
        });

        document.body.addEventListener("keyup", function(event) {
            if((event.key == "ArrowRight") || (event.key == "ArrowLeft")) {
                changePage(slideController, event.key);
            }
        });
    }
});