var wi=Object.defineProperty;var ki=(e,t,i)=>t in e?wi(e,t,{enumerable:!0,configurable:!0,writable:!0,value:i}):e[t]=i;var pe=(e,t,i)=>ki(e,typeof t!="symbol"?t+"":t,i);import{j as a,m as g,A as W}from"./framer-motion-e-RdDy7j.js";import{a as ji,r as p,g as $i,R as Xt}from"./react-vendor-F9Y4d3HK.js";import{o as Ci,f as Di,d as o,m as R,l as A}from"./styled-components-KNnoHVUo.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const l of s.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&n(l)}).observe(document,{childList:!0,subtree:!0});function i(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(r){if(r.ep)return;r.ep=!0;const s=i(r);fetch(r.href,s)}})();var Jt,xt=ji;Jt=xt.createRoot,xt.hydrateRoot;var j=(e=>(e.HAUNTED="haunted",e.PROCESSING="processing",e.UNDERSTANDING="understanding",e.RELIEVED="relieved",e))(j||{});const Ei={colors:{primary:"#8B0000",secondary:"#4A0E0E",background:"#0D0D0D",surface:"#1A1A1A",text:"#C4C4C4",textMuted:"#666666",accent:"#FF4444",danger:"#FF0000",success:"#2D5A27",fog:"rgba(30, 30, 40, 0.6)",glow:"rgba(255, 68, 68, 0.4)"},typography:{fontFamily:'"Inter", -apple-system, sans-serif',fontFamilySpooky:'"Creepster", "Inter", cursive',letterSpacing:"0.02em",textShadow:"0 0 10px rgba(255, 68, 68, 0.3)"},spacing:{borderRadius:2,shadows:["0 4px 20px rgba(0, 0, 0, 0.8)","0 0 40px rgba(139, 0, 0, 0.3)","inset 0 0 60px rgba(0, 0, 0, 0.5)"]},animations:{duration:.3,easing:"cubic-bezier(0.4, 0, 0.2, 1)",flicker:!0,float:!0},effects:{fogOpacity:.6,glowIntensity:.8,shadowMovement:!0,ghostShapes:!0,parchmentTexture:!0}},Ai={colors:{primary:"#7B3F00",secondary:"#3D2914",background:"#141414",surface:"#1F1F1F",text:"#D4D4D4",textMuted:"#888888",accent:"#FF8C00",danger:"#FF6B6B",success:"#3D7A35",fog:"rgba(40, 35, 30, 0.4)",glow:"rgba(255, 140, 0, 0.3)"},typography:{fontFamily:'"Inter", -apple-system, sans-serif',fontFamilySpooky:'"Creepster", "Inter", cursive',letterSpacing:"0.01em",textShadow:"0 0 6px rgba(255, 140, 0, 0.2)"},spacing:{borderRadius:4,shadows:["0 4px 16px rgba(0, 0, 0, 0.6)","0 0 30px rgba(123, 63, 0, 0.2)"]},animations:{duration:.4,easing:"cubic-bezier(0.4, 0, 0.2, 1)",flicker:!0,float:!0},effects:{fogOpacity:.4,glowIntensity:.5,shadowMovement:!0,ghostShapes:!0,parchmentTexture:!0}},Si={colors:{primary:"#2E7D32",secondary:"#1B4D1E",background:"#1A1D1A",surface:"#242824",text:"#E8E8E8",textMuted:"#AAAAAA",accent:"#66BB6A",danger:"#EF5350",success:"#4CAF50",fog:"rgba(46, 125, 50, 0.15)",glow:"rgba(102, 187, 106, 0.2)"},typography:{fontFamily:'"Inter", -apple-system, sans-serif',fontFamilySpooky:'"Inter", -apple-system, sans-serif',letterSpacing:"0",textShadow:"none"},spacing:{borderRadius:8,shadows:["0 4px 12px rgba(0, 0, 0, 0.3)","0 0 20px rgba(46, 125, 50, 0.1)"]},animations:{duration:.5,easing:"cubic-bezier(0.4, 0, 0.2, 1)",flicker:!1,float:!1},effects:{fogOpacity:.15,glowIntensity:.2,shadowMovement:!1,ghostShapes:!1,parchmentTexture:!1}},Ti={colors:{primary:"#1976D2",secondary:"#0D47A1",background:"#FAFAFA",surface:"#FFFFFF",text:"#212121",textMuted:"#757575",accent:"#42A5F5",danger:"#E53935",success:"#43A047",fog:"transparent",glow:"rgba(66, 165, 245, 0.1)"},typography:{fontFamily:'"Inter", -apple-system, sans-serif',fontFamilySpooky:'"Inter", -apple-system, sans-serif',letterSpacing:"0",textShadow:"none"},spacing:{borderRadius:12,shadows:["0 2px 8px rgba(0, 0, 0, 0.1)","0 4px 16px rgba(0, 0, 0, 0.08)"]},animations:{duration:.6,easing:"cubic-bezier(0.4, 0, 0.2, 1)",flicker:!1,float:!1},effects:{fogOpacity:0,glowIntensity:0,shadowMovement:!1,ghostShapes:!1,parchmentTexture:!1}},zi={[j.HAUNTED]:Ei,[j.PROCESSING]:Ai,[j.UNDERSTANDING]:Si,[j.RELIEVED]:Ti},Zt=p.createContext(void 0);function Ii({children:e,initialState:t=j.HAUNTED}){const[i,n]=p.useState(t),[r,s]=p.useState(0),l=p.useMemo(()=>typeof window>"u"?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),c=p.useMemo(()=>zi[i],[i]),u=p.useCallback((m,h=1e3)=>{n(m)},[]),x=p.useMemo(()=>({emotionalState:i,theme:c,progress:r,setEmotionalState:n,setProgress:s,transitionTo:u,prefersReducedMotion:l}),[i,c,r,u,l]);return a.jsx(Zt.Provider,{value:x,children:a.jsx(Ci,{theme:c,children:e})})}function V(){const e=p.useContext(Zt);if(!e)throw new Error("useEmotionalTheme must be used within EmotionalThemeProvider");return e}const Ri=Di`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
  
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    font-size: 16px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    font-family: ${({theme:e})=>e.typography.fontFamily};
    background-color: ${({theme:e})=>e.colors.background};
    color: ${({theme:e})=>e.colors.text};
    letter-spacing: ${({theme:e})=>e.typography.letterSpacing};
    line-height: 1.6;
    min-height: 100vh;
    transition: background-color 0.8s ease, color 0.8s ease;
  }

  #root {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: 600;
    line-height: 1.3;
    text-shadow: ${({theme:e})=>e.typography.textShadow};
    transition: text-shadow 0.8s ease;
  }

  a {
    color: ${({theme:e})=>e.colors.accent};
    text-decoration: none;
    transition: color 0.3s ease;
    
    &:hover {
      color: ${({theme:e})=>e.colors.primary};
    }
  }

  button {
    font-family: inherit;
    cursor: pointer;
    border: none;
    outline: none;
    transition: all 0.3s ease;
  }

  /* Scrollbar styling for haunted theme */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${({theme:e})=>e.colors.background};
  }

  ::-webkit-scrollbar-thumb {
    background: ${({theme:e})=>e.colors.secondary};
    border-radius: ${({theme:e})=>e.spacing.borderRadius}px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${({theme:e})=>e.colors.primary};
  }

  /* Reduced motion support */
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }

  /* Focus styles for keyboard navigation */
  *:focus-visible {
    outline: 2px solid ${({theme:e})=>e.colors.accent};
    outline-offset: 2px;
  }

  /* Skip to main content link */
  .skip-link {
    position: absolute;
    top: -40px;
    left: 0;
    background: ${({theme:e})=>e.colors.accent};
    color: ${({theme:e})=>e.colors.background};
    padding: 8px 16px;
    z-index: 1000;
    text-decoration: none;
    font-weight: 600;
    
    &:focus {
      top: 0;
    }
  }

  /* Screen reader only content */
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  /* High contrast mode support */
  @media (prefers-contrast: high) {
    * {
      border-color: currentColor !important;
    }
    
    button, a {
      text-decoration: underline;
    }
  }

  /* Ensure minimum touch target size */
  button, a, input, select, textarea {
    min-height: 44px;
    min-width: 44px;
  }

  /* Better text selection */
  ::selection {
    background: ${({theme:e})=>e.colors.accent};
    color: ${({theme:e})=>e.colors.background};
  }
`,Fi=o(g.span)`
  display: inline-block;
`;function Oi({children:e,intensity:t=1,className:i}){const{theme:n,prefersReducedMotion:r}=V();if(!n.animations.flicker||r)return a.jsx("span",{className:i,children:e});const s={animate:{opacity:[1,.8,1,.9,1,.85,1],textShadow:[n.typography.textShadow,`0 0 ${15*t}px rgba(255, 68, 68, 0.5)`,n.typography.textShadow,`0 0 ${8*t}px rgba(255, 68, 68, 0.3)`,n.typography.textShadow],transition:{duration:3+Math.random()*2,repeat:1/0,ease:"linear"}}};return a.jsx(Fi,{className:i,variants:s,animate:"animate",children:e})}const Pi=o.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
`,Mi=o(g.div)`
  position: absolute;
  width: ${({$size:e})=>e}px;
  height: ${({$size:e})=>e}px;
  border-radius: 50%;
  background: radial-gradient(
    circle at 30% 30%,
    rgba(255, 255, 255, 0.08) 0%,
    rgba(255, 255, 255, 0.02) 50%,
    transparent 70%
  );
  filter: blur(20px);
`;function Li(){const{theme:e,prefersReducedMotion:t}=V(),i=p.useMemo(()=>e.effects.ghostShapes?Array.from({length:5},(n,r)=>({id:r,x:Math.random()*100,y:Math.random()*100,size:100+Math.random()*200,duration:15+Math.random()*10})):[],[e.effects.ghostShapes]);return!e.effects.ghostShapes||i.length===0?null:a.jsx(Pi,{children:i.map(n=>a.jsx(Mi,{$size:n.size,initial:{x:`${n.x}vw`,y:`${n.y}vh`,opacity:0},animate:t?{opacity:.3}:{x:[`${n.x}vw`,`${n.x+10}vw`,`${n.x-5}vw`,`${n.x}vw`],y:[`${n.y}vh`,`${n.y-15}vh`,`${n.y+5}vh`,`${n.y}vh`],opacity:[.2,.4,.1,.2]},transition:{duration:n.duration,repeat:1/0,ease:"easeInOut"}},n.id))})}const Bi=o(g.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 1;
  overflow: hidden;
`,_i=o(g.div)`
  position: absolute;
  width: 200%;
  height: 200%;
  top: -50%;
  left: -50%;
  background: radial-gradient(
    ellipse at center,
    ${({theme:e})=>e.colors.fog} 0%,
    transparent 70%
  );
  opacity: ${({$layer:e})=>.3+e*.15};
`;function qi(){const{theme:e,prefersReducedMotion:t}=V();if(e.effects.fogOpacity===0)return null;const i={animate:n=>({x:t?0:[0,50,-30,0],y:t?0:[0,-30,20,0],scale:t?1:[1,1.1,.95,1],transition:{duration:20+n*5,repeat:1/0,ease:"linear"}})};return a.jsx(Bi,{initial:{opacity:0},animate:{opacity:e.effects.fogOpacity},transition:{duration:1},children:[0,1,2].map(n=>a.jsx(_i,{$layer:n,custom:n,variants:i,animate:"animate"},n))})}const Ni=o(g.div)`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow-x: hidden;
`,Hi=o.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  position: relative;
  z-index: 10;
`,Ui=o(g.header)`
  padding: 1.5rem 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 10;
`,Gi=o(g.h1)`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${({theme:e})=>e.colors.accent};
  text-shadow: ${({theme:e})=>e.typography.textShadow};
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`,Vi=o(g.p)`
  font-size: 1rem;
  color: ${({theme:e})=>e.colors.textMuted};
  margin-top: 0.5rem;
  text-align: center;
`;function Wi({children:e}){const{prefersReducedMotion:t}=V();return a.jsxs(Ni,{initial:{opacity:0},animate:{opacity:1},transition:{duration:t?0:.5},children:[a.jsx(Li,{}),a.jsx(qi,{}),a.jsx(Ui,{children:a.jsxs("div",{style:{textAlign:"center"},children:[a.jsx(Gi,{initial:{y:-20,opacity:0},animate:{y:0,opacity:1},transition:{delay:.2,duration:.5},children:"WTFee"}),a.jsx(Vi,{initial:{y:-10,opacity:0},animate:{y:0,opacity:1},transition:{delay:.4,duration:.5},children:"What The Fee — Demystify Your Medical Bills"})]})}),a.jsx(Hi,{children:e})]})}var Qt={exports:{}},Yi="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED",Ki=Yi,Xi=Ki;function ei(){}function ti(){}ti.resetWarningCache=ei;var Ji=function(){function e(n,r,s,l,c,u){if(u!==Xi){var x=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw x.name="Invariant Violation",x}}e.isRequired=e;function t(){return e}var i={array:e,bigint:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:t,element:e,elementType:e,instanceOf:t,node:e,objectOf:t,oneOf:t,oneOfType:t,shape:t,exact:t,checkPropTypes:ti,resetWarningCache:ei};return i.PropTypes=i,i};Qt.exports=Ji();var Zi=Qt.exports;const b=$i(Zi);function Z(e,t,i,n){function r(s){return s instanceof i?s:new i(function(l){l(s)})}return new(i||(i=Promise))(function(s,l){function c(m){try{x(n.next(m))}catch(h){l(h)}}function u(m){try{x(n.throw(m))}catch(h){l(h)}}function x(m){m.done?s(m.value):r(m.value).then(c,u)}x((n=n.apply(e,t||[])).next())})}const Qi=new Map([["1km","application/vnd.1000minds.decision-model+xml"],["3dml","text/vnd.in3d.3dml"],["3ds","image/x-3ds"],["3g2","video/3gpp2"],["3gp","video/3gp"],["3gpp","video/3gpp"],["3mf","model/3mf"],["7z","application/x-7z-compressed"],["7zip","application/x-7z-compressed"],["123","application/vnd.lotus-1-2-3"],["aab","application/x-authorware-bin"],["aac","audio/x-acc"],["aam","application/x-authorware-map"],["aas","application/x-authorware-seg"],["abw","application/x-abiword"],["ac","application/vnd.nokia.n-gage.ac+xml"],["ac3","audio/ac3"],["acc","application/vnd.americandynamics.acc"],["ace","application/x-ace-compressed"],["acu","application/vnd.acucobol"],["acutc","application/vnd.acucorp"],["adp","audio/adpcm"],["aep","application/vnd.audiograph"],["afm","application/x-font-type1"],["afp","application/vnd.ibm.modcap"],["ahead","application/vnd.ahead.space"],["ai","application/pdf"],["aif","audio/x-aiff"],["aifc","audio/x-aiff"],["aiff","audio/x-aiff"],["air","application/vnd.adobe.air-application-installer-package+zip"],["ait","application/vnd.dvb.ait"],["ami","application/vnd.amiga.ami"],["amr","audio/amr"],["apk","application/vnd.android.package-archive"],["apng","image/apng"],["appcache","text/cache-manifest"],["application","application/x-ms-application"],["apr","application/vnd.lotus-approach"],["arc","application/x-freearc"],["arj","application/x-arj"],["asc","application/pgp-signature"],["asf","video/x-ms-asf"],["asm","text/x-asm"],["aso","application/vnd.accpac.simply.aso"],["asx","video/x-ms-asf"],["atc","application/vnd.acucorp"],["atom","application/atom+xml"],["atomcat","application/atomcat+xml"],["atomdeleted","application/atomdeleted+xml"],["atomsvc","application/atomsvc+xml"],["atx","application/vnd.antix.game-component"],["au","audio/x-au"],["avi","video/x-msvideo"],["avif","image/avif"],["aw","application/applixware"],["azf","application/vnd.airzip.filesecure.azf"],["azs","application/vnd.airzip.filesecure.azs"],["azv","image/vnd.airzip.accelerator.azv"],["azw","application/vnd.amazon.ebook"],["b16","image/vnd.pco.b16"],["bat","application/x-msdownload"],["bcpio","application/x-bcpio"],["bdf","application/x-font-bdf"],["bdm","application/vnd.syncml.dm+wbxml"],["bdoc","application/x-bdoc"],["bed","application/vnd.realvnc.bed"],["bh2","application/vnd.fujitsu.oasysprs"],["bin","application/octet-stream"],["blb","application/x-blorb"],["blorb","application/x-blorb"],["bmi","application/vnd.bmi"],["bmml","application/vnd.balsamiq.bmml+xml"],["bmp","image/bmp"],["book","application/vnd.framemaker"],["box","application/vnd.previewsystems.box"],["boz","application/x-bzip2"],["bpk","application/octet-stream"],["bpmn","application/octet-stream"],["bsp","model/vnd.valve.source.compiled-map"],["btif","image/prs.btif"],["buffer","application/octet-stream"],["bz","application/x-bzip"],["bz2","application/x-bzip2"],["c","text/x-c"],["c4d","application/vnd.clonk.c4group"],["c4f","application/vnd.clonk.c4group"],["c4g","application/vnd.clonk.c4group"],["c4p","application/vnd.clonk.c4group"],["c4u","application/vnd.clonk.c4group"],["c11amc","application/vnd.cluetrust.cartomobile-config"],["c11amz","application/vnd.cluetrust.cartomobile-config-pkg"],["cab","application/vnd.ms-cab-compressed"],["caf","audio/x-caf"],["cap","application/vnd.tcpdump.pcap"],["car","application/vnd.curl.car"],["cat","application/vnd.ms-pki.seccat"],["cb7","application/x-cbr"],["cba","application/x-cbr"],["cbr","application/x-cbr"],["cbt","application/x-cbr"],["cbz","application/x-cbr"],["cc","text/x-c"],["cco","application/x-cocoa"],["cct","application/x-director"],["ccxml","application/ccxml+xml"],["cdbcmsg","application/vnd.contact.cmsg"],["cda","application/x-cdf"],["cdf","application/x-netcdf"],["cdfx","application/cdfx+xml"],["cdkey","application/vnd.mediastation.cdkey"],["cdmia","application/cdmi-capability"],["cdmic","application/cdmi-container"],["cdmid","application/cdmi-domain"],["cdmio","application/cdmi-object"],["cdmiq","application/cdmi-queue"],["cdr","application/cdr"],["cdx","chemical/x-cdx"],["cdxml","application/vnd.chemdraw+xml"],["cdy","application/vnd.cinderella"],["cer","application/pkix-cert"],["cfs","application/x-cfs-compressed"],["cgm","image/cgm"],["chat","application/x-chat"],["chm","application/vnd.ms-htmlhelp"],["chrt","application/vnd.kde.kchart"],["cif","chemical/x-cif"],["cii","application/vnd.anser-web-certificate-issue-initiation"],["cil","application/vnd.ms-artgalry"],["cjs","application/node"],["cla","application/vnd.claymore"],["class","application/octet-stream"],["clkk","application/vnd.crick.clicker.keyboard"],["clkp","application/vnd.crick.clicker.palette"],["clkt","application/vnd.crick.clicker.template"],["clkw","application/vnd.crick.clicker.wordbank"],["clkx","application/vnd.crick.clicker"],["clp","application/x-msclip"],["cmc","application/vnd.cosmocaller"],["cmdf","chemical/x-cmdf"],["cml","chemical/x-cml"],["cmp","application/vnd.yellowriver-custom-menu"],["cmx","image/x-cmx"],["cod","application/vnd.rim.cod"],["coffee","text/coffeescript"],["com","application/x-msdownload"],["conf","text/plain"],["cpio","application/x-cpio"],["cpp","text/x-c"],["cpt","application/mac-compactpro"],["crd","application/x-mscardfile"],["crl","application/pkix-crl"],["crt","application/x-x509-ca-cert"],["crx","application/x-chrome-extension"],["cryptonote","application/vnd.rig.cryptonote"],["csh","application/x-csh"],["csl","application/vnd.citationstyles.style+xml"],["csml","chemical/x-csml"],["csp","application/vnd.commonspace"],["csr","application/octet-stream"],["css","text/css"],["cst","application/x-director"],["csv","text/csv"],["cu","application/cu-seeme"],["curl","text/vnd.curl"],["cww","application/prs.cww"],["cxt","application/x-director"],["cxx","text/x-c"],["dae","model/vnd.collada+xml"],["daf","application/vnd.mobius.daf"],["dart","application/vnd.dart"],["dataless","application/vnd.fdsn.seed"],["davmount","application/davmount+xml"],["dbf","application/vnd.dbf"],["dbk","application/docbook+xml"],["dcr","application/x-director"],["dcurl","text/vnd.curl.dcurl"],["dd2","application/vnd.oma.dd2+xml"],["ddd","application/vnd.fujixerox.ddd"],["ddf","application/vnd.syncml.dmddf+xml"],["dds","image/vnd.ms-dds"],["deb","application/x-debian-package"],["def","text/plain"],["deploy","application/octet-stream"],["der","application/x-x509-ca-cert"],["dfac","application/vnd.dreamfactory"],["dgc","application/x-dgc-compressed"],["dic","text/x-c"],["dir","application/x-director"],["dis","application/vnd.mobius.dis"],["disposition-notification","message/disposition-notification"],["dist","application/octet-stream"],["distz","application/octet-stream"],["djv","image/vnd.djvu"],["djvu","image/vnd.djvu"],["dll","application/octet-stream"],["dmg","application/x-apple-diskimage"],["dmn","application/octet-stream"],["dmp","application/vnd.tcpdump.pcap"],["dms","application/octet-stream"],["dna","application/vnd.dna"],["doc","application/msword"],["docm","application/vnd.ms-word.template.macroEnabled.12"],["docx","application/vnd.openxmlformats-officedocument.wordprocessingml.document"],["dot","application/msword"],["dotm","application/vnd.ms-word.template.macroEnabled.12"],["dotx","application/vnd.openxmlformats-officedocument.wordprocessingml.template"],["dp","application/vnd.osgi.dp"],["dpg","application/vnd.dpgraph"],["dra","audio/vnd.dra"],["drle","image/dicom-rle"],["dsc","text/prs.lines.tag"],["dssc","application/dssc+der"],["dtb","application/x-dtbook+xml"],["dtd","application/xml-dtd"],["dts","audio/vnd.dts"],["dtshd","audio/vnd.dts.hd"],["dump","application/octet-stream"],["dvb","video/vnd.dvb.file"],["dvi","application/x-dvi"],["dwd","application/atsc-dwd+xml"],["dwf","model/vnd.dwf"],["dwg","image/vnd.dwg"],["dxf","image/vnd.dxf"],["dxp","application/vnd.spotfire.dxp"],["dxr","application/x-director"],["ear","application/java-archive"],["ecelp4800","audio/vnd.nuera.ecelp4800"],["ecelp7470","audio/vnd.nuera.ecelp7470"],["ecelp9600","audio/vnd.nuera.ecelp9600"],["ecma","application/ecmascript"],["edm","application/vnd.novadigm.edm"],["edx","application/vnd.novadigm.edx"],["efif","application/vnd.picsel"],["ei6","application/vnd.pg.osasli"],["elc","application/octet-stream"],["emf","image/emf"],["eml","message/rfc822"],["emma","application/emma+xml"],["emotionml","application/emotionml+xml"],["emz","application/x-msmetafile"],["eol","audio/vnd.digital-winds"],["eot","application/vnd.ms-fontobject"],["eps","application/postscript"],["epub","application/epub+zip"],["es","application/ecmascript"],["es3","application/vnd.eszigno3+xml"],["esa","application/vnd.osgi.subsystem"],["esf","application/vnd.epson.esf"],["et3","application/vnd.eszigno3+xml"],["etx","text/x-setext"],["eva","application/x-eva"],["evy","application/x-envoy"],["exe","application/octet-stream"],["exi","application/exi"],["exp","application/express"],["exr","image/aces"],["ext","application/vnd.novadigm.ext"],["ez","application/andrew-inset"],["ez2","application/vnd.ezpix-album"],["ez3","application/vnd.ezpix-package"],["f","text/x-fortran"],["f4v","video/mp4"],["f77","text/x-fortran"],["f90","text/x-fortran"],["fbs","image/vnd.fastbidsheet"],["fcdt","application/vnd.adobe.formscentral.fcdt"],["fcs","application/vnd.isac.fcs"],["fdf","application/vnd.fdf"],["fdt","application/fdt+xml"],["fe_launch","application/vnd.denovo.fcselayout-link"],["fg5","application/vnd.fujitsu.oasysgp"],["fgd","application/x-director"],["fh","image/x-freehand"],["fh4","image/x-freehand"],["fh5","image/x-freehand"],["fh7","image/x-freehand"],["fhc","image/x-freehand"],["fig","application/x-xfig"],["fits","image/fits"],["flac","audio/x-flac"],["fli","video/x-fli"],["flo","application/vnd.micrografx.flo"],["flv","video/x-flv"],["flw","application/vnd.kde.kivio"],["flx","text/vnd.fmi.flexstor"],["fly","text/vnd.fly"],["fm","application/vnd.framemaker"],["fnc","application/vnd.frogans.fnc"],["fo","application/vnd.software602.filler.form+xml"],["for","text/x-fortran"],["fpx","image/vnd.fpx"],["frame","application/vnd.framemaker"],["fsc","application/vnd.fsc.weblaunch"],["fst","image/vnd.fst"],["ftc","application/vnd.fluxtime.clip"],["fti","application/vnd.anser-web-funds-transfer-initiation"],["fvt","video/vnd.fvt"],["fxp","application/vnd.adobe.fxp"],["fxpl","application/vnd.adobe.fxp"],["fzs","application/vnd.fuzzysheet"],["g2w","application/vnd.geoplan"],["g3","image/g3fax"],["g3w","application/vnd.geospace"],["gac","application/vnd.groove-account"],["gam","application/x-tads"],["gbr","application/rpki-ghostbusters"],["gca","application/x-gca-compressed"],["gdl","model/vnd.gdl"],["gdoc","application/vnd.google-apps.document"],["geo","application/vnd.dynageo"],["geojson","application/geo+json"],["gex","application/vnd.geometry-explorer"],["ggb","application/vnd.geogebra.file"],["ggt","application/vnd.geogebra.tool"],["ghf","application/vnd.groove-help"],["gif","image/gif"],["gim","application/vnd.groove-identity-message"],["glb","model/gltf-binary"],["gltf","model/gltf+json"],["gml","application/gml+xml"],["gmx","application/vnd.gmx"],["gnumeric","application/x-gnumeric"],["gpg","application/gpg-keys"],["gph","application/vnd.flographit"],["gpx","application/gpx+xml"],["gqf","application/vnd.grafeq"],["gqs","application/vnd.grafeq"],["gram","application/srgs"],["gramps","application/x-gramps-xml"],["gre","application/vnd.geometry-explorer"],["grv","application/vnd.groove-injector"],["grxml","application/srgs+xml"],["gsf","application/x-font-ghostscript"],["gsheet","application/vnd.google-apps.spreadsheet"],["gslides","application/vnd.google-apps.presentation"],["gtar","application/x-gtar"],["gtm","application/vnd.groove-tool-message"],["gtw","model/vnd.gtw"],["gv","text/vnd.graphviz"],["gxf","application/gxf"],["gxt","application/vnd.geonext"],["gz","application/gzip"],["gzip","application/gzip"],["h","text/x-c"],["h261","video/h261"],["h263","video/h263"],["h264","video/h264"],["hal","application/vnd.hal+xml"],["hbci","application/vnd.hbci"],["hbs","text/x-handlebars-template"],["hdd","application/x-virtualbox-hdd"],["hdf","application/x-hdf"],["heic","image/heic"],["heics","image/heic-sequence"],["heif","image/heif"],["heifs","image/heif-sequence"],["hej2","image/hej2k"],["held","application/atsc-held+xml"],["hh","text/x-c"],["hjson","application/hjson"],["hlp","application/winhlp"],["hpgl","application/vnd.hp-hpgl"],["hpid","application/vnd.hp-hpid"],["hps","application/vnd.hp-hps"],["hqx","application/mac-binhex40"],["hsj2","image/hsj2"],["htc","text/x-component"],["htke","application/vnd.kenameaapp"],["htm","text/html"],["html","text/html"],["hvd","application/vnd.yamaha.hv-dic"],["hvp","application/vnd.yamaha.hv-voice"],["hvs","application/vnd.yamaha.hv-script"],["i2g","application/vnd.intergeo"],["icc","application/vnd.iccprofile"],["ice","x-conference/x-cooltalk"],["icm","application/vnd.iccprofile"],["ico","image/x-icon"],["ics","text/calendar"],["ief","image/ief"],["ifb","text/calendar"],["ifm","application/vnd.shana.informed.formdata"],["iges","model/iges"],["igl","application/vnd.igloader"],["igm","application/vnd.insors.igm"],["igs","model/iges"],["igx","application/vnd.micrografx.igx"],["iif","application/vnd.shana.informed.interchange"],["img","application/octet-stream"],["imp","application/vnd.accpac.simply.imp"],["ims","application/vnd.ms-ims"],["in","text/plain"],["ini","text/plain"],["ink","application/inkml+xml"],["inkml","application/inkml+xml"],["install","application/x-install-instructions"],["iota","application/vnd.astraea-software.iota"],["ipfix","application/ipfix"],["ipk","application/vnd.shana.informed.package"],["irm","application/vnd.ibm.rights-management"],["irp","application/vnd.irepository.package+xml"],["iso","application/x-iso9660-image"],["itp","application/vnd.shana.informed.formtemplate"],["its","application/its+xml"],["ivp","application/vnd.immervision-ivp"],["ivu","application/vnd.immervision-ivu"],["jad","text/vnd.sun.j2me.app-descriptor"],["jade","text/jade"],["jam","application/vnd.jam"],["jar","application/java-archive"],["jardiff","application/x-java-archive-diff"],["java","text/x-java-source"],["jhc","image/jphc"],["jisp","application/vnd.jisp"],["jls","image/jls"],["jlt","application/vnd.hp-jlyt"],["jng","image/x-jng"],["jnlp","application/x-java-jnlp-file"],["joda","application/vnd.joost.joda-archive"],["jp2","image/jp2"],["jpe","image/jpeg"],["jpeg","image/jpeg"],["jpf","image/jpx"],["jpg","image/jpeg"],["jpg2","image/jp2"],["jpgm","video/jpm"],["jpgv","video/jpeg"],["jph","image/jph"],["jpm","video/jpm"],["jpx","image/jpx"],["js","application/javascript"],["json","application/json"],["json5","application/json5"],["jsonld","application/ld+json"],["jsonl","application/jsonl"],["jsonml","application/jsonml+json"],["jsx","text/jsx"],["jxr","image/jxr"],["jxra","image/jxra"],["jxrs","image/jxrs"],["jxs","image/jxs"],["jxsc","image/jxsc"],["jxsi","image/jxsi"],["jxss","image/jxss"],["kar","audio/midi"],["karbon","application/vnd.kde.karbon"],["kdb","application/octet-stream"],["kdbx","application/x-keepass2"],["key","application/x-iwork-keynote-sffkey"],["kfo","application/vnd.kde.kformula"],["kia","application/vnd.kidspiration"],["kml","application/vnd.google-earth.kml+xml"],["kmz","application/vnd.google-earth.kmz"],["kne","application/vnd.kinar"],["knp","application/vnd.kinar"],["kon","application/vnd.kde.kontour"],["kpr","application/vnd.kde.kpresenter"],["kpt","application/vnd.kde.kpresenter"],["kpxx","application/vnd.ds-keypoint"],["ksp","application/vnd.kde.kspread"],["ktr","application/vnd.kahootz"],["ktx","image/ktx"],["ktx2","image/ktx2"],["ktz","application/vnd.kahootz"],["kwd","application/vnd.kde.kword"],["kwt","application/vnd.kde.kword"],["lasxml","application/vnd.las.las+xml"],["latex","application/x-latex"],["lbd","application/vnd.llamagraphics.life-balance.desktop"],["lbe","application/vnd.llamagraphics.life-balance.exchange+xml"],["les","application/vnd.hhe.lesson-player"],["less","text/less"],["lgr","application/lgr+xml"],["lha","application/octet-stream"],["link66","application/vnd.route66.link66+xml"],["list","text/plain"],["list3820","application/vnd.ibm.modcap"],["listafp","application/vnd.ibm.modcap"],["litcoffee","text/coffeescript"],["lnk","application/x-ms-shortcut"],["log","text/plain"],["lostxml","application/lost+xml"],["lrf","application/octet-stream"],["lrm","application/vnd.ms-lrm"],["ltf","application/vnd.frogans.ltf"],["lua","text/x-lua"],["luac","application/x-lua-bytecode"],["lvp","audio/vnd.lucent.voice"],["lwp","application/vnd.lotus-wordpro"],["lzh","application/octet-stream"],["m1v","video/mpeg"],["m2a","audio/mpeg"],["m2v","video/mpeg"],["m3a","audio/mpeg"],["m3u","text/plain"],["m3u8","application/vnd.apple.mpegurl"],["m4a","audio/x-m4a"],["m4p","application/mp4"],["m4s","video/iso.segment"],["m4u","application/vnd.mpegurl"],["m4v","video/x-m4v"],["m13","application/x-msmediaview"],["m14","application/x-msmediaview"],["m21","application/mp21"],["ma","application/mathematica"],["mads","application/mads+xml"],["maei","application/mmt-aei+xml"],["mag","application/vnd.ecowin.chart"],["maker","application/vnd.framemaker"],["man","text/troff"],["manifest","text/cache-manifest"],["map","application/json"],["mar","application/octet-stream"],["markdown","text/markdown"],["mathml","application/mathml+xml"],["mb","application/mathematica"],["mbk","application/vnd.mobius.mbk"],["mbox","application/mbox"],["mc1","application/vnd.medcalcdata"],["mcd","application/vnd.mcd"],["mcurl","text/vnd.curl.mcurl"],["md","text/markdown"],["mdb","application/x-msaccess"],["mdi","image/vnd.ms-modi"],["mdx","text/mdx"],["me","text/troff"],["mesh","model/mesh"],["meta4","application/metalink4+xml"],["metalink","application/metalink+xml"],["mets","application/mets+xml"],["mfm","application/vnd.mfmp"],["mft","application/rpki-manifest"],["mgp","application/vnd.osgeo.mapguide.package"],["mgz","application/vnd.proteus.magazine"],["mid","audio/midi"],["midi","audio/midi"],["mie","application/x-mie"],["mif","application/vnd.mif"],["mime","message/rfc822"],["mj2","video/mj2"],["mjp2","video/mj2"],["mjs","application/javascript"],["mk3d","video/x-matroska"],["mka","audio/x-matroska"],["mkd","text/x-markdown"],["mks","video/x-matroska"],["mkv","video/x-matroska"],["mlp","application/vnd.dolby.mlp"],["mmd","application/vnd.chipnuts.karaoke-mmd"],["mmf","application/vnd.smaf"],["mml","text/mathml"],["mmr","image/vnd.fujixerox.edmics-mmr"],["mng","video/x-mng"],["mny","application/x-msmoney"],["mobi","application/x-mobipocket-ebook"],["mods","application/mods+xml"],["mov","video/quicktime"],["movie","video/x-sgi-movie"],["mp2","audio/mpeg"],["mp2a","audio/mpeg"],["mp3","audio/mpeg"],["mp4","video/mp4"],["mp4a","audio/mp4"],["mp4s","application/mp4"],["mp4v","video/mp4"],["mp21","application/mp21"],["mpc","application/vnd.mophun.certificate"],["mpd","application/dash+xml"],["mpe","video/mpeg"],["mpeg","video/mpeg"],["mpg","video/mpeg"],["mpg4","video/mp4"],["mpga","audio/mpeg"],["mpkg","application/vnd.apple.installer+xml"],["mpm","application/vnd.blueice.multipass"],["mpn","application/vnd.mophun.application"],["mpp","application/vnd.ms-project"],["mpt","application/vnd.ms-project"],["mpy","application/vnd.ibm.minipay"],["mqy","application/vnd.mobius.mqy"],["mrc","application/marc"],["mrcx","application/marcxml+xml"],["ms","text/troff"],["mscml","application/mediaservercontrol+xml"],["mseed","application/vnd.fdsn.mseed"],["mseq","application/vnd.mseq"],["msf","application/vnd.epson.msf"],["msg","application/vnd.ms-outlook"],["msh","model/mesh"],["msi","application/x-msdownload"],["msl","application/vnd.mobius.msl"],["msm","application/octet-stream"],["msp","application/octet-stream"],["msty","application/vnd.muvee.style"],["mtl","model/mtl"],["mts","model/vnd.mts"],["mus","application/vnd.musician"],["musd","application/mmt-usd+xml"],["musicxml","application/vnd.recordare.musicxml+xml"],["mvb","application/x-msmediaview"],["mvt","application/vnd.mapbox-vector-tile"],["mwf","application/vnd.mfer"],["mxf","application/mxf"],["mxl","application/vnd.recordare.musicxml"],["mxmf","audio/mobile-xmf"],["mxml","application/xv+xml"],["mxs","application/vnd.triscape.mxs"],["mxu","video/vnd.mpegurl"],["n-gage","application/vnd.nokia.n-gage.symbian.install"],["n3","text/n3"],["nb","application/mathematica"],["nbp","application/vnd.wolfram.player"],["nc","application/x-netcdf"],["ncx","application/x-dtbncx+xml"],["nfo","text/x-nfo"],["ngdat","application/vnd.nokia.n-gage.data"],["nitf","application/vnd.nitf"],["nlu","application/vnd.neurolanguage.nlu"],["nml","application/vnd.enliven"],["nnd","application/vnd.noblenet-directory"],["nns","application/vnd.noblenet-sealer"],["nnw","application/vnd.noblenet-web"],["npx","image/vnd.net-fpx"],["nq","application/n-quads"],["nsc","application/x-conference"],["nsf","application/vnd.lotus-notes"],["nt","application/n-triples"],["ntf","application/vnd.nitf"],["numbers","application/x-iwork-numbers-sffnumbers"],["nzb","application/x-nzb"],["oa2","application/vnd.fujitsu.oasys2"],["oa3","application/vnd.fujitsu.oasys3"],["oas","application/vnd.fujitsu.oasys"],["obd","application/x-msbinder"],["obgx","application/vnd.openblox.game+xml"],["obj","model/obj"],["oda","application/oda"],["odb","application/vnd.oasis.opendocument.database"],["odc","application/vnd.oasis.opendocument.chart"],["odf","application/vnd.oasis.opendocument.formula"],["odft","application/vnd.oasis.opendocument.formula-template"],["odg","application/vnd.oasis.opendocument.graphics"],["odi","application/vnd.oasis.opendocument.image"],["odm","application/vnd.oasis.opendocument.text-master"],["odp","application/vnd.oasis.opendocument.presentation"],["ods","application/vnd.oasis.opendocument.spreadsheet"],["odt","application/vnd.oasis.opendocument.text"],["oga","audio/ogg"],["ogex","model/vnd.opengex"],["ogg","audio/ogg"],["ogv","video/ogg"],["ogx","application/ogg"],["omdoc","application/omdoc+xml"],["onepkg","application/onenote"],["onetmp","application/onenote"],["onetoc","application/onenote"],["onetoc2","application/onenote"],["opf","application/oebps-package+xml"],["opml","text/x-opml"],["oprc","application/vnd.palm"],["opus","audio/ogg"],["org","text/x-org"],["osf","application/vnd.yamaha.openscoreformat"],["osfpvg","application/vnd.yamaha.openscoreformat.osfpvg+xml"],["osm","application/vnd.openstreetmap.data+xml"],["otc","application/vnd.oasis.opendocument.chart-template"],["otf","font/otf"],["otg","application/vnd.oasis.opendocument.graphics-template"],["oth","application/vnd.oasis.opendocument.text-web"],["oti","application/vnd.oasis.opendocument.image-template"],["otp","application/vnd.oasis.opendocument.presentation-template"],["ots","application/vnd.oasis.opendocument.spreadsheet-template"],["ott","application/vnd.oasis.opendocument.text-template"],["ova","application/x-virtualbox-ova"],["ovf","application/x-virtualbox-ovf"],["owl","application/rdf+xml"],["oxps","application/oxps"],["oxt","application/vnd.openofficeorg.extension"],["p","text/x-pascal"],["p7a","application/x-pkcs7-signature"],["p7b","application/x-pkcs7-certificates"],["p7c","application/pkcs7-mime"],["p7m","application/pkcs7-mime"],["p7r","application/x-pkcs7-certreqresp"],["p7s","application/pkcs7-signature"],["p8","application/pkcs8"],["p10","application/x-pkcs10"],["p12","application/x-pkcs12"],["pac","application/x-ns-proxy-autoconfig"],["pages","application/x-iwork-pages-sffpages"],["pas","text/x-pascal"],["paw","application/vnd.pawaafile"],["pbd","application/vnd.powerbuilder6"],["pbm","image/x-portable-bitmap"],["pcap","application/vnd.tcpdump.pcap"],["pcf","application/x-font-pcf"],["pcl","application/vnd.hp-pcl"],["pclxl","application/vnd.hp-pclxl"],["pct","image/x-pict"],["pcurl","application/vnd.curl.pcurl"],["pcx","image/x-pcx"],["pdb","application/x-pilot"],["pde","text/x-processing"],["pdf","application/pdf"],["pem","application/x-x509-user-cert"],["pfa","application/x-font-type1"],["pfb","application/x-font-type1"],["pfm","application/x-font-type1"],["pfr","application/font-tdpfr"],["pfx","application/x-pkcs12"],["pgm","image/x-portable-graymap"],["pgn","application/x-chess-pgn"],["pgp","application/pgp"],["php","application/x-httpd-php"],["php3","application/x-httpd-php"],["php4","application/x-httpd-php"],["phps","application/x-httpd-php-source"],["phtml","application/x-httpd-php"],["pic","image/x-pict"],["pkg","application/octet-stream"],["pki","application/pkixcmp"],["pkipath","application/pkix-pkipath"],["pkpass","application/vnd.apple.pkpass"],["pl","application/x-perl"],["plb","application/vnd.3gpp.pic-bw-large"],["plc","application/vnd.mobius.plc"],["plf","application/vnd.pocketlearn"],["pls","application/pls+xml"],["pm","application/x-perl"],["pml","application/vnd.ctc-posml"],["png","image/png"],["pnm","image/x-portable-anymap"],["portpkg","application/vnd.macports.portpkg"],["pot","application/vnd.ms-powerpoint"],["potm","application/vnd.ms-powerpoint.presentation.macroEnabled.12"],["potx","application/vnd.openxmlformats-officedocument.presentationml.template"],["ppa","application/vnd.ms-powerpoint"],["ppam","application/vnd.ms-powerpoint.addin.macroEnabled.12"],["ppd","application/vnd.cups-ppd"],["ppm","image/x-portable-pixmap"],["pps","application/vnd.ms-powerpoint"],["ppsm","application/vnd.ms-powerpoint.slideshow.macroEnabled.12"],["ppsx","application/vnd.openxmlformats-officedocument.presentationml.slideshow"],["ppt","application/powerpoint"],["pptm","application/vnd.ms-powerpoint.presentation.macroEnabled.12"],["pptx","application/vnd.openxmlformats-officedocument.presentationml.presentation"],["pqa","application/vnd.palm"],["prc","application/x-pilot"],["pre","application/vnd.lotus-freelance"],["prf","application/pics-rules"],["provx","application/provenance+xml"],["ps","application/postscript"],["psb","application/vnd.3gpp.pic-bw-small"],["psd","application/x-photoshop"],["psf","application/x-font-linux-psf"],["pskcxml","application/pskc+xml"],["pti","image/prs.pti"],["ptid","application/vnd.pvi.ptid1"],["pub","application/x-mspublisher"],["pvb","application/vnd.3gpp.pic-bw-var"],["pwn","application/vnd.3m.post-it-notes"],["pya","audio/vnd.ms-playready.media.pya"],["pyv","video/vnd.ms-playready.media.pyv"],["qam","application/vnd.epson.quickanime"],["qbo","application/vnd.intu.qbo"],["qfx","application/vnd.intu.qfx"],["qps","application/vnd.publishare-delta-tree"],["qt","video/quicktime"],["qwd","application/vnd.quark.quarkxpress"],["qwt","application/vnd.quark.quarkxpress"],["qxb","application/vnd.quark.quarkxpress"],["qxd","application/vnd.quark.quarkxpress"],["qxl","application/vnd.quark.quarkxpress"],["qxt","application/vnd.quark.quarkxpress"],["ra","audio/x-realaudio"],["ram","audio/x-pn-realaudio"],["raml","application/raml+yaml"],["rapd","application/route-apd+xml"],["rar","application/x-rar"],["ras","image/x-cmu-raster"],["rcprofile","application/vnd.ipunplugged.rcprofile"],["rdf","application/rdf+xml"],["rdz","application/vnd.data-vision.rdz"],["relo","application/p2p-overlay+xml"],["rep","application/vnd.businessobjects"],["res","application/x-dtbresource+xml"],["rgb","image/x-rgb"],["rif","application/reginfo+xml"],["rip","audio/vnd.rip"],["ris","application/x-research-info-systems"],["rl","application/resource-lists+xml"],["rlc","image/vnd.fujixerox.edmics-rlc"],["rld","application/resource-lists-diff+xml"],["rm","audio/x-pn-realaudio"],["rmi","audio/midi"],["rmp","audio/x-pn-realaudio-plugin"],["rms","application/vnd.jcp.javame.midlet-rms"],["rmvb","application/vnd.rn-realmedia-vbr"],["rnc","application/relax-ng-compact-syntax"],["rng","application/xml"],["roa","application/rpki-roa"],["roff","text/troff"],["rp9","application/vnd.cloanto.rp9"],["rpm","audio/x-pn-realaudio-plugin"],["rpss","application/vnd.nokia.radio-presets"],["rpst","application/vnd.nokia.radio-preset"],["rq","application/sparql-query"],["rs","application/rls-services+xml"],["rsa","application/x-pkcs7"],["rsat","application/atsc-rsat+xml"],["rsd","application/rsd+xml"],["rsheet","application/urc-ressheet+xml"],["rss","application/rss+xml"],["rtf","text/rtf"],["rtx","text/richtext"],["run","application/x-makeself"],["rusd","application/route-usd+xml"],["rv","video/vnd.rn-realvideo"],["s","text/x-asm"],["s3m","audio/s3m"],["saf","application/vnd.yamaha.smaf-audio"],["sass","text/x-sass"],["sbml","application/sbml+xml"],["sc","application/vnd.ibm.secure-container"],["scd","application/x-msschedule"],["scm","application/vnd.lotus-screencam"],["scq","application/scvp-cv-request"],["scs","application/scvp-cv-response"],["scss","text/x-scss"],["scurl","text/vnd.curl.scurl"],["sda","application/vnd.stardivision.draw"],["sdc","application/vnd.stardivision.calc"],["sdd","application/vnd.stardivision.impress"],["sdkd","application/vnd.solent.sdkm+xml"],["sdkm","application/vnd.solent.sdkm+xml"],["sdp","application/sdp"],["sdw","application/vnd.stardivision.writer"],["sea","application/octet-stream"],["see","application/vnd.seemail"],["seed","application/vnd.fdsn.seed"],["sema","application/vnd.sema"],["semd","application/vnd.semd"],["semf","application/vnd.semf"],["senmlx","application/senml+xml"],["sensmlx","application/sensml+xml"],["ser","application/java-serialized-object"],["setpay","application/set-payment-initiation"],["setreg","application/set-registration-initiation"],["sfd-hdstx","application/vnd.hydrostatix.sof-data"],["sfs","application/vnd.spotfire.sfs"],["sfv","text/x-sfv"],["sgi","image/sgi"],["sgl","application/vnd.stardivision.writer-global"],["sgm","text/sgml"],["sgml","text/sgml"],["sh","application/x-sh"],["shar","application/x-shar"],["shex","text/shex"],["shf","application/shf+xml"],["shtml","text/html"],["sid","image/x-mrsid-image"],["sieve","application/sieve"],["sig","application/pgp-signature"],["sil","audio/silk"],["silo","model/mesh"],["sis","application/vnd.symbian.install"],["sisx","application/vnd.symbian.install"],["sit","application/x-stuffit"],["sitx","application/x-stuffitx"],["siv","application/sieve"],["skd","application/vnd.koan"],["skm","application/vnd.koan"],["skp","application/vnd.koan"],["skt","application/vnd.koan"],["sldm","application/vnd.ms-powerpoint.slide.macroenabled.12"],["sldx","application/vnd.openxmlformats-officedocument.presentationml.slide"],["slim","text/slim"],["slm","text/slim"],["sls","application/route-s-tsid+xml"],["slt","application/vnd.epson.salt"],["sm","application/vnd.stepmania.stepchart"],["smf","application/vnd.stardivision.math"],["smi","application/smil"],["smil","application/smil"],["smv","video/x-smv"],["smzip","application/vnd.stepmania.package"],["snd","audio/basic"],["snf","application/x-font-snf"],["so","application/octet-stream"],["spc","application/x-pkcs7-certificates"],["spdx","text/spdx"],["spf","application/vnd.yamaha.smaf-phrase"],["spl","application/x-futuresplash"],["spot","text/vnd.in3d.spot"],["spp","application/scvp-vp-response"],["spq","application/scvp-vp-request"],["spx","audio/ogg"],["sql","application/x-sql"],["src","application/x-wais-source"],["srt","application/x-subrip"],["sru","application/sru+xml"],["srx","application/sparql-results+xml"],["ssdl","application/ssdl+xml"],["sse","application/vnd.kodak-descriptor"],["ssf","application/vnd.epson.ssf"],["ssml","application/ssml+xml"],["sst","application/octet-stream"],["st","application/vnd.sailingtracker.track"],["stc","application/vnd.sun.xml.calc.template"],["std","application/vnd.sun.xml.draw.template"],["stf","application/vnd.wt.stf"],["sti","application/vnd.sun.xml.impress.template"],["stk","application/hyperstudio"],["stl","model/stl"],["stpx","model/step+xml"],["stpxz","model/step-xml+zip"],["stpz","model/step+zip"],["str","application/vnd.pg.format"],["stw","application/vnd.sun.xml.writer.template"],["styl","text/stylus"],["stylus","text/stylus"],["sub","text/vnd.dvb.subtitle"],["sus","application/vnd.sus-calendar"],["susp","application/vnd.sus-calendar"],["sv4cpio","application/x-sv4cpio"],["sv4crc","application/x-sv4crc"],["svc","application/vnd.dvb.service"],["svd","application/vnd.svd"],["svg","image/svg+xml"],["svgz","image/svg+xml"],["swa","application/x-director"],["swf","application/x-shockwave-flash"],["swi","application/vnd.aristanetworks.swi"],["swidtag","application/swid+xml"],["sxc","application/vnd.sun.xml.calc"],["sxd","application/vnd.sun.xml.draw"],["sxg","application/vnd.sun.xml.writer.global"],["sxi","application/vnd.sun.xml.impress"],["sxm","application/vnd.sun.xml.math"],["sxw","application/vnd.sun.xml.writer"],["t","text/troff"],["t3","application/x-t3vm-image"],["t38","image/t38"],["taglet","application/vnd.mynfc"],["tao","application/vnd.tao.intent-module-archive"],["tap","image/vnd.tencent.tap"],["tar","application/x-tar"],["tcap","application/vnd.3gpp2.tcap"],["tcl","application/x-tcl"],["td","application/urc-targetdesc+xml"],["teacher","application/vnd.smart.teacher"],["tei","application/tei+xml"],["teicorpus","application/tei+xml"],["tex","application/x-tex"],["texi","application/x-texinfo"],["texinfo","application/x-texinfo"],["text","text/plain"],["tfi","application/thraud+xml"],["tfm","application/x-tex-tfm"],["tfx","image/tiff-fx"],["tga","image/x-tga"],["tgz","application/x-tar"],["thmx","application/vnd.ms-officetheme"],["tif","image/tiff"],["tiff","image/tiff"],["tk","application/x-tcl"],["tmo","application/vnd.tmobile-livetv"],["toml","application/toml"],["torrent","application/x-bittorrent"],["tpl","application/vnd.groove-tool-template"],["tpt","application/vnd.trid.tpt"],["tr","text/troff"],["tra","application/vnd.trueapp"],["trig","application/trig"],["trm","application/x-msterminal"],["ts","video/mp2t"],["tsd","application/timestamped-data"],["tsv","text/tab-separated-values"],["ttc","font/collection"],["ttf","font/ttf"],["ttl","text/turtle"],["ttml","application/ttml+xml"],["twd","application/vnd.simtech-mindmapper"],["twds","application/vnd.simtech-mindmapper"],["txd","application/vnd.genomatix.tuxedo"],["txf","application/vnd.mobius.txf"],["txt","text/plain"],["u8dsn","message/global-delivery-status"],["u8hdr","message/global-headers"],["u8mdn","message/global-disposition-notification"],["u8msg","message/global"],["u32","application/x-authorware-bin"],["ubj","application/ubjson"],["udeb","application/x-debian-package"],["ufd","application/vnd.ufdl"],["ufdl","application/vnd.ufdl"],["ulx","application/x-glulx"],["umj","application/vnd.umajin"],["unityweb","application/vnd.unity"],["uoml","application/vnd.uoml+xml"],["uri","text/uri-list"],["uris","text/uri-list"],["urls","text/uri-list"],["usdz","model/vnd.usdz+zip"],["ustar","application/x-ustar"],["utz","application/vnd.uiq.theme"],["uu","text/x-uuencode"],["uva","audio/vnd.dece.audio"],["uvd","application/vnd.dece.data"],["uvf","application/vnd.dece.data"],["uvg","image/vnd.dece.graphic"],["uvh","video/vnd.dece.hd"],["uvi","image/vnd.dece.graphic"],["uvm","video/vnd.dece.mobile"],["uvp","video/vnd.dece.pd"],["uvs","video/vnd.dece.sd"],["uvt","application/vnd.dece.ttml+xml"],["uvu","video/vnd.uvvu.mp4"],["uvv","video/vnd.dece.video"],["uvva","audio/vnd.dece.audio"],["uvvd","application/vnd.dece.data"],["uvvf","application/vnd.dece.data"],["uvvg","image/vnd.dece.graphic"],["uvvh","video/vnd.dece.hd"],["uvvi","image/vnd.dece.graphic"],["uvvm","video/vnd.dece.mobile"],["uvvp","video/vnd.dece.pd"],["uvvs","video/vnd.dece.sd"],["uvvt","application/vnd.dece.ttml+xml"],["uvvu","video/vnd.uvvu.mp4"],["uvvv","video/vnd.dece.video"],["uvvx","application/vnd.dece.unspecified"],["uvvz","application/vnd.dece.zip"],["uvx","application/vnd.dece.unspecified"],["uvz","application/vnd.dece.zip"],["vbox","application/x-virtualbox-vbox"],["vbox-extpack","application/x-virtualbox-vbox-extpack"],["vcard","text/vcard"],["vcd","application/x-cdlink"],["vcf","text/x-vcard"],["vcg","application/vnd.groove-vcard"],["vcs","text/x-vcalendar"],["vcx","application/vnd.vcx"],["vdi","application/x-virtualbox-vdi"],["vds","model/vnd.sap.vds"],["vhd","application/x-virtualbox-vhd"],["vis","application/vnd.visionary"],["viv","video/vnd.vivo"],["vlc","application/videolan"],["vmdk","application/x-virtualbox-vmdk"],["vob","video/x-ms-vob"],["vor","application/vnd.stardivision.writer"],["vox","application/x-authorware-bin"],["vrml","model/vrml"],["vsd","application/vnd.visio"],["vsf","application/vnd.vsf"],["vss","application/vnd.visio"],["vst","application/vnd.visio"],["vsw","application/vnd.visio"],["vtf","image/vnd.valve.source.texture"],["vtt","text/vtt"],["vtu","model/vnd.vtu"],["vxml","application/voicexml+xml"],["w3d","application/x-director"],["wad","application/x-doom"],["wadl","application/vnd.sun.wadl+xml"],["war","application/java-archive"],["wasm","application/wasm"],["wav","audio/x-wav"],["wax","audio/x-ms-wax"],["wbmp","image/vnd.wap.wbmp"],["wbs","application/vnd.criticaltools.wbs+xml"],["wbxml","application/wbxml"],["wcm","application/vnd.ms-works"],["wdb","application/vnd.ms-works"],["wdp","image/vnd.ms-photo"],["weba","audio/webm"],["webapp","application/x-web-app-manifest+json"],["webm","video/webm"],["webmanifest","application/manifest+json"],["webp","image/webp"],["wg","application/vnd.pmi.widget"],["wgt","application/widget"],["wks","application/vnd.ms-works"],["wm","video/x-ms-wm"],["wma","audio/x-ms-wma"],["wmd","application/x-ms-wmd"],["wmf","image/wmf"],["wml","text/vnd.wap.wml"],["wmlc","application/wmlc"],["wmls","text/vnd.wap.wmlscript"],["wmlsc","application/vnd.wap.wmlscriptc"],["wmv","video/x-ms-wmv"],["wmx","video/x-ms-wmx"],["wmz","application/x-msmetafile"],["woff","font/woff"],["woff2","font/woff2"],["word","application/msword"],["wpd","application/vnd.wordperfect"],["wpl","application/vnd.ms-wpl"],["wps","application/vnd.ms-works"],["wqd","application/vnd.wqd"],["wri","application/x-mswrite"],["wrl","model/vrml"],["wsc","message/vnd.wfa.wsc"],["wsdl","application/wsdl+xml"],["wspolicy","application/wspolicy+xml"],["wtb","application/vnd.webturbo"],["wvx","video/x-ms-wvx"],["x3d","model/x3d+xml"],["x3db","model/x3d+fastinfoset"],["x3dbz","model/x3d+binary"],["x3dv","model/x3d-vrml"],["x3dvz","model/x3d+vrml"],["x3dz","model/x3d+xml"],["x32","application/x-authorware-bin"],["x_b","model/vnd.parasolid.transmit.binary"],["x_t","model/vnd.parasolid.transmit.text"],["xaml","application/xaml+xml"],["xap","application/x-silverlight-app"],["xar","application/vnd.xara"],["xav","application/xcap-att+xml"],["xbap","application/x-ms-xbap"],["xbd","application/vnd.fujixerox.docuworks.binder"],["xbm","image/x-xbitmap"],["xca","application/xcap-caps+xml"],["xcs","application/calendar+xml"],["xdf","application/xcap-diff+xml"],["xdm","application/vnd.syncml.dm+xml"],["xdp","application/vnd.adobe.xdp+xml"],["xdssc","application/dssc+xml"],["xdw","application/vnd.fujixerox.docuworks"],["xel","application/xcap-el+xml"],["xenc","application/xenc+xml"],["xer","application/patch-ops-error+xml"],["xfdf","application/vnd.adobe.xfdf"],["xfdl","application/vnd.xfdl"],["xht","application/xhtml+xml"],["xhtml","application/xhtml+xml"],["xhvml","application/xv+xml"],["xif","image/vnd.xiff"],["xl","application/excel"],["xla","application/vnd.ms-excel"],["xlam","application/vnd.ms-excel.addin.macroEnabled.12"],["xlc","application/vnd.ms-excel"],["xlf","application/xliff+xml"],["xlm","application/vnd.ms-excel"],["xls","application/vnd.ms-excel"],["xlsb","application/vnd.ms-excel.sheet.binary.macroEnabled.12"],["xlsm","application/vnd.ms-excel.sheet.macroEnabled.12"],["xlsx","application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"],["xlt","application/vnd.ms-excel"],["xltm","application/vnd.ms-excel.template.macroEnabled.12"],["xltx","application/vnd.openxmlformats-officedocument.spreadsheetml.template"],["xlw","application/vnd.ms-excel"],["xm","audio/xm"],["xml","application/xml"],["xns","application/xcap-ns+xml"],["xo","application/vnd.olpc-sugar"],["xop","application/xop+xml"],["xpi","application/x-xpinstall"],["xpl","application/xproc+xml"],["xpm","image/x-xpixmap"],["xpr","application/vnd.is-xpr"],["xps","application/vnd.ms-xpsdocument"],["xpw","application/vnd.intercon.formnet"],["xpx","application/vnd.intercon.formnet"],["xsd","application/xml"],["xsl","application/xml"],["xslt","application/xslt+xml"],["xsm","application/vnd.syncml+xml"],["xspf","application/xspf+xml"],["xul","application/vnd.mozilla.xul+xml"],["xvm","application/xv+xml"],["xvml","application/xv+xml"],["xwd","image/x-xwindowdump"],["xyz","chemical/x-xyz"],["xz","application/x-xz"],["yaml","text/yaml"],["yang","application/yang"],["yin","application/yin+xml"],["yml","text/yaml"],["ymp","text/x-suse-ymp"],["z","application/x-compress"],["z1","application/x-zmachine"],["z2","application/x-zmachine"],["z3","application/x-zmachine"],["z4","application/x-zmachine"],["z5","application/x-zmachine"],["z6","application/x-zmachine"],["z7","application/x-zmachine"],["z8","application/x-zmachine"],["zaz","application/vnd.zzazz.deck+xml"],["zip","application/zip"],["zir","application/vnd.zul"],["zirz","application/vnd.zul"],["zmm","application/vnd.handheld-entertainment+xml"],["zsh","text/x-scriptzsh"]]);function se(e,t,i){const n=ea(e),{webkitRelativePath:r}=e,s=typeof t=="string"?t:typeof r=="string"&&r.length>0?r:`./${e.name}`;return typeof n.path!="string"&&ht(n,"path",s),ht(n,"relativePath",s),n}function ea(e){const{name:t}=e;if(t&&t.lastIndexOf(".")!==-1&&!e.type){const n=t.split(".").pop().toLowerCase(),r=Qi.get(n);r&&Object.defineProperty(e,"type",{value:r,writable:!1,configurable:!1,enumerable:!0})}return e}function ht(e,t,i){Object.defineProperty(e,t,{value:i,writable:!1,configurable:!1,enumerable:!0})}const ta=[".DS_Store","Thumbs.db"];function ia(e){return Z(this,void 0,void 0,function*(){return $e(e)&&aa(e.dataTransfer)?sa(e.dataTransfer,e.type):na(e)?oa(e):Array.isArray(e)&&e.every(t=>"getFile"in t&&typeof t.getFile=="function")?ra(e):[]})}function aa(e){return $e(e)}function na(e){return $e(e)&&$e(e.target)}function $e(e){return typeof e=="object"&&e!==null}function oa(e){return Qe(e.target.files).map(t=>se(t))}function ra(e){return Z(this,void 0,void 0,function*(){return(yield Promise.all(e.map(i=>i.getFile()))).map(i=>se(i))})}function sa(e,t){return Z(this,void 0,void 0,function*(){if(e.items){const i=Qe(e.items).filter(r=>r.kind==="file");if(t!=="drop")return i;const n=yield Promise.all(i.map(ca));return vt(ii(n))}return vt(Qe(e.files).map(i=>se(i)))})}function vt(e){return e.filter(t=>ta.indexOf(t.name)===-1)}function Qe(e){if(e===null)return[];const t=[];for(let i=0;i<e.length;i++){const n=e[i];t.push(n)}return t}function ca(e){if(typeof e.webkitGetAsEntry!="function")return bt(e);const t=e.webkitGetAsEntry();return t&&t.isDirectory?ai(t):bt(e,t)}function ii(e){return e.reduce((t,i)=>[...t,...Array.isArray(i)?ii(i):[i]],[])}function bt(e,t){return Z(this,void 0,void 0,function*(){var i;if(globalThis.isSecureContext&&typeof e.getAsFileSystemHandle=="function"){const s=yield e.getAsFileSystemHandle();if(s===null)throw new Error(`${e} is not a File`);if(s!==void 0){const l=yield s.getFile();return l.handle=s,se(l)}}const n=e.getAsFile();if(!n)throw new Error(`${e} is not a File`);return se(n,(i=t==null?void 0:t.fullPath)!==null&&i!==void 0?i:void 0)})}function la(e){return Z(this,void 0,void 0,function*(){return e.isDirectory?ai(e):pa(e)})}function ai(e){const t=e.createReader();return new Promise((i,n)=>{const r=[];function s(){t.readEntries(l=>Z(this,void 0,void 0,function*(){if(l.length){const c=Promise.all(l.map(la));r.push(c),s()}else try{const c=yield Promise.all(r);i(c)}catch(c){n(c)}}),l=>{n(l)})}s()})}function pa(e){return Z(this,void 0,void 0,function*(){return new Promise((t,i)=>{e.file(n=>{const r=se(n,e.fullPath);t(r)},n=>{i(n)})})})}var Oe=function(e,t){if(e&&t){var i=Array.isArray(t)?t:t.split(",");if(i.length===0)return!0;var n=e.name||"",r=(e.type||"").toLowerCase(),s=r.replace(/\/.*$/,"");return i.some(function(l){var c=l.trim().toLowerCase();return c.charAt(0)==="."?n.toLowerCase().endsWith(c):c.endsWith("/*")?s===c.replace(/\/.*$/,""):r===c})}return!0};function yt(e){return ua(e)||ma(e)||oi(e)||da()}function da(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function ma(e){if(typeof Symbol<"u"&&e[Symbol.iterator]!=null||e["@@iterator"]!=null)return Array.from(e)}function ua(e){if(Array.isArray(e))return et(e)}function wt(e,t){var i=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable})),i.push.apply(i,n)}return i}function kt(e){for(var t=1;t<arguments.length;t++){var i=arguments[t]!=null?arguments[t]:{};t%2?wt(Object(i),!0).forEach(function(n){ni(e,n,i[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(i)):wt(Object(i)).forEach(function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(i,n))})}return e}function ni(e,t,i){return t in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}function de(e,t){return xa(e)||ga(e,t)||oi(e,t)||fa()}function fa(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function oi(e,t){if(e){if(typeof e=="string")return et(e,t);var i=Object.prototype.toString.call(e).slice(8,-1);if(i==="Object"&&e.constructor&&(i=e.constructor.name),i==="Map"||i==="Set")return Array.from(e);if(i==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i))return et(e,t)}}function et(e,t){(t==null||t>e.length)&&(t=e.length);for(var i=0,n=new Array(t);i<t;i++)n[i]=e[i];return n}function ga(e,t){var i=e==null?null:typeof Symbol<"u"&&e[Symbol.iterator]||e["@@iterator"];if(i!=null){var n=[],r=!0,s=!1,l,c;try{for(i=i.call(e);!(r=(l=i.next()).done)&&(n.push(l.value),!(t&&n.length===t));r=!0);}catch(u){s=!0,c=u}finally{try{!r&&i.return!=null&&i.return()}finally{if(s)throw c}}return n}}function xa(e){if(Array.isArray(e))return e}var ha=typeof Oe=="function"?Oe:Oe.default,va="file-invalid-type",ba="file-too-large",ya="file-too-small",wa="too-many-files",ka=function(){var t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:"",i=t.split(","),n=i.length>1?"one of ".concat(i.join(", ")):i[0];return{code:va,message:"File type must be ".concat(n)}},jt=function(t){return{code:ba,message:"File is larger than ".concat(t," ").concat(t===1?"byte":"bytes")}},$t=function(t){return{code:ya,message:"File is smaller than ".concat(t," ").concat(t===1?"byte":"bytes")}},ja={code:wa,message:"Too many files"};function ri(e,t){var i=e.type==="application/x-moz-file"||ha(e,t);return[i,i?null:ka(t)]}function si(e,t,i){if(J(e.size))if(J(t)&&J(i)){if(e.size>i)return[!1,jt(i)];if(e.size<t)return[!1,$t(t)]}else{if(J(t)&&e.size<t)return[!1,$t(t)];if(J(i)&&e.size>i)return[!1,jt(i)]}return[!0,null]}function J(e){return e!=null}function $a(e){var t=e.files,i=e.accept,n=e.minSize,r=e.maxSize,s=e.multiple,l=e.maxFiles,c=e.validator;return!s&&t.length>1||s&&l>=1&&t.length>l?!1:t.every(function(u){var x=ri(u,i),m=de(x,1),h=m[0],F=si(u,n,r),C=de(F,1),M=C[0],O=c?c(u):null;return h&&M&&!O})}function Ce(e){return typeof e.isPropagationStopped=="function"?e.isPropagationStopped():typeof e.cancelBubble<"u"?e.cancelBubble:!1}function be(e){return e.dataTransfer?Array.prototype.some.call(e.dataTransfer.types,function(t){return t==="Files"||t==="application/x-moz-file"}):!!e.target&&!!e.target.files}function Ct(e){e.preventDefault()}function Ca(e){return e.indexOf("MSIE")!==-1||e.indexOf("Trident/")!==-1}function Da(e){return e.indexOf("Edge/")!==-1}function Ea(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:window.navigator.userAgent;return Ca(e)||Da(e)}function H(){for(var e=arguments.length,t=new Array(e),i=0;i<e;i++)t[i]=arguments[i];return function(n){for(var r=arguments.length,s=new Array(r>1?r-1:0),l=1;l<r;l++)s[l-1]=arguments[l];return t.some(function(c){return!Ce(n)&&c&&c.apply(void 0,[n].concat(s)),Ce(n)})}}function Aa(){return"showOpenFilePicker"in window}function Sa(e){if(J(e)){var t=Object.entries(e).filter(function(i){var n=de(i,2),r=n[0],s=n[1],l=!0;return ci(r)||(console.warn('Skipped "'.concat(r,'" because it is not a valid MIME type. Check https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types for a list of valid MIME types.')),l=!1),(!Array.isArray(s)||!s.every(li))&&(console.warn('Skipped "'.concat(r,'" because an invalid file extension was provided.')),l=!1),l}).reduce(function(i,n){var r=de(n,2),s=r[0],l=r[1];return kt(kt({},i),{},ni({},s,l))},{});return[{description:"Files",accept:t}]}return e}function Ta(e){if(J(e))return Object.entries(e).reduce(function(t,i){var n=de(i,2),r=n[0],s=n[1];return[].concat(yt(t),[r],yt(s))},[]).filter(function(t){return ci(t)||li(t)}).join(",")}function za(e){return e instanceof DOMException&&(e.name==="AbortError"||e.code===e.ABORT_ERR)}function Ia(e){return e instanceof DOMException&&(e.name==="SecurityError"||e.code===e.SECURITY_ERR)}function ci(e){return e==="audio/*"||e==="video/*"||e==="image/*"||e==="text/*"||e==="application/*"||/\w+\/[-+.\w]+/g.test(e)}function li(e){return/^.*\.[\w]+$/.test(e)}var Ra=["children"],Fa=["open"],Oa=["refKey","role","onKeyDown","onFocus","onBlur","onClick","onDragEnter","onDragOver","onDragLeave","onDrop"],Pa=["refKey","onChange","onClick"];function Ma(e){return _a(e)||Ba(e)||pi(e)||La()}function La(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function Ba(e){if(typeof Symbol<"u"&&e[Symbol.iterator]!=null||e["@@iterator"]!=null)return Array.from(e)}function _a(e){if(Array.isArray(e))return tt(e)}function Pe(e,t){return Ha(e)||Na(e,t)||pi(e,t)||qa()}function qa(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function pi(e,t){if(e){if(typeof e=="string")return tt(e,t);var i=Object.prototype.toString.call(e).slice(8,-1);if(i==="Object"&&e.constructor&&(i=e.constructor.name),i==="Map"||i==="Set")return Array.from(e);if(i==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i))return tt(e,t)}}function tt(e,t){(t==null||t>e.length)&&(t=e.length);for(var i=0,n=new Array(t);i<t;i++)n[i]=e[i];return n}function Na(e,t){var i=e==null?null:typeof Symbol<"u"&&e[Symbol.iterator]||e["@@iterator"];if(i!=null){var n=[],r=!0,s=!1,l,c;try{for(i=i.call(e);!(r=(l=i.next()).done)&&(n.push(l.value),!(t&&n.length===t));r=!0);}catch(u){s=!0,c=u}finally{try{!r&&i.return!=null&&i.return()}finally{if(s)throw c}}return n}}function Ha(e){if(Array.isArray(e))return e}function Dt(e,t){var i=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable})),i.push.apply(i,n)}return i}function k(e){for(var t=1;t<arguments.length;t++){var i=arguments[t]!=null?arguments[t]:{};t%2?Dt(Object(i),!0).forEach(function(n){it(e,n,i[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(i)):Dt(Object(i)).forEach(function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(i,n))})}return e}function it(e,t,i){return t in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}function De(e,t){if(e==null)return{};var i=Ua(e,t),n,r;if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(r=0;r<s.length;r++)n=s[r],!(t.indexOf(n)>=0)&&Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}function Ua(e,t){if(e==null)return{};var i={},n=Object.keys(e),r,s;for(s=0;s<n.length;s++)r=n[s],!(t.indexOf(r)>=0)&&(i[r]=e[r]);return i}var ot=p.forwardRef(function(e,t){var i=e.children,n=De(e,Ra),r=mi(n),s=r.open,l=De(r,Fa);return p.useImperativeHandle(t,function(){return{open:s}},[s]),Xt.createElement(p.Fragment,null,i(k(k({},l),{},{open:s})))});ot.displayName="Dropzone";var di={disabled:!1,getFilesFromEvent:ia,maxSize:1/0,minSize:0,multiple:!0,maxFiles:0,preventDropOnDocument:!0,noClick:!1,noKeyboard:!1,noDrag:!1,noDragEventsBubbling:!1,validator:null,useFsAccessApi:!1,autoFocus:!1};ot.defaultProps=di;ot.propTypes={children:b.func,accept:b.objectOf(b.arrayOf(b.string)),multiple:b.bool,preventDropOnDocument:b.bool,noClick:b.bool,noKeyboard:b.bool,noDrag:b.bool,noDragEventsBubbling:b.bool,minSize:b.number,maxSize:b.number,maxFiles:b.number,disabled:b.bool,getFilesFromEvent:b.func,onFileDialogCancel:b.func,onFileDialogOpen:b.func,useFsAccessApi:b.bool,autoFocus:b.bool,onDragEnter:b.func,onDragLeave:b.func,onDragOver:b.func,onDrop:b.func,onDropAccepted:b.func,onDropRejected:b.func,onError:b.func,validator:b.func};var at={isFocused:!1,isFileDialogActive:!1,isDragActive:!1,isDragAccept:!1,isDragReject:!1,acceptedFiles:[],fileRejections:[]};function mi(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},t=k(k({},di),e),i=t.accept,n=t.disabled,r=t.getFilesFromEvent,s=t.maxSize,l=t.minSize,c=t.multiple,u=t.maxFiles,x=t.onDragEnter,m=t.onDragLeave,h=t.onDragOver,F=t.onDrop,C=t.onDropAccepted,M=t.onDropRejected,O=t.onFileDialogCancel,L=t.onFileDialogOpen,T=t.useFsAccessApi,z=t.autoFocus,q=t.preventDropOnDocument,Q=t.noClick,U=t.noKeyboard,y=t.noDrag,w=t.noDragEventsBubbling,D=t.onError,I=t.validator,N=p.useMemo(function(){return Ta(i)},[i]),ce=p.useMemo(function(){return Sa(i)},[i]),ee=p.useMemo(function(){return typeof L=="function"?L:Et},[L]),Y=p.useMemo(function(){return typeof O=="function"?O:Et},[O]),v=p.useRef(null),S=p.useRef(null),G=p.useReducer(Ga,at),me=Pe(G,2),K=me[0],B=me[1],xi=K.isFocused,rt=K.isFileDialogActive,ue=p.useRef(typeof window<"u"&&window.isSecureContext&&T&&Aa()),st=function(){!ue.current&&rt&&setTimeout(function(){if(S.current){var f=S.current.files;f.length||(B({type:"closeDialog"}),Y())}},300)};p.useEffect(function(){return window.addEventListener("focus",st,!1),function(){window.removeEventListener("focus",st,!1)}},[S,rt,Y,ue]);var te=p.useRef([]),ct=function(f){v.current&&v.current.contains(f.target)||(f.preventDefault(),te.current=[])};p.useEffect(function(){return q&&(document.addEventListener("dragover",Ct,!1),document.addEventListener("drop",ct,!1)),function(){q&&(document.removeEventListener("dragover",Ct),document.removeEventListener("drop",ct))}},[v,q]),p.useEffect(function(){return!n&&z&&v.current&&v.current.focus(),function(){}},[v,z,n]);var X=p.useCallback(function(d){D?D(d):console.error(d)},[D]),lt=p.useCallback(function(d){d.preventDefault(),d.persist(),he(d),te.current=[].concat(Ma(te.current),[d.target]),be(d)&&Promise.resolve(r(d)).then(function(f){if(!(Ce(d)&&!w)){var $=f.length,E=$>0&&$a({files:f,accept:N,minSize:l,maxSize:s,multiple:c,maxFiles:u,validator:I}),_=$>0&&!E;B({isDragAccept:E,isDragReject:_,isDragActive:!0,type:"setDraggedFiles"}),x&&x(d)}}).catch(function(f){return X(f)})},[r,x,X,w,N,l,s,c,u,I]),pt=p.useCallback(function(d){d.preventDefault(),d.persist(),he(d);var f=be(d);if(f&&d.dataTransfer)try{d.dataTransfer.dropEffect="copy"}catch{}return f&&h&&h(d),!1},[h,w]),dt=p.useCallback(function(d){d.preventDefault(),d.persist(),he(d);var f=te.current.filter(function(E){return v.current&&v.current.contains(E)}),$=f.indexOf(d.target);$!==-1&&f.splice($,1),te.current=f,!(f.length>0)&&(B({type:"setDraggedFiles",isDragActive:!1,isDragAccept:!1,isDragReject:!1}),be(d)&&m&&m(d))},[v,m,w]),fe=p.useCallback(function(d,f){var $=[],E=[];d.forEach(function(_){var le=ri(_,N),ne=Pe(le,2),Ae=ne[0],Se=ne[1],Te=si(_,l,s),ve=Pe(Te,2),ze=ve[0],Ie=ve[1],Re=I?I(_):null;if(Ae&&ze&&!Re)$.push(_);else{var Fe=[Se,Ie];Re&&(Fe=Fe.concat(Re)),E.push({file:_,errors:Fe.filter(function(yi){return yi})})}}),(!c&&$.length>1||c&&u>=1&&$.length>u)&&($.forEach(function(_){E.push({file:_,errors:[ja]})}),$.splice(0)),B({acceptedFiles:$,fileRejections:E,isDragReject:E.length>0,type:"setFiles"}),F&&F($,E,f),E.length>0&&M&&M(E,f),$.length>0&&C&&C($,f)},[B,c,N,l,s,u,F,C,M,I]),ge=p.useCallback(function(d){d.preventDefault(),d.persist(),he(d),te.current=[],be(d)&&Promise.resolve(r(d)).then(function(f){Ce(d)&&!w||fe(f,d)}).catch(function(f){return X(f)}),B({type:"reset"})},[r,fe,X,w]),ie=p.useCallback(function(){if(ue.current){B({type:"openDialog"}),ee();var d={multiple:c,types:ce};window.showOpenFilePicker(d).then(function(f){return r(f)}).then(function(f){fe(f,null),B({type:"closeDialog"})}).catch(function(f){za(f)?(Y(f),B({type:"closeDialog"})):Ia(f)?(ue.current=!1,S.current?(S.current.value=null,S.current.click()):X(new Error("Cannot open the file picker because the https://developer.mozilla.org/en-US/docs/Web/API/File_System_Access_API is not supported and no <input> was provided."))):X(f)});return}S.current&&(B({type:"openDialog"}),ee(),S.current.value=null,S.current.click())},[B,ee,Y,T,fe,X,ce,c]),mt=p.useCallback(function(d){!v.current||!v.current.isEqualNode(d.target)||(d.key===" "||d.key==="Enter"||d.keyCode===32||d.keyCode===13)&&(d.preventDefault(),ie())},[v,ie]),ut=p.useCallback(function(){B({type:"focus"})},[]),ft=p.useCallback(function(){B({type:"blur"})},[]),gt=p.useCallback(function(){Q||(Ea()?setTimeout(ie,0):ie())},[Q,ie]),ae=function(f){return n?null:f},Ee=function(f){return U?null:ae(f)},xe=function(f){return y?null:ae(f)},he=function(f){w&&f.stopPropagation()},hi=p.useMemo(function(){return function(){var d=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},f=d.refKey,$=f===void 0?"ref":f,E=d.role,_=d.onKeyDown,le=d.onFocus,ne=d.onBlur,Ae=d.onClick,Se=d.onDragEnter,Te=d.onDragOver,ve=d.onDragLeave,ze=d.onDrop,Ie=De(d,Oa);return k(k(it({onKeyDown:Ee(H(_,mt)),onFocus:Ee(H(le,ut)),onBlur:Ee(H(ne,ft)),onClick:ae(H(Ae,gt)),onDragEnter:xe(H(Se,lt)),onDragOver:xe(H(Te,pt)),onDragLeave:xe(H(ve,dt)),onDrop:xe(H(ze,ge)),role:typeof E=="string"&&E!==""?E:"presentation"},$,v),!n&&!U?{tabIndex:0}:{}),Ie)}},[v,mt,ut,ft,gt,lt,pt,dt,ge,U,y,n]),vi=p.useCallback(function(d){d.stopPropagation()},[]),bi=p.useMemo(function(){return function(){var d=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},f=d.refKey,$=f===void 0?"ref":f,E=d.onChange,_=d.onClick,le=De(d,Pa),ne=it({accept:N,multiple:c,type:"file",style:{border:0,clip:"rect(0, 0, 0, 0)",clipPath:"inset(50%)",height:"1px",margin:"0 -1px -1px 0",overflow:"hidden",padding:0,position:"absolute",width:"1px",whiteSpace:"nowrap"},onChange:ae(H(E,ge)),onClick:ae(H(_,vi)),tabIndex:-1},$,S);return k(k({},ne),le)}},[S,i,c,ge,n]);return k(k({},K),{},{isFocused:xi&&!n,getRootProps:hi,getInputProps:bi,rootRef:v,inputRef:S,open:ae(ie)})}function Ga(e,t){switch(t.type){case"focus":return k(k({},e),{},{isFocused:!0});case"blur":return k(k({},e),{},{isFocused:!1});case"openDialog":return k(k({},at),{},{isFileDialogActive:!0});case"closeDialog":return k(k({},e),{},{isFileDialogActive:!1});case"setDraggedFiles":return k(k({},e),{},{isDragActive:t.isDragActive,isDragAccept:t.isDragAccept,isDragReject:t.isDragReject});case"setFiles":return k(k({},e),{},{acceptedFiles:t.acceptedFiles,fileRejections:t.fileRejections,isDragReject:t.isDragReject});case"reset":return k({},at);default:return e}}function Et(){}const Va=R`
  0%, 100% { box-shadow: 0 0 20px rgba(255, 68, 68, 0.3), inset 0 0 30px rgba(0, 0, 0, 0.5); }
  50% { box-shadow: 0 0 40px rgba(255, 68, 68, 0.6), inset 0 0 40px rgba(0, 0, 0, 0.7); }
`,Wa=R`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`,Ya=R`
  0%, 100% { opacity: 1; }
  92% { opacity: 1; }
  93% { opacity: 0.8; }
  94% { opacity: 1; }
  96% { opacity: 0.9; }
  97% { opacity: 1; }
`,Ka=R`
  0%, 100% { filter: drop-shadow(0 0 8px rgba(139, 0, 0, 0.4)); }
  50% { filter: drop-shadow(0 0 16px rgba(139, 0, 0, 0.7)); }
`,Xa=o(g.div)`
  width: 100%;
  max-width: 500px;
`,Ja=o.div`
  position: relative;
  width: 100%;
  max-width: 500px;
  min-height: 280px;
  padding: 2rem;
  border: 2px dashed ${({theme:e,$isDragActive:t,$hasError:i})=>i?e.colors.danger:t?e.colors.accent:e.colors.secondary};
  border-radius: ${({theme:e})=>e.spacing.borderRadius}px;
  background: ${({theme:e})=>e.colors.surface};
  cursor: ${({$isProcessing:e})=>e?"wait":"pointer"};
  overflow: hidden;
  transition: all 0.3s ease;
  
  ${({theme:e})=>e.effects.parchmentTexture&&A`
    background-image: 
      linear-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0, 0, 0, 0.1) 1px, transparent 1px);
    background-size: 20px 20px;
  `}
  
  ${({$isDragActive:e,theme:t})=>e&&A`
    border-color: ${t.colors.accent};
    animation: ${Va} 1.5s ease-in-out infinite;
  `}
  
  ${({theme:e})=>e.animations.flicker&&A`
    animation: ${Ya} 4s ease-in-out infinite;
  `}
  
  &:hover {
    border-color: ${({theme:e})=>e.colors.accent};
    box-shadow: ${({theme:e})=>e.spacing.shadows[1]};
  }
`,Za=o.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: ${({$opacity:e})=>e};
  background: linear-gradient(
    135deg,
    rgba(30, 30, 40, 0.3) 0%,
    transparent 40%,
    rgba(30, 30, 40, 0.2) 60%,
    transparent 100%
  );
  background-size: 200% 200%;
  animation: ${Wa} 8s ease-in-out infinite;
`,Qa=o.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  min-height: 200px;
`,At=o(g.div)`
  font-size: 4rem;
  color: ${({theme:e})=>e.colors.accent};
  text-shadow: ${({theme:e})=>e.typography.textShadow};
  
  ${({theme:e,$isProcessing:t})=>!t&&e.effects.shadowMovement&&A`
    animation: ${Ka} 2s ease-in-out infinite;
  `}
`,St=o.h3`
  font-size: 1.25rem;
  color: ${({theme:e})=>e.colors.text};
  text-shadow: ${({theme:e})=>e.typography.textShadow};
  margin: 0;
  text-align: center;
`,en=o.p`
  font-size: 0.875rem;
  color: ${({theme:e})=>e.colors.textMuted};
  margin: 0;
  text-align: center;
`,tn=o.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  justify-content: center;
`,Me=o.span`
  padding: 0.25rem 0.75rem;
  font-size: 0.75rem;
  background: ${({theme:e})=>e.colors.secondary};
  color: ${({theme:e})=>e.colors.text};
  border-radius: ${({theme:e})=>e.spacing.borderRadius}px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`,an=o(g.div)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: rgba(255, 0, 0, 0.1);
  border: 1px solid ${({theme:e})=>e.colors.danger};
  border-radius: ${({theme:e})=>e.spacing.borderRadius}px;
  color: ${({theme:e})=>e.colors.danger};
  font-size: 0.875rem;
  text-align: center;
`,nn=o(g.div)`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  background: rgba(0, 0, 0, 0.8);
  z-index: 10;
`,on=o(g.div)`
  width: 60px;
  height: 60px;
  border: 3px solid ${({theme:e})=>e.colors.secondary};
  border-top-color: ${({theme:e})=>e.colors.accent};
  border-radius: 50%;
`,rn=o.p`
  color: ${({theme:e})=>e.colors.text};
  font-size: 1rem;
  text-shadow: ${({theme:e})=>e.typography.textShadow};
`,Tt=["Release the cursed document...","Drop your haunted bill here...","Let the exorcism begin..."],zt=["Summoning the spirits of clarity...","Deciphering the ancient billing codes...","Exorcising the confusion...","Translating the medical hieroglyphics..."],Le={size:"This document is too powerful! Please upload a file under 10MB.",type:"Only sacred scrolls (PDF, JPG, PNG) are accepted here.",unknown:"The spirits are disturbed. Please try again."},sn=({onFileUpload:e,isProcessing:t=!1,maxSize:i=10*1024*1024})=>{const{theme:n}=V(),[r,s]=p.useState(null),[l]=p.useState(()=>Tt[Math.floor(Math.random()*Tt.length)]),[c]=p.useState(()=>zt[Math.floor(Math.random()*zt.length)]),u=p.useCallback((F,C)=>{var M;if(s(null),C.length>0){const L=(M=C[0].errors[0])==null?void 0:M.code;s(L==="file-too-large"?{type:"size",message:Le.size}:L==="file-invalid-type"?{type:"type",message:Le.type}:{type:"unknown",message:Le.unknown});return}F.length>0&&e(F[0])},[e]),{getRootProps:x,getInputProps:m,isDragActive:h}=mi({onDrop:u,accept:{"image/jpeg":[".jpg",".jpeg"],"image/png":[".png"],"application/pdf":[".pdf"]},maxSize:i,multiple:!1,disabled:t});return a.jsx(Xa,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5},children:a.jsxs(Ja,{...x(),$isDragActive:h,$hasError:!!r,$isProcessing:t,role:"button","aria-label":"Upload medical bill. Drag and drop a file here, or click to select. Accepts PDF, JPG, and PNG files up to 10MB.",tabIndex:0,children:[a.jsx("input",{...m(),"aria-label":"File upload input","aria-describedby":"upload-instructions"}),a.jsx(Za,{$opacity:n.effects.fogOpacity,"aria-hidden":"true"}),a.jsx("span",{id:"upload-instructions",className:"sr-only",children:"Upload your medical bill by dragging and dropping a file, or press Enter to open file browser. Supported formats: PDF, JPG, PNG. Maximum file size: 10 megabytes."}),a.jsxs(Qa,{children:[a.jsx(W,{mode:"wait",children:h?a.jsxs(g.div,{initial:{scale:.8,opacity:0},animate:{scale:1,opacity:1},exit:{scale:.8,opacity:0},style:{textAlign:"center"},children:[a.jsx(At,{$isProcessing:!1,children:"📜"}),a.jsx(St,{children:l})]},"drag-active"):a.jsxs(g.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},style:{display:"flex",flexDirection:"column",alignItems:"center",gap:"1rem"},children:[a.jsx(At,{$isProcessing:t,animate:{y:[0,-8,0]},transition:{duration:2,repeat:1/0,ease:"easeInOut"},children:"👻"}),a.jsx(St,{children:"Drop your haunted medical bill here"}),a.jsx(en,{children:"or click to summon the file picker"}),a.jsxs(tn,{children:[a.jsx(Me,{children:"PDF"}),a.jsx(Me,{children:"JPG"}),a.jsx(Me,{children:"PNG"})]})]},"default")}),a.jsx(W,{children:r&&a.jsxs(an,{initial:{opacity:0,y:10},animate:{opacity:1,y:0},exit:{opacity:0,y:-10},children:["⚠️ ",r.message]})})]}),a.jsx(W,{children:t&&a.jsxs(nn,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},children:[a.jsx(on,{animate:{rotate:360},transition:{duration:1,repeat:1/0,ease:"linear"}}),a.jsx(rn,{children:c})]})})]})})},cn=R`
  0%, 100% { box-shadow: 0 0 10px rgba(255, 140, 0, 0.3); }
  50% { box-shadow: 0 0 25px rgba(255, 140, 0, 0.6); }
`,ln=R`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`,pn=R`
  0%, 100% { opacity: 0.3; transform: translateX(-5%); }
  50% { opacity: 0.5; transform: translateX(5%); }
`,dn=o(g.div)`
  width: 100%;
  max-width: 500px;
  padding: 1.5rem;
  background: ${({theme:e})=>e.colors.surface};
  border-radius: ${({theme:e})=>e.spacing.borderRadius}px;
  border: 1px solid ${({theme:e})=>e.colors.secondary};
  box-shadow: ${({theme:e})=>e.spacing.shadows[0]};
  position: relative;
  overflow: hidden;
`,mn=o.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    transparent 0%,
    ${({theme:e})=>e.colors.fog} 50%,
    transparent 100%
  );
  opacity: ${({$visible:e})=>e?1:0};
  animation: ${pn} 3s ease-in-out infinite;
  pointer-events: none;
  transition: opacity 0.5s ease;
`,un=o.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
  position: relative;
  z-index: 1;
`,fn=o.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`,gn=o.span`
  font-size: 1.5rem;
`,xn=o.span`
  color: ${({theme:e})=>e.colors.text};
  font-size: 0.875rem;
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`,hn=o.span`
  padding: 0.25rem 0.75rem;
  font-size: 0.75rem;
  border-radius: ${({theme:e})=>e.spacing.borderRadius}px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  
  ${({$status:e,theme:t})=>{switch(e){case"uploading":return A`
          background: ${t.colors.secondary};
          color: ${t.colors.accent};
        `;case"processing":return A`
          background: rgba(255, 140, 0, 0.2);
          color: ${t.colors.accent};
          animation: ${cn} 1.5s ease-in-out infinite;
        `;case"complete":return A`
          background: rgba(76, 175, 80, 0.2);
          color: ${t.colors.success};
        `;case"error":return A`
          background: rgba(255, 0, 0, 0.2);
          color: ${t.colors.danger};
        `;default:return""}}}
`,vn=o.div`
  width: 100%;
  height: 8px;
  background: ${({theme:e})=>e.colors.secondary};
  border-radius: 4px;
  overflow: hidden;
  position: relative;
  z-index: 1;
`,bn=o(g.div)`
  height: 100%;
  border-radius: 4px;
  position: relative;
  
  ${({$status:e,theme:t})=>{switch(e){case"uploading":case"processing":return A`
          background: linear-gradient(
            90deg,
            ${t.colors.accent} 0%,
            ${t.colors.primary} 50%,
            ${t.colors.accent} 100%
          );
          background-size: 200% 100%;
          animation: ${ln} 2s linear infinite;
        `;case"complete":return A`
          background: ${t.colors.success};
        `;case"error":return A`
          background: ${t.colors.danger};
        `;default:return A`
          background: ${t.colors.accent};
        `}}}
`,yn=o.div`
  display: flex;
  justify-content: space-between;
  margin-top: 0.5rem;
  font-size: 0.75rem;
  color: ${({theme:e})=>e.colors.textMuted};
  position: relative;
  z-index: 1;
`,wn=o(g.p)`
  margin-top: 1rem;
  font-size: 0.875rem;
  color: ${({theme:e,$isError:t})=>t?e.colors.danger:e.colors.textMuted};
  text-align: center;
  position: relative;
  z-index: 1;
`,It={uploading:["Transferring the cursed document...","Channeling the bill through the void...","Summoning your medical mysteries..."],processing:["The spirits are analyzing your bill...","Decoding the ancient medical runes...","Exorcising the billing demons...","Translating the healthcare hieroglyphics..."],complete:["The curse has been revealed!","Your bill's secrets are exposed!","The spirits have spoken!"],error:["The spirits are disturbed...","A dark force blocks our path...","The ritual has failed..."]},kn=e=>{const t=It[e]||It.uploading;return t[Math.floor(Math.random()*t.length)]},jn=({progress:e,fileName:t,status:i,errorMessage:n,message:r})=>{const{theme:s}=V(),[l]=Xt.useState(()=>kn(i)),c=r||l,u=()=>t.toLowerCase().endsWith(".pdf")?"📄":t.toLowerCase().match(/\.(jpg|jpeg|png)$/)?"🖼️":"📜",x=()=>{switch(i){case"uploading":return"Uploading";case"processing":return"Processing";case"complete":return"Complete";case"error":return"Error";default:return i}};return a.jsxs(dn,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},exit:{opacity:0,y:-20},transition:{duration:.3},children:[a.jsx(mn,{$visible:s.effects.fogOpacity>0&&i!=="complete"}),a.jsxs(un,{children:[a.jsxs(fn,{children:[a.jsx(gn,{children:u()}),a.jsx(xn,{title:t,children:t})]}),a.jsx(hn,{$status:i,children:x()})]}),a.jsx(vn,{children:a.jsx(bn,{$status:i,initial:{width:0},animate:{width:`${e}%`},transition:{duration:.3,ease:"easeOut"}})}),a.jsxs(yn,{children:[a.jsx("span",{children:i==="complete"?"Done":c}),a.jsxs("span",{children:[e,"%"]})]}),i==="error"&&n&&a.jsxs(wn,{$isError:!0,initial:{opacity:0},animate:{opacity:1},children:["⚠️ ",n]})]})},$n=R`
  0%, 100% { 
    box-shadow: 
      0 0 20px rgba(139, 0, 0, 0.4),
      0 0 40px rgba(139, 0, 0, 0.2),
      inset 0 0 30px rgba(0, 0, 0, 0.3);
  }
  50% { 
    box-shadow: 
      0 0 30px rgba(139, 0, 0, 0.6),
      0 0 60px rgba(139, 0, 0, 0.3),
      inset 0 0 40px rgba(0, 0, 0, 0.4);
  }
`,Cn=R`
  0%, 100% { clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%); }
  25% { clip-path: polygon(1% 0, 100% 1%, 99% 100%, 0 99%); }
  50% { clip-path: polygon(0 1%, 99% 0, 100% 99%, 1% 100%); }
  75% { clip-path: polygon(1% 1%, 100% 0, 99% 99%, 0 100%); }
`,ui=R`
  0%, 100% { filter: blur(0px) contrast(1); }
  50% { filter: blur(0.3px) contrast(1.05); }
`,Dn=o(g.div)`
  position: relative;
  width: 100%;
  max-width: 500px;
  background: ${({theme:e})=>e.colors.surface};
  border-radius: ${({theme:e})=>e.spacing.borderRadius}px;
  overflow: hidden;
  
  ${({$hauntingLevel:e})=>e>.5&&A`
    animation: ${$n} 3s ease-in-out infinite;
  `}
`,En=o.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: ${({$visible:e})=>e?.15:0};
  background: 
    repeating-linear-gradient(
      0deg,
      transparent,
      transparent 2px,
      rgba(139, 90, 43, 0.03) 2px,
      rgba(139, 90, 43, 0.03) 4px
    ),
    repeating-linear-gradient(
      90deg,
      transparent,
      transparent 2px,
      rgba(139, 90, 43, 0.02) 2px,
      rgba(139, 90, 43, 0.02) 4px
    );
  z-index: 2;
  transition: opacity 0.5s ease;
`,An=o.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: ${({$visible:e})=>e?1:0};
  background: 
    radial-gradient(ellipse at top left, rgba(139, 69, 19, 0.3) 0%, transparent 30%),
    radial-gradient(ellipse at top right, rgba(139, 69, 19, 0.25) 0%, transparent 25%),
    radial-gradient(ellipse at bottom left, rgba(139, 69, 19, 0.35) 0%, transparent 35%),
    radial-gradient(ellipse at bottom right, rgba(139, 69, 19, 0.3) 0%, transparent 30%);
  z-index: 3;
  transition: opacity 0.5s ease;
`,Sn=o.div`
  position: relative;
  width: 100%;
  aspect-ratio: 8.5 / 11;
  overflow: hidden;
  
  ${({$haunted:e})=>e&&A`
    animation: ${Cn} 8s ease-in-out infinite;
  `}
`,Tn=o.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  background: #1a1a1a;
  
  ${({$haunted:e})=>e&&A`
    animation: ${ui} 4s ease-in-out infinite;
    filter: sepia(0.2) contrast(1.1);
  `}
`,Rt=o.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  background: linear-gradient(
    135deg,
    ${({theme:e})=>e.colors.surface} 0%,
    ${({theme:e})=>e.colors.secondary} 100%
  );
  
  ${({$haunted:e})=>e&&A`
    animation: ${ui} 4s ease-in-out infinite;
  `}
`,Ft=o.span`
  font-size: 4rem;
  filter: drop-shadow(0 0 10px rgba(139, 0, 0, 0.5));
`,Ot=o.span`
  color: ${({theme:e})=>e.colors.text};
  font-size: 0.875rem;
  text-align: center;
  padding: 0 1rem;
  word-break: break-word;
`,zn=o(g.button)`
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${({theme:e})=>e.colors.danger};
  color: white;
  font-size: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  
  &:hover {
    background: ${({theme:e})=>e.colors.accent};
  }
`,In=o.div`
  padding: 1rem;
  background: ${({theme:e})=>e.colors.secondary};
  border-top: 1px solid ${({theme:e})=>e.colors.primary};
`,Rn=o.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`,Fn=o.span`
  color: ${({theme:e})=>e.colors.text};
  font-size: 0.875rem;
  max-width: 70%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`,On=o.span`
  color: ${({theme:e})=>e.colors.textMuted};
  font-size: 0.75rem;
`,Pn=o(g.div)`
  position: absolute;
  top: 1rem;
  left: 1rem;
  padding: 0.25rem 0.75rem;
  background: rgba(139, 0, 0, 0.8);
  color: #ff6b6b;
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  border-radius: 2px;
  z-index: 10;
  box-shadow: 0 0 10px rgba(139, 0, 0, 0.5);
`,Mn=e=>e<1024?`${e} B`:e<1024*1024?`${(e/1024).toFixed(1)} KB`:`${(e/(1024*1024)).toFixed(1)} MB`,Ln=({file:e,onRemove:t})=>{const{theme:i}=V(),[n,r]=p.useState(null),s=e.type.startsWith("image/"),l=e.type==="application/pdf",c=i.effects.parchmentTexture;return p.useEffect(()=>{if(s){const u=URL.createObjectURL(e);return r(u),()=>URL.revokeObjectURL(u)}},[e,s]),a.jsxs(Dn,{$hauntingLevel:i.effects.glowIntensity,initial:{opacity:0,scale:.95},animate:{opacity:1,scale:1},exit:{opacity:0,scale:.95},transition:{duration:.3},children:[a.jsx(En,{$visible:c}),a.jsx(An,{$visible:c}),c&&a.jsx(Pn,{initial:{opacity:0,x:-20},animate:{opacity:1,x:0},transition:{delay:.3},children:"📜 Cursed Document"}),t&&a.jsx(zn,{onClick:t,whileHover:{scale:1.1},whileTap:{scale:.9},title:"Remove document",children:"×"}),a.jsx(Sn,{$haunted:c,children:s&&n?a.jsx(Tn,{src:n,alt:"Document preview",$haunted:c}):l?a.jsxs(Rt,{$haunted:c,children:[a.jsx(Ft,{children:"📄"}),a.jsx(Ot,{children:e.name})]}):a.jsxs(Rt,{$haunted:c,children:[a.jsx(Ft,{children:"📜"}),a.jsx(Ot,{children:e.name})]})}),a.jsx(In,{children:a.jsxs(Rn,{children:[a.jsx(Fn,{title:e.name,children:e.name}),a.jsx(On,{children:Mn(e.size)})]})})]})},Bn={99211:{code:"99211",description:"Office Visit - Level 1 (Minimal)",avgCost:45,lowCost:25,highCost:75,medicareRate:23,category:"office-visit"},99212:{code:"99212",description:"Office Visit - Level 2 (Straightforward)",avgCost:85,lowCost:50,highCost:130,medicareRate:46,category:"office-visit"},99213:{code:"99213",description:"Office Visit - Level 3 (Low Complexity)",avgCost:130,lowCost:80,highCost:185,medicareRate:76,category:"office-visit"},99214:{code:"99214",description:"Office Visit - Level 4 (Moderate)",avgCost:195,lowCost:120,highCost:280,medicareRate:111,category:"office-visit"},99215:{code:"99215",description:"Office Visit - Level 5 (High Complexity)",avgCost:265,lowCost:180,highCost:380,medicareRate:150,category:"office-visit"},36415:{code:"36415",description:"Venipuncture (Blood Draw)",avgCost:30,lowCost:15,highCost:50,medicareRate:3,category:"lab"},80053:{code:"80053",description:"Comprehensive Metabolic Panel",avgCost:150,lowCost:50,highCost:250,medicareRate:14,category:"lab"},85025:{code:"85025",description:"Complete Blood Count (CBC)",avgCost:75,lowCost:30,highCost:150,medicareRate:11,category:"lab"},81001:{code:"81001",description:"Urinalysis with Microscopy",avgCost:45,lowCost:20,highCost:80,medicareRate:4,category:"lab"},84443:{code:"84443",description:"TSH (Thyroid Test)",avgCost:85,lowCost:35,highCost:150,medicareRate:23,category:"lab"},82947:{code:"82947",description:"Glucose Test",avgCost:35,lowCost:15,highCost:60,medicareRate:5,category:"lab"},82306:{code:"82306",description:"Vitamin D Test",avgCost:120,lowCost:50,highCost:200,medicareRate:40,category:"lab"},83036:{code:"83036",description:"Hemoglobin A1C",avgCost:65,lowCost:30,highCost:120,medicareRate:13,category:"lab"},80061:{code:"80061",description:"Lipid Panel",avgCost:85,lowCost:35,highCost:150,medicareRate:18,category:"lab"},71046:{code:"71046",description:"Chest X-Ray (2 views)",avgCost:150,lowCost:75,highCost:300,medicareRate:31,category:"imaging"},73030:{code:"73030",description:"Shoulder X-Ray",avgCost:120,lowCost:60,highCost:250,medicareRate:26,category:"imaging"},70553:{code:"70553",description:"Brain MRI with Contrast",avgCost:1500,lowCost:500,highCost:3e3,medicareRate:450,category:"imaging"},10060:{code:"10060",description:"Incision and Drainage",avgCost:350,lowCost:150,highCost:600,medicareRate:120,category:"procedure"},11102:{code:"11102",description:"Skin Biopsy",avgCost:250,lowCost:100,highCost:450,medicareRate:85,category:"procedure"},90471:{code:"90471",description:"Immunization Administration",avgCost:35,lowCost:15,highCost:60,medicareRate:17,category:"procedure"}};function fi(e){const t=e.code?Bn[e.code]:null,i=e.amount||0;if(!t)return{lineItemId:e.id,code:e.code,chargedAmount:i,avgCost:i*.7,lowCost:i*.4,highCost:i*1.2,medicareRate:i*.3,percentAboveAvg:0,percentAboveMedicare:0,priceRating:"fair",category:"other"};const n=(i-t.avgCost)/t.avgCost*100,r=(i-t.medicareRate)/t.medicareRate*100;let s="fair";return n>100?s="extreme":n>50?s="very-high":n>25&&(s="high"),{lineItemId:e.id,code:e.code,chargedAmount:i,avgCost:t.avgCost,lowCost:t.lowCost,highCost:t.highCost,medicareRate:t.medicareRate,percentAboveAvg:Math.round(n),percentAboveMedicare:Math.round(r),priceRating:s,category:t.category}}function gi(e){const t=[],i=new Map;for(const n of e){const r=`${n.code||""}-${n.amount}-${n.date||""}`;i.has(r)||i.set(r,[]),i.get(r).push(n)}for(const[n,r]of i)r.length>1&&t.push(r.map(s=>s.id));return t}function _n(e){const t=[],i=[{codes:["36415","36416"],reason:"Multiple venipuncture codes billed - typically only one should be charged per visit"},{codes:["99213","99214","99215"],reason:"Multiple office visit codes on same date - only one E/M code should be billed per visit"}];for(const n of i){const r=e.filter(s=>s.code&&n.codes.includes(s.code));r.length>1&&t.push({lineItemId:r[0].id,type:"unbundled",severity:"medium",reason:n.reason,potentialSavings:r.slice(1).reduce((s,l)=>s+(l.amount||0),0),talkingPoints:["Ask why multiple similar codes were billed","Request review for proper bundling","Reference CMS bundling guidelines"],actionSteps:["Call billing department and ask for itemized explanation","Request a coding review","If denied, file appeal with your insurance"]})}return t}function qn(e,t){const i=[];for(const s of t)s.priceRating==="extreme"?i.push({lineItemId:s.lineItemId,type:"overcharge",severity:"high",reason:`This charge is ${s.percentAboveAvg}% above the average cost and ${s.percentAboveMedicare}% above Medicare rates.`,potentialSavings:s.chargedAmount-s.avgCost,talkingPoints:[`The average cost for this service is $${s.avgCost.toFixed(2)}`,`Medicare pays only $${s.medicareRate.toFixed(2)} for this service`,`Your charge of $${s.chargedAmount.toFixed(2)} is significantly above market rates`],actionSteps:["Request an itemized bill with detailed breakdown","Ask for a price reduction to match fair market value","Request financial assistance or payment plan","If insured, ask your insurance to review the charge"]}):s.priceRating==="very-high"&&i.push({lineItemId:s.lineItemId,type:"overcharge",severity:"medium",reason:`This charge is ${s.percentAboveAvg}% above average.`,potentialSavings:s.chargedAmount-s.avgCost,talkingPoints:[`The typical cost for this service is $${s.avgCost.toFixed(2)}`,"Your charge is on the high end of the price range"],actionSteps:["Ask if there are any discounts available","Request a payment plan if needed","Compare with other providers for future reference"]});const n=gi(e);for(const s of n){const c=e.filter(u=>s.includes(u.id)).slice(1).reduce((u,x)=>u+(x.amount||0),0);i.push({lineItemId:s[0],type:"duplicate",severity:"high",reason:`This charge appears ${s.length} times on your bill. You should only pay once.`,potentialSavings:c,talkingPoints:["Point out the duplicate entries on your bill","Request immediate removal of duplicate charges","Ask for a corrected bill in writing"],actionSteps:["Call billing immediately to report the duplicate","Document the call with date, time, and representative name","Request written confirmation of the correction","If not resolved, file a complaint with your state insurance commissioner"]})}const r=_n(e);return i.push(...r),i}function Nn(e){const t=e.map(m=>fi(m)).filter(m=>m!==null),i=qn(e,t),n=gi(e),r=e.reduce((m,h)=>m+(h.amount||0),0),s=t.reduce((m,h)=>m+h.avgCost,0),l=i.reduce((m,h)=>m+h.potentialSavings,0);let c="fair";const u=i.filter(m=>m.severity==="high").length,x=i.filter(m=>m.severity==="medium").length;return u>=3||l>r*.3?c="egregious":u>=1||x>=3?c="concerning":(x>=1||l>r*.1)&&(c="questionable"),{comparisons:t,disputes:i,duplicates:n,totalCharged:r,fairMarketValue:s,potentialSavings:l,overallRating:c}}function Hn(e){switch(e){case"fair":return"#4CAF50";case"high":return"#FF9800";case"very-high":return"#f44336";case"extreme":return"#9C27B0";default:return"#666"}}function Un(e){switch(e){case"fair":return"✓ Fair Price";case"high":return"⚠️ Above Average";case"very-high":return"🚨 Very High";case"extreme":return"💀 Extreme Overcharge";default:return"Unknown"}}function P(e){return new Intl.NumberFormat("en-US",{style:"currency",currency:"USD"}).format(e)}const Gn=o(g.div)`
  padding: 0.75rem;
  background: ${({theme:e})=>e.colors.background};
  border-radius: ${({theme:e})=>e.spacing.borderRadius}px;
  border: 1px solid ${({theme:e})=>e.colors.secondary};
`,Vn=o.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`,Wn=o.span`
  font-size: 0.75rem;
  color: ${({theme:e})=>e.colors.textMuted};
  text-transform: uppercase;
  letter-spacing: 0.05em;
`,Yn=o.span`
  font-size: 0.7rem;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  background: ${({$color:e})=>e}20;
  color: ${({$color:e})=>e};
  font-weight: 600;
`,Kn=o.div`
  position: relative;
  height: 24px;
  background: ${({theme:e})=>e.colors.secondary};
  border-radius: 4px;
  overflow: hidden;
  margin: 0.5rem 0;
`,Xn=o.div`
  position: absolute;
  top: 4px;
  bottom: 4px;
  left: ${({$left:e})=>e}%;
  width: ${({$width:e})=>e}%;
  background: linear-gradient(90deg, #4CAF50, #FF9800);
  border-radius: 2px;
  opacity: 0.6;
`,Pt=o.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${({$position:e})=>e}%;
  width: 3px;
  background: ${({$color:e})=>e};
  
  &::after {
    content: '';
    position: absolute;
    top: -4px;
    left: -4px;
    width: 11px;
    height: 11px;
    background: ${({$color:e})=>e};
    border-radius: 50%;
  }
`,Jn=o.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.7rem;
  color: ${({theme:e})=>e.colors.textMuted};
`,Be=o.span`
  ${({$highlight:e,$color:t})=>e&&`
    font-weight: 600;
    color: ${t||"inherit"};
  `}
`,Zn=o.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
  margin-top: 0.5rem;
`,_e=o.div`
  text-align: center;
  padding: 0.5rem;
  background: ${({theme:e})=>e.colors.surface};
  border-radius: 4px;
`,qe=o.div`
  font-size: 0.65rem;
  color: ${({theme:e})=>e.colors.textMuted};
  margin-bottom: 0.25rem;
`,Ne=o.div`
  font-size: 0.875rem;
  font-weight: 600;
  color: ${({$color:e,theme:t})=>e||t.colors.text};
`,Qn=({comparison:e})=>{const t=Hn(e.priceRating),i=Un(e.priceRating),n=Math.max(e.chargedAmount,e.highCost)*1.2,r=e.lowCost/n*100,s=e.highCost/n*100,l=e.avgCost/n*100,c=Math.min(e.chargedAmount/n*100,98);return a.jsxs(Gn,{initial:{opacity:0,height:0},animate:{opacity:1,height:"auto"},exit:{opacity:0,height:0},children:[a.jsxs(Vn,{children:[a.jsx(Wn,{children:"💰 Cost Analysis"}),a.jsx(Yn,{$color:t,children:i})]}),a.jsxs(Kn,{children:[a.jsx(Xn,{$left:r,$width:s-r}),a.jsx(Pt,{$position:l,$color:"#4CAF50",title:"Average"}),a.jsx(Pt,{$position:c,$color:t,title:"Your charge"})]}),a.jsxs(Jn,{children:[a.jsxs(Be,{children:["Low: ",P(e.lowCost)]}),a.jsxs(Be,{$highlight:!0,$color:"#4CAF50",children:["Avg: ",P(e.avgCost)]}),a.jsxs(Be,{children:["High: ",P(e.highCost)]})]}),a.jsxs(Zn,{children:[a.jsxs(_e,{children:[a.jsx(qe,{children:"Your Charge"}),a.jsx(Ne,{$color:t,children:P(e.chargedAmount)})]}),a.jsxs(_e,{children:[a.jsx(qe,{children:"Medicare Rate"}),a.jsx(Ne,{children:P(e.medicareRate)})]}),a.jsxs(_e,{children:[a.jsx(qe,{children:"vs Average"}),a.jsxs(Ne,{$color:e.percentAboveAvg>0?t:"#4CAF50",children:[e.percentAboveAvg>0?"+":"",e.percentAboveAvg,"%"]})]})]})]})},eo=R`
  0%, 100% { box-shadow: 0 0 10px rgba(139, 0, 0, 0.3); }
  50% { box-shadow: 0 0 20px rgba(139, 0, 0, 0.5); }
`,to=R`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`,io=o(g.div)`
  width: 100%;
  background: ${({theme:e})=>e.colors.surface};
  border-radius: ${({theme:e})=>e.spacing.borderRadius}px;
  border: 1px solid ${({theme:e,$isDuplicate:t})=>t?e.colors.danger:e.colors.secondary};
  overflow: hidden;
  transition: all 0.5s ease;
  
  ${({$isExplained:e})=>!e&&A`
    animation: ${eo} 3s ease-in-out infinite;
  `}
  
  ${({$isExplained:e})=>e&&A`
    border-color: ${({theme:t})=>t.colors.success};
    box-shadow: 0 0 10px rgba(100, 200, 100, 0.2);
  `}
`,ao=o.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  cursor: pointer;
  transition: background 0.3s ease;
  
  &:hover {
    background: ${({theme:e})=>e.colors.secondary}20;
  }
`,no=o.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  flex: 1;
  text-align: left;
`,oo=o.span`
  font-family: monospace;
  font-size: 0.75rem;
  padding: 0.125rem 0.5rem;
  background: ${({theme:e,$isExplained:t})=>t?e.colors.success+"30":e.colors.accent+"30"};
  color: ${({theme:e,$isExplained:t})=>t?e.colors.success:e.colors.accent};
  border-radius: 4px;
  width: fit-content;
`,ro=o.p`
  font-size: 0.9rem;
  color: ${({theme:e})=>e.colors.text};
  margin: 0;
  line-height: 1.4;
`,so=o.div`
  font-size: 1.25rem;
  font-weight: 700;
  color: ${({theme:e,$isExplained:t,$isDuplicate:i})=>i?e.colors.danger:t?e.colors.success:e.colors.accent};
  white-space: nowrap;
  margin-left: 1rem;
`,co=o.span`
  font-size: 0.65rem;
  padding: 0.125rem 0.375rem;
  background: ${({theme:e})=>e.colors.danger};
  color: white;
  border-radius: 4px;
  margin-left: 0.5rem;
  text-transform: uppercase;
`,lo=o(g.div)`
  padding: 1rem;
  background: ${({theme:e})=>e.colors.background};
  border-top: 1px solid ${({theme:e})=>e.colors.secondary};
`,po=o.p`
  font-size: 0.875rem;
  color: ${({theme:e})=>e.colors.text};
  line-height: 1.6;
  margin: 0;
  text-align: left;
`,mo=o.div`
  height: 4px;
  background: linear-gradient(
    90deg,
    ${({theme:e})=>e.colors.accent} 0%,
    ${({theme:e})=>e.colors.primary} 50%,
    ${({theme:e})=>e.colors.accent} 100%
  );
  background-size: 200% 100%;
  animation: ${to} 1.5s linear infinite;
`,uo=o(g.button)`
  padding: 0.5rem 1rem;
  font-size: 0.75rem;
  border-radius: ${({theme:e})=>e.spacing.borderRadius}px;
  background: ${({theme:e,$isExplained:t})=>t?e.colors.success:e.colors.accent};
  color: ${({theme:e})=>e.colors.background};
  white-space: nowrap;
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`,fo=o.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.7rem;
  color: ${({theme:e})=>e.colors.textMuted};
  
  &::before {
    content: '';
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${({$confidence:e})=>e>=90?"#4CAF50":e>=70?"#FF9800":"#f44336"};
  }
`,go=({item:e,index:t,isExplained:i,explanation:n,onExplain:r,isLoading:s=!1,showCostComparison:l=!0})=>{var h,F;const[c,u]=p.useState(!1),x=p.useMemo(()=>fi(e),[e]),m=()=>{i?u(!c):r()};return a.jsxs(io,{$isExplained:i,$isDuplicate:e.isDuplicate,initial:{opacity:0,x:-20},animate:{opacity:1,x:0},transition:{delay:t*.1,duration:.3},layout:!0,role:"article","aria-label":`Line item: ${e.description||e.rawText}, Amount: $${((h=e.amount)==null?void 0:h.toFixed(2))||"0.00"}${e.isDuplicate?", Warning: Duplicate charge":""}`,children:[s&&a.jsx(mo,{"aria-label":"Loading explanation"}),a.jsxs(ao,{$isExplained:i,onClick:m,role:"button",tabIndex:0,"aria-expanded":c,"aria-label":i?"Click to expand explanation":"Click to get explanation",onKeyDown:C=>{(C.key==="Enter"||C.key===" ")&&(C.preventDefault(),m())},children:[a.jsxs(no,{children:[a.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"0.5rem"},children:[e.code&&a.jsx(oo,{$isExplained:i,children:e.code}),a.jsxs(fo,{$confidence:e.confidence,children:[e.confidence,"%"]}),e.isDuplicate&&a.jsx(co,{children:"⚠️ Duplicate"})]}),a.jsx(ro,{children:e.description||e.rawText})]}),a.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"0.75rem"},children:[a.jsxs(so,{$isExplained:i,$isDuplicate:e.isDuplicate,children:["$",((F=e.amount)==null?void 0:F.toFixed(2))||"0.00"]}),a.jsx(uo,{$isExplained:i,onClick:C=>{C.stopPropagation(),i?u(!c):r()},disabled:s,whileHover:{scale:1.05},whileTap:{scale:.95},children:s?"🔮":i?c?"▲":"▼":"🔮 Explain"})]})]}),a.jsx(W,{children:i&&c&&a.jsxs(lo,{initial:{height:0,opacity:0},animate:{height:"auto",opacity:1},exit:{height:0,opacity:0},transition:{duration:.3},children:[n&&a.jsx(po,{children:n}),l&&x&&a.jsx("div",{style:{marginTop:"1rem"},children:a.jsx(Qn,{comparison:x})})]})})]})},He={99213:{lineItemId:"",plainEnglish:'This is a standard office visit for an established patient. Your doctor spent about 15-30 minutes with you discussing your symptoms, examining you, and deciding on treatment. The "Level 3" means it was moderately complex - not just a quick check-up, but not a complicated case either.',medicalContext:"Office visits are coded by complexity levels 1-5. Level 3 (99213) is the most common code, used when your visit involves reviewing your history, a focused exam, and straightforward medical decision-making.",costAnalysis:"The typical cost for this visit ranges from $100-$150 at most practices. Your charge of $185 is on the higher end, which is common for hospital-based clinics that add facility fees. This is within normal range but worth noting.",disputeRecommendation:void 0},36415:{lineItemId:"",plainEnglish:"This is the charge for drawing your blood. A trained phlebotomist inserted a needle into your vein to collect blood samples for testing. It's a quick, routine procedure that takes just a few minutes.",medicalContext:"Venipuncture is the medical term for drawing blood from a vein. This is separate from the actual lab tests - you're paying for the skill and supplies needed to collect the blood safely.",costAnalysis:"Blood draws typically cost $20-$40. Your charge of $45 is slightly above average but reasonable. This is a standard charge and not worth disputing.",disputeRecommendation:void 0},80053:{lineItemId:"",plainEnglish:'This is a Comprehensive Metabolic Panel - a blood test that checks 14 different things at once. It looks at your blood sugar, kidney function, liver function, and electrolyte levels. Think of it as a "general health snapshot" from your blood.',medicalContext:"The CMP is one of the most commonly ordered lab panels. It helps doctors screen for diabetes, kidney disease, liver problems, and electrolyte imbalances. It's often part of routine checkups or when investigating symptoms.",costAnalysis:"This panel typically costs $100-$200 at most labs. Your charge of $287 is significantly above average. Hospital labs often charge 2-3x more than independent labs for the same test.",disputeRecommendation:{shouldDispute:!0,reason:"This charge is 40-90% higher than typical costs for this standard lab panel.",talkingPoints:["Ask for an itemized bill showing the lab costs separately","Request a price match to Medicare rates (typically around $14 for this panel)","Ask if you can get future labs done at an independent lab for lower cost","Request a discount for paying in full or setting up a payment plan"]}},85025:{lineItemId:"",plainEnglish:"This is a Complete Blood Count (CBC) - it measures your red blood cells, white blood cells, and platelets. It helps detect infections, anemia, and many other conditions. It's one of the most common blood tests ordered.",medicalContext:"A CBC with differential breaks down your white blood cells into different types, which helps identify specific infections or blood disorders. It's a fundamental diagnostic tool used in almost every medical setting.",costAnalysis:"A CBC typically costs $50-$100. Your charge of $156 is above the typical range. Like other lab tests, hospital pricing tends to be higher than independent labs.",disputeRecommendation:{shouldDispute:!0,reason:"This charge is 50-200% higher than typical costs.",talkingPoints:["Compare this to independent lab pricing (often $30-50)","Ask about financial assistance programs","Request an itemized breakdown of all lab charges"]}},81001:{lineItemId:"",plainEnglish:"This is a urinalysis - a test of your urine using a dipstick. It checks for signs of infection, kidney problems, diabetes, and other conditions. It's quick, non-invasive, and provides a lot of useful information.",medicalContext:"Urinalysis is often done as part of routine checkups or when you have symptoms like painful urination. The dipstick method tests for things like blood, protein, glucose, and bacteria in your urine.",costAnalysis:"A basic urinalysis typically costs $30-$50. Your charge of $78 is moderately above average but not unusual for hospital settings.",disputeRecommendation:void 0},facility:{lineItemId:"",plainEnglish:"This is a facility fee - essentially a charge for using the hospital's building, equipment, and support staff. It covers overhead costs like maintaining the facility, equipment, and having staff available. Many patients are surprised by this charge because it's separate from what your doctor charges.",medicalContext:"Hospital-based clinics charge facility fees because they have higher overhead than independent practices. This fee exists even for simple visits because you're technically receiving care in a hospital outpatient department.",costAnalysis:"Facility fees vary wildly - from $100 to $500+ depending on the hospital and location. Your charge of $425 is on the higher end. These fees are often the most negotiable part of a hospital bill.",disputeRecommendation:{shouldDispute:!0,reason:"Facility fees are often negotiable and may be reduced or waived.",talkingPoints:["Ask why a facility fee was charged for an outpatient visit","Request a reduction based on financial hardship","Ask if the visit could have been coded as a non-facility visit","Inquire about charity care or financial assistance programs","For future visits, ask if there's a non-hospital clinic option"]}}},xo={plainEnglish:"This appears to be a medical service or administrative charge. The specific details depend on what service was provided during your visit.",medicalContext:"Medical billing codes can be complex. If you're unsure what this charge is for, don't hesitate to call the billing department and ask for a detailed explanation.",costAnalysis:"Without knowing the specific service, it's hard to say if this price is typical. You can always ask for an itemized bill and compare prices with other providers in your area.",disputeRecommendation:void 0},ho=e=>new Promise(t=>setTimeout(t,e));async function vo(e,t){var n,r;await ho(800+Math.random()*1200);let i;return e.code&&He[e.code]?i={...He[e.code],lineItemId:e.id}:(n=e.description)!=null&&n.toLowerCase().includes("facility")?i={...He.facility,lineItemId:e.id}:i={...xo,lineItemId:e.id},e.isDuplicate&&(i.disputeRecommendation={shouldDispute:!0,reason:"⚠️ This appears to be a DUPLICATE CHARGE! The same service was billed twice.",talkingPoints:["Point out that this exact charge appears twice on your bill","Request immediate removal of the duplicate","Ask for a corrected bill in writing","If they refuse, file a complaint with your state insurance commissioner"]},i.costAnalysis=`🚨 DUPLICATE DETECTED: This charge of $${(r=e.amount)==null?void 0:r.toFixed(2)} appears to be billed twice. You should NOT pay for the same service twice. This is a billing error that must be corrected.`),i}function bo(e){var i;let t=e.plainEnglish;return e.medicalContext&&(t+=`

📋 Medical Context: ${e.medicalContext}`),e.costAnalysis&&(t+=`

💰 Cost Analysis: ${e.costAnalysis}`),(i=e.disputeRecommendation)!=null&&i.shouldDispute&&(t+=`

⚠️ Consider Disputing: ${e.disputeRecommendation.reason}`,e.disputeRecommendation.talkingPoints.length>0&&(t+=`

Talking Points:
`+e.disputeRecommendation.talkingPoints.map(n=>`• ${n}`).join(`
`))),t}const yo=o(g.div)`
  width: 100%;
  max-width: 700px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`,wo=o.div`
  text-align: center;
`,ko=o.h2`
  font-size: 1.5rem;
  color: ${({theme:e})=>e.colors.text};
  font-family: ${({theme:e})=>e.typography.fontFamilySpooky};
  text-shadow: ${({theme:e})=>e.typography.textShadow};
  margin-bottom: 0.5rem;
`,jo=o.p`
  font-size: 0.875rem;
  color: ${({theme:e})=>e.colors.textMuted};
`,$o=o.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`,Co=o.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`,Mt=o.span`
  font-size: 0.875rem;
  color: ${({theme:e})=>e.colors.text};
`,Do=o.div`
  width: 100%;
  height: 8px;
  background: ${({theme:e})=>e.colors.secondary};
  border-radius: 4px;
  overflow: hidden;
`,Eo=o(g.div)`
  height: 100%;
  background: linear-gradient(
    90deg,
    ${({theme:e})=>e.colors.danger} 0%,
    ${({theme:e})=>e.colors.accent} 50%,
    ${({theme:e})=>e.colors.success} 100%
  );
  border-radius: 4px;
`,Ao=o(g.p)`
  font-size: 0.875rem;
  color: ${({theme:e})=>e.colors.accent};
  text-align: center;
  font-style: italic;
`,So=o.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`,To=o(g.div)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  background: ${({theme:e,$isComplete:t})=>t?e.colors.success+"20":e.colors.surface};
  border: 2px solid ${({theme:e,$isComplete:t})=>t?e.colors.success:e.colors.accent};
  border-radius: ${({theme:e})=>e.spacing.borderRadius}px;
`,zo=o.span`
  font-size: 1rem;
  color: ${({theme:e})=>e.colors.text};
  font-weight: 500;
`,Io=o.span`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({theme:e,$isComplete:t})=>t?e.colors.success:e.colors.accent};
`,Ro=o.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
`,Ue=o(g.button)`
  padding: 0.75rem 1.5rem;
  border-radius: ${({theme:e})=>e.spacing.borderRadius}px;
  font-weight: 600;
  
  ${({$variant:e,theme:t})=>e==="secondary"?`
    background: ${t.colors.surface};
    color: ${t.colors.text};
    border: 1px solid ${t.colors.secondary};
  `:`
    background: ${t.colors.accent};
    color: ${t.colors.background};
  `}
`,Fo=o(g.div)`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.5rem;
  background: ${({theme:e})=>e.colors.danger}15;
  border: 2px solid ${({theme:e})=>e.colors.danger};
  border-radius: ${({theme:e})=>e.spacing.borderRadius}px;
`,Oo=o.span`
  font-size: 2rem;
`,Po=o.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`,Mo=o.span`
  font-weight: 600;
  color: ${({theme:e})=>e.colors.danger};
`,Lo=o.span`
  font-size: 0.875rem;
  color: ${({theme:e})=>e.colors.text};
`,ye=["The spirits are revealing the truth...","Decoding the ancient billing runes...","Light breaks through the darkness...","The curse weakens with each revelation...","Understanding dispels the shadows...","The fog of confusion lifts...","Your bill's secrets are exposed...","The exorcism nears completion..."],Bo=({result:e,onComplete:t})=>{var U;const{setEmotionalState:i}=V(),[n,r]=p.useState({}),[s,l]=p.useState({}),[c,u]=p.useState(new Set),[x,m]=p.useState(ye[0]),[h,F]=p.useState(0),[C,M]=p.useState(0),O=Object.keys(n).length,L=e.lineItems.length,T=L>0?O/L*100:0,z=O===L;p.useEffect(()=>{T===0||T<50?i(j.PROCESSING):T<100?i(j.UNDERSTANDING):i(j.RELIEVED)},[T,i]),p.useEffect(()=>{const y=Object.values(n).filter(D=>{var I;return(I=D.disputeRecommendation)==null?void 0:I.shouldDispute});F(y.length);const w=e.lineItems.filter(D=>{var I,N;return(N=(I=n[D.id])==null?void 0:I.disputeRecommendation)==null?void 0:N.shouldDispute}).reduce((D,I)=>D+(I.amount||0)*.3,0);M(w)},[n,e.lineItems]),p.useEffect(()=>{if(z)return;const y=setInterval(()=>{const w=Math.min(Math.floor(T/100*ye.length),ye.length-1);m(ye[w])},3e3);return()=>clearInterval(y)},[T,z]);const q=p.useCallback(async y=>{if(!(n[y.id]||c.has(y.id))){u(w=>new Set(w).add(y.id));try{const w=await vo(y,{provider:e.metadata.provider,serviceDate:e.metadata.serviceDate});r(D=>({...D,[y.id]:w})),l(D=>({...D,[y.id]:bo(w)}))}catch(w){console.error("Failed to get explanation:",w)}finally{u(w=>{const D=new Set(w);return D.delete(y.id),D})}}},[n,c,e.metadata]),Q=p.useCallback(async()=>{for(const y of e.lineItems)n[y.id]||await q(y)},[e.lineItems,n,q]);return a.jsxs(yo,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5},children:[a.jsxs(wo,{children:[a.jsx(ko,{children:z?"✨ Curse Lifted!":"🔮 Exorcising Your Bill"}),e.metadata.provider&&a.jsxs(jo,{children:[e.metadata.provider," • ",e.metadata.serviceDate]})]}),a.jsxs($o,{children:[a.jsxs(Co,{children:[a.jsx(Mt,{children:z?"All charges explained!":`${O} of ${L} charges explained`}),a.jsxs(Mt,{children:[Math.round(T),"%"]})]}),a.jsx(Do,{children:a.jsx(Eo,{$progress:T,initial:{width:0},animate:{width:`${T}%`},transition:{duration:.5}})})]}),a.jsx(W,{mode:"wait",children:!z&&a.jsx(Ao,{initial:{opacity:0,y:10},animate:{opacity:1,y:0},exit:{opacity:0,y:-10},children:x},x)}),a.jsx(So,{children:e.lineItems.map((y,w)=>a.jsx(go,{item:y,index:w,isExplained:!!n[y.id],explanation:s[y.id],onExplain:()=>q(y),isLoading:c.has(y.id)},y.id))}),z&&h>0&&a.jsxs(Fo,{initial:{opacity:0,scale:.9},animate:{opacity:1,scale:1},children:[a.jsx(Oo,{children:"⚠️"}),a.jsxs(Po,{children:[a.jsxs(Mo,{children:["Found ",h," charge(s) to review!"]}),a.jsxs(Lo,{children:["Potential savings: up to $",C.toFixed(2)]})]})]}),a.jsxs(To,{$isComplete:z,layout:!0,children:[a.jsx(zo,{children:z?"✅ Total Bill":"💀 Haunted Total"}),a.jsxs(Io,{$isComplete:z,children:["$",((U=e.metadata.totalAmount)==null?void 0:U.toFixed(2))||"0.00"]})]}),a.jsxs(Ro,{children:[!z&&a.jsx(Ue,{onClick:Q,whileHover:{scale:1.05},whileTap:{scale:.95},disabled:c.size>0,children:"🔮 Explain All Charges"}),z&&a.jsxs(a.Fragment,{children:[a.jsx(Ue,{onClick:()=>t(n),whileHover:{scale:1.05},whileTap:{scale:.95},children:"📋 View Summary"}),a.jsx(Ue,{$variant:"secondary",whileHover:{scale:1.05},whileTap:{scale:.95},children:"🔄 Start Over"})]})]})]})},_o=R`
  0%, 100% { transform: translateY(0) rotate(0deg); }
  25% { transform: translateY(-10px) rotate(5deg); }
  75% { transform: translateY(-5px) rotate(-5deg); }
`,qo=R`
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
`,No=R`
  0%, 100% { opacity: 0; transform: scale(0); }
  50% { opacity: 1; transform: scale(1); }
`,Ho=o(g.div)`
  width: 100%;
  max-width: 700px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`,Uo=o(g.div)`
  text-align: center;
  padding: 2rem;
  background: linear-gradient(135deg, 
    ${({theme:e})=>e.colors.success}20 0%,
    ${({theme:e})=>e.colors.primary}10 100%
  );
  border-radius: ${({theme:e})=>e.spacing.borderRadius*2}px;
  position: relative;
  overflow: hidden;
`,Go=o.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  
  &::before, &::after {
    content: '✨';
    position: absolute;
    font-size: 1.5rem;
    animation: ${No} 2s ease-in-out infinite;
  }
  
  &::before {
    top: 20%;
    left: 10%;
    animation-delay: 0s;
  }
  
  &::after {
    top: 30%;
    right: 15%;
    animation-delay: 1s;
  }
`,Vo=o(g.span)`
  font-size: 4rem;
  display: block;
  animation: ${_o} 3s ease-in-out infinite;
`,Wo=o.h1`
  font-size: 2rem;
  color: ${({theme:e})=>e.colors.success};
  margin: 1rem 0 0.5rem;
  font-family: ${({theme:e})=>e.typography.fontFamily};
`,Yo=o.p`
  color: ${({theme:e})=>e.colors.text};
  font-size: 1rem;
`,Ge=o(g.div)`
  background: ${({theme:e})=>e.colors.surface};
  border-radius: ${({theme:e})=>e.spacing.borderRadius}px;
  border: 1px solid ${({theme:e})=>e.colors.secondary};
  overflow: hidden;
`,Ve=o.div`
  padding: 1rem 1.5rem;
  background: ${({theme:e,$variant:t})=>t==="success"?e.colors.success+"20":t==="warning"?e.colors.accent+"20":t==="danger"?e.colors.danger+"20":e.colors.secondary+"20"};
  border-bottom: 1px solid ${({theme:e})=>e.colors.secondary};
  display: flex;
  align-items: center;
  gap: 0.75rem;
`,We=o.span`
  font-size: 1.5rem;
`,Ye=o.h3`
  font-size: 1rem;
  color: ${({theme:e})=>e.colors.text};
  margin: 0;
`,Ke=o.div`
  padding: 1.5rem;
`,Ko=o.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  
  @media (max-width: 500px) {
    grid-template-columns: 1fr;
  }
`,we=o.div`
  padding: 1rem;
  background: ${({theme:e,$highlight:t})=>t?e.colors.success+"10":e.colors.background};
  border-radius: ${({theme:e})=>e.spacing.borderRadius}px;
  text-align: center;
`,ke=o.div`
  font-size: 0.75rem;
  color: ${({theme:e})=>e.colors.textMuted};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.5rem;
`,je=o.div`
  font-size: ${({$large:e})=>e?"2rem":"1.5rem"};
  font-weight: 700;
  color: ${({$color:e,theme:t})=>e||t.colors.text};
`,Xo=o(g.div)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: linear-gradient(90deg, 
    ${({theme:e})=>e.colors.success} 0%,
    ${({theme:e})=>e.colors.primary} 100%
  );
  background-size: 200% auto;
  animation: ${qo} 3s linear infinite;
  color: white;
  border-radius: 20px;
  font-weight: 600;
  margin-top: 1rem;
`,Jo=o.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`,Zo=o(g.div)`
  padding: 1rem;
  background: ${({theme:e})=>e.colors.background};
  border-left: 4px solid ${({$severity:e,theme:t})=>e==="high"?t.colors.danger:e==="medium"?t.colors.accent:t.colors.textMuted};
  border-radius: 0 ${({theme:e})=>e.spacing.borderRadius}px ${({theme:e})=>e.spacing.borderRadius}px 0;
`,Qo=o.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.5rem;
`,er=o.span`
  font-size: 0.7rem;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  text-transform: uppercase;
  background: ${({$severity:e,theme:t})=>e==="high"?t.colors.danger+"20":e==="medium"?t.colors.accent+"20":t.colors.textMuted+"20"};
  color: ${({$severity:e,theme:t})=>e==="high"?t.colors.danger:e==="medium"?t.colors.accent:t.colors.textMuted};
`,tr=o.span`
  font-weight: 600;
  color: ${({theme:e})=>e.colors.success};
`,ir=o.p`
  font-size: 0.875rem;
  color: ${({theme:e})=>e.colors.text};
  margin: 0 0 0.75rem;
  line-height: 1.5;
`,ar=o.ul`
  margin: 0;
  padding-left: 1.25rem;
  font-size: 0.8rem;
  color: ${({theme:e})=>e.colors.textMuted};
  
  li {
    margin-bottom: 0.25rem;
  }
`,nr=o.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`,or=o(g.div)`
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background: ${({theme:e})=>e.colors.background};
  border-radius: ${({theme:e})=>e.spacing.borderRadius}px;
`,rr=o.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${({theme:e})=>e.colors.success};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  flex-shrink: 0;
`,sr=o.div`
  flex: 1;
`,cr=o.h4`
  font-size: 0.9rem;
  color: ${({theme:e})=>e.colors.text};
  margin: 0 0 0.25rem;
`,lr=o.p`
  font-size: 0.8rem;
  color: ${({theme:e})=>e.colors.textMuted};
  margin: 0;
  line-height: 1.5;
`,pr=o.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 1rem;
`,Lt=o(g.button)`
  padding: 0.875rem 1.75rem;
  border-radius: ${({theme:e})=>e.spacing.borderRadius}px;
  font-weight: 600;
  font-size: 1rem;
  
  ${({$variant:e,theme:t})=>e==="secondary"?`
    background: ${t.colors.surface};
    color: ${t.colors.text};
    border: 1px solid ${t.colors.secondary};
  `:`
    background: ${t.colors.success};
    color: white;
  `}
`,dr=[{title:"Review Your Itemized Bill",description:"Request a detailed itemized bill from the billing department if you haven't already. Compare it with this analysis."},{title:"Contact Billing Department",description:"Call the number on your bill. Be polite but firm. Reference specific charges and ask for explanations or reductions."},{title:"Document Everything",description:"Keep records of all calls, including dates, times, representative names, and what was discussed or promised."},{title:"Request Financial Assistance",description:"Ask about payment plans, financial hardship programs, or charity care if the bill is difficult to pay."}],mr=({result:e,explanations:t,onStartOver:i})=>{const[n,r]=p.useState(null);p.useEffect(()=>{const c=Nn(e.lineItems);r(c)},[e.lineItems]);const s=()=>{const c=ur(e,n,t),u=new Blob([c],{type:"text/plain"}),x=URL.createObjectURL(u),m=document.createElement("a");m.href=x,m.download=`WTFee-Bill-Analysis-${new Date().toISOString().split("T")[0]}.txt`,m.click(),URL.revokeObjectURL(x)};if(!n)return null;const l=n.disputes.filter(c=>c.severity==="high"||c.severity==="medium");return a.jsxs(Ho,{initial:{opacity:0},animate:{opacity:1},transition:{duration:.5},children:[a.jsxs(Uo,{initial:{scale:.9,opacity:0},animate:{scale:1,opacity:1},transition:{delay:.2,type:"spring"},children:[a.jsx(Go,{}),a.jsx(Vo,{initial:{scale:0},animate:{scale:1},transition:{delay:.4,type:"spring",stiffness:200},children:"🎉"}),a.jsx(Wo,{children:"The Curse Has Been Lifted!"}),a.jsx(Yo,{children:"Your medical bill has been fully decoded and analyzed."}),n.potentialSavings>0&&a.jsxs(Xo,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{delay:.6},children:["💰 Potential Savings: ",P(n.potentialSavings)]})]}),a.jsxs(Ge,{children:[a.jsxs(Ve,{$variant:"success",children:[a.jsx(We,{children:"📊"}),a.jsx(Ye,{children:"Bill Summary"})]}),a.jsx(Ke,{children:a.jsxs(Ko,{children:[a.jsxs(we,{$highlight:!0,children:[a.jsx(ke,{children:"Total Charged"}),a.jsx(je,{$large:!0,children:P(n.totalCharged)})]}),a.jsxs(we,{children:[a.jsx(ke,{children:"Fair Market Value"}),a.jsx(je,{$color:"#4CAF50",children:P(n.fairMarketValue)})]}),a.jsxs(we,{children:[a.jsx(ke,{children:"Items Analyzed"}),a.jsx(je,{children:e.lineItems.length})]}),a.jsxs(we,{children:[a.jsx(ke,{children:"Issues Found"}),a.jsx(je,{$color:l.length>0?"#f44336":"#4CAF50",children:l.length})]})]})})]}),l.length>0&&a.jsxs(Ge,{children:[a.jsxs(Ve,{$variant:"warning",children:[a.jsx(We,{children:"⚠️"}),a.jsxs(Ye,{children:["Charges to Review (",l.length,")"]})]}),a.jsx(Ke,{children:a.jsx(Jo,{children:l.map((c,u)=>a.jsxs(Zo,{$severity:c.severity,initial:{opacity:0,x:-20},animate:{opacity:1,x:0},transition:{delay:u*.1},children:[a.jsxs(Qo,{children:[a.jsxs(er,{$severity:c.severity,children:[c.type," - ",c.severity," priority"]}),a.jsxs(tr,{children:["Save up to ",P(c.potentialSavings)]})]}),a.jsx(ir,{children:c.reason}),a.jsx(ar,{children:c.talkingPoints.slice(0,3).map((x,m)=>a.jsx("li",{children:x},m))})]},u))})})]}),a.jsxs(Ge,{children:[a.jsxs(Ve,{children:[a.jsx(We,{children:"📋"}),a.jsx(Ye,{children:"Your Next Steps"})]}),a.jsx(Ke,{children:a.jsx(nr,{children:dr.map((c,u)=>a.jsxs(or,{initial:{opacity:0,y:10},animate:{opacity:1,y:0},transition:{delay:.5+u*.1},children:[a.jsx(rr,{children:u+1}),a.jsxs(sr,{children:[a.jsx(cr,{children:c.title}),a.jsx(lr,{children:c.description})]})]},u))})})]}),a.jsxs(pr,{children:[a.jsx(Lt,{onClick:s,whileHover:{scale:1.05},whileTap:{scale:.95},children:"📥 Download Summary"}),a.jsx(Lt,{$variant:"secondary",onClick:i,whileHover:{scale:1.05},whileTap:{scale:.95},children:"🔄 Analyze Another Bill"})]})]})};function ur(e,t,i){if(!t)return"";let n=`
═══════════════════════════════════════════════════════════════
                    WTFee - BILL ANALYSIS SUMMARY
═══════════════════════════════════════════════════════════════

Provider: ${e.metadata.provider||"Unknown"}
Service Date: ${e.metadata.serviceDate||"Unknown"}
Analysis Date: ${new Date().toLocaleDateString()}

───────────────────────────────────────────────────────────────
                         BILL TOTALS
───────────────────────────────────────────────────────────────

Total Charged:      ${P(t.totalCharged)}
Fair Market Value:  ${P(t.fairMarketValue)}
Potential Savings:  ${P(t.potentialSavings)}

───────────────────────────────────────────────────────────────
                       LINE ITEMS (${e.lineItems.length})
───────────────────────────────────────────────────────────────

`;for(const r of e.lineItems){const s=i[r.id];n+=`
${r.code||"N/A"} - ${r.description||r.rawText}
Amount: ${P(r.amount||0)}
${s?`
Explanation: ${s.plainEnglish}`:""}
${r.isDuplicate?`
⚠️ DUPLICATE CHARGE DETECTED`:""}
---
`}if(t.disputes.length>0){n+=`
───────────────────────────────────────────────────────────────
                    CHARGES TO DISPUTE (${t.disputes.length})
───────────────────────────────────────────────────────────────

`;for(const r of t.disputes)n+=`
Type: ${r.type.toUpperCase()} (${r.severity} priority)
Potential Savings: ${P(r.potentialSavings)}
Reason: ${r.reason}

Talking Points:
${r.talkingPoints.map(s=>`  • ${s}`).join(`
`)}

Action Steps:
${r.actionSteps.map(s=>`  ${s}`).join(`
`)}
---
`}return n+=`
───────────────────────────────────────────────────────────────
                        NEXT STEPS
───────────────────────────────────────────────────────────────

1. Request an itemized bill from the billing department
2. Call billing and reference specific charges
3. Document all conversations
4. Ask about financial assistance programs

───────────────────────────────────────────────────────────────
Generated by WTFee - What The Fee Medical Bill Decoder
https://github.com/tjohnson012/WTFee
═══════════════════════════════════════════════════════════════
`,n}class fr{constructor(){pe(this,"sessionData",new Map);pe(this,"cleanupTimers",new Map);pe(this,"DEFAULT_TTL",30*60*1e3)}set(t,i,n=this.DEFAULT_TTL){this.clearTimer(t),this.sessionData.set(t,i);const r=setTimeout(()=>{this.delete(t)},n);this.cleanupTimers.set(t,r)}get(t){return this.sessionData.get(t)}delete(t){this.clearTimer(t),this.sessionData.delete(t)}clearAll(){this.cleanupTimers.forEach(t=>clearTimeout(t)),this.cleanupTimers.clear(),this.sessionData.clear()}clearTimer(t){const i=this.cleanupTimers.get(t);i&&(clearTimeout(i),this.cleanupTimers.delete(t))}}const Bt=new fr,_t={title:"Your Privacy Matters",points:["Your medical bill is processed locally and temporarily","No personal health information is permanently stored","Data is automatically deleted after your session ends","We do not share your information with third parties","All data transmission is encrypted"]},gr=o(g.div)`
  padding: ${({$compact:e})=>e?"0.75rem 1rem":"1rem 1.5rem"};
  background: ${({theme:e})=>e.colors.surface};
  border: 1px solid ${({theme:e})=>e.colors.secondary};
  border-radius: ${({theme:e})=>e.spacing.borderRadius}px;
  font-size: ${({$compact:e})=>e?"0.75rem":"0.875rem"};
`,xr=o.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
`,hr=o.span`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${({theme:e})=>e.colors.text};
  font-weight: 500;
`,vr=o.button`
  background: none;
  color: ${({theme:e})=>e.colors.textMuted};
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  
  &:hover {
    color: ${({theme:e})=>e.colors.text};
  }
`,br=o(g.ul)`
  margin: 0.75rem 0 0;
  padding-left: 1.5rem;
  color: ${({theme:e})=>e.colors.textMuted};
  line-height: 1.6;
  
  li {
    margin-bottom: 0.25rem;
  }
`,yr=({compact:e=!1})=>{const[t,i]=p.useState(!e);return a.jsxs(gr,{$compact:e,children:[a.jsxs(xr,{onClick:()=>i(!t),children:[a.jsxs(hr,{children:["🔒 ",_t.title]}),e&&a.jsx(vr,{children:t?"▲ Less":"▼ More"})]}),a.jsx(W,{children:t&&a.jsx(br,{initial:{height:0,opacity:0},animate:{height:"auto",opacity:1},exit:{height:0,opacity:0},transition:{duration:.2},children:_t.points.map((n,r)=>a.jsx("li",{children:n},r))})})]})};o.a`
  position: absolute;
  top: -40px;
  left: 0;
  background: ${({theme:e})=>e.colors.accent};
  color: ${({theme:e})=>e.colors.background};
  padding: 8px 16px;
  z-index: 1000;
  text-decoration: none;
  font-weight: 600;
  border-radius: 0 0 4px 0;
  
  &:focus {
    top: 0;
  }
`;o.main`
  flex: 1;
  display: flex;
  flex-direction: column;
`;const wr=o.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  padding: 2rem;
  text-align: center;
`,kr=o.span`
  font-size: 4rem;
  margin-bottom: 1rem;
`,jr=o.h2`
  font-size: 1.5rem;
  color: #f44336;
  margin-bottom: 0.5rem;
`,$r=o.p`
  color: #666;
  margin-bottom: 1.5rem;
  max-width: 400px;
`,Cr=o.button`
  padding: 0.75rem 1.5rem;
  background: #ff8c00;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  
  &:hover {
    background: #e67e00;
  }
`;class Dr extends p.Component{constructor(i){super(i);pe(this,"handleRetry",()=>{this.setState({hasError:!1,error:null})});this.state={hasError:!1,error:null}}static getDerivedStateFromError(i){return{hasError:!0,error:i}}componentDidCatch(i,n){console.error("Error caught by boundary:",i,n)}render(){return this.state.hasError?this.props.fallback?this.props.fallback:a.jsxs(wr,{role:"alert",children:[a.jsx(kr,{children:"👻"}),a.jsx(jr,{children:"Something Went Wrong"}),a.jsx($r,{children:"The spirits encountered an unexpected disturbance. Don't worry, your data is safe."}),a.jsx(Cr,{onClick:this.handleRetry,children:"🔄 Try Again"})]}):this.props.children}}function Er(){const[e,t]=p.useState(()=>typeof navigator>"u"?!0:navigator.onLine);return p.useEffect(()=>{const i=()=>t(!0),n=()=>t(!1);return window.addEventListener("online",i),window.addEventListener("offline",n),()=>{window.removeEventListener("online",i),window.removeEventListener("offline",n)}},[]),e}const Ar=o(g.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding: 0.75rem 1rem;
  background: #f44336;
  color: white;
  text-align: center;
  font-weight: 500;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`,Sr=o.span`
  font-size: 1.25rem;
`,Tr=()=>{const e=Er();return a.jsx(W,{children:!e&&a.jsxs(Ar,{initial:{y:-50,opacity:0},animate:{y:0,opacity:1},exit:{y:-50,opacity:0},role:"alert","aria-live":"assertive",children:[a.jsx(Sr,{children:"📡"}),"You're offline. Some features may not work until you reconnect."]})})},zr=R`
  0%, 100% { opacity: 0.4; }
  50% { opacity: 0.8; }
`;o.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 200px;
  gap: 1rem;
`;o.div`
  width: 40px;
  height: 40px;
  border: 3px solid ${({theme:e})=>e.colors.secondary};
  border-top-color: ${({theme:e})=>e.colors.accent};
  border-radius: 50%;
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;o.p`
  color: ${({theme:e})=>e.colors.textMuted};
  font-size: 0.875rem;
  animation: ${zr} 1.5s ease-in-out infinite;
`;const qt=[{id:"er-1",rawText:"99284 Emergency Dept Visit Level 4 $1,245.00",code:"99284",description:"Emergency Department Visit - Level 4 (High Complexity)",amount:1245,date:"10/31/2024",confidence:96},{id:"er-2",rawText:"71046 Chest X-Ray 2 Views $487.00",code:"71046",description:"Chest X-Ray, 2 Views (Front and Side)",amount:487,date:"10/31/2024",confidence:94},{id:"er-3",rawText:"80053 Comprehensive Metabolic Panel $312.00",code:"80053",description:"Comprehensive Metabolic Panel (14 Tests)",amount:312,date:"10/31/2024",confidence:95},{id:"er-4",rawText:"85025 Complete Blood Count $178.00",code:"85025",description:"Complete Blood Count (CBC) with Differential",amount:178,date:"10/31/2024",confidence:93},{id:"er-5",rawText:"Facility Fee Emergency Services $2,150.00",description:"Hospital Facility Fee - Emergency Services",amount:2150,date:"10/31/2024",confidence:89},{id:"er-6",rawText:"99284 Emergency Dept Visit Level 4 $1,245.00",code:"99284",description:"Emergency Department Visit - Level 4 (High Complexity)",amount:1245,date:"10/31/2024",confidence:96,isDuplicate:!0}],Nt=[{id:"chk-1",rawText:"99213 Office Visit Level 3 $185.00",code:"99213",description:"Office/Outpatient Visit, Established Patient (Level 3)",amount:185,date:"10/15/2024",confidence:95},{id:"chk-2",rawText:"36415 Venipuncture $45.00",code:"36415",description:"Collection of venous blood by venipuncture",amount:45,date:"10/15/2024",confidence:92},{id:"chk-3",rawText:"80053 Comprehensive Metabolic Panel $287.00",code:"80053",description:"Comprehensive Metabolic Panel (14 tests)",amount:287,date:"10/15/2024",confidence:94},{id:"chk-4",rawText:"85025 Complete Blood Count $156.00",code:"85025",description:"Complete Blood Count (CBC) with Differential",amount:156,date:"10/15/2024",confidence:93},{id:"chk-5",rawText:"81001 Urinalysis $78.00",code:"81001",description:"Urinalysis, by dip stick or tablet reagent",amount:78,date:"10/15/2024",confidence:91},{id:"chk-6",rawText:"Facility Fee $425.00",description:"Hospital Facility Fee - Outpatient Services",amount:425,date:"10/15/2024",confidence:88},{id:"chk-7",rawText:"99213 Office Visit Level 3 $185.00",code:"99213",description:"Office/Outpatient Visit, Established Patient (Level 3)",amount:185,date:"10/15/2024",confidence:95,isDuplicate:!0}],Ht={"er-visit":{billId:"demo-er-visit",lineItems:qt,metadata:{provider:"Haunted Memorial Hospital",serviceDate:"10/31/2024",totalAmount:qt.reduce((e,t)=>e+(t.amount||0),0),accountNumber:"SPOOKY-2024-1031",pageCount:1,extractedAt:new Date().toISOString()},confidence:94,status:"complete"},"routine-checkup":{billId:"demo-routine-checkup",lineItems:Nt,metadata:{provider:"Memorial General Hospital",serviceDate:"10/15/2024",totalAmount:Nt.reduce((e,t)=>e+(t.amount||0),0),accountNumber:"MRN-2024-78542",pageCount:1,extractedAt:new Date().toISOString()},confidence:92,status:"complete"}},Ir=o(g.div)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.5rem;
  background: ${({theme:e})=>e.colors.surface};
  border: 2px dashed ${({theme:e})=>e.colors.accent};
  border-radius: ${({theme:e})=>e.spacing.borderRadius}px;
  margin-top: 1rem;
`,Rr=o.h3`
  font-size: 1rem;
  color: ${({theme:e})=>e.colors.accent};
  text-align: center;
  margin: 0;
`,Fr=o.div`
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  justify-content: center;
`,Ut=o(g.button)`
  padding: 0.75rem 1.25rem;
  background: ${({theme:e})=>e.colors.accent};
  color: ${({theme:e})=>e.colors.background};
  border-radius: ${({theme:e})=>e.spacing.borderRadius}px;
  font-weight: 600;
  font-size: 0.875rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  min-width: 140px;
`,Gt=o.span`
  font-size: 1.5rem;
`,Vt=o.span`
  font-size: 0.75rem;
  opacity: 0.9;
`,Or=({onSelectDemo:e})=>a.jsxs(Ir,{initial:{opacity:0,y:10},animate:{opacity:1,y:0},transition:{delay:.3},children:[a.jsx(Rr,{children:"🎃 Quick Demo - Select a Sample Bill"}),a.jsxs(Fr,{children:[a.jsxs(Ut,{onClick:()=>e(Ht["er-visit"]),whileHover:{scale:1.05},whileTap:{scale:.95},children:[a.jsx(Gt,{children:"🏥"}),"ER Visit",a.jsx(Vt,{children:"$5,617 • 6 items"})]}),a.jsxs(Ut,{onClick:()=>e(Ht["routine-checkup"]),whileHover:{scale:1.05},whileTap:{scale:.95},children:[a.jsx(Gt,{children:"🩺"}),"Routine Checkup",a.jsx(Vt,{children:"$1,361 • 7 items"})]})]})]});var nt=(e=>(e.UPLOADED="uploaded",e.EXTRACTING="extracting",e.ANALYZING="analyzing",e.COMPLETE="complete",e.ERROR="error",e))(nt||{});const Xe=[{id:"1",rawText:"99213 Office Visit Level 3 $185.00",code:"99213",description:"Office/Outpatient Visit, Established Patient (Level 3)",amount:185,date:"10/15/2024",confidence:95},{id:"2",rawText:"36415 Venipuncture $45.00",code:"36415",description:"Collection of venous blood by venipuncture",amount:45,date:"10/15/2024",confidence:92},{id:"3",rawText:"80053 Comprehensive Metabolic Panel $287.00",code:"80053",description:"Comprehensive Metabolic Panel (14 tests)",amount:287,date:"10/15/2024",confidence:94},{id:"4",rawText:"85025 Complete Blood Count $156.00",code:"85025",description:"Complete Blood Count (CBC) with Differential",amount:156,date:"10/15/2024",confidence:93},{id:"5",rawText:"Facility Fee $425.00",description:"Hospital Facility Fee - Outpatient Services",amount:425,date:"10/15/2024",confidence:88,isDuplicate:!1},{id:"6",rawText:"99213 Office Visit Level 3 $185.00",code:"99213",description:"Office/Outpatient Visit, Established Patient (Level 3)",amount:185,date:"10/15/2024",confidence:95,isDuplicate:!0},{id:"7",rawText:"81001 Urinalysis $78.00",code:"81001",description:"Urinalysis, by dip stick or tablet reagent",amount:78,date:"10/15/2024",confidence:91}],Pr={provider:"Memorial General Hospital",serviceDate:"10/15/2024",totalAmount:1361,accountNumber:"MRN-2024-78542",pageCount:1,extractedAt:new Date().toISOString()},oe=e=>new Promise(t=>setTimeout(t,e));class Mr{async uploadAndProcess(t,i){return i==null||i("Preparing the cursed document...",10),await oe(800),i==null||i("Uploading to the spirit realm...",25),await oe(1200),i==null||i("Summoning the bill demons...",40),await oe(1e3),i==null||i("Deciphering ancient medical codes...",60),await oe(1500),i==null||i("Exorcising hidden charges...",80),await oe(1e3),i==null||i("The curse is lifting...",95),await oe(500),{billId:`bill-${Date.now()}`,lineItems:Xe,metadata:Pr,confidence:92,status:nt.COMPLETE}}async getProcessingStatus(t){return{billId:t,status:nt.COMPLETE,progress:100,lineItemsProcessed:Xe.length,totalLineItems:Xe.length}}}const Lr=new Mr,Br=()=>(console.log("🎃 Running in demo mode with mock data"),Lr),_r=async(e,t)=>Br().uploadAndProcess(e,t),Je=o.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  max-width: 600px;
  width: 100%;
  text-align: center;
`,qr=o.h1`
  font-size: 2.5rem;
  color: ${({theme:e})=>e.colors.text};
  font-family: ${({theme:e})=>e.typography.fontFamilySpooky};
  text-shadow: ${({theme:e})=>e.typography.textShadow};
  margin-bottom: 0.5rem;
`,Nr=o.h2`
  font-size: 1.25rem;
  color: ${({theme:e})=>e.colors.textMuted};
  font-weight: normal;
  margin-bottom: 1rem;
`,Wt=o.p`
  color: ${({theme:e})=>e.colors.textMuted};
  font-size: 1rem;
  line-height: 1.8;
  max-width: 500px;
`,Hr=o.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  justify-content: center;
  margin-top: 1rem;
`,Ur=o(g.button)`
  padding: 0.5rem 1rem;
  border-radius: ${({theme:e})=>e.spacing.borderRadius}px;
  background: ${({$active:e,theme:t})=>e?t.colors.accent:t.colors.surface};
  color: ${({$active:e,theme:t})=>e?t.colors.background:t.colors.text};
  font-size: 0.875rem;
  font-weight: 500;
  box-shadow: ${({theme:e})=>e.spacing.shadows[0]};
  border: 1px solid ${({theme:e})=>e.colors.secondary};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({theme:e})=>e.spacing.shadows[1]};
  }
`,Gr=o.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
`,Ze=o(g.button)`
  padding: 0.75rem 1.5rem;
  border-radius: ${({theme:e})=>e.spacing.borderRadius}px;
  background: ${({theme:e})=>e.colors.accent};
  color: ${({theme:e})=>e.colors.background};
  font-weight: 600;
  box-shadow: ${({theme:e})=>e.spacing.shadows[0]};
  
  &:hover {
    box-shadow: ${({theme:e})=>e.spacing.shadows[1]};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`,Yt=o.div`
  width: 100%;
  height: 1px;
  background: ${({theme:e})=>e.colors.secondary};
  margin: 1rem 0;
`,Vr=o.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  background: rgba(255, 0, 0, 0.1);
  border: 1px solid ${({theme:e})=>e.colors.danger};
  border-radius: ${({theme:e})=>e.spacing.borderRadius}px;
  color: ${({theme:e})=>e.colors.danger};
`,Wr=o.button`
  padding: 0.5rem 1rem;
  background: ${({theme:e})=>e.colors.danger};
  color: white;
  border-radius: ${({theme:e})=>e.spacing.borderRadius}px;
  font-size: 0.875rem;
  
  &:hover {
    opacity: 0.9;
  }
`,Kt=o.div`
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
  justify-content: center;
  padding: 1rem;
  background: ${({theme:e})=>e.colors.surface};
  border-radius: ${({theme:e})=>e.spacing.borderRadius}px;
  border: 1px solid ${({theme:e})=>e.colors.secondary};
`,re=o.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  
  span {
    font-size: 0.75rem;
    color: ${({theme:e})=>e.colors.textMuted};
  }
  
  strong {
    font-size: 1.25rem;
    color: ${({theme:e})=>e.colors.accent};
  }
`,Yr=o.div`
  position: fixed;
  top: 1rem;
  right: 1rem;
  padding: 0.5rem 1rem;
  background: ${({theme:e})=>e.colors.accent};
  color: ${({theme:e})=>e.colors.background};
  border-radius: ${({theme:e})=>e.spacing.borderRadius}px;
  font-size: 0.75rem;
  font-weight: 600;
  z-index: 100;
`;function Kr(){var ee,Y;const{emotionalState:e,setEmotionalState:t}=V(),[i,n]=p.useState(null),[r,s]=p.useState(!1),[l,c]=p.useState(0),[u,x]=p.useState("uploading"),[m,h]=p.useState(null),[F,C]=p.useState(""),[M,O]=p.useState(null),[L,T]=p.useState(!1),[z,q]=p.useState(!1),[Q,U]=p.useState({}),y=[{state:j.HAUNTED,label:"👻 Haunted"},{state:j.PROCESSING,label:"⚡ Processing"},{state:j.UNDERSTANDING,label:"💡 Understanding"},{state:j.RELIEVED,label:"😌 Relieved"}];p.useEffect(()=>{const v=()=>{Bt.clearAll()};return window.addEventListener("beforeunload",v),()=>{window.removeEventListener("beforeunload",v),Bt.clearAll()}},[]);const w=p.useCallback(async v=>{var S;n(v),s(!0),c(0),x("uploading"),O(null),h(null);try{const G=await _r(v,(me,K)=>{C(me),c(K),K<50?x("uploading"):K<100&&x("processing")});h(G),x("complete"),s(!1),t(j.PROCESSING),console.log("Document processed:",G),console.log(`Found ${G.lineItems.length} line items`),console.log(`Total: $${(S=G.metadata.totalAmount)==null?void 0:S.toFixed(2)}`)}catch(G){console.error("Processing failed:",G),O(G.message||"Failed to process document"),x("error"),s(!1)}},[t]),D=()=>{n(null),s(!1),c(0),x("uploading"),h(null),O(null),t(j.HAUNTED)},I=()=>{T(!0),t(j.PROCESSING)},N=v=>{U(v),q(!0),T(!1),t(j.RELIEVED)},ce=()=>{n(null),s(!1),c(0),x("uploading"),h(null),O(null),T(!1),q(!1),U({}),t(j.HAUNTED)};return z&&m?a.jsx(Je,{style:{maxWidth:"800px"},children:a.jsx(mr,{result:m,explanations:Q,onStartOver:ce})}):L&&m?a.jsxs(Je,{style:{maxWidth:"800px"},children:[a.jsx(Bo,{result:m,onComplete:N}),a.jsx(Yt,{}),a.jsx(Ze,{onClick:ce,whileHover:{scale:1.05},whileTap:{scale:.95},style:{background:"transparent",border:"1px solid",borderColor:"inherit"},children:"← Upload Another Bill"})]}):a.jsxs(Je,{children:[a.jsxs("div",{children:[a.jsx(qr,{children:a.jsx(Oi,{children:"WTFee"})}),a.jsx(Nr,{children:"What The Fee - Medical Bill Decoder"})]}),a.jsx(Wt,{children:"Upload your haunted medical bill and let us exorcise the confusion. We'll translate the cryptic codes and reveal what you're really being charged for."}),a.jsx(yr,{compact:!0}),a.jsx(Gr,{children:a.jsx(W,{mode:"wait",children:!i&&!m?a.jsxs(a.Fragment,{children:[a.jsx(sn,{onFileUpload:w,isProcessing:r},"upload-zone"),a.jsx(Or,{onSelectDemo:v=>{h(v),x("complete"),t(j.PROCESSING)}})]}):i?a.jsxs(g.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},style:{width:"100%",display:"flex",flexDirection:"column",alignItems:"center",gap:"1rem"},children:[a.jsx(Ln,{file:i,onRemove:D}),r&&a.jsx(jn,{progress:Math.min(l,100),fileName:i.name,status:u,message:F}),M&&a.jsxs(Vr,{children:["⚠️ ",M,a.jsx(Wr,{onClick:()=>w(i),children:"Try Again"})]}),!r&&u==="complete"&&m&&a.jsxs(a.Fragment,{children:[a.jsxs(Kt,{children:[a.jsxs(re,{children:[a.jsx("span",{children:"📋 Line Items Found"}),a.jsx("strong",{children:m.lineItems.length})]}),a.jsxs(re,{children:[a.jsx("span",{children:"💰 Total Amount"}),a.jsxs("strong",{children:["$",((ee=m.metadata.totalAmount)==null?void 0:ee.toFixed(2))||"0.00"]})]}),a.jsxs(re,{children:[a.jsx("span",{children:"🎯 Confidence"}),a.jsxs("strong",{children:[m.confidence,"%"]})]})]}),a.jsx(Ze,{onClick:I,whileHover:{scale:1.05},whileTap:{scale:.95},children:"🔮 Begin the Exorcism"})]})]},"file-preview"):m&&!i?a.jsxs(g.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},style:{width:"100%",display:"flex",flexDirection:"column",alignItems:"center",gap:"1rem"},children:[a.jsxs(Kt,{children:[a.jsxs(re,{children:[a.jsx("span",{children:"📋 Line Items Found"}),a.jsx("strong",{children:m.lineItems.length})]}),a.jsxs(re,{children:[a.jsx("span",{children:"💰 Total Amount"}),a.jsxs("strong",{children:["$",((Y=m.metadata.totalAmount)==null?void 0:Y.toFixed(2))||"0.00"]})]}),a.jsxs(re,{children:[a.jsx("span",{children:"🎯 Confidence"}),a.jsxs("strong",{children:[m.confidence,"%"]})]})]}),a.jsx(Ze,{onClick:I,whileHover:{scale:1.05},whileTap:{scale:.95},children:"🔮 Begin the Exorcism"})]},"demo-result"):null})}),a.jsx(Yt,{}),a.jsxs("div",{children:[a.jsx(Wt,{style:{fontSize:"0.875rem",marginBottom:"0.75rem"},children:"Preview emotional states:"}),a.jsx(Hr,{children:y.map(({state:v,label:S})=>a.jsx(Ur,{$active:e===v,onClick:()=>t(v),whileHover:{scale:1.05},whileTap:{scale:.95},children:S},v))})]})]})}function Xr(){return a.jsx(Dr,{children:a.jsxs(Ii,{initialState:j.HAUNTED,children:[a.jsx(Ri,{}),a.jsx(Tr,{}),a.jsx(Yr,{children:"🎃 Demo Mode"}),a.jsx(Wi,{children:a.jsx(Kr,{})})]})})}Jt(document.getElementById("root")).render(a.jsx(p.StrictMode,{children:a.jsx(Xr,{})}));
