const observer = new IntersectionObserver(entries => {
		for(let entry of entries)
			entry.target.classList.toggle('aShow', entry.isIntersecting);
  },{ threshold: .5 });
  
  document.querySelectorAll('.aHide').forEach(h => observer.observe(h));