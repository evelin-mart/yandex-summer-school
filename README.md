# Node.js

## Краулер сайта

**Условие**

Компания, занимающаяся разработкой сайтов, столкнулась с проблемой: их клиенты жаловались на низкую посещаемость сайтов. Оказалось, что многие страницы не были проиндексированы поисковыми системами из-за отсутствия ссылок на них.

Вам необходимо написать программу-краулер с использованием Node.js, которая будет проходить по указанному URL-адресу обходить все страницы на сайте и собирать список всех ссылок на другие страницы.

Таким образом можно будет убедиться, что все страницы сайта проиндексированы поисковыми системами и доступны для пользователей.

**Предусловия**

-  версия Node.js - v16.13.0
-  из npm модулей можно использовать только express.js
-  команда запуска сервера node src/server.js
-  для получения содержимого доменов используется поставляемая библиотека fetcher, использовать другие библиотеки нельзя
-  сервер должен запускаться на порту 3000
-  не использовать рекурсию
-  максимальное количество ретраев при ошибках сервера не более 1

**Описание ручек**

Краулер должен собрать со всех страниц уникальные и действительные адреса страниц и сохранить их в массив.

Ссылка для парсинга: POST http://localhost:3000/parse body: { domainName: string} returns: string[]
