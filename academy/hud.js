'use strict';
window.HermessHUD=(()=>{
 const $=id=>document.getElementById(id),panels=['coursePanel','lessonPanel','appearancePanel','podTray','cameraPanel','replayPanel','analysisPanel'];
 const state={panelOpacity:65,textOpacity:100,dim:25,focus:null,reading:0,hidden:false};let core=null,lastKey='',wasFree=false;
 const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 function decorate(root=document){root.querySelectorAll('[data-icon]').forEach(el=>{const name=el.dataset.icon;el.innerHTML=uiIcon(name);el.removeAttribute('data-icon')})}
 function composition(){core?.onComposition(!state.hidden&&!$('lessonPanel').hidden)}
 function focus(id){if(state.hidden)id=null;state.focus=id;panels.forEach(p=>$(p).classList.toggle('is-active',p===id));$('focusVeil').classList.toggle('is-visible',!!id);if(id)document.body.dataset.focus=id;else delete document.body.dataset.focus}
 function updateButtons(){document.querySelectorAll('[data-panel]').forEach(b=>b.setAttribute('aria-expanded',String(!$(b.dataset.panel).hidden)));composition()}
 function open(id,{activate=true}={}){if(state.hidden)showOverlays();const tools=['coursePanel','podTray','cameraPanel','replayPanel','analysisPanel'];if(tools.includes(id))for(const other of tools)if(other!==id)$(other).hidden=true;$(id).hidden=false;updateButtons();if(activate)focus(id)}
 function close(id){$(id).hidden=true;if(state.focus===id)focus(null);updateButtons()}
 function toggle(id){$(id).hidden?open(id):close(id)}
 function appearance(){document.documentElement.style.setProperty('--panel-opacity',state.panelOpacity/100);document.documentElement.style.setProperty('--text-opacity',state.textOpacity/100);document.documentElement.style.setProperty('--focus-dim',state.dim/100);for(const [id,key] of [['panelOpacity','panelOpacity'],['textOpacity','textOpacity'],['focusDim','dim']]){$(id).value=state[key];$(id+'Out').value=state[key]+'%'}document.body.classList.toggle('low-visibility',state.panelOpacity<20||state.textOpacity<25)}
 function showOverlays(){state.hidden=false;document.body.classList.remove('hud-hidden');composition()}
 function hideOverlays(){state.hidden=true;document.body.classList.add('hud-hidden');focus(null);composition();$('recovery').focus()}
 function restore(){state.panelOpacity=65;state.textOpacity=100;state.dim=25;appearance();showOverlays();open('lessonPanel',{activate:false});focus(null)}
 function renderReading(lesson){const active=state.reading;$('lessonAccordion').innerHTML=lesson.steps.map((cfg,i)=>`<section class="reading-section ${i===active?'open':''}"><button class="reading-heading" id="readingHeading${i}" data-reading="${i}" aria-controls="readingBody${i}" aria-expanded="${i===active}"><span class="phase-symbol">${uiIcon(i===active?'caret-up':'caret-right')}</span><span class="phase-heading-text"><strong class="ink">${['Why','What','How'][i]}</strong><small class="ink">${escape(cfg.body)}</small></span></button><div class="reading-body" id="readingBody${i}" ${i===active?'':'hidden'}>${cfg.paragraphs.map(p=>`<p class="ink">${escape(p)}</p>`).join('')}</div></section>`).join('');$('lessonSource').textContent=lesson.source}
 function onRender(s,lesson){const key=s.chapter+':'+s.step;if(lastKey!==key){lastKey=key;state.reading=s.step;$('lessonPanel').hidden=false;$('lessonPanel').querySelector('.lesson-scroll').scrollTop=0}renderReading(lesson);if(s.free&&!wasFree){if(state.hidden)$('podTray').hidden=false;else open('podTray')}if(!s.free&&wasFree&&state.focus==='podTray')focus(null);wasFree=s.free;updateButtons()}
 function bind(hooks){core=hooks;decorate();appearance();updateButtons();
  document.querySelectorAll('[data-panel]').forEach(b=>b.addEventListener('click',()=>toggle(b.dataset.panel)));
  document.querySelectorAll('[data-close-panel]').forEach(b=>b.addEventListener('click',()=>close(b.dataset.closePanel)));
  for(const id of panels){$(id).addEventListener('pointerdown',()=>focus(id));$(id).addEventListener('focusin',()=>focus(id))}
  $('lessonAccordion').addEventListener('click',e=>{const b=e.target.closest('[data-reading]');if(!b)return;const i=Number(b.dataset.reading);if(state.reading===i){state.reading=null;renderReading(core.lesson());focus(null);$('readingHeading'+i).focus({preventScroll:true});focus(null)}else{core.selectReading(i);state.reading=i;renderReading(core.lesson());focus('lessonPanel');$('readingHeading'+i).focus({preventScroll:true})}});
  for(const [id,key] of [['panelOpacity','panelOpacity'],['textOpacity','textOpacity'],['focusDim','dim']])$(id).addEventListener('input',e=>{state[key]=Number(e.target.value);appearance();focus('appearancePanel')});
  $('hideControls').onclick=hideOverlays;$('restoreAppearance').onclick=restore;$('recovery').onclick=restore;
  $('ocean').addEventListener('pointerdown',()=>focus(null));
  document.addEventListener('keydown',e=>{if(document.querySelector('dialog[open]'))return;if(e.key==='Escape'){focus(null);return}if(e.ctrlKey||e.metaKey||e.altKey||e.target.closest('input,select,textarea,[role=slider]'))return;if(e.key.toLowerCase()==='h'){e.preventDefault();state.hidden?showOverlays():hideOverlays()}if(e.key.toLowerCase()==='o'){e.preventDefault();open('appearancePanel')}});
  // Extra tools stay reachable on smaller screens through the course menu.
  const mobile=document.createElement('div');mobile.className='mobile-tools';mobile.innerHTML=[['cameraPanel','camera','Camera'],['replayPanel','arrow-counter-clockwise','Replay'],['analysisPanel','chart-line','Readings'],['appearancePanel','palette','Appearance']].map(([id,icon,label])=>`<button data-mobile-panel="${id}">${uiIcon(icon)}<span class="ink">${label}</span></button>`).join('');$('coursePanel').append(mobile);mobile.addEventListener('click',e=>{const b=e.target.closest('[data-mobile-panel]');if(b){close('coursePanel');open(b.dataset.mobilePanel)}});
 }
 return {state,bind,decorate,onRender,renderReading,focus,open,close,toggle,restore,appearance,showOverlays,hideOverlays};
})();
