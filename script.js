const $=id=>document.getElementById(id);
const nav=navigator, screenInfo=window.screen;
const ua=nav.userAgent;

function browserInfo(){
  let b="Unknown", v="";
  const tests=[
    [/Edg\/([\d.]+)/,"Edge"],[/OPR\/([\d.]+)/,"Opera"],
    [/Chrome\/([\d.]+)/,"Chrome"],[/Firefox\/([\d.]+)/,"Firefox"],
    [/Version\/([\d.]+).*Safari/,"Safari"]
  ];
  for(const [re,name] of tests){const m=ua.match(re);if(m){b=name;v=m[1];break}}
  let os=/Windows/i.test(ua)?"Windows":/Mac OS X/i.test(ua)?"macOS":
         /Android/i.test(ua)?"Android":/iPhone|iPad/i.test(ua)?"iOS":
         /Linux/i.test(ua)?"Linux":"Unknown";
  let device=/Mobi|Android|iPhone|iPad/i.test(ua)?"Mobile":"Desktop";
  return {b,v,os,device};
}
const bi=browserInfo();

$("site").textContent=location.host||"Local demo";
$("referrer").textContent=document.referrer||"Direct";
$("browser").innerHTML=`Browser: ${bi.b}<br>Version: ${bi.v||"Unknown"}<br>OS: ${bi.os}<br>Device: ${bi.device}`;
$("display").innerHTML=`Screen: ${screenInfo.width} × ${screenInfo.height}<br>Viewport: ${innerWidth} × ${innerHeight}<br>Pixel ratio: ${devicePixelRatio}`;
$("hardware").innerHTML=`CPU cores: ${nav.hardwareConcurrency||"Unavailable"}<br>Memory: ${nav.deviceMemory?nav.deviceMemory+" GB approx.":"Unavailable"}<br>Touch: ${nav.maxTouchPoints>0}`;
$("details").innerHTML=`Language: ${nav.language||"Unknown"}<br>Languages: ${(nav.languages||[]).join(", ")||"Unknown"}<br>Cookies: ${nav.cookieEnabled}<br>Do Not Track: ${nav.doNotTrack??"Unknown"}<br>WebDriver: ${!!nav.webdriver}<br>WebGL: ${(()=>{try{const c=document.createElement("canvas");return !!(c.getContext("webgl")||c.getContext("experimental-webgl"))?"Available":"Unavailable"}catch{return"Unavailable"}})()}`;
$("session").innerHTML=`Online: ${nav.onLine}<br>Color scheme: ${matchMedia("(prefers-color-scheme: dark)").matches?"Dark":"Light"}<br>Timezone: ${Intl.DateTimeFormat().resolvedOptions().timeZone||"Unknown"}`;

$("verify").onclick=()=>{
  $("verify").textContent="✓ Verified";
  $("verify").disabled=true;
  // Optional, user-approved browser geolocation only.
  if(!navigator.geolocation){$("geo").textContent="Not supported";return}
  $("geo").textContent="Requesting permission…";
  navigator.geolocation.getCurrentPosition(
    p=>$("geo").textContent=`Permission granted (accuracy ≈ ${Math.round(p.coords.accuracy)} m)`,
    ()=>$("geo").textContent="Permission denied or unavailable",
    {enableHighAccuracy:false,timeout:8000,maximumAge:300000}
  );
};
