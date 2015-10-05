// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require react
//= require react_ujs
//= require underscore/underscore-min
//= require components
//= require semantic-ui/dist/semantic.min.js
//= require lightgallery/dist/js/lightgallery.min
//= require lightgallery/dist/js/lg-thumbnail.min
//= require lightgallery/dist/js/lg-fullscreen.min
//= require lightgallery/dist/js/lg-zoom.min
//= require_tree .


$(document).on('ready page:load',function(){
	$('.ui.modal').modal('attach events', '#login-link');
	$('.ui.dropdown:not(.custom)').dropdown({
		on: 'click hover'
	});

	$('.message .close')
  .on('click', function() {
    $(this)
      .closest('.message')
      .transition('fade')
    ;
  });

  $('.ui.accordion').accordion();
  if(window.innerWidth < 767)
  {
    $('.list-header').click(function(){
      $(this).next().slideToggle();
    });
  }
});