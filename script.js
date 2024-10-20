const colors = ['#CA505F', '#3857B9', '#4b3593', '#eac553', '#D87036', '#888888'];
const links = ["<a href='https://blog.coldboot.org'><span class='ritalicize'>BLOG</span>(<span class='ritalicize'>BLOG</span>)</a>", "<a href='https://github.com/cel7t'><span class='ritalicize'>GITHUB</span>(<span class='ritalicize'>GITHUB</span>)<a>", "<a href='https://www.linkedin.com/in/sarthak-shah-sos'><span class='ritalicize'>LINKEDIN</span>(<span class='ritalicize'>LINKEDIN</span>)</a>", "<a href='https://coldboot.org/assets/resume.pdf'><span class='ritalicize'>RESUME</span>(<span class='ritalicize'>RESUME</span>)</a>"]
const container = document.getElementById('circle-container');
let weights = new Array(colors.length).fill(1 / colors.length);
const aboutBox = document.getElementById('about-box');
const homeBox = document.getElementById('home-box');

function reduceWeight(weights, index) {
    const reductionFactor = 0.5;
    weights[index] *= reductionFactor;
    const totalWeight = weights.reduce((a, b) => a + b, 0);
    return weights.map(w => w / totalWeight);
}

function getRandomColor() {
    const rnd = Math.random();
    let cumulativeWeight = 0;
    for (let i = 0; i < weights.length; i++) {
        cumulativeWeight += weights[i];
        if (rnd <= cumulativeWeight) {
            weights = reduceWeight(weights, i);
            return colors[i];
        }
    }
    weights = reduceWeight(weights, i);
    return colors[weights.length - 1];
}

function createCircles() {
    container.innerHTML = '';
    const circleDiameter = 10 * window.innerHeight / 100;
    // Better to outperform than to underperform
    const rows = Math.ceil(window.innerHeight / circleDiameter) + 1;
    const cols = Math.ceil(window.innerWidth / circleDiameter) + 1;
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const circle = document.createElement('div');
            circle.classList.add('circle');
            circle.style.backgroundColor = getRandomColor();
            circle.style.left = `${col * circleDiameter}px`;
            circle.style.top = `${row * circleDiameter}px`;
            circle.style.filter = `blur(${Math.random()}px)`;
            circle.addEventListener('mouseover', function(){
                circle.style.transition = "all 0.1s ease";
                circle.style.backgroundColor = getRandomColor();
                circle.style.filter = `blur(${Math.random()}px)`;
                circle.style.transition = "all 1s ease";
            });
            container.appendChild(circle);
        }
    }
}

function randomizeCircleColors() {
    const allCircles = document.querySelectorAll('.circle');
    const totalCircles = allCircles.length;
    const numberToChange = Math.floor(totalCircles / 5);
    for (let i = 0; i < numberToChange; i++) {
        const randomindex = Math.floor(Math.random() * totalCircles);
        allCircles[randomindex].style.backgroundColor = getRandomColor();
        allCircles[randomindex].style.filter = `blur(${Math.random()}px)`;
    }
    document.getElementById("overbody").style.backgroundColor = getRandomColor();
}

// function periodicRitalicize() {
//     const rits = document.querySelectorAll('.ritalicize');
//     rits.forEach(rit => {
//         if (Math.random() > 0.5) {
//             rit.style.fontStyle = "italic";
//         } else {
//             rit.style.fontStyle = "normal";
//         }
//     });
// }

function generateTextwall() {
    const textWall = document.getElementById("textwall");
    for(let i = 0; i < 10*links.length; i++) {
        textwall.innerHTML += links[i % links.length];
        textwall.innerHTML += " • ";
    }
    // const rits = document.querySelectorAll('.ritalicize');
    // rits.forEach(rit => {
    //     if (Math.random() > 0.5) {
    //         rit.style.fontStyle = "italic";
    //     } else {
    //         rit.style.fontStyle = "normal";
    //     }
    // });
    const rits = document.querySelectorAll('.ritalicize');
    rits.forEach(rit => {
        rit.addEventListener('mouseover', function() {
            rit.style.fontStyle = 'italic';
            rit.style.color = colors[Math.floor(Math.random() * colors.length)];
        });
        rit.addEventListener('mouseout', function() {
            rit.style.fontStyle = 'normal';
            rit.style.color = 'black';
        });
    })
    document.getElementById("textwall").style.pointerEvents = "none";
}

function selectBox(box) {
    box.className = "nav-box selected";
    box.querySelector(".selected-label").innerHTML = "SELECTED";
    box.querySelector(".nav-text .nav-bullet").innerHTML = "• ";
}

function deselectBox(box) {
    box.className = "nav-box";
    box.querySelector(".selected-label").innerHTML = "";
    box.querySelector(".nav-text .nav-bullet").innerHTML = "";
}

function goToAbout() {
    selectBox(aboutBox);
    deselectBox(homeBox);
    document.getElementById("overbody").style.opacity = 0;
    const circles = document.querySelectorAll('.circle');
    circles.forEach(circle => {
        circle.style.transform = 'scale(0)';
    });
    document.getElementById("textwall").style.pointerEvents = "auto";
    document.getElementById("textwall").style.opacity = 1;
    document.getElementById("textwall").style.filter = "blur(2px)";
}

function goToHome() {
    selectBox(homeBox);
    deselectBox(aboutBox);
    document.getElementById("textwall").style.filter = "blur(10px)";
    document.getElementById("textwall").style.opacity = 0;
    document.getElementById("textwall").style.pointerEvents = "none";
    document.getElementById("overbody").style.opacity = 1;
    const circles = document.querySelectorAll('.circle');
    circles.forEach(circle => {
        circle.style.transform = 'scale(1)';
    });
}

aboutBox.addEventListener("click", goToAbout);
homeBox.addEventListener("click", goToHome);

document.getElementById("overbody").style.backgroundColor = getRandomColor(); 
createCircles();
generateTextwall();
setInterval(randomizeCircleColors, 1000);
// setInterval(periodicRitalicize, 1000);
window.addEventListener("resize", createCircles);
