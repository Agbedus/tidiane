/* ── Internationalization (i18n) ───────────────────────── */
let currentLang = localStorage.getItem('tidiane-lang') || 'en';
let translations = {};

const I18N = {
  en: {
    nav: { home: "Home", achievements: "Achievements", author: "Author", gallery: "Gallery", connect: "Connect with Tidiane" },
    hero: { eyebrow: "President, Council of the African Space Agency", name_line1: "H.E. Dr. Tidiane", name_line2: "Ouattara", title: "Steering Africa\u2019s sovereign presence in the space domain", bio: "H.E. Dr. Tidiane Ouattara is a distinguished African space leader, strategist, and international advocate for science, technology, and innovation. He is the elected President of the Council of the African Space Agency and has held senior leadership roles at the Canadian Space Agency and the African Union Commission.", btn_profile: "Profile & Career \u2192", btn_books: "Books" },
    about: { label: "About", heading: "Architect of Africa\u2019s Space Sovereignty", p1: "H.E. Dr. Tidiane Ouattara has mobilised over US $155M for African space and Earth observation programmes, led the GMES & Africa initiative across 45 countries, and driven the ratification of the African Space Policy and Strategy by all 55 AU member states. His work bridges science and diplomacy, forging international partnerships that translate space knowledge into agricultural resilience, disaster preparedness, and climate action for African communities.", p2: "He is the elected President of the Council of the African Space Agency. A space scientist with a PhD in Remote Sensing and GIS from Universit\u00e9 de Sherbrooke (Canada), he has built a 30+ year career at the intersection of space science, policy, and international diplomacy \u2014 holding senior leadership roles at the Canadian Space Agency, Natural Resources Canada, Environment and Climate Change Canada, and the African Union Commission.", quote: "Space is not a luxury for Africa. It is infrastructure \u2014 as essential as roads, as vital as water.", stat_55: "Member states represented", stat_30: "30+ Years of Leadership in the Space Sector", stat_100: "International Partnerships", stat_7: "Books" },
    cards: { label: "Explore", heading: "Milestones & Moments", subtitle: "From global summits to landmark policy achievements \u2014 a profile in leadership.", events_tag: "Calendar", events_title: "Upcoming & Recent Events", events_desc: "Summits, keynotes, intergovernmental engagements, and public addresses across five continents.", events_link: "View Events \u2192", photos_tag: "Gallery", photos_title: "Photo Journal", photos_desc: "A visual record of H.E. Dr. Ouattara at international forums, space installations, and diplomatic missions.", photos_link: "View Gallery \u2192", career_tag: "Career", career_title: "Professional Experience", career_desc: "From early research roles to leading the continental space agenda \u2014 a career spanning science, policy, and leadership.", career_link: "Full Biography \u2192" },
    experience: { label: "Career Highlights", heading: "A Lifetime of Strategic Leadership", btn_full: "Full Professional Biography \u2192", bio: "H.E. Dr. Tidiane Ouattara holds a PhD and a Master\u2019s degree in Remote Sensing and Geographical Information Systems from Universit\u00e9 de Sherbrooke (Canada) and a Master\u2019s in Physical Geography from Universit\u00e9 Cocody-Abidjan (C\u00f4te d\u2019Ivoire). He is the elected President of the Council of the African Space Agency. Over a 30+ year career spanning academia, the private sector, and public service, he has held leadership positions at the Canadian Space Agency, Natural Resources Canada, Environment and Climate Change Canada, and the African Union Commission. He has mobilised over US $155M for space and Earth observation programmes and has represented Africa at every major international space governance forum.", e1_role: "President, Council of the African Space Agency", e1_org: "African Space Agency (AfSA) \u2014 Cairo, Egypt", e1_years: "Feb 2024 \u2014 Present", e1_desc: "Elected by the African Union Assembly to lead the governance of AfSA, the first continental space body with 156 permanent positions and an annual budget exceeding US $5M. Responsibilities include ensuring good governance, leading the African space programme, mobilising member states and strategic partners, negotiating resources, and promoting international partnerships.", e1_achievements: "Key achievements: operationalised the Agency with its official opening before 500+ guests; began staff recruitment, infrastructure acquisition, and first programme implementation; negotiated a \u20ac100M European Commission investment in the Global Gateway space component \u2014 Phase 1 (Africa\u2013Europe Space Partnership Programme) of \u20ac45M launched January 2025; initiated and signed partnership agreements with ESA, EUMETSAT, EU Joint Research Centre, NASA, NOAA, CNSA, JAXA, ISRO, ROSCOMOS, AEB, UAESA, and numerous international financial institutions.", e2_role: "Interim Director \u2014 STI / Head of Division \u2014 Science, Technology & Space", e2_org: "African Union Commission \u2014 Addis Ababa, Ethiopia", e2_years: "Sept 2016 \u2014 Nov 2024", e2_desc: "Coordinated space science and policy initiatives across the AU Commission. Integrated space science and its applications into socioeconomic development strategies. Developed and implemented space programmes including the GMES & Africa Programme and the Africa\u2013Europe Space Partnership.", e2_achievements: "Key achievements: developed and implemented the African Outer Space Programme centred on Earth Observation, satellite communications, navigation and positioning, and astronomy and space science across 9 years; drafted the African Space Policy and Strategy ratified by all 55 member states; secured consensus and elaborated common African positions on space policy and programme issues; organised the first Africa\u2013Europe Space Policy Dialogue in Dakar (2022); led the creation and operationalisation of AfSA with a 156-position structure approved by Heads of State; successfully implemented two phases of the GMES & Africa Programme (\u20ac55M) involving 170+ institutions across 45 African countries \u2014 training 15,000 professionals and students, awarding 20 grants (\u20ac35M+) and 46 scholarships, equipping 11 countries with satellite data reception stations, and establishing the Women in GMES network (250+ members) and the GMES & Africa Academic Network (40+ universities, 120+ faculty).", e3_role: "Head Manager \u2014 Geospatial Data Management & Ecosystem Assessment", e3_org: "Environment and Climate Change Canada \u2014 Canadian Wildlife Service", e3_years: "Aug 2012 \u2014 Sept 2016", e3_desc: "Led Earth observation and geospatial data management initiatives. Provided national leadership in applying geomatics to landscape assessment and wildlife habitat conservation planning. Developed the geospatial component of Canada\u2019s National Conservation Plan.", e3_achievements: "Key achievements: created and chaired the CWS Data Management Committee and Working Group; authored the CWS Sensitive Data Publication Policy and the Unit\u2019s Integrated Business Plan; managed 16 employees with a budget of CAD $1.2M+ including salaries, grants and contributions, and O&M.", e4_role: "Manager \u2014 Landscape and Protected Areas Policy & Planning", e4_org: "Environment Canada \u2014 Canadian Wildlife Service", e4_years: "Apr 2010 \u2014 Jul 2012", e4_desc: "Built a fully operational Policy and Planning Section from 25% to 100% staffing (20 employees) in six months. Designed and implemented the section\u2019s first integrated strategic business plan covering a budget of CAD $3.3M+ including salaries, grants/contributions (CAD $1.5M), and O&M. Led national programme coordination across Environment Canada\u2019s regional offices and with other departments.", e5_role: "Manager \u2014 Canadian Digital Elevation Model Programme", e5_org: "Natural Resources Canada \u2014 Earth Science Sector", e5_years: "Jun 2009 \u2014 Mar 2010", e5_desc: "Managed the Canadian Digital Elevation Data (CDED) project under GEOBASE and the Limited Access Road project under the Topographic Map Revision Initiative. Revitalised the CDED project by securing buy-in and partnerships with provincial governments, NGOs, and academia. Conducted SWOT analysis. Led collective staffing activities for the Mapping Directorate.", e6_role: "Head \u2014 Knowledge Management, Bilateral & Multilateral Strategies", e6_org: "Natural Resources Canada \u2014 Science and Policy Integration", e6_years: "Apr 2008 \u2014 Jun 2009", e6_desc: "Developed the integrated knowledge management business plan and provided strategic advice on NRCan\u2019s bilateral and multilateral strategies in natural resources. Established strategic direction for the new Knowledge Management Strategy Unit.", e7_role: "Senior Science & Technology Policy Advisor", e7_org: "Natural Resources Canada \u2014 Office of the Chief Scientist", e7_years: "Nov 2006 \u2014 Apr 2008", e7_desc: "Provided strategic S&T policy advice to the Chief Scientist and Assistant Deputy Minister. Led the concept and development of NRCan\u2019s S&T Strategy prospectus covering priority-setting, governance, capacity-building, collaboration, and stakeholder engagement. Analysed S&T policy across 9 innovative countries (France, UK, US, China, Japan, Norway, Finland, Australia, New Zealand).", e8_role: "Senior Manager \u2014 International Relations", e8_org: "Canadian Space Agency", e8_years: "Oct 2004 \u2014 Oct 2006", e8_desc: "Provided strategic advice to senior management and the CSA Executive Committee on international space policy. Developed the first CSA Strategic Framework for Earth Observation in Africa and MoUs with the Argentine Space Agency and Egypt\u2019s NARSS. Led the Canadian delegation to UNCOPUOS for two years. Conducted scientific and commercial missions to Egypt, Algeria, and South Africa.", e9_role: "Geomatics Engineer & International Relations Officer", e9_org: "Natural Resources Canada", e9_years: "May 2002 \u2014 Sept 2004", e9_desc: "Developed an expert system for landslide monitoring and a remote sensing/GIS methodology for rapid change detection. Authored NRCan\u2019s first Geomatics Strategy for Africa. Led scientific and commercial missions to Gabon, Senegal, Kenya, and Ethiopia. Negotiated partnership agreements with key African geomatics organisations including the Centre de Suivi \u00c9cologique du S\u00e9n\u00e9gal and the Regional Centre for Mapping of Resources for Development (Kenya).", e10_role: "Geomatics & Earth Observation Consultant", e10_org: "INERA (Burkina Faso) / GEOMAT International (Montr\u00e9al)", e10_years: "Oct 2001 \u2014 Apr 2002", e10_desc: "Strengthened scientific and technical capacity of researchers at INERA in Earth observation and GIS for sustainable development. Automated horticulture mapping using remote sensing in Mont\u00e9r\u00e9gie for GEOMAT International.", e11_role: "Research Associate & University Lecturer", e11_org: "Universit\u00e9 de Sherbrooke, Canada", e11_years: "Sept 1996 \u2014 Aug 2001", e11_desc: "Taught undergraduate courses in hydrology, Earth observation (satellite image processing and analysis), geopolitics and geography of Africa, climatology and hydrometeorology, GIS, and geographical methods and techniques. Developed an original remote sensing approach for land-cover and land-use change estimation and a new water erosion model for high-relief semi-arid regions using satellite imagery. Published multiple scientific papers.", edu1: "PhD in Remote Sensing and Geographical Information Systems \u2014 Universit\u00e9 de Sherbrooke, 2001", edu2: "Master\u2019s in Remote Sensing and GIS \u2014 Universit\u00e9 de Sherbrooke, 1996", edu3: "Master\u2019s in Physical Geography \u2014 Universit\u00e9 Cocody-Abidjan, C\u00f4te d\u2019Ivoire, 1993", edu4: "Executive Leadership Program \u2014 Canada School of Public Service, 2010", honour1: "Prix d\u2019Excellence du Meilleur Ivoirien de la Diaspora, 2023", honour2: "SpaceSTAR Conference Recognition Award \u2014 Sousse, 2023", honour3: "African Association of Geomatics Professionals Award, 2022", honour4: "AU Commissioner\u2019s Award \u2014 Department of Science, Technology & Innovation, 2021", honour5: "Natural Resources Canada Merit Award, 2008", honour6: "Knight of the Order of Academic Palms \u2014 Burkina Faso, 2006", honour7: "Canadian Space Agency President\u2019s Award, 2005" },
    timeline: { t1_role: "President, Council of the African Space Agency", t1_org: "African Space Agency (AfSA), Cairo, Egypt", t1_desc: "Elected by the African Union Assembly as the inaugural President of the AfSA Council. Leading the operationalisation of the Agency \u2014 including the build-out of its headquarters, the recruitment of 156 permanent staff, and the negotiation of strategic partnerships with ESA, NASA, JAXA, ISRO, and CNSA.", t2_role: "Manager, African Space Programme", t2_org: "African Union Commission, Addis Ababa", t2_desc: "Led the development and implementation of the African Outer Space Programme and the GMES & Africa Programme (\u20ac55M). Drove the ratification of the African Space Policy and Strategy by all 55 member states. Mobilised over \u20ac100M in investment, including the Africa\u2013Europe Space Partnership Programme.", t3_role: "Head Manager \u2014 Geospatial Programs", t3_org: "Environment and Climate Change Canada", t3_desc: "Led geospatial data management and ecosystem assessment planning for the Canadian Wildlife Service. Developed the geospatial component of Canada\u2019s National Conservation Plan. Managed teams of 20 staff and a budget of over CAD $3M.", t4_role: "International Relations Manager", t4_org: "Canadian Space Agency", t4_desc: "Managed international space policy portfolios covering Earth Observation, Navigation, Robotics, and Space Sciences for Africa, the Americas, and the United Nations. Led the Canadian delegation to UNCOPUOS.", t5_role: "PhD in Remote Sensing & GIS / Lecturer", t5_org: "Universit\u00e9 de Sherbrooke, Canada", t5_desc: "Earned a PhD in Remote Sensing and Geographical Information Systems. Taught courses in hydrology, satellite image analysis, GIS, and climatology. Published peer-reviewed research on erosion modelling in semi-arid environments." },
    books: { label: "Books", heading: "Books by H.E. Dr. Tidiane Ouattara", btn_copy: "Get your copy \u2192" },
    contact: { label: "Contact", heading: "Get in Touch", info_text: "For media enquiries, speaking engagements, partnership discussions, or institutional correspondence, please reach out through the channels below or submit a message.", form_name: "Full Name", form_name_placeholder: "Your name", form_org: "Organisation", form_org_placeholder: "Your institution or company", form_email: "Email", form_email_placeholder: "your@email.com", form_message: "Message", form_message_placeholder: "Your message\u2026", form_submit: "Send Message \u2192", form_sending: "Sending\u2026", form_success: "Your message has been received. Thank you!", form_error: "Could not reach the server. Please try again later." },
    testimonials: { label: "Endorsements", heading: "Voices of Recognition" },
    footer: { copyright: "\u00a9 2025 H.E. Dr. Tidiane Ouattara", powered_by: "Powered by Agbedus" },
    sheets: { events_header: "Calendar \u2014 Events", events_title: "Events & Engagements", events_subtitle: "2024\u20132025 \u00b7 Global Agenda", ev1_month: "Nov 2024", ev1_title: "UN Committee on the Peaceful Uses of Outer Space", ev1_loc: "Vienna, Austria", ev1_desc: "Keynote address on behalf of the African Union at COPUOS, presenting the AfSA mandate and advocating for equitable access to orbital slots for developing nations.", ev2_month: "Sep 2024", ev2_title: "African Union Summit Side Event \u2014 Space Policy Dialogue", ev2_loc: "Addis Ababa, Ethiopia", ev2_desc: "Hosted a high-level ministerial dialogue on harmonising Africa\u2019s national space legislations with the continental Space Policy and Strategy framework.", ev3_month: "Jul 2024", ev3_title: "International Astronautical Congress \u2014 Africa Pavilion", ev3_loc: "Milan, Italy", ev3_desc: "Chaired the inaugural Africa Space Pavilion at IAC 2024, spotlighting breakthroughs from AfSA member states and facilitating investment conversations with commercial operators.", ev4_month: "Mar 2025", ev4_title: "AfriTech Space Innovation Forum", ev4_loc: "Nairobi, Kenya", ev4_desc: "Opening ceremony address; announced the AfSA Young Innovators in Space grant programme for sub-Saharan universities. Moderated a panel on NewSpace startups on the continent.", ev5_month: "Jan 2025", ev5_title: "Bilateral Partnership Signing \u2014 ESA & AfSA", ev5_loc: "Paris, France", ev5_desc: "Concluded a landmark Cooperation Agreement with ESA covering Earth Observation data sharing, joint training programs, and co-development of the Africa Environmental Monitoring satellite constellation.", ev6_month: "Jun 2025", ev6_title: "World Economic Forum \u2014 Special Address", ev6_loc: "Cape Town, South Africa", ev6_desc: "Invited address on \u201cSpace as the Fourth Industrial Revolution for Africa,\u201d moderated discussion with heads of state and global technology CEOs on space investment in emerging markets.", photos_header: "Gallery \u2014 Photo Journal", photos_title: "Photo Journal", photos_subtitle: "International Engagements & Field Visits", photos_desc: "A curated selection of photographs documenting H.E. Dr. Ouattara\u2019s work across Africa and on the world stage.", photos_press: "For high-resolution press photography, please contact the AfSA communications office at", experience_header: "Career \u2014 Full Biography", experience_title: "Professional Biography", experience_subtitle: "Space \u00b7 Policy \u00b7 Leadership \u00b7 29 Years", experience_edu_title: "Education & Professional Development", experience_edu_sub: "Selected qualifications", experience_honours_title: "Honours & Distinctions", experience_honours_sub: "Selected recognitions", experience_bio_section: "Biography", experience_achievements_section: "Key Achievements", author_header: "Author", author_tab_books: "Books", author_tab_interviews: "Interviews & Media", author_tab_speeches: "Selected Speeches", author_books_title: "Books by H.E. Dr. Tidiane Ouattara", author_books_subtitle: "Each title available in English & French", interviews_title: "Interviews & Media", interviews_subtitle: "Press, broadcast, and digital media appearances", speeches_title: "Selected Speeches", speeches_subtitle: "Keynote addresses and presentations", content_soon: "Content coming soon", online_publication: "Online Publication", btn_copy: "Get your copy \u2192" }
  },
  fr: {
    nav: { home: "Accueil", achievements: "R\u00e9alisations", author: "Auteur", gallery: "Galerie", connect: "Contactez Tidiane" },
    hero: { eyebrow: "Pr\u00e9sident, Conseil de l\u2019Agence Spatiale Africaine", name_line1: "S.E. Dr. Tidiane", name_line2: "Ouattara", title: "Orienter la pr\u00e9sence souveraine de l\u2019Afrique dans le domaine spatial", bio: "S.E. Dr. Tidiane Ouattara est un distingu\u00e9 dirigeant spatial africain, strat\u00e8ge et d\u00e9fenseur international de la science, de la technologie et de l\u2019innovation. Il est le Pr\u00e9sident \u00e9lu du Conseil de l\u2019Agence Spatiale Africaine et a occup\u00e9 des postes de direction au sein de l\u2019Agence Spatiale Canadienne et de la Commission de l\u2019Union Africaine.", btn_profile: "Profil et Parcours \u2192", btn_books: "Livres et Recherches" },
    about: { label: "\u00c0 propos", heading: "Architecte de la Souverainet\u00e9 Spatiale de l\u2019Afrique", p1: "S.E. Dr. Tidiane Ouattara est le Pr\u00e9sident \u00e9lu du Conseil de l\u2019Agence Spatiale Africaine. Scientifique spatial titulaire d\u2019un doctorat en t\u00e9l\u00e9d\u00e9tection et SIG de l\u2019Universit\u00e9 de Sherbrooke (Canada), il a construit une carri\u00e8re de 29 ans \u00e0 l\u2019intersection des sciences spatiales, des politiques et de la diplomatie internationale \u2014 occupant des postes de direction seniors \u00e0 l\u2019Agence Spatiale Canadienne, Ressources Naturelles Canada, Environnement et Changement Climatique Canada, et la Commission de l\u2019Union Africaine.", p2: "Il a mobilis\u00e9 plus de 155 millions de dollars US pour les programmes spatiaux africains et d\u2019observation de la Terre, dirig\u00e9 l\u2019initiative GMES & Afrique dans 45 pays, et conduit la ratification de la Politique et Strat\u00e9gie Spatiales Africaines par les 55 \u00c9tats membres de l\u2019UA. Son travail fait le pont entre science et diplomatie, forgeant des partenariats internationaux qui transforment les connaissances spatiales en r\u00e9silience agricole, pr\u00e9paration aux catastrophes et action climatique pour les communaut\u00e9s africaines.", quote: "L\u2019espace n\u2019est pas un luxe pour l\u2019Afrique. C\u2019est une infrastructure \u2014 aussi essentielle que les routes, aussi vitale que l\u2019eau.", stat_55: "\u00c9tats membres repr\u00e9sent\u00e9s", stat_30: "30+ années de leadership dans le secteur spatial", stat_100: "Partenariats internationaux", stat_7: "Livres" },
    cards: { label: "Explorer", heading: "\u00c9tapes et Moments", subtitle: "Des sommets mondiaux aux r\u00e9alisations politiques embl\u00e9matiques \u2014 un portrait du leadership.", events_tag: "Calendrier", events_title: "\u00c9v\u00e9nements \u00e0 venir et r\u00e9cents", events_desc: "Sommets, conf\u00e9rences, engagements intergouvernementaux et adresses publiques sur cinq continents.", events_link: "Voir les \u00e9v\u00e9nements \u2192", photos_tag: "Galerie", photos_title: "Journal photo", photos_desc: "Un enregistrement visuel du Dr Ouattara dans les forums internationaux, installations spatiales et missions diplomatiques.", photos_link: "Voir la galerie \u2192", career_tag: "Parcours", career_title: "Exp\u00e9rience professionnelle", career_desc: "Des premiers r\u00f4les de recherche \u00e0 la direction de l\u2019agenda spatial continental \u2014 un parcours alliant sciences, politiques et leadership.", career_link: "Biographie compl\u00e8te \u2192" },
    experience: { label: "Points saillants du parcours", heading: "Une vie de leadership strat\u00e9gique", btn_full: "Biographie professionnelle compl\u00e8te \u2192", bio: "S.E. Dr. Tidiane Ouattara d\u00e9tient un doctorat et une ma\u00eetrise en t\u00e9l\u00e9d\u00e9tection et syst\u00e8mes d\u2019information g\u00e9ographique de l\u2019Universit\u00e9 de Sherbrooke (Canada) et une ma\u00eetrise en g\u00e9ographie physique de l\u2019Universit\u00e9 Cocody-Abidjan (C\u00f4te d\u2019Ivoire). Il est le Pr\u00e9sident \u00e9lu du Conseil de l\u2019Agence Spatiale Africaine. Sur une carri\u00e8re de 29 ans couvrant l\u2019enseignement, le secteur priv\u00e9 et la fonction publique, il a occup\u00e9 des postes de direction \u00e0 l\u2019Agence spatiale canadienne, \u00e0 Ressources Naturelles Canada, \u00e0 Environnement et Changement Climatique Canada et \u00e0 la Commission de l\u2019Union Africaine. Il a mobilis\u00e9 plus de 155 millions de dollars US pour des programmes spatiaux et d\u2019observation de la Terre et a repr\u00e9sent\u00e9 l\u2019Afrique dans chaque forum majeur de gouvernance spatiale internationale.", e1_role: "Pr\u00e9sident, Conseil de l\u2019Agence Spatiale Africaine", e1_org: "Agence Spatiale Africaine (ASA) \u2014 Le Caire, \u00c9gypte", e1_years: "F\u00e9v. 2024 \u2014 Pr\u00e9sent", e1_desc: "\u00c9lu par l\u2019Assembl\u00e9e de l\u2019Union africaine pour diriger la gouvernance de l\u2019ASA, premier organe spatial continental dot\u00e9 de 156 postes permanents et d\u2019un budget annuel d\u00e9passant 5 millions de dollars US. Les responsabilit\u00e9s incluent la bonne gouvernance, la direction du programme spatial africain, la mobilisation des \u00c9tats membres et des partenaires strat\u00e9giques, la n\u00e9gociation des ressources et la promotion des partenariats internationaux.", e1_achievements: "R\u00e9alisations cl\u00e9s : op\u00e9rationnalisation de l\u2019Agence avec son ouverture officielle devant plus de 500 invit\u00e9s ; lancement du recrutement, de l\u2019acquisition d\u2019infrastructures et de la premi\u00e8re mise en \u0153uvre de programmes ; n\u00e9gociation d\u2019un investissement de 100 M\u20ac de la Commission europ\u00e9enne dans le composant spatial du Global Gateway \u2014 Phase 1 (Programme de Partenariat Spatial Afrique\u2013Europe) de 45 M\u20ac lanc\u00e9e en janvier 2025 ; initiation et signature d\u2019accords de partenariat avec l\u2019ESA, EUMETSAT, le Centre commun de recherche de l\u2019UE, la NASA, la NOAA, le CNSA, la JAXA, l\u2019ISRO, le ROSCOMOS, l\u2019AEB, l\u2019UAESA et de nombreuses institutions financi\u00e8res internationales.", e2_role: "Directeur par int\u00e9rim \u2014 IST / Chef de division \u2014 Science, Technologie et Espace", e2_org: "Commission de l\u2019Union Africaine \u2014 Addis-Abeba, \u00c9thiopie", e2_years: "Sept. 2016 \u2014 Nov. 2024", e2_desc: "A coordonn\u00e9 les initiatives de science et de politique spatiales au sein de la Commission de l\u2019UA. A int\u00e9gr\u00e9 les sciences spatiales et leurs applications dans les strat\u00e9gies de d\u00e9veloppement socio\u00e9conomique. A d\u00e9velopp\u00e9 et mis en \u0153uvre des programmes spatiaux dont le Programme GMES & Afrique et le Partenariat Spatial Afrique\u2013Europe.", e2_achievements: "R\u00e9alisations cl\u00e9s : d\u00e9veloppement et mise en \u0153uvre du Programme Spatial Ext\u00e9rieur Africain centr\u00e9 sur l\u2019observation de la Terre, les communications spatiales, la navigation et le positionnement, et l\u2019astronomie et les sciences spatiales sur 9 ans ; r\u00e9daction de la Politique et de la Strat\u00e9gie spatiales africaines ratifi\u00e9es par les 55 \u00c9tats membres ; obtaination du consensus et \u00e9laboration de positions africaines communes ; organisation du premier Dialogue Politique Spatial Afrique\u2013Europe \u00e0 Dakar (2022) ; direction de la cr\u00e9ation et de l\u2019op\u00e9rationnalisation de l\u2019ASA avec une structure de 156 postes approuv\u00e9e par les chefs d\u2019\u00c9tat ; mise en \u0153uvre r\u00e9ussie de deux phases du Programme GMES & Afrique (55 M\u20ac) impliquant plus de 170 institutions dans 45 pays africains \u2014 formation de 15 000 professionnels et \u00e9tudiants, attribution de 20 subventions (plus de 35 M\u20ac) et 46 bourses, \u00e9quipement de 11 pays en stations de r\u00e9ception de donn\u00e9es satellitaires, et \u00e9tablissement du r\u00e9seau Femmes dans le GMES (plus de 250 membres) et du R\u00e9seau Acad\u00e9mique GMES & Afrique (plus de 40 universit\u00e9s, 120+ enseignants).", e3_role: "Chef de programme \u2014 Gestion des donn\u00e9es g\u00e9ospatiales et \u00e9valuation des \u00e9cosyst\u00e8mes", e3_org: "Environnement et Changement Climatique Canada \u2014 Service canadien de la faune", e3_years: "Ao\u00fbt 2012 \u2014 Sept. 2016", e3_desc: "A dirig\u00e9 des initiatives d\u2019observation de la Terre et de gestion des donn\u00e9es g\u00e9ospatiales. A assur\u00e9 un leadership national dans l\u2019application de la g\u00e9omatique \u00e0 l\u2019\u00e9valuation du paysage et \u00e0 la planification de la conservation des habitats fauniques. A d\u00e9velopp\u00e9 le volet g\u00e9ospatial du Plan national de conservation du Canada.", e3_achievements: "R\u00e9alisations cl\u00e9s : cr\u00e9ation et pr\u00e9sidence du Comit\u00e9 et du Groupe de travail sur la gestion des donn\u00e9es du SCF ; r\u00e9daction de la Politique de publication des donn\u00e9es sensibles du SCF et du Plan d\u2019affaires int\u00e9gr\u00e9 de l\u2019Unit\u00e9 ; gestion de 16 employ\u00e9s avec un budget de plus de 1,2 M$ CA incluant salaires, subventions et contributions, et fonctionnement.", e4_role: "Directeur \u2014 Politique et planification des paysages et des aires prot\u00e9g\u00e9es", e4_org: "Environnement Canada \u2014 Service canadien de la faune", e4_years: "Avr. 2010 \u2014 Juil. 2012", e4_desc: "A constitu\u00e9 une section de politique et planification pleinement op\u00e9rationnelle, passant de 25 % \u00e0 100 % d\u2019effectifs (20 employ\u00e9s) en six mois. A con\u00e7u et mis en \u0153uvre le premier plan d\u2019affaires strat\u00e9gique int\u00e9gr\u00e9 de la section couvrant un budget de plus de 3,3 M$ CA incluant salaires, subventions/contributions (1,5 M$ CA) et fonctionnement. A dirig\u00e9 la coordination nationale des programmes au travers des bureaux r\u00e9gionaux d\u2019Environnement Canada et avec d\u2019autres minist\u00e8res.", e5_role: "Directeur \u2014 Programme canadien de mod\u00e8le d\u2019\u00e9l\u00e9vation num\u00e9rique", e5_org: "Ressources Naturelles Canada \u2014 Secteur des sciences de la Terre", e5_years: "Juin 2009 \u2014 Mars 2010", e5_desc: "A g\u00e9r\u00e9 le projet de donn\u00e9es d\u2019\u00e9l\u00e9vation num\u00e9rique canadiennes (CDED) sous GEOBASE et le projet Route \u00e0 acc\u00e8s limit\u00e9 sous l\u2019Initiative de r\u00e9vision des cartes topographiques. A revitalis\u00e9 le projet CDED en obtenant l\u2019adh\u00e9sion et des partenariats avec des gouvernements provinciaux, des ONG et le milieu universitaire. A r\u00e9alis\u00e9 une analyse SWOT. A dirig\u00e9 les activit\u00e9s de dotation collective pour la Direction de la cartographie.", e6_role: "Chef \u2014 Gestion des connaissances, strat\u00e9gies bilat\u00e9rales et multilat\u00e9rales", e6_org: "Ressources Naturelles Canada \u2014 Int\u00e9gration des sciences et des politiques", e6_years: "Avr. 2008 \u2014 Juin 2009", e6_desc: "A d\u00e9velopp\u00e9 le plan d\u2019affaires int\u00e9gr\u00e9 de gestion des connaissances et fourni des conseils strat\u00e9giques sur les strat\u00e9gies bilat\u00e9rales et multilat\u00e9rales de RNCan en mati\u00e8re de ressources naturelles. A \u00e9tabli la direction strat\u00e9gique pour la nouvelle Unit\u00e9 de strat\u00e9gie de gestion des connaissances.", e7_role: "Conseiller senior en politiques scientifiques et technologiques", e7_org: "Ressources Naturelles Canada \u2014 Bureau du scientifique en chef", e7_years: "Nov. 2006 \u2014 Avr. 2008", e7_desc: "A fourni des conseils strat\u00e9giques en mati\u00e8re de politiques S&T au scientifique en chef et au sous-ministre adjoint. A dirig\u00e9 la conception et le d\u00e9veloppement du prospectus de la strat\u00e9gie S&T de RNCan couvrant la hi\u00e9rarchisation des priorit\u00e9s, la gouvernance, le renforcement des capacit\u00e9s, la collaboration et la mobilisation des intervenants. A analys\u00e9 les politiques S&T de 9 pays innovants (France, Royaume-Uni, \u00c9tats-Unis, Chine, Japon, Norv\u00e8ge, Finlande, Australie, Nouvelle-Z\u00e9lande).", e8_role: "Chef de manager \u2014 Relations internationales", e8_org: "Agence spatiale canadienne", e8_years: "Oct. 2004 \u2014 Oct. 2006", e8_desc: "A fourni des conseils strat\u00e9giques \u00e0 la haute direction et au comit\u00e9 ex\u00e9cutif de l\u2019ASC sur la politique spatiale internationale. A d\u00e9velopp\u00e9 le premier cadre strat\u00e9gique de l\u2019ASC pour l\u2019observation de la Terre en Afrique et des protocoles d\u2019entente avec l\u2019agence spatiale argentine et le NARSS d\u2019\u00c9gypte. A dirig\u00e9 la d\u00e9l\u00e9gation canadienne au COPUOS pendant deux ans. A conduit des missions scientifiques et commerciales en \u00c9gypte, en Alg\u00e9rie et en Afrique du Sud.", e9_role: "Ing\u00e9nieur en g\u00e9omatique et chef des relations internationales", e9_org: "Ressources Naturelles Canada", e9_years: "Mai 2002 \u2014 Sept. 2004", e9_desc: "A d\u00e9velopp\u00e9 un syst\u00e8me expert pour la surveillance des glissements de terrain et une m\u00e9thodologie de t\u00e9l\u00e9d\u00e9tection/SIG pour la d\u00e9tection rapide des changements. A r\u00e9dig\u00e9 la premi\u00e8re strat\u00e9gie de g\u00e9omatique de RNCan pour l\u2019Afrique. A dirig\u00e9 des missions scientifiques et commerciales au Gabon, au S\u00e9n\u00e9gal, au Kenya et en \u00c9thiopie. A n\u00e9goci\u00e9 des accords de partenariat avec des organisations cl\u00e9s de g\u00e9omatique africaines dont le Centre de Suivi \u00c9cologique du S\u00e9n\u00e9gal et le Centre r\u00e9gional de cartographie des ressources pour le d\u00e9veloppement (Kenya).", e10_role: "Consultant en g\u00e9omatique et observation de la Terre", e10_org: "INERA (Burkina Faso) / GEOMAT International (Montr\u00e9al)", e10_years: "Oct. 2001 \u2014 Avr. 2002", e10_desc: "A renforc\u00e9 la capacit\u00e9 scientifique et technique des chercheurs de l\u2019INERA en observation de la Terre et SIG pour le d\u00e9veloppement durable. A automatis\u00e9 la cartographie horticole par t\u00e9l\u00e9d\u00e9tection en Mont\u00e9r\u00e9gie pour GEOMAT International.", e11_role: "Chercheur associ\u00e9 et universitaire", e11_org: "Universit\u00e9 de Sherbrooke, Canada", e11_years: "Sept. 1996 \u2014 Ao\u00fbt 2001", e11_desc: "A enseign\u00e9 des cours de premier cycle en hydrologie, observation de la Terre (traitement et analyse d\u2019images satellitaires), g\u00e9opolitique et g\u00e9ographie de l\u2019Afrique, climatologie et hydrom\u00e9t\u00e9orologie, SIG, et m\u00e9thodes et techniques g\u00e9ographiques. A d\u00e9velopp\u00e9 une approche originale de t\u00e9l\u00e9d\u00e9tection pour l\u2019estimation des changements d\u2019occupation et d\u2019utilisation du sol et un nouveau mod\u00e8le d\u2019\u00e9rosion hydrique pour les r\u00e9gions semi-arides \u00e0 fort relief utilisant des images satellitaires. A publi\u00e9 plusieurs articles scientifiques.", edu1: "Doctorat en t\u00e9l\u00e9d\u00e9tection et syst\u00e8mes d\u2019information g\u00e9ographique \u2014 Universit\u00e9 de Sherbrooke, 2001", edu2: "Ma\u00eetrise en t\u00e9l\u00e9d\u00e9tection et SIG \u2014 Universit\u00e9 de Sherbrooke, 1996", edu3: "Ma\u00eetrise en g\u00e9ographie physique \u2014 Universit\u00e9 Cocody-Abidjan, C\u00f4te d\u2019Ivoire, 1993", edu4: "Programme de leadership ex\u00e9cutif \u2014 \u00c9cole de la fonction publique du Canada, 2010", honour1: "Prix d\u2019Excellence du Meilleur Ivoirien de la Diaspora, 2023", honour2: "Prix de reconnaissance SpaceSTAR \u2014 Sousse, 2023", honour3: "Prix de l\u2019Association africaine des professionnels de g\u00e9omatique, 2022", honour4: "Prix du commissaire de l\u2019UA \u2014 D\u00e9partement de la science, de la technologie et de l\u2019innovation, 2021", honour5: "Prix de m\u00e9rite de Ressources Naturelles Canada, 2008", honour6: "Chevalier de l\u2019Ordre des Palmes acad\u00e9miques \u2014 Burkina Faso, 2006", honour7: "Prix du pr\u00e9sident de l\u2019Agence spatiale canadienne, 2005" },
    timeline: { t1_role: "Pr\u00e9sident, Conseil de l\u2019Agence Spatiale Africaine", t1_org: "Agence Spatiale Africaine (ASA), Le Caire, \u00c9gypte", t1_desc: "\u00c9lu par l\u2019Assembl\u00e9e de l\u2019Union africaine comme premier Pr\u00e9sident du Conseil de l\u2019ASA. Dirige l\u2019op\u00e9rationnalisation de l\u2019Agence \u2014 notamment la construction de son si\u00e8ge, le recrutement de 156 permanents et la n\u00e9gociation de partenariats strat\u00e9giques avec l\u2019ESA, la NASA, la JAXA, l\u2019ISRO et le CNSA.", t2_role: "Directeur, Programme Spatial Africain", t2_org: "Commission de l\u2019Union Africaine, Addis-Abeba", t2_desc: "A dirig\u00e9 le d\u00e9veloppement et la mise en \u0153uvre du Programme Spatial Ext\u00e9rieur Africain et du Programme GMES & Afrique (55 M\u20ac). A conduit la ratification de la Politique et de la Strat\u00e9gie spatiales africaines par les 55 \u00c9tats membres. A mobilis\u00e9 plus de 100 M\u20ac d\u2019investissements, dont le Programme de Partenariat Spatial Afrique\u2013Europe.", t3_role: "Chef de programme \u2014 Programmes g\u00e9ospatiaux", t3_org: "Environnement et Changement Climatique Canada", t3_desc: "A dirig\u00e9 la gestion des donn\u00e9es g\u00e9ospatiales et la planification de l\u2019\u00e9valuation des \u00e9cosyst\u00e8mes pour le Service canadien de la faune. A d\u00e9velopp\u00e9 le volet g\u00e9ospatial du Plan national de conservation du Canada. A g\u00e9r\u00e9 des \u00e9quipes de 20 personnes et un budget de plus de 3 M$ CA.", t4_role: "Chef des relations internationales", t4_org: "Agence spatiale canadienne", t4_desc: "A g\u00e9r\u00e9 les portefeuilles de politique spatiale internationale couvrant l\u2019observation de la Terre, la navigation, la robotique et les sciences spatiales pour l\u2019Afrique, les Am\u00e9riques et l\u2019Organisation des Nations Unies. A dirig\u00e9 la d\u00e9l\u00e9gation canadienne au COPUOS.", t5_role: "Doctorat en t\u00e9l\u00e9d\u00e9tection et SIG / Enseignant", t5_org: "Universit\u00e9 de Sherbrooke, Canada", t5_desc: "A obtenu un doctorat en t\u00e9l\u00e9d\u00e9tection et syst\u00e8mes d\u2019information g\u00e9ographique. A enseign\u00e9 l\u2019hydrologie, l\u2019analyse d\u2019images satellitaires, le SIG et la climatologie. A publi\u00e9 des recherches \u00e9valu\u00e9es par les pairs sur la mod\u00e9lisation de l\u2019\u00e9rosion en milieux semi-arides." },
    books: { label: "Livres", heading: "Livres de S.E. Dr. Tidiane Ouattara", btn_copy: "Obtenir votre exemplaire \u2192" },
    contact: { label: "Contact", heading: "Entrez en contact", info_text: "Pour les demandes de m\u00e9dias, les conf\u00e9rences, les discussions de partenariat ou la correspondance institutionnelle, veuillez nous contacter via les canaux ci-dessous ou soumettre un message.", form_name: "Nom complet", form_name_placeholder: "Votre nom", form_org: "Organisation", form_org_placeholder: "Votre institution ou entreprise", form_email: "Courriel", form_email_placeholder: "votre@courriel.com", form_message: "Message", form_message_placeholder: "Votre message\u2026", form_submit: "Envoyer le message \u2192", form_sending: "Envoi en cours\u2026", form_success: "Votre message a \u00e9t\u00e9 re\u00e7u. Merci!", form_error: "Impossible de joindre le serveur. Veuillez r\u00e9essayer plus tard." },
    testimonials: { label: "Recommandations", heading: "Voix de Reconnaissance" },
    footer: { copyright: "\u00a9 2025 S.E. Dr. Tidiane Ouattara", powered_by: "Propuls\u00e9 par Agbedus" },
    sheets: { events_header: "Calendrier \u2014 \u00c9v\u00e9nements", events_title: "\u00c9v\u00e9nements et Engagements", events_subtitle: "2024\u20132025 \u00b7 Agenda mondial", ev1_month: "Nov. 2024", ev1_title: "Comit\u00e9 des Nations Unies pour les utilisations pacifiques de l\u2019espace extra-atmosph\u00e9rique", ev1_loc: "Vienne, Autriche", ev1_desc: "Allocution d\u2019ouverture au nom de l\u2019Union africaine au COPUOS, pr\u00e9sentant le mandat de l\u2019ASA et plaidant pour un acc\u00e8s \u00e9quitable aux positions orbitales pour les nations en d\u00e9veloppement.", ev2_month: "Sept. 2024", ev2_title: "\u00c9v\u00e9nement parall\u00e8le du sommet de l\u2019Union africaine \u2014 Dialogue sur la politique spatiale", ev2_loc: "Addis-Abeba, \u00c9thiopie", ev2_desc: "A accueilli un dialogue minist\u00e9riel de haut niveau sur l\u2019harmonisation des l\u00e9gislations spatiales nationales africaines avec le cadre de la Politique et de la Strat\u00e9gie spatiales continentales.", ev3_month: "Juil. 2024", ev3_title: "Congr\u00e8s astronautique international \u2014 Pavillon de l\u2019Afrique", ev3_loc: "Milan, Italie", ev3_desc: "A pr\u00e9sid\u00e9 le premier Pavillon Spatial Africain \u00e0 l\u2019IAC 2024, mettant en lumi\u00e8re les avanc\u00e9es des \u00c9tats membres de l\u2019ASA et facilitant les discussions d\u2019investissement avec les op\u00e9rateurs commerciaux.", ev4_month: "Mars 2025", ev4_title: "Forum AfriTech sur l\u2019innovation spatiale", ev4_loc: "Nairobi, Kenya", ev4_desc: "Allocution d\u2019ouverture ; annonce du programme de subventions de l\u2019ASA Jeunes Innovateurs de l\u2019Espace pour les universit\u00e9s subsahariennes. Mod\u00e9ration d\u2019un panel sur les start-ups NewSpace sur le continent.", ev5_month: "Janv. 2025", ev5_title: "Signature d\u2019un partenariat bilat\u00e9ral \u2014 ESA & ASA", ev5_loc: "Paris, France", ev5_desc: "A conclu un accord de coop\u00e9ration historique avec l\u2019ESA couvrant le partage de donn\u00e9es d\u2019observation de la Terre, les programmes de formation conjoints et le co-d\u00e9veloppement de la constellation de satellites de surveillance environnementale de l\u2019Afrique.", ev6_month: "Juin 2025", ev6_title: "Forum \u00e9conomique mondial \u2014 Allocution sp\u00e9ciale", ev6_loc: "Le Cap, Afrique du Sud", ev6_desc: "Allocution invit\u00e9e sur \u00ab L\u2019espace comme quatri\u00e8me r\u00e9volution industrielle pour l\u2019Afrique \u00bb, mod\u00e9ration d\u2019une discussion avec des chefs d\u2019\u00c9tat et des PDG de technologies mondiales sur l\u2019investissement spatial dans les march\u00e9s \u00e9mergents.", photos_header: "Galerie \u2014 Journal photo", photos_title: "Journal photo", photos_subtitle: "Engagements internationaux et visites de terrain", photos_desc: "Une s\u00e9lection de photographies documentant le travail du Dr Ouattara \u00e0 travers l\u2019Afrique et sur la sc\u00e8ne mondiale.", photos_press: "Pour la photographie de presse en haute r\u00e9solution, veuillez contacter le bureau de communication de l\u2019ASA \u00e0", experience_header: "Parcours \u2014 Biographie compl\u00e8te", experience_title: "Biographie professionnelle", experience_subtitle: "Espace \u00b7 Politique \u00b7 Leadership \u00b7 29 ans", experience_edu_title: "Formation et d\u00e9veloppement professionnel", experience_edu_sub: "Dipl\u00f4mes et formations s\u00e9lectionn\u00e9s", experience_honours_title: "Honneurs et distinctions", experience_honours_sub: "Reconnaissances s\u00e9lectionn\u00e9es", experience_bio_section: "Biographie", experience_achievements_section: "R\u00e9alisations cl\u00e9s", author_header: "Auteur", author_tab_books: "Livres", author_tab_interviews: "Interviews et M\u00e9dias", author_tab_speeches: "Discours s\u00e9lectionn\u00e9s", author_books_title: "Livres de S.E. Dr. Tidiane Ouattara", author_books_subtitle: "Chaque titre disponible en anglais et en fran\u00e7ais", interviews_title: "Interviews et M\u00e9dias", interviews_subtitle: "Apparitions dans la presse, \u00e0 la t\u00e9l\u00e9vision et dans les m\u00e9dias num\u00e9riques", speeches_title: "Discours s\u00e9lectionn\u00e9s", speeches_subtitle: "Allocutions et pr\u00e9sentations", content_soon: "Contenu \u00e0 venir", online_publication: "Publication en ligne", btn_copy: "Obtenir votre exemplaire \u2192" }
  }
};

async function loadTranslations(lang) {
  try {
    if (I18N[lang]) {
      translations = I18N[lang];
    } else {
      const res = await fetch(`/api/translations/${lang}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      translations = await res.json();
    }
    currentLang = lang;
    localStorage.setItem('tidiane-lang', lang);
    applyTranslations();
    if (typeof renderTestimonials === 'function') renderTestimonials();
    if (typeof renderBooksGrid === 'function' && typeof booksData !== 'undefined') renderBooksGrid(booksData, lang);
    if (typeof renderAuthorSheetBooks === 'function' && typeof booksData !== 'undefined') renderAuthorSheetBooks(booksData, lang);
    applyTranslations();
    updateLangToggle();
    updateHtmlLang();
  } catch (err) {
    console.error('Failed to load translations:', err);
  }
}

function getNestedValue(obj, path) {
  return path.split('.').reduce((acc, key) => acc && acc[key], obj);
}

function applyTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const value = getNestedValue(translations, key);
    if (!value) return;
    const icon = el.querySelector('i');
    if (icon) {
      el.innerHTML = '';
      el.appendChild(icon);
      el.appendChild(document.createTextNode(' ' + value));
    } else {
      el.textContent = value;
    }
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    const value = getNestedValue(translations, key);
    if (value) el.placeholder = value;
  });
}

function updateLangToggle() {
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === currentLang);
  });
}

function updateHtmlLang() {
  document.documentElement.lang = currentLang;
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => loadTranslations(btn.dataset.lang));
  });
  try { loadSheetPartials(); } catch(e) { console.error('Sheet load error:', e); }
  try { loadGalleryPhotos(); } catch(e) { console.error('Gallery load error:', e); }
  loadTranslations(currentLang);
});

/* ── NAV scroll ─────────────────────────────────────────── */
const nav = document.getElementById('nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  });
}

/* ── Theme toggle (light / dark) ───────────────────────── */
function applyTheme(theme) {
  const html = document.documentElement;
  const isLight = theme === 'light';
  const wasLight = html.classList.contains('light-mode');

  if (isLight !== wasLight) {
    const btn = document.getElementById('theme-toggle');
    const rect = btn.getBoundingClientRect();
    const ox = ((rect.left + rect.width / 2) / window.innerWidth * 100) + '%';
    const oy = ((rect.top + rect.height / 2) / window.innerHeight * 100) + '%';

    const overlay = document.createElement('div');
    overlay.className = 'theme-overlay ' + (isLight ? 'sunrise' : 'sunset');
    overlay.style.setProperty('--ox', ox);
    overlay.style.setProperty('--oy', oy);
    document.body.appendChild(overlay);

    html.classList.add('no-scroll');
    overlay.addEventListener('animationend', () => {
      overlay.remove();
      html.classList.remove('no-scroll');
    }, { once: true });
  }

  html.classList.toggle('light-mode', isLight);
  localStorage.setItem('tidiane-theme', theme);
}
const savedTheme = localStorage.getItem('tidiane-theme') || 'dark';
applyTheme(savedTheme);
document.addEventListener('click', e => {
  if (e.target.closest('#theme-toggle')) {
    const next = document.documentElement.classList.contains('light-mode') ? 'dark' : 'light';
    applyTheme(next);
  }
});

/* ── Hero load animation ────────────────────────────────── */
window.addEventListener('load', () => {
  setTimeout(() => document.body.classList.add('loaded'), 80);
});

/* ── Scroll reveal ──────────────────────────────────────── */
const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-stagger');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      if (e.target.classList.contains('reveal-stagger')) {
        e.target.querySelectorAll(':scope > *').forEach((child, i) => {
          child.style.setProperty('--i', i);
          child.classList.add('visible');
        });
      } else {
        e.target.classList.add('visible');
      }
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
revealEls.forEach(el => observer.observe(el));

/* ── Constellation blinking & path tracing ─────────────── */
function initConstellations() {
  document.querySelectorAll('.constellation-bg').forEach(bg => {
    const stars = bg.querySelectorAll('.constellation-star');
    const lines = bg.querySelectorAll('.constellation-line');

    // Each star twinkles independently at its own random rhythm
    stars.forEach(star => {
      const dur = 1.5 + Math.random() * 4;
      const delay = Math.random() * 8;
      star.style.setProperty('--blink-dur', dur + 's');
      star.style.setProperty('--blink-delay', delay + 's');
    });

    // Path tracing — set dasharray from path length, randomize trace cycle
    lines.forEach((line, i) => {
      const length = line.getTotalLength ? line.getTotalLength() : 200;
      line.style.setProperty('--path-length', length);
      line.style.setProperty('--trace-delay', (i * 1.2 + Math.random() * 2) + 's');
    });
  });
}
initConstellations();

/* ── Sheets ─────────────────────────────────────────────── */
let activeSheet = null;
function openSheet(id) {
  closeSheet();
  const sheet = document.getElementById('sheet-' + id);
  if (!sheet) return;
  activeSheet = sheet;
  document.getElementById('sheet-backdrop').classList.add('open');
  sheet.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeSheet() {
  if (activeSheet) {
    activeSheet.classList.remove('open');
    activeSheet = null;
  }
  document.getElementById('sheet-backdrop').classList.remove('open');
  document.body.style.overflow = '';
}
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeSheet(); });

/* ── Scroll to ──────────────────────────────────────────── */
function scrollToSection(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

/* ── Parallax on hero orbits ────────────────────────────── */
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  document.querySelectorAll('.hero-orbit').forEach((el, i) => {
    el.style.transform = `translateY(${y * (i === 0 ? 0.1 : -0.07)}px) rotate(${y * 0.03 * (i === 0 ? 1 : -1)}deg)`;
  });
});

/* ── Mobile nav ─────────────────────────────────────────── */
function toggleMobileNav() {
  const links = document.querySelector('.nav-links');
  const toggle = document.querySelector('.nav-toggle');
  if (!links || !toggle) return;
  const isOpen = links.classList.contains('mobile-open');
  links.classList.toggle('mobile-open');
  toggle.classList.toggle('open');
  if (!isOpen) {
    links.style.cssText = `
      display:flex; flex-direction:column; position:fixed;
      top:68px; left:0; right:0;
      background:var(--navy-mid); backdrop-filter:blur(12px);
      padding:24px 32px; gap:0; border-bottom:1px solid var(--border);
      z-index:999;
    `;
  } else {
    links.style.cssText = '';
  }
}

/* ── Sheet sub-tabs ──────────────────────────────────────── */
document.addEventListener('click', e => {
  const btn = e.target.closest('.sheet-subtab');
  if (!btn) return;
  const sheet = btn.closest('.sheet');
  if (!sheet) return;
  sheet.querySelectorAll('.sheet-subtab').forEach(b => b.classList.remove('active'));
  sheet.querySelectorAll('.subtab-panel').forEach(p => p.classList.remove('active'));
  btn.classList.add('active');
  const panel = sheet.querySelector('#subtab-' + btn.dataset.subtab);
  if (panel) panel.classList.add('active');
});

/* ── Load sheet partials ────────────────────────────────── */
const SHEETS = ['events', 'photos', 'experience', 'author', 'books'];
function loadSheetPartials() {
  const container = document.getElementById('sheets-container');
  if (!container) return;
  for (const id of SHEETS) {
    const tmpl = document.getElementById(`tmpl-sheet-${id}`);
    if (!tmpl) continue;
    const wrapper = document.createElement('div');
    wrapper.innerHTML = tmpl.innerHTML;
    const child = wrapper.firstElementChild;
    if (child) container.appendChild(child);
  }
}

/* ── Load gallery photos from API ───────────────────────── */
async function loadGalleryPhotos() {
  const grid = document.getElementById('gallery-grid');
  if (!grid) return;
  try {
    const res = await fetch('/api/gallery');
    const data = await res.json();
    const photos = data.photos || [];
    if (!photos.length) {
      grid.innerHTML = '<p style="color:var(--text-muted);font-size:.88rem;">No photos yet. Add them via the admin panel.</p>';
      return;
    }

    const html = photos.map(p =>
      '<div class="sheet-photo">' +
        '<img src="' + p.src + '" alt="' + (p.caption || '') + '" loading="lazy" style="width:100%;display:block">' +
        (p.caption ? '<div class="sheet-photo-caption">' + p.caption + '</div>' : '') +
      '</div>'
    ).join('');
    grid.innerHTML = html;
  } catch {
    grid.innerHTML = '<p style="color:var(--text-muted);font-size:.88rem;">Could not load gallery.</p>';
  }
}

/* ── Load books from API ────────────────────────────────── */
let booksData = [];
async function loadBooks() {
  const grid = document.getElementById('books-grid');
  if (!grid) return;
  const lang = document.documentElement.lang === 'fr' ? 'fr' : 'en';
  try {
    const res = await fetch('/api/books');
    const data = await res.json();
    booksData = data.books || [];
    if (!booksData.length) {
      grid.innerHTML = '<p style="color:var(--text-muted);font-size:.88rem;">No books yet. Add them via the admin panel.</p>';
      return;
    }
    renderBooksGrid(booksData, lang);
    renderAuthorSheetBooks(booksData, lang);
  } catch {
    grid.innerHTML = '<p style="color:var(--text-muted);font-size:.88rem;">Could not load books.</p>';
  }
}

function renderBooksGrid(books, lang) {
  const grid = document.getElementById('books-grid');
  if (!grid) return;
  grid.innerHTML = books.map((b, i) => {
    const title = lang === 'fr' ? b.title_fr : b.title_en;
    const teaser = lang === 'fr' ? b.teaser_fr : b.teaser_en;
    const delay = (i * 0.08).toFixed(2);
    const coverSrc = lang === 'fr' && b.cover_image_fr ? b.cover_image_fr : b.cover_image;
    const coverClass = coverSrc ? 'book-cover book-cover-image' : 'book-cover bc-' + ((i % 3) + 1);
    const coverHtml = coverSrc
      ? '<img src="' + coverSrc + '" alt="' + title + '" loading="lazy">'
      : '';
    const readMoreText = lang === 'fr' ? 'Lire la suite →' : 'Read more →';
    return '<div class="book-card reveal" onclick="openSheet(\'author\')" style="transition-delay:' + delay + 's;">' +
      '<div class="' + coverClass + '">' +
        coverHtml +
        '<div class="book-spine"></div>' +
        '<div class="book-cover-inner">' +
        '</div>' +
      '</div>' +
      '<div class="book-meta">' +
        '<div class="book-status">' + (getNestedValue(translations, 'sheets.online_publication') || b.status) + '</div>' +
        '<div class="book-meta-desc truncated">' + teaser + '</div>' +
        '<button class="book-read-more" onclick="event.stopPropagation(); openSheet(\'author\')">' + readMoreText + '</button>' +
        '<button class="book-buy-btn" onclick="event.stopPropagation(); openSheet(\'books\')" data-i18n="books.btn_copy">' + (getNestedValue(translations, 'books.btn_copy') || 'Get your copy →') + '</button>' +
      '</div>' +
    '</div>';
  }).join('');
  grid.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

function renderAuthorSheetBooks(books, lang) {
  const list = document.getElementById('sheet-author-books-list');
  if (!list) return;
  list.innerHTML = books.flatMap((b, i) => {
    const entries = [
      { title: b.title_en, desc: b.description_en, coverSrc: b.cover_image || '' },
      { title: b.title_fr, desc: b.description_fr, coverSrc: b.cover_image_fr || b.cover_image || '' },
    ];
    return entries.map((e, j) => {
      const idx = i * 2 + j;
      const isLast = idx === books.length * 2 - 1;
      const borderStyle = isLast ? 'border-bottom:none;' : '';
      const coverClass = e.coverSrc ? 'sheet-book-cover book-cover-image' : 'sheet-book-cover bc-' + ((i % 3) + 1);
      const coverHtml = e.coverSrc
        ? '<img src="' + e.coverSrc + '" alt="' + e.title + '" loading="lazy" style="width:100%;height:auto;display:block;">'
        : '';
      const formattedDesc = e.desc.replace(/\n/g, '<br>');
      return '<div class="sheet-book-detail" style="' + borderStyle + '">' +
        '<div class="' + coverClass + '" style="position:relative;overflow:hidden;">' +
          coverHtml +
        '</div>' +
        '<div>' +
          '<div class="book-status">' + (getNestedValue(translations, 'sheets.online_publication') || b.status) + '</div>' +
          '<div class="sheet-book-desc" style="font-size:.85rem;line-height:1.8;margin-bottom:16px;">' + formattedDesc + '</div>' +
          '<button class="sheet-book-buy" onclick="event.stopPropagation()" data-i18n="sheets.btn_copy">' + (getNestedValue(translations, 'sheets.btn_copy') || 'Get your copy →') + '</button>' +
        '</div>' +
      '</div>';
    });
  }).join('');
}

/* ── Contact form ───────────────────────────────────────── */
const contactForm = document.getElementById('contact-form');
const feedback = document.getElementById('cf-feedback');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = document.getElementById('cf-submit');
    const origText = btn.textContent;
    btn.textContent = getNestedValue(translations, 'contact.form_sending') || 'Sending…';
    btn.disabled = true;

    const payload = {
      name: document.getElementById('cf-name').value,
      organisation: document.getElementById('cf-org').value,
      email: document.getElementById('cf-email').value,
      message: document.getElementById('cf-message').value,
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      feedback.style.display = 'block';
      feedback.style.color = data.success ? 'var(--gold)' : '#e74c3c';
      feedback.textContent = data.detail;
      if (data.success) contactForm.reset();
    } catch {
      feedback.style.display = 'block';
      feedback.style.color = '#e74c3c';
      feedback.textContent = getNestedValue(translations, 'contact.form_error') || 'Could not reach the server. Please try again later.';
    } finally {
      btn.textContent = origText;
      btn.disabled = false;
    }
  });
}

/* ── Testimonials Carousel ─────────────────────────────── */
const TESTIMONIALS_FALLBACK = [
  {
    quote_en: "Dr. Ouattara's vision for Africa's space future is nothing short of transformative. His ability to bridge scientific rigor with diplomatic strategy has been instrumental in advancing the continent's space agenda.",
    quote_fr: "La vision du Dr Ouattara pour l\u2019avenir spatial de l\u2019Afrique est rien moins que transformatrice. Sa capacit\u00e9 \u00e0 allier rigueur scientifique et strat\u00e9gie diplomatique a \u00e9t\u00e9 d\u00e9terminante pour l\u2019avancement de l\u2019agenda spatial du continent.",
    name_en: "Dr. Aisha Ofori",
    name_fr: "Dr. Aisha Ofori",
    role_en: "Director, Earth Observation Programme \u2014 ESA",
    role_fr: "Directrice, Programme d\u2019observation de la Terre \u2014 ESA",
    initials: "AO"
  },
  {
    quote_en: "Working alongside Tidiane on the GMES & Africa Programme was a masterclass in leadership. He commands respect not through authority, but through an unwavering commitment to the continent\u2019s development.",
    quote_fr: "Travailler aux c\u00f4t\u00e9 de Tidiane sur le Programme GMES & Afrique a \u00e9t\u00e9 un cours magistral de leadership. Il s\u2019impose non par l\u2019autorit\u00e9, mais par un engagement ind\u00e9fectible envers le d\u00e9veloppement du continent.",
    name_en: "Prof. Moussa Shango",
    name_fr: "Prof. Moussa Shango",
    role_en: "Vice-Chancellor, Pan-African University",
    role_fr: "Vice-chancelier, Universit\u00e9 Panafricaine",
    initials: "MS"
  },
  {
    quote_en: "Africa now has a credible, sovereign voice in space governance \u2014 and that is largely due to Dr. Ouattara\u2019s tireless advocacy. He has built bridges between agencies that had never collaborated before.",
    quote_fr: "L\u2019Afrique dispose maintenant d\u2019une voix cr\u00e9ible et souveraine dans la gouvernance spatiale \u2014 et cela est largement d\u00e9\u00e0 l\u2019activit\u00e9 infatigable du Dr Ouattara. Il a construit des ponts entre des agences qui n\u2019avaient jamais collabor\u00e9 auparavant.",
    name_en: "Amb. Jean-Claude Brou",
    name_fr: "Amb. Jean-Claude Brou",
    role_en: "Former Minister of Foreign Affairs \u2014 C\u00f4te d\u2019Ivoire",
    role_fr: "Ancien ministre des Affaires \u00e9trang\u00e8res \u2014 C\u00f4te d\u2019Ivoire",
    initials: "JB"
  },
  {
    quote_en: "His books on African space policy are foundational texts. They provide the intellectual framework that policymakers across the continent are now using to shape national space strategies.",
    quote_fr: "Ses ouvrages sur la politique spatiale africaine sont des textes fondateurs. Ils fournissent le cadre intellectuel que les d\u00e9cideurs \u00e0 travers le continent utilisent maintenant pour \u00e9laborer les strat\u00e9gies spatiales nationales.",
    name_en: "Dr. Sarah Kimani",
    name_fr: "Dr. Sarah Kimani",
    role_en: "Head of Space Science, NASKenya",
    role_fr: "Chef des sciences spatiales, NASKenya",
    initials: "SK"
  },
  {
    quote_en: "Tidiane represents a new generation of African leaders who understand that space is not a luxury \u2014 it is essential infrastructure. His work at the African Space Agency is proof of that conviction.",
    quote_fr: "Tidiane repr\u00e9sente une nouvelle g\u00e9n\u00e9ration de dirigeants africains qui comprennent que l\u2019espace n\u2019est pas un luxe \u2014 c\u2019est une infrastructure essentielle. Son travail \u00e0 l\u2019Agence Spatiale Africaine est la preuve de cette conviction.",
    name_en: "Dr. Kwame Asante",
    name_fr: "Dr. Kwame Asante",
    role_en: "Executive Director, African Astronomical Society",
    role_fr: "Directeur ex\u00e9cutif, Soci\u00e9t\u00e9 astronomique africaine",
    initials: "KA"
  }
];

let TESTIMONIALS = [...TESTIMONIALS_FALLBACK];
let currentTestimonial = 0;
let testimonialInterval = null;

async function fetchTestimonials() {
  try {
    const res = await fetch('/api/testimonials');
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const data = await res.json();
    if (data.testimonials && data.testimonials.length > 0) {
      TESTIMONIALS = data.testimonials;
    }
  } catch (err) {
    console.warn('Failed to fetch testimonials, using fallback:', err);
  }
}

function renderTestimonials() {
  const track = document.getElementById('testimonials-track');
  const dots = document.getElementById('testimonials-dots');
  if (!track || !dots) return;

  const lang = currentLang || 'en';

  track.innerHTML = TESTIMONIALS.map((t, i) => {
    const quote = lang === 'fr' ? t.quote_fr : t.quote_en;
    const name = lang === 'fr' ? t.name_fr : t.name_en;
    const role = lang === 'fr' ? t.role_fr : t.role_en;
    const active = i === currentTestimonial;
    return '<div class="testimonial-slide' + (active ? ' active' : '') + '" data-index="' + i + '">' +
      (t.image
        ? '<div class="testimonial-avatar"><img src="' + t.image + '" alt="' + name + '" /></div>'
        : '<div class="testimonial-avatar">' + t.initials + '</div>') +
      '<div class="testimonial-content">' +
        '<div class="testimonial-quote">' + quote + '</div>' +
        '<div class="testimonial-author">' +
          '<div class="testimonial-name">' + name + '</div>' +
          '<div class="testimonial-role">' + role + '</div>' +
        '</div>' +
      '</div>' +
    '</div>';
  }).join('');

  dots.innerHTML = TESTIMONIALS.map((_, i) =>
    '<button class="testimonial-dot' + (i === currentTestimonial ? ' active' : '') + '" data-index="' + i + '" aria-label="Testimonial ' + (i + 1) + '"></button>'
  ).join('');
}

function goToTestimonial(index) {
  const slides = document.querySelectorAll('.testimonial-slide');
  const dots = document.querySelectorAll('.testimonial-dot');
  if (!slides.length) return;

  const prev = currentTestimonial;
  currentTestimonial = index;

  slides[prev]?.classList.remove('active');
  slides[prev]?.classList.add('exit-left');
  setTimeout(() => slides[prev]?.classList.remove('exit-left'), 500);

  slides[currentTestimonial]?.classList.add('active');
  dots.forEach((d, i) => d.classList.toggle('active', i === currentTestimonial));
}

function nextTestimonial() {
  goToTestimonial((currentTestimonial + 1) % TESTIMONIALS.length);
}

function prevTestimonial() {
  goToTestimonial((currentTestimonial - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
}

function startTestimonialAutoplay() {
  stopTestimonialAutoplay();
  testimonialInterval = setInterval(nextTestimonial, 28000);
}

function stopTestimonialAutoplay() {
  if (testimonialInterval) clearInterval(testimonialInterval);
}

document.addEventListener('click', e => {
  if (e.target.closest('#testimonials-next')) { nextTestimonial(); startTestimonialAutoplay(); }
  if (e.target.closest('#testimonials-prev')) { prevTestimonial(); startTestimonialAutoplay(); }
  const dot = e.target.closest('.testimonial-dot');
  if (dot) { goToTestimonial(parseInt(dot.dataset.index)); startTestimonialAutoplay(); }
});

document.addEventListener('DOMContentLoaded', async () => {
  try { await fetchTestimonials(); } catch(e) { console.error('Testimonials fetch error:', e); }
  try { renderTestimonials(); } catch(e) { console.error('Testimonials render error:', e); }
  try { startTestimonialAutoplay(); } catch(e) { console.error('Autoplay error:', e); }

  const track = document.getElementById('testimonials-track');
  if (track) {
    let startX = 0;
    track.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
    track.addEventListener('touchend', e => {
      const diff = startX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) { diff > 0 ? nextTestimonial() : prevTestimonial(); startTestimonialAutoplay(); }
    }, { passive: true });
  }

  try { loadBooks(); } catch(e) { console.error('Books load error:', e); }
});
