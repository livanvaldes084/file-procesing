# Tsv file processor

## Frameworks

- **Express**
- **Swagger**

## Setup

```bash
npm install
```

## Running

```bash
npm run dev
```

Create the <<files>> folder with the same name and inside copy the tsv files.

### UP

```
user:"demo"
password:"demo"

```

```
http://localhost:3052/api-docs

```

### PUBLIC SERVICES

POST - http://localhost:3052/api/login

### NEED SECURITY SERVICES

They need to pass in the header
Example:
key:x-auth-token
value:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9

### SERVICES

GET - http://localhost:3052/api/files/list
GET - http://localhost:3052/api/files/list?humanreadable=true
