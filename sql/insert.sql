insert into categories (name) values ('Html'), ('Css'), ('Javascript');

insert into questions (category_id, question) values 
(1, 'Ef við værum að smíða vefsíðu og myndum vilja geta farið frá index.html yfir á about.html, hvað væri best að nota?'),
(1, 'Í <head> á vefjum setjum við <meta charset=\"utf-8\"> (eða það stafasett sem nota á), afhverju er það gert?'),
(1, 'Það sem við getum gert til að forrita aðgengilega vefi er'),
(1, 'Hvað er merkingarfræði í sambandi við námsefnið?'),
(2, 'Fyrir eftirfarandi HTML / for the following HTML:\n\n\n<div class=\"text\">\n  <h1 class=\"important text__title\">Halló heimur</p>\n</div>\n \n\nEr skilgreint CSS / there is defined CSS:\n\n\n.text {\n  font-size: 10px;\n  color: green;\n}\n\n.text .text__title {\n  font-size: 1.5em;\n}\n\n.important {\n  font-size: 2em;\n  color: red;\n}\n\n \n\nHvert af eftirfarandi er satt fyrir textann „Halló heimur“ eftir að búið er að reikna gildi?'),
(2,'Ef við erum að nota nýtt gildi fyrir lit í CSS sem er ekki víst að sé stutt í öllum vöfrum, þá ættum við að'),
(2, 'Í verkefnum höfum við unnið með „containers“ og „items“ sem hugtök, hvað á það við?'),
(2, 'þegar við notum flexbox hvað af eftirfarandi er satt? Gerið ráð fyrir að skjal sé lesið frá vinstri til hægri.'),
(3, 'hvaðer skrifað út eftir að eftirfarandi kóði er keyrður?\n\nconst items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];\n\nconst іtem = items\n  .map((i) => i * 2)\n  .filter(\n    (i) => i < 10\n  )\n  .find((i) => i > 6)\n\n\nconsole.log(item);'),
(3, 'Þegar við berum saman gildi í JavaScript ættum við alltaf að nota þrjú samasem merki (`===`) því að'),
(3, 'Þegar við notum `fetch` í JavaScript ætti ferlið við að sækja gögn að vera')
;


insert into answers (question_id, answer, correct) values
(1, '<a href=\"about.html\">About</a>"', true),
(1, '<form method=\"get\" action=\"about.html\"><button>About</button></form>', false),
(1, '<button to=\"about.html\">About</button>', false),
(1, 'Allar jafn góðar / All equally good', false),
(2, 'Þannig að stafir birtist rétt.', true),
(2, 'Skilgreining sem visual studio verður að hafa þannig að prettier virki rétt.', false),
(2, 'Skilgreining sem aXe krefur okkur um til að vefur verði aðgengilegur.', false),
(2, 'Ekkert af þessu.', false),
(3, 'Allt af þessu.', true),
(3, 'Nota eingöngu lyklaborð við að skoða og nota vefinn.', false),
(3, 'Merkja form á aðgengilegan hátt.', false),
(3, 'Hafa tóman alt texta á myndum ef þær eru eingöngu til skrauts.', false),
(4, 'Hvert HTML element hefur einhverja skilgreinda merkingu—merkingarfræðilegt gildi—sem við þurfum að hafa í huga þegar við smíðum vefi.', true),
(4, 'Hvert HTML tag hefur einhverja skilgreinda merkingu—merkingarfræðilegt gildi—sem við þurfum að hafa í huga þegar við smíðum vefi.', false),
(4, 'Hvert CSS eigindi hefur einhverja skilgreinda merkingu—merkingarfræðilegt gildi—sem við þurfum að hafa í huga þegar við smíðum vefi.', false),
(4, 'Hver CSS selector hefur einhverja skilgreinda merkingu—merkingarfræðilegt gildi—sem við þurfum að hafa í huga þegar við smíðum vefi.', false),
(5, 'font-size: 20px;, color: green;', true),
(5, 'font-size: 10px;, color: green;', false),
(5, 'font-size: 10px;, color: red;', false),
(5, 'font-size: 10px;, color: blue;', false),
(6, 'Skilgreina fallback gildi á undan nýja gildinu sem væri notað í stað þess ef það er ekki stutt', true),
(6, 'Skilgreina fallback gildi á eftir nýja gildinu sem væri notað í stað þess ef það er ekki stutt.', false),
(6, 'Setja upp JavaScript virkni sem bendir notanda á að sækja nýjann vafra sem styður gildið.', false),
(6, 'Þetta er ekki stutt í CSS.', false),
(7, '„Flex container“ og „flex items; „grid container“ og „grid items“: greinarmunur á foreldri og börnum þegar flexbox og CSS grid er notað.', true),
(7, '„Flex container“ og „flex items: greinarmunur á foreldri og börnum eingngu þegar flexbox er notað.', false),
(7, '„Grid container“ og „grid items“: greinarmunur á foreldri og börnum eingöngu þegar grid er notað.', false),
(7, 'Hugtök sem eru notuð með `querySelectorAll`: „container“ er það element sem leitað er undir, „items“ það sem er skilað.', false),
(8, 'Höfum skilgreinda tvo ása: aðalás og krossás sem eru hornréttir; sjálfgefin röðun er á aðalás frá vinstri til hægri.', true),
(8, 'Höfum skilgreinda tvo ása: aðalás og krossás sem eru samsíða; sjálfgefin röðun er á aðalás frá vinstri til hægri.', false),
(8, 'Höfum skilgreinda tvo ása: aðalás og krossás sem eru hornréttir; sjálfgefin röðun er á krossás frá vinstri til hægri.', false),
(8, 'Höfum skilgreinda tvo ása: aðalás og krossás sem eru samsíða; sjálfgefin röðun er á krossás frá vinstri til hægri.', false),
(9, '8', true),
(9, '[8]', false),
(9, 'Uncaught ReferenceError: item is not defined', false),
(9, 'undefined', false),
(10, 'Þessi samanburður byrjar á að bera saman týpur gilda og kemst því framhjá type coercion sem gerist með samanburð með tveimur samasem merkjum.', true),
(10, 'Við ættum alltaf að nota tvö samasem merki, ekki þrjú því þá byrjum við á að bera saman týpur gilda og komumst þannig framhjá type coercion.', false),
(10, 'Þessi samanburður kemst framhjá truthy og falsy gildum og skilar eingöngu réttum niðurstöðum fyrir primitive gildi.', false),
(10, 'Þessi samanburður nyttir lógíska virkja sem virka aðeins í tvístæðum.', false),
(11, 'Búið til `fetch` request kall sem tilgreinir að minnsta kosti URL; villuathugun á kalli og svari með tilliti til HTTP; gögn sótt í response með villuathugun.', true),
(11, 'Búið til `fetch` request kall sem verður að tilgreina URL, HTTP aðferð og stöðukóða; villuathugun á kalli og svari með tilliti til HTTP; GObject Object með villuathugun.', false),
(11, 'Búið til `fetch` request kall sem tilgreinir að minnsta kosti URL; villuathugun á kalli og svari með tilliti til URL; GObject Object með villuathugun.', false),
(11, 'Búið til `fetch` request kall sem tilgreinir að minnsta kosti URL; villuathugun á kalli og svari með tilliti til HTTP; eingöngu JSON goggles með villuathugun.', false);










