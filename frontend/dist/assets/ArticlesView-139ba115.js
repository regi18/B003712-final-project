import{j as h,A as y,_ as w,h as S,o,c as r,d as l,t as d,w as m,k as f,F as c,r as _,e as v,v as N,l as b,i as g,p as k,b as x}from"./main-102df46f.js";import{S as T}from"./SummaryArticle-9553fad3.js";const I={name:"ArticlesView",components:{SummaryArticle:T},created(){this.init()},methods:{async init(){if(this.items=null,this.section=this.$route.params.section,this.section&&this.section!=="all")try{let t=await h("sections/"+this.section);this.sectionTitle=t.title}catch{this.$router.push({path:"/404"})}else this.$route.name==="articles-by-issue"?(this.sectionTitle="Issue No. "+this.$route.params.issue,this.section=null,this.issueNumber=+this.$route.params.issue):(this.sectionTitle="All Articles",this.section=null,this.sections=await h("sections").then(t=>t.reduce((s,u)=>({...s,[u.slug]:u}),{})),this.issueNumbers=await h("issues"));this.load()},async load(){this.items=await y.getAll(null,this.section,this.issueNumber)},onSearch(t){console.log(this.searchText)}},computed:{isAllArticles(){return this.$route.name==="all-articles"},filteredItems(){var t;return((t=this.items)==null?void 0:t.filter(s=>s.title.toLowerCase().includes(this.searchText.toLowerCase())))??[]}},watch:{$route(t,s){this.init()}},data(){return{items:null,section:"",sectionTitle:"",sections:null,issueNumber:null,issueNumbers:[],searchText:""}}};const a=t=>(k("data-v-3856aa41"),t=t(),x(),t),V={class:"staff-articles container"},C={key:0,class:"filters"},B={class:"filter",style:{flex:"2"}},L=a(()=>l("label",{for:""},"Departments",-1)),D=a(()=>l("option",{value:null},"All",-1)),U=["value"],F={class:"filter"},M=a(()=>l("label",{for:""},"Issue No.",-1)),j=a(()=>l("option",{value:null},"All",-1)),E=["value"],q={class:"search-bar"},z={key:1},G={key:2},H={class:"first-article"},J={class:"articles-wrapper"};function K(t,s,u,O,i,n){const p=S("SummaryArticle");return o(),r("div",V,[l("h1",null,d(i.sectionTitle),1),n.isAllArticles?(o(),r("div",C,[l("div",B,[L,m(l("select",{"onUpdate:modelValue":s[0]||(s[0]=e=>i.section=e),onChange:s[1]||(s[1]=e=>n.load())},[D,(o(!0),r(c,null,_(i.sections,e=>(o(),r("option",{key:e.slug,value:e.slug},d(e.title),9,U))),128))],544),[[f,i.section]])]),l("div",F,[M,m(l("select",{"onUpdate:modelValue":s[2]||(s[2]=e=>i.issueNumber=e),onChange:s[3]||(s[3]=e=>n.load())},[j,(o(!0),r(c,null,_(i.issueNumbers,e=>(o(),r("option",{key:e,value:e},d(e),9,E))),128))],544),[[f,i.issueNumber]])])])):v("",!0),l("div",q,[m(l("input",{type:"search","onUpdate:modelValue":s[4]||(s[4]=e=>i.searchText=e),placeholder:"Search"},null,512),[[N,i.searchText]])]),i.items?n.filteredItems.length===0?(o(),r("p",G,"No articles found.")):(o(),r(c,{key:3},[l("article",H,[b(p,{article:n.filteredItems[0],showSection:!i.section||n.isAllArticles,sections:i.sections},null,8,["article","showSection","sections"])]),l("div",J,[(o(!0),r(c,null,_(n.filteredItems,(e,A)=>(o(),r(c,{key:e.url},[A!==0?(o(),g(p,{key:0,article:e,showSection:!i.section||n.isAllArticles,sections:i.sections},null,8,["article","showSection","sections"])):v("",!0)],64))),128))])],64)):(o(),r("p",z,"Loading..."))])}const R=w(I,[["render",K],["__scopeId","data-v-3856aa41"]]);export{R as default};
