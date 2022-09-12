export const sessionDash = `<!DOCTYPE html>
<html>
  <head>
    <style>
      html,
      body {
        min-height: 100%;
      }
      body {
        height: 100vh;
        padding: 0 0 0 0;
        margin: 0 0 0 0;
        background-color: #040E2F;
      }
      a {
        color: white;
      }

      .container {
        background-color: #040E2F;
        width: "100%";
        height: "100%";
      }
      .headTextContainer {
        font-family: "Inter";
        font-style: normal;
        font-weight: 700;
        font-size: 42px;
        line-height: 119.7%;
        display: flex;
        align-items: center;
        color: #ffffff;
        padding-left: 100px;
        padding-right: 80px;
        padding-top: 60px;
        padding-bottom: 50px;
      }
      .headTextImage {
        margin-right: 10px;
        align-self: center;
      }
      .headText {
        align-self: center;
      }

      .card-container {
        padding-right: 75px;
        padding-bottom: 40px;
        padding-left: 75px;
      }
      .card {
        width: 25%;
        border: 2px solid #3D5A8E;
        border-radius: 22px;
        padding-top: 34px;
        padding-right: 20px;
        padding-bottom: 30px;
        padding-left: 30px;
        margin-left: 25px;
        margin-right: 25px;
      }
      .flex-row {
        display: flex;
        flex-direction: row;
      }
      .card-count-text {
        margin-top: 20px;
        margin-bottom: 10px;
        font-family: "Inter";
        font-style: normal;
        font-weight: 700;
        font-size: 20px;
        line-height: 24px;
        align-items: center;
        color: #ffffff;
      }
      .card-detail-text {
        font-family: "Inter";
        font-style: normal;
        font-weight: 600;
        font-size: 15px;
        line-height: 18px;
        align-items: center;
        color: #ffffff;
      }
      .star-box {
        display: flex;
        align-items: flex-end;
        justify-content: flex-end;
        flex-grow: 1;
      }

      .div-table-container {
        margin-left: 100px;
        margin-right: 100px;
      }
      .div-table {
        width: 100%;
        display: table;
        background-color: #040E2F;
        font-family: arial, sans-serif;
        box-sizing: border-box;
        border: 2px solid #3D5A8E;
        overflow: hidden;
        border-radius: 25px;
      }
      .div-table-row {
        width: 100%;
        display: table-row;
        clear: both;
        border-bottom: 2px solid #36415f;
      }
      .div-table-row-header {
        width: 100%;
        display: table-row;
        clear: both;
        background-color: #1B1F63;
      }
      .div-table-col-header-text {
        margin-top: 25px;
        margin-bottom: 25px;
        font-family: "Inter";
        font-style: normal;
        font-weight: 800;
        font-size: 16px;
        line-height: 19px;
        align-items: center;
        letter-spacing: 3px;
        text-transform: uppercase;
        color: #B5BCCD;
      }
      .div-margin-left {
        display: flex;
        justify-content: center;
       
      }
      .transparent-text {
        color: #00000000;
      }
      .text {
        display: block; 
        overflow: hidden;
        word-wrap: break-word;
        text-overflow: ellipsis;
        font-family: "Inter";
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 20px;
        /* identical to box height, or 143% */
        align-items: center;
        justify-content: center;
        letter-spacing: -0.006em;
        color: #ffffff;
        margin-top: 15px;
        margin-bottom: 15px;
      }
      .link-text{
        text-decoration: none;
        color: #A1C3FF;
      }
      .link-text:hover{
        color: #A1C3FF5A;
      }
      .div-table-col0 {
        width: 8%;
        float: left; /* fix for buggy browsers */
        display: table-column;
        background-color: transparent;
        vertical-align: middle;
        border-bottom: 2px solid #36415f;
        color: #b5bccd;
      }
      .div-table-col1 {
        width: 40%;
        float: left; /* fix for  buggy browsers */
        display: table-column;
        background-color: transparent;
        vertical-align: middle;
        border-bottom: 2px solid #36415f;
        color: #b5bccd;
      }
      .div-table-col2 {
        width: 25%;
        float: left; /* fix for  buggy browsers */
        display: table-column;
        background-color: transparent;
        border-bottom: 2px solid #36415f;
        color: #b5bccd;
      }
      .div-table-col3 {
        width: 22%;
        float: left; /* fix for  buggy browsers */
        display: table-column;
        background-color: transparent;
        border-bottom: 2px solid #36415f;
        color: #b5bccd;
      }
      .div-download-button{
        display: flex;
        align-items: center;
        justify-content: center;
        height: 50px;
      }
      .div-table-col4 {
        width: 5%;
        float: left; /* fix for  buggy browsers */
        display: table-column;
        background-color: transparent;
        border-bottom: 2px solid #36415f;
        color: #b5bccd;
      }
    </style>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.0/jszip.min.js" integrity="sha512-xcHCGC5tQ0SHlRX8Anbz6oy/OullASJkEhb4gjkneVpGE3/QGYejf14CUO5n5q5paiHfRFTa9HKgByxzidw2Bw==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script>
    async function downloadZipFile(filename, content) {
      const zip = new JSZip();
      zip.file("Log.txt", content);
      zip.file("Log.json", content);
      const htmlData=encodeURIComponent(document.documentElement.outerHTML)
      zip.file("Log.html", htmlData);
  
      zip.generateAsync({
              type: "blob"
          })
          .then(function(content) {
              const element = document.createElement("a");
              element.setAttribute("href", window.URL.createObjectURL(content));
              element.setAttribute("download", filename);
              element.style.display = "none";
              document.body.appendChild(element);
              element.click();
              document.body.removeChild(element);
          });
      }

    function toggleBug(sessionKey){
      var xhr = new XMLHttpRequest();
      var url = window.location.href + "/"+ sessionKey + "/logBug";
      xhr.open("POST", url, true);
      xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          window.location.reload();
        }
      }
      xhr.send();
    }
  
    function downloadLogs(sessionKey) {
      var xhr = new XMLHttpRequest();
      var url = window.location.href + "/"+ sessionKey + "/download";
      xhr.open("POST", url, true);
      xhr.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
              console.log("result", this.responseText)
              downloadZipFile("log.zip", this.responseText)
          }
      }
      xhr.send();
    }
    </script>
  </head>
  <body>
    <div class="container">
      <div class="headTextContainer">
        <span class="headText"> App Logger </span>
      </div>

      <div class="flex-row card-container">
        <div class="card">
          <div class="flex-row">
            <div>
              <svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13 17V7" stroke="#4BDE97" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M7 17V1" stroke="#4BDE97" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M1 17V11" stroke="#4BDE97" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <div class="card-count-text">{{session_count}}</div>
              <div class="card-detail-text">Total Sessions</div>
            </div>

            <div class="star-box">
              <svg width="68" height="64" viewBox="0 0 68 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path opacity="0.73011" fill-rule="evenodd" clip-rule="evenodd" d="M61.1341 52.4369C61.6143 52.5543 61.7893 53.146 61.4503 53.5058L59.4557 55.6222C59.4143 55.6661 59.3933 55.7254 59.3977 55.7856L59.6138 58.6858C59.6505 59.1787 59.1418 59.5281 58.6949 59.3168L56.0657 58.0738C56.0111 58.048 55.9482 58.0464 55.8924 58.0692L53.2009 59.1709C52.7434 59.3582 52.254 58.9823 52.3168 58.492L52.6865 55.6074C52.6942 55.5475 52.6763 55.4872 52.6373 55.4411L50.7579 53.2218C50.4384 52.8446 50.6446 52.263 51.1303 52.1712L53.988 51.6314C54.0473 51.6202 54.0992 51.5846 54.1309 51.5332L55.6608 49.06C55.9208 48.6396 56.5377 48.656 56.7751 49.0896L58.1716 51.6405C58.2006 51.6935 58.2505 51.7318 58.3091 51.7461L61.1341 52.4369ZM61.1373 53.2109C61.2503 53.0909 61.192 52.8937 61.0319 52.8546L58.207 52.1638C58.0311 52.1208 57.8813 52.0058 57.7944 51.847L56.3979 49.296C56.3188 49.1515 56.1132 49.146 56.0265 49.2862L54.4966 51.7594C54.4013 51.9134 54.2457 52.0203 54.0678 52.0539L51.2102 52.5937C51.0482 52.6243 50.9795 52.8182 51.086 52.944L52.9654 55.1632C53.0825 55.3014 53.136 55.4824 53.113 55.6621L52.7433 58.5466C52.7224 58.7101 52.8855 58.8354 53.038 58.7729L55.7295 57.6713C55.8971 57.6027 56.0858 57.6077 56.2495 57.6851L58.8787 58.928C59.0276 58.9985 59.1972 58.882 59.185 58.7177L58.9689 55.8176C58.9555 55.637 59.0186 55.459 59.1428 55.3273L61.1373 53.2109Z" fill="#4BDE97"/>
                <path opacity="0.806242" d="M8.32764 63.4297C8.16178 63.7145 7.75038 63.7145 7.5845 63.4297L5.54913 59.9354C5.48837 59.8311 5.38655 59.7572 5.26856 59.7316L1.3163 58.8759C0.994203 58.8061 0.867059 58.4149 1.08663 58.1691L3.78092 55.1536C3.86136 55.0636 3.90024 54.9439 3.88808 54.8238L3.4806 50.8005C3.44739 50.4726 3.78022 50.2308 4.0818 50.3637L7.78233 51.9942C7.8928 52.0429 8.01865 52.0429 8.12912 51.9942L11.8296 50.3634C12.1311 50.2305 12.464 50.4724 12.4308 50.8002L12.0235 54.8235C12.0114 54.9436 12.0503 55.0633 12.1307 55.1533L14.8252 58.1687C15.0448 58.4145 14.9177 58.8057 14.5956 58.8755L10.6434 59.7314C10.5254 59.757 10.4236 59.831 10.3628 59.9353L8.32764 63.4297Z" fill="#4BDE97"/>
                <path opacity="0.547916" d="M52.7553 14.0001C52.4282 14.0406 52.1791 13.7132 52.3053 13.4088L53.8536 9.67307C53.8998 9.56155 53.897 9.43573 53.8459 9.32637L52.1337 5.66289C51.9942 5.36433 52.2286 5.02623 52.5571 5.05216L56.5884 5.37034C56.7088 5.37984 56.8276 5.33831 56.9158 5.2559L59.8709 2.49543C60.1117 2.27046 60.5057 2.3889 60.5825 2.70936L61.5257 6.64169C61.5538 6.75908 61.63 6.85923 61.7357 6.91767L65.2742 8.87508C65.5626 9.0346 65.5717 9.4459 65.2907 9.61803L61.8422 11.7302C61.7393 11.7932 61.6676 11.8966 61.6447 12.0152L60.8765 15.9854C60.8139 16.3089 60.4256 16.4447 60.175 16.2306L57.1006 13.6037C57.0089 13.5252 56.8883 13.489 56.7685 13.5038L52.7553 14.0001Z" fill="#4BDE97"/>
                <circle cx="17" cy="22" r="3.5" stroke="#9CE7FF"/>
                <circle cx="35" cy="36" r="2.5" stroke="#42B48B"/>
              </svg>
            
            </div>

          </div>
        </div>
        <div class="card">
          <div class="flex-row">
            <div>
            <svg width="29" height="27" viewBox="0 0 29 27" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M23.0212 11.6283L26.0213 10.7985L27.8404 6.93677" stroke="#5F2EEA" stroke-width="1.38858" stroke-linejoin="round"/>
              <path d="M6.10626 11.5962L3.10625 10.7833L1.28709 7.00043" stroke="#5F2EEA" stroke-width="1.38858" stroke-linejoin="round"/>
              <path d="M22.7021 20.5964L25.7022 21.4318L27.5213 25.3198" stroke="#5F2EEA" stroke-width="1.38858" stroke-linejoin="round"/>
              <path d="M6.42554 20.5961L3.42552 21.4202L1.60637 25.2557" stroke="#5F2EEA" stroke-width="1.38858" stroke-linejoin="round"/>
              <mask id="path-5-inside-1_523_329" fill="white">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M19.0526 7.19224C19.0601 7.0866 19.0639 6.97994 19.0639 6.8724C19.0639 4.40474 17.0634 2.4043 14.5958 2.4043C12.1281 2.4043 10.1277 4.40474 10.1277 6.8724C10.1277 6.97994 10.1315 7.0866 10.1389 7.19224H5.91494V18.0539L5.91492 18.075L5.91494 18.0962V18.1072H5.91498C5.9323 22.8691 9.79791 26.724 14.5639 26.724C19.3299 26.724 23.1955 22.8691 23.2128 18.1072H23.2129V7.19224H19.0526Z"/>
              </mask>
              <path d="M19.0526 7.19224L17.6675 7.09427L17.5623 8.58082H19.0526V7.19224ZM10.1389 7.19224V8.58082H11.6292L11.5241 7.09427L10.1389 7.19224ZM5.91494 7.19224V5.80366H4.52637V7.19224H5.91494ZM5.91494 18.0539L7.30352 18.0556V18.0539H5.91494ZM5.91492 18.075L4.52634 18.0734L4.52634 18.0767L5.91492 18.075ZM5.91494 18.0962H7.30352L7.30352 18.0945L5.91494 18.0962ZM5.91494 18.1072H4.52637V19.4958H5.91494V18.1072ZM5.91498 18.1072L7.30354 18.1021L7.29851 16.7186H5.91498V18.1072ZM23.2128 18.1072V16.7186H21.8293L21.8242 18.1021L23.2128 18.1072ZM23.2129 18.1072V19.4958H24.6015V18.1072H23.2129ZM23.2129 7.19224H24.6015V5.80366H23.2129V7.19224ZM17.6753 6.8724C17.6753 6.94723 17.6727 7.0212 17.6675 7.09427L20.4377 7.29021C20.4475 7.15199 20.4524 7.01266 20.4524 6.8724H17.6753ZM14.5958 3.79287C16.2965 3.79287 17.6753 5.17163 17.6753 6.8724H20.4524C20.4524 3.63785 17.8303 1.01572 14.5958 1.01572V3.79287ZM11.5162 6.8724C11.5162 5.17162 12.895 3.79287 14.5958 3.79287V1.01572C11.3612 1.01572 8.73909 3.63785 8.73909 6.8724H11.5162ZM11.5241 7.09427C11.5189 7.02121 11.5162 6.94723 11.5162 6.8724H8.73909C8.73909 7.01266 8.74404 7.15199 8.75382 7.29021L11.5241 7.09427ZM10.1389 5.80366H5.91494V8.58082H10.1389V5.80366ZM4.52637 7.19224V18.0539H7.30352V7.19224H4.52637ZM4.52637 18.0522L4.52634 18.0734L7.30349 18.0767L7.30352 18.0556L4.52637 18.0522ZM4.52634 18.0767L4.52637 18.0978L7.30352 18.0945L7.30349 18.0734L4.52634 18.0767ZM4.52637 18.0962V18.1072H7.30352V18.0962H4.52637ZM5.91494 19.4958H5.91498V16.7186H5.91494V19.4958ZM4.52641 18.1122C4.54651 23.6388 9.03271 28.1126 14.5639 28.1126V25.3354C10.5631 25.3354 7.31808 22.0994 7.30354 18.1021L4.52641 18.1122ZM14.5639 28.1126C20.0951 28.1126 24.5813 23.6388 24.6014 18.1122L21.8242 18.1021C21.8097 22.0994 18.5647 25.3354 14.5639 25.3354V28.1126ZM23.2128 19.4958H23.2129V16.7186H23.2128V19.4958ZM24.6015 18.1072V7.19224H21.8243V18.1072H24.6015ZM23.2129 5.80366H19.0526V8.58082H23.2129V5.80366Z" fill="#5F2EEA" mask="url(#path-5-inside-1_523_329)"/>
              <path d="M22.6063 15.553H25.2234L28 18.3296" stroke="#5F2EEA" stroke-width="1.38858" stroke-linejoin="round"/>
              <path d="M6.39362 15.553H3.77658L0.999975 18.345" stroke="#5F2EEA" stroke-width="1.38858" stroke-linejoin="round"/>
              <path d="M16.9939 3.84081C16.9513 3.02166 17.1599 1.03229 19.2279 1.03229" stroke="#5F2EEA" stroke-width="1.38858" stroke-linejoin="round"/>
              <path d="M12.2336 3.79821C12.2761 2.98208 12.0676 1.00006 9.99976 1.00006" stroke="#5F2EEA" stroke-width="1.38858" stroke-linejoin="round"/>
              <path d="M14.6916 3.07489V26.0856" stroke="#5F2EEA" stroke-width="1.38858" stroke-linejoin="round"/>
            </svg>
              <div class="card-count-text">{{bugs_count}}</div>
              <div class="card-detail-text">No of Bugs Logged</div>
            </div>

            <div class="star-box">
              <svg width="50" height="52" viewBox="0 0 50 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path opacity="0.370759" d="M29.128 18.2894C29.2273 17.9752 29.6287 17.8849 29.853 18.1263L31.491 19.8893C31.5732 19.9778 31.6888 20.0276 31.8095 20.0266L34.2159 20.0074C34.5455 20.0047 34.7554 20.3586 34.5951 20.6465L33.4246 22.7492C33.3658 22.8546 33.3542 22.9799 33.3924 23.0945L34.1543 25.3772C34.2587 25.6898 33.987 25.9987 33.6636 25.9353L31.3022 25.4718C31.1837 25.4485 31.0609 25.4761 30.9638 25.5479L29.0283 26.9779C28.7632 27.1738 28.3855 27.0109 28.3459 26.6837L28.057 24.2946C28.0425 24.1747 27.9783 24.0665 27.88 23.9963L25.9219 22.5974C25.6537 22.4059 25.6919 21.9962 25.9908 21.8575L28.1737 20.8444C28.2832 20.7936 28.3663 20.6991 28.4027 20.584L29.128 18.2894Z" fill="#D14EFF"/>
                <circle cx="4" cy="15" r="4" fill="#7243F5"/>
                <circle cx="45" cy="48" r="3.5" stroke="#5F2EEA"/>
                <circle cx="4" cy="50" r="2" fill="#F19CFF"/>
                <circle cx="49" cy="20" r="1" fill="#F19CFF"/>
                <circle cx="22" cy="35" r="2.5" stroke="#8042B4"/>
                <circle cx="36" cy="3" r="2.5" stroke="#8042B4"/>
              </svg>
            
            </div>

          </div>
        </div>
        <div class="card">
          <div class="flex-row">
            <div>
              <svg width="49" height="20" viewBox="0 0 49 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M45.74 11.2483C46.8658 10.1225 47.4983 8.59552 47.4983 7.00334C47.4983 5.41115 46.8658 3.88418 45.74 2.75834C44.6142 1.63249 43.0872 1 41.495 1C39.9028 1 38.3758 1.63249 37.25 2.75834L30.5 9.50834V18.0083H39L45.74 11.2483Z" stroke="#DBDE4B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M44.5 4.00836L30.5 18.0084" stroke="#DBDE4B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M26 18.0084H21" stroke="#DBDE4B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M16 18.0084H11" stroke="#DBDE4B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M6 18.0084H1" stroke="#DBDE4B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>            
              <div class="card-count-text">{{steps_count}}</div>
              <div class="card-detail-text">Steps Tracked</div>
            </div>

            <div class="star-box">
              <svg width="50" height="52" viewBox="0 0 50 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="4" cy="15" r="4" fill="#DBDE4B"/>
                <circle cx="45" cy="48" r="3.5" stroke="#DBDE4B"/>
                <circle cx="4" cy="50" r="2" fill="#DBDE4B"/>
                <circle cx="49" cy="20" r="1" fill="#DBDE4B"/>
                <circle cx="36" cy="3" r="2.5" stroke="#B2B442"/>
                <path opacity="0.796364" fill-rule="evenodd" clip-rule="evenodd" d="M27.0846 38.0431C27.2245 38.5173 26.8008 38.966 26.3194 38.8537L22.3813 37.9349C22.3226 37.9212 22.2607 37.9328 22.2109 37.967L18.8755 40.2534C18.4678 40.5329 17.9101 40.2687 17.8682 39.7761L17.525 35.7469C17.5199 35.6867 17.4897 35.6315 17.4419 35.5947L14.2367 33.1291C13.8449 32.8277 13.9238 32.2156 14.3793 32.0235L18.1053 30.4521C18.1609 30.4286 18.2041 30.3829 18.2244 30.326L19.5788 26.5157C19.7444 26.0499 20.3509 25.9359 20.6743 26.3097L23.3203 29.3678C23.3598 29.4134 23.4166 29.4404 23.477 29.442L27.5193 29.5528C28.0135 29.5663 28.3093 30.1079 28.0537 30.531L25.963 33.9924C25.9318 34.0441 25.9238 34.1065 25.9408 34.1644L27.0846 38.0431ZM26.4171 38.4349C26.5776 38.4724 26.7188 38.3228 26.6722 38.1648L25.5284 34.286C25.4772 34.1124 25.5013 33.9251 25.5949 33.7701L27.6857 30.3087C27.7709 30.1677 27.6723 29.9871 27.5075 29.9826L23.4652 29.8719C23.2842 29.8669 23.1136 29.7861 22.9951 29.6491L20.3492 26.5911C20.2413 26.4665 20.0392 26.5045 19.984 26.6598L18.6295 30.47C18.5689 30.6406 18.4393 30.7779 18.2724 30.8483L14.5464 32.4197C14.3946 32.4838 14.3683 32.6878 14.4989 32.7882L17.7041 35.2539C17.8476 35.3643 17.9381 35.5299 17.9535 35.7104L18.2966 39.7396C18.3106 39.9038 18.4965 39.9919 18.6324 39.8987L21.9678 37.6123C22.1172 37.5099 22.3027 37.475 22.479 37.5162L26.4171 38.4349Z" fill="#C8CB47"/>
              </svg>
            
            </div>

          </div>
        </div>
      </div>
      <div class="div-table-container">
        <div class="div-table">
          <div class="div-table-row-header">
            <div class="div-table-col0">
              <div class="div-table-col-header-text div-margin-left">Bugs</div>
            </div>
            <div class="div-table-col1">
              <div class="div-table-col-header-text">Session ID</div>
            </div>
            <div class="div-table-col2">
              <div class="div-table-col-header-text">Time Stamp</div>
            </div>
            <div class="div-table-col3">
              <div class="div-table-col-header-text">Steps Tracked</div>
              </div>
              <div class="div-table-col4">  
              <div class="div-table-col-header-text transparent-text">Download</div>
            </div>
          </div>
          {{session_data}}
        </div>
      </div>
    </div>
  </body>
</html>`;
