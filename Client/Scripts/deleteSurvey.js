function HandleDiplayPopUp() {
  document.getElementById("myModal").style.display = "block";

  // Get the button that opens the modal
  let btn = document.getElementById("myBtn");

  // Get the <span> element that closes the modal
  let span = document.getElementsByClassName("close")[0];
  console.log("PRESSED");

  // When the user clicks the button, open the modal
  btn.onclick = function () {};

  // When the user clicks on <span> (x), close the modal
  span.onclick = function () {
    modal.style.display = "none";
  };

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
}

function handleClosePopUp() {
  document.getElementById("myModal").style.display = "none";
}
