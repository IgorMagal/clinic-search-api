# clinic-search-api
Scratch  - Software Engineer Challenge

Introduction:

Welcome to my RESTful API project. This project is built with the aim of providing a user-friendly and efficient way of accessing and retrieving data from multiple JSON files that contain information about vet and dental clinics. The API is built using Node.js, TypeScript, and Jest for testing.

API Endpoint:

The API endpoint that I have built provides access to a list of clinics that can be filtered by name, state, type, from, and to. These filters can be used to retrieve a list of clinics that match specific search criteria. The endpoint supports pagination, allowing users to retrieve data in batches of a specified size.

Techniques used:

To build this RESTful API, I used several techniques and design patterns. Firstly, I used TypeScript to implement the code, which helped to ensure that the code is both easy to read and maintainable. I also implemented TDD (Test Driven Development) to ensure that the code is robust and reliable.

I employed object-oriented programming (OOP) concepts to create reusable code and ensure that the code is modular and flexible. This makes it easy to modify and extend the code in the future.

I implemented pagination and limit techniques to ensure that the API can handle large datasets efficiently. Pagination helps to prevent the API from returning too much data at once, while limit allows users to specify the size of the data they want to retrieve.

Conclusion:

In conclusion, this project showcases how to build a RESTful API that is efficient, reliable, and easy to use. The API endpoint provides access to a list of clinics that can be filtered and paginated to provide users with specific data. The project employs TDD, OOP, TypeScript, and pagination techniques to ensure that the code is robust, maintainable, and scalable.

Assumptions:

I assumed that since we have different types of clinics, It would be beneficial to add a type field in the returned JSON structure. I defined a type to hold the structure and receive data from both sources.

While thinking about a way to interpret State field from both sources since It came with different formats as code and name ex: Florida FL, I used a library called us-states to build a function and normalize it. I hope that’s not considered as using an external database.

API Endpoint:
https://your-api.com/clinics

JSON structure:
```ruby
type Clinic = {
  type: string | null;
  name: string | null;
  state: string | null;
  availability: {
    from: string | null;
    to: string | null;
  };
};
```

Query Parameters:

The parameters can be combined in any order and are not required, there is a default limit of 10 results per page that can be overridden.

name: (optional) A string representing the name of the clinic.
state: (optional) A string representing the state where the clinic is located.
type: (optional) A string representing the type of the clinic (dental or vet).
from: (optional) A string representing the starting time of the clinic's availability (hh:mm) format.
to: (optional) A string representing the ending time of the clinic's availability. (hh:mm) format.
page: (optional) An integer representing the current page of the paginated results.
limit: (optional) An integer representing the number of results per page.

Example Requests:

Get all clinics:
Retrieves all clinics from both data sources
```ruby
http://localhost:3000/clinics
```


Get all clinics from the vet database:
```ruby
http://localhost:3000/clinics?type=vet
```
Get clinics combining all parameters:
```ruby
http://localhost:3000/clinics?name=Pet&state=CA&type=vet&from=00:00&to=24:00&limit=10&page=1
```

Test results:

![image](https://user-images.githubusercontent.com/17888029/233867524-c969ec15-4790-4a79-a900-0a95b96f71b9.png)

Commands:

Test: npm run test
build: npm run build
start with nodemon: npm run start

The solution was deployed to Vercel the working link is the following:
https://clinic-search-api.vercel.app/



