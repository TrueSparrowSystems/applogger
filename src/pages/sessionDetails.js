import Cache from '../services/Cache';
import {CacheKey} from '../services/Cache/CacheKey';
export const sessionDetails = `<!DOCTYPE html>
<html>
  <head>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;700;800&display=swap" rel="stylesheet">
    <link rel="icon" type="image/x-icon" href="https://user-images.githubusercontent.com/86605635/190392201-30ee5a6d-5abe-4bd2-bc86-f0040ae5f5b5.png">

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

      ::selection{
        background-color: #ffffff;
        color: #000000;
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
        border-radius: 25px;
        overflow: hidden;
      }
      .dev-logs-div-table {
        width: 100%;
        display: table;
        font-family: arial, sans-serif;
        box-sizing: border-box;
        border-radius: 25px;
        overflow: hidden;
        border: 2px solid #36415f;
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
        background: #0F1242;
        padding-top: 10px;
        padding-bottom: 10px;
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
        margin-top: 5px;
        margin-bottom: 5px;
      }

      .dev-log-text {
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
        margin-top: 15px;
        margin-bottom: 15px;
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
        height: 720px;
        background: #1E234C;
        border-radius: 25px;
        display: flex;
        align-items: center;
        border: 2px solid #36415f;
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
      }

      .log-container {
        flex-direction: row;
        display: flex;
        padding-left: 100px;
        padding-right: 100px;
        padding-bottom: 70px;
      }

      .dev-log-container {
        background: #0A0C2D;
        padding-left: 100px;
        padding-right: 100px;
        padding-bottom: 150px;
        padding-top: 50px;
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
        font-family: 'Inter';
        font-style: normal;
        font-weight: 800;
        color: #B5BCCD;
        text-align: center;
        text-decoration: none;
        letter-spacing: 3px;
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
      
      .empty-user-steps-head-text {
        color: #ffffff;
        font-family: "Inter";
        font-style: normal;
        font-weight: 300;
        font-size: 24px;
        line-height: 29px;
        margin-top: 30px;
      }

      .empty-user-steps-sub-head-text {
        color: #ffffff;
        font-family: "Inter";
        font-style: normal;
        font-weight: 700;
        font-size: 18px;
        line-height: 25px;
        margin-top: 15px;
        letter-spacing: -0.006em;
        padding-left: 20%;
        padding-right: 20%;
      }

      .pagination {
        display: flex;
        float: right;
        margin-top: 50px;
        margin-bottom: 50px;
      }
      .pagination a{
        display: flex;
        align-items: center;
        justify-content: center;
        color: #999999;
        padding: 8px 12px;

      }
      
      .pagination a:not(.pagination-arrows) {
        box-sizing: border-box;
        width: 48px;
        height: 48px;
        border-radius: 4px;
        text-decoration: none;
        border: 2px solid #36415F;
        margin: 2px;
      }
      
      .pagination a.disabled:not(.pagination-arrows) {
        background-color: #6f7373;
        color: white;
        border: 1px solid #6f7373;
      }

      .pagination a.disabled{
        display:none
      }

      .pagination a.active {
        background: #101F3F;
        color: white;
      }

      .pagination a:hover:not(.active,.disabled,.pagination-arrows) {
        background-color: #36415F;
      }

      .pagination .pagination-list-separator{
        width: 48px;
        height: 48px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #999999;
      }

      .dev-logs-container {
        padding-top: 20px;
        padding-left: 100px;
        padding-right: 100px;
        padding-bottom: 50px;
        background-color: #0A0C2D;
      }
  
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
      const dashboardIndex = ${Cache.getValue(CacheKey.currentDashboardIndex)};
      if(dashboardIndex){
        window.location.href = "/session?pn="+dashboardIndex;
      }else{
        window.location.href = "/session";
      }
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
              <div class="downloadLogButton">DOWNLOAD</div>
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
                  <div class="div-table-col-header-text" style='font-weight:700; color: #ffffff;'>{{device_name}}</div>
                </div>
              </div>
              <div class="scroll">
                {{device_info}}
              </div>
            </div>  
          </div>


          <div class="user-steps">
            <div class="div-table">
              {{user_actions}}

            </div>
          </div>

       </div>  
        {{dev_logs}}
      </div>
    </div>
  </body>
</html>`;

export const userActionDiv = `
  
    <div class="div-table-row-header">
      <div class="div-table-col1">
        <div class="div-table-col-header-text">Steps</div>
      </div>
      <div class="div-table-col2">
        <div class="div-table-col-header-text">Details</div>
      </div>
    </div>
    <div class="scroll">
    {{user_action_steps}}
    </div>

  `;

export const devLogDiv = `
<div class="dev-log-container">
  <div class="div-title-text">Dev Logs</div>
  <div class="dev-logs-div-table" style="margin-top: 20px;">
    <div class="div-table-row-header">
      <div class="div-table-dev-logs-col1">
        <div class="div-table-col-header-text">Steps</div>
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
    {{dev_log_steps}}
  </div>
  {{pagination_component}}
</div>
`;

export const emptyUserActionSteps = `
<div style="text-align: center;">
    <svg width="117" height="102" viewBox="0 0 117 102" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M95.7837 56.879C97.9675 54.6952 99.1944 51.7333 99.1944 48.6449C99.1944 45.5564 97.9675 42.5945 95.7837 40.4107C93.5998 38.2269 90.6379 37 87.5495 37C84.4611 37 81.4992 38.2269 79.3153 40.4107L66.2222 53.5039V69.9916H82.7099L95.7837 56.879Z" stroke="#DBDE4B" stroke-width="3.87946" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M93.3784 42.8354L66.2222 69.9916" stroke="#DBDE4B" stroke-width="3.87946" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M57.4936 69.9916H47.7949" stroke="#DBDE4B" stroke-width="3.87946" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M38.0961 69.9916H28.3975" stroke="#DBDE4B" stroke-width="3.87946" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M18.6989 69.9916H9.00024" stroke="#DBDE4B" stroke-width="3.87946" stroke-linecap="round" stroke-linejoin="round"/>
        <circle cx="76.64" cy="8.64" r="8.64" fill="#DBDE4B"/>
        <circle cx="97.201" cy="92.68" r="7.56" stroke="#DBDE4B" stroke-width="2.16"/>
        <circle cx="8.64129" cy="91.9999" r="4.32" fill="#DBDE4B"/>
        <circle cx="112.32" cy="70.32" r="4.32" fill="#DBDE4B"/>
        <circle cx="105.841" cy="32.2" r="2.16" fill="#DBDE4B"/>
        <circle cx="31.16" cy="10.16" r="2.16" fill="#DBDE4B"/>
        <circle cx="70.16" cy="95.16" r="2.16" fill="#DBDE4B"/>
        <circle cx="51.48" cy="36.48" r="5.4" stroke="#B2B442" stroke-width="2.16"/>
        <path opacity="0.796364" fill-rule="evenodd" clip-rule="evenodd" d="M25.2022 46.4622C25.4358 47.2543 24.7281 48.004 23.9238 47.8164L17.3443 46.2814C17.2461 46.2585 17.1428 46.2779 17.0596 46.3349L11.487 50.1549C10.8058 50.6219 9.87409 50.1804 9.80401 49.3575L9.23072 42.6257C9.22216 42.5252 9.17176 42.433 9.09183 42.3715L3.7368 38.2521C3.08218 37.7485 3.21409 36.726 3.97508 36.4051L10.2002 33.7796C10.2932 33.7404 10.3653 33.664 10.3991 33.5689L12.6621 27.203C12.9387 26.4249 13.952 26.2343 14.4924 26.8589L18.913 31.968C18.979 32.0443 19.074 32.0893 19.1748 32.0921L25.9284 32.2771C26.754 32.2997 27.2483 33.2045 26.8213 33.9115L23.3283 39.6946C23.2761 39.7809 23.2627 39.8852 23.2912 39.9819L25.2022 46.4622ZM24.087 47.1168C24.3551 47.1793 24.591 46.9294 24.5131 46.6654L22.6021 40.1851C22.5166 39.8949 22.5569 39.5821 22.7133 39.3232L26.2064 33.5401C26.3487 33.3044 26.1839 33.0028 25.9087 32.9953L19.1551 32.8102C18.8527 32.8019 18.5677 32.6669 18.3697 32.4381L13.9491 27.329C13.7689 27.1208 13.4312 27.1843 13.339 27.4437L11.076 33.8096C10.9747 34.0946 10.7582 34.324 10.4794 34.4415L4.25426 37.067C4.0006 37.174 3.95663 37.5148 4.17483 37.6827L9.52986 41.8021C9.76966 41.9865 9.92087 42.2633 9.94654 42.5648L10.5198 49.2965C10.5432 49.5708 10.8538 49.718 11.0808 49.5623L16.6534 45.7424C16.9029 45.5713 17.2129 45.513 17.5075 45.5818L24.087 47.1168Z" fill="#C8CB47"/>
        <path opacity="0.796364" fill-rule="evenodd" clip-rule="evenodd" d="M40.2107 94.8532C40.3424 95.2999 39.9433 95.7227 39.4898 95.6168L35.7798 94.7513C35.7244 94.7384 35.6662 94.7493 35.6193 94.7815L32.4771 96.9355C32.0929 97.1988 31.5676 96.9499 31.5281 96.4858L31.2048 92.69C31.2 92.6333 31.1715 92.5813 31.1265 92.5466L28.1069 90.2238C27.7378 89.9399 27.8122 89.3633 28.2413 89.1823L31.7515 87.7019C31.8039 87.6798 31.8446 87.6367 31.8636 87.5831L33.1396 83.9935C33.2956 83.5547 33.867 83.4473 34.1717 83.7995L36.6644 86.6804C36.7016 86.7234 36.7551 86.7488 36.812 86.7503L40.6202 86.8547C41.0857 86.8674 41.3644 87.3776 41.1236 87.7763L39.154 91.0372C39.1246 91.0859 39.117 91.1446 39.1331 91.1992L40.2107 94.8532Z" fill="#C8CB47"/>
    </svg>
    <div class="empty-user-steps-head-text">Step Details</div>
    <div class="empty-user-steps-sub-head-text">
        Once you start testing, your steps will start appearing here.
    </div>
</div>
`;
