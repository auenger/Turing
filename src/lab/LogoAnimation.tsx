import React, {useEffect, useMemo, useRef, useState} from 'react';
import {createRoot} from 'react-dom/client';
import {Player, type PlayerRef} from '@remotion/player';
import {AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {W,H,parts,smoothJoints,pathFor} from '../lib/logo-geometry.js';

type Point = [number, number];
type Arc = {from:Point; to:Point; circle?:[number,number,number]; add?:boolean};
type Part = {name:string; start:Point; arcs:Arc[]};
type Geometry = {width:number; height:number; parts:Part[]; smoothJoints:{point:Point;tangent:Point}[]};
type Props = {geometry:Geometry};
const FPS=30, DURATION=15, FRAMES=FPS*DURATION;
const STAGES=[
  {name:'直线定位',time:1.5,start:0},
  {name:'构造圆展开',time:3.4,start:1.6},
  {name:'圆弧成形',time:6.8,start:4.3},
  {name:'渐进填黑',time:10.5,start:8},
  {name:'完整标志',time:14,start:12.5},
];
const phaseAt=(seconds:number)=>STAGES.reduce((index,stage,i)=>seconds>=stage.start?i:index,0);
const progress=(time:number,start:number,end:number)=>interpolate(time,[start,end],[0,1],{
  extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:Easing.inOut(Easing.cubic),
});
const polygon=(points:Point[],g:Geometry)=>'polygon('+points.map(p=>`${p[0]/g.width*100}% ${p[1]/g.height*100}%`).join(',')+')';

// Same disk/chord construction as the static Lab. Curves remain true circles.
function capClip(arc:Arc,g:Geometry) {
  const a=arc.from,b=arc.to,[cx,cy]=arc.circle!;
  const dx=b[0]-a[0],dy=b[1]-a[1],side=Math.sign(dx*(cy-a[1])-dy*(cx-a[0]));
  const distance=(p:Point)=>-side*(dx*(p[1]-a[1])-dy*(p[0]-a[0]))+Math.hypot(dx,dy);
  const box:Point[]=[[0,0],[g.width,0],[g.width,g.height],[0,g.height]],out:Point[]=[];
  box.forEach((p,i)=>{const q=box[(i+1)%box.length],dp=distance(p),dq=distance(q);
    if(dp>=0)out.push(p);
    if((dp>=0)!==(dq>=0)){const t=dp/(dp-dq);out.push([p[0]+t*(q[0]-p[0]),p[1]+t*(q[1]-p[1])]);}
  });
  return polygon(out,g);
}

const GeometryFill:React.FC<Props>=({geometry:g})=><div style={{position:'absolute',inset:0,isolation:'isolate'}}>
  {g.parts.map((part,i)=><React.Fragment key={i}>
    <div style={{position:'absolute',inset:0,background:'currentColor',clipPath:polygon([part.start,...part.arcs.map(a=>a.to)],g)}}/>
    {[true,false].flatMap(add=>part.arcs.filter(a=>a.circle&&a.add===add).map((a,j)=>{
      const [cx,cy,r]=a.circle!;
      return <div key={`${add}-${j}`} style={{position:'absolute',inset:0,clipPath:capClip(a,g)}}>
        <div style={{position:'absolute',left:(cx-r)/g.width*100+'%',top:(cy-r)/g.height*100+'%',width:2*r/g.width*100+'%',aspectRatio:'1',borderRadius:'50%',background:add?'currentColor':'#fff'}}/>
      </div>;
    }))}
  </React.Fragment>)}
</div>;

export const LogoConstruction:React.FC<Props>=({geometry:g})=>{
  const frame=useCurrentFrame(),{fps}=useVideoConfig(),time=frame/fps;
  const circles=useMemo(()=>g.parts.flatMap(p=>p.arcs).filter(a=>a.circle),[g]);
  const lines=useMemo(()=>g.parts.flatMap(p=>p.arcs).filter(a=>!a.circle),[g]);
  const fadeGuides=1-progress(time,8.1,10.4),outline=1-progress(time,10.8,12.6);
  const filling=progress(time,8,12.3),shade=Math.round(163*(1-filling)+18*filling);
  const sweep=-25+150*filling,finish=progress(time,12.1,13.3);
  const phase=phaseAt(time);
  return <AbsoluteFill style={{background:'#fff',color:'#202020',fontFamily:'-apple-system,BlinkMacSystemFont,"PingFang SC",sans-serif',overflow:'hidden'}}>
    <svg viewBox="0 0 1280 800" style={{position:'absolute',inset:0,width:'100%',height:'100%'}} aria-hidden="true">
      <defs><clipPath id="motion-workspace"><rect x="200" y="60" width="880" height="630"/></clipPath></defs>
      <g opacity={progress(time,0,.8)*.28*fadeGuides} stroke="#cbd4d5" strokeWidth=".7">
        {Array.from({length:19},(_,i)=><line key={'v'+i} x1={190+i*50} x2={190+i*50} y1="70" y2="700"/>)}
        {Array.from({length:13},(_,i)=><line key={'h'+i} x1="190" x2="1090" y1={80+i*50} y2={80+i*50}/>)}
      </g>
      <g clipPath="url(#motion-workspace)"><g transform="translate(380 100)">
        <g opacity={fadeGuides} fill="none" strokeWidth=".85">
          {lines.map((a,i)=>{
            const p=progress(time,.25+i*.065,1.4+i*.065);
            return <line key={i} x1={a.from[0]} y1={a.from[1]} x2={a.from[0]+(a.to[0]-a.from[0])*p} y2={a.from[1]+(a.to[1]-a.from[1])*p} stroke="#658486" opacity={p*.75}/>;
          })}
          {circles.map((a,i)=>{const[cx,cy,r]=a.circle!,p=progress(time,1.6+i*.044,2.95+i*.044),length=2*Math.PI*r;
            return <circle key={i} cx={cx} cy={cy} r={r} stroke={a.add?'#748d8a':'#a39788'} opacity={p*.55} strokeDasharray={length} strokeDashoffset={length*(1-p)} transform={`rotate(-90 ${cx} ${cy})`}/>;
          })}
        </g>
        <g fill="none" stroke="#303c3c" strokeWidth="1.35" opacity={outline} strokeLinecap="round" strokeLinejoin="round">
          {g.parts.map((part,i)=><path key={i} d={pathFor(part)} pathLength="1" strokeDasharray="1" strokeDashoffset={1-progress(time,4.3+i*.35,7.2+i*.35)}/>)}
        </g>
        <g opacity={progress(time,5.6,6.5)*(1-progress(time,8,9))} fill="#fff" stroke="#517e74" strokeWidth=".8">
          {g.smoothJoints.map((j,i)=><circle key={i} cx={j.point[0]} cy={j.point[1]} r="2"/>)}
        </g></g></g>
    </svg>
    <div data-motion-fill style={{position:'absolute',left:380,top:100,width:g.width,height:g.height,color:`rgb(${shade},${shade},${shade})`,opacity:progress(time,8,8.5),maskImage:filling>=1?'none':`linear-gradient(165deg,black ${sweep-14}%,transparent ${sweep+14}%)`,WebkitMaskImage:filling>=1?'none':`linear-gradient(165deg,black ${sweep-14}%,transparent ${sweep+14}%)`}}>
      <GeometryFill geometry={g}/>
    </div>
    <div style={{position:'absolute',left:52,top:36,fontSize:12,letterSpacing:3,color:'#87918f'}}>SILIROOT / DESIGN PROCESS</div>
    <div style={{position:'absolute',right:52,top:36,fontSize:12,letterSpacing:1,color:'#87918f'}}>{circles.length} CIRCLES · {lines.length} LINES</div>
    <div style={{position:'absolute',top:638,width:'100%',textAlign:'center',opacity:finish,transform:`translateY(${(1-finish)*8}px)`}}>
      <div style={{fontFamily:'"Songti SC","STSong",serif',fontSize:34,fontWeight:600,letterSpacing:12,paddingLeft:12}}>硅基源流</div>
      <div style={{fontSize:14,letterSpacing:8,paddingLeft:8,marginTop:12}}>SiliRoot</div>
    </div>
    <div style={{position:'absolute',left:52,bottom:34,color:'#87918f',fontSize:12,letterSpacing:1}}>{String(phase+1).padStart(2,'0')} / {STAGES[phase].name}</div>
    <div style={{position:'absolute',right:52,bottom:34,color:'#87918f',fontSize:12,fontVariantNumeric:'tabular-nums'}}>{time.toFixed(1)} / 15.0 s</div>
  </AbsoluteFill>;
};

function Showcase({geometry}:Props) {
  const player=useRef<PlayerRef>(null),container=useRef<HTMLDivElement>(null);
  const [playing,setPlaying]=useState(false),[frame,setFrame]=useState(0),[loop,setLoop]=useState(true),[rate,setRate]=useState(1);
  const inputProps=useMemo(()=>({geometry}),[geometry]);
  useEffect(()=>{
    const current=player.current;if(!current)return;
    const update=(e:{detail:{frame:number}})=>setFrame(e.detail.frame);
    const play=()=>setPlaying(true),pause=()=>setPlaying(false);
    current.addEventListener('frameupdate',update);current.addEventListener('play',play);current.addEventListener('pause',pause);current.addEventListener('ended',pause);
    return()=>{current.removeEventListener('frameupdate',update);current.removeEventListener('play',play);current.removeEventListener('pause',pause);current.removeEventListener('ended',pause);};
  },[]);
  useEffect(()=>{
    const element=container.current;if(!element)return;
    if(matchMedia('(prefers-reduced-motion: reduce)').matches){player.current?.seekTo(FRAMES-1);return;}
    let started=false,resumeWhenVisible=false;
    const observer=new IntersectionObserver(entries=>{
      const entry=entries[0];
      if(entry.isIntersecting&&(!started||resumeWhenVisible)){started=true;resumeWhenVisible=false;player.current?.play();}
      else if(!entry.isIntersecting){resumeWhenVisible=player.current?.isPlaying()??false;player.current?.pause();}
    },{threshold:.35});observer.observe(element);return()=>observer.disconnect();
  },[]);
  const jump=(seconds:number)=>{player.current?.pause();player.current?.seekTo(Math.min(FRAMES-1,Math.round(seconds*FPS)));};
  return <div ref={container}>
    {/* This silent composition must not wait for an AudioContext that requires a user gesture. */}
    <div className="motion-player"><Player ref={player} component={LogoConstruction} inputProps={inputProps} durationInFrames={FRAMES} fps={FPS} compositionWidth={1280} compositionHeight={800} controls={false} initiallyMuted loop={loop} playbackRate={rate} moveToBeginningWhenEnded={false} clickToPlay={false} style={{width:'100%',aspectRatio:'1280 / 800'}}/></div>
    <div className="motion-transport">
      <div className="motion-buttons">
        <button type="button" onClick={()=>{if(playing)player.current?.pause();else {if(frame>=FRAMES-1)player.current?.seekTo(0);player.current?.play();}}}>{playing?'暂停动画':'播放动画'}</button>
        <button type="button" onClick={()=>{player.current?.seekTo(0);player.current?.play();}}>重新播放</button>
        <button type="button" aria-pressed={loop} onClick={()=>setLoop(!loop)}>循环</button>
      </div>
      <label className="motion-rate">速度<select aria-label="动画播放速度" value={rate} onChange={e=>setRate(Number(e.target.value))}><option value={.5}>0.5×</option><option value={1}>1×</option><option value={1.5}>1.5×</option></select></label>
      <label className="motion-seek"><span className="sr-only">动画进度</span><input aria-label="动画进度" type="range" min="0" max={FRAMES-1} value={frame} onChange={e=>{player.current?.pause();player.current?.seekTo(Number(e.target.value));}}/></label>
      <output className="motion-time">{(frame/FPS).toFixed(1)} / 15.0 s</output>
    </div>
    <div className="motion-chapters" aria-label="动画阶段">
      {STAGES.map((stage,i)=><button key={stage.name} type="button" aria-pressed={phaseAt(frame/FPS)===i} onClick={()=>jump(stage.time)}><span>0{i+1}</span>{stage.name}</button>)}
    </div>
  </div>;
}

const root=document.getElementById('logo-animation-root');
const geometry={width:W,height:H,parts,smoothJoints} as Geometry;
if(root)createRoot(root).render(<Showcase geometry={geometry}/>);
