using EstudosSolution.MangabaVariedades.Application.Logging;
using EstudosSolution.MangabaVariedades.Infra;
using NLog.Web;

var builder = WebApplication.CreateBuilder(args);
{
    builder.Services.AddEndpointsApiExplorer();
    builder.Services.AddSwaggerGen(p =>
        {
            p.EnableAnnotations();
        }
    );
    builder.Services.AddControllers();
    builder.Services.AdicionarServicosTeste4();
    builder.Host.UseNLog();
}

var app = builder.Build();
{
    app.Use(ResponseLogging.Log);
    app.UseSwagger();
    app.UseSwaggerUI();
    app.MapControllers();

    app.Run();
}
