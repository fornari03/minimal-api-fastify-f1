# 🏎️ Fastify F1 Minimal API  

This project was developed as part of **DIO's NodeJS Training**, based on the original training repository: [DIO NodeJS Training](https://github.com/digitalinnovationone/formacao-nodejs).  

A **Minimal API** using **Fastify** and **TypeScript** to provide data about **Formula 1**, including teams and drivers.  

## 🚀 Technologies  
- **Fastify** 🚀 (Fast web server)  
- **TypeScript** 🟦 (Static typing)  
- **ESM** (Modern JavaScript modules)  

## 📦 Installation  

```sh
git clone https://github.com/fornari03/minimal-api-fastify-f1.git
cd minimal-api-fastify-f1
npm install
```

## ▶️ Running the server  

```sh
npm run start:dev
```

The API will run on **http://localhost:3000**  

## 📌 Endpoints  

### 🔹 List teams  
```http
GET /teams
```

### 🔹 List drivers  
```http
GET /drivers
```

### 🔹 Get driver by ID  
```http
GET /drivers/:id
```

### 🔹 List drivers by team  
```http
GET /drivers/team/:team
```

## Boilerplate Template  
The following template was used as the initial base for this project:  

[Node Blue Boilerplate](https://github.com/felipeAguiarCode/node-blue-boilerplate)  