/* Short scripted conversations: every reply is one short phrase from the Phrases tab. Each line: T (her family speaks) or Y (your reply) | Russian | how to say it | English */
window.SCENES = [
["First hello", `T|Здравствуйте!|ZDRAST-vooy-tye|Hello!
Y|Здравствуйте!|ZDRAST-vooy-tye|Hello!
T|Как дела?|kak dee-LA|How are you?
Y|Хорошо, спасибо.|ha-ra-SHOH, spa-SEE-ba|Good, thank you.
T|Очень приятно.|OH-chen pree-YAHT-na|Nice to meet you.
Y|Очень приятно.|OH-chen pree-YAHT-na|Nice to meet you.
T|Проходите!|pra-kha-DEE-tye|Come in!
Y|Спасибо!|spa-SEE-ba|Thank you!`],
["Yes, please and no, thank you", `T|Хотите чаю?|kha-TEE-tye CHA-yoo|Would you like some tea?
Y|Да, пожалуйста.|da, pa-ZHAH-loos-ta|Yes, please.
T|С сахаром?|s SA-kha-ram|With sugar?
Y|Нет, спасибо.|nyet, spa-SEE-ba|No, thank you.
T|Хотите кофе?|kha-TEE-tye KOH-fye|Would you like coffee?
Y|Нет, спасибо.|nyet, spa-SEE-ba|No, thank you.
T|Ещё чаю?|ye-SHCHOH CHA-yoo|More tea?
Y|Да, пожалуйста.|da, pa-ZHAH-loos-ta|Yes, please.
T|Вкусно?|FKOOS-na|Is it tasty?
Y|Очень вкусно!|OH-chen FKOOS-na|Very tasty!`],
["Saying thank you", `T|Это вам.|EH-ta vam|This is for you.
Y|Спасибо!|spa-SEE-ba|Thank you!
T|Пожалуйста. Садитесь.|pa-ZHAH-loos-ta. sa-DEE-tyes|You're welcome. Sit down.
Y|Спасибо.|spa-SEE-ba|Thank you.
T|Вот чай.|vot chai|Here is the tea.
Y|Большое спасибо!|bal-SHOH-ye spa-SEE-ba|Thank you very much!
T|Не за что.|NYE-za-shta|Don't mention it.
Y|Вы очень добры.|vy OH-chen dab-RY|You are very kind.`],
["Your name and where you are from", `T|Как вас зовут?|kak vas za-VOOT|What is your name?
Y|Меня зовут …|mee-NYA za-VOOT …|My name is … (add your name)
T|Очень приятно!|OH-chen pree-YAHT-na|Nice to meet you!
Y|Очень приятно.|OH-chen pree-YAHT-na|Nice to meet you.
T|Откуда вы?|at-KOO-da vy|Where are you from?
Y|Я из Америки.|ya eez a-MYE-ree-kee|I'm from America.
T|Вы говорите по-русски?|vy ga-va-REE-tye pa-ROOS-kee|Do you speak Russian?
Y|Немного.|nee-MNOH-ga|A little.
T|Молодец!|ma-la-DYETS|Well done!
Y|Спасибо!|spa-SEE-ba|Thank you!`],
["Meeting everyone", `T|Это моя мама.|EH-ta ma-YA MA-ma|This is my mom.
Y|Очень приятно.|OH-chen pree-YAHT-na|Nice to meet you.
T|Это бабушка.|EH-ta BA-boosh-ka|This is grandmother.
Y|Здравствуйте!|ZDRAST-vooy-tye|Hello!
T|Это дедушка.|EH-ta DYE-doosh-ka|This is grandfather.
Y|Добрый вечер!|DOH-bry VYE-cher|Good evening!
T|Мы очень рады.|my OH-chen RA-dy|We are very glad.
Y|Спасибо за приглашение.|spa-SEE-ba za pree-gla-SHEH-nee-ye|Thank you for inviting me.`],
["Eating together", `T|Вы голодны?|vy GOH-lad-ny|Are you hungry?
Y|Да, немного.|da, nee-MNOH-ga|Yes, a little.
T|Приятного аппетита!|pree-YAHT-na-va a-pee-TEE-ta|Enjoy your meal!
Y|Спасибо!|spa-SEE-ba|Thank you!
T|Вкусно?|FKOOS-na|Is it tasty?
Y|Очень вкусно!|OH-chen FKOOS-na|Very tasty!
T|Ещё?|ye-SHCHOH|More?
Y|Да, пожалуйста.|da, pa-ZHAH-loos-ta|Yes, please.
T|Ещё?|ye-SHCHOH|More?
Y|Нет, спасибо.|nyet, spa-SEE-ba|No, thank you.
T|На здоровье!|na zda-ROH-vye|You're welcome! (what a host says when thanked for food)
Y|Спасибо за всё.|spa-SEE-ba za FSYOH|Thank you for everything.`],
["Kind words", `T|Вот наш дом.|vot nash dom|Here is our home.
Y|Очень красиво!|OH-chen kra-SEE-va|Very beautiful!
T|Это мой сад.|EH-ta moy sat|This is my garden.
Y|Как хорошо!|kak ha-ra-SHOH|How nice!
T|Это мой пирог.|EH-ta moy pee-ROK|This is my pie.
Y|Очень вкусно!|OH-chen FKOOS-na|Very tasty!
T|Спасибо!|spa-SEE-ba|Thank you!
Y|Вы прекрасно готовите.|vy pree-KRAS-na ga-TOH-vee-tye|You cook wonderfully.`],
["When you get lost", `T|Как вам наш город?|kak vam nash GOH-rat|How do you like our city?
Y|Я не понимаю.|ya nye pa-nee-MA-yoo|I don't understand.
T|Вам нравится город?|vam NRA-veet-sa GOH-rat|Do you like the city?
Y|Ещё раз, пожалуйста.|ye-SHCHOH ras, pa-ZHAH-loos-ta|One more time, please.
T|Вам нравится?|vam NRA-veet-sa|Do you like it?
Y|Да, очень.|da, OH-chen|Yes, very much.
T|Хорошо!|ha-ra-SHOH|Good!
Y|Спасибо.|spa-SEE-ba|Thank you.`],
["Short goodbye", `T|Уже поздно.|oo-ZHE POZ-na|It's late already.
Y|Да, нам пора.|da, nam pa-RA|Yes, it's time for us to go.
T|Приходите ещё!|pree-kha-DEE-tye ye-SHCHOH|Come again!
Y|С удовольствием!|s oo-da-VOLST-vee-yem|With pleasure!
T|До свидания!|da svee-DA-nee-ya|Goodbye!
Y|До свидания!|da svee-DA-nee-ya|Goodbye!
T|Спокойной ночи!|spa-KOY-nay NOH-chee|Good night!
Y|Спокойной ночи!|spa-KOY-nay NOH-chee|Good night!`],
["Morning at their home", `T|Доброе утро!|DOH-bra-ye OO-tra|Good morning!
Y|Доброе утро!|DOH-bra-ye OO-tra|Good morning!
T|Как вы спали?|kak vy SPA-lee|How did you sleep?
Y|Очень хорошо.|OH-chen ha-ra-SHOH|Very good.
T|Кофе или чай?|KOH-fye EE-lee chai|Coffee or tea?
Y|Кофе, пожалуйста.|KOH-fye, pa-ZHAH-loos-ta|Coffee, please.
T|С сахаром?|s SA-kha-ram|With sugar?
Y|Без сахара.|byez SA-kha-ra|Without sugar.
T|Блины будете?|blee-NY BOO-dee-tye|Will you have pancakes?
Y|С удовольствием!|s oo-da-VOLST-vee-yem|With pleasure!`],
["Bringing a gift", `T|Здравствуйте! Проходите.|ZDRAST-vooy-tye! pra-kha-DEE-tye|Hello! Come in.
Y|Это для вас.|EH-ta dlya vas|This is for you.
T|Ой, какие красивые цветы!|oy, ka-KEE-ye kra-SEE-vy-ye tsvee-TY|Oh, what beautiful flowers!
Y|Надеюсь, вам понравится.|na-DYE-yoos, vam pa-NRA-veet-sa|I hope you like them.
T|Очень нравится. Спасибо!|OH-chen NRA-veet-sa. spa-SEE-ba|I like them very much. Thank you!
Y|Пожалуйста.|pa-ZHAH-loos-ta|You're welcome.
T|Раздевайтесь, проходите.|raz-dee-VAY-tyes, pra-kha-DEE-tye|Take your coat off, come in.
Y|Можно тапочки?|MOZH-na TA-pach-kee|May I have slippers?
T|Конечно! Вот.|ka-NYESH-na! vot|Of course! Here.
Y|Большое спасибо!|bal-SHOH-ye spa-SEE-ba|Thank you very much!`],
["What is this?", `T|Вот наша кухня.|vot NA-sha KOOKH-nya|Here is our kitchen.
Y|Что это?|shtoh EH-ta|What is this?
T|Это самовар.|EH-ta sa-ma-VAR|This is a samovar.
Y|Как интересно!|kak een-tee-RYES-na|How interesting!
T|А это варенье.|a EH-ta va-RYE-nye|And this is jam.
Y|Это домашнее?|EH-ta da-MASH-nye-ye|Is it homemade?
T|Да, домашнее.|da, da-MASH-nye-ye|Yes, homemade.
Y|Можно?|MOZH-na|May I?
T|Конечно, пробуйте!|ka-NYESH-na, PROH-booy-tye|Of course, try it!
Y|Очень вкусно!|OH-chen FKOOS-na|Very tasty!`],
["Offering to help", `T|Ох, столько дел!|okh, STOL-ka dyel|Oh, so much to do!
Y|Чем помочь?|chyem pa-MOCH|How can I help?
T|Нужно накрыть на стол.|NOOZH-na na-KRYT na stol|The table needs setting.
Y|Я помогу.|ya pa-ma-GOO|I'll help.
T|Вот тарелки.|vot ta-RYEL-kee|Here are the plates.
Y|Куда это поставить?|koo-DA EH-ta pa-STA-veet|Where should I put this?
T|На стол, пожалуйста.|na stol, pa-ZHAH-loos-ta|On the table, please.
Y|Всё готово.|fsyo ga-TOH-va|Everything is ready.
T|Спасибо! Вы молодец.|spa-SEE-ba! vy ma-la-DYETS|Thank you! Well done.
Y|Мне не трудно.|mnye nye TROOD-na|It's no trouble for me.`],
["A short toast", `T|Давайте выпьем!|da-VAY-tye VY-pyem|Let's have a drink!
Y|С удовольствием!|s oo-da-VOLST-vee-yem|With pleasure!
T|За встречу!|za FSTRYE-choo|To our meeting!
Y|За встречу!|za FSTRYE-choo|To our meeting!
T|За любовь!|za lyoo-BOF|To love!
Y|За семью!|za seem-YOO|To the family!
T|Будем здоровы!|BOO-deem zda-ROH-vy|To our health!
Y|За ваше здоровье!|za VA-she zda-ROH-vye|To your health!`],
["Not drinking tonight", `T|Вам вина?|vam vee-NA|Wine for you?
Y|Нет, спасибо.|nyet, spa-SEE-ba|No, thank you.
T|Немного?|nee-MNOH-ga|A little?
Y|Я за рулём.|ya za roo-LYOM|I'm driving.
T|А, понятно. Сок?|a, pa-NYAT-na. sok|Ah, I see. Juice?
Y|Да, пожалуйста.|da, pa-ZHAH-loos-ta|Yes, please.
T|За вас!|za VAS|To you!
Y|За вас!|za VAS|To you!`],
["Talking about her", `T|Как моя дочь?|kak ma-YA doch|How is my daughter?
Y|Она очень добрая.|a-NA OH-chen DOB-ra-ya|She is very kind.
T|Она хорошо готовит?|a-NA ha-ra-SHOH ga-TOH-veet|Does she cook well?
Y|Она прекрасно готовит.|a-NA pree-KRAS-na ga-TOH-veet|She cooks wonderfully.
T|Она говорит о нас?|a-NA ga-va-REET a nas|Does she talk about us?
Y|Она часто говорит о вас.|a-NA CHAS-ta ga-va-REET a VAS|She often talks about you.
T|Вы счастливы?|vy SHCHAS-lee-vy|Are you two happy?
Y|Мы очень счастливы.|my OH-chen SHCHAS-lee-vy|We are very happy.
T|Я рада.|ya RA-da|I'm glad.
Y|Она самая лучшая.|a-NA SA-ma-ya LOOCH-sha-ya|She is the best.`],
["About your family", `T|У вас есть брат?|oo vas yest brat|Do you have a brother?
Y|У меня есть брат.|oo mee-NYA yest brat|I have a brother.
T|А сестра?|a sees-TRA|And a sister?
Y|У меня есть сестра.|oo mee-NYA yest sees-TRA|I have a sister.
T|Где ваши родители?|gdye VA-shee ra-DEE-tee-lee|Where are your parents?
Y|Они в Америке.|a-NEE v a-MYE-ree-kye|They are in America.
T|Покажите фото!|pa-ka-ZHEE-tye FOH-ta|Show me a photo!
Y|Это моя мама.|EH-ta ma-YA MA-ma|This is my mom.
T|Красивая!|kra-SEE-va-ya|Beautiful!
Y|Спасибо!|spa-SEE-ba|Thank you!`],
["Learning Russian", `T|Вы учите русский?|vy OO-chee-tye ROOS-kee|Are you learning Russian?
Y|Я учу русский язык.|ya oo-CHOO ROOS-kee ya-ZYK|I'm learning Russian.
T|Трудно?|TROOD-na|Is it hard?
Y|Русский язык трудный.|ROOS-kee ya-ZYK TROOD-ny|Russian is a difficult language.
T|Вы хорошо говорите!|vy ha-ra-SHOH ga-va-REE-tye|You speak well!
Y|Я стараюсь.|ya sta-RA-yoos|I'm trying.
T|Кто вас учит?|ktoh vas OO-cheet|Who teaches you?
Y|Она учит меня русскому.|a-NA OO-cheet mee-NYA ROOS-ka-moo|She is teaching me Russian.
T|Говорите со мной по-русски.|ga-va-REE-tye sa mnoy pa-ROOS-kee|Speak Russian with me.
Y|Поправляйте меня, пожалуйста.|pa-prav-LYAY-tye mee-NYA, pa-ZHAH-loos-ta|Please correct me.`],
["Small talk about the weather", `T|Какая сегодня погода?|ka-KA-ya see-VOD-nya pa-GOH-da|What's the weather like today?
Y|Сегодня холодно.|see-VOD-nya KHOH-lad-na|It's cold today.
T|Да, идёт снег.|da, ee-DYOT snyek|Yes, it's snowing.
Y|Как красиво!|kak kra-SEE-va|How beautiful!
T|Вы любите зиму?|vy LYOO-bee-tye ZEE-moo|Do you like winter?
Y|Не очень.|nye OH-chen|Not really.
T|А лето?|a LYE-ta|And summer?
Y|Да, очень.|da, OH-chen|Yes, very much.
T|Что нового?|shtoh NOH-va-va|What's new?
Y|Всё хорошо.|fsyo ha-ra-SHOH|Everything is good.`],
["Hobbies", `T|Что вы любите делать?|shtoh vy LYOO-bee-tye DYE-lat|What do you like to do?
Y|Я люблю гулять.|ya lyoob-LYOO goo-LYAT|I like to go for walks.
T|А музыку любите?|a MOO-zy-koo LYOO-bee-tye|And do you like music?
Y|Я люблю музыку.|ya lyoob-LYOO MOO-zy-koo|I love music.
T|Вы играете в шахматы?|vy eeg-RA-ye-tye f SHAKH-ma-ty|Do you play chess?
Y|Немного.|nee-MNOH-ga|A little.
T|Давайте сыграем!|da-VAY-tye syg-RA-yem|Let's play!
Y|С удовольствием!|s oo-da-VOLST-vee-yem|With pleasure!
T|Хороший ход!|ha-ROH-shee khot|Good move!
Y|Спасибо!|spa-SEE-ba|Thank you!`],
["Making plans", `T|Что мы делаем завтра?|shtoh my DYE-la-yem ZAF-tra|What are we doing tomorrow?
Y|Давайте пойдём гулять.|da-VAY-tye pay-DYOM goo-LYAT|Let's go for a walk.
T|Хорошо. Во сколько?|ha-ra-SHOH. va SKOL-ka|Okay. At what time?
Y|Завтра утром.|ZAF-tra OO-tram|Tomorrow morning.
T|Вы надолго приехали?|vy na-DOL-ga pree-YE-kha-lee|Are you here for long?
Y|Мы здесь на неделю.|my zdyes na nee-DYE-lyoo|We're here for a week.
T|Приезжайте летом!|pree-yezh-ZHAY-tye LYE-tam|Come in the summer!
Y|Обязательно!|a-bee-ZA-teel-na|Definitely!
T|Пойдёмте пить чай.|pay-DYOM-tye peet chai|Let's go have tea.
Y|Давайте!|da-VAY-tye|Let's!`],
["Looking after grandmother", `T|Ох, я устала.|okh, ya oos-TA-la|Oh, I'm tired.
Y|Садитесь сюда.|sa-DEE-tyes syoo-DA|Sit here.
T|Спасибо вам.|spa-SEE-ba vam|Thank you.
Y|Принести воды?|pree-nees-TEE va-DY|Shall I bring water?
T|Да, пожалуйста.|da, pa-ZHAH-loos-ta|Yes, please.
Y|Вот, пожалуйста.|vot, pa-ZHAH-loos-ta|Here you are.
T|Здесь холодно.|zdyes KHOH-lad-na|It's cold in here.
Y|Принести плед?|pree-nees-TEE plyet|Shall I bring a blanket?
T|Вы очень добры.|vy OH-chen dab-RY|You are very kind.
Y|Отдыхайте.|ad-dy-KHAY-tye|Please rest.`],
["Looking at photos", `T|Хотите посмотреть фотографии?|kha-TEE-tye pa-sma-TRYET fa-ta-GRA-fee-ee|Would you like to look at photos?
Y|Да, с удовольствием!|da, s oo-da-VOLST-vee-yem|Yes, with pleasure!
T|Вот, смотрите.|vot, sma-TREE-tye|Here, look.
Y|Кто это?|ktoh EH-ta|Who is this?
T|Это моя дочь.|EH-ta ma-YA doch|This is my daughter.
Y|Какая милая!|ka-KA-ya MEE-la-ya|How cute!
T|А это я.|a EH-ta ya|And this is me.
Y|Вы очень похожи.|vy OH-chen pa-KHOH-zhee|You look very alike.
T|Это наша дача.|EH-ta NA-sha DA-cha|This is our dacha.
Y|Как интересно!|kak een-tee-RYES-na|How interesting!
T|Давайте сфотографируемся!|da-VAY-tye sfa-ta-gra-FEE-roo-yem-sa|Let's take a photo together!
Y|Давайте!|da-VAY-tye|Let's!`],
["A drive to the dacha", `T|Вы готовы?|vy ga-TOH-vy|Are you ready?
Y|Мы готовы.|my ga-TOH-vy|We're ready.
T|Поехали на дачу!|pa-YE-kha-lee na DA-choo|Let's drive to the dacha!
Y|Поехали!|pa-YE-kha-lee|Let's go!
T|Здесь направо.|zdyes na-PRA-va|Turn right here.
Y|Это далеко?|EH-ta da-lee-KOH|Is it far?
T|Нет, близко.|nyet, BLEES-ka|No, it's close.
Y|Хорошо.|ha-ra-SHOH|Okay.
T|Вот и дача!|vot ee DA-cha|Here's the dacha!
Y|Как красиво!|kak kra-SEE-va|How beautiful!`],
["On a video call", `T|Алло! Вы меня слышите?|a-LYOH! vy mee-NYA SLY-shee-tye|Hello! Can you hear me?
Y|Я вас слышу.|ya vas SLY-shoo|I can hear you.
T|А видите?|a VEE-dee-tye|And can you see me?
Y|Я вас вижу!|ya vas VEE-zhoo|I can see you!
T|Как вы там?|kak vy tam|How are you over there?
Y|У нас всё хорошо.|oo nas fsyo ha-ra-SHOH|We're all fine.
T|Мы скучаем.|my skoo-CHA-yem|We miss you.
Y|Мы тоже.|my TOH-zhe|We do too.
T|Приезжайте скорее!|pree-yezh-ZHAY-tye ska-RYE-ye|Come soon!
Y|Обязательно!|a-bee-ZA-teel-na|Definitely!
T|Пока! Целую!|pa-KA! tse-LOO-yoo|Bye! Kisses!
Y|До связи!|da SVYA-zee|Until next call!`],
["New Year at the table", `T|С наступающим!|s na-stoo-PA-yoo-shcheem|Happy upcoming New Year!
Y|С Новым годом!|s NOH-vym GOH-dam|Happy New Year!
T|Какая ёлка, а?|ka-KA-ya YOL-ka, a|What a tree, eh?
Y|Какая красивая ёлка!|ka-KA-ya kra-SEE-va-ya YOL-ka|What a beautiful tree!
T|Садитесь за стол.|sa-DEE-tyes za stol|Sit down at the table.
Y|Какой красивый стол!|ka-KOY kra-SEE-vy stol|What a beautiful table!
T|За Новый год!|za NOH-vy got|To the New Year!
Y|За Новый год!|za NOH-vy got|To the New Year!
T|Счастья и здоровья!|SHCHAS-tya ee zda-ROH-vya|Happiness and health!
Y|Желаю вам счастья.|zhe-LA-yoo vam SHCHAS-tya|I wish you happiness.
T|Это вам подарок.|EH-ta vam pa-DA-rak|This gift is for you.
Y|Спасибо за подарок.|spa-SEE-ba za pa-DA-rak|Thank you for the gift.`]
];
