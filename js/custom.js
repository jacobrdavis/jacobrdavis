function toggleChevron(e) {
    $(e.target)
      .prev('.card-header')
      .find("i.mdi")
      .toggleClass('mdi-chevron-down mdi-chevron-up');
  }
  
  $('#accordion').on('hidden.bs.collapse', toggleChevron);
  $('#accordion').on('shown.bs.collapse', toggleChevron);



  $(document).ready(function(){
      // Add minus icon for collapse element which is open by default
      $(".collapse.show").each(function(){
          $(this).prev(".card-header").find(".fa").addClass("fa-minus").removeClass("fa-plus");
      });
      
      // Toggle plus minus icon on show hide of collapse element
      $(".collapse").on('show.bs.collapse', function(){
          $(this).prev(".card-header").find(".fa").removeClass("fa-plus").addClass("fa-minus");
      }).on('hide.bs.collapse', function(){
          $(this).prev(".card-header").find(".fa").removeClass("fa-minus").addClass("fa-plus");
      });
  });

