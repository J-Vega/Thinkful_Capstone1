$(function() {
    $(".button").click(function() {
        //The text of the box clicked is placed in the placeholder on pop up
        $("#myform #valueFromMyButton").text($(this).val().trim());
        $("#myform input[type=text]").val('');
        $("#valueFromMyModal").val('');
        $("#myform").show(500);
    });
    $("#btnOK").click(function() {
        $("#valueFromMyModal").val($("#myform input[type=text]").val().trim());
        $("#myform").hide(400);
    });
});