//인포상자 보이기 숨기기
function infoEvent() {
  var infoBox = document.getElementById("infoBox");
  var infoBoxLocation = document.getElementById("infoBoxLocation");
  var dateInfoBox = document.getElementById("dateInfoBox");

  if (infoBox.style.display == "none") {
    //메뉴 보이기
    infoBox.style.display = "flex";
    dateInfoBox.style.display = "block";
    infoBoxLocation.style.display = "flex";
  } else {
    //메뉴 감추기
    infoBox.style.display = "none";
    dateInfoBox.style.display = "none";
    infoBoxLocation.style.display = "none";
  }
}


//검색상자 보이기 숨기기
function searchEvent() {
  var searchDiv = document.getElementById("searchDiv");

  if (searchDiv.style.display == "none") {
    //메뉴 보이기
    searchDiv.style.display = "flex";
  } else {
    //메뉴 감추기
    searchDiv.style.display = "none";
  }
}
