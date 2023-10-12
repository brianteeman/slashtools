/**
 * @package    slashtools
 * @author     Brian Teeman
 * @copyright  (C) 2023 - Brian Teeman
 * @license    GNU/GPLv3 http://www.gnu.org/licenses/gpl-3.0.html
 */
(function () {
  let slashtools = (function () {
      'use strict';

      tinymce.PluginManager.add("slashtools", function (editor) {

        var insertActions = [
          {
            text: "H1 Heading",
            icon: "h1",
            action: () => {
              editor.insertContent("<h1>H1 Heading</h1>");
              editor.selection.select(editor.selection.getNode());
            }
          },
          {
            text: "H2 Heading",
            icon: "h2",
            action: () => {
              editor.insertContent("<h2>H2 Heading</h2>");
              editor.selection.select(editor.selection.getNode());
            }
          },
          {
            text: "H3 Heading",
            icon: "h3",
            action: () => {
              editor.insertContent("<h3>H3 Heading</h3>");
              editor.selection.select(editor.selection.getNode());
            }
          },
          {
            type: "separator",
          },
          {
            text: "Bulleted list",
            icon: "unordered-list",
            action: () => {
              editor.insertContent("<ul><li>List Item</li></ul>");
              editor.selection.select(editor.selection.getNode());
            }
          },
          {
            text: "Ordered list",
            icon: "ordered-list",
            action: () => {
              editor.insertContent("<ul><li>List Item 1</li></ul>");
              editor.selection.select(editor.selection.getNode());
            }
          },
          {
            type: "separator"
          },
          {
            text: "Sentence",
            icon: "line",
            action: () => {
              editor.insertContent(
                "Lorem ipsum dolor sit, amet consectetur adipisicing elit."
              );
            }
          },
          {
            text: "Paragraph",
            icon: "paragraph",
            action: () => {
              editor.insertContent(
                "<p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Asperiores sint officiis dolore vitae facilis praesentium non? Recusandae magni ipsa debitis quam animi libero minus enim possimus exercitationem? Architecto nobis eos, repudiandae ullam ex quos laborum commodi maiores reiciendis, omnis recusandae. Asperiores, est? Aliquid, beatae nisi? Ea sunt iusto inventore magni provident dolorem sint, maxime obcaecati illum delectus</p>"
              );
            }
          },
          {
            text: "Quote",
            icon: "quote",
            action: () => {
              editor.execCommand("mceBlockQuote");
              editor.insertContent("Quotation");
              editor.selection.select(editor.selection.getNode());
            }
          },
          {
            type: "separator"
          },
          {
            text: "4:3 Image",
            icon: "image",
            action: () => {
              editor.insertContent(
                '<img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB4PSIyIiB5PSIyIiB3aWR0aD0iMzk2IiBoZWlnaHQ9IjI5NiIgc3R5bGU9ImZpbGw6I0RFREVERTtzdHJva2U6IzU1NTU1NTtzdHJva2Utd2lkdGg6MiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE4IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBhbGlnbm1lbnQtYmFzZWxpbmU9Im1pZGRsZSIgZm9udC1mYW1pbHk9Im1vbm9zcGFjZSwgc2Fucy1zZXJpZiIgZmlsbD0iIzU1NTU1NSI+NDAwJiMyMTU7MzAwPC90ZXh0Pjwvc3ZnPg==" alt="">'
              );
            }
          },
          {
            text: "3:4 Image",
            icon: "image",
            action: () => {
              editor.insertContent(
                '<img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB4PSIyIiB5PSIyIiB3aWR0aD0iMjk2IiBoZWlnaHQ9IjM5NiIgc3R5bGU9ImZpbGw6I0RFREVERTtzdHJva2U6IzU1NTU1NTtzdHJva2Utd2lkdGg6MiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE4IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBhbGlnbm1lbnQtYmFzZWxpbmU9Im1pZGRsZSIgZm9udC1mYW1pbHk9Im1vbm9zcGFjZSwgc2Fucy1zZXJpZiIgZmlsbD0iIzU1NTU1NSI+MzAwJiMyMTU7NDAwPC90ZXh0Pjwvc3ZnPg==" alt="Placeholder">'
              );
            }
          },
          {
            type: "separator"
          },
          {
            text: "Fullscreen",
            icon: "fullscreen",
            action: () => editor.execCommand("mceFullScreen")
          }
        ];

        editor.ui.registry.addAutocompleter("slashtools", {
          ch: "/",
          minChars: 0,
          columns: 1,

          fetch: function (pattern) {
            const matchedActions = insertActions
              .filter((action) => {
                return (
                  action.type === "separator" ||
                  action.text.toLowerCase().indexOf(pattern.toLowerCase()) !== -1
                );
              })
              .filter((action, i, actions) => {
                const prevAction = actions[i - 1];
                const nextAction = actions[i + 1];
                const isRedundantSeparator =
                  action.type === "separator" &&
                  (!prevAction ||
                    !nextAction ||
                    prevAction.type === "separator" ||
                    nextAction.type === "separator");
                return !isRedundantSeparator;
              });

            return new Promise((resolve) => {
              var results = matchedActions.map(function (action) {
                return {
                  meta: action,
                  text: action.text,
                  icon: action.icon,
                  value: action.text,
                  type: action.type
                };
              });
              resolve(results);
            });
          },

          onAction: function (autocompleteApi, rng, action, meta) {
            editor.selection.setRng(rng);
            editor.execCommand("Delete");
            meta.action();
            autocompleteApi.hide();
          }
        });

        return {
            getMetadata: function () {
                return {
                    name: "Slashtools",
                    url: "https://github.com/brianteeman/slashtools/blob/main/README.md"
                };
            }
        };
      });
  }());
})();
