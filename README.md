# Gaming-Vault

### Table of Contents 

- [About the Project](#about-the-project)
- [Setup and Installation](#setup-and-installation)
- [Tech Stack](#tech-stack)
- [Api integration](#api-integration)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)


## About the Project 

I built the Gaming Vault to make game exploration and tracking easier for gamers. With features like custom lists, ratings and comments, users can organize and document their gaming journey. This application was built with the MERN stack

## Setup and Installation 

### Prerequisites 

- Node.js
- MongoDB

### Installation

1. **Get a free API key (client ID and secret)** at [`https://api-docs.igdb.com/#getting-started`](https://api-docs.igdb.com/#getting-started)

2. **Clone the Repo** 
```
https://github.com/mcsl10/Gaming-Vault
cd Gaming-Vault
```

3. **Set up the backend**
```
cd server
yarn install
```
- Create a `.env` file in the server directory with the following: 

**Important:** Keep your `.env` file private to protect sensitive information.

```
MONGO_URI = <your_mongo_connection_string>   

IGDB_CLIENT_ID = <your_igdb_client_id>  

IGDB_CLIENT_SECRET = <your_igdb_client_secret>  
```

- Start the server: 
```
yarn start
```

4. **Set up the frontend**
```
cd ../client
yarn install
```

- Start the development server: 
```
yarn start
```

5. **Access the app**

Open your browser and navigate to `http://localhost:3000`

## Tech Stack

### Frontend

- React
- Styled-Components 
- Axios

### Backend

- Node.js
- Express
- MongoDB

### APIs

- IGDB API


## API Integration

The Gaming Vault app uses the IGDB API (owned by Twitch) to fetch game information. 

Ensure you have a valid client ID and client secret to authenticate your requests. 

For local development, use Insomnia or similar tools to test API endpoints. 

## Usage 

1. **Create an Account:** Sign up to unlock tracking features. 

2. **Explore Games:** Browse the latest or top games in the industry. 

3. **Search Functionality:** Quickly find games by title

4. **Add to Lists:** Organize your games into categories: Interested, Currently Playing, or Completed. 

5. **Rate & Comment:** Share your thoughts on the games you've played.

<!-- ## Roadmap  -->

## Contributing 

Contributions are welcome! 

1. Fork the Repository 
2. Create your Feature Branch (`git checkout -b feature/YourFeature`)
3. Commit your Changes (`git commit -m 'Add YourFeature'`)
4. Push to the Branch (`git push origin feature/YourFeature`)
5. Open a Pull Request 

## License 

Distributed under the MIT License. See LICENSE.txt for more information.

## Contact 

**Mark Soniel-Loka** 

- [Portfolio](https://mark-soniel-loka-portfolio.vercel.app)
- [LinkedIn](https://www.linkedin.com/in/mark-soniel-loka/)



