// Contenuti del sito. Tutto ciò che si legge in pagina sta qui, in italiano (it) e inglese (en).
// I testi sono quelli del vecchio sito giovanniseneca.it, con refusi sistemati.

export const LANGS = ['it', 'en'];

export const SITE = {
  name: 'Giovanni Seneca',
  url: (process.env.SITE_URL || 'https://www.giovanniseneca.it').replace(/\/$/, ''),
  email: 'info@giovanniseneca.it',
  phone: '+39 335 8175803',
  phoneTel: '+393358175803',
  year: new Date().getFullYear(),
};

export const LINKS = {
  // Streaming (DistroKid distribuisce su tutte le piattaforme)
  spotify: 'https://open.spotify.com/intl-it/artist/26uRLwPbRTD3WtLhRaXdri/discography/album',
  appleMusic: 'https://music.apple.com/it/artist/giovanni-seneca/1712989382',
  youtubeMusic: 'https://www.youtube.com/channel/UCERQMnGJ4K-M6dtjR_wt-cw',
  // Social
  youtube: 'https://www.youtube.com/channel/UCHEmR9IA0n7dXZR3SrwG9RQ',
  facebook: 'https://www.facebook.com/SenecaGiovanni',
  instagram: 'https://www.instagram.com/giovanniseneca/',
  // Altro
  adriatico: 'https://www.adriaticomediterraneo.eu',
  rara: 'http://www.rara.it/',
  credit: 'https://www.massimomorgante.it',
};

// ---------------------------------------------------------------------------
// Struttura: una onepage (/ e /en/) con le sezioni sotto, più una scheda per ogni album.
// ---------------------------------------------------------------------------
export const HOME_PATH = { it: '/', en: '/en/' };
export const SECTION = {
  bio: { it: 'biografia', en: 'biography' },
  projects: { it: 'progetti', en: 'projects' },
  albums: { it: 'album', en: 'albums' },
  gallery: { it: 'gallery', en: 'gallery' },
  booking: { it: 'booking', en: 'booking' },
};
export const sectionHref = (key, lang) => `${HOME_PATH[lang]}#${SECTION[key][lang]}`;
export const albumUrl = (slug, lang) => (lang === 'en' ? `/en/albums/${slug}/` : `/album/${slug}/`);

// ---------------------------------------------------------------------------
// Interfaccia
// ---------------------------------------------------------------------------
export const UI = {
  it: {
    skip: 'Vai al contenuto',
    menu: 'Menu',
    closeMenu: 'Chiudi il menu',
    langName: 'Italiano',
    switchTo: 'English',
    switchLabel: 'Read this page in English',
    nav: { bio: 'Biografia', projects: 'Progetti', albums: 'Album', gallery: 'Gallery', booking: 'Booking' },
    listenTo: 'Ascolta su',
    social: 'Social',
    artisticDirection: 'Direzione artistica',
    siteBy: 'Sito a cura di',
    rights: 'Tutti i diritti riservati',
    footerNav: 'Esplora',
    play: 'Riproduci il video',
    prev: 'Precedente',
    next: 'Successivo',
    close: 'Chiudi',
    copyEmail: 'Copia email',
    copied: 'Email copiata',
    notFoundTitle: 'Pagina non trovata',
    notFoundText: 'L’indirizzo non esiste più o è stato spostato. Da qui puoi tornare alla home o scegliere una sezione.',
    backHome: 'Torna alla home',
    allAlbums: 'Tutti gli album',
    nextAlbum: 'Album successivo',
    prevAlbum: 'Album precedente',
    credits: 'Crediti',
    watch: 'Video',
    photoOf: 'Foto',
    openPhoto: 'Apri la foto',
  },
  en: {
    skip: 'Skip to content',
    menu: 'Menu',
    closeMenu: 'Close menu',
    langName: 'English',
    switchTo: 'Italiano',
    switchLabel: 'Leggi questa pagina in italiano',
    nav: { bio: 'Biography', projects: 'Projects', albums: 'Albums', gallery: 'Gallery', booking: 'Booking' },
    listenTo: 'Listen on',
    social: 'Social',
    artisticDirection: 'Artistic direction',
    siteBy: 'Site by',
    rights: 'All rights reserved',
    footerNav: 'Explore',
    play: 'Play video',
    prev: 'Previous',
    next: 'Next',
    close: 'Close',
    copyEmail: 'Copy email',
    copied: 'Email copied',
    notFoundTitle: 'Page not found',
    notFoundText: 'This address no longer exists or has moved. You can go back home or pick a section.',
    backHome: 'Back to home',
    allAlbums: 'All albums',
    nextAlbum: 'Next album',
    prevAlbum: 'Previous album',
    credits: 'Credits',
    watch: 'Video',
    photoOf: 'Photo',
    openPhoto: 'Open photo',
  },
};

// ---------------------------------------------------------------------------
// Home
// ---------------------------------------------------------------------------
export const HOME = {
  it: {
    title: 'Giovanni Seneca | Chitarrista e compositore',
    description:
      'Giovanni Seneca, chitarrista e compositore napoletano. Chitarra classica, flamenca e battente tra musica colta e tradizioni del Mediterraneo. Dischi, concerti e booking.',
    role: 'Chitarrista e compositore',
    lead: 'Chitarre classica, flamenca e battente per fondere la musica colta con il linguaggio popolare del Mediterraneo.',
    ctaAlbums: 'Ascolta gli album',
    ctaBooking: 'Booking',
    reelTitle: 'Dal vivo',
    quote: 'Ennio Morricone ha composto per lui un concerto per chitarra e orchestra.',
    quoteNote:
      'Eseguito in prima assoluta a Parigi e inciso con l’Orchestra Nazionale dell’Accademia di Santa Cecilia di Roma.',
    projectsTitle: 'Progetti',
    albumsTitle: 'Dischi',
    albumsLead: 'Sei album di musica originale, disponibili su tutte le piattaforme.',
    citiesTitle: 'Ha suonato a',
  },
  en: {
    title: 'Giovanni Seneca | Guitarist and composer',
    description:
      'Giovanni Seneca, guitarist and composer from Naples. Classical, flamenco and battente guitars between art music and Mediterranean traditions. Albums, concerts and booking.',
    role: 'Guitarist and composer',
    lead: 'Classical, flamenco and battente guitars, blending art music with the popular language of the Mediterranean.',
    ctaAlbums: 'Listen to the albums',
    ctaBooking: 'Booking',
    reelTitle: 'Live',
    quote: 'Ennio Morricone wrote a concerto for guitar and orchestra for him.',
    quoteNote:
      'Premiered in Paris and recorded with the Orchestra Nazionale dell’Accademia di Santa Cecilia in Rome.',
    projectsTitle: 'Projects',
    albumsTitle: 'Albums',
    albumsLead: 'Six albums of original music, available on every platform.',
    citiesTitle: 'Has performed in',
  },
};

export const CITIES = {
  it: ['Parigi', 'Berlino', 'New York', 'Philadelphia', 'Tel Aviv', 'Sarajevo', 'Atene', 'Algeri', 'Belgrado', 'Smirne', 'Durazzo', 'Hammamet', 'Alessandria d’Egitto', 'Il Cairo', 'Istanbul', 'Zagabria', 'Podgorica', 'Casablanca', 'Budapest', 'Wellington'],
  en: ['Paris', 'Berlin', 'New York', 'Philadelphia', 'Tel Aviv', 'Sarajevo', 'Athens', 'Algiers', 'Belgrade', 'Izmir', 'Durrës', 'Hammamet', 'Alexandria', 'Cairo', 'Istanbul', 'Zagreb', 'Podgorica', 'Casablanca', 'Budapest', 'Wellington'],
};

// ---------------------------------------------------------------------------
// Biografia
// ---------------------------------------------------------------------------
export const BIO = {
  it: {
    title: 'Biografia | Giovanni Seneca',
    description:
      'Biografia di Giovanni Seneca: nato a Napoli, diplomato a Pesaro con lode e perfezionato a Parigi. Solista con le orchestre, musiche per il teatro, un concerto scritto per lui da Ennio Morricone.',
    h1: 'Biografia',
    role: 'Chitarrista e compositore',
    paras: [
      'Giovanni Seneca, chitarrista e compositore, è nato a Napoli e ha conseguito il diploma al Conservatorio Gioacchino Rossini di Pesaro con il massimo dei voti e la lode. Ha vissuto sei anni a Parigi, dove si è specializzato all’École Normale de Musique e al Conservatoire Ravel.',
      'La sua ricerca musicale è rivolta a fondere elementi provenienti dalla musica classica in un linguaggio popolare. In questa direzione l’utilizzo di diverse chitarre, in particolare quella battente, permette di esplorare timbri e colori che aiutano a sottolineare e accompagnare questo percorso estetico. Ha realizzato produzioni in vari ambiti, scrivendo e interpretando canzoni, brani solistici, cameristici e orchestrali.',
      'Si è esibito nelle maggiori città e nei maggiori teatri italiani, come anche a Parigi, Berlino, New York, Philadelphia, Tel Aviv, Sarajevo, Atene, Algeri, Belgrado, Smirne, Durazzo, Hammamet, Alessandria d’Egitto, Il Cairo, Istanbul, Zagabria, Podgorica, Casablanca, Budapest e Wellington.',
      'È stato ospite solista nelle stagioni di molte orchestre, tra cui l’Orchestra Sinfonica della Rai, l’Orchestre des Concerts Lamoureux di Parigi, l’Orchestre Symphonique Français di Parigi, l’Orchestre Philharmonique di Cannes, in Costa Azzurra, e l’Orchestra Filarmonica Marchigiana.',
      'In ambito teatrale ha scritto musiche per spettacoli con attori e intellettuali come Moni Ovadia, Erri De Luca, Dario Vergassola e David Riondino. È stato invitato come ospite musicale in diversi programmi radiofonici e televisivi della Rai e di France Musique. I telegiornali, sia nazionali sia regionali, hanno dedicato alla sua attività numerosi servizi.',
    ],
    highlight:
      'Ennio Morricone ha composto per lui e gli ha dedicato un concerto per chitarra e orchestra, eseguito in prima assoluta a Parigi e inciso su cd con l’Orchestra Nazionale dell’Accademia di Santa Cecilia di Roma.',
    closing: [
      'Giovanni Seneca è docente titolare della cattedra di chitarra presso il Conservatorio Gioacchino Rossini di Pesaro e direttore artistico del progetto Adriatico Mediterraneo, che dal 2007 organizza eventi culturali e progetti di cooperazione internazionale. Ha pubblicato sei dischi a suo nome con musiche originali.',
    ],
    adriatico: 'Adriatico Mediterraneo',
    adriaticoText: 'Eventi culturali e progetti di cooperazione internazionale, dal 2007.',
    ctaAlbums: 'Ascolta i dischi',
    ctaBooking: 'Booking',
  },
  en: {
    title: 'Biography | Giovanni Seneca',
    description:
      'Biography of Giovanni Seneca: born in Naples in 1967, graduated cum laude in Pesaro, trained in Paris. Soloist with major orchestras, theatre composer, dedicatee of a concerto by Ennio Morricone.',
    h1: 'Biography',
    role: 'Guitarist and composer',
    paras: [
      'Giovanni Seneca was born in Naples in 1967. He graduated in 1988 from the Rossini Conservatory in Pesaro with full marks cum laude. In 1989 he moved to Paris, where he specialised in classical guitar, musical analysis and orchestration at the École Normale de Musique and at the Conservatoire Ravel.',
      'During his stay in Paris he began composing and increased his concert activity, always driven by the desire to engage with the different languages of music. Back in Italy he dedicated himself mainly to composition, writing and performing music for chamber groups and orchestras, but also for television, cinema, theatre and commercials.',
      'He has performed in the most important Italian cities, and in Paris, Berlin, Cannes, New York, Philadelphia, Tel Aviv, Sarajevo, Belgrade, Cairo, Istanbul, Alexandria, Hammamet, Athens, Zagreb, Podgorica, Algiers and Casablanca. In April 2009 he toured New Zealand with 12 concerts.',
      'He has appeared as soloist with the RAI Orchestra Sinfonica in Rome, the Orchestre des Concerts Lamoureux and the Orchestre Symphonique Français in Paris, the Orchestre Philharmonique de Cannes on the French Riviera, and the Orchestra Filarmonica Marchigiana in Ancona.',
    ],
    highlight:
      'The great Italian composer Ennio Morricone wrote and dedicated to Giovanni Seneca a concerto for guitar and orchestra, premiered in Paris and recorded on CD with the Orchestra Nazionale dell’Accademia di Santa Cecilia in Rome.',
    closing: [
      'His compositions also include music for theatre, with well-known Italian actors such as Moni Ovadia, David Riondino and Dario Vergassola.',
      'He teaches guitar at the Gioacchino Rossini Conservatory in Pesaro and is the artistic director of the Adriatico Mediterraneo project, which organises events in Italy and across the Mediterranean area. He has released six albums of original music under his own name.',
    ],
    adriatico: 'Adriatico Mediterraneo',
    adriaticoText: 'Cultural events and international cooperation projects, since 2007.',
    ctaAlbums: 'Listen to the albums',
    ctaBooking: 'Booking',
  },
};

// ---------------------------------------------------------------------------
// Progetti
// ---------------------------------------------------------------------------
export const PROJECTS_PAGE = {
  it: {
    title: 'Progetti | Giovanni Seneca',
    description:
      'I progetti di Giovanni Seneca: recital solo “Errando”, Trio Ecanes e Quartet/Quintet Ecanes. Chitarre, voce, fisarmonica, contrabbasso e percussioni mediterranee.',
    h1: 'Progetti',
    lead: 'Il chitarrista e la band: tre formazioni, un solo linguaggio.',
    lineup: 'Formazione',
    instruments: 'Strumenti utilizzati',
    bookIt: 'Booking',
  },
  en: {
    title: 'Projects | Giovanni Seneca',
    description:
      'Giovanni Seneca’s projects: the “Errando” solo recital, Trio Ecanes and Quartet/Quintet Ecanes. Guitars, voice, accordion, double bass and Mediterranean percussion.',
    h1: 'Projects',
    lead: 'The guitarist and the band: three formations, one language.',
    lineup: 'Line-up',
    instruments: 'Instruments used',
    bookIt: 'Booking',
  },
};

export const PROJECTS = [
  {
    id: 'solo',
    photo: 'battente',
    thumbPos: '22% 50%',
    title: { it: 'Solo', en: 'Solo' },
    subtitle: { it: 'Errando, recital di chitarre', en: 'Errando, a recital for guitars' },
    short: { it: 'Recital di chitarre', en: 'A recital for guitars' },
    videos: [{ id: '4WtOIXB5dqA', title: 'Taksim' }],
    blocks: {
      it: [
        {
          h: 'Il concerto',
          p: [
            'Questo concerto è un invito all’ascolto delle mie creazioni, piccoli universi scaturiti dalle chitarre che suono ogni giorno, strumenti magici rapiti da luoghi conosciuti che rivendicano la loro appartenenza a popoli e culture diverse e ricordano le sonorità sepolte nella nostra memoria.',
            'Errando è l’effetto dei miei viaggi fisici e onirici e anche dei miei errori.',
          ],
        },
        {
          h: 'Le composizioni',
          p: [
            'Spesso i suoni sono nell’aria. Durante ogni viaggio li percepisco, lontani ma familiari. Le melodie risuonano come nenie dell’infanzia o prepotenti come un profumo.',
            'Indossando gli abiti di un detective del suono lascio il corso principale della città e mi inoltro nel dedalo di viuzze che hanno resistito per secoli alle teorie urbanistiche, mi ritrovo così seduto alla terrazza di un ristorante qualsiasi di fronte al più bel panorama del mondo, distratto dalla quiete e dalla bellezza. Quei suoni vanno giù tra un boccone e un altro e sembrano non lasciare traccia, dimenticati come il sapore delle pietanze, l’odore delle spezie, il colore dei tramonti.',
            'Altre volte le melodie mettono le ali e i suoni li sorvolo guardando giù: sono sempre lì insieme ai colori e al profumo di spezie esotiche. I ricordi e gli oggetti che riporto dai viaggi, lontani dal loro contesto sembrano sbiaditi e fuori posto, ma i suoni che ho percepito restano dentro di me come le molecole dei cibi profumati e cucinati diversamente che ho assaggiato. Come un’alchimista manipolo le melodie facendo vibrare le corde del ricordo.',
            'È questo il momento in cui comincio a suonare le mie chitarre, per cercare di rievocare quei suoni e quelle sensazioni che ho vissuto e amato. Profumi, suoni e calore allora diventano qualcosa di tangibile.',
          ],
          sign: 'Giovanni Seneca',
        },
      ],
      en: [
        {
          h: 'The concert',
          p: [
            'This concert is an invitation to listen to my creations, small universes sprung from the guitars that I play every day: magical instruments ravished from known places, claiming their belonging to different peoples and cultures, and reminding of sonorities buried in our memories.',
            'Errando is the effect of my physical and dream journeys and of my mistakes too.',
          ],
        },
        {
          h: 'The compositions',
          p: [
            'Often sounds are in the air. In every journey I feel them, far but familiar. Melodies echo like lullabies from childhood, or overbearing like a scent.',
            'In the clothes of a sound detective, I leave the city’s main road and push myself into the maze of alleys that still hold on against centuries of city planning schemes. So I find myself sitting on the terrace of an ordinary restaurant in front of the most wonderful landscape in the world, distracted by the stillness and the beauty. Those sounds flow down in mouthfuls and it seems like they are not leaving any traces, forgotten like the flavor of the food, the smell of the spices, the color of sunsets.',
            'Sometimes melodies grow wings, and I fly over sounds, looking down: they are always there with the color and the scent of exotic spices. The memories and objects that I bring back from my journeys look faded and out of place when far from their context, but the sounds I perceived remain inside of me like the molecules of the sweet-smelling, differently cooked foods that I tasted. Like an alchemist I handle those melodies by making the strings of memory vibrate.',
            'This is the moment I start playing my guitars, trying to recall those sounds and those sensations that I lived and loved. Scents, sounds and heat then become something tangible.',
          ],
          sign: 'Giovanni Seneca',
        },
      ],
    },
    instruments: [
      { name: { it: 'Chitarra flamenca', en: 'Flamenco guitar' }, maker: 'Jesus Bellido, Granada 2005' },
      { name: { it: 'Chitarra battente', en: 'Battente guitar' }, maker: 'Rosalba de Bonis, Bisignano (CS) 2012' },
      { name: { it: 'Chitarra classica', en: 'Classical guitar' }, maker: 'Ignatio Fleta, Barcelona 1971' },
    ],
  },
  {
    id: 'trio',
    photo: 'live-viola',
    thumbPos: '50% 40%',
    title: { it: 'Trio Ecanes', en: 'Trio Ecanes' },
    subtitle: { it: 'Chitarra, percussioni e contrabbasso', en: 'Guitar, percussion and double bass' },
    short: { it: 'Chitarra, percussioni e contrabbasso', en: 'Guitar, percussion and double bass' },
    lineup: [
      { who: 'Giovanni Seneca', what: { it: 'chitarra', en: 'guitar' } },
      { who: 'Francesco Savoretti', what: { it: 'percussioni', en: 'percussion' } },
      { who: 'Gabriele Pesaresi', what: { it: 'contrabbasso', en: 'double bass' } },
    ],
    videos: [{ id: 'zFyvXxthKkQ', title: 'Diteglielo' }],
    blocks: {
      it: [
        {
          p: [
            'Il concerto è interamente basato su composizioni originali di Giovanni Seneca, che confeziona la propria musica con ingredienti ed elementi accuratamente selezionati dai generi musicali che ama di più: la tarantella, la rumba e la musica dell’Europa dell’est.',
            'In ogni composizione si aggiungono poi spezie e condimenti musicali provenienti sia dalla tradizione classica sia da quella contemporanea popolare. Nel concerto Seneca fa dialogare la sua chitarra con contrabbasso e percussioni, alla ricerca dell’anima popolare della musica: un contrasto cangiante di stili, citazioni e suggestioni musicali sintetizzate in un linguaggio personalissimo.',
          ],
        },
      ],
      en: [
        {
          p: [
            'In this project, a continuous mix of wandering and musical suggestions ideally inspired by the sea and ports of the Mediterranean, we meet different languages, sounds and colors.',
            'Each song comes from a musical memory, from an ethnic and geographical place, but while some songs change and join other suggestions, assuming the features of a new identity, others remain anchored to their roots, enhancing their authenticity. The show is based on the mix of popular songs from the Mediterranean area and Giovanni Seneca’s original compositions, in a really interesting balance between the learned and the popular, between classicism and modernity.',
            'Giovanni Seneca’s works are inspired by several Mediterranean cultures. Moving from the south of Italy, we start this evocative trip passing through Spain and North Africa, until the Balkan region.',
          ],
        },
      ],
    },
  },
  {
    id: 'quartet',
    anchor: { it: 'quartet', en: 'quartet' },
    photo: 'quintet',
    thumbPos: '58% 50%',
    title: { it: 'Quartet / Quintet Ecanes', en: 'Quartet / Quintet Ecanes' },
    subtitle: { it: 'Voce, chitarre, fisarmonica, contrabbasso e percussioni', en: 'Voice, guitars, accordion, double bass and percussion' },
    short: { it: 'Voce, chitarre e strumenti del Mediterraneo', en: 'Voice, guitars and Mediterranean instruments' },
    lineup: [
      {
        who: 'Giovanni Seneca',
        what: {
          it: 'chitarra flamenca e battente, composizioni e arrangiamenti',
          en: 'classical and battente guitar, compositions and arrangements',
        },
      },
      { who: 'Anissa Gouizi', what: { it: 'voce', en: 'vocals' } },
      { who: 'Danilo Di Paolonicola', what: { it: 'fisarmonica e organetto', en: 'accordion and melodeon' } },
      { who: 'Gabriele Pesaresi', what: { it: 'contrabbasso', en: 'double bass' } },
      { who: 'Francesco Savoretti', what: { it: 'percussioni mediterranee', en: 'Mediterranean percussion' } },
    ],
    videos: [
      { id: 'P-4LYskJgwI', title: 'Vent du Sud' },
      { id: 'JB21BFEyCIE', title: 'Stou Thoma' },
      { id: 'KKYuxfCACJM', title: 'Chante ma guitare' },
    ],
    blocks: {
      it: [
        {
          p: [
            'Ecanés è un progetto musicale di Giovanni Seneca. Le sue chitarre e le sue composizioni ci guidano in un percorso che fonde la tradizione classica con quella popolare, utilizzando stilemi che provengono da diverse aree musicali.',
            'La voce versatile di Anissa si fonde con gli strumenti interpretando alcuni canti tradizionali che abbracciano l’insieme delle tradizioni mediterranee in varie lingue e dialetti: ladino, francese, greco, serbo-croato, arabo, napoletano, pugliese, abruzzese, marchigiano. L’utilizzo di diversi tipi di chitarre (classica, battente e flamenca) esalta le sfumature di ogni composizione.',
            'Di particolare interesse è la chitarra battente, tipica della tradizione del sud Italia fin dal XIV secolo. Il suono di questo antico strumento è inconfondibile, diametralmente opposto a quello delle normali chitarre e più simile a un clavicembalo o a un saz. È ancora molto usato nella musica tradizionale, ma in questo cd, attraverso le composizioni di Seneca, approda a nuove sonorità che ne esaltano l’anima antica e popolare al tempo stesso.',
            'Le percussioni, la fisarmonica, l’organetto e il contrabbasso fanno da contrappunto a questo percorso estetico. I musicisti proiettano la tradizione in una dimensione internazionale, rivisitando con passione l’eredità musicale. Le tarante e i saltarelli si uniscono così alle culture del Mediterraneo e alle composizioni originali, in un contrasto cangiante di stili, citazioni e suggestioni musicali sintetizzate in un linguaggio personalissimo. Le timbriche antiche e mediterranee del riq, della darbuka o dei tamburi a cornice accompagnano l’ascoltatore in questo viaggio nel tempo e nelle culture, ricreando un paesaggio sonoro unico e avvolgente.',
          ],
        },
      ],
      en: [
        {
          p: [
            'Ecanés is a musical project by Giovanni Seneca. His guitars and his compositions lead us on an itinerary that mixes classical and popular tradition with styles from different musical areas.',
            'Anissa’s versatile voice blends with the instruments, interpreting traditional songs that cover the whole range of Mediterranean traditions in various languages and dialects: Ladino, French, Greek, Serbo-Croatian, Arabic, Neapolitan, Pugliese, Abruzzese and Marchigiano. The use of different kinds of guitar (classical, battente and flamenco) brings out the nuances of every composition.',
            'Of particular interest is the battente guitar, typical of the southern Italian tradition since the 14th century. The sound of this ancient instrument is unmistakable, the opposite of ordinary guitars and closer to a harpsichord or a saz. It is still widely used in traditional music, but on this album, through Seneca’s compositions, it reaches new sonorities that bring out its ancient and popular soul at once.',
            'Percussion, accordion, melodeon and double bass act as counterpoint to this aesthetic journey. The musicians project tradition into an international dimension, passionately revisiting the musical heritage. Tarantellas and saltarelli are thus joined to the cultures of the Mediterranean and to the original compositions, in a shimmering contrast of styles. Ancient Mediterranean timbres such as the riq, the darbuka and frame drums accompany the listener on this journey through time and cultures, creating a unique, enveloping soundscape.',
          ],
        },
      ],
    },
  },
];

// ---------------------------------------------------------------------------
// Album
// ---------------------------------------------------------------------------
export const ALBUMS_PAGE = {
  it: {
    title: 'Album | Giovanni Seneca',
    description:
      'La discografia di Giovanni Seneca: Margini Abitabili, Ecanes, Errando, Serenata Mediterranea, Mutaforme e Per Aspera. Ascolta su Spotify, Apple Music e YouTube.',
    h1: 'Album',
    lead: 'Sei dischi di musica originale per chitarra, dalla canzone d’autore all’orchestra d’archi.',
    listenAll: 'Ascolta tutti i dischi su',
    latest: 'Ultima uscita',
    // il link va alla discografia dell’artista, non al singolo disco
    streamNote: 'Tutti gli album sono disponibili su ogni piattaforma digitale.',
  },
  en: {
    title: 'Albums | Giovanni Seneca',
    description:
      'Giovanni Seneca’s discography: Margini Abitabili, Ecanes, Errando, Serenata Mediterranea, Mutaforme and Per Aspera. Listen on Spotify, Apple Music and YouTube.',
    h1: 'Albums',
    lead: 'Six albums of original music for guitar, from the singer-songwriter song to the string orchestra.',
    listenAll: 'Listen to all the albums on',
    latest: 'Latest release',
    streamNote: 'Every album is available on all digital platforms.',
  },
};

export const ALBUMS = [
  {
    slug: 'margini-abitabili',
    title: 'Margini Abitabili',
    year: '1999',
    yearNote: { it: 'Ristampa 2001, riedizione 2024', en: 'Reissued in 2001, re-released in 2024' },
    kind: { it: 'Canzoni e brani strumentali', en: 'Songs and instrumental pieces' },
    desc: {
      it: 'Registrazione acustica di canzoni e brani strumentali con musica originale composta e interpretata da Giovanni Seneca, su testi di Gilberto Severini, con ospite vocale Rossana Casale. Voce, chitarra, strumenti a fiato e fisarmonica.',
      en: 'Acoustic recording of songs and instrumental pieces with original music composed and performed by Giovanni Seneca, lyrics by Gilberto Severini, guest vocalist Rossana Casale. Voice, guitar, wind instruments and accordion.',
    },
    award: { it: 'Premio Piero Ciampi, Livorno 2000', en: 'Piero Ciampi Prize, Livorno 2000' },
    // Link diretti al singolo album (uscita 2024), oltre ai link all’artista
    direct: {
      spotify: 'https://open.spotify.com/intl-it/album/1h69ISTA23yQ96b9zmAgpG?si=SrK9nyHCRXuka6u1bR1d0A',
      appleMusic: 'https://music.apple.com/it/album/margini-abitabili/1781670578',
      amazonMusic: 'https://music.amazon.it/albums/B0DNZS617Z',
    },
    people: [
      [{ it: 'Produzione', en: 'Production' }, 'Leo Rossano per Master Studio'],
      [{ it: 'Voce e chitarre', en: 'Voice and guitars' }, 'Giovanni Seneca'],
      [{ it: 'Voce in “La Cometa del ’97” e “Compleanno al Bar”', en: 'Voice on “La Cometa del ’97” and “Compleanno al Bar”' }, 'Rossana Casale'],
      [{ it: 'Fisarmonica', en: 'Accordion' }, 'Roberto Lucanero'],
      [{ it: 'Flauto e sax', en: 'Flute and sax' }, 'Marco Agostinelli'],
      [{ it: 'Percussioni in “Napoli-Madrid” e “Anatre”', en: 'Percussion on “Napoli-Madrid” and “Anatre”' }, 'Alfredo Laviano'],
      [{ it: 'Sound engineer', en: 'Sound engineer' }, 'Luca Vittori'],
      [{ it: 'Assistente di studio', en: 'Studio assistant' }, 'Boris Panichi'],
      [{ it: 'Editing', en: 'Editing' }, 'Max Tempia'],
      [{ it: 'Mastering digitale', en: 'Digital mastering' }, 'Claudio Giussani, Nautilus, Milano'],
      [{ it: 'Immagine di copertina', en: 'Cover image' }, 'Umberto Grati'],
      [{ it: 'Progetto grafico', en: 'Graphic design' }, 'Ideazione Studio Grafico'],
      [{ it: 'Foto', en: 'Photos' }, 'Amedeo Fontani'],
      [{ it: 'Foto di Rossana Casale', en: 'Photo of Rossana Casale' }, 'Giac Casale'],
    ],
    notes: {
      it: [
        'Registrato e mixato presso Master Studio, Sarnano.',
        'La voce di Rossana Casale è stata registrata presso Forum Music Village, Roma (assistente di studio Federico Maria Lolli). “La Cometa del ’97” e “Compleanno al Bar” sono mixati da Luca Vittori presso Forum Music Village, Roma.',
        'Alcune tracce originali sono state registrate da Graziano Migliacci presso Le Vie dei Canti e L’Abbadia.',
      ],
      en: [
        'Recorded and mixed at Master Studio, Sarnano.',
        'Rossana Casale’s vocals were recorded at Forum Music Village, Rome (studio assistant Federico Maria Lolli). “La Cometa del ’97” and “Compleanno al Bar” were mixed by Luca Vittori at Forum Music Village, Rome.',
        'Some of the original tracks were recorded by Graziano Migliacci at Le Vie dei Canti and L’Abbadia.',
      ],
    },
    rights: '℗ 2001 Master Studio   © 2024 Pegasus Music',
  },
  {
    slug: 'ecanes',
    title: 'Ecanes',
    year: '2014',
    kind: { it: 'Chitarra, contrabbasso e percussioni', en: 'Guitar, double bass and percussion' },
    desc: {
      it: 'Registrazione acustica di brani strumentali per chitarra, contrabbasso e percussioni, con vari ospiti. Composizioni originali di Giovanni Seneca.',
      en: 'Acoustic recording of instrumental pieces for guitar, double bass and percussion, with various guests. Original compositions by Giovanni Seneca.',
    },
    people: [[{ it: 'Produzione', en: 'Production' }, 'RaRa records, Monsano (AN)'], [{ it: 'Edizioni', en: 'Publishing' }, 'ph music worx']],
  },
  {
    slug: 'errando',
    title: 'Errando',
    year: '2013',
    kind: { it: 'Chitarra sola', en: 'Solo guitar' },
    desc: {
      it: 'Registrazione acustica di brani strumentali per chitarra sola di Giovanni Seneca.',
      en: 'Acoustic recording of instrumental pieces for solo guitar by Giovanni Seneca.',
    },
    videos: [{ id: '4WtOIXB5dqA', title: 'Taksim' }],
    people: [[{ it: 'Produzione', en: 'Production' }, 'RaRa records, Monsano (AN)'], [{ it: 'Edizioni', en: 'Publishing' }, 'ph music worx']],
  },
  {
    slug: 'serenata-mediterranea',
    title: 'Serenata Mediterranea',
    year: '2010',
    kind: { it: 'Chitarra e orchestra d’archi', en: 'Guitar and string orchestra' },
    desc: {
      it: 'Registrazione acustica di brani strumentali per chitarra e orchestra d’archi di Giovanni Seneca, Luigi Boccherini e Joaquín Rodrigo, con l’orchestra d’archi FORM.',
      en: 'Acoustic recording of instrumental pieces for guitar and string orchestra by Giovanni Seneca, Luigi Boccherini and Joaquín Rodrigo, with the FORM string orchestra.',
    },
    people: [[{ it: 'Produzione', en: 'Production' }, 'RaRa records, Monsano (AN)'], [{ it: 'Edizioni', en: 'Publishing' }, 'ph music worx']],
  },
  {
    slug: 'mutaforme',
    title: 'Mutaforme',
    year: '2009',
    kind: { it: 'Chitarra ed elettronica', en: 'Guitar and electronics' },
    desc: {
      it: 'Registrazione acustica di brani strumentali per chitarra e strumenti elettronici di Giovanni Seneca.',
      en: 'Acoustic recording of instrumental pieces for guitar and electronic instruments by Giovanni Seneca.',
    },
    people: [[{ it: 'Produzione', en: 'Production' }, 'RaRa records, Monsano (AN)'], [{ it: 'Edizioni', en: 'Publishing' }, 'ph music worx']],
  },
  {
    slug: 'per-aspera',
    title: 'Per Aspera',
    year: '2008',
    kind: { it: 'Chitarra e strumenti vari', en: 'Guitar and various instruments' },
    desc: {
      it: 'Registrazione acustica di brani strumentali per chitarra e vari strumenti di Giovanni Seneca, con canzoni riarrangiate dell’area mediterranea.',
      en: 'Acoustic recording of instrumental pieces for guitar and various instruments by Giovanni Seneca, with rearranged songs from the Mediterranean area.',
    },
    people: [[{ it: 'Produzione', en: 'Production' }, 'RaRa records, Monsano (AN)'], [{ it: 'Edizioni', en: 'Publishing' }, 'ph music worx']],
  },
];

// ---------------------------------------------------------------------------
// Gallery
// ---------------------------------------------------------------------------
export const GALLERY_PAGE = {
  it: {
    title: 'Gallery | Giovanni Seneca',
    description: 'Foto di Giovanni Seneca in concerto e in posa con le sue chitarre: flamenca, battente e classica. Con il quartet, con Moni Ovadia e sul palco di Adriatico Mediterraneo.',
    h1: 'Gallery',
    lead: 'Concerti, ritratti e dettagli delle chitarre.',
    videoAlt: 'Giovanni Seneca in concerto con la chitarra battente',
  },
  en: {
    title: 'Gallery | Giovanni Seneca',
    description: 'Photos of Giovanni Seneca in concert and posing with his guitars: flamenco, battente and classical. With the quartet, with Moni Ovadia and on the Adriatico Mediterraneo stage.',
    h1: 'Gallery',
    lead: 'Concerts, portraits and details of the guitars.',
    videoAlt: 'Giovanni Seneca in concert with the battente guitar',
  },
};

// Ordine = ordine in pagina. caption solo dove il vecchio sito dava un’indicazione precisa.
export const GALLERY = [
  { key: 'chitarrista', alt: { it: 'Giovanni Seneca con la chitarra flamenca', en: 'Giovanni Seneca with the flamenco guitar' } },
  { key: 'quintet', alt: { it: 'Il quintetto sul palco di Adriatico Mediterraneo', en: 'The quintet on the Adriatico Mediterraneo stage' }, caption: { it: 'Rotte Mediterranee Quintet', en: 'Rotte Mediterranee Quintet' } },
  { key: 'tre-chitarre', alt: { it: 'Giovanni Seneca seduto tra tre chitarre', en: 'Giovanni Seneca sitting among three guitars' } },
  { key: 'ritratto', alt: { it: 'Giovanni Seneca accanto a una chitarra classica', en: 'Giovanni Seneca next to a classical guitar' } },
  { key: 'live-viola', alt: { it: 'Giovanni Seneca in concerto, con luci viola e turchesi', en: 'Giovanni Seneca in concert under purple and turquoise lights' } },
  { key: 'battente', alt: { it: 'Giovanni Seneca con la chitarra battente', en: 'Giovanni Seneca with the battente guitar' } },
  { key: 'quartet', alt: { it: 'Il quartet sul palco del Festival dei Claustri', en: 'The quartet on stage at the Festival dei Claustri' }, caption: { it: 'Quartet al Festival dei Claustri 2017, Altamura', en: 'Quartet at the Festival dei Claustri 2017, Altamura' } },
  { key: 'live-giallo', alt: { it: 'Giovanni Seneca in concerto, con luci verdi e blu', en: 'Giovanni Seneca in concert under green and blue lights' } },
  { key: 'ovadia', alt: { it: 'Giovanni Seneca e Moni Ovadia sul palco', en: 'Giovanni Seneca and Moni Ovadia on stage' }, caption: { it: 'Con Moni Ovadia', en: 'With Moni Ovadia' } },
  { key: 'mani', alt: { it: 'La mano sinistra sulla tastiera della chitarra', en: 'The left hand on the guitar fingerboard' } },
  { key: 'approdo', alt: { it: 'Giovanni Seneca con la chitarra classica in una luce blu', en: 'Giovanni Seneca with the classical guitar in blue light' } },
  { key: 'live-bn', alt: { it: 'Giovanni Seneca in concerto, in bianco e nero', en: 'Giovanni Seneca in concert, in black and white' } },
  { key: 'ponte', alt: { it: 'Il ponticello di una chitarra classica', en: 'The bridge of a classical guitar' } },
];

// ---------------------------------------------------------------------------
// Booking
// ---------------------------------------------------------------------------
export const BOOKING = {
  it: {
    title: 'Booking | Giovanni Seneca',
    description: 'Booking e management di Giovanni Seneca: concerti solo, in trio, quartet e quintet. Scrivi a info@giovanniseneca.it o chiama il +39 335 8175803.',
    h1: 'Booking',
    lead: 'Concerti, rassegne e collaborazioni.',
    infoTitle: 'Booking e management',
    email: 'Email',
    phone: 'Telefono',
    formationsTitle: 'Formazioni',
    formationsText: 'Il programma si adatta al luogo: recital solo, trio o ensemble con voce.',
    seeProject: 'Scopri il progetto',
    adriaticoTitle: 'Direzione artistica',
    adriaticoText: 'Giovanni Seneca dirige Adriatico Mediterraneo, che organizza dal 2007 eventi culturali e progetti di cooperazione internazionale.',
    adriaticoLink: 'Vai al sito di Adriatico Mediterraneo',
  },
  en: {
    title: 'Booking | Giovanni Seneca',
    description: 'Booking and management for Giovanni Seneca: solo, trio, quartet and quintet concerts. Write to info@giovanniseneca.it or call +39 335 8175803.',
    h1: 'Booking',
    lead: 'Concerts, festivals and collaborations.',
    infoTitle: 'Booking and management',
    email: 'Email',
    phone: 'Phone',
    formationsTitle: 'Formations',
    formationsText: 'The programme adapts to the venue: solo recital, trio or ensemble with voice.',
    seeProject: 'See the project',
    adriaticoTitle: 'Artistic direction',
    adriaticoText: 'Giovanni Seneca directs Adriatico Mediterraneo, which has organised cultural events and international cooperation projects since 2007.',
    adriaticoLink: 'Visit the Adriatico Mediterraneo site',
  },
};
