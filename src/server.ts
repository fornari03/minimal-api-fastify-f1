import fastify from "fastify";
import cors from "@fastify/cors";
import { drivers, teams } from "./database/database";

const server = fastify({ logger: true });

server.register(cors, { origin: "*" });

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
