window.addEventListener("load", () => {
  const path = document.location.pathname;
  const slugs = path.split("/").filter((s) => s !== "");

  if (slugs.length === 0) document.location.pathname = "/p";
  if (slugs[0] === "e") insertEditPage(slugs[1]);
  if (slugs[0] === "p") insertViewPage(slugs[1]);
  if (slugs[0] !== "e" && slugs[0] !== "p") document.location.pathname = "/p";
});

function insertEditPage(pagedata) {
  const main = document.getElementsByTagName("main")[0];

  const decompressed = LZString.decompressFromEncodedURIComponent(pagedata);
  main.innerHTML = `<div id="content" style="width: 100%; padding: 25px; border: 1px solid black" contenteditable>${decompressed}</div>`;

  window.addEventListener("keyup", () => {
    const text = document.getElementById("content").innerText;

    const compressed = LZString.compressToEncodedURIComponent(text);
    history.replaceState(null, null, `/e/${compressed}`);
  });
}

function insertViewPage(pagedata) {
  const main = document.getElementsByTagName("main")[0];

  const decompressed = LZString.decompressFromEncodedURIComponent(pagedata);
  const div = document.createElement("div");
  div.style = "width: 100%; padding: 25px";
  div.innerText = decompressed;
  main.appendChild(div);
}

function copyViewLink() {
  const path = document.location.pathname;
  const slugs = path.split("/").filter((s) => s !== "");

  navigator.clipboard
    .writeText(`http://${location.host}/p/${slugs[1]}`)
    .then(() => alert("Copied!"));
}

function gotoEditPage() {
  const path = document.location.pathname;
  const slugs = path.split("/").filter((s) => s !== "");

  location.pathname = `e/${slugs[1]}`;
}

function gotoViewPage() {
  const path = document.location.pathname;
  const slugs = path.split("/").filter((s) => s !== "");

  location.pathname = `p/${slugs[1]}`;
}
