"use client";
import Image from "next/image";
import Link from "next/link";
import {useCallback,useEffect,useLayoutEffect,useRef,useState,type CSSProperties,type PointerEvent} from "react";

const siteHref=(slug:string)=>`/work/${slug}`;
import {useMotionValue,animate} from "framer-motion";
import {lockedConcepts} from "./lockedWheelData";
import NeonMark from "./NeonMark";
import HomepageFoldingNav from "./HomepageFoldingNav";
import s from "./HomepageRebuild.module.css";
const mod=(n:number,l:number)=>((n%l)+l)%l;
const dist=(i:number,p:number)=>{let d=i-mod(p,6);if(d>3)d-=6;if(d<-3)d+=6;return d};

function Gallery({navOpen}:{navOpen:boolean}){
  const[selected,setSelected]=useState(0);
  const[open,setOpen]=useState(false);
  const rawPos=useMotionValue(0);
  const selectedRef=useRef(0);
  const scene=useRef<HTMLDivElement>(null);
  const drag=useRef({on:false,x:0,t:0,m:0,v:0});
  const quietRef=useRef(0);
  const lastTime=useRef(0);
  const animRef=useRef<ReturnType<typeof animate>|null>(null);
  const cardsRef=useRef<HTMLElement[]>([]);
  const mobileRef=useRef(false);
  const frontRef=useRef<boolean[]>([]);

  const stopAnim=useCallback(()=>{animRef.current?.stop();animRef.current=null},[]);

  const update=useCallback((v:number)=>{
    const cards=cardsRef.current;
    const mobile=mobileRef.current;
    const reachBase=innerWidth*(mobile?.48:.58);
    const reach=Math.min(reachBase,mobile?140:720);
    cards.forEach((card,i)=>{
      const d=dist(i,v),a=d*Math.PI/3,cos=Math.cos(a),depth=(cos+1)/2,z=cos*(mobile?180:500),x=Math.sin(a)*reach,front=Math.abs(d)<.47,scale=mobile?.52+depth*.44:.52+depth*.50;
      card.style.transform=`translate3d(${x.toFixed(2)}px,${(-depth*(mobile?5:11)).toFixed(2)}px,${z.toFixed(2)}px) scale(${scale.toFixed(4)}) rotateY(${(-Math.sin(a)*(mobile?10:19)).toFixed(2)}deg)`;
      card.style.opacity=String((.18+depth*.82).toFixed(3));
      card.style.zIndex=String(Math.round(depth*30));
      const wasFront=frontRef.current[i];
      if(wasFront!==front){
        frontRef.current[i]=front;
        card.classList.toggle(s.frontCard,front);
        card.setAttribute("aria-hidden",String(!front));
        const b=card.querySelector("button");if(b)b.tabIndex=front?0:-1;
        const video=card.querySelector("video");
        if(video){if(front){if(video.paused)void video.play().catch(()=>{})}else if(!video.paused)video.pause()}
      }
    });
    selectedRef.current=mod(Math.round(v),6);
  },[]);

  useLayoutEffect(()=>update(rawPos.get()),[selected,open,update,rawPos]);

  useEffect(()=>{
    const sync=()=>{
      mobileRef.current=innerWidth<=720;
      cardsRef.current=Array.from(scene.current?.querySelectorAll<HTMLElement>("[data-project-card]")??[]);
      frontRef.current=new Array(cardsRef.current.length).fill(false);
    };
    sync();
    const onResize=()=>{mobileRef.current=innerWidth<=720;};
    addEventListener("resize",onResize);
    addEventListener("orientationchange",onResize);
    const globalUp=()=>{if(drag.current.on){drag.current.on=false;scene.current?.classList.remove(s.dragging)}};
    addEventListener("pointerup",globalUp);
    addEventListener("pointercancel",globalUp);
    let id=0;
    const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
    const tick=(now:number)=>{
      const v=rawPos.get();
      update(v);
      if(!reduce&&!mobileRef.current&&!drag.current.on&&!open&&animRef.current===null){
        const dt=lastTime.current?now-lastTime.current:16.7;
        quietRef.current+=dt;
        if(quietRef.current>2600){
          const drift=rawPos.get()-.000035*dt;
          rawPos.jump(drift);
        }
      }else{
        quietRef.current=0;
      }
      lastTime.current=now;
      id=requestAnimationFrame(tick);
    };
    id=requestAnimationFrame(tick);
    return()=>{cancelAnimationFrame(id);removeEventListener("resize",onResize);removeEventListener("orientationchange",onResize);removeEventListener("pointerup",globalUp);removeEventListener("pointercancel",globalUp)};
  },[update,open,rawPos]);

  const go=useCallback((i:number)=>{
    stopAnim();
    const v=rawPos.get();
    const d=dist(i,v);
    const target=v+d;
    animRef.current=animate(rawPos,target,{
      type:"spring",
      stiffness:300,
      damping:30,
      mass:.8,
      restDelta:.0001,
      onComplete:()=>{animRef.current=null;const n=mod(Math.round(rawPos.get()),6);selectedRef.current=n;setSelected(n)}
    });
  },[rawPos,stopAnim]);

  useEffect(()=>{
    const key=(e:KeyboardEvent)=>{
      if(e.key==="ArrowRight"){e.preventDefault();go(mod(Math.round(rawPos.get())+1,6))}
      if(e.key==="ArrowLeft"){e.preventDefault();go(mod(Math.round(rawPos.get())-1,6))}
      if(e.key==="Escape")setOpen(false);
    };
    addEventListener("keydown",key);
    return()=>removeEventListener("keydown",key);
  },[go,rawPos]);

  const down=(e:PointerEvent<HTMLDivElement>)=>{
    if(navOpen||open||(e.target as HTMLElement).closest("nav"))return;
    stopAnim();
    drag.current={on:true,x:e.clientX,t:performance.now(),m:0,v:0};
    scene.current?.classList.add(s.dragging);
    try{e.currentTarget.setPointerCapture(e.pointerId);}catch{}
  };

  const move=(e:PointerEvent<HTMLDivElement>)=>{
    if(!drag.current.on)return;
    const now=performance.now(),dx=e.clientX-drag.current.x,dt=Math.max(7,now-drag.current.t);
    const u=-dx/(innerWidth<=720?Math.max(120,innerWidth*.34):Math.max(230,innerWidth*.27));
    rawPos.set(rawPos.get()+u);
    drag.current.m+=Math.abs(dx);
    drag.current.v=drag.current.v*.3+(u/dt)*.7;
    drag.current.x=e.clientX;
    drag.current.t=now;
  };

  const up=(e:PointerEvent<HTMLDivElement>)=>{
    if(!drag.current.on)return;
    const moved=drag.current.m;
    drag.current.on=false;
    scene.current?.classList.remove(s.dragging);
    if(moved>10){
      const mobile=innerWidth<=720;
      const vel=Math.max(-.032,Math.min(.032,drag.current.v*(mobile?3.0:2.2)));
      const power=Math.abs(vel)*(mobile?6000:5200);
      const target=rawPos.get()+vel*power;
      animRef.current=animate(rawPos,target,{
        duration:Math.min(1.3,Math.abs(vel)*(mobile?65:52)),
        ease:[0.25,0.1,0.25,1],
        onComplete:()=>{animRef.current=null;const n=mod(Math.round(rawPos.get()),6);selectedRef.current=n;setSelected(n)}
      });
    }else{
      const card=(e.target as HTMLElement).closest<HTMLElement>("[data-project-card]");
      const index=Number(card?.dataset.index);
      if(Number.isInteger(index)){
        if(index!==selectedRef.current)go(index);
        else setOpen(true);
      }
    }
    try{if(e.currentTarget.hasPointerCapture(e.pointerId))e.currentTarget.releasePointerCapture(e.pointerId);}catch{}
  };

  const choose=(i:number)=>{
    if(drag.current.m>10){drag.current.m=0;return}
    if(i!==selectedRef.current){go(i)}else{go(i);setOpen(true)}
  };

  const active=lockedConcepts[selected];
  return <section className={s.gallery} style={{"--active":active.accent} as CSSProperties}><div className={s.abyss}/><div ref={scene} className={[s.scene,open?s.stopped:""].join(" ")} role="region" aria-roledescription="carousel" aria-label="Website project wheel. Use arrow keys to navigate." tabIndex={0} onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up}><i className={s.orbit}/>{lockedConcepts.map((p,i)=>{return <article data-project-card data-index={i} key={p.slug} className={[s.projectCard,i===selected?s.frontCard:""].join(" ")} style={{"--accent":p.accent,opacity:0} as CSSProperties} aria-hidden={i!==selected}><button tabIndex={i===selected?0:-1} onClick={e=>{if(e.detail===0)choose(i)}} aria-label={(i===selected?"Inspect ":"Bring forward ")+p.name}><span className={s.phoneGlass}><span className={s.viewport}>{p.video?<video poster={p.poster??p.image} autoPlay={i===selected} muted loop playsInline preload={i===selected?"auto":"metadata"}><source src={p.videoMobile} media="(max-width: 720px)"/><source src={p.video}/></video>:<Image src={p.image} alt="" fill priority={i===selected} sizes="(max-width:720px) 80vw,380px"/>}<i/></span><span className={s.cardName}>{p.name}</span></span></button></article>})}</div><p className={s.sr} aria-live="polite">{active.name} selected. {open&&"Wheel stopped for inspection."}</p>{open&&<aside><button className={s.close} onClick={()=>setOpen(false)} aria-label="Close project details">×</button><small>{active.industry}</small><h2>{active.name}</h2><p>{active.line}</p><div><a href={'/work#'+active.slug}>VIEW PROJECT</a><a href={siteHref(active.slug)}>OPEN SITE</a></div></aside>}</section>}
type OpeningPhase="ready"|"playing"|"exiting"|"entered";
function OpeningFilm({phase,onPlay,onProgress,onComplete,onSkip}:{phase:OpeningPhase;onPlay:()=>void;onProgress:()=>void;onComplete:()=>void;onSkip:()=>void}){const video=useRef<HTMLVideoElement>(null);useEffect(()=>{if(phase==="playing")void video.current?.play().catch(onComplete)},[phase,onComplete]);if(phase==="entered")return null;return <section className={[s.filmGate,phase==="exiting"?s.filmGateExiting:""].join("  ")} aria-label="MLR Studio cinematic opening"><video ref={video} className={s.openingFilm} muted playsInline preload="auto" poster="/media/mlr-opening/mlr-opening-1080-poster.jpg" onTimeUpdate={onProgress} onEnded={onComplete} onError={onComplete}><source src="/media/mlr-opening/mlr-opening-1080.webm" type="video/webm"/><source src="/media/mlr-opening/mlr-opening-1080.mp4" type="video/mp4"/></video>{phase==="ready"&&<div className={s.filmStart}><span>MLR / CREATIVE STUDIO</span><button type="button" onClick={onPlay}>PRESS PLAY</button><small>10 SECOND CINEMATIC OPENING</small></div>}{phase!=="ready"&&<button type="button" className={s.filmSkip} onClick={onSkip}>SKIP</button>}</section>}

export default function HomepageRebuild(){const[phase,setPhase]=useState<OpeningPhase>("ready");const[navOpen,setNavOpen]=useState(false);useEffect(()=>{document.body.classList.add("homepageRebuild");if(window.matchMedia("(max-width: 720px)").matches||window.location.hash==="#wheel")setPhase("entered");return()=>document.body.classList.remove("homepageRebuild")},[]);const play=()=>{window.scrollTo({top:0,left:0});setPhase("playing")};const progress=()=>{const video=document.querySelector<HTMLVideoElement>(`.${s.openingFilm}`);if(video?.duration&&video.duration-video.currentTime<.55)setPhase(p=>p==="playing"?"exiting":p)};const enter=useCallback(()=>{window.history.pushState({view:"wheel"},"","#wheel");setPhase("entered")},[]);useEffect(()=>{const onPopState=()=>{if(phase==="entered"){setPhase("ready")}};window.addEventListener("popstate",onPopState);return()=>window.removeEventListener("popstate",onPopState)},[phase]);return <main className={[s.root,s.live,phase!=="entered"?s.openingActive:"",navOpen?s.navOpenHost:""].join(" ")}><HomepageFoldingNav onOpenChange={setNavOpen}/><Link className={s.contactLink} href="/contact">CONTACT</Link><NeonMark/><Gallery navOpen={navOpen}/><OpeningFilm phase={phase} onPlay={play} onProgress={progress} onComplete={enter} onSkip={enter}/></main>}
