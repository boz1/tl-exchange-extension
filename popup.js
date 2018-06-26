window.addEventListener('load', function load(event) {
    document.getElementById("ar-down-usd").style.display = "none";
    document.getElementById("ar-up-usd").style.display = "none";

    document.getElementById("ar-down-eur").style.display = "none";
    document.getElementById("ar-up-eur").style.display = "none";

    document.getElementById("ar-down-gbp").style.display = "none";
    document.getElementById("ar-up-gbp").style.display = "none";

    let yesterday = "(" + getYestardayDate() + ")"
    document.getElementsByClassName("yesterday")[0].innerHTML = yesterday
    document.getElementsByClassName("yesterday")[1].innerHTML = yesterday
    document.getElementsByClassName("yesterday")[2].innerHTML = yesterday

    let xhr1 = new XMLHttpRequest();
    xhr1.open("GET", "http://www.apilayer.net/api/live?access_key=492cb37d1370bc6e68e128b0ecceeed0&format=1", false);
    xhr1.send();
    let curResp = JSON.parse(xhr1.response)
    let curRates = getRates(curResp)

    document.getElementById("cur-usd-rate").appendChild(document.createTextNode(curRates.dollar))
    document.getElementById("cur-eur-rate").appendChild(document.createTextNode(curRates.euro))
    document.getElementById("cur-gbp-rate").appendChild(document.createTextNode(curRates.pound))

    let date = getYestardayDate()
    let url = "http://apilayer.net/api/historical?access_key=492cb37d1370bc6e68e128b0ecceeed0&date=" + date + "&format=1"
    let xhr2 = new XMLHttpRequest();
    xhr2.open("GET", url, false)
    xhr2.send();
    let histResp = JSON.parse(xhr2.response)
    let histRates = getRates(histResp)

    document.getElementById("hist-usd-rate").appendChild(document.createTextNode(histRates.dollar))
    document.getElementById("hist-eur-rate").appendChild(document.createTextNode(histRates.euro))
    document.getElementById("hist-gbp-rate").appendChild(document.createTextNode(histRates.pound))

    if (curRates.dollar > histRates.dollar) {
        document.getElementById("ar-up-usd").style.display = "";
    } else {
        document.getElementById("ar-down-usd").style.display = "";
    }

    if (curRates.euro > histRates.euro) {
        document.getElementById("ar-up-eur").style.display = "";
    } else {
        document.getElementById("ar-down-eur").style.display = "";
    }

    if (curRates.pound > histRates.pound) {
        document.getElementById("ar-up-gbp").style.display = "";
    } else {
        document.getElementById("ar-down-gbp").style.display = "";
    }

    let usdDiff = (curRates.dollar - histRates.dollar).toFixed(4)
    document.getElementById("hist-usd-diff").innerHTML = usdDiff

    let eurDiff = (curRates.euro - histRates.euro).toFixed(4)
    document.getElementById("hist-eur-diff").innerHTML = eurDiff

    let gbpDiff = (curRates.pound - histRates.pound).toFixed(4)
    document.getElementById("hist-gbp-diff").innerHTML = gbpDiff


    let usdChange = "%" + ((usdDiff*100)/histRates.dollar).toFixed(2)
    let eurChange = "%" + ((eurDiff*100)/histRates.euro).toFixed(2)
    let gbpChange = "%" + ((gbpDiff*100)/histRates.pound).toFixed(2)


    if (usdDiff >= 0) {
        document.getElementById("hist-usd-diff").setAttribute("class", "up");
        document.getElementById("hist-usd-change").setAttribute("class", "up");
        document.getElementById("hist-usd-change").innerHTML = usdChange

    } else {
        document.getElementById("hist-usd-diff").setAttribute("class", "down");
        document.getElementById("hist-usd-change").setAttribute("class", "down");
        document.getElementById("hist-usd-change").innerHTML = usdChange
    }

    if (eurDiff >= 0) {
        document.getElementById("hist-eur-diff").setAttribute("class", "up");
        document.getElementById("hist-eur-change").setAttribute("class", "up");
        document.getElementById("hist-eur-change").innerHTML = eurChange

    } else {
        document.getElementById("hist-eur-diff").setAttribute("class", "down");
        document.getElementById("hist-eur-change").setAttribute("class", "down");
        document.getElementById("hist-eur-change").innerHTML = eurChange
    }

    if (gbpDiff >= 0) {
        document.getElementById("hist-gbp-diff").setAttribute("class", "up");
        document.getElementById("hist-gbp-change").setAttribute("class", "up");
        document.getElementById("hist-gbp-change").innerHTML = gbpChange

    } else {
        document.getElementById("hist-gbp-diff").setAttribute("class", "down");
        document.getElementById("hist-gbp-change").setAttribute("class", "down");
        document.getElementById("hist-gbp-change").innerHTML = gbpChange
    }
})

function getRates(response) {
    let rates = { "dollar": "", "euro": "", "pound": "" }

    rates.dollar = response.quotes.USDTRY.toFixed(4)
    rates.euro = (rates.dollar / response.quotes.USDEUR.toFixed(4)).toFixed(4)
    rates.pound = (rates.dollar / response.quotes.USDGBP.toFixed(4)).toFixed(4)

    return rates
}

function getYestardayDate() {
    let date = new Date();

    date.setDate(date.getDate() - 1);

    return date.toISOString().split('T')[0];
}
