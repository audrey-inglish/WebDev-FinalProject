using Microsoft.VisualBasic;

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();
// builder.Services.AddCors();


Dictionary<string, List<string>> userFavorites= new();

app.MapGet("/", () => "Hello World!");

app.MapGet("/users/{userId}",
    (string userId) => $"The user id is {userId}"
);

app.MapGet("/users/{userName}/get-favorites", (HttpRequest request) => {
    var userName = request.RouteValues["userName"];

    return userFavorites[userName.ToString()];

});

app.MapGet("/users/{userName}/save-favorites", (HttpRequest request) => {
    var userName = request.RouteValues["userName"];
    var rivers = request.Query["rivers"];

    List<string> riversList = rivers.ToList();

    userFavorites[userName.ToString()] = riversList;
    string output = userName.ToString();
    output += string.Join(',', riversList.ToArray());
    return output;
  
        
    //return string.Join(Environment.NewLine, userFavorites);

});



app.Run();
