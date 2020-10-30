      //지도 초기화면 값
      var mapOptions = {
        center: new naver.maps.LatLng(36.35045075252815, 127.38481468495347), //지도의 초기 중심 좌표
        zoom: 12, //지도 초기 줌 레벨
        mapTypeId: "normal", //지도 종류
        minZoom: 7, //지도의 최소 줌 레벨
        zoomControl: false, //줌 컨트롤의 표시 여부
        //줌 컨트롤의 옵션
        zoomControlOptions: {
          position: naver.maps.Position.TOP_RIGHT,
          style: naver.maps.ZoomControlStyle.LARGE,
        },
        logoControl: false, //로고 컨트롤
        mapDataControl: true, //일반 위성 컨트롤
        mapTypeControl: false, //
      };

      var map = new naver.maps.Map("map", mapOptions);
      var markerList = [];
      var infowindowList = [];

      //마커생성
      for (var i in data) {
        var target = data[i];
        var latlng = new naver.maps.LatLng(target.lat, target.lng);

        //두 날짜 계산
        // data.js에서 날짜 받아오기
        const date1 = new Date(target.year, target.month, target.date);
        // 오늘 날짜
        const date2 = new Date(year, month, date);

        const elapsedMSec = date2.getTime() - date1.getTime(); // 경과 초 구하기
        const elapsedDay = elapsedMSec / 1000 / 60 / 60 / 24; // 경과 일 구하기

        //방문 24시간 미만일경우
        if (elapsedDay <= 1) {
          marker = new naver.maps.Marker({
            map: map,
            position: latlng,
            icon: {
              content: "<div class='marker1'></div>",
              anchor: new naver.maps.Point(12, 12),
            },
          });
        }
        //방문  24시간이상 4일 미만일경우
        if (elapsedDay > 1 && elapsedDay < 4) {
          marker = new naver.maps.Marker({
            map: map,
            position: latlng,
            icon: {
              content: "<div class='marker2'></div>",
              anchor: new naver.maps.Point(12, 12),
            },
          });
        }
        //방문  4일이상 14일 이하일경우
        if (elapsedDay >= 4 && elapsedDay <= 14) {
          marker = new naver.maps.Marker({
            map: map,
            position: latlng,
            icon: {
              content: "<div class='marker3'></div>",
              anchor: new naver.maps.Point(12, 12),
            },
          });
        }

        var content = `<div class='infowindow_wrap'>
       <div class='infowindow_title'>${target.title}</div>
       <div class='infowindow_content'>${target.content}</div>
       <div class='infowindow_date'>${target.year}/${target.month}/${target.date}</div>
       </div>`;

        //마커정보박스
        var infowindow = new naver.maps.InfoWindow({
          content: content,
          backgroundColor: "#00ff0000",
          borderColor: "#00ff0000",
          anchorSize: new naver.maps.Size(0, 0),
        });

        markerList.push(marker);
        infowindowList.push(infowindow);
      }

      //마커 정보 박스 클릭 이벤트
      for (var i = 0, ii = markerList.length; i < ii; i++) {
        naver.maps.Event.addListener(map, "click", ClickMap(i));
        naver.maps.Event.addListener(markerList[i], "click", getClickHandler(i));
      }

      //지도 클릭할 때
      function ClickMap(i) {
        return function () {
          var infowindow = infowindowList[i];
          infowindow.close();
        };
      }

      //마커 클릭할때
      function getClickHandler(i) {
        return function () {
          var marker = markerList[i];
          var infowindow = infowindowList[i];
          if (infowindow.getMap()) {
            infowindow.close();
          } else {
            infowindow.open(map, marker);
          }
        };
      }




      //카카오 검색 api
      let ps = new kakao.maps.services.Places();
      let search_arr = []

      $("#search_input").on("keydown",function(e){
        if(e.keyCode === 13){
          let content = $(this).val();
          ps.keywordSearch(content,placeSearchCB);
        }
      })

      $("#search_button").on("click",function(e){
        let content = $("#search_input").val()
        ps.keywordSearch(content,placeSearchCB);
      })

      function placeSearchCB(data,status,pagination){
        if(status === kakao.maps.services.Status.OK){
          let target = data[0];
          const lat = target.y;
          const lng = target.x;
          const latlng = new naver.maps.LatLng(lat, lng);
          marker = new naver.maps.Marker({
            position: latlng,
            map : map
          })
          if (search_arr.length == 0){
            search_arr.push(marker)
          }else{
            search_arr.push(marker)
            let pre_marker = search_arr.splice(0,1);
            pre_marker[0].setMap(null);
          }
          map.setZoom(17,true);
          map.panTo(latlng);
        }else{
          alert("검색 결과가 없습니다")
        }
      }


      //현재위치 찾기

        let currentUse = true;
      //제이쿼리 클릭 이벤트
      $("#current").click(() => {
        //alert("클릭 이벤트");
        if ("geolocation" in navigator) {
          navigator.geolocation.getCurrentPosition(function (position) {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            const latlng = new naver.maps.LatLng(lat, lng);
            if (currentUse) {
              marker = new naver.maps.Marker({
                map: map,
                position: latlng,
                icon: {
                  content: '<img class = "pulse" draggable="false" unselectable="on" src="https://myfirstmap.s3.ap-northeast-2.amazonaws.com/circle.png"></img>',
                  anchor: new naver.maps.Point(11, 11),
                },
              });
              currentUse = false;
            }
            map.setZoom(17, true); //줌레벨 , 이동 애니메이션
            map.panTo(latlng);
          });
        } else {
          alert("위치정보 사용 불가능");
        }
      });