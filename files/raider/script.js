const observer = new IntersectionObserver(entries => {
		for(let entry of entries)
			entry.target.classList.toggle('aShow', entry.isIntersecting);
  },{ threshold: .5 });
  
  document.querySelectorAll('.aHide').forEach(h => observer.observe(h));
  
function showContent(obj) {
  let el = obj.nextElementSibling.style;
  if(el.display=='block') {
    el.display = 'none';
    obj.innerText='Show the table of contents';
  } else {
    el.display = 'block';
    obj.innerText = 'Hide the table of contents';
  }
}

function handleFx() {
  const el = event.target.id;
  if(el == 'inceput') document.documentElement.scrollTop = 0;
  else if(el == 'sfarsit') document.documentElement.scrollTop = document.documentElement.scrollHeight;
  else window.location.href = "https://mda-today.blogspot.com/2018/03/brief-note-on-raider-attacks.html";
}

function createPanel() {
  const d = document.createElement('div'),
      a1 = document.createElement('a'),
      a2 = document.createElement('a'),
      a3 = document.createElement('a');
  d.className = "fx_div";
  a1.id = "inceput"; a3.id = "sfarsit";
  a1.className = "fx"; a1.innerText = '⇱';
  a2.className = "fx"; a2.innerText = '☰';
  a3.className = "fx"; a3.innerText = '⇲';
  a1.addEventListener("click", handleFx); d.appendChild(a1);
  a2.addEventListener("click", handleFx); d.appendChild(a2);
  a3.addEventListener("click", handleFx); d.appendChild(a3);
  document.body.appendChild(d);
}

setTimeout(createPanel, 500);

var tmOut, cnt = false;

function moveMap(el) {
  tmOut = setTimeout(()=>{
    if(cnt) { cnt = false; return; }
    el.querySelector('.magnMap').classList.toggle('magnMapUp');
    el.querySelector('.txtMap').classList.toggle('txtMapUp');
  }, 250);
}

function enlargeMap(el) {
  clearTimeout(tmOut);
  cnt = true;
  let sgn = el.querySelector('.setButn');
  if(el.style.width != '100%') {
    el.style.width = '100%';
    sgn.innerText = '-';
  }
  else {
    el.style.width = '40%';
    sgn.innerText = '+';
  }
}
