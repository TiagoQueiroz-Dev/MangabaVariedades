using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace EstudosSolution.MangabaVariedades.Infra;

public static class InjecaoDependencia
{
    public static IServiceCollection AdicionarServicosTeste4(this IServiceCollection pServiceCollection)
    {
        // return pServiceCollection
        //     .AddScoped<>();

        var xRetorno = new ServiceCollection();
        return xRetorno;
    }
}
