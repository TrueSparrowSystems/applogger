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
        padding-left: 80px;
        padding-right: 80px;
        padding-top: 10px;
        padding-bottom: 10px;
      }
      .headTextImage {
        margin-right: 10px;
        align-self: center;
      }
      .headText {
        align-self: center;
      }

      .div-table {
        width: 100%;
        display: table;
        background-color: #040E2F;
        font-family: arial, sans-serif;
        box-sizing: border-box;
        border: 2px solid #36415f;
        border-radius: 25px;

        height: 100%;
        padding-left: 25px;
        padding-right: 25px;
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
        border-bottom: 2px solid #36415f;
      }
      .div-table-col-header-text {
        margin-top: 15px;
        margin-bottom: 15px;
        font-family: "Inter";
        font-style: normal;
        font-weight: 800;
        font-size: 16px;
        line-height: 19px;
        align-items: center;
        letter-spacing: 3px;
        text-transform: uppercase;
        color: #b5bccd;
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
      .div-table-col1 {
        width: 33%;
        float: left; /* fix for  buggy browsers */
        display: table-column;
        background-color: transparent;
        vertical-align: middle;
        border-bottom: 2px solid #36415f;
        color: #b5bccd;
      }
      .div-table-col2 {
        width: 33%;
        float: left; /* fix for  buggy browsers */
        display: table-column;
        background-color: transparent;
        border-bottom: 2px solid #36415f;
        color: #b5bccd;
      }
      .div-table-col3 {
        width: 33%;
        float: left; /* fix for  buggy browsers */
        display: table-column;
        background-color: transparent;
        border-bottom: 2px solid #36415f;
        color: #b5bccd;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="headTextContainer">
        <span class="headTextImage">
          <svg
            width="28"
            height="45"
            viewBox="0 0 28 45"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M23.2692 13.9409C23.2692 8.61056 19.0073 4.28951 13.75 4.28951C8.49268 4.28951 4.23077 8.61056 4.23077 13.9409C4.23077 16.8082 5.46258 19.3841 7.42538 21.1544C7.50456 21.2052 7.58135 21.262 7.65513 21.3247L8.15656 21.7513C8.20386 21.7862 8.24361 21.8321 8.29157 21.8662L14.5 27C15.395 27.7614 15.5117 29.1142 14.7607 30.0216C14.0098 30.929 12.6755 31.0474 11.7805 30.286L5.97226 25.4926C4.87425 27.0661 4.23077 28.9853 4.23077 31.0591C4.23077 36.3894 8.49268 40.7105 13.75 40.7105C19.0073 40.7105 23.2692 36.3894 23.2692 31.0591C23.2692 28.1916 22.0374 25.6157 20.0746 23.8456C19.9954 23.7947 19.9187 23.7379 19.8449 23.6751L19.3434 23.2485C19.2961 23.2136 19.2564 23.1679 19.2084 23.1338L15.7607 20.0215C14.8658 19.2601 14.749 17.9074 15.5 17C16.251 16.0926 17.5852 15.9742 18.4802 16.7356L21.5278 19.5072C22.6257 17.9338 23.2692 16.0147 23.2692 13.9409ZM24.6038 22.5C26.4176 20.1386 27.5 17.1666 27.5 13.9409C27.5 6.24146 21.344 -9.32977e-07 13.75 -6.01032e-07C6.15609 -2.69091e-07 -1.03031e-06 6.24146 -1.35764e-06 13.9409C-1.49483e-06 17.1679 1.08237 20.1384 2.89609 22.4998C1.08245 24.8614 4.51687e-07 27.8334 5.92686e-07 31.0591C9.29236e-07 38.7584 6.15609 45 13.75 45C21.344 45 27.5 38.7584 27.5 31.0591C27.5 27.832 26.4176 24.8614 24.6038 22.5Z"
              fill="white"
            />
          </svg>
        </span>
        <span class="headText"> Session Dash </span>
      </div>
      
      <div class="div-table">
        <div class="div-table-row-header">
          <div class="div-table-col1">
            <div class="div-table-col-header-text">Session ID</div>
          </div>
          <div class="div-table-col2">
            <div class="div-table-col-header-text">Session Start Time</div>
          </div>
          <div class="div-table-col3">
            <div class="div-table-col-header-text">Steps Tracked</div>
          </div>
        </div>
        {{session_data}}

      </div>
    </div>
  </body>
</html>`;
