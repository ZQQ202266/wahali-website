#!/usr/bin/env python3
# coding: utf-8
"""Regenerate the English PDF from the same reference products used by the website.
Run before publishing homepage/product changes: python3 scripts/build-catalogue.py
"""
from pathlib import Path
import json,html,hashlib,subprocess,tempfile,shutil,os,datetime,base64
import re
from zoneinfo import ZoneInfo
TODAY=datetime.datetime.now(ZoneInfo("Asia/Shanghai"))
ROOT=Path(__file__).resolve().parents[1];DIST=ROOT/'dist';s=(DIST/'client-data.js').read_text();d=json.loads(s[19:].rstrip(';\n'));products=[p for p in d['products'] if p.get('referenceDraft')];byid={p['id']:p for p in products};looks=d.get('referenceLooks',[]);BASE=os.environ.get('WAHALI_PUBLIC_BASE_URL','https://www.wahaliqq.com').rstrip('/');ONLINE=BASE+'/inquiry/index.html?lang=en' if BASE else '';h=html.escape
holds=json.loads((ROOT/'.openai/publication-holds.json').read_text()).get('held_products',[])
held_ids={x['website_id'] for x in holds}
assert not any(p['id'] in held_ids for p in d['products']), 'Held product reintroduced in website data'
assert not any(c['upper'] in held_ids or c['bottom'] in held_ids for l in looks for c in l['colors']), 'Held product reintroduced in pairings'
pages=[]
for label in d.get('womenCategories',[]):
 if label=='Tracksuits':continue
 items=[p for p in products if p['category']==label]
 for i in range(0,len(items),6):pages.append((label,'products',items[i:i+6]))
for i in range(0,len(looks),6):pages.append(('Style pairings','looks',looks[i:i+6]))
PHOTO_CACHE={}
def photo(p,c=None):
 src=DIST/'catalogue'/(c or p['referenceColors'][0])['images'][0]
 if str(src) not in PHOTO_CACHE:
  with tempfile.TemporaryDirectory(prefix='wahali-pdf-photo-') as folder:
   dest=Path(folder)/'photo.jpg'
   r=subprocess.run(['sips','-Z','850','-s','format','jpeg','-s','formatOptions','72',str(src),'--out',str(dest)],capture_output=True,text=True)
   if r.returncode:raise RuntimeError(r.stderr[:300])
   PHOTO_CACHE[str(src)]='data:image/jpeg;base64,'+base64.b64encode(dest.read_bytes()).decode()
 return PHOTO_CACHE[str(src)]
from urllib.parse import quote
ICONS={
'whatsapp':'<path d="M20.5 11.5a8.5 8.5 0 0 1-12.6 7.4L3 20l1.2-4.7A8.5 8.5 0 1 1 20.5 11.5Z"/><path d="m8.2 7.5 1.7 2-1 1.1c.7 1.5 1.7 2.5 3.2 3.1l1.1-1 2.1 1.6c-.3 1.5-1.2 2-2.6 1.7-3.3-.8-6.3-3.6-6.8-6.6-.2-1.1.7-1.8 2.3-1.9Z"/>',
'email':'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 6 9 7 9-7"/>',
'web':'<circle cx="12" cy="12" r="9"/><ellipse cx="12" cy="12" rx="4" ry="9"/><path d="M3 12h18M5 7h14M5 17h14"/>',
'location':'<path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z"/><circle cx="12" cy="10" r="2.3"/>'}
def icon(key):
 return '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.45" stroke-linecap="round" stroke-linejoin="round">'+ICONS[key]+'</svg>'
def footer(n,total):
 rows=[('whatsapp','WhatsApp','+852 9460 3714','https://wa.me/85294603714'),('email','Email','zqq202266@gmail.com','mailto:zqq202266@gmail.com'),('web','Website','www.wahaliqq.com',BASE),('location','Location','Shenzhen, China','')]
 contacts=''.join('<div class="contact-row">'+icon(k)+'<span class="contact-label">'+label+'</span>'+('<a href="'+h(url)+'">'+h(value)+'</a>' if url else '<span>'+h(value)+'</span>')+'</div>' for k,label,value,url in rows)
 return '<footer class="footer"><div class="footer-row"><div class="contact-stack">'+contacts+'</div><div class="footer-page"><span class="footer-brand">WAHALI</span><span>'+str(n).zfill(2)+' / '+str(total).zfill(2)+'</span></div></div><p class="footer-note">Colour dots are visual references. Final shades, specifications and supply are confirmed on enquiry.</p></footer>'
def colour_hex(name):
 return d['colourSwatches'].get(name,'#92918E')
def swatches(colors,urlfn):
 dots=[]
 for c in colors:
  name=c['name'];parts=[v.strip() for v in name.split('/')]
  if len(parts)>1:fill='linear-gradient(90deg,'+colour_hex(parts[0])+' 50%,'+colour_hex(parts[1])+' 50%)'
  else:fill=colour_hex(name)
  dots.append('<a class="colour-dot" title="'+h(name)+'" aria-label="'+h(name)+'" href="'+h(urlfn(c))+'" style="background:'+fill+'"></a>')
 return '<div class="colour-dots" aria-label="Reference colours">'+''.join(dots)+'</div>'
def product_url(p,c):
 return BASE+'/product/'+p['type']+'?lang=en&region=us&design=b&ref='+p['id']+'&color='+quote(c['name'])
def card(p):
 c=p['referenceColors'][0]
 return '<article class="card"><a class="card-hit" href="'+h(product_url(p,c))+'" aria-label="'+h(p['name'])+'"></a><div class="photo"><img src="'+h(photo(p,c))+'" alt="'+h(p['name'])+'"></div><h3>'+h(p['name'])+'</h3><div class="reference-row"><p class="ref">'+h(p['id'])+'</p><a class="style-link" href="'+h(product_url(p,c))+'">View details &#8599;</a></div><p class="meta">'+str(len(p['referenceColors']))+' colour options</p>'+swatches(p['referenceColors'],lambda v:product_url(p,v))+'</article>'
def lookcard(l):
 c=l['colors'][0];imgs=[]
 for side in ['upper','bottom']:
  p=byid[c[side]];color=next(v for v in p['referenceColors'] if v['sourceId']==c[side+'Source']);imgs.append('<img src="'+h(photo(p,color))+'" alt="'+h(p['name'])+'">')
 return '<article class="card"><a class="card-hit" href="'+h(ONLINE+'&look='+l['id'])+'" aria-label="Style pairing '+h(l['id'])+'"></a><div class="photo pair">'+''.join(imgs)+'</div><h3>Style pairing '+h(l['id'][-3:])+'</h3><div class="reference-row"><p class="ref">'+h(l['id'])+'</p><a class="style-link" href="'+h(ONLINE+'&look='+l['id'])+'">View look &#8599;</a></div><p class="meta">'+h(c['upper'])+' + '+h(c['bottom'])+'</p>'+swatches(l['colors'],lambda v:ONLINE+'&look='+l['id']+'&colour='+quote(v['name']))+'<p class="meta">Select top and bottom separately</p></article>'
styles='''@font-face{font-family:Manrope;src:url('fonts/manrope-500.ttf') format('truetype');font-weight:500}@font-face{font-family:Inter;src:url('fonts/inter-variable-latin.woff2') format('woff2');font-weight:100 900}*{box-sizing:border-box}body{margin:0;background:#e9e5dc;color:#38352f;font:10pt/1.45 'Avenir Next','Avenir Next LT Pro',Inter,Arial,sans-serif}a{color:inherit;text-decoration:none}.page{width:210mm;height:297mm;padding:12mm 13mm 11mm;margin:8mm auto;background:#fffdf9;display:flex;flex-direction:column;overflow:hidden;break-after:page}.page:last-child{break-after:auto}header{display:flex;justify-content:space-between;align-items:end;padding-bottom:6mm;border-bottom:1px solid #ded9ce;margin-bottom:6mm}.eyebrow{font-size:7pt;letter-spacing:2px;text-transform:uppercase}h1,h2{font-family:Manrope,'Avenir Next',Inter,sans-serif}h1{font-size:31pt;line-height:1.12;font-weight:500;letter-spacing:-1px;margin:4mm 0}h2{font-size:23pt;font-weight:500;line-height:1.2;margin:3mm 0 0}h3{font-size:10pt;line-height:1.35;font-weight:500;margin:3mm 0 1mm}.grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:7mm 5mm;align-content:start}.card{min-width:0;break-inside:avoid}.photo{width:100%;aspect-ratio:3/4;border-radius:2mm;overflow:hidden;background:#eeece8}.photo img{display:block;width:100%;height:100%;object-fit:cover}.pair{display:grid;grid-template-columns:1fr 1fr;gap:1px}.pair img{min-width:0}.ref{font-size:8pt;letter-spacing:.4px;margin:0;color:#56534b}.meta{font-size:7pt;line-height:1.4;margin:1mm 0 0;color:#726b61;overflow-wrap:anywhere}.note{font-size:8pt;color:#726b61;line-height:1.6}.footer{margin-top:auto;padding-top:5mm;border-top:1px solid #ded9ce;font-size:7pt;line-height:1.6}.footer-row{display:flex;justify-content:space-between;gap:8mm}.brand{font-size:15pt;letter-spacing:3px}.cover{padding-top:18mm}.cover .brand{font-size:23pt;letter-spacing:5px}.cover h1{font-size:38pt;margin:12mm 0 7mm;max-width:150mm}.cover-gallery{display:grid;grid-template-columns:repeat(3,1fr);gap:3mm;margin:9mm 0 7mm}.cover-gallery img{width:100%;aspect-ratio:3/4;object-fit:cover;border-radius:2mm}.cover .lead{font-size:14pt;max-width:135mm;line-height:1.5}.cover .instructions{background:#ede7de;padding:5mm;font-size:9pt;line-height:1.7;border-radius:2mm}.tools{text-align:center;padding:15px}.tools button{padding:10px 20px;background:#383b32;color:#fffdf9;border:0;border-radius:30px} @page{size:A4;margin:0}@media print{body{background:#fffdf9;print-color-adjust:exact;-webkit-print-color-adjust:exact}.tools{display:none}.page{margin:0}}'''
styles+='''
.reference-row{display:flex;justify-content:space-between;align-items:baseline;gap:2mm;margin:.7mm 0 0}.reference-row .ref{margin:0}.reference-row .style-link{font-size:7pt;line-height:1.3;margin:0;color:#726b61;white-space:nowrap;position:relative;z-index:2}.card{position:relative}.card-hit{position:absolute;inset:0;z-index:1;display:block;background:transparent!important;border:0!important;box-shadow:none!important;opacity:1!important}.card-hit:hover,.card-hit:active{background:transparent!important;filter:none!important;box-shadow:none!important;opacity:1!important}.colour-dots{position:relative;z-index:2;pointer-events:none}.colour-dot{pointer-events:auto}.style-link a{text-decoration:none;background:transparent}.style-link a:hover{background:transparent;color:inherit}.grid{grid-template-rows:repeat(2,101mm);gap:5mm 5mm}.photo{height:70mm;aspect-ratio:auto}.card h3{margin:2mm 0 .7mm;min-height:4.5mm;line-height:1.3}.meta{margin:.7mm 0 0}.colour-dots{display:flex;flex-wrap:wrap;gap:1.05mm;margin-top:1.4mm;align-content:flex-start;max-width:100%;min-height:3.2mm}.colour-dot{display:block;flex:0 0 3.1mm;width:3.1mm;height:3.1mm;border:.2mm solid rgba(62,57,48,.26);border-radius:50%;box-shadow:inset 0 0 0 .15mm rgba(255,255,255,.35);print-color-adjust:exact;-webkit-print-color-adjust:exact}.footer{padding-top:3mm}.footer-row{align-items:flex-end;gap:5mm}.contact-stack{display:flex;flex-direction:column;gap:1.1mm}.contact-row{display:grid;grid-template-columns:3mm 16mm auto;align-items:center;column-gap:2mm;font-size:7pt;line-height:1.2}.contact-row svg{width:3mm;height:3mm;display:block}.contact-label{color:#726b61}.footer-page{display:flex;flex-direction:column;align-items:flex-end;gap:2mm;white-space:nowrap}.footer-brand{letter-spacing:1.8px;font-size:8pt}.footer-note{font-size:6.4pt;line-height:1.4;margin:2mm 0 0;color:#726b61}.cover .lead{margin:3mm 0}.cover-gallery{margin:6mm 0 5mm}.cover-gallery img{max-height:74mm}.cover .instructions{padding:4mm}.cover .note{margin:2mm 0}.cover h1{margin:10mm 0 5mm}
'''
# Use the retained site font only when present; system Avenir Next is the fallback.
styles=styles.replace('manrope-variable-latin.woff2','manrope-latin.woff2') if (DIST/'fonts/manrope-latin.woff2').exists() else styles
out='<!doctype html><html lang="en"><meta charset="utf-8"><meta name="robots" content="noindex,nofollow"><meta name="viewport" content="width=device-width,initial-scale=1"><title>WAHALI — Activewear Product Catalogue</title><style>'+styles+'</style><body><div class="tools"><button onclick="window.print()">Print / save PDF</button></div>'
total=len(pages)+1
out+='<section class="page cover"><div class="eyebrow">WAHALI / ACTIVEWEAR</div><div class="brand">WAHALI</div><h1>Movement,<br>in your own way.</h1><p class="lead">Women’s activewear catalogue</p><p class="note">'+str(len(products))+' women’s styles · '+str(len(looks))+' style pairings<br>English selection · No prices · Updated '+TODAY.strftime('%d %B %Y')+'</p><div class="cover-gallery">'+''.join('<img src="'+h(photo(byid[id]))+'" alt="'+h(byid[id]['name'])+'">' for id in ['WH-W-SH-001','WH-W-PT-001','WH-W-UP-014'])+'</div><div class="instructions">Choose the styles you like and send us the reference codes, quantities and destination country.<br><a href="'+ONLINE+'">View all colours and angles in the online selection catalogue.</a></div><p class="note">Reference imagery and styles are for product discussions. Supply, fabric, sizing, customisation, prices and delivery must be confirmed for your enquiry. Pairings show separate pieces.</p>'+footer(1,total)+'</section>'
for n,(label,kind,items) in enumerate(pages,2):
 out+='<section class="page"><header><div><span class="eyebrow">WAHALI / PRODUCT SELECTION</span><h2>'+h(label)+'</h2></div><span class="brand">WAHALI</span></header><div class="grid">'+''.join(card(v) if kind=='products' else lookcard(v) for v in items)+'</div>'+footer(n,total)+'</section>'
out+='</body></html>'
if not BASE:out=re.sub(r'<a href="[^"]*">','<span>',out).replace('</a>','</span>')
path=DIST/'catalogue-print.html';path.write_text(out)
# Fail before PDF export if a referenced image is missing.
for p in products:
 for c in p['referenceColors']:
  for im in c['images']:assert (DIST/'catalogue'/im).is_file(),im
chrome='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
profile=tempfile.mkdtemp(prefix='wahali-catalogue-pdf-')
try:
 r=subprocess.run([chrome,'--headless','--disable-gpu','--disable-extensions','--no-pdf-header-footer','--user-data-dir='+profile,'--virtual-time-budget=5000','--print-to-pdf='+str(DIST/'catalogue.pdf'),path.as_uri()],capture_output=True,text=True,timeout=90)
 if r.returncode or not (DIST/'catalogue.pdf').is_file():raise RuntimeError(r.stderr[-1000:])
finally:shutil.rmtree(profile,ignore_errors=True)
# Transparent PDF link activation, without adding appearance streams.
_mode_pdf=DIST/'catalogue-mode.tmp.pdf'
_mode_result=subprocess.run([__import__('sys').executable,str(ROOT/'scripts/pdf-link-mode.py'),str(DIST/'catalogue.pdf'),str(_mode_pdf)],capture_output=True,text=True)
if _mode_result.returncode:raise RuntimeError(_mode_result.stderr)
_mode_pdf.replace(DIST/'catalogue.pdf')
# Publish a lightweight preview using existing runtime images after PDF export.
# Keep embedded print images only in memory for the export; avoid a 21 MB HTML download.
preview=out
for source,embedded in PHOTO_CACHE.items():
 preview=preview.replace(embedded,Path(source).relative_to(DIST).as_posix())
path.write_text(preview)
manifest={'date':TODAY.strftime('%Y-%m-%d'),'products':len(products),'core_styles':sum(not p.get('companion') for p in products),'companions':sum(bool(p.get('companion')) for p in products),'looks':len(looks),'pages':total,'source_sha256':hashlib.sha256((DIST/'client-data.js').read_bytes()).hexdigest(),'pdf_sha256':hashlib.sha256((DIST/'catalogue.pdf').read_bytes()).hexdigest(),'pdf_bytes':(DIST/'catalogue.pdf').stat().st_size,'product_ids':[p['id'] for p in products],'look_ids':[l['id'] for l in looks]}
manifest.update(print_sha256=hashlib.sha256(path.read_bytes()).hexdigest(),print_bytes=path.stat().st_size,catalogue_revision=6,link_layout='transparent_whole_card_and_right_aligned_details',colour_display='clickable_dots',footer_layout='four_stacked_icon_rows',colour_dots=sum(len(p['referenceColors']) for p in products)+sum(len(l['colors']) for l in looks))
(DIST/'catalogue-manifest.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2));print(json.dumps({k:v for k,v in manifest.items() if k not in ['product_ids','look_ids']},ensure_ascii=False))
# Sync retained local aliases without duplicating product image assets.
LOCAL=ROOT.parent
aliases=[('15_英文产品目录册_V01_2026-11-03','Activewear_Catalogue_REVIEW.pdf'),('17_DFYNE方向三版首页_V01_2026-11-03','catalogue.pdf'),('04_客户选款产品列表_V01_2026-11-02','Activewear_Product_List_PREVIEW.pdf')]
for folder,filename in aliases:
 target=LOCAL/folder
 if target.is_dir():shutil.copy2(DIST/'catalogue.pdf',target/filename)
book=LOCAL/'15_英文产品目录册_V01_2026-11-03'
if book.is_dir():
 (book/'index.html').write_text('<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>WAHALI Product Catalogue</title><style>body{margin:0;background:#faf7f1;color:#38352f;font:14px Arial}header{padding:18px 4%;display:flex;gap:20px;align-items:center;flex-wrap:wrap}a{color:inherit}iframe{display:block;border:0;width:100%;height:calc(100vh - 75px)}</style><header><strong>WAHALI · Product catalogue</strong><a href="Activewear_Catalogue_REVIEW.pdf">Open / download PDF</a><a href="'+ONLINE+'">Online selection</a><span>'+str(total)+' pages · '+TODAY.strftime('%Y-%m-%d')+'</span></header><iframe title="WAHALI product catalogue" src="Activewear_Catalogue_REVIEW.pdf"></iframe></html>')
 (book/'选款来源索引.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2))
 import csv
 with (book/'目录册产品索引.csv').open('w',encoding='utf-8-sig',newline='') as f:
  w=csv.writer(f);w.writerow(['Reference code','Style','Category','Colour options','Online reference'])
  for p in products:w.writerow([p['id'],p['name'],p['category'],len(p['referenceColors']),ONLINE+'&product='+p['id']])
