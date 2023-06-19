## Домашнее задание - Разработка в IDE и терминале - Написание правила для ESLint - ШРИ 2023

---

В современном ECMAScript код можно делить на модули (ESM, ES-модули). Для потребления кода и данных из другого модуля используется директива import, в которой указывается путь к используемому модулю.

Надо написать для ESLint плагин, в котором будет своё правило с фиксом.

-  Правило должно проверять, отсортированы ли импорты по путям модулей и предлагать отсортировать их.
-  Фикс должен сортировать импорты.
-  Правило должно игнорировать вложенные в блочные конструкции динамические импорты import().
-  Правило должно перемещать комментарии к импорту вместе с этим импортом.

Порядок сортировки:

-  группа импортов со scoped-путями или алиасами (начинающимися с @)
-  пустая строка
-  группа импортов npm-пакетов
-  пустая строка
-  группа импортов с относительными путями, не начинающимися с ./
-  пустая строка
-  группа импортов с относительными путями, начинающимися с ./
-  пустая строка
-  группа динамических импортов

Внутри каждой группы импортов пути должны быть отсортированы по алфавиту

**Пример**

Разрабатываемое правило должно заменять код

```
import {createSelector} from 'reselect';
import type {ExperimentFlag} from '.';
import {compose} from 'recompose';
import {connect} from 'react-redux';
import {selectDeliveryDate} from '../../selectors';
```

на такой:

```
import {connect} from 'react-redux';
import {compose} from 'recompose';
import {createSelector} from 'reselect';

import {selectDeliveryDate} from '../../selectors';

import type {ExperimentFlag} from '.';
```

**Шаблон решения**

Система тестирования ожидает от посылки единственный файл с примерно следующей структурой:

```
'use strict';

// возможный вспомогательный код тут

module.exports = {
  meta: {
    fixable: "code"
  },

  create(context) {
       // основная логика плагина тут
  }
}
```

Справочно: варианты импорта

```
import defaultExport from "module-name";
import * as name from "module-name";
import { export1 } from "module-name";
import { export1 as alias1 } from "module-name";
import { default as alias } from "module-name";
import { export1, export2 } from "module-name";
import { export1, export2 as alias2, /* … */ } from "module-name";
import { "string name" as alias } from "module-name";
import defaultExport, { export1, /* … */ } from "module-name";
import defaultExport, * as name from "module-name";
import "module-name";
```

Справочно: пути импорта:

-  из npm-пакета `from "module-name"`
-  из встроенного в node пакета `from "path" from "node:path"`
-  из scoped-пакета `from "@scope/module-name"`
-  возможно, алиасы и симлинки на папки внутри проекта для сокращения путей `from "@lib/module-name" from "/src/utils/module-name"`
-  относительные пути разной степени вложенности `from "../../utils/module-name"`
-  файлы в том же каталоге или его подкаталогах `from "./module-name" from "./components/module-name"`
-  `data:`, например `import 'data:text/javascript,console.log("hello!");'`

**Полезные ссылки**

-  AST Explorer: https://astexplorer.net/ Нужно использовать парсер typescript-eslint/parser
-  Статьи: https://clck.ru/rHL3Q https://clck.ru/rHHgj
-  Видео: https://youtu.be/EGsQ6LSitdE https://youtu.be/UytjCRXkdZg
-  Документация по плагинам ESLint: https://eslint.org/docs/developer-guide/working-with-plugins
-  Документация по правилам ESLint: https://eslint.org/docs/developer-guide/working-with-rules

