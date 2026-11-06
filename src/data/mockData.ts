import { Book, User, ChatConversation, ChatMessage, NotificationItem } from '../types';

export const INITIAL_USERS: User[] = [
  {
    id: 'user_1',
    nickname: '@Jasur_Dev',
    name: 'Jasur Qodirov',
    email: 'jasur@elibrary.uz',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    bio: 'Dasturiy injiniring talabasi. Sun\'iy intellekt, taqsimlangan tizimlar va kompyuter fanlari bo\'yicha kitoblarni sevib o\'qiyman.',
    language: 'uz',
    role: 'student',
    status: 'active',
    joinedDate: '2024-09-15',
    booksReadCount: 14,
  },
  {
    id: 'user_2',
    nickname: '@Elena_Read',
    name: 'Елена Смирнова',
    email: 'elena@elibrary.uz',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80',
    bio: 'Студентка факультета мировой литературы и истории. Обожаю классическую прозу, исторические романы и философские эссе.',
    language: 'ru',
    role: 'student',
    status: 'active',
    joinedDate: '2024-10-02',
    booksReadCount: 21,
  },
  {
    id: 'user_3',
    nickname: '@Malika_Art',
    name: 'Malika Yusupova',
    email: 'malika@elibrary.uz',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80',
    bio: 'Arxitektura va shaharsozlik yo\'nalishi talabasi. Zamonaviy dizayn tamoyillari va me\'morchilik tarixi qiziquvchisi.',
    language: 'uz',
    role: 'student',
    status: 'active',
    joinedDate: '2024-11-10',
    booksReadCount: 8,
  },
  {
    id: 'user_4',
    nickname: '@Timur_Tech',
    name: 'Тимур Алиев',
    email: 'timur@elibrary.uz',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    bio: 'Data Science и Machine Learning энтузиаст. Изучаю алгоритмы обработки естественного языка и нейросети.',
    language: 'ru',
    role: 'student',
    status: 'active',
    joinedDate: '2024-11-20',
    booksReadCount: 11,
  },
  {
    id: 'admin_1',
    nickname: '@Librarian_Aziza',
    name: 'Aziza Karimova',
    email: 'librarian@elibrary.uz',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    bio: 'Bosh ilmiy kutubxonachi va platforma ma\'muri. Yangi kitoblar qidirishda va manbalar topishda talabalarga yordam beraman.',
    language: 'uz',
    role: 'admin',
    status: 'active',
    joinedDate: '2024-01-01',
    booksReadCount: 95,
  }
];

export const INITIAL_BOOKS: Book[] = [
  {
    id: 'book_1',
    title: 'O\'tkan kunlar',
    author: 'Abdulla Qodiriy',
    category: 'literature',
    language: 'uz',
    cover: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80',
    description: 'O\'zbek adabiyotining birinchi romani hisoblangan shoh asar. Unda XIX asr o\'rtalaridagi Toshkent va Qo\'qon xonligidagi tarixiy voqealar, Otabek va Kumushning fojiali sevgisi tasvirlanadi.',
    rating: 4.9,
    readersCount: 3840,
    publishYear: 1926,
    pagesCount: 5,
    featured: true,
    isNew: false,
    pages: [
      `1-BOB: Otabek Marg'ilonda

1264-hijriy, dalv oyining yigirmanchi kunlari... Qishning so'nggi nafaslari Toshkent va Marg'ilon bog'larini qirovga ko'mib turgan bir pallada, Marg'ilonning mashhur karvonsaroyiga Toshkentdan kelgan yosh savdogar Otabek qadam ranjida qildi.

Uning chehrasida o'ziga xos o'ychanlik, ko'zlarida esa o'qimishli, dunyo ko'rgan kishilarga xos ziyraklik balqib turardi. Yosh bo'lishiga qaramasdan, yurt kezgan, ilm va tijorat sirlarini puxta egallagan bu yigit Marg'ilon ahlida birdaniga chuqur qiziqish uyg'otdi.

— Xush kelibsiz, yosh bek! — dedi karvonsaroy sarrofi ehtirom bilan bosh egib. — Qayerdan tashrif, safaringiz qutlug' bo'lsin?

Otabek muloyimlik bilan jilmaydi:
— Toshkentdan, savdo-sotiq ishlari yuzasidan. Shahringiz fayzli va osoyishta ekan...`,

      `2-BOB: Ziyo shohichi xonadonidagi suhbat

Kechga yaqin Marg'ilonning e'tiborli kishilaridan bo'lmish Ziyo shohichi xonadonida gurung qizidi. Mehmonlar orasida Toshkent xonligi ahvoli, xalqning turmushi va yangi zamona talablari haqida qizg'in bahs bordi.

Otabek shunday dedi:
— Bizning el faqat ilm, adolat va o'zaro totuvlik orqaligina taraqqiyotga erisha oladi. Nifoq va o'zaro adovat esa xonliklarni zaiflashtirib, xalqimizning kelajagiga raxna soladi.

Ushbu gaplar davradagi barchani lol qoldirdi. Ayniqsa Mirzakarim qutidor Otabekning keng fikrlashiga va teran aqliga qoyil qolib, unga nisbatan ichki bir hurmat tuydi.`,

      `3-BOB: Taqdir uchrashuvi

Marg'ilon ko'chalarida bahor epkini esa boshladi. Otabek qutidor xonadoniga mehmondorchilikka borganida tasodifan hovlida bir lahza Kumushbibini ko'rib qoldi.

Bu go'zallik shunchaki tashqi husn emas, balki qalb pokligi va andishaning timsoli edi. Qoradek qoshlar, muloyim nigoh va ipakdek muloyim qadamlar Otabekning yuragiga muhrlanib qoldi.

Otabek o'z his-tuyg'ularini jilovlashga urinar, biroq xayoli butunlay o'sha nurli siymo bilan band edi...`,

      `4-BOB: Maktub va andisha

Kumushbibi ham yosh bekning xonadonga kelganini eshitgan, uning donishmandona so'zlarini parda ortidan tinglab, qalbi hayajonga to'lgan edi. 

U o'z kundaligiga shunday satrlarni bitdi:
"Inson qalbini na mol-dunyo, na behuda so'zlar zabt eta oladi. Faqat sof qalb va yuksak odobgina muhabbatga arziydi..."

Ikki yoshning taqdiri endi Marg'ilon va Toshkent o'rtasidagi murakkab ijtimoiy to'fonlar bilan sinovdan o'tishi muqarrar edi.`,

      `5-BOB: Hayot saboqlari va tarix sadosi

"O'tkan kunlar" faqatgina ikki yoshning fojiali muhabbati qissasi emas. Bu asar millatning o'zligini anglashi, o'tmishdagi xatolardan saboq chiqarishi va kelajakka teran aql bilan qarashi uchun berilgan ulkan darsdir.

Abdulla Qodiriy o'z xalqiga murojaat qilar ekan: "O'tmishga tanqidiy ko'z bilan qaramagan millat o'z istiqbolini porloq qura olmaydi", degan haqiqatni uqtiradi.`
    ]
  },
  {
    id: 'book_2',
    title: 'Мастер и Маргарита',
    author: 'Михаил Булгаков',
    category: 'fiction',
    language: 'ru',
    cover: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=600&q=80',
    description: 'Культовый роман мировой литературы XX века, сочетающий мистику, острую сатиру на нравы 1930-х годов и глубокую философскую притчу о добре, зле, творчестве и бессмертной любви.',
    rating: 5.0,
    readersCount: 5210,
    publishYear: 1967,
    pagesCount: 5,
    featured: true,
    isNew: false,
    pages: [
      `ГЛАВА 1: Никогда не разговаривайте с неизвестными

Однажды весною, в час небывало жаркого заката, в Москве, на Патриарших прудах, появились два гражданина. Первый из них, приблизительно сорокалетний, одетый в серенькую летнюю пару, был председатель правления Массолита Михаил Александрович Берлиоз, а спутник его — молодой человек по фамилии Понырев, пишущий под псевдонимом Иван Бездомный.

Они сели на скамейку лицом к пруду и спиной к Бронной. В воздухе стояла густая тишина, нарушаемая лишь далеким гулом трамваев.

— Дайте нарзану, — попросил Берлиоз в киоске.
— Нарзану нету, — ответила женщина в будочке.
— А что есть?
— Абрикосовая, только теплая.
— Ну давайте!

В этот момент на аллее появился высокий иностранец в дорогом костюме и с тростью с набалдашником в виде головы пуделя...`,

      `ГЛАВА 2: Понтий Пилат

В белом плаще с кровавым подбоем, шаркающей кавалерийской походкой, ранним утром четырнадцатого числа весеннего месяца нисана в крытую колоннаду между двумя крыльями дворца Ирода Великого вышел прокуратор Иудеи Понтий Пилат.

Более всего на свете прокуратор ненавидел запах розового масла, и теперь все предвещало дурной день, так как этот запах преследовал его с самого рассвета. Ему казалось, что розовый запах источают кипарисы и пальмы в саду...

— Приведите обвиняемого, — тихо промолвил Пилат.

Перед ним предстал человек лет двадцати семи, в разорванном хитоне, с синяком под глазом. Его звали Иешуа Га-Ноцри.`,

      `ГЛАВА 3: Седьмое доказательство

Иностранец на Патриарших прудах внимательно посмотрел на изумленных литераторов и с легкой усмешкой произнес:
— Но вот какой вопрос меня беспокоит: ежели бога нет, то, спрашивается, кто же управляет жизнью человеческой и всем вообще распорядком на земле?

— Сам человек и управляет, — поспешил сердито ответить Бездомный.

— Виноват, — мягко отозвался неизвестный, — для того, чтобы управлять, нужно иметь точный план на некоторый, хоть сколько-нибудь приличный срок. Как же может управлять человек, если он не только лишен возможности составить какой-нибудь план, но не может ручаться даже за свой собственный завтрашний день?`,

      `ГЛАВА 4: Явление Мастера

В тихом подвальчике в одном из арбатских переулков горела настольная лампа. Мастер сидел перед стопкой исписанных листов. На его лице отражалась глубокая печать пережитого одиночества и вдохновения.

— Она несла в руках отвратительные, тревожные желтые цветы, — вспоминал он встречу с Маргаритой. — Черт их знает, как их зовут, но они первые почему-то появляются в Москве. И эти цветы очень отчетливо выделялись на ее черном весеннем пальто.

Она поглядела на меня, а я поглядел на нее, и мы поняли, что любили друг друга всегда...`,

      `ГЛАВА 5: Рукописи не горят

В черной полуночи, озаренной пламенем свечей, Воланд повернулся к испуганному и измученному автору:
— Вы сочинили роман о Понтии Пилате? И вы сожгли его? Простите, не поверю. Этого быть не может. Рукописи не горят.

Он сделал легкий жест рукой, и на тяжелом дубовом столе возникла нетронутая, аккуратно перевязанная пачка страниц.

Истина, искренность мысли и настоящая преданность творчеству преодолевают любые преграды времени и человеческой зависти.`
    ]
  },
  {
    id: 'book_3',
    title: 'Чистый код: создание, анализ и рефакторинг',
    author: 'Роберт К. Мартин',
    category: 'programming',
    language: 'ru',
    cover: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80',
    description: 'Библия современной программной инженерии. Книга учит писать надежный, читаемый и легко поддерживаемый код, разделять ответственность и эффективно проводить рефакторинг.',
    rating: 4.9,
    readersCount: 4120,
    publishYear: 2019,
    pagesCount: 5,
    featured: true,
    isNew: false,
    pages: [
      `ГЛАВА 1: Что такое чистый код?

Если спросить десяток опытных разработчиков, что они понимают под чистым кодом, вы получите десяток разных ответов. Бьёрн Страуструп, создатель C++, говорит: «Мне нравится, когда код элегантен и эффективен. Логика должна быть прямолинейной, чтобы в ней трудно было спрятаться ошибкам».

Грейди Буч добавляет: «Чистый код прост и прямолинеен. Он никогда не скрывает намерений разработчика».

Главное правило чистого кода: читаемость важнее сиюминутного удобства написания. Мы читаем код в 10 раз чаще, чем пишем его. Делая код легким для чтения, вы экономите сотни часов командной работы.`,

      `ГЛАВА 2: Содержательные имена

Выбирайте имена, раскрывающие намерения. Если имя требует комментария, значит, оно выбрано неудачно.

Плохой пример:
int d; // прошедшее время в днях

Хороший пример:
int elapsedTimeInDays;
int daysSinceCreation;

Избегайте дезинформации и труднопроизносимых аббревиатур. Имя класса должно быть существительным (Customer, Account), а метода — глаголом (postPayment, deletePage).`,

      `ГЛАВА 3: Функции должны быть компактными

Первое правило для функций: они должны быть компактными. Второе правило: они должны быть еще компактнее!

Функция должна выполнять только одну задачу, делать это хорошо и не делать ничего другого (Single Responsibility Principle).

Если ваша функция содержит более 20 строк кода, вложенные ветвления if-else глубиной в три уровня или изменяет глобальное состояние приложения — настало время для рефакторинга.`,

      `ГЛАВА 4: Комментарии — признак слабости

Не комментируйте плохой код — перепишите его.

Единственный надежный источник правды — это сам исходный код. Комментарии устаревают в тот самый момент, когда код изменяется, а комментарий забывают обновить.

Оправданными являются лишь юридические комментарии, пояснения неочевидных форматов регулярных выражений или предупреждения о серьезных последствиях выполнения операции.`,

      `ГЛАВА 5: Правило бойскаута

В движении американских скаутов есть прекрасное правило: «Оставь место стоянки чище, чем оно было до твоего прихода».

Если каждый разработчик в команде при каждом коммите сделает код хотя бы чуть-чуть чище, чем он был, система никогда не придет в упадок. Изменили имя переменной на более удачное, разбили слишком длинную функцию — и кодовая база будет процветать.`
    ]
  },
  {
    id: 'book_4',
    title: 'Dasturlash asoslari va Algoritmlar',
    author: 'Akmal Shokirov',
    category: 'technology',
    language: 'uz',
    cover: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=600&q=80',
    description: 'Kompyuter fanlarining fundamental poydevori: ma\'lumotlar tuzilmalari, saralash algoritmlari, qidiruv strategiyalari va Big-O baholash tizimi amaliy misollar bilan yoritilgan.',
    rating: 4.8,
    readersCount: 2980,
    publishYear: 2023,
    pagesCount: 4,
    featured: false,
    isNew: true,
    pages: [
      `1-BOB: Algoritmik tafakkur nima?

Algoritm — bu qo'yilgan maqsadga erishish yoki berilgan muammoni hal qilish uchun ketma-ket bajarilishi zarur bo'lgan aniq va chekli buyruqlar to'plamidir.

Dasturchi uchun eng muhim fazilat dasturlash tilining sintaksisini yodlab olish emas, balki muammoni mayda mustaqil mantiqiy qismlarga ajrata olish (dekompozitsiya) ko'nikmasidir.`,

      `2-BOB: Murakkablikni baholash: Big O notatsiyasi

Nima uchun bitta masalani turli usullar bilan yechish mumkin va qaysi biri eng yaxshi hisoblanadi?

Vaqt bo'yicha murakkablik (Time Complexity) kiritilgan ma'lumotlar hajmi (N) oshishi bilan algoritm bajarilishi qanday sur'atda sekinlashishini ifodalaydi:
- O(1): Doimiy vaqt
- O(log N): Logarifmik vaqt (ikkilik qidiruv)
- O(N): Chiziqli vaqt
- O(N log N): Samarali saralash (Merge sort, Quick sort)
- O(N^2): Kvadratik vaqt (pufaksimon saralash)`,

      `3-BOB: Asosiy ma'lumotlar tuzilmalari

Ma'lumotlarni to'g'ri tashkil etish dastur tezligini o'nlab marotaba oshirishi mumkin:
1. Massivlar (Arrays) — indeks bo'yicha O(1) kirish
2. Bog'langan ro'yxatlar (Linked Lists) — element qo'shish va o'chirishda moslashuvchanlik
3. Stek (Stack) — LIFO (Last In, First Out)
4. Navbat (Queue) — FIFO (First In, First Out)
5. Xesh-jadvallar (Hash Maps) — kalit bo'yicha qidiruvning o'rtacha O(1) tezligi`,

      `4-BOB: Amaliy xulosa

Katta hajmdagi ma'lumotlar bilan ishlashda to'g'ri algoritm tanlash resurslarni va server quvvatini tejashning birdan-bir yo'lidir. Amaliyot va tahlil qobiliyati har bir mohir dasturchining bosh kalitidir.`
    ]
  },
  {
    id: 'book_5',
    title: 'Sapiens: Краткая история человечества',
    author: 'Юваль Ной Харари',
    category: 'history',
    language: 'ru',
    cover: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&w=600&q=80',
    description: 'Захватывающее путешествие сквозь 70 000 лет эволюции человека: от никому не известного примата в Восточной Африке до властелина планеты Земля.',
    rating: 4.9,
    readersCount: 4890,
    publishYear: 2018,
    pagesCount: 4,
    featured: true,
    isNew: false,
    pages: [
      `ЧАСТЬ I: Когнитивная революция

Около 70 000 лет назад организмы, принадлежащие к виду Homo sapiens, начали создавать удивительно сложные структуры, которые мы называем культурами.

Главное отличие Homo sapiens от других животных кроется в нашей способности верить в воображаемые вещи. Ни одна обезьяна не отдаст вам свой банан в обмен на обещание получить бесконечное число бананов на обезьяньих небесах после смерти.

Только человек разумен способен объединить миллионы незнакомых людей вокруг общей идеи: нации, религии, денег или прав человека.`,

      `ЧАСТЬ II: Аграрная революция

Примерно 10 000 лет назад сапиенсы начали посвящать почти все свое время и силы обработке земли и разведению скота.

Традиционно считалось, что переход к земледелию был огромным шагом вперед. Однако Харари называет аграрную революцию величайшим обманом в истории: вместо более легкой и разнообразной жизни собирателя человек получил тяжелый изнурительный труд от зари до зари и зависимость от капризов погоды.

Не человек одомашнил пшеницу — это пшеница одомашнила человека.`,

      `ЧАСТЬ III: Объединение человечества

На протяжении тысячелетий разрозненные человеческие племена постепенно сливались в единый глобальный мир. Этому способствовали три великих объединителя:
1. Экономический порядок, основанный на доверии к деньгам
2. Имперский порядок, соединявший народы под единой властью
3. Мировые религии, дававшие единые этические правила

Деньги — это самая универсальная система взаимного доверия, когда-либо созданная человеком.`,

      `ЧАСТЬ IV: Научная революция

Научная революция началась не с накопления знаний, а с величайшего открытия: человек осознал собственное невежество.

Признание того, что мы не знаем ответов на самые важные вопросы бытия, подтолкнуло человечество к экспериментам, географическим открытиям и технологическому триумфу.`
    ]
  },
  {
    id: 'book_6',
    title: 'Yulduzli tunlar (Bobur)',
    author: 'Pirimqul Qodirov',
    category: 'history',
    language: 'uz',
    cover: 'https://images.unsplash.com/photo-1476275466078-4007374efbbe?auto=format&fit=crop&w=600&q=80',
    description: 'Zahiriddin Muhammad Boburning murakkab va ibratli hayot yo\'li, temuriylar davridagi toj-taxt kurashlari hamda buyuk sarkarda, shoir va davlat arbobining qalb kechinmalari tasvirlangan tarixiy roman.',
    rating: 4.9,
    readersCount: 3120,
    publishYear: 1978,
    pagesCount: 4,
    featured: false,
    isNew: false,
    pages: [
      `1-BOB: Andijon tongi

O'n ikki yoshli Bobur Mirzo otasi Umarshayx Mirzoning to'satdan fojiali halokatidan so'ng Andijon taxtiga o'tirishga majbur bo'ldi. 

Tong payti Oqsaroy ayvonida turgan yosh hukmdor Farg'ona vodiysining oppoq qor bilan qoplangan cho'qqilariga qarar ekan, yelkasiga tushgan ulkan mas'uliyat yukini chuqur his qilardi. Atrofda taxt ilinjida ko'z olaytirgan amakilar va beklarning fitnalari kundan-kunga kuchayib borardi.`,

      `2-BOB: Samarqand orzusi

Bobur uchun Samarqand shunchaki shahar emas, balki bobokaloni Amir Temurning buyuk saltanati timsoli edi. 

Ko'k gumbazlar, Registon maydoni va Bibixonim madrasasi yosh Boburning orzularida charx urardi. U bir necha bor Samarqandni egalladi, biroq xiyonat va harbiy qudrat yetishmasligi sababli sevimli poytaxtini tark etishga majbur bo'ldi:
"Tole' yo'qi jonimg'a baloliq bo'ldi,
Har ishniki ayladim xatoliq bo'ldi..."`,

      `3-BOB: Kobul va yangi davlat sari

Taqdir Boburni ona Farg'onasidan uzoqlarga — Afg'oniston tog'lariga boshladi. Doimiy sarsonlik va yo'qotishlarga qaramay, uning irodasi sinmadi. 

Kobulda mustahkam poydevor qurgan Bobur o'zining buyuk "Boburnoma" asarini yoza boshladi. Unda har bir qadam, har bir o'simlik va hayvonot olami g'oyat nozik ilmiy did bilan tasvirlangan.`,

      `4-BOB: Vatan sog'inchi

Hindistonda qudratli Boburiylar saltanatiga asos solgan bo'lsa-da, Bobur umrining oxirigacha ona vatani va Andijon qovunlarining hidini qumsab yashadi.

Asar vatanparvarlik, qat'iyat va san'at oldidagi yuksak burch haqidagi buyuk madhiyadir.`
    ]
  },
  {
    id: 'book_7',
    title: 'Clean Architecture',
    author: 'Robert C. Martin',
    category: 'technology',
    language: 'en',
    cover: 'https://images.unsplash.com/photo-1532012164546-f432f2e3777a?auto=format&fit=crop&w=600&q=80',
    description: 'A Craftsman\'s Guide to Software Structure and Design. Essential guidelines for universal system rules, independence of frameworks, testability, and business rules decoupling.',
    rating: 4.8,
    readersCount: 3450,
    publishYear: 2017,
    pagesCount: 3,
    featured: false,
    isNew: false,
    pages: [
      `CHAPTER 1: What is Architecture?

The goal of software architecture is to minimize the human resources required to build and maintain the required system.

The measure of design quality is simply the measure of the effort required to meet the needs of the customer. If that effort is low, and stays low throughout the lifetime of the system, the design is good. If that effort grows with each new release, the design is bad.`,

      `CHAPTER 2: The Dependency Rule

The concentric circles represent different areas of software. In general, the further in you go, the higher level the software becomes. The outer circles are mechanisms. The inner circles are policies.

The overriding rule that makes this architecture work is The Dependency Rule:
Source code dependencies must point only inward, toward higher-level policies. Nothing in an inner circle can know anything at all about something in an outer circle.`,

      `CHAPTER 3: Business Rules are King

Entities encapsulate enterprise-wide critical business rules. Use Cases encapsulate application-specific business rules. Frameworks, databases, and UI are details that should depend on the business core, never vice versa.`
    ]
  },
  {
    id: 'book_8',
    title: 'Преступление и наказание',
    author: 'Фёдор Достоевский',
    category: 'fiction',
    language: 'ru',
    cover: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=80',
    description: 'Глубочайший социально-философский и психологический роман о границах человеческой свободы, совести, падении и возможности духовного возрождения Родиона Раскольникова.',
    rating: 4.9,
    readersCount: 4670,
    publishYear: 1866,
    pagesCount: 4,
    featured: false,
    isNew: false,
    pages: [
      `ЧАСТЬ 1: Замысел в каморке

В начале июля, в чрезвычайно жаркое время, под вечер, один молодой человек вышел из своей каморки, которую нанимал от жильцов в С-м переулке, на улицу и медленно, как бы в нерешимости, отправился к К-ну мосту.

Каморка его приходилась под самою кровлей высокого пятиэтажного дома и походила более на шкаф, чем на квартиру. Он был до того худо одет, что иной, даже и привычный человек, посовестился бы днем выходить в таких лохмотьях на улицу.

В его голове созревала чудовищная теория о делении людей на «тварей дрожащих» и «право имеющих»...`,

      `ЧАСТЬ 2: Муки совести

После совершенного преступления мир Раскольникова раскололся навсегда. Золото и вещи старухи-процентщицы лежали спрятанными под камнем, не принеся ему ни малейшей пользы.

Каждое слово прохожего, каждый взгляд полицейского пристава казались ему прямым обвинением. Лихорадка сотрясала его тело, а душа погрузилась в невыносимый мрак отчуждения от всех живых людей.`,

      `ЧАСТЬ 3: Встреча с Соней

— Разве ты не то же сделала? — прошептал он Соне Мармеладовой. — Ты тоже переступила... смогла переступить. Ты на себя руки наложила, ты загубила жизнь... свою.

Соня посмотрела на него с безмерным состраданием, в котором не было ни тени осуждения:
— Что вы, что вы это над собой сделали! Нет тебя несчастнее никого теперь на всем свете!

Она открыла перед ним Евангелие и начала тихо читать притчу о воскрешении Лазаря...`,

      `ЧАСТЬ 4: Путь к возрождению

В сибирской каторге, на берегу широкой реки, началось долгое перерождение Раскольникова. 

Любовь и смиренная преданность Сони сокрушили его холодную гордость. Он понял, что жизнь не строится по абстрактным логическим формулам, и что подлинное спасение обретается только через любовь, покаяние и сострадание к ближнему.`
    ]
  },
  {
    id: 'book_9',
    title: 'Arxitektura va Muhit Dizayni',
    author: 'Nodira Qosimova',
    category: 'architecture',
    language: 'uz',
    cover: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80',
    description: 'Zamonaviy arxitekturada bioiqlimiy tamoyillar, ekologik shaharsozlik, barqaror materiallar va inson ruhiyatiga me\'moriy makonning ta\'siri haqidagi mukammal darslik.',
    rating: 4.7,
    readersCount: 1820,
    publishYear: 2022,
    pagesCount: 3,
    featured: false,
    isNew: true,
    pages: [
      `1-BOB: Arxitekturada inson omili

Bino — bu shunchaki devorlar va tomdan iborat jismoniy qobiq emas. U insonning kundalik his-tuyg'ularini shakllantiruvchi, unga xotirjamlik yoki ijodiy quvvat baxsh etuvchi tirik muhitdir.

Tabiiy yorug'likning to'g'ri taqsimlanishi, havo aylanishi va vizual kenglik har bir me'moriy loyihaning asosiy mezonlari hisoblanadi.`,

      `2-BOB: Barqaror (Green) shaharsozlik

XXI asr me'morchiligi tabiat bilan uyg'unlik tamoyiliga asoslanadi:
- Qayta tiklanuvchi energiya manbalaridan foydalanish
- Yashil tomlar va vertikal bog'lar
- Mahalliy tabiiy qurilish materiallarining ustunligi
- Suv resurslarini tejovchi aqlli tizimlar`,

      `3-BOB: Sharq va G'arb uyg'unligi

O'zbekistonning boy tarixiy me'moriy merosi (hovli madaniyati, ayvonlar, ganch va naqqoshlik) bugungi zamonaviy konstruksiyalar bilan uyg'unlashganda betakror estetik natijalar beradi.`
    ]
  },
  {
    id: 'book_10',
    title: 'Краткая история времени',
    author: 'Стивен Хокинг',
    category: 'science',
    language: 'ru',
    cover: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80',
    description: 'Один из самых знаменитых научно-популярных бестселлеров в истории. Доступно и увлекательно о Большом взрыве, черных дырах, пространстве-времени и поиске единой теории всего.',
    rating: 4.9,
    readersCount: 5120,
    publishYear: 1988,
    pagesCount: 3,
    featured: true,
    isNew: false,
    pages: [
      `ГЛАВА 1: Наша картина Вселенной

Давным-давно одна пожилая дама слушала лекцию известного астронома об устройстве Солнечной системы. В конце лекции она поднялась и сказала:
— Все, что вы нам рассказали — ерунда. На самом деле наш мир — это плоская тарелка, которая стоит на спине гигантской черепахи.

Ученый снисходительно улыбнулся:
— А на чем же стоит эта черепаха?
— Вы очень умны, молодой человек, но там сплошные черепахи до самого низа!

Сегодня наши представления о космосе шагнули неизмеримо дальше, но главный вопрос остается прежним: откуда взялась Вселенная и куда она движется?`,

      `ГЛАВА 2: Пространство и время

Теория относительности Эйнштейна навсегда покончила с представлением об абсолютном времени. Время не течет одинаково для всех наблюдателей — оно замедляется вблизи массивных гравитационных объектов и при скоростях, близких к скорости света.

Пространство и время неразрывно связаны в четырехмерный континуум, который искривляется под действием массы и энергии.`,

      `ГЛАВА 3: Черные дыры не совсем черные

Величайшим открытием Стивена Хокинга стало доказательство того, что черные дыры не являются абсолютно бездонными могилами материи. Из-за квантовых эффектов вблизи горизонта событий они испускают тепловое излучение (излучение Хокинга) и со временем медленно испаряются.`
    ]
  },
  {
    id: 'book_11',
    title: 'Dunyoning ishlari',
    author: 'O\'tkir Hoshimov',
    category: 'literature',
    language: 'uz',
    cover: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=600&q=80',
    description: 'Ona mehri, bolalik xotiralari va insoniy qadriyatlar haqidagi samimiy va yurakka yaqin qissa va hikoyalar to\'plami. Har bir satrida mehr va hayot haqiqati ufurib turadi.',
    rating: 4.9,
    readersCount: 3950,
    publishYear: 1982,
    pagesCount: 3,
    featured: false,
    isNew: false,
    pages: [
      `HIKOYAT: Onamning ko'ylagi

Onam rahmatli juda kamgap, biroq mehr daryosi bo'lgan ayol edilar. Qachon qarasam, qo'llari ishdan bo'shamas, ro'zg'or tashvishi, biz bolalarning kiyimi va darsi bilan band bo'lardilar.

Katta bo'lib, o'zim ota bo'lganimdan keyingina onamning bizga bergan mehri va chekkan mashaqqatlari qanchalik ulug' bo'lganini to'liq anglab yetdim...`,

      `HIKOYAT: Oq marmar qoshiq

Bolalikning beg'ubor damlari... Mahalla ko'chasida chang to'zitib o'ynagan paytlarimiz. Onam tandirdan yangi uzilgan issiq nonni oldimizga qo'yar ekan:
— Yenglar, bolalarim, nonni uvol qilmanglar, non — rizqimiz poydevori, — der edilar.`,

      `HIKOYAT: Hayot falsafasi

"Dunyoning ishlari" — bu shunchaki o'tmish xotirasi emas. Bu har bir insonning o'z onasiga, ota-onasiga va yaqinlariga bo'lgan ehtiromi hamda mehr-oqibat rishtalarini mustahkamlashga chorlovchi samimiy yurak so'zidir.`
    ]
  },
  {
    id: 'book_12',
    title: 'Atomic Habits (Атомные привычки)',
    author: 'Джеймс Клир',
    category: 'education',
    language: 'ru',
    cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=600&q=80',
    description: 'Проверенная система формирования полезных привычек и избавления от вредных. Как микроскопические изменения на 1% каждый день приводят к колоссальным жизненным результатам.',
    rating: 4.9,
    readersCount: 6200,
    publishYear: 2020,
    pagesCount: 3,
    featured: true,
    isNew: true,
    pages: [
      `ВВЕДЕНИЕ: Сила крошечных изменений

Легко переоценить важность одного судьбоносного момента и недооценить ценность небольших ежедневных улучшений.

Если вы будете становиться лучше всего на 1% каждый день в течение года, к концу года вы станете в 37 раз эффективнее! И наоборот: если вы будете ухудшаться на 1% каждый день, ваша продуктивность упадет почти до нуля.

Привычки — это процентная ставка самосовершенствования.`,

      `4 ЗАКОНА ИЗМЕНЕНИЯ ПОВЕДЕНИЯ

Чтобы привить хорошую привычку:
1. Сделайте ее очевидной (сделайте триггеры заметными)
2. Сделайте ее привлекательной (свяжите с приятными вещами)
3. Сделайте ее простой (уменьшите число шагов до действия)
4. Сделайте ее приносящей удовлетворение (награждайте себя сразу)

Чтобы избавиться от дурной привычки — инвертируйте эти правила.`,

      `ИДЕНТИЧНОСТЬ КАК ОСНОВА ПРИВЫЧКИ

Самое глубокое изменение происходит не на уровне результатов, а на уровне идентичности. 

Цель состоит не в том, чтобы прочитать книгу, а в том, чтобы стать читателем. Цель не в том, чтобы пробежать марафон, а в том, чтобы стать бегуном. Каждое ваше действие — это голос в пользу того человека, которым вы стремитесь стать.`
    ]
  }
];

export const INITIAL_CONVERSATIONS: ChatConversation[] = [
  {
    id: 'chat_1',
    type: 'direct',
    participantIds: ['user_1', 'user_2'],
    unreadCount: 0,
    updatedAt: new Date(Date.now() - 1000 * 60 * 25).toISOString(),
    lastMessage: {
      id: 'msg_3',
      chatId: 'chat_1',
      senderId: 'user_2',
      content: 'Привет, Жасур! Ты уже прочитал главу про рефакторинг в "Чистом коде"? Очень советую!',
      createdAt: new Date(Date.now() - 1000 * 60 * 25).toISOString(),
      read: true
    }
  },
  {
    id: 'chat_2',
    type: 'librarian',
    participantIds: ['user_1', 'admin_1'],
    unreadCount: 1,
    updatedAt: new Date(Date.now() - 1000 * 60 * 12).toISOString(),
    lastMessage: {
      id: 'msg_librarian_1',
      chatId: 'chat_2',
      senderId: 'admin_1',
      content: 'Assalomu alaykum, Jasur! Siz so\'ragan zamonaviy algoritmlar bo\'yicha yangi elektron kitoblar fondimizga yuklandi.',
      createdAt: new Date(Date.now() - 1000 * 60 * 12).toISOString(),
      read: false
    }
  },
  {
    id: 'chat_3',
    type: 'direct',
    participantIds: ['user_1', 'user_3'],
    unreadCount: 0,
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
    lastMessage: {
      id: 'msg_malika_1',
      chatId: 'chat_3',
      senderId: 'user_3',
      content: 'Jasur, arxitektura bo\'yicha kitobdagi bioiqlimiy loyihalash qismi juda qiziq ekan!',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
      read: true
    }
  }
];

export const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'msg_1',
    chatId: 'chat_1',
    senderId: 'user_1',
    content: 'Salom Elena! eLibrary platformasida qaysi adabiyotlarni mutolaa qilyapsan?',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    read: true
  },
  {
    id: 'msg_2',
    chatId: 'chat_1',
    senderId: 'user_2',
    content: 'Привет! Сейчас перечитываю «Мастера и Маргариту» и смотрю книги по программированию.',
    createdAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    read: true
  },
  {
    id: 'msg_3',
    chatId: 'chat_1',
    senderId: 'user_2',
    content: 'Привет, Жасур! Ты уже прочитал главу про рефакторинг в "Чистом коде"? Очень советую!',
    createdAt: new Date(Date.now() - 1000 * 60 * 25).toISOString(),
    read: true
  },
  {
    id: 'msg_librarian_1',
    chatId: 'chat_2',
    senderId: 'admin_1',
    content: 'Assalomu alaykum, Jasur! Siz so\'ragan zamonaviy algoritmlar bo\'yicha yangi elektron kitoblar fondimizga yuklandi.',
    createdAt: new Date(Date.now() - 1000 * 60 * 12).toISOString(),
    read: false
  },
  {
    id: 'msg_malika_1',
    chatId: 'chat_3',
    senderId: 'user_3',
    content: 'Jasur, arxitektura bo\'yicha kitobdagi bioiqlimiy loyihalash qismi juda qiziq ekan!',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
    read: true
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif_1',
    userId: 'user_1',
    type: 'librarian',
    title: 'Kutubxonachi javobi',
    message: 'Kutubxonachi Aziza sizning kitob bo\'yicha so\'rovingizga javob berdi.',
    createdAt: new Date(Date.now() - 1000 * 60 * 12).toISOString(),
    read: false,
    actionView: 'chat',
    actionId: 'chat_2'
  },
  {
    id: 'notif_2',
    userId: 'user_1',
    type: 'chat',
    title: 'Yangi shaxsiy xabar',
    message: '@Elena_Read sizga yangi xabar yubordi: "Привет, Жасур!..."',
    createdAt: new Date(Date.now() - 1000 * 60 * 25).toISOString(),
    read: false,
    actionView: 'chat',
    actionId: 'chat_1'
  },
  {
    id: 'notif_3',
    userId: 'user_1',
    type: 'book',
    title: 'Yangi sara kitob qo\'shildi',
    message: '"Dasturlash asoslari va Algoritmlar" kitobi kutubxonaga joylandi.',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    read: true,
    actionView: 'book-details',
    actionId: 'book_4'
  }
];
