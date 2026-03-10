function imprimirIframe(iframeId) {
  var iframe = document.getElementById(iframeId);
  if (iframe && iframe.contentWindow) {
    iframe.contentWindow.focus();
    iframe.contentWindow.print();
  } else {
    alert("Iframe não encontrado!");
  }
}

document.addEventListener("click", function(e) {
  if (e.target.matches("[data-iframe]")) {
    e.preventDefault();
    imprimirIframe(e.target.dataset.iframe);
  }
});

