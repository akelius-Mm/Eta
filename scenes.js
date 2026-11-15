/* Scripted conversations. Each line: T (her family speaks) or Y (your reply) | Russian | how to say it | English */
window.SCENES = [
["Arriving at the door", `T|Здравствуйте! Проходите, пожалуйста.|ZDRAST-vooy-tye! pra-kha-DEE-tye, pa-ZHAH-loos-ta|Hello! Come in, please.
Y|Здравствуйте! Очень приятно.|ZDRAST-vooy-tye! OH-chen pree-YAHT-na|Hello! Nice to meet you.
T|Как вас зовут?|kak vas za-VOOT|What is your name?
Y|Меня зовут …|mee-NYA za-VOOT …|My name is … (add your name)
T|Очень приятно. Как ваши дела?|OH-chen pree-YAHT-na. kak VA-shee dee-LA|Nice to meet you. How are you?
Y|Хорошо, спасибо. А у вас?|ha-ra-SHOH, spa-SEE-ba. a oo VAS|Good, thank you. And you?
T|Тоже хорошо. Чувствуйте себя как дома.|TOH-zhe ha-ra-SHOH. CHOOST-vooy-tye see-BYA kak DOH-ma|Good too. Make yourself at home.
Y|Спасибо. У вас очень красивый дом.|spa-SEE-ba. oo vas OH-chen kra-SEE-vy dom|Thank you. You have a very beautiful home.
T|Спасибо! Хотите чаю?|spa-SEE-ba! kha-TEE-tye CHA-yoo|Thank you! Would you like some tea?
Y|Да, пожалуйста. С удовольствием!|da, pa-ZHAH-loos-ta. s oo-da-VOLST-vee-yem|Yes, please. With pleasure!`],
["At the table", `T|Садитесь, пожалуйста. Вы голодны?|sa-DEE-tyes, pa-ZHAH-loos-ta. vy GOH-lad-ny|Sit down, please. Are you hungry?
Y|Да, немного. Как вкусно пахнет!|da, nee-MNOH-ga. kak FKOOS-na PAKH-neet|Yes, a little. It smells delicious!
T|Это борщ. Будете?|EH-ta borshch. BOO-dee-tye|This is borscht. Will you have some?
Y|Да, пожалуйста. Я люблю борщ.|da, pa-ZHAH-loos-ta. ya lyoob-LYOO borshch|Yes, please. I love borscht.
T|Приятного аппетита!|pree-YAHT-na-va a-pee-TEE-ta|Enjoy your meal!
Y|Спасибо. Очень вкусно!|spa-SEE-ba. OH-chen FKOOS-na|Thank you. Very tasty!
T|Ещё?|ye-SHCHOH|More?
Y|Чуть-чуть, пожалуйста.|choot-CHOOT, pa-ZHAH-loos-ta|Just a little, please.
T|Кушайте, кушайте! Хотите хлеба?|KOO-shay-tye, KOO-shay-tye! kha-TEE-tye KHLYE-ba|Eat, eat! Would you like some bread?
Y|Спасибо, мне хватит.|spa-SEE-ba, mnye KHVA-teet|Thank you, that's enough for me.
T|На здоровье!|na zda-ROH-vye|You're welcome! (what a host says when thanked for food)
Y|Спасибо, было очень вкусно. Вы прекрасно готовите.|spa-SEE-ba, BY-la OH-chen FKOOS-na. vy pree-KRAS-na ga-TOH-vee-tye|Thank you, it was delicious. You cook wonderfully.`],
["Her grandfather asks about you", `T|Откуда вы?|at-KOO-da vy|Where are you from?
Y|Я из Америки.|ya eez a-MYE-ree-kee|I'm from America.
T|Кем вы работаете?|kyem vy ra-BOH-ta-ye-tye|What do you do for work?
Y|Я работаю в офисе.|ya ra-BOH-ta-yoo v OH-fee-sye|I work in an office.
T|Вы говорите по-русски?|vy ga-va-REE-tye pa-ROOS-kee|Do you speak Russian?
Y|Я немного говорю по-русски. Я учу русский язык.|ya nee-MNOH-ga ga-va-RYOO pa-ROOS-kee. ya oo-CHOO ROOS-kee ya-ZYK|I speak a little Russian. I'm learning Russian.
T|Молодец! Как вы познакомились?|ma-la-DYETS! kak vy paz-na-KOH-mee-lees|Well done! How did you two meet?
Y|Мы познакомились в …|my paz-na-KOH-mee-lees v …|We met in … (add the place)
T|Вы любите её?|vy LYOO-bee-tye ye-YOH|Do you love her?
Y|Да, я люблю вашу внучку. Она очень добрая.|da, ya lyoob-LYOO VA-shoo VNOOCH-koo. a-NA OH-chen DOB-ra-ya|Yes, I love your granddaughter. She is very kind.
T|Хорошо. Я рад.|ha-ra-SHOH. ya rat|Good. I'm glad.
Y|Спасибо. Вы мне как семья.|spa-SEE-ba. vy mnye kak seem-YA|Thank you. You are like family to me.`],
["When you don't understand", `T|Как вам наш город?|kak vam nash GOH-rat|How do you like our city?
Y|Извините, я не понимаю.|eez-vee-NEE-tye, ya nye pa-nee-MA-yoo|Sorry, I don't understand.
T|Наш город. Вам нравится?|nash GOH-rat. vam NRA-veet-sa|Our city. Do you like it?
Y|Помедленнее, пожалуйста.|pa-MYED-lee-nye-ye, pa-ZHAH-loos-ta|Slower, please.
T|Вам нравится город?|vam NRA-veet-sa GOH-rat|Do you like the city?
Y|Да! Мне очень нравится.|da! mnye OH-chen NRA-veet-sa|Yes! I like it very much.
T|Вы хорошо говорите по-русски!|vy ha-ra-SHOH ga-va-REE-tye pa-ROOS-kee|You speak Russian well!
Y|Спасибо. Я стараюсь.|spa-SEE-ba. ya sta-RA-yoos|Thank you. I'm trying.
T|Хотите посмотреть фотографии?|kha-TEE-tye pa-sma-TRYET fa-ta-GRA-fee-ee|Would you like to look at photos?
Y|Да, с удовольствием! Кто это?|da, s oo-da-VOLST-vee-yem! ktoh EH-ta|Yes, with pleasure! Who is this?
T|Это моя дочь. Ей пять лет.|EH-ta ma-YA doch. yey pyat lyet|This is my daughter. She is five here.
Y|Какая красивая фотография!|ka-KA-ya kra-SEE-va-ya fa-ta-GRA-fee-ya|What a beautiful photo!`],
["A toast", `T|Давайте выпьем!|da-VAY-tye VY-pyem|Let's have a drink!
Y|С удовольствием!|s oo-da-VOLST-vee-yem|With pleasure!
T|За встречу!|za FSTRYE-choo|To our meeting!
Y|За встречу! За вас!|za FSTRYE-choo! za VAS|To our meeting! To you!
T|За любовь!|za lyoo-BOF|To love!
Y|За любовь! За семью!|za lyoo-BOF! za seem-YOO|To love! To the family!
T|Будем здоровы!|BOO-deem zda-ROH-vy|To our health!
Y|За ваше здоровье!|za VA-she zda-ROH-vye|To your health!`],
["Saying goodbye", `T|Уже поздно.|oo-ZHE POZ-na|It's late already.
Y|Да, нам пора.|da, nam pa-RA|Yes, it's time for us to go.
T|Спасибо, что пришли.|spa-SEE-ba, shtoh pree-SHLEE|Thank you for coming.
Y|Спасибо за приглашение. Всё было замечательно.|spa-SEE-ba za pree-gla-SHEH-nee-ye. fsyo BY-la za-mee-CHA-teel-na|Thank you for inviting me. Everything was wonderful.
T|Приходите ещё!|pree-kha-DEE-tye ye-SHCHOH|Come again!
Y|С удовольствием! Было очень приятно познакомиться.|s oo-da-VOLST-vee-yem! BY-la OH-chen pree-YAHT-na paz-na-KOH-meet-sa|With pleasure! It was very nice to meet you.
T|До свидания! Берегите себя.|da svee-DA-nee-ya! bee-ree-GEE-tye see-BYA|Goodbye! Take care of yourself.
Y|До свидания! Спокойной ночи!|da svee-DA-nee-ya! spa-KOY-nay NOH-chee|Goodbye! Good night!`]
];
