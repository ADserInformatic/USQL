



  function initViz() {
    setTimeout(() => {
      var containerDiv =  document.getElementById("vizContainer"),
    url = document.getElementById('url').innerHTML;
  
    var viz = new tableau.Viz(containerDiv, url);
    }, 3000);
  }
  initViz();