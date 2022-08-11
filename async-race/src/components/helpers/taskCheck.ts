console.log(`Ребят, я еще доделываю проект, если у вас будет возможность перепроверить, оставьте, пожалуйста, контакты
Functional requirements (105 баллов)
1. Basic structure:
  - There should be two views on the site: "Garage" and "Winners". (2.5/5) (implemented garage)
  - "Garage" view should contain its name, page number, and the full amount of items in the database (how many car user has in his garage). (5/5)
  - "Winners" view should contain its name, page number, and the full amount of items in the database (how many records the winners table contains). (0/5)
  - View state should be saved when user switches from one view to another. For example, page number shouldn't be reset, input controls should contain that they contained before switching, etc. (0/10)
2. "Garage" view:
  - User should be able to create, update, delete a car, and see the list of the cars. Car has only two attributes: "name" and "color". For "delete"-operation car should be deleted from "garage" table as well as from "winners".(13/15) (not done delete car from winners)
  - User should be able to select any color from an RGB-Palete like here and see the picture of the car colored with the color selected and car's name.(10/10)
  - Near the car's picture should be buttons to update its attributes or delete it.(5/5)
  - There should be pagination on the "Garage" view (7 cars per one page).(10/10)
  - There should be a button to create random cars (100 cars per click). Name should be assembled from two random parts, for example "Tesla" + "Model S", or "Ford" + "Mustang" (At least 10 different names for each part). Color should be also generated randomly.(10/10)
In development:
3. Car animation:
  - Near the car's picture should be buttons for starting / stoping the car engine. (5/5)
  - User clicks to the engine start button -> UI is waiting for car's velocity answer -> animate the car and makes another request to drive. In case api returned 500 error car animation should be stopped.(20/20)
  - User clicks to the engine stop button -> UI is waiting for answer for stopping engine -> car returned to it's initial place.(5/5)
  - Start engine button should be disabled in case car is already in driving mode. As well as stop engine button should be disabled when car is on it's initial place.(5/5)
  - Car animation should work fine on any screen (smallest screen size is 500px). (15/15)
4. Race animation: (0)
5. "Winners" view: (0)
`);
