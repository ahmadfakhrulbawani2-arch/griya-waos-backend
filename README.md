# API URL

**BASE URL** is : `/api/v1`

## Users Table (users)

`/login`: To login (needs username and password) <br />
`/register`: To register (needs username, password and email) <br />

## Books Table (books)

**GET** `/books`: Get all books (can use page=&limit= params)<br />
**GET** `/books/:id`: Get book by id <br />
**POST** `/books`: Create book <br />
**PUT** `/books/:id`: Update book <br />
**DELETE** `/books/:id`: Delete a book <br />

Data: [Books Database](./src/data/mockBooks.json)<br />
