const canvas = document.querySelector('#plasma');
const motion = matchMedia('(prefers-reduced-motion: reduce)');
const gl = canvas?.getContext('webgl', { alpha: false, antialias: false, powerPreference: 'low-power', preserveDrawingBuffer: true });
if (gl) {
  const vertex = 'attribute vec2 a;void main(){gl_Position=vec4(a,0.,1.);}';
  const fragment = `precision mediump float;
    uniform vec2 resolution; uniform float time; uniform float boss;
    void main(){
      vec2 p=(gl_FragCoord.xy*2.-resolution)/resolution.y;
      float t=time*.13, r=length(p), a=atan(p.y,p.x)+r*1.8-t*.25;
      vec2 q=vec2(cos(a),sin(a))*r;
      for(int i=0;i<4;i++){
        float f=float(i)+1.;
        q+=.33/f*vec2(sin(q.y*2.6+f*1.7+t),cos(q.x*2.3-f*.9-t*.8));
      }
      float v=sin(q.x*3.4+q.y*2.8+t+sin(q.y*3.1-t));
      float bands=sin(v*3.2+r*.7-t*.2);
      vec3 teal=vec3(.035,.27,.255), red=vec3(.43,.085,.075), dark=vec3(.025,.065,.08);
      vec3 color=mix(teal,red,smoothstep(-.3,.65,bands+boss*.3));
      color=mix(dark,color,.62+.38*smoothstep(-.9,.6,v));
      color+=vec3(.05,.09,.08)*pow(max(0.,sin(v*5.5)),8.);
      color*=.83-.14*length(p*.5);
      gl_FragColor=vec4(color,1.);
    }`;
  function compile(type, source) {
    const shader = gl.createShader(type); gl.shaderSource(shader, source); gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) throw Error('Shader unavailable');
    return shader;
  }
  try {
    const program = gl.createProgram();
    gl.attachShader(program, compile(gl.VERTEX_SHADER, vertex)); gl.attachShader(program, compile(gl.FRAGMENT_SHADER, fragment)); gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw Error('WebGL unavailable');
    gl.useProgram(program);
    const buffer = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buffer); gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]), gl.STATIC_DRAW);
    const pos = gl.getAttribLocation(program, 'a'); gl.enableVertexAttribArray(pos); gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);
    const resolution = gl.getUniformLocation(program, 'resolution'), time = gl.getUniformLocation(program, 'time'), boss = gl.getUniformLocation(program, 'boss');
    let frame = 0, last = 0, elapsed = 0;
    function resize() {
      const scale = Math.min(1, 780 / innerWidth);
      canvas.width = Math.round(innerWidth * scale); canvas.height = Math.round(innerHeight * scale);
      gl.viewport(0, 0, canvas.width, canvas.height); gl.uniform2f(resolution, canvas.width, canvas.height);
    }
    function paint(now) {
      if (document.hidden) { frame = 0; return; }
      if (now - last >= 40 || motion.matches) {
        if (!motion.matches) elapsed += Math.min(100, now - last) / 1000;
        last = now;
        gl.uniform1f(time, motion.matches ? 12 : elapsed + 12);
        gl.uniform1f(boss, document.body.dataset.boss === 'true' ? 1 : 0);
        gl.drawArrays(gl.TRIANGLES, 0, 6); canvas.classList.add('ready');
      }
      frame = motion.matches ? 0 : requestAnimationFrame(paint);
    }
    function resume() { cancelAnimationFrame(frame); last = performance.now() - 50; paint(performance.now()); }
    addEventListener('resize', () => { resize(); if (motion.matches) resume(); });
    document.addEventListener('visibilitychange', () => { if (!document.hidden) resume(); });
    motion.addEventListener('change', resume);
    canvas.addEventListener('webglcontextlost', e => { e.preventDefault(); cancelAnimationFrame(frame); canvas.classList.remove('ready'); });
    resize(); resume();
  } catch { canvas.remove(); }
}
