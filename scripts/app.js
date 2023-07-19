const slider = document.querySelector('[type="range"]');
const value = document.querySelector(".boldNumber")

slider.value=10;
value.textContent=slider.value

slider.addEventListener("input", ()=>{
    const pre = slider.value * 100 / slider.getAttribute("max")
    document.documentElement.style.setProperty("--range_side", pre+"%") 
    value.textContent=slider.value
})

const code = document.querySelector('.generated')
code.value="";
const copy = document.querySelector(".copyBtn")
const bars = document.querySelector(".bars")
const strengthLevel = document.querySelector(".strengthLevel")
copy.addEventListener("click", ()=>{
    copy.classList.add("clicked")
    setTimeout(()=>{
        copy.classList.remove("clicked")
    }, 700)
    navigator.clipboard.writeText(code.value)
})

const checkboxes = document.querySelectorAll("[type='checkbox']");
checkboxes.forEach(e=>e.checked=false)
const geneBtn = document.querySelector(".generate");
const chars = "abcdefghigklmnopqrstuvwyz"
const nums = "0123456789"
const syms = "!@#$%^&*()_+-=[]{}|;:,.<>?"
const selects = new Set();
const results = new Map();
const includes = new Map();

checkboxes.forEach(e=>{
    e.addEventListener("click", ()=>{
        if(e.checked===true){
            selects.add(e.id)
        }else{
            selects.delete(e.id)
        }
    })
    e.addEventListener("change", ()=>{
        if(e.checked===true){
            strengthLevel.classList.add("thinking")
            setTimeout(()=>{
                strengthLevel.classList.remove("thinking")
            },3000)
        }
    })
})

function generateCodes(CL, src, Tlength){
    let vari="";
    for (let i = 0; i < CL; i++) {
        let randomNumber = Math.floor(Math.random() * (Tlength-1))
        let I = randomNumber>src.length-1
        ?src.length-1
        :randomNumber
        vari += src.charAt(I)
    }
    return vari;
}

geneBtn.addEventListener("click", ()=>{
    code.value = "";
    for (let i = 0; i < bars.children.length; i++) {
        const e = bars.children[i];
        e.style.color = "#E6E5EA"
        e.style.backgroundColor=`transparent`;
    }
    strengthLevel.innerHTML=`
        <span></span>
        <span></span>
        <span></span>
    `
    if(selects.size>0){
        let length = Number(slider.value)
        for (const s of selects) {

            includes.set(`${s}Length`, Math.floor(length/selects.size))

            for (let i = 0; i < bars.children.length; i++) {
                const e = bars.children[i];
                e.style.color = "#E6E5EA"
                e.style.backgroundColor=`transparent`;
            }
            for (let i = 0; i < selects.size; i++) {
                const e = bars.children[i];
                let color;
                if(selects.size===1){
                    color="#F64A4A";
                    strengthLevel.textContent="TOO WEAK!"
                }else if(selects.size===2){
                    color="#FB7C58"; 
                    strengthLevel.textContent="WEAK"
                }else if(selects.size===3){
                    color="#F8CD65"; 
                    strengthLevel.textContent="MEDIUM"
                }else if(selects.size===4){
                    color = "#A4FFAF"
                    strengthLevel.textContent="STRONG"
                }
                e.style.color=`${color}`;
                e.style.backgroundColor=`currentColor`;
            }

        }

        let oddLength = 0
        for (const [key, value] of includes) {
            switch(key){
                case "numLength":
                    let randomNums = ""                        
                    randomNums=generateCodes(value, nums,length)
                    oddLength+=value
                    results.set("numbers", randomNums)
                    break;
                case "symLength":
                    let randomSyms = ""                        
                    randomSyms=generateCodes(value, syms,length)
                    results.set("symbols", randomSyms)
                    oddLength+=value
                    break;
                case "upperLength":
                    let randomUppers = ""                        
                    randomUppers=generateCodes(value, chars,length).toUpperCase()
                    results.set("uppers", randomUppers)
                    oddLength+=value
                    break;
                case "lowwerLength":
                    let randomLowwers = ""                        
                    randomLowwers=generateCodes(value, chars,length)
                    results.set("lowwers", randomLowwers)
                    oddLength+=value
                    break;
            }
        }
        if(length-oddLength>0){
            let extraLowwers = ""
            extraLowwers=generateCodes(length-oddLength, chars, length)
            results.set("extras", extraLowwers)
        }else{
            results.delete("extras")
        }
        let codeString =  ""; 
        for (const [key, value] of results) {
            codeString+= value;
        }
        let codeArrayed = codeString.split("");
        for (let i = codeArrayed.length-1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));             
            [codeArrayed[i], codeArrayed[j]]=[codeArrayed[j], codeArrayed[i]]
        }
        code.value = codeArrayed.join("")
        includes.clear()
        results.clear()
        console.log(results)
        console.log(includes)
        console.log(codeArrayed)
    }
})
