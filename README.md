# gatsby-plugin-gdpr-cookies

Gatsby plugin to add google analytics and facebook pixel in a gdpr form to your site.

## Install

`npm install --save gatsby-plugin-gdpr-cookies`

## How to use

```javascript
// In your gatsby-config.js
module.exports = {
  plugins: [
    {
      resolve: `gatsby-plugin-gdpr-cookies`,
      options: {
        googleAnalytics: {
          trackingId: 'YOUR_GOOGLE_ANALYTICS_TRACKING_ID',
          // Optional - Default is gatsby-gdpr-google-analytics
          cookieName: 'YOUR_COOKIE_NAME',
          // Setting this parameter is optional
          anonymize: true
        },
        facebookPixel: {
          pixelId: 'YOUR_FACEBOOK_PIXEL_ID'
          // Optional - Default is gatsby-gdpr-facebook-pixel
          cookieName: 'YOUR_COOKIE_NAME',
        },
        // Defines the environments where the tracking should be available  - default is ["production"]
        environments: ['production', 'development']
      },
    },
  ],
}
```

## How it works
First of all the plugin checks in which environment your site is running. If it's currently running in one of your defined environments it will add the Facebook Pixel javascript by default to the `<head>` of your site. It will not be activated or initialized by this.

By default this plugin will not send any data to Google or Facebook to make it GDPR compliant. The user first needs to accept your cookie policy. By accepting that you need to set one or two cookies - default names are `gatsby-gdpr-google-analytics` and `gatsby-gdpr-facebook-pixel`. Depending on the user input the value of each of the cookies should be `true` or `false`. You can customize cookie names and also use the same cookie to control both tracking services, useful if you are using a cookie consent module such as [react-cookie-consent](https://www.npmjs.com/package/react-cookie-consent).

If the `gatsby-gdpr-google-analytics` cookie is set to true, Google Analytics will be initialized `onClientEntry`. Same is for the Facebook Pixel.

The page view will then be tracked on `onRouteUpdate`.

__Important:__ Please keep in mind to set the cookies. Otherwise the tracking won't work! Tracking won't happen at all if there are no cookies or they are set so false. You can use a module such as [react-cookie-consent](https://www.npmjs.com/package/react-cookie-consent).

## Options

### Google Analytics

#### `cookieName`

Here you can place the cookie name for Google Analytics. Default name: `gatsby-gdpr-google-analytics`.

#### `trackingId`

Here you place your Google Analytics tracking id.

#### `anonymize`

Some countries (such as Germany) require you to use the
[\_anonymizeIP](https://support.google.com/analytics/answer/2763052) function for Google Analytics. Otherwise you are not allowed to use it. The option adds two blocks to the code:

```javascript
ga('set', 'anonymizeIp', 1);
```

If your visitors should be able to set an Opt-Out-Cookie (No future tracking)
you can set a link e.g. in your imprint as follows:

`<a href="javascript:gaOptout();">Deactivate Google Analytics</a>`

### Facebook Pixel

#### `cookieName`

Here you can place the cookie name for Facebook Pixel. Default name: `gatsby-gdpr-facebook-pixel`.

#### `pixelId`

Here you place your Facebook Pixel id.
