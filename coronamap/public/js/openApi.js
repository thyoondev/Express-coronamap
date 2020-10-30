
//공공 api ajax rest 통신 xml 데이터 파싱하기/보건복지부_코로나19 감염_현황
var xhr = new XMLHttpRequest();
var url = "http://openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19InfStateJson"; /*URL*/
var queryParams = "?" + encodeURIComponent("ServiceKey") + "=" + "ed9v9eIRGelE0CM5aVlO9igCLIt19%2F9LwOeXm4ReIf5St9Swn9jyZa%2FRMtNiac9ELFwvvoD8d9q3%2FYKpzHlWsA%3D%3D"; /*Service Key*/
queryParams += "&" + encodeURIComponent("ServiceKey") + "=" + encodeURIComponent("-"); /**/
queryParams += "&" + encodeURIComponent("pageNo") + "=" + encodeURIComponent("1"); /**/
queryParams += "&" + encodeURIComponent("numOfRows") + "=" + encodeURIComponent("1"); /**/
queryParams += "&" + encodeURIComponent("startCreateDt") + "=" + encodeURIComponent(String(year) + String(month) + String(date)); /**/
queryParams += "&" + encodeURIComponent("endCreateDt") + "=" + encodeURIComponent(String(year) + String(month) + String(date)); /**/
xhr.open("GET", url + queryParams);
xhr.onreadystatechange = function () {
  if (this.readyState == 4) {
    //xml파일에서 태그값으로 데이터 가져오기
    var xmlDoc = this.responseXML;
    var infoDecideCnt = xmlDoc.getElementsByTagName("decideCnt")[0].childNodes[0].nodeValue;
    var infoExamCnt = xmlDoc.getElementsByTagName("examCnt")[0].childNodes[0].nodeValue;
    var infoClearCnt = xmlDoc.getElementsByTagName("clearCnt")[0].childNodes[0].nodeValue;
    var infoDeathCnt = xmlDoc.getElementsByTagName("deathCnt")[0].childNodes[0].nodeValue;
    var infoStateDt = xmlDoc.getElementsByTagName("stateDt")[0].childNodes[0].nodeValue;

    //html태그안에 데이터 값 넣어주기
    document.getElementById("infoAll").innerHTML = infoDecideCnt + "명";
    document.getElementById("infoChecking").innerHTML = infoExamCnt + "명";
    document.getElementById("infoFine").innerHTML = infoClearCnt + "명";
    document.getElementById("infoDied").innerHTML = infoDeathCnt + "명";
    document.getElementById("infoStateDt").innerHTML = infoStateDt;
  }
};

xhr.send("");









//보건복지부_코로나19 시·도발생_현황
var xhr = new XMLHttpRequest();
var url = "http://openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19SidoInfStateJson"; /*URL*/
var queryParams = "?" + encodeURIComponent("ServiceKey") + "=" + "ed9v9eIRGelE0CM5aVlO9igCLIt19%2F9LwOeXm4ReIf5St9Swn9jyZa%2FRMtNiac9ELFwvvoD8d9q3%2FYKpzHlWsA%3D%3D"; /*Service Key*/
queryParams += "&" + encodeURIComponent("ServiceKey") + "=" + encodeURIComponent("-"); /**/
queryParams += "&" + encodeURIComponent("pageNo") + "=" + encodeURIComponent("1"); /**/
queryParams += "&" + encodeURIComponent("numOfRows") + "=" + encodeURIComponent("1"); /**/
queryParams += "&" + encodeURIComponent("startCreateDt") + "=" + encodeURIComponent(String(year) + String(month) + String(date)); /**/
queryParams += "&" + encodeURIComponent("endCreateDt") + "=" + encodeURIComponent(String(year) + String(month) + String(date)); /**/
xhr.open("GET", url + queryParams);
console.log(url + queryParams);
xhr.onreadystatechange = function () {
  if (this.readyState == 4) {
    var xmlDoc = this.responseXML;

    var infoLocation = xmlDoc.getElementsByTagName("gubun")[12].childNodes[0].nodeValue;
    var infoDefCnt = xmlDoc.getElementsByTagName("defCnt")[12].childNodes[0].nodeValue;
    var infoIsolClearCnt = xmlDoc.getElementsByTagName("isolClearCnt")[12].childNodes[0].nodeValue;
    var infoDeathCnt = xmlDoc.getElementsByTagName("deathCnt")[12].childNodes[0].nodeValue;
    var infoStdDay = xmlDoc.getElementsByTagName("stdDay")[12].childNodes[0].nodeValue;

    //html태그안에 데이터 값 넣어주기
    document.getElementById("infoTitleLocation").innerHTML = infoLocation;
    document.getElementById("infoAllLocation").innerHTML = infoDefCnt + "명";
    document.getElementById("infoFineLocation").innerHTML = infoIsolClearCnt + "명";
    document.getElementById("infoDiedLocation").innerHTML = infoDeathCnt + "명";
    document.getElementById("infoStateDtLocation").innerHTML = infoStdDay;
  }
};

xhr.send("");
