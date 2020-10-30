//현재 날짜 출력
let today = new Date();

let year = today.getFullYear(); // 년도
let month = today.getMonth() + 1; // 월
let date = today.getDate(); // 날짜
let day = today.getDay(); // 요일

today = year + "/" + month + "/" + date; //날짜 형식

//document.getElementById("infoToday").innerHTML = today; //showToday 안에 현재 날짜 보여줌