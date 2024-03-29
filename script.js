$(document).ready(function () {
    $('#exampleModal').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget)
        var recipient = button.data('whatever')
        var modal = $(this)
        modal.find('.modal-title').text('New message to ' + recipient)
        modal.find('.modal-body input').val(recipient)
    })
}) 

//heading section
$(document).ready(function () {
    var heading = getLocalStorage("Heading");
    if (heading) {
        $("#mainContainer").append(heading);
    }
    $(".select-heading").on('submit', function (e) {
        e.preventDefault();

        var heading = $('input').val()

        $("main").append('<section><h1>' + heading + '<button class="remove btn-danger" onclick="removFun(this)">X</button></h1></section>')
        $('.select-sub-heading option').remove()
        $('.select-sub-heading select').append("<option value='' selected disabled>--Select Heading--</option>")
        $('.select-form #headings option').remove()
        $('.select-form #headings').append("<option value='' selected disabled>--Select Heading--</option>")
        $('section h1').each(function (key) {
            key = key + 1
            var heading_in_sub_heading = $(this).text()
            $('.select-sub-heading select').append("<option value=" + key + ">" + heading_in_sub_heading + "</option>")
            $('.select-form #headings').append("<option value=" + key + ">" + heading_in_sub_heading + "</option>")
        })
        $(".select-heading")[0].reset();
        setLocalStorage();
    })
});

//sub heading section
$(document).ready(function () {
    $(".select-sub-heading").on('submit', function (e) {
        e.preventDefault();
        var heading_in_sub_heading = $('select option:selected', this).val()

        var sub_heading = $('input', this).val()

        $('.select-form #nitesh option').remove()
        $('.select-form #nitesh').append("<option value='' selected disabled>--Select Heading--</option>")

        $("section:nth-child(" + heading_in_sub_heading + ")").append('<div class="container mt-3"><h4>' + sub_heading + '<button class="remove btn-danger" onclick="removFun(this)">X</button></h4></div>')
        $('section .container h4').each(function (key) {
            key = key + 1
            $(this).text()
            $(".select-sub-heading")[0].reset();
            setLocalStorage();
        })
    })
});

//form section
$(document).ready(function () {
    var subheading = [];
    $('.formheading').on('change', function (e) {
        e.preventDefault();
        var heading_in_sub_heading = $('.formheading option:selected').val()

        $('.select-form #nitesh option').remove()
        $('.select-form #nitesh').append("<option value='' selected disabled>--Select Heading--</option>")
        subheading = []
        $("section:nth-child(" + heading_in_sub_heading + ") div h4").each(function (key) {
            subheading.push($(this).text())
        })

        $.each(subheading, function (index, itemData) {
            $('#nitesh').append($("<option></option>")
                .attr("value", index + 2)
                .text(itemData));
        });

    })

    $(".select-form").on('submit', function () {
        alert("I'm called");

        var h = $('.formheading option:selected').val()

        var sh = $('.subheadingform option:selected').val()

        $('.form-select').change(function () {
            var v = $(this).val()
        })

        var controlType = $('#controlType').val();
        var lbl = $('.ilabel').val()
        var cls = $('.iclass').val()
        var id = $('.iid').val()
        var ph = $('.iplaceholder').val()
        var vlu = $('.ivalue').val()
        var nme = $('.iname').val()
        var act = $('.iaction').val()
        var opt = $('.ioption').val()

        var element = '<input type="' + controlType + '" label="' + lbl + '" class="' + cls + '" id="' + id + '" placeholder="' + ph + '" value="' + vlu + '" name="' + nme + '" action="' + act + '" option="' + opt + '" /><br>'
        $('main section:nth-child(' + h + ') div:nth-child(' + sh + ')').append('<p>'+element+'<button class="remove btn-danger" onclick="removFun(this)">X</button></p>')
        setLocalStorage();
    })
});

function setLocalStorage() {
    var selectedValue = $('#mainContainer').html();
    localStorage.setItem("Heading", selectedValue);;
};

function getLocalStorage(property) {
    return localStorage.getItem(property);
};

$(function () {
    $('#mainContainer').sortable({
        change: function(event, ui){setLocalStorage()},
        update: function(event, ui){setLocalStorage()},
        connectWith: '#mainContainer'
    });

    $('section').sortable({
        change: function(event, ui){setLocalStorage()},
        update: function(event, ui){setLocalStorage()},
        connectWith: 'section',
        cancel: 'h1, button'
    });

    $('.container').sortable({
        change: function(event, ui){setLocalStorage()},
        update: function(event, ui){setLocalStorage()},
        connectWith: '.container',
        cancel: 'h4, button'
    });
    setLocalStorage();
})

function removFun(remove){
    $(remove).parent().remove();
    setLocalStorage();
}