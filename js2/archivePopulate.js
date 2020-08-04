var arch, rows, columns, parent;
var rowsArray = [];
var c;

function preload(){
  arch = loadTable('/csv/gsheets-archive.csv', 'csv', 'header');
}

function setup(){
  // arch = loadTable('../csv/gsheets-archive.csv', 'csv', 'header');
  
  console.log(arch);
  rows = arch.getRows();
  console.log(rows);
  parent = document.getElementById('archiveBody');
  

  makeTable();

  sortArchive(1);
  sortArchive(1);
  sortArchive(2);

}

function draw(){
  // makeTable();

}

function makeTable(){

  var i = 0;

  while (i < rows.length){
    var thisRow = createElement('tr', '');
    thisRow.class('archiveRow');
    thisRow.parent(parent);
    rowsArray.push(thisRow);

    var project;

    if (rows[i].arr[1] != ""){
      var projectA = createA(rows[i].arr[1], rows[i].arr[0], '_blank');
      project = createElement('td');
      projectA.parent(project);
    } else {
      project = createElement('td', rows[i].arr[0]);
    }

    var types = rows[i].arr[2].replace(/\+/g, ',<br>');
    var roles = rows[i].arr[4].replace(/\+/g, ',<br>');
    var collaborators = rows[i].arr[5].replace(/\+/g, ',<br>');
  
    var type = createElement('td', types);
    var year = createElement('td', rows[i].arr[3]);
    var role = createElement('td', roles);
    var collab = createElement('td', collaborators);
    

    project.parent(thisRow);
    type.parent(thisRow);
    year.parent(thisRow);
    role.parent(thisRow);
    collab.parent(thisRow);

    i++;
  }

  var loadingmsg = select('#loadingmsg');
  loadingmsg.style('display', 'none');
  // for (i=0;i<rows.length;i++){

  //   var thisRow = createElement('tr', '');
  //   thisRow.class('archiveRow');
  //   thisRow.parent(parent);
  //   rowsArray.push(thisRow);

  //   var project;

  //   if (rows[i].arr[1] != ""){
  //     var projectA = createA(rows[i].arr[1], rows[i].arr[0], '_blank');
  //     project = createElement('td');
  //     projectA.parent(project);
  //   } else {
  //     project = createElement('td', rows[i].arr[0]);
  //   }

  //   var types = rows[i].arr[2].replace(/\+/g, ',<br>');
  //   var roles = rows[i].arr[4].replace(/\+/g, ',<br>');
  //   var collaborators = rows[i].arr[5].replace(/\+/g, ',<br>');
  
  //   var type = createElement('td', types);
  //   var year = createElement('td', rows[i].arr[3]);
  //   var role = createElement('td', roles);
  //   var collab = createElement('td', collaborators);
    

  //   project.parent(thisRow);
  //   type.parent(thisRow);
  //   year.parent(thisRow);
  //   role.parent(thisRow);
  //   collab.parent(thisRow);

  // }
}

function filterTable(s){
  var sort = s;
  // var allRows = document.getElementsByClassName('archiveRow');
  // console.log(allRows);
  for (i=0;i<rowsArray.length;i++){
    var children = rowsArray[i].child();
    var role = children[3].innerHTML;
    var type = children[1].innerHTML;
    if (sort == 'all'){
      rowsArray[i].style('display', 'table-row');
    } else if (sort == 'solo project'){
      if (!role.search('solo project')){
        rowsArray[i].style('display', 'table-row');
      } else {
        rowsArray[i].style('display', 'none');
      }
    } else if (sort == 'collab'){
      if (role.search('solo project')){
        rowsArray[i].style('display', 'table-row');
      } else {
        rowsArray[i].style('display', 'none');
      }
    }else if (sort == 'code'){
      if (!type.search('code')){
        rowsArray[i].style('display', 'table-row');
      } else {
        rowsArray[i].style('display', 'none');
      }
    } else if (sort == 'music'){
      if (!type.search('music')){
        rowsArray[i].style('display', 'table-row');
      } else {
        rowsArray[i].style('display', 'none');
      }
    }
  }
  // console.log(rowsArray[0].child().html());
  
}