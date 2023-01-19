
const audioChannels = document.getElementsByClassName("audioChannel")

for (let i = 0; i < audioChannels.length; i++) {
    const channel = audioChannels[i];
    
    const slider = channel.querySelector("input[type=range]");
    const audio = channel.getElementsByTagName("audio")[0];
    const button = channel.getElementsByTagName("button")[0];
    const fileinput = channel.querySelector("input[type=file]");

    button.onclick = () => {
        fileinput.click();
    }

    fileinput.addEventListener("change", (event) => {
        const files = fileinput.files;
        const file = files[0];
        const fileName = file.name.split('.')[0];
        button.textContent = prompt("Select the name for the track:", fileName)
        audio.src = URL.createObjectURL(file);
        audio.volume = slider.value;
        audio.play();
        slider.disabled = false;
    });

    slider.addEventListener("input", (event) => {
        audio.volume = slider.value;
    });
}


function linearInterpolation(start, end, factor){
    return (1-factor) * start + factor * end;
}

const sliders = document.getElementsByClassName("slider");
const audios = document.getElementsByTagName("audio");

function getSliderValues(){
    const ret = new Array(sliders.length);
    for (let i = 0; i < sliders.length; i++) {
        const slider = sliders[i];
        ret[i] = slider.value;
    }
    
    return ret;
}

let currentTimeoutId = undefined;
const interpolationTime = 100;

function setSliderValues(values){
    if(values.length != sliders.length){
        console.error("Mismatch in array length");
        return;
    }

    if(currentTimeoutId != undefined)
        clearTimeout(currentTimeoutId);


    const animationFunc = (time, startValue, targetValue) => {
        const factor = time / interpolationTime;

        for (let i = 0; i < sliders.length; i++) {
            const slider = sliders[i];
            const audio = audios[i];
            const currentValue = linearInterpolation(startValue[i], targetValue[i], factor);
            slider.value = currentValue;
            audio.volume = currentValue;
        }

        if(factor >= 1){
            currentTimeoutId = undefined;
            return;
        }

        currentTimeoutId = setTimeout(animationFunc, 5, time + 5, startValue, targetValue);
    };

    animationFunc(0, getSliderValues(), values);
}

const presetButtons = document.getElementsByClassName("prefab");

const presetValues = new Array(presetButtons.length);

for (let i = 0; i < presetButtons.length; i++) {
    const presetButton = presetButtons[i];
    presetButtons[i] = undefined;

    presetButtons.addEventListener("click", (event) => {
        if(presetValues[i] == undefined){
            const presetName = prompt("Preset Name:", "Preset " + (i + 1));
            presetButtons.textContent = presetName;
            presetValues[i] = getSliderValues();
        }
        else{
            setSliderValues(presetValues[i])
        }
    });
}
