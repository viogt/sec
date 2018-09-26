function id(x) { return document.getElementById(x); }

var curTable=0, tables;

function craftTable(s) {
	
	var t = document.createElement('TABLE'), h = document.createElement('THEAD'), b = document.createElement('TBODY');
		t.className = 'TblAlt';

		var r = document.createElement('TR');
		for(var i=0, C=s[0], L=C.length; i<L; i++) {
			var c = document.createElement('TH'); c.innerText = C[i]; r.appendChild(c);
		}
		if(curTable==0) { var c = document.createElement('TH'); c.innerText = 'Answer'; r.appendChild(c); }
		else if(curTable==1) {
		try {
			for(var j=1, LL=tables[2].data.length; j<LL; j++) {
				var txtn = document.createElement('DIV'); txtn.innerText = tables[2].data[j][0]; txtn.className = 'txtVertical';
				var c = document.createElement('TH'); c.appendChild(txtn); r.appendChild(c);
			}
		} catch(e) { alert(e.message); }
		}
		h.appendChild(r); t.appendChild(h);

		for(var i=1, L=s.length; i<L; i++) {
			var r = document.createElement('TR');
			
			if(tables[curTable].sub && s[i][0]==0) r.style.backgroundColor = '#bbbbee';
			
			for(var y=0, C=s[i], LL=C.length; y<LL; y++) {
				var v = (C[y] === true)?'✔':(C[y] === false?' ':C[y]);
				var c = document.createElement('TD'); c.innerText = v; r.appendChild(c);
			}
				if(curTable==0) {
					var u = document.createElement('INPUT'); u.type = 'button'; u.className = 'checkOff'; u.addEventListener("click", orgCheck);
					var c = document.createElement('TD');  c.appendChild(u); r.appendChild(c);
				}
				else if(curTable==1) {
					for(var j=1, LL=tables[2].data.length; j<LL; j++) {
					var u = document.createElement('INPUT'); u.type = 'button'; u.className = (j==3)?'checkOn':'checkOff';
					u.addEventListener("click", speCheck); u.name = 'x'+s[i][0]; u.title = tables[2].data[j][0];
					var c = document.createElement('TD');  c.appendChild(u); r.appendChild(c);
					}
				}
			b.appendChild(r);
		}
		t.appendChild(b);
		r = id('out'); if(r.hasChildNodes()) r.removeChild( r.firstChild ); r.appendChild(t);
}

function orgCheck() { var ob = document.activeElement; ob.className = (ob.className == 'checkOn')?'checkOff':'checkOn'; }
function speCheck(){
	var ob = document.activeElement, x = document.getElementsByName(ob.getAttribute('name'));
	for(var i=0,L=x.length;i<L;i++) x[i].className = (x[i]===ob?'checkOn':'checkOff');
}

var vertAlCh = [];
function vertAl() {
	var t = tables[2].data;
	for(var i=1; i<t.length; i++) {
		var u = t[i][0], c = u.charAt(0); for(var j=1, L = u.length; j<L; j++) c += '\n' + u.charAt(j);
		vertAlCh.push(c);
	}
}
function sendToEdit(){
	alert("You'll need authorizations (rights)\nto insert and edit data.");
	window.open("https://docs.google.com/spreadsheet/ccc?key=1yLqajaJ1U0QO_olHvNUjnVYP2cw8bechouCKWCobd8Q&usp=sharing");
}
function toggleSet(){
	var x = id('Setari').style;
	x.display = x.display=='none'?'':'none';
}
function getData(x){ id('tableName').innerText = tables[curTable=x].name; craftTable(tables[x].data); }

/*function trageTot() {
	try {
		var xh = new XMLHttpRequest();
		xh.onreadystatechange = function(){
			if(xh.readyState==4) if(xh.status==200) { tables = JSON.parse(xh.responseText); orgPanel(); }
			else {  alert("Problem retrieving JSON data: " + xh.readyState + '/'+ xh.status); }
		};
		xh.open("GET","res/tables.json", true);
		xh.send();
	} catch(e) { alert(e.message); }
}*/

/*function trageTot() {
	try {
		var xh = new XMLHttpRequest();
		xh.open("GET","res/tables.json", false);
		xh.send();
		tables = JSON.parse(xh.responseText); orgPanel();
	} catch(e) { alert('Eroare: ' + e.message + '\n:' + xh.responseText) + ":"; }
}*/

//================================================================================

function trageTot() {
	let el = document.createElement('script');
	el.onload = function() {
		tables = DATA; orgPanel();
	};
	el.setAttribute('type', 'text/javascript');
    el.setAttribute('async', true);
    el.setAttribute('src', 'res/tables.js');
	document.body.appendChild(el);
}


//================================================================================

function layOut() {
	var scrW = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	var scrH = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

	var s = id('tableName').style; s.top = '64px'; s.left = '190px';
	var dlt = 26;
	s = id('out').style; s.top = '100px'; s.left = '180px'; s.width = (scrW - 180 - dlt) + 'px'; s.height = (scrH - 100 - dlt) + 'px';
	s = id('leftPanel').style; s.top = '105px'; s.left = '9px'; s.width = '150px';
}

function toLeftPanel() {
	var b = '<TABLE class="PanTbl">';
	for(var i=0, L=tables.length; i<L; i++) {
		b += '<TR><TD onclick="Mng.makeTable(' + i + ')">✎ ' + tables[i].name + '</TD</TR>';
	}
	b += '<TR><TD id="tipSave" class="'+ (Mng.isDirty?'saveOn':'saveOff') +'" onClick="Save()">⚠ Save updates!</TD></TR>';
	id('leftPanel').innerHTML = b + '</TABLE>';
}

function orgPanel() {
	var b = '<TABLE class="PanTbl">';
		b += '<TR><TD onclick="orgEvalSind(0)"><b>✎ Evaluare Sindroame probabile</b></TD</TR>';
		b += '<TR><TD onclick="toggleDetails(-1)">*Detalii evaluare Sindroame probabile</TD</TR>';
		b += '<TR><TD onclick="orgEvalSind(1)"><b>✎ Evaluare Tipuri probabile</b></TD</TR>';
		b += '<TR><TD onclick="toggleDetails(-2)">*Detalii evaluare Tipuri probabile</TD</TR>';
		b += '<TR><TD onclick="orgRand()">Random sample data</TD</TR>';
		b += '<TR><TD onclick="resetOrg()">Reset initial data</TD</TR>';
	id('leftPanel').innerHTML = b + '</TABLE>';
	getData(0);
}

function spePanel() {
	var b = '<TABLE class="PanTbl">';
		b += '<TR><TD onclick="orgEvalSind(2)"><b>✎ Evaluare Tulburari probabile</b></TD</TR>';
		b += '<TR><TD onclick="toggleDetails(-3)">*Detalii evaluare Tulburari probabile</TD</TR>';
		b += '<TR><TD onclick="speRand()">Random sample data</TD</TR>';
		b += '<TR><TD onclick="resetSpe()">Reset initial data</TD</TR>';
	id('leftPanel').innerHTML = b + '</TABLE>';
	getData(1);
}

function resetOrg() {
	if(curTable!=0) return; var rs = id('out').firstChild.rows, L = rs.length;
	for(var i=1; i<L; i++) rs[i].cells[2].firstChild.className = 'checkOff';
}
function orgRand() {
	if(curTable!=0) return; var rs = id('out').firstChild.rows, L = rs.length;
	for(var i=1; i<L; i++) rs[i].cells[2].firstChild.className = (Math.random()<.5)?'checkOff':'checkOn';
}
function speRand() {
	if(curTable!=1) return; var rs = id('out').firstChild.rows, L = rs.length, rBase = tables[2].data.length-1;
	for(var i=1; i<L; i++) {
		var ac = Math.floor(Math.random()*rBase);
		for(var j=0; j<rBase; j++) rs[i].cells[2+j].firstChild.className = (j!=ac)?'checkOff':'checkOn';
	}
}
function resetSpe() {
	if(curTable!=1) return; var rs = id('out').firstChild.rows, L = rs.length, rBase = tables[2].data.length-1;
	for(var i=1; i<L; i++) for(var j=0; j<rBase; j++) rs[i].cells[2+j].firstChild.className = (j!=2)?'checkOff':'checkOn';
}

function getRateSpec(rw) {
	var q = tables[2].data, L = q.length-1;
	for(var j=0; j<L; j++) if(rw.cells[j+2].firstChild.className == 'checkOn') return q[j+1][1];
}

function orgEvalSind(indx) {
	if(indx<2 && curTable!=0) return; if(indx==2 && curTable!=1) return;
	var S1, Simp, titlu, mTitlu;
	if(indx == 0) { curTable = -1; S1 = 5; Simp = 3; titlu = 'Sindrom'; mTitlu = '✎ Raport: evaluarea Sindroame probabile'; }
	else if(indx == 1) { curTable = -2; S1 = 6; Simp = 3; titlu = 'Tipuri'; mTitlu = '✎ Raport: evaluarea Tipuri probabile'; }
	else { curTable = -3; S1 = 7; Simp = 4; titlu = 'Tulburari'; mTitlu = '✎ Raport: evaluarea Tulburari probabile'; }

try {

	var rs = id('out').firstChild.rows, L = rs.length, GrandTotal = [];
	var sindOrg = tables[S1].data, simptOrg = tables[Simp].data, res = [['Cod',titlu,'Pondere','Obl','Eval']], anchOrg = [[0,0]];
	
	for(var i=1; i<L; i++) {
		var ln = [];
		ln.push(rs[i].cells[0].innerText);
			if(indx < 2) ln.push( rs[i].cells[2].firstChild.className == 'checkOn'?1:0 );
			else ln.push( getRateSpec(rs[i]) );
		anchOrg.push(ln);
	}
	for(var i=1, L=sindOrg.length; i<L; i++) {
		var ln = [];
		if(sindOrg[i][0] == 0) { ln.push(0); ln.push(sindOrg[i][1]); ln.push(0); ln.push(0); }
		else {
			ln.push(sindOrg[i][0]); ln.push( getFrom(simptOrg, sindOrg[i][0]) );
			ln.push(sindOrg[i][2]); ln.push(sindOrg[i][3]); ln.push( sindOrg[i][2] * getFrom( anchOrg, sindOrg[i][0]));
		}
		res.push(ln);
	}
	for(var i=1, L=res.length; i<L; i++) {
		if(res[i][0] == 0) {
			var sum = 0;
			for(var j = i+1; j<L && res[j][0] > 0; j++ ) {
				sum += res[j][4];
				if(res[j][3] && res[j][4] == 0) { sum = 0; break; }
			}
			GrandTotal.push([res[i][1],sum]);
			res[i][4] = sum; i=j-1;
		}
	}
	GrandTotal.sort(function(a, b){return b[1]-a[1]});
	GrandTotal.unshift([titlu,'Probabilitate']);

	var D = document.createElement('DIV'); var A = document.createElement('A');
	A.href = 'javascript:toggleDetails(0)'; A.innerText = '✎ report details'; A.className = 'repDetails';
	D.appendChild(intoTable(GrandTotal, indx));
	D.appendChild(A); A = intoTable(res, indx); A.style.display = 'none'; A.id = 'reportDetails';
	D.appendChild(A);
	var r = id('out'); if(r.hasChildNodes()) r.removeChild( r.firstChild ); r.appendChild(D);
	id('tableName').innerText = mTitlu;

} catch(e) { alert(e.message); }

}

function getFrom( arr, key) {
	for(var i=1, L=arr.length; i<L; i++) if(arr[i][0] == key) return arr[i][1];
	alert('Not found!'); return '- Unknow - ';
}

function toggleDetails(w) { if(w && w!=curTable) return; var x = id('reportDetails').style; x.display = (x.display == 'none')?'block':'none'; }

function intoTable(s, idx) {
	var t = document.createElement('TABLE'), h = document.createElement('THEAD'), b = document.createElement('TBODY'); t.className = 'TblAlt';

		var r = document.createElement('TR');
		for(var i=0, C=s[0], L=C.length; i<L; i++) { var c = document.createElement('TH'); c.innerText = C[i]; r.appendChild(c); }
		h.appendChild(r); t.appendChild(h);

	for(var i=1, L=s.length; i<L; i++) {
		var r = document.createElement('TR'); if(s[i][0]==0) { r.style.backgroundColor = '#bbbbee'; s[i][0] = '⚑';  s[i][2]=s[i][3]=''; }
			
		for(var y=0, C=s[i], LL=C.length; y<LL; y++) {
			var v = (C[y] === true)?'✔':(C[y] === false?' ':C[y]);
			var c = document.createElement('TD'); c.innerText = v;
			if(typeof(v)=='number') c.style.textAlign = 'right'; if(idx==2 && y==LL-1) c.innerText = v.toFixed(1);
			r.appendChild(c);
		}
		b.appendChild(r);
	}
	t.appendChild(b);
	return t;
}

function about() {
	var d = '<DIV style="font:normal 11pt Calibri,Arial; color:#448;padding:4px;">Aceasta aplicatie se bazeaza pe:<br><br><br>DSM–IV TR diagnostic criteria,<BR>American Psychiatric Association<br><br>';
	d += 'Schema simplificata a aplicatiei:<br>';
//	d += '<img style="margin-left:24px;" src="res/sead.svg" alt="SVG file is not supported by your browser"/><br>';
	d += '<img style="margin-left:0px;" src="res/sead1.png"/><br>';
	d += 'Autor:<BR>Diana Topa, membru al Asociatiei Criminaliste...';
	curTable = -4;
	id('out').innerHTML = d;
	id('tableName').innerText = 'Despre aceasta aplicatie';
}

function Save() {
    try {
      var msg = JSON.stringify( tables );
      var http = new XMLHttpRequest();
      http.open('POST', 'mng', false);
      http.send(msg);
      if(http.responseText == 'OK') { id('tipSave').className = 'saveOff'; Mng.isDirty = false; } else { alert(http.responseText); }
    } catch(e) { alert(e.message); return 'Error!'; }
}

var Mng = {

    cntxMenu: null, isDirty: false, curElem: null, insText: '???',
    oldValue: null, table: null, tableNum:0, sub: 'rgba(120,120,210,.5)',
    contextMenu: [
        { text: '✔ Insert Row Before', exe: function() { Mng.insRow(0); }},
        { text: '✔ Insert Row After', exe: function() { Mng.insRow(1); }},
        { text: '✘ Delete Row', exe: function() { Mng.delRow(); }},
        { text: '✔ Insert Col Left', exe: function() { Mng.insCol(0); }},
        { text: '✔ Insert Col Right', exe: function() { Mng.insCol(1); }},
        { text: '✘ Delete Column', exe: function() { Mng.delCol(); }},
        { text: 'Cancel', exe: null}],

    rClick: function( e ) {
        e.preventDefault(); if(e.target.tagName != 'TD') return;
        if(this.cntxMenu && this.cntxMenu.style.display != 'none') this.callOff();
        (this.curElem=e.target).style.backgroundColor = 'yellow';
        if(this.cntxMenu == null) this.createCntx();
        var m = this.cntxMenu.style; m.display = 'block'; var pos = this.getPos(this.curElem,this.cntxMenu);
        m.top = pos.y + 'px'; m.left = pos.x + 'px';
        document.addEventListener('click', this.callOff);
        return false;
    },
    
    callOff: function() {
        Mng.cntxMenu.style.display = 'none';
        document.removeEventListener("click");
        Mng.curElem.style.backgroundColor = '';
    },
    
    getPos: function( ob, cx ) {
        var dLeft = 30, pad = 15, crd = ob.getBoundingClientRect(), dH = cx.offsetHeight + pad, dW = cx.offsetWidth + pad, top = crd.bottom - pad, left = crd.left + dLeft;
        var scrW = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	    var scrH = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
	    
	    if(top + dH > scrH) top = crd.top - dH;
	    if(left + dW > scrW) left = scrW - dW;
	    return { "y": top, "x": left };
    },

    createCntx: function() {
        var u = document.createElement('ul');
        u.className = 'custom-menu';
        for (var i=0, C=this.contextMenu, L=C.length; i<L; i++) {
          var li = document.createElement('li');
          u.appendChild(li);
          li.innerHTML = C[i].text;
          li.addEventListener('click', C[i].exe);
        }
        document.body.appendChild(u);
        this.cntxMenu = u;
    },
    
    focus: function(ob) { this.oldValue = ob.innerText; },
    blur: function(ob) { if(ob.innerText != this.oldValue) {
        var v = ob.textContent.trim();
        ob.style.textAlign = isNum(v)?'right':'left'; ob.innerText = v;
        if(ob.cellIndex == 0) {
            var s = ob.parentElement.style;
            if(ob.innerText == 0 && s.backgroundColor != this.sub) s.backgroundColor = this.sub;
            else if(ob.innerText != 0 && s.backgroundColor) s.backgroundColor = null;
        }
        tables[this.tableNum].data[ob.parentElement.rowIndex][ob.cellIndex] = isNum(v)?(v*1):(v=='y'?true:(v=='n'?false:v));
		id('tipSave').className = 'saveOn'; this.isDirty = true;
        }
    },

    insRow: function(d) {
        var r = this.curElem.parentElement, t = r.parentElement.parentElement;
        var c, L = t.rows[0].cells.length, ix = r.rowIndex + d; if(ix==0) return;
        r = t.insertRow( ix );
        for(var i=0; i<L; i++) { c = r.insertCell(-1); c.innerText = this.insText; c.contentEditable = true;
        c.onfocus = function() { Mng.focus(this); }; c.onblur = function() { Mng.blur(this); }; }
        this.sync();
    },
    
    delRow: function() {
        var r = this.curElem.parentElement, t = r.parentElement.parentElement;
        if(r.rowIndex==0) return; t.deleteRow(r.rowIndex);
        this.sync();
    },
    
    insCol: function(d) {
        var c, cIx = this.curElem.cellIndex+d, rs =  this.curElem.parentElement.parentElement.parentElement.rows, L = rs.length;
        for(var i=0; i<L; i++) { c = rs[i].insertCell(cIx); c.innerText = this.insText; c.contentEditable = true;
        c.onfocus = function() { Mng.focus(this); }; c.onblur = function() { Mng.blur(this); }; }
        this.sync();
    },
    
    delCol: function() {
        var cIx = Mng.curElem.cellIndex, rs =  Mng.curElem.parentElement.parentElement.parentElement.rows, L = rs.length;
        for(var i=0; i<L; i++) rs[i].deleteCell(cIx);
        this.sync();
    },
    
    makeTable: function(x) {
        var A = tables[x].data; this.tableNum = x;
        var t = document.createElement('TABLE'), b = document.createElement('TBODY'); t.className = 'TblEdit';
        for(var i=0, L=A.length; i<L; i++) {
            var r = document.createElement('TR');
            for(var y=0, C=A[i], LL=C.length; y<LL; y++) {
                var v = (C[y] === true)?'y':(C[y] === false?'n':C[y]);
                var c = document.createElement('TD'); c.innerText = v; c.contentEditable = true;
                c.onfocus = function() { Mng.focus(this); }; c.onblur = function() { Mng.blur(this); }; 
                if(isNum(v)) c.style.textAlign = 'right';
                r.appendChild(c);
            }
            if(r.cells[0].innerText == 0) r.style.backgroundColor = this.sub;
            b.appendChild(r);
        }
        t.appendChild(b);
        t.oncontextmenu = function(e) { Mng.rClick(e); };
        var D = document.createElement('DIV'); D.contentEditable = true; D.className = 'TtlEdit'; D.innerText = tables[this.tableNum].name;
        D.onblur = function() { Mng.titleEdit(this, false); }; D.focus = function() { Mng.titleEdit(this, true); };
        var Dret = document.createElement('DIV'); Dret.appendChild(D); Dret.appendChild(t);
        D = id('out'); if(D.hasChildNodes()) D.removeChild( D.firstChild ); D.appendChild(Dret);
        this.table = t; id('tableName').innerText = tables[this.tableNum].name;
    },
    
    sync: function() {
        var res = [], rs = this.table.rows, L = rs.length;
        for(var i=0; i<L; i++) {
            var u = [], r = rs[i], cls = r.cells, LL = cls.length, v;
            for(var j=0; j<LL; j++) u.push( isNum(v = cls[j].innerText)?(v*1):(v=='y'?true:(v=='n'?false:v)) );
            res.push(u);
        }
        tables[this.tableNum].data = res;
        id('tipSave').className = 'saveOn'; this.isDirty = true;
    },
    
    titleEdit: function(ob, fl) {
    	if(fl) { ob.setAttribute('oldValue',ob.innerText); return; }
    	if(ob.getAttribute('oldValue') == ob.innerText) return;
    	tables[this.tableNum].name = ob.textContent.trim();
    	id('tipSave').className = 'saveOn'; this.isDirty = true;
    },
    
    extractData: function() { alert( JSON.stringify(tables[this.tableNum]) ); }
};
function isNum(x) { return !isNaN(parseFloat(x)) && isFinite(x); }