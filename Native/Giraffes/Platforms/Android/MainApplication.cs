using Android.App;
using Android.Runtime;
using Android.Webkit;
using Microsoft.Maui.Controls.Compatibility.Hosting;

namespace Giraffes;

[Application(UsesCleartextTraffic = true)]
public class MainApplication : MauiApplication {
    public MainApplication(IntPtr handle, JniHandleOwnership ownership)
        : base(handle, ownership) {
    }

    protected override MauiApp CreateMauiApp() {
        var builder = MauiApp.CreateBuilder();
        builder
            .UseMauiApp<App>()
            .ConfigureFonts(fonts => {
                fonts.AddFont("OpenSans-Regular.ttf", "OpenSansRegular");
                fonts.AddFont("OpenSans-Semibold.ttf", "OpenSansSemibold");
            })
            .UseMauiCompatibility()
            .ConfigureMauiHandlers(x => {
#if ANDROID
                x.AddCompatibilityRenderer(typeof(Microsoft.Maui.Controls.WebView), typeof(Platforms.Android.RedirectWebViewRenderer));
#endif
            });
        return builder.Build();
    }

}