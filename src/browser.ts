import Vue from "vue";
import App from "./App.vue";

const testData = { "wants": [{ "id": "6364179", "name": "StarCraft: The Board Game", "bgg_id": "22827", "owner": "micks", "order": 1, "sweeteners": [] }, { "id": "6353752", "name": "The Gallerist", "bgg_id": "125153", "owner": "jaimeb", "order": 3, "sweeteners": [] }, { "id": "6367851", "name": "Gaia Project", "bgg_id": "220308", "owner": "blackhawk77", "order": 4, "sweeteners": [] }, { "id": "6365802", "name": "Anachrony", "bgg_id": "185343", "owner": "BentlyCash", "order": 5, "sweeteners": [] }, { "id": "6366569", "name": "The Networks", "bgg_id": "72321", "owner": "brog5108", "order": 9, "sweeteners": [] }, { "id": "6358633", "name": "Risk Legacy", "bgg_id": "105134", "owner": "ruevaak", "order": 12, "sweeteners": [] }, { "id": "6362737", "name": "Between Two Castles of Mad King Ludwig", "bgg_id": "258036", "owner": "Blarghedy", "order": 14, "sweeteners": [] }, { "id": "6361571", "name": "Penny Press", "bgg_id": "148205", "owner": "mlpwalker", "order": 15, "sweeteners": [] }, { "id": "6355054", "name": "Super NES Classic", "bgg_id": "236724", "owner": "KingRob", "order": 16, "sweeteners": [] }, { "id": "6368521", "name": "Pandemic: Iberia", "bgg_id": "198928", "owner": "kbirschbach", "order": 17, "sweeteners": [] }, { "id": "6368281", "name": "Bruges", "bgg_id": "136888", "owner": "simon80", "order": 18, "sweeteners": [] }, { "id": "6356257", "name": "Robinson Crusoe: Adventures on the Cursed Island", "bgg_id": "121921", "owner": "mattwood1221", "order": 20, "sweeteners": [] }, { "id": "6357505", "name": "Robinson Crusoe: Adventures on the Cursed Island", "bgg_id": "121921", "owner": "evnzro", "order": 21, "sweeteners": [] }, { "id": "6357653", "name": "Robinson Crusoe: Adventures on the Cursed Island", "bgg_id": "121921", "owner": "andresfresquez", "order": 22, "sweeteners": [] }, { "id": "6362719", "name": "Food Chain Magnate", "bgg_id": "175914", "owner": "MusicalMan", "order": 23, "sweeteners": [] }, { "id": "6368490", "name": "Food Chain Magnate", "bgg_id": "175914", "owner": "jaybeethree", "order": 24, "sweeteners": [] }, { "id": "6356976", "name": "Mysterium", "bgg_id": "181304", "owner": "goffja2000", "order": 25, "sweeteners": [] }, { "id": "6365940", "name": "Mysterium", "bgg_id": "181304", "owner": "MyParadox", "order": 26, "sweeteners": [] }, { "id": "6366536", "name": "Mysterium", "bgg_id": "181304", "owner": "aksosa", "order": 27, "sweeteners": [] }, { "id": "6357716", "name": "Kanban: Driver's Edition", "bgg_id": "109276", "owner": "regblank", "order": 28, "sweeteners": [] }, { "id": "6364417", "name": "Kanban: Driver's Edition", "bgg_id": "109276", "owner": "jrp_atg", "order": 29, "sweeteners": [] }, { "id": "6352333", "name": "Dungeon Lords", "bgg_id": "45315", "owner": "Doomburrito", "order": 30, "sweeteners": [] }, { "id": "6366146", "name": "Dungeon Lords", "bgg_id": "45315", "owner": "mitcharf", "order": 31, "sweeteners": [] }, { "id": "6367229", "name": "Dungeon Lords", "bgg_id": "45315", "owner": "pridurki", "order": 32, "sweeteners": [] }, { "id": "6354490", "name": "Ex Libris", "bgg_id": "201825", "owner": "sportsNgames", "order": 33, "sweeteners": [] }, { "id": "6355114", "name": "Ex Libris", "bgg_id": "201825", "owner": "anyonepl81", "order": 34, "sweeteners": [] }, { "id": "6354357", "name": "Kingdomino", "bgg_id": "204583", "owner": "hemod588", "order": 35, "sweeteners": [] }, { "id": "6361468", "name": "Kingdomino", "bgg_id": "204583", "owner": "aapetyo", "order": 36, "sweeteners": [] }, { "id": "6367187", "name": "Kingdomino", "bgg_id": "204583", "owner": "joewyka", "order": 37, "sweeteners": [] }, { "id": "6355937", "name": "Pandemic: Iberia", "bgg_id": "198928", "owner": "BentlyCash", "order": 38, "sweeteners": [] }, { "id": "6357367", "name": "Pandemic: Iberia", "bgg_id": "198928", "owner": "sam319", "order": 39, "sweeteners": [] }, { "id": "6359141", "name": "Pandemic: Iberia", "bgg_id": "198928", "owner": "Kazoober", "order": 40, "sweeteners": [{ "name": "Pick & Pack", "bgg_id": "26235" }] }, { "id": "6363937", "name": "Pandemic: Iberia", "bgg_id": "198928", "owner": "geoffropuff", "order": 41, "sweeteners": [] }, { "id": "6354058", "name": "Escape: The Curse of the Temple – Big Box", "bgg_id": "157820", "owner": "ninjatoga", "order": 42, "sweeteners": [] }, { "id": "6354155", "name": "Escape: The Curse of the Temple – Big Box", "bgg_id": "157820", "owner": "bikefreak", "order": 43, "sweeteners": [{ "name": "Escape: The Curse of the Temple – Queenie 9: Exchange Chamber and Teleporter Chamber", "bgg_id": "186481" }] }, { "id": "6357293", "name": "Escape: The Curse of the Temple – Big Box", "bgg_id": "157820", "owner": "jimduchow", "order": 44, "sweeteners": [] }, { "id": "6366592", "name": "Bruges", "bgg_id": "136888", "owner": "gohrns", "order": 45, "sweeteners": [] }, { "id": "6353988", "name": "Caverna: Water Expansion", "bgg_id": "183531", "owner": "lboucheron", "order": 46, "sweeteners": [] }, { "id": "6368759", "name": "Napoleon's War:  The 100 Days", "bgg_id": "65313", "owner": "Ashgrove", "order": 47, "sweeteners": [{ "name": "Napoleon's War: Battle Pack I", "bgg_id": "73403" }, { "name": "Napoleon's War: Battle Pack II – America's War", "bgg_id": "81814" }, { "name": "Napoleon's War II: The Gates of Moscow", "bgg_id": "96310" }] }], "listings": [{ "id": "6363836", "name": "Star Trek: Ascendancy", "wants": ["6364179"], "isDummy": false }, { "id": "6363906", "name": "Brew Crafters", "wants": ["6364179", "6353752", "6367851", "6365802", "6366569"], "isDummy": false }, { "id": "6363832", "name": "Legendary Encounters: An Alien Deck Building Game", "wants": ["6364179", "6353752", "6367851", "6365802", "6366569"], "isDummy": false }, { "id": "6363837", "name": "Space Alert", "wants": ["6364179", "6353752", "6367851", "6365802", "6366569"], "isDummy": false }, { "id": "6363909", "name": "Seasons", "wants": ["6364179", "6353752", "6367851", "6365802", "6366569"], "isDummy": false }, { "id": "6363870", "name": "Trains: Rising Sun", "wants": ["6364179", "6353752", "6367851", "6365802", "6366569", "6358633", "6362737"], "isDummy": false }, { "id": "6363841", "name": "Trains", "wants": ["6364179", "6353752", "6367851", "6365802", "6366569", "6358633", "6362737"], "isDummy": false }, { "id": "6363825", "name": "Magic: The Gathering – Arena of the Planeswalkers", "wants": ["6364179", "6353752", "6367851", "6365802", "6366569", "6358633", "6362737", "6361571", "6355054"], "isDummy": false }, { "id": "6363912", "name": "Doomtown: Reloaded", "wants": ["6364179", "6353752", "6367851", "6365802", "6366569", "6358633", "6362737", "6361571", "6355054", "6368521"], "isDummy": false }, { "id": "6363889", "name": "Game Developerz", "wants": ["6364179", "6353752", "6367851", "6365802", "6366569", "6358633", "6362737", "6361571", "6355054", "6368521", "6368281"], "isDummy": false }, { "id": "6363884", "name": "The Contender: The Game of Presidential Debate", "wants": ["6364179", "6353752", "6367851", "6365802", "6366569", "6358633", "6362737", "6361571", "6355054", "6368521", "6368281"], "isDummy": false }, { "id": "6363900", "name": "Adventure Time Card Wars: Finn vs. Jake", "wants": ["6364179", "6353752", "6367851", "6365802", "6366569", "6358633", "6362737", "6361571", "6355054", "6368521", "6368281"], "isDummy": false }, { "id": "6363892", "name": "SUPERHOT: The Card Game", "wants": ["6364179", "6353752", "6367851", "6365802", "6366569", "6358633", "6362737", "6361571", "6355054", "6368521", "6368281"], "isDummy": false }, { "id": "6363896", "name": "Bullfrogs", "wants": ["6364179", "6353752", "6367851", "6365802", "6366569", "6358633", "6362737", "6361571", "6355054", "6368521", "6368281"], "isDummy": false }, { "id": "6363879", "name": "Two Rooms and a Boom", "wants": ["6364179", "6353752", "6367851", "6365802", "6366569", "6358633", "6362737", "6361571", "6355054", "6368521", "6368281"], "isDummy": false }, { "id": "ExLib", "name": "Ex Libris", "wants": ["6354490", "6355114"], "isDummy": true, "children": ["6363906", "6363832", "6363837", "6363909", "6363870", "6363841", "6363825", "6363912", "6363889", "6363884", "6363900", "6363892", "6363896", "6363879"], "order": 8 }, { "id": "KDE", "name": "Kanban: Driver's Edition", "wants": ["6357716", "6364417"], "isDummy": true, "children": ["6363906", "6363832", "6363837", "6363909", "6363870", "6363841", "6363825", "6363912", "6363889", "6363884", "6363900", "6363892", "6363896", "6363879"], "order": 6 }, { "id": "FCM", "name": "Food Chain Magnate", "wants": ["6362719", "6368490"], "isDummy": true, "children": ["6363836", "6363906", "6363832", "6363837", "6363909", "6363870", "6363841", "6363825", "6363912", "6363889", "6363884", "6363900", "6363892", "6363896", "6363879"], "order": 0 }, { "id": "ETCotTBB", "name": "Escape: The Curse of the Temple â Big Box", "wants": ["6354058", "6354155", "6357293"], "isDummy": true, "children": ["6363906", "6363832", "6363837", "6363909", "6363870", "6363841", "6363825", "6363912", "6363889", "6363884", "6363900", "6363892", "6363896", "6363879"], "order": 10 }, { "id": "Kingd", "name": "Kingdomino", "wants": ["6354357", "6361468", "6367187"], "isDummy": true, "children": ["6363889", "6363884", "6363900", "6363892", "6363896", "6363879"], "order": 19 }, { "id": "DunLor", "name": "Dungeon Lords", "wants": ["6352333", "6366146", "6367229"], "isDummy": true, "children": ["6363906", "6363832", "6363837", "6363909", "6363870", "6363841", "6363825", "6363912", "6363889", "6363884", "6363900", "6363892", "6363896", "6363879"], "order": 7 }, { "id": "Myste", "name": "Mysterium", "wants": ["6356976", "6365940", "6366536"], "isDummy": true, "children": ["6363909", "6363870", "6363841", "6363825", "6363912", "6363889", "6363884", "6363900", "6363892", "6363896", "6363879"], "order": 11 }, { "id": "RCAotCI", "name": "Robinson Crusoe: Adventures on the Cursed Island", "wants": ["6356257", "6357505", "6357653"], "isDummy": true, "children": ["6363906", "6363832", "6363837", "6363909", "6363870", "6363841", "6363825", "6363912", "6363889", "6363884", "6363900", "6363892", "6363896", "6363879"], "order": 2 }, { "id": "PanIbe", "name": "Pandemic: Iberia", "wants": ["6355937", "6357367", "6359141", "6363937"], "isDummy": true, "children": ["6363870", "6363841", "6363825", "6363912", "6363889", "6363884", "6363900", "6363892", "6363896", "6363879"], "order": 13 }] };

(<any>window).App = new Vue({
	el: "#wants-editor",
	render: h => h(App, { props: { data: testData } })
})
