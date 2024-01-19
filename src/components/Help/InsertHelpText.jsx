import styles from "./InsertHelpText.module.css";

const home = (
  <>
    <h2>Introduksjon</h2>
    <p>
      Dette er et prosjekt lagd for læring og porteføljebygging med tanke på
      jobbsøking som frontend-utvikler. All kode er skrevet av meg i React
      (JavaScript) og CSS i Visual Studio Code i løpet av høsten 2023.
      Prosjektet er opprettet med Vite. Jeg har brukt flere forskjellige plugins
      og eksterne APIer, for eksempel Leaflet for kartet, OpenMeteo for været og
      Kassal for matpriser. Bilder er redigert av meg i GIMP.
    </p>
    <br />
    <p>
      Siden er lagd som en SPA (Single Page Application) med React Router.
      Github Pages støtter i utgangspunket ikke SPA - eller det vil si det
      fungerer om man navigerer via linker men den kjenner ikke igjen adressene
      som ikke peker direkte til hovedsiden. Dette problemet er løst ved at jeg
      linker til en "falsk" 404.html som router direkte til riktig side om du
      forsøker å reloade siden. I praksis merker man ikke dette, det bare
      fungerer som det skal. Jeg bruker useReducer på hovesiden og useContext
      for å dele state med navigasjonskomponentet. Derfra passerer jeg state i
      URL'en til de ulike lenkene. Fordelen med dette er at state opprettholdes
      ved reload, og man kan også videresende dette som en link - om man for
      eksempel ønsker å dele værmeldingen på et spesifikt sted med andre.
    </p>
    <br />
    <p>
      Jeg har fokusert på gjenbruk av komponenter. Det betyr for eksempel at der
      det brukes diagramer er det brukt JS Chart og matet ulik informasjon inn i
      samme komponentet for å gjenbruke dette. Du vil også kjenne igjen
      select-komponentet som er brukt på ulike deler av siden.
    </p>

    <h2>Forsiden</h2>
    <p>
      Her kan du velge posisjon på kartet. Denne posisjonen er utgangspunket for
      å hente inn butikker, værvarsel for din posisjon. Nettsiden vil automatisk
      forsøke å hente din posisjon, du vil da også få opp hvor nøyaktig denne
      er. Dersom du ikke gir siden lov til å hente posisjon vil denne settes til
      Oslo. Du kan selvsagt likevel velge ny posisjon på kartet. Du kan også
      velge hvilke kartfliser Leaflet skal bruke.
    </p>
  </>
);

const matpriser = (
  <>
    <h2>Matpriser</h2>
    <p>
      Her bruker jeg en kombinasjon av Kassalapp sitt API for matbutikker og
      matvarepriser samt Leaflet-kartet. Posisjon og kartstil paseres som URL
      når du går via linken på hovedsiden. Du kan velge butikker innen radius på
      1 til 10k. Vær oppmerksom på at på alle søk er det maksimalt 100 treff.
      Det betyr at om man for eksempel søker på 5 km radius og 10 km radius midt
      i Oslo for eksempel, vil man antageligvis ikke få opp ulikt antall
      butikker siden den vil treffe grensen før dette. Du kan også trykke på
      ikonet til butikken på kartet for å få opp adresse og dagens åpningstider.
    </p>
    <br />
    <p>
      Under kan man også gjøre søk på matvarer via fritekst. Du kan også sette
      makspris, eventuelt begrense til butikkjeder som er valgt via
      resultatlisten i søket over. Om du for eksempel markerer en Kiwi-butikk
      vil SAMTLIGE butikker i denne kjeden merkes i listen. Vær oppmerksom på at
      søk kun gjøres ved trykk på søk for å begrense antall API-kall. Du kan
      imidlertid sortere og endre til og fra "kun valgte butikker" ETTER at
      søket er gjort da dette sorteres lokalt. Ved klikk på en matvare kan man
      få opp statistikk over pris på denne matvaren i en graf.
    </p>
    <br />
    <p>
      Etter å ha testet denne API-en over litt tid så er det påfallende sjeldent
      å finne priser fra Kiwi og Rema for eksempel, mens Meny og Coop ofte har
      lagt inn priser. Litt usikker på hvilke Coop-butikker de baserer prisene
      sine på, da Kassalapp kun oppgir COOP_NO og ikke hvilken Coop-kjede
      prisene hentes fra. Siden så få kjeder legger inn prisene sine så har jeg
      kodet visningen slik at Oda sine priser alltid vises.
    </p>
  </>
);
const stroempriser = (
  <>
    <h2>Strømpriser</h2>{" "}
    <p>
      Ganske selvforklarende forsåvidt - dagens strømpriser for de ulike
      prissonene i Norge. Dette er priser inkludert moms men uten strømstøtte
      der det er aktuelt. Merk at prisene for Nord Norge er uten moms siden
      forbrukeren ikke belastes moms der.
    </p>
    <br />
    <p>
      Prisene hentes fra Hvakosterstrommen.no (link via logo nederst på siden)
      sitt API.
    </p>
  </>
);
const flytider = (
  <>
    <h2>Flytider</h2>
    <p>
      Fly til og fra ulike flyplasser i Norge, henter data fra Avinor sitt API.
      Henter status (landet, tatt av, bagasjebelte, innsjekkingsområde etc.)
      samt eventuelle forsinkelser og ny tid. Man kan sortere kun avganger eller
      ankomster, eller alle flighter. Det er også markert på utenlandsflyvninger
      om det er utenfor Schengen (og dermed forbi passkontrollen). Listen på
      norske flyplasser er lagt inn i koden, mens utenlandske flyplasser hentes
      fra APIet. Årsaken til dette var at ved kall mot API så blir æ, ø og å
      samme generiske tegnet slik at det var det enkleste måten å få dette
      riktig. Om det skulle dukke opp nye flyplasser i Norge vil den likevel
      hente dette fra API-kallet dersom denne ikke ligger inne i min liste.
    </p>
  </>
);
const vaeret = (
  <>
    <h2>Været</h2>
    <p>
      Værvarsel for ditt område. Henter området fra API-kallet når siden laster,
      eventuelt posisjon du har valgt på kartet. Gir deg været akkurat nå i
      øverste statuslinje, været 5 døgn fremover i et diagram med faktisk
      temperatur (målt ved 2 meter høyde), opplevd temperatur og bakketemperatur
      - alle som linjediagram, samt nedbørsmengde som stolpediagram. Til sist
      følger statuslinje for de neste dagene kl 0600, 1400 og 2200.
    </p>
    <br />
    <p>
      Jeg har kodet om værsymbolet til å vise ikon for dette, samt eventuelt
      eget for natt der det var tilgjengelig. Vindretning og styrke er også
      "oversatt" slik at vindretning og styrke er formulert i muntlig språk slik
      værmeldingen pleier å fremføre den (API-kallet gir vindretning i grader og
      vindstyrke i knopp).
    </p>
  </>
);

const okonomi = (
  <>
    <h2>Økonomi</h2>
    <p>
      Henter historiske valutakurser mot NOK fra Norges Bank for siste 5 år.
      Samt BNP fra Det Internasjonale Pengefondet (IMF) siden 1980. Her kan man
      sjalte inn og ut land av visning både i menyen og ved å trykke på
      farge-ikonet over grafen. Grafen genereres av samme JS Chart-modul som er
      brukt ellers på siden.
    </p>
    <br />
    <p>
      Multiselect i BNP-menyen har jeg bygd fra grunnen, man kan da trykke bort
      valg både med rullegardinmenyen oppe, og igjen.
    </p>
  </>
);
const reiseplanlegger = (
  <>
    <h2>Reiseplanlegger</h2>
    <p>
      Henter data om ulike stasjoner/stopp fra Entur sitt API og plasserer de på
      kartet. Trykk på stoppet for å få opp avgangstider (opprinnelig og
      oppdaterte), API-kall gjøres da dynamisk via en GraphQL-spørring.
    </p>
    <br />
    <p>
      Ved å trykke et annet sted på kartet når du har et aktivt stopp vil du få
      opp reiseforslag mellom valgt stasjon/stopp og dette punket. Forslagene er
      sortert etter tidsbruk, og du kan også se total gangavstand som inngår i
      reiseforslaget. Også dette søkes dynamisk fra Entur sitt API med GraphQL.
    </p>
  </>
);

function InsertHelpText({ selected }) {
  return (
    <div className={styles.helpText}>
      {selected === "/" && home}
      {selected === "/matpriser" && matpriser}
      {selected === "/stroempriser" && stroempriser}
      {selected === "/okonomi" && okonomi}
      {selected === "/vaeret" && vaeret}
      {selected === "/flytider" && flytider}
      {selected === "/reiseplanlegger" && reiseplanlegger}
    </div>
  );
}

export default InsertHelpText;
