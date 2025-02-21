# Green Api Testwork
В этом репозитории представлен интерфейс для отправки сообщений по WhatsApp через GreenApi. Найти запущеный сайт можно по [ссылке](https://greenapi-testwork.vercel.app/)

## Галерея

Страница входа в аккаунт(ввод idInstance и apiTokenInstance):
![Страница входа в аккаунт(ввод idInstance и apiTokenInstance)](./pictures/loginPage.png)

Главная страница без чатов:
![Главная страница без чатов](./pictures/mainPageEmpty.png)

Главная страница с чатом:
![Главная страница с чатом](./pictures/mainPage.png)

## Инструкция по запуску
Чтобы запустить проект у себя на компьютере вам понадобится yarn или npm(или другой package manager для js). 

Скопируйте репозиторий к себе на устройство:
```sh
git clone https://github.com/grommoott/greenapi-testwork.git # или скачать .zip файл и распаковать
cd greenapi-testwork
```

Выполните следующие команды в папке проекта:
```sh
# Для yarn
yarn
yarn build
yarn preview
# Для npm
npm install
npm run build
npm run preview
```

После чего перейдите по [ссылке](http://localhost:4173)
