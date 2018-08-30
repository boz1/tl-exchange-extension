window.addEventListener('load', function load(event) {
    document.getElementById("rateTable").style.display = "none"
    document.getElementsByClassName("extra")[0].style.display = "none"
    document.getElementsByClassName("extra")[1].style.display = "none"
    document.getElementsByClassName("extra")[2].style.display = "none"
    document.getElementsByClassName("arrow")[0].style.display = "none"
    document.getElementsByClassName("arrow")[1].style.display = "none"

    document.getElementById("down").addEventListener('click', function () {
        document.getElementsByClassName("extra")[0].style.display = ""
        document.getElementsByClassName("extra")[1].style.display = ""
        document.getElementsByClassName("extra")[2].style.display = ""
        document.getElementsByClassName("arrow")[0].style.display = "none"
        document.getElementsByClassName("arrow")[1].style.display = ""
    })

    document.getElementById("up").addEventListener('click', function () {
        document.getElementsByClassName("extra")[0].style.display = "none"
        document.getElementsByClassName("extra")[1].style.display = "none"
        document.getElementsByClassName("extra")[2].style.display = "none"
        document.getElementsByClassName("arrow")[0].style.display = ""
        document.getElementsByClassName("arrow")[1].style.display = "none"
    })

    let urlUSD = 'https://cors-anywhere.herokuapp.com/' + 'https://www.investing.com/currencies/usd-try';
    let responseUSD = ""

    let xhr1 = new XMLHttpRequest();
    xhr1.open("GET", urlUSD)
    xhr1.onload = function () {
        responseUSD = xhr1.responseText;
        setCurrentRate(responseUSD, "cur-usd-rate")
        setDiffRate(responseUSD, "diff-usd-rate")
        setPerRate(responseUSD, "per-usd-rate")
        setHistRate(responseUSD, "hist-usd-rate")

        let urlEUR = 'https://cors-anywhere.herokuapp.com/' + 'https://www.investing.com/currencies/eur-try';
        let responseEUR = ""

        let xhr2 = new XMLHttpRequest();
        xhr2.open("GET", urlEUR)
        xhr2.onload = function () {
            responseEUR = xhr2.responseText;
            setCurrentRate(responseEUR, "cur-eur-rate")
            setDiffRate(responseEUR, "diff-eur-rate")
            setPerRate(responseEUR, "per-eur-rate")
            setHistRate(responseEUR, "hist-eur-rate")

            let urlGBP = 'https://cors-anywhere.herokuapp.com/' + 'https://www.investing.com/currencies/gbp-try';
            let responseGBP = ""

            let xhr3 = new XMLHttpRequest();
            xhr3.open("GET", urlGBP)
            xhr3.onload = function () {
                responseGBP = xhr3.responseText;
                setCurrentRate(responseGBP, "cur-gbp-rate")
                setDiffRate(responseGBP, "diff-gbp-rate")
                setPerRate(responseGBP, "per-gbp-rate")
                setHistRate(responseGBP, "hist-gbp-rate")

                document.getElementById("down").setAttribute("title","\u00d6nceki g\u00fcn ile kar\u015f\u0131la\u015ft\u0131r")
                document.getElementsByClassName("hist")[0].setAttribute("title", "\u00d6nceki kapan\u0131\u015f")
                document.getElementsByClassName("arrow")[0].style.display = ""
                document.getElementById("loader").style.display = "none"
                document.getElementById("rateTable").style.display = "table"
            };
            xhr3.send();

        };
        xhr2.send();

    };
    xhr1.send();
})

function setCurrentRate(response, eid) {
    let rate = response.split('id="last_last" dir="ltr">')[1].split("</")[0]
    document.getElementById(eid).appendChild(document.createTextNode(rate))
}

function setDiffRate(response, eid) {
    let rate = response.split('dir="ltr">')[2].split("</")[0]
    if (rate.includes("+")) {
        document.getElementById(eid).setAttribute("class", "up");
    } else {
        document.getElementById(eid).setAttribute("class", "down");
    }
    document.getElementById(eid).appendChild(document.createTextNode(rate))
}

function setPerRate(response, eid) {
    let rate = response.split('dir="ltr">')[3].split("</")[0]
    if (rate.includes("+")) {
        document.getElementById(eid).setAttribute("class", "up");
    } else {
        document.getElementById(eid).setAttribute("class", "down");
    }
    document.getElementById(eid).appendChild(document.createTextNode(rate))
}

function setHistRate(response, eid) {
    let rate = response.split('dir="ltr">')[4].split("</")[0]
    document.getElementById(eid).appendChild(document.createTextNode(rate))
}