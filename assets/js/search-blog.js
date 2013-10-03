jQuery(document).ready(function($) {
	var mcc_cache = {};
	$( "#search_for_blog" ).autocomplete({
	  minLength: 2,
	  source: function( request, response ) {
	    var term = request.term;
	    if ( term in mcc_cache ) {
	      response( mcc_cache[ term ] );
	      return;
	    }
		
		var data = {
			action: 'mcc_get_sites_search',
			term: request.term
		};


	    $.ajax({
			url: ajaxurl,
			data: data,
			type: 'post',
			dataType: 'json'
		}).done(function( data ) {
			mcc_cache[ term ] = data;
			response( data );
		});

	    //$.getJSON( export_to_text_js.ajaxurl, data ).done( function( data, status, xhr ) {
	    //	console.log(data);
		//	//mcc_cache[ term ] = data;
		//	//response( data );
	    //});
	  },
	  response: function( event, ui ) {
	  	for ( var i = 0; i < ui.content.length; i++ ) {
	  		ui.content[i].label = ui.content[i].path + ' [' + ui.content[i].blog_name + ']';
	  		ui.content[i].value = ui.content[i].blog_name;
	  	}
	  },
	  select: function ( event, ui ) {
	  	$( '#blog_id' ).val( ui.item.blog_id );
	  }
	});
});