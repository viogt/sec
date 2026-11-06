const editorElement = document.querySelector('#editor');
var isModified = false;

document.querySelectorAll('[data-command]').forEach(button => {
      button.addEventListener('mousedown', event => event.preventDefault());
      button.addEventListener('click', () => {
        const command = button.dataset.command;
        editorElement.focus();
        document.execCommand(command, false, null);
      });
});

document.querySelectorAll('[data-sel]').forEach(button => {
      //button.addEventListener('mousedown', event => event.preventDefault());
      button.addEventListener('click', () => {
        const sel = button.dataset.sel;
        if(sel === 'UpperCase' || sel === 'LowerCase') {
          const selection = window.getSelection();
          if (!selection.isCollapsed) {
            const selectedText = selection.toString();
            const transformedText = sel === 'UpperCase' ? selectedText.toUpperCase() : selectedText.toLowerCase();
            document.execCommand('insertText', false, transformedText);
          }
        } else {
          editorElement.focus();
          document.execCommand('formatBlock', false, sel);
        }
      });
});

document.querySelector('#printPdf').addEventListener('click', () => {
  window.print();
});

document.querySelector('#docNameInput').addEventListener('change', (event) => {
  const newName = event.target.value.trim();
  document.documentElement.style.setProperty('--doc-name', `"${newName}"`);
});

document.querySelector('#titlu').addEventListener('click', () => {
  const t = `<table>
    <tr>
        <td style="border-right: .8px solid #000; padding-bottom: .6em; vertical-align: bottom;"><H1>REQUEST</H1></td>
        <td style="padding: 0 0 .6em 1em; width: 1%; white-space: nowrap;">${getAddress('to')}</td>
    </tr>
    <tr>
        <td colspan="2" style="border: .8px solid #000; padding: .6em 0; text-align: center;">The description of the subject-matter<br>to be brought to the attention.</td>
    </tr>
  </table><br>`;
  editorElement.focus();
  document.execCommand('insertHTML', false, t);
});

document.querySelector('#clearAll').addEventListener('click', () => {
  editorElement.innerHTML = `<p>${editorElement.textContent}</p>`;
});

function makeRemark(mod) {
  let svg;
  switch(mod) {
    case 'quote':
      svg = '<svg xmlns="http://www.w3.org/2000/svg" width="24" fill="currentColor" viewBox="0 0 24 24"><path d="M14 21v-7q1-9 9-11l1 2q-4 2-4 6h4v10zM0 21v-7Q1 5 9 3l1 2q-4 2-4 6h4v10z"/></svg>';
      break;
    case 'note':
      svg = '<svg xmlns="http://www.w3.org/2000/svg" width="28" fill="currentColor" viewBox="0 -960 960 960"><path d="M200-120q-33 0-56-23t-24-57v-560q0-33 24-56t56-24h357l-80 80H200v560h560v-278l80-80v358q0 33-23 57t-57 23zm160-240v-170l367-367q12-12 27-18t30-6q16 0 31 6t26 18l56 57q11 12 17 27t6 29-5 30-18 26L530-360zm481-424-56-56zM440-440h56l232-232-28-28-29-28-231 231zm260-260-29-28zl28 28z"/></svg>';
      break;
    case 'warning':
      svg = '<svg xmlns="http://www.w3.org/2000/svg" width="28" fill="currentColor" viewBox="0 -960 960 960"><path d="M509-291q11-12 11-29t-11-28-29-12-28 12-12 28 12 29 28 11 29-11m-69-149h80v-240h-80zm40 360q-83 0-156-31t-127-86-85-127-32-156 32-156 85-127 127-85 156-32 156 32 127 85 86 127 31 156-31 156-86 127-127 86-156 31m0-80q134 0 227-93t93-227-93-227-227-93-227 93-93 227 93 227 227 93m0-320"/></svg>';
      break;
    case 'bulb':
      svg = '<svg xmlns="http://www.w3.org/2000/svg" width="28" fill="currentColor" viewBox="0 -960 960 960"><path d="M480-80q-26 0-47-12t-33-34q-33 0-56-23t-24-57v-142q-59-39-94-103t-36-139q0-121 85-205t205-85 206 85 84 205q0 77-35 140t-95 102v142q0 33-23 57t-57 23q-12 21-33 34t-47 12m-80-126h160v-36H400zm0-76h160v-38H400zm-8-118h58v-108l-88-88 42-42 76 76 76-76 42 42-88 88v108h58q54-26 88-76t34-114q0-88-61-149t-149-61-149 61-61 149q0 63 34 114t88 76m88-200"/></svg>';
      break;
    case 'decision':
      svg = '<svg xmlns="http://www.w3.org/2000/svg" width="28" fill="currentColor" viewBox="0 -960 960 960"><path d="M160-120v-80h480v80zm226-194L160-540l84-86 228 226zm254-254L414-796l86-84 226 226zm184 408L302-682l56-56 522 522z"/></svg>';
      break;
    case 'attach':
      svg = '<svg xmlns="http://www.w3.org/2000/svg" width="28" fill="currentColor" viewBox="0 -960 960 960"><path d="M720-330q0 104-73 177T470-80t-177-73-73-177v-370q0-75 53-127t127-53 128 53 52 127v350q0 46-32 78t-78 32-78-32-32-78v-370h80v370q0 13 9 22t21 8 22-8 8-22v-350q-1-42-29-71t-71-29-71 29-29 71v370q-1 71 49 121t121 49q70 0 119-49t51-121v-390h80z"/></svg>';
      break;
    default: svg = '>';
  }
  const selection = window.getSelection();
  const sel = selection.isCollapsed ? '...' : selection.toString();
  const t = `<table><tr>
      <td style="border-right: .8px solid #000; width: 40px;">${svg}</td>
      <td style="padding-left: 1em;">${sel}</td></tr></table><br>`;
  editorElement.focus();
  document.execCommand('insertHTML', false, t);
}

document.querySelectorAll('[data-remark]').forEach(button => {
  button.addEventListener('click', () => {
      makeRemark(button.dataset.remark);
  });
});
document.querySelector('#twoPanels').addEventListener('click', () => {
  const t = `<table><tr>
      <td style="border-right: .8px solid #000; padding-right: 1em; width: 50%;">First panel.</td>
      <td style="padding-left: 1em;">Second panel.</td></tr></table><br>`;
  editorElement.focus();
  document.execCommand('insertHTML', false, t);
});
document.querySelector('#horizontalRule').addEventListener('click', () => {
  editorElement.focus();
  document.execCommand('insertHTML', false, '<br><div class="hRule"></div><br>');
});
document.querySelector('#nbsp').addEventListener('click', () => {
  editorElement.focus();
  document.execCommand('insertHTML', false, '&nbsp;');
});
document.querySelector('#endash').addEventListener('click', () => {
  //editorElement.innerHTML = editorElement.innerHTML.replace(/--/g, '&ndash;');
  editorElement.focus();
  document.execCommand('insertHTML', false, '&ndash;');
});
document.querySelector('#sect').addEventListener('click', () => {
  editorElement.focus();
  document.execCommand('insertHTML', false, '&sect;');
});
document.querySelector('#chenar').addEventListener('click', () => {
  const selection = window.getSelection();
  if (!selection.isCollapsed) {
    const selectedText = selection.toString();
    const framedText = `<b class="chenar">${selectedText}</b>`;
    editorElement.focus();
    document.execCommand('insertHTML', false, framedText);
  }
});
document.querySelector('#footerLang').addEventListener('click', (event) => {
  const el = event.target;
  if (el.textContent === 'RO') {
    document.documentElement.style.setProperty('--page-text', '"Page"');
    document.documentElement.style.setProperty('--of-text', '"of"');
    el.textContent = 'EN';
  } else {
    document.documentElement.style.setProperty('--page-text', '"Pag."');
    document.documentElement.style.setProperty('--of-text', '"din"');
    el.textContent = 'RO';
  }
});
document.querySelector('#tblList').addEventListener('click', () => {
  const inp = prompt('Enter rows and type 1/A (e.g., 3 1', '3 1');
  if (inp && inp.trim() !== '') {
    const parts = inp.trim().split(' ');
    if (parts.length < 1 || parts.length > 2) return;
    const rows = parseInt(parts[0], 10);
    const tip = parts[1];
    if (isNaN(rows) || (tip != '1' && tip != 'A')) return;
    const Flag = (tip == '1');
    let tableHTML = '<table>';
    for (let r = 0; r < rows; r++) {
      const svg = `<svg xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)" width="32" viewBox="0 0 32 32">
<circle cx="16" cy="16" r="15" fill="none" stroke-width="1" stroke="#000"/>
<text x="16" y="16" text-anchor="middle" dominant-baseline="central" font-size="18" fill="#000">${ Flag ? r+1 : String.fromCharCode(r + 65) }</text>
</svg>`;
      tableHTML += `<tr><td style="width: 40px;">${svg}</td><td style="padding-bottom: .8em;">Item ${r+1}</td></tr>`;
    }
    editorElement.focus();
    document.execCommand('insertHTML', false, tableHTML + '</table><br>');
  }
});
document.querySelector('#signature').addEventListener('click', () => {
  const inp = prompt('How many signatories? (1-3)', '2');
  if (inp && inp.trim() !== '') {
    let x = parseInt(inp, 10);
    if (isNaN(x) || x < 1 || x > 3) return;

    const fr = x < 3 ? '40%' : '30%';
    let t = '<div style="display:flex;justify-content:space-between;line-height: 1.1;">';
    for(let i = 0; i < x; i++)
      t += `<div style="width:${fr}; border-top: .8px solid #000; padding-top: .2em;">Signatory,<br>position</div>`;
    editorElement.focus();
    document.execCommand('insertHTML', false, t + '</div>');
  }
});
document.querySelector('#address').addEventListener('click', () => {
  const t = `<table><tr>
        <td>${getAddress('from')}</td>
        <td style="width: 1%;  white-space: nowrap;">${getAddress('to')}</td>
    </tr></table><br>Datum: ${getAddress('date')}<br><br>`;
  editorElement.focus();
  document.execCommand('insertHTML', false, t);
});
document.querySelector('#inlineIcon').addEventListener('click', () => {
  const inp = prompt('Icon name: ink_pen, check_circle, search, etc. +2', 'ink_pen');
  if (inp && inp.trim() !== '') {
    const parts = inp.split(' ');
    if(parts.length < 2) {
      editorElement.focus();
      document.execCommand('insertHTML', false, `<span class="material-symbols-outlined" style="font-size: 1em;">${inp}</span> `);
      return;
    }
    let x = parseInt(parts[1], 10); if(isNaN(x)) return;
    editorElement.focus();
    document.execCommand('insertHTML', false, `<span class="material-symbols-outlined" style="font-size: ${x}lh; line-height:1; float: left; margin-right: 10px;">${parts[0]}</span><p></p>`);
  }
});
document.querySelector('#createLink').addEventListener('click', () => {
  const selection = window.getSelection();
  if (!selection.isCollapsed) {
    const inp = prompt('Enter the link address (URL like https://...)', selection.toString());
    if (inp && inp.trim() !== '') {
      document.execCommand('insertHTML', false, `<a href="$inp" style="font-size: 1em;">${selection.toString()}</a>`);
    }         
  }
});

function renumber(tbl) {
  let iCnt = 1;
  for (const r of tbl.rows) {
    r.cells[0].innerHTML = r.cells[0].innerHTML.replace(/>(.)<\/text>/, (match, cnt) => {
      return `>${ isNaN(cnt) ? String.fromCharCode(iCnt + 64) : iCnt }</text>`;
    });
    iCnt++;
  }
}

function getCurrentElement() {
  const selection = window.getSelection();
  if (selection.rangeCount > 0) {
    const anchorNode = selection.anchorNode;
    return anchorNode.nodeType === Node.TEXT_NODE ? anchorNode.parentElement : anchorNode;
  }
  return null;
}

document.querySelector('#insertTable').addEventListener('click', () => {
  let elm = getCurrentElement();
  if(!elm) return;
  elm = elm.closest('tr,#editor');  
  if(elm.tagName == 'TR') {
    
    let T = elm.closest('table');
    const inp = prompt('Choose: delete | insert before | insert after | delete table', 'insert after');
    if (!inp || inp.trim() == '') return;
    const clone = elm.cloneNode(true);
    if(inp == 'insert before') elm.before(clone);
    else if(inp == 'insert after') elm.after(clone);
    else if(inp == 'delete table') { T.remove(); return; }
    else if(inp == 'delete') { if(T.rows.length < 2) { T.remove(); return; } elm.remove(T); }
    else return;
    if(elm.cells[0].firstChild.tagName == 'svg') renumber(T);
    return;
  }

  const selection = window.getSelection();

  const inp = prompt('Ener "one", "ROWS list (+brd)", "square",\nor ROWS and colulms width (ex: 4 10% 60% 30%)', '4 10% 60% 30%');
  if (!inp || inp.trim() == '') return;
  if(inp == 'one') {
    editorElement.focus();
    document.execCommand('insertHTML', false, `<p style="border: .8px solid #000; border-radius:6px;padding: 1em;">${selection.isCollapsed ? '...' : selection.toString()}</p><br>`);
    return;
  }
  if(inp == 'square') {
    const t = `<br><div style="display:grid;grid-template-columns: 1em auto 1em;">
      <div style="border: .8px solid #000; border-right:none; border-radius: 6px 0 0 6px;"></div>
      <p style="padding: .6em 0;">${selection.isCollapsed ? '...' : selection.toString()}</p>
      <div style="border: .8px solid #000; border-left:none; border-radius:0 6px 6px 0;"></div></div><br><br>`;
    editorElement.focus();
    document.execCommand('insertHTML', false, t);
    return;
  }
  const parts = inp.split(' '), L = parts.length, rows = parseInt(parts[0]);
  let T = '<table>';
  if(L < 2) return;
  if(parts[1] == 'list') {
    const brd = L > 2 ? true : false;
    for(let r = 0; r < rows; r++) {
        T += `<tr><td style="width:2em;${ brd ? 'padding:0 1em 1em 0;border-right:.8px solid #000;' : 'padding:0 1em 1em 0;' }">&ndash;</td><td style="width:100%;padding:${brd ? '0 0 1em 1em':'0 0 1em 0'};">...</td></tr>`;
    }
    editorElement.focus();
    document.execCommand('insertHTML', false, T + '</table><br>');
    return;
  }

  for(let r = 0; r < rows; r++) {
    T += '<tr>';
    for(let c = 1; c < L; c++) {
      T += `<td style="width:${parts[c]};padding:${ (c < L-1) ? '0 1em 1em 0' : '0 0 1em 0' }">...</td>`;
    }
    T += '</tr>';
  }
  editorElement.focus();
  document.execCommand('insertHTML', false, T + '</table><br>');
});

document.querySelector('#ribbon').addEventListener('click', () => {
  const selection = window.getSelection();
  if (selection.isCollapsed) return;
const t = `<div style="text-align:center;">
<svg xmlns="http://www.w3.org/2000/svg" width="340" viewBox="0 140 720 170">
<g stroke="#000" stroke-width="2" fill="none">
  <path d="m155 276-55-19M619 193l100 22-45 37 35 53-144-29 3-26m-3 26 54-19"/>
  <path d="M152 249c173-22 284-19 467 8v-91c-204-31-318-31-519 0v27m52 56-52 8v-64m52 56 3 27-145 29 35-54-44-36 99-22"/>
</g>
<text fill="black" font-size="28" dominant-baseline="middle">
<textPath path="M100 218 q260 -50 520 0" startOffset="50%" text-anchor="middle" textLength="450" lengthAdjust="spacingAndGlyphs">
${selection.toString().toUpperCase()}</textPath></text>
</svg></div>`;
    editorElement.focus();
    document.execCommand('insertHTML', false, t);
});

document.querySelector('#fineprint').addEventListener('click', () => {
  const selection = window.getSelection();
  editorElement.focus();
  document.execCommand('insertHTML', false, `<p class="fineprint">${selection.isCollapsed ? '...' : selection.toString()}</p>`);
});
/* ------------- Insert Image --------------- */
function getRadioValue(nm) {
    const opts = document.querySelectorAll(nm);
    for(let el of opts) if(el.checked) return el.value;
    return null;
}
document.querySelector('#uploadFile').addEventListener('click', () => {
  document.querySelector('.modal-overlay').hidden = false;
});
document.querySelector('#tableModalCancel').addEventListener('click', () => {
  document.querySelector('.modal-overlay').hidden = true;
});
document.querySelector('#tableModalInsert').addEventListener('click', () => {
    const elm = getCurrentElement();
    if(!elm || elm.tagName != 'P') {
      document.querySelector('.modal-overlay').hidden = true;
      return;
    }
    const srcImg = document.querySelector('#previewImage');
    if(srcImg.src == '') return;

    const img_width = getRadioValue('input[name="image_width"]');
    const img_align = getRadioValue('input[name="image_align"]');
    const img_filter = getRadioValue('input[name="image_filter"]');
/* -- by HTML -- */
    let algn = img_width == 'lines' ? `height:${document.getElementById('byLines').value}lh; width:auto;` : `width:${img_width};`;
    const shdw = document.querySelector('#image_shadow').checked;
    if(img_filter != 'normal' || shdw)
      algn += `filter:${img_filter != 'normal' ? img_filter : ''}${shdw?' drop-shadow(0px 2px 3px #666)':''};`;
    if(img_align == 'left') algn += 'margin-right:.8em; float:left;';
    else if(img_align == 'right') algn += 'margin-left:.8em; float:right;';
    else algn += 'margin:0;';
    if(document.querySelector('#image_border').checked) algn += 'border:.5px solid #888;';
    if(document.querySelector('#image_radius').checked) algn += 'border-radius:.6em;';

    editorElement.focus();
    document.execCommand('insertHTML', false, `<img src="${srcImg.src}" style="${algn}"/>`);
    document.querySelector('.modal-overlay').hidden = true;
});

document.querySelector('#fileInput').addEventListener('change', (event) => {
  const file = event.target.files[0];
  if(!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    base64File = e.target.result;
    const prev = document.querySelector('#previewImage');
    prev.src = base64File;
  };
  reader.readAsDataURL(file);
});
/*=============================== TAKE INTO THE CLIPBOARD ===================*/
document.querySelector('#takeClipboard').addEventListener('click', async (event) => {
  navigator.clipboard.writeText(editorElement.innerHTML)
  .then((result) => { event.target.style.color = '#0c0'; })
  .catch((error) => { event.target.style.color = '#c00'; })
  .finally(() => { setTimeout(() => { event.target.style.color = ''; }, 600); });
});
/*=============================== ALERT ON LEAVE ===================*/
window.addEventListener('beforeunload', (event) => {
    if(!isModified) return;
    event.preventDefault();
    event.returnValue = '';
});

function getAddress(flag) {
  if(flag == 'date') {
    const now = new Date();
    return `${('0' + now.getDate()).slice(-2)}.${('0' + (now.getMonth() + 1)).slice(-2)}.${now.getFullYear()}`;
  }
  return `${flag == 'from' ? '[Absender]<br>Abs.:' : '[Empfänger]<br>An:'} Vorname Nachname<br>Goethestraße 42<br>60313 Frankfurt am Main<br>Germany`;
}

editor.addEventListener('input', () => { isModified = true; });
editorElement.focus();

//================================== F O N T S ==========================================
const fonts = {
  rob: {
    href: "https://fonts.googleapis.com/css2?family=Roboto+Condensed:ital,wght@0,100..900;1,100..900&family=Roboto+Serif:ital,opsz,wght@0,8..144,100..900;1,8..144,100..900&family=Roboto:ital,wght@0,100..900;1,100..900&display=swap",
    sans: "Roboto, sans-serif",
    serif: "'Roboto Serif', serif",
    heading: "'Roboto Condensed', sans-serif"
  },
  opn: {
    href: "https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&family=Oswald:wght@200..700&display=swap",
    sans: "'Open Sans', sans-serif",
    serif: "Open Sans, serif",
    heading: "'Oswald', sans-serif"
  },
  ale: {
    href: "https://fonts.googleapis.com/css2?family=Alegreya+Sans:ital,wght@0,100;0,300;0,400;0,500;0,700;0,800;0,900;1,100;1,300;1,400;1,500;1,700;1,800;1,900&family=Alegreya:ital,wght@0,400..900;1,400..900&family=Bebas+Neue&display=swap",
    sans: "'Alegreya Sans', sans-serif",
    serif: "Alegreya, serif",
    heading: "'Bebas Neue', sans-serif"
  },
  ars: {
    href: "https://fonts.googleapis.com/css2?family=Arsenal:ital,wght@0,400;0,700;1,400;1,700&family=Merriweather:ital,opsz,wght@0,18..144,300..900;1,18..144,300..900&display=swap",
    sans: "Arsenal, sans-serif",
    serif: "Merriweather, serif",
    heading: "Arsenal, sans-serif"
  },
  pts: {
    href: "https://fonts.googleapis.com/css2?family=Cabin+Condensed:wght@400;500;600;700&family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&family=PT+Serif:ital,wght@0,400;0,700;1,400;1,700&display=swap",
    sans: "'PT Sans', sans-serif",
    serif: "'PT Serif', serif",
    heading: "'Cabin Condensed', sans-serif"
  },
  src: {
    href: "https://fonts.googleapis.com/css2?family=Source+Sans+3:ital,wght@0,200..900;1,200..900&family=Source+Serif+4:ital,opsz,wght@0,8..60,200..900;1,8..60,200..900&display=swap",
    sans: "'Source Sans 3', sans-serif",
    serif: "'Source Serif 4', serif",
    heading: "'Source Sans 3', sans-serif"
  },
  none: {
    href: "",
    sans: "sans-serif",
    serif: "serif",
    heading: "sans-serif"
  }
};

document.querySelector('#changeFont').addEventListener('click', () => {
  document.getElementById('selectFontsDlg').showModal()
});

function selectFont(btn) {
    const font = getRadioValue('input[name="font_select"]');
    const type = getRadioValue('input[name="font_type"]');

    document.getElementById('curFonts').href = fonts[font].href;
    document.documentElement.style.setProperty('--font-fam', fonts[font][type]);
    document.documentElement.style.setProperty('--font-famH', fonts[font].heading);
    document.documentElement.style.setProperty('--font-size', document.getElementById('fSize').value + 'px');

    btn.closest('dialog').close();
}