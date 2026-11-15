/* Things you can point at. Each line: picture | Russian | how to say it | English.
   Used by the "Eta?" guessing mode and listed in Phrases under "Things". */
window.OBJECTS = [
["Food", `🍞|хлеб|khlyep|bread
🧀|сыр|syr|cheese
🧈|масло|MAS-la|butter
🥚|яйцо|yay-TSOH|egg
🍖|мясо|MYA-sa|meat
🐟|рыба|RY-ba|fish
🍗|курица|KOO-ree-tsa|chicken
🌭|сосиска|sa-SEES-ka|sausage
🥣|суп|soop|soup
🥗|салат|sa-LAT|salad
🥟|пельмени|peel-MYE-nee|dumplings
🥞|блины|blee-NY|thin pancakes
🍚|рис|rees|rice
🍝|макароны|ma-ka-ROH-ny|pasta
🍕|пицца|PEE-tsa|pizza
🥧|пирог|pee-ROK|pie
🍰|торт|tort|cake
🍪|печенье|pee-CHE-nye|cookies
🍬|конфета|kan-FYE-ta|candy
🍫|шоколад|sha-ka-LAT|chocolate
🍦|мороженое|ma-ROH-zhe-na-ye|ice cream
🍯|мёд|myot|honey
🧂|соль|sol|salt`],
["Vegetables and fruit", `🥔|картошка|kar-TOSH-ka|potato
🍅|помидор|pa-mee-DOR|tomato
🥒|огурец|a-goo-RYETS|cucumber
🥕|морковь|mar-KOF|carrot
🧅|лук|look|onion
🧄|чеснок|chees-NOK|garlic
🍄|гриб|greep|mushroom
🌽|кукуруза|koo-koo-ROO-za|corn
🍎|яблоко|YA-bla-ka|apple
🍐|груша|GROO-sha|pear
🍌|банан|ba-NAN|banana
🍊|апельсин|a-peel-SEEN|orange
🍋|лимон|lee-MON|lemon
🍇|виноград|vee-na-GRAT|grapes
🍓|клубника|kloob-NEE-ka|strawberry
🍒|вишня|VEESH-nya|cherry
🍑|персик|PYER-seek|peach
🍉|арбуз|ar-BOOS|watermelon
🍍|ананас|a-na-NAS|pineapple`],
["Drinks and the table", `🍵|чай|chai|tea
☕|кофе|KOH-fye|coffee
💧|вода|va-DA|water
🥛|молоко|ma-la-KOH|milk
🧃|сок|sok|juice
🍷|вино|vee-NOH|wine
🍺|пиво|PEE-va|beer
🥂|шампанское|sham-PAN-ska-ye|champagne
🧊|лёд|lyot|ice
🍽️|тарелка|ta-RYEL-ka|plate
🥄|ложка|LOZH-ka|spoon
🔪|нож|nosh|knife
🥤|стакан|sta-KAN|glass
🍾|бутылка|boo-TYL-ka|bottle`],
["The house: rooms", `🏠|дом|dom|house
🏢|квартира|kvar-TEE-ra|apartment
🍳🍽️🫖|кухня|KOOKH-nya|kitchen
🚿🛁🧼|ванная|VAN-na-ya|bathroom
🛏️🌙💤|спальня|SPAL-nya|bedroom
🛋️📺🖼️|гостиная|gas-TEE-na-ya|living room
🧥👞🔑|прихожая|pree-KHOH-zha-ya|entrance hall
🌳🌷🏡|сад|sat|garden
🚪|дверь|dvyer|door
🪟|окно|ak-NOH|window
🪜|лестница|LYES-nee-tsa|stairs / ladder
🛗|лифт|leeft|elevator`],
["House: kitchen", `svg:stove|плита|plee-TA|stove
svg:fridge|холодильник|kha-la-DEEL-neek|refrigerator
svg:microwave|микроволновка|meek-ra-val-NOF-ka|microwave
svg:sink|раковина|RA-ka-vee-na|sink
🚰|кран|kran|tap
svg:table|стол|stol|table
🪑|стул|stool|chair
🫖|чайник|CHAI-neek|kettle / teapot
🍲|кастрюля|kas-TRYOO-lya|pot
🍳|сковорода|ska-va-ra-DA|frying pan
🧽|губка|GOOP-ka|sponge
🗑️|мусорное ведро|MOO-sar-na-ye veed-ROH|trash can`],
["House: bathroom", `🚽|туалет|too-a-LYET|toilet
🚿|душ|doosh|shower
🛁|ванна|VAN-na|bathtub
🪞|зеркало|ZYER-ka-la|mirror
🧼|мыло|MY-la|soap
svg:towel|полотенце|pa-la-TYEN-tse|towel
🪥|зубная щётка|zoob-NA-ya SHCHOT-ka|toothbrush
🧴|шампунь|sham-POON|shampoo
🧻|туалетная бумага|too-a-LYET-na-ya boo-MA-ga|toilet paper
🪒|бритва|BREET-va|razor
svg:washer|стиральная машина|stee-RAL-na-ya ma-SHEE-na|washing machine
🪣|ведро|veed-ROH|bucket`],
["House: bedroom", `🛏️|кровать|kra-VAT|bed
svg:pillow|подушка|pa-DOOSH-ka|pillow
svg:wardrobe|шкаф|shkaf|wardrobe
💡|лампа|LAM-pa|lamp
🕰️|часы|chee-SY|clock
⏰|будильник|boo-DEEL-neek|alarm clock
🧸|игрушка|eeg-ROOSH-ka|toy
🧺|корзина|kar-ZEE-na|basket`],
["House: living room", `🛋️|диван|dee-VAN|sofa
svg:armchair|кресло|KRYES-la|armchair
📺|телевизор|tee-lee-VEE-zar|television
svg:carpet|ковёр|ka-VYOR|carpet
🖼️|картина|kar-TEE-na|painting
svg:shelf|полка|POL-ka|shelf
📚|книги|KNEE-gee|books
🕯️|свеча|svee-CHA|candle
🪴|растение|ras-TYE-nee-ye|plant
📻|радио|RA-dee-o|radio`],
["House: entrance and yard", `🔑|ключ|klyooch|key
svg:fence|забор|za-BOR|fence
svg:bench|скамейка|ska-MYEY-ka|bench
🧹|веник|VYE-neek|broom
🔥|огонь|a-GON|fire
🪵|дрова|dra-VA|firewood
🔦|фонарик|fa-NA-reek|flashlight`],
["Everyday things", `📱|телефон|tee-lee-FON|phone
💻|компьютер|kam-PYOO-ter|computer
📷|камера|KA-mee-ra|camera
📖|книга|KNEE-ga|book
✏️|карандаш|ka-ran-DASH|pencil
🖊️|ручка|ROOCH-ka|pen
📰|газета|ga-ZYE-ta|newspaper
✉️|письмо|pees-MOH|letter
💵|деньги|DYEN-gee|money
🎁|подарок|pa-DA-rak|gift
💐|цветы|tsvee-TY|flowers
🌹|роза|ROH-za|rose
👜|сумка|SOOM-ka|bag
🧳|чемодан|chee-ma-DAN|suitcase
☂️|зонт|zont|umbrella
👓|очки|ach-KEE|glasses
💍|кольцо|kal-TSOH|ring
🎈|шарик|SHA-reek|balloon
🎸|гитара|gee-TA-ra|guitar
⚽|мяч|myach|ball
♟️|шахматы|SHAKH-ma-ty|chess
🗺️|карта|KAR-ta|map
🔨|молоток|ma-la-TOK|hammer
✂️|ножницы|NOZH-nee-tsy|scissors
🎄|ёлка|YOL-ka|New Year tree
🪆|матрёшка|ma-TRYOSH-ka|nesting doll`],
["Clothes", `👕|футболка|foot-BOL-ka|T-shirt
👔|рубашка|roo-BASH-ka|shirt
👖|джинсы|JEEN-sy|jeans
🩳|шорты|SHOR-ty|shorts
👗|платье|PLA-tye|dress
🧥|пальто|pal-TOH|coat
🧦|носки|nas-KEE|socks
👟|кроссовки|kra-SOF-kee|sneakers
👞|ботинки|ba-TEEN-kee|shoes
👢|сапоги|sa-pa-GEE|boots
🩴|тапочки|TA-pach-kee|slippers
🧣|шарф|sharf|scarf
🧤|перчатки|peer-CHAT-kee|gloves
🧢|кепка|KYEP-ka|cap
🎩|шляпа|SHLYA-pa|hat`],
["Animals", `🐶|собака|sa-BA-ka|dog
🐱|кошка|KOSH-ka|cat
🐴|лошадь|LOH-shat|horse
🐮|корова|ka-ROH-va|cow
🐷|свинья|sveen-YA|pig
🐓|петух|pee-TOOKH|rooster
🦆|утка|OOT-ka|duck
🐦|птица|PTEE-tsa|bird
🐻|медведь|meed-VYET|bear
🐺|волк|volk|wolf
🦊|лиса|lee-SA|fox
🐰|заяц|ZA-yets|hare
🐭|мышь|mysh|mouse
🐸|лягушка|lee-GOOSH-ka|frog
🐢|черепаха|chee-ree-PA-kha|turtle
🐍|змея|zmee-YA|snake
🐝|пчела|pchee-LA|bee
🦋|бабочка|BA-bach-ka|butterfly
🐘|слон|slon|elephant
🦁|лев|lyef|lion
🐯|тигр|teegr|tiger
🐵|обезьяна|a-bee-ZYA-na|monkey`],
["Nature and weather", `☀️|солнце|SON-tse|sun
🌙|луна|loo-NA|moon
⭐|звезда|zvyez-DA|star
☁️|облако|OB-la-ka|cloud
🌧️|дождь|dozhd|rain
❄️|снег|snyek|snow
🌈|радуга|RA-doo-ga|rainbow
🌳|дерево|DYE-ree-va|tree
🌸|цветок|tsvee-TOK|flower
🏔️|гора|ga-RA|mountain
🌊|море|MOH-rye|sea
🏖️|пляж|plyash|beach`],
["Places and transport", `🚗|машина|ma-SHEE-na|car
🚕|такси|tak-SEE|taxi
🚌|автобус|af-TOH-boos|bus
🚆|поезд|POH-yest|train
🚇|метро|mee-TROH|subway
✈️|самолёт|sa-ma-LYOT|airplane
🚲|велосипед|vee-la-see-PYET|bicycle
🚢|корабль|ka-RABL|ship
🏪|магазин|ma-ga-ZEEN|store
🏥|больница|bal-NEE-tsa|hospital
🏫|школа|SHKOH-la|school
⛪|церковь|TSER-kaf|church
🏦|банк|bank|bank
🏨|гостиница|gas-TEE-nee-tsa|hotel
🌉|мост|most|bridge`],
["People and the body", `👶|ребёнок|ree-BYOH-nak|baby / child
👦|мальчик|MAL-cheek|boy
👧|девочка|DYE-vach-ka|girl
👨|мужчина|moo-SHCHEE-na|man
👩|женщина|ZHEN-shchee-na|woman
👵|бабушка|BA-boosh-ka|grandmother
👴|дедушка|DYE-doosh-ka|grandfather
👁️|глаз|glas|eye
👂|ухо|OO-kha|ear
👃|нос|nos|nose
👄|рот|rot|mouth
🦷|зуб|zoop|tooth
✋|рука|roo-KA|hand
🦶|нога|na-GA|foot / leg
❤️|сердце|SYER-tse|heart`],
["Colors", `🔴|красный|KRAS-ny|red
🔵|синий|SEE-nee|blue
🟢|зелёный|zee-LYOH-ny|green
🟡|жёлтый|ZHOL-ty|yellow
🟠|оранжевый|a-RAN-zhe-vy|orange
🟣|фиолетовый|fee-a-LYE-ta-vy|purple
🟤|коричневый|ka-REECH-nee-vy|brown
⚫|чёрный|CHOR-ny|black
⚪|белый|BYE-ly|white`]
];

/* Simple drawings for things that have no emoji. Drawn in the text color so they work in light and dark. */
window.ICONS = {
  stove: '<svg viewBox="0 0 64 64"><ellipse cx="22" cy="9" rx="7" ry="2.5"/><ellipse cx="42" cy="9" rx="7" ry="2.5"/><rect x="10" y="13" width="44" height="46" rx="4"/><path d="M10 25h44"/><circle cx="19" cy="19" r="1.6"/><circle cx="27" cy="19" r="1.6"/><circle cx="37" cy="19" r="1.6"/><circle cx="45" cy="19" r="1.6"/><rect x="16" y="31" width="32" height="22" rx="2"/><path d="M21 36h22"/></svg>',
  fridge: '<svg viewBox="0 0 64 64"><rect x="16" y="4" width="32" height="56" rx="4"/><path d="M16 24h32M22 11v8M22 30v12"/></svg>',
  microwave: '<svg viewBox="0 0 64 64"><rect x="5" y="16" width="54" height="32" rx="4"/><rect x="11" y="22" width="30" height="20" rx="2"/><circle cx="50" cy="26" r="2"/><circle cx="50" cy="34" r="2"/><path d="M47 42h6"/></svg>',
  sink: '<svg viewBox="0 0 64 64"><path d="M6 30h52v4a16 16 0 0 1-16 16H22A16 16 0 0 1 6 34z"/><path d="M32 30V16a6 6 0 0 1 12 0v4"/><path d="M20 24v6M16 24h8"/><circle cx="32" cy="40" r="1.6"/><path d="M26 50v8M38 50v8"/></svg>',
  table: '<svg viewBox="0 0 64 64"><rect x="6" y="20" width="52" height="7" rx="2"/><path d="M13 27v29M51 27v29"/></svg>',
  towel: '<svg viewBox="0 0 64 64"><path d="M6 12h52"/><circle cx="6" cy="12" r="1.5"/><circle cx="58" cy="12" r="1.5"/><path d="M18 12v40h28V12"/><path d="M18 40h28M18 45h28"/></svg>',
  washer: '<svg viewBox="0 0 64 64"><rect x="12" y="5" width="40" height="54" rx="4"/><path d="M12 17h40M38 11h8"/><circle cx="20" cy="11" r="1.8"/><circle cx="32" cy="38" r="13"/><circle cx="32" cy="38" r="8"/></svg>',
  pillow: '<svg viewBox="0 0 64 64"><path d="M9 22q23-8 46 0q5 10 0 20q-23 8-46 0q-5-10 0-20z"/><path d="M9 22l-3-3M55 22l3-3M9 42l-3 3M55 42l3 3"/><path d="M22 30q10-3 20 0"/></svg>',
  wardrobe: '<svg viewBox="0 0 64 64"><rect x="12" y="5" width="40" height="50" rx="2"/><path d="M32 5v50M16 55v5M48 55v5"/><circle cx="28" cy="31" r="1.5"/><circle cx="36" cy="31" r="1.5"/></svg>',
  armchair: '<svg viewBox="0 0 64 64"><path d="M18 30V18a8 8 0 0 1 8-8h12a8 8 0 0 1 8 8v12"/><rect x="8" y="27" width="11" height="22" rx="5"/><rect x="45" y="27" width="11" height="22" rx="5"/><rect x="19" y="33" width="26" height="14" rx="3"/><path d="M15 49v6M49 49v6"/></svg>',
  carpet: '<svg viewBox="0 0 64 64"><rect x="8" y="18" width="48" height="28" rx="2"/><rect x="15" y="25" width="34" height="14" rx="1"/><path d="M8 22H3M8 28H3M8 34H3M8 40H3M56 22h5M56 28h5M56 34h5M56 40h5"/><path d="M32 28l6 4l-6 4l-6-4z"/></svg>',
  shelf: '<svg viewBox="0 0 64 64"><rect x="11" y="5" width="42" height="54" rx="2"/><path d="M11 23h42M11 41h42"/><path d="M18 10v13M23 10v13M28 12v11M36 28v13M41 28v13M46 30v11M18 46v13M24 46v13"/></svg>',
  fence: '<svg viewBox="0 0 64 64"><path d="M8 56V22l5-7l5 7v34zM24 56V22l5-7l5 7v34zM40 56V22l5-7l5 7v34z"/><path d="M3 30h5M18 30h6M34 30h6M50 30h11M3 46h5M18 46h6M34 46h6M50 46h11"/></svg>',
  bench: '<svg viewBox="0 0 64 64"><path d="M8 20h48M8 27h48"/><rect x="6" y="34" width="52" height="5" rx="2"/><path d="M13 20v14M51 20v14M13 39v14M51 39v14"/></svg>'
};
