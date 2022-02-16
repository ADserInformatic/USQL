window.addEventListener('load', function(){
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




})