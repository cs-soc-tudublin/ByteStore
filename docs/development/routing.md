# Routing

`/` -> This is the landing page, if you're not logged in it will show a login modal
|- `/home` -> All the buttons to all nav elements
|- `/account/?` -> The account profile
|- `/logout/?` -> The logout API endpoint, invalidates all cookies
|- `/equipment` -> See the list of equipment
|  |- `/?` -> A page for the selected equipment
|- `/api` -> The API Endpoints for the Database
|  |- `/equipment` -> Returns the complete list of equipment
|  |- `/item/?` -> Returns the specified item by its id
|  |- `/user/?` -> Returns the specified user by their id
|  |- `/check/?` -> Allows users to check in and out items
|  |- `/alerts` -> Returns alerts and notifications
|  |- `/auth` -> Authentication and security endpoint