Node.js - Лабораторна робота 4

Виконав: Добридник Дмитро ІК-03

### _Тема: REST API та OpenAPI_

#### Відпові на контрольні питання:

<u>_1. Чому REST називається саме так?_</u>

`REST` - це скорочення від англійського терміну *"Representational State Transfer"*, що означає передачу стану представлення. Це архітектурний стиль для побудови розподілених систем, який зазвичай використовується веб-додатками

Термін "REST" був запропонований Роєм Філдінгом, одним з авторів протоколу HTTP, в його дисертації *2000 року*. Він використовував цей термін, щоб описати підхід, який він розробив для побудови архітектурних рішень в Інтернеті. У своїй дисертації Філдінг пояснив, що REST має бути побудований на основі протоколу HTTP, використовуючи його методи, такі як `GET`, `POST`, `PUT` і `DELETE`. Цей підхід повинен бути заснований на ресурсах (resources) як основному елементі взаємодії між клієнтом та сервером, і на тому, що клієнт може переглядати і змінювати стан цих ресурсів, якщо він має необхідні права доступу.

Один з прикладів REST-веб-додатку може бути веб-сайт електронної комерції, де клієнти можуть переглядати товари, додавати їх до кошика, здійснювати оплату та виконувати інші дії.

У цьому веб-додатку, клієнти можуть взаємодіяти з сервером за допомогою *HTTP-методів*, що відповідають стандартним операціям управління ресурсами, такими як `GET`, `POST`, `PUT` та `DELETE`.Наприклад, щоб отримати список товарів, клієнт може виконати запит `GET` на відповідний ресурс, наприклад, **/products**. Сервер відповість клієнту списком товарів у форматі *JSON* або *XML*. Для оновлення деталей товару, клієнт може виконати запит `PUT` на ресурс, який представляє цей товар, передаючи в тілі запиту нові значення. Сервер може повернути відповідь з оновленими даними. Щоб видалити товар з кошика, клієнт може виконати запит `DELETE` на відповідний ресурс, наприклад, **/cart/{productId}**, де **{productId}** - ідентифікатор видаляємого товару. Сервер може повернути відповідь, що містить інформацію про успішне видалення товару.

Даний приклад використання стандартних *HTTP-методів* та форматів відповідей дозволяє забезпечити просту та зрозумілу взаємодію між клієнтом та сервером.

---

<u>_2. Опишіть поняття ідемпотентності в REST API._</u>

`Ідемпотентність` в REST API означає, що при виконанні одного й того ж запиту до сервера декілька разів поспіль, результат буде такий самий, як і при виконанні запиту лише один раз. Тобто, якщо запит є ідемпотентним, то він може бути виконаний безпечно та без шкоди для ресурсів сервера.

Це важливо в REST API, оскільки клієнти можуть виконувати запити багато разів через проблеми з мережею або після отримання помилки від сервера. Якщо запит не є ідемпотентним, то він може привести до непередбачуваного стану на сервері, так як ресурси можуть бути створені або змінені кілька разів.

Деякі з *HTTP-методів* в REST API є ідемпотентними, такі як `GET`, `PUT` та `DELETE`. Наприклад, запит `GET` на ресурс поверне тільки читальну інформацію про цей ресурс, тому він завжди буде ідемпотентним. Запит `PUT` на ресурс може змінити цей ресурс, але якщо його виконати декілька разів, то ресурс буде змінений тільки один раз. Запит `DELETE` на ресурс може видалити цей ресурс, але якщо його виконати декілька разів, то ресурс буде видалений тільки один раз.

Наприклад, якщо клієнт відправляє запит `PUT` на ресурс */users/123* з певними даними, і пізніше він відправляє той же самий запит з тими самими даними, то сервер повинен повернути той же результат, як і при першому запиті. Це є прикладом ідемпотентного запиту.

---

<u>_3. Опишіть особливості (параметри, кешування, що передається в тілі) кожного з використаних в лабораторній методів HTTP._</u>

У лабораторній роботі використовуються чотири методи HTTP: `GET`, `POST`, `PUT` та `DELETE`. Кожен з цих методів має свої особливості.

1.	`HTTP GET`: цей метод використовується для отримання ресурсу з сервера. Він передає параметри запиту у рядку запиту URL. Параметри GET-запиту знаходяться після знаку питання (?) у URL. Наприклад, у запиті *GET /users?id=123* параметр "id" дорівнює "123". GET-запити можуть бути кешовані, тобто відповіді на запити можуть бути збережені у кеші на клієнті чи на проміжному сервері для подальшого використання без повторного запиту до сервера. У тілі запиту GET нічого не передається.
2.	`HTTP POST`: цей метод використовується для створення нового ресурсу на сервері. У POST-запитах дані передаються у тілі запиту. Параметри POST-запиту можуть бути закодовані у форматі *JSON*, *XML*, або у вигляді форми даних *(application/x-www-form-urlencoded)*. POST-запити не кешуються, оскільки при кожному запиті створюється новий ресурс.
3.	`HTTP PUT`: цей метод використовується для зміни існуючого ресурсу на сервері. У PUT-запиті дані передаються у тілі запиту. Параметри PUT-запиту можуть бути закодовані у форматі *JSON*, *XML*, або у вигляді форми даних *(application/x-www-form-urlencoded)*. PUT-запити можуть бути кешовані, тому що результат запиту не залежить від часу, і повторні запити можуть повернути той же результат.
4.	`HTTP DELETE`: цей метод використовується для видалення ресурсу на сервері. У DELETE-запиті дані не передаються в тілі запиту. DELETE-запити не кешуються, оскільки при кожному запиті видаляється ресурс.

Отже, кожен метод *HTTP* має свої особливості. GET-запити можуть бути кешовані, POST-запити передають дані у тілі запиту, PUT-запити можуть бути кешовані, а DELETE-запити не передають дані у тілі запиту. Важливо враховувати ці особливості при проектуванні REST API та взаємодії з ними.

Кешування може значно покращити продуктивність веб-додатку, зменшуючи час на отримання відповіді від сервера. Однак, слід бути уважним при кешуванні даних, оскільки старі дані можуть бути використані замість оновлених. Також, POST- та PUT-запити можуть містити чутливі дані, тому важливо забезпечити захист цих даних за допомогою HTTPS-з'єднання та інших заходів безпеки.

Крім того, важливо звернути увагу на відповіді від сервера на запити. Відповіді можуть бути в форматі `JSON`, `XML`, `HTML` або іншому форматі. У відповіді можуть міститися додаткові параметри, які можуть бути корисні для подальшої обробки даних на клієнтському боці. Користувачі REST API повинні бути ознайомлені з особливостями кожного методу *HTTP* та вміти їх правильно використовувати, щоб забезпечити ефективну взаємодію з веб-додатком.

---

<u>_4. Опишіть різницю методів PUT та POST в REST API._</u>

У REST API методи `PUT` та `POST` використовуються для створення або оновлення ресурсів на сервері. Однак, між цими методами є певна різниця.

Метод `POST` використовується для створення нового ресурсу на сервері. При використанні методу `POST` клієнт надсилає запит на сервер з даними для створення нового ресурсу. Сервер створює новий ресурс і повертає відповідь з інформацією про створений ресурс, включаючи його ідентифікатор. Запит методом `POST` може містити дані у тілі запиту.

Метод `PUT` використовується для оновлення існуючого ресурсу на сервері. При використанні методу `PUT` клієнт надсилає запит на сервер з даними для оновлення ресурсу, включаючи ідентифікатор ресурсу. Якщо ресурс з таким ідентифікатором існує, сервер оновлює його з використанням наданих даних. Якщо ж ресурс з таким ідентифікатором не існує, сервер створює новий ресурс з наданими даними. Запит методом `PUT` також може містити дані у тілі запиту.

Отже, різниця між методами `PUT` та `POST` полягає в тому, що метод `POST` використовується для створення нового ресурсу, тоді як метод `PUT` використовується для оновлення існуючого ресурсу або створення нового, якщо ресурс з таким ідентифікатором не існує. В обох випадках можна передати дані у тілі запиту. Важливо коректно використовувати ці методи в залежності від потреб вашого додатку.

Зважаючи на те, що `Node.js` - це серверний JavaScript, різницю між методами `PUT` та `POST` можна продемонструвати на прикладі написання роутів для REST API з використанням фреймворка `Express.js`.

* Приклад використання методу `POST` для створення нового ресурсу:
```JavaScript
const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let resources = [];

app.post('/resources', (req, res) => {
  const resource = req.body;
  resources.push(resource);
  res.status(201).send(resource);
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
```
У цьому прикладі ми створюємо ресурс методом `POST` за адресою `/resources`. Дані, які передаються в тілі запиту, ми отримуємо за допомогою middleware `express.json()`, який перетворює дані з формату JSON у об'єкт JavaScript. Далі ми додаємо отриманий ресурс до масиву `resources` та відправляємо відповідь клієнту зі статус кодом 201, який означає, що ресурс успішно створено.

* Приклад використання методу `PUT` для оновлення існуючого ресурсу:
```JavaScript
const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let resources = [
  { id: 1, name: 'Resource 1', description: 'Description of resource 1' },
  { id: 2, name: 'Resource 2', description: 'Description of resource 2' },
];

app.put('/resources/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const updatedResource = req.body;

  resources = resources.map((resource) => {
    if (resource.id === id) {
      return { ...resource, ...updatedResource };
    }
    return resource;
  });

  res.status(200).send(`Resource with id ${id} updated successfully`);
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
```
У цьому прикладі ми оновлюємо існуючий ресурс методом `PUT` за адресою `/resources/:id`, де `:id` - це параметр, що вказує на ідентифікатор ресурсу, який ми хочемо оновити. Дані, які передаються в тілі запиту, ми також отримуємо за допомогою middleware `express.json()`. За допомогою методу `Array.map()` ми проходимося по всіх елементах масиву `resources`. Якщо ідентифікатор поточного ресурсу дорівнює ідентифікатору, що ми отримали з параметра `:id`, ми оновлюємо дані за допомогою оператора розширення `...` і повертаємо оновлений об'єкт. Інакше ми повертаємо незмінений об'єкт. Після оновлення ми повертаємо статус 200 та повідомлення про те, що ресурс з ідентифікатором id успішно оновлено.

---

<u>_5. На які дії доречно використовувати кешування?_</u>

Кешування може бути корисним для покращення продуктивності та зменшення навантаження на сервер у випадках, коли деякі ресурси часто запитуються. Основні дії, які можна кешувати, включають:

1.	Запити на отримання даних, які змінюються рідко. Це можуть бути, наприклад, статичні файли, такі як зображення, стилі або скрипти.
2.	Запити на отримання даних з бази даних, які рідко змінюються. Це можуть бути, наприклад, списки користувачів або категорії товарів у електронному магазині.
3.	Запити на отримання даних, які важкі для обчислення. Це можуть бути, наприклад, результати складних запитів до бази даних або обробка великих обсягів даних на сервері.
4.	Запити на отримання даних, які є спільними для багатьох користувачів. Наприклад, якщо декілька користувачів запитують одну й ту ж сторінку зі списком товарів або повідомлень.
5.	Запити на отримання даних, які можуть бути передані з сервера на клієнт, а потім бути використані клієнтом для наступних запитів. Наприклад, це можуть бути токени або ідентифікатори сесій.

Важливо пам'ятати, що кешування може призвести до проблем, якщо дані на сервері змінюються часто. Тому, перш ніж застосовувати кешування, потрібно ретельно проаналізувати, які запити дійсно потребують кешування та як часто дані змінюються.

Основним механізмом кешування в `Node.js` є використання пакету node-cache. Даний пакет дозволяє зберігати дані в оперативній пам'яті сервера і використовувати їх для прискорення відповіді на наступні запити. Нижче наведено приклади використання кешування для покращення продуктивності веб-сервера на `Node.js`.

* Кешування результатів важких операцій
```JavaScript
const express = require('express');
const NodeCache = require('node-cache');
const app = express();
const cache = new NodeCache();

function calculateHeavyOperation(param) {
  // Повертаємо результат важкої операції
  return Math.pow(param, 2);
}

app.get('/calculate', (req, res) => {
  const param = req.query.param;

  // Перевіряємо, чи є результат в кеші
  const cachedResult = cache.get(param);
  if (cachedResult) {
    // Використовуємо результат з кешу
    return res.send(`Result: ${cachedResult}`);
  }

  // Якщо результату немає в кеші, обчислюємо його
  const result = calculateHeavyOperation(param);

  // Зберігаємо результат в кеші на 5 хвилин
  cache.set(param, result, 300);

  res.send(`Result: ${result}`);
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
```
У даному прикладі ми кешуємо результати важких операцій, щоб уникнути повторного їх обчислення, коли запити з тими ж параметрами надходять знову. Ми використовуємо NodeCache для зберігання результатів у пам'яті.

У маршруті `GET /calculate` ми отримуємо параметр `param` з запиту та перевіряємо, чи є відповідний результат в кеші. Якщо результат знайдений, ми повертаємо його відповідь. Якщо результат не знайдений, ми обчислюємо результат за допомогою функції `calculateHeavyOperation()`, зберігаємо результат у кеші на 5 хвилин та повертаємо результат у відповідь. Кешування результатів важких операцій може покращити продуктивність додатка, особливо коли важка операція виконується часто з однаковими параметрами.

*	Кешування даних з бази даних

```JavaScript
const express = require('express');
const NodeCache = require('node-cache');
const app = express();
const cache = new NodeCache();
const db = require('./db');

app.get('/users/:id', (req, res) => {
  const userId = req.params.id;

  // Перевіряємо, чи є користувач в кеші
  const cachedUser = cache.get(userId);
  if (cachedUser) {
    // Використовуємо дані з кешу
    return res.send(cachedUser);
  }

  // Якщо користувача немає в кеші, запитуєм дані з бази даних
  const user = await User.findOne({ email });
  // Додаємо користувача до кешу
  if (user) {
    client.setex(email, 3600, JSON.stringify(user));
  }

  res.json(user);
}) 

// Запускаємо сервер на порту 3000
app.listen(3000, () => {
console.log('Server started on http://localhost:3000');
});
```
У даному прикладі ми використовуємо бібліотеку NodeCache для кешування даних. Для підключення до бази даних ми використовуємо модуль `db`, який в даному випадку не наведений.

Маршрут `/users/:id` обробляє запити для отримання користувачів за їхнім ідентифікатором. При отриманні запиту ми перевіряємо, чи є користувач з таким ідентифікатором в кеші. Якщо так, ми повертаємо дані про користувача з кешу, використовуючи метод `.get()` об'єкту кешу. Якщо ж користувача немає в кеші, ми запитуємо його дані з бази даних, використовуючи асинхронний метод `User.findOne()`. Після того, як ми отримали дані про користувача, ми додаємо їх до кешу за допомогою методу `.setex()` об'єкту кешу. Параметр `setex()` дозволяє встановити таймаут для даних у кеші. У кінці обробки запиту ми повертаємо дані про користувача в форматі JSON за допомогою методу `res.json()`.

---

<u>_6. Опишіть як в REST API виглядає адреса для пошуку в списку обʼєктів однієї з сутностей. Наприклад, всі предмети, які вивчаються учнем._</u>

Адреса для пошуку в списку об'єктів однієї з сутностей в REST API зазвичай складається з адреси базового ресурсу та додаткових параметрів запиту, що дозволяють фільтрувати список за певними критеріями.

Для прикладу з учнями та предметами, можна використовувати таку адресу:
```bash
GET /students/{id}/subjects
```
Де `{id}` - ідентифікатор учня, а `subjects` - список предметів, які вивчає даний учень.

Ця адреса може повернути список предметів, які вивчає даний учень. Додаткові параметри запиту можуть бути використані, наприклад, для сортування, пагінації та фільтрації за певними критеріями, наприклад, за назвою предмета або за датою початку вивчення.

Адреса для пошуку в списку об'єктів однієї з сутностей в REST API повинна містити назву сутності та параметри фільтрації. Наприклад, для отримання списку предметів, які вивчає певний учень, можна використовувати адресу у вигляді:
```bash
`GET /students/{studentId}/subjects`
```
Де `{studentId}` - ідентифікатор учня, а `subjects` - назва ресурсу, що відповідає списку предметів.

Якщо потрібно відфільтрувати список предметів за якоюсь ознакою, наприклад, за рівнем складності, то до адреси можна додати параметр `level`, який вказуватиме на рівень складності:
```bash
`GET /students/{studentId}/subjects?level=easy` 
```
Таким чином, REST API дозволяє створювати адреси з параметрами, що дозволяє більш детально налаштовувати запити до сервера.

---

<u>_7. Опишіть яку роль відіграють статуси HTTP(2XX, 3XX, 4XX) в REST API._</u>

HTTP статус-коди є важливою частиною взаємодії клієнта і сервера в REST API. Вони надають інформацію про те, що відбувається з запитом клієнта та як сервер обробляє цей запит.

Статус-коди HTTP можна розділити на кілька груп, зокрема:

*	`2xx (Successful)`: означає, що запит було успішно оброблено сервером. Найбільш часті статус-коди цієї групи - 200 OK та 201 Created, які вказують, що запит був успішним та сервер повернув очікувану відповідь.
*	`3xx (Redirection)`: означає, що сервер перенаправляє клієнта на іншу адресу для отримання відповіді. Наприклад, статус-код 301 Moved Permanently вказує, що запитуваний ресурс був переміщений на іншу адресу, а статус-код 302 Found вказує на те, що ресурс тимчасово доступний на іншій адресі.
*	`4xx (Client Error)`: означає, що запит був неправильним або не може бути оброблений сервером. Статус-коди цієї групи можуть вказувати на помилки в запиті, наприклад, статус-код 400 Bad Request означає, що запит містить некоректні дані, або на помилки авторизації, наприклад, статус-код 401 Unauthorized.
*	`5xx (Server Error)`: означає, що запит був коректним, але сервер не може його обробити. Найбільш часті статус-коди цієї групи - 500 Internal Server Error, який вказує на внутрішню помилку сервера.

Коди стану HTTP допомагають зрозуміти клієнту, які дії він може виконати далі, які дані він може очікувати від сервера та що йому слід зробити, щоб запит було успішно оброблено. Окрім того, вони також допомагають серверу повідомляти про стан запиту та про помилки, які виникли при обробці запиту.

---

<u>_8. Опишіть підхід HATEOAS_</u>

`HATEOAS` (*Hypermedia as the Engine of Application State*) - це архітектурний підхід у веб-розробці, що базується на використанні гіпермедіа для передачі інформації про можливі стани системи та переходи між ними.

В контексті `REST API`, `HATEOAS` означає, що клієнти отримують не тільки поточний стан ресурсів, але й список дозволених дій, які вони можуть виконувати з цими ресурсами. Наприклад, якщо клієнт отримує список всіх користувачів, він також повинен отримати посилання на можливі дії, які можуть бути виконані з кожним користувачем, такі як оновлення даних або видалення користувача.

Цей підхід дозволяє робити `API` більш автономним та складним, оскільки дозволяє клієнту взаємодіяти з системою за допомогою гіперпосилань, замість того, щоб знати наперед всі можливі адреси та параметри запитів. Крім того, він зменшує залежність клієнта від сервера, оскільки клієнт може виконувати дії з ресурсами самостійно, замість того, щоб надсилати запит на сервер для кожної дії.

* Приклад реалізації підходу `HATEOAS` на `Node.js` з використанням фреймворка `Express` та бібліотеки `hateoas-identifier`.
```JavaScript
const express = require('express');
const app = express();
const port = 3000;
const identifier = require('hateoas-identifier');

const books = [
  {
    id: 1,
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
  },
  {
    id: 2,
    title: 'The Catcher in the Rye',
    author: 'J.D. Salinger',
  },
  {
    id: 3,
    title: '1984',
    author: 'George Orwell',
  },
];

app.get('/books', (req, res) => {
  const booksWithLinks = books.map(book => {
    const links = [
      {
        rel: 'self',
        href: `/books/${book.id}`,
      },
    ];
    return Object.assign({}, book, { _links: links });
  });
  const links = [
    {
      rel: 'self',
      href: '/books',
    },
  ];
  const response = {
    _links: links,
    _embedded: {
      books: booksWithLinks,
    },
  };
  res.json(response);
});

app.get('/books/:id', (req, res) => {
  const book = books.find(book => book.id === Number(req.params.id));
  if (!book) {
    return res.status(404).json({ message: 'Book not found' });
  }
  const links = [
    {
      rel: 'self',
      href: `/books/${book.id}`,
    },
    {
      rel: 'collection',
      href: '/books',
    },
  ];
  const response = Object.assign({}, book, { _links: links });
  res.json(response);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
```
У даному прикладі ми маємо API для отримання списку книжок `(/books)` та однієї книжки за її ідентифікатором `(/books/:id)`. Крім того, ми використовуємо бібліотеку `hateoas-identifier`, яка дозволяє додавати до нашого відповіді посилання зі стандартними відносинами.

Відповідь для запиту `/books` буде містити посилання на сам список книжок `(self)` та масив обʼєктів книжок, кожен з яких містить посилання на себе `(self)`:
```JavaScript
{
  "_links": [
    {
      "rel": "self",
      "href": "/books"
    }
  ],
  "_embedded": {
    "books": [
      {
        "id": 1,
        "title": "To Kill a Mockingbird",
        "author": "Harper Lee",
        "_links": [
          {
            "rel": "self",
            "href": "/books/1"
          }
        ]
      },
      {
        "id": 2,
        "title": "1984",
        "author": "George Orwell",
        "_links": [
          {
            "rel": "self",
            "href": "/books/2"
          }
        ]
      }
    ]
  }
}

app.get('/books', (req, res) => {
  const books = [
    { id: 1, title: 'To Kill a Mockingbird', author: 'Harper Lee' },
    { id: 2, title: '1984', author: 'George Orwell' },
  ];

  const resource = {
    _links: [{ rel: 'self', href: '/books' }],
      _embedded: {
        books: books.map((book) => ({...book, _links: [{ rel: 'self', href: /books/${book.id} }],
        })),
      },
    };

  res.json(resource);
});
```
У цьому прикладі ми створюємо ресурс `"/books"` із списком книг, які містяться в нашій базі даних. Кожна книга містить посилання на свій власний ресурс з детальною інформацією про неї. Крім того, сам ресурс `"/books"` містить посилання на себе для отримання більш детальної інформації про цей ресурс. Таким чином, клієнт може навігуватися по нашому API, використовуючи надані посилання, без необхідності знати *URL-адресу* кожного ресурсу окремо.

---

<u>_9.	Опишіть інші підходи для реалізації API._</u>

Окрім `REST`, існує кілька інших підходів для реалізації `API`:

*	`SOAP` *(Simple Object Access Protocol)* - це протокол обміну повідомленнями, який використовується для створення веб-сервісів. SOAP використовує формат XML для передачі повідомлень і може використовувати різні протоколи для передачі даних, такі як HTTP, SMTP або FTP.
*	`GraphQL` - це запитова мова та середовище виконання запитів для вашого API. GraphQL дозволяє клієнту запитувати лише ті дані, які йому потрібні, замість того, щоб завантажувати весь об'єм даних разом з запитом.
*	`gRPC` - це відкритий протокол для створення розподілених систем. gRPC дозволяє вам описати сервіс за допомогою структури даних та розподілити код, який генерується на кількох мовах програмування. gRPC використовує протокол HTTP/2 для забезпечення швидкості та безпеки взаємодії між клієнтом та сервером.
*	`Falcor` - це JavaScript-бібліотека, яка дозволяє клієнтам отримувати дані з сервера за допомогою одного запиту. Falcor використовує підхід "віртуального JSON", який дозволяє використовувати одну структуру даних, щоб представити весь API.

Кожен з цих підходів має свої переваги та недоліки, і вибір підходу залежить від конкретних потреб вашого проекту.

---
