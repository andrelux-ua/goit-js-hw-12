import{a as w,S as x,i as c}from"./assets/vendor-CSTHH2rc.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const l of r.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&s(l)}).observe(document,{childList:!0,subtree:!0});function a(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(e){if(e.ep)return;e.ep=!0;const r=a(e);fetch(e.href,r)}})();const P="48292136-dc008af678147f60b21a3f0d6",R="https://pixabay.com/api/";async function p(t,o=1,a=15){try{const s={key:P,q:t,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:a,page:o},{data:e}=await w.get(R,{params:s});return e.hits.length===0?{images:[],totalHits:0}:{images:e.hits,totalHits:e.totalHits}}catch{throw new Error("Failed to fetch data.")}}const H=document.querySelector(".gallerylist");function y(t){const o=t.map(({webformatURL:a,largeImageURL:s,tags:e,likes:r,views:l,comments:C,downloads:q})=>`
        <div class="gallery-item">
            <a href="${s}">
                <img class="gallery-image" src="${a}" alt="${e}" width="360" height="200"/>
            </a>
            <div class="info">
                <p class="info-text"><b>Likes:</b> ${r}</p>
                <p class="info-text"><b>Views:</b> ${l}</p>
                <p class="info-text"><b>Comments:</b> ${C}</p>
                <p class="info-text"><b>Downloads:</b> ${q}</p>
            </div>
        </div>
    `).join("");H.insertAdjacentHTML("beforeend",o)}const b=document.querySelector(".search-form"),k=document.querySelector(".search-form input"),A=document.querySelector(".loader"),n=document.createElement("button");n.className="load-more-btn";n.textContent="Load more";n.style.display="none";document.querySelector(".gallery-container").appendChild(n);let i=1,f="",g=0;const F=new x(".gallery-item a",{captionsData:"alt",captionDelay:250});b.addEventListener("submit",I);async function I(t){t.preventDefault();const o=k.value.trim();if(o==="")return c.info({position:"topRight",title:"Error",message:"Please enter a search query."});f=o,i=1,$(),u(!0),n.style.display="none";try{const{images:a,totalHits:s}=await p(f,i);g=s,a.length>0?(y(a),F.refresh(),S(a.length)):c.info({position:"topRight",title:"No Results",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight",titleColor:"#000000",messageColor:"#000000",backgroundColor:"#FFFF00",class:"result-end"})}catch(a){c.error({position:"topRight",title:"Error",message:a.message,backgroundColor:"#FFFF00"})}finally{u(!1),b.reset()}}n.addEventListener("click",async()=>{i++,u(!0),n.style.display="none";try{const{images:t}=await p(f,i);y(t),F.refresh(),S(t.length),O(),i*15>=g&&(n.style.display="none",c.info({title:"End of Results",message:"We're sorry, but you've reached the end of search results.",position:"topRight",titleColor:"#FFFFFF",messageColor:"#FFFFFF",backgroundColor:"#7B68EE",class:"result-end"}))}catch(t){c.error({position:"topRight",title:"Error",message:t.message,backgroundColor:"#FFFF00"})}finally{u(!1)}});function u(t){A.style.display=t?"block":"none"}function S(t){n.style.display=t>0&&g>i*15?"block":"none"}function $(){document.querySelector(".gallerylist").innerHTML=""}function O(){const t=document.querySelector(".gallerylist .gallery-item");if(!t)return;const{height:o}=t.getBoundingClientRect();window.scrollBy({top:o*2,behavior:"smooth"})}const m=document.querySelector(".search-form input"),h=["S","Se","Sea","Sear","Searc","Search ","Search i","Search im","Search ima","Search imag","Search image","Search images","Search images.","Search images..","Search images...","c","ca","cat","b","bo","boo","book","books","r","ro","roo","room","f","fo","for","fore","fores","forest","g","ga","gar","gard","garde","garden","s","sp","spac","space"];let d=0,v;function L(){m.setAttribute("placeholder",h[d]),d=(d+1)%h.length}function E(){v=setInterval(L,365)}function B(){clearInterval(v)}m.addEventListener("focus",B);m.addEventListener("blur",E);L();E();
//# sourceMappingURL=index.js.map
