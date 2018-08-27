window.addEventListener('load', function load(event) {
    document.getElementById("rateTable").style.display = "none"

    let urlUSD = 'https://cors-anywhere.herokuapp.com/' + 'https://www.investing.com/currencies/usd-try';
    let responseUSD = ""

    let xhr1 = new XMLHttpRequest();
    xhr1.open("GET", urlUSD)
    xhr1.onload = function () {
        responseUSD = xhr1.responseText;
        let curUsdRate = responseUSD.split('id="last_last" dir="ltr">')[1].split("</")[0]
        document.getElementById("cur-usd-rate").appendChild(document.createTextNode(curUsdRate))

        let urlEUR = 'https://cors-anywhere.herokuapp.com/' + 'https://www.investing.com/currencies/eur-try';
        let responseEUR = ""

        let xhr2 = new XMLHttpRequest();
        xhr2.open("GET", urlEUR)
        xhr2.onload = function () {
            responseEUR = xhr2.responseText;
            let curEurRate = responseEUR.split('id="last_last" dir="ltr">')[1].split("</")[0]
            document.getElementById("cur-eur-rate").appendChild(document.createTextNode(curEurRate))

            let urlGBP = 'https://cors-anywhere.herokuapp.com/' + 'https://www.investing.com/currencies/gbp-try';
            let responseGBP = ""

            let xhr3 = new XMLHttpRequest();
            xhr3.open("GET", urlGBP)
            xhr3.onload = function () {
                responseGBP = xhr3.responseText;
                let curGbpRate = responseGBP.split('id="last_last" dir="ltr">')[1].split("</")[0]
                document.getElementById("cur-gbp-rate").appendChild(document.createTextNode(curGbpRate))

                document.getElementById('loader').style.display = "none"
                document.getElementById('rateTable').style.display = "table"
            };
            xhr3.send();

        };
        xhr2.send();

    };
    xhr1.send();
})