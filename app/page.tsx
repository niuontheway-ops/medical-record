"use client";
import {useEffect,useState} from "react";
import {flushSync} from "react-dom";
import {BookOpen,ArrowRight,ArrowLeft,FileText,Check,Lightbulb,Clock,ExternalLink,MessageCircle,PenLine,ClipboardCheck,Hospital,Stethoscope,ShieldCheck,QrCode,Download,Smartphone} from "lucide-react";
import {Tabs,TabsList,TabsTrigger,TabsContent} from "@/components/ui/tabs";
import {Button} from "@/components/ui/button";
import {Textarea} from "@/components/ui/textarea";
import {lessons,sources,deadlines,rookieDay} from "./content";
const basePath=process.env.NEXT_PUBLIC_BASE_PATH||"";
const githubMobileLive=true;
export default function Home(){
 const [active,setActive]=useState(lessons[0].id);
 const [annotation,setAnnotation]=useState(0);
 const [answers,setAnswers]=useState<Record<string,number>>({});
 const [chiefDraft,setChiefDraft]=useState("发热3天，咳嗽2天");
 const index=lessons.findIndex(l=>l.id===active),lesson=lessons[index];
 const chiefCount=[...chiefDraft.replace(/\s/g,"")].length;
 function navigate(id:string){setActive(id);setAnnotation(0);requestAnimationFrame(()=>document.getElementById("lesson")?.scrollIntoView({block:"start"}));}
 useEffect(()=>{
   const context=(document as Document & {modelContext?:{registerTool:(tool:object,options:{signal:AbortSignal})=>void|Promise<void>}}).modelContext;
   if(!context?.registerTool)return;
   const lifecycle=new AbortController();
   const tool={name:"open_record_writing_lesson",title:"打开病历书写课程",description:"打开指定教学章节并显示其讲解与示例，不提交练习答案。",inputSchema:{type:"object",properties:{lessonId:{type:"string",enum:lessons.map(l=>l.id)}},required:["lessonId"],additionalProperties:false},annotations:{readOnlyHint:false,untrustedContentHint:false},execute:(input:unknown)=>{
     if(!input||typeof input!=="object"||!("lessonId" in input)||Object.keys(input).length!==1)throw new Error("请提供 lessonId");
     const target=lessons.find(l=>l.id===(input as {lessonId:unknown}).lessonId);
     if(!target)throw new Error("课程不存在");
     flushSync(()=>{setActive(target.id);setAnnotation(0);});
     document.getElementById("lesson")?.scrollIntoView({block:"start"});
     return {lessonId:target.id,title:target.title,goal:target.goal};
   }};
   try{Promise.resolve(context.registerTool(tool,{signal:lifecycle.signal})).catch(()=>{});}catch{}
   return ()=>lifecycle.abort();
 },[]);
 return <div className="school">
 <a className="skip" href="#lesson">跳至课程正文</a>
 <header className="masthead"><a href={`${basePath}/`} className="brand"><span className="brand-mark"><FileText size={23}/></span><span>临床第一课<small>病历书写入门</small></span></a><span className="header-note">给刚刚进入临床的你</span><a href="#references" className="reference-link">规范依据 <ExternalLink size={14}/></a></header>
 <main className="shell">
 <section className="course-intro"><div><p className="eyebrow">从第一份病历开始</p><h1>把临床思考，<br/>写成清楚的记录。</h1><p>从“完全不会”出发：先照着清单做，再理解为什么，最后独立完成并请带教老师审核。</p><div className="intro-meta"><span><BookOpen size={16}/>{lessons.length} 节图文课</span><span><PenLine size={16}/>示例 · 模板骨架 · 改错 · 练习</span></div></div><figure><img src={`${basePath}/images/chart-teaching.webp`} alt="带教医生与新入职医生一起审阅病历" width="720" height="480"/><figcaption>病历里写下的，是你对患者负责的每一步。</figcaption></figure></section>
 <section className="rookie-route" aria-labelledby="rookie-title"><div className="route-heading"><div><p className="eyebrow">菜鸟第一周</p><h2 id="rookie-title">一天按这四步走，不容易漏</h2></div><p><ShieldCheck size={18}/>先处理患者，再及时、真实地完成记录。</p></div><div className="route-grid">{rookieDay.map((stage,i)=><article key={stage.time}><span>{String(i+1).padStart(2,"0")}</span><div className="route-time">{stage.time}</div><h3>{stage.title}</h3><ul>{stage.items.map(item=><li key={item}>{item}</li>)}</ul></article>)}</div><div className="rule-legend"><span><strong>国家规范</strong>必须掌握的底线</span><span><strong>教材方法</strong>帮助你完成问诊与查体</span><span><strong>本院确认</strong>模板、格式和更严格时限</span></div></section>
 <Tabs value={active} onValueChange={v=>navigate(String(v))} className="course-tabs"><div className="chapter-heading"><h2>学习目录</h2><span>章节可自由选择</span></div><div className="chapter-scroll"><TabsList className="chapter-list" aria-label="选择病历书写课程">{lessons.map((l,i)=><TabsTrigger key={l.id} value={l.id} className="chapter-tab"><span className="chapter-number">{String(i+1).padStart(2,"0")}</span>{l.title}{answers[l.id]!==undefined&&<Check size={14} aria-label="已练习"/>}</TabsTrigger>)}</TabsList></div>
 {lessons.map(l=><TabsContent key={l.id} value={l.id}><article id={l.id===active?"lesson":undefined} className="lesson" aria-label={l.title}>
 <div className="lesson-heading"><div><p className="eyebrow">LESSON {String(lessons.indexOf(l)+1).padStart(2,"0")} / {l.subtitle}</p><h2>{l.title}</h2><p>{l.goal}</p></div><span className="time"><Clock size={15}/>{l.minutes} 分钟</span></div>
 <div className="lesson-grid"><div className="lesson-main">
 <section className="principles">{l.points.map((p,i)=><div className="principle" key={p.title}><span>{i+1}</span><div><h3>{p.title}</h3><p>{p.body}</p></div></div>)}</section>
 <ol className="reasoning-flow" aria-label="书写思路">{l.steps.map((s,i)=><li key={s}><span>{String(i+1).padStart(2,"0")}</span>{s}{i<l.steps.length-1&&<ArrowRight size={17}/>}</li>)}</ol>
 <section className="annotated"><div className="section-title"><FileText size={20}/><h3>拆开一段病历看</h3><span>虚构教学节选</span></div><p className="hint">点击一段文字，查看老师的批注。</p><div className="paper">{l.sample.map((s,i)=><Button key={s.label} variant="ghost" className={annotation===i?"sample-line selected":"sample-line"} onClick={()=>setAnnotation(i)} aria-pressed={annotation===i}><span className="sample-label">{s.label}</span><span>{s.text}</span><MessageCircle size={17}/></Button>)}</div><div className="annotation" role="status"><Lightbulb size={20}/><div><strong>带教批注 · {l.sample[annotation]?.label||l.sample[0].label}</strong><p>{(l.sample[annotation]||l.sample[0]).note}</p></div></div></section>
 <section className="comparison"><div className="section-title"><PenLine size={20}/><h3>同一件事，怎样写得更清楚？</h3></div><div className="compare-grid"><div className="wrong"><span>常见写法 · 有问题</span><p>{l.wrong}</p></div><div className="better"><span>改写示例</span><p>{l.better}</p></div></div><p className="why"><strong>为什么这样改：</strong>{l.why}</p></section>
 {l.id==="chief"&&<section className="chief-lab"><div className="section-title"><PenLine size={20}/><h3>主诉字数练习</h3><span>建议目标，不是法规硬上限</span></div><Textarea value={chiefDraft} onChange={e=>setChiefDraft(e.target.value)} aria-label="输入一条主诉"/><div className={chiefCount<=20?"count good":"count long"}><strong>{chiefCount}</strong> 个字符（不计空格）<span>{chiefCount<=20?"简洁度达标，再核对症状与时间":"可以超过20字；若病情不复杂，试着删去诊断词和无关经过"}</span></div><p>第10版《诊断学》强调主诉应简明扼要、用一两句话概括；国家《病历书写基本规范》规定写主要症状（或体征）及持续时间，但未规定全国统一的“20字以内”。</p></section>}
 {l.checklist&&<section className="rookie-check"><div className="section-title"><ClipboardCheck size={20}/><h3>新手照着核对</h3></div><ul>{l.checklist.map(item=><li key={item}><Check size={16}/><span>{item}</span></li>)}</ul></section>}
 {l.template&&<section className="template-card"><div className="template-title"><Hospital size={19}/><div><span>书写骨架</span><small>只保留结构，方括号必须换成本次真实信息</small></div></div><p>{l.template}</p></section>}
 {l.localRule&&<aside className="local-rule"><Stethoscope size={18}/><p><strong>入科当天向老师确认：</strong>{l.localRule}</p></aside>}
 {l.id==="deadlines"&&<section className="deadline-table"><h3>书写时限速查</h3><table><thead><tr><th>记录</th><th>时限</th><th>注意</th></tr></thead><tbody>{deadlines.map(row=><tr key={row[0]}>{row.map((v,i)=><td key={i}>{v}</td>)}</tr>)}</tbody></table><p>以上为国家规范中的对应要求；危急处置不能等待文书。各机构细则及更严格要求需同时核对。</p></section>}
 </div><aside className="lesson-aside"><figure><img src={`${basePath}${l.image||"/images/history-taking.webp"}`} alt={l.image?"带教医生讲解记录要点":"医生平视患者，采集病史"} width="720" height="480" loading="lazy"/><figcaption>{l.image?"先理解，再落笔。":"好的记录，从认真倾听开始。"}</figcaption></figure><div className="margin-note"><span>记在心里</span><p>没问过 ≠ 否认<br/>没查过 ≠ 正常<br/>未核实 ≠ 已证实</p><small>每个“阴性”结果，都应有真实的询问或检查作为依据。</small></div><div className="source-note"><strong>本节规范依据</strong><p>{sources[Number(l.source)].title}<br/>{l.article}</p>{sources[Number(l.source)].url&&<a href={sources[Number(l.source)].url} target="_blank" rel="noreferrer">阅读原文 <ExternalLink size={14}/></a>}</div></aside></div>
 <section className="practice"><div><p className="eyebrow">轮到你判断</p><h3>{l.question}</h3></div><div className="answers">{l.answers.map((a,i)=><Button key={a} variant="outline" className={answers[l.id]===i?"answer chosen":"answer"} onClick={()=>setAnswers(s=>({...s,[l.id]:i}))} aria-pressed={answers[l.id]===i}><span>{String.fromCharCode(65+i)}</span>{a}</Button>)}</div>{answers[l.id]!==undefined&&<div className={answers[l.id]===l.correct?"quiz-feedback correct":"quiz-feedback rethink"} role="status"><strong>{answers[l.id]===l.correct?"判断正确":"再想一步"}</strong><p>{l.feedback[answers[l.id]]}</p></div>}</section>
 <nav className="lesson-navigation" aria-label="前后课程"><Button variant="ghost" disabled={index===0} onClick={()=>navigate(lessons[index-1].id)}><ArrowLeft size={16}/>上一节</Button><span>{index+1} / {lessons.length}</span><Button disabled={index===lessons.length-1} onClick={()=>navigate(lessons[index+1].id)}>下一节<ArrowRight size={16}/></Button></nav>
 </article></TabsContent>)}</Tabs>
 <section className="two-versions" aria-labelledby="versions-title"><div className="version-copy"><p className="eyebrow">两种使用方式</p><h2 id="versions-title">手机随手查，电脑本地学</h2><p>手机扫码版针对窄屏优化，可在查房前快速复习；电脑本地版适合教室、科室电脑或无外网环境，解压后按说明启动。</p><div className="version-actions">{githubMobileLive?<a className="primary-action" href="https://niuontheway-ops.github.io/medical-record/" target="_blank" rel="noreferrer"><Smartphone size={18}/>打开手机扫码版</a>:<span className="pending-action"><Smartphone size={18}/>GitHub 手机版待账号登录后发布</span>}<a className="secondary-action" href={`${basePath}/downloads/病历书写入门-电脑本地版.zip`} download><Download size={18}/>下载电脑本地版</a></div></div>{githubMobileLive&&<figure><div className="qr-label"><QrCode size={18}/>手机扫码版</div><img src={`${basePath}/images/github-mobile-qr.png`} alt="病历书写入门 GitHub 手机版二维码" width="440" height="440"/><figcaption>niuontheway-ops.github.io/medical-record</figcaption></figure>}</section>
 <footer id="references" className="references"><div><p className="eyebrow">有据可查</p><h2>规范依据与使用说明</h2><p>本课程面向中国大陆临床新人。病历段落均为虚构教学节选，不是一份可直接提交的完整病历，也不替代本院模板、带教审核和实际诊疗判断。</p><p>规范核对日期：2026年9月9日。讲解与练习为原创教学整理，相关时限请结合现行规定及本院制度核对。</p></div><ol>{sources.map(s=><li key={s.code}>{s.url?<a href={s.url} target="_blank" rel="noreferrer">{s.title}<ExternalLink size={14}/></a>:<strong>{s.title}</strong>}<span>{s.code}</span></li>)}</ol></footer>
 </main><div className="bottom-line">临床第一课 · 认真记录，也是在认真照护。</div></div>
}
