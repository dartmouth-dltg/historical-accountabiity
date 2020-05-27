/*!
 * huronia-theme v1.0.0
 * A custom Omeka theme for the Recounting Huronia project.
 * (c) 2019 Agile Humanities Agency
 * MIT License
 * https://agile.git.beanstalkapp.com/agile-theme-builder-v002.git
 */

// _default.js must be loaded first
// All other JS files are concatenated afterwards by Gulp

var heartbeat = 300;

// Sets constants for all theme js files.

var themepath = "/path/to/theme";
var assetpath = themepath + "/assets";
var imagepath = assetpath + "/img";

(function($) {  
  
  $(document).ready((function() {
  
        
  }));  
})(jQuery);

/**
 * Global Breakpoints
 * Sets global values for breakpoints based on CSS root variables provided by the layout_css_variables SASS component. Must come early in the load order.
 */

var breakpoint_xsml, breakpoint_sml, breakpoint_med, breakpoint_lrg, breakpoint_xlrg, breakpoint_xxlrg, breakpoint_stack, breakpoint_tablet, breakpoint_desktop, breakpoint_ultrawide;

(function($) {    
  $(document).ready((function() {
    var style = getComputedStyle(document.body);
    breakpoint_xsml = style.getPropertyValue('--breakpoint-xsml')
    breakpoint_sml = style.getPropertyValue('--breakpoint-sml')
    breakpoint_med = style.getPropertyValue('--breakpoint-med')
    breakpoint_lrg = style.getPropertyValue('--breakpoint-lrg')
    breakpoint_xlrg = style.getPropertyValue('--breakpoint-xlrg')
    breakpoint_xxlrg = style.getPropertyValue('--breakpoint-xxlrg')
    breakpoint_stack = style.getPropertyValue('--breakpoint-stack')
    breakpoint_tablet = style.getPropertyValue('--breakpoint-tablet')
    breakpoint_desktop = style.getPropertyValue('--breakpoint-desktop')
    breakpoint_ultrawide = style.getPropertyValue('--breakpoint-ultrawide')
  }));  
})(jQuery);

/**
 * globalPalette.js
 * Sets global values for colours based on CSS root variables provided by 20_colour SASS component. Must come early in the load order.
 */

(function($) {    
  $(document).ready((function() {
    var style = getComputedStyle(document.body);
        
    window.colours = {};
    window.colours.colour = {};
    window.colours.map = {};
    window.colours.neutrals = {};
    
    var colourGridKeys = ['shade','primary','tint','fade','watermark'];

    for(var i=1; i<10; i++) {
      var neutralKey = i * 10;
      window.colours.colour[i] = style.getPropertyValue('--colour--' + i);
            
      window.colours.neutrals[neutralKey] = style.getPropertyValue('--colour--neutral--' + neutralKey);
      
      window.colours.map[i] = {};
      
      colourGridKeys.forEach((function(key){
        window.colours.map[i][key] = style.getPropertyValue('--colour--' + i + '--' + key);
      }));
    }
        
    window.colours.black = style.getPropertyValue('--colour--black');
    window.colours.white = style.getPropertyValue('--colour--white');    
    window.colours.impact = style.getPropertyValue('--colour--impact');    
    window.colours.cta = style.getPropertyValue('--colour--cta'); 
    
    // console.log(window.colours);   
    
  }));  
})(jQuery);

/**
 *  @file processAttributes.js
 *  @description Remove all attributes from an element.
 *  With thanks to https://stackoverflow.com/questions/1870441/remove-all-attributes
 */


jQuery.fn.removeAttributes = function() {
  return this.each((function() {
    var attributes = $.map(this.attributes, (function(item) {
      return item.name;
    }));
    var e = $(this);
    $.each(attributes, (function(i, item) {
      e.removeAttr(item);
    }));
  }));
}

jQuery.fn.stashAttributes = function(prefix) {
  
  prefix = prefix != null ? prefix : 'stash';
  
  return this.each((function() {
    var attributes = $.map(this.attributes, (function(item) {
      return item.name;
    }));
    var e = $(this);
    $.each(attributes, (function(i, item) {
      var stash = e.attr(item);
      e.removeAttr(item);
      e.attr('data-' + prefix + '-' + item,stash);
    }));
  }));
}
/**
 * Visibility Classes
 * Uses the in-view.js library ( https://www.npmjs.com/package/in-view ) add visibility
 * classes to DOM objects.
 */

jQuery(document).ready((function() {
    
  const style = getComputedStyle(document.body);
  const propcount = style.getPropertyValue('--visibility-propcount'); // Lets JS know how many properties to expect.
  const reverse = false; // Removes visibility class when element is offscreen. @todo: set this as SASS-driven configuration, e.g. --visibility-reverse.
  
  if (typeof propcount != 'undefined' && parseInt(propcount) > 0) {
    var visibilityStack = [];
    
    const visibilityOffset = style.getPropertyValue('--visibility-offset');
    const visibilityThreshold = style.getPropertyValue('--visibility-threshold');
    
    inView.threshold(visibilityThreshold);
    inView.offset(visibilityOffset);
    
    for(var i=1;i<=parseInt(propcount);i++) {
      visibilityStack.push(style.getPropertyValue("--visibility-element-" + i));
    }
                  
    $(visibilityStack).each((function(i,selector){    
      if($(selector).length > 0) {
        inView(selector)
          .on('enter', elem => {
            $(elem).addClass('visible');
          })
          .on('exit',elem => {
            if (reverse === true) {
              $(elem).removeClass('visible');
            }
          });
      }
    }));
    
  }
}));
(function($) {
  $(document).ready((function() {
    function fixIframeAspect() {
        $('iframe').each((function () {
            var aspect = $(this).attr('height') / $(this).attr('width');
            $(this).height($(this).width() * aspect);
        }));
    } 
  }));
})(jQuery);
(function($) {
    $(document).ready((function() {
      function framerateCallback(callback) {
          var waiting = false;
          callback = callback.bind(this);
          return function () {
              if (!waiting) {
                  waiting = true;
                  window.requestAnimationFrame((function () {
                      callback();
                      waiting = false;
                  }));
              }
          };
      } 
    }));
})(jQuery);

/**
 *  @file gallery.js
 *  @description Drives gutenberg slider.
 */
 
(function($) {  
  $(document).ready((function() {
    
    var i=0
    $('.gallery').each((function() {
      var gallery = $(this);
      gallery.find('.lightbox').attr('rel',"gallery" + i);
      i++;
      
    }));
    
    $('.lightbox').each((function(){
      $(this).colorbox({
        className: 'full', // Important: Required by grid system.
        slideShow: function() { return $(this).parents('.gallery').length > 1 ? true : false; },
        slideshowAuto: false,
        width: '100%',
        height: '100%',
        close: 'Close',
        title: function() {
          var title = $(this).attr('title').length != 0 ? $(this).attr('title') : null;
          var caption = $(this).attr('data-caption').length != 0 ? $(this).attr('data-caption') : null;
          return (title ? '<h3>' + title + '</h3>' : '') + (caption ? "<div class='lightbox--caption'>" + caption + "</div>" : '');
        }
      });
    }));
    
  }));
})(jQuery);

function md5cycle(x, k) {
var a = x[0], b = x[1], c = x[2], d = x[3];

a = ff(a, b, c, d, k[0], 7, -680876936);
d = ff(d, a, b, c, k[1], 12, -389564586);
c = ff(c, d, a, b, k[2], 17,  606105819);
b = ff(b, c, d, a, k[3], 22, -1044525330);
a = ff(a, b, c, d, k[4], 7, -176418897);
d = ff(d, a, b, c, k[5], 12,  1200080426);
c = ff(c, d, a, b, k[6], 17, -1473231341);
b = ff(b, c, d, a, k[7], 22, -45705983);
a = ff(a, b, c, d, k[8], 7,  1770035416);
d = ff(d, a, b, c, k[9], 12, -1958414417);
c = ff(c, d, a, b, k[10], 17, -42063);
b = ff(b, c, d, a, k[11], 22, -1990404162);
a = ff(a, b, c, d, k[12], 7,  1804603682);
d = ff(d, a, b, c, k[13], 12, -40341101);
c = ff(c, d, a, b, k[14], 17, -1502002290);
b = ff(b, c, d, a, k[15], 22,  1236535329);

a = gg(a, b, c, d, k[1], 5, -165796510);
d = gg(d, a, b, c, k[6], 9, -1069501632);
c = gg(c, d, a, b, k[11], 14,  643717713);
b = gg(b, c, d, a, k[0], 20, -373897302);
a = gg(a, b, c, d, k[5], 5, -701558691);
d = gg(d, a, b, c, k[10], 9,  38016083);
c = gg(c, d, a, b, k[15], 14, -660478335);
b = gg(b, c, d, a, k[4], 20, -405537848);
a = gg(a, b, c, d, k[9], 5,  568446438);
d = gg(d, a, b, c, k[14], 9, -1019803690);
c = gg(c, d, a, b, k[3], 14, -187363961);
b = gg(b, c, d, a, k[8], 20,  1163531501);
a = gg(a, b, c, d, k[13], 5, -1444681467);
d = gg(d, a, b, c, k[2], 9, -51403784);
c = gg(c, d, a, b, k[7], 14,  1735328473);
b = gg(b, c, d, a, k[12], 20, -1926607734);

a = hh(a, b, c, d, k[5], 4, -378558);
d = hh(d, a, b, c, k[8], 11, -2022574463);
c = hh(c, d, a, b, k[11], 16,  1839030562);
b = hh(b, c, d, a, k[14], 23, -35309556);
a = hh(a, b, c, d, k[1], 4, -1530992060);
d = hh(d, a, b, c, k[4], 11,  1272893353);
c = hh(c, d, a, b, k[7], 16, -155497632);
b = hh(b, c, d, a, k[10], 23, -1094730640);
a = hh(a, b, c, d, k[13], 4,  681279174);
d = hh(d, a, b, c, k[0], 11, -358537222);
c = hh(c, d, a, b, k[3], 16, -722521979);
b = hh(b, c, d, a, k[6], 23,  76029189);
a = hh(a, b, c, d, k[9], 4, -640364487);
d = hh(d, a, b, c, k[12], 11, -421815835);
c = hh(c, d, a, b, k[15], 16,  530742520);
b = hh(b, c, d, a, k[2], 23, -995338651);

a = ii(a, b, c, d, k[0], 6, -198630844);
d = ii(d, a, b, c, k[7], 10,  1126891415);
c = ii(c, d, a, b, k[14], 15, -1416354905);
b = ii(b, c, d, a, k[5], 21, -57434055);
a = ii(a, b, c, d, k[12], 6,  1700485571);
d = ii(d, a, b, c, k[3], 10, -1894986606);
c = ii(c, d, a, b, k[10], 15, -1051523);
b = ii(b, c, d, a, k[1], 21, -2054922799);
a = ii(a, b, c, d, k[8], 6,  1873313359);
d = ii(d, a, b, c, k[15], 10, -30611744);
c = ii(c, d, a, b, k[6], 15, -1560198380);
b = ii(b, c, d, a, k[13], 21,  1309151649);
a = ii(a, b, c, d, k[4], 6, -145523070);
d = ii(d, a, b, c, k[11], 10, -1120210379);
c = ii(c, d, a, b, k[2], 15,  718787259);
b = ii(b, c, d, a, k[9], 21, -343485551);

x[0] = add32(a, x[0]);
x[1] = add32(b, x[1]);
x[2] = add32(c, x[2]);
x[3] = add32(d, x[3]);

}

function cmn(q, a, b, x, s, t) {
a = add32(add32(a, q), add32(x, t));
return add32((a << s) | (a >>> (32 - s)), b);
}

function ff(a, b, c, d, x, s, t) {
return cmn((b & c) | ((~b) & d), a, b, x, s, t);
}

function gg(a, b, c, d, x, s, t) {
return cmn((b & d) | (c & (~d)), a, b, x, s, t);
}

function hh(a, b, c, d, x, s, t) {
return cmn(b ^ c ^ d, a, b, x, s, t);
}

function ii(a, b, c, d, x, s, t) {
return cmn(c ^ (b | (~d)), a, b, x, s, t);
}

function md51(s) {
txt = '';
var n = s.length,
state = [1732584193, -271733879, -1732584194, 271733878], i;
for (i=64; i<=s.length; i+=64) {
md5cycle(state, md5blk(s.substring(i-64, i)));
}
s = s.substring(i-64);
var tail = [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0];
for (i=0; i<s.length; i++)
tail[i>>2] |= s.charCodeAt(i) << ((i%4) << 3);
tail[i>>2] |= 0x80 << ((i%4) << 3);
if (i > 55) {
md5cycle(state, tail);
for (i=0; i<16; i++) tail[i] = 0;
}
tail[14] = n*8;
md5cycle(state, tail);
return state;
}

/* there needs to be support for Unicode here,
 * unless we pretend that we can redefine the MD-5
 * algorithm for multi-byte characters (perhaps
 * by adding every four 16-bit characters and
 * shortening the sum to 32 bits). Otherwise
 * I suggest performing MD-5 as if every character
 * was two bytes--e.g., 0040 0025 = @%--but then
 * how will an ordinary MD-5 sum be matched?
 * There is no way to standardize text to something
 * like UTF-8 before transformation; speed cost is
 * utterly prohibitive. The JavaScript standard
 * itself needs to look at this: it should start
 * providing access to strings as preformed UTF-8
 * 8-bit unsigned value arrays.
 */
function md5blk(s) { /* I figured global was faster.   */
var md5blks = [], i; /* Andy King said do it this way. */
for (i=0; i<64; i+=4) {
  md5blks[i>>2] = s.charCodeAt(i) + (s.charCodeAt(i+1) << 8) + (s.charCodeAt(i+2) << 16) + (s.charCodeAt(i+3) << 24);
}
return md5blks;
}

var hex_chr = '0123456789abcdef'.split('');

function rhex(n)
{
var s='', j=0;
for(; j<4; j++)
s += hex_chr[(n >> (j * 8 + 4)) & 0x0F] + hex_chr[(n >> (j * 8)) & 0x0F];
return s;
}

function hex(x) {
for (var i=0; i<x.length; i++)
x[i] = rhex(x[i]);
return x.join('');
}

function md5(s) {
return hex(md51(s));
}

/* this function is much faster,
so if possible we use it. Some IEs
are the only ones I know of that
need the idiotic second function,
generated by an if clause.  */

function add32(a, b) {
return (a + b) & 0xFFFFFFFF;
}

/*

if (md5('hello') != '5d41402abc4b2a76b9719d911017c592') {
  function add32(x, y) {
    var lsw = (x & 0xFFFF) + (y & 0xFFFF),
    msw = (x >> 16) + (y >> 16) + (lsw >> 16);
    return (msw << 16) | (lsw & 0xFFFF);
  }
}*/
(function($) {  
  
  $(document).ready((function() {
   $((function() {
      $('table').reflowTable({autoWidth: breakpoint_tablet});
   }));
  })); 
   
})(jQuery);

/**
 *  @file rollover.js
 *
 *  Handles rollovers in two ways – by file naming convention or by the presence of a
 *  named data attribute on the image.
 *
 *  Method 1: File Naming
 *  Label the neutral state of the image file by appending “_up”, and provide a corresponding
 *  active state image file appended with “_over” in the same folder.
 *
 *  E.g. /path/to/myimage_up.png --> /path/to/myimage_over.png
 *
 *  Method 2: Named attribute
 *  Provide a "data-src-active" attribute in the image tag with a full path to the active
 *  state image.
 *
 *  E.g. <img src='/path/to/myimage.png' data-src-active='/path/to/myactiveimage.png' ... />
 *
 */

var cache = []; // preloader

jQuery(document).ready((function() {
	jQuery('img').each((function() {
		rollover_bind(this);
	}));
}));


function rollover_bind(e) {
	var states = ['_up','_down'];		
	for (i=0;i<states.length;i++) { // bind all listed states
		var src = jQuery(e).attr('src');
		if (src != null) {
			jQuery(e).on('mouseover touchstart',(function() {  
				var replace ='';
				if (typeof jQuery(this).attr('data-src-active') != 'undefined') {
  				replace = jQuery(this).attr('data-src-active');
  				jQuery(this).attr('data-src',src);
  				jQuery(this).attr('src',replace);
        } else if (src.indexOf(states[i],0) > 0) {
					replace = src.replace('_up','_over');
					jQuery(this).attr('src',replace);
        }
        if (replace != '') {
  				var cacheimage = document.createElement('img'); // preload
  				cacheimage.src = replace;
  				cache.push(cacheimage);
				}
			}));
			jQuery(e).on('mouseout touchend',(function() {
				var replace ='';
				if (typeof jQuery(this).attr('data-src') != 'undefined') {
  				replace = jQuery(this).attr('data-src');
  				jQuery(this).attr('src',replace);
        } else if (src.indexOf(states[i],0) > 0) {
					replace = src.replace('_over','_up');
					jQuery(this).attr('src',replace);
				}
			}));
		}
	}
}
(function($) {
  $(document).ready((function() {
    // Select all links with hashes
  
    $('a[href*="#"]')
      // Remove links that don't actually link to anything
      .not('[href="#"]')
      .not('[href="#0"]')
      .click((function(event) {
        // On-page links
        if ( location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname ) {
          // Figure out element to scroll to
          var target = $(this.hash);
          target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
          // Does a scroll target exist?
          if (target.length) {
            // Only prevent default if animation is actually gonna happen
            event.preventDefault();
            $('html, body').animate({
              scrollTop: target.offset().top
            }, 1000, (function() {
              // Callback after animation
              // Must change focus!
              var $target = $(target);
              $target.focus();
              if ($target.is(":focus")) { // Checking if the target was focused
                return false;
              } else {
                $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
                $target.focus(); // Set focus again
              }
            }));
          }
        }
      }));
  }));
})(jQuery);