# Query Arithmetic Comparison Operators  [18]
Add to your A1, the following route

`app.get("/pokemonsAdvancedFiltering", ()=>{})` that would handle query comparison operators using the following query parameter:
```js
comparisonOperators
```

For example, the following request
`http://localhost:5000/pokemonsAdvancedFiltering?comparisonOperators=HP<=20, Attack>30`
would return all the pokémons that has HP less than or equal to 20 and Attack more than 30.

<details>
<summary>
Check all the four returned pokémons
</summary>

```js
{
  "hits": [
    {
      "name": {
        "english": "Diglett",
        "japanese": "ディグダ",
        "chinese": "地鼠",
        "french": "Taupiqueur"
      },
      "base": {
        "HP": 10,
        "Attack": 55,
        "Defense": 25,
        "Speed": 95,
        "Speed Attack": 35,
        "Speed Defense": 45
      },
      "_id": "634ec75971b0c703cfce282e",
      "id": 50,
      "type": [
        "Ground"
      ],
      "__v": 0
    },
    {
      "name": {
        "english": "Pichu",
        "japanese": "ピチュー",
        "chinese": "皮丘",
        "french": "Pichu"
      },
      "base": {
        "HP": 20,
        "Attack": 40,
        "Defense": 15,
        "Speed": 60,
        "Speed Attack": 35,
        "Speed Defense": 35
      },
      "_id": "634ec75971b0c703cfce292f",
      "id": 172,
      "type": [
        "Electric"
      ],
      "__v": 0
    },
    {
      "name": {
        "english": "Shedinja",
        "japanese": "ヌケニン",
        "chinese": "脱壳忍者",
        "french": "Munja"
      },
      "base": {
        "HP": 1,
        "Attack": 90,
        "Defense": 45,
        "Speed": 40,
        "Speed Attack": 30,
        "Speed Defense": 30
      },
      "_id": "634ec75971b0c703cfce2a29",
      "id": 292,
      "type": [
        "Bug",
        "Ghost"
      ],
      "__v": 0
    },
    {
      "name": {
        "english": "Duskull",
        "japanese": "ヨマワル",
        "chinese": "夜巡灵",
        "french": "Skelénox"
      },
      "base": {
        "HP": 20,
        "Attack": 40,
        "Defense": 90,
        "Speed": 25,
        "Speed Attack": 30,
        "Speed Defense": 90
      },
      "_id": "634ec75a71b0c703cfce2aab",
      "id": 355,
      "type": [
        "Ghost"
      ],
      "__v": 0
    }
  ],
  "key": "asldkasdk"
}
```

</details>

This route should compare the stats in the `base` field: 

```js
"base": {
        "HP": 20,
        "Attack": 10,
        "Defense": 55,
        "Speed": 80,
        "Speed Attack": 15,
        "Speed Defense": 20
      }
```
using the six arithmetic operators: `<, <=, >, >=, ==, !=`.

## Hints
- [3/18] You should split the value of `comparisonOperators` using the character `,` 
- [3/18] Use REGEX to find and replace the arithmetic operator with mongoose query parameters `$lt`, `$gte`, ..etc.
- [3/18] check the `replace(//, match => match + "-" )` doc to replace the match with the return value of the call back function.
- [3/18] Split the string from previous step into three parts: `stat`, `mongooseOperator`, and `value`.
- [3/18] Use the previous three parts to execute the mongoose find query.

# Query `push` Operator for Pokémon's `type`  [6]
Add the following route

`app.patch("/pokemonsAdvancedUpdate", ()=>{})` that would handle a push-operator update query for pokémon type using the following query parameter:
```js
pushOperator
```

For example, the following *patch* request
`http://localhost:5000/pokemonsAdvancedUpdate?id=1&pushOperator=[Electric, Water]`
would push `Electric` and `Water` types to the pokémon with `id=1`

```js
{
  "msg": "Updated Successfully",
  "pokeInfo": [
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
      "_id": "634e517d71b0c703cfce1151",
      "id": 1,
      "type": [
        "Grass",
        "Poison",
        "Electric",
        "Water"
      ],
      "__v": 0
    }
  ]
}
```

## Hints
- [2/6] read the query parameter, split it on `,` and trim it from whitespace and `[` or `]` to  an array
- [3/6] for each element of the array, execute the mongoose updates similar to the following update queries:
```js
{ '$push': { type: 'Electric' } }
{ '$push': { type: 'Water' } }
```


---
# Deliverables 
- GitHub link to code.

<!-- - Heroku link -->
