jQuery ($) ->
  presentation = new Presentation

  $(".wrapper").css "width": "#{presentation.map.width}px", "height": "#{presentation.map.height}px"

  $(document).on "keyup", presentation.handleKey
