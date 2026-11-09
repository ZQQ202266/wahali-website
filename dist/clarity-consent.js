/* Microsoft Clarity is loaded only after an explicit recording choice. */
(() => {
  const page = document.body.dataset.page;
  if (!['home', 'catalogue', 'product'].includes(page) || document.body.dataset.customPreview) return;
  const lang = new URLSearchParams(location.search).get('lang');
  const strings = {
    en: ['Allow session recordings?', 'Microsoft Clarity can record browsing interactions to help us improve this website. Input fields and enquiry dialogs are masked. This choice controls Clarity only.', 'Allow', 'Decline', 'Recording settings'],
    es: ['¿Permitir grabaciones de sesión?', 'Microsoft Clarity puede registrar la navegación para mejorar este sitio. Los campos y diálogos de consulta están ocultos. Esta opción solo controla Clarity.', 'Permitir', 'Rechazar', 'Ajustes de grabación'],
    fr: ['Autoriser les enregistrements de session ?', 'Microsoft Clarity peut enregistrer la navigation pour améliorer ce site. Les champs et fenêtres de demande sont masqués. Ce choix concerne uniquement Clarity.', 'Autoriser', 'Refuser', 'Réglages des enregistrements'],
    pt: ['Permitir gravações de sessão?', 'O Microsoft Clarity pode registrar a navegação para melhorar este site. Campos e diálogos de consulta são ocultados. Esta opção controla apenas o Clarity.', 'Permitir', 'Recusar', 'Configurações de gravação']
  };
  const text = strings[lang] || strings.en;
  const key = 'wahali_clarity_choice_v1';
  const getChoice = () => { try { return localStorage.getItem(key); } catch (_) { return null; } };
  const setChoice = value => { try { localStorage.setItem(key, value); } catch (_) {} };
  let choice = getChoice();
  let loaded = false;
  const load = () => {
    if (loaded || window.clarity) return;
    loaded = true;
    (function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src='https://www.clarity.ms/tag/'+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,'clarity','script','zata3b2ihr');
    window.clarity('consentv2', {ad_Storage:'denied', analytics_Storage:'granted'});
  };
  const style = document.createElement('style');
  style.textContent = '.wahali-recording-settings{position:fixed;z-index:900;bottom:10px;left:10px;background:#fff;border:1px solid #aaa;border-radius:4px;padding:6px 9px;font:12px Arial,sans-serif;color:#333;cursor:pointer}.wahali-recording-panel{position:fixed;z-index:10001;left:12px;bottom:48px;max-width:380px;padding:18px;background:#fff;color:#252525;border:1px solid #bbb;border-radius:8px;box-shadow:0 3px 18px #0003;font:14px/1.45 Arial,sans-serif}.wahali-recording-panel[hidden]{display:none}.wahali-recording-panel strong{font-size:16px}.wahali-recording-panel p{margin:8px 0 12px}.wahali-recording-panel button{margin:0 8px 0 0;padding:8px 14px;border:1px solid #444;border-radius:4px;background:#fff;color:#222;cursor:pointer}.wahali-recording-panel button:first-of-type{background:#383b32;color:white}@media(max-width:420px){.wahali-recording-panel{right:12px;max-width:none}}';
  document.head.appendChild(style);
  const settings = document.createElement('button');settings.type='button';settings.className='wahali-recording-settings';settings.textContent=text[4];
  const panel = document.createElement('section');panel.className='wahali-recording-panel';panel.setAttribute('aria-label',text[0]);panel.hidden=choice==='granted'||choice==='denied';
  const title=document.createElement('strong');title.textContent=text[0];const copy=document.createElement('p');copy.textContent=text[1];
  const allow=document.createElement('button');allow.type='button';allow.textContent=text[2];
  const deny=document.createElement('button');deny.type='button';deny.textContent=text[3];
  panel.append(title,copy,allow,deny);document.body.append(settings,panel);
  settings.addEventListener('click',()=>{panel.hidden=false;allow.focus();});
  allow.addEventListener('click',()=>{choice='granted';setChoice(choice);panel.hidden=true;load();});
  deny.addEventListener('click',()=>{const wasLoaded=loaded;choice='denied';setChoice(choice);panel.hidden=true;if(wasLoaded&&window.clarity){window.clarity('consentv2',{ad_Storage:'denied',analytics_Storage:'denied'});location.reload();}});
  if(choice==='granted')load();
})();
