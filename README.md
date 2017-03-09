# swipejobs Technical Assignment

REST API to find jobs for workers.

## Getting Started

Make sure that you have [Node.js](https://nodejs.org) installed on your computer.

Fetch all the dependencies.

```bash
npm install
```

Now you can run the application.

```bash
npm start
```

Entry point of the REST API

```
localhost:8000
```

## API Docs

REST APIs are self documenting. Therefore, once you know the entry point to the REST API, the client should be able to discover all the capabilities of the REST API.

**Nevertheless, here are some main end-points**

Fetch worker
```
GET /worker/{workerId}
```

Find jobs for worker
```
GET /worker/{workerId}/jobs
```

Fetch job
```
GET /job/{jobId}
```


## Testing

Execute the test suite

```bash
npm test
```
