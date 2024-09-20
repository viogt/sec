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