function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

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
    document.getElementById("button1").innerHTML = "<div class=\"buttonText\">" + prompt("Please enter a name", "default") + "</div>";
});


$("#button1").click(function () {
    $("#input1").trigger('click');
});

document.getElementById('slider1').oninput = function() {
    document.getElementById('myAudio1').volume = this.value; 
}