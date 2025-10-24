// --- Cronómetro ---
let ms = 0, cronoInt = null;
const cdisp = document.getElementById("cronodisplay");

function paintCrono(){
  const total = ms;
  const m = Math.floor(total/60000).toString().padStart(2,"0");
  const s = Math.floor((total%60000)/1000).toString().padStart(2,"0");
  const d = Math.floor((total%1000)/100);
  cdisp.textContent = `${m}:${s}.${d}`;
}
document.getElementById("start").onclick = ()=>{
  if(cronoInt) return;
  cronoInt = setInterval(()=>{ ms += 100; paintCrono(); },100);
};
document.getElementById("stop").onclick = ()=>{
  clearInterval(cronoInt); cronoInt=null;
};
document.getElementById("reset").onclick = ()=>{
  ms=0; paintCrono();
};
paintCrono();

// --- Temporizador ---
let tms = 0, tInt = null;
const mins = document.getElementById("mins");
const secs = document.getElementById("secs");
const tdisp = document.getElementById("timerdisplay");

function setFromInputs(){
  const m = Math.max(0, parseInt(mins.value||"0",10));
  let s = Math.max(0, parseInt(secs.value||"0",10));
  s = Math.min(s,59);
  tms = (m*60 + s) * 1000;
  paintTimer();
}
function paintTimer(){
  let total = Math.max(0,tms);
  const m = Math.floor(total/60000).toString().padStart(2,"0");
  const s = Math.floor((total%60000)/1000).toString().padStart(2,"0");
  tdisp.textContent = `${m}:${s}`;
}
document.getElementById("tstart").onclick = ()=>{
  if(tInt || tms<=0) return;
  tInt = setInterval(()=>{
    tms -= 1000;
    paintTimer();
    if(tms<=0){ clearInterval(tInt); tInt=null; alert("¡Tiempo!"); }
  },1000);
};
document.getElementById("tstop").onclick = ()=>{ clearInterval(tInt); tInt=null; };
document.getElementById("treset").onclick = ()=>{
  clearInterval(tInt); tInt=null; setFromInputs();
};
mins.addEventListener("change", setFromInputs);
secs.addEventListener("change", setFromInputs);
setFromInputs();
