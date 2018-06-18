window.addEventListener('load', function load(event) {
    let xhr1 = new XMLHttpRequest();
    xhr1.open("GET", "http://www.apilayer.net/api/live?access_key=492cb37d1370bc6e68e128b0ecceeed0&format=1", false);
    xhr1.send();
    let myRespD = JSON.parse(xhr1.response)
    let rateD = myRespD.quotes.USDTRY.toFixed(4)
    document.getElementById("dollar-rate").innerHTML = rateD;

    let rateDE = myRespD.quotes.USDEUR
    let rateE = (rateD / rateDE).toFixed(4)
    document.getElementById("euro-rate").innerHTML = rateE;

    let rateDP = myRespD.quotes.USDGBP
    let rateP = (rateD / rateDP).toFixed(4)
    document.getElementById("pound-rate").innerHTML = rateP;
})