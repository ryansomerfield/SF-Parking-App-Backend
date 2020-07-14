# Express_Backend_Authentication_Starter
### Description
Some handy starter code for a backend API with express. This project implements authentication with Facebook, Twitter, and Google.

### Usage
To get the backend working, a config.env will have to be placed into the ./config/ directory. A template of the required environment variables are located in ./config/config_template.txt. In the config.env file, the client ids and client secrets will have to be provided for google, facebook and twitter. 

### API Endpoints
All endpoints for this API are located at https://localhost:5000/api. The endpoints for this template are limited, but additional endpoints should be added for a project using this template.

The list of implemented endpoints are:
- API Home: https://localhost:5000/api
- All Users: https://localhost:5000/api/users
- API Login: https://localhost:5000/api/auth
- Facebook Login Link: https://localhost:5000/api/auth/facebook
- Twitter Login Link: https://localhost:5000/api/auth/twitter
- Google Login Link: https://localhost:5000/api/auth/google


### Next Steps
- Add a nice API Home and 404 page template in EJS.
- Handle the window location hash appended to the callbacks for Google and Facebook login.
- Create a bash script to initialize a new npm project using this project as a template.
