using Android.Content;
using Android.Webkit;
using Microsoft.Maui.Controls.Compatibility.Platform.Android;
using Microsoft.Maui.Controls.Platform;

namespace Giraffes.Platforms.Android;

[Obsolete]
public class RedirectWebViewRenderer : WebViewRenderer {

    public RedirectWebViewRenderer(Context context) : base(context) {
    }

    protected override void OnElementChanged(ElementChangedEventArgs<Microsoft.Maui.Controls.WebView> e) {
        base.OnElementChanged(e);
        Control.SetWebViewClient(new RedirectWebViewClient());
        global::Android.Webkit.WebView.SetWebContentsDebuggingEnabled(true);
    }

}
