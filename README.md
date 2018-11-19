# test_app
Test application. Docker (php7.1, nginx, postgres, composer), laravel, vue js.

Выполнить:
```bash
git clone https://github.com/icerockq/test_app.git test_app
```
В `/test_app` выполнить команду

```bash
docker-compose up --build
```
Сам сайт доступен по http://localhost

Админ панель Postgres по http://localhost:8080

Данные для входа в Админ панель Postgres: 

Логин - `test_user` 

Пароль - `qqqqq`

База данных - `test_database`

Хост - `db`
