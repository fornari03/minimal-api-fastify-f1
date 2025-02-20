import fastify from "fastify";
import cors from "@fastify/cors";

const server = fastify({ logger: true });

server.register(cors, { origin: "*" });

const teams = [
  { id: 1, name: "Ferrari", country: "Italy" },
  { id: 2, name: "Mercedes", country: "Germany" },
  { id: 3, name: "Red Bull Racing", country: "Austria" },
  { id: 4, name: "McLaren", country: "United Kingdom" },
];

const drivers = [
  { id: 1, name: "Lewis Hamilton", team: "Ferrari" },
  { id: 2, name: "George Russell", team: "Mercedes" },
  { id: 3, name: "Max Verstappen", team: "Red Bull Racing" },
  { id: 4, name: "Lando Norris", team: "McLaren" },
  { id: 5, name: "Charles Leclerc", team: "Ferrari" },
  { id: 6, name: "Valtteri Bottas", team: "Mercedes" },
];

server.get("/teams", async (request, response) => {
  response.type("application/json").code(200);
  return { teams };
});

server.get("/drivers", async (request, response) => {
  response.type("application/json").code(200);
  return { drivers };
});

interface DriverParams {
  id: string;
}

interface TeamParams {
  team: string;
}

server.get<{ Params: DriverParams }>(
  "/drivers/:id",
  async (request, response) => {
    const driver = drivers.find(
      (driver) => driver.id === parseInt(request.params.id)
    );
    if (driver) {
      response.type("application/json").code(200);
      return { driver };
    } else {
      response.type("application/json").code(404);
      return { message: "Driver not found" };
    }
  }
);

server.get<{ Params: TeamParams }>(
  "/drivers/team/:team",
  async (request, response) => {
    const team = request.params.team;
    const teamDrivers = drivers.filter((driver) => driver.team === team);
    if (teamDrivers.length > 0) {
      response.type("application/json").code(200);
      return { teamDrivers };
    } else {
      response.type("application/json").code(404);
      return { message: "Team not found" };
    }
  }
);

server.listen({ port: 3000 }, () => {
  console.log(`Server listening`);
});
