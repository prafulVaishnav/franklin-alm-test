import {
  sampleRUM,
  buildBlock,
  loadHeader,
  loadFooter,
  decorateButtons,
  decorateIcons,
  decorateSections,
  decorateBlocks,
  decorateTemplateAndTheme,
  waitForLCP,
  loadBlocks,
  loadCSS,
} from './lib-franklin.js';

const LCP_BLOCKS = []; // add your LCP blocks to the list
window.hlx.RUM_GENERATION = 'project-1'; // add your RUM generation information here

function buildHeroBlock(main) {
  const h1 = main.querySelector('h1');
  const picture = main.querySelector('picture');
  // eslint-disable-next-line no-bitwise
  if (h1 && picture && (h1.compareDocumentPosition(picture) & Node.DOCUMENT_POSITION_PRECEDING)) {
    const section = document.createElement('div');
    section.append(buildBlock('hero', { elems: [picture, h1] }));
    main.prepend(section);
  }
}

/**
 * Builds all synthetic blocks in a container element.
 * @param {Element} main The container element
 */
function buildAutoBlocks(main) {
  try {
    buildHeroBlock(main);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Auto Blocking failed', error);
  }
}

/**
 * Decorates the main element.
 * @param {Element} main The main element
 */
// eslint-disable-next-line import/prefer-default-export
export function decorateMain(main) {
  // hopefully forward compatible button decoration
  decorateButtons(main);
  decorateIcons(main);
  buildAutoBlocks(main);
  decorateSections(main);
  decorateBlocks(main);
}

/**
 * loads everything needed to get to LCP.
 */
async function loadEager(doc) {
  document.documentElement.lang = 'en';
  decorateTemplateAndTheme();
  const main = doc.querySelector('main');
  if (main) {
    decorateMain(main);
    await waitForLCP(LCP_BLOCKS);
  }
}

/**
 * Adds the favicon.
 * @param {string} href The favicon URL
 */
export function addFavIcon(href) {
  const link = document.createElement('link');
  link.rel = 'icon';
  link.type = 'image/svg+xml';
  link.href = href;
  const existingLink = document.querySelector('head link[rel="icon"]');
  if (existingLink) {
    existingLink.parentElement.replaceChild(link, existingLink);
  } else {
    document.getElementsByTagName('head')[0].appendChild(link);
  }
}

/**
 * loads everything that doesn't need to be delayed.
 */
async function loadLazy(doc) {
  const main = doc.querySelector('main');
  await loadBlocks(main);

  const { hash } = window.location;
  const element = hash ? main.querySelector(hash) : false;
  if (hash && element) element.scrollIntoView();

  loadHeader(doc.querySelector('header'));
  loadFooter(doc.querySelector('footer'));

  loadCSS(`${window.hlx.codeBasePath}/styles/lazy-styles.css`);
  addFavIcon(`${window.hlx.codeBasePath}/styles/favicon.svg`);
  sampleRUM('lazy');
  sampleRUM.observe(main.querySelectorAll('div[data-block-name]'));
  sampleRUM.observe(main.querySelectorAll('picture > img'));
}

/**
 * loads everything that happens a lot later, without impacting
 * the user experience.
 */
function loadDelayed() {
  // eslint-disable-next-line import/no-cycle
  window.setTimeout(() => import('./delayed.js'), 3000);
  // load anything that can be postponed to the latest here
}

function loadNonLoggedIn() {
  const nonLoggedInDiv = document.getElementsByClassName('non-logged-in');
  if (nonLoggedInDiv.length > 0) {
    window.almCDNBaseURL="https://cpcontentsqe.adobe.com/public/alm-non-logged-in";
    let rootDiv = document.createElement('div');
    rootDiv.setAttribute("id", "root");
    nonLoggedInDiv[0].appendChild(rootDiv);
    //window.ALM = {};
    loadCSS(`${window.hlx.codeBasePath}/styles/nli.css`);
    import('./nli.js');
    const configs = "{\"almBaseURL\":\"https://learningmanagerqe.adobe.com\",\"primeApiURL\":\"https://learningmanagerqe.adobe.com/primeapi/v2/\",\"cdnBaseUrl\":\"https:\",\"esBaseUrl\":\"https://primeapps-stage.adobe.com/almsearch/api/v1/qe/1849/6e573293-b40b-49a8-87fc-fd6219ead7ae\",\"almCdnBaseUrl\":\"https://cpcontentsqe.adobe.com/public/guest/qe/api/6e573293-b40b-49a8-87fc-fd6219ead7ae/1849\",\"usageType\":\"aem-es\",\"mountingPoints\":{\"catalogContainer\":\".catalog__container\",\"trainingOverviewPage\":\".training__page__container\",\"boardsContainer\":\".boards__container\",\"boardContainer\":\".board__container\",\"notificationContainer\":\".notification__container\",\"instanceContainer\":\".instance__container\",\"profilePageContainer\":\".profile__container\",\"userSkillsContainer\":\".skills__container\",\"activeFieldsContainer\":\".activeFields__container\"},\"accountData\":\"{\\\"data\\\":{\\\"id\\\":\\\"1849\\\",\\\"type\\\":\\\"account\\\",\\\"attributes\\\":{\\\"logoStyling\\\":\\\"LOGO_NAME\\\",\\\"logoUrl\\\":\\\"https://cpcontentsqe.adobe.com/public/account/1849/accountassets/1849/flower.jpg\\\",\\\"name\\\":\\\"DEMO-ACCOUNT DEMO-ACCOUNTDEMO-ACCOUNT\\\",\\\"subdomain\\\":\\\"sellers\\\",\\\"themeData\\\":\\\"{\\\\\\\"id\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"name\\\\\\\":\\\\\\\"Default\\\\\\\",\\\\\\\"url\\\\\\\":\\\\\\\"https://cpcontentsqe.adobe.com/public/account/1849/accountassets/1849/accounttheme/acapthemec8ccea668f104b60a3e3602fb3b0e19a.css\\\\\\\",\\\\\\\"className\\\\\\\":\\\\\\\"prime-default\\\\\\\",\\\\\\\"brandColor\\\\\\\":\\\\\\\"#fff\\\\\\\",\\\\\\\"sidebarIconColor\\\\\\\":\\\\\\\"#f37254\\\\\\\",\\\\\\\"sidebarColor\\\\\\\":\\\\\\\"#232323\\\\\\\",\\\\\\\"widgetPrimaryColor\\\\\\\":\\\\\\\"#4283d0\\\\\\\",\\\\\\\"useSameColorsFromThemeInPlayer\\\\\\\":false,\\\\\\\"playerPrimaryColor\\\\\\\":\\\\\\\"#232323\\\\\\\",\\\\\\\"playerSecondaryDarker\\\\\\\":\\\\\\\"#111111\\\\\\\",\\\\\\\"playerSecondaryLighter\\\\\\\":\\\\\\\"#3B3B3B\\\\\\\",\\\\\\\"playerFontPrimary\\\\\\\":\\\\\\\"#FFFFFF\\\\\\\",\\\\\\\"playerFontSecondary\\\\\\\":\\\\\\\"#D2D2D2\\\\\\\",\\\\\\\"playerBackground\\\\\\\":\\\\\\\"#000000\\\\\\\",\\\\\\\"playerAccentColor\\\\\\\":\\\\\\\"#ddfc03\\\\\\\"}\\\",\\\"accountTerminologies\\\":[{\\\"entityType\\\":\\\"MODULE\\\",\\\"locale\\\":\\\"en-US\\\",\\\"name\\\":\\\"Module\\\",\\\"pluralName\\\":\\\"Modules\\\"},{\\\"entityType\\\":\\\"COURSE\\\",\\\"locale\\\":\\\"en-US\\\",\\\"name\\\":\\\"Course\\\",\\\"pluralName\\\":\\\"Courses\\\"},{\\\"entityType\\\":\\\"LEARNING_PATH\\\",\\\"locale\\\":\\\"en-US\\\",\\\"name\\\":\\\"Learning Path\\\",\\\"pluralName\\\":\\\"Learning Paths\\\"},{\\\"entityType\\\":\\\"CERTIFICATION\\\",\\\"locale\\\":\\\"en-US\\\",\\\"name\\\":\\\"Certification\\\",\\\"pluralName\\\":\\\"Certifications\\\"},{\\\"entityType\\\":\\\"LEARNING_PLAN\\\",\\\"locale\\\":\\\"en-US\\\",\\\"name\\\":\\\"Learning Plan\\\",\\\"pluralName\\\":\\\"Learning Plans\\\"},{\\\"entityType\\\":\\\"JOB_AID\\\",\\\"locale\\\":\\\"en-US\\\",\\\"name\\\":\\\"Job Aid\\\",\\\"pluralName\\\":\\\"Job Aids\\\"},{\\\"entityType\\\":\\\"CATALOG\\\",\\\"locale\\\":\\\"en-US\\\",\\\"name\\\":\\\"Catalog\\\",\\\"pluralName\\\":\\\"Catalogs\\\"},{\\\"entityType\\\":\\\"SKILL\\\",\\\"locale\\\":\\\"en-US\\\",\\\"name\\\":\\\"Skill\\\",\\\"pluralName\\\":\\\"Skills\\\"},{\\\"entityType\\\":\\\"BADGE\\\",\\\"locale\\\":\\\"en-US\\\",\\\"name\\\":\\\"Badge\\\",\\\"pluralName\\\":\\\"Badges\\\"},{\\\"entityType\\\":\\\"ANNOUNCEMENT\\\",\\\"locale\\\":\\\"en-US\\\",\\\"name\\\":\\\"Announcement\\\",\\\"pluralName\\\":\\\"Announcements\\\"},{\\\"entityType\\\":\\\"MY_LEARNING\\\",\\\"locale\\\":\\\"en-US\\\",\\\"name\\\":\\\"My Learning\\\",\\\"pluralName\\\":\\\"My Learning\\\"},{\\\"entityType\\\":\\\"LEADERBOARD\\\",\\\"locale\\\":\\\"en-US\\\",\\\"name\\\":\\\"Leaderboard\\\",\\\"pluralName\\\":\\\"Leaderboard\\\"},{\\\"entityType\\\":\\\"EFFECTIVENESS\\\",\\\"locale\\\":\\\"en-US\\\",\\\"name\\\":\\\"Effectiveness\\\",\\\"pluralName\\\":\\\"Effectiveness\\\"},{\\\"entityType\\\":\\\"PREREQUISITE\\\",\\\"locale\\\":\\\"en-US\\\",\\\"name\\\":\\\"Prerequisite\\\",\\\"pluralName\\\":\\\"Prerequisites\\\"},{\\\"entityType\\\":\\\"PREWORK\\\",\\\"locale\\\":\\\"en-US\\\",\\\"name\\\":\\\"Prework\\\",\\\"pluralName\\\":\\\"Prework\\\"},{\\\"entityType\\\":\\\"CORE_CONTENT\\\",\\\"locale\\\":\\\"en-US\\\",\\\"name\\\":\\\"Core Content\\\",\\\"pluralName\\\":\\\"Core Content\\\"},{\\\"entityType\\\":\\\"TESTOUT\\\",\\\"locale\\\":\\\"en-US\\\",\\\"name\\\":\\\"Testout\\\",\\\"pluralName\\\":\\\"Testout\\\"},{\\\"entityType\\\":\\\"SELF_PACED\\\",\\\"locale\\\":\\\"en-US\\\",\\\"name\\\":\\\"Self Paced\\\",\\\"pluralName\\\":\\\"Self Paced\\\"},{\\\"entityType\\\":\\\"BLENDED\\\",\\\"locale\\\":\\\"en-US\\\",\\\"name\\\":\\\"Blended\\\",\\\"pluralName\\\":\\\"Blended\\\"},{\\\"entityType\\\":\\\"CLASSROOM\\\",\\\"locale\\\":\\\"en-US\\\",\\\"name\\\":\\\"Classroom\\\",\\\"pluralName\\\":\\\"Classrooms\\\"},{\\\"entityType\\\":\\\"VIRTUAL_CLASSROOM\\\",\\\"locale\\\":\\\"en-US\\\",\\\"name\\\":\\\"Virtual Classroom\\\",\\\"pluralName\\\":\\\"Virtual Classroom\\\"},{\\\"entityType\\\":\\\"ACTIVITY\\\",\\\"locale\\\":\\\"en-US\\\",\\\"name\\\":\\\"Activity\\\",\\\"pluralName\\\":\\\"Activities\\\"},{\\\"entityType\\\":\\\"PATH\\\",\\\"locale\\\":\\\"en-US\\\",\\\"name\\\":\\\"Path\\\",\\\"pluralName\\\":\\\"Paths\\\"},{\\\"entityType\\\":\\\"SKILL_LEVEL\\\",\\\"locale\\\":\\\"en-US\\\",\\\"name\\\":\\\"Skill Level\\\",\\\"pluralName\\\":\\\"Skill Levels\\\"},{\\\"entityType\\\":\\\"SOCIAL_LEARNING\\\",\\\"locale\\\":\\\"en-US\\\",\\\"name\\\":\\\"Social Learning\\\",\\\"pluralName\\\":\\\"Social Learning\\\"},{\\\"entityType\\\":\\\"SOCIAL\\\",\\\"locale\\\":\\\"en-US\\\",\\\"name\\\":\\\"Social\\\",\\\"pluralName\\\":\\\"Social\\\"}],\\\"filterPanelSetting\\\":{\\\"catalog\\\":true,\\\"duration\\\":true,\\\"format\\\":true,\\\"price\\\":true,\\\"priceRange\\\":true,\\\"skill\\\":true,\\\"skillLevel\\\":true,\\\"tag\\\":true,\\\"type\\\":true},\\\"learnerHelpLinks\\\":[{\\\"isDefault\\\":true,\\\"localizedHelpLink\\\":[{\\\"link\\\":\\\"https://helpx.adobe.com//captivate-prime/learners.html\\\",\\\"locale\\\":\\\"en-US\\\",\\\"name\\\":\\\"Help\\\"},{\\\"link\\\":\\\"https://helpx.adobe.com//captivate-prime/learners.html\\\",\\\"locale\\\":\\\"de-DE\\\",\\\"name\\\":\\\"Hilfe\\\"},{\\\"link\\\":\\\"https://helpx.adobe.com//captivate-prime/learners.html\\\",\\\"locale\\\":\\\"fr-FR\\\",\\\"name\\\":\\\"Aide\\\"},{\\\"link\\\":\\\"https://helpx.adobe.com//captivate-prime/learners.html\\\",\\\"locale\\\":\\\"zh-CN\\\",\\\"name\\\":\\\"帮助\\\"},{\\\"link\\\":\\\"https://helpx.adobe.com//captivate-prime/learners.html\\\",\\\"locale\\\":\\\"es-ES\\\",\\\"name\\\":\\\"Ayuda\\\"},{\\\"link\\\":\\\"https://helpx.adobe.com//captivate-prime/learners.html\\\",\\\"locale\\\":\\\"it-IT\\\",\\\"name\\\":\\\"Guida\\\"},{\\\"link\\\":\\\"https://helpx.adobe.com//captivate-prime/learners.html\\\",\\\"locale\\\":\\\"pt-BR\\\",\\\"name\\\":\\\"Ajuda\\\"},{\\\"link\\\":\\\"https://helpx.adobe.com//captivate-prime/learners.html\\\",\\\"locale\\\":\\\"ja-JP\\\",\\\"name\\\":\\\"ヘルプ\\\"},{\\\"link\\\":\\\"https://helpx.adobe.com//captivate-prime/learners.html\\\",\\\"locale\\\":\\\"nl-NL\\\",\\\"name\\\":\\\"Help\\\"},{\\\"link\\\":\\\"https://helpx.adobe.com//captivate-prime/learners.html\\\",\\\"locale\\\":\\\"pl-PL\\\",\\\"name\\\":\\\"Pomoc\\\"},{\\\"link\\\":\\\"https://helpx.adobe.com//captivate-prime/learners.html\\\",\\\"locale\\\":\\\"zz-ZZ\\\",\\\"name\\\":\\\"Help\\\"},{\\\"link\\\":\\\"https://helpx.adobe.com//captivate-prime/learners.html\\\",\\\"locale\\\":\\\"tr-TR\\\",\\\"name\\\":\\\"Yardım\\\"},{\\\"link\\\":\\\"https://helpx.adobe.com//captivate-prime/learners.html\\\",\\\"locale\\\":\\\"ko-KR\\\",\\\"name\\\":\\\"도움말\\\"},{\\\"link\\\":\\\"https://helpx.adobe.com//captivate-prime/learners.html\\\",\\\"locale\\\":\\\"ru-RU\\\",\\\"name\\\":\\\"Помощь\\\"},{\\\"link\\\":\\\"https://helpx.adobe.com//captivate-prime/learners.html\\\",\\\"locale\\\":\\\"id-ID\\\",\\\"name\\\":\\\"Help\\\"},{\\\"link\\\":\\\"https://helpx.adobe.com//captivate-prime/learners.html\\\",\\\"locale\\\":\\\"nb-NO\\\",\\\"name\\\":\\\"Hjelp\\\"}]},{\\\"isDefault\\\":true,\\\"localizedHelpLink\\\":[{\\\"link\\\":\\\"haridas+qe1@adobe.com;gfghgf\\\",\\\"locale\\\":\\\"en-US\\\",\\\"name\\\":\\\"Contact Admin\\\"},{\\\"link\\\":\\\"haridas+qe1@adobe.com;gfghgf\\\",\\\"locale\\\":\\\"de-DE\\\",\\\"name\\\":\\\"Administrator kontaktieren\\\"},{\\\"link\\\":\\\"haridas+qe1@adobe.com;gfghgf\\\",\\\"locale\\\":\\\"fr-FR\\\",\\\"name\\\":\\\"Contactez votre administrateur.\\\"},{\\\"link\\\":\\\"haridas+qe1@adobe.com;gfghgf\\\",\\\"locale\\\":\\\"zh-CN\\\",\\\"name\\\":\\\"联系管理员\\\"},{\\\"link\\\":\\\"haridas+qe1@adobe.com;gfghgf\\\",\\\"locale\\\":\\\"es-ES\\\",\\\"name\\\":\\\"Contactar con el administrador\\\"},{\\\"link\\\":\\\"haridas+qe1@adobe.com;gfghgf\\\",\\\"locale\\\":\\\"it-IT\\\",\\\"name\\\":\\\"Contatta l’Amministratore\\\"},{\\\"link\\\":\\\"haridas+qe1@adobe.com;gfghgf\\\",\\\"locale\\\":\\\"pt-BR\\\",\\\"name\\\":\\\"Entrar em contato com o administrador\\\"},{\\\"link\\\":\\\"haridas+qe1@adobe.com;gfghgf\\\",\\\"locale\\\":\\\"ja-JP\\\",\\\"name\\\":\\\"管理者に問い合わせる\\\"},{\\\"link\\\":\\\"haridas+qe1@adobe.com;gfghgf\\\",\\\"locale\\\":\\\"nl-NL\\\",\\\"name\\\":\\\"Contact opnemen met beheerder\\\"},{\\\"link\\\":\\\"haridas+qe1@adobe.com;gfghgf\\\",\\\"locale\\\":\\\"pl-PL\\\",\\\"name\\\":\\\"Skontaktuj się z administratorem\\\"},{\\\"link\\\":\\\"haridas+qe1@adobe.com;gfghgf\\\",\\\"locale\\\":\\\"zz-ZZ\\\",\\\"name\\\":\\\"Contact Admin\\\"},{\\\"link\\\":\\\"haridas+qe1@adobe.com;gfghgf\\\",\\\"locale\\\":\\\"tr-TR\\\",\\\"name\\\":\\\"Yönetici ile İletişim Kurun\\\"},{\\\"link\\\":\\\"haridas+qe1@adobe.com;gfghgf\\\",\\\"locale\\\":\\\"ko-KR\\\",\\\"name\\\":\\\"책임자에게 문의\\\"},{\\\"link\\\":\\\"haridas+qe1@adobe.com;gfghgf\\\",\\\"locale\\\":\\\"ru-RU\\\",\\\"name\\\":\\\"Обратиться к администратору\\\"},{\\\"link\\\":\\\"haridas+qe1@adobe.com;gfghgf\\\",\\\"locale\\\":\\\"id-ID\\\",\\\"name\\\":\\\"Contact Admin\\\"},{\\\"link\\\":\\\"haridas+qe1@adobe.com;gfghgf\\\",\\\"locale\\\":\\\"nb-NO\\\",\\\"name\\\":\\\"Kontakt administrator\\\"}]},{\\\"isDefault\\\":false,\\\"localizedHelpLink\\\":[{\\\"link\\\":\\\"https://google.com\\\",\\\"locale\\\":\\\"en-US\\\",\\\"name\\\":\\\"google\\\"},{\\\"link\\\":\\\"https://google.com\\\",\\\"locale\\\":\\\"de-DE\\\",\\\"name\\\":\\\"google\\\"},{\\\"link\\\":\\\"https://google.com\\\",\\\"locale\\\":\\\"fr-FR\\\",\\\"name\\\":\\\"google\\\"},{\\\"link\\\":\\\"https://google.com\\\",\\\"locale\\\":\\\"zh-CN\\\",\\\"name\\\":\\\"google\\\"},{\\\"link\\\":\\\"https://google.com\\\",\\\"locale\\\":\\\"es-ES\\\",\\\"name\\\":\\\"google\\\"},{\\\"link\\\":\\\"https://google.com\\\",\\\"locale\\\":\\\"it-IT\\\",\\\"name\\\":\\\"google\\\"},{\\\"link\\\":\\\"https://google.com\\\",\\\"locale\\\":\\\"pt-BR\\\",\\\"name\\\":\\\"google\\\"},{\\\"link\\\":\\\"https://google.com\\\",\\\"locale\\\":\\\"ja-JP\\\",\\\"name\\\":\\\"google\\\"},{\\\"link\\\":\\\"https://google.com\\\",\\\"locale\\\":\\\"nl-NL\\\",\\\"name\\\":\\\"google\\\"},{\\\"link\\\":\\\"https://google.com\\\",\\\"locale\\\":\\\"pl-PL\\\",\\\"name\\\":\\\"google\\\"},{\\\"link\\\":\\\"https://google.com\\\",\\\"locale\\\":\\\"zz-ZZ\\\",\\\"name\\\":\\\"google\\\"},{\\\"link\\\":\\\"https://google.com\\\",\\\"locale\\\":\\\"tr-TR\\\",\\\"name\\\":\\\"google\\\"},{\\\"link\\\":\\\"https://google.com\\\",\\\"locale\\\":\\\"ko-KR\\\",\\\"name\\\":\\\"google\\\"},{\\\"link\\\":\\\"https://google.com\\\",\\\"locale\\\":\\\"ru-RU\\\",\\\"name\\\":\\\"google\\\"},{\\\"link\\\":\\\"https://google.com\\\",\\\"locale\\\":\\\"id-ID\\\",\\\"name\\\":\\\"google\\\"},{\\\"link\\\":\\\"https://google.com\\\",\\\"locale\\\":\\\"nb-NO\\\",\\\"name\\\":\\\"google\\\"}]}]}}}\",\"locale\":\"en_US\",\"themeData\":{\"id\":\"0\",\"name\":\"Default\",\"url\":\"https://cpcontentsqe.adobe.com/public/account/1849/accountassets/1849/accounttheme/acapthemec8ccea668f104b60a3e3602fb3b0e19a.css\",\"className\":\"prime-default\",\"brandColor\":\"#fff\",\"sidebarIconColor\":\"#f37254\",\"sidebarColor\":\"#232323\",\"widgetPrimaryColor\":\"#4283d0\",\"useSameColorsFromThemeInPlayer\":false,\"playerPrimaryColor\":\"#232323\",\"playerSecondaryDarker\":\"#111111\",\"playerSecondaryLighter\":\"#3B3B3B\",\"playerFontPrimary\":\"#FFFFFF\",\"playerFontSecondary\":\"#D2D2D2\",\"playerBackground\":\"#000000\",\"playerAccentColor\":\"#ddfc03\"}}";
    window.ALM.ALMConfig = JSON.parse(configs);
  }
}

async function loadPage() {
  await loadEager(document);
  await loadLazy(document);
  loadDelayed();
  loadNonLoggedIn();
}

loadPage();
