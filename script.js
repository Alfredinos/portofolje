

const sleep = ms => new Promise(r => setTimeout(r, ms));


let myNameEl = document.querySelector(".myName");
let myNameh1Els = document.querySelectorAll(".myName>h1");
let portofolioPage = document.querySelector("#portofolioPage");
let myPortofolioFile = document.querySelector("#myPortofolioFile");
let sourcesEl = document.querySelector("#sources");
let searchEl = document.querySelectorAll("#search h1, #navbarMobileTitle");
let cvPageEl = document.querySelector("#cvPage");
let cvFileEl = document.querySelector("#cvFile");
let projectsFileEl = document.querySelector("#projectsFile");
let projectsPageEl = document.querySelector("#projectsPage");
let introPageEl = document.querySelector("#introPage");
let introFile = document.querySelector("#introFile");

let folderEls = document.querySelectorAll(".folder");
let subFolderEls = document.querySelectorAll(".subFolder");

let title = document.querySelector("title");

let navbarMobileEl = document.querySelector("#navbarMobile img");
let pageEl = document.querySelector("#pages");

let mobileSourcesToggle = false;
let mobileMode = false;


introButtonTargets = [
    "my_portofolio.md",
    "cv.pdf",
    "projects.html"
]

let introButtons = document.querySelectorAll("#introButtons>div");

introButtons.forEach((el, i)=>{
    el.addEventListener("click", ()=>{
        togglePage(introButtonTargets[i]);
    })
})




introFile.addEventListener("click", ()=>{togglePage("intro.html")});
myPortofolioFile.addEventListener("click", () => {togglePage("my_portofolio.md")});
cvFileEl.addEventListener("click", ()=>{togglePage("cv.pdf")});
projectsFileEl.addEventListener("click", ()=>{togglePage("projects.html")});



if(window.innerHeight > window.innerWidth){
    mobileMode = true;
}
pageOpen = {
    "intro": true,
    "portofolio": false,
    "cv": false,
    "projects": false,
}


navbarMobileEl.addEventListener("click", toggleSources);



folderToggle = []
subFolderToggle = []

for (let i = 0; i<folderEls.length; i++){
    folderToggle[i] = false;
    folderEls[i].children[0].addEventListener("click", ()=>{
        if(!folderToggle[i]){
            folderEls[i].style.height = "1.7em";
            folderEls[i].style.overflow = "hidden";
            folderEls[i].children[0].children[0].src = "bilder/arrow-right.png"
            folderToggle[i] = true;
        } else {
            folderEls[i].style.height = "fit-content";
            folderEls[i].children[0].children[0].src = "bilder/arrow-down.png"
            folderToggle[i] = false;
        }
    })
}

for (let i = 0; i<subFolderEls.length; i++){
    subFolderToggle[i] = false;
    subFolderEls[i].addEventListener("click", ()=>{
        if(!subFolderToggle[i]){
            temp = subFolderEls[i].parentElement.querySelectorAll(".folderFile");
            tempLength = temp.length;
            console.log(tempLength)
            for (let j = 0; j<tempLength; j++){
                temp[j].style.display = "none";
            }
            subFolderEls[i].children[0].src = "bilder/arrow-right.png"
            subFolderToggle[i] = !subFolderToggle[i];
        } else {
            temp = subFolderEls[i].parentElement.querySelectorAll(".folderFile");
            tempLength = temp.length;
            console.log(tempLength)
            for (let j = 0; j<tempLength; j++){
                temp[j].style.display = "flex";
            }
            
            subFolderEls[i].children[0].src = "bilder/arrow-down.png"
            subFolderToggle[i] = !subFolderToggle[i];
        }

    });
}


const observer = new IntersectionObserver((entries)=>{
    entries.forEach((entry) => {
        console.log(entry.isIntersecting)
        if(entry.isIntersecting){
            entry.target.classList.add('show');
            entry.target.classList.remove('hidden');
        } else{
            entry.target.classList.remove('show');
            entry.target.classList.add('hidden');
        }
    })
})

let hiddenElements = document.querySelectorAll(".hidden");
hiddenElements.forEach((el)=>observer.observe(el));




function toggleSources(){
    
    if(!mobileSourcesToggle){
        sourcesEl.style.display = "none";
        pageEl.style.width = "100vw";
    } else {
        sourcesEl.style.display = "block";
        pageEl.style.width = "82vw";
    }
    mobileSourcesToggle = !mobileSourcesToggle
}

function togglePage(page){
    toggleOffAllPages()
    if(page == "intro.html" && !pageOpen.intro){
        introPageEl.style.transform = "";
        introPageEl.style.opacity = "1";
        pageOpen.intro = true;
        introFile.style.backgroundColor = "#444";
    }
    if(page == "my_portofolio.md" && !pageOpen.portofolio){
        title.innerText = page;
        portofolioPage.style.transform = "translate(-50%,0)";
        portofolioPage.style.opacity = "1";
        makeMyName()
        pageOpen.portofolio = true;
        myPortofolioFile.style.backgroundColor = "#444";
    }
    if(page == "cv.pdf" && !pageOpen.cv){
        title.innerText = page;
        cvPageEl.style.transform = "translate(-50%, -50%)";
        cvPageEl.style.opacity = "1";
        pageOpen.cv = true;
        cvFileEl.style.backgroundColor = "#444";
    }
    if(page == "projects.html" && !pageOpen.projects){
        title.innerText = page;
        projectsPageEl.style.transform = "translate(-50%,0)";
        projectsPageEl.style.opacity = "1";
        pageOpen.projects = true;
        projectsFileEl.style.backgroundColor = "#444";
    }
    for (let i = 0; i<searchEl.length; i++){
        searchEl[i].innerText = page;
    }
    sourcesEl.style.backgroundColor = "#181818";
}

function toggleOffAllPages(){
    introPageEl.style.transform = "translate(-5000%, -50000%)";
    introFile.style.backgroundColor = "";
    introPageEl.style.opacity = "0";
    portofolioPage.style.transform = "translate(-5000%,-30000vh)";
    portofolioPage.style.opacity = "0";
    cvPageEl.style.transform = "translate(-50%, -300vh)"
    cvPageEl.style.opacity = "0";
    projectsPageEl.style.transform = "translate(-5000%, -30000vh)";
    projectsPageEl.style.opacity = "0";
    myPortofolioFile.style.backgroundColor = "";
    cvFile.style.backgroundColor = "";
    projectsFileEl.style.backgroundColor = "";

    for (let i = 0; i<myNameh1Els.length; i++){
        myNameh1Els[i].style.opacity = "0";
    }

    for (let i in pageOpen) {
        pageOpen[i] = false;
    }
    if(mobileMode){
        toggleSources()
    }
}

async function startFunction(){
    while (true){
        sourcesEl.style.backgroundColor = "#181818";
        await sleep(2000);
        for (let i in pageOpen)    
            if(pageOpen[i]){
                return 0;
            }
        sourcesEl.style.backgroundColor = "#222";
        await sleep(2000)
    }
}


async function makeMyName(){
    for (let i = 0; i<myNameh1Els.length; i++){
        myNameh1Els[i].style.opacity = 0;
    }
    for (let i = 0; i<myNameh1Els.length; i++){
        await sleep(50);
        myNameh1Els[i].style.opacity = "1";
    }
}


async function checkOrientationChange(){
    while (true){
        await sleep(100)
        temp = mobileMode;
        if(window.innerHeight>window.innerWidth){
            mobileMode = true;
        } else {
            mobileMode = false;
        }
        if (temp!=mobileMode && !mobileMode && mobileSourcesToggle){
            toggleSources()
        }
    }
}
checkOrientationChange()
