class t{async onFetchArticles(){const t=`https://pixabay.com/api/?q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true`,e=await fetch(t,this.options);return(await e.json()).then().then((t=>this.page.onIncrement()))}onIncrement(){this.page+=1}get query(){return this.searchQuery}set query(t){this.searchQuery=t}get actualOptions(){return this.options}set actualOptions(t){this.options=t}constructor(){this.page=1,this.searchQuery="",this.options={}}}t.actualOptions={headers:{Authorization:"31547025-6e47633566ca913046836177e"}},console.log(t.actualOptions);
//# sourceMappingURL=hw-js-11.95e9f764.js.map