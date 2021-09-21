# Coder Academy Hackathon #1

**Group:** 

Mike Olivotto | Malan Christiansen | Saman 

## Objective

Using vanilla JavaScript, create an app that fetches data from an external API and presents it in a meaningful/useful way.

## The app - Cocktail Master



![drinks](https://media.giphy.com/media/RM04MycST0HzoWfzfX/giphy.gif?cid=ecf05e47nui9laj8gptbs5jemuzhfx7vfmagnp3w0yosewwh&rid=giphy.gif&ct=g)



We all need to unwind a little from time to time - after all, we're living in a pandemic! Our app connects to [https://www.thecocktaildb.com/](https://www.thecocktaildb.com/) API, to pull recipes in a variety of ways depending on your needs:

- **Need some inspiration?** Browse through cocktails, ordered alphabetically

![Browse the drinks list](screengrabs/cm-index.gif)



- **Have some ingredients on hand?** Enter your spirit of choice and receive a random suggestion for a cocktail based on that ingredient.

  ![Search by ingredient](screengrabs/cm-recommend.gif)

  

- **Not sure where to start?** Let Cocktail Master offer you a random suggestion

  ![Search for a cocktail by name or receive random suggestion](screengrabs/cm-search-random.gif)

  

## Languages & Frameworks

- JavaScript
- HTML 5
- CSS
- Bootstrap



## Noteworthy bits & comments

- The API presented the data in some really strange ways, for example:
  - The API always returns an object with a single "drinks" key, followed by an array of objects containing cocktails, even if only 1 cocktail is returned. It was always necessary to dig multiple levels into the object (eg `Object.drinks[0].property`) to pull the necessary data.
  - Ingredients were not returned as an array. Instead they were returned as multiple different key:value pairs, eg strIngredient1, strIngredient2, strIngredient3 etc. This made iterating through ingredients a challenge
