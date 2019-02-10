function convertHtmlToMd (html) {
  let markdown = toMarkdown(html, {
    converters: [
      {
        filter: 'div',
        replacement: function (content) {
          return content
        }
      }
    ]
  })
  return markdown
}

function getRawHTML (content, title) {
  let html =
    "<!DOCTYPE html>\n\
    <html>\n\
    <head>\n\
      <meta charset='utf-8'>\n\
      <meta name='viewport' content='width=device-width'>\n\
      <title>" +
    title +
    "</title>\n\
      <style> body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; padding:1em; } </style>\n\
    </head>\n\
    <body>\n\
    " +
    content +
    '\n\
    </body>\n\
    </html>\n\
      '
  return html
}

function getContent (id) {
  var content = document.getElementById(id)
  return content.innerHTML
}

function getTitle (id) {
  var content = document.getElementById(id)
  var title = content.getElementsByTagName('h2')[0]
  return title.innerHTML
}

function selectText (containerId) {
  var range
  if (document.selection) {
    range = document.body.createTextRange()
    range.moveToElementText(document.getElementById(containerId))
    range.select()
  } else if (window.getSelection) {
    range = document.createRange()
    range.selectNode(document.getElementById(containerId))
    window.getSelection().addRange(range)
  }
}

function download (filename, text, format) {
  format += ';charset=utf-8,'
  var pom = document.createElement('a')
  pom.setAttribute('href', format + encodeURIComponent(text))
  pom.setAttribute('download', filename)

  if (document.createEvent) {
    var event = document.createEvent('MouseEvents')
    event.initEvent('click', true, true)
    pom.dispatchEvent(event)
  } else {
    pom.click()
  }
}

function downloadHTML (filename, content) {
  filename += '.html'
  download(filename, content, 'data:text/html')
}

function downloadMD (filename, content) {
  filename += '.md'
  download(filename, content, 'data:text/markdown')
}
