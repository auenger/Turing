// Offline measurement only. The experiment renders the resulting circles in CSS.
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const sharp = createRequire(require.resolve('astro/package.json'))('sharp');

const { data, info } = await sharp('public/logo-reference.png')
  .extract({ left: 385, top: 120, width: 520, height: 505 })
  .removeAlpha().raw().toBuffer({ resolveWithObject: true });
const w = info.width, h = info.height;
const on = (x, y) => x >= 0 && y >= 0 && x < w && y < h && data[(y * w + x) * info.channels] < 100;
const edges = new Map();
const add = (a, b) => { const k = a.join(','); const list = edges.get(k) || []; list.push(b); edges.set(k, list); };
for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) if (on(x,y)) {
  if (!on(x,y-1)) add([x,y],[x+1,y]);
  if (!on(x+1,y)) add([x+1,y],[x+1,y+1]);
  if (!on(x,y+1)) add([x+1,y+1],[x,y+1]);
  if (!on(x-1,y)) add([x,y+1],[x,y]);
}
const contours = [];
while (edges.size) {
  const start = edges.keys().next().value;
  const points = [];
  let key = start;
  do {
    points.push(key.split(',').map(Number));
    const list = edges.get(key);
    if (!list) break;
    const next = list.pop();
    if (!list.length) edges.delete(key);
    key = next.join(',');
  } while (key !== start);
  let area = 0;
  for (let i = 0; i < points.length; i++) {
    const a=points[i], b=points[(i+1)%points.length]; area += a[0]*b[1]-b[0]*a[1];
  }
  if (area > 100) contours.push({ area: area/2, points });
}

function fit(points, start, end) {
  const a=points[start], b=points[end], dx=b[0]-a[0], dy=b[1]-a[1];
  const chord=Math.hypot(dx,dy);
  if (chord < 2) return null;
  const nx=-dy/chord, ny=dx/chord, mx=(a[0]+b[0])/2, my=(a[1]+b[1])/2;
  let lineError=0, num=0, den=0;
  for(let i=start+1;i<end;i++) {
    const x=points[i][0]-mx, y=points[i][1]-my;
    lineError=Math.max(lineError,Math.abs(x*nx+y*ny));
    const u=x*x+y*y-chord*chord/4, v=2*(x*nx+y*ny);
    num+=u*v; den+=v*v;
  }
  if(lineError<=1.3) return { to:b, error:lineError };
  if(!den) return null;
  const t=num/den, cx=mx+t*nx, cy=my+t*ny, r=Math.hypot(chord/2,t);
  if(r<8 || r>2000) return null;
  let error=0, sign=0;
  for(let i=start+1;i<end;i++) {
    error=Math.max(error,Math.abs(Math.hypot(points[i][0]-cx,points[i][1]-cy)-r));
    sign+=(points[i][0]-mx)*nx+(points[i][1]-my)*ny;
  }
  // Minor circular segments only; all caps can be cut from a disk by a straight chord.
  if(Math.sign(sign)===Math.sign(t) || chord/(2*r)>0.985 || error>1.4) return null;
  return { to:b, circle:[cx,cy,r], add:sign<0, error };
}
const result=[];
for(const contour of contours.sort((a,b)=>b.area-a.area)) {
  const p=contour.points;
  // Start at the end of the highest horizontal edge, a reliable design corner.
  let idx=0;
  for(let i=1;i<p.length;i++) if(p[i][1]<p[idx][1] || (p[i][1]===p[idx][1]&&p[i][0]>p[idx][0])) idx=i;
  const points=[...p.slice(idx),...p.slice(0,idx),p[idx]];
  const arcs=[];
  let start=0;
  while(start<points.length-1) {
    let bestEnd=start+1, best={to:points[bestEnd],error:0};
    let misses=0;
    for(let end=start+2;end<points.length && end<=start+650;end++) {
      const candidate=fit(points,start,end);
      if(candidate) { best=candidate; bestEnd=end; misses=0; }
      else if(++misses>40) break;
    }
    arcs.push(best); start=bestEnd;
  }
  result.push({area:contour.area,start:points[0],arcs});
}
console.log(JSON.stringify(result, (k,v)=>typeof v==='number'?Math.round(v*1000)/1000:v));
