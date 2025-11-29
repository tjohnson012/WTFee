var ft=Object.defineProperty;var gt=(e,i,t)=>i in e?ft(e,i,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[i]=t;var ce=(e,i,t)=>gt(e,typeof i!="symbol"?i+"":i,t);import{j as a,m as g,A as Y}from"./framer-motion-e-RdDy7j.js";import{a as xt,r as p,g as ht,R as Ui}from"./react-vendor-F9Y4d3HK.js";import{o as vt,f as bt,d as o,m as R,l as S}from"./styled-components-KNnoHVUo.js";(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const l of s.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&n(l)}).observe(document,{childList:!0,subtree:!0});function t(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(r){if(r.ep)return;r.ep=!0;const s=t(r);fetch(r.href,s)}})();var Hi,gi=xt;Hi=gi.createRoot,gi.hydrateRoot;var C=(e=>(e.HAUNTED="haunted",e.PROCESSING="processing",e.UNDERSTANDING="understanding",e.RELIEVED="relieved",e))(C||{});const yt={colors:{primary:"#8B0000",secondary:"#4A0E0E",background:"#0D0D0D",surface:"#1A1A1A",text:"#C4C4C4",textMuted:"#666666",accent:"#FF4444",danger:"#FF0000",success:"#2D5A27",fog:"rgba(30, 30, 40, 0.6)",glow:"rgba(255, 68, 68, 0.4)"},typography:{fontFamily:'"Inter", -apple-system, sans-serif',fontFamilySpooky:'"Creepster", "Inter", cursive',letterSpacing:"0.02em",textShadow:"0 0 10px rgba(255, 68, 68, 0.3)"},spacing:{borderRadius:2,shadows:["0 4px 20px rgba(0, 0, 0, 0.8)","0 0 40px rgba(139, 0, 0, 0.3)","inset 0 0 60px rgba(0, 0, 0, 0.5)"]},animations:{duration:.3,easing:"cubic-bezier(0.4, 0, 0.2, 1)",flicker:!0,float:!0},effects:{fogOpacity:.6,glowIntensity:.8,shadowMovement:!0,ghostShapes:!0,parchmentTexture:!0}},wt={colors:{primary:"#7B3F00",secondary:"#3D2914",background:"#141414",surface:"#1F1F1F",text:"#D4D4D4",textMuted:"#888888",accent:"#FF8C00",danger:"#FF6B6B",success:"#3D7A35",fog:"rgba(40, 35, 30, 0.4)",glow:"rgba(255, 140, 0, 0.3)"},typography:{fontFamily:'"Inter", -apple-system, sans-serif',fontFamilySpooky:'"Creepster", "Inter", cursive',letterSpacing:"0.01em",textShadow:"0 0 6px rgba(255, 140, 0, 0.2)"},spacing:{borderRadius:4,shadows:["0 4px 16px rgba(0, 0, 0, 0.6)","0 0 30px rgba(123, 63, 0, 0.2)"]},animations:{duration:.4,easing:"cubic-bezier(0.4, 0, 0.2, 1)",flicker:!0,float:!0},effects:{fogOpacity:.4,glowIntensity:.5,shadowMovement:!0,ghostShapes:!0,parchmentTexture:!0}},kt={colors:{primary:"#2E7D32",secondary:"#1B4D1E",background:"#1A1D1A",surface:"#242824",text:"#E8E8E8",textMuted:"#AAAAAA",accent:"#66BB6A",danger:"#EF5350",success:"#4CAF50",fog:"rgba(46, 125, 50, 0.15)",glow:"rgba(102, 187, 106, 0.2)"},typography:{fontFamily:'"Inter", -apple-system, sans-serif',fontFamilySpooky:'"Inter", -apple-system, sans-serif',letterSpacing:"0",textShadow:"none"},spacing:{borderRadius:8,shadows:["0 4px 12px rgba(0, 0, 0, 0.3)","0 0 20px rgba(46, 125, 50, 0.1)"]},animations:{duration:.5,easing:"cubic-bezier(0.4, 0, 0.2, 1)",flicker:!1,float:!1},effects:{fogOpacity:.15,glowIntensity:.2,shadowMovement:!1,ghostShapes:!1,parchmentTexture:!1}},jt={colors:{primary:"#1976D2",secondary:"#0D47A1",background:"#FAFAFA",surface:"#FFFFFF",text:"#212121",textMuted:"#757575",accent:"#42A5F5",danger:"#E53935",success:"#43A047",fog:"transparent",glow:"rgba(66, 165, 245, 0.1)"},typography:{fontFamily:'"Inter", -apple-system, sans-serif',fontFamilySpooky:'"Inter", -apple-system, sans-serif',letterSpacing:"0",textShadow:"none"},spacing:{borderRadius:12,shadows:["0 2px 8px rgba(0, 0, 0, 0.1)","0 4px 16px rgba(0, 0, 0, 0.08)"]},animations:{duration:.6,easing:"cubic-bezier(0.4, 0, 0.2, 1)",flicker:!1,float:!1},effects:{fogOpacity:0,glowIntensity:0,shadowMovement:!1,ghostShapes:!1,parchmentTexture:!1}},$t={[C.HAUNTED]:yt,[C.PROCESSING]:wt,[C.UNDERSTANDING]:kt,[C.RELIEVED]:jt},Gi=p.createContext(void 0);function Ct({children:e,initialState:i=C.HAUNTED}){const[t,n]=p.useState(i),[r,s]=p.useState(0),l=p.useMemo(()=>typeof window>"u"?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),c=p.useMemo(()=>$t[t],[t]),m=p.useCallback((u,h=1e3)=>{n(u)},[]),x=p.useMemo(()=>({emotionalState:t,theme:c,progress:r,setEmotionalState:n,setProgress:s,transitionTo:m,prefersReducedMotion:l}),[t,c,r,m,l]);return a.jsx(Gi.Provider,{value:x,children:a.jsx(vt,{theme:c,children:e})})}function W(){const e=p.useContext(Gi);if(!e)throw new Error("useEmotionalTheme must be used within EmotionalThemeProvider");return e}const Dt=bt`
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
`,At=o(g.span)`
  display: inline-block;
`;function Et({children:e,intensity:i=1,className:t}){const{theme:n,prefersReducedMotion:r}=W();if(!n.animations.flicker||r)return a.jsx("span",{className:t,children:e});const s={animate:{opacity:[1,.8,1,.9,1,.85,1],textShadow:[n.typography.textShadow,`0 0 ${15*i}px rgba(255, 68, 68, 0.5)`,n.typography.textShadow,`0 0 ${8*i}px rgba(255, 68, 68, 0.3)`,n.typography.textShadow],transition:{duration:3+Math.random()*2,repeat:1/0,ease:"linear"}}};return a.jsx(At,{className:t,variants:s,animate:"animate",children:e})}const St=o.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
`,Tt=o(g.div)`
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
`;function zt(){const{theme:e,prefersReducedMotion:i}=W(),t=p.useMemo(()=>e.effects.ghostShapes?Array.from({length:5},(n,r)=>({id:r,x:Math.random()*100,y:Math.random()*100,size:100+Math.random()*200,duration:15+Math.random()*10})):[],[e.effects.ghostShapes]);return!e.effects.ghostShapes||t.length===0?null:a.jsx(St,{children:t.map(n=>a.jsx(Tt,{$size:n.size,initial:{x:`${n.x}vw`,y:`${n.y}vh`,opacity:0},animate:i?{opacity:.3}:{x:[`${n.x}vw`,`${n.x+10}vw`,`${n.x-5}vw`,`${n.x}vw`],y:[`${n.y}vh`,`${n.y-15}vh`,`${n.y+5}vh`,`${n.y}vh`],opacity:[.2,.4,.1,.2]},transition:{duration:n.duration,repeat:1/0,ease:"easeInOut"}},n.id))})}const It=o(g.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 1;
  overflow: hidden;
`,Rt=o(g.div)`
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
`;function Ft(){const{theme:e,prefersReducedMotion:i}=W();if(e.effects.fogOpacity===0)return null;const t={animate:n=>({x:i?0:[0,50,-30,0],y:i?0:[0,-30,20,0],scale:i?1:[1,1.1,.95,1],transition:{duration:20+n*5,repeat:1/0,ease:"linear"}})};return a.jsx(It,{initial:{opacity:0},animate:{opacity:e.effects.fogOpacity},transition:{duration:1},children:[0,1,2].map(n=>a.jsx(Rt,{$layer:n,custom:n,variants:t,animate:"animate"},n))})}const Ot=o(g.div)`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow-x: hidden;
`,Pt=o.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  position: relative;
  z-index: 10;
`,Mt=o(g.header)`
  padding: 1.5rem 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 10;
`,Lt=o(g.h1)`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${({theme:e})=>e.colors.accent};
  text-shadow: ${({theme:e})=>e.typography.textShadow};
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`,_t=o(g.p)`
  font-size: 1rem;
  color: ${({theme:e})=>e.colors.textMuted};
  margin-top: 0.5rem;
  text-align: center;
`;function Bt({children:e}){const{prefersReducedMotion:i}=W();return a.jsxs(Ot,{initial:{opacity:0},animate:{opacity:1},transition:{duration:i?0:.5},children:[a.jsx(zt,{}),a.jsx(Ft,{}),a.jsx(Mt,{children:a.jsxs("div",{style:{textAlign:"center"},children:[a.jsx(Lt,{initial:{y:-20,opacity:0},animate:{y:0,opacity:1},transition:{delay:.2,duration:.5},children:"WTFee"}),a.jsx(_t,{initial:{y:-10,opacity:0},animate:{y:0,opacity:1},transition:{delay:.4,duration:.5},children:"What The Fee — Demystify Your Medical Bills"})]})}),a.jsx(Pt,{children:e})]})}var Wi={exports:{}},qt="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED",Nt=qt,Ut=Nt;function Yi(){}function Vi(){}Vi.resetWarningCache=Yi;var Ht=function(){function e(n,r,s,l,c,m){if(m!==Ut){var x=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw x.name="Invariant Violation",x}}e.isRequired=e;function i(){return e}var t={array:e,bigint:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:i,element:e,elementType:e,instanceOf:i,node:e,objectOf:i,oneOf:i,oneOfType:i,shape:i,exact:i,checkPropTypes:Vi,resetWarningCache:Yi};return t.PropTypes=t,t};Wi.exports=Ht();var Gt=Wi.exports;const v=ht(Gt);function X(e,i,t,n){function r(s){return s instanceof t?s:new t(function(l){l(s)})}return new(t||(t=Promise))(function(s,l){function c(u){try{x(n.next(u))}catch(h){l(h)}}function m(u){try{x(n.throw(u))}catch(h){l(h)}}function x(u){u.done?s(u.value):r(u.value).then(c,m)}x((n=n.apply(e,i||[])).next())})}const Wt=new Map([["1km","application/vnd.1000minds.decision-model+xml"],["3dml","text/vnd.in3d.3dml"],["3ds","image/x-3ds"],["3g2","video/3gpp2"],["3gp","video/3gp"],["3gpp","video/3gpp"],["3mf","model/3mf"],["7z","application/x-7z-compressed"],["7zip","application/x-7z-compressed"],["123","application/vnd.lotus-1-2-3"],["aab","application/x-authorware-bin"],["aac","audio/x-acc"],["aam","application/x-authorware-map"],["aas","application/x-authorware-seg"],["abw","application/x-abiword"],["ac","application/vnd.nokia.n-gage.ac+xml"],["ac3","audio/ac3"],["acc","application/vnd.americandynamics.acc"],["ace","application/x-ace-compressed"],["acu","application/vnd.acucobol"],["acutc","application/vnd.acucorp"],["adp","audio/adpcm"],["aep","application/vnd.audiograph"],["afm","application/x-font-type1"],["afp","application/vnd.ibm.modcap"],["ahead","application/vnd.ahead.space"],["ai","application/pdf"],["aif","audio/x-aiff"],["aifc","audio/x-aiff"],["aiff","audio/x-aiff"],["air","application/vnd.adobe.air-application-installer-package+zip"],["ait","application/vnd.dvb.ait"],["ami","application/vnd.amiga.ami"],["amr","audio/amr"],["apk","application/vnd.android.package-archive"],["apng","image/apng"],["appcache","text/cache-manifest"],["application","application/x-ms-application"],["apr","application/vnd.lotus-approach"],["arc","application/x-freearc"],["arj","application/x-arj"],["asc","application/pgp-signature"],["asf","video/x-ms-asf"],["asm","text/x-asm"],["aso","application/vnd.accpac.simply.aso"],["asx","video/x-ms-asf"],["atc","application/vnd.acucorp"],["atom","application/atom+xml"],["atomcat","application/atomcat+xml"],["atomdeleted","application/atomdeleted+xml"],["atomsvc","application/atomsvc+xml"],["atx","application/vnd.antix.game-component"],["au","audio/x-au"],["avi","video/x-msvideo"],["avif","image/avif"],["aw","application/applixware"],["azf","application/vnd.airzip.filesecure.azf"],["azs","application/vnd.airzip.filesecure.azs"],["azv","image/vnd.airzip.accelerator.azv"],["azw","application/vnd.amazon.ebook"],["b16","image/vnd.pco.b16"],["bat","application/x-msdownload"],["bcpio","application/x-bcpio"],["bdf","application/x-font-bdf"],["bdm","application/vnd.syncml.dm+wbxml"],["bdoc","application/x-bdoc"],["bed","application/vnd.realvnc.bed"],["bh2","application/vnd.fujitsu.oasysprs"],["bin","application/octet-stream"],["blb","application/x-blorb"],["blorb","application/x-blorb"],["bmi","application/vnd.bmi"],["bmml","application/vnd.balsamiq.bmml+xml"],["bmp","image/bmp"],["book","application/vnd.framemaker"],["box","application/vnd.previewsystems.box"],["boz","application/x-bzip2"],["bpk","application/octet-stream"],["bpmn","application/octet-stream"],["bsp","model/vnd.valve.source.compiled-map"],["btif","image/prs.btif"],["buffer","application/octet-stream"],["bz","application/x-bzip"],["bz2","application/x-bzip2"],["c","text/x-c"],["c4d","application/vnd.clonk.c4group"],["c4f","application/vnd.clonk.c4group"],["c4g","application/vnd.clonk.c4group"],["c4p","application/vnd.clonk.c4group"],["c4u","application/vnd.clonk.c4group"],["c11amc","application/vnd.cluetrust.cartomobile-config"],["c11amz","application/vnd.cluetrust.cartomobile-config-pkg"],["cab","application/vnd.ms-cab-compressed"],["caf","audio/x-caf"],["cap","application/vnd.tcpdump.pcap"],["car","application/vnd.curl.car"],["cat","application/vnd.ms-pki.seccat"],["cb7","application/x-cbr"],["cba","application/x-cbr"],["cbr","application/x-cbr"],["cbt","application/x-cbr"],["cbz","application/x-cbr"],["cc","text/x-c"],["cco","application/x-cocoa"],["cct","application/x-director"],["ccxml","application/ccxml+xml"],["cdbcmsg","application/vnd.contact.cmsg"],["cda","application/x-cdf"],["cdf","application/x-netcdf"],["cdfx","application/cdfx+xml"],["cdkey","application/vnd.mediastation.cdkey"],["cdmia","application/cdmi-capability"],["cdmic","application/cdmi-container"],["cdmid","application/cdmi-domain"],["cdmio","application/cdmi-object"],["cdmiq","application/cdmi-queue"],["cdr","application/cdr"],["cdx","chemical/x-cdx"],["cdxml","application/vnd.chemdraw+xml"],["cdy","application/vnd.cinderella"],["cer","application/pkix-cert"],["cfs","application/x-cfs-compressed"],["cgm","image/cgm"],["chat","application/x-chat"],["chm","application/vnd.ms-htmlhelp"],["chrt","application/vnd.kde.kchart"],["cif","chemical/x-cif"],["cii","application/vnd.anser-web-certificate-issue-initiation"],["cil","application/vnd.ms-artgalry"],["cjs","application/node"],["cla","application/vnd.claymore"],["class","application/octet-stream"],["clkk","application/vnd.crick.clicker.keyboard"],["clkp","application/vnd.crick.clicker.palette"],["clkt","application/vnd.crick.clicker.template"],["clkw","application/vnd.crick.clicker.wordbank"],["clkx","application/vnd.crick.clicker"],["clp","application/x-msclip"],["cmc","application/vnd.cosmocaller"],["cmdf","chemical/x-cmdf"],["cml","chemical/x-cml"],["cmp","application/vnd.yellowriver-custom-menu"],["cmx","image/x-cmx"],["cod","application/vnd.rim.cod"],["coffee","text/coffeescript"],["com","application/x-msdownload"],["conf","text/plain"],["cpio","application/x-cpio"],["cpp","text/x-c"],["cpt","application/mac-compactpro"],["crd","application/x-mscardfile"],["crl","application/pkix-crl"],["crt","application/x-x509-ca-cert"],["crx","application/x-chrome-extension"],["cryptonote","application/vnd.rig.cryptonote"],["csh","application/x-csh"],["csl","application/vnd.citationstyles.style+xml"],["csml","chemical/x-csml"],["csp","application/vnd.commonspace"],["csr","application/octet-stream"],["css","text/css"],["cst","application/x-director"],["csv","text/csv"],["cu","application/cu-seeme"],["curl","text/vnd.curl"],["cww","application/prs.cww"],["cxt","application/x-director"],["cxx","text/x-c"],["dae","model/vnd.collada+xml"],["daf","application/vnd.mobius.daf"],["dart","application/vnd.dart"],["dataless","application/vnd.fdsn.seed"],["davmount","application/davmount+xml"],["dbf","application/vnd.dbf"],["dbk","application/docbook+xml"],["dcr","application/x-director"],["dcurl","text/vnd.curl.dcurl"],["dd2","application/vnd.oma.dd2+xml"],["ddd","application/vnd.fujixerox.ddd"],["ddf","application/vnd.syncml.dmddf+xml"],["dds","image/vnd.ms-dds"],["deb","application/x-debian-package"],["def","text/plain"],["deploy","application/octet-stream"],["der","application/x-x509-ca-cert"],["dfac","application/vnd.dreamfactory"],["dgc","application/x-dgc-compressed"],["dic","text/x-c"],["dir","application/x-director"],["dis","application/vnd.mobius.dis"],["disposition-notification","message/disposition-notification"],["dist","application/octet-stream"],["distz","application/octet-stream"],["djv","image/vnd.djvu"],["djvu","image/vnd.djvu"],["dll","application/octet-stream"],["dmg","application/x-apple-diskimage"],["dmn","application/octet-stream"],["dmp","application/vnd.tcpdump.pcap"],["dms","application/octet-stream"],["dna","application/vnd.dna"],["doc","application/msword"],["docm","application/vnd.ms-word.template.macroEnabled.12"],["docx","application/vnd.openxmlformats-officedocument.wordprocessingml.document"],["dot","application/msword"],["dotm","application/vnd.ms-word.template.macroEnabled.12"],["dotx","application/vnd.openxmlformats-officedocument.wordprocessingml.template"],["dp","application/vnd.osgi.dp"],["dpg","application/vnd.dpgraph"],["dra","audio/vnd.dra"],["drle","image/dicom-rle"],["dsc","text/prs.lines.tag"],["dssc","application/dssc+der"],["dtb","application/x-dtbook+xml"],["dtd","application/xml-dtd"],["dts","audio/vnd.dts"],["dtshd","audio/vnd.dts.hd"],["dump","application/octet-stream"],["dvb","video/vnd.dvb.file"],["dvi","application/x-dvi"],["dwd","application/atsc-dwd+xml"],["dwf","model/vnd.dwf"],["dwg","image/vnd.dwg"],["dxf","image/vnd.dxf"],["dxp","application/vnd.spotfire.dxp"],["dxr","application/x-director"],["ear","application/java-archive"],["ecelp4800","audio/vnd.nuera.ecelp4800"],["ecelp7470","audio/vnd.nuera.ecelp7470"],["ecelp9600","audio/vnd.nuera.ecelp9600"],["ecma","application/ecmascript"],["edm","application/vnd.novadigm.edm"],["edx","application/vnd.novadigm.edx"],["efif","application/vnd.picsel"],["ei6","application/vnd.pg.osasli"],["elc","application/octet-stream"],["emf","image/emf"],["eml","message/rfc822"],["emma","application/emma+xml"],["emotionml","application/emotionml+xml"],["emz","application/x-msmetafile"],["eol","audio/vnd.digital-winds"],["eot","application/vnd.ms-fontobject"],["eps","application/postscript"],["epub","application/epub+zip"],["es","application/ecmascript"],["es3","application/vnd.eszigno3+xml"],["esa","application/vnd.osgi.subsystem"],["esf","application/vnd.epson.esf"],["et3","application/vnd.eszigno3+xml"],["etx","text/x-setext"],["eva","application/x-eva"],["evy","application/x-envoy"],["exe","application/octet-stream"],["exi","application/exi"],["exp","application/express"],["exr","image/aces"],["ext","application/vnd.novadigm.ext"],["ez","application/andrew-inset"],["ez2","application/vnd.ezpix-album"],["ez3","application/vnd.ezpix-package"],["f","text/x-fortran"],["f4v","video/mp4"],["f77","text/x-fortran"],["f90","text/x-fortran"],["fbs","image/vnd.fastbidsheet"],["fcdt","application/vnd.adobe.formscentral.fcdt"],["fcs","application/vnd.isac.fcs"],["fdf","application/vnd.fdf"],["fdt","application/fdt+xml"],["fe_launch","application/vnd.denovo.fcselayout-link"],["fg5","application/vnd.fujitsu.oasysgp"],["fgd","application/x-director"],["fh","image/x-freehand"],["fh4","image/x-freehand"],["fh5","image/x-freehand"],["fh7","image/x-freehand"],["fhc","image/x-freehand"],["fig","application/x-xfig"],["fits","image/fits"],["flac","audio/x-flac"],["fli","video/x-fli"],["flo","application/vnd.micrografx.flo"],["flv","video/x-flv"],["flw","application/vnd.kde.kivio"],["flx","text/vnd.fmi.flexstor"],["fly","text/vnd.fly"],["fm","application/vnd.framemaker"],["fnc","application/vnd.frogans.fnc"],["fo","application/vnd.software602.filler.form+xml"],["for","text/x-fortran"],["fpx","image/vnd.fpx"],["frame","application/vnd.framemaker"],["fsc","application/vnd.fsc.weblaunch"],["fst","image/vnd.fst"],["ftc","application/vnd.fluxtime.clip"],["fti","application/vnd.anser-web-funds-transfer-initiation"],["fvt","video/vnd.fvt"],["fxp","application/vnd.adobe.fxp"],["fxpl","application/vnd.adobe.fxp"],["fzs","application/vnd.fuzzysheet"],["g2w","application/vnd.geoplan"],["g3","image/g3fax"],["g3w","application/vnd.geospace"],["gac","application/vnd.groove-account"],["gam","application/x-tads"],["gbr","application/rpki-ghostbusters"],["gca","application/x-gca-compressed"],["gdl","model/vnd.gdl"],["gdoc","application/vnd.google-apps.document"],["geo","application/vnd.dynageo"],["geojson","application/geo+json"],["gex","application/vnd.geometry-explorer"],["ggb","application/vnd.geogebra.file"],["ggt","application/vnd.geogebra.tool"],["ghf","application/vnd.groove-help"],["gif","image/gif"],["gim","application/vnd.groove-identity-message"],["glb","model/gltf-binary"],["gltf","model/gltf+json"],["gml","application/gml+xml"],["gmx","application/vnd.gmx"],["gnumeric","application/x-gnumeric"],["gpg","application/gpg-keys"],["gph","application/vnd.flographit"],["gpx","application/gpx+xml"],["gqf","application/vnd.grafeq"],["gqs","application/vnd.grafeq"],["gram","application/srgs"],["gramps","application/x-gramps-xml"],["gre","application/vnd.geometry-explorer"],["grv","application/vnd.groove-injector"],["grxml","application/srgs+xml"],["gsf","application/x-font-ghostscript"],["gsheet","application/vnd.google-apps.spreadsheet"],["gslides","application/vnd.google-apps.presentation"],["gtar","application/x-gtar"],["gtm","application/vnd.groove-tool-message"],["gtw","model/vnd.gtw"],["gv","text/vnd.graphviz"],["gxf","application/gxf"],["gxt","application/vnd.geonext"],["gz","application/gzip"],["gzip","application/gzip"],["h","text/x-c"],["h261","video/h261"],["h263","video/h263"],["h264","video/h264"],["hal","application/vnd.hal+xml"],["hbci","application/vnd.hbci"],["hbs","text/x-handlebars-template"],["hdd","application/x-virtualbox-hdd"],["hdf","application/x-hdf"],["heic","image/heic"],["heics","image/heic-sequence"],["heif","image/heif"],["heifs","image/heif-sequence"],["hej2","image/hej2k"],["held","application/atsc-held+xml"],["hh","text/x-c"],["hjson","application/hjson"],["hlp","application/winhlp"],["hpgl","application/vnd.hp-hpgl"],["hpid","application/vnd.hp-hpid"],["hps","application/vnd.hp-hps"],["hqx","application/mac-binhex40"],["hsj2","image/hsj2"],["htc","text/x-component"],["htke","application/vnd.kenameaapp"],["htm","text/html"],["html","text/html"],["hvd","application/vnd.yamaha.hv-dic"],["hvp","application/vnd.yamaha.hv-voice"],["hvs","application/vnd.yamaha.hv-script"],["i2g","application/vnd.intergeo"],["icc","application/vnd.iccprofile"],["ice","x-conference/x-cooltalk"],["icm","application/vnd.iccprofile"],["ico","image/x-icon"],["ics","text/calendar"],["ief","image/ief"],["ifb","text/calendar"],["ifm","application/vnd.shana.informed.formdata"],["iges","model/iges"],["igl","application/vnd.igloader"],["igm","application/vnd.insors.igm"],["igs","model/iges"],["igx","application/vnd.micrografx.igx"],["iif","application/vnd.shana.informed.interchange"],["img","application/octet-stream"],["imp","application/vnd.accpac.simply.imp"],["ims","application/vnd.ms-ims"],["in","text/plain"],["ini","text/plain"],["ink","application/inkml+xml"],["inkml","application/inkml+xml"],["install","application/x-install-instructions"],["iota","application/vnd.astraea-software.iota"],["ipfix","application/ipfix"],["ipk","application/vnd.shana.informed.package"],["irm","application/vnd.ibm.rights-management"],["irp","application/vnd.irepository.package+xml"],["iso","application/x-iso9660-image"],["itp","application/vnd.shana.informed.formtemplate"],["its","application/its+xml"],["ivp","application/vnd.immervision-ivp"],["ivu","application/vnd.immervision-ivu"],["jad","text/vnd.sun.j2me.app-descriptor"],["jade","text/jade"],["jam","application/vnd.jam"],["jar","application/java-archive"],["jardiff","application/x-java-archive-diff"],["java","text/x-java-source"],["jhc","image/jphc"],["jisp","application/vnd.jisp"],["jls","image/jls"],["jlt","application/vnd.hp-jlyt"],["jng","image/x-jng"],["jnlp","application/x-java-jnlp-file"],["joda","application/vnd.joost.joda-archive"],["jp2","image/jp2"],["jpe","image/jpeg"],["jpeg","image/jpeg"],["jpf","image/jpx"],["jpg","image/jpeg"],["jpg2","image/jp2"],["jpgm","video/jpm"],["jpgv","video/jpeg"],["jph","image/jph"],["jpm","video/jpm"],["jpx","image/jpx"],["js","application/javascript"],["json","application/json"],["json5","application/json5"],["jsonld","application/ld+json"],["jsonl","application/jsonl"],["jsonml","application/jsonml+json"],["jsx","text/jsx"],["jxr","image/jxr"],["jxra","image/jxra"],["jxrs","image/jxrs"],["jxs","image/jxs"],["jxsc","image/jxsc"],["jxsi","image/jxsi"],["jxss","image/jxss"],["kar","audio/midi"],["karbon","application/vnd.kde.karbon"],["kdb","application/octet-stream"],["kdbx","application/x-keepass2"],["key","application/x-iwork-keynote-sffkey"],["kfo","application/vnd.kde.kformula"],["kia","application/vnd.kidspiration"],["kml","application/vnd.google-earth.kml+xml"],["kmz","application/vnd.google-earth.kmz"],["kne","application/vnd.kinar"],["knp","application/vnd.kinar"],["kon","application/vnd.kde.kontour"],["kpr","application/vnd.kde.kpresenter"],["kpt","application/vnd.kde.kpresenter"],["kpxx","application/vnd.ds-keypoint"],["ksp","application/vnd.kde.kspread"],["ktr","application/vnd.kahootz"],["ktx","image/ktx"],["ktx2","image/ktx2"],["ktz","application/vnd.kahootz"],["kwd","application/vnd.kde.kword"],["kwt","application/vnd.kde.kword"],["lasxml","application/vnd.las.las+xml"],["latex","application/x-latex"],["lbd","application/vnd.llamagraphics.life-balance.desktop"],["lbe","application/vnd.llamagraphics.life-balance.exchange+xml"],["les","application/vnd.hhe.lesson-player"],["less","text/less"],["lgr","application/lgr+xml"],["lha","application/octet-stream"],["link66","application/vnd.route66.link66+xml"],["list","text/plain"],["list3820","application/vnd.ibm.modcap"],["listafp","application/vnd.ibm.modcap"],["litcoffee","text/coffeescript"],["lnk","application/x-ms-shortcut"],["log","text/plain"],["lostxml","application/lost+xml"],["lrf","application/octet-stream"],["lrm","application/vnd.ms-lrm"],["ltf","application/vnd.frogans.ltf"],["lua","text/x-lua"],["luac","application/x-lua-bytecode"],["lvp","audio/vnd.lucent.voice"],["lwp","application/vnd.lotus-wordpro"],["lzh","application/octet-stream"],["m1v","video/mpeg"],["m2a","audio/mpeg"],["m2v","video/mpeg"],["m3a","audio/mpeg"],["m3u","text/plain"],["m3u8","application/vnd.apple.mpegurl"],["m4a","audio/x-m4a"],["m4p","application/mp4"],["m4s","video/iso.segment"],["m4u","application/vnd.mpegurl"],["m4v","video/x-m4v"],["m13","application/x-msmediaview"],["m14","application/x-msmediaview"],["m21","application/mp21"],["ma","application/mathematica"],["mads","application/mads+xml"],["maei","application/mmt-aei+xml"],["mag","application/vnd.ecowin.chart"],["maker","application/vnd.framemaker"],["man","text/troff"],["manifest","text/cache-manifest"],["map","application/json"],["mar","application/octet-stream"],["markdown","text/markdown"],["mathml","application/mathml+xml"],["mb","application/mathematica"],["mbk","application/vnd.mobius.mbk"],["mbox","application/mbox"],["mc1","application/vnd.medcalcdata"],["mcd","application/vnd.mcd"],["mcurl","text/vnd.curl.mcurl"],["md","text/markdown"],["mdb","application/x-msaccess"],["mdi","image/vnd.ms-modi"],["mdx","text/mdx"],["me","text/troff"],["mesh","model/mesh"],["meta4","application/metalink4+xml"],["metalink","application/metalink+xml"],["mets","application/mets+xml"],["mfm","application/vnd.mfmp"],["mft","application/rpki-manifest"],["mgp","application/vnd.osgeo.mapguide.package"],["mgz","application/vnd.proteus.magazine"],["mid","audio/midi"],["midi","audio/midi"],["mie","application/x-mie"],["mif","application/vnd.mif"],["mime","message/rfc822"],["mj2","video/mj2"],["mjp2","video/mj2"],["mjs","application/javascript"],["mk3d","video/x-matroska"],["mka","audio/x-matroska"],["mkd","text/x-markdown"],["mks","video/x-matroska"],["mkv","video/x-matroska"],["mlp","application/vnd.dolby.mlp"],["mmd","application/vnd.chipnuts.karaoke-mmd"],["mmf","application/vnd.smaf"],["mml","text/mathml"],["mmr","image/vnd.fujixerox.edmics-mmr"],["mng","video/x-mng"],["mny","application/x-msmoney"],["mobi","application/x-mobipocket-ebook"],["mods","application/mods+xml"],["mov","video/quicktime"],["movie","video/x-sgi-movie"],["mp2","audio/mpeg"],["mp2a","audio/mpeg"],["mp3","audio/mpeg"],["mp4","video/mp4"],["mp4a","audio/mp4"],["mp4s","application/mp4"],["mp4v","video/mp4"],["mp21","application/mp21"],["mpc","application/vnd.mophun.certificate"],["mpd","application/dash+xml"],["mpe","video/mpeg"],["mpeg","video/mpeg"],["mpg","video/mpeg"],["mpg4","video/mp4"],["mpga","audio/mpeg"],["mpkg","application/vnd.apple.installer+xml"],["mpm","application/vnd.blueice.multipass"],["mpn","application/vnd.mophun.application"],["mpp","application/vnd.ms-project"],["mpt","application/vnd.ms-project"],["mpy","application/vnd.ibm.minipay"],["mqy","application/vnd.mobius.mqy"],["mrc","application/marc"],["mrcx","application/marcxml+xml"],["ms","text/troff"],["mscml","application/mediaservercontrol+xml"],["mseed","application/vnd.fdsn.mseed"],["mseq","application/vnd.mseq"],["msf","application/vnd.epson.msf"],["msg","application/vnd.ms-outlook"],["msh","model/mesh"],["msi","application/x-msdownload"],["msl","application/vnd.mobius.msl"],["msm","application/octet-stream"],["msp","application/octet-stream"],["msty","application/vnd.muvee.style"],["mtl","model/mtl"],["mts","model/vnd.mts"],["mus","application/vnd.musician"],["musd","application/mmt-usd+xml"],["musicxml","application/vnd.recordare.musicxml+xml"],["mvb","application/x-msmediaview"],["mvt","application/vnd.mapbox-vector-tile"],["mwf","application/vnd.mfer"],["mxf","application/mxf"],["mxl","application/vnd.recordare.musicxml"],["mxmf","audio/mobile-xmf"],["mxml","application/xv+xml"],["mxs","application/vnd.triscape.mxs"],["mxu","video/vnd.mpegurl"],["n-gage","application/vnd.nokia.n-gage.symbian.install"],["n3","text/n3"],["nb","application/mathematica"],["nbp","application/vnd.wolfram.player"],["nc","application/x-netcdf"],["ncx","application/x-dtbncx+xml"],["nfo","text/x-nfo"],["ngdat","application/vnd.nokia.n-gage.data"],["nitf","application/vnd.nitf"],["nlu","application/vnd.neurolanguage.nlu"],["nml","application/vnd.enliven"],["nnd","application/vnd.noblenet-directory"],["nns","application/vnd.noblenet-sealer"],["nnw","application/vnd.noblenet-web"],["npx","image/vnd.net-fpx"],["nq","application/n-quads"],["nsc","application/x-conference"],["nsf","application/vnd.lotus-notes"],["nt","application/n-triples"],["ntf","application/vnd.nitf"],["numbers","application/x-iwork-numbers-sffnumbers"],["nzb","application/x-nzb"],["oa2","application/vnd.fujitsu.oasys2"],["oa3","application/vnd.fujitsu.oasys3"],["oas","application/vnd.fujitsu.oasys"],["obd","application/x-msbinder"],["obgx","application/vnd.openblox.game+xml"],["obj","model/obj"],["oda","application/oda"],["odb","application/vnd.oasis.opendocument.database"],["odc","application/vnd.oasis.opendocument.chart"],["odf","application/vnd.oasis.opendocument.formula"],["odft","application/vnd.oasis.opendocument.formula-template"],["odg","application/vnd.oasis.opendocument.graphics"],["odi","application/vnd.oasis.opendocument.image"],["odm","application/vnd.oasis.opendocument.text-master"],["odp","application/vnd.oasis.opendocument.presentation"],["ods","application/vnd.oasis.opendocument.spreadsheet"],["odt","application/vnd.oasis.opendocument.text"],["oga","audio/ogg"],["ogex","model/vnd.opengex"],["ogg","audio/ogg"],["ogv","video/ogg"],["ogx","application/ogg"],["omdoc","application/omdoc+xml"],["onepkg","application/onenote"],["onetmp","application/onenote"],["onetoc","application/onenote"],["onetoc2","application/onenote"],["opf","application/oebps-package+xml"],["opml","text/x-opml"],["oprc","application/vnd.palm"],["opus","audio/ogg"],["org","text/x-org"],["osf","application/vnd.yamaha.openscoreformat"],["osfpvg","application/vnd.yamaha.openscoreformat.osfpvg+xml"],["osm","application/vnd.openstreetmap.data+xml"],["otc","application/vnd.oasis.opendocument.chart-template"],["otf","font/otf"],["otg","application/vnd.oasis.opendocument.graphics-template"],["oth","application/vnd.oasis.opendocument.text-web"],["oti","application/vnd.oasis.opendocument.image-template"],["otp","application/vnd.oasis.opendocument.presentation-template"],["ots","application/vnd.oasis.opendocument.spreadsheet-template"],["ott","application/vnd.oasis.opendocument.text-template"],["ova","application/x-virtualbox-ova"],["ovf","application/x-virtualbox-ovf"],["owl","application/rdf+xml"],["oxps","application/oxps"],["oxt","application/vnd.openofficeorg.extension"],["p","text/x-pascal"],["p7a","application/x-pkcs7-signature"],["p7b","application/x-pkcs7-certificates"],["p7c","application/pkcs7-mime"],["p7m","application/pkcs7-mime"],["p7r","application/x-pkcs7-certreqresp"],["p7s","application/pkcs7-signature"],["p8","application/pkcs8"],["p10","application/x-pkcs10"],["p12","application/x-pkcs12"],["pac","application/x-ns-proxy-autoconfig"],["pages","application/x-iwork-pages-sffpages"],["pas","text/x-pascal"],["paw","application/vnd.pawaafile"],["pbd","application/vnd.powerbuilder6"],["pbm","image/x-portable-bitmap"],["pcap","application/vnd.tcpdump.pcap"],["pcf","application/x-font-pcf"],["pcl","application/vnd.hp-pcl"],["pclxl","application/vnd.hp-pclxl"],["pct","image/x-pict"],["pcurl","application/vnd.curl.pcurl"],["pcx","image/x-pcx"],["pdb","application/x-pilot"],["pde","text/x-processing"],["pdf","application/pdf"],["pem","application/x-x509-user-cert"],["pfa","application/x-font-type1"],["pfb","application/x-font-type1"],["pfm","application/x-font-type1"],["pfr","application/font-tdpfr"],["pfx","application/x-pkcs12"],["pgm","image/x-portable-graymap"],["pgn","application/x-chess-pgn"],["pgp","application/pgp"],["php","application/x-httpd-php"],["php3","application/x-httpd-php"],["php4","application/x-httpd-php"],["phps","application/x-httpd-php-source"],["phtml","application/x-httpd-php"],["pic","image/x-pict"],["pkg","application/octet-stream"],["pki","application/pkixcmp"],["pkipath","application/pkix-pkipath"],["pkpass","application/vnd.apple.pkpass"],["pl","application/x-perl"],["plb","application/vnd.3gpp.pic-bw-large"],["plc","application/vnd.mobius.plc"],["plf","application/vnd.pocketlearn"],["pls","application/pls+xml"],["pm","application/x-perl"],["pml","application/vnd.ctc-posml"],["png","image/png"],["pnm","image/x-portable-anymap"],["portpkg","application/vnd.macports.portpkg"],["pot","application/vnd.ms-powerpoint"],["potm","application/vnd.ms-powerpoint.presentation.macroEnabled.12"],["potx","application/vnd.openxmlformats-officedocument.presentationml.template"],["ppa","application/vnd.ms-powerpoint"],["ppam","application/vnd.ms-powerpoint.addin.macroEnabled.12"],["ppd","application/vnd.cups-ppd"],["ppm","image/x-portable-pixmap"],["pps","application/vnd.ms-powerpoint"],["ppsm","application/vnd.ms-powerpoint.slideshow.macroEnabled.12"],["ppsx","application/vnd.openxmlformats-officedocument.presentationml.slideshow"],["ppt","application/powerpoint"],["pptm","application/vnd.ms-powerpoint.presentation.macroEnabled.12"],["pptx","application/vnd.openxmlformats-officedocument.presentationml.presentation"],["pqa","application/vnd.palm"],["prc","application/x-pilot"],["pre","application/vnd.lotus-freelance"],["prf","application/pics-rules"],["provx","application/provenance+xml"],["ps","application/postscript"],["psb","application/vnd.3gpp.pic-bw-small"],["psd","application/x-photoshop"],["psf","application/x-font-linux-psf"],["pskcxml","application/pskc+xml"],["pti","image/prs.pti"],["ptid","application/vnd.pvi.ptid1"],["pub","application/x-mspublisher"],["pvb","application/vnd.3gpp.pic-bw-var"],["pwn","application/vnd.3m.post-it-notes"],["pya","audio/vnd.ms-playready.media.pya"],["pyv","video/vnd.ms-playready.media.pyv"],["qam","application/vnd.epson.quickanime"],["qbo","application/vnd.intu.qbo"],["qfx","application/vnd.intu.qfx"],["qps","application/vnd.publishare-delta-tree"],["qt","video/quicktime"],["qwd","application/vnd.quark.quarkxpress"],["qwt","application/vnd.quark.quarkxpress"],["qxb","application/vnd.quark.quarkxpress"],["qxd","application/vnd.quark.quarkxpress"],["qxl","application/vnd.quark.quarkxpress"],["qxt","application/vnd.quark.quarkxpress"],["ra","audio/x-realaudio"],["ram","audio/x-pn-realaudio"],["raml","application/raml+yaml"],["rapd","application/route-apd+xml"],["rar","application/x-rar"],["ras","image/x-cmu-raster"],["rcprofile","application/vnd.ipunplugged.rcprofile"],["rdf","application/rdf+xml"],["rdz","application/vnd.data-vision.rdz"],["relo","application/p2p-overlay+xml"],["rep","application/vnd.businessobjects"],["res","application/x-dtbresource+xml"],["rgb","image/x-rgb"],["rif","application/reginfo+xml"],["rip","audio/vnd.rip"],["ris","application/x-research-info-systems"],["rl","application/resource-lists+xml"],["rlc","image/vnd.fujixerox.edmics-rlc"],["rld","application/resource-lists-diff+xml"],["rm","audio/x-pn-realaudio"],["rmi","audio/midi"],["rmp","audio/x-pn-realaudio-plugin"],["rms","application/vnd.jcp.javame.midlet-rms"],["rmvb","application/vnd.rn-realmedia-vbr"],["rnc","application/relax-ng-compact-syntax"],["rng","application/xml"],["roa","application/rpki-roa"],["roff","text/troff"],["rp9","application/vnd.cloanto.rp9"],["rpm","audio/x-pn-realaudio-plugin"],["rpss","application/vnd.nokia.radio-presets"],["rpst","application/vnd.nokia.radio-preset"],["rq","application/sparql-query"],["rs","application/rls-services+xml"],["rsa","application/x-pkcs7"],["rsat","application/atsc-rsat+xml"],["rsd","application/rsd+xml"],["rsheet","application/urc-ressheet+xml"],["rss","application/rss+xml"],["rtf","text/rtf"],["rtx","text/richtext"],["run","application/x-makeself"],["rusd","application/route-usd+xml"],["rv","video/vnd.rn-realvideo"],["s","text/x-asm"],["s3m","audio/s3m"],["saf","application/vnd.yamaha.smaf-audio"],["sass","text/x-sass"],["sbml","application/sbml+xml"],["sc","application/vnd.ibm.secure-container"],["scd","application/x-msschedule"],["scm","application/vnd.lotus-screencam"],["scq","application/scvp-cv-request"],["scs","application/scvp-cv-response"],["scss","text/x-scss"],["scurl","text/vnd.curl.scurl"],["sda","application/vnd.stardivision.draw"],["sdc","application/vnd.stardivision.calc"],["sdd","application/vnd.stardivision.impress"],["sdkd","application/vnd.solent.sdkm+xml"],["sdkm","application/vnd.solent.sdkm+xml"],["sdp","application/sdp"],["sdw","application/vnd.stardivision.writer"],["sea","application/octet-stream"],["see","application/vnd.seemail"],["seed","application/vnd.fdsn.seed"],["sema","application/vnd.sema"],["semd","application/vnd.semd"],["semf","application/vnd.semf"],["senmlx","application/senml+xml"],["sensmlx","application/sensml+xml"],["ser","application/java-serialized-object"],["setpay","application/set-payment-initiation"],["setreg","application/set-registration-initiation"],["sfd-hdstx","application/vnd.hydrostatix.sof-data"],["sfs","application/vnd.spotfire.sfs"],["sfv","text/x-sfv"],["sgi","image/sgi"],["sgl","application/vnd.stardivision.writer-global"],["sgm","text/sgml"],["sgml","text/sgml"],["sh","application/x-sh"],["shar","application/x-shar"],["shex","text/shex"],["shf","application/shf+xml"],["shtml","text/html"],["sid","image/x-mrsid-image"],["sieve","application/sieve"],["sig","application/pgp-signature"],["sil","audio/silk"],["silo","model/mesh"],["sis","application/vnd.symbian.install"],["sisx","application/vnd.symbian.install"],["sit","application/x-stuffit"],["sitx","application/x-stuffitx"],["siv","application/sieve"],["skd","application/vnd.koan"],["skm","application/vnd.koan"],["skp","application/vnd.koan"],["skt","application/vnd.koan"],["sldm","application/vnd.ms-powerpoint.slide.macroenabled.12"],["sldx","application/vnd.openxmlformats-officedocument.presentationml.slide"],["slim","text/slim"],["slm","text/slim"],["sls","application/route-s-tsid+xml"],["slt","application/vnd.epson.salt"],["sm","application/vnd.stepmania.stepchart"],["smf","application/vnd.stardivision.math"],["smi","application/smil"],["smil","application/smil"],["smv","video/x-smv"],["smzip","application/vnd.stepmania.package"],["snd","audio/basic"],["snf","application/x-font-snf"],["so","application/octet-stream"],["spc","application/x-pkcs7-certificates"],["spdx","text/spdx"],["spf","application/vnd.yamaha.smaf-phrase"],["spl","application/x-futuresplash"],["spot","text/vnd.in3d.spot"],["spp","application/scvp-vp-response"],["spq","application/scvp-vp-request"],["spx","audio/ogg"],["sql","application/x-sql"],["src","application/x-wais-source"],["srt","application/x-subrip"],["sru","application/sru+xml"],["srx","application/sparql-results+xml"],["ssdl","application/ssdl+xml"],["sse","application/vnd.kodak-descriptor"],["ssf","application/vnd.epson.ssf"],["ssml","application/ssml+xml"],["sst","application/octet-stream"],["st","application/vnd.sailingtracker.track"],["stc","application/vnd.sun.xml.calc.template"],["std","application/vnd.sun.xml.draw.template"],["stf","application/vnd.wt.stf"],["sti","application/vnd.sun.xml.impress.template"],["stk","application/hyperstudio"],["stl","model/stl"],["stpx","model/step+xml"],["stpxz","model/step-xml+zip"],["stpz","model/step+zip"],["str","application/vnd.pg.format"],["stw","application/vnd.sun.xml.writer.template"],["styl","text/stylus"],["stylus","text/stylus"],["sub","text/vnd.dvb.subtitle"],["sus","application/vnd.sus-calendar"],["susp","application/vnd.sus-calendar"],["sv4cpio","application/x-sv4cpio"],["sv4crc","application/x-sv4crc"],["svc","application/vnd.dvb.service"],["svd","application/vnd.svd"],["svg","image/svg+xml"],["svgz","image/svg+xml"],["swa","application/x-director"],["swf","application/x-shockwave-flash"],["swi","application/vnd.aristanetworks.swi"],["swidtag","application/swid+xml"],["sxc","application/vnd.sun.xml.calc"],["sxd","application/vnd.sun.xml.draw"],["sxg","application/vnd.sun.xml.writer.global"],["sxi","application/vnd.sun.xml.impress"],["sxm","application/vnd.sun.xml.math"],["sxw","application/vnd.sun.xml.writer"],["t","text/troff"],["t3","application/x-t3vm-image"],["t38","image/t38"],["taglet","application/vnd.mynfc"],["tao","application/vnd.tao.intent-module-archive"],["tap","image/vnd.tencent.tap"],["tar","application/x-tar"],["tcap","application/vnd.3gpp2.tcap"],["tcl","application/x-tcl"],["td","application/urc-targetdesc+xml"],["teacher","application/vnd.smart.teacher"],["tei","application/tei+xml"],["teicorpus","application/tei+xml"],["tex","application/x-tex"],["texi","application/x-texinfo"],["texinfo","application/x-texinfo"],["text","text/plain"],["tfi","application/thraud+xml"],["tfm","application/x-tex-tfm"],["tfx","image/tiff-fx"],["tga","image/x-tga"],["tgz","application/x-tar"],["thmx","application/vnd.ms-officetheme"],["tif","image/tiff"],["tiff","image/tiff"],["tk","application/x-tcl"],["tmo","application/vnd.tmobile-livetv"],["toml","application/toml"],["torrent","application/x-bittorrent"],["tpl","application/vnd.groove-tool-template"],["tpt","application/vnd.trid.tpt"],["tr","text/troff"],["tra","application/vnd.trueapp"],["trig","application/trig"],["trm","application/x-msterminal"],["ts","video/mp2t"],["tsd","application/timestamped-data"],["tsv","text/tab-separated-values"],["ttc","font/collection"],["ttf","font/ttf"],["ttl","text/turtle"],["ttml","application/ttml+xml"],["twd","application/vnd.simtech-mindmapper"],["twds","application/vnd.simtech-mindmapper"],["txd","application/vnd.genomatix.tuxedo"],["txf","application/vnd.mobius.txf"],["txt","text/plain"],["u8dsn","message/global-delivery-status"],["u8hdr","message/global-headers"],["u8mdn","message/global-disposition-notification"],["u8msg","message/global"],["u32","application/x-authorware-bin"],["ubj","application/ubjson"],["udeb","application/x-debian-package"],["ufd","application/vnd.ufdl"],["ufdl","application/vnd.ufdl"],["ulx","application/x-glulx"],["umj","application/vnd.umajin"],["unityweb","application/vnd.unity"],["uoml","application/vnd.uoml+xml"],["uri","text/uri-list"],["uris","text/uri-list"],["urls","text/uri-list"],["usdz","model/vnd.usdz+zip"],["ustar","application/x-ustar"],["utz","application/vnd.uiq.theme"],["uu","text/x-uuencode"],["uva","audio/vnd.dece.audio"],["uvd","application/vnd.dece.data"],["uvf","application/vnd.dece.data"],["uvg","image/vnd.dece.graphic"],["uvh","video/vnd.dece.hd"],["uvi","image/vnd.dece.graphic"],["uvm","video/vnd.dece.mobile"],["uvp","video/vnd.dece.pd"],["uvs","video/vnd.dece.sd"],["uvt","application/vnd.dece.ttml+xml"],["uvu","video/vnd.uvvu.mp4"],["uvv","video/vnd.dece.video"],["uvva","audio/vnd.dece.audio"],["uvvd","application/vnd.dece.data"],["uvvf","application/vnd.dece.data"],["uvvg","image/vnd.dece.graphic"],["uvvh","video/vnd.dece.hd"],["uvvi","image/vnd.dece.graphic"],["uvvm","video/vnd.dece.mobile"],["uvvp","video/vnd.dece.pd"],["uvvs","video/vnd.dece.sd"],["uvvt","application/vnd.dece.ttml+xml"],["uvvu","video/vnd.uvvu.mp4"],["uvvv","video/vnd.dece.video"],["uvvx","application/vnd.dece.unspecified"],["uvvz","application/vnd.dece.zip"],["uvx","application/vnd.dece.unspecified"],["uvz","application/vnd.dece.zip"],["vbox","application/x-virtualbox-vbox"],["vbox-extpack","application/x-virtualbox-vbox-extpack"],["vcard","text/vcard"],["vcd","application/x-cdlink"],["vcf","text/x-vcard"],["vcg","application/vnd.groove-vcard"],["vcs","text/x-vcalendar"],["vcx","application/vnd.vcx"],["vdi","application/x-virtualbox-vdi"],["vds","model/vnd.sap.vds"],["vhd","application/x-virtualbox-vhd"],["vis","application/vnd.visionary"],["viv","video/vnd.vivo"],["vlc","application/videolan"],["vmdk","application/x-virtualbox-vmdk"],["vob","video/x-ms-vob"],["vor","application/vnd.stardivision.writer"],["vox","application/x-authorware-bin"],["vrml","model/vrml"],["vsd","application/vnd.visio"],["vsf","application/vnd.vsf"],["vss","application/vnd.visio"],["vst","application/vnd.visio"],["vsw","application/vnd.visio"],["vtf","image/vnd.valve.source.texture"],["vtt","text/vtt"],["vtu","model/vnd.vtu"],["vxml","application/voicexml+xml"],["w3d","application/x-director"],["wad","application/x-doom"],["wadl","application/vnd.sun.wadl+xml"],["war","application/java-archive"],["wasm","application/wasm"],["wav","audio/x-wav"],["wax","audio/x-ms-wax"],["wbmp","image/vnd.wap.wbmp"],["wbs","application/vnd.criticaltools.wbs+xml"],["wbxml","application/wbxml"],["wcm","application/vnd.ms-works"],["wdb","application/vnd.ms-works"],["wdp","image/vnd.ms-photo"],["weba","audio/webm"],["webapp","application/x-web-app-manifest+json"],["webm","video/webm"],["webmanifest","application/manifest+json"],["webp","image/webp"],["wg","application/vnd.pmi.widget"],["wgt","application/widget"],["wks","application/vnd.ms-works"],["wm","video/x-ms-wm"],["wma","audio/x-ms-wma"],["wmd","application/x-ms-wmd"],["wmf","image/wmf"],["wml","text/vnd.wap.wml"],["wmlc","application/wmlc"],["wmls","text/vnd.wap.wmlscript"],["wmlsc","application/vnd.wap.wmlscriptc"],["wmv","video/x-ms-wmv"],["wmx","video/x-ms-wmx"],["wmz","application/x-msmetafile"],["woff","font/woff"],["woff2","font/woff2"],["word","application/msword"],["wpd","application/vnd.wordperfect"],["wpl","application/vnd.ms-wpl"],["wps","application/vnd.ms-works"],["wqd","application/vnd.wqd"],["wri","application/x-mswrite"],["wrl","model/vrml"],["wsc","message/vnd.wfa.wsc"],["wsdl","application/wsdl+xml"],["wspolicy","application/wspolicy+xml"],["wtb","application/vnd.webturbo"],["wvx","video/x-ms-wvx"],["x3d","model/x3d+xml"],["x3db","model/x3d+fastinfoset"],["x3dbz","model/x3d+binary"],["x3dv","model/x3d-vrml"],["x3dvz","model/x3d+vrml"],["x3dz","model/x3d+xml"],["x32","application/x-authorware-bin"],["x_b","model/vnd.parasolid.transmit.binary"],["x_t","model/vnd.parasolid.transmit.text"],["xaml","application/xaml+xml"],["xap","application/x-silverlight-app"],["xar","application/vnd.xara"],["xav","application/xcap-att+xml"],["xbap","application/x-ms-xbap"],["xbd","application/vnd.fujixerox.docuworks.binder"],["xbm","image/x-xbitmap"],["xca","application/xcap-caps+xml"],["xcs","application/calendar+xml"],["xdf","application/xcap-diff+xml"],["xdm","application/vnd.syncml.dm+xml"],["xdp","application/vnd.adobe.xdp+xml"],["xdssc","application/dssc+xml"],["xdw","application/vnd.fujixerox.docuworks"],["xel","application/xcap-el+xml"],["xenc","application/xenc+xml"],["xer","application/patch-ops-error+xml"],["xfdf","application/vnd.adobe.xfdf"],["xfdl","application/vnd.xfdl"],["xht","application/xhtml+xml"],["xhtml","application/xhtml+xml"],["xhvml","application/xv+xml"],["xif","image/vnd.xiff"],["xl","application/excel"],["xla","application/vnd.ms-excel"],["xlam","application/vnd.ms-excel.addin.macroEnabled.12"],["xlc","application/vnd.ms-excel"],["xlf","application/xliff+xml"],["xlm","application/vnd.ms-excel"],["xls","application/vnd.ms-excel"],["xlsb","application/vnd.ms-excel.sheet.binary.macroEnabled.12"],["xlsm","application/vnd.ms-excel.sheet.macroEnabled.12"],["xlsx","application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"],["xlt","application/vnd.ms-excel"],["xltm","application/vnd.ms-excel.template.macroEnabled.12"],["xltx","application/vnd.openxmlformats-officedocument.spreadsheetml.template"],["xlw","application/vnd.ms-excel"],["xm","audio/xm"],["xml","application/xml"],["xns","application/xcap-ns+xml"],["xo","application/vnd.olpc-sugar"],["xop","application/xop+xml"],["xpi","application/x-xpinstall"],["xpl","application/xproc+xml"],["xpm","image/x-xpixmap"],["xpr","application/vnd.is-xpr"],["xps","application/vnd.ms-xpsdocument"],["xpw","application/vnd.intercon.formnet"],["xpx","application/vnd.intercon.formnet"],["xsd","application/xml"],["xsl","application/xml"],["xslt","application/xslt+xml"],["xsm","application/vnd.syncml+xml"],["xspf","application/xspf+xml"],["xul","application/vnd.mozilla.xul+xml"],["xvm","application/xv+xml"],["xvml","application/xv+xml"],["xwd","image/x-xwindowdump"],["xyz","chemical/x-xyz"],["xz","application/x-xz"],["yaml","text/yaml"],["yang","application/yang"],["yin","application/yin+xml"],["yml","text/yaml"],["ymp","text/x-suse-ymp"],["z","application/x-compress"],["z1","application/x-zmachine"],["z2","application/x-zmachine"],["z3","application/x-zmachine"],["z4","application/x-zmachine"],["z5","application/x-zmachine"],["z6","application/x-zmachine"],["z7","application/x-zmachine"],["z8","application/x-zmachine"],["zaz","application/vnd.zzazz.deck+xml"],["zip","application/zip"],["zir","application/vnd.zul"],["zirz","application/vnd.zul"],["zmm","application/vnd.handheld-entertainment+xml"],["zsh","text/x-scriptzsh"]]);function oe(e,i,t){const n=Yt(e),{webkitRelativePath:r}=e,s=typeof i=="string"?i:typeof r=="string"&&r.length>0?r:`./${e.name}`;return typeof n.path!="string"&&xi(n,"path",s),xi(n,"relativePath",s),n}function Yt(e){const{name:i}=e;if(i&&i.lastIndexOf(".")!==-1&&!e.type){const n=i.split(".").pop().toLowerCase(),r=Wt.get(n);r&&Object.defineProperty(e,"type",{value:r,writable:!1,configurable:!1,enumerable:!0})}return e}function xi(e,i,t){Object.defineProperty(e,i,{value:t,writable:!1,configurable:!1,enumerable:!0})}const Vt=[".DS_Store","Thumbs.db"];function Kt(e){return X(this,void 0,void 0,function*(){return we(e)&&Xt(e.dataTransfer)?ea(e.dataTransfer,e.type):Jt(e)?Zt(e):Array.isArray(e)&&e.every(i=>"getFile"in i&&typeof i.getFile=="function")?Qt(e):[]})}function Xt(e){return we(e)}function Jt(e){return we(e)&&we(e.target)}function we(e){return typeof e=="object"&&e!==null}function Zt(e){return Ze(e.target.files).map(i=>oe(i))}function Qt(e){return X(this,void 0,void 0,function*(){return(yield Promise.all(e.map(t=>t.getFile()))).map(t=>oe(t))})}function ea(e,i){return X(this,void 0,void 0,function*(){if(e.items){const t=Ze(e.items).filter(r=>r.kind==="file");if(i!=="drop")return t;const n=yield Promise.all(t.map(ia));return hi(Ki(n))}return hi(Ze(e.files).map(t=>oe(t)))})}function hi(e){return e.filter(i=>Vt.indexOf(i.name)===-1)}function Ze(e){if(e===null)return[];const i=[];for(let t=0;t<e.length;t++){const n=e[t];i.push(n)}return i}function ia(e){if(typeof e.webkitGetAsEntry!="function")return vi(e);const i=e.webkitGetAsEntry();return i&&i.isDirectory?Xi(i):vi(e,i)}function Ki(e){return e.reduce((i,t)=>[...i,...Array.isArray(t)?Ki(t):[t]],[])}function vi(e,i){return X(this,void 0,void 0,function*(){var t;if(globalThis.isSecureContext&&typeof e.getAsFileSystemHandle=="function"){const s=yield e.getAsFileSystemHandle();if(s===null)throw new Error(`${e} is not a File`);if(s!==void 0){const l=yield s.getFile();return l.handle=s,oe(l)}}const n=e.getAsFile();if(!n)throw new Error(`${e} is not a File`);return oe(n,(t=i==null?void 0:i.fullPath)!==null&&t!==void 0?t:void 0)})}function ta(e){return X(this,void 0,void 0,function*(){return e.isDirectory?Xi(e):aa(e)})}function Xi(e){const i=e.createReader();return new Promise((t,n)=>{const r=[];function s(){i.readEntries(l=>X(this,void 0,void 0,function*(){if(l.length){const c=Promise.all(l.map(ta));r.push(c),s()}else try{const c=yield Promise.all(r);t(c)}catch(c){n(c)}}),l=>{n(l)})}s()})}function aa(e){return X(this,void 0,void 0,function*(){return new Promise((i,t)=>{e.file(n=>{const r=oe(n,e.fullPath);i(r)},n=>{t(n)})})})}var Fe=function(e,i){if(e&&i){var t=Array.isArray(i)?i:i.split(",");if(t.length===0)return!0;var n=e.name||"",r=(e.type||"").toLowerCase(),s=r.replace(/\/.*$/,"");return t.some(function(l){var c=l.trim().toLowerCase();return c.charAt(0)==="."?n.toLowerCase().endsWith(c):c.endsWith("/*")?s===c.replace(/\/.*$/,""):r===c})}return!0};function bi(e){return ra(e)||oa(e)||Zi(e)||na()}function na(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function oa(e){if(typeof Symbol<"u"&&e[Symbol.iterator]!=null||e["@@iterator"]!=null)return Array.from(e)}function ra(e){if(Array.isArray(e))return Qe(e)}function yi(e,i){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);i&&(n=n.filter(function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable})),t.push.apply(t,n)}return t}function wi(e){for(var i=1;i<arguments.length;i++){var t=arguments[i]!=null?arguments[i]:{};i%2?yi(Object(t),!0).forEach(function(n){Ji(e,n,t[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):yi(Object(t)).forEach(function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))})}return e}function Ji(e,i,t){return i in e?Object.defineProperty(e,i,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[i]=t,e}function le(e,i){return la(e)||ca(e,i)||Zi(e,i)||sa()}function sa(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function Zi(e,i){if(e){if(typeof e=="string")return Qe(e,i);var t=Object.prototype.toString.call(e).slice(8,-1);if(t==="Object"&&e.constructor&&(t=e.constructor.name),t==="Map"||t==="Set")return Array.from(e);if(t==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return Qe(e,i)}}function Qe(e,i){(i==null||i>e.length)&&(i=e.length);for(var t=0,n=new Array(i);t<i;t++)n[t]=e[t];return n}function ca(e,i){var t=e==null?null:typeof Symbol<"u"&&e[Symbol.iterator]||e["@@iterator"];if(t!=null){var n=[],r=!0,s=!1,l,c;try{for(t=t.call(e);!(r=(l=t.next()).done)&&(n.push(l.value),!(i&&n.length===i));r=!0);}catch(m){s=!0,c=m}finally{try{!r&&t.return!=null&&t.return()}finally{if(s)throw c}}return n}}function la(e){if(Array.isArray(e))return e}var pa=typeof Fe=="function"?Fe:Fe.default,da="file-invalid-type",ma="file-too-large",ua="file-too-small",fa="too-many-files",ga=function(){var i=arguments.length>0&&arguments[0]!==void 0?arguments[0]:"",t=i.split(","),n=t.length>1?"one of ".concat(t.join(", ")):t[0];return{code:da,message:"File type must be ".concat(n)}},ki=function(i){return{code:ma,message:"File is larger than ".concat(i," ").concat(i===1?"byte":"bytes")}},ji=function(i){return{code:ua,message:"File is smaller than ".concat(i," ").concat(i===1?"byte":"bytes")}},xa={code:fa,message:"Too many files"};function Qi(e,i){var t=e.type==="application/x-moz-file"||pa(e,i);return[t,t?null:ga(i)]}function et(e,i,t){if(K(e.size))if(K(i)&&K(t)){if(e.size>t)return[!1,ki(t)];if(e.size<i)return[!1,ji(i)]}else{if(K(i)&&e.size<i)return[!1,ji(i)];if(K(t)&&e.size>t)return[!1,ki(t)]}return[!0,null]}function K(e){return e!=null}function ha(e){var i=e.files,t=e.accept,n=e.minSize,r=e.maxSize,s=e.multiple,l=e.maxFiles,c=e.validator;return!s&&i.length>1||s&&l>=1&&i.length>l?!1:i.every(function(m){var x=Qi(m,t),u=le(x,1),h=u[0],F=et(m,n,r),D=le(F,1),L=D[0],O=c?c(m):null;return h&&L&&!O})}function ke(e){return typeof e.isPropagationStopped=="function"?e.isPropagationStopped():typeof e.cancelBubble<"u"?e.cancelBubble:!1}function xe(e){return e.dataTransfer?Array.prototype.some.call(e.dataTransfer.types,function(i){return i==="Files"||i==="application/x-moz-file"}):!!e.target&&!!e.target.files}function $i(e){e.preventDefault()}function va(e){return e.indexOf("MSIE")!==-1||e.indexOf("Trident/")!==-1}function ba(e){return e.indexOf("Edge/")!==-1}function ya(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:window.navigator.userAgent;return va(e)||ba(e)}function H(){for(var e=arguments.length,i=new Array(e),t=0;t<e;t++)i[t]=arguments[t];return function(n){for(var r=arguments.length,s=new Array(r>1?r-1:0),l=1;l<r;l++)s[l-1]=arguments[l];return i.some(function(c){return!ke(n)&&c&&c.apply(void 0,[n].concat(s)),ke(n)})}}function wa(){return"showOpenFilePicker"in window}function ka(e){if(K(e)){var i=Object.entries(e).filter(function(t){var n=le(t,2),r=n[0],s=n[1],l=!0;return it(r)||(console.warn('Skipped "'.concat(r,'" because it is not a valid MIME type. Check https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types for a list of valid MIME types.')),l=!1),(!Array.isArray(s)||!s.every(tt))&&(console.warn('Skipped "'.concat(r,'" because an invalid file extension was provided.')),l=!1),l}).reduce(function(t,n){var r=le(n,2),s=r[0],l=r[1];return wi(wi({},t),{},Ji({},s,l))},{});return[{description:"Files",accept:i}]}return e}function ja(e){if(K(e))return Object.entries(e).reduce(function(i,t){var n=le(t,2),r=n[0],s=n[1];return[].concat(bi(i),[r],bi(s))},[]).filter(function(i){return it(i)||tt(i)}).join(",")}function $a(e){return e instanceof DOMException&&(e.name==="AbortError"||e.code===e.ABORT_ERR)}function Ca(e){return e instanceof DOMException&&(e.name==="SecurityError"||e.code===e.SECURITY_ERR)}function it(e){return e==="audio/*"||e==="video/*"||e==="image/*"||e==="text/*"||e==="application/*"||/\w+\/[-+.\w]+/g.test(e)}function tt(e){return/^.*\.[\w]+$/.test(e)}var Da=["children"],Aa=["open"],Ea=["refKey","role","onKeyDown","onFocus","onBlur","onClick","onDragEnter","onDragOver","onDragLeave","onDrop"],Sa=["refKey","onChange","onClick"];function Ta(e){return Ra(e)||Ia(e)||at(e)||za()}function za(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function Ia(e){if(typeof Symbol<"u"&&e[Symbol.iterator]!=null||e["@@iterator"]!=null)return Array.from(e)}function Ra(e){if(Array.isArray(e))return ei(e)}function Oe(e,i){return Pa(e)||Oa(e,i)||at(e,i)||Fa()}function Fa(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function at(e,i){if(e){if(typeof e=="string")return ei(e,i);var t=Object.prototype.toString.call(e).slice(8,-1);if(t==="Object"&&e.constructor&&(t=e.constructor.name),t==="Map"||t==="Set")return Array.from(e);if(t==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return ei(e,i)}}function ei(e,i){(i==null||i>e.length)&&(i=e.length);for(var t=0,n=new Array(i);t<i;t++)n[t]=e[t];return n}function Oa(e,i){var t=e==null?null:typeof Symbol<"u"&&e[Symbol.iterator]||e["@@iterator"];if(t!=null){var n=[],r=!0,s=!1,l,c;try{for(t=t.call(e);!(r=(l=t.next()).done)&&(n.push(l.value),!(i&&n.length===i));r=!0);}catch(m){s=!0,c=m}finally{try{!r&&t.return!=null&&t.return()}finally{if(s)throw c}}return n}}function Pa(e){if(Array.isArray(e))return e}function Ci(e,i){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);i&&(n=n.filter(function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable})),t.push.apply(t,n)}return t}function w(e){for(var i=1;i<arguments.length;i++){var t=arguments[i]!=null?arguments[i]:{};i%2?Ci(Object(t),!0).forEach(function(n){ii(e,n,t[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):Ci(Object(t)).forEach(function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))})}return e}function ii(e,i,t){return i in e?Object.defineProperty(e,i,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[i]=t,e}function je(e,i){if(e==null)return{};var t=Ma(e,i),n,r;if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(r=0;r<s.length;r++)n=s[r],!(i.indexOf(n)>=0)&&Object.prototype.propertyIsEnumerable.call(e,n)&&(t[n]=e[n])}return t}function Ma(e,i){if(e==null)return{};var t={},n=Object.keys(e),r,s;for(s=0;s<n.length;s++)r=n[s],!(i.indexOf(r)>=0)&&(t[r]=e[r]);return t}var ni=p.forwardRef(function(e,i){var t=e.children,n=je(e,Da),r=ot(n),s=r.open,l=je(r,Aa);return p.useImperativeHandle(i,function(){return{open:s}},[s]),Ui.createElement(p.Fragment,null,t(w(w({},l),{},{open:s})))});ni.displayName="Dropzone";var nt={disabled:!1,getFilesFromEvent:Kt,maxSize:1/0,minSize:0,multiple:!0,maxFiles:0,preventDropOnDocument:!0,noClick:!1,noKeyboard:!1,noDrag:!1,noDragEventsBubbling:!1,validator:null,useFsAccessApi:!1,autoFocus:!1};ni.defaultProps=nt;ni.propTypes={children:v.func,accept:v.objectOf(v.arrayOf(v.string)),multiple:v.bool,preventDropOnDocument:v.bool,noClick:v.bool,noKeyboard:v.bool,noDrag:v.bool,noDragEventsBubbling:v.bool,minSize:v.number,maxSize:v.number,maxFiles:v.number,disabled:v.bool,getFilesFromEvent:v.func,onFileDialogCancel:v.func,onFileDialogOpen:v.func,useFsAccessApi:v.bool,autoFocus:v.bool,onDragEnter:v.func,onDragLeave:v.func,onDragOver:v.func,onDrop:v.func,onDropAccepted:v.func,onDropRejected:v.func,onError:v.func,validator:v.func};var ti={isFocused:!1,isFileDialogActive:!1,isDragActive:!1,isDragAccept:!1,isDragReject:!1,acceptedFiles:[],fileRejections:[]};function ot(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},i=w(w({},nt),e),t=i.accept,n=i.disabled,r=i.getFilesFromEvent,s=i.maxSize,l=i.minSize,c=i.multiple,m=i.maxFiles,x=i.onDragEnter,u=i.onDragLeave,h=i.onDragOver,F=i.onDrop,D=i.onDropAccepted,L=i.onDropRejected,O=i.onFileDialogCancel,_=i.onFileDialogOpen,T=i.useFsAccessApi,z=i.autoFocus,N=i.preventDropOnDocument,J=i.noClick,G=i.noKeyboard,b=i.noDrag,y=i.noDragEventsBubbling,A=i.onError,P=i.validator,U=p.useMemo(function(){return ja(t)},[t]),re=p.useMemo(function(){return ka(t)},[t]),Z=p.useMemo(function(){return typeof _=="function"?_:Di},[_]),I=p.useMemo(function(){return typeof O=="function"?O:Di},[O]),k=p.useRef(null),j=p.useRef(null),$e=p.useReducer(La,ti),Q=Oe($e,2),Ce=Q[0],B=Q[1],lt=Ce.isFocused,oi=Ce.isFileDialogActive,pe=p.useRef(typeof window<"u"&&window.isSecureContext&&T&&wa()),ri=function(){!pe.current&&oi&&setTimeout(function(){if(j.current){var f=j.current.files;f.length||(B({type:"closeDialog"}),I())}},300)};p.useEffect(function(){return window.addEventListener("focus",ri,!1),function(){window.removeEventListener("focus",ri,!1)}},[j,oi,I,pe]);var ee=p.useRef([]),si=function(f){k.current&&k.current.contains(f.target)||(f.preventDefault(),ee.current=[])};p.useEffect(function(){return N&&(document.addEventListener("dragover",$i,!1),document.addEventListener("drop",si,!1)),function(){N&&(document.removeEventListener("dragover",$i),document.removeEventListener("drop",si))}},[k,N]),p.useEffect(function(){return!n&&z&&k.current&&k.current.focus(),function(){}},[k,z,n]);var V=p.useCallback(function(d){A?A(d):console.error(d)},[A]),ci=p.useCallback(function(d){d.preventDefault(),d.persist(),fe(d),ee.current=[].concat(Ta(ee.current),[d.target]),xe(d)&&Promise.resolve(r(d)).then(function(f){if(!(ke(d)&&!y)){var $=f.length,E=$>0&&ha({files:f,accept:U,minSize:l,maxSize:s,multiple:c,maxFiles:m,validator:P}),q=$>0&&!E;B({isDragAccept:E,isDragReject:q,isDragActive:!0,type:"setDraggedFiles"}),x&&x(d)}}).catch(function(f){return V(f)})},[r,x,V,y,U,l,s,c,m,P]),li=p.useCallback(function(d){d.preventDefault(),d.persist(),fe(d);var f=xe(d);if(f&&d.dataTransfer)try{d.dataTransfer.dropEffect="copy"}catch{}return f&&h&&h(d),!1},[h,y]),pi=p.useCallback(function(d){d.preventDefault(),d.persist(),fe(d);var f=ee.current.filter(function(E){return k.current&&k.current.contains(E)}),$=f.indexOf(d.target);$!==-1&&f.splice($,1),ee.current=f,!(f.length>0)&&(B({type:"setDraggedFiles",isDragActive:!1,isDragAccept:!1,isDragReject:!1}),xe(d)&&u&&u(d))},[k,u,y]),de=p.useCallback(function(d,f){var $=[],E=[];d.forEach(function(q){var se=Qi(q,U),ae=Oe(se,2),Ae=ae[0],Ee=ae[1],Se=et(q,l,s),ge=Oe(Se,2),Te=ge[0],ze=ge[1],Ie=P?P(q):null;if(Ae&&Te&&!Ie)$.push(q);else{var Re=[Ee,ze];Ie&&(Re=Re.concat(Ie)),E.push({file:q,errors:Re.filter(function(ut){return ut})})}}),(!c&&$.length>1||c&&m>=1&&$.length>m)&&($.forEach(function(q){E.push({file:q,errors:[xa]})}),$.splice(0)),B({acceptedFiles:$,fileRejections:E,isDragReject:E.length>0,type:"setFiles"}),F&&F($,E,f),E.length>0&&L&&L(E,f),$.length>0&&D&&D($,f)},[B,c,U,l,s,m,F,D,L,P]),me=p.useCallback(function(d){d.preventDefault(),d.persist(),fe(d),ee.current=[],xe(d)&&Promise.resolve(r(d)).then(function(f){ke(d)&&!y||de(f,d)}).catch(function(f){return V(f)}),B({type:"reset"})},[r,de,V,y]),ie=p.useCallback(function(){if(pe.current){B({type:"openDialog"}),Z();var d={multiple:c,types:re};window.showOpenFilePicker(d).then(function(f){return r(f)}).then(function(f){de(f,null),B({type:"closeDialog"})}).catch(function(f){$a(f)?(I(f),B({type:"closeDialog"})):Ca(f)?(pe.current=!1,j.current?(j.current.value=null,j.current.click()):V(new Error("Cannot open the file picker because the https://developer.mozilla.org/en-US/docs/Web/API/File_System_Access_API is not supported and no <input> was provided."))):V(f)});return}j.current&&(B({type:"openDialog"}),Z(),j.current.value=null,j.current.click())},[B,Z,I,T,de,V,re,c]),di=p.useCallback(function(d){!k.current||!k.current.isEqualNode(d.target)||(d.key===" "||d.key==="Enter"||d.keyCode===32||d.keyCode===13)&&(d.preventDefault(),ie())},[k,ie]),mi=p.useCallback(function(){B({type:"focus"})},[]),ui=p.useCallback(function(){B({type:"blur"})},[]),fi=p.useCallback(function(){J||(ya()?setTimeout(ie,0):ie())},[J,ie]),te=function(f){return n?null:f},De=function(f){return G?null:te(f)},ue=function(f){return b?null:te(f)},fe=function(f){y&&f.stopPropagation()},pt=p.useMemo(function(){return function(){var d=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},f=d.refKey,$=f===void 0?"ref":f,E=d.role,q=d.onKeyDown,se=d.onFocus,ae=d.onBlur,Ae=d.onClick,Ee=d.onDragEnter,Se=d.onDragOver,ge=d.onDragLeave,Te=d.onDrop,ze=je(d,Ea);return w(w(ii({onKeyDown:De(H(q,di)),onFocus:De(H(se,mi)),onBlur:De(H(ae,ui)),onClick:te(H(Ae,fi)),onDragEnter:ue(H(Ee,ci)),onDragOver:ue(H(Se,li)),onDragLeave:ue(H(ge,pi)),onDrop:ue(H(Te,me)),role:typeof E=="string"&&E!==""?E:"presentation"},$,k),!n&&!G?{tabIndex:0}:{}),ze)}},[k,di,mi,ui,fi,ci,li,pi,me,G,b,n]),dt=p.useCallback(function(d){d.stopPropagation()},[]),mt=p.useMemo(function(){return function(){var d=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},f=d.refKey,$=f===void 0?"ref":f,E=d.onChange,q=d.onClick,se=je(d,Sa),ae=ii({accept:U,multiple:c,type:"file",style:{border:0,clip:"rect(0, 0, 0, 0)",clipPath:"inset(50%)",height:"1px",margin:"0 -1px -1px 0",overflow:"hidden",padding:0,position:"absolute",width:"1px",whiteSpace:"nowrap"},onChange:te(H(E,me)),onClick:te(H(q,dt)),tabIndex:-1},$,j);return w(w({},ae),se)}},[j,t,c,me,n]);return w(w({},Ce),{},{isFocused:lt&&!n,getRootProps:pt,getInputProps:mt,rootRef:k,inputRef:j,open:te(ie)})}function La(e,i){switch(i.type){case"focus":return w(w({},e),{},{isFocused:!0});case"blur":return w(w({},e),{},{isFocused:!1});case"openDialog":return w(w({},ti),{},{isFileDialogActive:!0});case"closeDialog":return w(w({},e),{},{isFileDialogActive:!1});case"setDraggedFiles":return w(w({},e),{},{isDragActive:i.isDragActive,isDragAccept:i.isDragAccept,isDragReject:i.isDragReject});case"setFiles":return w(w({},e),{},{acceptedFiles:i.acceptedFiles,fileRejections:i.fileRejections,isDragReject:i.isDragReject});case"reset":return w({},ti);default:return e}}function Di(){}const _a=R`
  0%, 100% { box-shadow: 0 0 20px rgba(255, 68, 68, 0.3), inset 0 0 30px rgba(0, 0, 0, 0.5); }
  50% { box-shadow: 0 0 40px rgba(255, 68, 68, 0.6), inset 0 0 40px rgba(0, 0, 0, 0.7); }
`,Ba=R`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`,qa=R`
  0%, 100% { opacity: 1; }
  92% { opacity: 1; }
  93% { opacity: 0.8; }
  94% { opacity: 1; }
  96% { opacity: 0.9; }
  97% { opacity: 1; }
`,Na=R`
  0%, 100% { filter: drop-shadow(0 0 8px rgba(139, 0, 0, 0.4)); }
  50% { filter: drop-shadow(0 0 16px rgba(139, 0, 0, 0.7)); }
`,Ua=o(g.div)`
  width: 100%;
  max-width: 500px;
`,Ha=o.div`
  position: relative;
  width: 100%;
  max-width: 500px;
  min-height: 280px;
  padding: 2rem;
  border: 2px dashed ${({theme:e,$isDragActive:i,$hasError:t})=>t?e.colors.danger:i?e.colors.accent:e.colors.secondary};
  border-radius: ${({theme:e})=>e.spacing.borderRadius}px;
  background: ${({theme:e})=>e.colors.surface};
  cursor: ${({$isProcessing:e})=>e?"wait":"pointer"};
  overflow: hidden;
  transition: all 0.3s ease;
  
  ${({theme:e})=>e.effects.parchmentTexture&&S`
    background-image: 
      linear-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0, 0, 0, 0.1) 1px, transparent 1px);
    background-size: 20px 20px;
  `}
  
  ${({$isDragActive:e,theme:i})=>e&&S`
    border-color: ${i.colors.accent};
    animation: ${_a} 1.5s ease-in-out infinite;
  `}
  
  ${({theme:e})=>e.animations.flicker&&S`
    animation: ${qa} 4s ease-in-out infinite;
  `}
  
  &:hover {
    border-color: ${({theme:e})=>e.colors.accent};
    box-shadow: ${({theme:e})=>e.spacing.shadows[1]};
  }
`,Ga=o.div`
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
  animation: ${Ba} 8s ease-in-out infinite;
`,Wa=o.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  min-height: 200px;
`,Ai=o(g.div)`
  font-size: 4rem;
  color: ${({theme:e})=>e.colors.accent};
  text-shadow: ${({theme:e})=>e.typography.textShadow};
  
  ${({theme:e,$isProcessing:i})=>!i&&e.effects.shadowMovement&&S`
    animation: ${Na} 2s ease-in-out infinite;
  `}
`,Ei=o.h3`
  font-size: 1.25rem;
  color: ${({theme:e})=>e.colors.text};
  text-shadow: ${({theme:e})=>e.typography.textShadow};
  margin: 0;
  text-align: center;
`,Ya=o.p`
  font-size: 0.875rem;
  color: ${({theme:e})=>e.colors.textMuted};
  margin: 0;
  text-align: center;
`,Va=o.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  justify-content: center;
`,Pe=o.span`
  padding: 0.25rem 0.75rem;
  font-size: 0.75rem;
  background: ${({theme:e})=>e.colors.secondary};
  color: ${({theme:e})=>e.colors.text};
  border-radius: ${({theme:e})=>e.spacing.borderRadius}px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`,Ka=o(g.div)`
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
`,Xa=o(g.div)`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  background: rgba(0, 0, 0, 0.8);
  z-index: 10;
`,Ja=o(g.div)`
  width: 60px;
  height: 60px;
  border: 3px solid ${({theme:e})=>e.colors.secondary};
  border-top-color: ${({theme:e})=>e.colors.accent};
  border-radius: 50%;
`,Za=o.p`
  color: ${({theme:e})=>e.colors.text};
  font-size: 1rem;
  text-shadow: ${({theme:e})=>e.typography.textShadow};
`,Si=["Release the cursed document...","Drop your haunted bill here...","Let the exorcism begin..."],Ti=["Summoning the spirits of clarity...","Deciphering the ancient billing codes...","Exorcising the confusion...","Translating the medical hieroglyphics..."],Me={size:"This document is too powerful! Please upload a file under 10MB.",type:"Only sacred scrolls (PDF, JPG, PNG) are accepted here.",unknown:"The spirits are disturbed. Please try again."},Qa=({onFileUpload:e,isProcessing:i=!1,maxSize:t=10*1024*1024})=>{const{theme:n}=W(),[r,s]=p.useState(null),[l]=p.useState(()=>Si[Math.floor(Math.random()*Si.length)]),[c]=p.useState(()=>Ti[Math.floor(Math.random()*Ti.length)]),m=p.useCallback((F,D)=>{var L;if(s(null),D.length>0){const _=(L=D[0].errors[0])==null?void 0:L.code;s(_==="file-too-large"?{type:"size",message:Me.size}:_==="file-invalid-type"?{type:"type",message:Me.type}:{type:"unknown",message:Me.unknown});return}F.length>0&&e(F[0])},[e]),{getRootProps:x,getInputProps:u,isDragActive:h}=ot({onDrop:m,accept:{"image/jpeg":[".jpg",".jpeg"],"image/png":[".png"],"application/pdf":[".pdf"]},maxSize:t,multiple:!1,disabled:i});return a.jsx(Ua,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5},children:a.jsxs(Ha,{...x(),$isDragActive:h,$hasError:!!r,$isProcessing:i,role:"button","aria-label":"Upload medical bill. Drag and drop a file here, or click to select. Accepts PDF, JPG, and PNG files up to 10MB.",tabIndex:0,children:[a.jsx("input",{...u(),"aria-label":"File upload input","aria-describedby":"upload-instructions"}),a.jsx(Ga,{$opacity:n.effects.fogOpacity,"aria-hidden":"true"}),a.jsx("span",{id:"upload-instructions",className:"sr-only",children:"Upload your medical bill by dragging and dropping a file, or press Enter to open file browser. Supported formats: PDF, JPG, PNG. Maximum file size: 10 megabytes."}),a.jsxs(Wa,{children:[a.jsx(Y,{mode:"wait",children:h?a.jsxs(g.div,{initial:{scale:.8,opacity:0},animate:{scale:1,opacity:1},exit:{scale:.8,opacity:0},style:{textAlign:"center"},children:[a.jsx(Ai,{$isProcessing:!1,children:"📜"}),a.jsx(Ei,{children:l})]},"drag-active"):a.jsxs(g.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},style:{display:"flex",flexDirection:"column",alignItems:"center",gap:"1rem"},children:[a.jsx(Ai,{$isProcessing:i,animate:{y:[0,-8,0]},transition:{duration:2,repeat:1/0,ease:"easeInOut"},children:"👻"}),a.jsx(Ei,{children:"Drop your haunted medical bill here"}),a.jsx(Ya,{children:"or click to summon the file picker"}),a.jsxs(Va,{children:[a.jsx(Pe,{children:"PDF"}),a.jsx(Pe,{children:"JPG"}),a.jsx(Pe,{children:"PNG"})]})]},"default")}),a.jsx(Y,{children:r&&a.jsxs(Ka,{initial:{opacity:0,y:10},animate:{opacity:1,y:0},exit:{opacity:0,y:-10},children:["⚠️ ",r.message]})})]}),a.jsx(Y,{children:i&&a.jsxs(Xa,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},children:[a.jsx(Ja,{animate:{rotate:360},transition:{duration:1,repeat:1/0,ease:"linear"}}),a.jsx(Za,{children:c})]})})]})})},en=R`
  0%, 100% { box-shadow: 0 0 10px rgba(255, 140, 0, 0.3); }
  50% { box-shadow: 0 0 25px rgba(255, 140, 0, 0.6); }
`,tn=R`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`,an=R`
  0%, 100% { opacity: 0.3; transform: translateX(-5%); }
  50% { opacity: 0.5; transform: translateX(5%); }
`,nn=o(g.div)`
  width: 100%;
  max-width: 500px;
  padding: 1.5rem;
  background: ${({theme:e})=>e.colors.surface};
  border-radius: ${({theme:e})=>e.spacing.borderRadius}px;
  border: 1px solid ${({theme:e})=>e.colors.secondary};
  box-shadow: ${({theme:e})=>e.spacing.shadows[0]};
  position: relative;
  overflow: hidden;
`,on=o.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    transparent 0%,
    ${({theme:e})=>e.colors.fog} 50%,
    transparent 100%
  );
  opacity: ${({$visible:e})=>e?1:0};
  animation: ${an} 3s ease-in-out infinite;
  pointer-events: none;
  transition: opacity 0.5s ease;
`,rn=o.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
  position: relative;
  z-index: 1;
`,sn=o.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`,cn=o.span`
  font-size: 1.5rem;
`,ln=o.span`
  color: ${({theme:e})=>e.colors.text};
  font-size: 0.875rem;
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`,pn=o.span`
  padding: 0.25rem 0.75rem;
  font-size: 0.75rem;
  border-radius: ${({theme:e})=>e.spacing.borderRadius}px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  
  ${({$status:e,theme:i})=>{switch(e){case"uploading":return S`
          background: ${i.colors.secondary};
          color: ${i.colors.accent};
        `;case"processing":return S`
          background: rgba(255, 140, 0, 0.2);
          color: ${i.colors.accent};
          animation: ${en} 1.5s ease-in-out infinite;
        `;case"complete":return S`
          background: rgba(76, 175, 80, 0.2);
          color: ${i.colors.success};
        `;case"error":return S`
          background: rgba(255, 0, 0, 0.2);
          color: ${i.colors.danger};
        `;default:return""}}}
`,dn=o.div`
  width: 100%;
  height: 8px;
  background: ${({theme:e})=>e.colors.secondary};
  border-radius: 4px;
  overflow: hidden;
  position: relative;
  z-index: 1;
`,mn=o(g.div)`
  height: 100%;
  border-radius: 4px;
  position: relative;
  
  ${({$status:e,theme:i})=>{switch(e){case"uploading":case"processing":return S`
          background: linear-gradient(
            90deg,
            ${i.colors.accent} 0%,
            ${i.colors.primary} 50%,
            ${i.colors.accent} 100%
          );
          background-size: 200% 100%;
          animation: ${tn} 2s linear infinite;
        `;case"complete":return S`
          background: ${i.colors.success};
        `;case"error":return S`
          background: ${i.colors.danger};
        `;default:return S`
          background: ${i.colors.accent};
        `}}}
`,un=o.div`
  display: flex;
  justify-content: space-between;
  margin-top: 0.5rem;
  font-size: 0.75rem;
  color: ${({theme:e})=>e.colors.textMuted};
  position: relative;
  z-index: 1;
`,fn=o(g.p)`
  margin-top: 1rem;
  font-size: 0.875rem;
  color: ${({theme:e,$isError:i})=>i?e.colors.danger:e.colors.textMuted};
  text-align: center;
  position: relative;
  z-index: 1;
`,zi={uploading:["Transferring the cursed document...","Channeling the bill through the void...","Summoning your medical mysteries..."],processing:["The spirits are analyzing your bill...","Decoding the ancient medical runes...","Exorcising the billing demons...","Translating the healthcare hieroglyphics..."],complete:["The curse has been revealed!","Your bill's secrets are exposed!","The spirits have spoken!"],error:["The spirits are disturbed...","A dark force blocks our path...","The ritual has failed..."]},gn=e=>{const i=zi[e]||zi.uploading;return i[Math.floor(Math.random()*i.length)]},xn=({progress:e,fileName:i,status:t,errorMessage:n,message:r})=>{const{theme:s}=W(),[l]=Ui.useState(()=>gn(t)),c=r||l,m=()=>i.toLowerCase().endsWith(".pdf")?"📄":i.toLowerCase().match(/\.(jpg|jpeg|png)$/)?"🖼️":"📜",x=()=>{switch(t){case"uploading":return"Uploading";case"processing":return"Processing";case"complete":return"Complete";case"error":return"Error";default:return t}};return a.jsxs(nn,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},exit:{opacity:0,y:-20},transition:{duration:.3},children:[a.jsx(on,{$visible:s.effects.fogOpacity>0&&t!=="complete"}),a.jsxs(rn,{children:[a.jsxs(sn,{children:[a.jsx(cn,{children:m()}),a.jsx(ln,{title:i,children:i})]}),a.jsx(pn,{$status:t,children:x()})]}),a.jsx(dn,{children:a.jsx(mn,{$status:t,initial:{width:0},animate:{width:`${e}%`},transition:{duration:.3,ease:"easeOut"}})}),a.jsxs(un,{children:[a.jsx("span",{children:t==="complete"?"Done":c}),a.jsxs("span",{children:[e,"%"]})]}),t==="error"&&n&&a.jsxs(fn,{$isError:!0,initial:{opacity:0},animate:{opacity:1},children:["⚠️ ",n]})]})},hn=R`
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
`,vn=R`
  0%, 100% { clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%); }
  25% { clip-path: polygon(1% 0, 100% 1%, 99% 100%, 0 99%); }
  50% { clip-path: polygon(0 1%, 99% 0, 100% 99%, 1% 100%); }
  75% { clip-path: polygon(1% 1%, 100% 0, 99% 99%, 0 100%); }
`,rt=R`
  0%, 100% { filter: blur(0px) contrast(1); }
  50% { filter: blur(0.3px) contrast(1.05); }
`,bn=o(g.div)`
  position: relative;
  width: 100%;
  max-width: 500px;
  background: ${({theme:e})=>e.colors.surface};
  border-radius: ${({theme:e})=>e.spacing.borderRadius}px;
  overflow: hidden;
  
  ${({$hauntingLevel:e})=>e>.5&&S`
    animation: ${hn} 3s ease-in-out infinite;
  `}
`,yn=o.div`
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
`,wn=o.div`
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
`,kn=o.div`
  position: relative;
  width: 100%;
  aspect-ratio: 8.5 / 11;
  overflow: hidden;
  
  ${({$haunted:e})=>e&&S`
    animation: ${vn} 8s ease-in-out infinite;
  `}
`,jn=o.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  background: #1a1a1a;
  
  ${({$haunted:e})=>e&&S`
    animation: ${rt} 4s ease-in-out infinite;
    filter: sepia(0.2) contrast(1.1);
  `}
`,Ii=o.div`
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
  
  ${({$haunted:e})=>e&&S`
    animation: ${rt} 4s ease-in-out infinite;
  `}
`,Ri=o.span`
  font-size: 4rem;
  filter: drop-shadow(0 0 10px rgba(139, 0, 0, 0.5));
`,Fi=o.span`
  color: ${({theme:e})=>e.colors.text};
  font-size: 0.875rem;
  text-align: center;
  padding: 0 1rem;
  word-break: break-word;
`,$n=o(g.button)`
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
`,Cn=o.div`
  padding: 1rem;
  background: ${({theme:e})=>e.colors.secondary};
  border-top: 1px solid ${({theme:e})=>e.colors.primary};
`,Dn=o.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`,An=o.span`
  color: ${({theme:e})=>e.colors.text};
  font-size: 0.875rem;
  max-width: 70%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`,En=o.span`
  color: ${({theme:e})=>e.colors.textMuted};
  font-size: 0.75rem;
`,Sn=o(g.div)`
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
`,Tn=e=>e<1024?`${e} B`:e<1024*1024?`${(e/1024).toFixed(1)} KB`:`${(e/(1024*1024)).toFixed(1)} MB`,zn=({file:e,onRemove:i})=>{const{theme:t}=W(),[n,r]=p.useState(null),s=e.type.startsWith("image/"),l=e.type==="application/pdf",c=t.effects.parchmentTexture;return p.useEffect(()=>{if(s){const m=URL.createObjectURL(e);return r(m),()=>URL.revokeObjectURL(m)}},[e,s]),a.jsxs(bn,{$hauntingLevel:t.effects.glowIntensity,initial:{opacity:0,scale:.95},animate:{opacity:1,scale:1},exit:{opacity:0,scale:.95},transition:{duration:.3},children:[a.jsx(yn,{$visible:c}),a.jsx(wn,{$visible:c}),c&&a.jsx(Sn,{initial:{opacity:0,x:-20},animate:{opacity:1,x:0},transition:{delay:.3},children:"📜 Cursed Document"}),i&&a.jsx($n,{onClick:i,whileHover:{scale:1.1},whileTap:{scale:.9},title:"Remove document",children:"×"}),a.jsx(kn,{$haunted:c,children:s&&n?a.jsx(jn,{src:n,alt:"Document preview",$haunted:c}):l?a.jsxs(Ii,{$haunted:c,children:[a.jsx(Ri,{children:"📄"}),a.jsx(Fi,{children:e.name})]}):a.jsxs(Ii,{$haunted:c,children:[a.jsx(Ri,{children:"📜"}),a.jsx(Fi,{children:e.name})]})}),a.jsx(Cn,{children:a.jsxs(Dn,{children:[a.jsx(An,{title:e.name,children:e.name}),a.jsx(En,{children:Tn(e.size)})]})})]})},In={99211:{code:"99211",description:"Office Visit - Level 1 (Minimal)",avgCost:45,lowCost:25,highCost:75,medicareRate:23,category:"office-visit"},99212:{code:"99212",description:"Office Visit - Level 2 (Straightforward)",avgCost:85,lowCost:50,highCost:130,medicareRate:46,category:"office-visit"},99213:{code:"99213",description:"Office Visit - Level 3 (Low Complexity)",avgCost:130,lowCost:80,highCost:185,medicareRate:76,category:"office-visit"},99214:{code:"99214",description:"Office Visit - Level 4 (Moderate)",avgCost:195,lowCost:120,highCost:280,medicareRate:111,category:"office-visit"},99215:{code:"99215",description:"Office Visit - Level 5 (High Complexity)",avgCost:265,lowCost:180,highCost:380,medicareRate:150,category:"office-visit"},36415:{code:"36415",description:"Venipuncture (Blood Draw)",avgCost:30,lowCost:15,highCost:50,medicareRate:3,category:"lab"},80053:{code:"80053",description:"Comprehensive Metabolic Panel",avgCost:150,lowCost:50,highCost:250,medicareRate:14,category:"lab"},85025:{code:"85025",description:"Complete Blood Count (CBC)",avgCost:75,lowCost:30,highCost:150,medicareRate:11,category:"lab"},81001:{code:"81001",description:"Urinalysis with Microscopy",avgCost:45,lowCost:20,highCost:80,medicareRate:4,category:"lab"},84443:{code:"84443",description:"TSH (Thyroid Test)",avgCost:85,lowCost:35,highCost:150,medicareRate:23,category:"lab"},82947:{code:"82947",description:"Glucose Test",avgCost:35,lowCost:15,highCost:60,medicareRate:5,category:"lab"},82306:{code:"82306",description:"Vitamin D Test",avgCost:120,lowCost:50,highCost:200,medicareRate:40,category:"lab"},83036:{code:"83036",description:"Hemoglobin A1C",avgCost:65,lowCost:30,highCost:120,medicareRate:13,category:"lab"},80061:{code:"80061",description:"Lipid Panel",avgCost:85,lowCost:35,highCost:150,medicareRate:18,category:"lab"},71046:{code:"71046",description:"Chest X-Ray (2 views)",avgCost:150,lowCost:75,highCost:300,medicareRate:31,category:"imaging"},73030:{code:"73030",description:"Shoulder X-Ray",avgCost:120,lowCost:60,highCost:250,medicareRate:26,category:"imaging"},70553:{code:"70553",description:"Brain MRI with Contrast",avgCost:1500,lowCost:500,highCost:3e3,medicareRate:450,category:"imaging"},10060:{code:"10060",description:"Incision and Drainage",avgCost:350,lowCost:150,highCost:600,medicareRate:120,category:"procedure"},11102:{code:"11102",description:"Skin Biopsy",avgCost:250,lowCost:100,highCost:450,medicareRate:85,category:"procedure"},90471:{code:"90471",description:"Immunization Administration",avgCost:35,lowCost:15,highCost:60,medicareRate:17,category:"procedure"}};function st(e){const i=e.code?In[e.code]:null,t=e.amount||0;if(!i)return{lineItemId:e.id,code:e.code,chargedAmount:t,avgCost:t*.7,lowCost:t*.4,highCost:t*1.2,medicareRate:t*.3,percentAboveAvg:0,percentAboveMedicare:0,priceRating:"fair",category:"other"};const n=(t-i.avgCost)/i.avgCost*100,r=(t-i.medicareRate)/i.medicareRate*100;let s="fair";return n>100?s="extreme":n>50?s="very-high":n>25&&(s="high"),{lineItemId:e.id,code:e.code,chargedAmount:t,avgCost:i.avgCost,lowCost:i.lowCost,highCost:i.highCost,medicareRate:i.medicareRate,percentAboveAvg:Math.round(n),percentAboveMedicare:Math.round(r),priceRating:s,category:i.category}}function ct(e){const i=[],t=new Map;for(const n of e){const r=`${n.code||""}-${n.amount}-${n.date||""}`;t.has(r)||t.set(r,[]),t.get(r).push(n)}for(const[n,r]of t)r.length>1&&i.push(r.map(s=>s.id));return i}function Rn(e){const i=[],t=[{codes:["36415","36416"],reason:"Multiple venipuncture codes billed - typically only one should be charged per visit"},{codes:["99213","99214","99215"],reason:"Multiple office visit codes on same date - only one E/M code should be billed per visit"}];for(const n of t){const r=e.filter(s=>s.code&&n.codes.includes(s.code));r.length>1&&i.push({lineItemId:r[0].id,type:"unbundled",severity:"medium",reason:n.reason,potentialSavings:r.slice(1).reduce((s,l)=>s+(l.amount||0),0),talkingPoints:["Ask why multiple similar codes were billed","Request review for proper bundling","Reference CMS bundling guidelines"],actionSteps:["Call billing department and ask for itemized explanation","Request a coding review","If denied, file appeal with your insurance"]})}return i}function Fn(e,i){const t=[];for(const s of i)s.priceRating==="extreme"?t.push({lineItemId:s.lineItemId,type:"overcharge",severity:"high",reason:`This charge is ${s.percentAboveAvg}% above the average cost and ${s.percentAboveMedicare}% above Medicare rates.`,potentialSavings:s.chargedAmount-s.avgCost,talkingPoints:[`The average cost for this service is $${s.avgCost.toFixed(2)}`,`Medicare pays only $${s.medicareRate.toFixed(2)} for this service`,`Your charge of $${s.chargedAmount.toFixed(2)} is significantly above market rates`],actionSteps:["Request an itemized bill with detailed breakdown","Ask for a price reduction to match fair market value","Request financial assistance or payment plan","If insured, ask your insurance to review the charge"]}):s.priceRating==="very-high"&&t.push({lineItemId:s.lineItemId,type:"overcharge",severity:"medium",reason:`This charge is ${s.percentAboveAvg}% above average.`,potentialSavings:s.chargedAmount-s.avgCost,talkingPoints:[`The typical cost for this service is $${s.avgCost.toFixed(2)}`,"Your charge is on the high end of the price range"],actionSteps:["Ask if there are any discounts available","Request a payment plan if needed","Compare with other providers for future reference"]});const n=ct(e);for(const s of n){const c=e.filter(m=>s.includes(m.id)).slice(1).reduce((m,x)=>m+(x.amount||0),0);t.push({lineItemId:s[0],type:"duplicate",severity:"high",reason:`This charge appears ${s.length} times on your bill. You should only pay once.`,potentialSavings:c,talkingPoints:["Point out the duplicate entries on your bill","Request immediate removal of duplicate charges","Ask for a corrected bill in writing"],actionSteps:["Call billing immediately to report the duplicate","Document the call with date, time, and representative name","Request written confirmation of the correction","If not resolved, file a complaint with your state insurance commissioner"]})}const r=Rn(e);return t.push(...r),t}function On(e){const i=e.map(u=>st(u)).filter(u=>u!==null),t=Fn(e,i),n=ct(e),r=e.reduce((u,h)=>u+(h.amount||0),0),s=i.reduce((u,h)=>u+h.avgCost,0),l=t.reduce((u,h)=>u+h.potentialSavings,0);let c="fair";const m=t.filter(u=>u.severity==="high").length,x=t.filter(u=>u.severity==="medium").length;return m>=3||l>r*.3?c="egregious":m>=1||x>=3?c="concerning":(x>=1||l>r*.1)&&(c="questionable"),{comparisons:i,disputes:t,duplicates:n,totalCharged:r,fairMarketValue:s,potentialSavings:l,overallRating:c}}function Pn(e){switch(e){case"fair":return"#4CAF50";case"high":return"#FF9800";case"very-high":return"#f44336";case"extreme":return"#9C27B0";default:return"#666"}}function Mn(e){switch(e){case"fair":return"✓ Fair Price";case"high":return"⚠️ Above Average";case"very-high":return"🚨 Very High";case"extreme":return"💀 Extreme Overcharge";default:return"Unknown"}}function M(e){return new Intl.NumberFormat("en-US",{style:"currency",currency:"USD"}).format(e)}const Ln=o(g.div)`
  padding: 0.75rem;
  background: ${({theme:e})=>e.colors.background};
  border-radius: ${({theme:e})=>e.spacing.borderRadius}px;
  border: 1px solid ${({theme:e})=>e.colors.secondary};
`,_n=o.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`,Bn=o.span`
  font-size: 0.75rem;
  color: ${({theme:e})=>e.colors.textMuted};
  text-transform: uppercase;
  letter-spacing: 0.05em;
`,qn=o.span`
  font-size: 0.7rem;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  background: ${({$color:e})=>e}20;
  color: ${({$color:e})=>e};
  font-weight: 600;
`,Nn=o.div`
  position: relative;
  height: 24px;
  background: ${({theme:e})=>e.colors.secondary};
  border-radius: 4px;
  overflow: hidden;
  margin: 0.5rem 0;
`,Un=o.div`
  position: absolute;
  top: 4px;
  bottom: 4px;
  left: ${({$left:e})=>e}%;
  width: ${({$width:e})=>e}%;
  background: linear-gradient(90deg, #4CAF50, #FF9800);
  border-radius: 2px;
  opacity: 0.6;
`,Oi=o.div`
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
`,Hn=o.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.7rem;
  color: ${({theme:e})=>e.colors.textMuted};
`,Le=o.span`
  ${({$highlight:e,$color:i})=>e&&`
    font-weight: 600;
    color: ${i||"inherit"};
  `}
`,Gn=o.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
  margin-top: 0.5rem;
`,_e=o.div`
  text-align: center;
  padding: 0.5rem;
  background: ${({theme:e})=>e.colors.surface};
  border-radius: 4px;
`,Be=o.div`
  font-size: 0.65rem;
  color: ${({theme:e})=>e.colors.textMuted};
  margin-bottom: 0.25rem;
`,qe=o.div`
  font-size: 0.875rem;
  font-weight: 600;
  color: ${({$color:e,theme:i})=>e||i.colors.text};
`,Wn=({comparison:e})=>{const i=Pn(e.priceRating),t=Mn(e.priceRating),n=Math.max(e.chargedAmount,e.highCost)*1.2,r=e.lowCost/n*100,s=e.highCost/n*100,l=e.avgCost/n*100,c=Math.min(e.chargedAmount/n*100,98);return a.jsxs(Ln,{initial:{opacity:0,height:0},animate:{opacity:1,height:"auto"},exit:{opacity:0,height:0},children:[a.jsxs(_n,{children:[a.jsx(Bn,{children:"💰 Cost Analysis"}),a.jsx(qn,{$color:i,children:t})]}),a.jsxs(Nn,{children:[a.jsx(Un,{$left:r,$width:s-r}),a.jsx(Oi,{$position:l,$color:"#4CAF50",title:"Average"}),a.jsx(Oi,{$position:c,$color:i,title:"Your charge"})]}),a.jsxs(Hn,{children:[a.jsxs(Le,{children:["Low: ",M(e.lowCost)]}),a.jsxs(Le,{$highlight:!0,$color:"#4CAF50",children:["Avg: ",M(e.avgCost)]}),a.jsxs(Le,{children:["High: ",M(e.highCost)]})]}),a.jsxs(Gn,{children:[a.jsxs(_e,{children:[a.jsx(Be,{children:"Your Charge"}),a.jsx(qe,{$color:i,children:M(e.chargedAmount)})]}),a.jsxs(_e,{children:[a.jsx(Be,{children:"Medicare Rate"}),a.jsx(qe,{children:M(e.medicareRate)})]}),a.jsxs(_e,{children:[a.jsx(Be,{children:"vs Average"}),a.jsxs(qe,{$color:e.percentAboveAvg>0?i:"#4CAF50",children:[e.percentAboveAvg>0?"+":"",e.percentAboveAvg,"%"]})]})]})]})},Yn=R`
  0%, 100% { box-shadow: 0 0 10px rgba(139, 0, 0, 0.3); }
  50% { box-shadow: 0 0 20px rgba(139, 0, 0, 0.5); }
`,Vn=R`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`,Kn=o(g.div)`
  width: 100%;
  background: ${({theme:e})=>e.colors.surface};
  border-radius: ${({theme:e})=>e.spacing.borderRadius}px;
  border: 1px solid ${({theme:e,$isDuplicate:i})=>i?e.colors.danger:e.colors.secondary};
  overflow: hidden;
  transition: all 0.5s ease;
  
  ${({$isExplained:e})=>!e&&S`
    animation: ${Yn} 3s ease-in-out infinite;
  `}
  
  ${({$isExplained:e})=>e&&S`
    border-color: ${({theme:i})=>i.colors.success};
    box-shadow: 0 0 10px rgba(100, 200, 100, 0.2);
  `}
`,Xn=o.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  cursor: pointer;
  transition: background 0.3s ease;
  
  &:hover {
    background: ${({theme:e})=>e.colors.secondary}20;
  }
`,Jn=o.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  flex: 1;
  text-align: left;
`,Zn=o.span`
  font-family: monospace;
  font-size: 0.75rem;
  padding: 0.125rem 0.5rem;
  background: ${({theme:e,$isExplained:i})=>i?e.colors.success+"30":e.colors.accent+"30"};
  color: ${({theme:e,$isExplained:i})=>i?e.colors.success:e.colors.accent};
  border-radius: 4px;
  width: fit-content;
`,Qn=o.p`
  font-size: 0.9rem;
  color: ${({theme:e})=>e.colors.text};
  margin: 0;
  line-height: 1.4;
`,eo=o.div`
  font-size: 1.25rem;
  font-weight: 700;
  color: ${({theme:e,$isExplained:i,$isDuplicate:t})=>t?e.colors.danger:i?e.colors.success:e.colors.accent};
  white-space: nowrap;
  margin-left: 1rem;
`,io=o.span`
  font-size: 0.65rem;
  padding: 0.125rem 0.375rem;
  background: ${({theme:e})=>e.colors.danger};
  color: white;
  border-radius: 4px;
  margin-left: 0.5rem;
  text-transform: uppercase;
`,to=o(g.div)`
  padding: 1rem;
  background: ${({theme:e})=>e.colors.background};
  border-top: 1px solid ${({theme:e})=>e.colors.secondary};
`,ao=o.p`
  font-size: 0.875rem;
  color: ${({theme:e})=>e.colors.text};
  line-height: 1.6;
  margin: 0;
  text-align: left;
`,no=o.div`
  height: 4px;
  background: linear-gradient(
    90deg,
    ${({theme:e})=>e.colors.accent} 0%,
    ${({theme:e})=>e.colors.primary} 50%,
    ${({theme:e})=>e.colors.accent} 100%
  );
  background-size: 200% 100%;
  animation: ${Vn} 1.5s linear infinite;
`,oo=o(g.button)`
  padding: 0.5rem 1rem;
  font-size: 0.75rem;
  border-radius: ${({theme:e})=>e.spacing.borderRadius}px;
  background: ${({theme:e,$isExplained:i})=>i?e.colors.success:e.colors.accent};
  color: ${({theme:e})=>e.colors.background};
  white-space: nowrap;
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`,ro=o.div`
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
`,so=({item:e,index:i,isExplained:t,explanation:n,onExplain:r,isLoading:s=!1,showCostComparison:l=!0})=>{var h,F;const[c,m]=p.useState(!1),x=p.useMemo(()=>st(e),[e]),u=()=>{t?m(!c):r()};return a.jsxs(Kn,{$isExplained:t,$isDuplicate:e.isDuplicate,initial:{opacity:0,x:-20},animate:{opacity:1,x:0},transition:{delay:i*.1,duration:.3},layout:!0,role:"article","aria-label":`Line item: ${e.description||e.rawText}, Amount: $${((h=e.amount)==null?void 0:h.toFixed(2))||"0.00"}${e.isDuplicate?", Warning: Duplicate charge":""}`,children:[s&&a.jsx(no,{"aria-label":"Loading explanation"}),a.jsxs(Xn,{$isExplained:t,onClick:u,role:"button",tabIndex:0,"aria-expanded":c,"aria-label":t?"Click to expand explanation":"Click to get explanation",onKeyDown:D=>{(D.key==="Enter"||D.key===" ")&&(D.preventDefault(),u())},children:[a.jsxs(Jn,{children:[a.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"0.5rem"},children:[e.code&&a.jsx(Zn,{$isExplained:t,children:e.code}),a.jsxs(ro,{$confidence:e.confidence,children:[e.confidence,"%"]}),e.isDuplicate&&a.jsx(io,{children:"⚠️ Duplicate"})]}),a.jsx(Qn,{children:e.description||e.rawText})]}),a.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"0.75rem"},children:[a.jsxs(eo,{$isExplained:t,$isDuplicate:e.isDuplicate,children:["$",((F=e.amount)==null?void 0:F.toFixed(2))||"0.00"]}),a.jsx(oo,{$isExplained:t,onClick:D=>{D.stopPropagation(),t?m(!c):r()},disabled:s,whileHover:{scale:1.05},whileTap:{scale:.95},children:s?"🔮":t?c?"▲":"▼":"🔮 Explain"})]})]}),a.jsx(Y,{children:t&&c&&a.jsxs(to,{initial:{height:0,opacity:0},animate:{height:"auto",opacity:1},exit:{height:0,opacity:0},transition:{duration:.3},children:[n&&a.jsx(ao,{children:n}),l&&x&&a.jsx("div",{style:{marginTop:"1rem"},children:a.jsx(Wn,{comparison:x})})]})})]})},Ne={99213:{lineItemId:"",plainEnglish:'This is a standard office visit for an established patient. Your doctor spent about 15-30 minutes with you discussing your symptoms, examining you, and deciding on treatment. The "Level 3" means it was moderately complex - not just a quick check-up, but not a complicated case either.',medicalContext:"Office visits are coded by complexity levels 1-5. Level 3 (99213) is the most common code, used when your visit involves reviewing your history, a focused exam, and straightforward medical decision-making.",costAnalysis:"The typical cost for this visit ranges from $100-$150 at most practices. Your charge of $185 is on the higher end, which is common for hospital-based clinics that add facility fees. This is within normal range but worth noting.",disputeRecommendation:void 0},36415:{lineItemId:"",plainEnglish:"This is the charge for drawing your blood. A trained phlebotomist inserted a needle into your vein to collect blood samples for testing. It's a quick, routine procedure that takes just a few minutes.",medicalContext:"Venipuncture is the medical term for drawing blood from a vein. This is separate from the actual lab tests - you're paying for the skill and supplies needed to collect the blood safely.",costAnalysis:"Blood draws typically cost $20-$40. Your charge of $45 is slightly above average but reasonable. This is a standard charge and not worth disputing.",disputeRecommendation:void 0},80053:{lineItemId:"",plainEnglish:'This is a Comprehensive Metabolic Panel - a blood test that checks 14 different things at once. It looks at your blood sugar, kidney function, liver function, and electrolyte levels. Think of it as a "general health snapshot" from your blood.',medicalContext:"The CMP is one of the most commonly ordered lab panels. It helps doctors screen for diabetes, kidney disease, liver problems, and electrolyte imbalances. It's often part of routine checkups or when investigating symptoms.",costAnalysis:"This panel typically costs $100-$200 at most labs. Your charge of $287 is significantly above average. Hospital labs often charge 2-3x more than independent labs for the same test.",disputeRecommendation:{shouldDispute:!0,reason:"This charge is 40-90% higher than typical costs for this standard lab panel.",talkingPoints:["Ask for an itemized bill showing the lab costs separately","Request a price match to Medicare rates (typically around $14 for this panel)","Ask if you can get future labs done at an independent lab for lower cost","Request a discount for paying in full or setting up a payment plan"]}},85025:{lineItemId:"",plainEnglish:"This is a Complete Blood Count (CBC) - it measures your red blood cells, white blood cells, and platelets. It helps detect infections, anemia, and many other conditions. It's one of the most common blood tests ordered.",medicalContext:"A CBC with differential breaks down your white blood cells into different types, which helps identify specific infections or blood disorders. It's a fundamental diagnostic tool used in almost every medical setting.",costAnalysis:"A CBC typically costs $50-$100. Your charge of $156 is above the typical range. Like other lab tests, hospital pricing tends to be higher than independent labs.",disputeRecommendation:{shouldDispute:!0,reason:"This charge is 50-200% higher than typical costs.",talkingPoints:["Compare this to independent lab pricing (often $30-50)","Ask about financial assistance programs","Request an itemized breakdown of all lab charges"]}},81001:{lineItemId:"",plainEnglish:"This is a urinalysis - a test of your urine using a dipstick. It checks for signs of infection, kidney problems, diabetes, and other conditions. It's quick, non-invasive, and provides a lot of useful information.",medicalContext:"Urinalysis is often done as part of routine checkups or when you have symptoms like painful urination. The dipstick method tests for things like blood, protein, glucose, and bacteria in your urine.",costAnalysis:"A basic urinalysis typically costs $30-$50. Your charge of $78 is moderately above average but not unusual for hospital settings.",disputeRecommendation:void 0},facility:{lineItemId:"",plainEnglish:"This is a facility fee - essentially a charge for using the hospital's building, equipment, and support staff. It covers overhead costs like maintaining the facility, equipment, and having staff available. Many patients are surprised by this charge because it's separate from what your doctor charges.",medicalContext:"Hospital-based clinics charge facility fees because they have higher overhead than independent practices. This fee exists even for simple visits because you're technically receiving care in a hospital outpatient department.",costAnalysis:"Facility fees vary wildly - from $100 to $500+ depending on the hospital and location. Your charge of $425 is on the higher end. These fees are often the most negotiable part of a hospital bill.",disputeRecommendation:{shouldDispute:!0,reason:"Facility fees are often negotiable and may be reduced or waived.",talkingPoints:["Ask why a facility fee was charged for an outpatient visit","Request a reduction based on financial hardship","Ask if the visit could have been coded as a non-facility visit","Inquire about charity care or financial assistance programs","For future visits, ask if there's a non-hospital clinic option"]}}},co={plainEnglish:"This appears to be a medical service or administrative charge. The specific details depend on what service was provided during your visit.",medicalContext:"Medical billing codes can be complex. If you're unsure what this charge is for, don't hesitate to call the billing department and ask for a detailed explanation.",costAnalysis:"Without knowing the specific service, it's hard to say if this price is typical. You can always ask for an itemized bill and compare prices with other providers in your area.",disputeRecommendation:void 0},lo=e=>new Promise(i=>setTimeout(i,e));async function po(e,i){var n,r;await lo(800+Math.random()*1200);let t;return e.code&&Ne[e.code]?t={...Ne[e.code],lineItemId:e.id}:(n=e.description)!=null&&n.toLowerCase().includes("facility")?t={...Ne.facility,lineItemId:e.id}:t={...co,lineItemId:e.id},e.isDuplicate&&(t.disputeRecommendation={shouldDispute:!0,reason:"⚠️ This appears to be a DUPLICATE CHARGE! The same service was billed twice.",talkingPoints:["Point out that this exact charge appears twice on your bill","Request immediate removal of the duplicate","Ask for a corrected bill in writing","If they refuse, file a complaint with your state insurance commissioner"]},t.costAnalysis=`🚨 DUPLICATE DETECTED: This charge of $${(r=e.amount)==null?void 0:r.toFixed(2)} appears to be billed twice. You should NOT pay for the same service twice. This is a billing error that must be corrected.`),t}function mo(e){var t;let i=e.plainEnglish;return e.medicalContext&&(i+=`

📋 Medical Context: ${e.medicalContext}`),e.costAnalysis&&(i+=`

💰 Cost Analysis: ${e.costAnalysis}`),(t=e.disputeRecommendation)!=null&&t.shouldDispute&&(i+=`

⚠️ Consider Disputing: ${e.disputeRecommendation.reason}`,e.disputeRecommendation.talkingPoints.length>0&&(i+=`

Talking Points:
`+e.disputeRecommendation.talkingPoints.map(n=>`• ${n}`).join(`
`))),i}const uo=o(g.div)`
  width: 100%;
  max-width: 700px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`,fo=o.div`
  text-align: center;
`,go=o.h2`
  font-size: 1.5rem;
  color: ${({theme:e})=>e.colors.text};
  font-family: ${({theme:e})=>e.typography.fontFamilySpooky};
  text-shadow: ${({theme:e})=>e.typography.textShadow};
  margin-bottom: 0.5rem;
`,xo=o.p`
  font-size: 0.875rem;
  color: ${({theme:e})=>e.colors.textMuted};
`,ho=o.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`,vo=o.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`,Pi=o.span`
  font-size: 0.875rem;
  color: ${({theme:e})=>e.colors.text};
`,bo=o.div`
  width: 100%;
  height: 8px;
  background: ${({theme:e})=>e.colors.secondary};
  border-radius: 4px;
  overflow: hidden;
`,yo=o(g.div)`
  height: 100%;
  background: linear-gradient(
    90deg,
    ${({theme:e})=>e.colors.danger} 0%,
    ${({theme:e})=>e.colors.accent} 50%,
    ${({theme:e})=>e.colors.success} 100%
  );
  border-radius: 4px;
`,wo=o(g.p)`
  font-size: 0.875rem;
  color: ${({theme:e})=>e.colors.accent};
  text-align: center;
  font-style: italic;
`,ko=o.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`,jo=o(g.div)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  background: ${({theme:e,$isComplete:i})=>i?e.colors.success+"20":e.colors.surface};
  border: 2px solid ${({theme:e,$isComplete:i})=>i?e.colors.success:e.colors.accent};
  border-radius: ${({theme:e})=>e.spacing.borderRadius}px;
`,$o=o.span`
  font-size: 1rem;
  color: ${({theme:e})=>e.colors.text};
  font-weight: 500;
`,Co=o.span`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({theme:e,$isComplete:i})=>i?e.colors.success:e.colors.accent};
`,Do=o.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
`,Ue=o(g.button)`
  padding: 0.75rem 1.5rem;
  border-radius: ${({theme:e})=>e.spacing.borderRadius}px;
  font-weight: 600;
  
  ${({$variant:e,theme:i})=>e==="secondary"?`
    background: ${i.colors.surface};
    color: ${i.colors.text};
    border: 1px solid ${i.colors.secondary};
  `:`
    background: ${i.colors.accent};
    color: ${i.colors.background};
  `}
`,Ao=o(g.div)`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.5rem;
  background: ${({theme:e})=>e.colors.danger}15;
  border: 2px solid ${({theme:e})=>e.colors.danger};
  border-radius: ${({theme:e})=>e.spacing.borderRadius}px;
`,Eo=o.span`
  font-size: 2rem;
`,So=o.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`,To=o.span`
  font-weight: 600;
  color: ${({theme:e})=>e.colors.danger};
`,zo=o.span`
  font-size: 0.875rem;
  color: ${({theme:e})=>e.colors.text};
`,he=["The spirits are revealing the truth...","Decoding the ancient billing runes...","Light breaks through the darkness...","The curse weakens with each revelation...","Understanding dispels the shadows...","The fog of confusion lifts...","Your bill's secrets are exposed...","The exorcism nears completion..."],Io=({result:e,onComplete:i})=>{var G;const{setEmotionalState:t}=W(),[n,r]=p.useState({}),[s,l]=p.useState({}),[c,m]=p.useState(new Set),[x,u]=p.useState(he[0]),[h,F]=p.useState(0),[D,L]=p.useState(0),O=Object.keys(n).length,_=e.lineItems.length,T=_>0?O/_*100:0,z=O===_;p.useEffect(()=>{T===0||T<50?t(C.PROCESSING):T<100?t(C.UNDERSTANDING):t(C.RELIEVED)},[T,t]),p.useEffect(()=>{const b=Object.values(n).filter(A=>{var P;return(P=A.disputeRecommendation)==null?void 0:P.shouldDispute});F(b.length);const y=e.lineItems.filter(A=>{var P,U;return(U=(P=n[A.id])==null?void 0:P.disputeRecommendation)==null?void 0:U.shouldDispute}).reduce((A,P)=>A+(P.amount||0)*.3,0);L(y)},[n,e.lineItems]),p.useEffect(()=>{if(z)return;const b=setInterval(()=>{const y=Math.min(Math.floor(T/100*he.length),he.length-1);u(he[y])},3e3);return()=>clearInterval(b)},[T,z]);const N=p.useCallback(async b=>{if(!(n[b.id]||c.has(b.id))){m(y=>new Set(y).add(b.id));try{const y=await po(b,{provider:e.metadata.provider,serviceDate:e.metadata.serviceDate});r(A=>({...A,[b.id]:y})),l(A=>({...A,[b.id]:mo(y)}))}catch(y){console.error("Failed to get explanation:",y)}finally{m(y=>{const A=new Set(y);return A.delete(b.id),A})}}},[n,c,e.metadata]),J=p.useCallback(async()=>{for(const b of e.lineItems)n[b.id]||await N(b)},[e.lineItems,n,N]);return a.jsxs(uo,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5},children:[a.jsxs(fo,{children:[a.jsx(go,{children:z?"✨ Curse Lifted!":"🔮 Exorcising Your Bill"}),e.metadata.provider&&a.jsxs(xo,{children:[e.metadata.provider," • ",e.metadata.serviceDate]})]}),a.jsxs(ho,{children:[a.jsxs(vo,{children:[a.jsx(Pi,{children:z?"All charges explained!":`${O} of ${_} charges explained`}),a.jsxs(Pi,{children:[Math.round(T),"%"]})]}),a.jsx(bo,{children:a.jsx(yo,{$progress:T,initial:{width:0},animate:{width:`${T}%`},transition:{duration:.5}})})]}),a.jsx(Y,{mode:"wait",children:!z&&a.jsx(wo,{initial:{opacity:0,y:10},animate:{opacity:1,y:0},exit:{opacity:0,y:-10},children:x},x)}),a.jsx(ko,{children:e.lineItems.map((b,y)=>a.jsx(so,{item:b,index:y,isExplained:!!n[b.id],explanation:s[b.id],onExplain:()=>N(b),isLoading:c.has(b.id)},b.id))}),z&&h>0&&a.jsxs(Ao,{initial:{opacity:0,scale:.9},animate:{opacity:1,scale:1},children:[a.jsx(Eo,{children:"⚠️"}),a.jsxs(So,{children:[a.jsxs(To,{children:["Found ",h," charge(s) to review!"]}),a.jsxs(zo,{children:["Potential savings: up to $",D.toFixed(2)]})]})]}),a.jsxs(jo,{$isComplete:z,layout:!0,children:[a.jsx($o,{children:z?"✅ Total Bill":"💀 Haunted Total"}),a.jsxs(Co,{$isComplete:z,children:["$",((G=e.metadata.totalAmount)==null?void 0:G.toFixed(2))||"0.00"]})]}),a.jsxs(Do,{children:[!z&&a.jsx(Ue,{onClick:J,whileHover:{scale:1.05},whileTap:{scale:.95},disabled:c.size>0,children:"🔮 Explain All Charges"}),z&&a.jsxs(a.Fragment,{children:[a.jsx(Ue,{onClick:()=>i(n),whileHover:{scale:1.05},whileTap:{scale:.95},children:"📋 View Summary"}),a.jsx(Ue,{$variant:"secondary",whileHover:{scale:1.05},whileTap:{scale:.95},children:"🔄 Start Over"})]})]})]})},Ro=R`
  0%, 100% { transform: translateY(0) rotate(0deg); }
  25% { transform: translateY(-10px) rotate(5deg); }
  75% { transform: translateY(-5px) rotate(-5deg); }
`,Fo=R`
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
`,Oo=R`
  0%, 100% { opacity: 0; transform: scale(0); }
  50% { opacity: 1; transform: scale(1); }
`,Po=o(g.div)`
  width: 100%;
  max-width: 700px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`,Mo=o(g.div)`
  text-align: center;
  padding: 2rem;
  background: linear-gradient(135deg, 
    ${({theme:e})=>e.colors.success}20 0%,
    ${({theme:e})=>e.colors.primary}10 100%
  );
  border-radius: ${({theme:e})=>e.spacing.borderRadius*2}px;
  position: relative;
  overflow: hidden;
`,Lo=o.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  
  &::before, &::after {
    content: '✨';
    position: absolute;
    font-size: 1.5rem;
    animation: ${Oo} 2s ease-in-out infinite;
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
`,_o=o(g.span)`
  font-size: 4rem;
  display: block;
  animation: ${Ro} 3s ease-in-out infinite;
`,Bo=o.h1`
  font-size: 2rem;
  color: ${({theme:e})=>e.colors.success};
  margin: 1rem 0 0.5rem;
  font-family: ${({theme:e})=>e.typography.fontFamily};
`,qo=o.p`
  color: ${({theme:e})=>e.colors.text};
  font-size: 1rem;
`,He=o(g.div)`
  background: ${({theme:e})=>e.colors.surface};
  border-radius: ${({theme:e})=>e.spacing.borderRadius}px;
  border: 1px solid ${({theme:e})=>e.colors.secondary};
  overflow: hidden;
`,Ge=o.div`
  padding: 1rem 1.5rem;
  background: ${({theme:e,$variant:i})=>i==="success"?e.colors.success+"20":i==="warning"?e.colors.accent+"20":i==="danger"?e.colors.danger+"20":e.colors.secondary+"20"};
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
`,Ve=o.div`
  padding: 1.5rem;
`,No=o.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  
  @media (max-width: 500px) {
    grid-template-columns: 1fr;
  }
`,ve=o.div`
  padding: 1rem;
  background: ${({theme:e,$highlight:i})=>i?e.colors.success+"10":e.colors.background};
  border-radius: ${({theme:e})=>e.spacing.borderRadius}px;
  text-align: center;
`,be=o.div`
  font-size: 0.75rem;
  color: ${({theme:e})=>e.colors.textMuted};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.5rem;
`,ye=o.div`
  font-size: ${({$large:e})=>e?"2rem":"1.5rem"};
  font-weight: 700;
  color: ${({$color:e,theme:i})=>e||i.colors.text};
`,Uo=o(g.div)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: linear-gradient(90deg, 
    ${({theme:e})=>e.colors.success} 0%,
    ${({theme:e})=>e.colors.primary} 100%
  );
  background-size: 200% auto;
  animation: ${Fo} 3s linear infinite;
  color: white;
  border-radius: 20px;
  font-weight: 600;
  margin-top: 1rem;
`,Ho=o.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`,Go=o(g.div)`
  padding: 1rem;
  background: ${({theme:e})=>e.colors.background};
  border-left: 4px solid ${({$severity:e,theme:i})=>e==="high"?i.colors.danger:e==="medium"?i.colors.accent:i.colors.textMuted};
  border-radius: 0 ${({theme:e})=>e.spacing.borderRadius}px ${({theme:e})=>e.spacing.borderRadius}px 0;
`,Wo=o.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.5rem;
`,Yo=o.span`
  font-size: 0.7rem;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  text-transform: uppercase;
  background: ${({$severity:e,theme:i})=>e==="high"?i.colors.danger+"20":e==="medium"?i.colors.accent+"20":i.colors.textMuted+"20"};
  color: ${({$severity:e,theme:i})=>e==="high"?i.colors.danger:e==="medium"?i.colors.accent:i.colors.textMuted};
`,Vo=o.span`
  font-weight: 600;
  color: ${({theme:e})=>e.colors.success};
`,Ko=o.p`
  font-size: 0.875rem;
  color: ${({theme:e})=>e.colors.text};
  margin: 0 0 0.75rem;
  line-height: 1.5;
`,Xo=o.ul`
  margin: 0;
  padding-left: 1.25rem;
  font-size: 0.8rem;
  color: ${({theme:e})=>e.colors.textMuted};
  
  li {
    margin-bottom: 0.25rem;
  }
`,Jo=o.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`,Zo=o(g.div)`
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background: ${({theme:e})=>e.colors.background};
  border-radius: ${({theme:e})=>e.spacing.borderRadius}px;
`,Qo=o.div`
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
`,er=o.div`
  flex: 1;
`,ir=o.h4`
  font-size: 0.9rem;
  color: ${({theme:e})=>e.colors.text};
  margin: 0 0 0.25rem;
`,tr=o.p`
  font-size: 0.8rem;
  color: ${({theme:e})=>e.colors.textMuted};
  margin: 0;
  line-height: 1.5;
`,ar=o.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 1rem;
`,Mi=o(g.button)`
  padding: 0.875rem 1.75rem;
  border-radius: ${({theme:e})=>e.spacing.borderRadius}px;
  font-weight: 600;
  font-size: 1rem;
  
  ${({$variant:e,theme:i})=>e==="secondary"?`
    background: ${i.colors.surface};
    color: ${i.colors.text};
    border: 1px solid ${i.colors.secondary};
  `:`
    background: ${i.colors.success};
    color: white;
  `}
`,nr=[{title:"Review Your Itemized Bill",description:"Request a detailed itemized bill from the billing department if you haven't already. Compare it with this analysis."},{title:"Contact Billing Department",description:"Call the number on your bill. Be polite but firm. Reference specific charges and ask for explanations or reductions."},{title:"Document Everything",description:"Keep records of all calls, including dates, times, representative names, and what was discussed or promised."},{title:"Request Financial Assistance",description:"Ask about payment plans, financial hardship programs, or charity care if the bill is difficult to pay."}],or=({result:e,explanations:i,onStartOver:t})=>{const[n,r]=p.useState(null);p.useEffect(()=>{const c=On(e.lineItems);r(c)},[e.lineItems]);const s=()=>{const c=rr(e,n,i),m=new Blob([c],{type:"text/plain"}),x=URL.createObjectURL(m),u=document.createElement("a");u.href=x,u.download=`WTFee-Bill-Analysis-${new Date().toISOString().split("T")[0]}.txt`,u.click(),URL.revokeObjectURL(x)};if(!n)return null;const l=n.disputes.filter(c=>c.severity==="high"||c.severity==="medium");return a.jsxs(Po,{initial:{opacity:0},animate:{opacity:1},transition:{duration:.5},children:[a.jsxs(Mo,{initial:{scale:.9,opacity:0},animate:{scale:1,opacity:1},transition:{delay:.2,type:"spring"},children:[a.jsx(Lo,{}),a.jsx(_o,{initial:{scale:0},animate:{scale:1},transition:{delay:.4,type:"spring",stiffness:200},children:"🎉"}),a.jsx(Bo,{children:"The Curse Has Been Lifted!"}),a.jsx(qo,{children:"Your medical bill has been fully decoded and analyzed."}),n.potentialSavings>0&&a.jsxs(Uo,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{delay:.6},children:["💰 Potential Savings: ",M(n.potentialSavings)]})]}),a.jsxs(He,{children:[a.jsxs(Ge,{$variant:"success",children:[a.jsx(We,{children:"📊"}),a.jsx(Ye,{children:"Bill Summary"})]}),a.jsx(Ve,{children:a.jsxs(No,{children:[a.jsxs(ve,{$highlight:!0,children:[a.jsx(be,{children:"Total Charged"}),a.jsx(ye,{$large:!0,children:M(n.totalCharged)})]}),a.jsxs(ve,{children:[a.jsx(be,{children:"Fair Market Value"}),a.jsx(ye,{$color:"#4CAF50",children:M(n.fairMarketValue)})]}),a.jsxs(ve,{children:[a.jsx(be,{children:"Items Analyzed"}),a.jsx(ye,{children:e.lineItems.length})]}),a.jsxs(ve,{children:[a.jsx(be,{children:"Issues Found"}),a.jsx(ye,{$color:l.length>0?"#f44336":"#4CAF50",children:l.length})]})]})})]}),l.length>0&&a.jsxs(He,{children:[a.jsxs(Ge,{$variant:"warning",children:[a.jsx(We,{children:"⚠️"}),a.jsxs(Ye,{children:["Charges to Review (",l.length,")"]})]}),a.jsx(Ve,{children:a.jsx(Ho,{children:l.map((c,m)=>a.jsxs(Go,{$severity:c.severity,initial:{opacity:0,x:-20},animate:{opacity:1,x:0},transition:{delay:m*.1},children:[a.jsxs(Wo,{children:[a.jsxs(Yo,{$severity:c.severity,children:[c.type," - ",c.severity," priority"]}),a.jsxs(Vo,{children:["Save up to ",M(c.potentialSavings)]})]}),a.jsx(Ko,{children:c.reason}),a.jsx(Xo,{children:c.talkingPoints.slice(0,3).map((x,u)=>a.jsx("li",{children:x},u))})]},m))})})]}),a.jsxs(He,{children:[a.jsxs(Ge,{children:[a.jsx(We,{children:"📋"}),a.jsx(Ye,{children:"Your Next Steps"})]}),a.jsx(Ve,{children:a.jsx(Jo,{children:nr.map((c,m)=>a.jsxs(Zo,{initial:{opacity:0,y:10},animate:{opacity:1,y:0},transition:{delay:.5+m*.1},children:[a.jsx(Qo,{children:m+1}),a.jsxs(er,{children:[a.jsx(ir,{children:c.title}),a.jsx(tr,{children:c.description})]})]},m))})})]}),a.jsxs(ar,{children:[a.jsx(Mi,{onClick:s,whileHover:{scale:1.05},whileTap:{scale:.95},children:"📥 Download Summary"}),a.jsx(Mi,{$variant:"secondary",onClick:t,whileHover:{scale:1.05},whileTap:{scale:.95},children:"🔄 Analyze Another Bill"})]})]})};function rr(e,i,t){if(!i)return"";let n=`
═══════════════════════════════════════════════════════════════
                    WTFee - BILL ANALYSIS SUMMARY
═══════════════════════════════════════════════════════════════

Provider: ${e.metadata.provider||"Unknown"}
Service Date: ${e.metadata.serviceDate||"Unknown"}
Analysis Date: ${new Date().toLocaleDateString()}

───────────────────────────────────────────────────────────────
                         BILL TOTALS
───────────────────────────────────────────────────────────────

Total Charged:      ${M(i.totalCharged)}
Fair Market Value:  ${M(i.fairMarketValue)}
Potential Savings:  ${M(i.potentialSavings)}

───────────────────────────────────────────────────────────────
                       LINE ITEMS (${e.lineItems.length})
───────────────────────────────────────────────────────────────

`;for(const r of e.lineItems){const s=t[r.id];n+=`
${r.code||"N/A"} - ${r.description||r.rawText}
Amount: ${M(r.amount||0)}
${s?`
Explanation: ${s.plainEnglish}`:""}
${r.isDuplicate?`
⚠️ DUPLICATE CHARGE DETECTED`:""}
---
`}if(i.disputes.length>0){n+=`
───────────────────────────────────────────────────────────────
                    CHARGES TO DISPUTE (${i.disputes.length})
───────────────────────────────────────────────────────────────

`;for(const r of i.disputes)n+=`
Type: ${r.type.toUpperCase()} (${r.severity} priority)
Potential Savings: ${M(r.potentialSavings)}
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
`,n}class sr{constructor(){ce(this,"sessionData",new Map);ce(this,"cleanupTimers",new Map);ce(this,"DEFAULT_TTL",30*60*1e3)}set(i,t,n=this.DEFAULT_TTL){this.clearTimer(i),this.sessionData.set(i,t);const r=setTimeout(()=>{this.delete(i)},n);this.cleanupTimers.set(i,r)}get(i){return this.sessionData.get(i)}delete(i){this.clearTimer(i),this.sessionData.delete(i)}clearAll(){this.cleanupTimers.forEach(i=>clearTimeout(i)),this.cleanupTimers.clear(),this.sessionData.clear()}clearTimer(i){const t=this.cleanupTimers.get(i);t&&(clearTimeout(t),this.cleanupTimers.delete(i))}}const Li=new sr,_i={title:"Your Privacy Matters",points:["Your medical bill is processed locally and temporarily","No personal health information is permanently stored","Data is automatically deleted after your session ends","We do not share your information with third parties","All data transmission is encrypted"]},cr=o(g.div)`
  padding: ${({$compact:e})=>e?"0.75rem 1rem":"1rem 1.5rem"};
  background: ${({theme:e})=>e.colors.surface};
  border: 1px solid ${({theme:e})=>e.colors.secondary};
  border-radius: ${({theme:e})=>e.spacing.borderRadius}px;
  font-size: ${({$compact:e})=>e?"0.75rem":"0.875rem"};
`,lr=o.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
`,pr=o.span`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${({theme:e})=>e.colors.text};
  font-weight: 500;
`,dr=o.button`
  background: none;
  color: ${({theme:e})=>e.colors.textMuted};
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  
  &:hover {
    color: ${({theme:e})=>e.colors.text};
  }
`,mr=o(g.ul)`
  margin: 0.75rem 0 0;
  padding-left: 1.5rem;
  color: ${({theme:e})=>e.colors.textMuted};
  line-height: 1.6;
  
  li {
    margin-bottom: 0.25rem;
  }
`,ur=({compact:e=!1})=>{const[i,t]=p.useState(!e);return a.jsxs(cr,{$compact:e,children:[a.jsxs(lr,{onClick:()=>t(!i),children:[a.jsxs(pr,{children:["🔒 ",_i.title]}),e&&a.jsx(dr,{children:i?"▲ Less":"▼ More"})]}),a.jsx(Y,{children:i&&a.jsx(mr,{initial:{height:0,opacity:0},animate:{height:"auto",opacity:1},exit:{height:0,opacity:0},transition:{duration:.2},children:_i.points.map((n,r)=>a.jsx("li",{children:n},r))})})]})};o.a`
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
`;const fr=o.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  padding: 2rem;
  text-align: center;
`,gr=o.span`
  font-size: 4rem;
  margin-bottom: 1rem;
`,xr=o.h2`
  font-size: 1.5rem;
  color: #f44336;
  margin-bottom: 0.5rem;
`,hr=o.p`
  color: #666;
  margin-bottom: 1.5rem;
  max-width: 400px;
`,vr=o.button`
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
`;class br extends p.Component{constructor(t){super(t);ce(this,"handleRetry",()=>{this.setState({hasError:!1,error:null})});this.state={hasError:!1,error:null}}static getDerivedStateFromError(t){return{hasError:!0,error:t}}componentDidCatch(t,n){console.error("Error caught by boundary:",t,n)}render(){return this.state.hasError?this.props.fallback?this.props.fallback:a.jsxs(fr,{role:"alert",children:[a.jsx(gr,{children:"👻"}),a.jsx(xr,{children:"Something Went Wrong"}),a.jsx(hr,{children:"The spirits encountered an unexpected disturbance. Don't worry, your data is safe."}),a.jsx(vr,{onClick:this.handleRetry,children:"🔄 Try Again"})]}):this.props.children}}function yr(){const[e,i]=p.useState(()=>typeof navigator>"u"?!0:navigator.onLine);return p.useEffect(()=>{const t=()=>i(!0),n=()=>i(!1);return window.addEventListener("online",t),window.addEventListener("offline",n),()=>{window.removeEventListener("online",t),window.removeEventListener("offline",n)}},[]),e}const wr=o(g.div)`
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
`,kr=o.span`
  font-size: 1.25rem;
`,jr=()=>{const e=yr();return a.jsx(Y,{children:!e&&a.jsxs(wr,{initial:{y:-50,opacity:0},animate:{y:0,opacity:1},exit:{y:-50,opacity:0},role:"alert","aria-live":"assertive",children:[a.jsx(kr,{children:"📡"}),"You're offline. Some features may not work until you reconnect."]})})},$r=R`
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
  animation: ${$r} 1.5s ease-in-out infinite;
`;var ai=(e=>(e.UPLOADED="uploaded",e.EXTRACTING="extracting",e.ANALYZING="analyzing",e.COMPLETE="complete",e.ERROR="error",e))(ai||{});const Ke=[{id:"1",rawText:"99213 Office Visit Level 3 $185.00",code:"99213",description:"Office/Outpatient Visit, Established Patient (Level 3)",amount:185,date:"10/15/2024",confidence:95},{id:"2",rawText:"36415 Venipuncture $45.00",code:"36415",description:"Collection of venous blood by venipuncture",amount:45,date:"10/15/2024",confidence:92},{id:"3",rawText:"80053 Comprehensive Metabolic Panel $287.00",code:"80053",description:"Comprehensive Metabolic Panel (14 tests)",amount:287,date:"10/15/2024",confidence:94},{id:"4",rawText:"85025 Complete Blood Count $156.00",code:"85025",description:"Complete Blood Count (CBC) with Differential",amount:156,date:"10/15/2024",confidence:93},{id:"5",rawText:"Facility Fee $425.00",description:"Hospital Facility Fee - Outpatient Services",amount:425,date:"10/15/2024",confidence:88,isDuplicate:!1},{id:"6",rawText:"99213 Office Visit Level 3 $185.00",code:"99213",description:"Office/Outpatient Visit, Established Patient (Level 3)",amount:185,date:"10/15/2024",confidence:95,isDuplicate:!0},{id:"7",rawText:"81001 Urinalysis $78.00",code:"81001",description:"Urinalysis, by dip stick or tablet reagent",amount:78,date:"10/15/2024",confidence:91}],Cr={provider:"Memorial General Hospital",serviceDate:"10/15/2024",totalAmount:1361,accountNumber:"MRN-2024-78542",pageCount:1,extractedAt:new Date().toISOString()},ne=e=>new Promise(i=>setTimeout(i,e));class Dr{async uploadAndProcess(i,t){return t==null||t("Preparing the cursed document...",10),await ne(800),t==null||t("Uploading to the spirit realm...",25),await ne(1200),t==null||t("Summoning the bill demons...",40),await ne(1e3),t==null||t("Deciphering ancient medical codes...",60),await ne(1500),t==null||t("Exorcising hidden charges...",80),await ne(1e3),t==null||t("The curse is lifting...",95),await ne(500),{billId:`bill-${Date.now()}`,lineItems:Ke,metadata:Cr,confidence:92,status:ai.COMPLETE}}async getProcessingStatus(i){return{billId:i,status:ai.COMPLETE,progress:100,lineItemsProcessed:Ke.length,totalLineItems:Ke.length}}}const Ar=new Dr,Er=()=>(console.log("🎃 Running in demo mode with mock data"),Ar),Sr=async(e,i)=>Er().uploadAndProcess(e,i),Xe=o.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  max-width: 600px;
  width: 100%;
  text-align: center;
`,Tr=o.h1`
  font-size: 2.5rem;
  color: ${({theme:e})=>e.colors.text};
  font-family: ${({theme:e})=>e.typography.fontFamilySpooky};
  text-shadow: ${({theme:e})=>e.typography.textShadow};
  margin-bottom: 0.5rem;
`,zr=o.h2`
  font-size: 1.25rem;
  color: ${({theme:e})=>e.colors.textMuted};
  font-weight: normal;
  margin-bottom: 1rem;
`,Bi=o.p`
  color: ${({theme:e})=>e.colors.textMuted};
  font-size: 1rem;
  line-height: 1.8;
  max-width: 500px;
`,Ir=o.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  justify-content: center;
  margin-top: 1rem;
`,Rr=o(g.button)`
  padding: 0.5rem 1rem;
  border-radius: ${({theme:e})=>e.spacing.borderRadius}px;
  background: ${({$active:e,theme:i})=>e?i.colors.accent:i.colors.surface};
  color: ${({$active:e,theme:i})=>e?i.colors.background:i.colors.text};
  font-size: 0.875rem;
  font-weight: 500;
  box-shadow: ${({theme:e})=>e.spacing.shadows[0]};
  border: 1px solid ${({theme:e})=>e.colors.secondary};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({theme:e})=>e.spacing.shadows[1]};
  }
`,Fr=o.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
`,qi=o(g.button)`
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
`,Ni=o.div`
  width: 100%;
  height: 1px;
  background: ${({theme:e})=>e.colors.secondary};
  margin: 1rem 0;
`,Or=o.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  background: rgba(255, 0, 0, 0.1);
  border: 1px solid ${({theme:e})=>e.colors.danger};
  border-radius: ${({theme:e})=>e.spacing.borderRadius}px;
  color: ${({theme:e})=>e.colors.danger};
`,Pr=o.button`
  padding: 0.5rem 1rem;
  background: ${({theme:e})=>e.colors.danger};
  color: white;
  border-radius: ${({theme:e})=>e.spacing.borderRadius}px;
  font-size: 0.875rem;
  
  &:hover {
    opacity: 0.9;
  }
`,Mr=o.div`
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
  justify-content: center;
  padding: 1rem;
  background: ${({theme:e})=>e.colors.surface};
  border-radius: ${({theme:e})=>e.spacing.borderRadius}px;
  border: 1px solid ${({theme:e})=>e.colors.secondary};
`,Je=o.div`
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
`,Lr=o.div`
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
`;function _r(){var Z;const{emotionalState:e,setEmotionalState:i}=W(),[t,n]=p.useState(null),[r,s]=p.useState(!1),[l,c]=p.useState(0),[m,x]=p.useState("uploading"),[u,h]=p.useState(null),[F,D]=p.useState(""),[L,O]=p.useState(null),[_,T]=p.useState(!1),[z,N]=p.useState(!1),[J,G]=p.useState({}),b=[{state:C.HAUNTED,label:"👻 Haunted"},{state:C.PROCESSING,label:"⚡ Processing"},{state:C.UNDERSTANDING,label:"💡 Understanding"},{state:C.RELIEVED,label:"😌 Relieved"}];p.useEffect(()=>{const I=()=>{Li.clearAll()};return window.addEventListener("beforeunload",I),()=>{window.removeEventListener("beforeunload",I),Li.clearAll()}},[]);const y=p.useCallback(async I=>{var k;n(I),s(!0),c(0),x("uploading"),O(null),h(null);try{const j=await Sr(I,($e,Q)=>{D($e),c(Q),Q<50?x("uploading"):Q<100&&x("processing")});h(j),x("complete"),s(!1),i(C.PROCESSING),console.log("Document processed:",j),console.log(`Found ${j.lineItems.length} line items`),console.log(`Total: $${(k=j.metadata.totalAmount)==null?void 0:k.toFixed(2)}`)}catch(j){console.error("Processing failed:",j),O(j.message||"Failed to process document"),x("error"),s(!1)}},[i]),A=()=>{n(null),s(!1),c(0),x("uploading"),h(null),O(null),i(C.HAUNTED)},P=()=>{T(!0),i(C.PROCESSING)},U=I=>{G(I),N(!0),T(!1),i(C.RELIEVED)},re=()=>{n(null),s(!1),c(0),x("uploading"),h(null),O(null),T(!1),N(!1),G({}),i(C.HAUNTED)};return z&&u?a.jsx(Xe,{style:{maxWidth:"800px"},children:a.jsx(or,{result:u,explanations:J,onStartOver:re})}):_&&u?a.jsxs(Xe,{style:{maxWidth:"800px"},children:[a.jsx(Io,{result:u,onComplete:U}),a.jsx(Ni,{}),a.jsx(qi,{onClick:re,whileHover:{scale:1.05},whileTap:{scale:.95},style:{background:"transparent",border:"1px solid",borderColor:"inherit"},children:"← Upload Another Bill"})]}):a.jsxs(Xe,{children:[a.jsxs("div",{children:[a.jsx(Tr,{children:a.jsx(Et,{children:"WTFee"})}),a.jsx(zr,{children:"What The Fee - Medical Bill Decoder"})]}),a.jsx(Bi,{children:"Upload your haunted medical bill and let us exorcise the confusion. We'll translate the cryptic codes and reveal what you're really being charged for."}),a.jsx(ur,{compact:!0}),a.jsx(Fr,{children:a.jsx(Y,{mode:"wait",children:t?a.jsxs(g.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},style:{width:"100%",display:"flex",flexDirection:"column",alignItems:"center",gap:"1rem"},children:[a.jsx(zn,{file:t,onRemove:A}),r&&a.jsx(xn,{progress:Math.min(l,100),fileName:t.name,status:m,message:F}),L&&a.jsxs(Or,{children:["⚠️ ",L,a.jsx(Pr,{onClick:()=>y(t),children:"Try Again"})]}),!r&&m==="complete"&&u&&a.jsxs(a.Fragment,{children:[a.jsxs(Mr,{children:[a.jsxs(Je,{children:[a.jsx("span",{children:"📋 Line Items Found"}),a.jsx("strong",{children:u.lineItems.length})]}),a.jsxs(Je,{children:[a.jsx("span",{children:"💰 Total Amount"}),a.jsxs("strong",{children:["$",((Z=u.metadata.totalAmount)==null?void 0:Z.toFixed(2))||"0.00"]})]}),a.jsxs(Je,{children:[a.jsx("span",{children:"🎯 Confidence"}),a.jsxs("strong",{children:[u.confidence,"%"]})]})]}),a.jsx(qi,{onClick:P,whileHover:{scale:1.05},whileTap:{scale:.95},children:"🔮 Begin the Exorcism"})]})]},"file-preview"):a.jsx(Qa,{onFileUpload:y,isProcessing:r},"upload-zone")})}),a.jsx(Ni,{}),a.jsxs("div",{children:[a.jsx(Bi,{style:{fontSize:"0.875rem",marginBottom:"0.75rem"},children:"Preview emotional states:"}),a.jsx(Ir,{children:b.map(({state:I,label:k})=>a.jsx(Rr,{$active:e===I,onClick:()=>i(I),whileHover:{scale:1.05},whileTap:{scale:.95},children:k},I))})]})]})}function Br(){return a.jsx(br,{children:a.jsxs(Ct,{initialState:C.HAUNTED,children:[a.jsx(Dt,{}),a.jsx(jr,{}),a.jsx(Lr,{children:"🎃 Demo Mode"}),a.jsx(Bt,{children:a.jsx(_r,{})})]})})}Hi(document.getElementById("root")).render(a.jsx(p.StrictMode,{children:a.jsx(Br,{})}));
