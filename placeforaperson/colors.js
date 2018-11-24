var url = "http://colormind.io/api/";
var data = {
	model : "default",
}

var c1 = 0;
var c2 = 1;
var p = [];

var http = new XMLHttpRequest();

http.onreadystatechange = function() {
	if(http.readyState == 4 && http.status == 200) {
        var palette = JSON.parse(http.responseText).result;
        p = palette;

        // c1 = Math.floor(Math.random()*p.length);
        // c2 = Math.floor(Math.random()*p.length);
        c1 = 0;
        c2 = 1;
        c3 = 2;
        c4 = 3;
        c5 = 4;

        while (c2 == c1){
            c2 = Math.floor(Math.random()*p.length);
        }
    }
    document.getElementById("theBuilding").style.color = "rgba(" + p[c1][0] + "," + p[c1][1] + "," + p[c1][2];
    document.body.style.backgroundColor = "rgba(" + p[c2][0] + "," + p[c2][1] + "," + p[c2][2];
    document.getElementById("theAnnouncement").style.color = "rgba(" + p[c3][0] + "," + p[c3][1] + "," + p[c3][2];

}

console.log(p);
http.open("POST", url, true);
http.send(JSON.stringify(data));



