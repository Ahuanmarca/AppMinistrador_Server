# AppMinistrador Server

Backend for the AppMinistrador app.  

The AppMinistrador app is the capstone project for the Full Stack Developer Bootcamp at The Bridge, in Valencia - Spain.  

## Routes

### `/buildings/all`

Get all buildings.

### `/buildings/list`

Get a list of all buildings, including title (address) and id. Intended for dropdown menu.

### `/buildings/getById/:buildingId`

Get one building by id. Includes the following related data:
- President
- Incidences
- Announces

### `/people/all`

Get all people from database.

### `/people/neighbours/count/byBuildingId/:buildingId`

Counts neighbours by buiding id and date(s).

**Example 1: No query params returns current date only**

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

Accepts query param "dates" with value in "yyyy-mm-dd" format. If provided, returns the total neighbours for the specified dates.

**Example 2: With query params, returns specified dates, and current date at the end**

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

### `/people/owners/count/byBuildingId/:buildingId`

Count owners by building id. Returns the current total as a plain number.

## Technologies

- Node.js
- Express.js
- TypeScript
- PostgreSQL
- Prisma (ORM)
