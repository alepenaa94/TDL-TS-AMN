# Instalación

```sh
# Clone the repository
git clone 

# Create the config file from the sample-config file
cp config/index.sample.ts config/index.ts;

# Add your database details
 user: 'db_username',
 password: 'db_password',
 database: 'db_dbname',
 host: 'db_host',
  
# Goto the source code
cd src;

# Install NPM dependencies
npm install;

# Map new-migration command
sudo npm link;
```

# DB

1. You should have **"postgres"** user available in your postgres eco-system.
2. **Create a database** with a name of your choice & assign **"postgres"** user to the database.
3. Now, you should **run the initial seed file** into your DB's Query Tool or we run it for you when you run this application for the first time.
4. Define your migrations inside /database/migrations with format **yyyymmdd-001_(schemas/data/functions)_description.sql**

 ### Migration file

```sh
new-migration
```

# APIs

| Games                      | Players             | App           |
| -------------------------  | -----------------   | ------------- |
|`/games     `               |`/players`           | `/app/version`

| Words                      | Videos              |               |
| -------------------------  | -----------------   | ------------- |
|`/words     `               |`/videos`            | ` `           |
# How to Run?

### Development Environment

```sh
cd src/
npm run dev;
```