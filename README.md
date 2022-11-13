
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
	<a href="https://github.com/takere/takere-api/blob/master/LICENSE"><img src="https://img.shields.io/github/license/takere/takere-api" alt="License"></a>
	<a href="https://github.com/takere/takere-api/releases"><img src="https://img.shields.io/github/v/release/takere/takere-api" alt="Release"></a>
</p>

<hr />

## ❇ Introduction
This system is a RESTful API. It is responsible for defining care plan elements logic, parsing care plan flows, and generating boards. It handles the database and also provides data for the other two Takere systems: HCP and Patient. Takere - API is built using [NodeJS](https://nodejs.org) due to its advantages compared to other server frameworks: its architecture is event-driven and non-blocking I/O. In addition, NodeJS works well with JavaScript, which is the language used in the database.

### Login information
| Email| Password |
|------- | ----- |
| william@email.com |123|

### Care plan elements
Care plan elements are stored in [JSON](https://www.json.org/json-en.html) format and are structured as defined in the table below. We chose JSON because the data structure of our database uses [BSON](https://bsonspec.org). The semantics of specific parameters are defined below. 

#### Care plan element structure

| Name        | Description                                                                                                                                                                                                                                                        |
|--------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Slug         | Name that should be used in back-end systems for storing the element.                                                                                                                                                                                               |
| Name         | Name that should be displayed in front-end systems when creating a care plan flow.                                                                                                                                                                                  |
| Description  | Summary of what the element does.                                                                                                                                                                                                                                   |
| Type         | Indicates if is a begin, conditional, periodic or non-periodic element.                                                                                                                                                                                             |
| Color        | Specifies a color that should be used in front-end systems when the element is used.                                                                                                                                                                                |
| Icon         | Specifies an icon that should be used in front-end systems when the element is used.                                                                                                                                                                                |
| Shape        | Specifies how the element should be displayed in front-end systems when the element is used (square, diamond, among others).                                                                                                                                        |
| Input list   | Indicates entry points of the element (useful when displaying the element in care plan flow). Should be a list of directions (left, top, among others).                                                                                                             |
| Output list  | Indicates output points of the element (useful when displaying the element in care plan flow). Should be a list of directions (left, top, among others).                                                                                                            |
| Content type | As care plan elements can have different parameters besides the basic ones, it is necessary to specify the type of content. The possible types include text, unordered list, ordered list, book and form.                                                           |
| Parameters   | Specifies fields that should be provided when a new instance of the element is created (for example when a HCP puts a begin element in a care plan flow). Parameter structure is specified below. |

| Name       | Description                                                            |
|-------------|-------------------------------------------------------------------------|
| Slug        | Name that should be used in back-end systems for storing the parameter. |
| Name        | Name that should be displayed in front-end systems.                     |
| Description | Summary of the parameter.                                               |
| Required    | Specifies if parameter must be provided or not.                         |
| Type        | Specifies parameter format (numeric, date, radio, among others).        |

#### Basic parameters of care plan elements. Note that the slug field was omitted due to being used only for internal system use

| Name        | Description                                                 | Type       |
|-------------|-------------------------------------------------------------|------------|
| Name        | Instantiated name.                                          | text       |
| Description | Short explanation about the instantiated care plan element. | text       |
| Severity    | How important the care plan element is.                     | It can be: very low, low, medium, critical or very critical |

#### Specific parameters of care plan elements. Note that the slug field was omitted due to being used only for internal system use

| Content type   | Parameters |
|----------------|------------|
| text           | Content    |
| unordered list |            |
| ordered list   |            |
| book           | Pages      |
| form           | Questions  |



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

Periodic nodes are generated according to some frequency. For that, we use a job scheduler and create a job for generating each periodic node according to its frequency. Each job is stored in the database, and the job scheduler is responsible for managing these jobs and running them when necessary.


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

- [NodeJS](https://nodejs.org);
- [MongoDB](https://www.mongodb.com).

## ℹ How to run

1. Create a collection in the database. You can choose whatever name you want;

2. Create a file called `.env` in the project root;

3. Copy all content of `.env.example` and paste it in `.env` file;

4. Change the values of the keys related to database and type your database configuration;

5. Open a terminal in the project root and run the following command: `npm install --legacy-peer-deps`;

6. Run the following command: `npm start`;

7. Now open your browser and go to http://localhost:3002 (must be the port you defined in the `.env` file).

## ↪️ Endpoints

#### /agenda
|HTTP method| URL | Description     | Parameters |
|----------|------------|-----------|-------------|
| `GET` | /today  | Gets cards of the signed user with deadline for today  | - |
| `GET` | /tomorrow  | Gets cards of the signed user with deadline for tomorrow  | - |

#### /board
|HTTP method| URL | Description     | Parameters |
|----------|------------|-----------|-------------|
| `GET` | /me  | Gets all boards that belongs to the signed user | - |
| `POST` | /resolve  | Creates or updates a board | { boardId: string, answers: array(any) } |

#### /flows
|HTTP method| URL | Description     | Parameters |
|----------|------------|-----------|-------------|
| `GET` | /mines  | Gets all created flows by the signed user | - |
| `GET` | /mines/`:id`  | Gets a flow by identifier | `id`: Flow identifier |
| `POST` | /create  | Creates a new flow | { name: string, description: string, patientEmail: string, graph: array({ nodes: array([Node](https://github.com/takere/takere-api/blob/main/src/domain/node.domain.ts)), edges: array([Edge](https://github.com/takere/takere-api/blob/main/src/domain/edge.domain.ts)) }) } |
| `DELETE` | /mines/`:id`  | Removes a flow | `id`: Flow identifier |

#### /nodes
|HTTP method| URL | Description     | Parameters |
|----------|------------|-----------|-------------|
| `GET` | /me  | Gets all available nodes for the signed user | - |
| `GET` | /connections  | Gets all possible node connections | - |

#### /progress
|HTTP method| URL | Description     | Parameters |
|----------|------------|-----------|-------------|
| `GET` | /  | Gets progress of signed user | - |
| `GET` | /patients  | Gets all patients of the signed user | - |
| `GET` | /patients/`:patientId`/`:flowId`  | Gets progress about a patient | `patientId`: Patient identifier \| `flowId`: Care plan flow identifier that the patient belongs to |

#### /users
|HTTP method| URL | Description     | Parameters |
|----------|------------|-----------|-------------|
| `GET` | /logout  | Sign out |  |
| `POST` | /create  | Creates a new user | { firstName: string, lastName: string, password: string, email: string, role: 'user' \| 'admin', profileUrl: string \| undefined } |
| `POST` | /login  | Sign in | { email: string, password: string } |


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
