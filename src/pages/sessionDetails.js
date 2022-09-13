export const sessionDetails = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <style>
      html,
      body {
        min-height: 100%;
      }
      body {
        height: 100vh;
        padding: 0 0 0 0;
        margin: 0 0 0 0;
        background: #0F1242;
      }
      a {
        color: white;
      }

      .container {
        background: #0F1242;
        width: "100%";
        height: "100%";
      }
      .headTextContainer {
        margin-right: 100px;
        padding-top: 60px;
        padding-bottom: 25px;
        border-bottom: 2px solid #36415F;
        display: flex;
        align-items: center;
        width: 100%;
        margin-left: 10px;
      }
      .headTextImage {
        margin-right: 10px;
        align-self: center;
      }
      .headText {
        font-family: "Inter";
        font-style: normal;
        font-weight: 700;
        font-size: 42px;
        line-height: 76px;
        color: #ffffff;
        align-self: center;
      }
      .subHeadText {
        font-family: "Inter";
        font-style: normal;
        font-weight: 700;
        font-size: 16px;
        line-height: 29px;
        color: #ffffff;
        align-self: center;
      }

      .div-title-text{
      font-family: 'Inter';
      font-style: normal;
      font-weight: 300;
      font-size: 24px;
      line-height: 29px;
      display: flex;
      align-items: center;
      color: #FFFFFF;
      margin-bottom: 30px;
      }
      .div-table {
        width: 100%;
        display: table;
        font-family: arial, sans-serif;
        box-sizing: border-box;
        border: 2px solid #36415f;
        border-radius: 25px;
        overflow: hidden;
      }
      .device-details-table {
        border: 2px solid #364;
        width: 100%;
        display:flex;
        flex-direction: column;
        overflow: hidden;
        border: 2px solid #36415f;
        border-radius: 25px;
      }
      .div-table .div-table-row {
        clear: both;
        border-bottom: 2px solid #36415f;
        width: 100%;
      }
      .div-table-row-header {
        width: 100%;
        display: table-row;
        clear: both;
        background-color: #1F1A63;
        height: 50px;
        position: sticky;
      }
      .div-table-row-value {
        width: 100%;
        clear: both;
        border-bottom: 2px solid #36415f;
      }
      .div-table-col-header-text {
        margin-top: 20px;
        margin-bottom: 20px;
        font-family: 'Inter';
        font-style: normal;
        font-weight: 800;
        font-size: 16px;
        line-height: 19px;
        display: flex;
        align-items: center;
        color: #B5BCCD;        
        letter-spacing: 3px;
        text-transform: uppercase;
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
        letter-spacing: -0.006em;
        color: #ffffff;
        margin-top: 7px;
        margin-bottom: 7px;
      }
      .full-width{
        width:100%;
      }
      .div-table-col1 {
        width: 16%;
        float: left; /* fix for  buggy browsers */
        display: table-column;
        background-color: transparent;
        vertical-align: middle;
        color: #b5bccd;
        padding-left: 4%;
      }
      .div-table-col2 {
        width: 80%;
        float: left; /* fix for  buggy browsers */
        display: table-column;
        background-color: transparent;
        color: #b5bccd;
      }
      .user-action-table-col1 {
        width: 10%;
        background-color: transparent;
        vertical-align: middle;
        color: #b5bccd;
        border: 1px solid #ffff;
      }
      .user-action-table-col2 {
        border: 1px solid #ffff;
        width: 90%;
        background-color: transparent;
        color: #b5bccd;
      }

      .div-table-dev-logs-col1 {
        width: 8%;
        float: left; /* fix for  buggy browsers */
        display: table-column;
        background-color: transparent;
        vertical-align: middle;
        color: #b5bccd;
        padding-left: 2%;
      }
      .div-table-dev-logs-col2 {
        width: 20%;
        float: left; /* fix for  buggy browsers */
        display: table-column;
        background-color: transparent;
        vertical-align: middle;
        color: #b5bccd;
      }
      .div-table-dev-logs-col3 {
        width: 20%;
        float: left; /* fix for  buggy browsers */
        display: table-column;
        background-color: transparent;
        vertical-align: middle;
        color: #b5bccd;
      }
      .div-table-dev-logs-col4 {
        width: 50%;
        float: left; /* fix for  buggy browsers */
        display: table-column;
        background-color: transparent;
        vertical-align: middle;
        color: #b5bccd;
      }

      .user-steps {
        width: 100%;
        margin-left: 20px;
        margin-top: 75px;
        // height: 100%;
      }

      .device-logs {
        width: 60%;
        margin: 20px;
        height: 100%;
      }

      .device-info-container {
        width: 30%;
        border-radius: 10px;
        margin: 20px;
      }
      .content-container{
        background: #0F1242;
        padding-left: 100px;
        padding-right: 100px;
        padding-bottom: 50px;
      }

      .log-container {
        flex-direction: row;
        display: flex;
      }

      .device-info-key {
        display: block; 
        overflow: hidden;
        word-wrap: break-word;
        text-overflow: ellipsis;
        font-weight: 100;
        font-size: 18px;
        line-height: 30px;
        /* identical to box height, or 167% */
        letter-spacing: -0.006em;
        color: #FFFFFF;
        border-bottom: 2px solid #36415F;
      }
      .device-info-value {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 600;
        font-size: 18px;
        line-height: 30px;
        /* identical to box height, or 167% */
        letter-spacing: -0.006em;
        color: #FFFFFF;
      }
      .downloadLogButton {
        color: #B5BCCD;
        text-align: center;
        text-decoration: none;
        font-size: 16px;
        padding-left: 25px;
        padding-right: 14px;
      }
      .header{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        width: -webkit-fill-available;
      }
      .back-container {
        margin-left: 60px;
        padding: 10px;
      }
      .back-container:hover{
        cursor: pointer;
      }
      .flex-row{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
      }
      tbody, thead {
        display: block;
      }
      tbody {
        height: 560px;       /* Just for the demo          */
        overflow-y: auto;    /* Trigger vertical scroll    */
        overflow-x: hidden;  /* Hide the horizontal scroll */
        width: 100%;
      }
      .scroll {
        display: flex;
        flex-direction: column;
        overflow-y: scroll;
        height: 660px;
      }
      ::-webkit-scrollbar {
        width: 0.3vw;
      }
      ::-webkit-scrollbar-thumb {
        background: #2D406F;
        border-radius: 100px;
      }
      .device-info-text {
        color: #ffffff;
        width: 100%;
        word-wrap: break-word;
        font-family: "Inter";
        font-style: normal;
        font-weight: 400;
        font-size: 18px;
        line-height: 40px;
        margin-left: 20px;
        padding-left: 10px;
        border-bottom: 2px solid #36415F;
        text-transform: capitalize;
      }
      .pagination {
        display: inline-block;
        float: right;
        margin-top: 50px;
      }
      
      .pagination a {
        box-sizing: border-box;
        width: 48px;
        height: 48px;
        border: 2px solid #36415F;
        border-radius: 4px;
        padding: 8px 16px;
        text-decoration: none;
        border: 2px solid #36415F;
      }
      
      .pagination a.disabled {
        background-color: #6f7373;
        color: white;
        border: 1px solid #6f7373;
      }

      .pagination a.active {
        background: #101F3F;
        color: white;
      }
      
      .pagination a:hover:not(.active,.disabled) {background-color: #ffffff70;}
  
    </style>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.0/jszip.min.js" integrity="sha512-xcHCGC5tQ0SHlRX8Anbz6oy/OullASJkEhb4gjkneVpGE3/QGYejf14CUO5n5q5paiHfRFTa9HKgByxzidw2Bw==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script>
    function flag(sessionId) {
        // Creating Our XMLHttpRequest object 
        var xhr = new XMLHttpRequest();
  
        // Making our connection  
        var url = '/flag/'+sessionId;
        console.log("===========> url", url)
        xhr.open("POST", url, true);
  
        // function execute after request is successful 
        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                console.log(this.responseText);
            }
        }
        // Sending our request 
        xhr.send();
    }

    function onBackButtonClick(){
      history.back();
    }

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
  
  function downloadLogs() {
      var xhr = new XMLHttpRequest();
      var url = window.location.href + "/download";
      xhr.open("POST", url, true);
      xhr.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
              console.log("result", this.responseText)
              downloadZipFile("log.zip", this.responseText)
          }
      }
      xhr.send();
   }

   function toggleBug(){
    var xhr = new XMLHttpRequest();
    var url = window.location.href + "/logBug";
    xhr.open("POST", url, true);
    xhr.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        window.location.reload();
      }
    }
    xhr.send();
  }

    </script>
  </head>
  <body>
    <div class="container">
      <div class="flex-row">
        <div class="back-container" onclick="onBackButtonClick()" >
          <svg width="13" height="24" viewBox="0 0 13 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.5 2L1.5 12L11.5 22" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <div class="headTextContainer">
          <div class="header">
            <div>
              <div class="headText">Details</div>
              <div class="subHeadText">{{sessionId}}</div>
            </div>
          </div>
          <div class="flex-row">
           {{bug_button}}
            <div class="flex-row" onclick="downloadLogs()">
              <div class="downloadLogButton">Download Logs</div>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 13L1 14C1 15.6569 2.34315 17 4 17L14 17C15.6569 17 17 15.6569 17 14L17 13M13 9L9 13M9 13L5 9M9 13L9 1" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div class="content-container">
        <div class="log-container">
          <div class="device-info-container">
            <div class="div-title-text">Device Details</div>
            
              <div class="device-details-table">
                <div class="div-table-row-header">
                  <div class="div-table-col1" style='width: 100%;'>
                    <div class="div-table-col-header-text" style='color: #ffffff;'>{{device_name}}</div>
                  </div>
                </div>
                <div class="scroll">
                {{device_info}}
                </div>
            </div>  

          </div>
          <div class="user-steps">
          <div class="div-table">
              <div class="div-table-row-header">
                <div class="div-table-col1">
                  <div class="div-table-col-header-text">Steps</div>
                </div>
                <div class="div-table-col2">
                  <div class="div-table-col-header-text">Details</div>
                </div>
              </div>
              <div class="scroll">
              {{user_actions}}
              </div>
            </div>
          </div>
        </div>
        
        <div class="div-title-text" style="margin-top: 40px">Dev Logs</div>
        <div class="div-table" style="margin-top: 20px;">
          <div class="div-table-row-header">
            <div class="div-table-dev-logs-col1">
              <div class="div-table-col-header-text">Step</div>
            </div>
            <div class="div-table-dev-logs-col2">
              <div class="div-table-col-header-text">Time Stamp</div>
            </div>
            <div class="div-table-dev-logs-col3"> 
              <div class="div-table-col-header-text">Type</div>
            </div>
            <div class="div-table-dev-logs-col4"> 
              <div class="div-table-col-header-text">Params</div>
            </div>
          </div>
          {{dev_logs}}
        </div>
        {{pagination_component}}
      </div>  
    </div>
  </body>
</html>`;
