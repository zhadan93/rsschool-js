(()=>{"use strict";var e={471:(e,t,a)=>{a.r(t)},431:(e,t,a)=>{a.r(t)},307:(e,t,a)=>{a.r(t)},507:function(e,t,a){var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const s=r(a(723));t.default=class{constructor(e){this.onChange=new s.default,this._data=e}get data(){return this._data}set data(e){this._data=e,this.onChange.emit(this._data)}}},717:function(e,t,a){var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const s=r(a(436)),o=r(a(868)),i=r(a(688)),l=r(a(3)),n=r(a(385)),d=r(a(507)),c=r(a(727)),u=r(a(943)),f=r(a(758));a(281),t.default=class{constructor(e=i.default){this.data=e;let t={selectedCards:[],cartProductCount:0};t=u.default.getStorage("savedCartState")||t,this.cartState=new d.default(t),this.cartState.onChange.add((e=>{this.header.cartContent=e.cartProductCount}));const a=u.default.getStorage("savedCardState");let r={filters:{colors:[],producers:[],materials:[],favorites:[]},sort:"name_asc",resultCardData:this.data};r=a?Object.assign(Object.assign({},a),{resultCardData:this.data}):r,this.cardState=new d.default(r),this.cardState.onChange.add((e=>{e.resultCardData&&this.cardContainer.draw(e.resultCardData)})),this.header=new n.default(document.body,"header","header",this.cartState);const h=new s.default(document.body,"main","main"),_=new s.default(h.node,"div","container container__main");this.filterContainer=new c.default(_.node,"div","filters",{cartState:this.cartState,cardState:this.cardState}),this.filterContainer.draw(this.data),this.cardContainer=new o.default(_.node,"ul","cards",this.cartState),f.default.filterByAll(e,this.cardState),new l.default(document.body,"footer","footer"),window.addEventListener("beforeunload",(()=>{u.default.setStorage("savedCartState",this.cartState.data),u.default.setStorage("savedCardState",{filters:this.cardState.data.filters,sort:this.cardState.data.sort})}))}}},895:function(e,t,a){var r=this&&this.__rest||function(e,t){var a={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(a[r]=e[r]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var s=0;for(r=Object.getOwnPropertySymbols(e);s<r.length;s++)t.indexOf(r[s])<0&&Object.prototype.propertyIsEnumerable.call(e,r[s])&&(a[r[s]]=e[r[s]])}return a},s=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const o=s(a(436)),i=s(a(678)),l=a(601);class n extends o.default{constructor(e,t="div",a=""){super(e,t,a)}createCard(e){const{id:t,name:a,favorite:s}=e,n=r(e,["id","name","favorite"]);new o.default(this.node,"h3","card__name",`${a}`),new i.default(this.node,"img","card__img",`./content/${t}.jpg`,`${a}`);const d=new o.default(this.node,"div","card__characteristics");l.CARD_CONTENT.forEach((({field:e,content:t})=>{let a=n[e];"favorite"===e&&(a=s?"да":"нет");let r=`${t} ${a}`;if("quantity"===e){const[e,s]=t.split(" ");r=`${e} ${a} ${s}`}new o.default(d.node,"div",`card__${e}`,`${r}`)}))}}t.default=n},868:function(e,t,a){var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const s=r(a(436)),o=r(a(895)),i=a(601),l=r(a(883)),n=a(601);a(471);const d="card--active",{fullCartAlert:c,emptyFilterResultAlert:u}=n.ALERTS;class f extends s.default{constructor(e,t="div",a="",r){super(e,t,a),this.state=r,this.cards=new Map,this.selectedCards=new Set}draw(e){this.cards.forEach((e=>e.destroy())),this.node.textContent="",l.default.removeClass(this.node,"cards--empty"),e.forEach((e=>{const{id:t}=e,a=new o.default(this.node,"li","card");a.createCard(e),this.cards.set(t,a);const r=a.node;this.selectedCards=new Set(this.state.data.selectedCards),this.selectedCards.has(t)&&l.default.toggleClass(r,d),r.addEventListener("click",(()=>{this.selectedCards.size>=i.MAX_CART_COUNT?alert(c):(this.selectedCards.has(t)?this.selectedCards.delete(t):this.selectedCards.add(t),l.default.toggleClass(r,d)),this.state.data=Object.assign(Object.assign({},this.state.data),{selectedCards:[...this.selectedCards],cartProductCount:this.selectedCards.size})}))})),0===e.length&&(this.node.textContent=u,l.default.addClass(this.node,"cards--empty"))}}t.default=f},121:function(e,t,a){var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const s=r(a(436)),o=r(a(370)),i=r(a(404)),l=r(a(720)),n=r(a(384)),d=r(a(562)),c=r(a(758)),u=a(601),[f,h]=["filters__by-value","reset-btn"],[_,v]=u.FILTER_GROUP_TITLES,{filterByProducerTitle:p,filterByColorTitle:m,filterByMaterialTitle:y,filterByFavoriteTitle:g,sortingTitle:w}=u.FILTER_TITLE,{resetFilterBtnName:C,resetSettingsBtnName:S}=u.RESET_BTN_NAME;class T extends s.default{constructor(e,t="div",a="",r="",u,T){if(super(e,t,a),this.state=T,new s.default(this.node,"h3","filters__title",r),r===_&&(new i.default(this.node,"div",`${f} filters__by-value--producer`,p,this.state.cardState).draw(u),new o.default(this.node,"div",f,m,this.state.cardState).draw(u),new l.default(this.node,"div",`${f} filters__by-value--material`,y,this.state.cardState).draw(u),new n.default(this.node,"div",f,g,this.state.cardState).draw(u)),r===v){const e=new s.default(this.node,"input","search");e.node.focus(),e.node.placeholder="Введите текст",e.node.autocomplete="off",new s.default(this.node,"h3","filters__title",w),new d.default(this.node,"div",f,"",this.state.cardState).draw();const t=new s.default(this.node,"div","reset-container");new s.default(t.node,"button",h,C).node.addEventListener("click",(()=>{const e=c.default.sort(u,this.state.cardState.data.sort);c.default.resetFilters(this.state.cardState),this.state.cardState.data=Object.assign(Object.assign({},this.state.cardState.data),{resultCardData:e})})),new s.default(t.node,"button",h,S).node.addEventListener("click",(()=>{c.default.resetFilters(this.state.cardState);const e=c.default.resetSortToDefault(u,this.state.cardState);this.state.cartState.data=Object.assign(Object.assign({},this.state.cardState.data),{selectedCards:[],cartProductCount:0}),this.state.cardState.data=Object.assign(Object.assign({},this.state.cardState.data),{resultCardData:e})}))}}}t.default=T},727:function(e,t,a){var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const s=r(a(436)),o=r(a(121)),i=a(601);a(431);class l extends s.default{constructor(e,t="div",a="",r){super(e,t,a),this.state=r}draw(e){i.FILTER_GROUP_TITLES.forEach((t=>new o.default(this.node,"div","filters__group",t,e,this.state)))}}t.default=l},758:function(e,t,a){var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const s=r(a(436)),o=r(a(883));class i extends s.default{constructor(e,t="div",a="",r="",s){super(e,t,a,r),i.filters.set(s,this.node)}static sort(e,t){const[a,r]=t.split("_");let s;return s=isFinite(+e[0][a])?(e,t)=>"asc"===r?+e[a]-+t[a]:+t[a]-+e[a]:(e,t)=>e[a]>t[a]?"asc"===r?1:-1:e[a]<t[a]?"asc"===r?-1:1:0,e.sort(s)}static filterByAll(e,t){const a=new Map(Object.entries(t.data.filters).filter((([,e])=>e.length)));let r=e,s=[],o=0;for(const[e,t]of a)o++,o>1&&(r=[...s],s=[]),t.forEach((t=>{s.push(...i.filterBy(r,e.slice(0,-1),t))}));s=Array.from(new Set(s)),s=a.size?s:e,s.length&&(s=i.sort(s,t.data.sort)),t.data=Object.assign(Object.assign({},t.data),{resultCardData:s})}static resetFilters(e){Object.entries(e.data.filters).filter((([,e])=>e.length)).forEach((([t,a])=>{a.forEach((e=>{const a=i.filters.get(e);if(a instanceof HTMLInputElement)a.checked=!1;else if(a){const e=t.slice(0,-1)+"-list__item--active";o.default.toggleClass(a,e)}})),e.data.filters[t]=[]}))}static resetSortToDefault(e,t){t.data.sort="name_asc";const a=i.filters.get(t.data.sort);return a instanceof HTMLOptionElement&&(a.selected=!0),i.sort(e,t.data.sort)}static filterBy(e,t,a){return e.filter((e=>{const r=e[t];return"boolean"==typeof r?""+r===a:r.split(", ").includes(a)}))}}t.default=i,i.filters=new Map},370:function(e,t,a){var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const s=r(a(436)),o=a(601),i=r(a(883)),l=r(a(758)),n="color-list__item--active";class d extends s.default{constructor(e,t="div",a="",r="",s){super(e,t,a,r),this.state=s,this.selectedColorFilters=new Set}draw(e){const t=new s.default(this.node,"ul","color-list");this.selectedColorFilters=new Set(this.state.data.filters.colors);const a=[];e.forEach((e=>a.push(...e.color.split(", ")))),Array.from(new Set(a)).forEach((a=>{var r;const s=null===(r=o.COLORS.find((({value:e})=>e===a)))||void 0===r?void 0:r.name,d=new l.default(t.node,"li",`color-list__item color-list__item--${s}`,"",a);d.node.title=`${a}`;const c=d.node;this.selectedColorFilters.has(a)&&i.default.toggleClass(c,n),c.addEventListener("click",(()=>{this.selectedColorFilters=new Set(this.state.data.filters.colors),this.selectedColorFilters.has(a)?this.selectedColorFilters.delete(a):this.selectedColorFilters.add(a),i.default.toggleClass(c,n),this.state.data.filters.colors=Array.from(this.selectedColorFilters),l.default.filterByAll(e,this.state)}))}))}}t.default=d},384:function(e,t,a){var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const s=r(a(436)),o=r(a(758)),i=r(a(883)),l="favorite__item--active";class n extends s.default{constructor(e,t="div",a="",r="",s){super(e,t,a,r),this.state=s,this.selectedFavoriteFilters=new Set}draw(e){const t=new s.default(this.node,"div","true");this.selectedFavoriteFilters=new Set(this.state.data.filters.favorites);const a=new s.default(t.node,"label","favorite__label"),r=new o.default(a.node,"input","favorite__input","","true");r.node.type="checkbox";const n=a.node;this.selectedFavoriteFilters.has("true")&&(i.default.toggleClass(n,l),r.node.checked=!0),n.addEventListener("click",(()=>{this.selectedFavoriteFilters=new Set(this.state.data.filters.favorites),this.selectedFavoriteFilters.has("true")?this.selectedFavoriteFilters.delete("true"):this.selectedFavoriteFilters.add("true"),i.default.toggleClass(n,l),this.state.data.filters.favorites=Array.from(this.selectedFavoriteFilters),o.default.filterByAll(e,this.state)}))}}t.default=n},720:function(e,t,a){var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const s=r(a(436)),o=r(a(758)),i=r(a(883)),l="material-list__item--active";class n extends s.default{constructor(e,t="div",a="",r="",s){super(e,t,a,r),this.state=s,this.selectedMaterialFilters=new Set}draw(e){const t=new s.default(this.node,"ul","material-list");this.selectedMaterialFilters=new Set(this.state.data.filters.materials);const a=[];e.forEach((e=>a.push(...e.material.split(", ")))),Array.from(new Set(a)).forEach((a=>{const r=new o.default(t.node,"li","material-list__item",a,a).node;this.selectedMaterialFilters.has(a)&&i.default.toggleClass(r,l),r.addEventListener("click",(()=>{this.selectedMaterialFilters=new Set(this.state.data.filters.materials),this.selectedMaterialFilters.has(a)?this.selectedMaterialFilters.delete(a):this.selectedMaterialFilters.add(a),i.default.toggleClass(r,l),this.state.data.filters.materials=Array.from(this.selectedMaterialFilters),o.default.filterByAll(e,this.state)}))}))}}t.default=n},404:function(e,t,a){var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const s=r(a(436)),o=r(a(758)),i=r(a(883)),l="producer-list__item--active";class n extends s.default{constructor(e,t="div",a="",r="",s){super(e,t,a,r),this.state=s,this.selectedProducerFilters=new Set}draw(e){const t=new s.default(this.node,"ul","producer-list");this.selectedProducerFilters=new Set(this.state.data.filters.producers);const a=[];e.forEach((e=>a.push(...e.producer.split(", ")))),Array.from(new Set(a)).forEach((a=>{const r=new o.default(t.node,"li","producer-list__item",a,a).node;this.selectedProducerFilters.has(a)&&i.default.toggleClass(r,l),r.addEventListener("click",(()=>{this.selectedProducerFilters=new Set(this.state.data.filters.producers),this.selectedProducerFilters.has(a)?this.selectedProducerFilters.delete(a):this.selectedProducerFilters.add(a),i.default.toggleClass(r,l),this.state.data.filters.producers=Array.from(this.selectedProducerFilters),o.default.filterByAll(e,this.state)}))}))}}t.default=n},562:function(e,t,a){var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const s=r(a(436)),o=a(601),i=r(a(758));class l extends s.default{constructor(e,t="div",a="",r="",s){super(e,t,a,r),this.state=s,this.selectedSort=""}draw(){const e=new s.default(this.node,"select","sort");this.selectedSort=this.state.data.sort;const t=e.node;t.addEventListener("click",(e=>{if(e.target instanceof HTMLElement){const{value:t}=e.target;if(this.selectedSort!==t){this.selectedSort=t;const e=this.state.data.resultCardData;let a=[];e.length&&(a=i.default.sort(e,t)),this.state.data=Object.assign(Object.assign({},this.state.data),{sort:this.selectedSort,resultCardData:a})}}})),o.SORT_BY.forEach((({value:e,label:a})=>{const r=new i.default(t,"option","sort__item",a,e);this.selectedSort===e&&(r.node.selected=!0),r.node.value=e}))}}t.default=l},3:function(e,t,a){var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const s=r(a(436)),o=r(a(835)),i=r(a(713)),l=r(a(334)),n=r(a(871)),d=a(601),{copyright:c,year:u,github:f,rss:h}=d.FOOTER_CONTENT,{githubPath:_,rssPath:v}=d.FOOTER_LINKS;class p extends s.default{constructor(e,t="div",a=""){super(e,t,a);const r=new s.default(this.node,"div","container footer__container"),d=new s.default(r.node,"div","author");new s.default(d.node,"div","copyright",c),new s.default(d.node,"div","year",u),new o.default(d.node,"a","github",f,_,"_blank");const p=new o.default(r.node,"a","rss__link",h,v,"_blank"),m=new l.default(p.node,"svg","icon rss-logo__icon");new n.default(m.node,"use",`${i.default}#rss_logo`)}}t.default=p},385:function(e,t,a){var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const s=r(a(436)),o=r(a(835)),i=r(a(334)),l=r(a(871)),n=r(a(713)),d=a(601),c=r(a(883)),{logoTitle:u,cartContent:f}=d.HEADER_CONTENT;class h extends s.default{constructor(e,t="div",a="",r){super(e,t,a),this.state=r;const d=new s.default(this.node,"div","container header__container"),_=new s.default(d.node,"div","logo"),v=new i.default(_.node,"svg","icon logo__icon");new l.default(v.node,"use",`${n.default}#logo`);const p=new s.default(_.node,"h1","logo__title");new o.default(p.node,"a","logo__link",u,"#");const m=new s.default(d.node,"div","shopping-cart",f),y=this.state.data.cartProductCount||"",g=new s.default(m.node,"div","shopping-cart__count",`${y}`);this.cartCount=g.node,y>0&&c.default.addClass(this.cartCount,h.activeCartClassName)}set cartContent(e){1===e?c.default.addClass(this.cartCount,h.activeCartClassName):0===e&&c.default.removeClass(this.cartCount,h.activeCartClassName);const t=e||"";this.cartCount.innerHTML=`${t}`}}t.default=h,h.activeCartClassName="shopping-cart__count--active"},835:function(e,t,a){var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const s=r(a(436));class o extends s.default{constructor(e,t="div",a="",r="",s="",o=""){super(e,t,a,r),this.node.href=s,this.node.target=o}}t.default=o},436:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.default=class{constructor(e,t="div",a="",r=""){const s=document.createElement(t);s.className=a,s.textContent=r,e&&e.appendChild(s),this.node=s}destroy(){this.node.remove()}}},678:function(e,t,a){var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const s=r(a(436));class o extends s.default{constructor(e,t="div",a="",r="",s=""){super(e,t,a),this.node.src=r,this.node.alt=s}}t.default=o},334:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.default=class{constructor(e,t="svg",a){const r=document.createElementNS("http://www.w3.org/2000/svg",t);a&&a.split(" ").forEach((e=>r.classList.add(e))),e&&e.appendChild(r),this.node=r}destroy(){this.node.remove()}}},871:function(e,t,a){var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const s=r(a(334));class o extends s.default{constructor(e,t="use",a){super(e,t),this.node.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",a)}}t.default=o},943:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.default=class{static getStorage(e){const t=window.localStorage.getItem(e);let a=null;return t&&(a=JSON.parse(t)),a}static setStorage(e,t){window.localStorage.setItem(e,JSON.stringify(t))}}},723:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.default=class{constructor(e=[]){this.listeners=e}add(e){this.listeners.push(e)}remove(e){this.listeners=this.listeners.filter((t=>t!==e))}emit(e){this.listeners.forEach((t=>t(e)))}}},883:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.default=class{static toggleClass(e,t){e.classList.toggle(t)}static addClass(e,t){e.classList.add(t)}static removeClass(e,t){e.classList.remove(t)}}},281:()=>{console.log("Online store task"),console.log("Самооценка (85/200):"),console.log('\nПункты задания.\n✔️ 1. Страница с товарами содержит карточки всех товаров а также фильтры по значению, строку поиска, поле для сортировки (8/10)\n\n✔️ 2. Карточка товара содержит его изображение, название, количество данного товара на складе, год выхода на рынок, цвет, производитель и т.д., находится ли товар в корзине (10/10)\n\n✔️ 3. Добавление товаров в корзину (20/20)\n+ кликая по карточке с товаром или по кнопке на нем, товар можно добавлять в корзину или удалять. Карточки добавленных в корзину товаров внешне отличаются от остальных (10/10)\n+ на странице отображается количество добавленных в корзину товаров. При попытке добавить в корзину больше 20 товаров, выводится всплывающее уведомление с текстом "Извините, все слоты заполнены" (10/10)\n\n✔️ 4. Сортировка (20/20)\n+ сортируются только те товары, которые в данный момент отображаются на странице\n+ сортировка товаров по названию в возрастающем и спадающем порядке (10/10)\n+ сортировка товаров по году их приобретения в возрастающем и спадающем порядке (10/10)\n\n    5. Фильтры в указанном диапазоне от и до (0/30)\n- фильтры по количеству экземпляров +10\n- фильтры по году покупки +10\n- для фильтрации в указанном диапазоне используется range slider с двумя ползунками. При перемещении ползунков отображается их текущее значение, разный цвет слайдера до и после ползунка +10\n\n✔️ 6. Фильтры по значению (30/30)\n+ Выбранные фильтры выделяются стилем.\n+ фильтры по форме +5\n+ фильтры по цвету +5\n+ фильтры по размеру +5\n+ можно отобразить только популярные товары +5\n+ можно отфильтровать товары по нескольким фильтрам одного типа +10\n\n✔️ 7. Можно отфильтровать товары по нескольким фильтрам разного типа (20/20)\n+ Для нескольких фильтров разного типа отображаются только те товары, которые соответствуют всем выбранным фильтрам.\n  Например, можно отобразить только красные товары. Или популярные белые и красные товары впоступившие на рынок в 2010-2020 годах.\n  Если товаров, соответствующих всем выбранным фильтрам нет, на странице выводится уведомление в человекочитаемом формате, например, "Извините, совпадений не обнаружено"\n\n   8. Сброс фильтров (10/20)\n+ есть кнопка reset для сброса фильтров (10/10)\n+ Кнопка reset сбрасывает только фильтры, не влияя на порядок сортировки или товары, добавленные в избранное.\n+ После использования кнопки reset фильтры остаются работоспособными\n- при сбросе фильтров кнопкой reset, ползунки range slider сдвигаются к краям, значения ползунков возвращаются к первоначальным, range slider закрашивается одним цветом +10\n\n   9. Сохранение настроек в local storage (0/10)\nвыбранные пользователем фильтры, порядок сортировки, добавленные в избранное товара сохраняются при перезагрузке страницы. Есть кнопка сброса настроек, которая очищает local storage +10\n\n   10. Поиск (6/30)\n+ при открытии приложения курсор находится в поле поиска (2/2)\n+ автозаполнение поля поиска отключено (нет выпадающего списка с предыдущими запросами) (2/2)\n+ есть placeholder (2/2)\n- в поле поиска есть крестик, позволяющий очистить поле поиска +2\n- если нет совпадения последовательности букв в поисковом запросе с названием товара, выводится уведомление в человекочитаемом формате, например "Извините, совпадений не обнаружено" +2\n- при вводе поискового запроса на странице остаются только те товары, в которых есть указанные в поиске буквы в указанном порядке. При этом не обязательно, чтобы буквы были в начале слова. Регистр символов при поиске не учитывается +10\n  Поиск ведётся только среди товаров, которые в данный момент отображаются на странице.\n- если очистить поле поиска, на странице отображаются товары, соответствующие всем выбранным фильтрам и настройкам сортировки +10\n'),console.log("Итого: 124/200")},601:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.RESET_BTN_NAME=t.FILTER_TITLE=t.SORT_BY=t.FILTER_GROUP_TITLES=t.MAX_CART_COUNT=t.COLORS=t.ALERTS=t.CARD_CONTENT=t.FOOTER_LINKS=t.FOOTER_CONTENT=t.HEADER_CONTENT=void 0,t.HEADER_CONTENT={logoTitle:"Online Store",cartContent:"Корзина"},t.FOOTER_CONTENT={copyright:"©",year:"2022",github:"github",rss:""},t.FOOTER_LINKS={githubPath:"https://github.com/zhadan93",rssPath:"https://rs.school/js/"},t.CARD_CONTENT=[{field:"quantity",content:"Осталось шт."},{field:"year",content:"Год выхода:"},{field:"producer",content:"Производитель:"},{field:"color",content:"Цвет:"},{field:"material",content:"Материал корпуса:"},{field:"favorite",content:"Популярный:"}],t.ALERTS={fullCartAlert:"Извините, все слоты заполнены",emptyFilterResultAlert:"Извините, совпадений не найдено"},t.COLORS=[{name:"beige",value:"бежевый"},{name:"white",value:"белый"},{name:"graphite",value:"графитовый"},{name:"red",value:"красный"},{name:"silver",value:"серебристый"},{name:"black",value:"черный"}],t.MAX_CART_COUNT=20,t.FILTER_GROUP_TITLES=["Фильтры по значению","Поиск"],t.SORT_BY=[{value:"name_asc",label:"По названию, от А до Я"},{value:"name_desc",label:"По названию, от Я до А"},{value:"year_asc",label:"По году, по возрастанию"},{value:"year_desc",label:"По году, по убыванию"},{value:"quantity_asc",label:"По количеству, по возрастанию"},{value:"quantity_desc",label:"По количеству, по убыванию"}],t.FILTER_TITLE={filterByProducerTitle:"Производитель:",filterByColorTitle:"Цвет:",filterByMaterialTitle:"Материал:",filterByFavoriteTitle:"Только популярные:",sortingTitle:"Сортировка"},t.RESET_BTN_NAME={resetFilterBtnName:"Сброс фильтров",resetSettingsBtnName:"Сброс настроек"}},688:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.default=[{id:"1",name:"Bork K702",quantity:"7",year:"2017",producer:"Bork",color:"серебристый",material:"нерж. сталь, стекло",favorite:!0},{id:"2",name:"Tefal Element KI280D30",quantity:"12",year:"2018",producer:"Tefal",color:"серебристый, черный",material:"нерж. сталь",favorite:!0},{id:"3",name:"Tefal Smart&Light KO851830",quantity:"5",year:"2017",producer:"Tefal",color:"черный",material:"нерж. сталь",favorite:!1},{id:"4",name:"Tefal Snow Control KO331830",quantity:"17",year:"2015",producer:"Tefal",color:"черный",material:"пластик",favorite:!1},{id:"5",name:"Tefal Glass KI720830",quantity:"6",year:"2016",producer:"Tefal",color:"серебристый, черный",material:"нерж. сталь, стекло",favorite:!1},{id:"6",name:"Bork K810",quantity:"15",year:"2019",producer:"Bork",color:"серебристый",material:"нерж. сталь, стекло",favorite:!0},{id:"7",name:"Bork K703",quantity:"9",year:"2017",producer:"Bork",color:"серебристый",material:"нерж. сталь",favorite:!0},{id:"8",name:"Kenwood SJM110",quantity:"12",year:"2011",producer:"Kenwood",color:"серебристый, черный",material:"нерж. сталь",favorite:!1},{id:"9",name:"Bork K800",quantity:"17",year:"2017",producer:"Bork",color:"серебристый",material:"нерж. сталь",favorite:!1},{id:"10",name:"Tefal KI840830",quantity:"13",year:"2014",producer:"Tefal",color:"черный",material:"пластик, стекло",favorite:!0},{id:"11",name:"Kenwood RU0W21000010 (ZJG112CL)",quantity:"4",year:"2012",producer:"Kenwood",color:"серебристый",material:"нерж. сталь, стекло",favorite:!1},{id:"12",name:"Bork K703 Champagne",quantity:"25",year:"2017",producer:"Bork",color:"бежевый",material:"нерж. сталь",favorite:!1},{id:"13",name:"Kenwood Sense ZJM401TT Silver/White",quantity:"1",year:"2019",producer:"Kenwood",color:"серебристый, белый",material:"нерж. сталь",favorite:!1},{id:"14",name:"Kenwood Kmix SKM-031 Red",quantity:"0",year:"2017",producer:"Kenwood",color:"красный",material:"нерж. сталь",favorite:!1},{id:"15",name:"Bork K781",quantity:"4",year:"2017",producer:"Bork",color:"белый",material:"керамика",favorite:!1},{id:"16",name:"Kenwood SKM-034",quantity:"4",year:"2016",producer:"Kenwood",color:"белый",material:"нерж. сталь",favorite:!1},{id:"17",name:"Tefal Confidence KI270930",quantity:"2",year:"2016",producer:"Tefal",color:"графитовый",material:"нерж. сталь",favorite:!1},{id:"18",name:"Kenwood ZJM 810 RD Mesmerine",quantity:"4",year:"2015",producer:"Kenwood",color:"красный",material:"нерж. сталь",favorite:!1},{id:"19",name:"Kenwood JKP210 WHITE",quantity:"0",year:"2011",producer:"Kenwood",color:"белый",material:"пластик",favorite:!1},{id:"20",name:"Bork K780",quantity:"5",year:"2018",producer:"Bork",color:"серебристый",material:"aлюминий, стекло",favorite:!1},{id:"21",name:"Kenwood ZJG801CL",quantity:"3",year:"2011",producer:"Kenwood",color:"серебристый, черный",material:"нерж. сталь, стекло",favorite:!1},{id:"22",name:"Tefal KI740B30",quantity:"10",year:"2015",producer:"Tefal",color:"серебристый",material:"нерж. сталь, стекло",favorite:!0},{id:"23",name:"Bork K515",quantity:"13",year:"2019",producer:"Bork",color:"серебристый, черный",material:"нерж. сталь, стекло",favorite:!1},{id:"24",name:"Bork K811",quantity:"5",year:"2019",producer:"Bork",color:"серебристый, черный",material:"стекло, пластик",favorite:!0},{id:"25",name:"Tefal BI520D10",quantity:"12",year:"2011",producer:"Tefal",color:"серебристый, черный",material:"нерж. сталь",favorite:!1}]},607:function(e,t,a){var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const s=r(a(717));a(307),new s.default},713:(e,t,a)=>{e.exports=a.p+"assets/svg/7c5a696586683637eeda.svg"}},t={};function a(r){var s=t[r];if(void 0!==s)return s.exports;var o=t[r]={exports:{}};return e[r].call(o.exports,o,o.exports,a),o.exports}a.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),a.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},(()=>{var e;a.g.importScripts&&(e=a.g.location+"");var t=a.g.document;if(!e&&t&&(t.currentScript&&(e=t.currentScript.src),!e)){var r=t.getElementsByTagName("script");r.length&&(e=r[r.length-1].src)}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),a.p=e})(),a(607)})();