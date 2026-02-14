/* global TextDecoder, ReadableStream, UrlFetchApp */

/**
 * Fetch the text content of a uri. Works in AppScript and standard JS.
 * @param {string} uri the uri to fetch.
 * @return {Promise<string>} Promise that resolves to the text content at the uri.
 */
export default function Fetch(uri) {
  if (typeof UrlFetchApp !== "undefined") {
    // AppScript
    return Promise.resolve(UrlFetchApp.fetch(uri).getContentText());
  }

  // Node.js or browser
  return fetch(uri)
  .then(response => {
    // Boilerplate reading a fetched text stream
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let content = "";
    return new Promise(resolve => {
      function suckDry() {
        reader.read()
        .then(({ done, value }) => {
          if (done)
            resolve(content);
          else {
            content += decoder.decode(value);
            suckDry();
          }
        });
      }
      suckDry();
    });
  });
}

