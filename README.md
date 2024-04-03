# AppMinistrador Server

Backend for the AppMinistrador app.  

The AppMinistrador app is the capstone project for the Full Stack Developer Bootcamp at The Bridge, in Valencia - Spain.  

## API

### Base URL

```
https://appministrador-server-tob7.onrender.com
```

### Routes

#### `Get All Buildings`

```
/buildings/all
```

#### `Get Building List`

Get a list of all buildings, including title (address) and id. Intended for dropdown menu.

```
/buildings/list
```

#### `Get Building By Id`

Get one building by id. Includes the following related data:
- President
- Incidences
- Announces

```
/buildings/getById/:buildingId
```

#### `Get All People`

Get all people from database.

```
/people/all
```

#### `Count Neighbours By Building Id and Date(s)`

Counts neighbours by buiding id and date(s).

```
/people/neighbours/count/byBuildingId/:buildingId
```

- **Example 1: No query params returns current date only**

  Query:

  ```
  /people/neighbours/count/byBuildingId/1
  ```

  Result:

  ``` json
  [ 
    { "2024-04-02": "52" },
  ]
  ```

- **Example 2: With query params, returns specified dates, and current date at the end**

  Accepts query param "dates" with value in "yyyy-mm-dd" format. If provided, returns the total neighbours for the specified dates.

  Query:

  ```
  /people/neighbours/count/byBuildingId/1?dates=2024-01-31&dates=2024-02-29
  ```

  Result:

  ``` json
  [
    {
      "date": "2024-01-31",
      "count": "27"
    },
    {
      "date": "2024-02-29",
      "count": "30"
    },
    {
      "date": "2024-04-01",
      "count": "30"
    }
  ]
  ```

#### `Count Owners By Building Id`

Count owners by building id. Returns the current total as a plain number.

```
/people/owners/count/byBuildingId/:buildingId
```

#### `Get Neighbours By Building Id`

```
/people/neighbours/get/byBuildingId/:buildingId
```

#### `Get Users By Building Id`

```
/people/users/get/byBuildingId/:buildingId
```

#### `Get All Bank Accounts`

Returns accounts without balance information.

```
/banking/accounts/all
```

#### `Get Bank Account Balance (by account id)`

Returns the balance of one bank account.

```
/banking/account/:bankAccountId/balance
```

#### `Get Account Cashflow By Month Rage`

Returns the cashflow (inflow and outflow) of one bank account. Will return the cashflow for the required range of months.

```
/banking/account/:accountId/getCashFlow?start=<date_string>&end=<date_string>
```

Example: Get the inflow and outflow from March 2023 to February 2024 (inclusive):

```
/banking/account/1/getCashflow?start=2023-01-01&end=2023-12-31
```

**You must provide both start and end dates, or the route will return an error.** We will implement default values in the future.

#### `Get Current Month Community Fees`

Returns current month community fees and paid fees.

```
/banking/building/:buildingId/fees
```

#### `Get All Providers`

```
/providers/all
```

## Technologies

- Node.js
- Express.js
- TypeScript
- PostgreSQL
- Prisma (ORM)
