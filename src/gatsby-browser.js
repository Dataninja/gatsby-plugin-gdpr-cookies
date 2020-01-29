import ReactGA from "react-ga";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const currentEnvironment =
  process.env.ENV || process.env.NODE_ENV || "development";
const defaultOptions = {
  environments: ["production"],
  googleAnalytics: {
    cookieName: "gatsby-gdpr-google-analytics",
    anonymize: true
  },
  facebookPixel: {
      cookieName: "gatsby-gdpr-facebook-pixel",
  }
};

const isEnvironmentValid = environments => {
  return environments.includes(currentEnvironment);
};

export const onClientEntry = (_, pluginOptions = {}) => {
  const options = Object.assign(defaultOptions, pluginOptions);

  // check for the correct environment
  if (isEnvironmentValid(options.environments)) {
    // - google analytics

    // check if the tracking cookie exists
    if (cookies.get(options.googleAnalytics.cookieName) === "true") {
      // initialize google analytics with the correct ga tracking id
      ReactGA.initialize(options.googleAnalytics.trackingId);
    }

    // - facebook pixel

    // check if the marketing cookie exists
    if (
      cookies.get(options.facebookPixel.cookieName) === "true" &&
      typeof window.fbq === `function`
    ) {
      // initialize the facebook pixel stuff with the pixe id
      window.fbq("init", options.facebookPixel.pixelId);
    }
  }
};

export const onRouteUpdate = ({ location }, pluginOptions = {}) => {
  const options = Object.assign(defaultOptions, pluginOptions);

  // check for the production environment
  if (isEnvironmentValid(options.environments)) {
    // if the ga tracking cookie exists, track the page
    let gaAnonymize = options.googleAnalytics.anonymize;
    gaAnonymize = gaAnonymize !== undefined ? gaAnonymize : true;
    // check if the tracking cookie exists
    if (cookies.get(options.googleAnalytics.cookieName) === "true" && ReactGA.ga) {
      ReactGA.set({ page: location.pathname, anonymizeIp: gaAnonymize });
      ReactGA.pageview(location.pathname);
    }

    // if the fb pixel cookie exists, track the page
    if (
      cookies.get(options.facebookPixel.cookieName) === "true" &&
      typeof window.fbq === `function`
    ) {
      window.fbq("track", "PageView");
    }
  }
};
