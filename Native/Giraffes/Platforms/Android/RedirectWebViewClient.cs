using Android.Webkit;

namespace Giraffes.Platforms.Android;

public class RedirectWebViewClient : WebViewClient {

    public override bool ShouldOverrideUrlLoading(global::Android.Webkit.WebView view, IWebResourceRequest request) {
        CookieManager.Instance.SetAcceptThirdPartyCookies(view, true);
        view.LoadUrl(request.Url.ToString());
        return false;
    }

}
