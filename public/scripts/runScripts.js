function insertScript ($script, callback) {
    var s = document.createElement('script')
    s.type = $script.type || 'text/javascript'
    if ($script.src) {
        s.onload = callback
        s.onerror = callback
        s.src = $script.src
    } else {
        s.textContent = $script.innerText
    }
  
    // re-insert the script tag so it executes.
    document.head.appendChild(s)
  
    // clean-up
    $script.parentNode.removeChild($script)
  
    // run the callback immediately for inline scripts
    if (!$script.src) {
      callback()
    }
}

// https://html.spec.whatwg.org/multipage/scripting.html
var runScriptTypes = [
    'application/javascript',
    'application/ecmascript',
    'text/ecmascript',
    'text/javascript',
    'module'
]

// runs an array of async functions in sequential order
function seq (arr, callback, index) {
    // first call, without an index
    if (typeof index === 'undefined') {
        index = 0
    }

    arr[index](function () {
        index++
        if (index === arr.length) {
            callback()
        } else {
            seq(arr, callback, index)
        }
    })
}

const listeners = []
const defaultAdder = window.addEventListener
window.addEventListener = (event, callback) => {
    if (event === "DOMContentLoaded")
        listeners.push(callback)
    
    defaultAdder(event, callback)
}

// trigger DOMContentLoaded
function scriptsDone () {
    const DOMContentLoadedEvent = document.createEvent('Event')
    DOMContentLoadedEvent.initEvent('DOMContentLoaded', true, true)
    document.dispatchEvent(DOMContentLoadedEvent)
}

// before Execute
function preRun() {
    listeners.forEach(cb => {
        window.removeEventListener('DOMContentLoaded', cb)
    })    

    listeners.slice(0, listeners.length)
}

export default function runScripts ($container) {

    preRun()
    // get scripts tags from a node
    var $scripts = $container.querySelectorAll('script')
    var runList = []
    var typeAttr

    [].forEach.call($scripts, function ($script) {
        typeAttr = $script.getAttribute('type')

        // only run script tags without the type attribute
        // or with a javascript mime attribute value
        if (!typeAttr || runScriptTypes.indexOf(typeAttr) !== -1) {
            runList.push(function (callback) {
                insertScript($script, callback)
            })
        }
    })

    if (runList.length !== 0) {       
        // insert the script tags sequentially
        // to preserve execution order
        seq(runList, scriptsDone)
    }
}