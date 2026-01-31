using System.Diagnostics;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace EstudosSolution.MangabaVariedades.Application.Logging;

public class ResponseLogging
{
    private ResponseLogging(HttpContext pHttpContext
        , long pElapsedMilliseconds)
    {
        var xRouteData = pHttpContext.GetRouteData();
        Method = $"{xRouteData.Values["action"]}";
        Ip = GetRemoteIpAddress(pHttpContext);
        Url = $"{pHttpContext.Request.Path}";
        ElapsedMilliseconds = pElapsedMilliseconds;
        StatusCode = pHttpContext.Response.StatusCode;
    }

    public string Method { get; set; }
    public string Ip { get; set; }
    // public string Email { get; set; }
    public string Url { get; set; }
    public long ElapsedMilliseconds { get; set; }
    public int StatusCode { get; set; }

    private static string GetRemoteIpAddress(HttpContext pHttpContext)
    {
        if (pHttpContext.Request.Headers.TryGetValue("X-Forwarded-For", out var xForwardedFor) && !string.IsNullOrWhiteSpace(xForwardedFor))
            return xForwardedFor.ToString().Split(':').First();
        return $"{pHttpContext.Connection.RemoteIpAddress}";
    }

    public static async Task Log(HttpContext pHttpContext
        , Func<Task> pNext)
    {
        var xStopwatch = Stopwatch.StartNew();
        await pNext.Invoke();
        var xLogger = pHttpContext.RequestServices.GetRequiredService<ILogger<ResponseLogging>>();
        var xRequestLogging = new ResponseLogging(pHttpContext, xStopwatch.ElapsedMilliseconds);

        xLogger.LogInformation("[TotalMilliseconds={TotalMilliseconds}]"
                               + " IP={RemoteIpAddress}"
                               + " HTTP_STATUS={StatusCode}"
                               + " MÉTODO={Method}"
                               + " URL={Url}"
            , xRequestLogging.ElapsedMilliseconds
            , xRequestLogging.Ip
            , xRequestLogging.StatusCode
            , xRequestLogging.Method
            , xRequestLogging.Url);
    }
}
