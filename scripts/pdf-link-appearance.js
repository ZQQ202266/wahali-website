// Run with: osascript -l JavaScript pdf-link-appearance.js input.pdf output.pdf
ObjC.import('PDFKit');
ObjC.import('AppKit');
function run(args) {
  if(args.length!==2)throw Error('Expected input and output PDF paths');
  const doc=$.PDFDocument.alloc.initWithURL($.NSURL.fileURLWithPath(args[0]));
  if(!doc)throw Error('Cannot open input PDF');
  let count=0;
  for(let i=0;i<Number(doc.pageCount);i++){
    const annotations=doc.pageAtIndex(i).annotations;
    for(let j=0;j<Number(annotations.count);j++){
      const annotation=annotations.objectAtIndex(j);
      if(!annotation.URL)continue;
      annotation.setValueForAnnotationKey($.PDFAnnotationHighlightingModeNone,$.PDFAnnotationKeyHighlightingMode);
      annotation.color=$.NSColor.clearColor;
      const border=$.PDFBorder.alloc.init; border.lineWidth=0; annotation.border=border;
      annotation.isHighlighted=false;
      count++;
    }
  }
  if(!doc.writeToURL($.NSURL.fileURLWithPath(args[1])))throw Error('Cannot save output PDF');
  return JSON.stringify({pages:Number(doc.pageCount),links:count,highlighting:'None',borderWidth:0});
}
