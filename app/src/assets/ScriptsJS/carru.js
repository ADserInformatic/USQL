function App() {}

window.onload = function (event) {
    var app = new App();
    window.app = app;
};

App.prototype.processingButton = function(event) {
    const btn = event.currentTarget;
    const slickList = event.currentTarget.parentNode;
    const track = event.currentTarget.parentNode.querySelector('#track');
    const slick = track.querySelectorAll('.slick');

    const slickWidth = slick[0].offsetWidth;
    
    const trackWidth = track.offsetWidth;
    const listWidth = slickList.offsetWidth;

    track.style.left == ""  ? leftPosition = track.style.left = 0 : leftPosition = parseFloat(track.style.left.slice(0, -2) * -1);

    btn.dataset.button == "button-prev" ? prevAction(leftPosition,slickWidth,track) : nextAction(leftPosition,trackWidth,listWidth,slickWidth,track)
}

let prevAction = (leftPosition,slickWidth,track) => {
    if(leftPosition > 0) {
        console.log("entro 2")
        track.style.left = `${-1 * (leftPosition - slickWidth)}px`;
    }
}

let nextAction = (leftPosition,trackWidth,listWidth,slickWidth,track) => {
    if(leftPosition < (trackWidth - listWidth)) {
        track.style.left = `${-1 * (leftPosition + slickWidth)}px`;
    }
}






/*window.addEventListener('load', function(){
	new Glider(document.querySelector('.carousel__lista'), {
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: {
			prev: '.carousel__anterior',
			next: '.carousel__siguiente'
   },
   responsive: [
    {
     // screens greater than >= 775px
      breakpoint: 750,
      settings: {
      // Set to `auto` and provide item width to adjust to viewport
      slidesToShow: 2,
      slidesToScroll: 1
      }
    },{
      // screens greater than >= 1024px
      breakpoint: 1020,
      settings: {
      slidesToShow: 3,
      slidesToScroll: 1
       }
     }
   ]

}) 

new Glider(document.querySelector('.carousel__listav'), {
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: {
    prev: '.carousel__anteriorv',
    next: '.carousel__siguientev'
 },
 responsive: [
  {
   // screens greater than >= 775px
    breakpoint: 750,
    settings: {
    // Set to `auto` and provide item width to adjust to viewport
    slidesToShow: 2,
    slidesToScroll: 1
    }
  },{
    // screens greater than >= 1024px
    breakpoint: 1020,
    settings: {
    slidesToShow: 3,
    slidesToScroll: 1
     }
   }
 ]

})




})*/