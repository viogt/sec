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

document.getElementById('printPdf').addEventListener('click', () => {
  printDocument();
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

document.querySelector('#address').addEventListener('click', () => {
  const t = `<table><tr>
        <td>${getAddress('from')}</td>
        <td style="width: 1%;  white-space: nowrap;">${getAddress('to')}</td>
    </tr></table><br>Datum: ${getAddress('date')}<br><br>`;
  editorElement.focus();
  document.execCommand('insertHTML', false, t);
});
document.querySelector('#inlineIcon').addEventListener('click', async () => {
  const inp = await showPrompt('Ex: ink_pen, check_circle, search, etc.<br>or ex: ink_pen 3 (lines height)<br>or SVG or HTML code:<br>', 'ink_pen');
  if(!inp || inp.trim() == '') return;
  if(inp.charAt(0) == '<') {
    editorElement.focus();
    document.execCommand('insertHTML', false, inp);
    return;
  }
  const parts = inp.split(' ');
  if(parts.length < 2) {
      editorElement.focus();
      document.execCommand('insertHTML', false, `<span class="material-symbols-outlined" style="font-size: 1em;">${inp}</span> `);
      return;
  }
  let x = parseInt(parts[1], 10); if(isNaN(x)) return;
  editorElement.focus();
  document.execCommand('insertHTML', false, `<span class="material-symbols-outlined" style="font-size: ${x}lh; line-height:1; float: left; margin-right: 10px;">${parts[0]}</span><p></p>`);
});
document.querySelector('#createLink').addEventListener('click', async () => {
  const selection = window.getSelection();
  if (!selection.isCollapsed) {
    const inp = await showPrompt('Enter the link address (URL like https://...)', selection.toString());
    if (inp && inp.trim() !== '') {
      document.execCommand('insertHTML', false, `<a href="$inp" style="font-size: 1em;">${selection.toString()}</a>`);
    }         
  }
});

function getCurrentElement() {
  const selection = window.getSelection();
  if (selection.rangeCount > 0) {
    const anchorNode = selection.anchorNode;
    return anchorNode.nodeType === Node.TEXT_NODE ? anchorNode.parentElement : anchorNode;
  }
  return null;
}

var tableElement;
document.getElementById('insertTable') .addEventListener('click', () => {
  tableElement = getCurrentElement();
  if(!tableElement) return;
  saveSelection();
  tableElement = tableElement.closest('tr,#editor');
  if(tableElement.tagName == 'TR') document.getElementById('modifyTable').showModal();
  else document.getElementById('insertTableDlg').showModal();
});

function reNum(tbl) {
  if(!tbl.hasAttribute('renewable')) return;
  const rgx = />(.)<\/div>/;
  const lttr = tbl.rows[0].cells[0].innerHTML.match(rgx);
  let tip = -1;
  if(lttr) tip = lttr[0].charCodeAt(1); else { console.log('Letter ERROR'); return; }
  if(tip >= 48 && tip <= 57) tip = 0;
  else if(tip >= 65 && tip <= 90) tip = 1;
  else if(tip >= 97 && tip <= 122) tip = 2;
  if(tip == -1) { console.log('LETTER ERROR'); return; }
  let iCnt = 0;
  for (const r of tbl.rows) {
    let clc = (tip == 0) ? (iCnt+1) : String.fromCharCode(iCnt + ((tip == 1) ? 65 : 97));
    r.cells[0].innerHTML = r.cells[0].innerHTML.replace(rgx, (match, cnt) => {
      return `>${clc}</div>`;
    });
    iCnt++;
  }
}

function makeBrd(Tbl, flag) {
  const rs = Tbl.rows.length, cs = Tbl.rows[0].cells.length;
  let st, ln = flag ? 'border-top: .8px solid #000;' : '';
  for(let i = 0; i < rs; i++) {
    for(let c = 0; c < cs; c++) {
      let t = '.5em', r = t, b = t, l = t;
      let brd = ln;
      if(c == 0) l=0; else if(c == cs-1) r=0;
      if(i == 0) { brd=''; t=0; }
      else if(i == rs-1) b=0;
      st = Tbl.rows[i].cells[c].style;
      st.cssText = `width: ${st.width}; padding: ${t} ${r} ${b} ${l}; ${brd}`;
    }
  }
}

function modTable(elm, flag) {
  closeDlg(elm);
  const T = tableElement.closest('table'), par = tableElement.parentNode;
  const clone = tableElement.cloneNode(true);
  switch(flag) {
    case 0: tableElement.before(clone); reNum(T); return;
    case 1: tableElement.after(clone); reNum(T); return;
    case 2: if(T.rows.length < 2) T.remove(); else { tableElement.remove(); reNum(T); } return;
    case 3: T.remove(); return;
    case 4: makeBrd(T, true); return;
    case 5: makeBrd(T, false); return;
    case 6: const prevRow = tableElement.previousElementSibling;
            if(prevRow) { par.insertBefore(tableElement, prevRow); reNum(T); } return;
    case 7: const nextRow = tableElement.nextElementSibling;
    if(nextRow) { par.insertBefore(tableElement, nextRow.nextElementSibling); reNum(T); } return;
  }
}

function closeDlg(el) {
  el.closest('dialog').close();
  //editorElement.focus();
}

document.getElementById('tableModalInsert').addEventListener('click', (e) => {
  const T = tableElement.closest('table');
  const sel = savedRange.toString();
  const val = document.querySelector('dialog input[name="tbl_opt"]:checked').value;

  if(val == 'one') {
    closeDlg(e.target);
    restoreSelection();
    editorElement.focus();
    document.execCommand('insertHTML', false, `<br><p style="border: .8px solid #000; border-radius:6px;padding: 1em;">${sel ? sel : '...'}</p><br>`);
    return;
  }
  if(val == 'square') {
    closeDlg(e.target);
    restoreSelection();
    const t = `<br><div style="display:grid;grid-template-columns: 1em auto 1em;">
      <div style="border: .8px solid #000; border-right:none; border-radius: 6px 0 0 6px;"></div>
      <p style="padding: .6em 0;">${sel ? sel : '...'}</p>
      <div style="border: .8px solid #000; border-left:none; border-radius:0 6px 6px 0;"></div></div><br><br>`;
    editorElement.focus();
    document.execCommand('insertHTML', false, t);
    return;
  }
  if(val.startsWith('listDash')) {
    closeDlg(e.target);
    restoreSelection();
    const rows = document.getElementById('tableRows').value;
    const brd = (val == 'listDash') ? true : false;
    let t = '<table>';
    for(let r = 0; r < rows; r++) {
        t += `<tr><td style="width:2em;${ brd ? 'padding:0 1em 1em 0;border-right:.8px solid #000;' : 'padding:0 1em 1em 0;' }">&ndash;</td><td style="width:100%;padding:${brd ? '0 0 1em 1em':'0 0 1em 0'};">...</td></tr>`;
    }
    editorElement.focus();
    document.execCommand('insertHTML', false, t + '</table><br>');
    return;
  }

  if(val == 'table') {
    closeDlg(e.target);
    restoreSelection();
    const rows = document.getElementById('tableRows').value;
    const parts = document.getElementById('tableCols').value.split(' '), L = parts.length;
    let t = '<table>';
    for(let r = 0; r < rows; r++) {
      t += '<tr>';
      let btm1 = '0 1em 1em 0', btm2 = '0 0 1em 0';
      if(r == rows-1) { btm1 = '0 1em 0 0'; btm2 = '0 0 0 0'; }
      for(let c = 0; c < L; c++) {
        t += `<td style="width:${parts[c]};padding:${ (c < L-1) ? btm1 : btm2 }">...</td>`;
      }
      t += '</tr>';
    }
    editorElement.focus();
    document.execCommand('insertHTML', false, t + '</table><br>');
    return;
  }

  if(val.startsWith('list_')) {
    closeDlg(e.target);
    restoreSelection();
    const rows = document.getElementById('tableRows').value;
    
    const lttr = document.querySelector('dialog input[name="list_lttr"]:checked').value;
    let lt, btm = ' style="padding-bottom: .8em;"', t = '<table renewable>';
    for (let r = 0; r < rows; r++) {

      if(r == rows-1) btm = '';
      if(lttr == '1') lt = (r+1).toString();
      else if(lttr == 'A') lt = String.fromCharCode(r + 65);
      else lt = String.fromCharCode(r + 97);

      if(val == 'list_1') t += `<tr><td style="width: 40px;">
        <div style="display:inline-block;text-align:center;line-height:2em;width:2em;height:2em;border:.8px solid #000;border-radius:50%;">${lt}</div>
        </td><td${btm}>...</td></tr>`;
      else if(val == 'list_A') t += `<tr><td style="width: 40px;">
        <div style="display:inline-block; height:2em; width:2em; line-height:2em; padding-left:.5em; border: .8px solid #000; border-top-right-radius: 50%; border-bottom-right-radius: 50%;">${lt}</div>
        </td><td${btm}>...</td></tr>`;
      else if(val == 'list_s') t += `<tr><td style="width: 40px;">
        <div style="display:inline-block;height:30px;aspect-ratio:1;padding:4px 8px;border-top:.8px solid #000;border-left:.8px solid #000;">${lt}</div>
        </td><td${btm}>...</td></tr>`;
      else t += `<tr><td style="width: 40px;">
        <div style="display:inline-block;width:1.4em;aspect-ratio:1;padding: 0 6px 6px 0;border-right: .8px solid #000;border-bottom: .8px solid #000;border-bottom-right-radius: 60%;">${lt}</div>
        </td><td${btm}>...</td></tr>`;
    }
    editorElement.focus();
    document.execCommand('insertHTML', false, t + '</table><br>');
    return;
  }

  if(val.startsWith('twoPanel')) {
    closeDlg(e.target);
    restoreSelection();
    const rows = document.getElementById('tableRows').value;
    const flg = (val == 'twoPanel');
    let t = '<table>';
    for (let r = 0; r < rows; r++) {
      t += `<tr><td style="${flg ? 'border-right: .8px solid #000;' : ''}padding: ${r==0?'0':'1em'} .6em 0 0; width: 50%;">...</td>
        <td style="padding: ${r==0?'0':'1em'} 0 0 .6em;">...</td></tr>`;
    }
    editorElement.focus();
    document.execCommand('insertHTML', false, t + '</table><br>');
    return;
  }
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

document.querySelector('#uploadFile').addEventListener('click', () => {
  saveSelection();
  document.getElementById('insertImageDlg').showModal();
});

document.getElementById('imageModalInsert').addEventListener('click', (e) => {
    const elm = getCurrentElement();
    /*if(!elm || elm.tagName != 'P') {
      document.querySelector('.modal-overlay').hidden = true;
      return;
    }*/
    const srcImg = document.querySelector('#previewImage');
    if(srcImg.src == '') return;

    const img_width = document.querySelector('dialog input[name="image_width"]:checked').value;
    const img_align = document.querySelector('dialog input[name="image_align"]:checked').value;
    const img_filter = document.querySelector('dialog input[name="image_filter"]:checked').value;
/* -- by HTML -- */
    let algn = 'display:inline-block;';
    const avatar = document.getElementById('image_avatar').checked;
    if(avatar) {
      const avSize = parseInt(document.getElementById('avatar_size').value);
      algn += `width:${avSize}px;height:${avSize}px;border-radius: 50%;object-fit: cover;`;
    }
    else algn += (img_width == 'lines') ? `height:${document.getElementById('byLines').value}lh; width:auto;` : `width:${img_width};`;
    const shdw = document.querySelector('#image_shadow').checked;
    if(img_filter != 'normal' || shdw)
      algn += `filter:${img_filter != 'normal' ? img_filter : ''}${shdw?' drop-shadow(0px 2px 3px #666)':''};`;
    if(img_align == 'left') algn += 'margin-right:.8em; float:left;';
    else if(img_align == 'right') algn += 'margin-left:.8em; float:right;';
    else algn += 'margin:0;';
    if(document.querySelector('#image_border').checked) algn += 'border:.5px solid #888;';
    if(!avatar && document.querySelector('#image_radius').checked) algn += 'border-radius:.6em;';

    closeDlg(e.target);
    restoreSelection();
    editorElement.focus();
    document.execCommand('insertHTML', false, `<img src="${srcImg.src}" style="${algn}"/>`);
});

document.querySelector('#fileInput').addEventListener('change', (event) => {
  const file = event.target.files[0];
  if(!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    base64File = e.target.result;
    document.getElementById('placeHolder').style.display = "none";
    document.getElementById('previewImage').src = base64File;
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

document.querySelector('#changeFont').addEventListener('click', () => {
  document.getElementById('selectFontsDlg').showModal()
});

function selectFont(btn) {
  let base = document.querySelector('dialog input[name="font_select"]:checked').value,
      head = document.querySelector('dialog input[name="Hfont_select"]:checked').value,
      size = document.getElementById('fSize').value + 'px',
      href = '', font = null, Hfont = null;
  if(base != 'Default') font = base.split(':')[0].replace(/\+/g, ' ');
  if(head != 'Default') Hfont = head.split(':')[0].replace(/\+/g, ' ');
  if(font || Hfont)
      href = `https://fonts.googleapis.com/css2?${font?('family='+base):''}${font && Hfont?'&':''}${Hfont?('family='+head):''}&display=swap`;
  if(!font) font = 'Roboto, Arial, sans-serif';
  if(!Hfont) Hfont = 'Roboto, Arial, sans-serif';

  document.getElementById('curFonts').href = href;
  document.documentElement.style.setProperty('--font-fam', font);
  document.documentElement.style.setProperty('--font-famH', Hfont);
  document.documentElement.style.setProperty('--font-size', size);
  closeDlg(btn);
  return;
}

let savedRange = null;

function saveSelection() {
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
        savedRange = selection.getRangeAt(0);
    }
}

function restoreSelection() {
    const selection = window.getSelection();
    if (savedRange) {
        selection.removeAllRanges();
        selection.addRange(savedRange);
    }
}

function showPrompt(message, defaultValue = '') {
    return new Promise((resolve) => {
        saveSelection();
        const modal = document.getElementById('PromptModal');
        const msgEl = document.getElementById('promptMessage');
        const inputEl = document.getElementById('promptInput');
        const submitBtn = document.getElementById('promptSubmit');
        const cancelBtn = document.getElementById('promptCancel');

        msgEl.innerHTML = message;
        inputEl.value = defaultValue;
        modal.showModal();
        inputEl.focus();

        const onSubmit = () => {
            const val = inputEl.value;
            cleanup();
            resolve(val);
        };

        const onCancel = () => {
            cleanup();
            resolve(null);
        };

        const cleanup = () => {
            modal.close();
            submitBtn.removeEventListener('click', onSubmit);
            cancelBtn.removeEventListener('click', onCancel);
            inputEl.removeEventListener('keydown', onKeydown);
            editorElement.focus();
            restoreSelection();
        };

        const onKeydown = (e) => {
          if (e.key === 'Enter') { e.preventDefault(); onSubmit(); }
          if (e.key === 'Escape') onCancel();
        };

        submitBtn.addEventListener('click', onSubmit);
        cancelBtn.addEventListener('click', onCancel);
        inputEl.addEventListener('keydown', onKeydown);
    });
}

editorElement.focus();