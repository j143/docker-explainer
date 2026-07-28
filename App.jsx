import React, { useState, useEffect } from 'react';
import { Terminal, Database, Box, Server, FileText, ArrowRight, Play, Cpu, Layers, Shield, Activity, Eye, EyeOff, Network, ServerCog, Globe, Lock, Code } from 'lucide-react';

const CustomStyles = () => (
  <style>{`
    .tactile-shadow {
      box-shadow: 4px 6px 0px 0px #111;
    }
    .tactile-shadow-sm {
      box-shadow: 2px 3px 0px 0px #111;
    }
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-5px); }
    }
    .animate-float {
      animation: float 4s ease-in-out infinite;
    }
    .delay-200 { animation-delay: 0.2s; }
    .delay-500 { animation-delay: 0.5s; }
    
    @keyframes drop {
      0% { transform: translateY(0); opacity: 1; }
      100% { transform: translateY(64px); opacity: 0; }
    }
    @keyframes slideRightDown {
      0% { transform: translate(0, 0); opacity: 0; }
      20% { opacity: 1; }
      50% { transform: translate(-100px, 0); }
      100% { transform: translate(-100px, 32px); opacity: 0; }
    }
  `}</style>
);

const TactileBlock = ({ 
  children, 
  color = "bg-[#FF9F1C]", 
  className = "", 
  onClick, 
  isAnimated = true,
  smallShadow = false,
  delay = 0 
}) => {
  const delayClass = delay === 0.2 ? 'delay-200' : delay === 0.5 ? 'delay-500' : '';
  
  return (
    <div
      onClick={onClick}
      className={`border-[4px] border-[#111] rounded-2xl ${color} ${className} 
        ${smallShadow ? 'tactile-shadow-sm' : 'tactile-shadow'} 
        ${onClick ? 'cursor-pointer active:translate-x-1 active:translate-y-1 active:shadow-none transition-transform' : ''} 
        ${isAnimated ? 'animate-float ' + delayClass : ''} transition-all duration-300`}
    >
      {children}
    </div>
  );
};

function VMScene() {
  const [activeVM, setActiveVM] = useState(null);

  return (
    <div className="w-full max-w-4xl flex flex-col items-center gap-4 animate-in fade-in zoom-in duration-500">
      <div className="flex flex-col md:flex-row gap-8 w-full justify-center items-center">
        {/* VM 1 */}
        <TactileBlock 
          color="bg-[#FF9F1C]" 
          className="w-72 p-4 flex flex-col gap-4"
          onClick={() => setActiveVM(1)}
          delay={0}
        >
          <div className="text-[#111] font-black text-center border-b-4 border-[#111] pb-2 mb-2 flex justify-between items-center h-8">
            <span>Virtual Machine 1</span>
            {activeVM === 1 && <span className="text-xs bg-[#111] text-[#FF9F1C] px-2 py-1 rounded-full">Heavy!</span>}
          </div>
          <TactileBlock color="bg-[#38B000]" smallShadow className="h-16 flex items-center justify-center p-2" isAnimated={false}>
            <span className="text-[#111] font-bold">App A (Python)</span>
          </TactileBlock>
          <TactileBlock color="bg-[#7209B7]" smallShadow className="h-28 flex flex-col items-center justify-center p-2" isAnimated={false}>
            <Layers color="#fff" size={20} className="mb-1" />
            <span className="text-white font-bold text-sm">Guest OS (Ubuntu)</span>
            <span className="text-[#F72585] font-black text-lg">KERNEL</span>
          </TactileBlock>
        </TactileBlock>

        {/* VM 2 */}
        <TactileBlock 
          color="bg-[#FF9F1C]"
          className="w-72 p-4 flex flex-col gap-4"
          onClick={() => setActiveVM(2)}
          delay={0.2}
        >
          <div className="text-[#111] font-black text-center border-b-4 border-[#111] pb-2 mb-2 flex justify-between items-center h-8">
            <span>Virtual Machine 2</span>
            {activeVM === 2 && <span className="text-xs bg-[#111] text-[#FF9F1C] px-2 py-1 rounded-full">Heavy!</span>}
          </div>
          <TactileBlock color="bg-[#4361EE]" smallShadow className="h-16 flex items-center justify-center p-2" isAnimated={false}>
            <span className="text-white font-bold">App B (Go)</span>
          </TactileBlock>
          <TactileBlock color="bg-[#7209B7]" smallShadow className="h-28 flex flex-col items-center justify-center p-2" isAnimated={false}>
            <Layers color="#fff" size={20} className="mb-1" />
            <span className="text-white font-bold text-sm">Guest OS (Alpine)</span>
            <span className="text-[#F72585] font-black text-lg">KERNEL</span>
          </TactileBlock>
        </TactileBlock>
      </div>

      <TactileBlock color="bg-[#4CC9F0]" className="w-full md:w-[600px] h-14 flex items-center justify-center" isAnimated={false}>
        <span className="text-[#111] font-black text-xl">Hypervisor</span>
      </TactileBlock>

      <TactileBlock color="bg-[#8D99AE]" className="w-full md:w-[640px] h-20 flex items-center justify-center gap-4" isAnimated={false}>
        <Cpu color="#111" size={28} />
        <span className="text-[#111] font-black text-xl">Physical Hardware (Server)</span>
      </TactileBlock>
    </div>
  );
}

function DockerScene() {
  const [activeApp, setActiveApp] = useState(null);
  const [showTerminal, setShowTerminal] = useState(false);

  return (
    <div className="w-full max-w-4xl flex flex-col items-center gap-4 animate-in fade-in zoom-in duration-500">
      
      <div className="w-full flex justify-end mb-2">
         <button 
           onClick={() => setShowTerminal(!showTerminal)}
           className="bg-[#2B2D42] border-2 border-[#111] text-[#00E5FF] font-mono px-4 py-2 rounded-lg font-bold hover:bg-[#3B3D52] transition-colors flex items-center gap-2"
         >
           <Terminal size={18} /> {showTerminal ? "Hide Host Terminal" : "Run 'ps aux' on Host"}
         </button>
      </div>

      <div className="flex gap-4 md:gap-8 w-full md:w-[600px] justify-center items-end h-[200px] relative">
        {/* Terminal Overlay */}
        {showTerminal && (
          <div className="absolute top-0 right-0 md:-right-32 bg-[#111] border-2 border-[#333] p-4 rounded-xl shadow-2xl z-50 w-72 animate-in slide-in-from-right-8 fade-in">
            <div className="flex items-center gap-2 border-b border-[#333] pb-2 mb-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-gray-400 font-mono text-xs ml-2">host-server ~</span>
            </div>
            <div className="font-mono text-xs text-green-400">
              $ ps aux | grep app<br/>
              <span className="text-gray-300">root   1024  0.0  python app.py</span><br/>
              <span className="text-gray-300">root   2048  0.0  ./go-binary</span>
            </div>
            <div className="mt-2 text-xs text-yellow-400 font-bold border-t border-[#333] pt-2">
               Containers are just host processes!
            </div>
          </div>
        )}

        {/* Connections */}
        {activeApp && (
          <div 
            className={`absolute bottom-0 w-1 md:w-2 bg-[#F72585] z-0 transition-all duration-300 h-full max-h-[140px] ${activeApp === 1 ? 'left-[25%] md:left-[30%]' : 'left-[75%] md:left-[70%]'}`}
            style={{ transform: 'translateX(-50%)' }}
          />
        )}

        <TactileBlock 
          color="bg-[#38B000]" 
          className="w-40 md:w-48 h-28 p-4 flex flex-col items-center justify-center z-10"
          onClick={() => setActiveApp(1)}
          delay={0}
        >
          <Box color="#111" size={20} className="mb-2" />
          <span className="text-[#111] font-black md:text-lg text-center leading-tight">Container A<br/>(Python)</span>
          {activeApp === 1 && <span className="text-[10px] md:text-xs bg-[#111] text-[#38B000] px-2 py-1 rounded-full mt-2 absolute -top-3">Syscall to Host!</span>}
        </TactileBlock>

        <TactileBlock 
          color="bg-[#4361EE]" 
          className="w-40 md:w-48 h-28 p-4 flex flex-col items-center justify-center z-10"
          onClick={() => setActiveApp(2)}
          delay={0.2}
        >
          <Box color="#fff" size={20} className="mb-2" />
          <span className="text-white font-black md:text-lg text-center leading-tight">Container B<br/>(Go)</span>
          {activeApp === 2 && <span className="text-[10px] md:text-xs bg-[#111] text-[#4361EE] px-2 py-1 rounded-full mt-2 absolute -top-3">Syscall to Host!</span>}
        </TactileBlock>
      </div>

      <TactileBlock color="bg-[#4CC9F0]" className="w-full md:w-[600px] h-14 flex items-center justify-center z-10" isAnimated={false}>
        <span className="text-[#111] font-black text-lg md:text-xl">Docker Engine (Daemon)</span>
      </TactileBlock>

      <TactileBlock color="bg-[#7209B7]" className="w-full md:w-[640px] h-24 flex flex-col items-center justify-center z-10 relative overflow-hidden" isAnimated={false}>
        <span className="text-white font-bold text-sm md:text-base mb-1">Host OS (e.g. CentOS 7.9)</span>
        <span className="text-[#F72585] font-black text-xl md:text-3xl z-10">SHARED KERNEL</span>
        <div className="absolute opacity-10 inset-0 flex items-center justify-center pointer-events-none z-0">
           <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M0,50 Q25,25 50,50 T100,50 L100,100 L0,100 Z" fill="#F72585"/>
           </svg>
        </div>
      </TactileBlock>

      <TactileBlock color="bg-[#8D99AE]" className="w-full md:w-[680px] h-16 flex items-center justify-center gap-4 z-10" isAnimated={false}>
        <Cpu color="#111" size={24} />
        <span className="text-[#111] font-black text-lg md:text-xl">Hardware (104 CPUs)</span>
      </TactileBlock>
    </div>
  );
}

function ImageScene() {
  const [pipelineState, setPipelineState] = useState('file'); 

  return (
    <div className="w-full flex flex-col md:flex-row items-center justify-between gap-6 max-w-5xl animate-in fade-in zoom-in duration-500">
      
      {/* 1. Dockerfile */}
      <div className="flex flex-col items-center gap-4 w-full md:w-72">
        <TactileBlock color="bg-white" className="w-full h-72 p-6 flex flex-col" isAnimated={pipelineState === 'file'}>
          <div className="flex items-center gap-2 border-b-4 border-gray-200 pb-2 mb-4">
            <FileText color="#111" />
            <span className="text-[#111] font-black text-xl">Dockerfile</span>
          </div>
          <div className="flex flex-col gap-3 font-mono text-xs md:text-sm font-bold">
            <div className="text-blue-600"><span className="text-[#111]">FROM</span> ubuntu:latest</div>
            <div className="text-purple-600"><span className="text-[#111]">WORKDIR</span> /app</div>
            <div className="text-gray-600"><span className="text-[#111]">COPY</span> . /app</div>
            <div className="text-orange-600"><span className="text-[#111]">RUN</span> apt update</div>
            <div className="text-green-600"><span className="text-[#111]">ENTRYPOINT</span> ["python"]</div>
          </div>
        </TactileBlock>
        
        <TactileBlock 
          color={pipelineState === 'file' ? "bg-[#4CC9F0]" : "bg-[#2A2A35] text-gray-500 border-[#333]"} 
          className="w-full py-3 flex items-center justify-center gap-2"
          onClick={() => setPipelineState('image')}
          isAnimated={false}
          smallShadow
        >
          <Code size={18} />
          <span className="font-black">docker build</span>
        </TactileBlock>
      </div>

      <ArrowRight size={48} color={pipelineState !== 'file' ? "#00E5FF" : "#333"} className="shrink-0 hidden md:block" strokeWidth={3}/>

      {/* 2. Docker Image */}
      <div className="flex flex-col items-center gap-4 w-full md:w-72">
        <TactileBlock 
          color={pipelineState !== 'file' ? "bg-[#FF9F1C]" : "bg-[#2A2A35] border-[#333]"} 
          className="w-full h-72 p-4 flex flex-col justify-center items-center gap-4 relative overflow-hidden"
          isAnimated={pipelineState === 'image'}
        >
          <span className={`font-black text-2xl ${pipelineState !== 'file' ? 'text-[#111]' : 'text-gray-600'}`}>Docker Image</span>
          <span className={`text-xs font-bold px-3 py-1 rounded-lg border-2 ${pipelineState !== 'file' ? 'bg-[#111] border-[#111] text-[#FF9F1C]' : 'bg-[#111] border-gray-700 text-gray-500'}`}>Read-Only Archive</span>
          
          <div className="flex flex-col gap-2 w-full mt-2">
            <div className={`p-2 border-2 rounded-xl text-center font-bold text-sm ${pipelineState !== 'file' ? 'bg-[#38B000] border-[#111] text-[#111]' : 'border-gray-700 text-gray-700'}`}>App Code</div>
            <div className={`p-2 border-2 rounded-xl text-center font-bold text-sm ${pipelineState !== 'file' ? 'bg-[#4CC9F0] border-[#111] text-[#111]' : 'border-gray-700 text-gray-700'}`}>OS Libraries (Ubuntu)</div>
            
            <div className="relative mt-2 p-2 text-center">
              <span className={`font-black text-lg tracking-widest ${pipelineState !== 'file' ? 'text-[#F72585]' : 'text-gray-700'}`}>KERNEL</span>
              <div className={`absolute top-1/2 left-1/2 w-full h-1 -translate-x-1/2 -translate-y-1/2 rotate-12 ${pipelineState !== 'file' ? 'bg-[#111]' : 'bg-transparent'}`}></div>
            </div>
          </div>
        </TactileBlock>

        <TactileBlock 
          color={pipelineState === 'image' ? "bg-[#38B000]" : "bg-[#2A2A35] text-gray-500 border-[#333]"} 
          className="w-full py-3 flex items-center justify-center gap-2"
          onClick={() => pipelineState === 'image' && setPipelineState('container')}
          isAnimated={false}
          smallShadow
        >
          <Terminal size={18} />
          <span className="font-black">docker run</span>
        </TactileBlock>
      </div>

      <ArrowRight size={48} color={pipelineState === 'container' ? "#38B000" : "#333"} className="shrink-0 hidden md:block" strokeWidth={3}/>

      {/* 3. Running Container */}
      <div className="flex flex-col items-center gap-4 w-full md:w-72">
        <TactileBlock 
          color={pipelineState === 'container' ? "bg-[#F72585]" : "bg-[#2A2A35] border-[#333]"} 
          className="w-full h-72 p-6 flex flex-col justify-center items-center gap-4"
          isAnimated={pipelineState === 'container'}
        >
          <Box size={56} color={pipelineState === 'container' ? "#111" : "#444"} strokeWidth={2} />
          <div className="text-center">
            <span className={`font-black text-2xl block ${pipelineState === 'container' ? 'text-[#111]' : 'text-gray-600'}`}>Container</span>
            <span className={`font-bold text-sm mt-2 inline-block px-3 py-1 rounded-lg border-2 ${pipelineState === 'container' ? 'bg-[#111] border-[#111] text-[#F72585]' : 'border-gray-700 text-gray-600'}`}>Running Process</span>
          </div>
          
          {pipelineState === 'container' && (
            <div className="mt-4 flex items-center gap-2 bg-[#111] text-[#00E5FF] px-4 py-2 rounded-xl font-mono text-xs font-bold border-2 border-[#111] animate-in slide-in-from-bottom-4">
              <Play size={12} fill="currentColor" /> Running PID 1
            </div>
          )}
        </TactileBlock>
        
        <div className="h-12 hidden md:block"></div> {/* Alignment spacer */}
      </div>
    </div>
  );
}

function ResourceScene() {
  const [cgroupsActive, setCgroupsActive] = useState(false);
  const [namespacesActive, setNamespacesActive] = useState(false);

  return (
    <div className="w-full max-w-4xl flex flex-col items-center gap-6 animate-in fade-in zoom-in duration-500">
      <div className="flex flex-wrap justify-center gap-4 mb-4 z-20">
        <TactileBlock 
          color={namespacesActive ? "bg-[#38B000]" : "bg-[#2A2A35] border-[#555]"} 
          className="px-6 py-3 flex items-center gap-2"
          onClick={() => setNamespacesActive(!namespacesActive)}
          isAnimated={false}
          smallShadow
        >
          {namespacesActive ? <EyeOff size={20} color="#111" /> : <Eye size={20} color="#888" />}
          <span className={namespacesActive ? "text-[#111] font-black" : "text-[#888] font-bold"}>
            {namespacesActive ? "Namespaces: ON" : "Toggle Namespaces"}
          </span>
        </TactileBlock>
        
        <TactileBlock 
          color={cgroupsActive ? "bg-[#F72585]" : "bg-[#2A2A35] border-[#555]"} 
          className="px-6 py-3 flex items-center gap-2"
          onClick={() => setCgroupsActive(!cgroupsActive)}
          isAnimated={false}
          smallShadow
        >
          {cgroupsActive ? <Lock size={20} color="#111" /> : <Activity size={20} color="#888" />}
          <span className={cgroupsActive ? "text-[#111] font-black" : "text-[#888] font-bold"}>
            {cgroupsActive ? "Cgroups: ON" : "Toggle Cgroups"}
          </span>
        </TactileBlock>
      </div>

      <TactileBlock color="bg-[#8D99AE]" className="w-full md:w-[700px] h-80 p-6 flex flex-col justify-end relative overflow-hidden" isAnimated={false}>
        <span className="absolute top-4 left-4 text-[#111] font-black text-xl flex items-center gap-2">
          <Server size={24} /> Host Operating System
        </span>
        
        <div className="flex justify-around w-full items-end h-full">
          {/* Container 1 */}
          <div className="relative flex flex-col items-center justify-end h-full w-40 md:w-48 transition-all duration-500">
             {cgroupsActive && (
               <div className="absolute inset-0 border-x-4 border-t-4 border-dashed border-[#F72585] rounded-t-xl bg-[#F72585]/10 animate-pulse z-0 flex flex-col justify-start items-center pt-2">
                 <span className="text-[#F72585] font-black text-[10px] md:text-xs bg-[#111] px-2 py-1 rounded">MAX RAM: 512MB</span>
               </div>
             )}
             <TactileBlock color="bg-[#4CC9F0]" className="w-32 h-32 md:w-40 md:h-40 flex flex-col items-center justify-center relative z-10" delay={0.2}>
               <Box color="#111" size={32} />
               <span className="text-[#111] font-black mt-2 text-center">App 1</span>
               {namespacesActive && (
                 <div className="absolute -right-4 md:-right-12 top-6 md:top-10 bg-[#111] text-[#38B000] text-[10px] md:text-xs font-mono px-2 py-1 rounded border border-[#333] z-20">PID 1</div>
               )}
             </TactileBlock>
          </div>

          {/* Visibility indicator */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-full max-w-[200px] h-32 pointer-events-none z-10">
             {!namespacesActive ? (
               <div className="flex items-center gap-2 text-white/40 flex-col md:flex-row text-center">
                 <ArrowRight size={24} className="hidden md:block"/>
                 <span className="font-bold text-sm bg-black/50 px-2 py-1 rounded">Can see each other!</span>
                 <ArrowRight size={24} className="rotate-180 hidden md:block" />
               </div>
             ) : (
               <div className="flex flex-col items-center gap-2 text-[#38B000]">
                 <Shield size={48} strokeWidth={1.5} />
                 <span className="font-bold bg-[#111] px-3 py-1 rounded-full text-xs border border-[#333]">Total Isolation</span>
               </div>
             )}
          </div>

          {/* Container 2 */}
          <div className="relative flex flex-col items-center justify-end h-full w-40 md:w-48 transition-all duration-500">
             {cgroupsActive && (
               <div className="absolute bottom-0 w-full h-[60%] border-x-4 border-t-4 border-dashed border-[#F72585] rounded-t-xl bg-[#F72585]/10 animate-pulse z-0 flex flex-col justify-start items-center pt-2 transition-all duration-500">
                 <span className="text-[#F72585] font-black text-[10px] md:text-xs bg-[#111] px-2 py-1 rounded text-center">MAX RAM: 256MB</span>
               </div>
             )}
             <TactileBlock color="bg-[#FF9F1C]" className={`w-32 md:w-40 ${cgroupsActive ? 'h-20 md:h-24' : 'h-32 md:h-40'} flex flex-col items-center justify-center relative z-10 transition-all duration-500`} delay={0.5}>
               <Box color="#111" size={32} />
               <span className="text-[#111] font-black mt-2 text-center">App 2</span>
               {namespacesActive && (
                 <div className="absolute -left-4 md:-left-12 top-4 md:top-6 bg-[#111] text-[#38B000] text-[10px] md:text-xs font-mono px-2 py-1 rounded border border-[#333] z-20">PID 1</div>
               )}
             </TactileBlock>
          </div>
        </div>
      </TactileBlock>
    </div>
  );
}

function ExecutionScene() {
  const [execState, setExecState] = useState(0); 

  return (
    <div className="w-full flex flex-col items-center gap-8 animate-in fade-in zoom-in duration-500 max-w-5xl">
      <div className="flex gap-4">
         <TactileBlock 
           color="bg-[#00E5FF]" 
           className="px-6 py-3 flex items-center gap-2"
           onClick={() => setExecState((prev) => (prev + 1) % 4)}
           isAnimated={false} 
           smallShadow
         >
           <Play size={16} fill="currentColor" color="#111" />
           <span className="text-[#111] font-black">Step Forward API Call</span>
         </TactileBlock>
      </div>

      <div className="flex flex-col md:flex-row w-full justify-between items-center gap-4 relative">
        
        {/* CLI */}
        <TactileBlock color={execState >= 0 ? "bg-[#F8F9FA]" : "bg-[#222] border-[#333]"} className="w-full md:w-44 h-32 flex flex-col items-center justify-center transition-colors duration-500" isAnimated={false}>
          <Terminal size={24} color={execState >= 0 ? "#111" : "#555"} className="mb-2"/>
          <span className={execState >= 0 ? "text-[#111] font-black" : "text-[#555] font-black"}>Docker CLI</span>
          <span className="text-[10px] md:text-xs font-mono mt-1 text-gray-500">docker run redis</span>
        </TactileBlock>
        
        <ArrowRight size={24} color={execState >= 1 ? "#00E5FF" : "#333"} className={`rotate-90 md:rotate-0 ${execState === 0 ? "animate-pulse" : ""}`} />

        {/* Daemon */}
        <TactileBlock color={execState >= 1 ? "bg-[#4CC9F0]" : "bg-[#222] border-[#333]"} className="w-full md:w-44 h-32 flex flex-col items-center justify-center transition-colors duration-500" isAnimated={false}>
          <ServerCog size={24} color={execState >= 1 ? "#111" : "#555"} className="mb-2"/>
          <span className={execState >= 1 ? "text-[#111] font-black" : "text-[#555] font-black"}>dockerd</span>
          <span className="text-[10px] md:text-xs font-bold mt-1 bg-black/10 px-2 rounded">API & Images</span>
        </TactileBlock>

        <ArrowRight size={24} color={execState >= 2 ? "#00E5FF" : "#333"} className={`rotate-90 md:rotate-0 ${execState === 1 ? "animate-pulse" : ""}`} />

        {/* Containerd */}
        <TactileBlock color={execState >= 2 ? "bg-[#7209B7]" : "bg-[#222] border-[#333]"} className="w-full md:w-44 h-32 flex flex-col items-center justify-center transition-colors duration-500" isAnimated={false}>
          <Layers size={24} color={execState >= 2 ? "#fff" : "#555"} className="mb-2"/>
          <span className={execState >= 2 ? "text-white font-black" : "text-[#555] font-black"}>containerd</span>
          <span className="text-[10px] md:text-xs font-bold mt-1 text-purple-300">Supervises runc</span>
        </TactileBlock>

        <ArrowRight size={24} color={execState >= 3 ? "#00E5FF" : "#333"} className={`rotate-90 md:rotate-0 ${execState === 2 ? "animate-pulse" : ""}`} />

        {/* Runc */}
        <TactileBlock color={execState >= 3 ? "bg-[#F72585]" : "bg-[#222] border-[#333]"} className="w-full md:w-44 h-32 flex flex-col items-center justify-center relative overflow-hidden transition-colors duration-500" isAnimated={execState >= 3}>
          {execState >= 3 && (
            <div className="absolute inset-0 bg-[#38B000] rounded-xl flex flex-col items-center justify-center animate-in slide-in-from-bottom-full duration-300 z-20">
               <Box size={24} color="#111" className="mb-2" />
               <span className="text-[#111] font-black text-center leading-tight">Running<br/>Container</span>
            </div>
          )}
          <Activity size={24} color={execState >= 3 ? "#111" : "#555"} className="mb-2 z-10"/>
          <span className={`z-10 ${execState >= 3 ? "text-[#111]" : "text-[#555]"} font-black`}>runc</span>
          <span className="z-10 text-[10px] md:text-xs font-bold mt-1 bg-black/10 px-2 rounded text-center">Spawns process</span>
        </TactileBlock>

      </div>
    </div>
  );
}

function NetworkScene() {
  const [isPinging, setIsPinging] = useState(false);

  useEffect(() => {
    let timeout;
    if (isPinging) {
      timeout = setTimeout(() => setIsPinging(false), 2000);
    }
    return () => clearTimeout(timeout);
  }, [isPinging]);

  return (
    <div className="w-full max-w-4xl flex flex-col items-center gap-6 animate-in fade-in zoom-in duration-500">
      
      <div className="flex flex-col items-center">
        <TactileBlock color="bg-[#F8F9FA]" className="p-4" onClick={() => setIsPinging(true)} smallShadow isAnimated={false}>
           <div className="flex items-center gap-2">
             <Globe size={24} color="#111" />
             <span className="text-[#111] font-black text-lg">Internet Request</span>
           </div>
           <span className="block text-xs text-gray-500 font-mono mt-1 text-center bg-gray-200 py-1 rounded">http://localhost:8080</span>
        </TactileBlock>
      </div>

      <div className="relative h-12 md:h-16 w-full flex justify-center">
        {isPinging && (
          <div className="absolute top-0 w-4 h-4 rounded-full bg-[#00E5FF] shadow-[0_0_15px_#00E5FF] z-20" 
               style={{ animation: 'drop 0.5s forwards' }} 
          />
        )}
      </div>

      <TactileBlock color="bg-[#2B2D42]" className="w-full md:w-[700px] p-4 md:p-6 flex flex-col relative" isAnimated={false}>
        <span className="text-white font-black text-lg md:text-xl mb-6">Host Network Stack</span>
        
        <div className="absolute top-4 right-4 bg-[#111] text-[#00E5FF] font-mono text-xs md:text-sm px-3 py-1 rounded font-bold border-2 border-[#333]">
          Host Port: 8080
        </div>

        <TactileBlock color="bg-[#8D99AE]" className="w-full h-20 mb-8 flex items-center justify-center relative z-10" smallShadow isAnimated={false}>
           <Network size={20} color="#111" className="mr-2 hidden md:block" />
           <span className="text-[#111] font-black text-sm md:text-lg">docker0 (Virtual Bridge)</span>
           <span className="absolute right-2 md:right-4 text-[#111] font-mono text-[10px] md:text-sm font-bold bg-white/30 px-2 py-1 rounded">172.17.0.1</span>
           
           {isPinging && (
             <div className="absolute -bottom-4 w-4 h-4 rounded-full bg-[#00E5FF] shadow-[0_0_15px_#00E5FF] z-20" 
                  style={{ animation: 'slideRightDown 1s 0.5s forwards' }} 
             />
           )}
        </TactileBlock>

        <div className="flex gap-4 md:gap-8 justify-center w-full">
          {/* Container 1 */}
          <div className="flex flex-col items-center">
             <div className="h-6 md:h-8 w-2 bg-[#FF9F1C] relative z-0 border-x border-[#111]"></div>
             <TactileBlock color="bg-[#FF9F1C]" className="w-36 md:w-48 h-28 md:h-32 p-3 md:p-4 flex flex-col justify-between relative z-10" isAnimated={false}>
                <div className="flex justify-between items-start">
                  <span className="text-[#111] font-black md:text-lg text-sm">Web App</span>
                  <span className="text-[#111] font-mono text-[10px] md:text-xs font-bold bg-white/40 px-1 rounded border border-[#111]/20">:80</span>
                </div>
                <span className="text-[#111] font-mono text-[10px] md:text-xs font-bold text-center bg-white/20 py-1 rounded">172.17.0.2</span>
             </TactileBlock>
          </div>

          {/* Container 2 */}
          <div className="flex flex-col items-center">
             <div className="h-6 md:h-8 w-2 bg-[#4361EE] relative z-0 border-x border-[#111]"></div>
             <TactileBlock color="bg-[#4361EE]" className="w-36 md:w-48 h-28 md:h-32 p-3 md:p-4 flex flex-col justify-between relative z-10" isAnimated={false}>
                <div className="flex justify-between items-start">
                  <span className="text-white font-black md:text-lg text-sm">Database</span>
                  <span className="text-white font-mono text-[10px] md:text-xs font-bold bg-black/30 px-1 rounded border border-black/50">:5432</span>
                </div>
                <span className="text-white font-mono text-[10px] md:text-xs font-bold text-center bg-black/20 py-1 rounded">172.17.0.3</span>
             </TactileBlock>
          </div>
        </div>
      </TactileBlock>
    </div>
  );
}

export default function App() {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { id: 'vm', title: "1. The VM Era", subtitle: "Hardware Virtualization" },
    { id: 'docker', title: "2. The Docker Era", subtitle: "OS-level Virtualization" },
    { id: 'image', title: "3. Image Anatomy", subtitle: "Build -> Image -> Run" },
    { id: 'resource', title: "4. Resource Control", subtitle: "Namespaces & Cgroups" },
    { id: 'execute', title: "5. Execution Flow", subtitle: "CLI to Containerd" },
    { id: 'network', title: "6. Networking", subtitle: "Bridge & Port Mapping" }
  ];

  const nextStep = () => setCurrentStep((prev) => (prev + 1) % steps.length);

  return (
    <div className="min-h-screen bg-[#1A1A24] text-white font-sans overflow-hidden flex flex-col selection:bg-[#F72585] selection:text-white">
      <CustomStyles />
      
      <header className="p-4 md:p-6 flex flex-col lg:flex-row justify-between items-center border-b-[4px] border-[#111] gap-4 lg:gap-0 z-20 bg-[#1A1A24] shrink-0">
        <div className="flex items-center gap-3 shrink-0">
          <TactileBlock color="bg-[#00E5FF]" smallShadow className="p-2" isAnimated={false}>
            <Box size={24} color="#111" />
          </TactileBlock>
          <h1 className="text-xl md:text-2xl font-black tracking-tight text-white uppercase">Docker Explainer</h1>
        </div>
        
        <div className="flex flex-wrap justify-center lg:justify-end gap-2 w-full max-w-4xl">
          {steps.map((step, idx) => (
            <button 
              key={step.id}
              onClick={() => setCurrentStep(idx)}
              className={`px-2 py-1 md:px-3 md:py-2 rounded-xl font-bold border-[3px] text-xs md:text-sm transition-all duration-200 ${
                currentStep === idx 
                  ? 'bg-[#F72585] border-[#111] text-[#111] tactile-shadow-sm -translate-y-1' 
                  : 'bg-transparent border-[#333] text-[#888] hover:border-[#555] hover:text-white'
              }`}
            >
              {step.title}
            </button>
          ))}
        </div>
      </header>

      <main className="flex-1 relative flex items-center justify-center p-4 md:p-12 overflow-y-auto min-h-[500px]">
        {currentStep === 0 && <VMScene />}
        {currentStep === 1 && <DockerScene />}
        {currentStep === 2 && <ImageScene />}
        {currentStep === 3 && <ResourceScene />}
        {currentStep === 4 && <ExecutionScene />}
        {currentStep === 5 && <NetworkScene />}
      </main>

      <footer className="bg-[#252535] border-t-[4px] border-[#111] p-6 md:p-8 flex flex-col md:flex-row gap-6 md:gap-8 items-center min-h-[200px] z-20 shrink-0">
        <div className="flex-1 max-w-5xl">
          <h2 className="text-2xl font-black text-[#00E5FF] mb-3">{steps[currentStep].title}: {steps[currentStep].subtitle}</h2>
          <p className="text-[#B0B0C0] text-sm md:text-base lg:text-lg leading-relaxed font-medium">
            {currentStep === 0 && "Before Docker, we relied on Virtual Machines (VMs). A Hypervisor sits on the hardware, and every single application requires its own complete, heavy 'Guest OS' to run. You are booting an entire separate operating system for every app. It's incredibly slow, wastes RAM, and duplicates the OS kernel."}
            {currentStep === 1 && "Docker changes the paradigm. Instead of duplicating the entire OS, Docker containers run natively on the host machine and SHARE the single underlying Host OS Kernel (e.g., CentOS 7.9). Containers are just isolated processes managed by the Docker Daemon. Click the 'Run ps aux' button to see proof!"}
            {currentStep === 2 && "A Dockerfile contains instructions to assemble an image. The resulting Image is a sealed archive containing your App Code and specific OS Libraries (like Ubuntu apt packages). Crucially, IT DOES NOT CONTAIN A KERNEL. When you 'docker run', it becomes a living Container."}
            {currentStep === 3 && "How are containers isolated if they share the host? Linux uses Namespaces to give each container a private view of the OS (like its own PID 1, network, and mount points) so they can't see each other. It uses Cgroups (Control Groups) to set hard limits on resources like RAM and CPU so one container can't crash the host."}
            {currentStep === 4 && "When you run a container, the Docker CLI sends a request to the Docker Daemon (dockerd). The daemon passes it to containerd (which manages downloading images and supervising containers). Finally, containerd hands off to runc, a low-level tool that actually interacts with the Linux kernel to create the process."}
            {currentStep === 5 && "Containers attach to a virtual bridge network (docker0) on the host. They get private IP addresses and can talk to each other via internal virtual ethernet (veth) cables. To make an app accessible to the Internet, Docker performs Port Mapping (e.g., mapping Host Port 8080 to Container Port 80)."}
          </p>
        </div>
        
        <TactileBlock 
          color="bg-[#00E5FF]" 
          className="px-6 py-4 flex items-center justify-center gap-3 text-[#111] font-black text-lg md:text-xl w-full md:w-auto shrink-0 cursor-pointer"
          onClick={nextStep}
          isAnimated={false}
        >
          {currentStep === 5 ? "Start Over" : "Next Concept"} 
          <ArrowRight strokeWidth={4} size={24} />
        </TactileBlock>
      </footer>
    </div>
  );
}