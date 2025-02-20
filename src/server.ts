import fastify from "fastify";

const server = fastify({ logger: true });

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

server.listen({ port: 3000 }, () => {
  console.log(`Server listening`);
});
