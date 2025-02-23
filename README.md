# Laravel React App

## Requirement

- PHP >= 8.2
- Node >= 18
- npm >= 8

### Setup project

- Laravel setup

```sh
    > cp .env.example .env (Set the Database credentials)
    > composer install
    > php artisan key:generate
    > php artisan migrate
```

- Compile VueJS assets

```sh
    > npm install
    > npm run dev
```