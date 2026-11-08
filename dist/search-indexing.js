/* Canonicals and language alternatives for the existing static + JavaScript site.
 * No search-engine submission, analytics or external requests are performed here.
 */
(()=>{'use strict';
const BASE='https://www.wahaliqq.com',LANGS=['en','es','fr','pt'];
const titles={en:{home:'Women’s Activewear',women:'Women’s Activewear Collection',about:'About WAHALI',contact:'Contact WAHALI',custom:'Product Customization'},es:{home:'Ropa deportiva para mujer',women:'Colección de ropa deportiva para mujer',about:'Acerca de WAHALI',contact:'Contacta con WAHALI',custom:'Personalización de productos'},fr:{home:'Vêtements de sport pour femmes',women:'Collection de vêtements de sport pour femmes',about:'À propos de WAHALI',contact:'Contacter WAHALI',custom:'Personnalisation de produits'},pt:{home:'Moda esportiva feminina',women:'Coleção de moda esportiva feminina',about:'Sobre a WAHALI',contact:'Entre em contato com a WAHALI',custom:'Personalização de produtos'}};
const descriptions={en:'Explore WAHALI women’s activewear and reference colours. Discuss styles, quantities and customization with our team in Shenzhen.',es:'Explora la ropa deportiva femenina y los colores de referencia de WAHALI. Consulta estilos, cantidades y personalización con nuestro equipo en Shenzhen.',fr:'Découvrez les vêtements de sport féminins et les couleurs de référence WAHALI. Échangez avec notre équipe à Shenzhen sur les modèles, quantités et personnalisations.',pt:'Explore a moda esportiva feminina e as cores de referência WAHALI. Consulte modelos, quantidades e personalização com nossa equipe em Shenzhen.'};
function canonicalURL(path,lang,extra={}){const u=new URL(path,BASE);if(lang!=='en')u.searchParams.set('lang',lang);for(const[k,v]of Object.entries(extra))u.searchParams.set(k,v);return u.href}
function meta(name,content){let e=document.head.querySelector('meta[name="'+name+'"]');if(!e){e=document.createElement('meta');e.name=name;document.head.append(e)}e.content=content}
window.updateWahaliSearchIndexing=({page,design,lang,product})=>{
 const params=new URL(location.href).searchParams,D=window.CLIENT_DATA;let path=null,extra={},key=page,valid=true;
 if(page==='home'){path='/';key='home'}
 else if(page==='catalogue'&&document.body.dataset.audience!=='men'){
  path='/women';key='women';const raw=params.get('category');const aliases={Leggings:'Pants & Leggings',Sets:'Tracksuits',Tops:'T-Shirts & Tops',Bodysuits:'One Piece',Hoodies:'Hoodies & Sweatshirts',Jackets:'Coats & Jackets'};const category=aliases[raw]||raw;
  if(category&&category!=='All'){if(D.womenCategories.includes(category))extra.category=category;else valid=false}
  if(params.has('search'))valid=false;
 }else if(page==='product'){
  const id=params.get('ref');if(!id||!product||product.id!==id)valid=false;
  else {path='/product/'+product.type;extra.ref=id}
 }else if(['custom-inquiry','customisation'].includes(page)){path='/product-customization';key='custom'}
 else if(['about','contact'].includes(page)){path='/'+page}
 else valid=false;
 if(design!=='b'||!path)valid=false;
 // Explicit English/Spanish/French/Portuguese URLs are the only indexable locales.
 if(!LANGS.includes(lang))valid=false;
 document.head.querySelectorAll('link[rel="canonical"],link[rel="alternate"][hreflang]').forEach(e=>e.remove());
 meta('robots',valid?'index,follow':'noindex,follow');
 if(!valid)return;
 const canonical=canonicalURL(path,lang,extra),e=document.createElement('link');e.rel='canonical';e.href=canonical;document.head.append(e);
 for(const alt of [...LANGS,'x-default']){const e=document.createElement('link');e.rel='alternate';e.hreflang=alt;e.href=canonicalURL(path,alt==='x-default'?'en':alt,extra);document.head.append(e)}
 const local=titles[lang],category=extra.category?(D.translations[extra.category]?.[lang]||extra.category):null;
 const label=page==='product'?(product.titleTranslations?.[lang]||product.name)+' | '+product.id:category||local[key];
 document.title=label+' | WAHALI';
 meta('description',page==='product'?label+'. '+descriptions[lang]:descriptions[lang]);
};
})();
