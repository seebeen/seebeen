import * as yaml from "js-yaml";
import * as fs from "fs-extra";
import * as path from "path";
import * as mustache from "mustache";

export class ReadmeGenerator {
  private readonly config: Config;
  private readonly templateDir: string;
  private readonly readMeDir: string;

  constructor(basePath: string, configFile: string) {
    this.config = yaml.load(
      fs.readFileSync(configFile, "utf-8")
    ) as unknown as Config;
    this.templateDir = path.resolve(basePath, "templates");
    this.readMeDir = path.resolve(basePath, "../");
  }

  async generate(): Promise<void> {
    await fs.writeFile(

      path.resolve(this.templateDir, "../README.md"),
      ""
        .concat(await this.updateHeader())
        .concat("\n")
        .concat(await this.updateAbout())
        .concat("\n")
        .concat(await this.updateBadges())
        .concat("\n")
        .concat(await this.updateGenerator())
    );
  }

  private async updateHeader(): Promise<string> {
    return await this.renderTemplate("header", {
      headerImg: this.config.headerImg,
    });
  }

  private async updateAbout(): Promise<string> {
    return await this.renderTemplate("about", {});
  }

  private async updateBadges(): Promise<string> {
    return await this.renderTemplate("badges", {
      config: this.config.badges.config,
      cats: this.config.badges.cats,
    });
  }

  private async updateGenerator(): Promise<string> {
    const date = new Date().toLocaleDateString("en-GB", {
      weekday: "long",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      timeZoneName: "short",
      timeZone: "Europe/Belgrade",
    });

    return await this.renderTemplate("generator", { date });
  }

  private async renderTemplate<T>(
    templateFile: string,
    data: T
  ): Promise<string> {
    const template = await fs.readFile(
      path.resolve(this.templateDir, `${templateFile}.mustache`),
      "utf8"
    );

    return mustache.render(template, data);
  }
}
