import{cL as O,cN as e,cS as ie,r as u,dH as R,dI as A,dJ as F,dK as se,dL as Ae,dM as Fe,dN as ce,dO as De,dP as qe,dQ as z,dR as je,dS as $e,dT as Be,dU as ye,dV as Oe,dW as Re,dX as ae,dY as Ue,dZ as He,a$ as de,d_ as $,d$ as V,e0 as ue,e1 as Ne,e2 as B,e3 as Qe,e4 as me,e5 as Ve,e6 as Ge,e7 as pe,e8 as ze,e9 as Ke,ea as Ye,eb as _e,ec as he,ed as Ze,ee as Je,ef as Xe,eg as We,eh as es,ei as ss,ej as as,ek as ts,el as ns,em as ls,en as os,eo as rs,ep as is,eq as cs,cV as ds,er as us,es as ms,et as ps,eu as hs,ev as xs,ew as fs,ex as gs,ey as js,ez as ys,eA as Ns,eB as bs,cO as q,cQ as ks,dz as Ts,c_ as Cs,cM as S,cP as W,eC as vs}from"./vendor-3a94a37a.js";import{as as K,bk as ws,at as v,hk as U,aX as Y,ae as te,L as be,f$ as xe,g0 as Ss,v as Is,G as Ps,H as Es,d as Ls,I as Ms,t as As,a as Fs,w as Ds,C as ke,be as qs,f_ as $s,U as Bs,T as Os}from"./index-ed7845ca.js";import{d as Rs,F as T,b as j,B as _,D as Z,I as ne}from"./vendor-large-f75deccb.js";import{M as Te}from"./Modal-2abf3ad3.js";import{L as Us}from"./List-9eb27318.js";import{C as Ce}from"./CommonDelete-4339174a.js";import{a as Hs}from"./priorityApi-de4fcdb4.js";import{c as Qs}from"./milestoneApi-e59980bf.js";import{c as Vs}from"./taskStatusApi-717b5942.js";const Gs=K.injectEndpoints({endpoints:s=>({getTask:s.query({query:a=>({url:`task/${a}`}),providesTags:["Task"]}),getTasks:s.query({query:a=>({url:`task?${ws(a)}`}),providesTags:["Tasks"]}),addProjectTask:s.mutation({query:a=>({method:"POST",headers:{Accept:"application/json","Content-Type":"application/json;charset=UTF-8"},url:"task",body:a}),async onQueryStarted(a,{queryFulfilled:l,dispatch:r}){try{await l,v("ProjectTask added successfully","success")}catch{v("Something went wrong, Please try again","warning")}},invalidatesTags:["Tasks"]}),deleteProjectTask:s.mutation({query:a=>({url:`tasks/${a}`,method:"DELETE",headers:{Accept:"application/json","Content-Type":"application/json;charset=UTF-8"},body:{status:"false"}}),async onQueryStarted(a,{queryFulfilled:l,dispatch:r}){try{await l,v("Deleted ProjectTask successful","warning")}catch{v("Something went wrong, Please try again","warning")}},invalidatesTags:["Task","Tasks"]})})}),{useGetTaskQuery:Sa,useGetTasksQuery:zs,useAddProjectTaskMutation:Ia,useDeleteProjectTaskMutation:Pa}=Gs;function Ks({data:s,projectId:a}){var n,g,o,b,y,p;const l=O(),d={High:"#ff6666",Highest:"#ff3333",Low:"#66cc66",Lowest:"#339933",Normal:"#6666ff"}[(n=s==null?void 0:s.priority)==null?void 0:n.name]||"#cccccc";return e.jsx(e.Fragment,{children:e.jsxs("div",{onClick:()=>l(U(s)),className:"border p-2 rounded-lg flex flex-col gap-2 bg-white cursor-pointer",children:[e.jsxs("div",{className:"flex justify-between",children:[e.jsxs("div",{className:"text-sm",children:[e.jsx("span",{className:"",children:"Type:"})," ",s==null?void 0:s.type]}),e.jsx("div",{children:s.priority&&e.jsx(Rs,{color:d,children:(g=s==null?void 0:s.priority)==null?void 0:g.name})})]}),e.jsx("div",{className:"flex-grow py-2",children:s==null?void 0:s.name}),e.jsxs("div",{className:"flex justify-between text-gray-500 border-t pt-1 flex-wrap",children:[e.jsxs("div",{className:"flex",children:[e.jsx("p",{className:"text-sm",children:ie(s==null?void 0:s.startDate).format("ll")}),e.jsx("span",{className:"mx-1",children:"to"}),e.jsx("p",{className:"text-sm",children:ie(s==null?void 0:s.endDate).format("ll")})]}),(((o=s==null?void 0:s.crmTaskStatus)==null?void 0:o.taskStatusName)||((b=s==null?void 0:s.taskStatus)==null?void 0:b.name))&&e.jsxs("p",{className:"text-sm",children:[e.jsx("span",{className:"",children:"Status:"})," ",(s==null?void 0:s.type)==="crm"?(y=s==null?void 0:s.crmTaskStatus)==null?void 0:y.taskStatusName:(p=s==null?void 0:s.taskStatus)==null?void 0:p.name]})]})]})})}const ve=K.injectEndpoints({endpoints:s=>({getProjectTasks:s.query({query:()=>({url:"tasks?query=all"}),providesTags:["ProjectTasks"]}),getProjectTask:s.query({query:a=>({url:`tasks/${a}`}),providesTags:["ProjectTask"]}),addProjectTask:s.mutation({query:a=>({method:"POST",headers:{Accept:"application/json","Content-Type":"application/json;charset=UTF-8"},url:"task",body:a}),async onQueryStarted(a,{queryFulfilled:l,dispatch:r}){try{await l,v("ProjectTask added successfully","success")}catch{v("Something went wrong, Please try again","warning")}},invalidatesTags:["ProjectTasks","TaskStatusById"]}),updateProjectTask:s.mutation({query:({id:a,values:l})=>({method:"PUT",headers:{Accept:"application/json","Content-Type":"application/json;charset=UTF-8"},url:`tasks/${a}`,body:l}),async onQueryStarted(a,{queryFulfilled:l,dispatch:r}){try{await l,v("ProjectTask updated successfully","success")}catch{v("Something went wrong, Please try again","warning")}},invalidatesTags:["ProjectTasks","ProjectTask","TaskStatusById","Tasks"]}),updateProjectTaskStatus:s.mutation({query:({id:a,values:l})=>({method:"PUT",headers:{Accept:"application/json","Content-Type":"application/json;charset=UTF-8"},url:`tasks/${a}?query=taskStatus`,body:l}),async onQueryStarted(a,{queryFulfilled:l,dispatch:r}){try{await l,v("ProjectTask Status updated successfully","success")}catch{v("Something went wrong, Please try again","warning")}},invalidatesTags:["TaskStatusById"]}),deleteProjectTask:s.mutation({query:a=>({url:`tasks/${a}`,method:"DELETE",headers:{Accept:"application/json","Content-Type":"application/json;charset=UTF-8"},body:{status:"false"}}),async onQueryStarted(a,{queryFulfilled:l,dispatch:r}){try{await l,v("Deleted ProjectTask successful","warning")}catch{v("Something went wrong, Please try again","warning")}},invalidatesTags:["ProjectTasks","TaskStatusById"]})})}),{useGetProjectTasksQuery:Ea,useGetProjectTaskQuery:Ys,useAddProjectTaskMutation:La,useUpdateProjectTaskMutation:we,useUpdateProjectTaskStatusMutation:Ma,useDeleteProjectTaskMutation:Aa}=ve;function _s({task:s,open:a,onClose:l,updateTask:r,updateLoading:d}){var p,m;const[n,g]=u.useState([]),[o]=T.useForm(),b=c=>{var x,f,N;const i=(N=(f=(x=s==null?void 0:s.project)==null?void 0:x.projectTeam)==null?void 0:f.find(k=>k.id===c))==null?void 0:N.projectTeamMember;g(i),o.setFieldValue("assignedTask",[])},y=async c=>{const i=await r({id:s.id,values:c});i.data&&!i.error&&l()};return u.useEffect(()=>{var c;s!=null&&s.team&&a&&g((c=s==null?void 0:s.team)==null?void 0:c.projectTeamMember)},[s,a]),u.useEffect(()=>{var c,i;a&&o.setFieldsValue({teamId:(c=s==null?void 0:s.team)==null?void 0:c.id,assignedTask:(i=s==null?void 0:s.assignedTask)==null?void 0:i.map(x=>x.userId)})},[o,s,a]),e.jsx("div",{children:e.jsx(Te,{title:"Add Members",open:a,onClose:l,children:e.jsx("div",{className:" bg-white py-4 px-2 rounded flex flex-col gap-2 min-w-[200px]",children:e.jsxs(T,{form:o,layout:"vertical",onFinish:y,children:[e.jsx(T.Item,{name:"teamId",children:e.jsx(j,{onChange:b,bordered:!1,defaultValue:s==null?void 0:s.priorityId,placeholder:"Select Team",className:"bg-transparent p-0 focus:bg-white",children:(m=(p=s==null?void 0:s.project)==null?void 0:p.projectTeam)==null?void 0:m.map(c=>e.jsx(j.Option,{value:c.id,children:c.projectTeamName},c.id))})}),e.jsx(T.Item,{name:"assignedTask",children:e.jsx(j,{placeholder:"Select Member",bordered:!1,mode:"multiple",className:"bg-transparent p-0 focus:bg-white",maxTagCount:"responsive",children:n.map(c=>{var i;return e.jsx(j.Option,{value:c.userId,children:(i=c==null?void 0:c.user)==null?void 0:i.username},c.userId)})})}),e.jsx(T.Item,{children:e.jsx(Y,{loading:d,type:"submit",color:"primary",children:"Save"})})]})})})})}const Zs={ltr:"ltr",rtl:"rtl",placeholder:"editor-placeholder",paragraph:"editor-paragraph",quote:"editor-quote",heading:{h1:"editor-heading-h1",h2:"editor-heading-h2",h3:"editor-heading-h3",h4:"editor-heading-h4",h5:"editor-heading-h5"},list:{nested:{listitem:"editor-nested-listitem"},ol:"editor-list-ol",ul:"editor-list-ul",listitem:"editor-listitem"},image:"editor-image",link:"editor-link",text:{bold:"editor-text-bold",italic:"editor-text-italic",overflowed:"editor-text-overflowed",hashtag:"editor-text-hashtag",underline:"editor-text-underline",strikethrough:"editor-text-strikethrough",underlineStrikethrough:"editor-text-underlineStrikethrough",code:"editor-text-code"},code:"editor-code",codeHighlight:{atrule:"editor-tokenAttr",attr:"editor-tokenAttr",boolean:"editor-tokenProperty",builtin:"editor-tokenSelector",cdata:"editor-tokenComment",char:"editor-tokenSelector",class:"editor-tokenFunction","class-name":"editor-tokenFunction",comment:"editor-tokenComment",constant:"editor-tokenProperty",deleted:"editor-tokenProperty",doctype:"editor-tokenComment",entity:"editor-tokenOperator",function:"editor-tokenFunction",important:"editor-tokenVariable",inserted:"editor-tokenSelector",keyword:"editor-tokenAttr",namespace:"editor-tokenVariable",number:"editor-tokenProperty",operator:"editor-tokenOperator",prolog:"editor-tokenComment",property:"editor-tokenProperty",punctuation:"editor-tokenPunctuation",regex:"editor-tokenVariable",selector:"editor-tokenSelector",string:"editor-tokenSelector",symbol:"editor-tokenProperty",tag:"editor-tokenProperty",url:"editor-tokenOperator",variable:"editor-tokenVariable"}},G=1,Js=new Set(["paragraph","quote","code","h1","h2","ul","ol"]),Xs={code:"Code Block",h1:"Large Heading",h2:"Small Heading",h3:"Heading",h4:"Heading",h5:"Heading",ol:"Numbered List",paragraph:"Normal",quote:"Quote",ul:"Bulleted List"};function ee(){return e.jsx("div",{className:"divider"})}function fe(s,a){a===null?(s.style.opacity="0",s.style.top="-1000px",s.style.left="-1000px"):(s.style.opacity="1",s.style.top=`${a.top+a.height+window.pageYOffset+10}px`,s.style.left=`${a.left+window.pageXOffset-s.offsetWidth/2+a.width/2}px`)}function Ws({editor:s}){const a=u.useRef(null),l=u.useRef(null),r=u.useRef(!1),[d,n]=u.useState(""),[g,o]=u.useState(!1),[b,y]=u.useState(null),p=u.useCallback(()=>{const m=A();if(F(m)){const N=Se(m),k=N.getParent();z(k)?n(k.getURL()):z(N)?n(N.getURL()):n("")}const c=a.current,i=window.getSelection(),x=document.activeElement;if(c===null)return;const f=s.getRootElement();if(m!==null&&!i.isCollapsed&&f!==null&&f.contains(i.anchorNode)){const N=i.getRangeAt(0);let k;if(i.anchorNode===f){let w=f;for(;w.firstElementChild!=null;)w=w.firstElementChild;k=w.getBoundingClientRect()}else k=N.getBoundingClientRect();r.current||fe(c,k),y(m)}else(!x||x.className!=="link-input")&&(fe(c,null),y(null),o(!1),n(""));return!0},[s]);return u.useEffect(()=>je(s.registerUpdateListener(({editorState:m})=>{m.read(()=>{p()})}),s.registerCommand(ye,()=>(p(),!0),G)),[s,p]),u.useEffect(()=>{s.getEditorState().read(()=>{p()})},[s,p]),u.useEffect(()=>{g&&l.current&&l.current.focus()},[g]),e.jsx("div",{ref:a,className:"link-editor",children:g?e.jsx("input",{ref:l,className:"link-input",value:d,onChange:m=>{n(m.target.value)},onKeyDown:m=>{m.key==="Enter"?(m.preventDefault(),b!==null&&(d!==""&&s.dispatchCommand(ae,d),o(!1))):m.key==="Escape"&&(m.preventDefault(),o(!1))}}):e.jsx(e.Fragment,{children:e.jsxs("div",{className:"link-input",children:[e.jsx("a",{href:d,target:"_blank",rel:"noopener noreferrer",children:d}),e.jsx("div",{className:"link-edit",role:"button",tabIndex:0,onMouseDown:m=>m.preventDefault(),onClick:()=>{o(!0)}})]})})})}function ea({onChange:s,className:a,options:l,value:r}){return e.jsxs("select",{className:a,onChange:s,value:r,children:[e.jsx("option",{hidden:!0,value:""}),l.map(d=>e.jsx("option",{value:d,children:d},d))]})}function Se(s){const a=s.anchor,l=s.focus,r=s.anchor.getNode(),d=s.focus.getNode();return r===d?r:s.isBackward()?ue(l)?r:d:ue(a)?d:r}function sa({editor:s,blockType:a,toolbarRef:l,setShowBlockOptionsDropDown:r}){const d=u.useRef(null);u.useEffect(()=>{const c=l.current,i=d.current;if(c!==null&&i!==null){const{top:x,left:f}=c.getBoundingClientRect();i.style.top=`${x+40}px`,i.style.left=`${f}px`}},[d,l]),u.useEffect(()=>{const c=d.current,i=l.current;if(c!==null&&i!==null){const x=f=>{const N=f.target;!c.contains(N)&&!i.contains(N)&&r(!1)};return document.addEventListener("click",x),()=>{document.removeEventListener("click",x)}}},[d,r,l]);const n=()=>{a!=="paragraph"&&s.update(()=>{const c=A();F(c)&&B(c,()=>Ge())}),r(!1)},g=()=>{a!=="h1"&&s.update(()=>{const c=A();F(c)&&B(c,()=>pe("h1"))}),r(!1)},o=()=>{a!=="h2"&&s.update(()=>{const c=A();F(c)&&B(c,()=>pe("h2"))}),r(!1)},b=()=>{a!=="ul"?s.dispatchCommand(Qe):s.dispatchCommand(me),r(!1)},y=()=>{a!=="ol"?s.dispatchCommand(Ve):s.dispatchCommand(me),r(!1)},p=()=>{a!=="quote"&&s.update(()=>{const c=A();F(c)&&B(c,()=>ze())}),r(!1)},m=()=>{a!=="code"&&s.update(()=>{const c=A();F(c)&&B(c,()=>Ke())}),r(!1)};return e.jsxs("div",{className:"dropdown",ref:d,children:[e.jsxs("button",{className:"item",onClick:n,children:[e.jsx("span",{className:"icon paragraph"}),e.jsx("span",{className:"text",children:"Normal"}),a==="paragraph"&&e.jsx("span",{className:"active"})]}),e.jsxs("button",{className:"item",onClick:g,children:[e.jsx("span",{className:"icon large-heading"}),e.jsx("span",{className:"text",children:"Large Heading"}),a==="h1"&&e.jsx("span",{className:"active"})]}),e.jsxs("button",{className:"item",onClick:o,children:[e.jsx("span",{className:"icon small-heading"}),e.jsx("span",{className:"text",children:"Small Heading"}),a==="h2"&&e.jsx("span",{className:"active"})]}),e.jsxs("button",{className:"item",onClick:b,children:[e.jsx("span",{className:"icon bullet-list"}),e.jsx("span",{className:"text",children:"Bullet List"}),a==="ul"&&e.jsx("span",{className:"active"})]}),e.jsxs("button",{className:"item",onClick:y,children:[e.jsx("span",{className:"icon numbered-list"}),e.jsx("span",{className:"text",children:"Numbered List"}),a==="ol"&&e.jsx("span",{className:"active"})]}),e.jsxs("button",{className:"item",onClick:p,children:[e.jsx("span",{className:"icon quote"}),e.jsx("span",{className:"text",children:"Quote"}),a==="quote"&&e.jsx("span",{className:"active"})]}),e.jsxs("button",{className:"item",onClick:m,children:[e.jsx("span",{className:"icon code"}),e.jsx("span",{className:"text",children:"Code Block"}),a==="code"&&e.jsx("span",{className:"active"})]})]})}function aa(){const[s]=R(),a=u.useRef(null),[l,r]=u.useState(!1),[d,n]=u.useState(!1),[g,o]=u.useState("paragraph"),[b,y]=u.useState(null),[p,m]=u.useState(!1),[c,i]=u.useState(""),[x,f]=u.useState(!1),[N,k]=u.useState(!1),[w,I]=u.useState(!1),[D,P]=u.useState(!1),[h,E]=u.useState(!1),[H,t]=u.useState(!1),[J,le]=u.useState(!1),X=u.useCallback(()=>{const C=A();if(F(C)){const L=C.anchor.getNode(),M=L.getKey()==="root"?L:L.getTopLevelElementOrThrow(),oe=M.getKey();if(s.getElementByKey(oe)!==null)if(y(oe),se(M)){const Q=Ae(L,Ne),Me=Q?Q.getTag():M.getTag();o(Me)}else{const Q=Fe(M)?M.getTag():M.getType();o(Q),ce(M)&&i(M.getLanguage()||De())}I(C.hasFormat("bold")),P(C.hasFormat("italic")),E(C.hasFormat("underline")),t(C.hasFormat("strikethrough")),le(C.hasFormat("code")),f(qe(C));const re=Se(C),Le=re.getParent();z(Le)||z(re)?k(!0):k(!1)}},[s]);u.useEffect(()=>je(s.registerUpdateListener(({editorState:C})=>{C.read(()=>{X()})}),s.registerCommand(ye,(C,L)=>(X(),!1),G),s.registerCommand(Be,C=>(r(C),!1),G),s.registerCommand($e,C=>(n(C),!1),G)),[s,X]);const Ie=u.useMemo(()=>Oe(),[]),Pe=u.useCallback(C=>{s.update(()=>{if(b!==null){const L=Re(b);ce(L)&&L.setLanguage(C.target.value)}})},[s,b]),Ee=u.useCallback(()=>{N?s.dispatchCommand(ae,null):s.dispatchCommand(ae,"https://")},[s,N]);return e.jsxs("div",{className:"toolbar",ref:a,children:[e.jsx("button",{disabled:!l,onClick:()=>{s.dispatchCommand(Ue)},className:"toolbar-item spaced","aria-label":"Undo",children:e.jsx("i",{className:"format undo"})}),e.jsx("button",{disabled:!d,onClick:()=>{s.dispatchCommand(He)},className:"toolbar-item","aria-label":"Redo",children:e.jsx("i",{className:"format redo"})}),e.jsx(ee,{}),Js.has(g)&&e.jsxs(e.Fragment,{children:[e.jsxs("button",{className:"toolbar-item block-controls",onClick:()=>m(!p),"aria-label":"Formatting Options",children:[e.jsx("span",{className:"icon block-type "+g}),e.jsx("span",{className:"text",children:Xs[g]}),e.jsx("i",{className:"chevron-down"})]}),p&&de.createPortal(e.jsx(sa,{editor:s,blockType:g,toolbarRef:a,setShowBlockOptionsDropDown:m}),document.body),e.jsx(ee,{})]}),g==="code"?e.jsxs(e.Fragment,{children:[e.jsx(ea,{className:"toolbar-item code-language",onChange:Pe,options:Ie,value:c}),e.jsx("i",{className:"chevron-down inside"})]}):e.jsxs(e.Fragment,{children:[e.jsx("button",{onClick:()=>{s.dispatchCommand($,"bold")},className:"toolbar-item spaced "+(w?"active":""),"aria-label":"Format Bold",children:e.jsx("i",{className:"format bold"})}),e.jsx("button",{onClick:()=>{s.dispatchCommand($,"italic")},className:"toolbar-item spaced "+(D?"active":""),"aria-label":"Format Italics",children:e.jsx("i",{className:"format italic"})}),e.jsx("button",{onClick:()=>{s.dispatchCommand($,"underline")},className:"toolbar-item spaced "+(h?"active":""),"aria-label":"Format Underline",children:e.jsx("i",{className:"format underline"})}),e.jsx("button",{onClick:()=>{s.dispatchCommand($,"strikethrough")},className:"toolbar-item spaced "+(H?"active":""),"aria-label":"Format Strikethrough",children:e.jsx("i",{className:"format strikethrough"})}),e.jsx("button",{onClick:()=>{s.dispatchCommand($,"code")},className:"toolbar-item spaced "+(J?"active":""),"aria-label":"Insert Code",children:e.jsx("i",{className:"format code"})}),e.jsx("button",{onClick:Ee,className:"toolbar-item spaced "+(N?"active":""),"aria-label":"Insert Link",children:e.jsx("i",{className:"format link"})}),N&&de.createPortal(e.jsx(Ws,{editor:s}),document.body),e.jsx(ee,{}),e.jsx("button",{onClick:()=>{s.dispatchCommand(V,"left")},className:"toolbar-item spaced","aria-label":"Left Align",children:e.jsx("i",{className:"format left-align"})}),e.jsx("button",{onClick:()=>{s.dispatchCommand(V,"center")},className:"toolbar-item spaced","aria-label":"Center Align",children:e.jsx("i",{className:"format center-align"})}),e.jsx("button",{onClick:()=>{s.dispatchCommand(V,"right")},className:"toolbar-item spaced","aria-label":"Right Align",children:e.jsx("i",{className:"format right-align"})}),e.jsx("button",{onClick:()=>{s.dispatchCommand(V,"justify")},className:"toolbar-item","aria-label":"Justify Align",children:e.jsx("i",{className:"format justify-align"})})," "]})]})}function ta(s){const a=s.getNodes();return a.length===0?new Set([s.anchor.getNode().getParentOrThrow(),s.focus.getNode().getParentOrThrow()]):new Set(a.map(l=>Je(l)?l:l.getParentOrThrow()))}function na(s){const a=A();if(!F(a))return!1;const l=ta(a);let r=0;for(const d of l)if(se(d))r=Math.max(he(d)+1,r);else if(Ze(d)){const n=d.getParent();if(!se(n))throw new Error("ListMaxIndentLevelPlugin: A ListItemNode must have a ListNode for a parent.");r=Math.max(he(n)+1,r)}return r<=s}function la({maxDepth:s}){const[a]=R();return u.useEffect(()=>a.registerCommand(Ye,()=>!na(s??7),_e),[a,s]),null}function oa(){const[s]=R();return u.useEffect(()=>Xe(s),[s]),null}const ra=/((https?:\/\/(www\.)?)|(www\.))[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/,ia=/(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/,ca=[s=>{const a=ra.exec(s);return a&&{index:a.index,length:a[0].length,text:a[0],url:a[0]}},s=>{const a=ia.exec(s);return a&&{index:a.index,length:a[0].length,text:a[0],url:`mailto:${a[0]}`}}];function da(){return e.jsx(We,{matchers:ca})}function ua({onChange:s}){const[a]=R();return u.useEffect(()=>a.registerUpdateListener(({editorState:l})=>{const r=l.toJSON();s&&typeof s=="function"&&s(r)}),[a,s]),null}function ma({content:s}){const[a]=R();return u.useEffect(()=>{s&&a.update(()=>{const l=a.parseEditorState(s);a.setEditorState(l)})},[s,a]),null}function pa({isEdit:s}){return s?e.jsx("div",{className:"editor-placeholder",children:"Enter some rich text..."}):null}function ge({onChange:s,isEdit:a,defaultContent:l,content:r}){const d={theme:Zs,onError(n){ds.error(n.message)},editable:a||!1,editorState:l||null,nodes:[us,Ne,ms,ps,hs,xs,fs,gs,js,ys,Ns]};return s&&typeof s!="function"&&s(l),e.jsx(es,{initialConfig:d,children:e.jsxs("div",{className:te("editor-container"),children:[a&&e.jsx(aa,{}),e.jsxs("div",{className:te("editor-inner",{"bg-transparent":!a}),children:[e.jsx(ss,{contentEditable:e.jsx(as,{className:"editor-input"}),placeholder:e.jsx(pa,{isEdit:a}),ErrorBoundary:ts}),e.jsx(ns,{}),e.jsx(ls,{}),e.jsx(oa,{}),e.jsx(os,{}),e.jsx(rs,{}),e.jsx(da,{}),e.jsx(la,{maxDepth:7}),e.jsx(ua,{onChange:s}),e.jsx(is,{transformers:cs}),e.jsx(ma,{content:r})]})]})})}function ha({data:s}){var I,D,P;const a=O(),l=u.useRef(null),[r,d]=u.useState(!1),[n,g]=u.useState(!1),{data:o,isLoading:b}=Ys(s.id),[y,{isLoading:p}]=we(),{data:m,isLoading:c}=Hs(),{data:i,isLoading:x}=Qs(s==null?void 0:s.projectId),f=async()=>{try{const h=await y({id:s.id,values:{description:l.current}});h.data&&!h.error&&d(!1)}catch{}},N=()=>{d(!r)},k=async(h,E)=>{await y({id:s.id,values:{[h]:E}})},w=h=>{l.current=JSON.stringify(h)};return e.jsx(e.Fragment,{children:!b&&o?e.jsxs("div",{className:"flex justify-between gap-4 mt-4",children:[e.jsxs("div",{className:"w-[65%]",children:[e.jsxs("div",{className:"flex justify-between mb-2",children:[e.jsxs("h1",{className:"font-semibold flex gap-2 items-center",children:[e.jsx(bs,{size:23}),"Task Details"]}),e.jsxs("div",{className:"flex gap-1",children:[e.jsx(Y,{onClick:N,className:"inline w-auto px-2 py-1 bg-gray-400/10",color:"gray",children:e.jsx("span",{className:"text-xs text-gray-500",children:"Edit "})}),e.jsx(Ce,{permission:"delete-task",button:e.jsx(Y,{className:"inline w-auto px-2 py-1 bg-gray-400/10",color:"gray",children:e.jsx("span",{className:"text-xs text-gray-500",children:"Delete "})}),confirmMessage:"Are you sure you want to delete this task?",id:o.id,deleteThunk:ve.endpoints.deleteProjectTask.initiate,onSuccess:()=>a(U(null))})]})]}),r?e.jsxs(e.Fragment,{children:[e.jsx(ge,{onChange:w,isEdit:!0,defaultContent:o==null?void 0:o.description}),e.jsxs("div",{className:"flex gap-2",children:[e.jsx(_,{htmlType:"submit",loading:p,type:"primary",onClick:f,children:"Save"}),e.jsx(_,{onClick:N,htmlType:"button",type:"default",children:"Cancel"})]})]}):e.jsx(ge,{content:o==null?void 0:o.description})]}),e.jsx("div",{className:"w-[35%] bg-gray-400/10 p-4 rounded",children:e.jsx(Us,{labelClassName:"w-[30%]",listClassName:"border-b pb-2",className:"pt-0",list:[{label:"Project",value:(I=o==null?void 0:o.project)==null?void 0:I.name},{label:"Priority",value:e.jsx("div",{className:"taskBoard -mt-2 -ml-3 ",children:e.jsx(j,{onChange:h=>k("priorityId",h),bordered:!1,defaultValue:o==null?void 0:o.priorityId,loading:c,className:"bg-transparent p-0 focus:bg-white",placeholder:"Select Priority",children:m==null?void 0:m.map(h=>e.jsx(j.Option,{value:h.id,children:h.name},h.id))})})},{label:"Milestone",value:e.jsx("div",{className:"taskBoard -mt-2 -ml-3",children:e.jsx(j,{onChange:h=>k("milestoneId",h),bordered:!1,defaultValue:o==null?void 0:o.milestoneId,loading:x,className:"bg-transparent p-0 ",placeholder:"Select Milestone",children:i==null?void 0:i.map(h=>e.jsx(j.Option,{value:h.id,children:h.name},h.id))})})},{label:"Start Date",value:e.jsx("div",{className:"taskBoard -mt-2 -ml-3",children:e.jsx(Z,{placeholder:"Start Date",className:"focus:bg-white",onChange:h=>k("startDate",q(h).format("YYYY-MM-DD")),defaultValue:q(o==null?void 0:o.startDate),allowClear:!1})})},{label:"End Date",value:e.jsx("div",{className:"taskBoard -mt-2 -ml-3",children:e.jsx(Z,{className:"focus:bg-white",onChange:h=>k("endDate",q(h).format("YYYY-MM-DD")),defaultValue:q(o==null?void 0:o.endDate),allowClear:!1})})},{label:"Team",value:(D=o==null?void 0:o.team)==null?void 0:D.projectTeamName},{label:"Members",value:e.jsxs("div",{className:"relative flex ",children:[e.jsx("div",{children:(P=o==null?void 0:o.assignedTask)==null?void 0:P.map(h=>{var E;return e.jsx("div",{className:"flex flex-col",children:e.jsx(ks,{className:"my-[1px]",to:`/admin/hrm/staff/${h.user.id}`,children:e.jsx("span",{className:"inline px-1 text-gray-500 bg-white rounded-sm",children:(E=h.user)==null?void 0:E.username})})},h.id)})}),e.jsx("span",{className:"w-full flex justify-end mt-1",children:e.jsx(Ts,{size:18,onClick:()=>g(!0)})}),e.jsx(_s,{task:o,open:n,onClose:()=>g(!1),updateTask:y,updateLoading:p})]})}]})})]}):e.jsx(be,{className:"h-full"})})}function xa({id:s}){const[a]=T.useForm(),l=O();Cs();const[r,d]=u.useState(!1),{task:n,loading:g}=S(t=>t.task),{list:o,loading:b}=S(t=>t.users),{list:y,loading:p}=S(t=>t.priority),{list:m,loading:c}=S(t=>t.taskType),{list:i,loading:x}=S(t=>t.taskStatus),{list:f,loading:N}=S(t=>t.company),{list:k,loading:w}=S(t=>t.contact),{list:I,loading:D}=S(t=>t.opportunity),{list:P,loading:h}=S(t=>t.quote),E=async t=>{const J={...t,assigneeId:parseInt(t.assigneeId),opportunityId:parseInt(t.opportunityId),priorityId:parseInt(t.priorityId),taskStatusId:parseInt(t.taskStatusId)};(await l($s({id:n==null?void 0:n.id,values:J}))).payload.message==="success"&&(l(xe(n==null?void 0:n.id)),l(K.util.invalidateTags(["Tasks"])),d(!1))},H=t=>{d(!1),a.resetFields(),console.log("Failed:",t)};return u.useEffect(()=>(l(xe(s)),()=>{Ss()}),[l,s]),u.useEffect(()=>{l(Is()),l(Ps()),l(Es()),l(Ls({query:"all"})),l(Ms()),l(As()),l(Fs()),l(Ds())},[l]),e.jsx("div",{className:"relative  w-full flex flex-row",children:e.jsx("div",{className:"w-full overflow-y-auto overflow-x-hidden flex flex-col gap-8",children:n?e.jsx(ke,{bordered:!0,headStyle:{display:"none"},bodyStyle:{padding:0},children:e.jsx(T,{form:a,colon:!1,labelCol:{span:6},wrapperCol:{span:12},layout:"inline",onFieldsChange:()=>d(!0),onFinish:E,onFinishFailed:H,initialValues:{name:(n==null?void 0:n.name)||"",assigneeId:(n==null?void 0:n.assigneeId)||"",opportunityId:(n==null?void 0:n.opportunityId)||"",taskStatusId:(n==null?void 0:n.taskStatusId)||"",priorityId:(n==null?void 0:n.priorityId)||"",taskTypeId:(n==null?void 0:n.taskTypeId)||"",crmTaskStatusId:(n==null?void 0:n.crmTaskStatusId)||"",companyId:(n==null?void 0:n.companyId)||"",contactId:(n==null?void 0:n.contactId)||"",quoteId:(n==null?void 0:n.quoteId)||"",description:(n==null?void 0:n.description)||"",startDate:q(n==null?void 0:n.startDate)||"",endDate:q(n==null?void 0:n.endDate)||""},children:e.jsxs("div",{className:"w-full",children:[e.jsxs("div",{className:"flex justify-between items-center px-5 p-3 border-b",children:[e.jsxs("div",{className:"flex gap-2 dark:text-white",children:[e.jsx("span",{children:"Task Name:"}),e.jsx("span",{className:"font-bold",children:n==null?void 0:n.name})]}),e.jsxs("div",{className:"flex items-center gap-2",children:[r&&e.jsx(T.Item,{children:e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx(_,{loading:g,type:"primary",htmlType:"submit",children:"Save"}),e.jsx(_,{disabled:g,type:"danger",onClick:H,children:"Cancel"})]})}),e.jsx(Ce,{permission:"delete-task",values:{status:n==null?void 0:n.status,id:s},deleteThunk:qs,icon:e.jsx(Y,{className:"inline w-auto px-2 py-1 bg-gray-400/10",color:"gray",children:e.jsx("span",{className:"text-xs text-gray-500",children:"Delete "})}),onSuccess:()=>{l(U(null)),l(K.util.invalidateTags(["Tasks"]))}})]})]}),e.jsxs("div",{className:"flex gap-10 justify-between",children:[e.jsxs("div",{className:"flex flex-col gap-2 p-3 w-full",children:[e.jsx(T.Item,{className:"w-full",label:"Task Name",name:"name",children:e.jsx(ne,{bordered:!1,suffix:e.jsx(W,{}),className:"md:ml-5"})}),e.jsx(T.Item,{className:"flex flex-col",label:"Assignee",name:"assigneeId",tooltip:"Change the assignee of this Task",children:e.jsx(j,{bordered:!1,loading:b,className:"md:ml-5",children:o==null?void 0:o.map(t=>e.jsxs(j.Option,{value:t.id,children:[t==null?void 0:t.firstName," ",t==null?void 0:t.lastName]},t.id))})}),e.jsx(T.Item,{className:"flex flex-col",label:"Task Priority",name:"priorityId",children:e.jsx(j,{bordered:!1,loading:p,className:"md:ml-5",children:y==null?void 0:y.map(t=>e.jsx(j.Option,{value:t.id,children:t.name},t.id))})}),e.jsx(T.Item,{className:"flex flex-col",label:"Task Type",name:"taskTypeId",children:e.jsx(j,{bordered:!1,className:"md:ml-5",loading:c,children:m==null?void 0:m.map(t=>e.jsx(j.Option,{value:t==null?void 0:t.id,children:t==null?void 0:t.taskTypeName},t==null?void 0:t.id))})}),e.jsx(T.Item,{className:"flex flex-col",label:"Task Status",name:"crmTaskStatusId",children:e.jsx(j,{bordered:!1,className:"md:ml-5",loading:x,children:i==null?void 0:i.map(t=>e.jsx(j.Option,{value:t.id,children:t==null?void 0:t.taskStatusName},t.id))})})]}),e.jsxs("div",{className:"flex flex-col gap-2 p-3 w-full",children:[e.jsx(T.Item,{className:"flex flex-col",label:"Company",name:"companyId",children:e.jsx(j,{bordered:!1,className:"md:ml-5",loading:N,children:f==null?void 0:f.map(t=>e.jsx(j.Option,{value:t.id,children:t==null?void 0:t.companyName},t.id))})}),e.jsx(T.Item,{className:"flex flex-col",label:"Contact",name:"contactId",children:e.jsx(j,{bordered:!1,className:"md:ml-5",loading:w,children:k==null?void 0:k.map(t=>e.jsxs(j.Option,{value:t.id,children:[t==null?void 0:t.firstName," ",t==null?void 0:t.lastName]},t.id))})}),e.jsx(T.Item,{className:"flex flex-col",label:"Opportunity",name:"opportunityId",children:e.jsx(j,{bordered:!1,className:"md:ml-5",loading:D,children:I==null?void 0:I.map(t=>e.jsx(j.Option,{value:t==null?void 0:t.id,children:t.opportunityName},t==null?void 0:t.id))})}),e.jsx(T.Item,{className:"flex flex-col",label:"Quote",name:"quoteId",children:e.jsx(j,{bordered:!1,className:"md:ml-5",loading:h,children:P==null?void 0:P.map(t=>e.jsx(j.Option,{value:t.id,children:t.quoteName},t.id))})}),e.jsx(T.Item,{label:"Start date",name:"startDate",children:e.jsx(Z,{bordered:!1,suffix:e.jsx(W,{}),className:"md:ml-5"})}),e.jsx(T.Item,{label:"End date",name:"endDate",children:e.jsx(Z,{bordered:!1,suffix:e.jsx(W,{}),className:"md:ml-5"})})]})]}),e.jsx(T.Item,{label:"Description",name:"description",children:e.jsx(ne.TextArea,{bordered:!1,className:"md:ml-5"})})]})})}):e.jsx(be,{className:"h-full"})})})}function fa({edit:s}){var o,b,y;const a=O(),[l]=we(),{data:r,isLoading:d}=Vs(s==null?void 0:s.projectId),n=p=>{const m=String(p.target.value).trim();m!==s.name&&l({id:s.id,values:{name:m}})},g=p=>{l({id:s.id,values:{taskStatusId:p}})};return e.jsx(e.Fragment,{children:e.jsx(Te,{title:e.jsx("span",{className:"w-full",children:e.jsxs("div",{className:"flex gap-2",children:[e.jsx(vs,{size:23,className:"m-2 mx-0"}),e.jsxs("span",{className:"flex flex-col w-full",children:[e.jsx(ne,{defaultValue:s==null?void 0:s.name,className:"bg-transparent focus:bg-white w-full py-2 pl-0 focus:pl-2",bordered:!1,onBlur:n}),e.jsxs("span",{className:"text-xs taskBoard",children:["in list"," ",(o=s==null?void 0:s.taskStatus)!=null&&o.name?e.jsx(j,{defaultValue:(b=s==null?void 0:s.taskStatus)==null?void 0:b.id,onChange:g,className:"w-40",loading:d,children:r==null?void 0:r.map(p=>e.jsx(j.Option,{value:p.id,children:p.name},p.id))}):(y=s==null?void 0:s.crmTaskStatus)==null?void 0:y.taskStatusName]})]})]})}),open:s,onClose:()=>a(U(null)),className:"md:w-[80%] xl:w-[50%] p-2",children:(s==null?void 0:s.type)==="crm"?e.jsx(xa,{id:s.id}):e.jsx(ha,{data:s})})})}function Fa(){const s=O(),[a,l]=u.useState({page:1,count:10}),{data:r,error:d,isLoading:n,isSuccess:g,isError:o}=zs(a),{edit:b}=S(i=>i.task),y=[{id:1,title:"id",dataIndex:"id",key:"task"},{id:2,title:"Name",dataIndex:"name",render:(i,x)=>e.jsx("span",{className:"cursor-pointer",onClick:()=>s(U(x)),children:i}),key:"name",tdClass:"whitespace-normal"},{title:"Priority",key:"priority",dataIndex:"priority",render:i=>i==null?void 0:i.name,renderCsv:i=>i==null?void 0:i.name},{title:"Type",key:"type",dataIndex:"type"},{id:3,title:"Status",key:"status",render:({type:i,crmTaskStatus:x,taskStatus:f})=>i==="crm"?x==null?void 0:x.taskStatusName:f==null?void 0:f.name,renderCsv:({type:i,crmTaskStatus:x,taskStatus:f})=>i==="crm"?x==null?void 0:x.taskStatusName:f==null?void 0:f.name}],p=[{label:"Type",key:"type",options:[{label:"Crm Task",value:"crm"},{label:"Project Task",value:"project"}],mode:"single",className:"min-w-[80px] max-w-[150px]",popupClassName:"w-[150px]"},{label:"Status",key:"status",options:[{label:"Show",value:"true"},{label:"Hide",value:"false"}],mode:"single",className:"min-w-[80px] max-w-[150px]",popupClassName:"w-[150px]"}],m=()=>{l(i=>i.query!=="myTask"?{...i,page:1,count:10,query:"myTask"}:{page:1,count:10})},c=e.jsx("div",{onClick:m,className:te("h-8 bg-[#D7D7D7] px-2 text-center rounded-[5px] flex items-center cursor-pointer",{"bg-[#1890ff] text-white":a.query==="myTask"}),children:"My Task"});return e.jsxs(ke,{className:"max-md:border-0 max-md:bg-white",bodyClass:"max-md:p-0",headClass:"border-none",title:"Task",children:[e.jsx(Bs,{permission:"readAll-task",children:e.jsx(Os,{list:r==null?void 0:r.getAllTask,total:r==null?void 0:r.totalTask,columns:y,loading:n,setPageConfig:l,title:"Task list",filters:p,isSearch:!0,card:i=>e.jsx(Ks,{data:i}),extraFilter:c,defaultView:"card"})}),e.jsx(fa,{edit:b})]})}export{Fa as default};
