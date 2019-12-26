var $audio1 = $('#myAudio1');
var button1 = document.getElementById("button1");

$('#input1').on('change', function(e) {
    
    var target = e.currentTarget;
    var file = target.files[0];
    var reader = new FileReader();
  
    console.log($audio1[0]);
    if (target.files && file) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $audio1.attr('src', e.target.result);
            $audio1.play();
            
        }
        reader.readAsDataURL(file);
    }
});

const selectElement = document.getElementById("input1");


selectElement.addEventListener('change', (event) => {
    document.getElementById("button1").innerHTML = prompt("Please enter a name", "default");
});


$("#button1").click(function () {
    $("#input1").trigger('click');
    //this.innerHTML = prompt("Please enter a name", "default");
    //setTimeout(function(){ 
    //    this.innerHTML = prompt("Please enter a name", "default");
    //}, 1);
});

var slide1 = document.getElementById('slider1')

slide1.oninput = function() {
    document.getElementById('myAudio1').volume = this.value; 
}