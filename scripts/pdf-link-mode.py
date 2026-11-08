#!/usr/bin/env python3
"""Set /H /N on unencrypted Chrome-generated link annotations via an incremental update.
Keeps appearance streams, page content and link targets untouched. Requires classic xref.
"""
from pathlib import Path
import re,sys

def process(src,dst):
 data=Path(src).read_bytes();last=list(re.finditer(rb'startxref\s+(\d+)\s+%%EOF',data))[-1];previous=int(last[1])
 if not data[previous:previous+4]==b'xref':raise ValueError('Expected Chrome classic xref PDF')
 trailer=data[data.rfind(b'trailer',0,last.start()):last.start()]
 if b'/Encrypt' in trailer:raise ValueError('Encrypted PDF is not supported')
 root=re.search(rb'/Root\s+(\d+\s+\d+\s+R)',trailer);size=re.search(rb'/Size\s+(\d+)',trailer);info=re.search(rb'/Info\s+(\d+\s+\d+\s+R)',trailer)
 if not root or not size:raise ValueError('Incomplete PDF trailer')
 updates={}
 for m in re.finditer(rb'(?m)^(\d+) (\d+) obj\r?\n(.*?)\r?\nendobj',data,re.S):
  body=m[3]
  if not re.search(rb'/Subtype\s*/Link\b',body):continue
  if b'stream' in body:raise ValueError('Unexpected stream in link annotation')
  if re.search(rb'/H\s*/\w+',body):body=re.sub(rb'/H\s*/\w+',b'/H /N',body)
  else:
   end=body.rfind(b'>>')
   if end<0:raise ValueError('Invalid annotation dictionary')
   body=body[:end]+b' /H /N '+body[end:]
  updates[(int(m[1]),int(m[2]))]=body
 if not updates:raise ValueError('No link annotations found')
 out=bytearray(data+b'\n');offsets=[]
 for (obj,gen),body in sorted(updates.items()):
  offsets.append((obj,gen,len(out)));out.extend(f'{obj} {gen} obj\n'.encode()+body+b'\nendobj\n')
 xref=len(out);out.extend(b'xref\n')
 for obj,gen,offset in offsets:out.extend(f'{obj} 1\n{offset:010d} {gen:05d} n \n'.encode())
 out.extend(b'trailer\n<< /Size '+size[1]+b' /Root '+root[1]+(b' /Info '+info[1] if info else b'')+b' /Prev '+str(previous).encode()+b' >>\nstartxref\n'+str(xref).encode()+b'\n%%EOF\n')
 Path(dst).write_bytes(out);return len(updates)
if __name__=='__main__':print(process(sys.argv[1],sys.argv[2]))
