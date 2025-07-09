let BASE_URL = "https://latest.currency-api.pages.dev/v1/currencies"

let dropdowns = document.querySelectorAll(".dropdown select");
let fromCurr=document.querySelector('.from select');
let toCurr=document.querySelector('.to select');
let msg=document.querySelector('.msg');



for (let select of dropdowns) {
    for (currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.value = currCode;
        newOption.innerText = currCode;
        if (select.name === "from" && currCode === "USD") {
            newOption.selected = "selected";
        }
        else if (select.name === "to" && currCode === "INR") {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    })
}
let updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;

};

let Exchangebtn = document.querySelector(".Exchangebtn");
Exchangebtn.addEventListener("click",async(evt)=>{
   evt.preventDefault();
 let amount=document.querySelector('.amount input');
 let amtval=amount.value;
 if(amtval===""||amtval<1){
    amtval=1;
    amount.value="1";
 }


const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;


  let response=await fetch(URL);
  let data=await response.json();
  let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
  console.log(rate);
  console.log(amount);
 let finalAmount=amtval*rate;
 msg.innerText=`${amtval} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`
});
