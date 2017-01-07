function autosize() {
  var $doc = $(document);
  var $body = $('body');
  var marginLeft = ($doc.width() - $body.width()) * 0.40;
  if (marginLeft < 4) marginLeft = 4;
  $body.css('margin-left', marginLeft + 'px');
}

$(document).ready(autosize);
$(window).resize(autosize);
