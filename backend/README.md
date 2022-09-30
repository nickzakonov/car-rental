## Description

Backend для аренды автомобилей

## Installation

```bash
$ yarn install
```

## Запуск сервера
Запустите базу данных в докере:
```bash
$ docker-compose start
```
Если база данных готова к работе, то запустите сервер:
```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```
API будет доступен по ссылке:

```bash
http://localhost:5000/api
```

## API
Проверить доступность авто на выбранные даты:
```bash
$ /booking/available
```
Забронировать авто:
```bash
$ /booking/book
```
Получить отчет о бронировании за месяц:
```bash
$ /booking/report
```
