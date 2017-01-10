var sitemap = [{
  url: '/',
  title: 'Mojo',
  children: [{
    url: '/base/',
    title: 'base',
    children: [{
      url: '/base/backport.h/',
      title: 'backport.h',
    }, {
      url: '/base/cleanup.h/',
      title: 'cleanup.h',
    }, {
      url: '/base/clock.h/',
      title: 'clock.h',
    }, {
      url: '/base/clockfake.h/',
      title: 'clockfake.h',
    }, {
      url: '/base/concat.h/',
      title: 'concat.h',
    }, {
      url: '/base/debug.h/',
      title: 'debug.h',
    }, {
      url: '/base/duration.h/',
      title: 'duration.h',
    }, {
      url: '/base/fd.h/',
      title: 'fd.h',
    }, {
      url: '/base/logging.h/',
      title: 'logging.h',
    }, {
      url: '/base/mutex.h/',
      title: 'mutex.h',
    }, {
      url: '/base/options.h/',
      title: 'options.h',
    }, {
      url: '/base/result.h/',
      title: 'result.h',
    }, {
      url: '/base/result_testing.h/',
      title: 'result_testing.h',
    }, {
      url: '/base/stopwatch.h/',
      title: 'stopwatch.h',
    }, {
      url: '/base/time.h/',
      title: 'time.h',
    }, {
      url: '/base/token.h/',
      title: 'token.h',
    }, {
      url: '/base/user.h/',
      title: 'user.h',
    }]
  }, {
    url: '/event/',
    title: 'event',
    children: [{
      url: '/event/callback.h/',
      title: 'callback.h',
    }, {
      url: '/event/data.h/',
      title: 'data.h',
    }, {
      url: '/event/dispatcher.h/',
      title: 'dispatcher.h',
    }, {
      url: '/event/handler.h/',
      title: 'handler.h',
    }, {
      url: '/event/manager.h/',
      title: 'manager.h',
    }, {
      url: '/event/poller.h/',
      title: 'poller.h',
    }, {
      url: '/event/set.h/',
      title: 'set.h',
    }, {
      url: '/event/task.h/',
      title: 'task.h',
    }],
  }, {
    url: '/file/',
    title: 'file',
    children: [{
      url: '/file/fd.h/',
      title: 'fd.h',
    }, {
      url: '/file/file.h/',
      title: 'file.h',
    }, {
      url: '/file/fs.h/',
      title: 'fs.h',
    }, {
      url: '/file/local.h/',
      title: 'local.h',
    }, {
      url: '/file/mem.h/',
      title: 'mem.h',
    }, {
      url: '/file/mode.h/',
      title: 'mode.h',
    }, {
      url: '/file/options.h/',
      title: 'options.h',
    }, {
      url: '/file/perm.h/',
      title: 'perm.h',
    }, {
      url: '/file/registry.h/',
      title: 'registry.h',
    }, {
      url: '/file/stat.h/',
      title: 'stat.h',
    }],
  }, {
    url: '/io/',
    title: 'io',
    children: [{
      url: '/io/buffer.h/',
      title: 'buffer.h',
    }, {
      url: '/io/common.h/',
      title: 'common.h',
    }, {
      url: '/io/options.h/',
      title: 'options.h',
    }, {
      url: '/io/pipe.h/',
      title: 'pipe.h',
    }, {
      url: '/io/reader.h/',
      title: 'reader.h',
    }, {
      url: '/io/testing.h/',
      title: 'testing.h',
    }, {
      url: '/io/util.h/',
      title: 'util.h',
    }, {
      url: '/io/writer.h/',
      title: 'writer.h',
    }],
  }, {
    url: '/net/',
    title: 'net',
  }, {
    url: '/path/',
    title: 'path',
    children: [{
      url: '/path/path.h/',
      title: 'path.h',
    }],
  }]
}];

(function() {
  var navbar = $('#navbar');
  if (!navbar) return;

  var indent = function(i) { return '\t'.repeat(i) };

  var process;
  process = function(items, depth) {
    var result = {html: '', active: false};
    result.html += indent(depth) + '<ul>\n';
    for (var i = 0; i < items.length; ++i) {
      var item = items[i];
      var branchActive = false;
      var classes = [];
      var content = indent(depth + 2) + '<div><a href="' + item.url + '">' + item.title + '</a></div>\n';
      if (location.pathname == item.url) {
        result.active = true;
        branchActive = true;
        classes.push('active');
      }
      if (item.children && item.children.length > 0) {
        var recursive = process(item.children, depth + 2);
        result.active = result.active || recursive.active;
        branchActive = branchActive || recursive.active;
        content += recursive.html;
        classes.push('parent');
        classes.push(branchActive ? 'open' : 'closed');
      }
      result.html += indent(depth + 1) + '<li';
      if (classes.length > 0) {
        result.html += ' class="' + classes.join(' ') + '"';
      }
      result.html += '>\n' + content + indent(depth + 1) + '</li>\n';
    }
    result.html += indent(depth) + '</ul>\n';
    return result;
  };

  var as_html = function(items) { return process(items, 0).html; };
  navbar.html(as_html(sitemap));
})();

(function() {
  var toc = $('#toc');
  if (!toc) return;

  var tmp = [];
  for (var i = 0; i < document.all.length; ++i) {
    var elem = document.all[i];
    if (/^h[2-6]$/i.test(elem.tagName) && elem.id.length > 0) {
      var level = parseInt(elem.tagName.substr(1));
      tmp.push([level - 1, elem.id, elem.innerText])
    }
  }

  var linktree = [];
  var tangle = [linktree];
  for (var i = 0; i < tmp.length; ++i) {
    var row = tmp[i];
    while (row[0] > tangle.length) {
      var x = tangle[tangle.length - 1];
      var y = x[x.length - 1];
      if (!y.children) { y.children = [] }
      tangle.push(y.children);
    }
    while (row[0] < tangle.length) {
      tangle.pop();
    }
    var item = {url: '#' + row[1]};
    tangle[tangle.length - 1].push(item);
    var dots = tangle.map(function(x) { return x.length });
    item.title = '<b>' + dots.join('.') + '</b> ' + row[2];
  }

  var indent = function(i) { return '\t'.repeat(i) };

  var as_html = function(linktree, level) {
    var result = indent(level) + '<ol>\n';
    level++;
    for (var i = 0; i < linktree.length; ++i) {
      var item = linktree[i];
      result += indent(level) + '<li>\n';
      level++;
      result += '<a href="' + item.url + '">' + item.title + '</a>\n';
      if (item.children && item.children.length > 0) {
        result += as_html(item.children, level);
      }
      level--;
      result += indent(level) + '</li>\n';
    }
    level--;
    result += indent(level) + '</ol>\n';
    return result;
  };

  var raw = '<p>Table of Contents</p>\n';
  raw += as_html(linktree, 0);
  toc.html(raw);
})();

$('li.parent').click(function(ev) {
  ev.stopPropagation();
  var li = $(this);
  li.toggleClass('open');
  li.toggleClass('closed');
});

$('li.parent a[href]').click(function(ev) {
  ev.stopPropagation();
});

$('h2[id], h3[id], h4[id], h5[id], h6[id]').wrapInner(function() {
  var id = $(this).attr('id');
  return '<a href="#' + id + '"></a>';
});

$('img[alt]').each(function() {
  $(this).attr('title', $(this).attr('alt'));
});
