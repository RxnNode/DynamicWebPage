
$(document).ready(function() {

    var bar1 = document.querySelector(".bar1");
    if(bar1){
        var ba = new ldBar(bar1);
        ba.set((localStorage.finish/22)*100, true);
        console.log(localStorage.finish);
    }
    var bar2 = document.querySelector(".bar2");
    if(bar2){
        var ba2 = new ldBar(bar2);
        ba2.set((localStorage.time/6000)*100, true);
    }
    /*
    b.set(3.8, false);
    setInterval(function() {
      var value = (Math.random() * 4);
      b.set(value);
      b1.classList.toggle("passed", value > 3);
    }, 1100);
    */
    
});