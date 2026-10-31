(function(){
var h=React.createElement,useState=React.useState,useEffect=React.useEffect,useRef=React.useRef;

/* ---- EDIT HERE ---- */
var W=window.WEDDING;var CFG={a:W.a,b:W.b,date:new Date(W.date),venue:W.venue.name+", "+W.venue.city};
/* ------------------- */

var clamp=function(v,a,b){return Math.min(b,Math.max(a,v))};
/* trapezoid: rises a→b, holds, falls c→d */
var win=function(p,a,b,c,d){return clamp((p-a)/(b-a||1),0,1)*(1-clamp((p-c)/(d-c||1),0,1))};
var ease=function(t){return t*t*(3-2*t)};

function Layer(props){
  var o=props.o;
  return h("div",{className:"layer "+(props.cls||""),style:{opacity:o,visibility:o<.02?"hidden":"visible",pointerEvents:o<.5?"none":"auto"}},props.children);
}

function Heart(props){
  return h("button",{className:"heart"+(props.open?" open":""),onClick:props.onTap,"aria-label":props.open?props.big:"Tap to reveal "+props.hint},
    h("svg",{viewBox:"0 0 100 90","aria-hidden":"true"},h("path",{d:"M50 86C20 62 4 46 4 28 4 14 15 4 28 4c10 0 18 5 22 13C54 9 62 4 72 4c13 0 24 10 24 24 0 18-16 34-46 58Z",fill:props.open?"#d4377e":"#7d1049",stroke:"#e2b04a","stroke-width":"3"})),
    props.open?h("span",{className:"rv"},h("i",null,props.big),h("small",null,props.small)):h("span",{className:"rv"},h("small",null,"tap"),h("i",null,"♥")));
}

function Diya(props){
  var lit=props.lit;
  return h("svg",{className:"diya",viewBox:"0 0 200 140","aria-hidden":"true"},
    h("defs",null,
      h("linearGradient",{id:"gd",x1:"0",y1:"0",x2:"0",y2:"1"},h("stop",{offset:"0",stopColor:"#f6d27a"}),h("stop",{offset:"1",stopColor:"#9a6c18"})),
      h("radialGradient",{id:"gf",cx:".5",cy:".75",r:".6"},h("stop",{offset:"0",stopColor:"#fff6c8"}),h("stop",{offset:"1",stopColor:"#ffa21c"}))),
    h("g",{style:{transform:"scale("+lit+")",transformOrigin:"100px 66px",opacity:lit>0.02?1:0}},
      h("g",{className:"fl"},
        h("path",{d:"M100 68C72 44 90 22 100 2c10 20 28 42 0 66Z",fill:"url(#gf)"}),
        h("path",{d:"M100 66C90 54 96 42 100 32c4 10 10 22 0 34Z",fill:"#fff"}))),
    h("path",{d:"M14 70Q100 168 186 70Z",fill:"url(#gd)"}),
    h("ellipse",{cx:"100",cy:"70",rx:"86",ry:"9",fill:"#c88f28",stroke:"#f6d27a","stroke-width":"2"}),
    h("path",{d:"M60 96q40 20 80 0",fill:"none",stroke:"#7a4a08","stroke-width":"3","stroke-linecap":"round"}),
    h("circle",{cx:"100",cy:"104",r:"4",fill:"#7a4a08"}));
}

var GROOM='<path d="M36 128h28l-2 58H52l-2-42-2 42H38Z" fill="#f3e6c8" stroke="#c9a65a"/><path d="M36 186h14v6H32zM50 186h14l4 6H50z" fill="#7a4a08"/><path d="M28 62Q50 54 72 62L76 136H24Z" fill="#f6ead0" stroke="#d9b25a" stroke-width="1.5"/><path d="M24 64L14 118l9 3 9-48ZM76 64l10 54-9 3-9-48Z" fill="#f6ead0" stroke="#d9b25a"/><circle cx="18" cy="123" r="4.5" fill="#e0a878"/><circle cx="82" cy="123" r="4.5" fill="#e0a878"/><path d="M30 62L44 58 68 132 54 136Z" fill="#8a1038" stroke="#e2b04a" stroke-width="2"/><g fill="#e2b04a"><circle cx="50" cy="76" r="1.8"/><circle cx="50" cy="90" r="1.8"/><circle cx="50" cy="104" r="1.8"/><circle cx="50" cy="118" r="1.8"/></g><path d="M42 58l8 14 8-14" fill="none" stroke="#e2b04a" stroke-width="2"/><rect x="45" y="48" width="10" height="12" fill="#d79a6a"/><circle cx="50" cy="36" r="15" fill="#e0a878"/><path d="M34 35Q34 15 50 15Q66 15 66 35Q60 24 50 25Q40 24 34 35Z" fill="#1d1118"/><path d="M36 40Q50 64 64 40Q58 54 50 54Q42 54 36 40Z" fill="#1d1118"/>';
var BRIDE='<path d="M28 44Q26 6 50 6Q74 6 72 44L78 150H22Z" fill="#c4122f" stroke="#e2b04a" stroke-width="2"/><path d="M12 190H88L72 90H28Z" fill="#d2142f" stroke="#e2b04a" stroke-width="2"/><path d="M12 190H88" stroke="#e2b04a" stroke-width="5"/><path d="M34 100L26 190M50 96V190M66 100L74 190" stroke="#f0a020" stroke-width="1.2" opacity=".6"/><path d="M33 62H67L69 90H31Z" fill="#9c0f2a"/><path d="M33 66L20 104M67 66L80 104" stroke="#9c0f2a" stroke-width="8" stroke-linecap="round"/><circle cx="19" cy="107" r="4" fill="#e8b48a"/><circle cx="81" cy="107" r="4" fill="#e8b48a"/><rect x="45" y="48" width="10" height="14" fill="#dca078"/><circle cx="50" cy="36" r="14" fill="#e8b48a"/><path d="M36 34Q50 12 64 34Q50 22 36 34Z" fill="#1d1118"/><path d="M38 62Q50 80 62 62" fill="none" stroke="#e2b04a" stroke-width="2.5"/><circle cx="50" cy="22" r="2.4" fill="#e2b04a"/><path d="M64 62L74 140 58 132Z" fill="#a60e26" opacity=".85"/>';
function Couple(q){var m="0 "+q.gap/2+"px";return h("div",{className:"cpl "+(q.cls||"")},h("span",{className:"lv"},"♥"),
  h("svg",{className:"fig g",viewBox:"0 0 100 200",style:{margin:m},dangerouslySetInnerHTML:{__html:GROOM}}),
  h("svg",{className:"fig b",viewBox:"0 0 100 200",style:{margin:m},dangerouslySetInnerHTML:{__html:BRIDE}}))}
var EV=W.events.map(function(e){return[e.icon,e.name,e.date,e.time]});
var LAN=[[7,50,0],[25,92,.6],[75,70,1.1],[93,40,.3]];
var risers=Array.from({length:9},function(_,i){return{l:((i*37)%90+4)+"%",s:(1+(i%3)*.6)+"rem",t:(5+(i*3)%5)+"s",d:-(i*1.3)+"s"}});
var fw=[];[[20,16,0],[78,12,.8],[50,28,1.6]].forEach(function(c){for(var i=0;i<12;i++){var a=i/12*6.283;fw.push({k:c[0]+"-"+i,x:c[0]+"%",y:c[1]+"%",tx:Math.cos(a)*(50+(i%2)*26),ty:Math.sin(a)*(50+(i%2)*26),d:c[2],c:["#ffd45a","#ff5fa2","#ff9a2e"][i%3]})}});
function useCountdown(target){
  var s=useState(Date.now()),now=s[0],set=s[1];
  useEffect(function(){var t=setInterval(function(){set(Date.now())},1000);return function(){clearInterval(t)}},[]);
  var d=Math.max(0,target-now);
  return{done:d===0,days:Math.floor(d/864e5),hrs:Math.floor(d/36e5)%24,min:Math.floor(d/6e4)%60,sec:Math.floor(d/1e3)%60};
}

var petals=Array.from({length:14},function(_,i){return{l:(i*73)%100,dur:9+(i*7)%8,del:-((i*5)%12),dx:((i%2?1:-1)*(20+(i*13)%60))}});

function App(){
  var ps=useState(0),p=ps[0],setP=ps[1];
  var os=useState([]),open=os[0],setOpen=os[1];
  var ss=useState([]),sparks=ss[0],setSparks=ss[1];
  var raf=useRef(0),sid=useRef(0),stageRef=useRef(null);
  var cd=useCountdown(CFG.date.getTime());

  useEffect(function(){
    function on(){
      cancelAnimationFrame(raf.current);
      raf.current=requestAnimationFrame(function(){
        var m=document.documentElement.scrollHeight-window.innerHeight;
        setP(m>0?clamp(window.scrollY/m,0,1):0);
      });
    }
    on();window.addEventListener("scroll",on,{passive:true});window.addEventListener("resize",on);
    return function(){window.removeEventListener("scroll",on);window.removeEventListener("resize",on)};
  },[]);

  function burst(e){
    var id=++sid.current,x=e.clientX,y=e.clientY;
    var items=Array.from({length:8},function(_,i){var a=i/8*6.283;return{k:id+"-"+i,x:x,y:y,dx:Math.cos(a)*(40+Math.random()*30),dy:Math.sin(a)*(40+Math.random()*30)}});
    setSparks(function(s){return s.concat(items)});
    setTimeout(function(){setSparks(function(s){return s.filter(function(i){return i.k.split("-")[0]!=id})})},850);
  }
  function tap(i){setOpen(function(o){return o.indexOf(i)<0?o.concat(i):o})}

  var curOpen=ease(clamp((p-.07)/.15,0,1));
  var namesO=1-clamp((p-.06)/.08,0,1);
  var diyaO=win(p,.2,.27,.4,.46);
  var lit=ease(clamp((p-.27)/.08,0,1));
  var heartsO=win(p,.46,.52,.62,.68);
  var evO=win(p,.68,.74,.84,.89);
  var cdO=clamp((p-.89)/.06,0,1);
  var D=CFG.date;
  var all=open.length===3;
  var full=D.toLocaleDateString("en-IN",{weekday:"long",day:"numeric",month:"long",year:"numeric"});
  var time=D.toLocaleTimeString("en-IN",{hour:"numeric",minute:"2-digit"});

  return h("div",{ref:stageRef,className:"stage",onPointerDown:burst,onPointerMove:function(e){var r=stageRef.current;if(r){r.style.setProperty("--mx",(e.clientX/window.innerWidth-.5)*2);r.style.setProperty("--my",(e.clientY/window.innerHeight-.5)*2)}},style:{"--rot":(p*160)+"deg"}},
    petals.map(function(q,i){return h("span",{key:i,className:"petal",style:{left:q.l+"%",animationDuration:q.dur+"s",animationDelay:q.del+"s","--dx":q.dx+"px"}})}),
    h("div",{className:"rang",style:{transform:"translateX(-50%) rotate("+(p*300)+"deg) scale("+(.8+p*.5)+")"}}),
    h("div",{className:"garland"}),
    LAN.map(function(l,i){return h("div",{key:i,className:"lan",style:{left:l[0]+"%","--len":l[1]+"px",animationDelay:l[2]+"s"}},h("i"))}),

    /* diya scene */
    h("div",{className:"glow",style:{opacity:lit*diyaO,transform:"scale("+(.6+lit*.5)+")"}}),
    h(Layer,{o:diyaO},
      h(Diya,{lit:lit}),
      h("p",{className:"verse"},"शुभ विवाह"),
      h("p",{className:"msg",style:{opacity:lit}},"A single flame to bless two lives becoming one.")),

    /* hearts scene */
    h(Layer,{o:heartsO},
      risers.map(function(r,i){return h("span",{key:i,className:"rh",style:{"--l":r.l,"--s":r.s,"--t":r.t,animationDelay:r.d}},"♥")}),
      h("p",{className:"title"},"Save the date"),
      h("div",{className:"hearts"},
        h(Heart,{open:open.indexOf(0)>=0,onTap:function(){tap(0)},hint:"day",big:String(D.getDate()),small:D.toLocaleDateString("en-IN",{weekday:"short"})}),
        h(Heart,{open:open.indexOf(1)>=0,onTap:function(){tap(1)},hint:"month",big:D.toLocaleDateString("en-IN",{month:"short"}),small:"month"}),
        h(Heart,{open:open.indexOf(2)>=0,onTap:function(){tap(2)},hint:"year",big:String(D.getFullYear()),small:"year"})),
      h("p",{className:"when"},all?full:""),
      h("p",{className:"msg"},all?"Muhurat at "+time+". Your blessings complete our day.":"Tap each heart to reveal the date.")),

    /* events scene */
    h(Layer,{o:evO},
      h("p",{className:"title"},"Join the celebrations"),
      h("div",{className:"ev"},EV.map(function(e){
        var d=new Date(e[2]);
        return h("div",{key:e[1],className:"card"},h("em",null,e[0]),h("h3",null,e[1]),h("p",null,d.toLocaleDateString("en-IN",{day:"numeric",month:"long"})),h("p",null,e[3]))})),
      h("p",{className:"msg"},"Swipe through the festivities ›")),

    /* countdown scene */
    h(Layer,{o:cdO},
      h("p",{className:"title"},cd.done?"Married with love":"Counting down to forever"),
      cd.done?null:h("div",{className:"cd"},
        [["days",cd.days],["hours",cd.hrs],["minutes",cd.min],["seconds",cd.sec]].map(function(x){
          return h("div",{key:x[0]},h("b",null,String(x[1]).padStart(2,"0")),h("span",null,x[0]))})),
      h("p",{className:"msg"},"With the blessings of our families, we invite you to celebrate the wedding of "+CFG.a+" and "+CFG.b+"."),
      h("p",{className:"venue"},CFG.venue),
      h(Couple,{gap:-14,cls:"fin"}),
      fw.map(function(f){return h("span",{key:f.k,className:"fw",style:{"--x":f.x,"--y":f.y,"--tx":f.tx+"px","--ty":f.ty+"px","--d":f.d+"s","--c":f.c}})})),

    /* curtains + names */
    h("div",{className:"cur l",style:{transform:"translateX("+(-curOpen*101)+"%)"}}),
    h("div",{className:"cur r",style:{transform:"translateX("+(curOpen*101)+"%)"}}),
    h(Layer,{o:namesO,cls:"names"},
      h("div",{className:"om"},"॥ श्री गणेशाय नमः ॥"),
      h(Couple,{gap:4,cls:"hero"}),
      h("div",{className:"nrow"},
        h("div",{className:"nm a"},CFG.a),
        h("div",{className:"nm amp"},"&"),
        h("div",{className:"nm b"},CFG.b)),
      h("div",{className:"sub"},"are getting married")),
    h("div",{className:"hint",style:{opacity:undefined,display:p>.06?"none":"block"}},"Scroll to open the curtains ↓"),

    sparks.map(function(s){return h("span",{key:s.k,className:"spark",style:{left:s.x-5,top:s.y-7,"--x":s.dx+"px","--y":s.dy+"px"}})}));
}
ReactDOM.createRoot(document.getElementById("root")).render(h(App));
})();

/* ================= SITE: sections, nav, interactions (plain JS) ================= */
(function(){
"use strict";
var W=window.WEDDING,E=W.events,D=new Date(W.date);
var $=function(s,r){return(r||document).querySelector(s)},$$=function(s,r){return[].slice.call((r||document).querySelectorAll(s))};
var reduce=window.matchMedia("(prefers-reduced-motion:reduce)").matches;
var fmt=function(d,o){return new Date(d).toLocaleDateString("en-IN",o)};
var fullDate=fmt(D,{weekday:"long",day:"numeric",month:"long",year:"numeric"});
var timeStr=D.toLocaleTimeString("en-IN",{hour:"numeric",minute:"2-digit"});
var addr=W.venue.name+", "+W.venue.address;
var title=W.a+" & "+W.b+" · Wedding Invitation";
var inviteText=function(){return"॥ ॐ श्री गणेशाय नमः ॥\nWith the blessings of our families, you are warmly invited to the wedding of "+W.a+" & "+W.b+".\n"+fullDate+", "+timeStr+"\n"+addr+"\n"+location.href};

/* ---------- helpers ---------- */
function toast(m){var t=$("#toast");t.textContent=m;t.classList.add("show");clearTimeout(toast.t);toast.t=setTimeout(function(){t.classList.remove("show")},2400)}
function copy(txt,msg){
  (navigator.clipboard?navigator.clipboard.writeText(txt):Promise.reject()).catch(function(){
    var a=document.createElement("textarea");a.value=txt;a.style.position="fixed";a.style.opacity="0";document.body.appendChild(a);a.select();try{document.execCommand("copy")}catch(e){}a.remove()
  }).then(function(){toast(msg)})}
function share(){var d={title:title,text:inviteText().split("\n").slice(0,4).join("\n"),url:location.href};
  if(navigator.share){navigator.share(d).catch(function(){})}else copy(inviteText(),"Invitation copied. Paste it to share.")}
function ics(list,name){
  var z=function(d){return new Date(d).toISOString().replace(/[-:]|\.\d{3}/g,"")},esc=function(t){return String(t).replace(/([,;\\])/g,"\\$1").replace(/\n/g,"\\n")};
  var L=["BEGIN:VCALENDAR","VERSION:2.0","PRODID:-//Wedding Invitation//EN","CALSCALE:GREGORIAN"];
  list.forEach(function(e,i){var s=new Date(e.date);
    L.push("BEGIN:VEVENT","UID:"+z(s)+"-"+i+"@wedding-invite","DTSTAMP:"+z(new Date()),"DTSTART:"+z(s),"DTEND:"+z(s.getTime()+(e.hours||3)*36e5),
      "SUMMARY:"+esc(e.name+": "+W.a+" & "+W.b),"LOCATION:"+esc((e.place?e.place+", ":"")+addr),"DESCRIPTION:"+esc("Dress code: "+e.dress),"END:VEVENT")});
  L.push("END:VCALENDAR");
  var a=document.createElement("a");a.href=URL.createObjectURL(new Blob([L.join("\r\n")],{type:"text/calendar"}));a.download=name+".ics";
  document.body.appendChild(a);a.click();a.remove();setTimeout(function(){URL.revokeObjectURL(a.href)},2000);toast("Calendar file downloaded")}

/* ---------- art ---------- */
var SW='<svg class="sw" viewBox="0 0 40 40" fill="none" stroke="#b3122a" stroke-width="3.5" stroke-linecap="round" aria-hidden="true"><path d="M20 4v32M4 20h32M20 4h10M36 20v10M20 36H10M4 20V10"/><g fill="#c9972f" stroke="none"><circle cx="11" cy="11" r="2"/><circle cx="29" cy="11" r="2"/><circle cx="29" cy="29" r="2"/><circle cx="11" cy="29" r="2"/></g></svg>';
function peacock(){
  var s='<svg viewBox="0 0 200 200" aria-hidden="true"><defs><radialGradient id="pf" cx=".5" cy=".3" r=".75"><stop offset="0" stop-color="#14b8a6"/><stop offset=".6" stop-color="#1f8a4c"/><stop offset="1" stop-color="#0f5e3a"/></radialGradient><linearGradient id="pb" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2377ea"/><stop offset="1" stop-color="#0a2f8a"/></linearGradient></defs>',n=13,i;
  for(i=0;i<n;i++){var a=-72+i*144/(n-1),L=i%2?90:100,t=168-L+8;
    s+='<g transform="rotate('+a.toFixed(1)+' 100 168)"><path d="M100 168V'+(t+8)+'" stroke="#2f7a3a" stroke-width="1.6"/><ellipse cx="100" cy="'+(t+14)+'" rx="12" ry="26" fill="url(#pf)"/><ellipse cx="100" cy="'+t+'" rx="9.5" ry="11" fill="#d9a62a"/><ellipse cx="100" cy="'+t+'" rx="7.5" ry="9" fill="#14b8a6"/><ellipse cx="100" cy="'+t+'" rx="5" ry="6.2" fill="#1346b8"/><ellipse cx="100" cy="'+t+'" rx="2.2" ry="3" fill="#071a4a"/></g>'}
  return s+'<path d="M92 192v8M106 192v8" stroke="#8a6a2a" stroke-width="2"/><ellipse cx="100" cy="176" rx="23" ry="17" fill="url(#pb)"/><path d="M110 168C126 150 118 126 125 110" fill="none" stroke="#0b4bbd" stroke-width="13" stroke-linecap="round"/><circle cx="126" cy="106" r="8" fill="#0a3fa0"/><path d="M132 105l9 3-9 3z" fill="#d9a62a"/><path d="M123 98l-3-13M126 97v-14M129 98l4-12" stroke="#14548f" stroke-width="1.5"/><g fill="#14b8a6"><circle cx="120" cy="84" r="2"/><circle cx="126" cy="82" r="2"/><circle cx="133" cy="84" r="2"/></g><circle cx="128" cy="104" r="1.6" fill="#fff"/></svg>'}
var walk='<div class="walk" aria-hidden="true"><div class="pk">'+peacock()+'</div></div>';
var head=function(id,t,sub){return'<div class="orn">'+SW+'</div><h2 id="h-'+id+'">'+t+'</h2>'+(sub?'<p class="lead">'+sub+'</p>':'')};
var sec=function(id,label,inner){return{id:id,label:label,html:'<section id="'+id+'" class="rv" aria-labelledby="h-'+id+'">'+inner+'</section>'}};
var li=function(a){return'<ul>'+a.map(function(x){return'<li>'+x+'</li>'}).join('')+'</ul>'};
var mapUrl="https://www.google.com/maps/search/?api=1&query="+encodeURIComponent(W.venue.mapQuery||addr);

/* ---------- sections ---------- */
var S=[
 sec("invite","Invitation",'<p class="deva">॥ ॐ श्री गणेशाय नमः ॥</p>'+head("invite","You are invited",W.invite)+'<p class="names">'+W.a+' <span>&amp;</span> '+W.b+'</p><p class="when">'+fullDate+'</p><p class="lead">Muhurat at '+timeStr+', '+W.venue.name+', '+W.venue.city+'</p><div class="row"><button class="btn" data-act="ics-main">Add to calendar</button><button class="btn o" data-act="copy-inv">Copy invitation</button><button class="btn o" data-act="share">Share</button></div>'),
 sec("families","Families",head("families","Our families","Two families, one celebration")+'<div class="grid">'+W.families.map(function(f){return'<article class="box"><h3>'+f.title+'</h3><p class="lead">'+f.head+'</p><p class="big">'+f.parents+'</p><p>'+f.others+'</p></article>'}).join('')+'</div>'),
 sec("events","Events",head("events","Wedding celebrations","Swipe, or use the arrows, to browse the festivities")+'<div class="car"><button class="arr" data-act="prev" aria-label="Previous event">‹</button><div class="track" id="track" tabindex="0" role="region" aria-label="Wedding events">'+E.map(function(e,i){return'<article class="ecard"><i aria-hidden="true">'+e.icon+'</i><h3>'+e.name+'</h3><p class="big">'+fmt(e.date,{weekday:"short",day:"numeric",month:"long"})+'</p><p>'+e.time+', '+e.place+'</p><p>Dress: '+e.dress+'</p><button class="btn o s" data-act="ics-i" data-i="'+i+'">Add to calendar</button></article>'}).join('')+'</div><button class="arr r" data-act="next" aria-label="Next event">›</button></div><div class="row"><button class="btn o" data-act="ics-all">Add all events to calendar</button></div>'),
 sec("countdown","Countdown",head("countdown","Counting down","Until we are husband and wife")+'<div class="cd2" id="cd2" role="timer" aria-live="off"></div>'),
 sec("details","Details",head("details","Wedding details")+'<div class="grid"><article class="box"><h3>Date</h3><p class="big">'+fullDate+'</p><p>Ceremony at '+timeStr+'</p></article><article class="box"><h3>Auspicious muhurat</h3><p class="big">'+W.muhurat+'</p></article><article class="box"><h3>Dress code</h3><p>'+W.dressCode+'</p></article><article class="box"><h3>Good to know</h3>'+li(W.notes)+'</article></div>'),
 sec("venue","Venue",head("venue","The venue")+'<p class="big">'+W.venue.name+'</p><p id="addr">'+W.venue.address+'</p><div class="row"><a class="btn" href="'+mapUrl+'" target="_blank" rel="noopener">Get directions</a><button class="btn o" data-act="copy-addr">Copy address</button></div>'),
 sec("guests","Guests",head("guests","Guest information")+'<div class="grid"><article class="box"><h3>For our guests</h3>'+li(W.guest)+'</article><article class="box"><h3>Wedding etiquette</h3>'+li(W.etiquette)+'</article></div>'),
 sec("rsvp","RSVP",head("rsvp","Kindly reply","Please let us know by "+fmt(W.rsvp.by,{day:"numeric",month:"long",year:"numeric"}))+'<form id="rsvpForm" class="form" novalidate><label>Your name<input name="name" type="text" autocomplete="name" required></label><fieldset><legend>Will you attend?</legend><label class="pill"><input type="radio" name="att" value="yes" checked> Joyfully accept</label><label class="pill"><input type="radio" name="att" value="no"> Regretfully decline</label></fieldset><label>Number of guests<input name="n" type="number" min="1" max="'+W.rsvp.maxGuests+'" value="1" inputmode="numeric"></label><label>Message for the couple<textarea name="msg" rows="3"></textarea></label><p class="err" id="err" role="alert"></p><button class="btn" type="submit">Prepare my reply</button></form><div id="out" aria-live="polite"></div>'),
 sec("blessings","Blessings",'<p class="deva">ॐ</p>'+head("blessings","With love and blessings",W.blessing)+'<p class="names">'+W.a+' <span>&amp;</span> '+W.b+'</p><p class="when">'+fullDate+'</p><div class="row"><button class="btn" data-act="share">Share this invitation</button><button class="btn o" data-act="copy-inv">Copy invitation</button></div><p class="foot">Made with love. Your blessings are our greatest gift.</p>')
];
var html="";S.forEach(function(s,i){html+=s.html+(i===0||i===4||i===6?walk:"")});
$("#site").innerHTML=html;
$("#menu").innerHTML=S.map(function(s){return'<li><a href="#'+s.id+'" data-id="'+s.id+'">'+s.label+'</a></li>'}).join("");
$("#brand").textContent=W.a.charAt(0)+" ♥ "+W.b.charAt(0);

/* ---------- carousel ---------- */
var track=$("#track"),prev=$('[data-act="prev"]'),next=$('[data-act="next"]');
function step(d){track.scrollBy({left:d*Math.min(track.clientWidth*.8,310),behavior:reduce?"auto":"smooth"})}
function arrows(){prev.disabled=track.scrollLeft<8;next.disabled=track.scrollLeft+track.clientWidth>=track.scrollWidth-8}
track.addEventListener("scroll",arrows,{passive:true});arrows();
track.addEventListener("keydown",function(e){if(e.key==="ArrowRight"){step(1);e.preventDefault()}if(e.key==="ArrowLeft"){step(-1);e.preventDefault()}});

/* ---------- countdown ---------- */
function tick(){var d=Math.max(0,D-Date.now()),c=$("#cd2");
  if(!d){c.innerHTML='<p class="big" style="grid-column:1/-1">Today is the day. Shubh Vivah!</p>';return}
  c.innerHTML=[["days",Math.floor(d/864e5)],["hours",Math.floor(d/36e5)%24],["minutes",Math.floor(d/6e4)%60],["seconds",Math.floor(d/1e3)%60]].map(function(x){return'<div><b>'+String(x[1]).padStart(2,"0")+'</b><span>'+x[0]+'</span></div>'}).join("")}
tick();setInterval(tick,1000);

/* ---------- RSVP (no backend: reply is sent via WhatsApp/email/copy) ---------- */
var form=$("#rsvpForm");
form.addEventListener("change",function(){form.n.disabled=form.att.value==="no"});
form.addEventListener("submit",function(e){e.preventDefault();
  var name=form.name.value.trim(),err=$("#err"),no=form.att.value==="no",n=Math.round(+form.n.value);
  if(!name){err.textContent="Please enter your name.";form.name.focus();return}
  if(!no&&(!(n>=1)||n>W.rsvp.maxGuests)){err.textContent="Please enter between 1 and "+W.rsvp.maxGuests+" guests.";form.n.focus();return}
  err.textContent="";
  var msg="RSVP for "+W.a+" & "+W.b+"\nName: "+name+"\n"+(no?"Regretfully unable to attend":"Joyfully attending, guests: "+n)+(form.msg.value.trim()?"\nMessage: "+form.msg.value.trim():"");
  var b='<button class="btn s" data-act="copy-rsvp">Copy reply</button>';
  if(W.rsvp.whatsapp)b+=' <a class="btn s" target="_blank" rel="noopener" href="https://wa.me/'+W.rsvp.whatsapp+'?text='+encodeURIComponent(msg)+'">Send on WhatsApp</a>';
  if(W.rsvp.email)b+=' <a class="btn s" href="mailto:'+W.rsvp.email+'?subject='+encodeURIComponent("RSVP: "+name)+'&body='+encodeURIComponent(msg)+'">Send by email</a>';
  var o=$("#out");o.className="out";o.innerHTML='<p><b>Your reply is ready, but it has not been sent.</b> This invitation has no server, so nothing is saved here. Please send it to the family using a button below.</p><pre></pre>'+b;
  $("pre",o).textContent=msg;o.dataset.msg=msg;o.scrollIntoView({block:"nearest"})});

/* ---------- clicks ---------- */
document.addEventListener("click",function(e){
  var t=e.target.closest("[data-act]");
  if(t){var a=t.dataset.act;
    if(a==="ics-main")ics([E.filter(function(x){return x.main})[0]||E[0]],"shubh-vivah");
    else if(a==="ics-all")ics(E,"wedding-events");
    else if(a==="ics-i")ics([E[+t.dataset.i]],E[+t.dataset.i].name.toLowerCase().replace(/\s+/g,"-"));
    else if(a==="copy-inv")copy(inviteText(),"Invitation copied");
    else if(a==="copy-addr")copy(addr,"Venue address copied");
    else if(a==="copy-rsvp")copy($("#out").dataset.msg,"Reply copied");
    else if(a==="share")share();
    else if(a==="prev")step(-1);
    else if(a==="next")step(1);
    else if(a==="menu"){var u=$("#menu"),o=u.classList.toggle("open");t.setAttribute("aria-expanded",o)}}
  if(e.target.closest("#menu a"))$("#menu").classList.remove("open"),$("#menuBtn").setAttribute("aria-expanded","false");
  if(!reduce&&e.target.closest("#site,.nav")){var c=["#d4377e","#f08a0c","#e2b04a","#b3122a"];
    for(var i=0;i<7;i++){var s=document.createElement("span"),an=i/7*6.283+Math.random();s.className="pet";s.style.cssText="left:"+(e.clientX-5)+"px;top:"+(e.clientY-7)+"px;background:"+c[i%4]+";--x:"+Math.cos(an)*(36+Math.random()*34)+"px;--y:"+(Math.sin(an)*(36+Math.random()*34)-20)+"px";document.body.appendChild(s);setTimeout(function(n){n.remove()},950,s)}}
});
document.addEventListener("keydown",function(e){if(e.key==="Escape"){$("#menu").classList.remove("open");$("#menuBtn").setAttribute("aria-expanded","false")}});

/* ---------- reveal + active nav ---------- */
var io=new IntersectionObserver(function(es){es.forEach(function(x){if(x.isIntersecting){x.target.classList.add("in");io.unobserve(x.target)}})},{threshold:.08});
$$(".rv").forEach(function(n){io.observe(n)});
var links=$$("#menu a"),so=new IntersectionObserver(function(es){es.forEach(function(x){if(x.isIntersecting)links.forEach(function(l){l.dataset.id===x.target.id?l.setAttribute("aria-current","true"):l.removeAttribute("aria-current")})})},{rootMargin:"-45% 0px -50% 0px"});
S.forEach(function(s){so.observe($("#"+s.id))});

/* ---------- scroll: progress bar, nav, peacock walk (one rAF loop) ---------- */
var bar=$("#bar"),nav=$("#nav"),rootEl=$("#root"),pks=$$(".pk"),ticking=false;
function frame(){ticking=false;
  var y=window.scrollY,vh=window.innerHeight,max=document.documentElement.scrollHeight-vh;
  bar.style.transform="scaleX("+(max>0?Math.min(1,y/max):0)+")";
  nav.classList.toggle("on",y>rootEl.offsetHeight-vh*1.05);
  pks.forEach(function(p){var b=p.parentNode.getBoundingClientRect();if(b.bottom<0||b.top>vh)return;
    var t=reduce?.5:Math.min(1,Math.max(0,1-(b.top+b.height/2)/vh)),x=t*(b.width-p.offsetWidth);
    p.style.transform="translate3d("+x.toFixed(1)+"px,"+(reduce?0:Math.sin(t*38)*2).toFixed(1)+"px,0)";
    p.style.filter=reduce?"none":"hue-rotate("+(Math.sin(t*6)*14).toFixed(0)+"deg) saturate(1.1)"})}
function req(){if(!ticking){ticking=true;requestAnimationFrame(frame)}}
window.addEventListener("scroll",req,{passive:true});window.addEventListener("resize",req);frame();
})();