using Microsoft.VisualBasic;

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();
// builder.Services.AddCors();


// Dictionary<string, List<String> = new();

app.MapGet("/", () => "Hello World!");

app.MapGet("/users/{userId}",
    (string userId) => $"The user id is {userId}"
);

app.MapGet("/{name}/{color}", (HttpRequest request) =>
{
    var name = request.RouteValues["name"];
     var color = request.RouteValues["color"];
    var page = request.Query["affirm"];
    //var customHeader = request.Headers["X-CUSTOM-HEADER"];
    return "{name} is {color}. {affirm}";
});

app.MapGet("/cheesecake", () => "Hello Cheesecake World!");


app.Run();
