# Submit six letters answers for the following six questions in order. For example, `ABCDEE`. 


What is the output following query?

```js
db.unicorns.find()
	.sort({weight: -1})
	.limit(1)
	.skip(2)
```
- (A) the first and second heaviest unicorn
- (B) the second and third heaviest unicorn
- (C) the second heaviest unicorn
- (D) the third heaviest unicorn



---
What is the output following query?

```js
db.unicorns.find()
	.sort({weight: -1})
	.limit(2)
	.skip(1)
  .count()
```
- (D) the second and third heaviest unicorn
- (E) the first and second heaviest unicorn
- (A) 3
- (B) 2
- (C) 1  




---
What is the output following query?

```js
db.unicorns.find(
  {
    gender: 'm',
	  $or: [{loves: 'apple'},
		  {weight: {$lte: 500}}]
  })
```
- (A) all female unicorns which either love apples or weigh less than 500 pounds.
- (B) all female unicorns which either love apples or weigh less than 500 pounds.
- (C) all male unicorns which either love apples or weigh less than 500 pounds.
- (D) all male unicorns which either love orange or weigh less than 500 pounds.
- (E) all male unicorns which either love apples or weigh less than or equal 500 pounds.
- (F) all female unicorns which either love apples or weigh less than or equal 500 pounds.




---
What is the output following query?

```js
db.unicorns.find({
	weight: {$in:[600, 800]}})
```
- (A) all unicorns that weigh between 600 and 800 inclusive
- (B) all unicorns that weigh between 600 and 800 exclusive
- (C) all unicorns that weigh 600 or 800
- (D) all unicorns that weigh between 600 inclusive and 800 exclusive




---
What do you think the best usage of the following REGEX?

```regexp
>([\w\s]*)<
```
- (A) Matching a decimal numbers
- (B) Matching phone numbers
- (C) Matching emails
- (D) Matching whitespace
- (E) Matching HTML tags names
- (F) Matching HTML tags content
- (G) Matching HTML attributes values





---
To select` all the none following image files that do not end with the 'jpg', 'png', and 'gif' file extensions, we can capture all such filenames using which expression?
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

- (A) (\w+)\.(^jpg|^png|^gif)$
- (B) (\w+)\.(^jpg&^png&^gif)$
- (C) (\w+)?\.[^jpg][^pni][^gf].*$
- (D) (\w+)\.[^jpg][^pni][^gf].*$