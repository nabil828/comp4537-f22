# Midterm Practice
Design an advanced filtering for the Pokémons GET route.

Inspired by https://hn.algolia.com/api/.

## API doc - GET Pokémons with Advanced filtering
----
To get a list of pokémons by a specified query.

### URL
`/pokemonsAdvancedFiltering/query=...`

### Method:
`GET`

---
### URL Query Parameters
Four optional parameters -  `<query>`, `sort`, `filteredProperty`, `hitsPerPage`, and `page`.

| Parameter | Default value |
|---|---|
|`<query>`|  would return all the pokémons if not specified|
|`sort`|  sort based on some property. By default, sort by pokémon id ascendingly. |
|`filteredProperty`|  would to return all the pokémons' properties if not specified|
|`page`| would return page number 1 by default |
|`hitsPerPage`| would control page size. Five pokemons by default |

#### `<query>`
`<query>` is a query parameter that would be substituted with any of a pokémon fields:

```
id, english.name, base.HP, type, ..etc
``` 

Example all the following requests, should receive the same output:

```
http://localhost:5000/pokemonsAdvancedFiltering/?base.HP=45&id=1&type=Grass , Poison
```

```
pokemonsAdvancedFiltering/?name.english=Bulbasaur&id=1
```

```
http://localhost:5000/pokemonsAdvancedFiltering/?base.HP=45&id=1&type=Grass , Poison
```

Received Pokémon:
```json
{
  "hits": [
    {
      "name": {
        "english": "Bulbasaur",
        "japanese": "フシギダネ",
        "chinese": "妙蛙种子",
        "french": "Bulbizarre"
      },
      "base": {
        "HP": 45,
        "Attack": 49,
        "Defense": 49,
        "Speed": 45,
        "Speed Attack": 65,
        "Speed Defense": 65
      },
      "_id": "63451a94fb7bfafd5cbbbf40",
      "id": 1,
      "type": [
        "Grass",
        "Poison"
      ],
      "__v": 0
    }
  ],
  "page": 1,
  "nbHits": 1,
  "nbPages": 1,
  "hitsPerPage": 5,
  "query": {
    "id": "1",
    "type": {
      "$in": [
        "Grass",
        "Poison"
      ]
    }
  },
  "params": "base.HP=45&id=1&type=Grass%20,%20Poison%20"
}
```

#### `sort`
For example, the following should sort by *HP* ascendingly, and then by *Defense* descendingly.
```
http://localhost:5000/pokemonsAdvancedFiltering/?sort=base.HP , -base.Defense
```

#### `filteredProperty`
For example, the following should return only the *names* and *types* of pokémons.
```
http://localhost:5000/pokemonsAdvancedFiltering/?filteredProperty=name.english, type
```

should return

```json
{
  "hits": [
    {
      "name": {
        "english": "Bulbasaur"
      },
      "type": [
        "Grass",
        "Poison"
      ]
    },
    {
      "name": {
        "english": "Charmander"
      },
      "type": [
        "Fire"
      ]
    },
    {
      "name": {
        "english": "Charmeleon"
      },
      "type": [
        "Fire"
      ]
    },
    {
      "name": {
        "english": "Ivysaur"
      },
      "type": [
        "Grass",
        "Poison"
      ]
    },
    {
      "name": {
        "english": "Venusaur"
      },
      "type": [
        "Grass",
        "Poison"
      ]
    }
  ],
  "page": 1,
  "nbHits": 5,
  "nbPages": 1,
  "hitsPerPage": 5,
  "query": {},
  "params": "filteredProperty=name.english,%20type"
}
```

#### `page` and `hitsPerPage`
Pages starts from number One. `hitsPerPage` define the size of a page. default is five.
Example:
```
http://localhost:5000/pokemonsAdvancedFiltering/?type=Grass , Poison&page=1&hitsPerPage=3
```
should return the first three Pokémons from the hit list.

---
### Success Response
  
Upon valid set of parameters with Pokémon to be found, the API will return an array of Pokémons.  

* Sample Response 
```
http://localhost:5000/pokemonsAdvancedFiltering/?type=Grass , Poison&page=1&hitsPerPage=3
```

```json
{
  "hits": [
    {
      "name": {
        "english": "Bulbasaur",
        "japanese": "フシギダネ",
        "chinese": "妙蛙种子",
        "french": "Bulbizarre"
      },
      "base": {
        "HP": 45,
        "Attack": 49,
        "Defense": 49,
        "Speed": 45,
        "Speed Attack": 65,
        "Speed Defense": 65
      },
      "_id": "63450ff1fb7bfafd5cbb6de9",
      "id": 1,
      "type": [
        "Grass",
        "Poison"
      ],
      "__v": 0
    },
    {
      "name": {
        "english": "Ivysaur",
        "japanese": "フシギソウ",
        "chinese": "妙蛙草",
        "french": "Herbizarre"
      },
      "base": {
        "HP": 60,
        "Attack": 62,
        "Defense": 63,
        "Speed": 60,
        "Speed Attack": 80,
        "Speed Defense": 80
      },
      "_id": "63450ff1fb7bfafd5cbb6df2",
      "id": 2,
      "type": [
        "Grass",
        "Poison"
      ],
      "__v": 0
    },
    {
      "name": {
        "english": "Venusaur",
        "japanese": "フシギバナ",
        "chinese": "妙蛙花",
        "french": "Florizarre"
      },
      "base": {
        "HP": 80,
        "Attack": 82,
        "Defense": 83,
        "Speed": 80,
        "Speed Attack": 100,
        "Speed Defense": 100
      },
      "_id": "63450ff1fb7bfafd5cbb6df5",
      "id": 3,
      "type": [
        "Grass",
        "Poison"
      ],
      "__v": 0
    }
  ],
  "page": "1",
  "nbHits": 3,
  "nbPages": 1,
  "hitsPerPage": "3",
  "query": {
    "type": {
      "$in": [
        "Grass",
        "Poison"
      ]
    }
  },
  "params": "type=Grass%20,%20Poison&page=1&hitsPerPage=3"
}
```
   
 
---
### Error Response

  upon wrongful parameters,

  * Sample Response 
  <br/> 
  `{ error : "Invalid query value" }`
  <br/> 
    OR
  <br/> 
  `{ error : "Invalid sort value" }`
  <br/> 
    OR
  <br/> 
  `{ error : "Invalid filteredProperty value" }`
  <br/> 
    OR
  <br/> 
  `{ error : "Invalid page value" }`

* Sample Call

  <_Just a sample call to your endpoint in a runnable format ($.ajax call or a curl request) - this makes life easier and more predictable._> 

* Notes

  <_This is where all uncertainties, commentary, discussion etc. can go. I recommend timestamping and identifying oneself when leaving comments here._> 
