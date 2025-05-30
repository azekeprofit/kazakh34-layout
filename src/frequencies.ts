export type letter = keyof typeof letterFrequencies;

const fingerClasses = [
  "bg-blue-100",
  "bg-yellow-100",
  "bg-green-100",
  "bg-orange-100",
  "bg-orange-100",
];

export const fingerColors = fingerClasses.concat(
  fingerClasses.map((s) => s + " ").reverse()
);

export const source =
  'А.K. Zhubanov, А.A. Zhanabekova, D. Tokmyrzaev, "THE STATISTICAL FOUNDATIONS OF THE LOCATION OF THE NATIONAL KAZAKH ALPHABET ON THE KEYBOARD", 2018';
// Kazakh letter frequencies
// full text corpus size is 67449690 letters
export const letterFrequencies = {
  а: 8630862,
  е: 5660025,
  ы: 5378832,
  н: 4192570,
  і: 4154893,
  т: 4066134,
  р: 4028709,
  л: 3824239,
  д: 3413312,
  с: 2708334,
  м: 2040371,
  қ: 1876617,
  о: 1639224,
  к: 1633360,
  ғ: 1256146,
  б: 1229938,
  й: 1175543,
  у: 1103283,
  з: 1095869,
  п: 978676,
  ш: 905698,
  г: 903479,
  ң: 872812,
  и: 866761,
  ж: 738252,
  ұ: 673484,
  ө: 655787,
  ү: 598755,
  ә: 524073,
  я: 231433,
  х: 105688,
  ц: 81165,
  ф: 58378,
  в: 55978,
  э: 30250,
  ь: 25076,
  ю: 20877,
  һ: 5406,
  ъ: 5148,
  ч: 3702,
  щ: 1679,
  ё: 1018,
};

export const bigrams = {
  ар: 688045,
  ан: 582201,
  ал: 565089,
  ын: 562671,
  да: 560939,
  та: 511161,
  ен: 501533,
  ер: 481450,
  қа: 460416,
  де: 458037,
  ін: 451434,
  ла: 422562,
  ды: 417831,
  ты: 404750,
  нд: 399330,
  ға: 396123,
  ке: 371958,
  ай: 369359,
  лы: 342672,
  ті: 333046,
  ді: 331481,
  ас: 330440,
  сы: 327308,
  ме: 323281,
  ат: 284740,
  ба: 281240,
  ны: 276945,
  ың: 275833,
  ол: 273816,
  те: 273269,
  ет: 272744,
  ры: 263800,
  ық: 261904,
  ра: 257203,
  на: 250705,
  жа: 248531,
  ақ: 243641,
  ыл: 241848,
  ле: 241186,
  не: 239816,
  ст: 239516,
  ір: 237178,
  рі: 230151,
  ма: 229464,
  са: 226934,
  ге: 226772,
  ел: 209952,
  ек: 208945,
  ғы: 207327,
  лд: 198170,
  ыр: 197109,
  ағ: 196589,
  рд: 195039,
  ес: 189725,
  іл: 189148,
  тт: 184683,
  бі: 184178,
  ің: 181594,
  лі: 181226,
  гі: 178293,
  ау: 177800,
  қы: 172081,
  ре: 169334,
  ыс: 168863,
  сі: 168801,
  ып: 166290,
  ні: 163289,
  ам: 161755,
  ік: 154050,
  ым: 147729,
  ім: 147386,
  бо: 146149,
  қт: 144973,
  ад: 144878,
  бе: 143874,
  шы: 140779,
  се: 137879,
  ем: 133338,
  із: 131926,
  кі: 130520,
  ег: 128229,
  кө: 127963,
  ор: 126556,
  ап: 120653,
  мы: 120124,
  ыз: 119848,
};

export const letters = Object.keys(letterFrequencies);