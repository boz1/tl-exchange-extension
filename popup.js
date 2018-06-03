window.addEventListener('load', function load(event){
    let xhr1 = new XMLHttpRequest();
    xhr1.open("GET", "https://api.fixer.io/latest?base=USD", false);
    xhr1.send();
    let myRespD = JSON.parse(xhr1.response)
    let rateD = myRespD.rates.TRY
    document.getElementById("dollar-rate").innerHTML = rateD;

    let xhr2 = new XMLHttpRequest();
    xhr2.open("GET", "https://api.fixer.io/latest?base=EUR", false);
    xhr2.send();
    let myRespE = JSON.parse(xhr2.response)
    let rateE = myRespE.rates.TRY
    document.getElementById("euro-rate").innerHTML = rateE;

    let xhr3 = new XMLHttpRequest();
    xhr3.open("GET", "https://api.fixer.io/latest?base=GBP", false);
    xhr3.send();
    let myRespP = JSON.parse(xhr3.response)
    let rateP = myRespP.rates.TRY
    document.getElementById("pound-rate").innerHTML = rateP;
})