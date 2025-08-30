# Quiz Backend API 


<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

 <p align="center">A fast and scalable backend for managing quizzes, questions, and players with real-time support and easy API integration.</p>

   

## Project setup

```bash
$ git clone https://github.com/prasanth8961/quiz_backend.git
$ cd quiz_backend
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

Base URL: [https://quizbackend-production-0bdc.up.railway.app](https://quizbackend-production-0bdc.up.railway.app)

## API Status

**Endpoint:** `/`
**Method:** `GET`
**Response:**

```
{
  "success": true,
  "version": "0.0.1",
  "message": "API is running successfully"
}
```

## Players

### Create New Player

**Endpoint:** `/players/create`
**Method:** `POST`


**Response:**

```
{
  "id": "d81c620a-d5ce-4c26-8039-23c1cb729630",
  "name": "BlueLion903",
  "totalScore": 0,
  "createdAt": "2025-08-30T06:07:00.000Z",
  "scores": []
}
```

### Get All Players

**Endpoint:** `/players/all`
**Method:** `GET`
**Response:**

```
[
  {
    "id": "0b23ec9c-bac0-40fe-9ca9-196f3c549bc4",
    "name": "FastElephant271",
    "totalScore": 0,
    "createdAt": "2025-08-29T10:52:45.000Z"
  }
]
```

## Quiz

### Create Quiz

**Endpoint:** `/quiz/create`
**Method:** `POST`
**Request Body:**

```
{
  "startingAt": "2025-08-30T15:30:00.000Z",
  "noOfQuestions": 10,
  "categories": ["Science", "History"]
}
```

**Response:**

```
{
  "roomKey": "KEAII"
}
```

### Join Quiz (Without Room Key)

**Endpoint:** `/quiz/join`
**Method:** `POST`
**Request Body:**

```
{
  "playerId": "6f7bb8ba-ee18-4541-b0a1-1f2a4663a745",
  "roomKey": ""
}
```

**Response:**

```
{
  "quizId": "e694cba6-1fdc-4fbf-8547-2cd665236064",
  "roomKey": "ZLDJKY",
  "startingAt": "2025-08-29T10:08:00.000Z",
  "questions": [
    {
      "id": "q36",
      "title": "Who painted the ceiling of the Sistine Chapel?",
      "options": {
        "A": "Raphael",
        "B": "Michelangelo",
        "C": "Donatello",
        "D": "Leonardo da Vinci"
      },
      "correctAnswer": "B",
      "category": "Art",
      "createdAt": "2025-08-28T03:46:07.000Z"
    }
  ]
}
```

### Join Quiz (With Room Key)

**Endpoint:** `/quiz/join`
**Method:** `POST`
**Request Body:**

```
{
  "playerId": "6f7bb8ba-ee18-4541-b0a1-1f2a4663a745",
  "roomKey": "JFLYAG"
}
```

**Response:**

```
{
  "quizId": "70d8e7a7-158c-4e3c-a7a1-c73fb3e7caff",
  "roomKey": "JFLYAG",
  "startingAt": "2025-08-30T15:30:00.000Z",
  "questions": [
    {
      "id": "q68",
      "title": "What is the chemical formula for water?",
      "options": {
        "A": "H2",
        "B": "O2",
        "C": "H2O",
        "D": "CO2"
      },
      "correctAnswer": "C",
      "category": "Science",
      "createdAt": "2025-08-29T07:21:00.000Z"
    }
  ]
}
```

## Scores

### Get Top 5 Players of a Quiz

**Endpoint:** `/scores/top5/:quizId`
**Method:** `GET`
**Example:** `/scores/top5/e694cba6-1fdc-4fbf-8547-2cd665236064`
**Response:**

```
[
  {
    "playerId": "6d592447-9d98-41ea-932e-69a69e9d060b",
    "name": "BlueTiger299",
    "score": 0,
    "totalScore": 0,
    "joinedAt": "2025-08-28T10:21:00.000Z"
  }
]
```

### Leaderboard

**Endpoint:** `/scores/leaderboard/:quizId`
**Method:** `GET`
**Example:** `/scores/leaderboard/b5e485d6-479a-4250-b71b-9f48d5fdc274`
**Response:**

```
[
  {
    "playerId": "43396835-0e6b-4b62-91e0-2408ac5e0207",
    "name": "BlueFox880",
    "score": 0,
    "totalScore": 0,
    "joinedAt": "2025-08-28T06:07:06.000Z"
  }
]
```

## Environment Variables (NestJS)

```
DB_HOST=
DB_PORT=
DB_USER=
DB_PASS=
DB_NAME=
```

## Notes

* All timestamps are in ISO 8601 format (`YYYY-MM-DDTHH:MM:SS.sssZ`).
* `roomKey` is required to join a specific quiz.
* `totalScore` represents cumulative score of a player.
* Available categories:

  * Science
  * Math
  * Geography
  * Literature
  * Art
  * Technology
  * Sports
  * Food
