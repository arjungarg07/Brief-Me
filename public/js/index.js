document
.getElementById("url-form")
.addEventListener("submit", async (e) => {
  // let creationDate = new Date().toLocaleDateString();
  e.preventDefault();
  // console.log(e.target.elements[0].value);
  const {
    target: {
      elements: [{ value: originalUrl }],
    },
  } = e;

  // console.log(validURL(originalUrl));
  var resultLink = document.querySelector("#result-link");
  let checkValid = originalUrl.substring(0, 4);
  console.log(checkValid.toLowerCase())
  if (checkValid.toLowerCase() != "http"||"https") {
    resultLink.innerHTML = `<h3 id="result-link" style="display:inline"> <span id="result">Make sure your url starts with http or https</span></h3>`;
    return;
  }

  if (!validURL(originalUrl)) {
    document.getElementById("invalid-url").innerText ="Please enter Valid Url";
  } else {
    // console.log(elements[0].value); //browser console
    let response = await fetch("/shorten", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        originalUrl
      }),
    })
      .then((res) => res.text())
      .catch((error) => console.log(error));

    console.log(response);
    document.getElementById("shorten_url").innerText = response;
    document.getElementById("shorten_url").href = response;
    document.querySelector("#copy").addEventListener("click", e => {
      ClipBoard(response);
    });
  }
});

function submitForm(e) {
console.log(e.target);
}
function validURL(myURL) {
var pattern = new RegExp(
  "^(https?:\\/\\/)?" + // protocol
    "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|" + // domain name
    "((\\d{1,3}\\.){3}\\d{1,3}))" + // ip (v4) address
    "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + //port
    "(\\?[;&amp;a-z\\d%_.~+=-]*)?" + // query string
    "(\\#[-a-z\\d_]*)?$",
  "i"
);
console.log(pattern.test(myURL));
return pattern.test(myURL);
}

function ClipBoard(result) {
  navigator.clipboard.writeText(result);
  $("#copied").slideToggle(200);
  setTimeout(
    function () {
      $("#copied").slideToggle(200);
    }
    , 1000
  )
}
