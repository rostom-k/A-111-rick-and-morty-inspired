// Comprehensive Bilingual Item Translation & Functionality Knowledge
// 100% Coverage of All 5 Stories, Improvised Items, and Survival Combinations

export interface ItemInfo {
  en: string;
  fr: string;
  utilityEn: string;
  utilityFr: string;
}

export const ITEM_DICTIONARY: Record<string, ItemInfo> = {
  "armored duct tape roll": {
    "en": "Armored Duct Tape Roll",
    "fr": "Rouleau de ruban adhésif blindé",
    "utilityEn": "Heavy-duty reinforced tape. Used for taping cracked pipes, sealing air leaks, binding tools, or crafting a spear with a knife and branch/pipe.",
    "utilityFr": "Ruban adhésif blindé ultra-résistant. Sert à coller des objets, colmater des fuites d'air ou tuyaux, fixer des fils, ou fabriquer une lance en scotchant un couteau sur une branche ou un tuyau."
  },
  "rouleau de ruban adhesif blinde": {
    "en": "Armored Duct Tape Roll",
    "fr": "Rouleau de ruban adhésif blindé",
    "utilityEn": "Heavy-duty reinforced tape. Used for taping cracked pipes, sealing air leaks, binding tools, or crafting a spear with a knife and branch/pipe.",
    "utilityFr": "Ruban adhésif blindé ultra-résistant. Sert à coller des objets, colmater des fuites d'air ou tuyaux, fixer des fils, ou fabriquer une lance en scotchant un couteau sur une branche ou un tuyau."
  },
  "black duct tape": {
    "en": "Black Duct Tape",
    "fr": "Ruban adhésif noir",
    "utilityEn": "Sturdy black adhesive. Used for taping, sealing leaks, patching holes, binding wires, and crafting makeshift gear.",
    "utilityFr": "Ruban adhésif noir résistant. Sert à coller, colmater, réparer des fissures, fixer des câbles et assembler des objets."
  },
  "ruban adhesif noir": {
    "en": "Black Duct Tape",
    "fr": "Ruban adhésif noir",
    "utilityEn": "Sturdy black adhesive. Used for taping, sealing leaks, patching holes, binding wires, and crafting makeshift gear.",
    "utilityFr": "Ruban adhésif noir résistant. Sert à coller, colmater, réparer des fissures, fixer des câbles et assembler des objets."
  },
  "duct tape": {
    "en": "Duct Tape",
    "fr": "Ruban adhésif",
    "utilityEn": "Strong adhesive tape. Used to tape, seal, bind, or repair items.",
    "utilityFr": "Ruban adhésif solide. Sert à scotcher, coller, colmater et réparer des objets."
  },
  "ruban adhesif": {
    "en": "Adhesive Tape",
    "fr": "Ruban adhésif",
    "utilityEn": "General adhesive tape for sticking and repairing objects.",
    "utilityFr": "Ruban adhésif pour coller, scotcher et réparer."
  },
  "adhesive tape": {
    "en": "Adhesive Tape",
    "fr": "Ruban adhésif",
    "utilityEn": "General adhesive tape for sticking and repairing objects.",
    "utilityFr": "Ruban adhésif pour coller, scotcher et réparer."
  },
  "improvised spear": {
    "en": "Improvised Spear",
    "fr": "Lance de fortune",
    "utilityEn": "A makeshift spear created by taping a knife to a pipe or wooden branch with duct tape. Provides reach and lethal defense.",
    "utilityFr": "Lance artisanale créée en scotchant un couteau au bout d'un tuyau ou d'une branche avec du ruban adhésif. Offre allonge et défense létale."
  },
  "lance de fortune": {
    "en": "Improvised Spear",
    "fr": "Lance de fortune",
    "utilityEn": "A makeshift spear created by taping a knife to a pipe or wooden branch with duct tape. Provides reach and lethal defense.",
    "utilityFr": "Lance artisanale créée en scotchant un couteau au bout d'un tuyau ou d'une branche avec du ruban adhésif. Offre allonge et défense létale."
  },
  "kitchen knife": {
    "en": "Kitchen Knife",
    "fr": "Couteau de cuisine",
    "utilityEn": "Sharp steel blade. Cuts cords and cloth, carves wood, opens containers, or serves in melee combat.",
    "utilityFr": "Lame d'acier aiguisée. Sert à trancher cordes/tissus, tailler du bois, ouvrir des colis ou se défendre au corps à corps."
  },
  "couteau de cuisine": {
    "en": "Kitchen Knife",
    "fr": "Couteau de cuisine",
    "utilityEn": "Sharp steel blade. Cuts cords and cloth, carves wood, opens containers, or serves in melee combat.",
    "utilityFr": "Lame d'acier aiguisée. Sert à trancher cordes/tissus, tailler du bois, ouvrir des colis ou se défendre au corps à corps."
  },
  "pocket knife": {
    "en": "Pocket Knife",
    "fr": "Couteau de poche",
    "utilityEn": "Folding blade utility tool for cutting, scraping, and detailed craft.",
    "utilityFr": "Couteau pliant multifonction pour trancher et bricoler."
  },
  "couteau de poche": {
    "en": "Pocket Knife",
    "fr": "Couteau de poche",
    "utilityEn": "Folding blade utility tool for cutting, scraping, and detailed craft.",
    "utilityFr": "Couteau pliant multifonction pour trancher et bricoler."
  },
  "antique crafted dagger": {
    "en": "Antique Crafted Dagger",
    "fr": "Dague artisanale antique",
    "utilityEn": "Ornate sharp dagger. Pierces hides and serves as an offering or lethal weapon.",
    "utilityFr": "Dague acérée ouvragée. Transperce les peaux et sert d'arme ou d'offrande rituelle."
  },
  "dague artisanale antique": {
    "en": "Antique Crafted Dagger",
    "fr": "Dague artisanale antique",
    "utilityEn": "Ornate sharp dagger. Pierces hides and serves as an offering or lethal weapon.",
    "utilityFr": "Dague acérée ouvragée. Transperce les peaux et sert d'arme ou d'offrande rituelle."
  },
  "dague rituelle a lame ondulee": {
    "en": "Dague rituelle à lame ondulée",
    "fr": "Wavy-Blade Ritual Dagger",
    "utilityEn": "Ritual curved dagger. Cuts mystical seals, carves runes, and inflicts bleeding.",
    "utilityFr": "Dague sacrificielle à lame ondulée. Tranche les sceaux occultes et sert d'arme sacrificielle."
  },
  "wavy blade ritual dagger": {
    "en": "Dague rituelle à lame ondulée",
    "fr": "Wavy-Blade Ritual Dagger",
    "utilityEn": "Ritual curved dagger. Cuts mystical seals, carves runes, and inflicts bleeding.",
    "utilityFr": "Dague sacrificielle à lame ondulée. Tranche les sceaux occultes et sert d'arme sacrificielle."
  },
  "couteau a viande en argent": {
    "en": "Couteau à viande en argent",
    "fr": "Silver Meat Knife",
    "utilityEn": "Pure silver carving knife. Slices thick meat and harms supernatural or chimeric entities.",
    "utilityFr": "Couteau en argent massif. Tranche les viandes épaisses et blesse les créatures chimériques."
  },
  "silver meat knife": {
    "en": "Couteau à viande en argent",
    "fr": "Silver Meat Knife",
    "utilityEn": "Pure silver carving knife. Slices thick meat and harms supernatural or chimeric entities.",
    "utilityFr": "Couteau en argent massif. Tranche les viandes épaisses et blesse les créatures chimériques."
  },
  "medical scalpel": {
    "en": "Medical Scalpel",
    "fr": "Scalpel chirurgical",
    "utilityEn": "Razor-sharp surgical instrument. Precision incisions, dissecting samples, or draining venom.",
    "utilityFr": "Bistouri ultra-tranchant. Incisions chirurgicales précises, dissection et extraction de venin."
  },
  "scalpel chirurgical": {
    "en": "Medical Scalpel",
    "fr": "Scalpel chirurgical",
    "utilityEn": "Razor-sharp surgical instrument. Precision incisions, dissecting samples, or draining venom.",
    "utilityFr": "Bistouri ultra-tranchant. Incisions chirurgicales précises, dissection et extraction de venin."
  },
  "meat hook": {
    "en": "Meat Hook",
    "fr": "Crochet de boucherie",
    "utilityEn": "Heavy curved iron hook. Formidable melee weapon or makeshift climbing grapple.",
    "utilityFr": "Crochet d'acier lourd. Arme redoutable ou outil d'accroche pour escalade."
  },
  "crochet de boucherie": {
    "en": "Meat Hook",
    "fr": "Crochet de boucherie",
    "utilityEn": "Heavy curved iron hook. Formidable melee weapon or makeshift climbing grapple.",
    "utilityFr": "Crochet d'acier lourd. Arme redoutable ou outil d'accroche pour escalade."
  },
  "rusty bolt cutters": {
    "en": "Rusty Bolt Cutters",
    "fr": "Coupe-boulons rouillé",
    "utilityEn": "Heavy lever tool. Snips iron chains, cuts padlocks, and forces open barred gates.",
    "utilityFr": "Pince coupe-boulons lourde. Sectionne les chaînes, cadenas et barreaux de fer."
  },
  "coupe boulons rouille": {
    "en": "Rusty Bolt Cutters",
    "fr": "Coupe-boulons rouillé",
    "utilityEn": "Heavy lever tool. Snips iron chains, cuts padlocks, and forces open barred gates.",
    "utilityFr": "Pince coupe-boulons lourde. Sectionne les chaînes, cadenas et barreaux de fer."
  },
  "metal scraper": {
    "en": "Metal Scraper",
    "fr": "Grattoir métallique",
    "utilityEn": "Flat metal tool for clearing rust, prying thin seams, or chipping stone.",
    "utilityFr": "Outil plat pour gratter la rouille, décoller des plaques ou racler la pierre."
  },
  "grattoir metallique": {
    "en": "Metal Scraper",
    "fr": "Grattoir métallique",
    "utilityEn": "Flat metal tool for clearing rust, prying thin seams, or chipping stone.",
    "utilityFr": "Outil plat pour gratter la rouille, décoller des plaques ou racler la pierre."
  },
  "bent metal shovel": {
    "en": "Bent Metal Shovel",
    "fr": "Pelle métallique tordue",
    "utilityEn": "Digging tool or blunt bludgeon. Clears rubble, unearths buried caches, or repels beasts.",
    "utilityFr": "Outil d'excavation ou arme contondante. Déblaye les gravats et déterre les caches."
  },
  "pelle metallique tordue": {
    "en": "Bent Metal Shovel",
    "fr": "Pelle métallique tordue",
    "utilityEn": "Digging tool or blunt bludgeon. Clears rubble, unearths buried caches, or repels beasts.",
    "utilityFr": "Outil d'excavation ou arme contondante. Déblaye les gravats et déterre les caches."
  },
  "broken hand pickaxe": {
    "en": "Broken Hand Pickaxe",
    "fr": "Pioche manuelle brisée",
    "utilityEn": "Short iron pick. Chips brittle masonry, breaches rock walls, or acts as a weapon.",
    "utilityFr": "Pioche courte en fer. Brise la maçonnerie friable, creuse la roche ou frappe au combat."
  },
  "pioche manuelle brisee": {
    "en": "Broken Hand Pickaxe",
    "fr": "Pioche manuelle brisée",
    "utilityEn": "Short iron pick. Chips brittle masonry, breaches rock walls, or acts as a weapon.",
    "utilityFr": "Pioche courte en fer. Brise la maçonnerie friable, creuse la roche ou frappe au combat."
  },
  "carpenter hammer": {
    "en": "Carpenter Hammer",
    "fr": "Marteau de charpentier",
    "utilityEn": "Heavy steel hammer. Pulls nails, shatters padlocks, and demolishes wooden planks.",
    "utilityFr": "Marteau en acier trempé. Arrache les clous, brise les cadenas et fracasse le bois."
  },
  "marteau de charpentier": {
    "en": "Carpenter Hammer",
    "fr": "Marteau de charpentier",
    "utilityEn": "Heavy steel hammer. Pulls nails, shatters padlocks, and demolishes wooden planks.",
    "utilityFr": "Marteau en acier trempé. Arrache les clous, brise les cadenas et fracasse le bois."
  },
  "12mm adjustable wrench": {
    "en": "12mm Adjustable Wrench",
    "fr": "Clef à molette de 12",
    "utilityEn": "Mechanical wrench. Loosens rusted pipe bolts, valves, and pressurized fittings.",
    "utilityFr": "Clé mécanique. Desserre les écrous grippés, vannes et raccords sous pression."
  },
  "clef a molette de 12": {
    "en": "12mm Adjustable Wrench",
    "fr": "Clef à molette de 12",
    "utilityEn": "Mechanical wrench. Loosens rusted pipe bolts, valves, and pressurized fittings.",
    "utilityFr": "Clé mécanique. Desserre les écrous grippés, vannes et raccords sous pression."
  },
  "cutting pliers": {
    "en": "Cutting Pliers",
    "fr": "Pince coupante",
    "utilityEn": "Steel cutting tool. Snips electrical wires, fence meshes, and tripwires.",
    "utilityFr": "Pince coupante en acier. Sectionne les câbles électriques, grillages et fils pièges."
  },
  "pince coupante": {
    "en": "Cutting Pliers",
    "fr": "Pince coupante",
    "utilityEn": "Steel cutting tool. Snips electrical wires, fence meshes, and tripwires.",
    "utilityFr": "Pince coupante en acier. Sectionne les câbles électriques, grillages et fils pièges."
  },
  "carbon ice/rock pick": {
    "en": "Carbon Ice/Rock Pick",
    "fr": "Pic à glace/roche en carbone",
    "utilityEn": "Ultra-light climbing pick. Penetrates ice, cracks mineral seams, or climbs steep cliffs.",
    "utilityFr": "Pic d'escalade en carbone. Pénètre la glace, fissure les veines minérales et ancre l'escalade."
  },
  "pic a glace/roche en carbone": {
    "en": "Carbon Ice/Rock Pick",
    "fr": "Pic à glace/roche en carbone",
    "utilityEn": "Ultra-light climbing pick. Penetrates ice, cracks mineral seams, or climbs steep cliffs.",
    "utilityFr": "Pic d'escalade en carbone. Pénètre la glace, fissure les veines minérales et ancre l'escalade."
  },
  "telescopic grabbing tongs": {
    "en": "Telescopic Grabbing Tongs",
    "fr": "Pince de préhension télescopique",
    "utilityEn": "Extending mechanical arm. Safely grabs distant, submerged, or radioactive objects.",
    "utilityFr": "Bras mécanique extensible. Attrape des objets éloignés, immergés ou radioactifs sans risque."
  },
  "pince de prehension telescopique": {
    "en": "Telescopic Grabbing Tongs",
    "fr": "Pince de préhension télescopique",
    "utilityEn": "Extending mechanical arm. Safely grabs distant, submerged, or radioactive objects.",
    "utilityFr": "Bras mécanique extensible. Attrape des objets éloignés, immergés ou radioactifs sans risque."
  },
  "hemp rope": {
    "en": "Hemp Rope",
    "fr": "Corde de chanvre",
    "utilityEn": "Coarse 10m rope. Useful for rappelling down pits, binding prisoners, or towing gear.",
    "utilityFr": "Corde de chanvre de 10m. Sert à descendre en rappel, ligoter des captifs ou hisser du matériel."
  },
  "corde de chanvre": {
    "en": "Hemp Rope",
    "fr": "Corde de chanvre",
    "utilityEn": "Coarse 10m rope. Useful for rappelling down pits, binding prisoners, or towing gear.",
    "utilityFr": "Corde de chanvre de 10m. Sert à descendre en rappel, ligoter des captifs ou hisser du matériel."
  },
  "15m marine rope": {
    "en": "15m Marine Rope",
    "fr": "Corde marine de 15m",
    "utilityEn": "Rot-resistant treated rope. Endures seawater, climbing slick coastal cliffs, or anchoring rafts.",
    "utilityFr": "Corde marine traitée anti-moisissure. Résiste à l'eau de mer et sécurise l'escalade des falaises."
  },
  "corde marine de 15m": {
    "en": "15m Marine Rope",
    "fr": "Corde marine de 15m",
    "utilityEn": "Rot-resistant treated rope. Endures seawater, climbing slick coastal cliffs, or anchoring rafts.",
    "utilityFr": "Corde marine traitée anti-moisissure. Résiste à l'eau de mer et sécurise l'escalade des falaises."
  },
  "10m static climbing rope": {
    "en": "10m Static Climbing Rope",
    "fr": "Corde d'escalade statique de 10m",
    "utilityEn": "Heavy-load climbing rope. Essential for rappelling vertical fissures and ravines.",
    "utilityFr": "Corde d'escalade statique haute résistance. Indispensable pour franchir les ravins verticaux."
  },
  "corde descalade statique de 10m": {
    "en": "10m Static Climbing Rope",
    "fr": "Corde d'escalade statique de 10m",
    "utilityEn": "Heavy-load climbing rope. Essential for rappelling vertical fissures and ravines.",
    "utilityFr": "Corde d'escalade statique haute résistance. Indispensable pour franchir les ravins verticaux."
  },
  "braided steel cable": {
    "en": "Braided Steel Cable",
    "fr": "Câble en acier tressé",
    "utilityEn": "High-tensile wire. Holds heavy structural weights, sets cable traps, or reinforces structures.",
    "utilityFr": "Câble en acier tressé à haute résistance. Soutient de lourdes charges et sert de câble tracteur."
  },
  "cable en acier tresse": {
    "en": "Braided Steel Cable",
    "fr": "Câble en acier tressé",
    "utilityEn": "High-tensile wire. Holds heavy structural weights, sets cable traps, or reinforces structures.",
    "utilityFr": "Câble en acier tressé à haute résistance. Soutient de lourdes charges et sert de câble tracteur."
  },
  "twisted wire": {
    "en": "Twisted Wire",
    "fr": "Fil métallique torsadé",
    "utilityEn": "Flexible conductive wire. Picks simple locks, bypasses circuits, or ties items together.",
    "utilityFr": "Fil métallique souple. Crochète des serrures simples, pontez des circuits ou lie des objets."
  },
  "fil metallique torsade": {
    "en": "Twisted Wire",
    "fr": "Fil métallique torsadé",
    "utilityEn": "Flexible conductive wire. Picks simple locks, bypasses circuits, or ties items together.",
    "utilityFr": "Fil métallique souple. Crochète des serrures simples, pontez des circuits ou lie des objets."
  },
  "rusty steel chain": {
    "en": "Rusty Steel Chain",
    "fr": "Chaîne en acier rouillée",
    "utilityEn": "Heavy iron links. Restrains doors, ties heavy loads, or swings as a crude flail.",
    "utilityFr": "Maillons d'acier lourd. Verrouille des battants, sécurise des charges ou sert de fléau."
  },
  "chaine en acier rouillee": {
    "en": "Rusty Steel Chain",
    "fr": "Chaîne en acier rouillée",
    "utilityEn": "Heavy iron links. Restrains doors, ties heavy loads, or swings as a crude flail.",
    "utilityFr": "Maillons d'acier lourd. Verrouille des battants, sécurise des charges ou sert de fléau."
  },
  "climbing carabiner": {
    "en": "Climbing Carabiner",
    "fr": "Mousqueton d'escalade",
    "utilityEn": "Spring-loaded snap link. Secures ropes, fastens gear to belt, or anchors safety lines.",
    "utilityFr": "Mousqueton à ressort. Verrouille les cordes, accroche du matériel ou sécurise un ancrage."
  },
  "mousqueton descalade": {
    "en": "Climbing Carabiner",
    "fr": "Mousqueton d'escalade",
    "utilityEn": "Spring-loaded snap link. Secures ropes, fastens gear to belt, or anchors safety lines.",
    "utilityFr": "Mousqueton à ressort. Verrouille les cordes, accroche du matériel ou sécurise un ancrage."
  },
  "rusted safety carabiner": {
    "en": "Rusted Safety Carabiner",
    "fr": "Mousqueton de sécurité rouillé",
    "utilityEn": "Corroded carabiner. Usable with caution for rope rigging.",
    "utilityFr": "Mousqueton corrodé. Utilisable avec prudence pour gréer une corde."
  },
  "mousqueton de securite rouille": {
    "en": "Rusted Safety Carabiner",
    "fr": "Mousqueton de sécurité rouillé",
    "utilityEn": "Corroded carabiner. Usable with caution for rope rigging.",
    "utilityFr": "Mousqueton corrodé. Utilisable avec prudence pour gréer une corde."
  },
  "titanium climbing piton": {
    "en": "Titanium Climbing Piton",
    "fr": "Piton d'escalade en titane",
    "utilityEn": "Hardened climbing wedge. Driven into rock fissures to establish anchor points.",
    "utilityFr": "Piton d'escalade en titane. Se plante dans les fissures rocheuses pour créer un point d'amarrage."
  },
  "piton descalade en titane": {
    "en": "Titanium Climbing Piton",
    "fr": "Piton d'escalade en titane",
    "utilityEn": "Hardened climbing wedge. Driven into rock fissures to establish anchor points.",
    "utilityFr": "Piton d'escalade en titane. Se plante dans les fissures rocheuses pour créer un point d'amarrage."
  },
  "rusted iron piton": {
    "en": "Rusted Iron Piton",
    "fr": "Piton en fer rouillé",
    "utilityEn": "Iron spike. Can be wedged into stone cracks or doors.",
    "utilityFr": "Piton en fer. Peut être coincé dans une fissure ou sous une porte."
  },
  "piton en fer rouille": {
    "en": "Rusted Iron Piton",
    "fr": "Piton en fer rouillé",
    "utilityEn": "Iron spike. Can be wedged into stone cracks or doors.",
    "utilityFr": "Piton en fer. Peut être coincé dans une fissure ou sous une porte."
  },
  "ground anchoring stake": {
    "en": "Ground Anchoring Stake",
    "fr": "Ancre de fixation au sol",
    "utilityEn": "Heavy ground stake. Secures shelters, tents, and guide wires against violent storms.",
    "utilityFr": "Piquet d'ancrage massif. Fixe solidement les abris et câbles de haubanage face aux tempêtes."
  },
  "ancre de fixation au sol": {
    "en": "Ground Anchoring Stake",
    "fr": "Ancre de fixation au sol",
    "utilityEn": "Heavy ground stake. Secures shelters, tents, and guide wires against violent storms.",
    "utilityFr": "Piquet d'ancrage massif. Fixe solidement les abris et câbles de haubanage face aux tempêtes."
  },
  "massive steel bolt": {
    "en": "Massive Steel Bolt",
    "fr": "Boulon d'acier massif",
    "utilityEn": "Heavy threaded fastener. Counterweight, blunt projectile, or machine repair part.",
    "utilityFr": "Gros boulon fileté. Contrepoids, projectile lourd ou pièce de rechange mécanique."
  },
  "boulon dacier massif": {
    "en": "Massive Steel Bolt",
    "fr": "Boulon d'acier massif",
    "utilityEn": "Heavy threaded fastener. Counterweight, blunt projectile, or machine repair part.",
    "utilityFr": "Gros boulon fileté. Contrepoids, projectile lourd ou pièce de rechange mécanique."
  },
  "bent iron nail": {
    "en": "Bent Iron Nail",
    "fr": "Clou en fer tordu",
    "utilityEn": "Crude iron nail. Can be straightened, used as lockpick, or embedded as a spiked trap.",
    "utilityFr": "Clou en fer. Peut être redressé, servir de crochet de serrure ou d'élément de piège."
  },
  "clou en fer tordu": {
    "en": "Bent Iron Nail",
    "fr": "Clou en fer tordu",
    "utilityEn": "Crude iron nail. Can be straightened, used as lockpick, or embedded as a spiked trap.",
    "utilityFr": "Clou en fer. Peut être redressé, servir de crochet de serrure ou d'élément de piège."
  },
  "sturdy wooden branch": {
    "en": "Sturdy Wooden Branch",
    "fr": "Branche de bois solide",
    "utilityEn": "Improvised wooden club, lever, or floor trap probe. Can be taped to a knife to make a spear.",
    "utilityFr": "Bâton solide, levier ou sonde de pièges. Peut être combiné avec du ruban adhésif et un couteau pour former une lance."
  },
  "branche de bois solide": {
    "en": "Sturdy Wooden Branch",
    "fr": "Branche de bois solide",
    "utilityEn": "Improvised wooden club, lever, or floor trap probe. Can be taped to a knife to make a spear.",
    "utilityFr": "Bâton solide, levier ou sonde de pièges. Peut être combiné avec du ruban adhésif et un couteau pour former une lance."
  },
  "sharp heavy stone": {
    "en": "Sharp Heavy Stone",
    "fr": "Pierre tranchante",
    "utilityEn": "Heavy sharp rock. Thrown projectile, lock smasher, altar offering, or blunt weapon.",
    "utilityFr": "Pierre lourde tranchante. Projectile à lancer, brise-cadenas, offrande d'autel ou arme contondante."
  },
  "pierre tranchante": {
    "en": "Sharp Heavy Stone",
    "fr": "Pierre tranchante",
    "utilityEn": "Heavy sharp rock. Thrown projectile, lock smasher, altar offering, or blunt weapon.",
    "utilityFr": "Pierre lourde tranchante. Projectile à lancer, brise-cadenas, offrande d'autel ou arme contondante."
  },
  "metal pipe": {
    "en": "Metal Pipe",
    "fr": "Tuyau en métal",
    "utilityEn": "Heavy hollow steel conduit. Bludgeon, crowbar, or spear shaft when combined with knife and tape.",
    "utilityFr": "Tuyau d'acier creux. Matraque, pied-de-biche, ou manche de lance combiné avec couteau et scotch."
  },
  "tuyau en metal": {
    "en": "Metal Pipe",
    "fr": "Tuyau en métal",
    "utilityEn": "Heavy hollow steel conduit. Bludgeon, crowbar, or spear shaft when combined with knife and tape.",
    "utilityFr": "Tuyau d'acier creux. Matraque, pied-de-biche, ou manche de lance combiné avec couteau et scotch."
  },
  "cloth strip": {
    "en": "Cloth Strip",
    "fr": "Bande de tissu",
    "utilityEn": "Fabric band. Emergency tourniquet, wound compress, or torch wick.",
    "utilityFr": "Bandelette de tissu. Garrot de fortune, compresse ou mèche de torche."
  },
  "bande de tissu": {
    "en": "Cloth Strip",
    "fr": "Bande de tissu",
    "utilityEn": "Fabric band. Emergency tourniquet, wound compress, or torch wick.",
    "utilityFr": "Bandelette de tissu. Garrot de fortune, compresse ou mèche de torche."
  },
  "disinfectant bottle": {
    "en": "Disinfectant Bottle",
    "fr": "Flacon de désinfectant",
    "utilityEn": "Medical antiseptic. Neutralizes spider venom, cleans infected wounds, and heals (+25 Health).",
    "utilityFr": "Antiseptique médical puissant. Neutralise le venin d'araignée, désinfecte les plaies et soigne (+25 Santé)."
  },
  "flacon de desinfectant": {
    "en": "Disinfectant Bottle",
    "fr": "Flacon de désinfectant",
    "utilityEn": "Medical antiseptic. Neutralizes spider venom, cleans infected wounds, and heals (+25 Health).",
    "utilityFr": "Antiseptique médical puissant. Neutralise le venin d'araignée, désinfecte les plaies et soigne (+25 Santé)."
  },
  "full first aid kit": {
    "en": "Full First Aid Kit",
    "fr": "Trousse de premiers soins complète",
    "utilityEn": "Comprehensive trauma kit. Bandages, sutures, burn ointment. Cures poison and heals (+35 Health).",
    "utilityFr": "Trousse médicale d'urgence. Pansements, sutures, compresses. Neutralise le poison et soigne (+35 Santé)."
  },
  "trousse de premiers soins complete": {
    "en": "Full First Aid Kit",
    "fr": "Trousse de premiers soins complète",
    "utilityEn": "Comprehensive trauma kit. Bandages, sutures, burn ointment. Cures poison and heals (+35 Health).",
    "utilityFr": "Trousse médicale d'urgence. Pansements, sutures, compresses. Neutralise le poison et soigne (+35 Santé)."
  },
  "soiled bandage": {
    "en": "Soiled Bandage",
    "fr": "Bandage souillé",
    "utilityEn": "Worn linen strip. Can be boiled/washed or burned as kindling.",
    "utilityFr": "Bande de lin usagée. Peut être nettoyée ou brûlée pour démarrer un feu."
  },
  "bandage souille": {
    "en": "Soiled Bandage",
    "fr": "Bandage souillé",
    "utilityEn": "Worn linen strip. Can be boiled/washed or burned as kindling.",
    "utilityFr": "Bande de lin usagée. Peut être nettoyée ou brûlée pour démarrer un feu."
  },
  "rubbing alcohol vial": {
    "en": "Rubbing Alcohol Vial",
    "fr": "Fiole d'alcool à friction",
    "utilityEn": "70% isopropyl alcohol. Cleans lacerations, sterilizes blades, or ignites as an incendiary fuel.",
    "utilityFr": "Alcool à 70%. Désinfecte les plaies, stérilise les lames ou sert de combustible inflammable."
  },
  "fiole dalcool a friction": {
    "en": "Rubbing Alcohol Vial",
    "fr": "Fiole d'alcool à friction",
    "utilityEn": "70% isopropyl alcohol. Cleans lacerations, sterilizes blades, or ignites as an incendiary fuel.",
    "utilityFr": "Alcool à 70%. Désinfecte les plaies, stérilise les lames ou sert de combustible inflammable."
  },
  "empty syringe": {
    "en": "Empty Syringe",
    "fr": "Seringue vide",
    "utilityEn": "Graduated plastic syringe. Draws liquids, samples venom, or injects antivenom.",
    "utilityFr": "Seringue graduée. Aspire des fluides, prélève du venin ou injecte des solutions."
  },
  "seringue vide": {
    "en": "Empty Syringe",
    "fr": "Seringue vide",
    "utilityEn": "Graduated plastic syringe. Draws liquids, samples venom, or injects antivenom.",
    "utilityFr": "Seringue graduée. Aspire des fluides, prélève du venin ou injecte des solutions."
  },
  "sedative syringe": {
    "en": "Sedative Syringe",
    "fr": "Seringue de calmant",
    "utilityEn": "Dose of tranquilizer. Calms severe hysteria/panic (+25 Sanity) or pacifies beasts.",
    "utilityFr": "Dose de sédatif. Calme l'hystérie et la panique (+25 Mental) ou endort une bête."
  },
  "seringue de calmant": {
    "en": "Sedative Syringe",
    "fr": "Seringue de calmant",
    "utilityEn": "Dose of tranquilizer. Calms severe hysteria/panic (+25 Sanity) or pacifies beasts.",
    "utilityFr": "Dose de sédatif. Calme l'hystérie et la panique (+25 Mental) ou endort une bête."
  },
  "empty atropine injector": {
    "en": "Empty Atropine Injector",
    "fr": "Injecteur d'atropine vide",
    "utilityEn": "Spent auto-injector casing. Can be reloaded with chemical doses.",
    "utilityFr": "Boîtier d'auto-injecteur vide. Peut être rechargé avec des substances chimiques."
  },
  "injecteur datropine vide": {
    "en": "Empty Atropine Injector",
    "fr": "Injecteur d'atropine vide",
    "utilityEn": "Spent auto-injector casing. Can be reloaded with chemical doses.",
    "utilityFr": "Boîtier d'auto-injecteur vide. Peut être rechargé avec des substances chimiques."
  },
  "water bottle (half full)": {
    "en": "Water Bottle (Half-Full)",
    "fr": "Bouteille d'eau (à demi pleine)",
    "utilityEn": "Potable drinking water. Restores hydration (+25 Thirst), rinses burns, or thrown as a sound decoy.",
    "utilityFr": "Eau potable. Rétablit l'hydratation (+25 Soif), rince les brûlures ou à lancer pour diversion."
  },
  "bouteille deau (a demi pleine)": {
    "en": "Water Bottle (Half-Full)",
    "fr": "Bouteille d'eau (à demi pleine)",
    "utilityEn": "Potable drinking water. Restores hydration (+25 Thirst), rinses burns, or thrown as a sound decoy.",
    "utilityFr": "Eau potable. Rétablit l'hydratation (+25 Soif), rince les brûlures ou à lancer pour diversion."
  },
  "sealed pure water bottle": {
    "en": "Sealed Pure Water Bottle",
    "fr": "Bouteille d'eau pure scellée",
    "utilityEn": "Sterile purified spring water. Fully quenches thirst (+35 Thirst) and prevents dehydration.",
    "utilityFr": "Eau de source purifiée stérile. Étanche la soif (+35 Soif) et prévient la déshydratation."
  },
  "bouteille deau pure scellee": {
    "en": "Sealed Pure Water Bottle",
    "fr": "Bouteille d'eau pure scellée",
    "utilityEn": "Sterile purified spring water. Fully quenches thirst (+35 Thirst) and prevents dehydration.",
    "utilityFr": "Eau de source purifiée stérile. Étanche la soif (+35 Soif) et prévient la déshydratation."
  },
  "pack of chips": {
    "en": "Pack of Chips",
    "fr": "Paquet de chips",
    "utilityEn": "Caloric crunchy snack. Restores hunger and energy (+25 Hunger).",
    "utilityFr": "Collation salée et calorique. Apaise la faim et apporte de l'énergie (+25 Faim)."
  },
  "paquet de chips": {
    "en": "Pack of Chips",
    "fr": "Paquet de chips",
    "utilityEn": "Caloric crunchy snack. Restores hunger and energy (+25 Hunger).",
    "utilityFr": "Collation salée et calorique. Apaise la faim et apporte de l'énergie (+25 Faim)."
  },
  "can of anchovies": {
    "en": "Can of Anchovies",
    "fr": "Boîte d'anchois",
    "utilityEn": "Salted preserved fish. Provides protein (+20 Hunger). Strong smell can attract or distract animals.",
    "utilityFr": "Conserve de poissons salés. Apporte des protéines (+20 Faim). L'odeur peut attirer ou détourner des bêtes."
  },
  "boite danchois": {
    "en": "Can of Anchovies",
    "fr": "Boîte d'anchois",
    "utilityEn": "Salted preserved fish. Provides protein (+20 Hunger). Strong smell can attract or distract animals.",
    "utilityFr": "Conserve de poissons salés. Apporte des protéines (+20 Faim). L'odeur peut attirer ou détourner des bêtes."
  },
  "dry cheese wedge": {
    "en": "Dry Cheese Wedge",
    "fr": "Morceau de fromage sec",
    "utilityEn": "Hard aged cheese. Long shelf-life food (+15 Hunger).",
    "utilityFr": "Fromage affiné longue conservation. Nourrit efficacement (+15 Faim)."
  },
  "morceau de fromage sec": {
    "en": "Dry Cheese Wedge",
    "fr": "Morceau de fromage sec",
    "utilityEn": "Hard aged cheese. Long shelf-life food (+15 Hunger).",
    "utilityFr": "Fromage affiné longue conservation. Nourrit efficacement (+15 Faim)."
  },
  "unlabeled canned food": {
    "en": "Unlabeled Canned Food",
    "fr": "Boîte de conserve sans étiquette",
    "utilityEn": "Mystery preserved meal. Rich in nutrients (+25 Hunger) once pried open.",
    "utilityFr": "Boîte de conserve mystère. Riche en calories (+25 Faim) une fois ouverte."
  },
  "boite de conserve sans etiquette": {
    "en": "Unlabeled Canned Food",
    "fr": "Boîte de conserve sans étiquette",
    "utilityEn": "Mystery preserved meal. Rich in nutrients (+25 Hunger) once pried open.",
    "utilityFr": "Boîte de conserve mystère. Riche en calories (+25 Faim) une fois ouverte."
  },
  "mre combat ration": {
    "en": "MRE Combat Ration",
    "fr": "Ration de combat MRE",
    "utilityEn": "Military self-heating field meal. Complete nutritional pack (+35 Hunger, +10 Health).",
    "utilityFr": "Ration militaire auto-chauffante. Repas complet et énergétique (+35 Faim, +10 Santé)."
  },
  "ration de combat mre": {
    "en": "MRE Combat Ration",
    "fr": "Ration de combat MRE",
    "utilityEn": "Military self-heating field meal. Complete nutritional pack (+35 Hunger, +10 Health).",
    "utilityFr": "Ration militaire auto-chauffante. Repas complet et énergétique (+35 Faim, +10 Santé)."
  },
  "freeze dried combat ration": {
    "en": "Freeze-Dried Combat Ration",
    "fr": "Ration de combat lyophilisée",
    "utilityEn": "Lightweight military ration. Highly nourishing when hydrated (+30 Hunger).",
    "utilityFr": "Ration militaire lyophilisée ultralégère. Très nourrissante (+30 Faim)."
  },
  "ration de combat lyophilisee": {
    "en": "Freeze-Dried Combat Ration",
    "fr": "Ration de combat lyophilisée",
    "utilityEn": "Lightweight military ration. Highly nourishing when hydrated (+30 Hunger).",
    "utilityFr": "Ration militaire lyophilisée ultralégère. Très nourrissante (+30 Faim)."
  },
  "canned meat can": {
    "en": "Canned Meat Can",
    "fr": "Boîte de conserve de viande",
    "utilityEn": "Dense preserved meat. Heavy caloric restoration (+30 Hunger).",
    "utilityFr": "Conserve de viande dense. Restauration calorique importante (+30 Faim)."
  },
  "boite de conserve de viande": {
    "en": "Canned Meat Can",
    "fr": "Boîte de conserve de viande",
    "utilityEn": "Dense preserved meat. Heavy caloric restoration (+30 Hunger).",
    "utilityFr": "Conserve de viande dense. Restauration calorique importante (+30 Faim)."
  },
  "dented aluminum canteen": {
    "en": "Dented Aluminum Canteen",
    "fr": "Gourde en aluminium bosselée",
    "utilityEn": "Rugged military flask. Stores drinking water or boils water over campfire.",
    "utilityFr": "Gourde militaire en aluminium. Transporte ou fait bouillir de l'eau sur un feu."
  },
  "gourde en aluminium bosselee": {
    "en": "Dented Aluminum Canteen",
    "fr": "Gourde en aluminium bosselée",
    "utilityEn": "Rugged military flask. Stores drinking water or boils water over campfire.",
    "utilityFr": "Gourde militaire en aluminium. Transporte ou fait bouillir de l'eau sur un feu."
  },
  "insulated thermal canteen": {
    "en": "Insulated Thermal Canteen",
    "fr": "Gourde thermique isolante",
    "utilityEn": "Vacuum-insulated flask. Prevents liquids from freezing in harsh sub-zero weather.",
    "utilityFr": "Gourde isotherme sous vide. Empêche les liquides de geler par grand froid."
  },
  "gourde thermique isolante": {
    "en": "Insulated Thermal Canteen",
    "fr": "Gourde thermique isolante",
    "utilityEn": "Vacuum-insulated flask. Prevents liquids from freezing in harsh sub-zero weather.",
    "utilityFr": "Gourde isotherme sous vide. Empêche les liquides de geler par grand froid."
  },
  "water filtration canteen": {
    "en": "Water Filtration Canteen",
    "fr": "Gourde de filtrage d'eau",
    "utilityEn": "Canteen equipped with carbon/ceramic filters. Converts polluted bog water into safe drinking water.",
    "utilityFr": "Gourde à filtre céramique/charbon. Rend potable l'eau boueuse ou contaminée."
  },
  "gourde de filtrage deau": {
    "en": "Water Filtration Canteen",
    "fr": "Gourde de filtrage d'eau",
    "utilityEn": "Canteen equipped with carbon/ceramic filters. Converts polluted bog water into safe drinking water.",
    "utilityFr": "Gourde à filtre céramique/charbon. Rend potable l'eau boueuse ou contaminée."
  },
  "ultraviolet water filter": {
    "en": "Ultraviolet Water Filter",
    "fr": "Filtre à eau ultraviolet",
    "utilityEn": "Battery-powered UV purifier. Neutralizes waterborne parasites and bacteria instantly.",
    "utilityFr": "Purificateur UV portable à batterie. Éradique les parasites et bactéries de l'eau."
  },
  "filtre a eau ultraviolet": {
    "en": "Ultraviolet Water Filter",
    "fr": "Filtre à eau ultraviolet",
    "utilityEn": "Battery-powered UV purifier. Neutralizes waterborne parasites and bacteria instantly.",
    "utilityFr": "Purificateur UV portable à batterie. Éradique les parasites et bactéries de l'eau."
  },
  "bottle of strong absinthe": {
    "en": "Bottle of Strong Absinthe",
    "fr": "Bouteille d'absinthe forte",
    "utilityEn": "High-proof herbal alcohol. Numb extreme pain (+15 Sanity, -5 Health), sterilizes tools, or fuels fire.",
    "utilityFr": "Alcool fort à l'absinthe. Anesthésie la douleur (+15 Mental, -5 Santé), stérilise ou sert de carburant."
  },
  "bouteille dabsinthe forte": {
    "en": "Bouteille d'absinthe forte",
    "fr": "Bottle of Vintage Absinthe",
    "utilityEn": "Concentrated herbal alcohol. Painkiller, disinfectant, or fire starter.",
    "utilityFr": "Alcool fort concentré. Calme la douleur, désinfecte ou alimente un brasier."
  },
  "vintage wine bottle": {
    "en": "Vintage Wine Bottle",
    "fr": "Bouteille de vin millésimé",
    "utilityEn": "Old cellar red wine. Relaxes frayed nerves (+15 Sanity) or glass bottle repurposed as club/molotov.",
    "utilityFr": "Bouteille de vin rouge ancien. Détend les nerfs (+15 Mental) ou sert de projectile/massue."
  },
  "bouteille de vin millesime": {
    "en": "Vintage Wine Bottle",
    "fr": "Bouteille de vin millésimé",
    "utilityEn": "Old cellar red wine. Relaxes frayed nerves (+15 Sanity) or glass bottle repurposed as club/molotov.",
    "utilityFr": "Bouteille de vin rouge ancien. Détend les nerfs (+15 Mental) ou sert de projectile/massue."
  },
  "cheap lighter": {
    "en": "Cheap Lighter",
    "fr": "Briquet jetable",
    "utilityEn": "Gas lighter. Strikes reliable flame. Lights torches, burns webs, destroys debt papers.",
    "utilityFr": "Briquet à gaz. Produit une flamme. Allume torches, brûle les toiles d'araignées et papiers."
  },
  "briquet jetable": {
    "en": "Cheap Lighter",
    "fr": "Briquet jetable",
    "utilityEn": "Gas lighter. Strikes reliable flame. Lights torches, burns webs, destroys debt papers.",
    "utilityFr": "Briquet à gaz. Produit une flamme. Allume torches, brûle les toiles d'araignées et papiers."
  },
  "wet matchbook": {
    "en": "Wet Matchbook",
    "fr": "Pochette d'allumettes humides",
    "utilityEn": "Damp sulphur matches. Require drying before they can spark a flame.",
    "utilityFr": "Allumettes humides. Doivent être séchées avant de pouvoir produire une étincelle."
  },
  "pochette dallumettes humides": {
    "en": "Wet Matchbook",
    "fr": "Pochette d'allumettes humides",
    "utilityEn": "Damp sulphur matches. Require drying before they can spark a flame.",
    "utilityFr": "Allumettes humides. Doivent être séchées avant de pouvoir produire une étincelle."
  },
  "luxury matchbox": {
    "en": "Luxury Matchbox",
    "fr": "Boîte d'allumettes de luxe",
    "utilityEn": "Waterproof sulphur matches in cedar box. 20 guaranteed ignition strikes.",
    "utilityFr": "Allumettes au soufre étanches dans un coffret en cèdre. 20 allumages fiables."
  },
  "boite dallumettes de luxe": {
    "en": "Luxury Matchbox",
    "fr": "Boîte d'allumettes de luxe",
    "utilityEn": "Waterproof sulphur matches in cedar box. 20 guaranteed ignition strikes.",
    "utilityFr": "Allumettes au soufre étanches dans un coffret en cèdre. 20 allumages fiables."
  },
  "ferrocerium flint firesteel": {
    "en": "Ferrocerium Flint Firesteel",
    "fr": "Pierre à feu en ferrocerium",
    "utilityEn": "Survival firesteel rod. Produces 3,000°C spark showers even in pouring rain.",
    "utilityFr": "Barre de ferrocerium de survie. Projette des gerbes d'étincelles même sous la pluie battante."
  },
  "pierre a feu en ferrocerium": {
    "en": "Ferrocerium Flint Firesteel",
    "fr": "Pierre à feu en ferrocerium",
    "utilityEn": "Survival firesteel rod. Produces 3,000°C spark showers even in pouring rain.",
    "utilityFr": "Barre de ferrocerium de survie. Projette des gerbes d'étincelles même sous la pluie battante."
  },
  "beeswax candle": {
    "en": "Beeswax Candle",
    "fr": "Bougie en cire d'abeille",
    "utilityEn": "Long-burning scented candle. Casts 4 hours of warm illumination against oppressive dark.",
    "utilityFr": "Bougie en cire d'abeille. Procure 4 heures de lueur rassurante contre les ténèbres."
  },
  "bougie en cire dabeille": {
    "en": "Beeswax Candle",
    "fr": "Bougie en cire d'abeille",
    "utilityEn": "Long-burning scented candle. Casts 4 hours of warm illumination against oppressive dark.",
    "utilityFr": "Bougie en cire d'abeille. Procure 4 heures de lueur rassurante contre les ténèbres."
  },
  "half burned black taper candle": {
    "en": "Half-Burned Black Taper Candle",
    "fr": "Cierge noir à moitié consumé",
    "utilityEn": "Occult ritual candle. Illuminates ancient inscriptions or triggers sacrificial altars.",
    "utilityFr": "Cierge rituel noir. Illumine les gravures occultes et active les autels sacrificiels."
  },
  "cierge noir a moitie consume": {
    "en": "Half-Burned Black Taper Candle",
    "fr": "Cierge noir à moitié consumé",
    "utilityEn": "Occult ritual candle. Illuminates ancient inscriptions or triggers sacrificial altars.",
    "utilityFr": "Cierge rituel noir. Illumine les gravures occultes et active les autels sacrificiels."
  },
  "tactical flashlight": {
    "en": "Tactical Flashlight",
    "fr": "Lampe torche tactique",
    "utilityEn": "Heavy LED flashlight. Pierces pitch-black corridors, stuns nocturnal monsters, bludgeons foes.",
    "utilityFr": "Torche tactique étanche. Percer l'obscurité totale, aveugle les prédateurs et frappe au corps à corps."
  },
  "lampe torche tactique": {
    "en": "Tactical Flashlight",
    "fr": "Lampe torche tactique",
    "utilityEn": "Heavy LED flashlight. Pierces pitch-black corridors, stuns nocturnal monsters, bludgeons foes.",
    "utilityFr": "Torche tactique étanche. Percer l'obscurité totale, aveugle les prédateurs et frappe au corps à corps."
  },
  "brass lantern": {
    "en": "Brass Lantern",
    "fr": "Lanterne en laiton",
    "utilityEn": "Kerosene hurricane lamp. Steady broad illumination resistant to howling gale winds.",
    "utilityFr": "Lampe tempête en laiton. Éclairage large et constant résistant aux bourrasques."
  },
  "lanterne en laiton": {
    "en": "Brass Lantern",
    "fr": "Lanterne en laiton",
    "utilityEn": "Kerosene hurricane lamp. Steady broad illumination resistant to howling gale winds.",
    "utilityFr": "Lampe tempête en laiton. Éclairage large et constant résistant aux bourrasques."
  },
  "iron dark lantern": {
    "en": "Iron Dark Lantern",
    "fr": "Lanterne sourde en fer",
    "utilityEn": "Shuttered lantern. Allows directional spotlighting or complete blackout for stealth.",
    "utilityFr": "Lanterne à volet en fer. Permet de diriger le faisceau ou de masquer la lumière en furtivité."
  },
  "lanterne sourde en fer": {
    "en": "Iron Dark Lantern",
    "fr": "Lanterne sourde en fer",
    "utilityEn": "Shuttered lantern. Allows directional spotlighting or complete blackout for stealth.",
    "utilityFr": "Lanterne à volet en fer. Permet de diriger le faisceau ou de masquer la lumière en furtivité."
  },
  "blue chemlight glowstick": {
    "en": "Blue ChemLight Glowstick",
    "fr": "Lumière chimique (Glowstick) bleue",
    "utilityEn": "Cold chemiluminescent glowstick. Non-sparking underwater and explosive-safe illumination.",
    "utilityFr": "Bâton lumineux chimique froid. Éclairage submersible et sans étincelle en milieu gazeux."
  },
  "lumiere chimique (glowstick) bleue": {
    "en": "Blue ChemLight Glowstick",
    "fr": "Lumière chimique (Glowstick) bleue",
    "utilityEn": "Cold chemiluminescent glowstick. Non-sparking underwater and explosive-safe illumination.",
    "utilityFr": "Bâton lumineux chimique froid. Éclairage submersible et sans étincelle en milieu gazeux."
  },
  "basic gas mask": {
    "en": "Basic Gas Mask",
    "fr": "Masque à gaz basique",
    "utilityEn": "Rubber face mask with particulate canister. Grants total immunity to toxic gas, spores, and methane.",
    "utilityFr": "Masque étanche en caoutchouc avec cartouche. Immunise totalement contre les gaz toxiques, spores et méthane."
  },
  "masque a gaz basique": {
    "en": "Basic Gas Mask",
    "fr": "Masque à gaz basique",
    "utilityEn": "Rubber face mask with particulate canister. Grants total immunity to toxic gas, spores, and methane.",
    "utilityFr": "Masque étanche en caoutchouc avec cartouche. Immunise totalement contre les gaz toxiques, spores et méthane."
  },
  "sandstorm filter mask": {
    "en": "Sandstorm Filter Mask",
    "fr": "Masque filtrant pour tempête de sable",
    "utilityEn": "Heavy fabric respirator. Protects lungs against caustic abrasive mineral dust storms.",
    "utilityFr": "Masque filtrant robuste. Protège les poumons contre les tempêtes de poussière abrasive."
  },
  "masque filtrant pour tempete de sable": {
    "en": "Sandstorm Filter Mask",
    "fr": "Masque filtrant pour tempête de sable",
    "utilityEn": "Heavy fabric respirator. Protects lungs against caustic abrasive mineral dust storms.",
    "utilityFr": "Masque filtrant robuste. Protège les poumons contre les tempêtes de poussière abrasive."
  },
  "used gas filter": {
    "en": "Used Gas Filter",
    "fr": "Filtre à gaz usagé",
    "utilityEn": "Expended canister. Can be temporarily refilled with crushed charcoal in a pinch.",
    "utilityFr": "Cartouche filtrante usagée. Peut être rechargée de fortune avec du charbon actif pilé."
  },
  "filtre a gaz usage": {
    "en": "Used Gas Filter",
    "fr": "Filtre à gaz usagé",
    "utilityEn": "Expended canister. Can be temporarily refilled with crushed charcoal in a pinch.",
    "utilityFr": "Cartouche filtrante usagée. Peut être rechargée de fortune avec du charbon actif pilé."
  },
  "spare dust filter": {
    "en": "Spare Dust Filter",
    "fr": "Filtre à poussière de rechange",
    "utilityEn": "Fresh N95 filter cartridge. Restores gas mask filtration efficiency to 100%.",
    "utilityFr": "Cartouche filtrante neuve. Rétablit l'efficacité de filtration du masque à 100%."
  },
  "filtre a poussiere de rechange": {
    "en": "Spare Dust Filter",
    "fr": "Filtre à poussière de rechange",
    "utilityEn": "Fresh N95 filter cartridge. Restores gas mask filtration efficiency to 100%.",
    "utilityFr": "Cartouche filtrante neuve. Rétablit l'efficacité de filtration du masque à 100%."
  },
  "clogged air filter": {
    "en": "Clogged Air Filter",
    "fr": "Filtre à air encrassé",
    "utilityEn": "Dusty mesh. Needs cleaning before use.",
    "utilityFr": "Grille encrassée. Doit être secouée et nettoyée avant réutilisation."
  },
  "filtre a air encrasse": {
    "en": "Clogged Air Filter",
    "fr": "Filtre à air encrassé",
    "utilityEn": "Dusty mesh. Needs cleaning before use.",
    "utilityFr": "Grille encrassée. Doit être secouée et nettoyée avant réutilisation."
  },
  "red flare": {
    "en": "Red Flare",
    "fr": "Fusée éclairante rouge",
    "utilityEn": "High-temperature magnesium flare. Illuminates cavern, scares beasts, marks rescue positions.",
    "utilityFr": "Fusée au magnésium rouge. Illumine une vaste zone, effraie les bêtes et signale la détresse."
  },
  "fusee eclairante rouge": {
    "en": "Red Flare",
    "fr": "Fusée éclairante rouge",
    "utilityEn": "High-temperature magnesium flare. Illuminates cavern, scares beasts, marks rescue positions.",
    "utilityFr": "Fusée au magnésium rouge. Illumine une vaste zone, effraie les bêtes et signale la détresse."
  },
  "high power distress flare": {
    "en": "High-Power Distress Flare",
    "fr": "Fusée de détresse de haute puissance",
    "utilityEn": "Rocket-propelled pyrotechnic beacon. Launches 300m into sky to alert searchcraft.",
    "utilityFr": "Fusée pyrotechnique propulsée. S'élève à 300m pour alerter les aéronefs de sauvetage."
  },
  "fusee de detresse de haute puissance": {
    "en": "High-Power Distress Flare",
    "fr": "Fusée de détresse de haute puissance",
    "utilityEn": "Rocket-propelled pyrotechnic beacon. Launches 300m into sky to alert searchcraft.",
    "utilityFr": "Fusée pyrotechnique propulsée. S'élève à 300m pour alerter les aéronefs de sauvetage."
  },
  "phone (50% battery)": {
    "en": "Phone (50% Battery)",
    "fr": "Téléphone (50% batterie)",
    "utilityEn": "Modern smartphone. Integrated flashlight beam, digital clock, notes, audio recorder.",
    "utilityFr": "Smartphone. Lampe torche LED intégrée, horloge numérique, carnet de notes et enregistreur."
  },
  "telephone (50% batterie)": {
    "en": "Phone (50% Battery)",
    "fr": "Téléphone (50% batterie)",
    "utilityEn": "Modern smartphone. Integrated flashlight beam, digital clock, notes, audio recorder.",
    "utilityFr": "Smartphone. Lampe torche LED intégrée, horloge numérique, carnet de notes et enregistreur."
  },
  "used aa battery": {
    "en": "Used AA Battery",
    "fr": "Pile AA usagée",
    "utilityEn": "Low-voltage alkaline battery. Powers small gadgets briefly or short-circuits to spark fire.",
    "utilityFr": "Pile alcaline usagée. Alimente un petit appareil ou court-circuite pour faire du feu."
  },
  "pile aa usagee": {
    "en": "Used AA Battery",
    "fr": "Pile AA usagée",
    "utilityEn": "Low-voltage alkaline battery. Powers small gadgets briefly or short-circuits to spark fire.",
    "utilityFr": "Pile alcaline usagée. Alimente un petit appareil ou court-circuite pour faire du feu."
  },
  "fresh aa batteries": {
    "en": "Fresh AA Batteries",
    "fr": "Piles AA neuves",
    "utilityEn": "Pair of 1.5V batteries. Powers tactical flashlights, radios, and biometric scanners.",
    "utilityFr": "Paire de piles neuves 1.5V. Alimente torches tactiques, radios et scanners."
  },
  "piles aa neuves": {
    "en": "Fresh AA Batteries",
    "fr": "Piles AA neuves",
    "utilityEn": "Pair of 1.5V batteries. Powers tactical flashlights, radios, and biometric scanners.",
    "utilityFr": "Paire de piles neuves 1.5V. Alimente torches tactiques, radios et scanners."
  },
  "9v battery pack": {
    "en": "9V Battery Pack",
    "fr": "Paquet de piles 9V",
    "utilityEn": "High-voltage cell. Activates relays, jump-starts terminal logic, or sparks steel wool.",
    "utilityFr": "Pile 9V haute tension. Active des relais, alimente des circuits ou enflamme de la paille de fer."
  },
  "paquet de piles 9v": {
    "en": "9V Battery Pack",
    "fr": "Paquet de piles 9V",
    "utilityEn": "High-voltage cell. Activates relays, jump-starts terminal logic, or sparks steel wool.",
    "utilityFr": "Pile 9V haute tension. Active des relais, alimente des circuits ou enflamme de la paille de fer."
  },
  "high capacity lithium battery": {
    "en": "High-Capacity Lithium Battery",
    "fr": "Batterie au lithium haute capacité",
    "utilityEn": "Industrial battery pack. Powers high-drain radio transmitters and laser drilling units.",
    "utilityFr": "Batterie industrielle au lithium. Alimente les émetteurs radio longue portée et lasers."
  },
  "batterie au lithium haute capacite": {
    "en": "High-Capacity Lithium Battery",
    "fr": "Batterie au lithium haute capacité",
    "utilityEn": "Industrial battery pack. Powers high-drain radio transmitters and laser drilling units.",
    "utilityFr": "Batterie industrielle au lithium. Alimente les émetteurs radio longue portée et lasers."
  },
  "plasma power cell": {
    "en": "Plasma Power Cell",
    "fr": "Cellule de puissance au plasma",
    "utilityEn": "Advanced energy core. Powers heavy airlocks, mainframe computers, or extraction portals.",
    "utilityFr": "Noyau énergétique au plasma. Alimente les sas blindés, serveurs ou portails d'extraction."
  },
  "cellule de puissance au plasma": {
    "en": "Plasma Power Cell",
    "fr": "Cellule de puissance au plasma",
    "utilityEn": "Advanced energy core. Powers heavy airlocks, mainframe computers, or extraction portals.",
    "utilityFr": "Noyau énergétique au plasma. Alimente les sas blindés, serveurs ou portails d'extraction."
  },
  "battery cell": {
    "en": "Battery Cell",
    "fr": "Cellule de batterie",
    "utilityEn": "Standard modular power unit.",
    "utilityFr": "Unité modulaire d'alimentation standard."
  },
  "cellule de batterie": {
    "en": "Battery Cell",
    "fr": "Cellule de batterie",
    "utilityEn": "Standard modular power unit.",
    "utilityFr": "Unité modulaire d'alimentation standard."
  },
  "portable radio transmitter": {
    "en": "Portable Radio Transmitter",
    "fr": "Émetteur radio portable",
    "utilityEn": "Military VHF transceiver. Broadcasts SOS distress signal across the entire frontier grid.",
    "utilityFr": "Émetteur-récepteur VHF militaire. Diffuse un signal SOS sur toutes les fréquences de secours."
  },
  "emetteur radio portable": {
    "en": "Portable Radio Transmitter",
    "fr": "Émetteur radio portable",
    "utilityEn": "Military VHF transceiver. Broadcasts SOS distress signal across the entire frontier grid.",
    "utilityFr": "Émetteur-récepteur VHF militaire. Diffuse un signal SOS sur toutes les fréquences de secours."
  },
  "broken handheld radio": {
    "en": "Broken Handheld Radio",
    "fr": "Radio portable cassée",
    "utilityEn": "Cracked walkie-talkie. Needs an antenna or battery swap to transmit voice signals.",
    "utilityFr": "Talkie-walkie fissuré. Nécessite une antenne et une pile neuve pour réémettre."
  },
  "radio portable cassee": {
    "en": "Broken Handheld Radio",
    "fr": "Radio portable cassée",
    "utilityEn": "Cracked walkie-talkie. Needs an antenna or battery swap to transmit voice signals.",
    "utilityFr": "Talkie-walkie fissuré. Nécessite une antenne et une pile neuve pour réémettre."
  },
  "telescopic antenna": {
    "en": "Telescopic Antenna",
    "fr": "Antenne télescopique",
    "utilityEn": "Extendable brass aerial. Triples radio range and catches emergency broadcast frequencies.",
    "utilityFr": "Antenne déployable en laiton. Triple la portée radio et capte les messages de détresse."
  },
  "antenne telescopique": {
    "en": "Telescopic Antenna",
    "fr": "Antenne télescopique",
    "utilityEn": "Extendable brass aerial. Triples radio range and catches emergency broadcast frequencies.",
    "utilityFr": "Antenne déployable en laiton. Triple la portée radio et capte les messages de détresse."
  },
  "long range distress beacon": {
    "en": "Long-Range Distress Beacon",
    "fr": "Balise de détresse longue portée",
    "utilityEn": "Orbital distress transponder. Emits high-gain rescue pulses across planetary orbit.",
    "utilityFr": "Balise de détresse orbitale. Émet des impulsions de sauvetage vers les croiseurs orbitaux."
  },
  "balise de detresse longue portee": {
    "en": "Long-Range Distress Beacon",
    "fr": "Balise de détresse longue portée",
    "utilityEn": "Orbital distress transponder. Emits high-gain rescue pulses across planetary orbit.",
    "utilityFr": "Balise de détresse orbitale. Émet des impulsions de sauvetage vers les croiseurs orbitaux."
  },
  "inactive tracking beacon": {
    "en": "Inactive Tracking Beacon",
    "fr": "Balise de repérage inactive",
    "utilityEn": "GPS beacon needing battery replacement.",
    "utilityFr": "Balise de géolocalisation inactive nécessitant une pile neuve."
  },
  "balise de reperage inactive": {
    "en": "Inactive Tracking Beacon",
    "fr": "Balise de repérage inactive",
    "utilityEn": "GPS beacon needing battery replacement.",
    "utilityFr": "Balise de géolocalisation inactive nécessitant une pile neuve."
  },
  "sub space transmitter": {
    "en": "Sub-Space Transmitter",
    "fr": "Transmetteur sub-spatial",
    "utilityEn": "Quantum antenna for instant deep space distress calls.",
    "utilityFr": "Émetteur quantique pour liaisons de détresse en espace profond."
  },
  "transmetteur sub spatial": {
    "en": "Sub-Space Transmitter",
    "fr": "Transmetteur sub-spatial",
    "utilityEn": "Quantum antenna for instant deep space distress calls.",
    "utilityFr": "Émetteur quantique pour liaisons de détresse en espace profond."
  },
  "parabolic signal reflector": {
    "en": "Parabolic Signal Reflector",
    "fr": "Réflecteur de signal parabolique",
    "utilityEn": "Curved dish reflector. Aligns satellite beams to punch through ionosphere storms.",
    "utilityFr": "Parabole réflectrice. Oriente les faisceaux de signaux à travers les tempêtes ioniques."
  },
  "reflecteur de signal parabolique": {
    "en": "Parabolic Signal Reflector",
    "fr": "Réflecteur de signal parabolique",
    "utilityEn": "Curved dish reflector. Aligns satellite beams to punch through ionosphere storms.",
    "utilityFr": "Parabole réflectrice. Oriente les faisceaux de signaux à travers les tempêtes ioniques."
  },
  "frequency stabilizer": {
    "en": "Frequency Stabilizer",
    "fr": "Stabilisateur de fréquence",
    "utilityEn": "Crystal frequency tuner. Eliminates radio interference and crackling static.",
    "utilityFr": "Module à quartz. Élimine les interférences radio et stabilise les fréquences de secours."
  },
  "stabilisateur de frequence": {
    "en": "Frequency Stabilizer",
    "fr": "Stabilisateur de fréquence",
    "utilityEn": "Crystal frequency tuner. Eliminates radio interference and crackling static.",
    "utilityFr": "Module à quartz. Élimine les interférences radio et stabilise les fréquences de secours."
  },
  "debug probe": {
    "en": "Debug Probe",
    "fr": "Sonde de débogage",
    "utilityEn": "Cyber logic tool. Intercepts Purge v1.0 scans, redirects hostile bot routines, fixes glitches.",
    "utilityFr": "Outil cybernétique. Intercepte les scans de Purge v1.0, leurre les bots et corrige les bugs."
  },
  "sonde de debogage": {
    "en": "Debug Probe",
    "fr": "Sonde de débogage",
    "utilityEn": "Cyber logic tool. Intercepts Purge v1.0 scans, redirects hostile bot routines, fixes glitches.",
    "utilityFr": "Outil cybernétique. Intercepte les scans de Purge v1.0, leurre les bots et corrige les bugs."
  },
  "basic firewall shield": {
    "en": "Basic Firewall Shield",
    "fr": "Bouclier pare-feu basique",
    "utilityEn": "Defensive cipher protocol. Absorbs corrupt neural attacks and protects sanity/integrity.",
    "utilityFr": "Protocole défensif. Bloque les attaques corrompues et protège l'intégrité neurale."
  },
  "bouclier pare feu basique": {
    "en": "Basic Firewall Shield",
    "fr": "Bouclier pare-feu basique",
    "utilityEn": "Defensive cipher protocol. Absorbs corrupt neural attacks and protects sanity/integrity.",
    "utilityFr": "Protocole défensif. Bloque les attaques corrompues et protège l'intégrité neurale."
  },
  "disconnection protocol (.exe)": {
    "en": "Disconnection Protocol (.EXE)",
    "fr": "Protocole de déconnexion (.EXE)",
    "utilityEn": "Emergency extraction routine. Ejects user avatar safely back to physical reality upon memory completion.",
    "utilityFr": "Programme d'extraction d'urgence. Éjecte l'esprit du joueur vers son corps réel une fois les souvenirs assemblés."
  },
  "protocole de deconnexion (.exe)": {
    "en": "Disconnection Protocol (.EXE)",
    "fr": "Protocole de déconnexion (.EXE)",
    "utilityEn": "Emergency extraction routine. Ejects user avatar safely back to physical reality upon memory completion.",
    "utilityFr": "Programme d'extraction d'urgence. Éjecte l'esprit du joueur vers son corps réel une fois les souvenirs assemblés."
  },
  "clocked cpu chip": {
    "en": "Clocked CPU Chip",
    "fr": "Puce de processeur cadencée",
    "utilityEn": "Hardware silicon chip. Accelerates decrypt algorithms and computational tasks.",
    "utilityFr": "Puce en silicium cadencée. Accélère le décryptage et les calculs du terminal."
  },
  "puce de processeur cadencee": {
    "en": "Clocked CPU Chip",
    "fr": "Puce de processeur cadencée",
    "utilityEn": "Hardware silicon chip. Accelerates decrypt algorithms and computational tasks.",
    "utilityFr": "Puce en silicium cadencée. Accélère le décryptage et les calculs du terminal."
  },
  "processor kernel": {
    "en": "Processor Kernel",
    "fr": "Noyau de processeur (Kernel)",
    "utilityEn": "Core system kernel. Unlocks administrator privileges in the neural mainframe.",
    "utilityFr": "Noyau système. Déverrouille les privilèges d'administration dans le serveur neural."
  },
  "noyau de processeur (kernel)": {
    "en": "Processor Kernel",
    "fr": "Noyau de processeur (Kernel)",
    "utilityEn": "Core system kernel. Unlocks administrator privileges in the neural mainframe.",
    "utilityFr": "Noyau système. Déverrouille les privilèges d'administration dans le serveur neural."
  },
  "cpu overclock module": {
    "en": "CPU Overclock Module",
    "fr": "Module de surcharge CPU",
    "utilityEn": "Cooling bypass circuit. Forces mainframe calculation speed at the risk of thermal damage.",
    "utilityFr": "Circuit de surcadençage. Force la vitesse de calcul au risque d'une surchauffe."
  },
  "module de surcharge cpu": {
    "en": "CPU Overclock Module",
    "fr": "Module de surcharge CPU",
    "utilityEn": "Cooling bypass circuit. Forces mainframe calculation speed at the risk of thermal damage.",
    "utilityFr": "Circuit de surcadençage. Force la vitesse de calcul au risque d'une surchauffe."
  },
  "virtual system cooler": {
    "en": "Virtual System Cooler",
    "fr": "Refroidisseur système virtuel",
    "utilityEn": "Thermal suppression routine. Cools overheating neural processors.",
    "utilityFr": "Programme de régulation thermique. Refroidit les processeurs neuraux en surchauffe."
  },
  "refroidisseur systeme virtuel": {
    "en": "Virtual System Cooler",
    "fr": "Refroidisseur système virtuel",
    "utilityEn": "Thermal suppression routine. Cools overheating neural processors.",
    "utilityFr": "Programme de régulation thermique. Refroidit les processeurs neuraux en surchauffe."
  },
  "experimental antivirus": {
    "en": "Experimental Antivirus",
    "fr": "Antivirus expérimental",
    "utilityEn": "Heuristic antivirus weapon. Eradicates trojan horse worms and mimetic bugs in Sector 6.",
    "utilityFr": "Antivirus heuristique. Éradique les chevaux de Troie et le bug mimétique du Secteur 6."
  },
  "antivirus experimental": {
    "en": "Experimental Antivirus",
    "fr": "Antivirus expérimental",
    "utilityEn": "Heuristic antivirus weapon. Eradicates trojan horse worms and mimetic bugs in Sector 6.",
    "utilityFr": "Antivirus heuristique. Éradique les chevaux de Troie et le bug mimétique du Secteur 6."
  },
  "digital skeleton key (exploit)": {
    "en": "Digital Skeleton Key (Exploit)",
    "fr": "Passe-partout numérique (Exploit)",
    "utilityEn": "Zero-day security exploit. Bypasses encrypted digital locks, gates, and firewalls.",
    "utilityFr": "Faille de sécurité zero-day. Contourne les verrous cryptés, pare-feux et sas numériques."
  },
  "passe partout numerique (exploit)": {
    "en": "Digital Skeleton Key (Exploit)",
    "fr": "Passe-partout numérique (Exploit)",
    "utilityEn": "Zero-day security exploit. Bypasses encrypted digital locks, gates, and firewalls.",
    "utilityFr": "Faille de sécurité zero-day. Contourne les verrous cryptés, pare-feux et sas numériques."
  },
  "network packet injector": {
    "en": "Network Packet Injector",
    "fr": "Injecteur de paquet réseau",
    "utilityEn": "Raw socket injector. Sends spoofed authorization commands into the system.",
    "utilityFr": "Outil d'injection de paquets. Transmet des commandes usurpées au système."
  },
  "injecteur de paquet reseau": {
    "en": "Network Packet Injector",
    "fr": "Injecteur de paquet réseau",
    "utilityEn": "Raw socket injector. Sends spoofed authorization commands into the system.",
    "utilityFr": "Outil d'injection de paquets. Transmet des commandes usurpées au système."
  },
  "data stream sniffer": {
    "en": "Data Stream Sniffer",
    "fr": "Sniffer de flux de données",
    "utilityEn": "Packet interceptor. Decodes hidden network traffic and reveals system passwords.",
    "utilityFr": "Intercepteur réseau. Décode le trafic masqué et révèle les mots de passe système."
  },
  "sniffer de flux de donnees": {
    "en": "Data Stream Sniffer",
    "fr": "Sniffer de flux de données",
    "utilityEn": "Packet interceptor. Decodes hidden network traffic and reveals system passwords.",
    "utilityFr": "Intercepteur réseau. Décode le trafic masqué et révèle les mots de passe système."
  },
  "recovery script (.bat)": {
    "en": "Recovery Script (.BAT)",
    "fr": "Script de récupération (.BAT)",
    "utilityEn": "Diagnostic shell script. Recovers fragmented or deleted memory files.",
    "utilityFr": "Script de diagnostic. Récupère les fichiers de mémoire corrompus ou supprimés."
  },
  "script de recuperation (.bat)": {
    "en": "Recovery Script (.BAT)",
    "fr": "Script de récupération (.BAT)",
    "utilityEn": "Diagnostic shell script. Recovers fragmented or deleted memory files.",
    "utilityFr": "Script de diagnostic. Récupère les fichiers de mémoire corrompus ou supprimés."
  },
  "bug patch script": {
    "en": "Bug Patch Script",
    "fr": "Script de correction de bug",
    "utilityEn": "Software patch. Fixes memory leaks and seals glitching reality tears.",
    "utilityFr": "Correctif logiciel. Répare les fuites de mémoire et colmate les déchirures logiques."
  },
  "script de correction de bug": {
    "en": "Bug Patch Script",
    "fr": "Script de correction de bug",
    "utilityEn": "Software patch. Fixes memory leaks and seals glitching reality tears.",
    "utilityFr": "Correctif logiciel. Répare les fuites de mémoire et colmate les déchirures logiques."
  },
  "system repair patch": {
    "en": "System Repair Patch",
    "fr": "Patch de réparation système",
    "utilityEn": "Self-executing patch. Restores 30% neural avatar integrity and cleans runtime errors.",
    "utilityFr": "Patch auto-exécutable. Restaure 30% de l'intégrité de l'avatar et purge les erreurs."
  },
  "patch de reparation systeme": {
    "en": "System Repair Patch",
    "fr": "Patch de réparation système",
    "utilityEn": "Self-executing patch. Restores 30% neural avatar integrity and cleans runtime errors.",
    "utilityFr": "Patch auto-exécutable. Restaure 30% de l'intégrité de l'avatar et purge les erreurs."
  },
  "corrupted zip archive": {
    "en": "Corrupted ZIP Archive",
    "fr": "Archive ZIP corrompue",
    "utilityEn": "Encrypted data archive. Contains compressed diary files and forgotten memories.",
    "utilityFr": "Archive chiffrée contenant les journaux intimes et souvenirs oubliés du scientifique."
  },
  "archive zip corrompue": {
    "en": "Corrupted ZIP Archive",
    "fr": "Archive ZIP corrompue",
    "utilityEn": "Encrypted data archive. Contains compressed diary files and forgotten memories.",
    "utilityFr": "Archive chiffrée contenant les journaux intimes et souvenirs oubliés du scientifique."
  },
  "encrypted text file (.dat)": {
    "en": "Encrypted Text File (.DAT)",
    "fr": "Fichier texte chiffré (.DAT)",
    "utilityEn": "Encrypted data file. Contains fragments of the scientist's past life.",
    "utilityFr": "Fichier chiffré contenant des fragments de la vie passée du chercheur."
  },
  "fichier texte chiffre (.dat)": {
    "en": "Encrypted Text File (.DAT)",
    "fr": "Fichier texte chiffré (.DAT)",
    "utilityEn": "Encrypted data file. Contains fragments of the scientist's past life.",
    "utilityFr": "Fichier chiffré contenant des fragments de la vie passée du chercheur."
  },
  "extracted audio file (.wav)": {
    "en": "Extracted Audio File (.WAV)",
    "fr": "Document audio extrait (.WAV)",
    "utilityEn": "Audio log recording the voice of the scientist's family before the experiment.",
    "utilityFr": "Enregistrement audio contenant la voix des proches du chercheur avant l'incident."
  },
  "document audio extrait (.wav)": {
    "en": "Extracted Audio File (.WAV)",
    "fr": "Document audio extrait (.WAV)",
    "utilityEn": "Audio log recording the voice of the scientist's family before the experiment.",
    "utilityFr": "Enregistrement audio contenant la voix des proches du chercheur avant l'incident."
  },
  "digitized diary": {
    "en": "Digitized Diary",
    "fr": "Journal intime numérisé",
    "utilityEn": "Personal logs of the scientist. Vital memory piece needed to unlock emergency extraction.",
    "utilityFr": "Journal personnel numérisé. Élément mémoriel capital pour déverrouiller l'extraction d'urgence."
  },
  "journal intime numerise": {
    "en": "Digitized Diary",
    "fr": "Journal intime numérisé",
    "utilityEn": "Personal logs of the scientist. Vital memory piece needed to unlock emergency extraction.",
    "utilityFr": "Journal personnel numérisé. Élément mémoriel capital pour déverrouiller l'extraction d'urgence."
  },
  "compressed childhood memory": {
    "en": "Compressed Childhood Memory",
    "fr": "Souvenir d'enfance compressé",
    "utilityEn": "Visual holo-memory shard. Vital for assembling the scientist's buried memories.",
    "utilityFr": "Fragment holo-visuel d'enfance. Indispensable pour reconstituer les souvenirs enfouis."
  },
  "souvenir denfance compresse": {
    "en": "Compressed Childhood Memory",
    "fr": "Souvenir d'enfance compressé",
    "utilityEn": "Visual holo-memory shard. Vital for assembling the scientist's buried memories.",
    "utilityFr": "Fragment holo-visuel d'enfance. Indispensable pour reconstituer les souvenirs enfouis."
  },
  "consciousness shard": {
    "en": "Consciousness Shard",
    "fr": "Fragment de conscience",
    "utilityEn": "Glimmering cognitive fragment. Reconstructs personality and unlocks Sector 12 extraction.",
    "utilityFr": "Fragment cognitif lumineux. Restaure la lucidité et débloque l'extraction finale."
  },
  "fragment de conscience": {
    "en": "Consciousness Shard",
    "fr": "Fragment de conscience",
    "utilityEn": "Glimmering cognitive fragment. Reconstructs personality and unlocks Sector 12 extraction.",
    "utilityFr": "Fragment cognitif lumineux. Restaure la lucidité et débloque l'extraction finale."
  },
  "memory shard": {
    "en": "Memory Shard",
    "fr": "Fragment de mémoire",
    "utilityEn": "A fragment of forgotten identity. Piece them together to unlock extraction back to reality.",
    "utilityFr": "Un fragment d'identité oubliée. Assemblez-les pour débloquer l'extraction finale vers le monde réel."
  },
  "fragment de memoire": {
    "en": "Memory Shard",
    "fr": "Fragment de mémoire",
    "utilityEn": "A fragment of forgotten identity. Piece them together to unlock extraction back to reality.",
    "utilityFr": "Un fragment d'identité oubliée. Assemblez-les pour débloquer l'extraction finale vers le monde réel."
  },
  "encrypted usb drive": {
    "en": "Encrypted USB Drive",
    "fr": "Clé USB chiffrée",
    "utilityEn": "Encrypted flash memory. Contains offshore account coordinates and blackmail records.",
    "utilityFr": "Clé USB cryptée. Contient les comptes offshore et dossiers de chantage de la pègre."
  },
  "cle usb chiffree": {
    "en": "Encrypted USB Drive",
    "fr": "Clé USB chiffrée",
    "utilityEn": "Encrypted flash memory. Contains offshore account coordinates and blackmail records.",
    "utilityFr": "Clé USB cryptée. Contient les comptes offshore et dossiers de chantage de la pègre."
  },
  "ssl security certificate": {
    "en": "SSL Security Certificate",
    "fr": "Certificat de sécurité SSL",
    "utilityEn": "Cryptographic root certificate. Authenticates master override commands.",
    "utilityFr": "Certificat racine cryptographique. Authentifie les ordres maîtres du système."
  },
  "certificat de securite ssl": {
    "en": "SSL Security Certificate",
    "fr": "Certificat de sécurité SSL",
    "utilityEn": "Cryptographic root certificate. Authenticates master override commands.",
    "utilityFr": "Certificat racine cryptographique. Authentifie les ordres maîtres du système."
  },
  "rsa cryptographic key": {
    "en": "RSA Cryptographic Key",
    "fr": "Clé cryptographique RSA",
    "utilityEn": "4096-bit private key. Decrypts the core data vault in Sector 6.",
    "utilityFr": "Clé privée 4096-bit. Déchiffre l'accès au coffre de données du Secteur 6."
  },
  "cle cryptographique rsa": {
    "en": "RSA Cryptographic Key",
    "fr": "Clé cryptographique RSA",
    "utilityEn": "4096-bit private key. Decrypts the core data vault in Sector 6.",
    "utilityFr": "Clé privée 4096-bit. Déchiffre l'accès au coffre de données du Secteur 6."
  },
  "rusty brass key": {
    "en": "Rusty Brass Key",
    "fr": "Clé rouillée en laiton",
    "utilityEn": "Old brass key. Unlocks cell doors and iron padlocks in the dungeon.",
    "utilityFr": "Vieille clé en laiton. Ouvre les cellules et cadenas en fer du donjon."
  },
  "cle rouillee en laiton": {
    "en": "Rusty Brass Key",
    "fr": "Clé rouillée en laiton",
    "utilityEn": "Old brass key. Unlocks cell doors and iron padlocks in the dungeon.",
    "utilityFr": "Vieille clé en laiton. Ouvre les cellules et cadenas en fer du donjon."
  },
  "forged iron key": {
    "en": "Forged Iron Key",
    "fr": "Clé en fer forgé",
    "utilityEn": "Heavy forged iron key. Unlocks heavy oak doors in S4 and S13.",
    "utilityFr": "Clé lourde en fer forgé. Déverrouille les portes en chêne dans S4 et S13."
  },
  "cle en fer forge": {
    "en": "Forged Iron Key",
    "fr": "Clé en fer forgé",
    "utilityEn": "Heavy forged iron key. Unlocks heavy oak doors in S4 and S13.",
    "utilityFr": "Clé lourde en fer forgé. Déverrouille les portes en chêne dans S4 et S13."
  },
  "universal vault key": {
    "en": "Universal Vault Key",
    "fr": "Passe-partout universel du coffre",
    "utilityEn": "Master engraved key. Unlocks the grand vault S15 and mafia lockboxes.",
    "utilityFr": "Clé passe-partout gravée. Ouvre le coffre principal S15 et les coffres de la mafia."
  },
  "passe partout universel du coffre": {
    "en": "Universal Vault Key",
    "fr": "Passe-partout universel du coffre",
    "utilityEn": "Master engraved key. Unlocks the grand vault S15 and mafia lockboxes.",
    "utilityFr": "Clé passe-partout gravée. Ouvre le coffre principal S15 et les coffres de la mafia."
  },
  "key hidden behind a painting": {
    "en": "Key Hidden Behind a Painting",
    "fr": "Clé cachée derrière un tableau",
    "utilityEn": "Secret brass key concealed behind the oil painting in the manor salon.",
    "utilityFr": "Clé secrète dissimulée derrière la peinture à l'huile du salon."
  },
  "cle cachee derriere un tableau": {
    "en": "Key Hidden Behind a Painting",
    "fr": "Clé cachée derrière un tableau",
    "utilityEn": "Secret brass key concealed behind the oil painting in the manor salon.",
    "utilityFr": "Clé secrète dissimulée derrière la peinture à l'huile du salon."
  },
  "abyssal key": {
    "en": "Abyssal Key",
    "fr": "Clé des abysses",
    "utilityEn": "Carved stone key pulsing with pale glow. Unlocks the seaside cliff altar in Room 12.",
    "utilityFr": "Clé de pierre sculptée luisante. Déverrouille l'autel de la falaise côtière dans la Pièce 12."
  },
  "cle des abysses": {
    "en": "Abyssal Key",
    "fr": "Clé des abysses",
    "utilityEn": "Carved stone key pulsing with pale glow. Unlocks the seaside cliff altar in Room 12.",
    "utilityFr": "Clé de pierre sculptée luisante. Déverrouille l'autel de la falaise côtière dans la Pièce 12."
  },
  "vestibule key": {
    "en": "Vestibule Key",
    "fr": "Clé du vestibule",
    "utilityEn": "Ornate bronze key for unlocking the central vestibule doors.",
    "utilityFr": "Clé en bronze ciselé ouvrant les portes du vestibule central."
  },
  "cle du vestibule": {
    "en": "Vestibule Key",
    "fr": "Clé du vestibule",
    "utilityEn": "Ornate bronze key for unlocking the central vestibule doors.",
    "utilityFr": "Clé en bronze ciselé ouvrant les portes du vestibule central."
  },
  "service keyring": {
    "en": "Service Keyring",
    "fr": "Trousseau de clés de service",
    "utilityEn": "Ring of maintenance keys. Unlocks utility cabinets, tool lockers, and electrical panels.",
    "utilityFr": "Anneau de clés techniques. Ouvre les armoires de maintenance et boîtiers électriques."
  },
  "trousseau de cles de service": {
    "en": "Service Keyring",
    "fr": "Trousseau de clés de service",
    "utilityEn": "Ring of maintenance keys. Unlocks utility cabinets, tool lockers, and electrical panels.",
    "utilityFr": "Anneau de clés techniques. Ouvre les armoires de maintenance et boîtiers électriques."
  },
  "bunker access code": {
    "en": "Bunker Access Code",
    "fr": "Code d'accès du bunker",
    "utilityEn": "4-digit code (1402). Overrides the locked terminal in Zone 12.",
    "utilityFr": "Code à 4 chiffres (1402). Déverrouille le boîtier d'émission scellé en Zone 12."
  },
  "code dacces du bunker": {
    "en": "Bunker Access Code",
    "fr": "Code d'accès du bunker",
    "utilityEn": "4-digit code (1402). Overrides the locked terminal in Zone 12.",
    "utilityFr": "Code à 4 chiffres (1402). Déverrouille le boîtier d'émission scellé en Zone 12."
  },
  "security punchcard": {
    "en": "Security Punchcard",
    "fr": "Carte perforée de sécurité",
    "utilityEn": "Rigid card with binary punches. Grants access through high-security vault barriers.",
    "utilityFr": "Carte perforée en bakélite. Autorise le passage des sas de haute sécurité."
  },
  "carte perforee de securite": {
    "en": "Security Punchcard",
    "fr": "Carte perforée de sécurité",
    "utilityEn": "Rigid card with binary punches. Grants access through high-security vault barriers.",
    "utilityFr": "Carte perforée en bakélite. Autorise le passage des sas de haute sécurité."
  },
  "bag of gold ingots": {
    "en": "Bag of Gold Ingots",
    "fr": "Sac de lingots d'or",
    "utilityEn": "Heavy sack containing 5 pure gold ingots. Fulfills the debt and grants total financial freedom.",
    "utilityFr": "Sac pesant de lingots d'or pur. Règle la dette mafieuse et garantit la liberté absolue."
  },
  "sac de lingots dor": {
    "en": "Bag of Gold Ingots",
    "fr": "Sac de lingots d'or",
    "utilityEn": "Heavy sack containing 5 pure gold ingots. Fulfills the debt and grants total financial freedom.",
    "utilityFr": "Sac pesant de lingots d'or pur. Règle la dette mafieuse et garantit la liberté absolue."
  },
  "copper ingot": {
    "en": "Copper Ingot",
    "fr": "Lingot de cuivre",
    "utilityEn": "Heavy conductive copper bar. Useful for wiring repairs or electrical contacts.",
    "utilityFr": "Barre de cuivre pure. Utile pour réparer des contacts électriques ou comme masse."
  },
  "lingot de cuivre": {
    "en": "Copper Ingot",
    "fr": "Lingot de cuivre",
    "utilityEn": "Heavy conductive copper bar. Useful for wiring repairs or electrical contacts.",
    "utilityFr": "Barre de cuivre pure. Utile pour réparer des contacts électriques ou comme masse."
  },
  "stack of cash bundles": {
    "en": "Stack of Cash Bundles",
    "fr": "Liasse de billets de banque",
    "utilityEn": "Stacks of untraceable currency bills totaling $50,000.",
    "utilityFr": "Liasses de billets de banque non tracés totalisant 50 000 $."
  },
  "liasse de billets de banque": {
    "en": "Stack of Cash Bundles",
    "fr": "Liasse de billets de banque",
    "utilityEn": "Stacks of untraceable currency bills totaling $50,000.",
    "utilityFr": "Liasses de billets de banque non tracés totalisant 50 000 $."
  },
  "cancelled debt contract": {
    "en": "Cancelled Debt Contract",
    "fr": "Contrat de dette annulé",
    "utilityEn": "Legal contract stamped 'PAID IN FULL'. Permanently frees you from the syndicate's grip.",
    "utilityFr": "Contrat officiel tamponné 'PAYÉ EN TOTALITÉ'. Vous libère définitivement de l'emprise du syndicat."
  },
  "contrat de dette annule": {
    "en": "Cancelled Debt Contract",
    "fr": "Contrat de dette annulé",
    "utilityEn": "Legal contract stamped 'PAID IN FULL'. Permanently frees you from the syndicate's grip.",
    "utilityFr": "Contrat officiel tamponné 'PAYÉ EN TOTALITÉ'. Vous libère définitivement de l'emprise du syndicat."
  },
  "raw diamond": {
    "en": "Raw Diamond",
    "fr": "Diamant brut",
    "utilityEn": "Uncut gem of immense value. Can cut thick glass or be traded for a new life.",
    "utilityFr": "Gemme brute inestimable. Permet de rayer le verre épais ou d'acheter une nouvelle vie."
  },
  "diamant brut": {
    "en": "Raw Diamond",
    "fr": "Diamant brut",
    "utilityEn": "Uncut gem of immense value. Can cut thick glass or be traded for a new life.",
    "utilityFr": "Gemme brute inestimable. Permet de rayer le verre épais ou d'acheter une nouvelle vie."
  },
  "gold pocket watch": {
    "en": "Gold Pocket Watch",
    "fr": "Montre à gousset en or",
    "utilityEn": "Engraved family heirloom ticking softly. Precision chronometer.",
    "utilityFr": "Montre de famille en or gravé. Chronomètre mécanique de précision."
  },
  "montre a gousset en or": {
    "en": "Gold Pocket Watch",
    "fr": "Montre à gousset en or",
    "utilityEn": "Engraved family heirloom ticking softly. Precision chronometer.",
    "utilityFr": "Montre de famille en or gravé. Chronomètre mécanique de précision."
  },
  "engraved gold coin": {
    "en": "Engraved Gold Coin",
    "fr": "Pièce d'or gravée",
    "utilityEn": "Ancient ceremonial coin. Slips into puzzle steles or pays ferrymen.",
    "utilityFr": "Monnaie antique ouvragée. S'insère dans les stèles d'énigmes."
  },
  "piece dor gravee": {
    "en": "Engraved Gold Coin",
    "fr": "Pièce d'or gravée",
    "utilityEn": "Ancient ceremonial coin. Slips into puzzle steles or pays ferrymen.",
    "utilityFr": "Monnaie antique ouvragée. S'insère dans les stèles d'énigmes."
  },
  "crumpled $10 bill": {
    "en": "Crumpled $10 Bill",
    "fr": "Billet de 10$ froissé",
    "utilityEn": "Torn banknote. Good for wiping blood or lighting as tinder.",
    "utilityFr": "Billet abîmé. Pratique pour essuyer du sang ou allumer un feu."
  },
  "billet de 10$ froisse": {
    "en": "Crumpled $10 Bill",
    "fr": "Billet de 10$ froissé",
    "utilityEn": "Torn banknote. Good for wiping blood or lighting as tinder.",
    "utilityFr": "Billet abîmé. Pratique pour essuyer du sang ou allumer un feu."
  },
  "torn diary page": {
    "en": "Torn Diary Page",
    "fr": "Page de journal déchirée",
    "utilityEn": "Blood-spotted page detailing prisoner torture and hidden keys.",
    "utilityFr": "Page maculée de sang décrivant les tortures et l'emplacement de clés cachées."
  },
  "page de journal dechiree": {
    "en": "Torn Diary Page",
    "fr": "Page de journal déchirée",
    "utilityEn": "Blood-spotted page detailing prisoner torture and hidden keys.",
    "utilityFr": "Page maculée de sang décrivant les tortures et l'emplacement de clés cachées."
  },
  "blank parchment sheet": {
    "en": "Blank Parchment Sheet",
    "fr": "Feuille de parchemin vierge",
    "utilityEn": "Clean parchment for mapping, writing messages, or tracing stone rubbings.",
    "utilityFr": "Parchemin vierge pour cartographier, écrire des indices ou frotter des inscriptions."
  },
  "feuille de parchemin vierge": {
    "en": "Blank Parchment Sheet",
    "fr": "Feuille de parchemin vierge",
    "utilityEn": "Clean parchment for mapping, writing messages, or tracing stone rubbings.",
    "utilityFr": "Parchemin vierge pour cartographier, écrire des indices ou frotter des inscriptions."
  },
  "mafia ledger page": {
    "en": "Mafia Ledger Page",
    "fr": "Page du grand livre de la mafia",
    "utilityEn": "Financial records exposing crime bosses, vault combinations, and bribes.",
    "utilityFr": "Page de comptes compromettante dévoilant les chefs mafieux et combinaisons."
  },
  "page du grand livre de la mafia": {
    "en": "Mafia Ledger Page",
    "fr": "Page du grand livre de la mafia",
    "utilityEn": "Financial records exposing crime bosses, vault combinations, and bribes.",
    "utilityFr": "Page de comptes compromettante dévoilant les chefs mafieux et combinaisons."
  },
  "red sealing wax": {
    "en": "Red Sealing Wax",
    "fr": "Cire à cacheter rouge",
    "utilityEn": "Wax stick. Melts to seal envelopes, waterproof seams, or take key impressions.",
    "utilityFr": "Bâton de cire rouge. Sert à sceller, imperméabiliser ou mouler l'empreinte d'une clé."
  },
  "cire a cacheter rouge": {
    "en": "Red Sealing Wax",
    "fr": "Cire à cacheter rouge",
    "utilityEn": "Wax stick. Melts to seal envelopes, waterproof seams, or take key impressions.",
    "utilityFr": "Bâton de cire rouge. Sert à sceller, imperméabiliser ou mouler l'empreinte d'une clé."
  },
  "piece of white chalk": {
    "en": "Piece of White Chalk",
    "fr": "Morceau de craie blanche",
    "utilityEn": "Chalk stick. Marks visited corridors, draws navigation arrows, solves floor puzzles.",
    "utilityFr": "Bâton de craie. Marque les carrefours, trace des flèches et résout des énigmes au sol."
  },
  "morceau de craie blanche": {
    "en": "Piece of White Chalk",
    "fr": "Morceau de craie blanche",
    "utilityEn": "Chalk stick. Marks visited corridors, draws navigation arrows, solves floor puzzles.",
    "utilityFr": "Bâton de craie. Marque les carrefours, trace des flèches et résout des énigmes au sol."
  },
  "scratched magnifying glass": {
    "en": "Scratched Magnifying Glass",
    "fr": "Loupe rayée",
    "utilityEn": "Convex lens. Inspects tiny mechanism details, reads microdots, or focuses sun rays into fire.",
    "utilityFr": "Lentille grossissante. Révèle les micro-inscriptions ou concentre la lumière pour faire du feu."
  },
  "loupe rayee": {
    "en": "Scratched Magnifying Glass",
    "fr": "Loupe rayée",
    "utilityEn": "Convex lens. Inspects tiny mechanism details, reads microdots, or focuses sun rays into fire.",
    "utilityFr": "Lentille grossissante. Révèle les micro-inscriptions ou concentre la lumière pour faire du feu."
  },
  "puzzle stele tile": {
    "en": "Puzzle Stele Tile",
    "fr": "Dalle de stèle à énigme",
    "utilityEn": "Carved stone tile matching the offering chest in Room 13.",
    "utilityFr": "Dalle de pierre sculptée s'emboîtant dans le coffre runique de la salle 13."
  },
  "dalle de stele a enigme": {
    "en": "Puzzle Stele Tile",
    "fr": "Dalle de stèle à énigme",
    "utilityEn": "Carved stone tile matching the offering chest in Room 13.",
    "utilityFr": "Dalle de pierre sculptée s'emboîtant dans le coffre runique de la salle 13."
  },
  "bioluminescent green mushroom": {
    "en": "Champignon bioluminescent vert",
    "fr": "Bioluminescent Green Mushroom",
    "utilityEn": "Glowing subterranean fungus. Soft green illumination or ground into chemical poultice.",
    "utilityFr": "Champignon luisant vert. Éclairage doux ou broyé en cataplasme chimique."
  },
  "champignon bioluminescent vert": {
    "en": "Champignon bioluminescent vert",
    "fr": "Bioluminescent Green Mushroom",
    "utilityEn": "Glowing subterranean fungus. Soft green illumination or ground into chemical poultice.",
    "utilityFr": "Champignon luisant vert. Éclairage doux ou broyé en cataplasme chimique."
  },
  "dry fungal spore": {
    "en": "Spore fongique séchée",
    "fr": "Dry Fungal Spore",
    "utilityEn": "Dried toxic spore powder. Useful as a noxious cloud weapon.",
    "utilityFr": "Poudre de spores toxiques. Peut créer un nuage aveuglant ou toxique."
  },
  "spore fongique sechee": {
    "en": "Spore fongique séchée",
    "fr": "Dry Fungal Spore",
    "utilityEn": "Dried toxic spore powder. Useful as a noxious cloud weapon.",
    "utilityFr": "Poudre de spores toxiques. Peut créer un nuage aveuglant ou toxique."
  },
  "petrified wood branch": {
    "en": "Branche d'arbre pétrifiée",
    "fr": "Petrified Wood Branch",
    "utilityEn": "Dense mineralized branch. As hard as stone, great club or crowbar.",
    "utilityFr": "Branche minéralisée ultra-dense. Aussi dure que la pierre, excellente massue."
  },
  "branche darbre petrifiee": {
    "en": "Branche d'arbre pétrifiée",
    "fr": "Petrified Wood Branch",
    "utilityEn": "Dense mineralized branch. As hard as stone, great club or crowbar.",
    "utilityFr": "Branche minéralisée ultra-dense. Aussi dure que la pierre, excellente massue."
  },
  "giant mutant predator claw": {
    "en": "Griffe de prédateur mutant",
    "fr": "Giant Mutant Predator Claw",
    "utilityEn": "Hooked predator talon. Natural dagger that shreds armor.",
    "utilityFr": "Griffe acérée recourbée. Arme tranchante perçant les cuirs épais."
  },
  "griffe de predateur mutant": {
    "en": "Griffe de prédateur mutant",
    "fr": "Giant Mutant Predator Claw",
    "utilityEn": "Hooked predator talon. Natural dagger that shreds armor.",
    "utilityFr": "Griffe acérée recourbée. Arme tranchante perçant les cuirs épais."
  },
  "dry deadwood": {
    "en": "Bois mort ultra-sec",
    "fr": "Dry Deadwood",
    "utilityEn": "Kindling sticks. Ignites instantly to build a campfire.",
    "utilityFr": "Petit bois très sec. S'enflamme instantanément pour faire un feu de camp."
  },
  "bois mort ultra sec": {
    "en": "Bois mort ultra-sec",
    "fr": "Dry Deadwood",
    "utilityEn": "Kindling sticks. Ignites instantly to build a campfire.",
    "utilityFr": "Petit bois très sec. S'enflamme instantanément pour faire un feu de camp."
  },
  "lost tactical boot": {
    "en": "Botte d'intervention égarée",
    "fr": "Lost Tactical Boot",
    "utilityEn": "Sturdy combat boot. Thick sole protects against glass shards and floor spikes.",
    "utilityFr": "Botte militaire renforcée. Protège contre les débris de verre et pointes au sol."
  },
  "botte dintervention egaree": {
    "en": "Botte d'intervention égarée",
    "fr": "Lost Tactical Boot",
    "utilityEn": "Sturdy combat boot. Thick sole protects against glass shards and floor spikes.",
    "utilityFr": "Botte militaire renforcée. Protège contre les débris de verre et pointes au sol."
  },
  "bottle of vintage absinthe": {
    "en": "Bouteille d'absinthe forte",
    "fr": "Bottle of Vintage Absinthe",
    "utilityEn": "Concentrated herbal alcohol. Painkiller, disinfectant, or fire starter.",
    "utilityFr": "Alcool fort concentré. Calme la douleur, désinfecte ou alimente un brasier."
  },
  "algorithme de decryptage": {
    "en": "Algorithme de décryptage",
    "fr": "Algorithme de décryptage",
    "utilityEn": "Exploration item (Algorithme de décryptage). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Algorithme de décryptage). Utilisable dans l'environnement."
  },
  "amulette aux symboles impies": {
    "en": "Amulette aux symboles impies",
    "fr": "Amulette aux symboles impies",
    "utilityEn": "Exploration item (Amulette aux symboles impies). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Amulette aux symboles impies). Utilisable dans l'environnement."
  },
  "anemometre portable": {
    "en": "Anemometer portable",
    "fr": "Anémomètre portable",
    "utilityEn": "Exploration item (Anemometer portable). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Anémomètre portable). Utilisable dans l'environnement."
  },
  "anemometer portable": {
    "en": "Anemometer portable",
    "fr": "Anémomètre portable",
    "utilityEn": "Exploration item (Anemometer portable). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Anémomètre portable). Utilisable dans l'environnement."
  },
  "artefact de controle de communication": {
    "en": "Artifact de contrôle de communication",
    "fr": "Artefact de contrôle de communication",
    "utilityEn": "Exploration item (Artifact de contrôle de communication). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Artefact de contrôle de communication). Utilisable dans l'environnement."
  },
  "artifact de controle de communication": {
    "en": "Artifact de contrôle de communication",
    "fr": "Artefact de contrôle de communication",
    "utilityEn": "Exploration item (Artifact de contrôle de communication). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Artefact de contrôle de communication). Utilisable dans l'environnement."
  },
  "artefact gravitationnel miniature": {
    "en": "Artefact gravitationnel miniature",
    "fr": "Artefact gravitationnel miniature",
    "utilityEn": "Exploration item (Artefact gravitationnel miniature). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Artefact gravitationnel miniature). Utilisable dans l'environnement."
  },
  "badge dacces biometrique fissure": {
    "en": "Badge d'accès biométrique fissuré",
    "fr": "Badge d'accès biométrique fissuré",
    "utilityEn": "Exploration item (Badge d'accès biométrique fissuré). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Badge d'accès biométrique fissuré). Utilisable dans l'environnement."
  },
  "baie sauvage douteuse": {
    "en": "Baie sauvage douteuse",
    "fr": "Baie sauvage douteuse",
    "utilityEn": "Exploration item (Baie sauvage douteuse). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Baie sauvage douteuse). Utilisable dans l'environnement."
  },
  "balai a manche casse": {
    "en": "Balai à manche cassé",
    "fr": "Balai à manche cassé",
    "utilityEn": "Exploration item (Balai à manche cassé). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Balai à manche cassé). Utilisable dans l'environnement."
  },
  "baril de poix etanche": {
    "en": "Barrel of poix étanche",
    "fr": "Baril de poix étanche",
    "utilityEn": "Exploration item (Barrel of poix étanche). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Baril de poix étanche). Utilisable dans l'environnement."
  },
  "barrel of poix etanche": {
    "en": "Barrel of poix étanche",
    "fr": "Baril de poix étanche",
    "utilityEn": "Exploration item (Barrel of poix étanche). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Baril de poix étanche). Utilisable dans l'environnement."
  },
  "barometre a mercure antique": {
    "en": "Barometer à mercure antique",
    "fr": "Baromètre à mercure antique",
    "utilityEn": "Exploration item (Barometer à mercure antique). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Baromètre à mercure antique). Utilisable dans l'environnement."
  },
  "barometer a mercure antique": {
    "en": "Barometer à mercure antique",
    "fr": "Baromètre à mercure antique",
    "utilityEn": "Exploration item (Barometer à mercure antique). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Baromètre à mercure antique). Utilisable dans l'environnement."
  },
  "black stone statue": {
    "en": "Black Stone Statue",
    "fr": "Black Pierre Statue",
    "utilityEn": "Exploration item (Black Stone Statue). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Black Pierre Statue). Utilisable dans l'environnement."
  },
  "black pierre statue": {
    "en": "Black Stone Statue",
    "fr": "Black Pierre Statue",
    "utilityEn": "Exploration item (Black Stone Statue). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Black Pierre Statue). Utilisable dans l'environnement."
  },
  "bloc de donnees compresse": {
    "en": "Bloc de données compressé",
    "fr": "Bloc de données compressé",
    "utilityEn": "Exploration item (Bloc de données compressé). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Bloc de données compressé). Utilisable dans l'environnement."
  },
  "blown fuse": {
    "en": "Blown Fuse",
    "fr": "Blown Fuse",
    "utilityEn": "Exploration item (Blown Fuse). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Blown Fuse). Utilisable dans l'environnement."
  },
  "blown lightbulb": {
    "en": "Blown Lightbulb",
    "fr": "Blown Lightbulb",
    "utilityEn": "Exploration item (Blown Lightbulb). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Blown Lightbulb). Utilisable dans l'environnement."
  },
  "botte en cuir haute trempee": {
    "en": "Boot en cuir haute trempée",
    "fr": "Botte en cuir haute trempée",
    "utilityEn": "Exploration item (Boot en cuir haute trempée). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Botte en cuir haute trempée). Utilisable dans l'environnement."
  },
  "boot en cuir haute trempee": {
    "en": "Boot en cuir haute trempée",
    "fr": "Botte en cuir haute trempée",
    "utilityEn": "Exploration item (Boot en cuir haute trempée). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Botte en cuir haute trempée). Utilisable dans l'environnement."
  },
  "boussole bloquee": {
    "en": "Compass bloquée",
    "fr": "Boussole bloquée",
    "utilityEn": "Exploration item (Compass bloquée). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Boussole bloquée). Utilisable dans l'environnement."
  },
  "compass bloquee": {
    "en": "Compass bloquée",
    "fr": "Boussole bloquée",
    "utilityEn": "Exploration item (Compass bloquée). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Boussole bloquée). Utilisable dans l'environnement."
  },
  "boussole magnetometrique": {
    "en": "Compass magnétométrique",
    "fr": "Boussole magnétométrique",
    "utilityEn": "Exploration item (Compass magnétométrique). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Boussole magnétométrique). Utilisable dans l'environnement."
  },
  "compass magnetometrique": {
    "en": "Compass magnétométrique",
    "fr": "Boussole magnétométrique",
    "utilityEn": "Exploration item (Compass magnétométrique). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Boussole magnétométrique). Utilisable dans l'environnement."
  },
  "boite de cartouches vides": {
    "en": "Box of cartouches vides",
    "fr": "Boîte de cartouches vides",
    "utilityEn": "Exploration item (Box of cartouches vides). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Boîte de cartouches vides). Utilisable dans l'environnement."
  },
  "box of cartouches vides": {
    "en": "Box of cartouches vides",
    "fr": "Boîte de cartouches vides",
    "utilityEn": "Exploration item (Box of cartouches vides). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Boîte de cartouches vides). Utilisable dans l'environnement."
  },
  "boite a musique en noyer": {
    "en": "Box of musique en noyer",
    "fr": "Boîte à musique en noyer",
    "utilityEn": "Exploration item (Box of musique en noyer). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Boîte à musique en noyer). Utilisable dans l'environnement."
  },
  "box of musique en noyer": {
    "en": "Box of musique en noyer",
    "fr": "Boîte à musique en noyer",
    "utilityEn": "Exploration item (Box of musique en noyer). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Boîte à musique en noyer). Utilisable dans l'environnement."
  },
  "broken tile fragment": {
    "en": "Broken Tile Fragment",
    "fr": "Broken Tile Fragment",
    "utilityEn": "Exploration item (Broken Tile Fragment). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Broken Tile Fragment). Utilisable dans l'environnement."
  },
  "bronze gear": {
    "en": "Bronze Gear",
    "fr": "Bronze Gear",
    "utilityEn": "Exploration item (Bronze Gear). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Bronze Gear). Utilisable dans l'environnement."
  },
  "bronze military medal": {
    "en": "Bronze Military Medal",
    "fr": "Bronze Military Medal",
    "utilityEn": "Exploration item (Bronze Military Medal). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Bronze Military Medal). Utilisable dans l'environnement."
  },
  "bulbe de plante luminescente": {
    "en": "Bulbe de plante luminescente",
    "fr": "Bulbe de plante luminescente",
    "utilityEn": "Exploration item (Bulbe de plante luminescente). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Bulbe de plante luminescente). Utilisable dans l'environnement."
  },
  "buvard imbibe dencre": {
    "en": "Buvard imbibé d'encre",
    "fr": "Buvard imbibé d'encre",
    "utilityEn": "Exploration item (Buvard imbibé d'encre). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Buvard imbibé d'encre). Utilisable dans l'environnement."
  },
  "baton de marche telescopique": {
    "en": "Staff de marche télescopique",
    "fr": "Bâton de marche télescopique",
    "utilityEn": "Exploration item (Staff de marche télescopique). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Bâton de marche télescopique). Utilisable dans l'environnement."
  },
  "staff de marche telescopique": {
    "en": "Staff de marche télescopique",
    "fr": "Bâton de marche télescopique",
    "utilityEn": "Exploration item (Staff de marche télescopique). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Bâton de marche télescopique). Utilisable dans l'environnement."
  },
  "cadre en bois dore": {
    "en": "Cadre en bois doré",
    "fr": "Cadre en bois doré",
    "utilityEn": "Exploration item (Cadre en bois doré). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Cadre en bois doré). Utilisable dans l'environnement."
  },
  "caisse en bois vide": {
    "en": "Caisse en bois vide",
    "fr": "Caisse en bois vide",
    "utilityEn": "Exploration item (Caisse en bois vide). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Caisse en bois vide). Utilisable dans l'environnement."
  },
  "candelabre a trois branches": {
    "en": "Candélabre à trois branches",
    "fr": "Candélabre à trois branches",
    "utilityEn": "Exploration item (Candélabre à trois branches). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Candélabre à trois branches). Utilisable dans l'environnement."
  },
  "canned food": {
    "en": "Canned Food",
    "fr": "Canned Food",
    "utilityEn": "Exploration item (Canned Food). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Canned Food). Utilisable dans l'environnement."
  },
  "capteur dondes sous spatiales": {
    "en": "Capteur d'ondes sous-spatiales",
    "fr": "Capteur d'ondes sous-spatiales",
    "utilityEn": "Exploration item (Capteur d'ondes sous-spatiales). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Capteur d'ondes sous-spatiales). Utilisable dans l'environnement."
  },
  "carafe en cristal felee": {
    "en": "Carafe en cristal fêlée",
    "fr": "Carafe en cristal fêlée",
    "utilityEn": "Exploration item (Carafe en cristal fêlée). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Carafe en cristal fêlée). Utilisable dans l'environnement."
  },
  "carnet de notes en cuir": {
    "en": "Carnet de notes en cuir",
    "fr": "Carnet de notes en cuir",
    "utilityEn": "Exploration item (Carnet de notes en cuir). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Carnet de notes en cuir). Utilisable dans l'environnement."
  },
  "carte topographique de la zone": {
    "en": "Carte topographique de la zone",
    "fr": "Carte topographique de la zone",
    "utilityEn": "Exploration item (Carte topographique de la zone). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Carte topographique de la zone). Utilisable dans l'environnement."
  },
  "carved brass cup": {
    "en": "Carved Brass Cup",
    "fr": "Carved Brass Cup",
    "utilityEn": "Exploration item (Carved Brass Cup). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Carved Brass Cup). Utilisable dans l'environnement."
  },
  "cellule de batterie numerique": {
    "en": "Cellule de batterie numérique",
    "fr": "Cellule de batterie numérique",
    "utilityEn": "Exploration item (Cellule de batterie numérique). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Cellule de batterie numérique). Utilisable dans l'environnement."
  },
  "ceramic burial urn": {
    "en": "Ceramic Burial Urn",
    "fr": "Ceramic Burial Urn",
    "utilityEn": "Exploration item (Ceramic Burial Urn). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Ceramic Burial Urn). Utilisable dans l'environnement."
  },
  "chalumeau au plasma leger": {
    "en": "Chalumeau au plasma léger",
    "fr": "Chalumeau au plasma léger",
    "utilityEn": "Exploration item (Chalumeau au plasma léger). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Chalumeau au plasma léger). Utilisable dans l'environnement."
  },
  "chiffon imbibe dhuile": {
    "en": "Rag imbibé d'huile",
    "fr": "Chiffon imbibé d'huile",
    "utilityEn": "Exploration item (Rag imbibé d'huile). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Chiffon imbibé d'huile). Utilisable dans l'environnement."
  },
  "rag imbibe dhuile": {
    "en": "Rag imbibé d'huile",
    "fr": "Chiffon imbibé d'huile",
    "utilityEn": "Exploration item (Rag imbibé d'huile). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Chiffon imbibé d'huile). Utilisable dans l'environnement."
  },
  "chiffon poussiereux": {
    "en": "Rag poussiéreux",
    "fr": "Chiffon poussiéreux",
    "utilityEn": "Exploration item (Rag poussiéreux). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Chiffon poussiéreux). Utilisable dans l'environnement."
  },
  "rag poussiereux": {
    "en": "Rag poussiéreux",
    "fr": "Chiffon poussiéreux",
    "utilityEn": "Exploration item (Rag poussiéreux). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Chiffon poussiéreux). Utilisable dans l'environnement."
  },
  "chipped pendulum blade": {
    "en": "Chipped Pendulum Blade",
    "fr": "Chipped Pendulum Blade",
    "utilityEn": "Exploration item (Chipped Pendulum Blade). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Chipped Pendulum Blade). Utilisable dans l'environnement."
  },
  "circuit logique and": {
    "en": "Circuit logique AND",
    "fr": "Circuit logique AND",
    "utilityEn": "Exploration item (Circuit logique AND). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Circuit logique AND). Utilisable dans l'environnement."
  },
  "circuit logique or": {
    "en": "Circuit logique OR",
    "fr": "Circuit logique OR",
    "utilityEn": "Exploration item (Circuit logique OR). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Circuit logique OR). Utilisable dans l'environnement."
  },
  "clef dextraction durgence": {
    "en": "Key to extraction d'urgence",
    "fr": "Clef d'extraction d'urgence",
    "utilityEn": "Exploration item (Key to extraction d'urgence). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Clef d'extraction d'urgence). Utilisable dans l'environnement."
  },
  "key to extraction durgence": {
    "en": "Key to extraction d'urgence",
    "fr": "Clef d'extraction d'urgence",
    "utilityEn": "Exploration item (Key to extraction d'urgence). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Clef d'extraction d'urgence). Utilisable dans l'environnement."
  },
  "cle dadministration root": {
    "en": "Key to administration ROOT",
    "fr": "Clé d'administration ROOT",
    "utilityEn": "Exploration item (Key to administration ROOT). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Clé d'administration ROOT). Utilisable dans l'environnement."
  },
  "key to administration root": {
    "en": "Key to administration ROOT",
    "fr": "Clé d'administration ROOT",
    "utilityEn": "Exploration item (Key to administration ROOT). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Clé d'administration ROOT). Utilisable dans l'environnement."
  },
  "cle de contact en cristal": {
    "en": "Key of contact en cristal",
    "fr": "Clé de contact en cristal",
    "utilityEn": "Exploration item (Key of contact en cristal). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Clé de contact en cristal). Utilisable dans l'environnement."
  },
  "key of contact en cristal": {
    "en": "Key of contact en cristal",
    "fr": "Clé de contact en cristal",
    "utilityEn": "Exploration item (Key of contact en cristal). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Clé de contact en cristal). Utilisable dans l'environnement."
  },
  "cle de donnees v1.0": {
    "en": "Key of données v1.0",
    "fr": "Clé de données v1.0",
    "utilityEn": "Exploration item (Key of données v1.0). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Clé de données v1.0). Utilisable dans l'environnement."
  },
  "key of donnees v1.0": {
    "en": "Key of données v1.0",
    "fr": "Clé de données v1.0",
    "utilityEn": "Exploration item (Key of données v1.0). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Clé de données v1.0). Utilisable dans l'environnement."
  },
  "code derreur 404": {
    "en": "Code d'erreur 404",
    "fr": "Code d'erreur 404",
    "utilityEn": "Exploration item (Code d'erreur 404). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Code d'erreur 404). Utilisable dans l'environnement."
  },
  "colorless chemical flask": {
    "en": "Colorless Chemical Flask",
    "fr": "Colorless Chemical Fiole",
    "utilityEn": "Exploration item (Colorless Chemical Flask). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Colorless Chemical Fiole). Utilisable dans l'environnement."
  },
  "colorless chemical fiole": {
    "en": "Colorless Chemical Flask",
    "fr": "Colorless Chemical Fiole",
    "utilityEn": "Exploration item (Colorless Chemical Flask). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Colorless Chemical Fiole). Utilisable dans l'environnement."
  },
  "connecteur de puissance alien": {
    "en": "Connecteur de puissance alien",
    "fr": "Connecteur de puissance alien",
    "utilityEn": "Exploration item (Connecteur de puissance alien). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Connecteur de puissance alien). Utilisable dans l'environnement."
  },
  "coquillage binaire code": {
    "en": "Coquillage binaire codé",
    "fr": "Coquillage binaire codé",
    "utilityEn": "Exploration item (Coquillage binaire codé). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Coquillage binaire codé). Utilisable dans l'environnement."
  },
  "coquillage mutant tranchant": {
    "en": "Coquillage mutant tranchant",
    "fr": "Coquillage mutant tranchant",
    "utilityEn": "Exploration item (Coquillage mutant tranchant). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Coquillage mutant tranchant). Utilisable dans l'environnement."
  },
  "coquillage etrange": {
    "en": "Coquillage étrange",
    "fr": "Coquillage étrange",
    "utilityEn": "Exploration item (Coquillage étrange). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Coquillage étrange). Utilisable dans l'environnement."
  },
  "corroded coin": {
    "en": "Corroded Coin",
    "fr": "Corroded Coin",
    "utilityEn": "Exploration item (Corroded Coin). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Corroded Coin). Utilisable dans l'environnement."
  },
  "coupe papier en argent": {
    "en": "Coupe-papier en argent",
    "fr": "Coupe-papier en argent",
    "utilityEn": "Exploration item (Coupe-papier en argent). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Coupe-papier en argent). Utilisable dans l'environnement."
  },
  "cracked hardhat": {
    "en": "Cracked Hardhat",
    "fr": "Cracked Hardhat",
    "utilityEn": "Exploration item (Cracked Hardhat). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Cracked Hardhat). Utilisable dans l'environnement."
  },
  "cracked human skull": {
    "en": "Cracked Human Skull",
    "fr": "Cracked Human Skull",
    "utilityEn": "Exploration item (Cracked Human Skull). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Cracked Human Skull). Utilisable dans l'environnement."
  },
  "cracked plastic bucket": {
    "en": "Cracked Plastic Bucket",
    "fr": "Cracked Plastic Bucket",
    "utilityEn": "Exploration item (Cracked Plastic Bucket). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Cracked Plastic Bucket). Utilisable dans l'environnement."
  },
  "crampons dadherence pour bottes": {
    "en": "Crampons d'adhérence pour bottes",
    "fr": "Crampons d'adhérence pour bottes",
    "utilityEn": "Exploration item (Crampons d'adhérence pour bottes). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Crampons d'adhérence pour bottes). Utilisable dans l'environnement."
  },
  "cylindre dextincteur vide": {
    "en": "Cylindre d'extincteur vide",
    "fr": "Cylindre d'extincteur vide",
    "utilityEn": "Exploration item (Cylindre d'extincteur vide). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Cylindre d'extincteur vide). Utilisable dans l'environnement."
  },
  "cable de traction en fibre synthetique": {
    "en": "Cable de traction en fibre synthétique",
    "fr": "Câble de traction en fibre synthétique",
    "utilityEn": "Exploration item (Cable de traction en fibre synthétique). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Câble de traction en fibre synthétique). Utilisable dans l'environnement."
  },
  "data key v1.0": {
    "en": "Data Key v1.0",
    "fr": "Donnée Key v1.0",
    "utilityEn": "Exploration item (Data Key v1.0). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Donnée Key v1.0). Utilisable dans l'environnement."
  },
  "donnee key v1.0": {
    "en": "Data Key v1.0",
    "fr": "Donnée Key v1.0",
    "utilityEn": "Exploration item (Data Key v1.0). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Donnée Key v1.0). Utilisable dans l'environnement."
  },
  "donnee corrompue rouge": {
    "en": "Data corrompue rouge",
    "fr": "Donnée corrompue rouge",
    "utilityEn": "Exploration item (Data corrompue rouge). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Donnée corrompue rouge). Utilisable dans l'environnement."
  },
  "data corrompue rouge": {
    "en": "Data corrompue rouge",
    "fr": "Donnée corrompue rouge",
    "utilityEn": "Exploration item (Data corrompue rouge). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Donnée corrompue rouge). Utilisable dans l'environnement."
  },
  "donnee temporaire (.tmp)": {
    "en": "Data temporaire (.TMP)",
    "fr": "Donnée temporaire (.TMP)",
    "utilityEn": "Exploration item (Data temporaire (.TMP)). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Donnée temporaire (.TMP)). Utilisable dans l'environnement."
  },
  "data temporaire (.tmp)": {
    "en": "Data temporaire (.TMP)",
    "fr": "Donnée temporaire (.TMP)",
    "utilityEn": "Exploration item (Data temporaire (.TMP)). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Donnée temporaire (.TMP)). Utilisable dans l'environnement."
  },
  "donnee volante non indexee": {
    "en": "Data volante non indexée",
    "fr": "Donnée volante non indexée",
    "utilityEn": "Exploration item (Data volante non indexée). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Donnée volante non indexée). Utilisable dans l'environnement."
  },
  "data volante non indexee": {
    "en": "Data volante non indexée",
    "fr": "Donnée volante non indexée",
    "utilityEn": "Exploration item (Data volante non indexée). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Donnée volante non indexée). Utilisable dans l'environnement."
  },
  "dump de pile systeme": {
    "en": "Dump de pile système",
    "fr": "Dump de pile système",
    "utilityEn": "Exploration item (Dump de pile système). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Dump de pile système). Utilisable dans l'environnement."
  },
  "empty canvas bag": {
    "en": "Empty Canvas Bag",
    "fr": "Empty Canvas Bag",
    "utilityEn": "Exploration item (Empty Canvas Bag). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Empty Canvas Bag). Utilisable dans l'environnement."
  },
  "empty glass bottle": {
    "en": "Empty Glass Bottle",
    "fr": "Empty Glass Bottle",
    "utilityEn": "Exploration item (Empty Glass Bottle). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Empty Glass Bottle). Utilisable dans l'environnement."
  },
  "enamel metal cup": {
    "en": "Enamel Metal Cup",
    "fr": "Enamel Metal Cup",
    "utilityEn": "Exploration item (Enamel Metal Cup). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Enamel Metal Cup). Utilisable dans l'environnement."
  },
  "encens au parfum etouffant": {
    "en": "Encens au parfum étouffant",
    "fr": "Encens au parfum étouffant",
    "utilityEn": "Exploration item (Encens au parfum étouffant). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Encens au parfum étouffant). Utilisable dans l'environnement."
  },
  "encre de chine en fiole": {
    "en": "Encre de Chine en fiole",
    "fr": "Encre de Chine en fiole",
    "utilityEn": "Exploration item (Encre de Chine en fiole). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Encre de Chine en fiole). Utilisable dans l'environnement."
  },
  "engraved gold ring": {
    "en": "Engraved Gold Ring",
    "fr": "Engraved Gold Ring",
    "utilityEn": "Exploration item (Engraved Gold Ring). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Engraved Gold Ring). Utilisable dans l'environnement."
  },
  "engraved stele fragment": {
    "en": "Engraved Stele Fragment",
    "fr": "Engraved Stele Fragment",
    "utilityEn": "Exploration item (Engraved Stele Fragment). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Engraved Stele Fragment). Utilisable dans l'environnement."
  },
  "enregistrement de pensees sombres": {
    "en": "Recording de pensées sombres",
    "fr": "Enregistrement de pensées sombres",
    "utilityEn": "Exploration item (Recording de pensées sombres). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Enregistrement de pensées sombres). Utilisable dans l'environnement."
  },
  "recording de pensees sombres": {
    "en": "Recording de pensées sombres",
    "fr": "Enregistrement de pensées sombres",
    "utilityEn": "Exploration item (Recording de pensées sombres). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Enregistrement de pensées sombres). Utilisable dans l'environnement."
  },
  "erratic pocket compass": {
    "en": "Erratic Pocket Compass",
    "fr": "Erratic Pocket Boussole",
    "utilityEn": "Exploration item (Erratic Pocket Compass). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Erratic Pocket Boussole). Utilisable dans l'environnement."
  },
  "erratic pocket boussole": {
    "en": "Erratic Pocket Compass",
    "fr": "Erratic Pocket Boussole",
    "utilityEn": "Exploration item (Erratic Pocket Compass). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Erratic Pocket Boussole). Utilisable dans l'environnement."
  },
  "feuille toxique violette": {
    "en": "Feuille toxique violette",
    "fr": "Feuille toxique violette",
    "utilityEn": "Exploration item (Feuille toxique violette). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Feuille toxique violette). Utilisable dans l'environnement."
  },
  "fichier didentite numerique": {
    "en": "File d'identité numérique",
    "fr": "Fichier d'identité numérique",
    "utilityEn": "Exploration item (File d'identité numérique). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Fichier d'identité numérique). Utilisable dans l'environnement."
  },
  "file didentite numerique": {
    "en": "File d'identité numérique",
    "fr": "Fichier d'identité numérique",
    "utilityEn": "Exploration item (File d'identité numérique). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Fichier d'identité numérique). Utilisable dans l'environnement."
  },
  "fichier de commande systeme": {
    "en": "File de commande système",
    "fr": "Fichier de commande système",
    "utilityEn": "Exploration item (File de commande système). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Fichier de commande système). Utilisable dans l'environnement."
  },
  "file de commande systeme": {
    "en": "File de commande système",
    "fr": "Fichier de commande système",
    "utilityEn": "Exploration item (File de commande système). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Fichier de commande système). Utilisable dans l'environnement."
  },
  "fichier son de vague numerique": {
    "en": "File son de vague numérique",
    "fr": "Fichier son de vague numérique",
    "utilityEn": "Exploration item (File son de vague numérique). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Fichier son de vague numérique). Utilisable dans l'environnement."
  },
  "file son de vague numerique": {
    "en": "File son de vague numérique",
    "fr": "Fichier son de vague numérique",
    "utilityEn": "Exploration item (File son de vague numérique). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Fichier son de vague numérique). Utilisable dans l'environnement."
  },
  "fichier systeme cache": {
    "en": "File système caché",
    "fr": "Fichier système caché",
    "utilityEn": "Exploration item (File système caché). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Fichier système caché). Utilisable dans l'environnement."
  },
  "file systeme cache": {
    "en": "File système caché",
    "fr": "Fichier système caché",
    "utilityEn": "Exploration item (File système caché). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Fichier système caché). Utilisable dans l'environnement."
  },
  "fiole deau acide": {
    "en": "Fiole d'eau acide",
    "fr": "Fiole d'eau acide",
    "utilityEn": "Exploration item (Fiole d'eau acide). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Fiole d'eau acide). Utilisable dans l'environnement."
  },
  "firewall shield": {
    "en": "Firewall Shield",
    "fr": "Firewall Bouclier",
    "utilityEn": "Exploration item (Firewall Shield). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Firewall Bouclier). Utilisable dans l'environnement."
  },
  "firewall bouclier": {
    "en": "Firewall Shield",
    "fr": "Firewall Bouclier",
    "utilityEn": "Exploration item (Firewall Shield). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Firewall Bouclier). Utilisable dans l'environnement."
  },
  "flacon dechantillon liquide alien": {
    "en": "Vial d'échantillon liquide alien",
    "fr": "Flacon d'échantillon liquide alien",
    "utilityEn": "Exploration item (Vial d'échantillon liquide alien). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Flacon d'échantillon liquide alien). Utilisable dans l'environnement."
  },
  "vial dechantillon liquide alien": {
    "en": "Vial d'échantillon liquide alien",
    "fr": "Flacon d'échantillon liquide alien",
    "utilityEn": "Exploration item (Vial d'échantillon liquide alien). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Flacon d'échantillon liquide alien). Utilisable dans l'environnement."
  },
  "flashlight": {
    "en": "Flashlight",
    "fr": "Flashlight",
    "utilityEn": "Exploration item (Flashlight). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Flashlight). Utilisable dans l'environnement."
  },
  "fleur mutante geante": {
    "en": "Flower mutante géante",
    "fr": "Fleur mutante géante",
    "utilityEn": "Exploration item (Flower mutante géante). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Fleur mutante géante). Utilisable dans l'environnement."
  },
  "flower mutante geante": {
    "en": "Flower mutante géante",
    "fr": "Fleur mutante géante",
    "utilityEn": "Exploration item (Flower mutante géante). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Fleur mutante géante). Utilisable dans l'environnement."
  },
  "floating wooden plank": {
    "en": "Floating Wooden Plank",
    "fr": "Floating Wooden Planche",
    "utilityEn": "Exploration item (Floating Wooden Plank). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Floating Wooden Planche). Utilisable dans l'environnement."
  },
  "floating wooden planche": {
    "en": "Floating Wooden Plank",
    "fr": "Floating Wooden Planche",
    "utilityEn": "Exploration item (Floating Wooden Plank). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Floating Wooden Planche). Utilisable dans l'environnement."
  },
  "fossile dammonite": {
    "en": "Fossil d'ammonite",
    "fr": "Fossile d'ammonite",
    "utilityEn": "Exploration item (Fossil d'ammonite). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Fossile d'ammonite). Utilisable dans l'environnement."
  },
  "fossil dammonite": {
    "en": "Fossil d'ammonite",
    "fr": "Fossile d'ammonite",
    "utilityEn": "Exploration item (Fossil d'ammonite). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Fossile d'ammonite). Utilisable dans l'environnement."
  },
  "foul incense pouch": {
    "en": "Foul Incense Pouch",
    "fr": "Foul Incense Pouch",
    "utilityEn": "Exploration item (Foul Incense Pouch). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Foul Incense Pouch). Utilisable dans l'environnement."
  },
  "fragment dalliage inconnu": {
    "en": "Shard of alliage inconnu",
    "fr": "Fragment d'alliage inconnu",
    "utilityEn": "Exploration item (Shard of alliage inconnu). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Fragment d'alliage inconnu). Utilisable dans l'environnement."
  },
  "shard of alliage inconnu": {
    "en": "Shard of alliage inconnu",
    "fr": "Fragment d'alliage inconnu",
    "utilityEn": "Exploration item (Shard of alliage inconnu). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Fragment d'alliage inconnu). Utilisable dans l'environnement."
  },
  "fragment de carapace noire": {
    "en": "Shard of carapace noire",
    "fr": "Fragment de carapace noire",
    "utilityEn": "Exploration item (Shard of carapace noire). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Fragment de carapace noire). Utilisable dans l'environnement."
  },
  "shard of carapace noire": {
    "en": "Shard of carapace noire",
    "fr": "Fragment de carapace noire",
    "utilityEn": "Exploration item (Shard of carapace noire). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Fragment de carapace noire). Utilisable dans l'environnement."
  },
  "fragment de cristal resonnant": {
    "en": "Shard of cristal résonnant",
    "fr": "Fragment de cristal résonnant",
    "utilityEn": "Exploration item (Shard of cristal résonnant). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Fragment de cristal résonnant). Utilisable dans l'environnement."
  },
  "shard of cristal resonnant": {
    "en": "Shard of cristal résonnant",
    "fr": "Fragment de cristal résonnant",
    "utilityEn": "Exploration item (Shard of cristal résonnant). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Fragment de cristal résonnant). Utilisable dans l'environnement."
  },
  "fragment de mot de passe": {
    "en": "Shard of mot de passe",
    "fr": "Fragment de mot de passe",
    "utilityEn": "Exploration item (Shard of mot de passe). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Fragment de mot de passe). Utilisable dans l'environnement."
  },
  "shard of mot de passe": {
    "en": "Shard of mot de passe",
    "fr": "Fragment de mot de passe",
    "utilityEn": "Exploration item (Shard of mot de passe). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Fragment de mot de passe). Utilisable dans l'environnement."
  },
  "fragment de memoire corrompu": {
    "en": "Shard of mémoire corrompu",
    "fr": "Fragment de mémoire corrompu",
    "utilityEn": "Exploration item (Shard of mémoire corrompu). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Fragment de mémoire corrompu). Utilisable dans l'environnement."
  },
  "shard of memoire corrompu": {
    "en": "Shard of mémoire corrompu",
    "fr": "Fragment de mémoire corrompu",
    "utilityEn": "Exploration item (Shard of mémoire corrompu). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Fragment de mémoire corrompu). Utilisable dans l'environnement."
  },
  "fragment de traumatisme": {
    "en": "Shard of traumatisme",
    "fr": "Fragment de traumatisme",
    "utilityEn": "Exploration item (Shard of traumatisme). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Fragment de traumatisme). Utilisable dans l'environnement."
  },
  "shard of traumatisme": {
    "en": "Shard of traumatisme",
    "fr": "Fragment de traumatisme",
    "utilityEn": "Exploration item (Shard of traumatisme). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Fragment de traumatisme). Utilisable dans l'environnement."
  },
  "fragment de virus trojan": {
    "en": "Shard of virus Trojan",
    "fr": "Fragment de virus Trojan",
    "utilityEn": "Exploration item (Shard of virus Trojan). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Fragment de virus Trojan). Utilisable dans l'environnement."
  },
  "shard of virus trojan": {
    "en": "Shard of virus Trojan",
    "fr": "Fragment de virus Trojan",
    "utilityEn": "Exploration item (Shard of virus Trojan). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Fragment de virus Trojan). Utilisable dans l'environnement."
  },
  "fusible thermique": {
    "en": "Fusible thermique",
    "fr": "Fusible thermique",
    "utilityEn": "Exploration item (Fusible thermique). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Fusible thermique). Utilisable dans l'environnement."
  },
  "fusee de signalisation haute altitude": {
    "en": "Flare de signalisation haute altitude",
    "fr": "Fusée de signalisation haute altitude",
    "utilityEn": "Exploration item (Flare de signalisation haute altitude). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Fusée de signalisation haute altitude). Utilisable dans l'environnement."
  },
  "flare de signalisation haute altitude": {
    "en": "Flare de signalisation haute altitude",
    "fr": "Fusée de signalisation haute altitude",
    "utilityEn": "Exploration item (Flare de signalisation haute altitude). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Fusée de signalisation haute altitude). Utilisable dans l'environnement."
  },
  "gas mask (damaged)": {
    "en": "Gas Mask (Damaged)",
    "fr": "Gas Masque (Damaged)",
    "utilityEn": "Exploration item (Gas Mask (Damaged)). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Gas Masque (Damaged)). Utilisable dans l'environnement."
  },
  "gas masque (damaged)": {
    "en": "Gas Mask (Damaged)",
    "fr": "Gas Masque (Damaged)",
    "utilityEn": "Exploration item (Gas Mask (Damaged)). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Gas Masque (Damaged)). Utilisable dans l'environnement."
  },
  "glass pipette": {
    "en": "Glass Pipette",
    "fr": "Glass Pipette",
    "utilityEn": "Exploration item (Glass Pipette). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Glass Pipette). Utilisable dans l'environnement."
  },
  "glowing quartz dust": {
    "en": "Glowing Quartz Dust",
    "fr": "Glowing Quartz Poussière",
    "utilityEn": "Exploration item (Glowing Quartz Dust). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Glowing Quartz Poussière). Utilisable dans l'environnement."
  },
  "glowing quartz poussiere": {
    "en": "Glowing Quartz Dust",
    "fr": "Glowing Quartz Poussière",
    "utilityEn": "Exploration item (Glowing Quartz Dust). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Glowing Quartz Poussière). Utilisable dans l'environnement."
  },
  "graduated test tube": {
    "en": "Graduated Test Tube",
    "fr": "Graduated Test Tube",
    "utilityEn": "Exploration item (Graduated Test Tube). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Graduated Test Tube). Utilisable dans l'environnement."
  },
  "grain de sable holographique": {
    "en": "Grain de sable holographique",
    "fr": "Grain de sable holographique",
    "utilityEn": "Exploration item (Grain de sable holographique). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Grain de sable holographique). Utilisable dans l'environnement."
  },
  "grappin a trois branches": {
    "en": "Grappling Hook à trois branches",
    "fr": "Grappin à trois branches",
    "utilityEn": "Exploration item (Grappling Hook à trois branches). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Grappin à trois branches). Utilisable dans l'environnement."
  },
  "grappling hook a trois branches": {
    "en": "Grappling Hook à trois branches",
    "fr": "Grappin à trois branches",
    "utilityEn": "Exploration item (Grappling Hook à trois branches). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Grappin à trois branches). Utilisable dans l'environnement."
  },
  "greasy rag": {
    "en": "Greasy Rag",
    "fr": "Greasy Chiffon",
    "utilityEn": "Exploration item (Greasy Rag). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Greasy Chiffon). Utilisable dans l'environnement."
  },
  "greasy chiffon": {
    "en": "Greasy Rag",
    "fr": "Greasy Chiffon",
    "utilityEn": "Exploration item (Greasy Rag). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Greasy Chiffon). Utilisable dans l'environnement."
  },
  "grimoire aux reliures en peau": {
    "en": "Grimoire aux reliures en peau",
    "fr": "Grimoire aux reliures en peau",
    "utilityEn": "Exploration item (Grimoire aux reliures en peau). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Grimoire aux reliures en peau). Utilisable dans l'environnement."
  },
  "generateur de champ de force alien": {
    "en": "Generator de champ de force alien",
    "fr": "Générateur de champ de force alien",
    "utilityEn": "Exploration item (Generator de champ de force alien). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Générateur de champ de force alien). Utilisable dans l'environnement."
  },
  "generator de champ de force alien": {
    "en": "Generator de champ de force alien",
    "fr": "Générateur de champ de force alien",
    "utilityEn": "Exploration item (Generator de champ de force alien). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Générateur de champ de force alien). Utilisable dans l'environnement."
  },
  "heavy sandstone rock": {
    "en": "Heavy Sandstone Rock",
    "fr": "Heavy Sandstone Roche",
    "utilityEn": "Exploration item (Heavy Sandstone Rock). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Heavy Sandstone Roche). Utilisable dans l'environnement."
  },
  "heavy sandstone roche": {
    "en": "Heavy Sandstone Rock",
    "fr": "Heavy Sandstone Roche",
    "utilityEn": "Exploration item (Heavy Sandstone Rock). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Heavy Sandstone Roche). Utilisable dans l'environnement."
  },
  "huile a lampe en flacon": {
    "en": "Huile à lampe en flacon",
    "fr": "Huile à lampe en flacon",
    "utilityEn": "Exploration item (Huile à lampe en flacon). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Huile à lampe en flacon). Utilisable dans l'environnement."
  },
  "image dun parasol en fil de fer": {
    "en": "Image d'un parasol en fil de fer",
    "fr": "Image d'un parasol en fil de fer",
    "utilityEn": "Exploration item (Image d'un parasol en fil de fer). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Image d'un parasol en fil de fer). Utilisable dans l'environnement."
  },
  "inactive dynamite stick": {
    "en": "Inactive Dynamite Stick",
    "fr": "Inactive Dynamite Stick",
    "utilityEn": "Exploration item (Inactive Dynamite Stick). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Inactive Dynamite Stick). Utilisable dans l'environnement."
  },
  "inkless quill": {
    "en": "Inkless Quill",
    "fr": "Inkless Quill",
    "utilityEn": "Exploration item (Inkless Quill). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Inkless Quill). Utilisable dans l'environnement."
  },
  "inverseur de signal not": {
    "en": "Inverseur de signal NOT",
    "fr": "Inverseur de signal NOT",
    "utilityEn": "Exploration item (Inverseur de signal NOT). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Inverseur de signal NOT). Utilisable dans l'environnement."
  },
  "journal final de linvocation": {
    "en": "Journal final de l'invocation",
    "fr": "Journal final de l'invocation",
    "utilityEn": "Exploration item (Journal final de l'invocation). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Journal final de l'invocation). Utilisable dans l'environnement."
  },
  "journal intime de lheritiere": {
    "en": "Diary de l'héritière",
    "fr": "Journal intime de l'héritière",
    "utilityEn": "Exploration item (Diary de l'héritière). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Journal intime de l'héritière). Utilisable dans l'environnement."
  },
  "diary de lheritiere": {
    "en": "Diary de l'héritière",
    "fr": "Journal intime de l'héritière",
    "utilityEn": "Exploration item (Diary de l'héritière). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Journal intime de l'héritière). Utilisable dans l'environnement."
  },
  "jumelles de visee rayees": {
    "en": "Binoculars de visée rayées",
    "fr": "Jumelles de visée rayées",
    "utilityEn": "Exploration item (Binoculars de visée rayées). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Jumelles de visée rayées). Utilisable dans l'environnement."
  },
  "binoculars de visee rayees": {
    "en": "Binoculars de visée rayées",
    "fr": "Jumelles de visée rayées",
    "utilityEn": "Exploration item (Binoculars de visée rayées). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Jumelles de visée rayées). Utilisable dans l'environnement."
  },
  "keyless padlock": {
    "en": "Keyless Padlock",
    "fr": "Keyless Padlock",
    "utilityEn": "Exploration item (Keyless Padlock). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Keyless Padlock). Utilisable dans l'environnement."
  },
  "kit de couture militaire": {
    "en": "Kit de couture militaire",
    "fr": "Kit de couture militaire",
    "utilityEn": "Exploration item (Kit de couture militaire). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Kit de couture militaire). Utilisable dans l'environnement."
  },
  "kit de reparation de combinaison": {
    "en": "Kit de réparation de combinaison",
    "fr": "Kit de réparation de combinaison",
    "utilityEn": "Exploration item (Kit de réparation de combinaison). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Kit de réparation de combinaison). Utilisable dans l'environnement."
  },
  "lampe torche a pile": {
    "en": "Lamp torche à pile",
    "fr": "Lampe torche à pile",
    "utilityEn": "Exploration item (Lamp torche à pile). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Lampe torche à pile). Utilisable dans l'environnement."
  },
  "lamp torche a pile": {
    "en": "Lamp torche à pile",
    "fr": "Lampe torche à pile",
    "utilityEn": "Exploration item (Lamp torche à pile). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Lampe torche à pile). Utilisable dans l'environnement."
  },
  "lanterne en laiton lourde": {
    "en": "Lantern en laiton lourde",
    "fr": "Lanterne en laiton lourde",
    "utilityEn": "Exploration item (Lantern en laiton lourde). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Lanterne en laiton lourde). Utilisable dans l'environnement."
  },
  "lantern en laiton lourde": {
    "en": "Lantern en laiton lourde",
    "fr": "Lanterne en laiton lourde",
    "utilityEn": "Exploration item (Lantern en laiton lourde). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Lanterne en laiton lourde). Utilisable dans l'environnement."
  },
  "lentille de focalisation brute": {
    "en": "Lentille de focalisation brute",
    "fr": "Lentille de focalisation brute",
    "utilityEn": "Exploration item (Lentille de focalisation brute). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Lentille de focalisation brute). Utilisable dans l'environnement."
  },
  "lettre de chantage ecornee": {
    "en": "Lettre de chantage écornée",
    "fr": "Lettre de chantage écornée",
    "utilityEn": "Exploration item (Lettre de chantage écornée). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Lettre de chantage écornée). Utilisable dans l'environnement."
  },
  "liane gluante": {
    "en": "Vine gluante",
    "fr": "Liane gluante",
    "utilityEn": "Exploration item (Vine gluante). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Liane gluante). Utilisable dans l'environnement."
  },
  "vine gluante": {
    "en": "Vine gluante",
    "fr": "Liane gluante",
    "utilityEn": "Exploration item (Vine gluante). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Liane gluante). Utilisable dans l'environnement."
  },
  "litmus paper test": {
    "en": "Litmus Paper Test",
    "fr": "Litmus Paper Test",
    "utilityEn": "Exploration item (Litmus Paper Test). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Litmus Paper Test). Utilisable dans l'environnement."
  },
  "locked wooden box": {
    "en": "Locked Wooden Box",
    "fr": "Locked Wooden Box",
    "utilityEn": "Exploration item (Locked Wooden Box). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Locked Wooden Box). Utilisable dans l'environnement."
  },
  "log de sortie de session": {
    "en": "Log de sortie de session",
    "fr": "Log de sortie de session",
    "utilityEn": "Exploration item (Log de sortie de session). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Log de sortie de session). Utilisable dans l'environnement."
  },
  "longue vue en cuivre": {
    "en": "Spyglass en cuivre",
    "fr": "Longue-vue en cuivre",
    "utilityEn": "Exploration item (Spyglass en cuivre). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Longue-vue en cuivre). Utilisable dans l'environnement."
  },
  "spyglass en cuivre": {
    "en": "Spyglass en cuivre",
    "fr": "Longue-vue en cuivre",
    "utilityEn": "Exploration item (Spyglass en cuivre). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Longue-vue en cuivre). Utilisable dans l'environnement."
  },
  "loupe dexpertise": {
    "en": "Magnifier d'expertise",
    "fr": "Loupe d'expertise",
    "utilityEn": "Exploration item (Magnifier d'expertise). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Loupe d'expertise). Utilisable dans l'environnement."
  },
  "magnifier dexpertise": {
    "en": "Magnifier d'expertise",
    "fr": "Loupe d'expertise",
    "utilityEn": "Exploration item (Magnifier d'expertise). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Loupe d'expertise). Utilisable dans l'environnement."
  },
  "lunettes de protection uv": {
    "en": "Goggles de protection UV",
    "fr": "Lunettes de protection UV",
    "utilityEn": "Exploration item (Goggles de protection UV). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Lunettes de protection UV). Utilisable dans l'environnement."
  },
  "goggles de protection uv": {
    "en": "Goggles de protection UV",
    "fr": "Lunettes de protection UV",
    "utilityEn": "Exploration item (Goggles de protection UV). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Lunettes de protection UV). Utilisable dans l'environnement."
  },
  "manuel dinstructions durgence": {
    "en": "Manual d'instructions d'urgence",
    "fr": "Manuel d'instructions d'urgence",
    "utilityEn": "Exploration item (Manual d'instructions d'urgence). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Manuel d'instructions d'urgence). Utilisable dans l'environnement."
  },
  "manual dinstructions durgence": {
    "en": "Manual d'instructions d'urgence",
    "fr": "Manuel d'instructions d'urgence",
    "utilityEn": "Exploration item (Manual d'instructions d'urgence). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Manuel d'instructions d'urgence). Utilisable dans l'environnement."
  },
  "manuel de procedure de secours spatial": {
    "en": "Manual de procédure de secours spatial",
    "fr": "Manuel de procédure de secours spatial",
    "utilityEn": "Exploration item (Manual de procédure de secours spatial). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Manuel de procédure de secours spatial). Utilisable dans l'environnement."
  },
  "manual de procedure de secours spatial": {
    "en": "Manual de procédure de secours spatial",
    "fr": "Manuel de procédure de secours spatial",
    "utilityEn": "Exploration item (Manual de procédure de secours spatial). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Manuel de procédure de secours spatial). Utilisable dans l'environnement."
  },
  "manuscrit interdit": {
    "en": "Manuscrit interdit",
    "fr": "Manuscrit interdit",
    "utilityEn": "Exploration item (Manuscrit interdit). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Manuscrit interdit). Utilisable dans l'environnement."
  },
  "marque page en soie rouge": {
    "en": "Marque-page en soie rouge",
    "fr": "Marque-page en soie rouge",
    "utilityEn": "Exploration item (Marque-page en soie rouge). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Marque-page en soie rouge). Utilisable dans l'environnement."
  },
  "marteau de tonnelier": {
    "en": "Hammer de tonnelier",
    "fr": "Marteau de tonnelier",
    "utilityEn": "Exploration item (Hammer de tonnelier). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Marteau de tonnelier). Utilisable dans l'environnement."
  },
  "hammer de tonnelier": {
    "en": "Hammer de tonnelier",
    "fr": "Marteau de tonnelier",
    "utilityEn": "Exploration item (Hammer de tonnelier). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Marteau de tonnelier). Utilisable dans l'environnement."
  },
  "masque a gaz endommage": {
    "en": "Mask à gaz endommagé",
    "fr": "Masque à gaz endommagé",
    "utilityEn": "Exploration item (Mask à gaz endommagé). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Masque à gaz endommagé). Utilisable dans l'environnement."
  },
  "mask a gaz endommage": {
    "en": "Mask à gaz endommagé",
    "fr": "Masque à gaz endommagé",
    "utilityEn": "Exploration item (Mask à gaz endommagé). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Masque à gaz endommagé). Utilisable dans l'environnement."
  },
  "matches": {
    "en": "Matches",
    "fr": "Matches",
    "utilityEn": "Exploration item (Matches). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Matches). Utilisable dans l'environnement."
  },
  "matiere exothermique condensee": {
    "en": "Matière exothermique condensée",
    "fr": "Matière exothermique condensée",
    "utilityEn": "Exploration item (Matière exothermique condensée). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Matière exothermique condensée). Utilisable dans l'environnement."
  },
  "memory fragment": {
    "en": "Memory Fragment",
    "fr": "Memory Fragment",
    "utilityEn": "Exploration item (Memory Fragment). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Memory Fragment). Utilisable dans l'environnement."
  },
  "metal distress whistle": {
    "en": "Metal Distress Whistle",
    "fr": "Metal Distress Whistle",
    "utilityEn": "Exploration item (Metal Distress Whistle). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Metal Distress Whistle). Utilisable dans l'environnement."
  },
  "module radio casse": {
    "en": "Module radio cassé",
    "fr": "Module radio cassé",
    "utilityEn": "Exploration item (Module radio cassé). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Module radio cassé). Utilisable dans l'environnement."
  },
  "morceau de corail noir": {
    "en": "Piece of corail noir",
    "fr": "Morceau de corail noir",
    "utilityEn": "Exploration item (Piece of corail noir). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Morceau de corail noir). Utilisable dans l'environnement."
  },
  "piece of corail noir": {
    "en": "Piece of corail noir",
    "fr": "Morceau de corail noir",
    "utilityEn": "Exploration item (Piece of corail noir). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Morceau de corail noir). Utilisable dans l'environnement."
  },
  "morceau de corde mouillee par la mer": {
    "en": "Piece of corde mouillée par la mer",
    "fr": "Morceau de corde mouillée par la mer",
    "utilityEn": "Exploration item (Piece of corde mouillée par la mer). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Morceau de corde mouillée par la mer). Utilisable dans l'environnement."
  },
  "piece of corde mouillee par la mer": {
    "en": "Piece of corde mouillée par la mer",
    "fr": "Morceau de corde mouillée par la mer",
    "utilityEn": "Exploration item (Piece of corde mouillée par la mer). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Morceau de corde mouillée par la mer). Utilisable dans l'environnement."
  },
  "morceau de titane de carlingue": {
    "en": "Piece of titane de carlingue",
    "fr": "Morceau de titane de carlingue",
    "utilityEn": "Exploration item (Piece of titane de carlingue). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Morceau de titane de carlingue). Utilisable dans l'environnement."
  },
  "piece of titane de carlingue": {
    "en": "Piece of titane de carlingue",
    "fr": "Morceau de titane de carlingue",
    "utilityEn": "Exploration item (Piece of titane de carlingue). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Morceau de titane de carlingue). Utilisable dans l'environnement."
  },
  "morceau de velours sombre": {
    "en": "Piece of velours sombre",
    "fr": "Morceau de velours sombre",
    "utilityEn": "Exploration item (Piece of velours sombre). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Morceau de velours sombre). Utilisable dans l'environnement."
  },
  "piece of velours sombre": {
    "en": "Piece of velours sombre",
    "fr": "Morceau de velours sombre",
    "utilityEn": "Exploration item (Piece of velours sombre). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Morceau de velours sombre). Utilisable dans l'environnement."
  },
  "mousse de foret sechee": {
    "en": "Mousse de forêt séchée",
    "fr": "Mousse de forêt séchée",
    "utilityEn": "Exploration item (Mousse de forêt séchée). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Mousse de forêt séchée). Utilisable dans l'environnement."
  },
  "moustique geant sous resine": {
    "en": "Moustique géant sous résine",
    "fr": "Moustique géant sous résine",
    "utilityEn": "Exploration item (Moustique géant sous résine). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Moustique géant sous résine). Utilisable dans l'environnement."
  },
  "medaillon en or de lheritiere": {
    "en": "Médaillon en or de l'héritière",
    "fr": "Médaillon en or de l'héritière",
    "utilityEn": "Exploration item (Médaillon en or de l'héritière). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Médaillon en or de l'héritière). Utilisable dans l'environnement."
  },
  "notebook": {
    "en": "Notebook",
    "fr": "Notebook",
    "utilityEn": "Exploration item (Notebook). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Notebook). Utilisable dans l'environnement."
  },
  "noyau denergie extraterrestre brillant": {
    "en": "Kernel d'énergie extraterrestre brillant",
    "fr": "Noyau d'énergie extraterrestre brillant",
    "utilityEn": "Exploration item (Kernel d'énergie extraterrestre brillant). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Noyau d'énergie extraterrestre brillant). Utilisable dans l'environnement."
  },
  "kernel denergie extraterrestre brillant": {
    "en": "Kernel d'énergie extraterrestre brillant",
    "fr": "Noyau d'énergie extraterrestre brillant",
    "utilityEn": "Exploration item (Kernel d'énergie extraterrestre brillant). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Noyau d'énergie extraterrestre brillant). Utilisable dans l'environnement."
  },
  "octet de donnee instable": {
    "en": "Octet de donnée instable",
    "fr": "Octet de donnée instable",
    "utilityEn": "Exploration item (Octet de donnée instable). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Octet de donnée instable). Utilisable dans l'environnement."
  },
  "oil vial for mechanisms": {
    "en": "Oil Vial for Mechanisms",
    "fr": "Oil Flacon for Mechanisms",
    "utilityEn": "Exploration item (Oil Vial for Mechanisms). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Oil Flacon for Mechanisms). Utilisable dans l'environnement."
  },
  "oil flacon for mechanisms": {
    "en": "Oil Vial for Mechanisms",
    "fr": "Oil Flacon for Mechanisms",
    "utilityEn": "Exploration item (Oil Vial for Mechanisms). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Oil Flacon for Mechanisms). Utilisable dans l'environnement."
  },
  "oxidized iron arrow": {
    "en": "Oxidized Iron Arrow",
    "fr": "Oxidized Iron Arrow",
    "utilityEn": "Exploration item (Oxidized Iron Arrow). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Oxidized Iron Arrow). Utilisable dans l'environnement."
  },
  "oxygen tank": {
    "en": "Oxygen Tank",
    "fr": "Oxygen Tank",
    "utilityEn": "Exploration item (Oxygen Tank). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Oxygen Tank). Utilisable dans l'environnement."
  },
  "papier mache mask": {
    "en": "Papier-Mâché Mask",
    "fr": "Papier-Mâché Mask",
    "utilityEn": "Exploration item (Papier-Mâché Mask). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Papier-Mâché Mask). Utilisable dans l'environnement."
  },
  "paquet de rations de survie": {
    "en": "Paquet de rations de survie",
    "fr": "Paquet de rations de survie",
    "utilityEn": "Exploration item (Paquet de rations de survie). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Paquet de rations de survie). Utilisable dans l'environnement."
  },
  "parapluie a manche sculpte": {
    "en": "Parapluie à manche sculpté",
    "fr": "Parapluie à manche sculpté",
    "utilityEn": "Exploration item (Parapluie à manche sculpté). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Parapluie à manche sculpté). Utilisable dans l'environnement."
  },
  "patinated silver amulet": {
    "en": "Patinated Silver Amulet",
    "fr": "Patinated Silver Amulet",
    "utilityEn": "Exploration item (Patinated Silver Amulet). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Patinated Silver Amulet). Utilisable dans l'environnement."
  },
  "pheromone dinsecte concentree": {
    "en": "Pheromone d'insecte concentrée",
    "fr": "Pheromone d'insecte concentrée",
    "utilityEn": "Exploration item (Pheromone d'insecte concentrée). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Pheromone d'insecte concentrée). Utilisable dans l'environnement."
  },
  "photo numerique pixelisee": {
    "en": "Photo numérique pixélisée",
    "fr": "Photo numérique pixélisée",
    "utilityEn": "Exploration item (Photo numérique pixélisée). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Photo numérique pixélisée). Utilisable dans l'environnement."
  },
  "pierre cristalline bioluminescente": {
    "en": "Stone cristalline bioluminescente",
    "fr": "Pierre cristalline bioluminescente",
    "utilityEn": "Exploration item (Stone cristalline bioluminescente). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Pierre cristalline bioluminescente). Utilisable dans l'environnement."
  },
  "stone cristalline bioluminescente": {
    "en": "Stone cristalline bioluminescente",
    "fr": "Pierre cristalline bioluminescente",
    "utilityEn": "Exploration item (Stone cristalline bioluminescente). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Pierre cristalline bioluminescente). Utilisable dans l'environnement."
  },
  "pierre luminescente des profondeurs": {
    "en": "Stone luminescente des profondeurs",
    "fr": "Pierre luminescente des profondeurs",
    "utilityEn": "Exploration item (Stone luminescente des profondeurs). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Pierre luminescente des profondeurs). Utilisable dans l'environnement."
  },
  "stone luminescente des profondeurs": {
    "en": "Stone luminescente des profondeurs",
    "fr": "Pierre luminescente des profondeurs",
    "utilityEn": "Exploration item (Stone luminescente des profondeurs). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Pierre luminescente des profondeurs). Utilisable dans l'environnement."
  },
  "pierre rituelle gravee": {
    "en": "Stone rituelle gravée",
    "fr": "Pierre rituelle gravée",
    "utilityEn": "Exploration item (Stone rituelle gravée). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Pierre rituelle gravée). Utilisable dans l'environnement."
  },
  "stone rituelle gravee": {
    "en": "Stone rituelle gravée",
    "fr": "Pierre rituelle gravée",
    "utilityEn": "Exploration item (Stone rituelle gravée). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Pierre rituelle gravée). Utilisable dans l'environnement."
  },
  "pierre sculptee dune gargouille": {
    "en": "Stone sculptée d'une gargouille",
    "fr": "Pierre sculptée d'une gargouille",
    "utilityEn": "Exploration item (Stone sculptée d'une gargouille). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Pierre sculptée d'une gargouille). Utilisable dans l'environnement."
  },
  "stone sculptee dune gargouille": {
    "en": "Stone sculptée d'une gargouille",
    "fr": "Pierre sculptée d'une gargouille",
    "utilityEn": "Exploration item (Stone sculptée d'une gargouille). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Pierre sculptée d'une gargouille). Utilisable dans l'environnement."
  },
  "pierre volcanique poreuse": {
    "en": "Stone volcanique poreuse",
    "fr": "Pierre volcanique poreuse",
    "utilityEn": "Exploration item (Stone volcanique poreuse). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Pierre volcanique poreuse). Utilisable dans l'environnement."
  },
  "stone volcanique poreuse": {
    "en": "Stone volcanique poreuse",
    "fr": "Pierre volcanique poreuse",
    "utilityEn": "Exploration item (Stone volcanique poreuse). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Pierre volcanique poreuse). Utilisable dans l'environnement."
  },
  "planche en chene mouillee": {
    "en": "Plank en chêne mouillée",
    "fr": "Planche en chêne mouillée",
    "utilityEn": "Exploration item (Plank en chêne mouillée). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Planche en chêne mouillée). Utilisable dans l'environnement."
  },
  "plank en chene mouillee": {
    "en": "Plank en chêne mouillée",
    "fr": "Planche en chêne mouillée",
    "utilityEn": "Exploration item (Plank en chêne mouillée). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Planche en chêne mouillée). Utilisable dans l'environnement."
  },
  "plaque de tole percee": {
    "en": "Plating de tôle percée",
    "fr": "Plaque de tôle percée",
    "utilityEn": "Exploration item (Plating de tôle percée). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Plaque de tôle percée). Utilisable dans l'environnement."
  },
  "plating de tole percee": {
    "en": "Plating de tôle percée",
    "fr": "Plaque de tôle percée",
    "utilityEn": "Exploration item (Plating de tôle percée). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Plaque de tôle percée). Utilisable dans l'environnement."
  },
  "plasma torch": {
    "en": "Plasma Torch",
    "fr": "Plasma Torch",
    "utilityEn": "Exploration item (Plasma Torch). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Plasma Torch). Utilisable dans l'environnement."
  },
  "pocket compass": {
    "en": "Pocket Compass",
    "fr": "Pocket Boussole",
    "utilityEn": "Exploration item (Pocket Compass). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Pocket Boussole). Utilisable dans l'environnement."
  },
  "pocket boussole": {
    "en": "Pocket Compass",
    "fr": "Pocket Boussole",
    "utilityEn": "Exploration item (Pocket Compass). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Pocket Boussole). Utilisable dans l'environnement."
  },
  "pointeur memoire nul (null)": {
    "en": "Pointer mémoire nul (NULL)",
    "fr": "Pointeur mémoire nul (NULL)",
    "utilityEn": "Exploration item (Pointer mémoire nul (NULL)). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Pointeur mémoire nul (NULL)). Utilisable dans l'environnement."
  },
  "pointer memoire nul (null)": {
    "en": "Pointer mémoire nul (NULL)",
    "fr": "Pointeur mémoire nul (NULL)",
    "utilityEn": "Exploration item (Pointer mémoire nul (NULL)). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Pointeur mémoire nul (NULL)). Utilisable dans l'environnement."
  },
  "poudre dos broyes": {
    "en": "Powder d'os broyés",
    "fr": "Poudre d'os broyés",
    "utilityEn": "Exploration item (Powder d'os broyés). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Poudre d'os broyés). Utilisable dans l'environnement."
  },
  "powder dos broyes": {
    "en": "Powder d'os broyés",
    "fr": "Poudre d'os broyés",
    "utilityEn": "Exploration item (Powder d'os broyés). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Poudre d'os broyés). Utilisable dans l'environnement."
  },
  "poussiere de cristal energetique": {
    "en": "Dust de cristal énergétique",
    "fr": "Poussière de cristal énergétique",
    "utilityEn": "Exploration item (Dust de cristal énergétique). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Poussière de cristal énergétique). Utilisable dans l'environnement."
  },
  "dust de cristal energetique": {
    "en": "Dust de cristal énergétique",
    "fr": "Poussière de cristal énergétique",
    "utilityEn": "Exploration item (Dust de cristal énergétique). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Poussière de cristal énergétique). Utilisable dans l'environnement."
  },
  "poussiere de spore hallucinogene": {
    "en": "Dust de spore hallucinogène",
    "fr": "Poussière de spore hallucinogène",
    "utilityEn": "Exploration item (Dust de spore hallucinogène). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Poussière de spore hallucinogène). Utilisable dans l'environnement."
  },
  "dust de spore hallucinogene": {
    "en": "Dust de spore hallucinogène",
    "fr": "Poussière de spore hallucinogène",
    "utilityEn": "Exploration item (Dust de spore hallucinogène). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Poussière de spore hallucinogène). Utilisable dans l'environnement."
  },
  "programme dinjection sql": {
    "en": "Program d'injection SQL",
    "fr": "Programme d'injection SQL",
    "utilityEn": "Exploration item (Program d'injection SQL). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Programme d'injection SQL). Utilisable dans l'environnement."
  },
  "program dinjection sql": {
    "en": "Program d'injection SQL",
    "fr": "Programme d'injection SQL",
    "utilityEn": "Exploration item (Program d'injection SQL). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Programme d'injection SQL). Utilisable dans l'environnement."
  },
  "puce denergie ancienne dechargee": {
    "en": "Chip d'énergie ancienne déchargée",
    "fr": "Puce d'énergie ancienne déchargée",
    "utilityEn": "Exploration item (Chip d'énergie ancienne déchargée). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Puce d'énergie ancienne déchargée). Utilisable dans l'environnement."
  },
  "chip denergie ancienne dechargee": {
    "en": "Chip d'énergie ancienne déchargée",
    "fr": "Puce d'énergie ancienne déchargée",
    "utilityEn": "Exploration item (Chip d'énergie ancienne déchargée). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Puce d'énergie ancienne déchargée). Utilisable dans l'environnement."
  },
  "puce de pont reseau": {
    "en": "Chip de pont réseau",
    "fr": "Puce de pont réseau",
    "utilityEn": "Exploration item (Chip de pont réseau). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Puce de pont réseau). Utilisable dans l'environnement."
  },
  "chip de pont reseau": {
    "en": "Chip de pont réseau",
    "fr": "Puce de pont réseau",
    "utilityEn": "Exploration item (Chip de pont réseau). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Puce de pont réseau). Utilisable dans l'environnement."
  },
  "punctured rubber boot": {
    "en": "Punctured Rubber Boot",
    "fr": "Punctured Rubber Botte",
    "utilityEn": "Exploration item (Punctured Rubber Boot). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Punctured Rubber Botte). Utilisable dans l'environnement."
  },
  "punctured rubber botte": {
    "en": "Punctured Rubber Boot",
    "fr": "Punctured Rubber Botte",
    "utilityEn": "Exploration item (Punctured Rubber Boot). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Punctured Rubber Botte). Utilisable dans l'environnement."
  },
  "racine fongique elastique": {
    "en": "Root fongique élastique",
    "fr": "Racine fongique élastique",
    "utilityEn": "Exploration item (Root fongique élastique). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Racine fongique élastique). Utilisable dans l'environnement."
  },
  "root fongique elastique": {
    "en": "Root fongique élastique",
    "fr": "Racine fongique élastique",
    "utilityEn": "Exploration item (Root fongique élastique). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Racine fongique élastique). Utilisable dans l'environnement."
  },
  "rations pack": {
    "en": "Rations Pack",
    "fr": "Rations Pack",
    "utilityEn": "Exploration item (Rations Pack). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Rations Pack). Utilisable dans l'environnement."
  },
  "raw quartz stone": {
    "en": "Raw Quartz Stone",
    "fr": "Raw Quartz Pierre",
    "utilityEn": "Exploration item (Raw Quartz Stone). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Raw Quartz Pierre). Utilisable dans l'environnement."
  },
  "raw quartz pierre": {
    "en": "Raw Quartz Stone",
    "fr": "Raw Quartz Pierre",
    "utilityEn": "Exploration item (Raw Quartz Stone). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Raw Quartz Pierre). Utilisable dans l'environnement."
  },
  "red marking chalk": {
    "en": "Red Marking Chalk",
    "fr": "Red Marking Chalk",
    "utilityEn": "Exploration item (Red Marking Chalk). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Red Marking Chalk). Utilisable dans l'environnement."
  },
  "registre de memoire 8 bit": {
    "en": "Register de mémoire 8-bit",
    "fr": "Registre de mémoire 8-bit",
    "utilityEn": "Exploration item (Register de mémoire 8-bit). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Registre de mémoire 8-bit). Utilisable dans l'environnement."
  },
  "register de memoire 8 bit": {
    "en": "Register de mémoire 8-bit",
    "fr": "Registre de mémoire 8-bit",
    "utilityEn": "Exploration item (Register de mémoire 8-bit). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Registre de mémoire 8-bit). Utilisable dans l'environnement."
  },
  "relique occulte activee": {
    "en": "Relique occulte activée",
    "fr": "Relique occulte activée",
    "utilityEn": "Exploration item (Relique occulte activée). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Relique occulte activée). Utilisable dans l'environnement."
  },
  "rubber hose": {
    "en": "Rubber Hose",
    "fr": "Rubber Hose",
    "utilityEn": "Exploration item (Rubber Hose). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Rubber Hose). Utilisable dans l'environnement."
  },
  "reservoir doxygene durgence": {
    "en": "Réservoir d'oxygène d'urgence",
    "fr": "Réservoir d'oxygène d'urgence",
    "utilityEn": "Exploration item (Réservoir d'oxygène d'urgence). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Réservoir d'oxygène d'urgence). Utilisable dans l'environnement."
  },
  "resine darbre inflammable": {
    "en": "Resin d'arbre inflammable",
    "fr": "Résine d'arbre inflammable",
    "utilityEn": "Exploration item (Resin d'arbre inflammable). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Résine d'arbre inflammable). Utilisable dans l'environnement."
  },
  "resin darbre inflammable": {
    "en": "Resin d'arbre inflammable",
    "fr": "Résine d'arbre inflammable",
    "utilityEn": "Exploration item (Resin d'arbre inflammable). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Résine d'arbre inflammable). Utilisable dans l'environnement."
  },
  "sauvegarde systeme complete": {
    "en": "Sauvegarde système complète",
    "fr": "Sauvegarde système complète",
    "utilityEn": "Exploration item (Sauvegarde système complète). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Sauvegarde système complète). Utilisable dans l'environnement."
  },
  "scanner geologique portable": {
    "en": "Scanner géologique portable",
    "fr": "Scanner géologique portable",
    "utilityEn": "Exploration item (Scanner géologique portable). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Scanner géologique portable). Utilisable dans l'environnement."
  },
  "sceau de cire de la famille": {
    "en": "Sceau de cire de la famille",
    "fr": "Sceau de cire de la famille",
    "utilityEn": "Exploration item (Sceau de cire de la famille). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Sceau de cire de la famille). Utilisable dans l'environnement."
  },
  "schema grave sur stele": {
    "en": "Schéma gravé sur stèle",
    "fr": "Schéma gravé sur stèle",
    "utilityEn": "Exploration item (Schéma gravé sur stèle). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Schéma gravé sur stèle). Utilisable dans l'environnement."
  },
  "script doptimisation (.bat)": {
    "en": "Script d'optimisation (.BAT)",
    "fr": "Script d'optimisation (.BAT)",
    "utilityEn": "Exploration item (Script d'optimisation (.BAT)). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Script d'optimisation (.BAT)). Utilisable dans l'environnement."
  },
  "script de recuperation": {
    "en": "Script de récupération",
    "fr": "Script de récupération",
    "utilityEn": "Exploration item (Script de récupération). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Script de récupération). Utilisable dans l'environnement."
  },
  "segment de code mort": {
    "en": "Segment de code mort",
    "fr": "Segment de code mort",
    "utilityEn": "Exploration item (Segment de code mort). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Segment de code mort). Utilisable dans l'environnement."
  },
  "serviette brodee darmoiries": {
    "en": "Serviette brodée d'armoiries",
    "fr": "Serviette brodée d'armoiries",
    "utilityEn": "Exploration item (Serviette brodée d'armoiries). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Serviette brodée d'armoiries). Utilisable dans l'environnement."
  },
  "sharp mirror shard": {
    "en": "Sharp Mirror Shard",
    "fr": "Sharp Mirror Shard",
    "utilityEn": "Exploration item (Sharp Mirror Shard). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Sharp Mirror Shard). Utilisable dans l'environnement."
  },
  "sonde de vibration thermique": {
    "en": "Probe de vibration thermique",
    "fr": "Sonde de vibration thermique",
    "utilityEn": "Exploration item (Probe de vibration thermique). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Sonde de vibration thermique). Utilisable dans l'environnement."
  },
  "probe de vibration thermique": {
    "en": "Probe de vibration thermique",
    "fr": "Sonde de vibration thermique",
    "utilityEn": "Exploration item (Probe de vibration thermique). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Sonde de vibration thermique). Utilisable dans l'environnement."
  },
  "sphere de memoire visuelle": {
    "en": "Sphère de mémoire visuelle",
    "fr": "Sphère de mémoire visuelle",
    "utilityEn": "Exploration item (Sphère de mémoire visuelle). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Sphère de mémoire visuelle). Utilisable dans l'environnement."
  },
  "stack of counterfeit bills": {
    "en": "Stack of Counterfeit Bills",
    "fr": "Stack of Counterfeit Bills",
    "utilityEn": "Exploration item (Stack of Counterfeit Bills). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Stack of Counterfeit Bills). Utilisable dans l'environnement."
  },
  "substance visqueuse inconnue": {
    "en": "Substance visqueuse inconnue",
    "fr": "Substance visqueuse inconnue",
    "utilityEn": "Exploration item (Substance visqueuse inconnue). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Substance visqueuse inconnue). Utilisable dans l'environnement."
  },
  "suit repair kit": {
    "en": "Suit Repair Kit",
    "fr": "Suit Repair Kit",
    "utilityEn": "Exploration item (Suit Repair Kit). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Suit Repair Kit). Utilisable dans l'environnement."
  },
  "surchargement memoire (ram)": {
    "en": "Surchargement mémoire (RAM)",
    "fr": "Surchargement mémoire (RAM)",
    "utilityEn": "Exploration item (Surchargement mémoire (RAM)). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Surchargement mémoire (RAM)). Utilisable dans l'environnement."
  },
  "tablette de donnees alien en pierre": {
    "en": "Tablet de données alien en pierre",
    "fr": "Tablette de données alien en pierre",
    "utilityEn": "Exploration item (Tablet de données alien en pierre). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Tablette de données alien en pierre). Utilisable dans l'environnement."
  },
  "tablet de donnees alien en pierre": {
    "en": "Tablet de données alien en pierre",
    "fr": "Tablette de données alien en pierre",
    "utilityEn": "Exploration item (Tablet de données alien en pierre). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Tablette de données alien en pierre). Utilisable dans l'environnement."
  },
  "testeur de frequence radio": {
    "en": "Tester de fréquence radio",
    "fr": "Testeur de fréquence radio",
    "utilityEn": "Exploration item (Tester de fréquence radio). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Testeur de fréquence radio). Utilisable dans l'environnement."
  },
  "tester de frequence radio": {
    "en": "Tester de fréquence radio",
    "fr": "Testeur de fréquence radio",
    "utilityEn": "Exploration item (Tester de fréquence radio). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Testeur de fréquence radio). Utilisable dans l'environnement."
  },
  "testeur de purete deau": {
    "en": "Tester de pureté d'eau",
    "fr": "Testeur de pureté d'eau",
    "utilityEn": "Exploration item (Tester de pureté d'eau). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Testeur de pureté d'eau). Utilisable dans l'environnement."
  },
  "tester de purete deau": {
    "en": "Tester de pureté d'eau",
    "fr": "Testeur de pureté d'eau",
    "utilityEn": "Exploration item (Tester de pureté d'eau). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Testeur de pureté d'eau). Utilisable dans l'environnement."
  },
  "threadbare blanket": {
    "en": "Threadbare Blanket",
    "fr": "Threadbare Blanket",
    "utilityEn": "Exploration item (Threadbare Blanket). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Threadbare Blanket). Utilisable dans l'environnement."
  },
  "tige de roseau resistante": {
    "en": "Stem de roseau résistante",
    "fr": "Tige de roseau résistante",
    "utilityEn": "Exploration item (Stem de roseau résistante). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Tige de roseau résistante). Utilisable dans l'environnement."
  },
  "stem de roseau resistante": {
    "en": "Stem de roseau résistante",
    "fr": "Tige de roseau résistante",
    "utilityEn": "Exploration item (Stem de roseau résistante). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Tige de roseau résistante). Utilisable dans l'environnement."
  },
  "tinted glasses": {
    "en": "Tinted Glasses",
    "fr": "Tinted Glasses",
    "utilityEn": "Exploration item (Tinted Glasses). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Tinted Glasses). Utilisable dans l'environnement."
  },
  "tire bouchon en acier": {
    "en": "Corkscrew en acier",
    "fr": "Tire-bouchon en acier",
    "utilityEn": "Exploration item (Corkscrew en acier). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Tire-bouchon en acier). Utilisable dans l'environnement."
  },
  "corkscrew en acier": {
    "en": "Corkscrew en acier",
    "fr": "Tire-bouchon en acier",
    "utilityEn": "Exploration item (Corkscrew en acier). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Tire-bouchon en acier). Utilisable dans l'environnement."
  },
  "tissu de coton imbibe deau": {
    "en": "Cloth de coton imbibé d'eau",
    "fr": "Tissu de coton imbibé d'eau",
    "utilityEn": "Exploration item (Cloth de coton imbibé d'eau). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Tissu de coton imbibé d'eau). Utilisable dans l'environnement."
  },
  "cloth de coton imbibe deau": {
    "en": "Cloth de coton imbibé d'eau",
    "fr": "Tissu de coton imbibé d'eau",
    "utilityEn": "Exploration item (Cloth de coton imbibé d'eau). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Tissu de coton imbibé d'eau). Utilisable dans l'environnement."
  },
  "toile de peinture dechiree": {
    "en": "Canvas de peinture déchirée",
    "fr": "Toile de peinture déchirée",
    "utilityEn": "Exploration item (Canvas de peinture déchirée). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Toile de peinture déchirée). Utilisable dans l'environnement."
  },
  "canvas de peinture dechiree": {
    "en": "Canvas de peinture déchirée",
    "fr": "Toile de peinture déchirée",
    "utilityEn": "Exploration item (Canvas de peinture déchirée). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Toile de peinture déchirée). Utilisable dans l'environnement."
  },
  "torn plastic gloves": {
    "en": "Torn Plastic Gloves",
    "fr": "Torn Plastic Gloves",
    "utilityEn": "Exploration item (Torn Plastic Gloves). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Torn Plastic Gloves). Utilisable dans l'environnement."
  },
  "trepied de fixation en alliage": {
    "en": "Tripod de fixation en alliage",
    "fr": "Trépied de fixation en alliage",
    "utilityEn": "Exploration item (Tripod de fixation en alliage). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Trépied de fixation en alliage). Utilisable dans l'environnement."
  },
  "tripod de fixation en alliage": {
    "en": "Tripod de fixation en alliage",
    "fr": "Trépied de fixation en alliage",
    "utilityEn": "Exploration item (Tripod de fixation en alliage). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Trépied de fixation en alliage). Utilisable dans l'environnement."
  },
  "tuyau daspiration flexible": {
    "en": "Tuyau d'aspiration flexible",
    "fr": "Tuyau d'aspiration flexible",
    "utilityEn": "Exploration item (Tuyau d'aspiration flexible). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Tuyau d'aspiration flexible). Utilisable dans l'environnement."
  },
  "verre a pied taille": {
    "en": "Verre à pied taillé",
    "fr": "Verre à pied taillé",
    "utilityEn": "Exploration item (Verre à pied taillé). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Verre à pied taillé). Utilisable dans l'environnement."
  },
  "veste tactique dechiree": {
    "en": "Vest tactique déchirée",
    "fr": "Veste tactique déchirée",
    "utilityEn": "Exploration item (Vest tactique déchirée). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Veste tactique déchirée). Utilisable dans l'environnement."
  },
  "vest tactique dechiree": {
    "en": "Vest tactique déchirée",
    "fr": "Veste tactique déchirée",
    "utilityEn": "Exploration item (Vest tactique déchirée). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Veste tactique déchirée). Utilisable dans l'environnement."
  },
  "voile de protection thermique": {
    "en": "Veil de protection thermique",
    "fr": "Voile de protection thermique",
    "utilityEn": "Exploration item (Veil de protection thermique). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Voile de protection thermique). Utilisable dans l'environnement."
  },
  "veil de protection thermique": {
    "en": "Veil de protection thermique",
    "fr": "Voile de protection thermique",
    "utilityEn": "Exploration item (Veil de protection thermique). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Voile de protection thermique). Utilisable dans l'environnement."
  },
  "water flask": {
    "en": "Water Flask",
    "fr": "Water Fiole",
    "utilityEn": "Exploration item (Water Flask). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Water Fiole). Utilisable dans l'environnement."
  },
  "water fiole": {
    "en": "Water Flask",
    "fr": "Water Fiole",
    "utilityEn": "Exploration item (Water Flask). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Water Fiole). Utilisable dans l'environnement."
  },
  "worn leather boot": {
    "en": "Worn Leather Boot",
    "fr": "Worn Leather Botte",
    "utilityEn": "Exploration item (Worn Leather Boot). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Worn Leather Botte). Utilisable dans l'environnement."
  },
  "worn leather botte": {
    "en": "Worn Leather Boot",
    "fr": "Worn Leather Botte",
    "utilityEn": "Exploration item (Worn Leather Boot). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Worn Leather Botte). Utilisable dans l'environnement."
  },
  "yellow sulfur powder": {
    "en": "Yellow Sulfur Powder",
    "fr": "Yellow Sulfur Powder",
    "utilityEn": "Exploration item (Yellow Sulfur Powder). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Yellow Sulfur Powder). Utilisable dans l'environnement."
  },
  "eau (a demi pleine)\",": {
    "en": "eau (à demi pleine)\",",
    "fr": "eau (à demi pleine)\",",
    "utilityEn": "Exploration item (eau (à demi pleine)\",). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (eau (à demi pleine)\",). Utilisable dans l'environnement."
  },
  "echantillon de boue toxique": {
    "en": "Sample de boue toxique",
    "fr": "Échantillon de boue toxique",
    "utilityEn": "Exploration item (Sample de boue toxique). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Échantillon de boue toxique). Utilisable dans l'environnement."
  },
  "sample de boue toxique": {
    "en": "Sample de boue toxique",
    "fr": "Échantillon de boue toxique",
    "utilityEn": "Exploration item (Sample de boue toxique). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Échantillon de boue toxique). Utilisable dans l'environnement."
  },
  "echantillon de roche extraterrestre": {
    "en": "Sample de roche extraterrestre",
    "fr": "Échantillon de roche extraterrestre",
    "utilityEn": "Exploration item (Sample de roche extraterrestre). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Échantillon de roche extraterrestre). Utilisable dans l'environnement."
  },
  "sample de roche extraterrestre": {
    "en": "Sample de roche extraterrestre",
    "fr": "Échantillon de roche extraterrestre",
    "utilityEn": "Exploration item (Sample de roche extraterrestre). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Échantillon de roche extraterrestre). Utilisable dans l'environnement."
  },
  "ecorce de bois dur": {
    "en": "Écorce de bois dur",
    "fr": "Écorce de bois dur",
    "utilityEn": "Exploration item (Écorce de bois dur). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Écorce de bois dur). Utilisable dans l'environnement."
  },
  "œil en verre poli": {
    "en": "Eye en verre poli",
    "fr": "Œil en verre poli",
    "utilityEn": "Exploration item (Eye en verre poli). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Œil en verre poli). Utilisable dans l'environnement."
  },
  "eye en verre poli": {
    "en": "Eye en verre poli",
    "fr": "Œil en verre poli",
    "utilityEn": "Exploration item (Eye en verre poli). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Œil en verre poli). Utilisable dans l'environnement."
  },
  "œuf de bete fongique": {
    "en": "Egg de bête fongique",
    "fr": "Œuf de bête fongique",
    "utilityEn": "Exploration item (Egg de bête fongique). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Œuf de bête fongique). Utilisable dans l'environnement."
  },
  "egg de bete fongique": {
    "en": "Egg de bête fongique",
    "fr": "Œuf de bête fongique",
    "utilityEn": "Exploration item (Egg de bête fongique). Can be used with the environment.",
    "utilityFr": "Objet d'exploration et d'interaction (Œuf de bête fongique). Utilisable dans l'environnement."
  }
};

// Normalization helper for insensitive and accent-agnostic lookups
export function normalizeItemKey(s: string): string {
  return (s || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/['’\-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Universal bilingual item translator.
 * Guaranteed to translate ANY item string between French and English.
 */
export function translateItem(item: string, targetLang: 'en' | 'fr'): string {
  if (!item || !item.trim()) return '';
  const key = normalizeItemKey(item);

  // 1. Direct dictionary match
  if (ITEM_DICTIONARY[key]) {
    return targetLang === 'fr' ? ITEM_DICTIONARY[key].fr : ITEM_DICTIONARY[key].en;
  }

  // 2. Substring & Keyword heuristic match
  if (targetLang === 'fr') {
    if (key.includes('tape') || key.includes('scotch') || key.includes('duct')) return 'Ruban adhésif blindé';
    if (key.includes('knife') || key.includes('dagger')) return 'Couteau de cuisine';
    if (key.includes('water') && key.includes('bottle')) return "Bouteille d'eau";
    if (key.includes('chips')) return 'Paquet de chips';
    if (key.includes('lighter')) return 'Briquet jetable';
    if (key.includes('phone')) return 'Téléphone portable';
    if (key.includes('first aid') || key.includes('medkit')) return 'Trousse de premiers soins';
    if (key.includes('disinfectant')) return 'Flacon de désinfectant';
    if (key.includes('rope')) return 'Corde';
    if (key.includes('pipe')) return 'Tuyau en métal';
    if (key.includes('branch')) return 'Branche de bois solide';
    if (key.includes('stone') || key.includes('rock')) return 'Pierre tranchante';
    if (key.includes('key')) return 'Clé';
    if (key.includes('hook')) return 'Crochet de boucherie';
    if (key.includes('battery')) return 'Pile';
    if (key.includes('gold')) return 'Lingot d\'or';
    if (key.includes('spear')) return 'Lance de fortune';
    if (key.includes('mask')) return 'Masque à gaz';
  } else {
    if (key.includes('ruban') || key.includes('adhesif') || key.includes('scotch')) return 'Armored Duct Tape';
    if (key.includes('couteau') || key.includes('dague')) return 'Kitchen Knife';
    if (key.includes('bouteille') && key.includes('eau')) return 'Water Bottle';
    if (key.includes('chips')) return 'Pack of Chips';
    if (key.includes('briquet')) return 'Cheap Lighter';
    if (key.includes('telephone')) return 'Phone';
    if (key.includes('trousse') || key.includes('soin') || key.includes('secours')) return 'First Aid Kit';
    if (key.includes('desinfectant')) return 'Disinfectant Bottle';
    if (key.includes('corde')) return 'Rope';
    if (key.includes('tuyau')) return 'Metal Pipe';
    if (key.includes('branche')) return 'Sturdy Wooden Branch';
    if (key.includes('pierre') || key.includes('caillou')) return 'Sharp Heavy Stone';
    if (key.includes('cle') || key.includes('clef')) return 'Key';
    if (key.includes('crochet')) return 'Meat Hook';
    if (key.includes('pile') || key.includes('batterie')) return 'Battery';
    if (key.includes('or') && key.includes('lingot')) return 'Gold Ingot';
    if (key.includes('lance')) return 'Improvised Spear';
    if (key.includes('masque')) return 'Gas Mask';
  }

  return item;
}

/**
 * Returns functional knowledge description for an item in the requested language.
 */
export function getItemUtility(item: string, lang: 'en' | 'fr'): string {
  const key = normalizeItemKey(item);
  if (ITEM_DICTIONARY[key]) {
    return lang === 'fr' ? ITEM_DICTIONARY[key].utilityFr : ITEM_DICTIONARY[key].utilityEn;
  }
  
  if (key.includes('tape') || key.includes('scotch') || key.includes('ruban') || key.includes('adhesif')) {
    return lang === 'fr'
      ? "Adhésif ultra-résistant. Sert à coller des objets, colmater des fuites d'air ou tuyaux, fixer des fils, ou assembler une lance en scotchant un couteau sur une branche ou un tuyau."
      : "Heavy-duty adhesive. Used for taping cracked pipes, sealing air leaks, binding tools, or crafting a spear with a knife and branch/pipe.";
  }
  if (key.includes('couteau') || key.includes('knife')) {
    return lang === 'fr'
      ? "Lame d'acier aiguisée. Sert à trancher cordes/tissus, tailler du bois, ouvrir des colis ou se défendre."
      : "Sharp steel blade. Useful for cutting cords/cloth, carving wood, opening containers, or melee defense.";
  }

  return lang === 'fr'
    ? 'Objet utilisable ou combinable avec l\'environnement.'
    : 'Usable item that can interact with the environment.';
}

/**
 * Formats the full player inventory with explicit utility functions for the AI engine.
 */
export function buildInventoryPromptContext(inventory: string[], lang: 'en' | 'fr'): string {
  if (!inventory || inventory.length === 0) {
    return lang === 'fr' ? '[Inventaire vide]' : '[Inventory empty]';
  }

  return inventory
    .map((it, idx) => {
      const localized = translateItem(it, lang);
      const utility = getItemUtility(it, lang);
      return `[Slot ${idx + 1}] "${localized}": ${utility}`;
    })
    .join('\n');
}
