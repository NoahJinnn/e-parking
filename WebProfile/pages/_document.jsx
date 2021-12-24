import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
    render() {
        return (
            <Html>
                <Head>{/* code that you want to add to the header */}</Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
                <script async defer crossorigin="anonymous" src="https://connect.facebook.net/en_US/sdk.js"></script>
                <div id="fb-root"></div>
                <script
                    dangerouslySetInnerHTML={{
                        __html: `window.fbAsyncInit = function() {
                            FB.init({
                              xfbml            : true,
                              version          : 'v10.0'
                            });
                          };
                  
                          (function(d, s, id) {
                            var js, fjs = d.getElementsByTagName(s)[0];
                            if (d.getElementById(id)) return;
                            js = d.createElement(s); js.id = id;
                            js.src = 'https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js';
                            fjs.parentNode.insertBefore(js, fjs);
                          }(document, 'script', 'facebook-jssdk'));`,
                    }}
                />

                <div class="fb-customerchat" attribution="page_inbox" page_id="124021966170799"></div>
            </Html>
        );
    }
}
