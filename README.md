
<p align='center'>
<img src='https://raw.githubusercontent.com/takere/.github/main/docs/images/logo/logo.png' alt="logo" />
</p>

<h1 align='center'>Takere - API</h1>
<p align='center'>Takere RESTful API</p>
<p align="center">
	<a href="https://github.com/takere/takere-api/actions/workflows/windows.yml"><img src="https://github.com/takere/takere-api/actions/workflows/windows.yml/badge.svg" alt=""></a>
	<a href="https://github.com/takere/takere-api/actions/workflows/macos.yml"><img src="https://github.com/takere/takere-api/actions/workflows/macos.yml/badge.svg" alt=""></a>
	<a href="https://github.com/takere/takere-api/actions/workflows/ubuntu.yml"><img src="https://github.com/takere/takere-api/actions/workflows/ubuntu.yml/badge.svg" alt=""></a>
	<a href="https://nodejs.org/"><img src="https://img.shields.io/badge/NodeJS -14.0+-D0008F.svg" alt="NodeJS"></a>
	<a href="https://mongodb.com/"><img src="https://img.shields.io/badge/MongoDB -5.0+-D0008F.svg" alt="MongoDB"></a>
	<a href="https://github.com/takere/takere-api/blob/master/LICENSE"><img src="https://img.shields.io/github/license/takere/takere-api" alt="License"></a>
	<a href="https://github.com/takere/takere-api/releases"><img src="https://img.shields.io/github/v/release/takere/takere-api" alt="Release"></a>
</p>

<hr />

## ❇ Introduction
This system is a RESTful API. It is responsible for defining care plan elements logic, parsing care plan flows, and generating boards. It handles the database and also provides data for the other two Takere systems: HCP and Patient. Takere - API is built using [NodeJS](https://nodejs.org) due to its advantages compared to other server frameworks: its architecture is event-driven and non-blocking I/O. In addition, NodeJS works well with JavaScript, which is the language used in the database.

### Care plan elements
Care plan elements are stored in [JSON](https://www.json.org/json-en.html) format and are structured as defined in Section~\ref{proposed_approach/flow/care_plan_elements}. We chose JSON because the data structure of our database uses [BSON](https://bsonspec.org). The semantics of specific parameters are defined below. 

#### Specific parameters semantics

|Parameter name|Semantics|
|--------------|---------|
|Content|Any text, including numbers and symbols|
|Pages|List of pages, where each page has a structure (HTML code) and a style (CSS code)|
|Questions|List of questions, where each question has a label (text), a type (defined in the table below) and - optionally, a list of options, where each option has a label (name that is displayed) and a value (name that is used internally). The last should be used when type is radio or checkbox.|

#### Input types

|Name|Description|
|--------------|---------|
|Radio|Selects one option from a set.|
|Select|Selects one option from a list (it is required to provide the options as parameter, where each option has a label - name that is displayed - and a value - name that is used internally).|
|Checkbox|Selects multiple options from a set.|
|Single-line text|Short text.|
|Multi-line text|Long text.|
|Rich text|HTML text.|
|Book|List of pages, where each page has a structure (HTML code) and a style (CSS code).|
|Date|Selects a date from a calendar.|

Note that we chose [MaterialUI](mui.com/material-ui/material-icons) library for providing icons when necessary. Also, icons are part of the care plan structure, and not of parameters, as it is static information. We considered the parameters as the elements of the list.

### Care plan parser
When a new care plan is generated, the care plan parser traverses the care plan flow from its root and parses each node according to its logic. Besides its logic, it is necessary to configure a scheduler if the parsed node is periodic.

Periodic nodes are generated according to some frequency. For that, we use a job scheduler (explained in Section~\ref{background/job_scheduler}) and create a job for generating each periodic node according to its frequency. Each job is stored in the database, and the job scheduler is responsible for managing these jobs and running them when necessary.


## Database
As care plan elements can have different contents, it is more suitable to use a non-relational database. We use [MongoDB](https://www.mongodb.com) because it works using JavaScript (as our server framework NodeJS). Also, it has several advantages, such as storing data using BSON - being very efficient if data is managed in JSON - and being more efficient than some relational databases.

| Collection | Description             | Fields                         | Required |
|------------|-------------------------|--------------------------------|----------|
| boards     | Contains patient boards | id: ObjectId(boards)           | No       |
|            |                         | name: string                   | Yes      |
|            |                         | description: string            | Yes      |
|            |                         | userEmail: string              | Yes      |
|            |                         | flow: ObjectId                 | Yes      |
|            |                         | node: ObjectId(nodes)          | Yes      |
|            |                         | completed: ObjectId(completed) | No       |
| edges      | Contains edges used in each care plan flow | id: ObjectId(edges)            | No       |
|            |     | source: ObjectId(nodes)        | Yes      |
|            |                         | target: ObjectId(nodes)        | No       |
|            |                         | animated: boolean              | No       |
|            |                         | flow: ObjectId(flows)          | Yes      |
| completed  | Contains completed care plan elements of the board     | id: ObjectId(completed)        | No       |
|            |       | node: ObjectId(nodes)          | Yes      |
|            |           | result: Object                 | No       |
| flows      | Contains created care plan flows        | id: ObjectId(flows)            | No       |
|            |          | author: ObjectId(users)        | Yes      |
|            |                         | name: string                   | Yes      |
|            |                         | description: string            | Yes      |
|            |                         | userEmail: string              | Yes      |
| jobs       | Contains jobs related to periodic care plan elements           | id: ObjectId(jobs)             | No       |
|            |      | name: string                   | Yes      |
|            |       | data: Object                   | No       |
|            |                         | type: string                   | No       |
|            |                         | priority: number               | No       |
|            |                         | nextRunAt: Date                | No       |
|            |                         | lastModifiedBy: Date           | No       |
|            |                         | lastRunAt: Date                | No       |
|            |                         | lastFinishedAt: Date           | No       |
| nodes      | Contains nodes used in each care plan flow     | id: ObjectId(nodes)            | No       |
|            |        | type: string                   | Yes      |
|            |                     | data: Object                   | Yes      |
|            |                         | position: Object               | Yes      |
|            |                         | flow: ObjectId(flows)          | Yes      |
| users      | Contains users of the system (patients and HCP)       | id: ObjectId(users)            | No       |
|            |     | firstName: string              | Yes      |
|            |                 | lastName: string               | No       |
|            |                         | password: string               | Yes      |
|            |                         | role: string                   | Yes      |
|            |                         | email: string                  | Yes      |
|            |                         | profileUrl: string             | No       |

## 👥 Acknowledgements
Special thanks to [Rodolfo Viola](https://github.com/rodolfoviolac) for starting development of the platform.

## ✔ Requirements

```
Coming soon
```

## ℹ How to run

```
Coming soon
```

## 🖼 Gallery

```
Coming soon
```

## 🚩 Changelog
Details about each version are documented in the [releases section](https://github.com/takere/takere-api/releases).

## 🗺 Project structure
![architecture](https://raw.githubusercontent.com/takere/takere-api/master/docs/images/design/architecture.png)

## 📁 Files

### /
|        Name        |Type|Description|
|----------------|-------------------------------|-----------------------------|
|\_\_tests\_\_|`Directory`|Test files|
|docs |`Directory`|Documentation files|
|src     |`Directory`| Source files|

### /src
|        Name        |Type|Description|
|----------------|-------------------------------|-----------------------------|
|assets|`Directory`|Application static files|
|config|`Directory`|Environment variables and configuration related files|
|controllers|`Directory`|Files responsible for handling with requests and responses|
|filters|`Directory`|Files called after the route handler and before a response goes out|
|middlewares|`Directory`|Files called only before the route handler is called. It has access to the response object, but it does not have the result of the route handler|
|models / domain / dto|`Directory`|Data and database model files|
|repositories|`Directory`|Files responsible for persisting data|
|routes|`Directory`|Files responsible for defining application endpoints and handling them|
|services|`Directory`|Files responsible for business logic|
|app.ts|`File`|Application point entry|
