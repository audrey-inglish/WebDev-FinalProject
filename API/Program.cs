using Microsoft.VisualBasic;

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();
builder.Services.AddCors();


// Dictionary<string, List<String> = new();

app.MapGet("/", () => "Hello World!");

// app.MapGet("/users/{userId}",
//     (int userId) => $"The user id is {userId}"
// );

app.MapGet("/cheesecake", () => "Hello World!");


app.Run();
