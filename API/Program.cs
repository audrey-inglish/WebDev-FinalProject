using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.VisualBasic;
using System.Text.Json;


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

app.MapGet("/collections/{collectionName}/get-favorites", string (HttpRequest request) =>
{
    var collectionName = request.RouteValues["collectionName"];
    var result = new List<string>() { };

    if (userFavorites.ContainsKey(collectionName.ToString()))
    {
        result = userFavorites[collectionName.ToString()];
    }

    return JsonSerializer.Serialize(result);
});

app.MapGet("/collections/{collectionName}/save-favorites", (HttpRequest request) =>
{
    var collectionName = request.RouteValues["collectionName"];
    var rivers = request.Query["rivers"];

    List<string> riversList = rivers.ToList();

    userFavorites[collectionName.ToString()] = riversList;
    string output = collectionName.ToString();
    output += string.Join(',', riversList.ToArray());

    if (output != null)
    {
        return "success";
    }
    else
    {
        return "failure";
    }

});



app.Run();
