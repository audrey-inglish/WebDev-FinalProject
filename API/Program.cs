using Microsoft.VisualBasic;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddCors();
var app = builder.Build();

app.UseCors(policy =>
    policy
    .AllowAnyOrigin()
    .AllowAnyMethod()
    .AllowAnyHeader()
);



Dictionary<string, List<string>> userFavorites = new();


app.MapGet("/collections/{collectionName}/get-favorites", List<string> (HttpRequest request) =>
{
    var collectionName = request.RouteValues["collectionName"];

    var result = userFavorites[collectionName.ToString()];
    if (result == null)
    {
        return new List<string>() { };
    }
    return result;
});

app.MapGet("/collections/{collectionName}/save-favorites", (HttpRequest request) =>
{
    var collectionName = request.RouteValues["collectionName"];
    var rivers = request.Query["rivers"];

    List<string> riversList = rivers.ToList();

    userFavorites[collectionName.ToString()] = riversList;
    string output = collectionName.ToString();
    output += string.Join(',', riversList.ToArray());
    return output;

});



app.Run();
