using Microsoft.AspNetCore.Mvc;

namespace EstudosSolution.Teste4.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BaseController : ControllerBase
{

    private static readonly NLog.Logger Logger = NLog.LogManager.GetLogger(nameof(BaseController));

    public BaseController()
    {
        
    }

    [HttpGet]
    public string PrimeiroRetorno()
    {
        return "Teste";
    }
}
