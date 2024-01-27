  /* exported gapiLoaded */
        /* exported gisLoaded */
        /* exported handleAuthClick */
        /* exported handleSignoutClick */

        // TODO(developer): Set to client ID and API key from the Developer Console
        const CLIENT_ID = '737127279353-lfrqfgc2kt9gibe80t8dhfourdtpbtih.apps.googleusercontent.com';
        const API_KEY = 'AIzaSyAdgubE9VfqJYCHXI0e_dHngSxdRXKsDaQ';

        // Discovery doc URL for APIs used by the quickstart
        const DISCOVERY_DOC = 'https://sheets.googleapis.com/$discovery/rest?version=v4';

        // Authorization scopes required by the API; multiple scopes can be
        // included, separated by spaces.
        const SCOPES = 'https://www.googleapis.com/auth/spreadsheets.readonly';

        let tokenClient;
        let gapiInited = false;
        let gisInited = false;

        //document.getElementById('authorize_button').style.visibility = 'hidden';
        //document.getElementById('signout_button').style.visibility = 'hidden';

        /**
         * Callback after api.js is loaded.
         */
        function gapiLoaded() {
          gapi.load('client', initializeGapiClient);
        }

        /**
         * Callback after the API client is loaded. Loads the
         * discovery doc to initialize the API.
         */
        async function initializeGapiClient() {
          await gapi.client.init({
            apiKey: API_KEY,
            discoveryDocs: [DISCOVERY_DOC],
          });
          gapiInited = true;
          maybeEnableButtons();
        }

        /**
         * Callback after Google Identity Services are loaded.
         */
        function gisLoaded() {
          tokenClient = google.accounts.oauth2.initTokenClient({
            client_id: CLIENT_ID,
            scope: SCOPES,
            callback: '', // defined later
          });
          gisInited = true;
          maybeEnableButtons();
        }

        /**
         * Enables user interaction after all libraries are loaded.
         */
        function maybeEnableButtons() {
          if (gapiInited && gisInited) {
      alert("Google Docs Libs loaded!");
            // document.getElementById('authorize_button').style.visibility = 'visible';
          }
      else{
        //alert("Error in Google Docs Libs loading!");
      }
        }

        /**
         *  Sign in the user upon button click.
         */
        function handleAuthClick() {
           tokenClient.callback = async (resp) => {
            if (resp.error !== undefined) {
              throw (resp);
            } 
            document.getElementById('start-button').style.display = 'block';
            document.getElementById('initiate-button').style.display = 'none';
			loadTheSheetValues();
          };

          if (gapi.client.getToken() === null) {
            // Prompt the user to select a Google Account and ask for consent to share their data
            // when establishing a new session.
            tokenClient.requestAccessToken({prompt: 'consent'});
          } else {
            // Skip display of account chooser and consent dialog for an existing session.
            tokenClient.requestAccessToken({prompt: ''});
          }
        }

        /**
         *  Sign out the user upon button click.
         */
        function handleSignoutClick() {
          const token = gapi.client.getToken();
          if (token !== null) {
            google.accounts.oauth2.revoke(token.access_token);
            gapi.client.setToken('');
            document.getElementById('content').innerText = '';
            document.getElementById('authorize_button').innerText = 'Authorize';
            document.getElementById('signout_button').style.visibility = 'hidden';
          }
        }
      
      var sheetValues = null;
      
      // Function to find a row with a specific text in the first column
    function loadTheSheetValues() {
      if(sheetValues == null){
        gapi.client.sheets.spreadsheets.values.get({
          spreadsheetId: '1YfKAUdQ8EV06c4RThiVrrRNPdvoWtxtdYInQW-NP6SE',
          range: 'Sheet1', // Adjust the sheet name as needed
        }).then(function(response) {
          sheetValues = response.result.values;
        }, function(error) {
          console.error('Error fetching sheet data:', error);
        });
      }
    }
    
    function findRowByText(searchText){
      var desiredRowFound = false;
      var rowIndex = 0;
      if (sheetValues && sheetValues.length > 0) {
        for (var i = 0; i < sheetValues.length; i++) {
          // Check if the first column contains the desired text
          if (sheetValues[i][0] === searchText) {
            console.log('Row found:', sheetValues[i]);
            // Do something with the found row
            desiredRowFound = true;
            rowIndex = i;
          }
        }

      if(desiredRowFound == true){
        return sheetValues[rowIndex];
      }
      else{
        // If the text is not found
        console.log('Text not found in the first column.');
        return null;
      }
      } else {
        return null;
        console.log('No data found in the sheet.');
      }
    }
    
    
    