# Backend API Technical Test

Deployed instance: [http://backendtest.duckdns.org/api/v1/swagger/](http://backendtest.duckdns.org/api/v1/swagger/)

### English | [Русский](https://github.com/volveezz/back-end-test/blob/main/README_RU.md)

## Requirements

-  Node.js >= 20.10.0
-  Docker

## Installation

```bash
git clone https://github.com/volveezz/back-end-test
cd back-end-test
```

## Configuration

1. Rename `.env.example` to `.env` or create your own `.env` file based on the file example.

## Build

**Production:**

```bash
make build
```

**Development:**

```bash
make build-dev
```

## Run

**Production:**

```bash
make run
```

**Development:**

```bash
make run-dev
```

After starting the project, you can view the instance at: [http://localhost:8000/api/v1/swagger/](http://localhost:8000/api/v1/swagger/)
