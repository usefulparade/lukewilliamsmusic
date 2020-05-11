var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTtXLeDOlgLpGespTc09KIy0WHG2MYFfrd39lFAamgZHBD5DjeBkQayxaQqQfvS1qDODDKeDE02euXJ/pub?gid=0&single=true&output=csv';

      function init() {
        Papa.parse(public_spreadsheet_url, {
          download: true,
          header: true,
          complete: showInfo
        })
      }

      window.addEventListener('DOMContentLoaded', init);

      function showInfo(results) {
        var data = results.data;

        // data comes through as a simple array since simpleSheet is turned on
        // alert("Successfully processed " + data.length + " rows!");
        
        console.log(data);
      }

    //   document.write("The published spreadsheet is located at <a target='_new' href='" + public_spreadsheet_url + "'>" + public_spreadsheet_url + "</a>");        