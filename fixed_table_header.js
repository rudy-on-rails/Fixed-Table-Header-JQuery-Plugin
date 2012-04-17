jQuery.fn.fixedtableheader = function(options) { 
	var settings = jQuery.extend({ 
		headerrowsize: 1, 
		highlightrow: false, 
		highlightclass: "highlight" 
		}, options); 
		this.each(function(i) { 
			if (options.override_left_assignment == undefined)
				options.override_left_assignment = 0;															
			var $tbl = $(this); 
			var $tblhfixed = $tbl.find("tr:lt(" + settings.headerrowsize + ")"); 
			var headerelement = "th"; 
			if ($tblhfixed.find(headerelement).length == 0) 
				headerelement = "td"; 												
			if ($tblhfixed.find(headerelement).length > 0) { 
				$tblhfixed.find(headerelement).each(function() { 
					$(this).css("width", $(this).width()); 
					}); 
				var $clonedTable = $tbl.clone().empty(); 
				var tblwidth = GetTblWidth($tbl); 				
				$clonedTable.attr("id", "fixedtableheader" + i).css({"position": "fixed", "top": "0", "left": $tbl.offset().left }).append($tblhfixed.clone()).width(tblwidth).hide().appendTo($("body")); 																
				if (settings.highlightrow) $("tr:gt(" + (settings.headerrowsize - 1) + ")", $tbl).hover(function() { 
					$(this).addClass(settings.highlightclass); }, function() { 
						$(this).removeClass(settings.highlightclass); 
					}); 
					div_to_apply = options.container_div_element;
					if (options.jquery_window == true){										
						applyJQueryWindowTrackingOn($clonedTable, $tbl, div_to_apply, options);										
					}
					div_to_apply.scroll(function() { 
						applyPositioningTrackingOnToTargetDiv($clonedTable, $tbl, div_to_apply, options);
						var sctop = div_to_apply.scrollTop(); 
						var elmtop = $tblhfixed.offset().top; 
						if (sctop > elmtop - options.variable_height) 
							$clonedTable.show(); 
						else $clonedTable.hide(); 
					}); 
					$(window).scroll(function(){						
						applyPositioningTrackingOnToTargetDiv($clonedTable, $tbl, div_to_apply, options);
					});
					$(window).resize(function() { 
						if ($clonedTable.outerWidth() != $tbl.outerWidth()) { 
							$tblhfixed.find(headerelement).each(function(index) { 
								var w = $(this).width(); 
								$(this).css("width", w); 
								$clonedTable.find(headerelement).eq(index).css("width", w); }); 
								$clonedTable.width($tbl.outerWidth()); 
						} 
						$clonedTable.css("left", $tbl.offset().left); 
					});
			} 
		}); 		
		function GetTblWidth($tbl) { 
			var tblwidth = $tbl.outerWidth(); return tblwidth; 
		} 	
		function applyJQueryWindowTrackingOn(element, table, divToApply, options){
			jqueryElement = $('.ui-dialog');
			element.css({'z-index': jqueryElement.css('z-index')});
			$("#dialog-form").dialog({
				dragStart: function(event, ui){
					element.hide();
				},
				dragStop: function(event, ui){
					applyPositioningTrackingOnToTargetDiv(element, table, divToApply, options);
					element.show();
				},
				beforeClose: function(event, ui){
					element.remove();
				}
			});
		}
		function applyPositioningTrackingOnToTargetDiv(element, table, targetDiv, options){
			if (jQuery.browser.msie && jQuery.browser.version == "6.0")
				element.css({ "position": "absolute", "top": targetDiv.offset().top, "left": table.offset().left - options.override_left_assignment });
			else 
				element.css({ "position": "fixed", "top": targetDiv.offset().top - $(window).scrollTop(), "left": table.offset().left - $(window).scrollLeft() - options.override_left_assignment});
		}
};