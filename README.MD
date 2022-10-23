# Antidote

This project has 2 code sources:

   - backend -> `http://localhost:3000/`
   - frontend -> `http://localhost:4200/`



## Requirements

- In order to run this project you mostly need Docker and Docker-compose.
- Port 3000 and Port 4200 need to be available as well has Port 6379 for the Redis service

## Setup

 - Clone the whole repo into your machine, and cd into the `root` folder.
 - In your CLI execute `docker-compose up -d --build`
 - The images should be created and deployed in your machine .


## Endpoints

 - You can access the APP through your local browser @ `http://localhost:4200/`
 - The backend is deployed @ `http://localhost:3000/`

    - It only has one method. `/games`

 ` [GET] /games`

Retrieves a list of games from RAWG it uses the same QueryParams as the 3rd Party API.
    
Example:

    [GET] http://localhost:3000/games?search=Witcher%203&search_precise=true&page=1&page_size=12

QueryParams:

`search`: string
    
- Search query.

`search_precise`: boolean
    
- Disable fuzziness for the search query.

`page_size`: integer
    
- Number of results to return per page.

`page`: integer
    
- 	A page number within the paginated result set.


## TODO - Improvements

Most of the project is optimized for deployment however there are some thing I would add:

- Unit Testing
- Env Injection in frontend production build
- Authentication Middleware for the backend
- Metrics using Grafana or New Relic
