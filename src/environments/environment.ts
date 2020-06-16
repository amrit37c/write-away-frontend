// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // baseUrl: "http://127.0.0.1:3000/api/v1/",
  // baseUrl: "http://demo.writeawayy.com:3000/api/v1/",
  baseUrl: "http://185.195.199.196:3001/api/v1/",
  url: "http://185.195.199.196:3001",
  // url: "http://demo.writeawayy.com:3000",
  // url: "http://localhost:3000",
  apis: {
    user: "user",
    register: "user/register",
    login: "user/login",
    blogs: "blog",
    publications: "publication",
    userPublication: "publication/user-content",
    blogBookMark: "blog-bookmark",
    publicationBookMark: "publication-bookmark",
    blogLike: "blog-like",
    publicationLike: "publication-like",
    blogRead: "blog-read",
    forgetEmail: "send-forget-email",
    verifyOTP: "verify-otp",
    verifySignUpOTP: "verify-signup-otp",
    resendOTP: "resend-otp",
    blogShare: "blog-share",
    publicationShare: "publication-share",
    feedback: "feedback",
    testimonial: "testimonial",
    contactus: "contactus",
    recentWriting: "recent-writing",
    following: "following",
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
