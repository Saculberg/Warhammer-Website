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
    
    var reader = new FileReader();
  
    console.log($audio1[0]);
    if (e.currentTarget.files && e.currentTarget.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $audio1.attr('src', e.target.result);
            $audio1.play();
            
        }
        reader.readAsDataURL(e.currentTarget.files[0]);
    }
});

const selectElement1 = document.getElementById("input1");


selectElement1.addEventListener('change', (event) => {
    document.getElementById("button1").innerHTML = "<div class=\"buttonText\">" + prompt("Please enter a name", "default") + "</div>";
    document.getElementById('myAudio1').volume = document.getElementById('slider1').value;
});


$("#button1").click(function () {
    $("#input1").trigger('click');
});

document.getElementById('slider1').oninput = function() {
    document.getElementById('myAudio1').volume = this.value; 
}

var $audio2 = $('#myAudio2');
var button2 = document.getElementById("button2");

$('#input2').on('change', function(e) {
    
    var reader = new FileReader();
  
    console.log($audio2[0]);
    if (e.currentTarget.files && e.currentTarget.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $audio2.attr('src', e.target.result);
            $audio2.play();
            
        }
        reader.readAsDataURL(e.currentTarget.files[0]);
    }
});

const selectElement2 = document.getElementById("input2");


selectElement2.addEventListener('change', (event) => {
    document.getElementById("button2").innerHTML = "<div class=\"buttonText\">" + prompt("Please enter a name", "default") + "</div>";
    document.getElementById('myAudio2').volume = document.getElementById('slider2').value;
});


$("#button2").click(function () {
    $("#input2").trigger('click');
});

document.getElementById('slider2').oninput = function() {
    document.getElementById('myAudio2').volume = this.value; 
}

var $audio3 = $('#myAudio3');
var button3 = document.getElementById("button3");

$('#input3').on('change', function(e) {
    
    var reader = new FileReader();
  
    console.log($audio3[0]);
    if (e.currentTarget.files && e.currentTarget.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {

            $audio3.attr('src', e.target.result);
            $audio3.play();
            
            
        }
        reader.readAsDataURL(e.currentTarget.files[0]);
    }
});

const selectElement3 = document.getElementById("input3");


selectElement3.addEventListener('change', (event) => {
    document.getElementById("button3").innerHTML = "<div class=\"buttonText\">" + prompt("Please enter a name", "default") + "</div>";
    document.getElementById('myAudio3').volume = document.getElementById('slider3').value;
});


$("#button3").click(function () {
    $("#input3").trigger('click');
});

document.getElementById('slider3').oninput = function() {
    document.getElementById('myAudio3').volume = this.value; 
}

var $audio4 = $('#myAudio4');
var button4 = document.getElementById("button4");

$('#input4').on('change', function(e) {
    
    var reader = new FileReader();
  
    console.log($audio4[0]);
    if (e.currentTarget.files && e.currentTarget.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $audio4.attr('src', e.target.result);
            $audio4.play();
            
        }
        reader.readAsDataURL(e.currentTarget.files[0]);
    }
});

const selectElement4 = document.getElementById("input4");


selectElement4.addEventListener('change', (event) => {
    document.getElementById("button4").innerHTML = "<div class=\"buttonText\">" + prompt("Please enter a name", "default") + "</div>";
    document.getElementById('myAudio4').volume = document.getElementById('slider4').value;
});


$("#button4").click(function () {
    $("#input4").trigger('click');
});

document.getElementById('slider4').oninput = function() {
    document.getElementById('myAudio4').volume = this.value; 
}

var $audio5 = $('#myAudio5');
var button5 = document.getElementById("button5");

$('#input5').on('change', function(e) {
    
    var reader = new FileReader();
  
    console.log($audio5[0]);
    if (e.currentTarget.files && e.currentTarget.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $audio5.attr('src', e.target.result);
            $audio5.play();
            
        }
        reader.readAsDataURL(e.currentTarget.files[0]);
    }
});

const selectElement5 = document.getElementById("input5");


selectElement5.addEventListener('change', (event) => {
    document.getElementById("button5").innerHTML = "<div class=\"buttonText\">" + prompt("Please enter a name", "default") + "</div>";
    document.getElementById('myAudio5').volume = document.getElementById('slider5').value;
});


$("#button5").click(function () {
    $("#input5").trigger('click');
});

document.getElementById('slider5').oninput = function() {
    document.getElementById('myAudio5').volume = this.value; 
}

var $audio6 = $('#myAudio6');
var button6 = document.getElementById("button6");

$('#input6').on('change', function(e) {
    
    var reader = new FileReader();
  
    console.log($audio6[0]);
    if (e.currentTarget.files && e.currentTarget.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $audio6.attr('src', e.target.result);
            $audio6.play();
            
        }
        reader.readAsDataURL(e.currentTarget.files[0]);
    }
});

const selectElement6 = document.getElementById("input6");


selectElement6.addEventListener('change', (event) => {
    document.getElementById("button6").innerHTML = "<div class=\"buttonText\">" + prompt("Please enter a name", "default") + "</div>";
    document.getElementById('myAudio6').volume = document.getElementById('slider6').value;
});


$("#button6").click(function () {
    $("#input6").trigger('click');
});

document.getElementById('slider6').oninput = function() {
    document.getElementById('myAudio6').volume = this.value; 
}

var $audio7 = $('#myAudio7');
var button7 = document.getElementById("button7");

$('#input7').on('change', function(e) {
    
    var reader = new FileReader();
  
    console.log($audio7[0]);
    if (e.currentTarget.files && e.currentTarget.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $audio7.attr('src', e.target.result);
            $audio7.play();
            
        }
        reader.readAsDataURL(e.currentTarget.files[0]);
    }
});

const selectElement7 = document.getElementById("input7");


selectElement7.addEventListener('change', (event) => {
    document.getElementById("button7").innerHTML = "<div class=\"buttonText\">" + prompt("Please enter a name", "default") + "</div>";
    document.getElementById('myAudio7').volume = document.getElementById('slider7').value;
});


$("#button7").click(function () {
    $("#input7").trigger('click');
});

document.getElementById('slider7').oninput = function() {
    document.getElementById('myAudio7').volume = this.value; 
}

var $audio8 = $('#myAudio8');
var button8 = document.getElementById("button8");

$('#input8').on('change', function(e) {
    
    var reader = new FileReader();
  
    console.log($audio8[0]);
    if (e.currentTarget.files && e.currentTarget.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $audio8.attr('src', e.target.result);
            $audio8.play();
            
        }
        reader.readAsDataURL(e.currentTarget.files[0]);
    }
});

const selectElement8 = document.getElementById("input8");


selectElement8.addEventListener('change', (event) => {
    document.getElementById("button8").innerHTML = "<div class=\"buttonText\">" + prompt("Please enter a name", "default") + "</div>";
    document.getElementById('myAudio8').volume = document.getElementById('slider8').value;
});


$("#button8").click(function () {
    $("#input8").trigger('click');
});

document.getElementById('slider8').oninput = function() {
    document.getElementById('myAudio8').volume = this.value; 
}

function getCurrentValue(){
    return [
            document.getElementById('slider1').value,
            document.getElementById('slider2').value,
            document.getElementById('slider3').value,
            document.getElementById('slider4').value,
            document.getElementById('slider5').value,
            document.getElementById('slider6').value,
            document.getElementById('slider7').value,
            document.getElementById('slider8').value
        ];
}

function linearProgress(start, end, progress){
    amt = progress / 100.0;
    return (1-amt)*start+amt*end
}

var isLoadingPrefab = false;

function loadPrefab(target, start, progress){
    
    for(var i = 0; i < target.length; i++){
        document.getElementById("slider" + (i + 1)).value = linearProgress(start[i], target[i], progress)
        document.getElementById("myAudio" + (i + 1)).volume = linearProgress(start[i], target[i], progress)
	}
    if(progress < 100)
        setTimeout(() => loadPrefab(target, start, progress + 1), 5);
    else
        isLoadingPrefab = false;
}

var prefabIsSet = [
    false,
    false,
    false,
    false
];
var prefabs = [
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0]
];

function prefabCall(index){

    if(prefabIsSet[index])
        if(!isLoadingPrefab)
        {
            isLoadingPrefab = true;
            loadPrefab(prefabs[index], getCurrentValue(), 0);
		}
    else{
        prefabIsSet[index] = true;

        prefabs[index] = getCurrentValue();

        document.getElementById("prefabButton" + (index + 1)).innerHTML = "<div class=\"buttonText\">" + prompt("Please enter a name", "default") + "</div>";
	}
}

function load(){
    $("#inputLoad").trigger('click');
}
$('#inputLoad').on('change', function(e) {
    
    var reader = new FileReader();
  
    if (e.currentTarget.files && e.currentTarget.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            setLoad(e.target.result);
        }
        reader.readAsText(e.currentTarget.files[0]);
    }
});

function setLoad(str){
    var data = str.split("|");

    var prefabData = data[0].split(",");

    for(var i = 0; i < 4; i++){
        for(var j = 0; j < 8; j++){
            prefabs[i][j] = parseFloat(prefabData[i * 8 + j]);
		}
	}

    var prefabIsSetData = data[1].split(",");

    for(var i = 0; i < prefabIsSetData.length; i++){
        prefabIsSet[i] = "True" == prefabIsSetData[i];
	}

    var prefabNames = data[2].split(",");

    for(var ie = 0; ie < 4; ie++){
        (document.getElementById("prefabButton" + (ie + 1))).innerHTML = "<div class=\"buttonText\">" + prefabNames[ie] + "</div>";
	}

    var buttonNames = data[3].split(",");

    for(var i = 0; i < 8; i++){
        (document.getElementById("button" + (i + 1))).innerHTML = "<div class=\"buttonText\">" + buttonNames[i] + "</div>";
	}

    var urls = data[4].split(",");

    for(var e = 0; e < urls.length; e++){
        (document.getElementById("myAudio" + (e + 1))).src = (urls[e]);
	}
}

function save(){
    var savs = "";
    //savs += prefabs;
    //savs += "|";
    //savs += prefabIsSet;
    //savs += "|";
    //for(var ie = 0; ie < 4; ie++){
    //    savs += (document.getElementById("prefabButton" + (ie + 1))).innerHTML.substring(24).split("<")[0];
    //    if(ie < 3)
    //        savs += ",";
	//}
    //savs += "|";
    //for(var i = 0; i < 8; i++){
    //    savs += (document.getElementById("button" + (i + 1))).innerHTML.substring(24).split("<")[0];
    //    if(i < 7)
    //        savs += ",";
	//}
    //savs += "|";
    for(var h = 0; h < 8; h++){
        savs += (document.getElementById("myAudio" + (h + 1))).src;
        if(h < 7)
            savs += ",";
	}

    download("default.txt", savs);
}

//download("def.txt", "hejkqwjwhffui aoduiadjiafihaoiah fioahiofuasiofuaoifuaofiuasofiuaiouf iaouafio uaiouaio uaofi uaio fuaoifuaiofuaiofuaio a fiuaoi fua foiuafio uafoi aufoiu afiuaf oiafu aofiu afoiufa oiufaofuiaofiu afoiuafofiua ofuiaofiaua foiufaoiufaouifaofiuafouiafoiufaof uiaofiauf oafu afoi afoiuafioafuafoiuafiou afiouaf");