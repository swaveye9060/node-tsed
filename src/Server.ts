import {join} from "path";
import {Configuration, Inject} from "@tsed/di";
import {PlatformApplication} from "@tsed/common";
import "@tsed/platform-express"; // /!\ keep this import
import "@tsed/ajv";
import {config} from "./config/index";
import * as rest from "./controllers/rest/index";

import { PlatformExpress } from "@tsed/platform-express";
import bodyParser from "body-parser";
import compress from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import methodOverride from "method-override";
import * as controllers from "./controllers/UserController";
// import * as controllers from "./controllers";


@Configuration({
  ...config,
  acceptMimes: ["application/json"],
  httpPort: process.env.PORT || 8080,
  httpsPort: false, // CHANGE
  disableComponentsScan: true,
  rootDir: __dirname,
  ajv: {
    returnsCoercedValues: true
  },
  mount: {
    // "/rest": [
    //   ...Object.values(rest)
    // ],
    "/rest": [
      ...Object.values(controllers)
    ]
  },
  middlewares: [
    "cors",
    "cookie-parser",
    "compression",
    "method-override",
    "json-parser",
    { use: "urlencoded-parser", options: { extended: true }}
  ],
  views: {
    root: join(process.cwd(), "../views"),
    extensions: {
      ejs: "ejs"
    }
  },
  exclude: [
    "**/*.spec.ts"
  ]
})
export class Server {
  @Inject()
  protected app: PlatformApplication;

  @Configuration()
  protected settings: Configuration;

  $beforeRoutesInit() {
    this.app
      .use(cors())
      .use(cookieParser())
      .use(compress())
      .use(methodOverride())
      .use(bodyParser.json())
      .use(bodyParser.urlencoded({ extended: true }));
  }
}