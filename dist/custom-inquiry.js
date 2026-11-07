(() => {
  'use strict';
  const en = {
    title:'Product Customization', kicker:'CUSTOM INQUIRY', headline:'Configure Your Solution',
    intro:'Tell us your requirements and let our team help you find the right configuration for your application.',
    references:'Start with a style', browse:'Browse women', referenceNote:'Choose a reference style, or describe your own design in the form.',
    benefit1:'Style-led product sourcing', benefit2:'Branding details, together', benefit3:'Sample requirements, clearly planned',
    formTitle:'Your custom inquiry', quantity:'Estimated Total Quantity', quantityPlaceholder:'Select Estimated Quantity',
    quantityNote:'These ranges help us understand your enquiry; they are not minimum order guarantees.', customQuantity:'Enter your quantity (pieces)',
    date:'Target Delivery Date', optional:'Optional', dateNote:'Your preferred date is for planning and confirmation.',
    options:'What Would You Like to Customize?', files:'Reference Files / Design Files', upload:'Upload Reference Files',
    uploadHint:'Upload product references, logo files, drawings or customization requirements.', drag:'Click to browse or drag & drop files here.',
    limits:'JPG, PNG, PDF, AI, EPS, SVG · Up to {count} files · {each} MB each · {total} MB in total.', remove:'Remove',
    notes:'Tell Us More', example:'For example, dark green high waisted leggings with a white waistband logo. I want a sample to check the fit and fabric.',
    contact:'Contact Information', name:'Full Name', company:'Company Name', email:'Business Email', country:'Country / Region', phone:'WhatsApp',
    submit:'Submit Custom Inquiry', sending:'Sending your inquiry…', success:'Thank you for your inquiry. Our team will contact you soon.',
    notConfigured:'Your inquiry has not been sent. Online submission is not available yet. Please use WhatsApp or email below; your entries and selected files are still here.',
    unavailable:'Online submission is not available yet. You can prepare your inquiry and send it via WhatsApp or email. Attach the selected files to that message yourself.',
    available:'Your details and files will be sent only when you submit this form.',
    sendFailed:'We couldn’t send your inquiry. Please try again or contact us below. Your entries and selected files have been kept.',
    timeout:'The request timed out. Receipt is not confirmed. Please try again or contact us below. Your entries and files have been kept.',
    unconfirmed:'The receiving service did not confirm receipt. Please contact us below before sending again. Your entries and files have been kept.',
    serverSize:'The receiving service rejected the file size. Please reduce the attachments or contact us below. Your entries have been kept.',
    invalidType:'{name}: unsupported format. Please choose JPG, PNG, PDF, AI, EPS or SVG.',
    tooLarge:'{name}: exceeds the {limit} MB per-file limit.', tooMany:'You can select up to {limit} files.', totalLarge:'The combined files exceed {limit} MB.',
    required:'Please complete this field.', datePast:'Please choose today or a future date.', invalidQuantity:'Please choose an estimated quantity.',
    customInvalid:'Please enter a whole number from 1 to 9,999,999.', emailAction:'Prepare email', waAction:'Prepare WhatsApp message',
    fileManual:'Reference files: attach these files to your message manually.', draft:'Custom inquiry', reference:'Reference styles', noOptions:'Not specified',
    receipt:'Inquiry reference', privacy:'We use these details to respond to your enquiry. Read our privacy notice.',
    'undecided':'Not Decided Yet', 'under-100':'Less than 100 pieces', '100-300':'100–300 pieces', '301-1000':'301–1000 pieces', 'over-1000':'Over 1000 pieces', custom:'Custom Quantity'
  };
  const translations = {
    es: {
      title:'Personalización de productos',kicker:'CONSULTA PERSONALIZADA',headline:'Configura tu solución',intro:'Cuéntanos tus necesidades. Nuestro equipo te ayudará a definir la configuración adecuada para tu proyecto.',references:'Empieza con un modelo',browse:'Ver mujer',referenceNote:'Elige un modelo de referencia o describe tu propio diseño.',benefit1:'Selección según tu estilo',benefit2:'Detalles de marca coordinados',benefit3:'Requisitos de muestras claros',formTitle:'Tu consulta personalizada',quantity:'Cantidad total estimada',quantityPlaceholder:'Selecciona la cantidad estimada',quantityNote:'Estos rangos orientan la consulta; no son cantidades mínimas garantizadas.',customQuantity:'Introduce la cantidad (unidades)',date:'Fecha de entrega deseada',optional:'Opcional',dateNote:'La fecha se utiliza para evaluar y confirmar la planificación.',options:'¿Qué te gustaría personalizar?',files:'Archivos de referencia / diseño',upload:'Añadir archivos de referencia',uploadHint:'Añade referencias, logotipos, diseños o requisitos de personalización.',drag:'Haz clic o arrastra y suelta archivos aquí.',limits:'JPG, PNG, PDF, AI, EPS, SVG · Hasta {count} archivos · {each} MB por archivo · {total} MB en total.',remove:'Eliminar',notes:'Cuéntanos más',example:'Por ejemplo: leggings verde oscuro de cintura alta con un logo blanco. Quiero una muestra para comprobar el ajuste y el tejido.',contact:'Datos de contacto',name:'Nombre completo',company:'Empresa',email:'Correo de contacto profesional',country:'País / región',phone:'WhatsApp',submit:'Enviar consulta personalizada',sending:'Enviando tu consulta…',success:'Gracias por tu consulta. Nuestro equipo se pondrá en contacto contigo pronto.',notConfigured:'Tu consulta no se ha enviado. El envío en línea aún no está disponible. Usa WhatsApp o correo abajo. Tus datos y archivos seleccionados se conservan.',unavailable:'El envío en línea aún no está disponible. Puedes preparar la consulta y enviarla por WhatsApp o correo. Adjunta los archivos manualmente.',available:'Los datos y archivos solo se enviarán al enviar este formulario.',sendFailed:'No pudimos enviar la consulta. Inténtalo de nuevo o contáctanos abajo. Tus datos y archivos se conservan.',timeout:'La solicitud ha caducado sin confirmación de recepción. Reintenta o contáctanos. Tus datos se conservan.',unconfirmed:'El servicio no confirmó la recepción. Contáctanos antes de volver a enviar. Tus datos se conservan.',serverSize:'El servicio rechazó el tamaño de los archivos. Reduce los adjuntos o contáctanos.',invalidType:'{name}: formato no admitido. Usa JPG, PNG, PDF, AI, EPS o SVG.',tooLarge:'{name}: supera el límite de {limit} MB por archivo.',tooMany:'Puedes seleccionar hasta {limit} archivos.',totalLarge:'Los archivos superan {limit} MB en total.',required:'Completa este campo.',datePast:'Selecciona hoy o una fecha futura.',invalidQuantity:'Selecciona una cantidad estimada.',customInvalid:'Introduce un número entero entre 1 y 9.999.999.',emailAction:'Preparar correo',waAction:'Preparar mensaje de WhatsApp',fileManual:'Archivos: adjunta estos archivos manualmente.',draft:'Consulta personalizada',reference:'Modelos de referencia',noOptions:'Sin especificar',receipt:'Referencia de consulta',privacy:'Usamos estos datos para responder. Lee nuestro aviso de privacidad.',undecided:'Aún por decidir','under-100':'Menos de 100 unidades','100-300':'100–300 unidades','301-1000':'301–1000 unidades','over-1000':'Más de 1000 unidades',custom:'Otra cantidad'
    },
    fr: {
      title:'Personnalisation de produits',kicker:'DEMANDE PERSONNALISÉE',headline:'Configurez votre solution',intro:'Présentez vos besoins. Notre équipe vous aidera à définir la configuration adaptée à votre projet.',references:'Commencez par un modèle',browse:'Voir femme',referenceNote:'Choisissez un modèle de référence ou décrivez votre propre création.',benefit1:'Sélection guidée par votre style',benefit2:'Détails de marque coordonnés',benefit3:'Besoins en échantillons clarifiés',formTitle:'Votre demande personnalisée',quantity:'Quantité totale estimée',quantityPlaceholder:'Sélectionnez la quantité estimée',quantityNote:'Ces plages servent à préparer la demande, sans garantir un minimum de commande.',customQuantity:'Votre quantité (pièces)',date:'Date de livraison souhaitée',optional:'Facultatif',dateNote:'La date sert à planifier et confirmer les possibilités.',options:'Que souhaitez-vous personnaliser ?',files:'Fichiers de référence / création',upload:'Ajouter des fichiers de référence',uploadHint:'Ajoutez références, logos, dessins ou besoins de personnalisation.',drag:'Cliquez ou glissez-déposez les fichiers ici.',limits:'JPG, PNG, PDF, AI, EPS, SVG · {count} fichiers maximum · {each} Mo par fichier · {total} Mo au total.',remove:'Retirer',notes:'Précisez votre demande',example:'Par exemple : leggings vert foncé taille haute avec logo blanc. Je souhaite un échantillon pour vérifier la coupe et la matière.',contact:'Vos coordonnées',name:'Nom complet',company:'Entreprise',email:'Adresse e-mail professionnelle',country:'Pays / région',phone:'WhatsApp',submit:'Envoyer la demande personnalisée',sending:'Envoi de votre demande…',success:'Merci pour votre demande. Notre équipe vous contactera prochainement.',notConfigured:'Votre demande n’a pas été envoyée. L’envoi en ligne n’est pas encore disponible. Utilisez WhatsApp ou l’e-mail ci-dessous. Vos données et fichiers sélectionnés sont conservés.',unavailable:'L’envoi en ligne n’est pas encore disponible. Préparez votre demande, puis envoyez-la par WhatsApp ou e-mail en joignant les fichiers manuellement.',available:'Vos données et fichiers ne seront envoyés que lors de la soumission.',sendFailed:'Impossible d’envoyer la demande. Réessayez ou contactez-nous. Vos données et fichiers sont conservés.',timeout:'Délai dépassé, réception non confirmée. Réessayez ou contactez-nous. Vos données sont conservées.',unconfirmed:'Le service n’a pas confirmé la réception. Contactez-nous avant de renvoyer. Vos données sont conservées.',serverSize:'Le service a refusé la taille des fichiers. Réduisez les pièces jointes ou contactez-nous.',invalidType:'{name} : format non autorisé. Utilisez JPG, PNG, PDF, AI, EPS ou SVG.',tooLarge:'{name} : dépasse {limit} Mo par fichier.',tooMany:'Vous pouvez choisir {limit} fichiers au maximum.',totalLarge:'Les fichiers dépassent {limit} Mo au total.',required:'Veuillez remplir ce champ.',datePast:'Choisissez aujourd’hui ou une date future.',invalidQuantity:'Choisissez une quantité estimée.',customInvalid:'Saisissez un entier entre 1 et 9 999 999.',emailAction:'Préparer un e-mail',waAction:'Préparer un message WhatsApp',fileManual:'Fichiers : joignez ces fichiers manuellement.',draft:'Demande personnalisée',reference:'Modèles de référence',noOptions:'Non précisé',receipt:'Référence de la demande',privacy:'Ces coordonnées servent à vous répondre. Consultez notre avis de confidentialité.',undecided:'Pas encore décidé','under-100':'Moins de 100 pièces','100-300':'100–300 pièces','301-1000':'301–1000 pièces','over-1000':'Plus de 1000 pièces',custom:'Quantité personnalisée'
    },
    pt: {
      title:'Personalização de produtos',kicker:'CONSULTA PERSONALIZADA',headline:'Configure sua solução',intro:'Conte suas necessidades. Nossa equipe ajudará a definir a configuração adequada para seu projeto.',references:'Comece com um modelo',browse:'Ver feminino',referenceNote:'Escolha um modelo de referência ou descreva seu próprio design.',benefit1:'Seleção orientada pelo seu estilo',benefit2:'Detalhes de marca coordenados',benefit3:'Requisitos de amostras claros',formTitle:'Sua consulta personalizada',quantity:'Quantidade total estimada',quantityPlaceholder:'Selecione a quantidade estimada',quantityNote:'As faixas orientam a consulta; não representam quantidades mínimas garantidas.',customQuantity:'Digite a quantidade (peças)',date:'Data de entrega desejada',optional:'Opcional',dateNote:'A data serve para planejamento e confirmação.',options:'O que você gostaria de personalizar?',files:'Arquivos de referência / design',upload:'Adicionar arquivos de referência',uploadHint:'Envie referências, logos, desenhos ou requisitos de personalização.',drag:'Clique ou arraste e solte arquivos aqui.',limits:'JPG, PNG, PDF, AI, EPS, SVG · Até {count} arquivos · {each} MB por arquivo · {total} MB no total.',remove:'Remover',notes:'Conte-nos mais',example:'Por exemplo: leggings verde-escuro de cintura alta com logo branco. Quero uma amostra para verificar o caimento e o tecido.',contact:'Informações de contato',name:'Nome completo',company:'Empresa',email:'E-mail comercial',country:'País / região',phone:'WhatsApp',submit:'Enviar consulta personalizada',sending:'Enviando sua consulta…',success:'Obrigado pela sua consulta. Nossa equipe entrará em contato em breve.',notConfigured:'Sua consulta não foi enviada. O envio online ainda não está disponível. Use WhatsApp ou e-mail abaixo. Seus dados e arquivos selecionados foram mantidos.',unavailable:'O envio online ainda não está disponível. Prepare a consulta e envie por WhatsApp ou e-mail. Anexe os arquivos manualmente.',available:'Seus dados e arquivos só serão enviados ao enviar o formulário.',sendFailed:'Não foi possível enviar a consulta. Tente novamente ou entre em contato. Seus dados e arquivos foram mantidos.',timeout:'O tempo de envio expirou sem confirmação. Tente novamente ou entre em contato. Seus dados foram mantidos.',unconfirmed:'O serviço não confirmou o recebimento. Entre em contato antes de reenviar. Seus dados foram mantidos.',serverSize:'O serviço recusou o tamanho dos arquivos. Reduza os anexos ou entre em contato.',invalidType:'{name}: formato não permitido. Use JPG, PNG, PDF, AI, EPS ou SVG.',tooLarge:'{name}: excede {limit} MB por arquivo.',tooMany:'Você pode selecionar até {limit} arquivos.',totalLarge:'Os arquivos excedem {limit} MB no total.',required:'Preencha este campo.',datePast:'Escolha hoje ou uma data futura.',invalidQuantity:'Selecione uma quantidade estimada.',customInvalid:'Digite um inteiro de 1 a 9.999.999.',emailAction:'Preparar e-mail',waAction:'Preparar mensagem WhatsApp',fileManual:'Arquivos: anexe estes arquivos manualmente.',draft:'Consulta personalizada',reference:'Modelos de referência',noOptions:'Não especificado',receipt:'Referência da consulta',privacy:'Usamos estes dados para responder. Leia nosso aviso de privacidade.',undecided:'Ainda não decidido','under-100':'Menos de 100 peças','100-300':'100–300 peças','301-1000':'301–1000 peças','over-1000':'Mais de 1000 peças',custom:'Quantidade personalizada'
    }
  };
  const state = {values:{quantity:'',customQuantity:'',date:'',notes:'',name:'',company:'',email:'',country:'',phone:''},options:[],references:[],files:[],busy:false,status:null,summary:''};
  const optionNames = ['Logo','Color','Label','Material','Package'];
  let context, lang = 'en', initialized = false;
  const h = v => String(v ?? '').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const t = (key, args={}) => (translations[lang]?.[key] || en[key] || key).replace(/\{(\w+)\}/g,(_,k)=>args[k]??'');
  const config = () => window.WAHALI_CUSTOM_INQUIRY_CONFIG;
  const today = () => { const d=new Date();return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`; };
  const mb = n => Math.round(n/1024/1024*10)/10;
  const icon = name => {
    const paths={Logo:'<path d="m3 19 6-14 6 14M5 14h8m2-9h6m-3 0v14"/>',Color:'<circle cx="12" cy="12" r="9"/><path d="M12 3v18M3 12h18"/>',Label:'<path d="M3 3h8l10 10-8 8L3 11V3Z"/><circle cx="7" cy="7" r="1"/>',Material:'<path d="M5 3v18m7-18v18m7-18v18M3 5h18M3 12h18M3 19h18"/>',Package:'<path d="m3 7 9-4 9 4v11l-9 4-9-4V7Zm0 0 9 4 9-4m-9 4v11M7 5l10 4"/>',upload:'<path d="M12 16V3m-5 5 5-5 5 5M4 15v6h16v-6"/>',arrow:'<path d="M4 12h16m-6-6 6 6-6 6"/>'};
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name]||''}</svg>`;
  };
  const productName = p => p.titleTranslations?.[lang] || p.name;
  const field = (key,label,type='text',required=false,auto='') => `<label class="ci-label" for="ci-${key}"><span>${t(label)}${required?' *':` <em>${t('optional')}</em>`}</span><input id="ci-${key}" name="${key}" type="${type}" ${required?'required':''} ${auto?`autocomplete="${auto}"`:''} maxlength="${key==='email'?254:150}" value="${h(state.values[key])}"></label>`;
  function save(form) {
    Object.keys(state.values).forEach(key=>{state.values[key]=form.elements[key].value;});
    state.options=[...form.querySelectorAll('[name=customization]:checked')].map(e=>e.value);
  }
  function payload(form) {
    save(form);
    return {schemaVersion:1,requestId:window.crypto?.randomUUID?.()||`${Date.now()}-${Math.random().toString(36).slice(2)}`,language:lang,page:location.href,
      estimatedQuantity:state.values.quantity,customQuantity:state.values.quantity==='custom'?Number(state.values.customQuantity):null,
      targetDeliveryDate:state.values.date||null,customization:[...state.options],notes:state.values.notes.trim(),
      contact:Object.fromEntries(['name','company','email','country','phone'].map(k=>[k,state.values[k].trim()])),
      references:state.references.map(id=>{const p=context.products.find(p=>p.id===id);return {id,name:p.name,url:context.href('product/'+p.type+'.html',{ref:id})};}),
      files:state.files.map(f=>({name:f.name,type:f.type,size:f.size}))};
  }
  function validate(form) {
    const q=form.elements.quantity;
    q.setCustomValidity(config().quantityOptions.some(v=>v.value===q.value)?'':t('invalidQuantity'));
    const n=form.elements.name;n.setCustomValidity(n.value.trim()?'':t('required'));
    const custom=form.elements.customQuantity;
    custom.setCustomValidity(q.value!=='custom'||(/^[1-9]\d*$/.test(custom.value)&&Number(custom.value)<=9999999)?'':t('customInvalid'));
    form.elements.date.min=today();form.elements.date.setCustomValidity(form.elements.date.value&&form.elements.date.value<today()?t('datePast'):'');
    return form.reportValidity();
  }
  function showStatus(code,args={}) {
    state.status={code,args};const el=document.getElementById('ciStatus');if(!el)return;
    el.dataset.state=code==='success'?'success':code==='sending'?'sending':'error';el.setAttribute('role',code==='sending'?'status':'alert');
    el.textContent=t(code)+(code==='success'&&args.reference?'\n'+t('receipt')+': '+args.reference:'');
  }
  function fileList() {
    const el=document.getElementById('ciFileList');if(!el)return;
    el.innerHTML=state.files.map((f,i)=>`<li><span>${h(f.name)}<small>${h(f.name.split('.').pop().toUpperCase())} · ${f.size<1024*1024?Math.ceil(f.size/1024)+' KB':mb(f.size)+' MB'}</small></span><button class="ci-remove" type="button" data-ci-remove="${i}" aria-label="${h(t('remove')+' '+f.name)}">${t('remove')}</button></li>`).join('');
  }
  function addFiles(incoming) {
    if(state.busy)return;
    const errors=[],cfg=config().files;
    for(const f of incoming){
      const ext=f.name.split('.').pop().toLowerCase();
      if(!cfg.extensions.includes(ext)){errors.push(t('invalidType',{name:f.name}));continue;}
      if(f.size>cfg.maxBytesEach){errors.push(t('tooLarge',{name:f.name,limit:mb(cfg.maxBytesEach)}));continue;}
      if(state.files.some(v=>v.name===f.name&&v.size===f.size&&v.lastModified===f.lastModified))continue;
      if(state.files.length>=cfg.maxCount){errors.push(t('tooMany',{limit:cfg.maxCount}));continue;}
      if(state.files.reduce((sum,v)=>sum+v.size,0)+f.size>cfg.maxBytesTotal){errors.push(t('totalLarge',{limit:mb(cfg.maxBytesTotal)}));continue;}
      state.files.push(f);
    }
    document.getElementById('ciFileErrors').textContent=errors.join('\n');fileList();
  }
  function message(data) {
    return ['WAHALI — '+t('draft'),...Object.entries(data.contact).map(([key,v])=>`${t(key)}: ${v||t('noOptions')}`),
      `${t('quantity')}: ${data.customQuantity||t(data.estimatedQuantity)}`,`${t('date')}: ${data.targetDeliveryDate||t('noOptions')}`,
      `${t('options')}: ${data.customization.join(', ')||t('noOptions')}`,`${t('reference')}: ${data.references.map(p=>p.id+' '+p.name+'\n'+p.url).join('\n')||t('noOptions')}`,
      `${t('notes')}: ${data.notes||t('noOptions')}`,data.files.length?t('fileManual')+'\n'+data.files.map(f=>f.name).join('\n'):''].filter(Boolean).join('\n\n');
  }
  window.WahaliCustomInquiry = {
    title:locale => (translations[locale]?.title||en.title),
    view(ctx) {
      context=ctx;lang=ctx.lang;
      if(!initialized){const ref=new URLSearchParams(location.search).get('ref');if(ctx.products.some(p=>p.id===ref))state.references=[ref];initialized=true;}
      const picks=['WH-W-SH-001','WH-W-PT-001','WH-W-UP-001'].map(id=>ctx.products.find(p=>p.id===id)).filter(Boolean);
      const photo=p=>new URL('catalogue/'+p.referenceColors[0].images[0],ctx.ROOT).href;
      return `<main class="ci-page"><div class="ci-layout"><aside class="ci-intro"><div class="ci-intro-heading"><span class="ci-kicker">${t('kicker')}</span><h1>${t('headline')}</h1><p class="ci-description">${t('intro')}</p></div><div class="ci-photo"><img src="${photo(picks[0])}" width="800" height="600" alt="${h(productName(picks[0]))}" fetchpriority="high"><span class="ci-photo-label">WAHALI / ACTIVEWEAR</span></div><div class="ci-reference-heading" id="collection"><h2>${t('references')}</h2><a href="${ctx.href('women.html')}">${t('browse')}</a></div><div class="ci-reference-grid">${picks.map(p=>`<button type="button" class="ci-ref" data-ci-ref="${p.id}" aria-pressed="${state.references.includes(p.id)}"><img src="${photo(p)}" alt="${h(productName(p))}" loading="lazy" width="180" height="240"><span>${h(p.id)}</span></button>`).join('')}</div><p class="ci-reference-note">${t('referenceNote')}</p><ul class="ci-benefits" id="custom-process">${[1,2,3].map(i=>`<li><b>0${i}</b>${t('benefit'+i)}</li>`).join('')}</ul></aside>
      <section class="ci-form-panel" id="project-brief" aria-labelledby="ciFormTitle"><span id="inquiry"></span><div class="ci-form-heading"><h2 id="ciFormTitle">${t('formTitle')}</h2></div><form id="customInquiryForm" class="ci-form"><fieldset class="ci-fields" id="ciFields"><label class="ci-label" for="ci-quantity">${t('quantity')} *<select id="ci-quantity" name="quantity" required><option value="" disabled ${!state.values.quantity?'selected':''}>${t('quantityPlaceholder')}</option>${config().quantityOptions.map(v=>`<option value="${h(v.value)}" ${state.values.quantity===v.value?'selected':''}>${h(t(v.value)===v.value?v.label:t(v.value))}</option>`).join('')}</select><span class="ci-help">${t('quantityNote')}</span></label><label class="ci-label" for="ci-date"><span>${t('date')} <em>${t('optional')}</em></span><input id="ci-date" type="date" name="date" min="${today()}" value="${h(state.values.date)}"><span class="ci-help">${t('dateNote')}</span></label><label class="ci-label ci-full ci-quantity-custom" id="ciCustomQuantity" for="ci-customQuantity" ${state.values.quantity==='custom'?'':'hidden'}>${t('customQuantity')} *<input id="ci-customQuantity" name="customQuantity" type="number" min="1" max="9999999" step="1" inputmode="numeric" value="${h(state.values.customQuantity)}" ${state.values.quantity==='custom'?'required':'disabled'}></label>
      <fieldset class="ci-options ci-full" id="customisation-options"><legend>${t('options')}</legend><div class="ci-option-grid">${optionNames.map(k=>`<label class="ci-option"><input type="checkbox" name="customization" value="${k}" ${state.options.includes(k)?'checked':''}>${icon(k)}<span>${k}</span></label>`).join('')}</div></fieldset>
      <div class="ci-label ci-full"><span id="ciFilesTitle">${t('files')}</span><label class="ci-upload" id="ciDropZone" for="ciFiles" tabindex="0" aria-labelledby="ciFilesTitle" aria-describedby="ciFileLimits ciFileErrors">${icon('upload')}<strong>${t('upload')}</strong><span class="ci-help">${t('uploadHint')}</span><span class="ci-help">${t('drag')}</span><input type="file" id="ciFiles" multiple accept="${config().files.extensions.map(e=>'.'+e).join(',')}" aria-label="${t('upload')}"></label><span class="ci-help" id="ciFileLimits">${t('limits',{count:config().files.maxCount,each:mb(config().files.maxBytesEach),total:mb(config().files.maxBytesTotal)})}</span><p id="ciFileErrors" class="ci-errors" role="alert"></p><ul class="ci-file-list" id="ciFileList"></ul></div>
      <label class="ci-label ci-full" for="ci-notes">${t('notes')}<textarea name="notes" id="ci-notes" maxlength="4000" placeholder="${h(t('example'))}">${h(state.values.notes)}</textarea></label><h3 class="ci-contact-title ci-full">${t('contact')}</h3>${field('name','name','text',true,'name')}${field('company','company','text',false,'organization')}${field('email','email','email',true,'email')}${field('country','country','text',false,'country-name')}${field('phone','phone','tel',false,'tel')}<p class="ci-help ci-full"><a href="${ctx.href('privacy.html')}">${t('privacy')}</a></p><button class="ci-submit ci-full" id="ciSubmit" type="submit"><span>${t('submit')}</span>${icon('arrow')}</button></fieldset></form><div class="ci-status" id="ciStatus" role="status" aria-live="polite" tabindex="-1"></div><p class="ci-availability" id="ciAvailability">${t(config().endpoint?'available':'unavailable')}</p><div class="ci-manual"><button type="button" data-ci-manual="email">${t('emailAction')}</button><button type="button" data-ci-manual="whatsapp">${t('waAction')}</button></div><pre class="ci-summary" id="ciSummary" hidden></pre></section></div></main>`;
    },
    mount() {
      const form=document.getElementById('customInquiryForm');if(!form)return;
      const custom=document.getElementById('ciCustomQuantity'),fileInput=document.getElementById('ciFiles'),drop=document.getElementById('ciDropZone');
      fileList();document.getElementById('ciFields').disabled=state.busy;if(state.status)showStatus(state.status.code,state.status.args);
      form.addEventListener('input',e=>{if(e.target.setCustomValidity)e.target.setCustomValidity('');save(form);});
      form.elements.quantity.addEventListener('change',()=>{custom.hidden=form.elements.quantity.value!=='custom';form.elements.customQuantity.required=!custom.hidden;form.elements.customQuantity.disabled=custom.hidden;if(custom.hidden)form.elements.customQuantity.setCustomValidity('');save(form);});
      form.addEventListener('change',()=>save(form));
      document.querySelectorAll('[data-ci-ref]').forEach(b=>b.onclick=()=>{const id=b.dataset.ciRef;if(state.references.includes(id))state.references=state.references.filter(v=>v!==id);else state.references.push(id);b.setAttribute('aria-pressed',String(state.references.includes(id)));});
      fileInput.onchange=()=>{addFiles([...fileInput.files]);fileInput.value='';};
      document.getElementById('ciFileList').onclick=e=>{const b=e.target.closest('[data-ci-remove]');if(b&&!state.busy){state.files.splice(Number(b.dataset.ciRemove),1);fileList();document.getElementById('ciFileErrors').textContent='';}};
      drop.onkeydown=e=>{if(e.target===drop&&['Enter',' '].includes(e.key)){e.preventDefault();fileInput.click();}};
      let dragDepth=0;
      drop.addEventListener('dragenter',e=>{e.preventDefault();dragDepth++;drop.classList.add('is-dragging');});
      drop.addEventListener('dragover',e=>{e.preventDefault();e.dataTransfer.dropEffect='copy';});
      drop.addEventListener('dragleave',e=>{e.preventDefault();if(--dragDepth<=0){drop.classList.remove('is-dragging');dragDepth=0;}});
      drop.addEventListener('drop',e=>{e.preventDefault();dragDepth=0;drop.classList.remove('is-dragging');addFiles([...e.dataTransfer.files]);});
      form.onsubmit=async e=>{
        e.preventDefault();if(state.busy||!validate(form))return;
        const data=payload(form),files=[...state.files];state.busy=true;document.getElementById('ciFields').disabled=true;document.getElementById('ciSubmit').querySelector('span').textContent=t('sending');
        showStatus('sending');
        try{const response=await window.CustomInquiryTransport.submit(data,files);showStatus('success',{reference:response.reference});}
        catch(error){showStatus(en[error.code]?error.code:'sendFailed');}
        finally{state.busy=false;document.getElementById('ciFields').disabled=false;document.getElementById('ciSubmit').querySelector('span').textContent=t('submit');}
      };
      document.querySelectorAll('[data-ci-manual]').forEach(b=>b.onclick=()=>{
        if(state.busy||!validate(form))return;const text=message(payload(form)),summary=document.getElementById('ciSummary');summary.textContent=text;summary.hidden=false;
        if(b.dataset.ciManual==='email')location.href='mailto:'+config().contact.email+'?subject='+encodeURIComponent('WAHALI — '+t('draft'))+'&body='+encodeURIComponent(text);
        else window.open('https://wa.me/'+config().contact.whatsapp+'?text='+encodeURIComponent(text),'_blank','noopener,noreferrer');
      });
    }
  };
})();
