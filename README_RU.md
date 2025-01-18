# Техническое задание Backend API

Развернутый экземпляр: [http://backendtest.duckdns.org/api/v1/swagger/](http://backendtest.duckdns.org/api/v1/swagger/)

### [English](https://github.com/volveezz/back-end-test/blob/main/README.md) | Русский

## Требования

-  Node.js >= 20.10.0
-  Docker

## Установка

```bash
git clone https://github.com/volveezz/back-end-test
cd back-end-test
```

## Конфигурация

1. Переименуйте `.env.example` в `.env` или создайте свой собственный файл `.env` на основе примера.

## Сборка

**Production:**

```bash
make build
```

**Development:**

```bash
make build-dev
```

## Запуск

**Production:**

```bash
make run
```

**Development:**

```bash
make run-dev
```

После запуска сайт будет доступен на: [http://localhost:8000/api/v1/swagger/](http://localhost:8000/api/v1/swagger/)
