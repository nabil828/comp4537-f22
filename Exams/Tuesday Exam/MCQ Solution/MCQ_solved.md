DCECFC

1
---
The following query, will get you the 
```js
db.unicorns.find()
	.sort({weight: -1})
	.limit(1)
	.skip(2)
```
- the first and second heaviest unicorn
- the second and third heaviest unicorn
- the second heaviest unicorn
-- the third heaviest unicorn



2
---
The output of following query, will get you the 
```js
db.unicorns.find()
	.sort({weight: -1})
	.limit(2)
	.skip(1)
  .count()
```
- 3
- 2
-- 1  
- the second and third heaviest unicorn
- the first and second heaviest unicorn



3
---
```js
db.unicorns.find(
  {
    gender: 'm',
	  $or: [{loves: 'apple'},
		  {weight: {$lte: 500}}]
  })
```
The above query will return 
- all female unicorns which either love apples or weigh less than 500 pounds.
- all female unicorns which either love apples or weigh less than 500 pounds.
- all male unicorns which either love apples or weigh less than 500 pounds.
- all male unicorns which either love orange or weigh less than 500 pounds.
-- all male unicorns which either love apples or weigh less than or equal 500 pounds.
- all female unicorns which either love apples or weigh less than or equal 500 pounds.




4
---
```js
db.unicorns.find({
	weight: {$in:[600, 800]}})
```
The above query will return 
- all unicorns that weigh between 600 and 800 inclusive
- all unicorns that weigh between 600 and 800 exclusive
-- all unicorns that weigh 600 or 800
- all unicorns that weigh between 600 inclusive and 800 exclusive




5
---
What do you think the best usage of the following REGEX
```REGEX
>([\w\s]*)<
```
- Matching a decimal numbers
- Matching phone numbers
- Matching emails
- Matching whitespace
- Matching HTML tags names
-- Matching HTML tags content
- Matching HTML attributes values




6
---
To select` all the none image files that do not end with the 'jpg', 'png', and 'gif' file extensions, we can capture all such filenames using the expression
```bash
.bash_profile	
workspace.doc	
img0912.jpg	
updated_img0912.png
documentation.html
favicon.gif	
img0912.jpg.tmp
access.lock
```

```s
- (\w+)\.(^jpg|^png|^gif)$
- (\w+)\.(^jpg&^png&^gif)$
-- (\w+)?\.[^jpg][^pni][^gf].*$
- (\w+)\.[^jpg][^pni][^gf].*$
```