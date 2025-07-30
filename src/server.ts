import fastify from "fastify";
import cors from "@fastify/cors";

const server = fastify({logger: true});
server.register(cors, {
    origin: "*",
    methods: "GET",
    allowedHeaders: ["Content-Type", "Authorization"]
});

const teams = [
    {id: 1, name: "ferrari"},
    {id: 2, name: "red bull"},
    {id: 3, name: "mercedes"},
    {id: 4, name: "mclaren"},
    {id: 5, name: "alpine"},
    {id: 6, name: "aston martin"},
    {id: 7, name: "williams"},
    {id: 8, name: "alfa romeo"},
    {id: 9, name: "haas"},
    {id: 10, name: "alphatauri"}
];

const drivers = [
    {id: 1, name: "lewis hamilton", team: "Mercedes"},
    {id: 2, name: "max verstappen", team: "Red Bull"},
    {id: 3, name: "charles leclerc", team: "Ferrari"},
    {id: 4, name: "sergio perez", team: "Red Bull"},
    {id: 5, name: "george russell", team: "Mercedes"},
    {id: 6, name: "lando norris", team: "McLaren"},
    {id: 7, name: "pierre gasly", team: "Alpine"},
    {id: 8, name: "esteban ocon", team: "Alpine"},
    {id: 9, name: "lance stroll", team: "Aston Martin"},
    {id: 10, name: "sebastian vettel", team: "Aston Martin"},
    {id: 11, name: "valtteri bottas", team: "Alfa Romeo"},
    {id: 12, name: "kevin magnussen", team: "Haas"},
    {id: 13, name: "nicholas latifi", team: "Williams"},
    {id: 14, name: "mick schumacher", team: "Haas"},
    {id: 15, name: "guanyu zhou", team: "Alfa Romeo"},
    {id: 16, name: "alex albon", team: "Williams"}
];

server.get("/teams", async (request, response)=>{
    response.type("application/json").code(200);
    return [teams];
});

server.get("/drivers", async (request, response)=>{
    response.type("applicantion/json").code(200);
    return[drivers];
})

interface DriverParams {
    id: string;
}

server.get<{Params:DriverParams}>("/drivers/:id", async(request, response)=>{
    const id = parseInt(request.params.id);
    const driver =drivers.find((a) => a.id === id);

    if(!driver){
        response.code(404).send({error: "Driver not found"});
        return;   
    }else{
        response.type("application/json").code(200);
        return driver;
    }
})

server.listen({port:3333}, ()=>{
    console.log("Server init");
});

