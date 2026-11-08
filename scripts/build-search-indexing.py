#!/usr/bin/env python3
"""Build crawl settings from formal products. Does not submit to any search service."""
from pathlib import Path
import json,re,xml.etree.ElementTree as ET
import datetime
from zoneinfo import ZoneInfo
ROOT=Path(__file__).resolve().parents[1];DIST=ROOT/'dist';BASE='https://www.wahaliqq.com'
s=(DIST/'client-data.js').read_text();data=json.loads(s[19:].rstrip(';\n'))
products=data['products'];held={p['website_id'] for p in json.loads((ROOT/'.openai/publication-holds.json').read_text())['held_products']}
assert not held.intersection(p['id'] for p in products)
languages=['en','es','fr','pt']
from urllib.parse import urlencode
def url(path,lang='en',**params):
 q=({'lang':lang} if lang!='en' else {})|params
 return BASE+path+('?' + urlencode(q) if q else '')
entries=[('/',{}),('/women',{}),('/about',{}),('/contact',{}),('/product-customization',{})]
entries += [('/women',{'category':category}) for category in data['womenCategories']]
entries += [('/product/'+p['type'],{'ref':p['id']}) for p in products]
NS='http://www.sitemaps.org/schemas/sitemap/0.9';X='http://www.w3.org/1999/xhtml'
ET.register_namespace('',NS);ET.register_namespace('xhtml',X);doc=ET.Element('{'+NS+'}urlset')
for path,params in entries:
 for lang in languages:
  item=ET.SubElement(doc,'{'+NS+'}url');ET.SubElement(item,'{'+NS+'}loc').text=url(path,lang,**params)
  for alt in languages+['x-default']:
   ET.SubElement(item,'{'+X+'}link',{'rel':'alternate','hreflang':alt,'href':url(path,'en' if alt=='x-default' else alt,**params)})
ET.indent(doc,space='  ');ET.ElementTree(doc).write(DIST/'sitemap.xml',encoding='utf-8',xml_declaration=True)
(DIST/'robots.txt').write_text('User-agent: *\nAllow: /\n\n# Sitemap is intentionally not advertised or submitted yet.\n')
public=['index.html','b.html','women.html','catalogue/index.html','about.html','contact.html','product-customization.html','customisation.html']
public += ['product/'+t+'.html' for t in sorted({p['type'] for p in products})]
for filename in public:
 p=DIST/filename;s=p.read_text();s=re.sub(r'<meta\s+name="robots"[^>]*>','<meta name="robots" content="index,follow">',s,flags=re.I)
 prefix='../' if '/' in filename else ''
 tag='<script src="'+prefix+'search-indexing.js"></script>'
 if tag not in s:s=s.replace('<script src="'+prefix+'client.js"></script>',tag+'<script src="'+prefix+'client.js"></script>')
 p.write_text(s)
manifest={'date':datetime.datetime.now(ZoneInfo('Asia/Shanghai')).strftime('%Y-%m-%d'),'base':BASE,'products':len(products),'categories':len(data['womenCategories']),'languages':languages,'sitemap_urls':len(entries)*len(languages),'sitemap_submitted':False,'sitemap_advertised_in_robots':False,'public_templates':public,'excluded':['cart','inquiry','PDF','catalogue-print','preview designs','men placeholder','delivery/privacy/terms drafts','retired or unknown product references']}
(ROOT/'docs/search-indexing-manifest.json').write_text(json.dumps(manifest,indent=2))
print(json.dumps({k:manifest[k] for k in ['products','categories','sitemap_urls','sitemap_submitted']}))
