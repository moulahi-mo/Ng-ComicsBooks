# ComicBooks

Project Marvel Comics Books.

## Demo

Live demo [Here](https://marvels-comics.netlify.app/)

## Extra Features added in this project

- Angular `animation` For Login & Register page .
- `NgRx` state management for Auth.
- `AuthGuard` for routes ( Favorites | My comics ) .
- Sever workers `PWA` for a beter user experience .
- adding feature Modules , shared Module, core Module and routing Modules .
- lazy loading added for `Auth` routes .

## Mixed Content's Porblem

- `Problem` :

when i deployed the application for the first time i have to solve this problem :

![alt text](https://imgur.com/casKQj3.png)

- `Problem Detection` :

first i detected that the blocked ressource is fired when the callback all promises function to get characters's images was broken by default (http) of the Marvel APi .

- `My solution` :`

i added on the service.ts a function that replace each `http ` callback promises's url by `https` before firing the promises.

![alt text](https://imgur.com/Wo7B8jC.png)
