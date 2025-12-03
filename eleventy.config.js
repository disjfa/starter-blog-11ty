import { HtmlBasePlugin } from "@11ty/eleventy";
import { feedPlugin } from "@11ty/eleventy-plugin-rss";

export default async function (eleventyConfig) {
  // Configure Eleventy
  eleventyConfig.addPlugin(HtmlBasePlugin);

  eleventyConfig.setInputDirectory("_site");
  eleventyConfig.setOutputDirectory("_dist");
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addLayoutAlias("base", "layouts/base.html");
  eleventyConfig.addLayoutAlias("post", "layouts/post.html");

  eleventyConfig.addFilter("postDate", (dateObj) => {
    // Can use toLocaleString the same way we were before
    return dateObj.toLocaleString("nl-NL", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  });

  eleventyConfig.addCollection("posts", function (collectionsApi) {
    return collectionsApi.getFilteredByTag("post").sort(function (a, b) {
      //return a.date - b.date; // sort by date - ascending
      return b.date - a.date; // sort by date - descending
      //return a.inputPath.localeCompare(b.inputPath); // sort by path - ascending
      //return b.inputPath.localeCompare(a.inputPath); // sort by path - descending
    });
  });

  eleventyConfig.addWatchTarget("_site/**/*.css");

  eleventyConfig.addPlugin(feedPlugin, {
    type: "rss", // or "rss", "json"
    outputPath: "/feed.xml",
    collection: {
      name: "posts", // iterate over `collections.posts`
      limit: 10,     // 0 means no limit
    },
    metadata: {
      language: "en",
      title: "Starter blog 11ty",
      subtitle: "A starter blog template for Eleventy.",
      base: "https://disjfa.github.io/starter-blog-11ty/",
      author: {
        name: "The Author",
        email: "", // Optional
      }
    }
  });
}
export const config = {
  pathPrefix: "/starter-blog-11ty/",
  htmlTemplateEngine: "njk",
};
