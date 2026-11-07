#!/usr/bin/env python3
# coding: utf-8
"""Regenerate the English PDF from the same reference products used by the website.
Run before publishing homepage/product changes: python3 scripts/build-catalogue.py
"""
from pathlib import Path
import json,html,hashlib,subprocess,tempfile,shutil,os,datetime,base64
from zoneinfo import ZoneInfo
TODAY=datetime.datetime.now(ZoneInfo("Asia/Shanghai"))
ROOT=Path(__file__).resolve().parents[1];DIST=ROOT/'dist';s=(DIST/'client-data.js').read_text();d=json.loads(s[19:].rstrip(';\n'));products=[p for p in d['products'] if p.get('referenceDraft')];byid={p['id']:p for p in products};looks=d.get('referenceLooks',[]);BASE='https://wahaliqq-design-review.mossy-charm-8419.chatgpt.site';ONLINE=BASE+'/inquiry/index.html?lang=en';h=html.escape
holds=json.loads((ROOT/'.openai/publication-holds.json').read_text()).get('held_products',[])
held_ids={x['website_id'] for x in holds}
assert not any(p['id'] in held_ids for p in d['products']), 'Held product reintroduced in website data'
assert not any(c['upper'] in held_ids or c['bottom'] in held_ids for l in looks for c in l['colors']), 'Held product reintroduced in pairings'
pages=[]
for label,items in [('Shorts',[p for p in products if not p.get('companion') and p['type']=='shorts']),('Leggings & pants',[p for p in products if not p.get('companion') and p['type']=='leggings']),('Other styles',[p for p in products if not p.get('companion') and p['type'] not in ['shorts','leggings']]),('Sports bras',[p for p in products if p.get('companion') and p['category']=='Sports Bras']),('Tops & layers',[p for p in products if p.get('companion') and p['category']!='Sports Bras'])]:
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
def card(p):
 c=p['referenceColors'][0];link=ONLINE+'&product='+p['id']+'&colour='+__import__('urllib.parse',fromlist=['quote']).quote(c['name']);return f'<article class="card"><a href="{h(link)}"><div class="photo"><img src="{h(photo(p,c))}" alt="{h(p["name"])}"></div><h3>{h(p["name"])}</h3></a><p class="ref">{h(p["id"])}</p><p class="meta">{h(c["name"])} · {len(p["referenceColors"])} colour options</p></article>'
def lookcard(l):
 c=l['colors'][0];imgs=[]
 for side in ['upper','bottom']:
  p=byid[c[side]];color=next(v for v in p['referenceColors'] if v['sourceId']==c[side+'Source']);imgs.append(f'<img src="{h(photo(p,color))}" alt="{h(p["name"])}">')
 return '<article class="card"><a href="'+h(ONLINE+'&look='+l['id'])+'"><div class="photo pair">'+''.join(imgs)+'</div><h3>Style pairing '+h(l['id'][-3:])+'</h3></a><p class="ref">'+h(l['id'])+'</p><p class="meta">'+h(c['upper'])+' + '+h(c['bottom'])+'</p><p class="meta">'+h(c['name'])+' · Select top and bottom separately</p></article>'
styles='''@font-face{font-family:Manrope;src:url('fonts/manrope-500.ttf') format('truetype');font-weight:500}@font-face{font-family:Inter;src:url('fonts/inter-variable-latin.woff2') format('woff2');font-weight:100 900}*{box-sizing:border-box}body{margin:0;background:#e9e5dc;color:#38352f;font:10pt/1.45 'Avenir Next','Avenir Next LT Pro',Inter,Arial,sans-serif}a{color:inherit;text-decoration:none}.page{width:210mm;height:297mm;padding:12mm 13mm 11mm;margin:8mm auto;background:#fffdf9;display:flex;flex-direction:column;overflow:hidden;break-after:page}.page:last-child{break-after:auto}header{display:flex;justify-content:space-between;align-items:end;padding-bottom:6mm;border-bottom:1px solid #ded9ce;margin-bottom:6mm}.eyebrow{font-size:7pt;letter-spacing:2px;text-transform:uppercase}h1,h2{font-family:Manrope,'Avenir Next',Inter,sans-serif}h1{font-size:31pt;line-height:1.12;font-weight:500;letter-spacing:-1px;margin:4mm 0}h2{font-size:23pt;font-weight:500;line-height:1.2;margin:3mm 0 0}h3{font-size:10pt;line-height:1.35;font-weight:500;margin:3mm 0 1mm}.grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:7mm 5mm;align-content:start}.card{min-width:0;break-inside:avoid}.photo{width:100%;aspect-ratio:3/4;border-radius:2mm;overflow:hidden;background:#eeece8}.photo img{display:block;width:100%;height:100%;object-fit:cover}.pair{display:grid;grid-template-columns:1fr 1fr;gap:1px}.pair img{min-width:0}.ref{font-size:8pt;letter-spacing:.4px;margin:0;color:#56534b}.meta{font-size:7pt;line-height:1.4;margin:1mm 0 0;color:#726b61;overflow-wrap:anywhere}.note{font-size:8pt;color:#726b61;line-height:1.6}.footer{margin-top:auto;padding-top:5mm;border-top:1px solid #ded9ce;font-size:7pt;line-height:1.6}.footer-row{display:flex;justify-content:space-between;gap:8mm}.brand{font-size:15pt;letter-spacing:3px}.cover{padding-top:18mm}.cover .brand{font-size:23pt;letter-spacing:5px}.cover h1{font-size:38pt;margin:12mm 0 7mm;max-width:150mm}.cover-gallery{display:grid;grid-template-columns:repeat(3,1fr);gap:3mm;margin:9mm 0 7mm}.cover-gallery img{width:100%;aspect-ratio:3/4;object-fit:cover;border-radius:2mm}.cover .lead{font-size:14pt;max-width:135mm;line-height:1.5}.cover .instructions{background:#ede7de;padding:5mm;font-size:9pt;line-height:1.7;border-radius:2mm}.tools{text-align:center;padding:15px}.tools button{padding:10px 20px;background:#383b32;color:#fffdf9;border:0;border-radius:30px} @page{size:A4;margin:0}@media print{body{background:#fffdf9;print-color-adjust:exact;-webkit-print-color-adjust:exact}.tools{display:none}.page{margin:0}}'''
# Use the retained site font only when present; system Avenir Next is the fallback.
styles=styles.replace('manrope-variable-latin.woff2','manrope-latin.woff2') if (DIST/'fonts/manrope-latin.woff2').exists() else styles
out='<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>WAHALI — Activewear Product Catalogue</title><style>'+styles+'</style><body><div class="tools"><button onclick="window.print()">Print / save PDF</button></div>'
total=len(pages)+1
out+='<section class="page cover"><div class="eyebrow">WAHALI / ACTIVEWEAR</div><div class="brand">WAHALI</div><h1>Movement,<br>in your own way.</h1><p class="lead">Activewear product catalogue</p><p class="note">'+str(sum(not p.get('companion') for p in products))+' core styles · '+str(sum(bool(p.get('companion')) for p in products))+' complementary tops & layers · '+str(len(looks))+' style pairings<br>English selection · No prices · Updated '+TODAY.strftime('%d %B %Y')+'</p><div class="cover-gallery">'+''.join('<img src="'+h(photo(byid[id]))+'" alt="'+h(byid[id]['name'])+'">' for id in ['WH-W-SH-001','WH-W-PT-001','WH-W-UP-014'])+'</div><div class="instructions">Choose the styles you like and send us the reference codes, quantities and destination country.<br><a href="'+ONLINE+'">View all colours and angles in the online selection catalogue.</a></div><p class="note">Reference imagery and styles are for product discussions. Supply, fabric, sizing, customisation, prices and delivery must be confirmed for your enquiry. Pairings show separate pieces.</p><footer class="footer"><div class="footer-row"><span>WhatsApp +852 9460 3714<br>zqq202266@gmail.com</span><span>WAHALI · Shenzhen, China<br>01 / '+str(total).zfill(2)+'</span></div></footer></section>'
for n,(label,kind,items) in enumerate(pages,2):
 out+='<section class="page"><header><div><span class="eyebrow">WAHALI / PRODUCT SELECTION</span><h2>'+h(label)+'</h2></div><span class="brand">WAHALI</span></header><div class="grid">'+''.join(card(v) if kind=='products' else lookcard(v) for v in items)+'</div><footer class="footer"><div class="footer-row"><span><a href="https://wa.me/85294603714">WhatsApp +852 9460 3714</a> · <a href="mailto:zqq202266@gmail.com">zqq202266@gmail.com</a><br>Reference styles. Specifications and supply confirmed on enquiry.</span><span>'+str(n).zfill(2)+' / '+str(total).zfill(2)+'</span></div></footer></section>'
out+='</body></html>';path=DIST/'catalogue-print.html';path.write_text(out)
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
manifest={'date':TODAY.strftime('%Y-%m-%d'),'products':len(products),'core_styles':sum(not p.get('companion') for p in products),'companions':sum(bool(p.get('companion')) for p in products),'looks':len(looks),'pages':total,'source_sha256':hashlib.sha256((DIST/'client-data.js').read_bytes()).hexdigest(),'pdf_sha256':hashlib.sha256((DIST/'catalogue.pdf').read_bytes()).hexdigest(),'pdf_bytes':(DIST/'catalogue.pdf').stat().st_size,'product_ids':[p['id'] for p in products],'look_ids':[l['id'] for l in looks]}
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
