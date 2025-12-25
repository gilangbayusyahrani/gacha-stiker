const normal = Array.from({length:24},(_,i)=>`images/normal/${i+1}.jpg`);
const rare   = Array.from({length:10},(_,i)=>`images/rare/${i+1}.jpg`);
const ssr    = Array.from({length:6}, (_,i)=>`images/ssr/${i+1}.jpg`);

const overlay = document.getElementById("overlay");
const singleCard = document.getElementById("singleCard");
const nextBtn = document.getElementById("nextBtn");
const infoText = document.getElementById("infoText");

const resultScreen = document.getElementById("resultScreen");
const resultCards = document.getElementById("resultCards");

const soundNormal = document.getElementById("soundNormal");
const soundRare   = document.getElementById("soundRare");
const soundSSR    = document.getElementById("soundSSR");

let results = [];
let index = 0;

function roll() {
    const r = Math.random();
    if (r < 0.7) return {rarity:"NORMAL", cls:"normal", img: normal[Math.floor(Math.random()*normal.length)]};
    if (r < 0.95) return {rarity:"RARE", cls:"rare", img: rare[Math.floor(Math.random()*rare.length)]};
    return {rarity:"SSR", cls:"ssr", img: ssr[Math.floor(Math.random()*ssr.length)]};
}

function playSound(rarity) {
    if (rarity === "NORMAL") {
        soundNormal.currentTime = 0;
        soundNormal.play();
    } else if (rarity === "RARE") {
        soundRare.currentTime = 0;
        soundRare.play();
    } else {
        soundSSR.currentTime = 0;
        soundSSR.play();
    }
}

function startGacha(count) {
    results = [];
    index = 0;

    for (let i=0;i<count;i++) results.push(roll());

    overlay.classList.remove("hidden");
    nextBtn.classList.add("hidden");
    infoText.innerText = "CLICK CARD";
    showSingle();
}

function showSingle() {
    singleCard.className = "card";
    singleCard.innerHTML = "CLICK";

    singleCard.onclick = () => {
        const res = results[index];
        playSound(res.rarity);

        singleCard.classList.add(res.cls);
        singleCard.innerHTML = `
            <img src="${res.img}">
            <div class="label">${res.rarity}</div>
        `;
        nextBtn.classList.remove("hidden");
    };
}

nextBtn.onclick = () => {
    index++;
    nextBtn.classList.add("hidden");

    if (index >= results.length) {
        overlay.classList.add("hidden");
        showResult();
        return;
    }
    showSingle();
};

function showResult() {
    resultCards.innerHTML = "";
    results.forEach(res => {
        const c = document.createElement("div");
        c.className = `card ${res.cls}`;
        c.innerHTML = `
            <img src="${res.img}">
            <div class="label">${res.rarity}</div>
        `;
        resultCards.appendChild(c);
    });
    resultScreen.classList.remove("hidden");
}

function closeResult() {
    resultScreen.classList.add("hidden");
}