var formValues = JSON.parse(localStorage.getItem('formValues')) || {};
var $checkboxes = $('.checkbox');
var $button = $("#checkbox-container button");


function allChecked(){
  return $checkboxes.length === $checkboxes.filter(":checked").length;
}

function updateButtonStatus(){
  $button.text(allChecked()? "Uncheck all" : "Check all");
}

function handleButtonClick(){
  $checkboxes.prop("checked", allChecked()? false : true)
   
}

function updateStorage(){
  $checkboxes.each(function(){
    formValues[this.id] = this.checked;
  });
  
  formValues["buttonText"] = $button.text();
  localStorage.setItem("formValues", JSON.stringify(formValues));
}

$button.on("click", function() {
  handleButtonClick();
  updateButtonStatus();
  updateStorage();
  
});

$checkboxes.on("change", function(){
    if(localStorage.isLogin){
        this.checked ? localStorage.finish++ : localStorage.finish--;
        }
  updateButtonStatus();
  updateStorage();
});


// On page load
$.each(formValues, function(key, value) {
  $("#" + key).prop('checked', value);
});

$button.text(formValues["buttonText"]);