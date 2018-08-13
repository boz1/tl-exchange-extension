window.addEventListener('load', function load(event) {
    document.getElementById("rateTable").style.display = "none"

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

    let url = 'https://cors-anywhere.herokuapp.com/' + 'https://www.bloomberg.com/quote/USDTRY:CUR';
    let response = ""

    let xhr1 = new XMLHttpRequest();
    xhr1.open("GET", url)
    xhr1.onload = function () {
        response = xhr1.responseText;

        let curUsdRate = response.split('priceText__1853e8a5">')[1].split("</")[0]

        let histUsdRate = response.split('Prev Close</span></header><div class="value__b93f12ea">')[1].split("</")[0]

        let usdDiff = ((response.split('changeAbsolute__395487f7')[1]).split(">")[1]).split("</")[0]
        let usdChange = ((response.split('changePercent__2d7dc0d2')[1]).split(">")[1]).split("</")[0]

        if (usdDiff.includes("+")) {
            document.getElementById("hist-usd-diff").setAttribute("class", "up");
            document.getElementById("hist-usd-change").setAttribute("class", "up");

        } else {
            document.getElementById("hist-usd-diff").setAttribute("class", "down");
            document.getElementById("hist-usd-change").setAttribute("class", "down");
        }

        let url2 = 'https://cors-anywhere.herokuapp.com/' + 'https://www.bloomberg.com/quote/EURTRY:CUR';
        let response2 = ""

        let xhr2 = new XMLHttpRequest();
        xhr2.open("GET", url2)
        xhr2.onload = function () {
            response2 = xhr2.responseText;

            let curEurRate = response2.split('priceText__1853e8a5">')[1].split("</")[0]

            let histEurRate = response2.split('Prev Close</span></header><div class="value__b93f12ea">')[1].split("</")[0]

            let eurDiff = ((response2.split('changeAbsolute__395487f7')[1]).split(">")[1]).split("</")[0]
            let eurChange = ((response2.split('changePercent__2d7dc0d2')[1]).split(">")[1]).split("</")[0]

            if (eurDiff.includes("+")) {
                document.getElementById("hist-eur-diff").setAttribute("class", "up");
                document.getElementById("hist-eur-change").setAttribute("class", "up");

            } else {
                document.getElementById("hist-eur-diff").setAttribute("class", "down");
                document.getElementById("hist-eur-change").setAttribute("class", "down");
            }

            let url3 = 'https://cors-anywhere.herokuapp.com/' + 'https://www.bloomberg.com/quote/USDGBP:CUR';
            let response3 = ""

            let xhr3 = new XMLHttpRequest();
            xhr3.open("GET", url3)
            xhr3.onload = function () {
                response3 = xhr3.responseText;

                document.getElementById("load").style.display = "none"
                document.getElementById("rateTable").style.display = "table"
                // document.getElementsById("load").style.display = "none"

                document.getElementById("cur-usd-rate").appendChild(document.createTextNode(curUsdRate))

                document.getElementById("hist-usd-rate").appendChild(document.createTextNode(histUsdRate))

                document.getElementById("hist-usd-diff").innerHTML = usdDiff
                document.getElementById("hist-usd-change").innerHTML = usdChange


                document.getElementById("cur-eur-rate").appendChild(document.createTextNode(curEurRate))
                document.getElementById("hist-eur-rate").appendChild(document.createTextNode(histEurRate))

                document.getElementById("hist-eur-diff").innerHTML = eurDiff
                document.getElementById("hist-eur-change").innerHTML = eurChange


                let curGbpRate = (curUsdRate / response3.split('priceText__1853e8a5">')[1].split("</")[0]).toFixed(4)
                document.getElementById("cur-gbp-rate").appendChild(document.createTextNode(curGbpRate))

                let histGbpRate = (histUsdRate / response3.split('Prev Close</span></header><div class="value__b93f12ea">')[1].split("</")[0]).toFixed(4)
                document.getElementById("hist-gbp-rate").appendChild(document.createTextNode(histGbpRate))

                let gbpDiff = (curGbpRate - histGbpRate).toFixed(4)
                let gbpChange = ((gbpDiff * 100) / histGbpRate).toFixed(2)

                let sign = ((gbpDiff > 0) ? "+" : "");
                let cls = ((gbpDiff > 0) ? "up" : "down");

                document.getElementById("hist-gbp-diff").setAttribute("class", cls);
                document.getElementById("hist-gbp-change").setAttribute("class", cls);

                gbpDiff = sign + gbpDiff
                gbpChange = sign + gbpChange + "%"

                document.getElementById("hist-gbp-diff").innerHTML = gbpDiff
                document.getElementById("hist-gbp-change").innerHTML = gbpChange

                // arrows

                if (curUsdRate > histUsdRate) {
                    document.getElementById("ar-up-usd").style.display = "";
                } else {
                    document.getElementById("ar-down-usd").style.display = "";
                }

                if (curEurRate > histEurRate) {
                    document.getElementById("ar-up-eur").style.display = "";
                } else {
                    document.getElementById("ar-down-eur").style.display = "";
                }

                if (curGbpRate > histGbpRate) {
                    document.getElementById("ar-up-gbp").style.display = "";
                } else {
                    document.getElementById("ar-down-gbp").style.display = "";
                }
            };
            xhr3.send();
        };
        xhr2.send();
    };
    xhr1.send();
})

function getYestardayDate() {
    let date = new Date();
    date.setDate(date.getDate() - 1);

    return date.toISOString().split('T')[0];
}