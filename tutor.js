(() => {
'use strict';
const $=id=>document.getElementById(id),panel=$('tutorPanel'),log=$('tutorMessages'),provider=$('tutorProvider'),model=$('ollamaModel'),input=$('tutorInput'),send=$('tutorSend');
let selection=null,history=[],busy=false;
const escape=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
function context(){const t=selection?.topic||(active>=0?DATA[active]:null);if(!t)return {topic:'General mathematics'};const q=selection?.question;return {topic:t.title,source:t.source,concept:t.concept,formulas:t.formulas,method:t.method,example:t.example,exampleSteps:t.steps,question:q?.q||'',answer:q?.a||'',explanation:q?.why||'',solutionSteps:q?.solutionSteps||[]};}
function updateContext(){const c=context();$('tutorContext').textContent=c.question?`${c.topic} · selected practice problem`:`Context: ${c.topic}`;}
function toggle(on){on=typeof on==='boolean'?on:!panel.classList.contains('open');panel.classList.toggle('open',on);panel.setAttribute('aria-hidden',String(!on));if(on){updateContext();input.focus();}}
function msg(who,text,err=false){const e=document.createElement('div');e.className=`tutor-msg ${who}${err?' error':''}`;e.innerHTML=`<div class="tutor-who">${who==='user'?'You':'Tutor'}</div><div class="tutor-text">${escape(text).split(/\n\s*\n/).map(x=>`<p>${x.replace(/\n/g,'<br>')}</p>`).join('')}</div>`;log.appendChild(e);log.scrollTop=log.scrollHeight;if(who!=='user'&&window.MathJax?.typesetPromise)MathJax.typesetPromise([e]).catch(()=>{});return e;}
async function ask(text){text=String(text||'').trim();if(!text||busy)return;input.value='';toggle(true);msg('user',text);busy=true;send.disabled=true;send.textContent='…';const loader=msg('assistant','Thinking…');try{
let answer;if(provider.value==='ollama'){
const instructions=`You are a math tutor. Explain each step using the provided lesson and solved question. In hint-only requests do not give the final answer. Format mathematical expressions as LaTeX between \\( and \\) or \\[ and \\]. Explain uncertainty if notes are insufficient. Lesson: ${JSON.stringify(context()).slice(0,10000)}`;
const response=await fetch('http://localhost:11434/api/chat',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({model:model.value.trim()||'qwen2.5:7b',stream:false,messages:[{role:'system',content:instructions},...history.slice(-8),{role:'user',content:text}]})});const data=await response.json();if(!response.ok)throw Error(data.error||`Ollama HTTP ${response.status}`);answer=data.message?.content;
}else{
const response=await fetch('/api/tutor',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({message:text,context:context(),history:history.slice(-8)})});const data=await response.json();if(!response.ok)throw Error(data.error||`Gemini HTTP ${response.status}`);answer=data.reply;
}if(!answer)throw Error('The model returned an empty answer.');loader.remove();msg('assistant',answer);history.push({role:'user',content:text},{role:'assistant',content:answer});history=history.slice(-12);
}catch(e){loader.remove();msg('assistant',(provider.value==='ollama'?'Ollama requires a running local model and allowed browser origin. ':'Gemini requires GEMINI_API_KEY in Vercel and a successful deployment. ')+(e.message||'Request failed.'),true);}finally{busy=false;send.disabled=false;send.textContent='Send ↗';}}
function askProblem(i,j){const t=DATA[i],q=t?.qs?.[j];if(!q)return;selection={topic:t,question:q};history=[];toggle(true);msg('assistant',`Selected: ${t.title}. Ask about a particular step or select “Hint only.”`);}
function askExample(i){const t=DATA[i];if(!t)return;selection={topic:t};history=[];toggle(true);msg('assistant',`Selected lesson example: ${t.title}. Which step is confusing?`);}
provider.addEventListener('change',()=>{const local=provider.value==='ollama';model.classList.toggle('hide',!local);$('ollamaModelLabel').classList.toggle('hide',!local);history=[];msg('assistant',local?'Ollama runs on this computer, not the Vercel server.':'Gemini uses the Vercel function configured by the site owner.');});
$('tutorForm').addEventListener('submit',e=>{e.preventDefault();ask(input.value)});
input.addEventListener('keydown',e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();ask(input.value)}});
window.MathStudioTutor={toggle,quick:ask,askProblem,askExample};
})();
