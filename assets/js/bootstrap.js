function formatPhone(n) {
    var i = document.getElementById(n),
        t = i.value,
        r;
    t = t.replace(/[^\d,\(,\),\-]/g, "");
    t.length == 3 ? t = t.replace(/^(\d{3})$/, "($1)") : t.length == 5 ? t = t.replace(/^\(?(\d{3})(\d*)$/, "($1)$2") : t.length == 7 ? t = t.replace(/^\(?(\d{3})\)?\-*(\d+)$/, "($1)$2") : t.length == 9 ? (t = t.replace(/^\(?(\d{3})\)?\-*(\d{3})\-?(\d{4})(.*)/, "($1)$2-$3"), t = t.replace(/^\(?(\d{3})\)?\-*(\d{3})$/, "($1)$2-"), t = t.replace(/^\(?(\d{3})\)?\-?(\d{3})(\d)$/, "($1)$2-$3")) : t = t.replace(/^\(?(\d{3})\)?\-*(\d{3})\-*(\d{4})(.*)/, "($1)$2-$3");
    i.value = t;
    r = $(i).parents("form").validate();
    r.element($(i));
    validate($(i))
}

function formatMoney(n) {
    try {
        $(n).val($(n).val().replace(/([^-]*)(-)?([^-]*)/g, "$2$1$3").replace(/(?!^)-\$/g, "").replace(/(?!^)-/g, "").replace(/[^\d\.\$\-]/g, "").replace(/^(\-)?\$?((\d{1,3}|\,)+(\.\d{0,2})?)(\d*)/, "$1$$$2"))
    } catch (t) {
        $(this).val($(this).val().replace(/([^-]*)(-)?([^-]*)/g, "$2$1$3").replace(/(?!^)-\$/g, "").replace(/(?!^)-/g, "").replace(/[^\d\.\$\-]/g, "").replace(/^(\-)?\$?((\d{1,3}|\,)+(\.\d{0,2})?)(\d*)/, "$1$$$2"))
    }
}

function formatNumberOnly() {
    $(this).val($(this).val().replace(/[^\d\.\%]/g, ""))
}

function checkBanNumber(n) {
    alert(n.id)
}

function checkFileName(n) {
    return n == "" ? (alert("Please upload a valid image"), !1) : n.match(/^.*\.(jpg|JPG|gif|GIF|png|PNG|jpeg|JPEG|bmp|BMP)$/) ? !0 : (alert("File with " + n.split(".")[1] + " is invalid. Please upload a valid image file."), !1)
}

function readURL(n) {
    if (n.files && n.files[0] && checkFileName(n.files[0].name)) {
        var t = new FileReader;
        t.onload = function(n) {
            $("#profile-picture").attr("src", n.target.result)
        };
        t.readAsDataURL(n.files[0])
    }
}

function initDateTimePicker() {
    $(".datetimepicker4").datetimepicker({
        format: "MMMM D, YYYY",
        minDate: "1900-01-01",
        toolbarPlacement: "bottom",
        showClose: !0,
        icons: {
            close: "glyphicon glyphicon-ok"
        }
    })
}

function initDateTimePickerTime(n) {
    var t = $(".datetimepickertime").val();
    t && t !== "0001-01-01 12:00:00 AM" || (t = moment());
    n === "past" ? (t = moment(t).add(1, "m"), $(".datetimepickertime").datetimepicker({
        format: "MMMM D, YYYY h:mm a",
        minDate: "1900-01-01",
        maxDate: t,
        sideBySide: !0,
        toolbarPlacement: "bottom",
        showClose: !0,
        icons: {
            close: "glyphicon glyphicon-ok"
        }
    })) : n === "future" ? (moment(t) > moment() && (t = moment()), t = moment(t).add(-1, "m"), $(".datetimepickertime").datetimepicker({
        format: "MMMM D, YYYY h:mm a",
        minDate: t,
        sideBySide: !0,
        toolbarPlacement: "bottom",
        showClose: !0,
        icons: {
            close: "glyphicon glyphicon-ok"
        }
    })) : $(".datetimepickertime").datetimepicker({
        format: "MMMM D, YYYY h:mm a",
        minDate: "1900-01-01",
        sideBySide: !0,
        toolbarPlacement: "bottom",
        showClose: !0,
        icons: {
            close: "glyphicon glyphicon-ok"
        }
    })
}

function initDateTimePickerMonth() {
    $(".dateTimePickerMonth").datetimepicker({
        viewMode: "months",
        format: "MM/YYYY",
        toolbarPlacement: "bottom",
        showClose: !0,
        icons: {
            close: "glyphicon glyphicon-ok"
        }
    })
}

function getParameterByName(n, t) {
    t || (t = window.location.href);
    n = n.replace(/[\[\]]/g, "\\$&");
    var r = new RegExp("[?&]" + n + "(=([^&#]*)|&|#|$)"),
        i = r.exec(t);
    return i ? i[2] ? decodeURIComponent(i[2].replace(/\+/g, " ")) : "" : null
}

function validate(n) {
    (n.hasClass("required") || n.hasClass("was-required")) && (n.val() && !n.hasClass("input-validation-error") ? n.removeClass("required").addClass("was-required") : n.removeClass("was-required").addClass("required"))
}

function validateSelect(n) {
    n.val() ? (n.removeClass("required"), n.addClass("was-required")) : n.hasClass("was-required") && (n.addClass("required"), n.removeClass("was-required"))
}

function updateValidation(n) {
    $("input.was-required, input.required, textarea.was-required, textarea.required").on("change blur keyup", function() {
        validate($(this))
    });
    $("select.required, select.was-required").on("change", function() {
        validateSelect($(this))
    });
    var t = $(n).removeData("validator").removeData("unobtrusiveValidation");
    $.validator.unobtrusive.parse(t)
}

function initRangeSlider() {
    $('input[type="range"]').rangeslider({
        polyfill: !1,
        onInit: function() {
            this.output = $('<div class="range-output" />').insertAfter(this.$range).html(this.$element.val());
            $(this.output).siblings("input:hidden").val(this.$element.val())
        },
        onSlide: function(n, t) {
            this.output.html(t);
            t != 0 || $(this.output).parent().siblings("div.checkbox").children().children("input:first").prop("checked") ? $(this.output).parent().siblings("input.answered-check").val(!0) : $(this.output).parent().siblings("input.answered-check").val(!1);
            $(this.output).siblings("input:hidden").val(t);
            checkForm()
        }
    })
}

function saveActivity(n) {
    var t = $(".modal.in:last textarea#notes").val();
    $("#followUp").val(n);
    checkActivityNotes() === t && ($.validator.setDefaults({
        focusInvalid: !1
    }), $(".modal.in:last textarea#notes").removeClass("was-required"), $(".modal.in:last textarea#notes").addClass("required"), $(".modal.in:last textarea#notes").val(""));
    $("#update-activity-form").valid() ? ($("#update-activity-partial").animate({
        opacity: .7
    }, 200), $(".modal.in:last .modal-dialog .loader-bg").fadeIn(), $(".modal.in:last textarea#notes").val(t.replace(/[<>]/g, "")), $("#update-activity-form").submit(), $(".modal.in:last .activity-complete-button").removeAttr("onclick"), $(".modal.in:last .activity-complete-button").prop("disabled", !0)) : $(".modal.in:last textarea#notes").val(t);
    $("#update-activity-form").trigger("checkform.areYouSure")
}

function checkActivityNotes(n) {
    if (n != undefined) origEditNotesVal = $("textarea#notes").val();
    else return origEditNotesVal
}

function save() {
    var n = $("textarea#notes").val();
    origEditNotesVal === n ? ($.validator.setDefaults({
        focusInvalid: !1
    }), $("textarea#notes").removeClass("was-required"), $("textarea#notes").addClass("required"), $("textarea#notes").val(""), $("#save-activity-form").submit(), $("#save-activity-form").trigger("checkform.areYouSure"), $("textarea#notes").val(n)) : $("#save-activity-form").valid() && ($("#save-activity-partial").animate({
        opacity: .7
    }, 200), $(".modal.in:last .modal-dialog .loader-bg").fadeIn(), $("#warning-message").hide(), $("textarea#notes").val(n.replace(/[<>]/g, "")), $("#save-activity-form").submit(), $("#save-activity-form").trigger("checkform.areYouSure"))
}

function editActivityOpen(n) {
    $("#myModal").modal("show");
    clickOut(!0);
    $("#myModal .activity-selection").hide();
    $("#myModal .modal-dialog .loader-bg").fadeIn();
    $("#myModal .modal-dialog").css({
        width: "40%"
    });
    $("#myModal .modal-dialog").animate({
        width: "45%"
    }, 400);
    $("#modal-content-placeholder").load("/Activities/Edit/" + n, function() {
        $("#contact-info-popover").popover({
            html: !0,
            title: function() {
                return $("#contact-info-popover-title").html()
            },
            content: function() {
                return $("#contact-info-popover-content").html()
            }
        });
        initDateTimePickerTime("future");
        $("#myModal .modal-dialog .loader-bg").fadeOut(200);
        $("#modal-content-placeholder").slideDown(400, function() {
            $(this).animate({
                opacity: 1
            }, 200)
        });
        checkActivityNotes($("textarea#notes").val());
        updateValidation("form#update-activity-form");
        $("form#update-activity-form").areYouSure({
            silent: !0
        })
    })
}

function cancelMeeting() {
    $("#followUp").val("3");
    $(".modal.in:last #update-activity-form").valid() && ($(".modal.in:last .modal-dialog .loader-bg").fadeIn(100), $(".modal.in:last #update-activity-partial").animate({
        opacity: 0
    }, 200).slideUp(500, function() {
        $(".modal.in:last > div > div:nth-last-child(2)").append('<div id="cancel-meeting-holder" style="display: none; opacity: 0"><\/div>');
        $(".modal.in:last #cancel-meeting-holder").load("/Activities/CancelMeeting", function() {
            $(".modal.in:last #cancel-meeting-holder").slideDown(400, function() {
                $(".modal.in:last .modal-dialog .loader-bg").fadeOut(50);
                $(".modal.in:last #cancel-meeting-holder").animate({
                    opacity: 1
                }, 400);
                $("input.was-required, input.required, textarea.was-required, textarea.required").on("change blur keyup", function() {
                    validate($(this))
                })
            })
        })
    }))
}

function cancelCancelMeeting() {
    $(".modal.in:last .modal-dialog .loader-bg").fadeIn(100);
    $(".modal.in:last #cancel-meeting-holder").animate({
        opacity: 0
    }, 200).slideUp(500, function() {
        $(this).remove();
        $(".modal.in:last #update-activity-partial").animate({
            opacity: 1
        }, 500).slideDown({
            duration: 500,
            queue: !1
        });
        $(".modal.in:last .modal-dialog .loader-bg").delay(200).fadeOut(200)
    })
}

function submitCancelMeeting() {
    var n = "";
    n = $('.modal.in:last input[name="reason"]:checked').val() === "other" ? $(".modal.in:last #other-reason").val() : $('.modal.in:last input[name="reason"]:checked').val();
    $(".modal.in:last #update-activity-form #notes").val(function(t, i) {
        return n + i
    });
    $(".modal.in:last #cancel-meeting-holder").remove();
    $(".modal.in:last #update-activity-partial").animate({
        opacity: .7
    }, 200);
    $(".modal.in:last > div > div:nth-last-child(2) *").fadeIn();
    $(".modal.in:last .modal-dialog .loader-bg").fadeIn(200);
    $(".modal.in:last #update-activity-form").submit();
    $(".modal.in:last #update-activity-form").trigger("checkform.areYouSure")
}

function meetingReportModal(n) {
    addOppModalListener();
    $("#opp-modal .activity-selection").hide();
    $("#opp-modal .modal-dialog .loader-bg").fadeIn();
    clickOut(!1);
    $("#opp-modal .modal-dialog").css({
        width: "40%"
    });
    $("#opp-modal .modal-dialog").animate({
        width: "60%"
    }, 200);
    $("#opp-modal-content-placeholder").load("/Opportunities/MeetingReportSummaryView/", {
        id: n,
        oppID: $("#opportunityID").val()
    }, function() {
        $("#opp-modal .modal-dialog .loader-bg").fadeOut(200);
        $("#opp-modal-content-placeholder").slideDown(300, function() {
            $(this).animate({
                opacity: 1
            }, 200)
        })
    })
}

function editOpportunityNYQ(n) {
    $("#myModal").modal("show");
    $(".activity-selection").hide();
    $(".modal-dialog .loader-bg").fadeIn();
    $(".modal-dialog").css({
        width: "45%"
    }, 200);
    clickOut(!0);
    $("#modal-content-placeholder").load("/Opportunities/Edit/" + n, function() {
        $(".modal-dialog .loader-bg").fadeOut(200);
        $("#modal-content-placeholder").slideDown(300, function() {
            initRangeSlider();
            $(this).animate({
                opacity: 1
            }, 200, function() {
                $('input[type="range"]').rangeslider("update")
            })
        })
    })
}

function editOpportunity(n) {
    $("#myModal").modal("show");
    $("#myModal .activity-selection").hide();
    $("#myModal .modal-dialog .loader-bg").fadeIn();
    $("#myModal .modal-dialog").css({
        width: "40%"
    });
    $("#myModal .modal-dialog").animate({
        width: "65%"
    }, 600);
    $("#modal-content-placeholder").load("/Opportunities/Details/" + n, function() {
        $("#modal-content-placeholder").slideDown(400, function() {
            initOppDetails(n);
            $("#opportunity-tab-placeholder").load("/Opportunities/Edit/" + n, function() {
                clickOut(!0);
                updateOppToolBar();
                $("#myModal .modal-dialog .loader-bg").fadeOut(200);
                $(this).slideDown(500);
                $(this).animate({
                    opacity: 1
                }, 200);
                initDateTimePicker();
                $("#contactID").change(function() {
                    var n = $("#contactID option:selected").val();
                    $("#contact-info-partial").load("/Opportunities/UpdateContactInfo/", {
                        id: n,
                        oppID: $("#opportunityID").val()
                    })
                });
                $("#LocationID").change(function() {
                    var n = $("#LocationID option:selected").val();
                    $("#location-info-partial").load("/Opportunities/UpdateLocationInfo/" + n)
                });
                updateValidation("#save-opportunity-form");
                validateCurrency();
                $("form#save-opportunity-form").areYouSure({
                    silent: !0
                });
                $("#sales-rep-popover").popover({
                    html: !0,
                    title: function() {
                        return $("#sales-rep-popover-title").html()
                    },
                    content: function() {
                        return $("#sales-rep-popover-content").html()
                    }
                });
                $("#sales-specialist-popover").popover({
                    html: !0,
                    title: function() {
                        return $("#sales-specialist-popover-title").html()
                    },
                    content: function() {
                        return $("#sales-specialist-popover-content").html()
                    }
                });
                $("#referring-rep-popover").popover({
                    html: !0,
                    title: function() {
                        return $("#referring-rep-popover-title").html()
                    },
                    content: function() {
                        return $("#referring-rep-popover-content").html()
                    }
                })
            })
        });
        $(this).animate({
            opacity: 1
        }, 200)
    })
}

function UpdateOpportunitySuccess() {
    $(".modal.in:last .modal-dialog .loader-bg").fadeOut(200);
    $("#opportunity-tab-placeholder").animate({
        opacity: 1
    }, 200);
    $("div.alert-success").show().delay(3e3).fadeOut(200);
    initDateTimePicker();
    $("#ContactID").change(function() {
        var n = $("#ContactID option:selected").val();
        $("#contact-info-partial").load("/Opportunities/UpdateContactInfo/", {
            id: n,
            oppID: $("#opportunityID").val()
        })
    });
    $("#LocationID").change(function() {
        var n = $("#LocationID option:selected").val();
        $("#location-info-partial").load("/Opportunities/UpdateLocationInfo/" + n)
    });
    updateValidation("#save-opportunity-form");
    validateCurrency();
    updateOppToolBar();
    $("form#save-opportunity-form").areYouSure({
        silent: !0
    });
    $("#sales-rep-popover").popover({
        html: !0,
        title: function() {
            return $("#sales-rep-popover-title").html()
        },
        content: function() {
            return $("#sales-rep-popover-content").html()
        }
    });
    $("#sales-specialist-popover").popover({
        html: !0,
        title: function() {
            return $("#sales-specialist-popover-title").html()
        },
        content: function() {
            return $("#sales-specialist-popover-content").html()
        }
    });
    $("#referring-rep-popover").popover({
        html: !0,
        title: function() {
            return $("#referring-rep-popover-title").html()
        },
        content: function() {
            return $("#referring-rep-popover-content").html()
        }
    })
}

function validateCurrency() {
    try {
        $("#forecastOneTime").rules("add", {
            required: !0,
            currency: "$"
        });
        $("#forecastMonthly").rules("add", {
            required: !0,
            currency: "$"
        })
    } catch (n) {
        console.log(n.message)
    }
}

function saveOpportunity() {
    $("#save-opportunity-form").valid() && ($("form#save-opportunity-form").trigger("checkform.areYouSure"), $("#OppStageID option:selected").val() == 17 ? rejectedOpportunityModal() : ($("#opportunity-tab-placeholder").animate({
        opacity: .7
    }, 200), $(".modal.in:last .modal-dialog .loader-bg").fadeIn(200), $("#save-opportunity-form").submit()))
}

function checkRejectCheckBoxes() {
    $(".btn.btn-dark.disabled").prop("disabled", !1).removeClass("disabled")
}

function submitRejection() {
    $("#save-opportunity-form").valid() && ($("#notes").val($("#notes").val() + " Unsuitable: " + $('input[name="reason"]:checked').val()), closeModal(), $("#save-opportunity-form").submit())
}

function rejectedOpportunityModal() {
    addOppModalListener();
    $("#opp-modal .activity-selection").hide();
    $("#opp-modal .modal-dialog .loader-bg").fadeIn();
    clickOut(!0);
    $("#opp-modal .modal-dialog").css({
        width: "40%"
    });
    $("#opp-modal .modal-dialog").animate({
        width: "40%"
    }, 400);
    $("#opp-modal-content-placeholder").load("/Opportunities/OpportunityRejected/", function() {
        $("#opp-modal .modal-dialog .loader-bg").fadeOut(200);
        $("#opp-modal-content-placeholder").slideDown(300, function() {
            $(this).animate({
                opacity: 1
            }, 200)
        })
    })
}

function OpportunityUpdatedSuccess() {
    $(document).ready(function() {
        clickOut(!1);
        var n = window.navigator.userAgent,
            t = n.indexOf("MSIE ");
        t > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./) ? ($(".back").show(), $(".pot-com").delay(150).fadeIn()) : ($(".card").flip({
            trigger: "manual",
            speed: 1e3
        }), setTimeout(function() {
            $(".card").flip("toggle");
            $(".pot-com").delay(150).fadeIn()
        }, 100));
        setTimeout(function() {
            updateTable("#oppTable")
        }, 2e3)
    })
}

function meetingReportNone(n) {
    $(n).prop("checked") ? ($('#save-activity-form .checkbox input[type="checkbox"]:not(:last)').prop("checked", !1), $('#save-activity-form .checkbox input[type="checkbox"]:not(:last)').prop("disabled", !0), $("#save-activity-form .checkbox:not(:last)").addClass("disabled"), $(".btn.btn-dark.pos-bottom-right").removeClass("disabled"), $(".btn.btn-dark.pos-bottom-right").prop("disabled", !1)) : ($("#save-activity-form .checkbox:not(:last, .assigned)").removeClass("disabled"), $('#save-activity-form .checkbox input[type="checkbox"]:not(:last, .assigned)').prop("disabled", !1), $(".btn.btn-dark.pos-bottom-right").addClass("disabled"), $(".btn.btn-dark.pos-bottom-right").prop("disabled", !0))
}

function checkCheckBoxes(n) {
    var t = !1;
    $(n).prop("checked") ? ($(".btn.btn-dark.pos-bottom-right").removeClass("disabled"), $(".btn.btn-dark.pos-bottom-right").prop("disabled", !1), t = !0) : $('#save-activity-form .checkbox input[type="checkbox"]:not(:last)').each(function() {
        if ($(this).prop("checked")) {
            $(".btn.btn-dark.pos-bottom-right").removeClass("disabled");
            $(".btn.btn-dark.pos-bottom-right").prop("disabled", !1);
            t = !0;
            return
        }
    });
    t || ($(".btn.btn-dark.pos-bottom-right").addClass("disabled"), $(".btn.btn-dark.pos-bottom-right").prop("disabled", !0))
}

function meetingReportNext() {
    $(".modal.in:last #save-activity-form").submit();
    $(".modal.in:last #save-activity-form").trigger("checkform.areYouSure");
    $(".modal.in:last .modal-dialog .loader-bg").fadeIn(200);
    $(".modal.in:last #save-activity-partial").animate({
        opacity: 0
    }, 200)
}

function confirmDetailsNewContact(n) {
    n == -1 && ($(".modal.in:last #ContactID option:first").val() != 0 && $(".modal.in:last #ContactID").prepend($("<option><\/option>").attr("value", "0").text("New contact")), $(".modal.in:last #ContactID").val(0));
    $(".modal.in:last .modal-dialog .loader-bg").fadeIn(200);
    $("#confirm-details-partial").load("/ClientContacts/UpdateConfirmDetails/" + n, function() {
        $(".modal.in:last .modal-dialog .loader-bg").fadeOut(200);
        $("input.required, input.was-required, textarea.was-required").each(function() {
            validate($(this))
        });
        updateValidation("#confirm-details-form")
    })
}

function nextNewOpportunity() {
    $("input#clientCompany_companyName").hasClass("was-required") && $("input.typeahead.required").removeClass("required").addClass("was-required");
    $("#new-opportunity-form").valid() && ($("#new-opportunity-form").submit(), $("#myModal .modal-dialog .loader-bg").fadeIn(200), $("#save-activity-partial").animate({
        opacity: .7
    }, 200))
}

function confirmDetailsSubmit() {
    $("#confirm-details-form").valid() && ($("#confirm-details-form").submit(), $("#myModal .modal-dialog .loader-bg").fadeIn(200), $("#save-activity-partial").animate({
        opacity: 0
    }, 200), $("#save-activity-partial").slideUp())
}

function ConfirmDetailsSuccess() {
    $("#save-activity-partial").animate({
        opacity: 1
    }, 200);
    $(".modal.in:last .modal-dialog .loader-bg").fadeOut(200);
    $("#save-activity-partial").slideDown(400);
    $("#MeetingReportMain").val() ? updateValidation("#update-activity-form") : $("#OppSingleCreate").val() ? (initRangeSlider(), clickOut(!0)) : clickOut(!1)
}

function IDontKnow(n) {
    var t = null;
    $(n).prop("checked") ? (t = $(n).parent().parent().siblings(".opportunity-answer"), t.children().prop("disabled", !0), t.children().children().prop("disabled", !0), $(n).parent().parent().siblings(".answered-check").val(!0)) : (t = $(n).parent().parent().siblings(".opportunity-answer"), t.children().prop("disabled", !1), t.children().children().prop("disabled", !1), t.children('input[type="text"]').length ? textAnswer(t.children('input[type="text"]')) : t.children().children('input[type="radio"]').length && (t.children().children('input[type="radio"]').is(":checked") ? $(n).parent().parent().siblings(".answered-check").val(!0) : $(n).parent().parent().siblings(".answered-check").val(!1)));
    $('input[type="range"]').rangeslider("update");
    checkForm()
}

function createOpportunity() {
    $(".modal.in:last #save-activity-form").submit();
    $(".modal.in:last #save-activity-form").trigger("checkform.areYouSure");
    $(".modal.in:last .modal-dialog .loader-bg").fadeIn(200);
    $(".modal.in:last #save-activity-partial").animate({
        opacity: 0
    }, 200)
}

function MeetingReportCreate() {
    $(document).ready(function() {
        $(".modal.in:last .modal-dialog .loader-bg").fadeOut(200);
        $(".modal.in:last #save-activity-partial").animate({
            opacity: 1
        }, 200);
        initRangeSlider();
        $(".modal.in:last #summary").val() ? ($(".modal.in:last .modal-dialog").animate({
            width: "60%"
        }, 200), clickOut(!1), updateTable("#actTable"), updateTable("#oppTable")) : $("#OpportunityCreated").val() && OpportunityUpdatedSuccess()
    })
}

function textAnswer(n) {
    $(n).val() ? $(n).parent().siblings(".answered-check").val(!0) : $(n).parent().siblings(".answered-check").val(!1);
    checkForm()
}

function radioAnswer(n) {
    $(n).parent().parent().siblings(".answered-check").val(!0);
    checkForm()
}

function dropDownAnswer(n) {
    var t = $("#" + n.id + " option:selected").val();
    t == 0 ? $(n).parent().siblings(".answered-check").val(!1) : $(n).parent().siblings(".answered-check").val(!0);
    checkForm()
}

function checkForm() {
    var n = !0;
    $("form#save-activity-form .opportunity-questions").each(function() {
        if ($(this).children(".answered-check").val().toLowerCase() != "true") {
            $(".btn.btn-dark.pos-bottom-right").addClass("disabled");
            $(".btn.btn-dark.pos-bottom-right").prop("disabled", !0);
            n = !1;
            return
        }
    });
    n && ($(".btn.btn-dark.pos-bottom-right").removeClass("disabled"), $(".btn.btn-dark.pos-bottom-right").prop("disabled", !1))
}

function addOppModalListener() {
    var n = $("#opp-modal").detach();
    $("#opp-modal .modal-dialog").css({
        width: "40%"
    });
    $("#opp-modal").remove();
    n.appendTo("body").modal("show");
    $("#opp-modal").on("hidden.bs.modal", function() {
        $("#opp-modal .activity-selection").fadeIn(100).animate({
            opacity: 1
        }, 0);
        $("#opp-modal .modal-dialog").css({
            width: "40%"
        });
        $("#opp-modal-content-placeholder").empty().hide();
        test3.trigger("update.opps");
        test4.trigger("update.opps")
    })
}

function initOppDetails(n) {
    $.ajaxSetup({
        cache: !1
    });
    reloadActivitiesOpp = !0;
    activitiesLoadedOpp = !1;
    reloadProposalsOpp = !0;
    proposalsLoadedOpp = !1;
    $(document).ready(function() {
        $("#opportunity-tabs").on("click", "a", function(t) {
            t.preventDefault();
            $(this).attr("id") === "opportunities" ? updateOppToolBar("opportunities") : $(this).attr("id") === "activities" ? (reloadActivitiesOpp && loadActivitiesOpp(n), updateOppToolBar("activities")) : $(this).attr("id") === "proposals" && (reloadProposalsOpp && loadProposalsOpp(n), updateOppToolBar("proposals"))
        })
    })
}

function selectActivityOpp() {
    addOppModalListener();
    $("#opp-modal .activity-selection").show();
    $("#opp-modal .modal-dialog .loader-bg").hide();
    clickOut(!1);
    $("#opp-modal .modal-dialog").css({
        width: "40%"
    });
    $("#opp-modal-content-placeholder").animate({
        opacity: 0
    }, 200, function() {
        $(this).slideUp(200, function() {
            $("#opp-modal .activity-selection").fadeIn(200).animate({
                opacity: 1
            }, 200)
        })
    });
    $("#opp-modal-content-placeholder").empty()
}

function logActivityOpp(n, t) {
    clickOut(!0);
    $("#opp-modal .modal-dialog .loader-bg").fadeIn();
    $("#opp-modal .activity-selection").animate({
        opacity: 0
    }, 200);
    $("#opp-modal .activity-selection").slideUp({
        duration: 350,
        queue: !1
    });
    sessionStorage.activityType = n;
    $("#opp-modal-content-placeholder").load("/Activities/logNewActivity", {
        id: n,
        oppID: t
    }, function() {
        $("#script-content-placeholder").load("/Activities/script");
        $("#opp-modal-content-placeholder").slideDown({
            duration: 350
        });
        $("#opp-modal-content-placeholder").animate({
            opacity: 1
        }, 200, function() {
            $("#opp-modal .modal-dialog .loader-bg").fadeOut(200)
        });
        $("#opp-modal .modal-dialog").animate({
            width: "45%"
        }, 200)
    })
}

function scheduleFollowUpOpp(n) {
    addOppModalListener();
    clickOut(!0);
    sessionStorage.activityType = 0;
    $("#opp-modal .modal-dialog .loader-bg").fadeIn();
    $("#opp-modal .activity-selection").animate({
        opacity: 0
    }, 200);
    $("#opp-modal .activity-selection").slideUp({
        duration: 350,
        queue: !1
    });
    $("#opp-modal-content-placeholder").load("/Activities/logfollowup", {
        oppID: n
    }, function() {
        $("#script-content-placeholder").load("/Activities/script");
        $("#opp-modal-content-placeholder").slideDown({
            duration: 350
        });
        $("#opp-modal-content-placeholder").animate({
            opacity: 1
        }, 200, function() {
            $("#opp-modal .modal-dialog .loader-bg").fadeOut(200)
        });
        $("#opp-modal .modal-dialog").animate({
            width: "45%"
        }, 200)
    })
}

function scheduleMeetingOpp(n) {
    addOppModalListener();
    clickOut(!0);
    sessionStorage.activityType = 0;
    $("#opp-modal .modal-dialog .loader-bg").fadeIn();
    $("#opp-modal .activity-selection").animate({
        opacity: 0
    }, 200);
    $("#opp-modal .activity-selection").slideUp({
        duration: 350,
        queue: !1
    });
    $("#opp-modal-content-placeholder").load("/Activities/logNewMeeting", {
        oppID: n
    }, function() {
        $("#script-content-placeholder").load("/Activities/script");
        $("#opp-modal-content-placeholder").slideDown({
            duration: 350
        });
        $("#opp-modal-content-placeholder").animate({
            opacity: 1
        }, 200, function() {
            $("#opp-modal .modal-dialog .loader-bg").fadeOut(200)
        });
        $("#opp-modal .modal-dialog").animate({
            width: "45%"
        }, 200)
    })
}

function activityScheduleFollowUp(n) {
    $("div.alert-success").finish();
    $(".modal.in:last .activity-selection").animate({
        opacity: 0
    }, 200);
    $(".modal.in:last .modal-dialog .loader-bg").fadeIn();
    $(".modal.in:last .modal-dialog").animate({
        width: "45%"
    }, 200);
    $(".modal.in:last > div > div:nth-last-child(2)").load("/Activities/CreateFollowUpSpecific?followUp=" + n, function() {
        $("div.alert-success").hide();
        $("#script-content-placeholder").load("/Activities/script");
        $(".modal.in:last .modal-dialog .loader-bg").fadeOut(200);
        $(".modal.in:last > div > div:nth-last-child(2)").slideDown(300, function() {
            $(this).animate({
                opacity: 1
            }, 200)
        })
    })
}

function editOppActivityOpen(n) {
    clickOut(!0);
    addOppModalListener();
    $("#opp-modal .modal-dialog .loader-bg").fadeIn();
    $("#opp-modal .activity-selection").animate({
        opacity: 0
    }, 200);
    $("#opp-modal .activity-selection").slideUp({
        duration: 350,
        queue: !1
    });
    $("#opp-modal-content-placeholder").load("/Activities/Edit/" + n, function() {
        $("#contact-info-popover").popover({
            html: !0,
            title: function() {
                return $("#contact-info-popover-title").html()
            },
            content: function() {
                return $("#contact-info-popover-content").html()
            }
        });
        initDateTimePickerTime("future");
        $("#opp-modal-content-placeholder").slideDown({
            duration: 350
        });
        $("#opp-modal-content-placeholder").animate({
            opacity: 1
        }, 200, function() {
            $("#opp-modal .modal-dialog .loader-bg").fadeOut(200)
        });
        checkActivityNotes($("#opp-modal textarea#notes").val());
        updateValidation("form#update-activity-form");
        $("form#update-activity-form").areYouSure({
            silent: !0
        });
        $("#opp-modal .modal-dialog").animate({
            width: "45%"
        }, 200)
    })
}

function editOppActivityClosed(n) {
    $(".modal.in #activity-tab-placeholder").load("/Activities/Edit/" + n);
    $(".modal.in a#activities").click();
    activitiesLoadedOpp = !1;
    reloadActivitiesOpp = !1;
    updateOppToolBar("activities")
}

function loadActivitiesOpp(n) {
    sessionStorage.oppID = n;
    $("#activity-tab-placeholder").load("/Activities", {
        oppID: n
    }, function() {
        loadActDataTableOpp()
    });
    activitiesLoadedOpp = !0;
    reloadActivitiesOpp = !1;
    updateOppToolBar("activities")
}

function loadActDataTableOpp() {
    var n = $(".modal.in #actTable").on("processing.dt", function(n, t, i) {
            $(".tab-content .loader-bg").css("display", i ? "block" : "none")
        }).DataTable({
            lengthMenu: [
                [20, 100, -1],
                [20, 100, "ALL"]
            ],
            columns: [{
                data: "subject",
                defaultContent: ""
            }, {
                data: "dueDate"
            }, {
                data: "type"
            }, {
                data: "status"
            }, {
                data: "companyName",
                defaultContent: ""
            }, {
                data: "contactName"
            }, {
                data: "salesRep"
            }],
            columnDefs: [{
                targets: 0,
                data: "subject",
                render: function(n, t, i) {
                    return n.subject != null ? i.status === "Scheduled" && i.salesRep.canEdit == 1 ? '<a onclick="editOppActivityOpen(' + n.activityID + ')">' + n.subject + "<\/a>" : '<a onclick="editOppActivityClosed(' + n.activityID + ')">' + n.subject + "<\/a>" : ""
                }
            }, {
                targets: 1,
                data: "dueDate",
                type: "datetime",
                render: function(n) {
                    return n.dueDate
                }
            }, {
                targets: 4,
                data: "companyName",
                render: function(n) {
                    return '<a onclick="editCompanyOppAct(' + n.companyID + ')">' + n.companyName + "<\/a>"
                }
            }, {
                targets: 5,
                data: "contactName",
                render: function(n) {
                    return '<a onclick="editContactOppAct(' + n.contactID + ')">' + n.contactName + "<\/a>"
                }
            }, {
                targets: 6,
                data: "salesRep",
                render: function(n) {
                    return n.salesRep
                }
            }],
            serverSide: !0,
            ajax: {
                url: "/Activities/LoadTableOpp",
                type: "POST",
                data: function(n) {
                    n.oppID = sessionStorage.getItem("oppID");
                    n.accountFilter = getAccFilter(".modal.in")
                }
            },
            order: [1, "desc"],
            scrollY: "58vh",
            stateSave: !0,
            stateDuration: -1,
            searchDelay: 0
        }),
        t;
    $(".modal.in #activities-searchbox").val(n.search());
    $(".modal.in #activities-searchbox").on("keyup search paste cut input", function() {
        var i;
        clearTimeout(t);
        $(".modal.in #activities-searchbox").val() ? (i = this.value, t = setTimeout(function() {
            n.search(i).draw()
        }, 500)) : (i = this.value, t = setTimeout(function() {
            n.search(i).draw()
        }, 200))
    });
    $(".modal.in #activities-page-length").change(function() {
        var t = $("#activities-page-length option:selected").val();
        n.page.len(t).draw()
    });
    $(".modal.in #account-filter").change(function() {
        n.draw()
    })
}

function getAccFilter(n) {
    return $(n + " #account-filter option:selected").val()
}

function backOppActivity() {
    reloadActivitiesOpp = !0;
    $(".modal.in a#activities").click()
}

function loadProposalsOpp(n) {
    sessionStorage.oppID = n;
    $("#proposal-tab-placeholder").load("/Proposals", {
        id: n
    }, function() {
        loadPropDataTableOpp(n)
    });
    proposalsLoadedOpp = !0;
    reloadProposalsOpp = !1;
    updateOppToolBar("proposals")
}

function loadPropDataTableOpp(n) {
    $(document).ready(function() {
        function r() {
            t.search($("#proposal-searchbox").val()).draw()
        }
        var u = $("#EditQualified").length,
            t = $("#proposalTable").on("processing.dt", function(n, t, i) {
                $(".tab-content .loader-bg").css("display", i ? "block" : "none")
            }).DataTable({
                lengthMenu: [
                    [20, 100, -1],
                    [20, 100, "ALL"]
                ],
                columns: [{
                    data: "proposalName"
                }, {
                    data: "type"
                }, {
                    data: "companyName"
                }, {
                    data: "status"
                }],
                columnDefs: [{
                    targets: 0,
                    data: "proposalName",
                    render: function(n, t, i) {
                        return '<a onclick="startProposal(' + n.id + ", " + i.version + ')">' + n.name + "<\/a>"
                    }
                }],
                serverSide: !0,
                ajax: {
                    url: "/Proposals/GetProposals",
                    type: "POST",
                    data: function(t) {
                        t.oppID = n
                    }
                },
                order: [0, "asc"],
                scrollY: "58vh",
                stateSave: !0,
                stateDuration: 300,
                searchDelay: 0
            }),
            i;
        $("#proposal-searchbox").val(t.search());
        $("#proposal-searchbox").on("search paste cut input", function() {
            clearTimeout(i);
            i = $("#proposal-searchbox").val() ? setTimeout(r, 500) : setTimeout(r, 200)
        });
        $("#proposal-page-length").change(function() {
            var n = $("#proposal-page-length option:selected").val();
            t.page.len(n).draw()
        })
    })
}

function updateOppToolBar(n) {
    var t = $("#EditQualified").length;
    $(".modal-dialog li.back-tool").hide();
    $(".modal-dialog li.act-table").hide();
    $(".modal-dialog li.prop-table").hide();
    $(".modal-dialog li.new-proposal-tool").hide();
    $(".modal-dialog .main-tool-bar").addClass("create-toolbar");
    t ? ($(".modal-dialog li.save-tool").removeClass("disabled").show(), $(".modal-dialog li.save-tool a").attr("onclick", $(".modal-dialog li.save-tool a").attr("eholder")), $(".modal-dialog li.delete-tool a").attr("onclick", $(".modal-dialog li.delete-tool a").attr("eholder")), $(".modal-dialog li.new-activity-tool a").attr("onclick", $(".modal-dialog li.new-activity-tool a").attr("eholder")), $(".modal-dialog li.schedule-followup-tool a").attr("onclick", $(".modal-dialog li.schedule-followup-tool a").attr("eholder")), $(".modal-dialog li.schedule-meeting-tool a").attr("onclick", $(".modal-dialog li.schedule-meeting-tool a").attr("eholder")), $(".modal-dialog li.new-proposal-tool a").attr("onclick", $(".modal-dialog li.new-proposal-tool a").attr("eholder")), $(".modal-dialog li.delete-tool").show(), $(".modal-dialog li.new-activity-tool").removeClass("disabled").show(), $(".modal-dialog li.schedule-followup-tool").removeClass("disabled").show(), $(".modal-dialog li.schedule-meeting-tool").removeClass("disabled").show(), $(".modal-dialog li.new-proposal-tool").removeClass("disabled").show()) : ($(".modal-dialog li.save-tool").addClass("disabled").show(), $(".modal-dialog li.delete-tool").addClass("disabled").show(), $(".modal-dialog li.new-activity-tool").addClass("disabled").show(), $(".modal-dialog li.schedule-followup-tool").addClass("disabled").show(), $(".modal-dialog li.schedule-meeting-tool").addClass("disabled").show(), $(".modal-dialog li.new-proposal-tool").addClass("disabled").show(), $(".modal-dialog li.save-tool a").attr("eholder", $(".modal-dialog li.save-tool a").attr("onclick")), $(".modal-dialog li.delete-tool a").attr("eholder", $(".modal-dialog li.delete-tool a").attr("onclick")), $(".modal-dialog li.new-activity-tool a").attr("eholder", $(".modal-dialog li.new-activity-tool a").attr("onclick")), $(".modal-dialog li.schedule-followup-tool a").attr("eholder", $(".modal-dialog li.schedule-followup-tool a").attr("onclick")), $(".modal-dialog li.schedule-meeting-tool a").attr("eholder", $(".modal-dialog li.schedule-meeting-tool a").attr("onclick")), $(".modal-dialog li.new-proposal-tool a").attr("eholder", $(".modal-dialog li.new-proposal-tool a").attr("onclick")), $(".modal-dialog li.save-tool a").removeAttr("onclick"), $(".modal-dialog li.delete-tool a").removeAttr("onclick"), $(".modal-dialog li.new-activity-tool a").removeAttr("onclick"), $(".modal-dialog li.schedule-followup-tool a").removeAttr("onclick"), $(".modal-dialog li.schedule-meeting-tool a").removeAttr("onclick"), $(".modal-dialog li.new-proposal-tool a").removeAttr("onclick"));
    n === "activities" ? ($(".modal-dialog li.new-proposal-tool").hide(), activitiesLoadedOpp ? ($(".modal-dialog .main-tool-bar").removeClass("create-toolbar"), $(".modal-dialog li.save-tool").hide(), $(".modal-dialog li.delete-tool").hide(), $(".modal-dialog li.new-activity-tool").show(), $(".modal-dialog li.schedule-followup-tool").show(), $(".modal-dialog li.schedule-meeting-tool").show(), $(".modal-dialog li.act-table").show()) : ($(".modal-dialog li.back-tool").removeClass("disabled").show(), $(".modal-dialog li.save-tool").removeClass("disabled").hide(), $(".modal-dialog li.delete-tool").addClass("disabled").show(), $(".modal-dialog li.new-activity-tool").addClass("disabled").hide(), $(".modal-dialog li.schedule-followup-tool").addClass("disabled").hide(), $(".modal-dialog li.schedule-meeting-tool").addClass("disabled").hide())) : n === "proposals" && proposalsLoadedOpp && ($(".modal-dialog .main-tool-bar").removeClass("create-toolbar"), $(".modal-dialog li.save-tool").hide(), $(".modal-dialog li.delete-tool").hide(), $(".modal-dialog li.new-activity-tool").hide(), $(".modal-dialog li.schedule-followup-tool").hide(), $(".modal-dialog li.schedule-meeting-tool").hide(), $(".modal-dialog li.new-proposal-tool").show(), $(".modal-dialog li.prop-table").show())
}

function editCompanyOppAct(n) {
    window.location.href = "/ClientCompanies/Details/" + n
}

function editContactOppAct(n) {
    window.location.href = "/ClientContacts/Details/" + n
}

function changeSalesRep(n) {
    clickOut(!0);
    addOppModalListener();
    $("form#save-opportunity-form").hasClass("dirty") && (n = -1);
    $("#opp-modal .modal-dialog").css({
        width: "35%"
    });
    $("#opp-modal .modal-dialog .loader-bg").fadeIn();
    $("#opp-modal .activity-selection").animate({
        opacity: 0
    }, 200);
    $("#opp-modal .activity-selection").slideUp({
        duration: 350,
        queue: !1
    });
    $("#opp-modal-content-placeholder").load("/Opportunities/ChangeRep/" + n, function() {
        $("#opp-modal-content-placeholder").slideDown({
            duration: 350
        });
        $("#opp-modal-content-placeholder").animate({
            opacity: 1
        }, 200, function() {
            $("#opp-modal .modal-dialog .loader-bg").fadeOut(200)
        })
    })
}

function submitChangeRep() {
    $("#change-rep-form").submit();
    closeModal()
}

function FailTest() {
    alert("Something went wrong with your request")
}

function deleteContact(n) {
    n != undefined && ($("#myModal").modal("show"), $("#myModal .activity-selection").hide(), $("#myModal .modal-dialog .loader-bg").fadeIn(), clickOut(!0), $("#myModal .modal-dialog").css({
        width: "45%"
    }), $("#modal-content-placeholder").load("/ClientContacts/Delete/" + n, function() {
        $("#modal-content-placeholder").slideDown({
            duration: 350
        });
        $("#modal-content-placeholder").animate({
            opacity: 1
        }, 200, function() {
            $("#myModal .modal-dialog .loader-bg").fadeOut(200)
        })
    }))
}

function submitDeleteContact() {
    $("#delete-contact-form").submit();
    $(".modal.in:last .modal-dialog .loader-bg").fadeIn(200);
    $(".modal.in:last #delete-contact-partial .flex-container:last").hide();
    $(".modal.in:last #delete-contact-partial").animate({
        opacity: .7
    }, 200)
}

function DeleteContactResponseSuccess() {
    if (clickOut(!1), $(".modal.in:last .modal-dialog .loader-bg").fadeOut(200), $(".modal.in:last #delete-contact-partial").animate({
            opacity: 1
        }, 200), $("#DeleteSuccess").val()) {
        $(".modal.in:last").one("hidden.bs.modal", function() {
            cancelContact()
        });
        setTimeout(function() {
            closeModal()
        }, 3e3)
    }
}

function updateTable(n) {
    if ($(n).length) {
        var t = $(n).DataTable();
        t.ajax.reload()
    }
}

function dashboardSalesReport(n, t, i) {
    (t != undefined || n === "accounts") && (n === "points" ? ($("#myModal").modal("show"), $("#myModal .activity-selection").hide(), $("#myModal .modal-dialog").css("width", "45%"), $("#modal-content-placeholder").css({
        padding: 0
    }), $("#myModal .modal-dialog .loader-bg").fadeIn(200), $("#modal-content-placeholder").load("/Home/GetPointBreakdown/", {
        repName: t,
        month: i
    }, function() {
        $("#myModal").one("hidden.bs.modal", function() {
            $("#modal-content-placeholder").css({
                padding: "15px 20px"
            })
        });
        $("#modal-content-placeholder").slideDown({
            duration: 350
        });
        $("#myModal .modal-dialog .loader-bg").fadeOut(200);
        $("#modal-content-placeholder").animate({
            opacity: 1
        }, 200)
    })) : n === "tradeIns" ? (loadModal("tradeIn", "Trade In Commission Breakdown", null), clickOut(!0), $("#tradeIn-modal .loader-bg").fadeIn(200), $.get("/TradeIns/CommissionBreakdown", function(n) {
        $("#tradeIn-modal-content-placeholder").html(n);
        $("#tradeIn-modal .loader-bg").fadeOut(200);
        $("#tradeInBreakdownTable").DataTable({
            paging: !1,
            info: !1,
            scrollY: "35vh"
        })
    })) : n === "accounts" ? (sessionStorage.removeItem("company-table"), location.href = "/ClientCompanies") : n === "residuals" && ($("#myModal").modal("show"), $("#myModal .activity-selection").hide(), $("#modal-content-placeholder").css({
        padding: 0
    }), $("#myModal .modal-dialog .loader-bg").fadeIn(200), $("#modal-content-placeholder").load("/Home/GetManagedServiceBreakdown/", {
        repName: t,
        month: i
    }, function() {
        $("#myModal").one("hidden.bs.modal", function() {
            $("#modal-content-placeholder").css({
                padding: "15px 20px"
            })
        });
        $("#modal-content-placeholder").slideDown({
            duration: 350
        });
        $("#myModal .modal-dialog .loader-bg").fadeOut(200);
        $("#modal-content-placeholder").animate({
            opacity: 1
        }, 200)
    })))
}

function getDetailsForResidualCat(n, t, i, r) {
    addReportModalListener();
    $("#cat-name-header").text(n);
    $("#report-modal .modal-dialog .loader-bg").fadeIn(200);
    r === "variance" ? $.ajax({
        type: "GET",
        url: "/Home/GetResidualData/",
        data: {
            id: n,
            repName: t,
            variance: !0,
            month: i
        },
        contentType: "application/json; charset=utf-8",
        success: function(n) {
            updateResidualDetails(n)
        }
    }) : $.ajax({
        type: "GET",
        url: "/Home/GetResidualData/",
        data: {
            id: n,
            repName: t,
            month: i
        },
        contentType: "application/json; charset=utf-8",
        success: function(n) {
            updateResidualDetails(n)
        }
    })
}

function getDetailsForPointCat(n, t, i, r) {
    addReportModalListener();
    $("#cat-name-header").text(n);
    $("#report-modal .modal-dialog .loader-bg").fadeIn(200);
    $.ajax({
        type: "GET",
        url: "/Home/GetPointData/",
        data: {
            id: t,
            repName: i,
            month: r
        },
        contentType: "application/json; charset=utf-8",
        success: function(n) {
            results = n.data;
            updatePointDetails(results)
        }
    })
}

function updateResidualDetails(n) {
    var i = n.data,
        u = !1,
        r = "<table id='residual-breakdown-table' class='table'><thead><tr><td>Contract Start<\/td><td>Company<\/td>",
        t;
    if (n.variance === "-1" ? (u = !0, r += "<td>Agreement Type<\/td><td>Agreement Name<\/td><td>Total Monthly Amount<\/td><\/tr><\/thead><tbody>") : r += "<td>Total Monthly Amount<\/td><td>Commission<\/td><td>Monthly Residual<\/td><\/tr><\/thead><tbody>", i != null) {
        for (t = 0; t < i.length; t++) r += u ? "<tr><td>" + i[t].contractStart + "<\/td><td>" + i[t].companyName + "<\/td><td>" + i[t].agreement + "<\/td><td>" + i[t].agreementName + "<\/td><td>" + i[t].totalMonthly + "<\/td><\/tr>" : "<tr><td>" + i[t].contractStart + "<\/td><td>" + i[t].companyName + "<\/td><td>" + i[t].totalMonthly + "<\/td><td>" + i[t].commPercent * 100 + "%<\/td><td>" + i[t].residual + "<\/td><\/tr>";
        r += "<\/tbody><\/table>"
    } else r = "<\/tbody><\/table><h4>No data<\/h4>";
    $("#report-modal .modal-dialog .loader-bg").fadeOut(200);
    $("#report-modal-content-placeholder").append(r);
    $("#residual-breakdown-table").DataTable({
        columnDefs: [{
            width: u ? "25%" : "20%",
            targets: "_all"
        }],
        paging: !1,
        info: !1,
        autoWidth: !1,
        scrollY: "35vh"
    })
}

function updatePointDetails(n) {
    var i = "<table id='point-breakdown-table' class='table'><thead><tr><td>Invoice Number<\/td><td>Date<\/td><td>Customer<\/td><td>SKU<\/td><td>Description<\/td><td>Quantity<\/td><\/tr><\/thead><tbody>",
        t;
    if (n != null) {
        for (t = 0; t < n.length; t++) i += "<tr><td>" + n[t].invoiceNumber + "<\/td><td>" + n[t].invoiceDate + "<\/td><td>" + n[t].customerName + "<\/td><td>" + n[t].productSKU + "<\/td><td>" + n[t].productDescription + "<\/td><td>" + n[t].quantity + "<\/td><\/tr>";
        i += "<\/tbody><\/table>"
    } else i = "<\/tbody><\/table><h4>No data<\/h4>";
    $("#report-modal .modal-dialog .loader-bg").fadeOut(200);
    $("#report-modal-content-placeholder").append(i);
    $("#point-breakdown-table").DataTable({
        columnDefs: [{
            width: "17%",
            targets: "_all"
        }],
        paging: !1,
        info: !1,
        autoWidth: !1,
        scrollY: "35vh"
    })
}

function displayOpportunities(n, t) {
    addTeamLeadModalListener();
    $("#tl-modal .modal-dialog .loader-bg").fadeIn(200);
    sessionStorage.repID = t;
    $("#tl-modal-content-placeholder").load("/Home/LoadOpportunitiesSummary/", {
        type: n
    }, function() {
        $("#tl-modal .modal-dialog").delay(200).animate({
            duration: 400,
            width: "65%"
        });
        loadOppTable(n);
        setTimeout(function() {
            $("#tl-modal-content-placeholder").slideDown({
                duration: 500
            });
            $("#tl-modal-content-placeholder").animate({
                opacity: 1
            }, 200, function() {
                $("#tl-modal .modal-dialog .loader-bg").fadeOut(200)
            })
        }, 100)
    })
}

function displayTeamLeadReport(n, t) {
    var i, r, f = n,
        u;
    loadModal("teamLead", f.charAt(0).toUpperCase() + f.slice(1), null);
    $("#teamLead-modal .modal-dialog .loader-bg").fadeIn(200);
    $("#teamLead-modal-content-placeholder").css({
        opacity: 0,
        display: "none"
    });
    clickOut(!0);
    switch (n) {
        case "activities":
            i = "/Activities/";
            r = loadActDataTableTL;
            break;
        case "meetings":
            i = "/Activities/Meetings/";
            r = loadMeetingDataTableTL;
            break;
        case "proposals In Progress":
            i = "/Proposals/";
            r = loadPropDataTableTL;
            u = 1;
            break;
        case "proposals Completed":
            i = "/Proposals/";
            r = loadPropDataTableTL;
            u = 2
    }
    $("#teamLead-modal-content-placeholder").load(i, {
        id: "1",
        contactID: "1"
    }, function() {
        $("#teamLead-modal .modal-dialog").delay(200).animate({
            duration: 400,
            width: "65%"
        });
        r(t, u);
        setTimeout(function() {
            $("#teamLead-modal-content-placeholder").slideDown({
                duration: 500
            });
            $("#teamLead-modal-content-placeholder").animate({
                opacity: 1
            }, 200, function() {
                $("#teamLead-modal .modal-dialog .loader-bg").fadeOut(200)
            })
        }, 100)
    })
}

function getStoreSelection(n) {
    $.ajax({
        type: "GET",
        url: "/Home/GetStoreSelection",
        contentType: "application/json; charset=utf-8",
        data: {
            type: n == "ss" ? !0 : !1
        },
        dataType: "json",
        success: function(t) {
            updateStoreSelection(t.data, n)
        }
    })
}

function updateStoreSelection(n, t) {
    var i = "#location-selection";
    t == "ss" ? i = "#ss-location-selection" : t == "ooo" ? i = "#ooo-location-selection" : t == "goals" && (i = "#goals-location-selection");
    $(i).empty();
    $(i).prepend($("<option><\/option>").attr("value", "-1").text("ALL"));
    $.each(n, function(n, t) {
        $(i).append($("<option><\/option>").attr("value", t.id).text(t.name))
    })
}

function getStoreAndRepSelection() {
    $.get("/Goals/GetStoreSelection", updateStoreAndRepSelection)
}

function getRepSelection(n) {
    var t = $(n).val();
    $.get("/Goals/GetRepSelection", {
        territoryID: t
    }, updateRepSelection)
}

function updateStoreAndRepSelection(n) {
    var i = "#goals-location-selection",
        t = "#goals-rep-selection";
    $(i).empty();
    $(t).empty();
    n.stores.length > 1 && $(i).prepend($("<option><\/option>").attr("value", "-1").text("ALL"));
    $.each(n.stores, function(n, t) {
        $(i).append($("<option><\/option>").attr("value", t.id).text(t.name))
    });
    n.reps != null ? ($(t).prepend($("<option><\/option>").attr("value", "-1").text("ALL")), $.each(n.reps, function(n, i) {
        $(t).append($("<option" + (i.selected ? " selected" : "") + "><\/option>").attr("value", i.id).text(i.name))
    })) : $(t).prepend($("<option><\/option>").attr("value", "-1").text("ALL"))
}

function updateRepSelection(n) {
    var t = "#goals-rep-selection";
    n.reps != null && ($(t).empty(), $(t).prepend($("<option><\/option>").attr("value", "-1").text("ALL")), $.each(n.reps, function(n, i) {
        $(t).append($("<option><\/option>").attr("value", i.id).text(i.name))
    }))
}

function addReportModalListener() {
    var n = $("#report-modal").detach();
    $("#report-modal").remove();
    n.appendTo("body").modal("show");
    $("#report-modal .modal-dialog").css({
        width: "45%"
    }).show();
    $("#report-modal-content-placeholder").css({
        opacity: 1
    }).show();
    $("#report-modal").on("hidden.bs.modal", function() {
        $("#report-modal .modal-dialog").css({
            width: "45%"
        });
        $("#report-modal-content-placeholder").empty()
    })
}

function loadMeetingDataTableTL(n) {
    var t = $("#actTable").on("processing.dt", function(n, t, i) {
        $("#teamLead-modal .modal-dialog .loader-bg").css("display", i ? "block" : "none")
    }).DataTable({
        lengthMenu: [
            [20, 100, -1],
            [20, 100, "ALL"]
        ],
        columns: [{
            data: "subject",
            defaultContent: ""
        }, {
            data: "dueDate"
        }, {
            data: "firstMeeting"
        }, {
            data: "status"
        }, {
            data: "companyName",
            defaultContent: ""
        }, {
            data: "contactName"
        }, {
            data: "salesRep"
        }],
        columnDefs: [{
            targets: 0,
            data: "subject",
            render: function(n, t, i) {
                return n.subject != null ? i.status === "Scheduled" && i.salesRep.canEdit == 1 ? n.subject : '<a onclick="displayActivityTL(' + n.activityID + ')">' + n.subject + "<\/a>" : ""
            }
        }, {
            targets: 1,
            data: "dueDate",
            type: "datetime",
            render: function(n) {
                return n.dueDate
            }
        }, {
            targets: 2,
            data: "firstMeeting",
            render: function(n) {
                var t = n == !0 ? "checked" : "";
                return '<div class="checkbox super-center-block"><label class="super-center-block default-pointer"><input type="checkbox" ' + t + ' disabled/><span class="cr super-center-block"><i class="cr-icon glyphicon glyphicon-ok"><\/i><\/span><\/label><\/div>'
            }
        }, {
            targets: 4,
            data: "companyName",
            render: function(n) {
                return n.companyName
            }
        }, {
            targets: 5,
            data: "contactName",
            render: function(n) {
                return n.contactName
            }
        }, {
            targets: 6,
            data: "salesRep",
            render: function(n) {
                return n.salesRep
            }
        }],
        serverSide: !0,
        ajax: {
            url: "/Activities/LoadTableTeamLead",
            type: "POST",
            data: function(t) {
                t.repID = n;
                t.type = 3;
                t.monthSelection = getMonthSelection()
            }
        },
        paging: !1,
        ordering: !1,
        info: !1,
        scrollY: "68vh"
    })
}

function loadActDataTableTL(n) {
    var t = $("#actTable").on("processing.dt", function(n, t, i) {
        $("#teamLead-modal .modal-dialog .loader-bg").css("display", i ? "block" : "none")
    }).DataTable({
        lengthMenu: [
            [20, 100, -1],
            [20, 100, "ALL"]
        ],
        columns: [{
            data: "subject",
            defaultContent: ""
        }, {
            data: "dueDate"
        }, {
            data: "type"
        }, {
            data: "status"
        }, {
            data: "companyName",
            defaultContent: ""
        }, {
            data: "contactName"
        }, {
            data: "salesRep"
        }],
        columnDefs: [{
            targets: 0,
            data: "subject",
            render: function(n, t, i) {
                return n.subject != null ? i.status === "Scheduled" && i.salesRep.canEdit == 1 ? n.subject : '<a onclick="displayActivityTL(' + n.activityID + ')">' + n.subject + "<\/a>" : ""
            }
        }, {
            targets: 1,
            data: "dueDate",
            type: "datetime",
            render: function(n) {
                return n.dueDate
            }
        }, {
            targets: 4,
            data: "companyName",
            render: function(n) {
                return n.companyName
            }
        }, {
            targets: 5,
            data: "contactName",
            render: function(n) {
                return n.contactName
            }
        }, {
            targets: 6,
            data: "salesRep",
            render: function(n) {
                return n.salesRep
            }
        }],
        serverSide: !0,
        ajax: {
            url: "/Activities/LoadTableTeamLead",
            type: "POST",
            data: function(t) {
                t.repID = n;
                t.type = 1;
                t.monthSelection = getMonthSelection()
            }
        },
        paging: !1,
        ordering: !1,
        info: !1,
        scrollY: "68vh"
    })
}

function loadPropDataTableTL(n, t) {
    var i = $("#proposalTable").on("processing.dt", function(n, t, i) {
        $("#teamLead-modal .modal-dialog .loader-bg").css("display", i ? "block" : "none")
    }).DataTable({
        lengthMenu: [
            [20, 100, -1],
            [20, 100, "ALL"]
        ],
        columns: [{
            data: "proposalName"
        }, {
            data: "type"
        }, {
            data: "companyName"
        }, {
            data: "status"
        }],
        columnDefs: [{
            targets: 0,
            data: "proposalName",
            render: function(n, t, i) {
                return '<a onclick="startProposal(' + n.id + ", " + i.version + ')">' + n.name + "<\/a>"
            }
        }],
        serverSide: !0,
        ajax: {
            url: "/Proposals/GetProposalsTeamLead",
            type: "POST",
            data: function(i) {
                i.repID = n;
                i.monthSelection = getMonthSelection();
                i.propType = t
            }
        },
        paging: !1,
        ordering: !1,
        info: !1,
        scrollY: "68vh"
    })
}

function loadOppTable(n) {
    var t = $("#tlOppTable").on("processing.dt", function(n, t, i) {
        $("#tl-modal-content-placeholder .loader-bg").css("display", i ? "block" : "none")
    }).DataTable({
        lengthMenu: [
            [20, 100, -1],
            [20, 100, "ALL"]
        ],
        columnDefs: [{
            targets: 0,
            data: "dateCreated",
            type: "datetime",
            render: function(n) {
                return n
            }
        }, {
            targets: 3,
            data: "status",
            render: function(n) {
                return '<a onclick="editOpportunity(' + n.opportunityID + ')">' + n.status + "<\/a>"
            }
        }, {
            targets: 4,
            data: "age",
            render: function(n) {
                return n == 0 ? "Today" : n == 1 ? n + " Day Old" : n + " Days Old"
            }
        }, {
            targets: 1,
            data: "companyName",
            render: function(n) {
                return n.companyName
            }
        }, {
            targets: 2,
            data: "type"
        }, {
            targets: 5,
            data: "nextStepDate",
            type: "datetime",
            render: function(n) {
                return n.nextStepDate
            }
        }, {
            targets: 6,
            data: "closeDate",
            type: "datetime",
            render: function(n) {
                return n.closeDate
            }
        }],
        serverSide: !0,
        ajax: {
            url: "/Home/OpportunitySummaryTable",
            type: "POST",
            data: function(t) {
                t.opportunityFilter = n;
                t.repID = sessionStorage.repID;
                t.monthSelection = getMonthSelection()
            }
        },
        paging: !1,
        ordering: !1,
        info: !1,
        scrollY: "68vh"
    })
}

function displayActivityTL(n) {
    loadModal("activityTL", "", undefined);
    $("#activityTL-modal .modal-dialog .loader-bg").fadeIn(200);
    $("#activityTL-modal-content-placeholder").css({
        opacity: 0,
        display: "none"
    });
    clickOut(!0);
    $("#activityTL-modal-content-placeholder").load("/Activities/Edit/" + n, function() {
        $("#activityTL-modal-content-placeholder").slideDown({
            duration: 500
        }).animate({
            opacity: 1
        }, 200, function() {
            $("#activityTL-modal .modal-dialog .loader-bg").fadeOut(200)
        })
    })
}

function addTeamLeadModalListener() {
    var n = $("#tl-modal").detach();
    $("#tl-modal").remove();
    n.appendTo("body").modal("show");
    $("#tl-modal .modal-dialog").css({
        width: "45%"
    });
    $("#tl-modal-content-placeholder").css({
        opacity: 0
    });
    $("#tl-modal").on("hidden.bs.modal", function() {
        $("#tl-modal .activity-selection").fadeIn(100).animate({
            opacity: 1
        }, 0);
        $("#tl-modal-content-placeholder").empty().hide()
    })
}

function loadOneOnOneIndex(n) {
    loadModal("oneOnOne", "One on Ones", undefined, "60%");
    $("#oneOnOne-modal .loader-bg").fadeIn(200);
    clickOut(!0);
    $("#oneOnOne-modal").one("hidden.bs.modal", function() {
        updateTable("#oneOnOneTable")
    });
    $("#oneOnOne-modal-content-placeholder").load("/OneOnOnes/index/" + n, function() {
        $("#oneOnOne-modal .loader-bg").fadeOut(200);
        loadRepOneOnOnesDataTable(n)
    })
}

function loadRepOneOnOnesDataTable(n) {
    var t = $("#ooo-index #oneOnOneIndexTable").DataTable({
        lengthMenu: [
            [20, 100, -1],
            [20, 100, "ALL"]
        ],
        columns: [{
            data: "meetingDate",
            type: "date"
        }, {
            data: "createdBy"
        }, {
            data: "notes"
        }],
        columnDefs: [{
            targets: 2,
            data: "notes",
            render: function(n) {
                return '<div class="multi-line">' + n + "<\/div>"
            }
        }],
        deferredRendering: !0,
        processing: !0,
        language: {
            processing: '<div class="loader-bg" style="display: initial"><div class="loader"><\/div><\/div>'
        },
        ajax: {
            url: "/OneOnOnes/LoadRepOneOnOnes",
            type: "POST",
            data: function(t) {
                t.repID = n
            }
        },
        order: [0, "desc"],
        scrollY: "50vh",
        searchDelay: 0
    });
    $("#ooo-index #ooo-searchbox").val(t.search());
    $("#ooo-index #ooo-searchbox").on("search paste cut input", function() {
        t.search($("#ooo-index #ooo-searchbox").val()).draw()
    });
    $("#ooo-index #ooo-page-length").change(function() {
        var n = $("#ooo-index #ooo-page-length").val();
        t.page.len(n).draw()
    })
}

function createNewOneOnOne(n) {
    loadModal("createOneOnOne", "New One on One", undefined, "45%");
    $("#createOneOnOne-modal .loader-bg").fadeIn(200);
    clickOut(!0);
    $("#createOneOnOne-modal").one("hidden.bs.modal", function() {
        updateTable("#ooo-index #oneOnOneIndexTable")
    });
    $("#createOneOnOne-modal-content-placeholder").load("/OneOnOnes/Create/" + n, function() {
        $("#createOneOnOne-modal .loader-bg").fadeOut(200);
        initDateTimePicker()
    })
}

function saveNewOneOnOne() {
    $("#new-oneOnOne-form .required").length ? $("#createOneOnOne-modal #warning-message").slideDown().delay(2e3).slideUp() : ($("#new-oneOnOne-form").submit(), $("#createOneOnOne-modal .loader-bg").fadeIn(200), $("body").append('<div class="loading-overlay"><\/div>'))
}

function CreateOneOnOneSuccess() {
    $("#createOneOnOne-modal .required").each(function() {
        validate($(this))
    });
    $("#createOneOnOne-modal .loader-bg").fadeOut(200);
    $(".loading-overlay").remove();
    $("#createOneOnOne-modal div.alert-success").length ? (setTimeout(function() {
        $("#createOneOnOne-modal").length && closeModal()
    }, 2500), $("#createOneOnOne-modal div.alert-success").slideDown().delay(2e3).slideUp()) : $("#createOneOnOne-modal div.alert-danger").length && $("#createOneOnOne-modal div.alert-danger").slideDown().delay(2e3).slideUp()
}

function loadModal(n, t, i, r) {
    var u = "";
    u += '<div id="' + n + '-modal" class="modal fade"><div class="modal-dialog clearfix">';
    i !== undefined ? (u += '<div id="activity-modal-header">', u += '<span id="' + n + '-modal-header"><\/span><button type="button" class="close" onclick="closeModal(this)" aria-label="Close">', u += '<span aria-hidden="true">&times;<\/span><\/button><\/div>') : (u += '<div id="other-modal-header">', u += '<h3 style="margin: 15px 15px -5px 30px;"><span id="' + n + '-modal-header"><\/span><button type="button" class="close modal-close-button" style="top: 5px;" onclick="closeModal(this)" aria-label="Close">', u += '<span aria-hidden="true">×<\/span><\/button><\/h3><\/div>');
    u += '<div id="' + n + '-modal-content-placeholder" class="model-content-placeholders"><\/div>';
    u += '<div class="loader-bg"><div class="loader"><\/div><\/div><\/div><\/div>';
    $("body").append(u);
    $("#" + n + "-modal").modal("show");
    $("#" + n + "-modal .modal-dialog").css({
        width: r || "45%"
    }).show();
    $("#" + n + "-modal-content-placeholder").css({
        opacity: 1
    }).show();
    $("#" + n + "-modal").on("hidden.bs.modal", function() {
        $("#" + n + "-modal").remove();
        $(".modal").hasClass("in") && $("body").addClass("modal-open")
    });
    $("#" + n + "-modal-header").text(t);
    clickOut(!0)
}

function newProduct() {
    var n;
    loadModal("product", "New Product");
    clickOut(!0);
    $("#product-modal").one("hidden.bs.modal", function() {
        updateTable("#product-table")
    });
    $("#product-modal-content-placeholder").load("/Products/Create", function() {
        initProductSuggestions();
        $("#sku").on("paste cut input", function() {
            clearTimeout(n);
            n = $(this).val() ? setTimeout(checkSku, 500, $(this).val()) : setTimeout(checkSku, 200)
        })
    })
}

function checkSku(n) {
    n !== undefined ? $.ajax({
        type: "GET",
        url: "/Products/CheckSku/",
        data: {
            sku: n
        },
        contentType: "application/json; charset=utf-8",
        success: function(n) {
            checkSkuResponse(n)
        }
    }) : $('span[data-valmsg-for="sku"').text("")
}

function checkSkuResponse(n) {
    n != null && n.data != null && (n.data.exists !== "" ? ($('span[data-valmsg-for="sku"').text(n.data.exists), $(".product-selection").prop("disabled", !0), $("#other-info").slideUp()) : ($(".product-selection").prop("disabled", !1), $("#DefaultRetailPrice").val("$" + n.data.drp), $('span[data-valmsg-for="sku"').text(""), $("#iq-desc").text(n.data.desc), $("#iq-desc-div").slideDown(), $(".product-selection").is(":checked") && $("#other-info").slideDown()))
}

function TestSearch(n) {
    manufacturerBH.search(n)
}

function showProductCreate(n) {
    $("#other-info").slideDown();
    $("#product-modal #other-info input:not(:last)").val("").text("");
    categoryBH.clearRemoteCache();
    manufacturerBH.clearRemoteCache();
    modelBH.clearRemoteCache();
    colourBH.clearRemoteCache();
    sizeBH.clearRemoteCache();
    n === "device" ? ($(".device-only").slideDown(), $(".accessory-only").slideUp(), $("#product-modal #description").text(""), $("#product-modal #description").val("")) : ($(".device-only").slideUp(), $(".accessory-only").slideDown());
    setTimeout(function() {
        checkEmptyFields();
        initEmptyFieldCheck()
    }, 400)
}

function initProductSuggestions() {
    categoryBH = new Bloodhound({
        identify: function(n) {
            return n.id
        },
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        datumTokenizer: Bloodhound.tokenizers.obj.whitespace("description"),
        dupDetector: function(n, t) {
            return n.id === t.id
        },
        sufficient: 10,
        remote: {
            url: "/Products/GetCategories",
            prepare: function(n, t) {
                return t.type = "GET", t.contentType = "application/json; charset=UTF-8", n = "search=" + n + "&device=" + ($("input[name=device-type]:checked").val() === "device" ? "true" : "false"), t.data = n, t
            }
        }
    });
    $("#category").typeahead({
        minLength: 0
    }, {
        limit: Infinity,
        async: !0,
        source: categoryBH,
        name: "category",
        display: "description"
    }).bind("typeahead:select", function(n, t) {
        var i = t.id;
        i < 0 ? addNewProductField("category") : setProductFieldID("category", i)
    }).bind("typeahead:change", function() {
        var n = $(this).val();
        n == !1 && lookUpProductField("category", n)
    }).on("keyup", function(n) {
        n.which == 13 && $(".tt-suggestion").length == 1 && $(".tt-suggestion:first-child").click()
    });
    manufacturerBH = new Bloodhound({
        identify: function(n) {
            return n.id
        },
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        datumTokenizer: Bloodhound.tokenizers.obj.whitespace("description"),
        dupDetector: function(n, t) {
            return n.id === t.id
        },
        sufficient: 10,
        remote: {
            url: "/Products/GetManufacturers/?search=%QUERY",
            wildcard: "%QUERY"
        }
    });
    $("#manufacturer").typeahead({
        minLength: 0
    }, {
        limit: Infinity,
        async: !0,
        source: manufacturerBH,
        name: "manufacturer",
        display: "description"
    }).bind("typeahead:select", function(n, t) {
        var i = t.id;
        i < 0 ? addNewProductField("manufacturer") : setProductFieldID("manufacturer", i)
    }).bind("typeahead:change", function() {
        var n = $(this).val();
        n === "+ Add New" || lookUpProductField("manufacturer", n)
    }).on("keyup", function(n) {
        n.which == 13 && $(".tt-suggestion").length == 1 && $(".tt-suggestion:first-child").click()
    });
    modelBH = new Bloodhound({
        identify: function(n) {
            return n.id
        },
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        datumTokenizer: Bloodhound.tokenizers.obj.whitespace("description"),
        dupDetector: function(n, t) {
            return n.id === t.id
        },
        sufficient: 10,
        remote: {
            url: "/Products/GetModels",
            prepare: function(n, t) {
                return t.type = "GET", t.contentType = "application/json; charset=UTF-8", n = "search=" + n + "&device=" + ($("input[name=device-type]:checked").val() === "device" ? "true" : "false"), t.data = n, t
            }
        }
    });
    $("#model").typeahead({
        minLength: 0
    }, {
        limit: Infinity,
        async: !0,
        source: modelBH,
        name: "model",
        display: "description"
    }).bind("typeahead:select", function(n, t) {
        var i = t.id;
        i < 0 ? addNewProductField("model") : setProductFieldID("model", i)
    }).bind("typeahead:change", function() {
        var n = $(this).val();
        n == !1 && lookUpProductField("model", n)
    }).on("keyup", function(n) {
        n.which == 13 && $(".tt-suggestion").length == 1 && $(".tt-suggestion:first-child").click()
    });
    colourBH = new Bloodhound({
        identify: function(n) {
            return n.id
        },
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        datumTokenizer: Bloodhound.tokenizers.obj.whitespace("description"),
        dupDetector: function(n, t) {
            return n.id === t.id
        },
        sufficient: 10,
        remote: {
            url: "/Products/GetColours/?search=%QUERY",
            wildcard: "%QUERY"
        }
    });
    $("#colour").typeahead({
        minLength: 0
    }, {
        limit: Infinity,
        async: !0,
        source: colourBH,
        name: "colour",
        display: "description"
    }).bind("typeahead:select", function(n, t) {
        var i = t.id;
        i < 0 ? addNewProductField("colour") : setProductFieldID("colour", i)
    }).bind("typeahead:change", function() {
        var n = $(this).val();
        n == !1 && lookUpProductField("colour", n)
    }).on("keyup", function(n) {
        n.which == 13 && $(".tt-suggestion").length == 1 && $(".tt-suggestion:first-child").click()
    });
    sizeBH = new Bloodhound({
        identify: function(n) {
            return n.id
        },
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        datumTokenizer: Bloodhound.tokenizers.obj.whitespace("description"),
        dupDetector: function(n, t) {
            return n.id === t.id
        },
        sufficient: 10,
        remote: {
            url: "/Products/GetSizes/?search=%QUERY",
            wildcard: "%QUERY"
        }
    });
    $("#size").typeahead({
        minLength: 0
    }, {
        limit: Infinity,
        async: !0,
        source: sizeBH,
        name: "size",
        display: "description"
    }).bind("typeahead:select", function(n, t) {
        var i = t.id;
        i < 0 ? addNewProductField("size") : setProductFieldID("size", i)
    }).bind("typeahead:change", function() {
        var n = $(this).val();
        n == !1 && lookUpProductField("size", n)
    }).on("keyup", function(n) {
        n.which == 13 && $(".tt-suggestion").length == 1 && $(".tt-suggestion:first-child").click()
    });
    categoryBH.clearRemoteCache();
    manufacturerBH.clearRemoteCache();
    modelBH.clearRemoteCache();
    colourBH.clearRemoteCache();
    sizeBH.clearRemoteCache()
}

function addNewProductField(n) {
    var i, t = "New ";
    switch (n) {
        case "category":
            t += "Category";
            break;
        case "manufacturer":
            t += "Manufacturer";
            break;
        case "model":
            t += "Model";
            break;
        case "colour":
            t += "Colour";
            break;
        case "size":
            t += "Size"
    }
    loadModal("temp-new", t, 0);
    clickOut(!0);
    i = $("input[name=device-type]:checked").val() === "device" ? !0 : !1;
    $("#temp-new-modal-content-placeholder").load("/Products/AddField", {
        type: n,
        device: i
    }, function() {
        $("input.required, textarea.required, input.was-required, textarea.was-required").on("change blur input", function() {
            validate($(this))
        });
        setTimeout(function() {
            $("#temp-new-modal input:last").focus()
        }, 400)
    })
}

function saveNewProductField() {
    $("#new-field-form").valid() && $("#new-field-form").submit()
}

function lookUpProductField(n, t) {
    $.ajax({
        type: "GET",
        url: "/Products/GetFieldValueID",
        contentType: "application/json; charset=utf-8",
        data: {
            type: n,
            value: t
        },
        dataType: "json",
        success: function(t) {
            setProductFieldID(n, t.data)
        }
    })
}

function setProductFieldID(n, t) {
    $("#" + n + "ID").val(t);
    checkEmptyFields()
}

function NewFieldValueSuccess() {
    $("#new-field-partial div.alert-success").length && (setTimeout(function() {
        var n = $("#new-field-partial input#type").val(),
            t = $("#new-description").val();
        $("#" + n).val(t);
        lookUpProductField(n, t);
        closeModal()
    }, 1500), categoryBH.clearRemoteCache(), manufacturerBH.clearRemoteCache(), modelBH.clearRemoteCache(), colourBH.clearRemoteCache(), sizeBH.clearRemoteCache())
}

function initEmptyFieldCheck() {
    var n = $("#product-modal form input:visible:not(.tt-hint)");
    n.on("input", function() {
        checkEmptyFields()
    })
}

function checkEmptyFields() {
    var n = $("#product-modal form input:visible:not(.tt-hint), #product-modal form input:hidden:lt(4)").filter(function() {
        return $.trim(this.value) === ""
    });
    n.length ? $("#save-product").hide() : $("#save-product").show()
}

function editProduct(n) {
    loadModal("product", "Edit Product");
    clickOut(!0);
    $("#product-modal").one("hidden.bs.modal", function() {
        updateTable("#product-table")
    });
    $("#product-modal-content-placeholder").load("/Products/Edit/" + n, function() {
        initProductSuggestions()
    })
}

function editCompatibility() {
    $("#create-product-form #save-product").append('<input hidden name="editCompatibility" value="true" />');
    $("#create-product-form").valid() && ($("#product-modal .loader-bg").fadeIn(), $("#product-modal-content-placeholder").animate({
        opacity: "0"
    }, 200), $("#product-modal-content-placeholder").slideUp(400, function() {
        $("#create-product-form").submit()
    }))
}

function createProduct() {
    $("#product-modal .loader-bg").fadeIn();
    $("#product-modal-content-placeholder").animate({
        opacity: "0"
    }, 200);
    $("#product-modal-content-placeholder").slideUp()
}

function saveProduct() {
    $("#create-product-form").valid() && $("#create-product-form").submit()
}

function SaveProductSuccess() {
    $("#create-product-form .alert-success").length ? setTimeout(function() {
        closeModal()
    }, 2e3) : ($("#product-modal-content-placeholder").slideDown(400), $("#product-modal-content-placeholder").animate({
        opacity: 1
    }, 200), $("#product-modal .loader-bg").fadeOut(), InitTrees())
}

function deleteProduct(n) {
    if (n != undefined) {
        loadModal("delete", "Are you sure you want to delete this product?");
        clickOut(!0);
        $("#delete-modal").one("hidden.bs.modal", function() {
            updateTable("#product-table")
        });
        $("#delete-modal .modal-dialog .loader-bg").fadeIn(200);
        $("#delete-modal-content-placeholder").load("/Products/Delete/" + n, function() {
            $("#delete-modal .modal-dialog .loader-bg").fadeOut(200)
        })
    }
}

function submitDeleteProduct() {
    $("#delete-product-form").submit();
    $("#delete-modal .loader-bg").fadeIn(200);
    $("#delete-modal .flex-container:last").hide();
    $("#delete-modal .modal-dialog").animate({
        opacity: .7
    }, 200)
}

function DeleteProductSuccess() {
    if ($("#delete-modal #other-modal-header").remove(), clickOut(!1), $("#delete-modal .loader-bg").fadeOut(200), $("#delete-modal .modal-dialog").animate({
            opacity: 1
        }, 200), $("#DeleteSuccess").val()) {
        $("#delete-modal").one("hidden.bs.modal", function() {
            closeModal()
        });
        setTimeout(function() {
            closeModal()
        }, 3e3)
    }
}

function newProductCategory() {
    loadModal("productCategory", "New Category");
    clickOut(!0);
    $("#productCategory-modal-content-placeholder").load("/ProductCategories/Create/", function() {
        $("input.required, textarea.required, input.was-required, textarea.was-required").on("change blur input", function() {
            validate($(this))
        })
    })
}

function saveProductCategory() {
    if ($("#create-productCategory-form").valid()) {
        $("#create-productCategory-form").submit();
        $("#productCategory-modal .loader-bg").fadeIn(200);
        $("#productCategory-modal #productCategory-modal-content-placeholder").animate({
            opacity: .7
        }, 200);
        $("#productCategory-modal").one("hidden.bs.modal", function() {
            updateTable("#productCategory-table")
        })
    }
}

function SaveProductCategorySuccess() {
    setDevType();
    $("#productCategory-modal .loader-bg").fadeOut(200);
    $("#productCategory-modal #productCategory-modal-content-placeholder").animate({
        opacity: 1
    }, 200);
    $("#productCategory-modal .alert-success").length && setTimeout(function() {
        closeModal()
    }, 1500)
}

function editProductCategory(n) {
    loadModal("productCategory", "Edit Category");
    clickOut(!0);
    $("#productCategory-modal .loader-bg").fadeIn(200);
    $("#productCategory-modal-content-placeholder").load("/ProductCategories/Edit/" + n, function() {
        setDevType();
        $("input.required, textarea.required, input.was-required, textarea.was-required").on("change blur input", function() {
            validate($(this))
        });
        $("#productCategory-modal .loader-bg").fadeOut(200)
    })
}

function setDevType() {
    $("#dev-type").val() === "True" ? $(".product-selection:first").prop("checked", !0) : $(".product-selection:last").prop("checked", !0)
}

function deleteProductCategory(n) {
    if (n != undefined) {
        loadModal("delete", "Are you sure you want to delete this category?");
        clickOut(!0);
        $("#delete-modal").one("hidden.bs.modal", function() {
            updateTable("#productCategory-table")
        });
        $("#delete-modal .modal-dialog .loader-bg").fadeIn(200);
        $("#delete-modal-content-placeholder").load("/ProductCategories/Delete/" + n, function() {
            $("#delete-modal .modal-dialog .loader-bg").fadeOut(200)
        })
    }
}

function submitDeleteProductCategory() {
    $("#delete-productCategory-form").submit();
    $("#delete-modal .loader-bg").fadeIn(200);
    $("#delete-modal .flex-container:last").hide();
    $("#delete-modal #delete-modal-content-placeholder").animate({
        opacity: .7
    }, 200)
}

function DeleteProductCategorySuccess() {
    if ($("#delete-modal #other-modal-header").remove(), clickOut(!1), $("#delete-modal .loader-bg").fadeOut(200), $("#delete-modal #delete-modal-content-placeholder").animate({
            opacity: 1
        }, 200), $("#DeleteSuccess").val()) {
        $("#delete-modal").one("hidden.bs.modal", function() {
            closeModal()
        });
        setTimeout(function() {
            closeModal()
        }, 3e3)
    }
}

function newProductType() {
    loadModal("productType", "New Model");
    clickOut(!0);
    $("#productType-modal-content-placeholder").load("/ProductTypes/Create/", function() {
        $("input.required, textarea.required, input.was-required, textarea.was-required").on("change blur input", function() {
            validate($(this))
        })
    })
}

function saveProductType() {
    if ($("#create-productType-form").valid()) {
        $("#create-productType-form").submit();
        $("#productType-modal .loader-bg").fadeIn(200);
        $("#productType-modal #productType-modal-content-placeholder").animate({
            opacity: .7
        }, 200);
        $("#productType-modal").one("hidden.bs.modal", function() {
            updateTable("#productType-table")
        })
    }
}

function SaveProductTypeSuccess() {
    setDevType();
    $("#productType-modal .loader-bg").fadeOut(200);
    $("#productType-modal #productType-modal-content-placeholder").animate({
        opacity: 1
    }, 200);
    $("#productType-modal .alert-success").length && setTimeout(function() {
        closeModal()
    }, 1500)
}

function editProductType(n) {
    loadModal("productType", "Edit Model");
    clickOut(!0);
    $("#productType-modal .loader-bg").fadeIn(200);
    $("#productType-modal-content-placeholder").load("/ProductTypes/Edit/" + n, function() {
        setDevType();
        $("input.required, textarea.required, input.was-required, textarea.was-required").on("change blur input", function() {
            validate($(this))
        });
        $("#productType-modal .loader-bg").fadeOut(200)
    })
}

function deleteProductType(n) {
    if (n != undefined) {
        loadModal("delete", "Are you sure you want to delete this model?");
        clickOut(!0);
        $("#delete-modal").one("hidden.bs.modal", function() {
            updateTable("#productType-table")
        });
        $("#delete-modal .modal-dialog .loader-bg").fadeIn(200);
        $("#delete-modal-content-placeholder").load("/ProductTypes/Delete/" + n, function() {
            $("#delete-modal .modal-dialog .loader-bg").fadeOut(200)
        })
    }
}

function submitDeleteProductType() {
    $("#delete-productType-form").submit();
    $("#delete-modal .loader-bg").fadeIn(200);
    $("#delete-modal .flex-container:last").hide();
    $("#delete-modal #delete-modal-content-placeholder").animate({
        opacity: .7
    }, 200)
}

function DeleteProductTypeSuccess() {
    if ($("#delete-modal #other-modal-header").remove(), clickOut(!1), $("#delete-modal .loader-bg").fadeOut(200), $("#delete-modal #delete-modal-content-placeholder").animate({
            opacity: 1
        }, 200), $("#DeleteSuccess").val()) {
        $("#delete-modal").one("hidden.bs.modal", function() {
            closeModal()
        });
        setTimeout(function() {
            closeModal()
        }, 3e3)
    }
}

function newProductManufacturer() {
    loadModal("productManufacturer", "New Manufacturer");
    clickOut(!0);
    $("#productManufacturer-modal-content-placeholder").load("/ProductManufacturers/Create/", function() {
        $("input.required, textarea.required, input.was-required, textarea.was-required").on("change blur input", function() {
            validate($(this))
        })
    })
}

function saveProductManufacturer() {
    if ($("#create-productManufacturer-form").valid()) {
        $("#create-productManufacturer-form").submit();
        $("#productManufacturer-modal .loader-bg").fadeIn(200);
        $("#productManufacturer-modal #productManufacturer-modal-content-placeholder").animate({
            opacity: .7
        }, 200);
        $("#productManufacturer-modal").one("hidden.bs.modal", function() {
            updateTable("#productManufacturer-table")
        })
    }
}

function SaveProductManufacturerSuccess() {
    $("#productManufacturer-modal .loader-bg").fadeOut(200);
    $("#productManufacturer-modal #productManufacturer-modal-content-placeholder").animate({
        opacity: 1
    }, 200);
    $("#productManufacturer-modal .alert-success").length && setTimeout(function() {
        closeModal()
    }, 1500)
}

function editProductManufacturer(n) {
    loadModal("productManufacturer", "Edit Manufacturer");
    clickOut(!0);
    $("#productManufacturer-modal .loader-bg").fadeIn(200);
    $("#productManufacturer-modal-content-placeholder").load("/ProductManufacturers/Edit/" + n, function() {
        $("input.required, textarea.required, input.was-required, textarea.was-required").on("change blur input", function() {
            validate($(this))
        });
        $("#productManufacturer-modal .loader-bg").fadeOut(200)
    })
}

function deleteProductManufacturer(n) {
    if (n != undefined) {
        loadModal("delete", "Are you sure you want to delete this manufacturer?");
        clickOut(!0);
        $("#delete-modal").one("hidden.bs.modal", function() {
            updateTable("#productManufacturer-table")
        });
        $("#delete-modal .modal-dialog .loader-bg").fadeIn(200);
        $("#delete-modal-content-placeholder").load("/ProductManufacturers/Delete/" + n, function() {
            $("#delete-modal .modal-dialog .loader-bg").fadeOut(200)
        })
    }
}

function submitDeleteProductManufacturer() {
    $("#delete-productManufacturer-form").submit();
    $("#delete-modal .loader-bg").fadeIn(200);
    $("#delete-modal .flex-container:last").hide();
    $("#delete-modal #delete-modal-content-placeholder").animate({
        opacity: .7
    }, 200)
}

function DeleteProductManufacturerSuccess() {
    if ($("#delete-modal #other-modal-header").remove(), clickOut(!1), $("#delete-modal .loader-bg").fadeOut(200), $("#delete-modal #delete-modal-content-placeholder").animate({
            opacity: 1
        }, 200), $("#DeleteSuccess").val()) {
        $("#delete-modal").one("hidden.bs.modal", function() {
            closeModal()
        });
        setTimeout(function() {
            closeModal()
        }, 3e3)
    }
}

function initMathStuff() {
    $("[math]:not([money])").on("input", formatNumberOnly);
    $("[math]").on("input", sumFields);
    $("[math]:not([value='']):not(:hidden)").trigger("input")
}

function initMoneyStuff() {
    $("[money]").on("input change", formatMoney)
}

function setProposalTitle() {
    $("#proposal-modal-header").text($("#hidden-title-text").val());
    $("#hidden-description-text").val() && $("#other-modal-header h3").append("<div id='proposal-description-text'>" + $("#hidden-description-text").val() + "<\/div>")
}

function initDeviceSuggestion() {
    var n = new Bloodhound({
            identify: function(n) {
                return n.id
            },
            queryTokenizer: Bloodhound.tokenizers.whitespace,
            datumTokenizer: Bloodhound.tokenizers.obj.whitespace("description"),
            dupDetector: function(n, t) {
                return n.id === t.id
            },
            sufficient: 10,
            remote: {
                url: "/Products/GetDevices/?search=%QUERY&device=true",
                wildcard: "%QUERY"
            }
        }),
        t = new Bloodhound({
            identify: function(n) {
                return n.id
            },
            queryTokenizer: Bloodhound.tokenizers.whitespace,
            datumTokenizer: Bloodhound.tokenizers.obj.whitespace("description"),
            dupDetector: function(n, t) {
                return n.id === t.id
            },
            sufficient: 10,
            remote: {
                url: "/Products/GetDevices/?search=%QUERY&device=false",
                wildcard: "%QUERY"
            }
        }),
        i = new Bloodhound({
            identify: function(n) {
                return n.id
            },
            queryTokenizer: Bloodhound.tokenizers.whitespace,
            datumTokenizer: Bloodhound.tokenizers.obj.whitespace("description"),
            dupDetector: function(n, t) {
                return n.id === t.id
            },
            sufficient: 10,
            remote: {
                url: "/Products/GetDevices/?search=%QUERY&device=false&category=14",
                wildcard: "%QUERY"
            }
        }),
        r = new Bloodhound({
            identify: function(n) {
                return n.id
            },
            queryTokenizer: Bloodhound.tokenizers.whitespace,
            datumTokenizer: Bloodhound.tokenizers.obj.whitespace("description"),
            dupDetector: function(n, t) {
                return n.id === t.id
            },
            sufficient: 10,
            remote: {
                url: "/Products/GetDevices/?search=%QUERY&device=true&category=15",
                wildcard: "%QUERY"
            }
        }),
        u = new Bloodhound({
            identify: function(n) {
                return n.id
            },
            queryTokenizer: Bloodhound.tokenizers.whitespace,
            datumTokenizer: Bloodhound.tokenizers.obj.whitespace("description"),
            dupDetector: function(n, t) {
                return n.id === t.id
            },
            sufficient: 10,
            remote: {
                url: "/Products/GetDevices/?search=%QUERY&device=false&category=16",
                wildcard: "%QUERY"
            }
        });
    $('.proposal-typeahead[typeahead-source="device"]').typeahead({
        minLength: 0
    }, {
        limit: Infinity,
        async: !0,
        source: n,
        name: "device",
        display: "description",
        templates: {
            empty: '<div class="empty-message">\nUnable to find any devices\n<\/div>',
            suggestion: Handlebars.compile("<div><strong>{{description}}<\/strong> – {{sku}}<\/div>")
        }
    }).bind("typeahead:select", function(n, t) {
        var i = this,
            r = $(".flex-small-item").add(i).each(function(n) {
                if ($(this).is(i)) return index = n, !1
            }).slice(index + 2, index + 3);
        r.first().children("input").val("$" + t.price).trigger("input");
        r.first().next().next().children("input").val("$40.00").trigger("input")
    }).on("keyup", function(n) {
        n.which == 13 && $(".tt-suggestion").length == 1 && $(".tt-suggestion:first-child").click()
    });
    $('.proposal-typeahead[typeahead-source="accessory"]').typeahead({
        minLength: 0
    }, {
        limit: Infinity,
        async: !0,
        source: t,
        name: "accessory",
        display: "description",
        templates: {
            empty: '<div class="empty-message">\nUnable to find any accessories\n<\/div>',
            suggestion: Handlebars.compile("<div><strong>{{description}}<\/strong> – {{sku}}<\/div>")
        }
    }).bind("typeahead:select", function(n, t) {
        var i = this,
            r = $(".flex-small-item").add(i).each(function(n) {
                if ($(this).is(i)) return index = n, !1
            }).slice(index + 2, index + 3);
        r.first().children("input").val("$" + t.price).trigger("input")
    }).on("keyup", function(n) {
        n.which == 13 && $(".tt-suggestion").length == 1 && $(".tt-suggestion:first-child").click()
    });
    $('.proposal-typeahead[typeahead-source="warranty"]').typeahead({
        minLength: 0
    }, {
        limit: Infinity,
        async: !0,
        source: i,
        name: "warranty",
        display: "description",
        templates: {
            empty: '<div class="empty-message">\nUnable to find any warranties\n<\/div>',
            suggestion: Handlebars.compile("<div><strong>{{description}}<\/strong> – {{sku}}<\/div>")
        }
    }).bind("typeahead:select", function(n, t) {
        var i = this,
            r = $(".flex-small-item").add(i).each(function(n) {
                if ($(this).is(i)) return index = n, !1
            }).slice(index + 3, index + 4);
        r.first().children("input").val("$" + t.price).trigger("input")
    }).on("keyup", function(n) {
        n.which == 13 && $(".tt-suggestion").length == 1 && $(".tt-suggestion:first-child").click()
    });
    $('.proposal-typeahead[typeahead-source="device-wireline"]').typeahead({
        minLength: 0
    }, {
        limit: Infinity,
        async: !0,
        source: r,
        name: "wireline",
        display: "description",
        templates: {
            empty: '<div class="empty-message">\nUnable to find any products\n<\/div>',
            suggestion: Handlebars.compile("<div><strong>{{description}}<\/strong> – {{sku}}<\/div>")
        }
    }).bind("typeahead:select", function(n, t) {
        var i = this,
            r = $(".flex-small-item").add(i).each(function(n) {
                if ($(this).is(i)) return index = n, !1
            }).slice(index + 3, index + 4);
        r.first().children("input").val("$" + t.price).trigger("input")
    }).on("keyup", function(n) {
        n.which == 13 && $(".tt-suggestion").length == 1 && $(".tt-suggestion:first-child").click()
    });
    $('.proposal-typeahead[typeahead-source="sim"]').typeahead({
        minLength: 0
    }, {
        limit: Infinity,
        async: !0,
        source: u,
        name: "sim",
        display: "description",
        templates: {
            empty: '<div class="empty-message">\nUnable to find any products\n<\/div>',
            suggestion: Handlebars.compile("<div><strong>{{description}}<\/strong> – {{sku}}<\/div>")
        }
    }).bind("typeahead:select", function(n, t) {
        var i = this,
            r;
        $(this).trigger("input");
        r = $(".flex-small-item").add(i).each(function(n) {
            if ($(this).is(i)) return index = n, !1
        }).slice(index + 2, index + 3);
        r.first().children("input").val("$" + t.price).trigger("input")
    }).on("keyup", function(n) {
        n.which == 13 && $(".tt-suggestion").length == 1 && $(".tt-suggestion:first-child").click()
    })
}

function initDropDownSuggestion() {
    var n = $(this).attr("typeahead-source"),
        t;
    if (n !== "warranty" && n !== "device" && n !== "accessory" && n !== "device-wireline" && n !== "sim") {
        t = new Bloodhound({
            identify: function(n) {
                return n.id
            },
            queryTokenizer: Bloodhound.tokenizers.whitespace,
            datumTokenizer: Bloodhound.tokenizers.obj.whitespace("answer"),
            dupDetector: function(n, t) {
                return n.answer === t.answer
            },
            sufficient: 10,
            remote: {
                url: "/Proposals/GetAnswers/?search=%QUERY&fieldID=" + n,
                wildcard: "%QUERY"
            }
        });
        $(this).typeahead({
            minLength: 0
        }, {
            limit: Infinity,
            async: !0,
            source: t,
            name: "answers" + n,
            display: "answer",
            templates: {
                suggestion: Handlebars.compile('<div><i class="cr-icon fa fa-arrow-right"><\/i> {{answer}}<\/div>')
            }
        }).bind("typeahead:select", function() {
            validate($(this));
            $(this).trigger("input")
        }).on("keyup", function(n) {
            n.which == 13 && $(".tt-suggestion").length == 1 && $(".tt-suggestion:first-child").click()
        })
    }
}

function initNewContactDropDown() {
    $("#proposal-modal select").filter(function() {
        return $(this).children('option[value="+ Add new contact"]').length
    }).on("change", function() {
        if ($(this).val() === "+ Add new contact") loadModal("new-contact", "New Contact", undefined), $("#new-contact-modal .loader-bg").fadeIn(200), $("#new-contact-modal-content-placeholder").load("/ClientContacts/CreateSmall", function() {
            $("#new-contact-modal .loader-bg").fadeOut(200);
            $("#new-contact-modal #ProposalHeaderID").val($("#proposal-modal #proposalHeaderID").val());
            updateValidation("#new-contact-modal form");
            $("input.required, textarea.required, input.was-required:not(:disabled), textarea.was-required").each(function() {
                validate($(this))
            });
            $("select.required, select.was-required").each(function() {
                validateSelect($(this))
            })
        }), $(this).val("");
        else {
            var n = $("#proposal-modal #proposalHeaderID").val();
            $.ajax({
                type: "GET",
                url: "/ClientContacts/GetContactEmail",
                contentType: "application/json; charset=utf-8",
                data: {
                    fullName: $(this).val(),
                    propHeaderID: n
                },
                dataType: "json",
                success: function(n) {
                    setContactEmail(n)
                }
            })
        }
    })
}

function setContactEmail(n) {
    $("#proposal-modal input.email").val(n).trigger("input")
}

function initProposalEmail() {
    var n = "proposal-modal",
        t = "next-button";
    $("#proposal-modal input.email").on("input", function() {
        $(this).valid() ? ($(this).addClass("was-required"), $(this).removeClass("required")) : ($(this).addClass("required"), $(this).removeClass("was-required"));
        checkRequiredFields(n, t)
    });
    $("#proposal-modal input.email").trigger("input")
}

function initTriggerConditions() {
    $("#proposal-modal input[trigger]").on("input change blur", function() {
        var t = $(this).parents(".flex-container-relative.flex-no-center").children()[0],
            n = "";
        $(this).val() && (n = $(t).children().attr("triggerVal"));
        $(t).children().val(n).text(n)
    })
}

function InitEverything() {
    if ($("#viewProposalID").length) {
        var n = $("#viewProposalID").val(),
            t = $("#viewProposalVersion").val();
        setTimeout(function() {
            closeModal();
            window.location.href = "/Proposals/ViewPDF?id=" + n + "&version=" + t
        }, 300)
    } else $("#select-template-form").length ? (setProposalTitle(), initSelectTemplateTable($("#select-template-id").val()), $("#proposal-modal div.alert.alert-danger").slideDown().delay(3e3).slideUp()) : $("#edit-error").length ? ($("#proposal-modal div.alert.alert-danger").slideDown(), initEverything()) : ($("#proposal-modal div.alert.alert-danger").slideDown().delay(3e3).slideUp(), initEverything())
}

function initEverything() {
    var n = "proposal-modal",
        t = "next-button";
    setProposalTitle();
    removeEmptyLabelThings();
    sizingProposalModal();
    initMathStuff();
    initMoneyStuff();
    $("select.unique").selectunique();
    initNewContactDropDown();
    setFlexEnd();
    initDateTimePicker();
    initDeviceSuggestion();
    initTriggerConditions();
    $("textarea[max-char]").on("input", updateCount).each(updateCount);
    $("input.required, textarea.required, input.was-required, textarea.was-required").on("change blur input", function() {
        validate($(this));
        checkRequiredFields(n, t)
    });
    $("select.required, select.was-required").on("change", function() {
        validateSelect($(this));
        checkRequiredFields(n, t)
    });
    $("input.required, textarea.required, input.was-required:not(:disabled), textarea.was-required").each(function() {
        validate($(this))
    });
    $("select.required, select.was-required").each(function() {
        validateSelect($(this))
    });
    $("input.required-together, textarea.required-together").on("change blur input", requireTogether).each(requireTogether);
    initProposalEmail();
    $("input.proposal-typeahead").each(initDropDownSuggestion);
    checkRequiredRadioProposal()
}

function updateCount() {
    var n = $(this).val().length,
        t = $(this).attr("max-char");
    t < n ? ($("#character-count").addClass("colour-red"), $(this).val($(this).val().substring(0, t))) : $("#character-count").removeClass("colour-red");
    n = $(this).val().length;
    $("#character-count").text("You have used " + n + " of " + t + " characters")
}

function removeEmptyLabelThings() {
    var n = $('div.flex-big-item input[value=""]:hidden ~ label:not([math])');
    n.closest("div.flex-container-relative").remove()
}

function sizingProposalModal() {
    var n = 56;
    $("#proposal-description-text").length && (n += 17);
    $("#proposal-modal-content-placeholder, #other-modal-header").delay(150).fadeIn().promise().done(function() {
        $("#proposal-modal .modal-dialog").css("max-height", $("#proposal-modal-content-placeholder").outerHeight() + n);
        $("#proposal-modal-content-placeholder").outerHeight() + n > $("#proposal-modal .modal-dialog").css("max-height").replace(/[^-\d\.]/g, "") && $("#proposal-modal .modal-dialog").css("height", "");
        $("#proposal-modal .loader-bg").fadeOut(200);
        $("#proposal-modal-content-placeholder, #other-modal-header").animate({
            opacity: 1
        }, 200);
        setTimeout(function() {
            $("#proposal-modal .modal-dialog").css("overflow", "visible")
        }, 300)
    })
}

function createNewContactProposal() {
    $("#new-contact-modal #new-contact-form").valid() && ($("#new-contact-modal #new-contact-form").submit(), $("#new-contact-modal .modal-dialog .loader-bg").fadeIn(200), $("#new-contact-modal .row button").fadeOut(), $("#new-contact-modal form").animate({
        opacity: .7
    }, 200))
}

function UpdateProposalContactDropDown() {
    $("#new-contact-modal .modal-dialog .loader-bg").fadeOut(200);
    $("#new-contact-modal form").animate({
        opacity: 1
    }, 200);
    $("#newContactName").val() != "" && ($('#proposal-modal select option[value="+ Add new contact"]').before($("<option><\/option>").attr("value", $("#newContactName").val()).text($("#newContactName").val())), $("select").filter(function() {
        return $(this).children('option[value="+ Add new contact"]').length
    }).val($("#newContactName").val()).trigger("change"));
    setTimeout(function() {
        $("div.alert-success").length && closeModal()
    }, 2e3)
}

function setFlexEnd() {
    $("#proposal-modal textarea").parent().parent().css({
        "align-items": "flex-end"
    })
}

function requireTogether() {
    var n;
    $fields = $(this).parents(".flex-container-relative.flex-no-center").find('input.required-together:not([tabindex="-1"]), textarea.required-together');
    n = !1;
    $fields.each(function() {
        if ($(this).val() != "") return n = !0, !1
    });
    n ? ($fields.addClass("required"), $fields.each(function() {
        validate($(this))
    })) : $fields.removeClass("required");
    checkRequiredFields("proposal-modal", "next-button")
}

function checkRequiredFields(n, t) {
    $("#" + n + ' .required:not([tabindex="-1"])').length ? $("#" + t).prop("disabled", !0).addClass("disabled") : $("#" + t).prop("disabled", !1).removeClass("disabled")
}

function checkRequiredRadioProposal() {
    $(".radio input:checked").length && ($(".radio input:checked").val() == $("[otherRadio]").val() ? $("#other-reason-field").removeClass("disabled").addClass($("#other-reason-field").val() == "" ? "required" : "was-required").prop("disabled", !1) : $("#other-reason-field").removeClass("required").addClass("disabled").prop("disabled", !0), $(".radio.required").addClass("was-required").removeClass("required"));
    checkRequiredFields("proposal-modal", "next-button")
}

function sumFields() {
    for (var t, e, n, i, u, f, r = $(this).attr("math").split(","); r.length > 0;)(i = 0, u = r.shift(), n = u.match(/\d+/)[0], f = $("input[math~='" + n + "'],input[math~='" + n + ",']"), u != "sum " + n) && (f.sort(function(n, t) {
        return $(n).attr("mathorder") - $(t).attr("mathorder")
    }), f.each(function() {
        if (t = $(this).val().replace(/[^\d\.\-]/g, "") || 0, $.isNumeric(t)) {
            t = Number(t);
            e = jQuery.grep($(this).attr("math").split(","), function(t) {
                return t.indexOf(n) > 0
            });
            switch (e[0].replace(/\s/g, "")) {
                case "add" + n:
                    i += t;
                    break;
                case "subtract" + n:
                    i -= t;
                    break;
                case "multiply" + n:
                    i *= t;
                    break;
                case "divide" + n:
                    t == 0 ? "" : i /= t
            }
        }
    }), $("[math*='sum " + n + ",'],[math$='sum " + n + "']").attr("money") != undefined && (i = "$" + parseFloat(Math.round(i * 100) / 100).toFixed(2)), $("[math*='sum " + n + ",'],[math$='sum " + n + "']").val(i).text(i), $(this) != $("[math*='sum " + n + ",'],[math$='sum " + n + "']") && $("[math*='sum " + n + ",'],[math$='sum " + n + "']").trigger("input"))
}

function startProposal(n, t) {
    loadModal("proposal", "Proposal Template", undefined, "55%");
    $("#proposal-modal .loader-bg").fadeIn(200);
    clickOut(!0);
    $("#proposal-modal").one("hidden.bs.modal", function() {
        updateTable("#proposalTable")
    });
    $("#other-modal-header").css({
        opacity: 0
    });
    $("#proposal-modal-content-placeholder").css({
        opacity: 0
    });
    $("#proposal-modal .modal-dialog").css({
        "max-height": "222px"
    });
    $("#proposal-modal-content-placeholder").load("/Proposals/Edit?id=" + n + (t == undefined ? "" : "&version=" + t), function() {
        $("#proposal-modal .loader-bg").fadeOut(200);
        InitEverything()
    })
}

function createNewProposal(n) {
    loadModal("proposal", "", undefined, "55%");
    $("#proposal-modal .loader-bg").fadeIn(200);
    clickOut(!0);
    $("#proposal-modal").one("hidden.bs.modal", function() {
        updateTable("#proposalTable")
    });
    $("#other-modal-header").css({
        opacity: 0
    });
    $("#proposal-modal-content-placeholder").load("/Proposals/Create/" + n, function() {
        $("#proposal-modal .loader-bg").fadeOut(200);
        InitEverything()
    })
}

function submitCreateProposal(n) {
    $("#newType").val(n);
    $("#create-proposal-form").submit();
    $("#create-proposal-form a").removeAttr("onclick");
    $("#proposal-modal-content-placeholder, #other-modal-header").animate({
        opacity: 0
    }, 100);
    $("#proposal-modal .loader-bg").fadeIn(200)
}

function nextProposal(n) {
    $("#proposal-modal-content-placeholder, #other-modal-header").animate({
        opacity: 0
    }, 100);
    $("#sectionNumber").val(function(t, i) {
        return Number(n) + Number(i)
    });
    var t = $("#proposal-modal .modal-dialog").outerHeight();
    $("#proposal-modal .modal-dialog").css("height", t);
    $("#proposal-modal .modal-dialog").css("max-height", t).css("overflow", "hidden");
    $("#proposal-modal .btn-dark").hide();
    $("#edit-proposal-form").submit();
    $("#proposal-modal .loader-bg").fadeIn(200);
    $("#proposal-modal-content-placeholder, #other-modal-header").fadeOut();
    $("#proposal-description-text").remove()
}

function submitCompletedProposal(n) {
    $("#completedAction").val(n);
    $("#completed-proposal-form").submit()
}

function initSelectTemplateTable(n) {
    function r() {
        t.search($("#proposalSuggestion-searchbox").val()).draw()
    }
    var t = $("#proposalSuggestionTable").on("processing.dt", function(n, t, i) {
            $("#content-body .loader-bg").css("display", i ? "block" : "none")
        }).DataTable({
            lengthMenu: [
                [20, 100, -1],
                [20, 100, "ALL"]
            ],
            columns: [{
                data: "proposalName"
            }, {
                data: "companyName"
            }, ],
            columnDefs: [{
                targets: 0,
                data: "proposalName",
                render: function(t, i, r) {
                    return '<a onclick="confirmProposalTemplate(' + t.id + ", " + r.version + ", " + n + ", '" + t.name + "')\">" + t.name + "<\/a>"
                }
            }],
            serverSide: !0,
            ajax: {
                url: "/Proposals/GetProposalTemplates",
                type: "POST",
                data: function(t) {
                    t.oppID = n
                }
            },
            order: [0, "asc"],
            scrollY: "40vh",
            stateSave: !0,
            stateDuration: 300,
            searchDelay: 0
        }),
        i;
    $("#proposalSuggestion-searchbox").val(t.search());
    $("#proposalSuggestion-searchbox").on("search paste cut input", function() {
        clearTimeout(i);
        i = $("#proposalSuggestion-searchbox").val() ? setTimeout(r, 500) : setTimeout(r, 200)
    });
    $("#proposalSuggestion-page-length").change(function() {
        var n = $("#proposalSuggestion-page-length option:selected").val();
        t.page.len(n).draw()
    });
    $("#proposal-modal .modal-dialog").css("max-height", "");
    $("#proposal-modal .loader-bg").fadeOut(200);
    $("#proposal-modal-content-placeholder, #other-modal-header").animate({
        opacity: 1
    }, 200)
}

function confirmProposalTemplate(n, t, i, r) {
    $("#templateHeader").val(n);
    $("#templateVersion").val(t);
    $("#baseOpportunity").val(i);
    loadModal("confirm-suggestion", "Confirm Template", undefined);
    clickOut(!0);
    $("#confirm-suggestion-modal-content-placeholder").load("/Proposals/ConfirmTemplate/?companyName=" + encodeURIComponent(r))
}

function confirmSubmitProposalTemplate(n) {
    closeModal(n);
    $("#select-template-form").submit();
    $("#proposal-modal .loader-bg").fadeIn(200)
}

function reloadSalesPipeline() {
    $("#salesPipeline").length && $("#pipeline-reports").load("/Home/SalesPipeline")
}

function getRepGoals(n, t) {
    $.get("/Goals/Edit", {
        territoryID: n,
        userID: t
    }, function(n) {
        $("#goal-placeholder").html(n);
        $("#goal-placeholder .progress-bar").css("width", function() {
            return $(this).attr("ani-width")
        })
    })
}

function editRepGoal(n, t) {
    loadModal("goals", "Edit Goal Target");
    clickOut(!0);
    $.get("/Goals/Create", {
        repID: n,
        categoryID: t
    }, function(n) {
        $("#goals-modal-content-placeholder").html(n);
        t == 1 && $(".calculate-points").on("input", calculatePointTotals).each(calculatePointTotals)
    })
}

function saveRepGoal() {
    $("#update-goal-form #target").val($("#update-goal-form #target").val().replace(/\$/, ""));
    $("#update-goal-form").submit();
    $("#goals-modal .loader-bg").fadeIn(200);
    $("body").append('<div class="loading-overlay"><\/div>')
}

function UpdateGoalSuccess() {
    if ($(".loading-overlay").remove(), $("#goals-modal .loader-bg").fadeOut(200), $("#goals-modal div.alert").slideDown(), $(".calculate-points").on("input", calculatePointTotals).each(calculatePointTotals), $("#goals-modal div.alert-success").length) {
        $("#goals-modal").one("hidden.bs.modal", function() {
            getRepGoals($("#goals-location-selection").val(), $("#goals-rep-selection").val())
        });
        setTimeout(function() {
            closeModal()
        }, 2e3)
    }
}

function loadGoalBreakdown(n, t) {
    var i = "",
        r;
    t == undefined && (t = $("#goals-location-selection").val());
    n == 1 ? r = $("#goals-rep-selection").val() : t == -1 && (i = "-store");
    loadModal("goal-breakdown" + i, "Breakdown", undefined, "60%");
    clickOut(!0);
    $.get("/Goals/Breakdown", {
        territoryID: t,
        goalCategoryID: n,
        repID: r
    }, function(n) {
        $("#goal-breakdown" + i + "-modal-content-placeholder").html(n);
        $("#goal-breakdown" + i + "-modal .progress-bar").css("width", function() {
            return $(this).attr("ani-width")
        })
    })
}

function loadPointGoalBreakdown(n, t) {
    var i = "-rep";
    t == undefined && (t = $("#goals-location-selection").val());
    t == -1 && (i = "-store");
    loadModal("goal-breakdown" + i, "Breakdown", undefined, "60%");
    clickOut(!0);
    $.get("/Goals/PointCategoryBreakdown", {
        territoryID: t,
        pointCategoryID: n
    }, function(t) {
        $("#goal-breakdown" + i + "-modal-content-placeholder").html(t);
        $("#goal-breakdown" + i + "-modal .progress-bar").css("width", function() {
            return $(this).attr("ani-width")
        });
        $("#goal-breakdown" + i + "-modal #goal-point-breakdown-placeholder label:first").text($("#goal-" + n + " label:first").text())
    })
}

function calculatePointTotals() {
    $(this).val($(this).val().replace(/[^\d\.\%]/g, ""));
    var t = $(this).attr("pointValue"),
        n = $(this).val() || 0;
    $(this).parent().nextAll("label:last").find(".category-total").text(t * n);
    $(this).parent().nextAll("input:hidden:last").val(t * n);
    n = 0;
    $(".category-total").each(function() {
        n += Number($(this).text())
    });
    $("#points-total").text(n);
    $("#PointsTotal").val(n)
}

function saveRepPointsGoals() {
    $("#update-goal-form").submit();
    $("#goals-modal .loader-bg").fadeIn(200);
    $("body").append('<div class="loading-overlay"><\/div>')
}

function loadQuantityForecast(n, t, i) {
    var r = t || $("#goals-location-selection").val(),
        u = i || $("#goals-rep-selection").val();
    loadModal("quantity-breakdown", "Items Sold", undefined, "60%");
    clickOut(!0);
    $.get("/Goals/QuantityBreakdown", {
        pointCategoryID: n,
        territoryID: r,
        repID: u
    }, function(n) {
        $("#quantity-breakdown-modal-content-placeholder").html(n);
        $("#quantity-breakdown-modal .progress-bar").css("width", function() {
            return $(this).attr("ani-width")
        })
    })
}

function loadOverlay(n) {
    n == !0 ? $("body").append('<div class="loading-overlay"><\/div>') : $(".loading-overlay").remove()
}

function printTest() {
    $(".modal.in:not(:last)").addClass("not-printing");
    window.print();
    $(".modal.in:not(:last)").removeClass("not-printing")
}

function makeTree(n) {
    var i, t;
    if (isNaN(n)) {
        console.log("No tree for you");
        return
    }
    for (i = "", t = 0; t < n; t++) t == 0 && (i += " ".repeat(n) + "*\n"), i += " ".repeat(n - t - 1) + "/" + " ".repeat(t) + "|" + " ".repeat(t) + "\\ \n";
    console.log(i)
}

function makeBox(n) {
    var i, t;
    if (isNaN(n)) {
        console.log("No box for you");
        return
    }
    for (i = " ", t = 0; t <= n; t++) i += t == 0 ? " _".repeat(n) + "\n" : t == n ? " |" + "_ ".repeat(n - 1) + "_|\n" : " |" + " ".repeat(n * 2 - 1) + "|\n";
    console.log(i)
}

function guess(n, t) {
    var r, f = 0,
        i, u;
    n = Math.ceil(n);
    t = Math.floor(t);
    i = Math.floor(Math.random() * (t - n + 1)) + n;
    u = "Guess a  number!";
    do r = prompt(u), f++, r > i ? u = "Lower!" : r < i && (u = "Higher!"); while (r != i);
    alert("It took you " + f + " guess" + (f == 1 ? "" : "es") + " to guess the number " + i + " from the range of " + n + " to " + t)
}
var origEditNotesVal, categoryBH, manufacturerBH, modelBH, colourBH, sizeBH;
if (function(n) {
        var t = "selectunique",
            r = t + "-selected",
            i = function(i, r) {
                var u = this;
                u.q = i.find("option").parent("select");
                u.options = n.extend({}, r);
                u.optionIndex = {};
                u.q.on("change." + t, function() {
                    u._selectChanged(n(this))
                });
                n(u._uniqueOptions(u.q.find("option"))).each(function() {
                    u.optionIndex[u._optionId(this)] = this.index
                });
                u.q.has(":selected").each(function() {
                    u._optionSelected(n(this))
                })
            };
        i.prototype = {
            constructor: i,
            _selectChanged: function(t) {
                var i = this,
                    u = t.data(r);
                u && i.q.not(t).each(function() {
                    var t = n(this);
                    t.append(i._cloneOption(u));
                    i._sortOptions(t)
                });
                i._optionSelected(t)
            },
            _optionSelected: function(t) {
                var u = this,
                    i = t.find(":selected");
                u._ignoreOption(i) ? t.data(r, null) : (t.data(r, i), u.q.not(t).each(function() {
                    var t = n(this);
                    t.find("option").each(function() {
                        var t = n(this);
                        if (i.text() == t.text()) {
                            t.remove();
                            return
                        }
                    })
                }))
            },
            _ignoreOption: function(t) {
                return n.trim(t.val()) == "" || n.isFunction(this.options.ignoreOption) && this.options.ignoreOption(t)
            },
            _cloneOption: function(n) {
                return n.clone(!0).prop("selected", !1)
            },
            _sortOptions: function(n) {
                var t = this,
                    i = n.find("option"),
                    r = n.val();
                i.sort(function(n, i) {
                    return t.optionIndex[t._optionId(n)] - t.optionIndex[t._optionId(i)]
                });
                n.html(i);
                n.val(r)
            },
            _optionId: function(n) {
                return [n.value, n.text].join("-")
            },
            _uniqueOptions: function(t) {
                var i = this,
                    r = [],
                    u = {};
                return t.each(function() {
                    var t = i._optionId(this);
                    u[t] || i._ignoreOption(n(this)) || (u[t] = !0, r.push(this))
                }), r
            },
            _removeHandlers: function() {
                this.q.off("." + t)
            },
            refresh: function() {
                var n = this
            },
            selected: function() {
                var t = this._uniqueOptions(this.q.find(":selected"));
                return n.map(t, function(n) {
                    return n.cloneNode(!0)
                })
            },
            remaining: function() {
                var t = this._uniqueOptions(this.q.find("option:not(:selected)"));
                return n.map(t, function(n) {
                    return n.cloneNode(!0)
                })
            }
        };
        n.fn.selectunique = function(r) {
            if (this.has("select,option").length) {
                var u = this.data(t);
                if (u || this.data(t, u = new i(this, r)), typeof r == "string")
                    if (r == "refresh") u._removeHandlers(), this.data(t, u = new i(this));
                    else return u[r] || n.error("selectunique: no such method '" + r + "'"), u[r]()
            }
            return this
        }
    }(window.jQuery), function(n) {
        function it(n, t, i) {
            switch (arguments.length) {
                case 2:
                    return null != n ? n : t;
                case 3:
                    return null != n ? n : null != t ? t : i;
                default:
                    throw new Error("Implement me");
            }
        }

        function p(n, t) {
            return uf.call(n, t)
        }

        function ot() {
            return {
                empty: !1,
                unusedTokens: [],
                unusedInput: [],
                overflow: -2,
                charsLeftOver: 0,
                nullInput: !1,
                invalidMonth: null,
                invalidFormat: !1,
                userInvalidated: !1,
                iso: !1
            }
        }

        function ri(n) {
            t.suppressDeprecationWarnings === !1 && "undefined" != typeof console && console.warn && console.warn("Deprecation warning: " + n)
        }

        function o(n, t) {
            var i = !0;
            return w(function() {
                return i && (ri(n), i = !1), t.apply(this, arguments)
            }, t)
        }

        function dr(n, t) {
            br[n] || (ri(t), br[n] = !0)
        }

        function ui(n, t) {
            return function(i) {
                return r(n.call(this, i), t)
            }
        }

        function gr(n, t) {
            return function(i) {
                return this.localeData().ordinal(n.call(this, i), t)
            }
        }

        function nu(n, t) {
            var r, f, u = 12 * (t.year() - n.year()) + (t.month() - n.month()),
                i = n.clone().add(u, "months");
            return 0 > t - i ? (r = n.clone().add(u - 1, "months"), f = (t - i) / (i - r)) : (r = n.clone().add(u + 1, "months"), f = (t - i) / (r - i)), -(u + f)
        }

        function tu(n, t, i) {
            var r;
            return null == i ? t : null != n.meridiemHour ? n.meridiemHour(t, i) : null != n.isPM ? (r = n.isPM(i), r && 12 > t && (t += 12), r || 12 !== t || (t = 0), t) : t
        }

        function fi() {}

        function rt(n, i) {
            i !== !1 && pi(n);
            ei(this, n);
            this._d = new Date(+n._d);
            ii === !1 && (ii = !0, t.updateOffset(this), ii = !1)
        }

        function st(n) {
            var i = li(n),
                r = i.year || 0,
                u = i.quarter || 0,
                f = i.month || 0,
                e = i.week || 0,
                o = i.day || 0,
                s = i.hour || 0,
                h = i.minute || 0,
                c = i.second || 0,
                l = i.millisecond || 0;
            this._milliseconds = +l + 1e3 * c + 6e4 * h + 36e5 * s;
            this._days = +o + 7 * e;
            this._months = +f + 3 * u + 12 * r;
            this._data = {};
            this._locale = t.localeData();
            this._bubble()
        }

        function w(n, t) {
            for (var i in t) p(t, i) && (n[i] = t[i]);
            return p(t, "toString") && (n.toString = t.toString), p(t, "valueOf") && (n.valueOf = t.valueOf), n
        }

        function ei(n, t) {
            var u, i, r;
            if ("undefined" != typeof t._isAMomentObject && (n._isAMomentObject = t._isAMomentObject), "undefined" != typeof t._i && (n._i = t._i), "undefined" != typeof t._f && (n._f = t._f), "undefined" != typeof t._l && (n._l = t._l), "undefined" != typeof t._strict && (n._strict = t._strict), "undefined" != typeof t._tzm && (n._tzm = t._tzm), "undefined" != typeof t._isUTC && (n._isUTC = t._isUTC), "undefined" != typeof t._offset && (n._offset = t._offset), "undefined" != typeof t._pf && (n._pf = t._pf), "undefined" != typeof t._locale && (n._locale = t._locale), ft.length > 0)
                for (u in ft) i = ft[u], r = t[i], "undefined" != typeof r && (n[i] = r);
            return n
        }

        function s(n) {
            return 0 > n ? Math.ceil(n) : Math.floor(n)
        }

        function r(n, t, i) {
            for (var r = "" + Math.abs(n), u = n >= 0; r.length < t;) r = "0" + r;
            return (u ? i ? "+" : "" : "-") + r
        }

        function oi(n, t) {
            var i = {
                milliseconds: 0,
                months: 0
            };
            return i.months = t.month() - n.month() + 12 * (t.year() - n.year()), n.clone().add(i.months, "M").isAfter(t) && --i.months, i.milliseconds = +t - +n.clone().add(i.months, "M"), i
        }

        function iu(n, t) {
            var i;
            return t = lt(t, n), n.isBefore(t) ? i = oi(n, t) : (i = oi(t, n), i.milliseconds = -i.milliseconds, i.months = -i.months), i
        }

        function si(n, i) {
            return function(r, u) {
                var f, e;
                return null === u || isNaN(+u) || (dr(i, "moment()." + i + "(period, number) is deprecated. Please use moment()." + i + "(number, period)."), e = r, r = u, u = e), r = "string" == typeof r ? +r : r, f = t.duration(r, u), hi(this, f, n), this
            }
        }

        function hi(n, i, r, u) {
            var o = i._milliseconds,
                f = i._days,
                e = i._months;
            u = null == u ? !0 : u;
            o && n._d.setTime(+n._d + o * r);
            f && rr(n, "Date", bt(n, "Date") + f * r);
            e && ir(n, bt(n, "Month") + e * r);
            u && t.updateOffset(n, f || e)
        }

        function ut(n) {
            return "[object Array]" === Object.prototype.toString.call(n)
        }

        function ht(n) {
            return "[object Date]" === Object.prototype.toString.call(n) || n instanceof Date
        }

        function ci(n, t, r) {
            for (var e = Math.min(n.length, t.length), o = Math.abs(n.length - t.length), f = 0, u = 0; e > u; u++)(r && n[u] !== t[u] || !r && i(n[u]) !== i(t[u])) && f++;
            return f + o
        }

        function f(n) {
            if (n) {
                var t = n.toLowerCase().replace(/(.)s$/, "$1");
                n = ne[n] || te[t] || t
            }
            return n
        }

        function li(n) {
            var i, t, r = {};
            for (t in n) p(n, t) && (i = f(t), i && (r[i] = n[t]));
            return r
        }

        function ru(i) {
            var r, u;
            if (0 === i.indexOf("week")) r = 7, u = "day";
            else {
                if (0 !== i.indexOf("month")) return;
                r = 12;
                u = "month"
            }
            t[i] = function(f, e) {
                var o, s, c = t._locale[i],
                    h = [];
                if ("number" == typeof f && (e = f, f = n), s = function(n) {
                        var i = t().utc().set(u, n);
                        return c.call(t._locale, i, f || "")
                    }, null != e) return s(e);
                for (o = 0; r > o; o++) h.push(s(o));
                return h
            }
        }

        function i(n) {
            var t = +n,
                i = 0;
            return 0 !== t && isFinite(t) && (i = t >= 0 ? Math.floor(t) : Math.ceil(t)), i
        }

        function ct(n, t) {
            return new Date(Date.UTC(n, t + 1, 0)).getUTCDate()
        }

        function ai(n, i, r) {
            return b(t([n, 11, 31 + i - r]), i, r).week
        }

        function vi(n) {
            return yi(n) ? 366 : 365
        }

        function yi(n) {
            return n % 4 == 0 && n % 100 != 0 || n % 400 == 0
        }

        function pi(n) {
            var t;
            n._a && -2 === n._pf.overflow && (t = n._a[a] < 0 || n._a[a] > 11 ? a : n._a[h] < 1 || n._a[h] > ct(n._a[l], n._a[a]) ? h : n._a[e] < 0 || n._a[e] > 24 || 24 === n._a[e] && (0 !== n._a[d] || 0 !== n._a[g] || 0 !== n._a[nt]) ? e : n._a[d] < 0 || n._a[d] > 59 ? d : n._a[g] < 0 || n._a[g] > 59 ? g : n._a[nt] < 0 || n._a[nt] > 999 ? nt : -1, n._pf._overflowDayOfYear && (l > t || t > h) && (t = h), n._pf.overflow = t)
        }

        function wi(t) {
            return null == t._isValid && (t._isValid = !isNaN(t._d.getTime()) && t._pf.overflow < 0 && !t._pf.empty && !t._pf.invalidMonth && !t._pf.nullInput && !t._pf.invalidFormat && !t._pf.userInvalidated, t._strict && (t._isValid = t._isValid && 0 === t._pf.charsLeftOver && 0 === t._pf.unusedTokens.length && t._pf.bigHour === n)), t._isValid
        }

        function bi(n) {
            return n ? n.toLowerCase().replace("_", "-") : n
        }

        function uu(n) {
            for (var i, t, f, r, u = 0; u < n.length;) {
                for (r = bi(n[u]).split("-"), i = r.length, t = bi(n[u + 1]), t = t ? t.split("-") : null; i > 0;) {
                    if (f = ki(r.slice(0, i).join("-"))) return f;
                    if (t && t.length >= i && ci(r, t, !0) >= i - 1) break;
                    i--
                }
                u++
            }
            return null
        }

        function ki(n) {
            var i = null;
            if (!tt[n] && sr) try {
                i = t.locale();
                require("./locale/" + n);
                t.locale(i)
            } catch (r) {}
            return tt[n]
        }

        function lt(n, i) {
            var r, u;
            return i._isUTC ? (r = i.clone(), u = (t.isMoment(n) || ht(n) ? +n : +t(n)) - +r, r._d.setTime(+r._d + u), t.updateOffset(r, !1), r) : t(n).local()
        }

        function fu(n) {
            return n.match(/\[[\s\S]/) ? n.replace(/^\[|\]$/g, "") : n.replace(/\\/g, "")
        }

        function eu(n) {
            for (var i = n.match(hr), t = 0, r = i.length; r > t; t++) i[t] = v[i[t]] ? v[i[t]] : fu(i[t]);
            return function(u) {
                var f = "";
                for (t = 0; r > t; t++) f += i[t] instanceof Function ? i[t].call(u, n) : i[t];
                return f
            }
        }

        function at(n, t) {
            return n.isValid() ? (t = di(t, n.localeData()), ti[t] || (ti[t] = eu(t)), ti[t](n)) : n.localeData().invalidDate()
        }

        function di(n, t) {
            function r(n) {
                return t.longDateFormat(n) || n
            }
            var i = 5;
            for (et.lastIndex = 0; i >= 0 && et.test(n);) n = n.replace(et, r), et.lastIndex = 0, i -= 1;
            return n
        }

        function ou(n, t) {
            var i = t._strict;
            switch (n) {
                case "Q":
                    return lr;
                case "DDDD":
                    return vr;
                case "YYYY":
                case "GGGG":
                case "gggg":
                    return i ? wf : hf;
                case "Y":
                case "G":
                case "g":
                    return kf;
                case "YYYYYY":
                case "YYYYY":
                case "GGGGG":
                case "ggggg":
                    return i ? bf : cf;
                case "S":
                    if (i) return lr;
                case "SS":
                    if (i) return ar;
                case "SSS":
                    if (i) return vr;
                case "DDD":
                    return sf;
                case "MMM":
                case "MMMM":
                case "dd":
                case "ddd":
                case "dddd":
                    return af;
                case "a":
                case "A":
                    return t._locale._meridiemParse;
                case "x":
                    return yf;
                case "X":
                    return pf;
                case "Z":
                case "ZZ":
                    return dt;
                case "T":
                    return vf;
                case "SSSS":
                    return lf;
                case "MM":
                case "DD":
                case "YY":
                case "GG":
                case "gg":
                case "HH":
                case "hh":
                case "mm":
                case "ss":
                case "ww":
                case "WW":
                    return i ? ar : cr;
                case "M":
                case "D":
                case "d":
                case "H":
                case "h":
                case "m":
                case "s":
                case "w":
                case "W":
                case "e":
                case "E":
                    return cr;
                case "Do":
                    return i ? t._locale._ordinalParse : t._locale._ordinalParseLenient;
                default:
                    return new RegExp(vu(au(n.replace("\\", "")), "i"))
            }
        }

        function vt(n) {
            n = n || "";
            var r = n.match(dt) || [],
                f = r[r.length - 1] || [],
                t = (f + "").match(gf) || ["-", 0, 0],
                u = +(60 * t[1]) + i(t[2]);
            return "+" === t[0] ? u : -u
        }

        function su(n, r, u) {
            var o, f = u._a;
            switch (n) {
                case "Q":
                    null != r && (f[a] = 3 * (i(r) - 1));
                    break;
                case "M":
                case "MM":
                    null != r && (f[a] = i(r) - 1);
                    break;
                case "MMM":
                case "MMMM":
                    o = u._locale.monthsParse(r, n, u._strict);
                    null != o ? f[a] = o : u._pf.invalidMonth = r;
                    break;
                case "D":
                case "DD":
                    null != r && (f[h] = i(r));
                    break;
                case "Do":
                    null != r && (f[h] = i(parseInt(r.match(/\d{1,2}/)[0], 10)));
                    break;
                case "DDD":
                case "DDDD":
                    null != r && (u._dayOfYear = i(r));
                    break;
                case "YY":
                    f[l] = t.parseTwoDigitYear(r);
                    break;
                case "YYYY":
                case "YYYYY":
                case "YYYYYY":
                    f[l] = i(r);
                    break;
                case "a":
                case "A":
                    u._meridiem = r;
                    break;
                case "h":
                case "hh":
                    u._pf.bigHour = !0;
                case "H":
                case "HH":
                    f[e] = i(r);
                    break;
                case "m":
                case "mm":
                    f[d] = i(r);
                    break;
                case "s":
                case "ss":
                    f[g] = i(r);
                    break;
                case "S":
                case "SS":
                case "SSS":
                case "SSSS":
                    f[nt] = i(1e3 * ("0." + r));
                    break;
                case "x":
                    u._d = new Date(i(r));
                    break;
                case "X":
                    u._d = new Date(1e3 * parseFloat(r));
                    break;
                case "Z":
                case "ZZ":
                    u._useUTC = !0;
                    u._tzm = vt(r);
                    break;
                case "dd":
                case "ddd":
                case "dddd":
                    o = u._locale.weekdaysParse(r);
                    null != o ? (u._w = u._w || {}, u._w.d = o) : u._pf.invalidWeekday = r;
                    break;
                case "w":
                case "ww":
                case "W":
                case "WW":
                case "d":
                case "e":
                case "E":
                    n = n.substr(0, 1);
                case "gggg":
                case "GGGG":
                case "GGGGG":
                    n = n.substr(0, 2);
                    r && (u._w = u._w || {}, u._w[n] = i(r));
                    break;
                case "gg":
                case "GG":
                    u._w = u._w || {};
                    u._w[n] = t.parseTwoDigitYear(r)
            }
        }

        function hu(n) {
            var i, o, f, u, r, e, s;
            i = n._w;
            null != i.GG || null != i.W || null != i.E ? (r = 1, e = 4, o = it(i.GG, n._a[l], b(t(), 1, 4).year), f = it(i.W, 1), u = it(i.E, 1)) : (r = n._locale._week.dow, e = n._locale._week.doy, o = it(i.gg, n._a[l], b(t(), r, e).year), f = it(i.w, 1), null != i.d ? (u = i.d, r > u && ++f) : u = null != i.e ? i.e + r : r);
            s = tf(o, f, u, e, r);
            n._a[l] = s.year;
            n._dayOfYear = s.dayOfYear
        }

        function yt(n) {
            var t, i, r, u, f = [];
            if (!n._d) {
                for (r = lu(n), n._w && null == n._a[h] && null == n._a[a] && hu(n), n._dayOfYear && (u = it(n._a[l], r[l]), n._dayOfYear > vi(u) && (n._pf._overflowDayOfYear = !0), i = wt(u, 0, n._dayOfYear), n._a[a] = i.getUTCMonth(), n._a[h] = i.getUTCDate()), t = 0; 3 > t && null == n._a[t]; ++t) n._a[t] = f[t] = r[t];
                for (; 7 > t; t++) n._a[t] = f[t] = null == n._a[t] ? 2 === t ? 1 : 0 : n._a[t];
                24 === n._a[e] && 0 === n._a[d] && 0 === n._a[g] && 0 === n._a[nt] && (n._nextDay = !0, n._a[e] = 0);
                n._d = (n._useUTC ? wt : ku).apply(null, f);
                null != n._tzm && n._d.setUTCMinutes(n._d.getUTCMinutes() - n._tzm);
                n._nextDay && (n._a[e] = 24)
            }
        }

        function cu(n) {
            var t;
            n._d || (t = li(n._i), n._a = [t.year, t.month, t.day || t.date, t.hour, t.minute, t.second, t.millisecond], yt(n))
        }

        function lu(n) {
            var t = new Date;
            return n._useUTC ? [t.getUTCFullYear(), t.getUTCMonth(), t.getUTCDate()] : [t.getFullYear(), t.getMonth(), t.getDate()]
        }

        function pt(i) {
            if (i._f === t.ISO_8601) return void gi(i);
            i._a = [];
            i._pf.empty = !0;
            for (var r, f, h, u = "" + i._i, l = u.length, c = 0, s = di(i._f, i._locale).match(hr) || [], o = 0; o < s.length; o++) f = s[o], r = (u.match(ou(f, i)) || [])[0], r && (h = u.substr(0, u.indexOf(r)), h.length > 0 && i._pf.unusedInput.push(h), u = u.slice(u.indexOf(r) + r.length), c += r.length), v[f] ? (r ? i._pf.empty = !1 : i._pf.unusedTokens.push(f), su(f, r, i)) : i._strict && !r && i._pf.unusedTokens.push(f);
            i._pf.charsLeftOver = l - c;
            u.length > 0 && i._pf.unusedInput.push(u);
            i._pf.bigHour === !0 && i._a[e] <= 12 && (i._pf.bigHour = n);
            i._a[e] = tu(i._locale, i._a[e], i._meridiem);
            yt(i);
            pi(i)
        }

        function au(n) {
            return n.replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function(n, t, i, r, u) {
                return t || i || r || u
            })
        }

        function vu(n) {
            return n.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&")
        }

        function yu(n) {
            var t, f, u, r, i;
            if (0 === n._f.length) return n._pf.invalidFormat = !0, void(n._d = new Date(NaN));
            for (r = 0; r < n._f.length; r++) i = 0, t = ei({}, n), null != n._useUTC && (t._useUTC = n._useUTC), t._pf = ot(), t._f = n._f[r], pt(t), wi(t) && (i += t._pf.charsLeftOver, i += 10 * t._pf.unusedTokens.length, t._pf.score = i, (null == u || u > i) && (u = i, f = t));
            w(n, f || t)
        }

        function gi(n) {
            var t, i, r = n._i,
                u = df.exec(r);
            if (u) {
                for (n._pf.iso = !0, t = 0, i = gt.length; i > t; t++)
                    if (gt[t][1].exec(r)) {
                        n._f = gt[t][0] + (u[6] || " ");
                        break
                    }
                for (t = 0, i = ni.length; i > t; t++)
                    if (ni[t][1].exec(r)) {
                        n._f += ni[t][0];
                        break
                    }
                r.match(dt) && (n._f += "Z");
                pt(n)
            } else n._isValid = !1
        }

        function pu(n) {
            gi(n);
            n._isValid === !1 && (delete n._isValid, t.createFromInputFallback(n))
        }

        function wu(n, t) {
            for (var r = [], i = 0; i < n.length; ++i) r.push(t(n[i], i));
            return r
        }

        function bu(i) {
            var u, r = i._i;
            r === n ? i._d = new Date : ht(r) ? i._d = new Date(+r) : null !== (u = ff.exec(r)) ? i._d = new Date(+u[1]) : "string" == typeof r ? pu(i) : ut(r) ? (i._a = wu(r.slice(0), function(n) {
                return parseInt(n, 10)
            }), yt(i)) : "object" == typeof r ? cu(i) : "number" == typeof r ? i._d = new Date(r) : t.createFromInputFallback(i)
        }

        function ku(n, t, i, r, u, f, e) {
            var o = new Date(n, t, i, r, u, f, e);
            return 1970 > n && o.setFullYear(n), o
        }

        function wt(n) {
            var t = new Date(Date.UTC.apply(null, arguments));
            return 1970 > n && t.setUTCFullYear(n), t
        }

        function du(n, t) {
            if ("string" == typeof n)
                if (isNaN(n)) {
                    if (n = t.weekdaysParse(n), "number" != typeof n) return null
                } else n = parseInt(n, 10);
            return n
        }

        function gu(n, t, i, r, u) {
            return u.relativeTime(t || 1, !!i, n, r)
        }

        function nf(n, i, r) {
            var u = t.duration(n).abs(),
                c = k(u.as("s")),
                e = k(u.as("m")),
                o = k(u.as("h")),
                s = k(u.as("d")),
                h = k(u.as("M")),
                l = k(u.as("y")),
                f = c < y.s && ["s", c] || 1 === e && ["m"] || e < y.m && ["mm", e] || 1 === o && ["h"] || o < y.h && ["hh", o] || 1 === s && ["d"] || s < y.d && ["dd", s] || 1 === h && ["M"] || h < y.M && ["MM", h] || 1 === l && ["y"] || ["yy", l];
            return f[2] = i, f[3] = +n > 0, f[4] = r, gu.apply({}, f)
        }

        function b(n, i, r) {
            var f, e = r - i,
                u = r - n.day();
            return u > e && (u -= 7), e - 7 > u && (u += 7), f = t(n).add(u, "d"), {
                week: Math.ceil(f.dayOfYear() / 7),
                year: f.year()
            }
        }

        function tf(n, t, i, r, u) {
            var o, e, f = wt(n, 0, 1).getUTCDay();
            return f = 0 === f ? 7 : f, i = null != i ? i : u, o = u - f + (f > r ? 7 : 0) - (u > f ? 7 : 0), e = 7 * (t - 1) + (i - u) + o + 1, {
                year: e > 0 ? n : n - 1,
                dayOfYear: e > 0 ? e : vi(n - 1) + e
            }
        }

        function nr(i) {
            var u, r = i._i,
                f = i._f;
            return i._locale = i._locale || t.localeData(i._l), null === r || f === n && "" === r ? t.invalid({
                nullInput: !0
            }) : ("string" == typeof r && (i._i = r = i._locale.preparse(r)), t.isMoment(r) ? new rt(r, !0) : (f ? ut(f) ? yu(i) : pt(i) : bu(i), u = new rt(i), u._nextDay && (u.add(1, "d"), u._nextDay = n), u))
        }

        function tr(n, i) {
            var u, r;
            if (1 === i.length && ut(i[0]) && (i = i[0]), !i.length) return t();
            for (u = i[0], r = 1; r < i.length; ++r) i[r][n](u) && (u = i[r]);
            return u
        }

        function ir(n, t) {
            var i;
            return "string" == typeof t && (t = n.localeData().monthsParse(t), "number" != typeof t) ? n : (i = Math.min(n.date(), ct(n.year(), t)), n._d["set" + (n._isUTC ? "UTC" : "") + "Month"](t, i), n)
        }

        function bt(n, t) {
            return n._d["get" + (n._isUTC ? "UTC" : "") + t]()
        }

        function rr(n, t, i) {
            return "Month" === t ? ir(n, i) : n._d["set" + (n._isUTC ? "UTC" : "") + t](i)
        }

        function c(n, i) {
            return function(r) {
                return null != r ? (rr(this, n, r), t.updateOffset(this, i), this) : bt(this, n)
            }
        }

        function ur(n) {
            return 400 * n / 146097
        }

        function fr(n) {
            return 146097 * n / 400
        }

        function rf(n) {
            t.duration.fn[n] = function() {
                return this._data[n]
            }
        }

        function er(n) {
            "undefined" == typeof ender && (or = kt.moment, kt.moment = n ? o("Accessing Moment through the global scope is deprecated, and will be removed in an upcoming release.", t) : t)
        }
        for (var t, or, u, kt = "undefined" == typeof global || "undefined" != typeof window && window !== global.window ? this : global, k = Math.round, uf = Object.prototype.hasOwnProperty, l = 0, a = 1, h = 2, e = 3, d = 4, g = 5, nt = 6, tt = {}, ft = [], sr = "undefined" != typeof module && module && module.exports, ff = /^\/?Date\((\-?\d+)/i, ef = /(\-)?(?:(\d*)\.)?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?)?/, of = /^(-)?P(?:(?:([0-9,.]*)Y)?(?:([0-9,.]*)M)?(?:([0-9,.]*)D)?(?:T(?:([0-9,.]*)H)?(?:([0-9,.]*)M)?(?:([0-9,.]*)S)?)?|([0-9,.]*)W)$/, hr = /(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Q|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|S{1,4}|x|X|zz?|ZZ?|.)/g, et = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g, cr = /\d\d?/, sf = /\d{1,3}/, hf = /\d{1,4}/, cf = /[+\-]?\d{1,6}/, lf = /\d+/, af = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i, dt = /Z|[\+\-]\d\d:?\d\d/gi, vf = /T/i, yf = /[\+\-]?\d+/, pf = /[\+\-]?\d+(\.\d{1,3})?/, lr = /\d/, ar = /\d\d/, vr = /\d{3}/, wf = /\d{4}/, bf = /[+-]?\d{6}/, kf = /[+-]?\d+/, df = /^\s*(?:[+-]\d{6}|\d{4})-(?:(\d\d-\d\d)|(W\d\d$)|(W\d\d-\d)|(\d\d\d))((T| )(\d\d(:\d\d(:\d\d(\.\d+)?)?)?)?([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/, gt = [
                ["YYYYYY-MM-DD", /[+-]\d{6}-\d{2}-\d{2}/],
                ["YYYY-MM-DD", /\d{4}-\d{2}-\d{2}/],
                ["GGGG-[W]WW-E", /\d{4}-W\d{2}-\d/],
                ["GGGG-[W]WW", /\d{4}-W\d{2}/],
                ["YYYY-DDD", /\d{4}-\d{3}/]
            ], ni = [
                ["HH:mm:ss.SSSS", /(T| )\d\d:\d\d:\d\d\.\d+/],
                ["HH:mm:ss", /(T| )\d\d:\d\d:\d\d/],
                ["HH:mm", /(T| )\d\d:\d\d/],
                ["HH", /(T| )\d\d/]
            ], gf = /([\+\-]|\d\d)/gi, yr = ("Date|Hours|Minutes|Seconds|Milliseconds".split("|"), {
                Milliseconds: 1,
                Seconds: 1e3,
                Minutes: 6e4,
                Hours: 36e5,
                Days: 864e5,
                Months: 2592e6,
                Years: 31536e6
            }), ne = {
                ms: "millisecond",
                s: "second",
                m: "minute",
                h: "hour",
                d: "day",
                D: "date",
                w: "week",
                W: "isoWeek",
                M: "month",
                Q: "quarter",
                y: "year",
                DDD: "dayOfYear",
                e: "weekday",
                E: "isoWeekday",
                gg: "weekYear",
                GG: "isoWeekYear"
            }, te = {
                dayofyear: "dayOfYear",
                isoweekday: "isoWeekday",
                isoweek: "isoWeek",
                weekyear: "weekYear",
                isoweekyear: "isoWeekYear"
            }, ti = {}, y = {
                s: 45,
                m: 45,
                h: 22,
                d: 26,
                M: 11
            }, pr = "DDD w W M D d".split(" "), wr = "M D H h m s w W".split(" "), v = {
                M: function() {
                    return this.month() + 1
                },
                MMM: function(n) {
                    return this.localeData().monthsShort(this, n)
                },
                MMMM: function(n) {
                    return this.localeData().months(this, n)
                },
                D: function() {
                    return this.date()
                },
                DDD: function() {
                    return this.dayOfYear()
                },
                d: function() {
                    return this.day()
                },
                dd: function(n) {
                    return this.localeData().weekdaysMin(this, n)
                },
                ddd: function(n) {
                    return this.localeData().weekdaysShort(this, n)
                },
                dddd: function(n) {
                    return this.localeData().weekdays(this, n)
                },
                w: function() {
                    return this.week()
                },
                W: function() {
                    return this.isoWeek()
                },
                YY: function() {
                    return r(this.year() % 100, 2)
                },
                YYYY: function() {
                    return r(this.year(), 4)
                },
                YYYYY: function() {
                    return r(this.year(), 5)
                },
                YYYYYY: function() {
                    var n = this.year(),
                        t = n >= 0 ? "+" : "-";
                    return t + r(Math.abs(n), 6)
                },
                gg: function() {
                    return r(this.weekYear() % 100, 2)
                },
                gggg: function() {
                    return r(this.weekYear(), 4)
                },
                ggggg: function() {
                    return r(this.weekYear(), 5)
                },
                GG: function() {
                    return r(this.isoWeekYear() % 100, 2)
                },
                GGGG: function() {
                    return r(this.isoWeekYear(), 4)
                },
                GGGGG: function() {
                    return r(this.isoWeekYear(), 5)
                },
                e: function() {
                    return this.weekday()
                },
                E: function() {
                    return this.isoWeekday()
                },
                a: function() {
                    return this.localeData().meridiem(this.hours(), this.minutes(), !0)
                },
                A: function() {
                    return this.localeData().meridiem(this.hours(), this.minutes(), !1)
                },
                H: function() {
                    return this.hours()
                },
                h: function() {
                    return this.hours() % 12 || 12
                },
                m: function() {
                    return this.minutes()
                },
                s: function() {
                    return this.seconds()
                },
                S: function() {
                    return i(this.milliseconds() / 100)
                },
                SS: function() {
                    return r(i(this.milliseconds() / 10), 2)
                },
                SSS: function() {
                    return r(this.milliseconds(), 3)
                },
                SSSS: function() {
                    return r(this.milliseconds(), 3)
                },
                Z: function() {
                    var n = this.utcOffset(),
                        t = "+";
                    return 0 > n && (n = -n, t = "-"), t + r(i(n / 60), 2) + ":" + r(i(n) % 60, 2)
                },
                ZZ: function() {
                    var n = this.utcOffset(),
                        t = "+";
                    return 0 > n && (n = -n, t = "-"), t + r(i(n / 60), 2) + r(i(n) % 60, 2)
                },
                z: function() {
                    return this.zoneAbbr()
                },
                zz: function() {
                    return this.zoneName()
                },
                x: function() {
                    return this.valueOf()
                },
                X: function() {
                    return this.unix()
                },
                Q: function() {
                    return this.quarter()
                }
            }, br = {}, kr = ["months", "monthsShort", "weekdays", "weekdaysShort", "weekdaysMin"], ii = !1; pr.length;) u = pr.pop(), v[u + "o"] = gr(v[u], u);
        for (; wr.length;) u = wr.pop(), v[u + u] = ui(v[u], 2);
        for (v.DDDD = ui(v.DDD, 3), w(fi.prototype, {
                set: function(n) {
                    var t;
                    for (var i in n) t = n[i], "function" == typeof t ? this[i] = t : this["_" + i] = t;
                    this._ordinalParseLenient = new RegExp(this._ordinalParse.source + "|" + /\d{1,2}/.source)
                },
                _months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
                months: function(n) {
                    return this._months[n.month()]
                },
                _monthsShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
                monthsShort: function(n) {
                    return this._monthsShort[n.month()]
                },
                monthsParse: function(n, i, r) {
                    var u, f, e;
                    for (this._monthsParse || (this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = []), u = 0; 12 > u; u++)
                        if ((f = t.utc([2e3, u]), r && !this._longMonthsParse[u] && (this._longMonthsParse[u] = new RegExp("^" + this.months(f, "").replace(".", "") + "$", "i"), this._shortMonthsParse[u] = new RegExp("^" + this.monthsShort(f, "").replace(".", "") + "$", "i")), r || this._monthsParse[u] || (e = "^" + this.months(f, "") + "|^" + this.monthsShort(f, ""), this._monthsParse[u] = new RegExp(e.replace(".", ""), "i")), r && "MMMM" === i && this._longMonthsParse[u].test(n)) || r && "MMM" === i && this._shortMonthsParse[u].test(n) || !r && this._monthsParse[u].test(n)) return u
                },
                _weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
                weekdays: function(n) {
                    return this._weekdays[n.day()]
                },
                _weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
                weekdaysShort: function(n) {
                    return this._weekdaysShort[n.day()]
                },
                _weekdaysMin: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
                weekdaysMin: function(n) {
                    return this._weekdaysMin[n.day()]
                },
                weekdaysParse: function(n) {
                    var i, r, u;
                    for (this._weekdaysParse || (this._weekdaysParse = []), i = 0; 7 > i; i++)
                        if (this._weekdaysParse[i] || (r = t([2e3, 1]).day(i), u = "^" + this.weekdays(r, "") + "|^" + this.weekdaysShort(r, "") + "|^" + this.weekdaysMin(r, ""), this._weekdaysParse[i] = new RegExp(u.replace(".", ""), "i")), this._weekdaysParse[i].test(n)) return i
                },
                _longDateFormat: {
                    LTS: "h:mm:ss A",
                    LT: "h:mm A",
                    L: "MM/DD/YYYY",
                    LL: "MMMM D, YYYY",
                    LLL: "MMMM D, YYYY LT",
                    LLLL: "dddd, MMMM D, YYYY LT"
                },
                longDateFormat: function(n) {
                    var t = this._longDateFormat[n];
                    return !t && this._longDateFormat[n.toUpperCase()] && (t = this._longDateFormat[n.toUpperCase()].replace(/MMMM|MM|DD|dddd/g, function(n) {
                        return n.slice(1)
                    }), this._longDateFormat[n] = t), t
                },
                isPM: function(n) {
                    return "p" === (n + "").toLowerCase().charAt(0)
                },
                _meridiemParse: /[ap]\.?m?\.?/i,
                meridiem: function(n, t, i) {
                    return n > 11 ? i ? "pm" : "PM" : i ? "am" : "AM"
                },
                _calendar: {
                    sameDay: "[Today at] LT",
                    nextDay: "[Tomorrow at] LT",
                    nextWeek: "dddd [at] LT",
                    lastDay: "[Yesterday at] LT",
                    lastWeek: "[Last] dddd [at] LT",
                    sameElse: "L"
                },
                calendar: function(n, t, i) {
                    var r = this._calendar[n];
                    return "function" == typeof r ? r.apply(t, [i]) : r
                },
                _relativeTime: {
                    future: "in %s",
                    past: "%s ago",
                    s: "a few seconds",
                    m: "a minute",
                    mm: "%d minutes",
                    h: "an hour",
                    hh: "%d hours",
                    d: "a day",
                    dd: "%d days",
                    M: "a month",
                    MM: "%d months",
                    y: "a year",
                    yy: "%d years"
                },
                relativeTime: function(n, t, i, r) {
                    var u = this._relativeTime[i];
                    return "function" == typeof u ? u(n, t, i, r) : u.replace(/%d/i, n)
                },
                pastFuture: function(n, t) {
                    var i = this._relativeTime[n > 0 ? "future" : "past"];
                    return "function" == typeof i ? i(t) : i.replace(/%s/i, t)
                },
                ordinal: function(n) {
                    return this._ordinal.replace("%d", n)
                },
                _ordinal: "%d",
                _ordinalParse: /\d{1,2}/,
                preparse: function(n) {
                    return n
                },
                postformat: function(n) {
                    return n
                },
                week: function(n) {
                    return b(n, this._week.dow, this._week.doy).week
                },
                _week: {
                    dow: 0,
                    doy: 6
                },
                firstDayOfWeek: function() {
                    return this._week.dow
                },
                firstDayOfYear: function() {
                    return this._week.doy
                },
                _invalidDate: "Invalid date",
                invalidDate: function() {
                    return this._invalidDate
                }
            }), t = function(t, i, r, u) {
                var f;
                return "boolean" == typeof r && (u = r, r = n), f = {}, f._isAMomentObject = !0, f._i = t, f._f = i, f._l = r, f._strict = u, f._isUTC = !1, f._pf = ot(), nr(f)
            }, t.suppressDeprecationWarnings = !1, t.createFromInputFallback = o("moment construction falls back to js Date. This is discouraged and will be removed in upcoming major release. Please refer to https://github.com/moment/moment/issues/1407 for more info.", function(n) {
                n._d = new Date(n._i + (n._useUTC ? " UTC" : ""))
            }), t.min = function() {
                var n = [].slice.call(arguments, 0);
                return tr("isBefore", n)
            }, t.max = function() {
                var n = [].slice.call(arguments, 0);
                return tr("isAfter", n)
            }, t.utc = function(t, i, r, u) {
                var f;
                return "boolean" == typeof r && (u = r, r = n), f = {}, f._isAMomentObject = !0, f._useUTC = !0, f._isUTC = !0, f._l = r, f._i = t, f._f = i, f._strict = u, f._pf = ot(), nr(f).utc()
            }, t.unix = function(n) {
                return t(1e3 * n)
            }, t.duration = function(n, r) {
                var o, c, s, l, u = n,
                    f = null;
                return t.isDuration(n) ? u = {
                    ms: n._milliseconds,
                    d: n._days,
                    M: n._months
                } : "number" == typeof n ? (u = {}, r ? u[r] = n : u.milliseconds = n) : (f = ef.exec(n)) ? (o = "-" === f[1] ? -1 : 1, u = {
                    y: 0,
                    d: i(f[h]) * o,
                    h: i(f[e]) * o,
                    m: i(f[d]) * o,
                    s: i(f[g]) * o,
                    ms: i(f[nt]) * o
                }) : (f = of.exec(n)) ? (o = "-" === f[1] ? -1 : 1, s = function(n) {
                    var t = n && parseFloat(n.replace(",", "."));
                    return (isNaN(t) ? 0 : t) * o
                }, u = {
                    y: s(f[2]),
                    M: s(f[3]),
                    d: s(f[4]),
                    h: s(f[5]),
                    m: s(f[6]),
                    s: s(f[7]),
                    w: s(f[8])
                }) : null == u ? u = {} : "object" == typeof u && ("from" in u || "to" in u) && (l = iu(t(u.from), t(u.to)), u = {}, u.ms = l.milliseconds, u.M = l.months), c = new st(u), t.isDuration(n) && p(n, "_locale") && (c._locale = n._locale), c
            }, t.version = "2.9.0", t.defaultFormat = "YYYY-MM-DDTHH:mm:ssZ", t.ISO_8601 = function() {}, t.momentProperties = ft, t.updateOffset = function() {}, t.relativeTimeThreshold = function(t, i) {
                return y[t] === n ? !1 : i === n ? y[t] : (y[t] = i, !0)
            }, t.lang = o("moment.lang is deprecated. Use moment.locale instead.", function(n, i) {
                return t.locale(n, i)
            }), t.locale = function(n, i) {
                var r;
                return n && (r = "undefined" != typeof i ? t.defineLocale(n, i) : t.localeData(n), r && (t.duration._locale = t._locale = r)), t._locale._abbr
            }, t.defineLocale = function(n, i) {
                return null !== i ? (i.abbr = n, tt[n] || (tt[n] = new fi), tt[n].set(i), t.locale(n), tt[n]) : (delete tt[n], null)
            }, t.langData = o("moment.langData is deprecated. Use moment.localeData instead.", function(n) {
                return t.localeData(n)
            }), t.localeData = function(n) {
                var i;
                if (n && n._locale && n._locale._abbr && (n = n._locale._abbr), !n) return t._locale;
                if (!ut(n)) {
                    if (i = ki(n)) return i;
                    n = [n]
                }
                return uu(n)
            }, t.isMoment = function(n) {
                return n instanceof rt || null != n && p(n, "_isAMomentObject")
            }, t.isDuration = function(n) {
                return n instanceof st
            }, u = kr.length - 1; u >= 0; --u) ru(kr[u]);
        t.normalizeUnits = function(n) {
            return f(n)
        };
        t.invalid = function(n) {
            var i = t.utc(NaN);
            return null != n ? w(i._pf, n) : i._pf.userInvalidated = !0, i
        };
        t.parseZone = function() {
            return t.apply(null, arguments).parseZone()
        };
        t.parseTwoDigitYear = function(n) {
            return i(n) + (i(n) > 68 ? 1900 : 2e3)
        };
        t.isDate = ht;
        w(t.fn = rt.prototype, {
            clone: function() {
                return t(this)
            },
            valueOf: function() {
                return +this._d - 6e4 * (this._offset || 0)
            },
            unix: function() {
                return Math.floor(+this / 1e3)
            },
            toString: function() {
                return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")
            },
            toDate: function() {
                return this._offset ? new Date(+this) : this._d
            },
            toISOString: function() {
                var n = t(this).utc();
                return 0 < n.year() && n.year() <= 9999 ? "function" == typeof Date.prototype.toISOString ? this.toDate().toISOString() : at(n, "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]") : at(n, "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]")
            },
            toArray: function() {
                var n = this;
                return [n.year(), n.month(), n.date(), n.hours(), n.minutes(), n.seconds(), n.milliseconds()]
            },
            isValid: function() {
                return wi(this)
            },
            isDSTShifted: function() {
                return this._a ? this.isValid() && ci(this._a, (this._isUTC ? t.utc(this._a) : t(this._a)).toArray()) > 0 : !1
            },
            parsingFlags: function() {
                return w({}, this._pf)
            },
            invalidAt: function() {
                return this._pf.overflow
            },
            utc: function(n) {
                return this.utcOffset(0, n)
            },
            local: function(n) {
                return this._isUTC && (this.utcOffset(0, n), this._isUTC = !1, n && this.subtract(this._dateUtcOffset(), "m")), this
            },
            format: function(n) {
                var i = at(this, n || t.defaultFormat);
                return this.localeData().postformat(i)
            },
            add: si(1, "add"),
            subtract: si(-1, "subtract"),
            diff: function(n, t, i) {
                var r, u, e = lt(n, this),
                    o = 6e4 * (e.utcOffset() - this.utcOffset());
                return t = f(t), "year" === t || "month" === t || "quarter" === t ? (u = nu(this, e), "quarter" === t ? u /= 3 : "year" === t && (u /= 12)) : (r = this - e, u = "second" === t ? r / 1e3 : "minute" === t ? r / 6e4 : "hour" === t ? r / 36e5 : "day" === t ? (r - o) / 864e5 : "week" === t ? (r - o) / 6048e5 : r), i ? u : s(u)
            },
            from: function(n, i) {
                return t.duration({
                    to: this,
                    from: n
                }).locale(this.locale()).humanize(!i)
            },
            fromNow: function(n) {
                return this.from(t(), n)
            },
            calendar: function(n) {
                var r = n || t(),
                    u = lt(r, this).startOf("day"),
                    i = this.diff(u, "days", !0),
                    f = -6 > i ? "sameElse" : -1 > i ? "lastWeek" : 0 > i ? "lastDay" : 1 > i ? "sameDay" : 2 > i ? "nextDay" : 7 > i ? "nextWeek" : "sameElse";
                return this.format(this.localeData().calendar(f, this, t(r)))
            },
            isLeapYear: function() {
                return yi(this.year())
            },
            isDST: function() {
                return this.utcOffset() > this.clone().month(0).utcOffset() || this.utcOffset() > this.clone().month(5).utcOffset()
            },
            day: function(n) {
                var t = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
                return null != n ? (n = du(n, this.localeData()), this.add(n - t, "d")) : t
            },
            month: c("Month", !0),
            startOf: function(n) {
                switch (n = f(n)) {
                    case "year":
                        this.month(0);
                    case "quarter":
                    case "month":
                        this.date(1);
                    case "week":
                    case "isoWeek":
                    case "day":
                        this.hours(0);
                    case "hour":
                        this.minutes(0);
                    case "minute":
                        this.seconds(0);
                    case "second":
                        this.milliseconds(0)
                }
                return "week" === n ? this.weekday(0) : "isoWeek" === n && this.isoWeekday(1), "quarter" === n && this.month(3 * Math.floor(this.month() / 3)), this
            },
            endOf: function(t) {
                return t = f(t), t === n || "millisecond" === t ? this : this.startOf(t).add(1, "isoWeek" === t ? "week" : t).subtract(1, "ms")
            },
            isAfter: function(n, i) {
                var r;
                return i = f("undefined" != typeof i ? i : "millisecond"), "millisecond" === i ? (n = t.isMoment(n) ? n : t(n), +this > +n) : (r = t.isMoment(n) ? +n : +t(n), r < +this.clone().startOf(i))
            },
            isBefore: function(n, i) {
                var r;
                return i = f("undefined" != typeof i ? i : "millisecond"), "millisecond" === i ? (n = t.isMoment(n) ? n : t(n), +n > +this) : (r = t.isMoment(n) ? +n : +t(n), +this.clone().endOf(i) < r)
            },
            isBetween: function(n, t, i) {
                return this.isAfter(n, i) && this.isBefore(t, i)
            },
            isSame: function(n, i) {
                var r;
                return i = f(i || "millisecond"), "millisecond" === i ? (n = t.isMoment(n) ? n : t(n), +this == +n) : (r = +t(n), +this.clone().startOf(i) <= r && r <= +this.clone().endOf(i))
            },
            min: o("moment().min is deprecated, use moment.min instead. https://github.com/moment/moment/issues/1548", function(n) {
                return n = t.apply(null, arguments), this > n ? this : n
            }),
            max: o("moment().max is deprecated, use moment.max instead. https://github.com/moment/moment/issues/1548", function(n) {
                return n = t.apply(null, arguments), n > this ? this : n
            }),
            zone: o("moment().zone is deprecated, use moment().utcOffset instead. https://github.com/moment/moment/issues/1779", function(n, t) {
                return null != n ? ("string" != typeof n && (n = -n), this.utcOffset(n, t), this) : -this.utcOffset()
            }),
            utcOffset: function(n, i) {
                var r, u = this._offset || 0;
                return null != n ? ("string" == typeof n && (n = vt(n)), Math.abs(n) < 16 && (n = 60 * n), !this._isUTC && i && (r = this._dateUtcOffset()), this._offset = n, this._isUTC = !0, null != r && this.add(r, "m"), u !== n && (!i || this._changeInProgress ? hi(this, t.duration(n - u, "m"), 1, !1) : this._changeInProgress || (this._changeInProgress = !0, t.updateOffset(this, !0), this._changeInProgress = null)), this) : this._isUTC ? u : this._dateUtcOffset()
            },
            isLocal: function() {
                return !this._isUTC
            },
            isUtcOffset: function() {
                return this._isUTC
            },
            isUtc: function() {
                return this._isUTC && 0 === this._offset
            },
            zoneAbbr: function() {
                return this._isUTC ? "UTC" : ""
            },
            zoneName: function() {
                return this._isUTC ? "Coordinated Universal Time" : ""
            },
            parseZone: function() {
                return this._tzm ? this.utcOffset(this._tzm) : "string" == typeof this._i && this.utcOffset(vt(this._i)), this
            },
            hasAlignedHourOffset: function(n) {
                return n = n ? t(n).utcOffset() : 0, (this.utcOffset() - n) % 60 == 0
            },
            daysInMonth: function() {
                return ct(this.year(), this.month())
            },
            dayOfYear: function(n) {
                var i = k((t(this).startOf("day") - t(this).startOf("year")) / 864e5) + 1;
                return null == n ? i : this.add(n - i, "d")
            },
            quarter: function(n) {
                return null == n ? Math.ceil((this.month() + 1) / 3) : this.month(3 * (n - 1) + this.month() % 3)
            },
            weekYear: function(n) {
                var t = b(this, this.localeData()._week.dow, this.localeData()._week.doy).year;
                return null == n ? t : this.add(n - t, "y")
            },
            isoWeekYear: function(n) {
                var t = b(this, 1, 4).year;
                return null == n ? t : this.add(n - t, "y")
            },
            week: function(n) {
                var t = this.localeData().week(this);
                return null == n ? t : this.add(7 * (n - t), "d")
            },
            isoWeek: function(n) {
                var t = b(this, 1, 4).week;
                return null == n ? t : this.add(7 * (n - t), "d")
            },
            weekday: function(n) {
                var t = (this.day() + 7 - this.localeData()._week.dow) % 7;
                return null == n ? t : this.add(n - t, "d")
            },
            isoWeekday: function(n) {
                return null == n ? this.day() || 7 : this.day(this.day() % 7 ? n : n - 7)
            },
            isoWeeksInYear: function() {
                return ai(this.year(), 1, 4)
            },
            weeksInYear: function() {
                var n = this.localeData()._week;
                return ai(this.year(), n.dow, n.doy)
            },
            get: function(n) {
                return n = f(n), this[n]()
            },
            set: function(n, t) {
                var i;
                if ("object" == typeof n)
                    for (i in n) this.set(i, n[i]);
                else n = f(n), "function" == typeof this[n] && this[n](t);
                return this
            },
            locale: function(i) {
                var r;
                return i === n ? this._locale._abbr : (r = t.localeData(i), null != r && (this._locale = r), this)
            },
            lang: o("moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.", function(t) {
                return t === n ? this.localeData() : this.locale(t)
            }),
            localeData: function() {
                return this._locale
            },
            _dateUtcOffset: function() {
                return 15 * -Math.round(this._d.getTimezoneOffset() / 15)
            }
        });
        t.fn.millisecond = t.fn.milliseconds = c("Milliseconds", !1);
        t.fn.second = t.fn.seconds = c("Seconds", !1);
        t.fn.minute = t.fn.minutes = c("Minutes", !1);
        t.fn.hour = t.fn.hours = c("Hours", !0);
        t.fn.date = c("Date", !0);
        t.fn.dates = o("dates accessor is deprecated. Use date instead.", c("Date", !0));
        t.fn.year = c("FullYear", !0);
        t.fn.years = o("years accessor is deprecated. Use year instead.", c("FullYear", !0));
        t.fn.days = t.fn.day;
        t.fn.months = t.fn.month;
        t.fn.weeks = t.fn.week;
        t.fn.isoWeeks = t.fn.isoWeek;
        t.fn.quarters = t.fn.quarter;
        t.fn.toJSON = t.fn.toISOString;
        t.fn.isUTC = t.fn.isUtc;
        w(t.duration.fn = st.prototype, {
            _bubble: function() {
                var u, f, e, o = this._milliseconds,
                    t = this._days,
                    i = this._months,
                    n = this._data,
                    r = 0;
                n.milliseconds = o % 1e3;
                u = s(o / 1e3);
                n.seconds = u % 60;
                f = s(u / 60);
                n.minutes = f % 60;
                e = s(f / 60);
                n.hours = e % 24;
                t += s(e / 24);
                r = s(ur(t));
                t -= s(fr(r));
                i += s(t / 30);
                t %= 30;
                r += s(i / 12);
                i %= 12;
                n.days = t;
                n.months = i;
                n.years = r
            },
            abs: function() {
                return this._milliseconds = Math.abs(this._milliseconds), this._days = Math.abs(this._days), this._months = Math.abs(this._months), this._data.milliseconds = Math.abs(this._data.milliseconds), this._data.seconds = Math.abs(this._data.seconds), this._data.minutes = Math.abs(this._data.minutes), this._data.hours = Math.abs(this._data.hours), this._data.months = Math.abs(this._data.months), this._data.years = Math.abs(this._data.years), this
            },
            weeks: function() {
                return s(this.days() / 7)
            },
            valueOf: function() {
                return this._milliseconds + 864e5 * this._days + this._months % 12 * 2592e6 + 31536e6 * i(this._months / 12)
            },
            humanize: function(n) {
                var t = nf(this, !n, this.localeData());
                return n && (t = this.localeData().pastFuture(+this, t)), this.localeData().postformat(t)
            },
            add: function(n, i) {
                var r = t.duration(n, i);
                return this._milliseconds += r._milliseconds, this._days += r._days, this._months += r._months, this._bubble(), this
            },
            subtract: function(n, i) {
                var r = t.duration(n, i);
                return this._milliseconds -= r._milliseconds, this._days -= r._days, this._months -= r._months, this._bubble(), this
            },
            get: function(n) {
                return n = f(n), this[n.toLowerCase() + "s"]()
            },
            as: function(n) {
                var t, i;
                if (n = f(n), "month" === n || "year" === n) return t = this._days + this._milliseconds / 864e5, i = this._months + 12 * ur(t), "month" === n ? i : i / 12;
                switch (t = this._days + Math.round(fr(this._months / 12)), n) {
                    case "week":
                        return t / 7 + this._milliseconds / 6048e5;
                    case "day":
                        return t + this._milliseconds / 864e5;
                    case "hour":
                        return 24 * t + this._milliseconds / 36e5;
                    case "minute":
                        return 1440 * t + this._milliseconds / 6e4;
                    case "second":
                        return 86400 * t + this._milliseconds / 1e3;
                    case "millisecond":
                        return Math.floor(864e5 * t) + this._milliseconds;
                    default:
                        throw new Error("Unknown unit " + n);
                }
            },
            lang: t.fn.lang,
            locale: t.fn.locale,
            toIsoString: o("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)", function() {
                return this.toISOString()
            }),
            toISOString: function() {
                var r = Math.abs(this.years()),
                    u = Math.abs(this.months()),
                    f = Math.abs(this.days()),
                    n = Math.abs(this.hours()),
                    t = Math.abs(this.minutes()),
                    i = Math.abs(this.seconds() + this.milliseconds() / 1e3);
                return this.asSeconds() ? (this.asSeconds() < 0 ? "-" : "") + "P" + (r ? r + "Y" : "") + (u ? u + "M" : "") + (f ? f + "D" : "") + (n || t || i ? "T" : "") + (n ? n + "H" : "") + (t ? t + "M" : "") + (i ? i + "S" : "") : "P0D"
            },
            localeData: function() {
                return this._locale
            },
            toJSON: function() {
                return this.toISOString()
            }
        });
        t.duration.fn.toString = t.duration.fn.toISOString;
        for (u in yr) p(yr, u) && rf(u.toLowerCase());
        t.duration.fn.asMilliseconds = function() {
            return this.as("ms")
        };
        t.duration.fn.asSeconds = function() {
            return this.as("s")
        };
        t.duration.fn.asMinutes = function() {
            return this.as("m")
        };
        t.duration.fn.asHours = function() {
            return this.as("h")
        };
        t.duration.fn.asDays = function() {
            return this.as("d")
        };
        t.duration.fn.asWeeks = function() {
            return this.as("weeks")
        };
        t.duration.fn.asMonths = function() {
            return this.as("M")
        };
        t.duration.fn.asYears = function() {
            return this.as("y")
        };
        t.locale("en", {
            ordinalParse: /\d{1,2}(th|st|nd|rd)/,
            ordinal: function(n) {
                var t = n % 10,
                    r = 1 === i(n % 100 / 10) ? "th" : 1 === t ? "st" : 2 === t ? "nd" : 3 === t ? "rd" : "th";
                return n + r
            }
        });
        sr ? module.exports = t : "function" == typeof define && define.amd ? (define(function(n, i, r) {
            return r.config && r.config() && r.config().noGlobal === !0 && (kt.moment = or), t
        }), er(!0)) : er()
    }.call(this), "undefined" == typeof jQuery) throw new Error("Bootstrap's JavaScript requires jQuery"); + function(n) {
    var t = n.fn.jquery.split(" ")[0].split(".");
    if (t[0] < 2 && t[1] < 9 || 1 == t[0] && 9 == t[1] && t[2] < 1) throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher");
}(jQuery); + function(n) {
    "use strict";

    function t() {
        var i = document.createElement("bootstrap"),
            n = {
                WebkitTransition: "webkitTransitionEnd",
                MozTransition: "transitionend",
                OTransition: "oTransitionEnd otransitionend",
                transition: "transitionend"
            };
        for (var t in n)
            if (void 0 !== i.style[t]) return {
                end: n[t]
            };
        return !1
    }
    n.fn.emulateTransitionEnd = function(t) {
        var i = !1,
            u = this,
            r;
        n(this).one("bsTransitionEnd", function() {
            i = !0
        });
        return r = function() {
            i || n(u).trigger(n.support.transition.end)
        }, setTimeout(r, t), this
    };
    n(function() {
        n.support.transition = t();
        n.support.transition && (n.event.special.bsTransitionEnd = {
            bindType: n.support.transition.end,
            delegateType: n.support.transition.end,
            handle: function(t) {
                if (n(t.target).is(this)) return t.handleObj.handler.apply(this, arguments)
            }
        })
    })
}(jQuery); + function(n) {
    "use strict";

    function u(i) {
        return this.each(function() {
            var r = n(this),
                u = r.data("bs.alert");
            u || r.data("bs.alert", u = new t(this));
            "string" == typeof i && u[i].call(r)
        })
    }
    var i = '[data-dismiss="alert"]',
        t = function(t) {
            n(t).on("click", i, this.close)
        },
        r;
    t.VERSION = "3.3.0";
    t.TRANSITION_DURATION = 150;
    t.prototype.close = function(i) {
        function e() {
            r.detach().trigger("closed.bs.alert").remove()
        }
        var f = n(this),
            u = f.attr("data-target"),
            r;
        u || (u = f.attr("href"), u = u && u.replace(/.*(?=#[^\s]*$)/, ""));
        r = n(u);
        i && i.preventDefault();
        r.length || (r = f.closest(".alert"));
        r.trigger(i = n.Event("close.bs.alert"));
        i.isDefaultPrevented() || (r.removeClass("in"), n.support.transition && r.hasClass("fade") ? r.one("bsTransitionEnd", e).emulateTransitionEnd(t.TRANSITION_DURATION) : e())
    };
    r = n.fn.alert;
    n.fn.alert = u;
    n.fn.alert.Constructor = t;
    n.fn.alert.noConflict = function() {
        return n.fn.alert = r, this
    };
    n(document).on("click.bs.alert.data-api", i, t.prototype.close)
}(jQuery); + function(n) {
    "use strict";

    function i(i) {
        return this.each(function() {
            var u = n(this),
                r = u.data("bs.button"),
                f = "object" == typeof i && i;
            r || u.data("bs.button", r = new t(this, f));
            "toggle" == i ? r.toggle() : i && r.setState(i)
        })
    }
    var t = function(i, r) {
            this.$element = n(i);
            this.options = n.extend({}, t.DEFAULTS, r);
            this.isLoading = !1
        },
        r;
    t.VERSION = "3.3.0";
    t.DEFAULTS = {
        loadingText: "loading..."
    };
    t.prototype.setState = function(t) {
        var r = "disabled",
            i = this.$element,
            f = i.is("input") ? "val" : "html",
            u = i.data();
        t += "Text";
        null == u.resetText && i.data("resetText", i[f]());
        setTimeout(n.proxy(function() {
            i[f](null == u[t] ? this.options[t] : u[t]);
            "loadingText" == t ? (this.isLoading = !0, i.addClass(r).attr(r, r)) : this.isLoading && (this.isLoading = !1, i.removeClass(r).removeAttr(r))
        }, this), 0)
    };
    t.prototype.toggle = function() {
        var t = !0,
            i = this.$element.closest('[data-toggle="buttons"]'),
            n;
        i.length ? (n = this.$element.find("input"), "radio" == n.prop("type") && (n.prop("checked") && this.$element.hasClass("active") ? t = !1 : i.find(".active").removeClass("active")), t && n.prop("checked", !this.$element.hasClass("active")).trigger("change")) : this.$element.attr("aria-pressed", !this.$element.hasClass("active"));
        t && this.$element.toggleClass("active")
    };
    r = n.fn.button;
    n.fn.button = i;
    n.fn.button.Constructor = t;
    n.fn.button.noConflict = function() {
        return n.fn.button = r, this
    };
    n(document).on("click.bs.button.data-api", '[data-toggle^="button"]', function(t) {
        var r = n(t.target);
        r.hasClass("btn") || (r = r.closest(".btn"));
        i.call(r, "toggle");
        t.preventDefault()
    }).on("focus.bs.button.data-api blur.bs.button.data-api", '[data-toggle^="button"]', function(t) {
        n(t.target).closest(".btn").toggleClass("focus", "focus" == t.type)
    })
}(jQuery); + function(n) {
    "use strict";

    function i(i) {
        return this.each(function() {
            var u = n(this),
                r = u.data("bs.carousel"),
                f = n.extend({}, t.DEFAULTS, u.data(), "object" == typeof i && i),
                e = "string" == typeof i ? i : f.slide;
            r || u.data("bs.carousel", r = new t(this, f));
            "number" == typeof i ? r.to(i) : e ? r[e]() : f.interval && r.pause().cycle()
        })
    }
    var t = function(t, i) {
            this.$element = n(t);
            this.$indicators = this.$element.find(".carousel-indicators");
            this.options = i;
            this.paused = this.sliding = this.interval = this.$active = this.$items = null;
            this.options.keyboard && this.$element.on("keydown.bs.carousel", n.proxy(this.keydown, this));
            "hover" == this.options.pause && !("ontouchstart" in document.documentElement) && this.$element.on("mouseenter.bs.carousel", n.proxy(this.pause, this)).on("mouseleave.bs.carousel", n.proxy(this.cycle, this))
        },
        u, r;
    t.VERSION = "3.3.0";
    t.TRANSITION_DURATION = 600;
    t.DEFAULTS = {
        interval: 5e3,
        pause: "hover",
        wrap: !0,
        keyboard: !0
    };
    t.prototype.keydown = function(n) {
        switch (n.which) {
            case 37:
                this.prev();
                break;
            case 39:
                this.next();
                break;
            default:
                return
        }
        n.preventDefault()
    };
    t.prototype.cycle = function(t) {
        return t || (this.paused = !1), this.interval && clearInterval(this.interval), this.options.interval && !this.paused && (this.interval = setInterval(n.proxy(this.next, this), this.options.interval)), this
    };
    t.prototype.getItemIndex = function(n) {
        return this.$items = n.parent().children(".item"), this.$items.index(n || this.$active)
    };
    t.prototype.getItemForDirection = function(n, t) {
        var i = "prev" == n ? -1 : 1,
            r = this.getItemIndex(t),
            u = (r + i) % this.$items.length;
        return this.$items.eq(u)
    };
    t.prototype.to = function(n) {
        var i = this,
            t = this.getItemIndex(this.$active = this.$element.find(".item.active"));
        if (!(n > this.$items.length - 1) && !(0 > n)) return this.sliding ? this.$element.one("slid.bs.carousel", function() {
            i.to(n)
        }) : t == n ? this.pause().cycle() : this.slide(n > t ? "next" : "prev", this.$items.eq(n))
    };
    t.prototype.pause = function(t) {
        return t || (this.paused = !0), this.$element.find(".next, .prev").length && n.support.transition && (this.$element.trigger(n.support.transition.end), this.cycle(!0)), this.interval = clearInterval(this.interval), this
    };
    t.prototype.next = function() {
        if (!this.sliding) return this.slide("next")
    };
    t.prototype.prev = function() {
        if (!this.sliding) return this.slide("prev")
    };
    t.prototype.slide = function(i, r) {
        var e = this.$element.find(".item.active"),
            u = r || this.getItemForDirection(i, e),
            l = this.interval,
            f = "next" == i ? "left" : "right",
            v = "next" == i ? "first" : "last",
            a = this,
            o, s, h, c;
        if (!u.length) {
            if (!this.options.wrap) return;
            u = this.$element.find(".item")[v]()
        }
        return u.hasClass("active") ? this.sliding = !1 : (o = u[0], s = n.Event("slide.bs.carousel", {
            relatedTarget: o,
            direction: f
        }), (this.$element.trigger(s), !s.isDefaultPrevented()) ? ((this.sliding = !0, l && this.pause(), this.$indicators.length) && (this.$indicators.find(".active").removeClass("active"), h = n(this.$indicators.children()[this.getItemIndex(u)]), h && h.addClass("active")), c = n.Event("slid.bs.carousel", {
            relatedTarget: o,
            direction: f
        }), n.support.transition && this.$element.hasClass("slide") ? (u.addClass(i), u[0].offsetWidth, e.addClass(f), u.addClass(f), e.one("bsTransitionEnd", function() {
            u.removeClass([i, f].join(" ")).addClass("active");
            e.removeClass(["active", f].join(" "));
            a.sliding = !1;
            setTimeout(function() {
                a.$element.trigger(c)
            }, 0)
        }).emulateTransitionEnd(t.TRANSITION_DURATION)) : (e.removeClass("active"), u.addClass("active"), this.sliding = !1, this.$element.trigger(c)), l && this.cycle(), this) : void 0)
    };
    u = n.fn.carousel;
    n.fn.carousel = i;
    n.fn.carousel.Constructor = t;
    n.fn.carousel.noConflict = function() {
        return n.fn.carousel = u, this
    };
    r = function(t) {
        var o, r = n(this),
            u = n(r.attr("data-target") || (o = r.attr("href")) && o.replace(/.*(?=#[^\s]+$)/, "")),
            e, f;
        u.hasClass("carousel") && (e = n.extend({}, u.data(), r.data()), f = r.attr("data-slide-to"), f && (e.interval = !1), i.call(u, e), f && u.data("bs.carousel").to(f), t.preventDefault())
    };
    n(document).on("click.bs.carousel.data-api", "[data-slide]", r).on("click.bs.carousel.data-api", "[data-slide-to]", r);
    n(window).on("load", function() {
        n('[data-ride="carousel"]').each(function() {
            var t = n(this);
            i.call(t, t.data())
        })
    })
}(jQuery); + function(n) {
    "use strict";

    function r(t) {
        var i, r = t.attr("data-target") || (i = t.attr("href")) && i.replace(/.*(?=#[^\s]+$)/, "");
        return n(r)
    }

    function i(i) {
        return this.each(function() {
            var u = n(this),
                r = u.data("bs.collapse"),
                f = n.extend({}, t.DEFAULTS, u.data(), "object" == typeof i && i);
            !r && f.toggle && "show" == i && (f.toggle = !1);
            r || u.data("bs.collapse", r = new t(this, f));
            "string" == typeof i && r[i]()
        })
    }
    var t = function(i, r) {
            this.$element = n(i);
            this.options = n.extend({}, t.DEFAULTS, r);
            this.$trigger = n(this.options.trigger).filter('[href="#' + i.id + '"], [data-target="#' + i.id + '"]');
            this.transitioning = null;
            this.options.parent ? this.$parent = this.getParent() : this.addAriaAndCollapsedClass(this.$element, this.$trigger);
            this.options.toggle && this.toggle()
        },
        u;
    t.VERSION = "3.3.0";
    t.TRANSITION_DURATION = 350;
    t.DEFAULTS = {
        toggle: !0,
        trigger: '[data-toggle="collapse"]'
    };
    t.prototype.dimension = function() {
        var n = this.$element.hasClass("width");
        return n ? "width" : "height"
    };
    t.prototype.show = function() {
        var f, r, e, u, o, s;
        if (!this.transitioning && !this.$element.hasClass("in") && (r = this.$parent && this.$parent.find("> .panel").children(".in, .collapsing"), !(r && r.length && (f = r.data("bs.collapse"), f && f.transitioning)) && (e = n.Event("show.bs.collapse"), this.$element.trigger(e), !e.isDefaultPrevented()))) {
            if (r && r.length && (i.call(r, "hide"), f || r.data("bs.collapse", null)), u = this.dimension(), this.$element.removeClass("collapse").addClass("collapsing")[u](0).attr("aria-expanded", !0), this.$trigger.removeClass("collapsed").attr("aria-expanded", !0), this.transitioning = 1, o = function() {
                    this.$element.removeClass("collapsing").addClass("collapse in")[u]("");
                    this.transitioning = 0;
                    this.$element.trigger("shown.bs.collapse")
                }, !n.support.transition) return o.call(this);
            s = n.camelCase(["scroll", u].join("-"));
            this.$element.one("bsTransitionEnd", n.proxy(o, this)).emulateTransitionEnd(t.TRANSITION_DURATION)[u](this.$element[0][s])
        }
    };
    t.prototype.hide = function() {
        var r, i, u;
        if (!this.transitioning && this.$element.hasClass("in") && (r = n.Event("hide.bs.collapse"), this.$element.trigger(r), !r.isDefaultPrevented())) return i = this.dimension(), this.$element[i](this.$element[i]())[0].offsetHeight, this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded", !1), this.$trigger.addClass("collapsed").attr("aria-expanded", !1), this.transitioning = 1, u = function() {
            this.transitioning = 0;
            this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse")
        }, n.support.transition ? void this.$element[i](0).one("bsTransitionEnd", n.proxy(u, this)).emulateTransitionEnd(t.TRANSITION_DURATION) : u.call(this)
    };
    t.prototype.toggle = function() {
        this[this.$element.hasClass("in") ? "hide" : "show"]()
    };
    t.prototype.getParent = function() {
        return n(this.options.parent).find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]').each(n.proxy(function(t, i) {
            var u = n(i);
            this.addAriaAndCollapsedClass(r(u), u)
        }, this)).end()
    };
    t.prototype.addAriaAndCollapsedClass = function(n, t) {
        var i = n.hasClass("in");
        n.attr("aria-expanded", i);
        t.toggleClass("collapsed", !i).attr("aria-expanded", i)
    };
    u = n.fn.collapse;
    n.fn.collapse = i;
    n.fn.collapse.Constructor = t;
    n.fn.collapse.noConflict = function() {
        return n.fn.collapse = u, this
    };
    n(document).on("click.bs.collapse.data-api", '[data-toggle="collapse"]', function(t) {
        var u = n(this);
        u.attr("data-target") || t.preventDefault();
        var f = r(u),
            e = f.data("bs.collapse"),
            o = e ? "toggle" : n.extend({}, u.data(), {
                trigger: this
            });
        i.call(f, o)
    })
}(jQuery); + function(n) {
    "use strict";

    function r(t) {
        t && 3 === t.which || (n(o).remove(), n(i).each(function() {
            var r = n(this),
                i = u(r),
                f = {
                    relatedTarget: this
                };
            i.hasClass("open") && (i.trigger(t = n.Event("hide.bs.dropdown", f)), t.isDefaultPrevented() || (r.attr("aria-expanded", "false"), i.removeClass("open").trigger("hidden.bs.dropdown", f)))
        }))
    }

    function u(t) {
        var i = t.attr("data-target"),
            r;
        return i || (i = t.attr("href"), i = i && /#[A-Za-z]/.test(i) && i.replace(/.*(?=#[^\s]*$)/, "")), r = i && n(i), r && r.length ? r : t.parent()
    }

    function e(i) {
        return this.each(function() {
            var r = n(this),
                u = r.data("bs.dropdown");
            u || r.data("bs.dropdown", u = new t(this));
            "string" == typeof i && u[i].call(r)
        })
    }
    var o = ".dropdown-backdrop",
        i = '[data-toggle="dropdown"]',
        t = function(t) {
            n(t).on("click.bs.dropdown", this.toggle)
        },
        f;
    t.VERSION = "3.3.0";
    t.prototype.toggle = function(t) {
        var f = n(this),
            i, o, e;
        if (!f.is(".disabled, :disabled")) {
            if (i = u(f), o = i.hasClass("open"), r(), !o) {
                if ("ontouchstart" in document.documentElement && !i.closest(".navbar-nav").length && n('<div class="dropdown-backdrop"/>').insertAfter(n(this)).on("click", r), e = {
                        relatedTarget: this
                    }, i.trigger(t = n.Event("show.bs.dropdown", e)), t.isDefaultPrevented()) return;
                f.trigger("focus").attr("aria-expanded", "true");
                i.toggleClass("open").trigger("shown.bs.dropdown", e)
            }
            return !1
        }
    };
    t.prototype.keydown = function(t) {
        var e, o, s, h, f, r;
        if (/(38|40|27|32)/.test(t.which) && (e = n(this), t.preventDefault(), t.stopPropagation(), !e.is(".disabled, :disabled"))) {
            if (o = u(e), s = o.hasClass("open"), !s && 27 != t.which || s && 27 == t.which) return 27 == t.which && o.find(i).trigger("focus"), e.trigger("click");
            h = " li:not(.divider):visible a";
            f = o.find('[role="menu"]' + h + ', [role="listbox"]' + h);
            f.length && (r = f.index(t.target), 38 == t.which && r > 0 && r--, 40 == t.which && r < f.length - 1 && r++, ~r || (r = 0), f.eq(r).trigger("focus"))
        }
    };
    f = n.fn.dropdown;
    n.fn.dropdown = e;
    n.fn.dropdown.Constructor = t;
    n.fn.dropdown.noConflict = function() {
        return n.fn.dropdown = f, this
    };
    n(document).on("click.bs.dropdown.data-api", r).on("click.bs.dropdown.data-api", ".dropdown form", function(n) {
        n.stopPropagation()
    }).on("click.bs.dropdown.data-api", i, t.prototype.toggle).on("keydown.bs.dropdown.data-api", i, t.prototype.keydown).on("keydown.bs.dropdown.data-api", '[role="menu"]', t.prototype.keydown).on("keydown.bs.dropdown.data-api", '[role="listbox"]', t.prototype.keydown)
}(jQuery); + function(n) {
    "use strict";

    function i(i, r) {
        return this.each(function() {
            var f = n(this),
                u = f.data("bs.modal"),
                e = n.extend({}, t.DEFAULTS, f.data(), "object" == typeof i && i);
            u || f.data("bs.modal", u = new t(this, e));
            "string" == typeof i ? u[i](r) : e.show && u.show(r)
        })
    }
    var t = function(t, i) {
            this.options = i;
            this.$body = n(document.body);
            this.$element = n(t);
            this.$backdrop = this.isShown = null;
            this.scrollbarWidth = 0;
            this.options.remote && this.$element.find(".modal-content").load(this.options.remote, n.proxy(function() {
                this.$element.trigger("loaded.bs.modal")
            }, this))
        },
        r;
    t.VERSION = "3.3.0";
    t.TRANSITION_DURATION = 300;
    t.BACKDROP_TRANSITION_DURATION = 150;
    t.DEFAULTS = {
        backdrop: !0,
        keyboard: !0,
        show: !0
    };
    t.prototype.toggle = function(n) {
        return this.isShown ? this.hide() : this.show(n)
    };
    t.prototype.show = function(i) {
        var r = this,
            u = n.Event("show.bs.modal", {
                relatedTarget: i
            });
        this.$element.trigger(u);
        this.isShown || u.isDefaultPrevented() || (this.isShown = !0, this.checkScrollbar(), this.$body.addClass("modal-open"), this.setScrollbar(), this.escape(), this.$element.on("click.dismiss.bs.modal", '[data-dismiss="modal"]', n.proxy(this.hide, this)), this.backdrop(function() {
            var f = n.support.transition && r.$element.hasClass("fade"),
                u;
            r.$element.parent().length || r.$element.appendTo(r.$body);
            r.$element.show().scrollTop(0);
            f && r.$element[0].offsetWidth;
            r.$element.addClass("in").attr("aria-hidden", !1);
            r.enforceFocus();
            u = n.Event("shown.bs.modal", {
                relatedTarget: i
            });
            f ? r.$element.find(".modal-dialog").one("bsTransitionEnd", function() {
                r.$element.trigger("focus").trigger(u)
            }).emulateTransitionEnd(t.TRANSITION_DURATION) : r.$element.trigger("focus").trigger(u)
        }))
    };
    t.prototype.hide = function(i) {
        i && i.preventDefault();
        i = n.Event("hide.bs.modal");
        this.$element.trigger(i);
        this.isShown && !i.isDefaultPrevented() && (this.isShown = !1, this.escape(), n(document).off("focusin.bs.modal"), this.$element.removeClass("in").attr("aria-hidden", !0).off("click.dismiss.bs.modal"), n.support.transition && this.$element.hasClass("fade") ? this.$element.one("bsTransitionEnd", n.proxy(this.hideModal, this)).emulateTransitionEnd(t.TRANSITION_DURATION) : this.hideModal())
    };
    t.prototype.enforceFocus = function() {
        n(document).off("focusin.bs.modal").on("focusin.bs.modal", n.proxy(function(n) {
            this.$element[0] === n.target || this.$element.has(n.target).length || this.$element.trigger("focus")
        }, this))
    };
    t.prototype.escape = function() {
        this.isShown && this.options.keyboard ? this.$element.on("keydown.dismiss.bs.modal", n.proxy(function(n) {
            27 == n.which && this.hide()
        }, this)) : this.isShown || this.$element.off("keydown.dismiss.bs.modal")
    };
    t.prototype.hideModal = function() {
        var n = this;
        this.$element.hide();
        this.backdrop(function() {
            n.$body.removeClass("modal-open");
            n.resetScrollbar();
            n.$element.trigger("hidden.bs.modal")
        })
    };
    t.prototype.removeBackdrop = function() {
        this.$backdrop && this.$backdrop.remove();
        this.$backdrop = null
    };
    t.prototype.backdrop = function(i) {
        var e = this,
            f = this.$element.hasClass("fade") ? "fade" : "",
            r, u;
        if (this.isShown && this.options.backdrop) {
            if (r = n.support.transition && f, this.$backdrop = n('<div class="modal-backdrop ' + f + '" />').prependTo(this.$element).on("click.dismiss.bs.modal", n.proxy(function(n) {
                    n.target === n.currentTarget && ("static" == this.options.backdrop ? this.$element[0].focus.call(this.$element[0]) : this.hide.call(this))
                }, this)), r && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), !i) return;
            r ? this.$backdrop.one("bsTransitionEnd", i).emulateTransitionEnd(t.BACKDROP_TRANSITION_DURATION) : i()
        } else !this.isShown && this.$backdrop ? (this.$backdrop.removeClass("in"), u = function() {
            e.removeBackdrop();
            i && i()
        }, n.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one("bsTransitionEnd", u).emulateTransitionEnd(t.BACKDROP_TRANSITION_DURATION) : u()) : i && i()
    };
    t.prototype.checkScrollbar = function() {
        this.scrollbarWidth = this.measureScrollbar()
    };
    t.prototype.setScrollbar = function() {
        var n = parseInt(this.$body.css("padding-right") || 0, 10);
        this.scrollbarWidth && this.$body.css("padding-right", n + this.scrollbarWidth)
    };
    t.prototype.resetScrollbar = function() {
        this.$body.css("padding-right", "")
    };
    t.prototype.measureScrollbar = function() {
        var n, t;
        return document.body.clientWidth >= window.innerWidth ? 0 : (n = document.createElement("div"), n.className = "modal-scrollbar-measure", this.$body.append(n), t = n.offsetWidth - n.clientWidth, this.$body[0].removeChild(n), t)
    };
    r = n.fn.modal;
    n.fn.modal = i;
    n.fn.modal.Constructor = t;
    n.fn.modal.noConflict = function() {
        return n.fn.modal = r, this
    };
    n(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function(t) {
        var r = n(this),
            f = r.attr("href"),
            u = n(r.attr("data-target") || f && f.replace(/.*(?=#[^\s]+$)/, "")),
            e = u.data("bs.modal") ? "toggle" : n.extend({
                remote: !/#/.test(f) && f
            }, u.data(), r.data());
        r.is("a") && t.preventDefault();
        u.one("show.bs.modal", function(n) {
            n.isDefaultPrevented() || u.one("hidden.bs.modal", function() {
                r.is(":visible") && r.trigger("focus")
            })
        });
        i.call(u, e, this)
    })
}(jQuery); + function(n) {
    "use strict";

    function r(i) {
        return this.each(function() {
            var f = n(this),
                r = f.data("bs.tooltip"),
                u = "object" == typeof i && i,
                e = u && u.selector;
            (r || "destroy" != i) && (e ? (r || f.data("bs.tooltip", r = {}), r[e] || (r[e] = new t(this, u))) : r || f.data("bs.tooltip", r = new t(this, u)), "string" == typeof i && r[i]())
        })
    }
    var t = function(n, t) {
            this.type = this.options = this.enabled = this.timeout = this.hoverState = this.$element = null;
            this.init("tooltip", n, t)
        },
        i;
    t.VERSION = "3.3.0";
    t.TRANSITION_DURATION = 150;
    t.DEFAULTS = {
        animation: !0,
        placement: "top",
        selector: !1,
        template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"><\/div><div class="tooltip-inner"><\/div><\/div>',
        trigger: "hover focus",
        title: "",
        delay: 0,
        html: !1,
        container: !1,
        viewport: {
            selector: "body",
            padding: 0
        }
    };
    t.prototype.init = function(t, i, r) {
        var f, e, u, o, s;
        for (this.enabled = !0, this.type = t, this.$element = n(i), this.options = this.getOptions(r), this.$viewport = this.options.viewport && n(this.options.viewport.selector || this.options.viewport), f = this.options.trigger.split(" "), e = f.length; e--;)
            if (u = f[e], "click" == u) this.$element.on("click." + this.type, this.options.selector, n.proxy(this.toggle, this));
            else "manual" != u && (o = "hover" == u ? "mouseenter" : "focusin", s = "hover" == u ? "mouseleave" : "focusout", this.$element.on(o + "." + this.type, this.options.selector, n.proxy(this.enter, this)), this.$element.on(s + "." + this.type, this.options.selector, n.proxy(this.leave, this)));
        this.options.selector ? this._options = n.extend({}, this.options, {
            trigger: "manual",
            selector: ""
        }) : this.fixTitle()
    };
    t.prototype.getDefaults = function() {
        return t.DEFAULTS
    };
    t.prototype.getOptions = function(t) {
        return t = n.extend({}, this.getDefaults(), this.$element.data(), t), t.delay && "number" == typeof t.delay && (t.delay = {
            show: t.delay,
            hide: t.delay
        }), t
    };
    t.prototype.getDelegateOptions = function() {
        var t = {},
            i = this.getDefaults();
        return this._options && n.each(this._options, function(n, r) {
            i[n] != r && (t[n] = r)
        }), t
    };
    t.prototype.enter = function(t) {
        var i = t instanceof this.constructor ? t : n(t.currentTarget).data("bs." + this.type);
        return i && i.$tip && i.$tip.is(":visible") ? void(i.hoverState = "in") : (i || (i = new this.constructor(t.currentTarget, this.getDelegateOptions()), n(t.currentTarget).data("bs." + this.type, i)), clearTimeout(i.timeout), i.hoverState = "in", i.options.delay && i.options.delay.show ? void(i.timeout = setTimeout(function() {
            "in" == i.hoverState && i.show()
        }, i.options.delay.show)) : i.show())
    };
    t.prototype.leave = function(t) {
        var i = t instanceof this.constructor ? t : n(t.currentTarget).data("bs." + this.type);
        return i || (i = new this.constructor(t.currentTarget, this.getDelegateOptions()), n(t.currentTarget).data("bs." + this.type, i)), clearTimeout(i.timeout), i.hoverState = "out", i.options.delay && i.options.delay.hide ? void(i.timeout = setTimeout(function() {
            "out" == i.hoverState && i.hide()
        }, i.options.delay.hide)) : i.hide()
    };
    t.prototype.show = function() {
        var c = n.Event("show.bs." + this.type),
            l, p, h;
        if (this.hasContent() && this.enabled) {
            if (this.$element.trigger(c), l = n.contains(this.$element[0].ownerDocument.documentElement, this.$element[0]), c.isDefaultPrevented() || !l) return;
            var u = this,
                r = this.tip(),
                a = this.getUID(this.type);
            this.setContent();
            r.attr("id", a);
            this.$element.attr("aria-describedby", a);
            this.options.animation && r.addClass("fade");
            var i = "function" == typeof this.options.placement ? this.options.placement.call(this, r[0], this.$element[0]) : this.options.placement,
                v = /\s?auto?\s?/i,
                y = v.test(i);
            y && (i = i.replace(v, "") || "top");
            r.detach().css({
                top: 0,
                left: 0,
                display: "block"
            }).addClass(i).data("bs." + this.type, this);
            this.options.container ? r.appendTo(this.options.container) : r.insertAfter(this.$element);
            var f = this.getPosition(),
                o = r[0].offsetWidth,
                s = r[0].offsetHeight;
            if (y) {
                var w = i,
                    b = this.options.container ? n(this.options.container) : this.$element.parent(),
                    e = this.getPosition(b);
                i = "bottom" == i && f.bottom + s > e.bottom ? "top" : "top" == i && f.top - s < e.top ? "bottom" : "right" == i && f.right + o > e.width ? "left" : "left" == i && f.left - o < e.left ? "right" : i;
                r.removeClass(w).addClass(i)
            }
            p = this.getCalculatedOffset(i, f, o, s);
            this.applyPlacement(p, i);
            h = function() {
                var n = u.hoverState;
                u.$element.trigger("shown.bs." + u.type);
                u.hoverState = null;
                "out" == n && u.leave(u)
            };
            n.support.transition && this.$tip.hasClass("fade") ? r.one("bsTransitionEnd", h).emulateTransitionEnd(t.TRANSITION_DURATION) : h()
        }
    };
    t.prototype.applyPlacement = function(t, i) {
        var r = this.tip(),
            l = r[0].offsetWidth,
            e = r[0].offsetHeight,
            o = parseInt(r.css("margin-top"), 10),
            s = parseInt(r.css("margin-left"), 10),
            h, f, u;
        isNaN(o) && (o = 0);
        isNaN(s) && (s = 0);
        t.top = t.top + o;
        t.left = t.left + s;
        n.offset.setOffset(r[0], n.extend({
            using: function(n) {
                r.css({
                    top: Math.round(n.top),
                    left: Math.round(n.left)
                })
            }
        }, t), 0);
        r.addClass("in");
        h = r[0].offsetWidth;
        f = r[0].offsetHeight;
        "top" == i && f != e && (t.top = t.top + e - f);
        u = this.getViewportAdjustedDelta(i, t, h, f);
        u.left ? t.left += u.left : t.top += u.top;
        var c = /top|bottom/.test(i),
            a = c ? 2 * u.left - l + h : 2 * u.top - e + f,
            v = c ? "offsetWidth" : "offsetHeight";
        r.offset(t);
        this.replaceArrow(a, r[0][v], c)
    };
    t.prototype.replaceArrow = function(n, t, i) {
        this.arrow().css(i ? "left" : "top", 50 * (1 - n / t) + "%").css(i ? "top" : "left", "")
    };
    t.prototype.setContent = function() {
        var n = this.tip(),
            t = this.getTitle();
        n.find(".tooltip-inner")[this.options.html ? "html" : "text"](t);
        n.removeClass("fade in top bottom left right")
    };
    t.prototype.hide = function(i) {
        function f() {
            "in" != r.hoverState && u.detach();
            r.$element.removeAttr("aria-describedby").trigger("hidden.bs." + r.type);
            i && i()
        }
        var r = this,
            u = this.tip(),
            e = n.Event("hide.bs." + this.type);
        return this.$element.trigger(e), e.isDefaultPrevented() ? void 0 : (u.removeClass("in"), n.support.transition && this.$tip.hasClass("fade") ? u.one("bsTransitionEnd", f).emulateTransitionEnd(t.TRANSITION_DURATION) : f(), this.hoverState = null, this)
    };
    t.prototype.fixTitle = function() {
        var n = this.$element;
        (n.attr("title") || "string" != typeof n.attr("data-original-title")) && n.attr("data-original-title", n.attr("title") || "").attr("title", "")
    };
    t.prototype.hasContent = function() {
        return this.getTitle()
    };
    t.prototype.getPosition = function(t) {
        t = t || this.$element;
        var u = t[0],
            r = "BODY" == u.tagName,
            i = u.getBoundingClientRect();
        null == i.width && (i = n.extend({}, i, {
            width: i.right - i.left,
            height: i.bottom - i.top
        }));
        var f = r ? {
                top: 0,
                left: 0
            } : t.offset(),
            e = {
                scroll: r ? document.documentElement.scrollTop || document.body.scrollTop : t.scrollTop()
            },
            o = r ? {
                width: n(window).width(),
                height: n(window).height()
            } : null;
        return n.extend({}, i, e, o, f)
    };
    t.prototype.getCalculatedOffset = function(n, t, i, r) {
        return "bottom" == n ? {
            top: t.top + t.height,
            left: t.left + t.width / 2 - i / 2
        } : "top" == n ? {
            top: t.top - r,
            left: t.left + t.width / 2 - i / 2
        } : "left" == n ? {
            top: t.top + t.height / 2 - r / 2,
            left: t.left - i
        } : {
            top: t.top + t.height / 2 - r / 2,
            left: t.left + t.width
        }
    };
    t.prototype.getViewportAdjustedDelta = function(n, t, i, r) {
        var f = {
                top: 0,
                left: 0
            },
            e, u, o, s, h, c;
        return this.$viewport ? (e = this.options.viewport && this.options.viewport.padding || 0, u = this.getPosition(this.$viewport), /right|left/.test(n) ? (o = t.top - e - u.scroll, s = t.top + e - u.scroll + r, o < u.top ? f.top = u.top - o : s > u.top + u.height && (f.top = u.top + u.height - s)) : (h = t.left - e, c = t.left + e + i, h < u.left ? f.left = u.left - h : c > u.width && (f.left = u.left + u.width - c)), f) : f
    };
    t.prototype.getTitle = function() {
        var t = this.$element,
            n = this.options;
        return t.attr("data-original-title") || ("function" == typeof n.title ? n.title.call(t[0]) : n.title)
    };
    t.prototype.getUID = function(n) {
        do n += ~~(1e6 * Math.random()); while (document.getElementById(n));
        return n
    };
    t.prototype.tip = function() {
        return this.$tip = this.$tip || n(this.options.template)
    };
    t.prototype.arrow = function() {
        return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow")
    };
    t.prototype.enable = function() {
        this.enabled = !0
    };
    t.prototype.disable = function() {
        this.enabled = !1
    };
    t.prototype.toggleEnabled = function() {
        this.enabled = !this.enabled
    };
    t.prototype.toggle = function(t) {
        var i = this;
        t && (i = n(t.currentTarget).data("bs." + this.type), i || (i = new this.constructor(t.currentTarget, this.getDelegateOptions()), n(t.currentTarget).data("bs." + this.type, i)));
        i.tip().hasClass("in") ? i.leave(i) : i.enter(i)
    };
    t.prototype.destroy = function() {
        var n = this;
        clearTimeout(this.timeout);
        this.hide(function() {
            n.$element.off("." + n.type).removeData("bs." + n.type)
        })
    };
    i = n.fn.tooltip;
    n.fn.tooltip = r;
    n.fn.tooltip.Constructor = t;
    n.fn.tooltip.noConflict = function() {
        return n.fn.tooltip = i, this
    }
}(jQuery); + function(n) {
    "use strict";

    function r(i) {
        return this.each(function() {
            var f = n(this),
                r = f.data("bs.popover"),
                u = "object" == typeof i && i,
                e = u && u.selector;
            (r || "destroy" != i) && (e ? (r || f.data("bs.popover", r = {}), r[e] || (r[e] = new t(this, u))) : r || f.data("bs.popover", r = new t(this, u)), "string" == typeof i && r[i]())
        })
    }
    var t = function(n, t) {
            this.init("popover", n, t)
        },
        i;
    if (!n.fn.tooltip) throw new Error("Popover requires tooltip.js");
    t.VERSION = "3.3.0";
    t.DEFAULTS = n.extend({}, n.fn.tooltip.Constructor.DEFAULTS, {
        placement: "right",
        trigger: "click",
        content: "",
        template: '<div class="popover" role="tooltip"><div class="arrow"><\/div><h3 class="popover-title"><\/h3><div class="popover-content"><\/div><\/div>'
    });
    t.prototype = n.extend({}, n.fn.tooltip.Constructor.prototype);
    t.prototype.constructor = t;
    t.prototype.getDefaults = function() {
        return t.DEFAULTS
    };
    t.prototype.setContent = function() {
        var n = this.tip(),
            i = this.getTitle(),
            t = this.getContent();
        n.find(".popover-title")[this.options.html ? "html" : "text"](i);
        n.find(".popover-content").children().detach().end()[this.options.html ? "string" == typeof t ? "html" : "append" : "text"](t);
        n.removeClass("fade top bottom left right in");
        n.find(".popover-title").html() || n.find(".popover-title").hide()
    };
    t.prototype.hasContent = function() {
        return this.getTitle() || this.getContent()
    };
    t.prototype.getContent = function() {
        var t = this.$element,
            n = this.options;
        return t.attr("data-content") || ("function" == typeof n.content ? n.content.call(t[0]) : n.content)
    };
    t.prototype.arrow = function() {
        return this.$arrow = this.$arrow || this.tip().find(".arrow")
    };
    t.prototype.tip = function() {
        return this.$tip || (this.$tip = n(this.options.template)), this.$tip
    };
    i = n.fn.popover;
    n.fn.popover = r;
    n.fn.popover.Constructor = t;
    n.fn.popover.noConflict = function() {
        return n.fn.popover = i, this
    }
}(jQuery); + function(n) {
    "use strict";

    function t(i, r) {
        var u = n.proxy(this.process, this);
        this.$body = n("body");
        this.$scrollElement = n(n(i).is("body") ? window : i);
        this.options = n.extend({}, t.DEFAULTS, r);
        this.selector = (this.options.target || "") + " .nav li > a";
        this.offsets = [];
        this.targets = [];
        this.activeTarget = null;
        this.scrollHeight = 0;
        this.$scrollElement.on("scroll.bs.scrollspy", u);
        this.refresh();
        this.process()
    }

    function i(i) {
        return this.each(function() {
            var u = n(this),
                r = u.data("bs.scrollspy"),
                f = "object" == typeof i && i;
            r || u.data("bs.scrollspy", r = new t(this, f));
            "string" == typeof i && r[i]()
        })
    }
    t.VERSION = "3.3.0";
    t.DEFAULTS = {
        offset: 10
    };
    t.prototype.getScrollHeight = function() {
        return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
    };
    t.prototype.refresh = function() {
        var i = "offset",
            r = 0,
            t;
        n.isWindow(this.$scrollElement[0]) || (i = "position", r = this.$scrollElement.scrollTop());
        this.offsets = [];
        this.targets = [];
        this.scrollHeight = this.getScrollHeight();
        t = this;
        this.$body.find(this.selector).map(function() {
            var f = n(this),
                u = f.data("target") || f.attr("href"),
                t = /^#./.test(u) && n(u);
            return t && t.length && t.is(":visible") && [
                [t[i]().top + r, u]
            ] || null
        }).sort(function(n, t) {
            return n[0] - t[0]
        }).each(function() {
            t.offsets.push(this[0]);
            t.targets.push(this[1])
        })
    };
    t.prototype.process = function() {
        var n, i = this.$scrollElement.scrollTop() + this.options.offset,
            f = this.getScrollHeight(),
            e = this.options.offset + f - this.$scrollElement.height(),
            t = this.offsets,
            r = this.targets,
            u = this.activeTarget;
        if (this.scrollHeight != f && this.refresh(), i >= e) return u != (n = r[r.length - 1]) && this.activate(n);
        if (u && i < t[0]) return this.activeTarget = null, this.clear();
        for (n = t.length; n--;) u != r[n] && i >= t[n] && (!t[n + 1] || i <= t[n + 1]) && this.activate(r[n])
    };
    t.prototype.activate = function(t) {
        this.activeTarget = t;
        this.clear();
        var r = this.selector + '[data-target="' + t + '"],' + this.selector + '[href="' + t + '"]',
            i = n(r).parents("li").addClass("active");
        i.parent(".dropdown-menu").length && (i = i.closest("li.dropdown").addClass("active"));
        i.trigger("activate.bs.scrollspy")
    };
    t.prototype.clear = function() {
        n(this.selector).parentsUntil(this.options.target, ".active").removeClass("active")
    };
    var r = n.fn.scrollspy;
    n.fn.scrollspy = i;
    n.fn.scrollspy.Constructor = t;
    n.fn.scrollspy.noConflict = function() {
        return n.fn.scrollspy = r, this
    };
    n(window).on("load.bs.scrollspy.data-api", function() {
        n('[data-spy="scroll"]').each(function() {
            var t = n(this);
            i.call(t, t.data())
        })
    })
}(jQuery); + function(n) {
    "use strict";

    function r(i) {
        return this.each(function() {
            var u = n(this),
                r = u.data("bs.tab");
            r || u.data("bs.tab", r = new t(this));
            "string" == typeof i && r[i]()
        })
    }
    var t = function(t) {
            this.element = n(t)
        },
        u, i;
    t.VERSION = "3.3.0";
    t.TRANSITION_DURATION = 150;
    t.prototype.show = function() {
        var t = this.element,
            f = t.closest("ul:not(.dropdown-menu)"),
            i = t.data("target"),
            u;
        if (i || (i = t.attr("href"), i = i && i.replace(/.*(?=#[^\s]*$)/, "")), !t.parent("li").hasClass("active")) {
            var r = f.find(".active:last a"),
                e = n.Event("hide.bs.tab", {
                    relatedTarget: t[0]
                }),
                o = n.Event("show.bs.tab", {
                    relatedTarget: r[0]
                });
            (r.trigger(e), t.trigger(o), o.isDefaultPrevented() || e.isDefaultPrevented()) || (u = n(i), this.activate(t.closest("li"), f), this.activate(u, u.parent(), function() {
                r.trigger({
                    type: "hidden.bs.tab",
                    relatedTarget: t[0]
                });
                t.trigger({
                    type: "shown.bs.tab",
                    relatedTarget: r[0]
                })
            }))
        }
    };
    t.prototype.activate = function(i, r, u) {
        function e() {
            f.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !1);
            i.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded", !0);
            o ? (i[0].offsetWidth, i.addClass("in")) : i.removeClass("fade");
            i.parent(".dropdown-menu") && i.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !0);
            u && u()
        }
        var f = r.find("> .active"),
            o = u && n.support.transition && (f.length && f.hasClass("fade") || !!r.find("> .fade").length);
        f.length && o ? f.one("bsTransitionEnd", e).emulateTransitionEnd(t.TRANSITION_DURATION) : e();
        f.removeClass("in")
    };
    u = n.fn.tab;
    n.fn.tab = r;
    n.fn.tab.Constructor = t;
    n.fn.tab.noConflict = function() {
        return n.fn.tab = u, this
    };
    i = function(t) {
        t.preventDefault();
        r.call(n(this), "show")
    };
    n(document).on("click.bs.tab.data-api", '[data-toggle="tab"]', i).on("click.bs.tab.data-api", '[data-toggle="pill"]', i)
}(jQuery); + function(n) {
    "use strict";

    function i(i) {
        return this.each(function() {
            var u = n(this),
                r = u.data("bs.affix"),
                f = "object" == typeof i && i;
            r || u.data("bs.affix", r = new t(this, f));
            "string" == typeof i && r[i]()
        })
    }
    var t = function(i, r) {
            this.options = n.extend({}, t.DEFAULTS, r);
            this.$target = n(this.options.target).on("scroll.bs.affix.data-api", n.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", n.proxy(this.checkPositionWithEventLoop, this));
            this.$element = n(i);
            this.affixed = this.unpin = this.pinnedOffset = null;
            this.checkPosition()
        },
        r;
    t.VERSION = "3.3.0";
    t.RESET = "affix affix-top affix-bottom";
    t.DEFAULTS = {
        offset: 0,
        target: window
    };
    t.prototype.getState = function(n, t, i, r) {
        var u = this.$target.scrollTop(),
            f = this.$element.offset(),
            e = this.$target.height();
        if (null != i && "top" == this.affixed) return i > u ? "top" : !1;
        if ("bottom" == this.affixed) return null != i ? u + this.unpin <= f.top ? !1 : "bottom" : n - r >= u + e ? !1 : "bottom";
        var o = null == this.affixed,
            s = o ? u : f.top,
            h = o ? e : t;
        return null != i && i >= s ? "top" : null != r && s + h >= n - r ? "bottom" : !1
    };
    t.prototype.getPinnedOffset = function() {
        if (this.pinnedOffset) return this.pinnedOffset;
        this.$element.removeClass(t.RESET).addClass("affix");
        var n = this.$target.scrollTop(),
            i = this.$element.offset();
        return this.pinnedOffset = i.top - n
    };
    t.prototype.checkPositionWithEventLoop = function() {
        setTimeout(n.proxy(this.checkPosition, this), 1)
    };
    t.prototype.checkPosition = function() {
        var i, e, o;
        if (this.$element.is(":visible")) {
            var s = this.$element.height(),
                r = this.options.offset,
                f = r.top,
                u = r.bottom,
                h = n("body").height();
            if ("object" != typeof r && (u = f = r), "function" == typeof f && (f = r.top(this.$element)), "function" == typeof u && (u = r.bottom(this.$element)), i = this.getState(h, s, f, u), this.affixed != i) {
                if (null != this.unpin && this.$element.css("top", ""), e = "affix" + (i ? "-" + i : ""), o = n.Event(e + ".bs.affix"), this.$element.trigger(o), o.isDefaultPrevented()) return;
                this.affixed = i;
                this.unpin = "bottom" == i ? this.getPinnedOffset() : null;
                this.$element.removeClass(t.RESET).addClass(e).trigger(e.replace("affix", "affixed") + ".bs.affix")
            }
            "bottom" == i && this.$element.offset({
                top: h - s - u
            })
        }
    };
    r = n.fn.affix;
    n.fn.affix = i;
    n.fn.affix.Constructor = t;
    n.fn.affix.noConflict = function() {
        return n.fn.affix = r, this
    };
    n(window).on("load", function() {
        n('[data-spy="affix"]').each(function() {
            var r = n(this),
                t = r.data();
            t.offset = t.offset || {};
            null != t.offsetBottom && (t.offset.bottom = t.offsetBottom);
            null != t.offsetTop && (t.offset.top = t.offsetTop);
            i.call(r, t)
        })
    })
}(jQuery);
window.matchMedia = window.matchMedia || function(n) {
        var u, i = n.documentElement,
            f = i.firstElementChild || i.firstChild,
            r = n.createElement("body"),
            t = n.createElement("div");
        return t.id = "mq-test-1", t.style.cssText = "position:absolute;top:-100em", r.style.background = "none", r.appendChild(t),
            function(n) {
                return t.innerHTML = '&shy;<style media="' + n + '"> #mq-test-1 { width: 42px; }<\/style>', i.insertBefore(r, f), u = t.offsetWidth == 42, i.removeChild(r), {
                    matches: u,
                    media: n
                }
            }
    }(document),
    function(n) {
        function d() {
            a(!0)
        }
        if (n.respond = {}, respond.update = function() {}, respond.mediaQueriesSupported = n.matchMedia && n.matchMedia("only all").matches, !respond.mediaQueriesSupported) {
            var t = n.document,
                i = t.documentElement,
                e = [],
                u = [],
                r = [],
                o = {},
                v = 30,
                f = t.getElementsByTagName("head")[0] || i,
                g = t.getElementsByTagName("base")[0],
                s = f.getElementsByTagName("link"),
                h = [],
                y = function() {
                    for (var f = s, c = f.length, r = 0, t, i, u, e; r < c; r++) t = f[r], i = t.href, u = t.media, e = t.rel && t.rel.toLowerCase() === "stylesheet", !i || !e || o[i] || (t.styleSheet && t.styleSheet.rawCssText ? (w(t.styleSheet.rawCssText, i, u), o[i] = !0) : (/^([a-zA-Z:]*\/\/)/.test(i) || g) && i.replace(RegExp.$1, "").split("/")[0] !== n.location.host || h.push({
                        href: i,
                        media: u
                    }));
                    p()
                },
                p = function() {
                    if (h.length) {
                        var n = h.shift();
                        nt(n.href, function(t) {
                            w(t, n.href, n.media);
                            o[n.href] = !0;
                            p()
                        })
                    }
                },
                w = function(n, t, i) {
                    var o = n.match(/@media[^\{]+\{([^\{\}]*\{[^\}\{]*\})+/gi),
                        s = o && o.length || 0,
                        t = t.substring(0, t.lastIndexOf("/")),
                        v = function(n) {
                            return n.replace(/(url\()['"]?([^\/\)'"][^:\)'"]+)['"]?(\))/g, "$1" + t + "$2$3")
                        },
                        y = !s && i,
                        h = 0,
                        f, c, r, l, p;
                    for (t.length && (t += "/"), y && (s = 1); h < s; h++)
                        for (f = 0, y ? (c = i, u.push(v(n))) : (c = o[h].match(/@media *([^\{]+)\{([\S\s]+?)$/) && RegExp.$1, u.push(RegExp.$2 && v(RegExp.$2))), l = c.split(","), p = l.length; f < p; f++) r = l[f], e.push({
                            media: r.split("(")[0].match(/(only\s+)?([a-zA-Z]+)\s?/) && RegExp.$2 || "all",
                            rules: u.length - 1,
                            hasquery: r.indexOf("(") > -1,
                            minw: r.match(/\(min\-width:[\s]*([\s]*[0-9\.]+)(px|em)[\s]*\)/) && parseFloat(RegExp.$1) + (RegExp.$2 || ""),
                            maxw: r.match(/\(max\-width:[\s]*([\s]*[0-9\.]+)(px|em)[\s]*\)/) && parseFloat(RegExp.$1) + (RegExp.$2 || "")
                        });
                    a()
                },
                c, b, k = function() {
                    var u, r = t.createElement("div"),
                        n = t.body,
                        f = !1;
                    return r.style.cssText = "position:absolute;font-size:1em;width:1em", n || (n = f = t.createElement("body"), n.style.background = "none"), n.appendChild(r), i.insertBefore(n, i.firstChild), u = r.offsetWidth, f ? i.removeChild(n) : n.removeChild(r), l = parseFloat(u)
                },
                l, a = function(n) {
                    var nt = "clientWidth",
                        tt = i[nt],
                        it = t.compatMode === "CSS1Compat" && tt || t.body[nt] || tt,
                        d = {},
                        ot = s[s.length - 1],
                        rt = (new Date).getTime(),
                        o, h, g;
                    if (n && c && rt - c < v) {
                        clearTimeout(b);
                        b = setTimeout(a, v);
                        return
                    }
                    c = rt;
                    for (o in e) {
                        var y = e[o],
                            p = y.minw,
                            w = y.maxw,
                            ut = p === null,
                            ft = w === null,
                            et = "em";
                        !p || (p = parseFloat(p) * (p.indexOf(et) > -1 ? l || k() : 1));
                        !w || (w = parseFloat(w) * (w.indexOf(et) > -1 ? l || k() : 1));
                        y.hasquery && (ut && ft || !(ut || it >= p) || !(ft || it <= w)) || (d[y.media] || (d[y.media] = []), d[y.media].push(u[y.rules]))
                    }
                    for (o in r) r[o] && r[o].parentNode === f && f.removeChild(r[o]);
                    for (o in d) h = t.createElement("style"), g = d[o].join("\n"), h.type = "text/css", h.media = o, f.insertBefore(h, ot.nextSibling), h.styleSheet ? h.styleSheet.cssText = g : h.appendChild(t.createTextNode(g)), r.push(h)
                },
                nt = function(n, t) {
                    var i = tt();
                    i && (i.open("GET", n, !0), i.onreadystatechange = function() {
                        i.readyState == 4 && (i.status == 200 || i.status == 304) && t(i.responseText)
                    }, i.readyState != 4) && i.send(null)
                },
                tt = function() {
                    var n = !1;
                    try {
                        n = new XMLHttpRequest
                    } catch (t) {
                        n = new ActiveXObject("Microsoft.XMLHTTP")
                    }
                    return function() {
                        return n
                    }
                }();
            y();
            respond.update = y;
            n.addEventListener ? n.addEventListener("resize", d, !1) : n.attachEvent && n.attachEvent("onresize", d)
        }
    }(this);
$.ajaxSetup({
    cache: !1
});
$(function() {
    $(".datetimepicker4").datetimepicker({
        format: "MMMM D, YYYY",
        minDate: "1900-01-01",
        toolbarPlacement: "bottom",
        showClose: !0,
        icons: {
            close: "glyphicon glyphicon-ok"
        }
    })
});
$(function() {
    $(".datetimepickertime").datetimepicker({
        format: "MMMM D, YYYY h:mm a",
        minDate: "1900-01-01",
        sideBySide: !0,
        toolbarPlacement: "bottom",
        showClose: !0,
        icons: {
            close: "glyphicon glyphicon-ok"
        }
    })
});
$("h4 a.breadcrumbs").click(function() {
    $.ajax({
        url: "/ClientCompanies/GoBack",
        type: "POST",
        data: {
            id: $(this).attr("id")
        }
    })
});
origEditNotesVal = "";
$(document).on("show.bs.modal", ".modal", function() {
    var n = 1040 + 10 * $(".modal:visible").length;
    $(this).css("z-index", n);
    setTimeout(function() {
        $(".modal-backdrop").not(".modal-stack").css("z-index", n - 1).addClass("modal-stack")
    }, 0)
});
var reloadActivitiesOpp = !0,
    activitiesLoadedOpp = !1,
    reloadProposalsOpp = !0,
    proposalsLoadedOpp = !1;
(function(n) {
    n.fn.areYouSure = function(t) {
        var i = n.extend({
                message: "You have unsaved changes!",
                dirtyClass: "dirty",
                change: null,
                silent: !1,
                addRemoveFieldsMarksDirty: !1,
                fieldEvents: "change keyup propertychange input",
                fieldSelector: ":input:not(input[type=submit]):not(input[type=button])"
            }, t),
            f = function(t) {
                if (t.hasClass("ays-ignore") || t.hasClass("aysIgnore") || t.attr("data-ays-ignore") || t.attr("name") === undefined) return null;
                if (t.is(":disabled")) return "ays-disabled";
                var i, r = t.attr("type");
                t.is("select") && (r = "select");
                switch (r) {
                    case "checkbox":
                    case "radio":
                        i = t.is(":checked");
                        break;
                    case "select":
                        i = "";
                        t.find("option").each(function() {
                            var t = n(this);
                            t.is(":selected") && (i += t.val())
                        });
                        break;
                    default:
                        i = t.val()
                }
                return i
            },
            e = function(n) {
                n.data("ays-orig", f(n))
            },
            u = function(t) {
                var o = function(n) {
                        var t = n.data("ays-orig");
                        return undefined === t ? !1 : f(n) != t
                    },
                    u = n(this).is("form") ? n(this) : n(this).parents("form"),
                    s, e;
                if (o(n(t.target))) {
                    r(u, !0);
                    return
                }
                if ($fields = u.find(i.fieldSelector), i.addRemoveFieldsMarksDirty && (s = u.data("ays-orig-field-count"), s != $fields.length)) {
                    r(u, !0);
                    return
                }
                e = !1;
                $fields.each(function() {
                    return $field = n(this), o($field) ? (e = !0, !1) : void 0
                });
                r(u, e)
            },
            o = function(t) {
                var f = t.find(i.fieldSelector);
                n(f).each(function() {
                    e(n(this))
                });
                n(f).unbind(i.fieldEvents, u);
                n(f).bind(i.fieldEvents, u);
                t.data("ays-orig-field-count", n(f).length);
                r(t, !1)
            },
            r = function(n, t) {
                var r = t != n.hasClass(i.dirtyClass);
                n.toggleClass(i.dirtyClass, t);
                r && (i.change && i.change.call(n, n), t && n.trigger("dirty.areYouSure", [n]), t || n.trigger("clean.areYouSure", [n]), n.trigger("change.areYouSure", [n]))
            },
            s = function() {
                var t = n(this),
                    r = t.find(i.fieldSelector);
                n(r).each(function() {
                    var t = n(this);
                    t.data("ays-orig") || (e(t), t.bind(i.fieldEvents, u))
                });
                t.trigger("checkform.areYouSure")
            },
            h = function() {
                o(n(this))
            };
        return i.silent || window.aysUnloadSet || (window.aysUnloadSet = !0, n(window).bind("beforeunload", function() {
            if ($dirtyForms = n("form").filter("." + i.dirtyClass), $dirtyForms.length != 0) {
                if (navigator.userAgent.toLowerCase().match(/msie|chrome/)) {
                    if (window.aysHasPrompted) return;
                    window.aysHasPrompted = !0;
                    window.setTimeout(function() {
                        window.aysHasPrompted = !1
                    }, 900)
                }
                return i.message
            }
        })), this.each(function() {
            if (n(this).is("form")) {
                var t = n(this);
                t.submit(function() {
                    t.removeClass(i.dirtyClass)
                });
                t.bind("reset", function() {
                    r(t, !1)
                });
                t.bind("rescan.areYouSure", s);
                t.bind("reinitialize.areYouSure", h);
                t.bind("checkform.areYouSure", u);
                o(t)
            }
        })
    }
})(jQuery),
function(n) {
    "use strict";
    typeof define == "function" && define.amd ? define(["jquery"], function(t) {
        return n(t, window, document)
    }) : typeof exports == "object" ? module.exports = function(t, i) {
        return t || (t = window), i || (i = typeof window != "undefined" ? require("jquery") : require("jquery")(t)), n(i, t, t.document)
    } : n(jQuery, window, document)
}(function(n, t, i, r) {
    "use strict";

    function at(t) {
        var f = "a aa ai ao as b fn i m o s ",
            i, r, u = {};
        n.each(t, function(n) {
            i = n.match(/^([^A-Z]+?)([A-Z])/);
            i && f.indexOf(i[1] + " ") !== -1 && (r = n.replace(i[0], i[2].toLowerCase()), u[r] = n, i[1] === "o" && at(t[n]))
        });
        t._hungarianMap = u
    }

    function nt(t, i, u) {
        t._hungarianMap || at(t);
        var f;
        n.each(i, function(e) {
            f = t._hungarianMap[e];
            f !== r && (u || i[f] === r) && (f.charAt(0) === "o" ? (i[f] || (i[f] = {}), n.extend(!0, i[f], i[e]), nt(t[f], i[f], u)) : i[f] = i[e])
        })
    }

    function fr(n) {
        var i = u.defaults.oLanguage,
            r = n.sZeroRecords,
            t;
        !n.sEmptyTable && r && i.sEmptyTable === "No data available in table" && k(n, n, "sZeroRecords", "sEmptyTable");
        !n.sLoadingRecords && r && i.sLoadingRecords === "Loading..." && k(n, n, "sZeroRecords", "sLoadingRecords");
        n.sInfoThousands && (n.sThousands = n.sInfoThousands);
        t = n.sDecimal;
        t && ae(t)
    }

    function yu(n) {
        var t, i, r;
        if (a(n, "ordering", "bSort"), a(n, "orderMulti", "bSortMulti"), a(n, "orderClasses", "bSortClasses"), a(n, "orderCellsTop", "bSortCellsTop"), a(n, "order", "aaSorting"), a(n, "orderFixed", "aaSortingFixed"), a(n, "paging", "bPaginate"), a(n, "pagingType", "sPaginationType"), a(n, "pageLength", "iDisplayLength"), a(n, "searching", "bFilter"), typeof n.sScrollX == "boolean" && (n.sScrollX = n.sScrollX ? "100%" : ""), typeof n.scrollX == "boolean" && (n.scrollX = n.scrollX ? "100%" : ""), t = n.aoSearchCols, t)
            for (i = 0, r = t.length; i < r; i++) t[i] && nt(u.models.oSearch, t[i])
    }

    function pu(t) {
        a(t, "orderable", "bSortable");
        a(t, "orderData", "aDataSort");
        a(t, "orderSequence", "asSorting");
        a(t, "orderDataType", "sortDataType");
        var i = t.aDataSort;
        i && !n.isArray(i) && (t.aDataSort = [i])
    }

    function wu(i) {
        var r;
        if (!u.__browser) {
            r = {};
            u.__browser = r;
            var e = n("<div/>").css({
                    position: "fixed",
                    top: 0,
                    left: n(t).scrollLeft() * -1,
                    height: 1,
                    width: 1,
                    overflow: "hidden"
                }).append(n("<div/>").css({
                    position: "absolute",
                    top: 1,
                    left: 1,
                    width: 100,
                    overflow: "scroll"
                }).append(n("<div/>").css({
                    width: "100%",
                    height: 10
                }))).appendTo("body"),
                f = e.children(),
                o = f.children();
            r.barWidth = f[0].offsetWidth - f[0].clientWidth;
            r.bScrollOversize = o[0].offsetWidth === 100 && f[0].clientWidth !== 100;
            r.bScrollbarLeft = Math.round(o.offset().left) !== 1;
            r.bBounding = e[0].getBoundingClientRect().width ? !0 : !1;
            e.remove()
        }
        n.extend(i.oBrowser, u.__browser);
        i.oScroll.iBarWidth = u.__browser.barWidth
    }

    function bu(n, t, i, u, f, e) {
        var o = u,
            s, h = !1;
        for (i !== r && (s = i, h = !0); o !== f;) n.hasOwnProperty(o) && (s = h ? t(s, n[o], o, n) : n[o], h = !0, o += e);
        return s
    }

    function er(t, r) {
        var f = u.defaults.column,
            e = t.aoColumns.length,
            s = n.extend({}, u.models.oColumn, f, {
                nTh: r ? r : i.createElement("th"),
                sTitle: f.sTitle ? f.sTitle : r ? r.innerHTML : "",
                aDataSort: f.aDataSort ? f.aDataSort : [e],
                mData: f.mData ? f.mData : e,
                idx: e
            }),
            o;
        t.aoColumns.push(s);
        o = t.aoPreSearchCols;
        o[e] = n.extend({}, u.models.oSearch, o[e]);
        ei(t, e, n(r).data())
    }

    function ei(t, i, f) {
        var e = t.aoColumns[i],
            o = t.oClasses,
            l = n(e.nTh),
            a, h, c;
        e.sWidthOrig || (e.sWidthOrig = l.attr("width") || null, a = (l.attr("style") || "").match(/width:\s*(\d+[pxem%]+)/), a && (e.sWidthOrig = a[1]));
        f !== r && f !== null && (pu(f), nt(u.defaults.column, f), f.mDataProp === r || f.mData || (f.mData = f.mDataProp), f.sType && (e._sManualType = f.sType), f.className && !f.sClass && (f.sClass = f.className), n.extend(e, f), k(e, f, "sWidth", "sWidthOrig"), f.iDataSort !== r && (e.aDataSort = [f.iDataSort]), k(e, f, "aDataSort"));
        var s = e.mData,
            p = ft(s),
            y = e.mRender ? ft(e.mRender) : null,
            v = function(n) {
                return typeof n == "string" && n.indexOf("@") !== -1
            };
        e._bAttrSrc = n.isPlainObject(s) && (v(s.sort) || v(s.type) || v(s.filter));
        e._setter = null;
        e.fnGetData = function(n, t, i) {
            var u = p(n, t, r, i);
            return y && t ? y(u, t, n, i) : u
        };
        e.fnSetData = function(n, t, i) {
            return et(s)(n, t, i)
        };
        typeof s != "number" && (t._rowReadObject = !0);
        t.oFeatures.bSort || (e.bSortable = !1, l.addClass(o.sSortableNone));
        h = n.inArray("asc", e.asSorting) !== -1;
        c = n.inArray("desc", e.asSorting) !== -1;
        e.bSortable && (h || c) ? h && !c ? (e.sSortingClass = o.sSortableAsc, e.sSortingClassJUI = o.sSortJUIAscAllowed) : !h && c ? (e.sSortingClass = o.sSortableDesc, e.sSortingClassJUI = o.sSortJUIDescAllowed) : (e.sSortingClass = o.sSortable, e.sSortingClassJUI = o.sSortJUI) : (e.sSortingClass = o.sSortableNone, e.sSortingClassJUI = "")
    }

    function vt(n) {
        var i, t, u, r;
        if (n.oFeatures.bAutoWidth !== !1)
            for (i = n.aoColumns, br(n), t = 0, u = i.length; t < u; t++) i[t].nTh.style.width = i[t].sWidth;
        r = n.oScroll;
        (r.sY !== "" || r.sX !== "") && wi(n);
        o(n, null, "column-sizing", [n])
    }

    function yt(n, t) {
        var i = oi(n, "bVisible");
        return typeof i[t] == "number" ? i[t] : null
    }

    function pt(t, i) {
        var u = oi(t, "bVisible"),
            r = n.inArray(i, u);
        return r !== -1 ? r : null
    }

    function wt(t) {
        var i = 0;
        return n.each(t.aoColumns, function(t, r) {
            r.bVisible && n(r.nTh).css("display") !== "none" && i++
        }), i
    }

    function oi(t, i) {
        var r = [];
        return n.map(t.aoColumns, function(n, t) {
            n[i] && r.push(t)
        }), r
    }

    function or(n) {
        for (var c = n.aoColumns, y = n.aoData, h = u.ext.type.detect, e, a, i, v, t, o, s, f = 0, l = c.length; f < l; f++)
            if (t = c[f], s = [], !t.sType && t._sManualType) t.sType = t._sManualType;
            else if (!t.sType) {
            for (e = 0, a = h.length; e < a; e++) {
                for (i = 0, v = y.length; i < v; i++) {
                    if (s[i] === r && (s[i] = p(n, i, f, "type")), o = h[e](s[i], n), !o && e !== h.length - 1) break;
                    if (o === "html") break
                }
                if (o) {
                    t.sType = o;
                    break
                }
            }
            t.sType || (t.sType = "string")
        }
    }

    function ku(t, i, u, f) {
        var s, a, o, v, c, y, h, l = t.aoColumns,
            e;
        if (i)
            for (s = i.length - 1; s >= 0; s--)
                for (h = i[s], e = h.targets !== r ? h.targets : h.aTargets, n.isArray(e) || (e = [e]), o = 0, v = e.length; o < v; o++)
                    if (typeof e[o] == "number" && e[o] >= 0) {
                        while (l.length <= e[o]) er(t);
                        f(e[o], h)
                    } else if (typeof e[o] == "number" && e[o] < 0) f(l.length + e[o], h);
        else if (typeof e[o] == "string")
            for (c = 0, y = l.length; c < y; c++)(e[o] == "_all" || n(l[c].nTh).hasClass(e[o])) && f(c, h);
        if (u)
            for (s = 0, a = u.length; s < a; s++) f(s, u[s])
    }

    function it(t, i, f, e) {
        var o = t.aoData.length,
            h = n.extend(!0, {}, u.models.oRow, {
                src: f ? "dom" : "data",
                idx: o
            }),
            c, s, a, l;
        for (h._aData = i, t.aoData.push(h), c = t.aoColumns, s = 0, a = c.length; s < a; s++) c[s].sType = null;
        return t.aiDisplayMaster.push(o), l = t.rowIdFn(i), l !== r && (t.aIds[l] = h), (f || !t.oFeatures.bDeferRender) && lr(t, o, f, e), o
    }

    function si(t, i) {
        var r;
        return i instanceof n || (i = n(i)), i.map(function(n, i) {
            return r = cr(t, i), it(t, r.data, i, r.cells)
        })
    }

    function ke(n, t) {
        return t._DT_RowIndex !== r ? t._DT_RowIndex : null
    }

    function de(t, i, r) {
        return n.inArray(r, t.aoData[i].anCells)
    }

    function p(n, t, i, u) {
        var h = n.iDraw,
            e = n.aoColumns[i],
            s = n.aoData[t]._aData,
            o = e.sDefaultContent,
            f = e.fnGetData(s, u, {
                settings: n,
                row: t,
                col: i
            });
        if (f === r) return n.iDrawError != h && o === null && (tt(n, 0, "Requested unknown parameter " + (typeof e.mData == "function" ? "{function}" : "'" + e.mData + "'") + " for row " + t + ", column " + i, 4), n.iDrawError = h), o;
        if ((f === s || f === null) && o !== null && u !== r) f = o;
        else if (typeof f == "function") return f.call(s);
        return f === null && u == "display" ? "" : f
    }

    function du(n, t, i, r) {
        var u = n.aoColumns[i],
            f = n.aoData[t]._aData;
        u.fnSetData(f, r, {
            settings: n,
            row: t,
            col: i
        })
    }

    function sr(t) {
        return n.map(t.match(/(\\.|[^\.])+/g) || [""], function(n) {
            return n.replace(/\\\./g, ".")
        })
    }

    function ft(t) {
        var i, u;
        return n.isPlainObject(t) ? (i = {}, n.each(t, function(n, t) {
            t && (i[n] = ft(t))
        }), function(n, t, u, f) {
            var e = i[t] || i._;
            return e !== r ? e(n, t, u, f) : n
        }) : t === null ? function(n) {
            return n
        } : typeof t == "function" ? function(n, i, r, u) {
            return t(n, i, r, u)
        } : typeof t == "string" && (t.indexOf(".") !== -1 || t.indexOf("[") !== -1 || t.indexOf("(") !== -1) ? (u = function(t, i, f) {
            var s, a, h, v, e, o, y, c, p, l;
            if (f !== "")
                for (e = sr(f), o = 0, y = e.length; o < y; o++) {
                    if (s = e[o].match(ht), a = e[o].match(ut), s) {
                        if (e[o] = e[o].replace(ht, ""), e[o] !== "" && (t = t[e[o]]), h = [], e.splice(0, o + 1), v = e.join("."), n.isArray(t))
                            for (c = 0, p = t.length; c < p; c++) h.push(u(t[c], i, v));
                        l = s[0].substring(1, s[0].length - 1);
                        t = l === "" ? h : h.join(l);
                        break
                    } else if (a) {
                        e[o] = e[o].replace(ut, "");
                        t = t[e[o]]();
                        continue
                    }
                    if (t === null || t[e[o]] === r) return r;
                    t = t[e[o]]
                }
            return t
        }, function(n, i) {
            return u(n, i, t)
        }) : function(n) {
            return n[t]
        }
    }

    function et(t) {
        if (n.isPlainObject(t)) return et(t._);
        if (t === null) return function() {};
        if (typeof t == "function") return function(n, i, r) {
            t(n, "set", i, r)
        };
        if (typeof t == "string" && (t.indexOf(".") !== -1 || t.indexOf("[") !== -1 || t.indexOf("(") !== -1)) {
            var i = function(t, u, f) {
                for (var s, p, e = sr(f), h, c = e[e.length - 1], a, v, l, y, o = 0, w = e.length - 1; o < w; o++) {
                    if (a = e[o].match(ht), v = e[o].match(ut), a) {
                        if (e[o] = e[o].replace(ht, ""), t[e[o]] = [], h = e.slice(), h.splice(0, o + 1), y = h.join("."), n.isArray(u))
                            for (s = 0, p = u.length; s < p; s++) l = {}, i(l, u[s], y), t[e[o]].push(l);
                        else t[e[o]] = u;
                        return
                    }
                    v && (e[o] = e[o].replace(ut, ""), t = t[e[o]](u));
                    (t[e[o]] === null || t[e[o]] === r) && (t[e[o]] = {});
                    t = t[e[o]]
                }
                c.match(ut) ? t = t[c.replace(ut, "")](u) : t[c.replace(ht, "")] = u
            };
            return function(n, r) {
                return i(n, r, t)
            }
        }
        return function(n, i) {
            n[t] = i
        }
    }

    function hr(n) {
        return w(n.aoData, "_aData")
    }

    function hi(n) {
        n.aoData.length = 0;
        n.aiDisplayMaster.length = 0;
        n.aiDisplay.length = 0;
        n.aIds = {}
    }

    function ci(n, t, i) {
        for (var f = -1, u = 0, e = n.length; u < e; u++) n[u] == t ? f = u : n[u] > t && n[u]--;
        f != -1 && i === r && n.splice(f, 1)
    }

    function bt(n, t, i, u) {
        var e = n.aoData[t],
            f, s, c = function(i, r) {
                while (i.childNodes.length) i.removeChild(i.firstChild);
                i.innerHTML = p(n, t, r, "display")
            },
            o, h;
        if (i !== "dom" && (i && i !== "auto" || e.src !== "dom")) {
            if (o = e.anCells, o)
                if (u !== r) c(o[u], u);
                else
                    for (f = 0, s = o.length; f < s; f++) c(o[f], f)
        } else e._aData = cr(n, e, u, u === r ? r : e._aData).data;
        if (e._aSortData = null, e._aFilterData = null, h = n.aoColumns, u !== r) h[u].sType = null;
        else {
            for (f = 0, s = h.length; f < s; f++) h[f].sType = null;
            ar(n, e)
        }
    }

    function cr(t, i, u, f) {
        var s = [],
            o = i.firstChild,
            v, e, h = 0,
            c, d = t.aoColumns,
            b = t._rowReadObject,
            l, y, a, k, p, w;
        if (f = f !== r ? f : b ? {} : [], l = function(n, t) {
                var i, r, u;
                typeof n == "string" && (i = n.indexOf("@"), i !== -1 && (r = n.substring(i + 1), u = et(n), u(f, t.getAttribute(r))))
            }, y = function(t) {
                if (u === r || u === h)
                    if (e = d[h], c = n.trim(t.innerHTML), e && e._bAttrSrc) {
                        var i = et(e.mData._);
                        i(f, c);
                        l(e.mData.sort, t);
                        l(e.mData.type, t);
                        l(e.mData.filter, t)
                    } else b ? (e._setter || (e._setter = et(e.mData)), e._setter(f, c)) : f[h] = c;
                h++
            }, o)
            while (o) v = o.nodeName.toUpperCase(), (v == "TD" || v == "TH") && (y(o), s.push(o)), o = o.nextSibling;
        else
            for (s = i.anCells, a = 0, k = s.length; a < k; a++) y(s[a]);
        return p = i.firstChild ? i : i.nTr, p && (w = p.getAttribute("id"), w && et(t.rowId)(f, w)), {
            data: f,
            cells: s
        }
    }

    function lr(t, r, u, f) {
        var c = t.aoData[r],
            a = c._aData,
            v = [],
            l, h, e, s, y;
        if (c.nTr === null) {
            for (l = u || i.createElement("tr"), c.nTr = l, c.anCells = v, l._DT_RowIndex = r, ar(t, c), s = 0, y = t.aoColumns.length; s < y; s++) e = t.aoColumns[s], h = u ? f[s] : i.createElement(e.sCellType), h._DT_CellIndex = {
                row: r,
                column: s
            }, v.push(h), u && !e.mRender && e.mData === s || n.isPlainObject(e.mData) && e.mData._ === s + ".display" || (h.innerHTML = p(t, r, s, "display")), e.sClass && (h.className += " " + e.sClass), e.bVisible && !u ? l.appendChild(h) : !e.bVisible && u && h.parentNode.removeChild(h), e.fnCreatedCell && e.fnCreatedCell.call(t.oInstance, h, p(t, r, s), a, r, s);
            o(t, "aoRowCreatedCallback", null, [l, a, r])
        }
        c.nTr.setAttribute("role", "row")
    }

    function ar(t, i) {
        var u = i.nTr,
            r = i._aData,
            f, e;
        u && (f = t.rowIdFn(r), f && (u.id = f), r.DT_RowClass && (e = r.DT_RowClass.split(" "), i.__rowc = i.__rowc ? fi(i.__rowc.concat(e)) : e, n(u).removeClass(i.__rowc.join(" ")).addClass(r.DT_RowClass)), r.DT_RowAttr && n(u).attr(r.DT_RowAttr), r.DT_RowData && n(u).data(r.DT_RowData))
    }

    function gu(t) {
        var r, e, u, l, i, f = t.nTHead,
            a = t.nTFoot,
            o = n("th, td", f).length === 0,
            s = t.oClasses,
            h = t.aoColumns,
            c;
        for (o && (l = n("<tr/>").appendTo(f)), r = 0, e = h.length; r < e; r++) i = h[r], u = n(i.nTh).addClass(i.sClass), o && u.appendTo(l), t.oFeatures.bSort && (u.addClass(i.sSortingClass), i.bSortable !== !1 && (u.attr("tabindex", t.iTabIndex).attr("aria-controls", t.sTableId), dr(t, i.nTh, r))), i.sTitle != u[0].innerHTML && u.html(i.sTitle), tu(t, "header")(t, u, i, s);
        if (o && dt(t.aoHeader, f), n(f).find(">tr").attr("role", "row"), n(f).find(">tr>th, >tr>td").addClass(s.sHeaderTH), n(a).find(">tr>th, >tr>td").addClass(s.sFooterTH), a !== null)
            for (c = t.aoFooter[0], r = 0, e = c.length; r < e; r++) i = h[r], i.nTf = c[r].cell, i.sClass && n(i.nTf).addClass(i.sClass)
    }

    function kt(t, i, u) {
        var f, a, e, y, v, p, c, o = [],
            l = [],
            w = t.aoColumns.length,
            s, h;
        if (i) {
            for (u === r && (u = !1), f = 0, a = i.length; f < a; f++) {
                for (o[f] = i[f].slice(), o[f].nTr = i[f].nTr, e = w - 1; e >= 0; e--) t.aoColumns[e].bVisible || u || o[f].splice(e, 1);
                l.push([])
            }
            for (f = 0, a = o.length; f < a; f++) {
                if (c = o[f].nTr, c)
                    while (p = c.firstChild) c.removeChild(p);
                for (e = 0, y = o[f].length; e < y; e++)
                    if (s = 1, h = 1, l[f][e] === r) {
                        for (c.appendChild(o[f][e].cell), l[f][e] = 1; o[f + s] !== r && o[f][e].cell == o[f + s][e].cell;) l[f + s][e] = 1, s++;
                        while (o[f][e + h] !== r && o[f][e].cell == o[f][e + h].cell) {
                            for (v = 0; v < s; v++) l[f + v][e + h] = 1;
                            h++
                        }
                        n(o[f][e].cell).attr("rowspan", s).attr("colspan", h)
                    }
            }
        }
    }

    function rt(t) {
        var ut = o(t, "aoPreDrawCallback", "preDraw", [t]),
            c, l, it, rt, f, nt, i, a, v, p, tt;
        if (n.inArray(!1, ut) !== -1) {
            b(t, !1);
            return
        }
        var w = [],
            k = 0,
            d = t.asStripeClasses,
            g = d.length,
            ft = t.aoOpenRows.length,
            e = t.oLanguage,
            u = t.iInitDisplayStart,
            s = y(t) == "ssp",
            h = t.aiDisplay;
        if (t.bDrawing = !0, u !== r && u !== -1 && (t._iDisplayStart = s ? u : u >= t.fnRecordsDisplay() ? 0 : u, t.iInitDisplayStart = -1), c = t._iDisplayStart, l = t.fnDisplayEnd(), t.bDeferLoading) t.bDeferLoading = !1, t.iDraw++, b(t, !1);
        else if (s) {
            if (!t.bDestroying && !tf(t)) return
        } else t.iDraw++;
        if (h.length !== 0)
            for (it = s ? 0 : c, rt = s ? t.aoData.length : l, f = it; f < rt; f++) nt = h[f], i = t.aoData[nt], i.nTr === null && lr(t, nt), a = i.nTr, g !== 0 && (v = d[k % g], i._sRowStripe != v && (n(a).removeClass(i._sRowStripe).addClass(v), i._sRowStripe = v)), o(t, "aoRowCallback", null, [a, i._aData, k, f]), w.push(a), k++;
        else p = e.sZeroRecords, t.iDraw == 1 && y(t) == "ajax" ? p = e.sLoadingRecords : e.sEmptyTable && t.fnRecordsTotal() === 0 && (p = e.sEmptyTable), w[0] = n("<tr/>", {
            "class": g ? d[0] : ""
        }).append(n("<td />", {
            valign: "top",
            colSpan: wt(t),
            "class": t.oClasses.sRowEmpty
        }).html(p))[0];
        o(t, "aoHeaderCallback", "header", [n(t.nTHead).children("tr")[0], hr(t), c, l, h]);
        o(t, "aoFooterCallback", "footer", [n(t.nTFoot).children("tr")[0], hr(t), c, l, h]);
        tt = n(t.nTBody);
        tt.children().detach();
        tt.append(n(w));
        o(t, "aoDrawCallback", "draw", [t]);
        t.bSorted = !1;
        t.bFiltered = !1;
        t.bDrawing = !1
    }

    function ot(n, t) {
        var i = n.oFeatures,
            r = i.bSort,
            u = i.bFilter;
        r && ie(n);
        u ? gt(n, n.oPreviousSearch) : n.aiDisplay = n.aiDisplayMaster.slice();
        t !== !0 && (n._iDisplayStart = 0);
        n._drawHold = t;
        rt(n);
        n._drawHold = !1
    }

    function nf(t) {
        var v = t.oClasses,
            g = n(t.nTable),
            k = n("<div/>").insertBefore(g),
            h = t.oFeatures,
            o = n("<div/>", {
                id: t.sTableId + "_wrapper",
                "class": v.sWrapper + (t.nTFoot ? "" : " " + v.sNoFooter)
            }),
            c, f, i, s, y, r, l, e, p, w, a, d, b;
        for (t.nHolding = k[0], t.nTableWrapper = o[0], t.nTableReinsertBefore = t.nTable.nextSibling, c = t.sDom.split(""), e = 0; e < c.length; e++) {
            if (f = null, i = c[e], i == "<") {
                if (s = n("<div/>")[0], y = c[e + 1], y == "'" || y == '"') {
                    for (r = "", l = 2; c[e + l] != y;) r += c[e + l], l++;
                    r == "H" ? r = v.sJUIHeader : r == "F" && (r = v.sJUIFooter);
                    r.indexOf(".") != -1 ? (p = r.split("."), s.id = p[0].substr(1, p[0].length - 1), s.className = p[1]) : r.charAt(0) == "#" ? s.id = r.substr(1, r.length - 1) : s.className = r;
                    e += l
                }
                o.append(s);
                o = n(s)
            } else if (i == ">") o = o.parent();
            else if (i == "l" && h.bPaginate && h.bLengthChange) f = pf(t);
            else if (i == "f" && h.bFilter) f = ff(t);
            else if (i == "r" && h.bProcessing) f = bf(t);
            else if (i == "t") f = kf(t);
            else if (i == "i" && h.bInfo) f = af(t);
            else if (i == "p" && h.bPaginate) f = wf(t);
            else if (u.ext.feature.length !== 0)
                for (w = u.ext.feature, a = 0, d = w.length; a < d; a++)
                    if (i == w[a].cFeature) {
                        f = w[a].fnInit(t);
                        break
                    }
            f && (b = t.aanFeatures, b[i] || (b[i] = []), b[i].push(f), o.append(f))
        }
        k.replaceWith(o);
        t.nHolding = null
    }

    function dt(t, i) {
        var c = n(i).children("tr"),
            l, u, r, o, s, h, a, v, f, e, y, p = function(n, t, i) {
                for (var r = n[t]; r[i];) i++;
                return i
            };
        for (t.splice(0, t.length), r = 0, h = c.length; r < h; r++) t.push([]);
        for (r = 0, h = c.length; r < h; r++)
            for (l = c[r], v = 0, u = l.firstChild; u;) {
                if (u.nodeName.toUpperCase() == "TD" || u.nodeName.toUpperCase() == "TH")
                    for (f = u.getAttribute("colspan") * 1, e = u.getAttribute("rowspan") * 1, f = !f || f === 0 || f === 1 ? 1 : f, e = !e || e === 0 || e === 1 ? 1 : e, a = p(t, r, v), y = f === 1 ? !0 : !1, s = 0; s < f; s++)
                        for (o = 0; o < e; o++) t[r + o][a + s] = {
                            cell: u,
                            unique: y
                        }, t[r + o].nTr = l;
                u = u.nextSibling
            }
    }

    function li(n, t, i) {
        var f = [],
            u, e, r, o;
        for (i || (i = n.aoHeader, t && (i = [], dt(i, t))), u = 0, e = i.length; u < e; u++)
            for (r = 0, o = i[u].length; r < o; r++) !i[u][r].unique || f[r] && n.bSortCellsTop || (f[r] = i[u][r].cell);
        return f
    }

    function ai(t, i, r) {
        var f, l, s, c;
        o(t, "aoServerParams", "serverParams", [i]);
        i && n.isArray(i) && (f = {}, l = /(.*?)\[\]$/, n.each(i, function(n, t) {
            var r = t.name.match(l),
                i;
            r ? (i = r[0], f[i] || (f[i] = []), f[i].push(t.value)) : f[t.name] = t.value
        }), i = f);
        var e, u = t.ajax,
            a = t.oInstance,
            h = function(n) {
                o(t, null, "xhr", [t, n, t.jqXHR]);
                r(n)
            };
        n.isPlainObject(u) && u.data && (e = u.data, s = n.isFunction(e) ? e(i, t) : e, i = n.isFunction(e) && s ? s : n.extend(!0, i, s), delete u.data);
        c = {
            data: i,
            success: function(n) {
                var i = n.error || n.sError;
                i && tt(t, 0, i);
                t.json = n;
                h(n)
            },
            dataType: "json",
            cache: !1,
            type: t.sServerMethod,
            error: function(i, r) {
                var u = o(t, null, "xhr", [t, null, t.jqXHR]);
                n.inArray(!0, u) === -1 && (r == "parsererror" ? tt(t, 0, "Invalid JSON response", 1) : i.readyState === 4 && tt(t, 0, "Ajax error", 7));
                b(t, !1)
            }
        };
        t.oAjaxData = i;
        o(t, null, "preXhr", [t, i]);
        t.fnServerData ? t.fnServerData.call(a, t.sAjaxSource, n.map(i, function(n, t) {
            return {
                name: t,
                value: n
            }
        }), h, t) : t.sAjaxSource || typeof u == "string" ? t.jqXHR = n.ajax(n.extend(c, {
            url: u || t.sAjaxSource
        })) : n.isFunction(u) ? t.jqXHR = u.call(a, i, h, t) : (t.jqXHR = n.ajax(n.extend(c, u)), u.data = e)
    }

    function tf(n) {
        return n.bAjaxDataGet ? (n.iDraw++, b(n, !0), ai(n, rf(n), function(t) {
            uf(n, t)
        }), !1) : !0
    }

    function rf(t) {
        var c = t.aoColumns,
            y = c.length,
            e = t.oFeatures,
            h = t.oPreviousSearch,
            d = t.aoPreSearchCols,
            r, l = [],
            a, f, o, p = ct(t),
            b = t._iDisplayStart,
            k = e.bPaginate !== !1 ? t._iDisplayLength : -1,
            i = function(n, t) {
                l.push({
                    name: n,
                    value: t
                })
            },
            s, v;
        for (i("sEcho", t.iDraw), i("iColumns", y), i("sColumns", w(c, "sName").join(",")), i("iDisplayStart", b), i("iDisplayLength", k), s = {
                draw: t.iDraw,
                columns: [],
                order: [],
                start: b,
                length: k,
                search: {
                    value: h.sSearch,
                    regex: h.bRegex
                }
            }, r = 0; r < y; r++) f = c[r], o = d[r], a = typeof f.mData == "function" ? "function" : f.mData, s.columns.push({
            data: a,
            name: f.sName,
            searchable: f.bSearchable,
            orderable: f.bSortable,
            search: {
                value: o.sSearch,
                regex: o.bRegex
            }
        }), i("mDataProp_" + r, a), e.bFilter && (i("sSearch_" + r, o.sSearch), i("bRegex_" + r, o.bRegex), i("bSearchable_" + r, f.bSearchable)), e.bSort && i("bSortable_" + r, f.bSortable);
        return (e.bFilter && (i("sSearch", h.sSearch), i("bRegex", h.bRegex)), e.bSort && (n.each(p, function(n, t) {
            s.order.push({
                column: t.col,
                dir: t.dir
            });
            i("iSortCol_" + n, t.col);
            i("sSortDir_" + n, t.dir)
        }), i("iSortingCols", p.length)), v = u.ext.legacy.ajax, v === null) ? t.sAjaxSource ? l : s : v ? l : s
    }

    function uf(n, t) {
        var u = function(n, i) {
                return t[n] !== r ? t[n] : t[i]
            },
            e = vi(n, t),
            f = u("sEcho", "draw"),
            s = u("iTotalRecords", "recordsTotal"),
            h = u("iTotalDisplayRecords", "recordsFiltered"),
            i, o;
        if (f) {
            if (f * 1 < n.iDraw) return;
            n.iDraw = f * 1
        }
        for (hi(n), n._iRecordsTotal = parseInt(s, 10), n._iRecordsDisplay = parseInt(h, 10), i = 0, o = e.length; i < o; i++) it(n, e[i]);
        n.aiDisplay = n.aiDisplayMaster.slice();
        n.bAjaxDataGet = !1;
        rt(n);
        n._bInitComplete || pi(n, t);
        n.bAjaxDataGet = !0;
        b(n, !1)
    }

    function vi(t, i) {
        var u = n.isPlainObject(t.ajax) && t.ajax.dataSrc !== r ? t.ajax.dataSrc : t.sAjaxDataProp;
        return u === "data" ? i.aaData || i[u] : u !== "" ? ft(u)(i) : i
    }

    function ff(t) {
        var f = t.oClasses,
            e = t.sTableId,
            o = t.oLanguage,
            r = t.oPreviousSearch,
            s = t.aanFeatures,
            h = '<input type="search" class="' + f.sFilterInput + '"/>',
            u = o.sSearch;
        u = u.match(/_INPUT_/) ? u.replace("_INPUT_", h) : u + h;
        var c = n("<div/>", {
                id: s.f ? null : e + "_filter",
                "class": f.sFilter
            }).append(n("<label/>").append(u)),
            l = function() {
                var i = s.f,
                    n = this.value ? this.value : "";
                n != r.sSearch && (gt(t, {
                    sSearch: n,
                    bRegex: r.bRegex,
                    bSmart: r.bSmart,
                    bCaseInsensitive: r.bCaseInsensitive
                }), t._iDisplayStart = 0, rt(t))
            },
            a = t.searchDelay !== null ? t.searchDelay : y(t) === "ssp" ? 400 : 0,
            v = n("input", c).val(r.sSearch).attr("placeholder", o.sSearchPlaceholder).on("keyup.DT search.DT input.DT paste.DT cut.DT", a ? bi(l, a) : l).on("keypress.DT", function(n) {
                if (n.keyCode == 13) return !1
            }).attr("aria-controls", e);
        n(t.nTable).on("search.dt.DT", function(n, u) {
            if (t === u) try {
                v[0] !== i.activeElement && v.val(r.sSearch)
            } catch (f) {}
        });
        return c[0]
    }

    function gt(n, t, i) {
        var e = n.oPreviousSearch,
            f = n.aoPreSearchCols,
            s = function(n) {
                e.sSearch = n.sSearch;
                e.bRegex = n.bRegex;
                e.bSmart = n.bSmart;
                e.bCaseInsensitive = n.bCaseInsensitive
            },
            h = function(n) {
                return n.bEscapeRegex !== r ? !n.bEscapeRegex : n.bRegex
            },
            u;
        if (or(n), y(n) != "ssp") {
            for (sf(n, t.sSearch, i, h(t), t.bSmart, t.bCaseInsensitive), s(t), u = 0; u < f.length; u++) of(n, f[u].sSearch, u, h(f[u]), f[u].bSmart, f[u].bCaseInsensitive);
            ef(n)
        } else s(t);
        n.bFiltered = !0;
        o(n, null, "search", [n])
    }

    function ef(t) {
        for (var s, i, c, h = u.ext.search, r = t.aiDisplay, e, f, o = 0, l = h.length; o < l; o++) {
            for (s = [], i = 0, c = r.length; i < c; i++) f = r[i], e = t.aoData[f], h[o](t, e._aFilterData, f, e._aData, i) && s.push(f);
            r.length = 0;
            n.merge(r, s)
        }
    }

    function of(n, t, i, r, u, f) {
        var e;
        if (t !== "") {
            var s, h = [],
                o = n.aiDisplay,
                c = vr(t, r, u, f);
            for (e = 0; e < o.length; e++) s = n.aoData[o[e]]._aFilterData[i], c.test(s) && h.push(o[e]);
            n.aiDisplay = h
        }
    }

    function sf(n, t, i, r, f, e) {
        var v = vr(t, r, f, e),
            h = n.oPreviousSearch.sSearch,
            c = n.aiDisplayMaster,
            s, l, o, a = [];
        if (u.ext.search.length !== 0 && (i = !0), l = hf(n), t.length <= 0) n.aiDisplay = c.slice();
        else {
            for ((l || i || h.length > t.length || t.indexOf(h) !== 0 || n.bSorted) && (n.aiDisplay = c.slice()), s = n.aiDisplay, o = 0; o < s.length; o++) v.test(n.aoData[s[o]]._sFilterRow) && a.push(s[o]);
            n.aiDisplay = a
        }
    }

    function vr(t, i, r, u) {
        if (t = i ? t : yr(t), r) {
            var f = n.map(t.match(/"[^"]+"|[^ ]+/g) || [""], function(n) {
                if (n.charAt(0) === '"') {
                    var t = n.match(/^"(.*)"$/);
                    n = t ? t[1] : n
                }
                return n.replace('"', "")
            });
            t = "^(?=.*?" + f.join(")(?=.*?") + ").*$"
        }
        return new RegExp(t, u ? "i" : "")
    }

    function hf(n) {
        for (var s = n.aoColumns, f, r, c, e, t, o, l = u.ext.type.search, a = !1, i = 0, h = n.aoData.length; i < h; i++)
            if (o = n.aoData[i], !o._aFilterData) {
                for (e = [], r = 0, c = s.length; r < c; r++) f = s[r], f.bSearchable ? (t = p(n, i, r, "filter"), l[f.sType] && (t = l[f.sType](t)), t === null && (t = ""), typeof t != "string" && t.toString && (t = t.toString())) : t = "", t.indexOf && t.indexOf("&") !== -1 && (yi.innerHTML = t, t = ge ? yi.textContent : yi.innerText), t.replace && (t = t.replace(/[\r\n]/g, "")), e.push(t);
                o._aFilterData = e;
                o._sFilterRow = e.join("  ");
                a = !0
            }
        return a
    }

    function cf(n) {
        return {
            search: n.sSearch,
            smart: n.bSmart,
            regex: n.bRegex,
            caseInsensitive: n.bCaseInsensitive
        }
    }

    function lf(n) {
        return {
            sSearch: n.search,
            bSmart: n.smart,
            bRegex: n.regex,
            bCaseInsensitive: n.caseInsensitive
        }
    }

    function af(t) {
        var i = t.sTableId,
            r = t.aanFeatures.i,
            u = n("<div/>", {
                "class": t.oClasses.sInfo,
                id: r ? null : i + "_info"
            });
        return r || (t.aoDrawCallback.push({
            fn: vf,
            sName: "information"
        }), u.attr("role", "status").attr("aria-live", "polite"), n(t.nTable).attr("aria-describedby", i + "_info")), u[0]
    }

    function vf(t) {
        var e = t.aanFeatures.i,
            f;
        if (e.length !== 0) {
            var r = t.oLanguage,
                s = t._iDisplayStart + 1,
                h = t.fnDisplayEnd(),
                o = t.fnRecordsTotal(),
                u = t.fnRecordsDisplay(),
                i = u ? r.sInfo : r.sInfoEmpty;
            u !== o && (i += " " + r.sInfoFiltered);
            i += r.sInfoPostFix;
            i = yf(t, i);
            f = r.fnInfoCallback;
            f !== null && (i = f.call(t.oInstance, t, s, h, o, u, i));
            n(e).html(i)
        }
    }

    function yf(n, t) {
        var i = n.fnFormatNumber,
            u = n._iDisplayStart + 1,
            r = n._iDisplayLength,
            f = n.fnRecordsDisplay(),
            e = r === -1;
        return t.replace(/_START_/g, i.call(n, u)).replace(/_END_/g, i.call(n, n.fnDisplayEnd())).replace(/_MAX_/g, i.call(n, n.fnRecordsTotal())).replace(/_TOTAL_/g, i.call(n, f)).replace(/_PAGE_/g, i.call(n, e ? 1 : Math.ceil(u / r))).replace(/_PAGES_/g, i.call(n, e ? 1 : Math.ceil(f / r)))
    }

    function ni(n) {
        var t, u, e = n.iInitDisplayStart,
            f = n.aoColumns,
            i, s = n.oFeatures,
            c = n.bDeferLoading,
            r;
        if (!n.bInitialised) {
            setTimeout(function() {
                ni(n)
            }, 200);
            return
        }
        for (nf(n), gu(n), kt(n, n.aoHeader), kt(n, n.aoFooter), b(n, !0), s.bAutoWidth && br(n), t = 0, u = f.length; t < u; t++) i = f[t], i.sWidth && (i.nTh.style.width = h(i.sWidth));
        o(n, null, "preInit", [n]);
        ot(n);
        r = y(n);
        (r != "ssp" || c) && (r == "ajax" ? ai(n, [], function(i) {
            var r = vi(n, i);
            for (t = 0; t < r.length; t++) it(n, r[t]);
            n.iInitDisplayStart = e;
            ot(n);
            b(n, !1);
            pi(n, i)
        }, n) : (b(n, !1), pi(n)))
    }

    function pi(n, t) {
        n._bInitComplete = !0;
        (t || n.oInit.aaData) && vt(n);
        o(n, null, "plugin-init", [n, t]);
        o(n, "aoInitComplete", "init", [n, t])
    }

    function pr(n, t) {
        var i = parseInt(t, 10);
        n._iDisplayLength = i;
        nu(n);
        o(n, null, "length", [n, i])
    }

    function pf(t) {
        for (var i, e = t.oClasses, f = t.sTableId, r = t.aLengthMenu, o = n.isArray(r[0]), s = o ? r[0] : r, c = o ? r[1] : r, h = n("<select/>", {
                name: f + "_length",
                "aria-controls": f,
                "class": e.sLengthSelect
            }), u = 0, l = s.length; u < l; u++) h[0][u] = new Option(c[u], s[u]);
        i = n("<div><label/><\/div>").addClass(e.sLength);
        t.aanFeatures.l || (i[0].id = f + "_length");
        i.children().append(t.oLanguage.sLengthMenu.replace("_MENU_", h[0].outerHTML));
        n("select", i).val(t._iDisplayLength).on("change.DT", function() {
            pr(t, n(this).val());
            rt(t)
        });
        console.log('aa '+_iDisplayLength);
        n(t.nTable).on("length.dt.DT", function(r, u, f) {
            t === u && n("select", i).val(f)
        });
        return i[0]
    }

    function wf(t) {
        var e = t.sPaginationType,
            i = u.ext.pager[e],
            o = typeof i == "function",
            s = function(n) {
                rt(n)
            },
            r = n("<div/>").addClass(t.oClasses.sPaging + e)[0],
            f = t.aanFeatures;
        return o || i.fnInit(t, r, s), f.p || (r.id = t.sTableId + "_paginate", t.aoDrawCallback.push({
            fn: function(n) {
                if (o)
                    for (var l = n._iDisplayStart, r = n._iDisplayLength, a = n.fnRecordsDisplay(), u = r === -1, e = u ? 0 : Math.ceil(l / r), h = u ? 1 : Math.ceil(a / r), v = i(e, h), t = 0, c = f.p.length; t < c; t++) tu(n, "pageButton")(n, f.p[t], t, v, e, h);
                else i.fnUpdate(n, s)
            },
            sName: "pagination"
        })), r
    }

    function wr(n, t, i) {
        var r = n._iDisplayStart,
            u = n._iDisplayLength,
            f = n.fnRecordsDisplay(),
            e;
        return f === 0 || u === -1 ? r = 0 : typeof t == "number" ? (r = t * u, r > f && (r = 0)) : t == "first" ? r = 0 : t == "previous" ? (r = u >= 0 ? r - u : 0, r < 0 && (r = 0)) : t == "next" ? r + u < f && (r += u) : t == "last" ? r = Math.floor((f - 1) / u) * u : tt(n, 0, "Unknown paging action: " + t, 5), e = n._iDisplayStart !== r, n._iDisplayStart = r, e && (o(n, null, "page", [n]), i && rt(n)), e
    }

    function bf(t) {
        return n("<div/>", {
            id: t.aanFeatures.r ? null : t.sTableId + "_processing",
            "class": t.oClasses.sProcessing
        }).html(t.oLanguage.sProcessing).insertBefore(t.nTable)[0]
    }

    function b(t, i) {
        t.oFeatures.bProcessing && n(t.aanFeatures.r).css("display", i ? "block" : "none");
        o(t, null, "processing", [t, i])
    }

    function kf(t) {
        var i = n(t.nTable),
            r, c;
        if (i.attr("role", "grid"), r = t.oScroll, r.sX === "" && r.sY === "") return t.nTable;
        var u = r.sX,
            y = r.sY,
            f = t.oClasses,
            s = i.children("caption"),
            p = s.length ? s[0]._captionSide : null,
            k = n(i[0].cloneNode(!1)),
            d = n(i[0].cloneNode(!1)),
            o = i.children("tfoot"),
            e = "<div/>",
            l = function(n) {
                return n ? h(n) : null
            };
        o.length || (o = null);
        c = n(e, {
            "class": f.sScrollWrapper
        }).append(n(e, {
            "class": f.sScrollHead
        }).css({
            overflow: "hidden",
            position: "relative",
            border: 0,
            width: u ? l(u) : "100%"
        }).append(n(e, {
            "class": f.sScrollHeadInner
        }).css({
            "box-sizing": "content-box",
            width: r.sXInner || "100%"
        }).append(k.removeAttr("id").css("margin-left", 0).append(p === "top" ? s : null).append(i.children("thead"))))).append(n(e, {
            "class": f.sScrollBody
        }).css({
            position: "relative",
            overflow: "auto",
            width: l(u)
        }).append(i));
        o && c.append(n(e, {
            "class": f.sScrollFoot
        }).css({
            overflow: "hidden",
            border: 0,
            width: u ? l(u) : "100%"
        }).append(n(e, {
            "class": f.sScrollFootInner
        }).append(d.removeAttr("id").css("margin-left", 0).append(p === "bottom" ? s : null).append(i.children("tfoot")))));
        var a = c.children(),
            w = a[0],
            v = a[1],
            b = o ? a[2] : null;
        if (u) n(v).on("scroll.DT", function() {
            var n = this.scrollLeft;
            w.scrollLeft = n;
            o && (b.scrollLeft = n)
        });
        return n(v).css(y && r.bCollapse ? "max-height" : "height", y), t.nScrollHead = w, t.nScrollBody = v, t.nScrollFoot = b, t.aoDrawCallback.push({
            fn: wi,
            sName: "scrolling"
        }), c[0]
    }

    function wi(t) {
        var y = t.oScroll,
            k = y.sX,
            g = y.sXInner,
            ri = y.sY,
            e = y.iBarWidth,
            nt = n(t.nScrollHead),
            ui = nt[0].style,
            ct = nt.children("div"),
            lt = ct[0].style,
            fi = ct.children("table"),
            u = t.nScrollBody,
            l = n(u),
            it = u.style,
            ei = n(t.nScrollFoot),
            rt = ei.children("div"),
            oi = rt.children("table"),
            at = n(t.nTHead),
            i = n(t.nTable),
            pt = i[0],
            p = pt.style,
            f = t.nTFoot ? n(t.nTFoot) : null,
            wt = t.oBrowser,
            ut = wt.bScrollOversize,
            si = w(t.aoColumns, "nTh"),
            bt, kt, a, o, b, dt, ft = [],
            et = [],
            gt = [],
            ni = [],
            ti, s, c, ii = function(n) {
                var t = n.style;
                t.paddingTop = "0";
                t.paddingBottom = "0";
                t.borderTopWidth = "0";
                t.borderBottomWidth = "0";
                t.height = 0
            },
            ot = u.scrollHeight > u.clientHeight,
            v, st, ht;
        if (t.scrollBarVis !== ot && t.scrollBarVis !== r) {
            t.scrollBarVis = ot;
            vt(t);
            return
        }
        t.scrollBarVis = ot;
        i.children("thead, tfoot").remove();
        f && (dt = f.clone().prependTo(i), kt = f.find("tr"), o = dt.find("tr"));
        b = at.clone().prependTo(i);
        bt = at.find("tr");
        a = b.find("tr");
        b.find("th, td").removeAttr("tabindex");
        k || (it.width = "100%", nt[0].style.width = "100%");
        n.each(li(t, b), function(n, i) {
            ti = yt(t, n);
            i.style.width = t.aoColumns[ti].sWidth
        });
        f && d(function(n) {
            n.style.width = ""
        }, o);
        c = i.outerWidth();
        k === "" ? (p.width = "100%", ut && (i.find("tbody").height() > u.offsetHeight || l.css("overflow-y") == "scroll") && (p.width = h(i.outerWidth() - e)), c = i.outerWidth()) : g !== "" && (p.width = h(g), c = i.outerWidth());
        d(ii, a);
        d(function(t) {
            gt.push(t.innerHTML);
            ft.push(h(n(t).css("width")))
        }, a);
        d(function(t, i) {
            n.inArray(t, si) !== -1 && (t.style.width = ft[i])
        }, bt);
        n(a).height(0);
        f && (d(ii, o), d(function(t) {
            ni.push(t.innerHTML);
            et.push(h(n(t).css("width")))
        }, o), d(function(n, t) {
            n.style.width = et[t]
        }, kt), n(o).height(0));
        d(function(n, t) {
            n.innerHTML = '<div class="dataTables_sizing" style="height:0;overflow:hidden;">' + gt[t] + "<\/div>";
            n.style.width = ft[t]
        }, a);
        f && d(function(n, t) {
            n.innerHTML = '<div class="dataTables_sizing" style="height:0;overflow:hidden;">' + ni[t] + "<\/div>";
            n.style.width = et[t]
        }, o);
        i.outerWidth() < c ? (s = u.scrollHeight > u.offsetHeight || l.css("overflow-y") == "scroll" ? c + e : c, ut && (u.scrollHeight > u.offsetHeight || l.css("overflow-y") == "scroll") && (p.width = h(s - e)), (k === "" || g !== "") && tt(t, 1, "Possible column misalignment", 6)) : s = "100%";
        it.width = h(s);
        ui.width = h(s);
        f && (t.nScrollFoot.style.width = h(s));
        ri || ut && (it.height = h(pt.offsetHeight + e));
        v = i.outerWidth();
        fi[0].style.width = h(v);
        lt.width = h(v);
        st = i.height() > u.clientHeight || l.css("overflow-y") == "scroll";
        ht = "padding" + (wt.bScrollbarLeft ? "Left" : "Right");
        lt[ht] = st ? e + "px" : "0px";
        f && (oi[0].style.width = h(v), rt[0].style.width = h(v), rt[0].style[ht] = st ? e + "px" : "0px");
        i.children("colgroup").insertBefore(i.children("thead"));
        l.scroll();
        (t.bSorted || t.bFiltered) && !t._drawHold && (u.scrollTop = 0)
    }

    function d(n, t, i) {
        for (var e = 0, u = 0, o = t.length, r, f; u < o;) {
            for (r = t[u].firstChild, f = i ? i[u].firstChild : null; r;) r.nodeType === 1 && (i ? n(r, f, e) : n(r, e), e++), r = r.nextSibling, f = i ? f.nextSibling : null;
            u++
        }
    }

    function br(i) {
        var c = i.nTable,
            l = i.aoColumns,
            y = i.oScroll,
            p = y.sY,
            a = y.sX,
            it = y.sXInner,
            w = l.length,
            e = oi(i, "bVisible"),
            o = n("th", i.nTHead),
            s = c.getAttribute("width"),
            v = c.parentNode,
            rt = !1,
            r, f, b, ut = i.oBrowser,
            ft = ut.bScrollOversize,
            k = c.style.width,
            d, u, et, ot, g, tt;
        for (k && k.indexOf("%") !== -1 && (s = k), r = 0; r < e.length; r++) f = l[e[r]], f.sWidth !== null && (f.sWidth = gf(f.sWidthOrig, v), rt = !0);
        if (!ft && (rt || a || p || w != wt(i) || w != o.length)) {
            for (u = n(c).clone().css("visibility", "hidden").removeAttr("id"), u.find("tbody tr").remove(), et = n("<tr/>").appendTo(u.find("tbody")), u.find("thead, tfoot").remove(), u.append(n(i.nTHead).clone()).append(n(i.nTFoot).clone()), u.find("tfoot th, tfoot td").css("width", ""), o = li(i, u.find("thead")[0]), r = 0; r < e.length; r++) f = l[e[r]], o[r].style.width = f.sWidthOrig !== null && f.sWidthOrig !== "" ? h(f.sWidthOrig) : "", f.sWidthOrig && a && n(o[r]).append(n("<div/>").css({
                width: f.sWidthOrig,
                margin: 0,
                padding: 0,
                border: 0,
                height: 1
            }));
            if (i.aoData.length)
                for (r = 0; r < e.length; r++) b = e[r], f = l[b], n(ne(i, b)).clone(!1).append(f.sContentPadding).appendTo(et);
            for (n("[name]", u).removeAttr("name"), ot = n("<div/>").css(a || p ? {
                    position: "absolute",
                    top: 0,
                    left: 0,
                    height: 1,
                    right: 0,
                    overflow: "hidden"
                } : {}).append(u).appendTo(v), a && it ? u.width(it) : a ? (u.css("width", "auto"), u.removeAttr("width"), u.width() < v.clientWidth && s && u.width(v.clientWidth)) : p ? u.width(v.clientWidth) : s && u.width(s), g = 0, r = 0; r < e.length; r++) {
                var nt = n(o[r]),
                    ht = nt.outerWidth() - nt.width(),
                    st = ut.bBounding ? Math.ceil(o[r].getBoundingClientRect().width) : nt.outerWidth();
                g += st;
                l[e[r]].sWidth = h(st - ht)
            }
            c.style.width = h(g);
            ot.remove()
        } else
            for (r = 0; r < w; r++) d = yt(i, r), d !== null && (l[d].sWidth = h(o.eq(r).width()));
        s && (c.style.width = h(s));
        (s || a) && !i._reszEvt && (tt = function() {
            n(t).on("resize.DT-" + i.sInstance, bi(function() {
                vt(i)
            }))
        }, ft ? setTimeout(tt, 1e3) : tt(), i._reszEvt = !0)
    }

    function gf(t, r) {
        if (!t) return 0;
        var u = n("<div/>").css("width", h(t)).appendTo(r || i.body),
            f = u[0].offsetWidth;
        return u.remove(), f
    }

    function ne(t, i) {
        var r = te(t, i),
            u;
        return r < 0 ? null : (u = t.aoData[r], u.nTr ? u.anCells[i] : n("<td/>").html(p(t, r, i, "display"))[0])
    }

    function te(n, t) {
        for (var i, u = -1, f = -1, r = 0, e = n.aoData.length; r < e; r++) i = p(n, r, t, "display") + "", i = i.replace(df, ""), i = i.replace(/&nbsp;/g, " "), i.length > u && (u = i.length, f = r);
        return f
    }

    function h(n) {
        return n === null ? "0px" : typeof n == "number" ? n < 0 ? "0px" : n + "px" : n.match(/\d$/) ? n + "px" : n
    }

    function ct(t) {
        var i, o, y, p = [],
            c = t.aoColumns,
            l, s, a, v, e = t.aaSortingFixed,
            w = n.isPlainObject(e),
            f = [],
            h = function(t) {
                t.length && !n.isArray(t[0]) ? f.push(t) : n.merge(f, t)
            };
        for (n.isArray(e) && h(e), w && e.pre && h(e.pre), h(t.aaSorting), w && e.post && h(e.post), i = 0; i < f.length; i++)
            for (v = f[i][0], l = c[v].aDataSort, o = 0, y = l.length; o < y; o++) s = l[o], a = c[s].sType || "string", f[i]._idx === r && (f[i]._idx = n.inArray(f[i][1], c[s].asSorting)), p.push({
                src: v,
                col: s,
                dir: f[i][1],
                index: f[i]._idx,
                type: a,
                formatter: u.ext.type.order[a + "-pre"]
            });
        return p
    }

    function ie(n) {
        var t, s, h, r = [],
            c = u.ext.type.order,
            f = n.aoData,
            a = n.aoColumns,
            l = 0,
            o, e = n.aiDisplayMaster,
            i;
        for (or(n), i = ct(n), t = 0, s = i.length; t < s; t++) o = i[t], o.formatter && l++, ue(n, o.col);
        if (y(n) != "ssp" && i.length !== 0) {
            for (t = 0, h = e.length; t < h; t++) r[e[t]] = t;
            l === i.length ? e.sort(function(n, t) {
                for (var u, e, s, h, c = i.length, l = f[n]._aSortData, a = f[t]._aSortData, o = 0; o < c; o++)
                    if (h = i[o], u = l[h.col], e = a[h.col], s = u < e ? -1 : u > e ? 1 : 0, s !== 0) return h.dir === "asc" ? s : -s;
                return u = r[n], e = r[t], u < e ? -1 : u > e ? 1 : 0
            }) : e.sort(function(n, t) {
                for (var e, o, h, u, l, a = i.length, v = f[n]._aSortData, y = f[t]._aSortData, s = 0; s < a; s++)
                    if (u = i[s], e = v[u.col], o = y[u.col], l = c[u.type + "-" + u.dir] || c["string-" + u.dir], h = l(e, o), h !== 0) return h;
                return e = r[n], o = r[t], e < o ? -1 : e > o ? 1 : 0
            })
        }
        n.bSorted = !0
    }

    function re(n) {
        for (var u, f, s = n.aoColumns, t = ct(n), h = n.oLanguage.oAria, i = 0, l = s.length; i < l; i++) {
            var r = s[i],
                e = r.asSorting,
                c = r.sTitle.replace(/<.*?>/g, ""),
                o = r.nTh;
            o.removeAttribute("aria-sort");
            r.bSortable ? (t.length > 0 && t[0].col == i ? (o.setAttribute("aria-sort", t[0].dir == "asc" ? "ascending" : "descending"), f = e[t[0].index + 1] || e[0]) : f = e[0], u = c + (f === "asc" ? h.sSortAscending : h.sSortDescending)) : u = c;
            o.setAttribute("aria-label", u)
        }
    }

    function kr(t, i, u, f) {
        var l = t.aoColumns[i],
            e = t.aaSorting,
            s = l.asSorting,
            o, c = function(t, i) {
                var u = t._idx;
                return u === r && (u = n.inArray(t[1], s)), u + 1 < s.length ? u + 1 : i ? null : 0
            },
            h;
        typeof e[0] == "number" && (e = t.aaSorting = [e]);
        u && t.oFeatures.bSortMulti ? (h = n.inArray(i, w(e, "0")), h !== -1 ? (o = c(e[h], !0), o === null && e.length === 1 && (o = 0), o === null ? e.splice(h, 1) : (e[h][1] = s[o], e[h]._idx = o)) : (e.push([i, s[0], 0]), e[e.length - 1]._idx = 0)) : e.length && e[0][0] == i ? (o = c(e[0]), e.length = 1, e[0][1] = s[o], e[0]._idx = o) : (e.length = 0, e.push([i, s[0]]), e[0]._idx = 0);
        ot(t);
        typeof f == "function" && f(t)
    }

    function dr(n, t, i, r) {
        var u = n.aoColumns[i];
        gr(t, {}, function(t) {
            u.bSortable !== !1 && (n.oFeatures.bProcessing ? (b(n, !0), setTimeout(function() {
                kr(n, i, t.shiftKey, r);
                y(n) !== "ssp" && b(n, !1)
            }, 0)) : kr(n, i, t.shiftKey, r))
        })
    }

    function ki(t) {
        var e = t.aLastSort,
            o = t.oClasses.sSortColumn,
            f = ct(t),
            s = t.oFeatures,
            i, r, u;
        if (s.bSort && s.bSortClasses) {
            for (i = 0, r = e.length; i < r; i++) u = e[i].src, n(w(t.aoData, "anCells", u)).removeClass(o + (i < 2 ? i + 1 : 3));
            for (i = 0, r = f.length; i < r; i++) u = f[i].src, n(w(t.aoData, "anCells", u)).addClass(o + (i < 2 ? i + 1 : 3))
        }
        t.aLastSort = f
    }

    function ue(n, t) {
        var s = n.aoColumns[t],
            f = u.ext.order[s.sSortDataType],
            h, r, e, o, i, c;
        for (f && (h = f.call(n.oInstance, n, t, pt(n, t))), o = u.ext.type.order[s.sType + "-pre"], i = 0, c = n.aoData.length; i < c; i++) r = n.aoData[i], r._aSortData || (r._aSortData = []), (!r._aSortData[t] || f) && (e = f ? h[i] : p(n, i, t, "sort"), r._aSortData[t] = o ? o(e) : e)
    }

    function di(t) {
        if (t.oFeatures.bStateSave && !t.bDestroying) {
            var i = {
                time: +new Date,
                start: t._iDisplayStart,
                length: t._iDisplayLength,
                order: n.extend(!0, [], t.aaSorting),
                search: cf(t.oPreviousSearch),
                columns: n.map(t.aoColumns, function(n, i) {
                    return {
                        visible: n.bVisible,
                        search: cf(t.aoPreSearchCols[i])
                    }
                })
            };
            o(t, "aoStateSaveParams", "stateSaveParams", [t, i]);
            t.oSavedState = i;
            t.fnStateSaveCallback.call(t.oInstance, t, i)
        }
    }

    function fe(t, i, u) {
        var f, h, s = t.aoColumns,
            c = function(i) {
                var a, l, c;
                if (!i || !i.time) {
                    u();
                    return
                }
                if (a = o(t, "aoStateLoadParams", "stateLoadParams", [t, e]), n.inArray(!1, a) !== -1) {
                    u();
                    return
                }
                if (l = t.iStateDuration, l > 0 && i.time < +new Date - l * 1e3) {
                    u();
                    return
                }
                if (i.columns && s.length !== i.columns.length) {
                    u();
                    return
                }
                if (t.oLoadedState = n.extend(!0, {}, e), i.start !== r && (t._iDisplayStart = i.start, t.iInitDisplayStart = i.start), i.length !== r && (t._iDisplayLength = i.length), i.order !== r && (t.aaSorting = [], n.each(i.order, function(n, i) {
                        t.aaSorting.push(i[0] >= s.length ? [0, i[1]] : i)
                    })), i.search !== r && n.extend(t.oPreviousSearch, lf(i.search)), i.columns)
                    for (f = 0, h = i.columns.length; f < h; f++) c = i.columns[f], c.visible !== r && (s[f].bVisible = c.visible), c.search !== r && n.extend(t.aoPreSearchCols[f], lf(c.search));
                o(t, "aoStateLoaded", "stateLoaded", [t, e]);
                u()
            },
            e;
        if (!t.oFeatures.bStateSave) {
            u();
            return
        }
        e = t.fnStateLoadCallback.call(t.oInstance, t, c);
        e !== r && c(e)
    }

    function gi(t) {
        var i = u.settings,
            r = n.inArray(t, w(i, "nTable"));
        return r !== -1 ? i[r] : null
    }

    function tt(n, i, r, f) {
        if (r = "DataTables warning: " + (n ? "table id=" + n.sTableId + " - " : "") + r, f && (r += ". For more information about this error, please see http://datatables.net/tn/" + f), i) t.console && console.log && console.log(r);
        else {
            var s = u.ext,
                e = s.sErrMode || s.errMode;
            if (n && o(n, null, "error", [n, f, r]), e == "alert") alert(r);
            else if (e == "throw") throw new Error(r);
            else typeof e == "function" && e(n, f, r)
        }
    }

    function k(t, i, u, f) {
        if (n.isArray(u)) {
            n.each(u, function(r, u) {
                n.isArray(u) ? k(t, i, u[0], u[1]) : k(t, i, u)
            });
            return
        }
        f === r && (f = u);
        i[u] !== r && (t[f] = i[u])
    }

    function ee(t, i, r) {
        var f;
        for (var u in i) i.hasOwnProperty(u) && (f = i[u], n.isPlainObject(f) ? (n.isPlainObject(t[u]) || (t[u] = {}), n.extend(!0, t[u], f)) : t[u] = r && u !== "data" && u !== "aaData" && n.isArray(f) ? f.slice() : f);
        return t
    }

    function gr(t, i, r) {
        n(t).on("click.DT", i, function(n) {
            t.blur();
            r(n)
        }).on("keypress.DT", i, function(n) {
            n.which === 13 && (n.preventDefault(), r(n))
        }).on("selectstart.DT", function() {
            return !1
        })
    }

    function v(n, t, i, r) {
        i && n[t].push({
            fn: i,
            sName: r
        })
    }

    function o(t, i, r, u) {
        var f = [],
            e;
        return i && (f = n.map(t[i].slice().reverse(), function(n) {
            return n.fn.apply(t.oInstance, u)
        })), r !== null && (e = n.Event(r + ".dt"), n(t.nTable).trigger(e, u), f.push(e.result)), f
    }

    function nu(n) {
        var t = n._iDisplayStart,
            r = n.fnDisplayEnd(),
            i = n._iDisplayLength;
        t >= r && (t = r - i);
        t -= t % i;
        (i === -1 || t < 0) && (t = 0);
        n._iDisplayStart = t
    }

    function tu(t, i) {
        var r = t.renderer,
            f = u.ext.renderer[i];
        return n.isPlainObject(r) && r[i] ? f[r[i]] || f._ : typeof r == "string" ? f[r] || f._ : f._
    }

    function y(n) {
        return n.oFeatures.bServerSide ? "ssp" : n.ajax || n.sAjaxSource ? "ajax" : "dom"
    }

    function ii(n, t) {
        var i = [],
            r = ou.numbers_length,
            u = Math.floor(r / 2);
        return t <= r ? i = st(0, t) : n <= u ? (i = st(0, r - 2), i.push("ellipsis"), i.push(t - 1)) : n >= t - 1 - u ? (i = st(t - (r - 2), t), i.splice(0, 0, "ellipsis"), i.splice(0, 0, 0)) : (i = st(n - u + 2, n + u - 1), i.push("ellipsis"), i.push(t - 1), i.splice(0, 0, "ellipsis"), i.splice(0, 0, 0)), i.DT_el = "span", i
    }

    function ae(t) {
        n.each({
            num: function(n) {
                return ri(n, t)
            },
            "num-fmt": function(n) {
                return ri(n, t, rr)
            },
            "html-num": function(n) {
                return ri(n, t, ui)
            },
            "html-num-fmt": function(n) {
                return ri(n, t, ui, rr)
            }
        }, function(n, i) {
            c.type.order[n + t + "-pre"] = i;
            n.match(/^html\-/) && (c.type.search[n + t] = c.type.search.html)
        })
    }

    function ve(n) {
        return function() {
            var t = [gi(this[u.ext.iApiIndex])].concat(Array.prototype.slice.call(arguments));
            return u.ext.internal[n].apply(this, t)
        }
    }
    var u = function(t) {
            var f;
            this.$ = function(n, t) {
                return this.api(!0).$(n, t)
            };
            this._ = function(n, t) {
                return this.api(!0).rows(n, t).data()
            };
            this.api = function(n) {
                return n ? new e(gi(this[c.iApiIndex])) : new e(this)
            };
            this.fnAddData = function(t, i) {
                var u = this.api(!0),
                    f = n.isArray(t) && (n.isArray(t[0]) || n.isPlainObject(t[0])) ? u.rows.add(t) : u.row.add(t);
                return (i === r || i) && u.draw(), f.flatten().toArray()
            };
            this.fnAdjustColumnSizing = function(n) {
                var t = this.api(!0).columns.adjust(),
                    i = t.settings()[0],
                    u = i.oScroll;
                n === r || n ? t.draw(!1) : (u.sX !== "" || u.sY !== "") && wi(i)
            };
            this.fnClearTable = function(n) {
                var t = this.api(!0).clear();
                (n === r || n) && t.draw()
            };
            this.fnClose = function(n) {
                this.api(!0).row(n).child.hide()
            };
            this.fnDeleteRow = function(n, t, i) {
                var f = this.api(!0),
                    u = f.rows(n),
                    e = u.settings()[0],
                    o = e.aoData[u[0][0]];
                return u.remove(), t && t.call(this, e, o), (i === r || i) && f.draw(), o
            };
            this.fnDestroy = function(n) {
                this.api(!0).destroy(n)
            };
            this.fnDraw = function(n) {
                this.api(!0).draw(n)
            };
            this.fnFilter = function(n, t, i, u, f, e) {
                var o = this.api(!0);
                t === null || t === r ? o.search(n, i, u, e) : o.column(t).search(n, i, u, e);
                o.draw()
            };
            this.fnGetData = function(n, t) {
                var i = this.api(!0),
                    u;
                return n !== r ? (u = n.nodeName ? n.nodeName.toLowerCase() : "", t !== r || u == "td" || u == "th" ? i.cell(n, t).data() : i.row(n).data() || null) : i.data().toArray()
            };
            this.fnGetNodes = function(n) {
                var t = this.api(!0);
                return n !== r ? t.row(n).node() : t.rows().nodes().flatten().toArray()
            };
            this.fnGetPosition = function(n) {
                var r = this.api(!0),
                    i = n.nodeName.toUpperCase(),
                    t;
                return i == "TR" ? r.row(n).index() : i == "TD" || i == "TH" ? (t = r.cell(n).index(), [t.row, t.columnVisible, t.column]) : null
            };
            this.fnIsOpen = function(n) {
                return this.api(!0).row(n).child.isShown()
            };
            this.fnOpen = function(n, t, i) {
                return this.api(!0).row(n).child(t, i).show().child()[0]
            };
            this.fnPageChange = function(n, t) {
                var i = this.api(!0).page(n);
                (t === r || t) && i.draw(!1)
            };
            this.fnSetColumnVis = function(n, t, i) {
                var u = this.api(!0).column(n).visible(t);
                (i === r || i) && u.columns.adjust().draw()
            };
            this.fnSettings = function() {
                return gi(this[c.iApiIndex])
            };
            this.fnSort = function(n) {
                this.api(!0).order(n).draw()
            };
            this.fnSortListener = function(n, t, i) {
                this.api(!0).order.listener(n, t, i)
            };
            this.fnUpdate = function(n, t, i, u, f) {
                var e = this.api(!0);
                return i === r || i === null ? e.row(t).data(n) : e.cell(t, i).data(n), (f === r || f) && e.columns.adjust(), (u === r || u) && e.draw(), 0
            };
            this.fnVersionCheck = c.fnVersionCheck;
            var i = this,
                s = t === r,
                h = this.length;
            s && (t = {});
            this.oApi = this.internal = c.internal;
            for (f in u.ext.internal) f && (this[f] = ve(f));
            return this.each(function() {
                var e = h > 1 ? ee({}, t, !0) : t,
                    c = 0,
                    w, d = this.getAttribute("id"),
                    pt = !1,
                    l = u.defaults,
                    a = n(this),
                    g, p, wt, bt, f, b, at, rt, st, ht, ut, et, vt, ot, lt, yt;
                if (this.nodeName.toLowerCase() != "table") {
                    tt(null, 0, "Non-table node initialisation (" + this.nodeName + ")", 2);
                    return
                }
                for (yu(l), pu(l.column), nt(l, l, !0), nt(l.column, l.column, !0), nt(l, n.extend(e, a.data())), g = u.settings, c = 0, w = g.length; c < w; c++) {
                    if (p = g[c], p.nTable == this || p.nTHead.parentNode == this || p.nTFoot && p.nTFoot.parentNode == this) {
                        if (wt = e.bRetrieve !== r ? e.bRetrieve : l.bRetrieve, bt = e.bDestroy !== r ? e.bDestroy : l.bDestroy, s || wt) return p.oInstance;
                        if (bt) {
                            p.oInstance.fnDestroy();
                            break
                        } else {
                            tt(p, 0, "Cannot reinitialise DataTable", 3);
                            return
                        }
                    }
                    if (p.sTableId == this.id) {
                        g.splice(c, 1);
                        break
                    }
                }
                if ((d === null || d === "") && (d = "DataTables_Table_" + u.ext._unique++, this.id = d), f = n.extend(!0, {}, u.models.oSettings, {
                        sDestroyWidth: a[0].style.width,
                        sInstance: d,
                        sTableId: d
                    }), f.nTable = this, f.oApi = i.internal, f.oInit = e, g.push(f), f.oInstance = i.length === 1 ? i : a.dataTable(), yu(e), e.oLanguage && fr(e.oLanguage), e.aLengthMenu && !e.iDisplayLength && (e.iDisplayLength = n.isArray(e.aLengthMenu[0]) ? e.aLengthMenu[0][0] : e.aLengthMenu[0]), e = ee(n.extend(!0, {}, l), e), k(f.oFeatures, e, ["bPaginate", "bLengthChange", "bFilter", "bSort", "bSortMulti", "bInfo", "bProcessing", "bAutoWidth", "bSortClasses", "bServerSide", "bDeferRender"]), k(f, e, ["asStripeClasses", "ajax", "fnServerData", "fnFormatNumber", "sServerMethod", "aaSorting", "aaSortingFixed", "aLengthMenu", "sPaginationType", "sAjaxSource", "sAjaxDataProp", "iStateDuration", "sDom", "bSortCellsTop", "iTabIndex", "fnStateLoadCallback", "fnStateSaveCallback", "renderer", "searchDelay", "rowId", ["iCookieDuration", "iStateDuration"],
                        ["oSearch", "oPreviousSearch"],
                        ["aoSearchCols", "aoPreSearchCols"],
                        ["iDisplayLength", "_iDisplayLength"],
                        ["bJQueryUI", "bJUI"]
                    ]), k(f.oScroll, e, [
                        ["sScrollX", "sX"],
                        ["sScrollXInner", "sXInner"],
                        ["sScrollY", "sY"],
                        ["bScrollCollapse", "bCollapse"]
                    ]), k(f.oLanguage, e, "fnInfoCallback"), v(f, "aoDrawCallback", e.fnDrawCallback, "user"), v(f, "aoServerParams", e.fnServerParams, "user"), v(f, "aoStateSaveParams", e.fnStateSaveParams, "user"), v(f, "aoStateLoadParams", e.fnStateLoadParams, "user"), v(f, "aoStateLoaded", e.fnStateLoaded, "user"), v(f, "aoRowCallback", e.fnRowCallback, "user"), v(f, "aoRowCreatedCallback", e.fnCreatedRow, "user"), v(f, "aoHeaderCallback", e.fnHeaderCallback, "user"), v(f, "aoFooterCallback", e.fnFooterCallback, "user"), v(f, "aoInitComplete", e.fnInitComplete, "user"), v(f, "aoPreDrawCallback", e.fnPreDrawCallback, "user"), f.rowIdFn = ft(e.rowId), wu(f), b = f.oClasses, e.bJQueryUI ? (n.extend(b, u.ext.oJUIClasses, e.oClasses), e.sDom === l.sDom && l.sDom === "lfrtip" && (f.sDom = '<"H"lfr>t<"F"ip>'), f.renderer ? n.isPlainObject(f.renderer) && !f.renderer.header && (f.renderer.header = "jqueryui") : f.renderer = "jqueryui") : n.extend(b, u.ext.classes, e.oClasses), a.addClass(b.sTable), f.iInitDisplayStart === r && (f.iInitDisplayStart = e.iDisplayStart, f._iDisplayStart = e.iDisplayStart), e.iDeferLoading !== null && (f.bDeferLoading = !0, at = n.isArray(e.iDeferLoading), f._iRecordsDisplay = at ? e.iDeferLoading[0] : e.iDeferLoading, f._iRecordsTotal = at ? e.iDeferLoading[1] : e.iDeferLoading), rt = f.oLanguage, n.extend(!0, rt, e.oLanguage), rt.sUrl && (n.ajax({
                        dataType: "json",
                        url: rt.sUrl,
                        success: function(t) {
                            fr(t);
                            nt(l.oLanguage, t);
                            n.extend(!0, rt, t);
                            ni(f)
                        },
                        error: function() {
                            ni(f)
                        }
                    }), pt = !0), e.asStripeClasses === null && (f.asStripeClasses = [b.sStripeOdd, b.sStripeEven]), st = f.asStripeClasses, ht = a.children("tbody").find("tr").eq(0), n.inArray(!0, n.map(st, function(n) {
                        return ht.hasClass(n)
                    })) !== -1 && (n("tbody tr", this).removeClass(st.join(" ")), f.asDestroyStripes = st.slice()), ut = [], vt = this.getElementsByTagName("thead"), vt.length !== 0 && (dt(f.aoHeader, vt[0]), ut = li(f)), e.aoColumns === null)
                    for (et = [], c = 0, w = ut.length; c < w; c++) et.push(null);
                else et = e.aoColumns;
                for (c = 0, w = et.length; c < w; c++) er(f, ut ? ut[c] : null);
                ku(f, e.aoColumnDefs, et, function(n, t) {
                    ei(f, n, t)
                });
                ht.length && (ot = function(n, t) {
                    return n.getAttribute("data-" + t) !== null ? t : null
                }, n(ht[0]).children("th, td").each(function(n, t) {
                    var e = f.aoColumns[n],
                        i, u;
                    e.mData === n && (i = ot(t, "sort") || ot(t, "order"), u = ot(t, "filter") || ot(t, "search"), (i !== null || u !== null) && (e.mData = {
                        _: n + ".display",
                        sort: i !== null ? n + ".@data-" + i : r,
                        type: i !== null ? n + ".@data-" + i : r,
                        filter: u !== null ? n + ".@data-" + u : r
                    }, ei(f, n)))
                }));
                lt = f.oFeatures;
                yt = function() {
                    var s, h, i, u, t;
                    if (e.aaSorting === r)
                        for (s = f.aaSorting, c = 0, w = s.length; c < w; c++) s[c][1] = f.aoColumns[c].asSorting[0];
                    if (ki(f), lt.bSort && v(f, "aoDrawCallback", function() {
                            if (f.bSorted) {
                                var t = ct(f),
                                    i = {};
                                n.each(t, function(n, t) {
                                    i[t.src] = t.dir
                                });
                                o(f, null, "order", [f, t, i]);
                                re(f)
                            }
                        }), v(f, "aoDrawCallback", function() {
                            (f.bSorted || y(f) === "ssp" || lt.bDeferRender) && ki(f)
                        }, "sc"), h = a.children("caption").each(function() {
                            this._captionSide = n(this).css("caption-side")
                        }), i = a.children("thead"), i.length === 0 && (i = n("<thead/>").appendTo(a)), f.nTHead = i[0], u = a.children("tbody"), u.length === 0 && (u = n("<tbody/>").appendTo(a)), f.nTBody = u[0], t = a.children("tfoot"), t.length === 0 && h.length > 0 && (f.oScroll.sX !== "" || f.oScroll.sY !== "") && (t = n("<tfoot/>").appendTo(a)), t.length === 0 || t.children().length === 0 ? a.addClass(b.sNoFooter) : t.length > 0 && (f.nTFoot = t[0], dt(f.aoFooter, f.nTFoot)), e.aaData)
                        for (c = 0; c < e.aaData.length; c++) it(f, e.aaData[c]);
                    else(f.bDeferLoading || y(f) == "dom") && si(f, n(f.nTBody).children("tr"));
                    f.aiDisplay = f.aiDisplayMaster.slice();
                    f.bInitialised = !0;
                    pt === !1 && ni(f)
                };
                e.bStateSave ? (lt.bStateSave = !0, v(f, "aoDrawCallback", di, "state_save"), fe(f, e, yt)) : yt()
            }), i = null, this
        },
        c, e, f, s, ir = {},
        hu = /[\r\n]/g,
        ui = /<.*?>/g,
        ye = /^\d{2,4}[\.\/\-]\d{1,2}[\.\/\-]\d{1,2}([T ]{1}\d{1,2}[:\.]\d{2}([\.:]\d{2})?)?$/,
        pe = new RegExp("(\\/|\\.|\\*|\\+|\\?|\\||\\(|\\)|\\[|\\]|\\{|\\}|\\\\|\\$|\\^|\\-)", "g"),
        rr = /[',$Â£â‚¬Â¥%\u2009\u202F\u20BD\u20a9\u20BArfk]/gi,
        g = function(n) {
            return !n || n === !0 || n === "-" ? !0 : !1
        },
        cu = function(n) {
            var t = parseInt(n, 10);
            return !isNaN(t) && isFinite(n) ? t : null
        },
        lu = function(n, t) {
            return ir[t] || (ir[t] = new RegExp(yr(t), "g")), typeof n == "string" && t !== "." ? n.replace(/\./g, "").replace(ir[t], ".") : n
        },
        ur = function(n, t, i) {
            var r = typeof n == "string";
            return g(n) ? !0 : (t && r && (n = lu(n, t)), i && r && (n = n.replace(rr, "")), !isNaN(parseFloat(n)) && isFinite(n))
        },
        we = function(n) {
            return g(n) || typeof n == "string"
        },
        au = function(n, t, i) {
            if (g(n)) return !0;
            var r = we(n);
            return r ? ur(be(n), t, i) ? !0 : null : null
        },
        w = function(n, t, i) {
            var f = [],
                u = 0,
                e = n.length;
            if (i !== r)
                for (; u < e; u++) n[u] && n[u][t] && f.push(n[u][t][i]);
            else
                for (; u < e; u++) n[u] && f.push(n[u][t]);
            return f
        },
        lt = function(n, t, i, u) {
            var e = [],
                f = 0,
                o = t.length;
            if (u !== r)
                for (; f < o; f++) n[t[f]][i] && e.push(n[t[f]][i][u]);
            else
                for (; f < o; f++) e.push(n[t[f]][i]);
            return e
        },
        st = function(n, t) {
            var f = [],
                u, i;
            for (t === r ? (t = 0, u = n) : (u = t, t = n), i = t; i < u; i++) f.push(i);
            return f
        },
        vu = function(n) {
            for (var i = [], t = 0, r = n.length; t < r; t++) n[t] && i.push(n[t]);
            return i
        },
        be = function(n) {
            return n.replace(ui, "")
        },
        fi = function(n) {
            var r = [],
                u, t, e = n.length,
                i, f = 0;
            n: for (t = 0; t < e; t++) {
                for (u = n[t], i = 0; i < f; i++)
                    if (r[i] === u) continue n;
                r.push(u);
                f++
            }
            return r
        },
        a, ht, ut, df, bi, se, iu, le, ou, ri, su;
    u.util = {
        throttle: function(n, t) {
            var u = t !== r ? t : 200,
                i, f;
            return function() {
                var t = this,
                    e = +new Date,
                    o = arguments;
                i && e < i + u ? (clearTimeout(f), f = setTimeout(function() {
                    i = r;
                    n.apply(t, o)
                }, u)) : (i = e, n.apply(t, o))
            }
        },
        escapeRegex: function(n) {
            return n.replace(pe, "\\$1")
        }
    };
    a = function(n, t, i) {
        n[t] !== r && (n[i] = n[t])
    };
    ht = /\[.*?\]$/;
    ut = /\(\)$/;
    var yr = u.util.escapeRegex,
        yi = n("<div>")[0],
        ge = yi.textContent !== r;
    df = /<.*?>/g;
    bi = u.util.throttle;
    var oe = [],
        l = Array.prototype,
        no = function(t) {
            var i, r, f = u.settings,
                e = n.map(f, function(n) {
                    return n.nTable
                });
            if (t) {
                if (t.nTable && t.oApi) return [t];
                if (t.nodeName && t.nodeName.toLowerCase() === "table") return i = n.inArray(t, e), i !== -1 ? [f[i]] : null;
                if (t && typeof t.settings == "function") return t.settings().toArray();
                typeof t == "string" ? r = n(t) : t instanceof n && (r = t)
            } else return [];
            if (r) return r.map(function() {
                return i = n.inArray(this, e), i !== -1 ? f[i] : null
            }).toArray()
        };
    e = function(t, i) {
        var r, f, u, o;
        if (!(this instanceof e)) return new e(t, i);
        if (r = [], f = function(n) {
                var t = no(n);
                t && (r = r.concat(t))
            }, n.isArray(t))
            for (u = 0, o = t.length; u < o; u++) f(t[u]);
        else f(t);
        this.context = fi(r);
        i && n.merge(this, i);
        this.selector = {
            rows: null,
            cols: null,
            opts: null
        };
        e.extend(this, this, oe)
    };
    u.Api = e;
    n.extend(e.prototype, {
        any: function() {
            return this.count() !== 0
        },
        concat: l.concat,
        context: [],
        count: function() {
            return this.flatten().length
        },
        each: function(n) {
            for (var t = 0, i = this.length; t < i; t++) n.call(this, this[t], t, this);
            return this
        },
        eq: function(n) {
            var t = this.context;
            return t.length > n ? new e(t[n], this[n]) : null
        },
        filter: function(n) {
            var i = [],
                t, r;
            if (l.filter) i = l.filter.call(this, n, this);
            else
                for (t = 0, r = this.length; t < r; t++) n.call(this, this[t], t, this) && i.push(this[t]);
            return new e(this.context, i)
        },
        flatten: function() {
            var n = [];
            return new e(this.context, n.concat.apply(n, this.toArray()))
        },
        join: l.join,
        indexOf: l.indexOf || function(n, t) {
            for (var i = t || 0, r = this.length; i < r; i++)
                if (this[i] === n) return i;
            return -1
        },
        iterator: function(n, t, i, u) {
            var h = [],
                o, f, b, c, k, s = this.context,
                d, p, a, v = this.selector,
                l, w, y;
            for (typeof n == "string" && (u = i, i = t, t = n, n = !1), f = 0, b = s.length; f < b; f++)
                if (l = new e(s[f]), t === "table") o = i.call(l, s[f], f), o !== r && h.push(o);
                else if (t === "columns" || t === "rows") o = i.call(l, s[f], this[f], f), o !== r && h.push(o);
            else if (t === "column" || t === "column-rows" || t === "row" || t === "cell")
                for (p = this[f], t === "column-rows" && (d = nr(s[f], v.opts)), c = 0, k = p.length; c < k; c++) a = p[c], o = t === "cell" ? i.call(l, s[f], a.row, a.column, f, c) : i.call(l, s[f], a, f, c, d), o !== r && h.push(o);
            return h.length || u ? (w = new e(s, n ? h.concat.apply([], h) : h), y = w.selector, y.rows = v.rows, y.cols = v.cols, y.opts = v.opts, w) : this
        },
        lastIndexOf: l.lastIndexOf || function() {
            return this.indexOf.apply(this.toArray.reverse(), arguments)
        },
        length: 0,
        map: function(n) {
            var i = [],
                t, r;
            if (l.map) i = l.map.call(this, n, this);
            else
                for (t = 0, r = this.length; t < r; t++) i.push(n.call(this, this[t], t));
            return new e(this.context, i)
        },
        pluck: function(n) {
            return this.map(function(t) {
                return t[n]
            })
        },
        pop: l.pop,
        push: l.push,
        reduce: l.reduce || function(n, t) {
            return bu(this, n, t, 0, this.length, 1)
        },
        reduceRight: l.reduceRight || function(n, t) {
            return bu(this, n, t, this.length - 1, -1, -1)
        },
        reverse: l.reverse,
        selector: null,
        shift: l.shift,
        sort: l.sort,
        splice: l.splice,
        toArray: function() {
            return l.slice.call(this)
        },
        to$: function() {
            return n(this)
        },
        toJQuery: function() {
            return n(this)
        },
        unique: function() {
            return new e(this.context, fi(this))
        },
        unshift: l.unshift
    });
    e.extend = function(t, i, r) {
        if (r.length && i && (i instanceof e || i.__dt_wrapper))
            for (var u, s = function(n, t, i) {
                    return function() {
                        var r = t.apply(n, arguments);
                        return e.extend(r, r, i.methodExt), r
                    }
                }, f = 0, o = r.length; f < o; f++) u = r[f], i[u.name] = typeof u.val == "function" ? s(t, u.val, u) : n.isPlainObject(u.val) ? {} : u.val, i[u.name].__dt_wrapper = !0, e.extend(t, i[u.name], u.propExt)
    };
    e.register = f = function(t, i) {
        var f, a, u;
        if (n.isArray(t)) {
            for (f = 0, a = t.length; f < a; f++) e.register(t[f], i);
            return
        }
        for (var o = t.split("."), h = oe, c, l, v = function(n, t) {
                for (var i = 0, r = n.length; i < r; i++)
                    if (n[i].name === t) return n[i];
                return null
            }, r = 0, s = o.length; r < s; r++) l = o[r].indexOf("()") !== -1, c = l ? o[r].replace("()", "") : o[r], u = v(h, c), u || (u = {
            name: c,
            val: {},
            methodExt: [],
            propExt: []
        }, h.push(u)), r === s - 1 ? u.val = i : h = l ? u.methodExt : u.propExt
    };
    e.registerPlural = s = function(t, i, u) {
        e.register(t, u);
        e.register(i, function() {
            var t = u.apply(this, arguments);
            return t === this ? this : t instanceof e ? t.length ? n.isArray(t[0]) ? new e(t.context, t[0]) : t[0] : r : t
        })
    };
    se = function(t, i) {
        if (typeof t == "number") return [i[t]];
        var r = n.map(i, function(n) {
            return n.nTable
        });
        return n(r).filter(t).map(function() {
            var t = n.inArray(this, r);
            return i[t]
        }).toArray()
    };
    f("tables()", function(n) {
        return n ? new e(se(n, this.context)) : this
    });
    f("table()", function(n) {
        var t = this.tables(n),
            i = t.context;
        return i.length ? new e(i[0]) : t
    });
    s("tables().nodes()", "table().node()", function() {
        return this.iterator("table", function(n) {
            return n.nTable
        }, 1)
    });
    s("tables().body()", "table().body()", function() {
        return this.iterator("table", function(n) {
            return n.nTBody
        }, 1)
    });
    s("tables().header()", "table().header()", function() {
        return this.iterator("table", function(n) {
            return n.nTHead
        }, 1)
    });
    s("tables().footer()", "table().footer()", function() {
        return this.iterator("table", function(n) {
            return n.nTFoot
        }, 1)
    });
    s("tables().containers()", "table().container()", function() {
        return this.iterator("table", function(n) {
            return n.nTableWrapper
        }, 1)
    });
    f("draw()", function(n) {
        return this.iterator("table", function(t) {
            n === "page" ? rt(t) : (typeof n == "string" && (n = n === "full-hold" ? !1 : !0), ot(t, n === !1))
        })
    });
    f("page()", function(n) {
        return n === r ? this.page.info().page : this.iterator("table", function(t) {
            wr(t, n)
        })
    });
    f("page.info()", function() {
        if (this.context.length === 0) return r;
        var n = this.context[0],
            i = n._iDisplayStart,
            t = n.oFeatures.bPaginate ? n._iDisplayLength : -1,
            u = n.fnRecordsDisplay(),
            f = t === -1;
        return {
            page: f ? 0 : Math.floor(i / t),
            pages: f ? 1 : Math.ceil(u / t),
            start: i,
            end: n.fnDisplayEnd(),
            length: t,
            recordsTotal: n.fnRecordsTotal(),
            recordsDisplay: u,
            serverSide: y(n) === "ssp"
        }
    });
    f("page.len()", function(n) {
        return n === r ? this.context.length !== 0 ? this.context[0]._iDisplayLength : r : this.iterator("table", function(t) {
            pr(t, n)
        })
    });
    iu = function(n, t, i) {
        var u, r;
        if (i) {
            u = new e(n);
            u.one("draw", function() {
                i(u.ajax.json())
            })
        }
        y(n) == "ssp" ? ot(n, t) : (b(n, !0), r = n.jqXHR, r && r.readyState !== 4 && r.abort(), ai(n, [], function(i) {
            var u, r, f;
            for (hi(n), u = vi(n, i), r = 0, f = u.length; r < f; r++) it(n, u[r]);
            ot(n, t);
            b(n, !1)
        }))
    };
    f("ajax.json()", function() {
        var n = this.context;
        if (n.length > 0) return n[0].json
    });
    f("ajax.params()", function() {
        var n = this.context;
        if (n.length > 0) return n[0].oAjaxData
    });
    f("ajax.reload()", function(n, t) {
        return this.iterator("table", function(i) {
            iu(i, t === !1, n)
        })
    });
    f("ajax.url()", function(t) {
        var i = this.context;
        return t === r ? i.length === 0 ? r : (i = i[0], i.ajax ? n.isPlainObject(i.ajax) ? i.ajax.url : i.ajax : i.sAjaxSource) : this.iterator("table", function(i) {
            n.isPlainObject(i.ajax) ? i.ajax.url = t : i.ajax = t
        })
    });
    f("ajax.url().load()", function(n, t) {
        return this.iterator("table", function(i) {
            iu(i, t === !1, n)
        })
    });
    var ru = function(t, i, u, f, e) {
            var h = [],
                a, l, o, v, s, p, w = typeof i,
                y;
            for (i && w !== "string" && w !== "function" && i.length !== r || (i = [i]), o = 0, v = i.length; o < v; o++)
                for (l = i[o] && i[o].split && !i[o].match(/[\[\(:]/) ? i[o].split(",") : [i[o]], s = 0, p = l.length; s < p; s++) a = u(typeof l[s] == "string" ? n.trim(l[s]) : l[s]), a && a.length && (h = h.concat(a));
            if (y = c.selector[t], y.length)
                for (o = 0, v = y.length; o < v; o++) h = y[o](f, e, h);
            return fi(h)
        },
        uu = function(t) {
            return t || (t = {}), t.filter && t.search === r && (t.search = t.filter), n.extend({
                search: "none",
                order: "current",
                page: "all"
            }, t)
        },
        fu = function(n) {
            for (var t = 0, i = n.length; t < i; t++)
                if (n[t].length > 0) return n[0] = n[t], n[0].length = 1, n.length = 1, n.context = [n.context[t]], n;
            return n.length = 0, n
        },
        nr = function(t, i) {
            var r, e, h, f = [],
                o = t.aiDisplay,
                c = t.aiDisplayMaster,
                u = i.search,
                s = i.order,
                l = i.page;
            if (y(t) == "ssp") return u === "removed" ? [] : st(0, c.length);
            if (l == "current")
                for (r = t._iDisplayStart, e = t.fnDisplayEnd(); r < e; r++) f.push(o[r]);
            else if (s == "current" || s == "applied") f = u == "none" ? c.slice() : u == "applied" ? o.slice() : n.map(c, function(t) {
                return n.inArray(t, o) === -1 ? t : null
            });
            else if (s == "index" || s == "original")
                for (r = 0, e = t.aoData.length; r < e; r++) u == "none" ? f.push(r) : (h = n.inArray(r, o), (h === -1 && u == "removed" || h >= 0 && u == "applied") && f.push(r));
            return f
        },
        to = function(t, i, u) {
            var f, e = function(i) {
                var e = cu(i),
                    h, o, s;
                return e !== null && !u ? [e] : (f || (f = nr(t, u)), e !== null && n.inArray(e, f) !== -1) ? [e] : i === null || i === r || i === "" ? f : typeof i == "function" ? n.map(f, function(n) {
                    var r = t.aoData[n];
                    return i(n, r._aData, r.nTr) ? n : null
                }) : (h = vu(lt(t.aoData, f, "nTr")), i.nodeName) ? i._DT_RowIndex !== r ? [i._DT_RowIndex] : i._DT_CellIndex ? [i._DT_CellIndex.row] : (o = n(i).closest("*[data-dt-row]"), o.length ? [o.data("dt-row")] : []) : typeof i == "string" && i.charAt(0) === "#" && (s = t.aIds[i.replace(/^#/, "")], s !== r) ? [s.idx] : n(h).filter(i).map(function() {
                    return this._DT_RowIndex
                }).toArray()
            };
            return ru("row", i, e, t, u)
        };
    f("rows()", function(t, i) {
        t === r ? t = "" : n.isPlainObject(t) && (i = t, t = "");
        i = uu(i);
        var u = this.iterator("table", function(n) {
            return to(n, t, i)
        }, 1);
        return u.selector.rows = t, u.selector.opts = i, u
    });
    f("rows().nodes()", function() {
        return this.iterator("row", function(n, t) {
            return n.aoData[t].nTr || r
        }, 1)
    });
    f("rows().data()", function() {
        return this.iterator(!0, "rows", function(n, t) {
            return lt(n.aoData, t, "_aData")
        }, 1)
    });
    s("rows().cache()", "row().cache()", function(n) {
        return this.iterator("row", function(t, i) {
            var r = t.aoData[i];
            return n === "search" ? r._aFilterData : r._aSortData
        }, 1)
    });
    s("rows().invalidate()", "row().invalidate()", function(n) {
        return this.iterator("row", function(t, i) {
            bt(t, i, n)
        })
    });
    s("rows().indexes()", "row().index()", function() {
        return this.iterator("row", function(n, t) {
            return t
        }, 1)
    });
    s("rows().ids()", "row().id()", function(n) {
        for (var r, f, o, u = [], i = this.context, t = 0, s = i.length; t < s; t++)
            for (r = 0, f = this[t].length; r < f; r++) o = i[t].rowIdFn(i[t].aoData[this[t][r]]._aData), u.push((n === !0 ? "#" : "") + o);
        return new e(i, u)
    });
    s("rows().remove()", "row().remove()", function() {
        var n = this;
        return this.iterator("row", function(t, i, u) {
            var e = t.aoData,
                v = e[i],
                f, l, o, a, s, h, c;
            for (e.splice(i, 1), f = 0, l = e.length; f < l; f++)
                if (s = e[f], h = s.anCells, s.nTr !== null && (s.nTr._DT_RowIndex = f), h !== null)
                    for (o = 0, a = h.length; o < a; o++) h[o]._DT_CellIndex.row = f;
            ci(t.aiDisplayMaster, i);
            ci(t.aiDisplay, i);
            ci(n[u], i, !1);
            nu(t);
            c = t.rowIdFn(v._aData);
            c !== r && delete t.aIds[c]
        }), this.iterator("table", function(n) {
            for (var t = 0, i = n.aoData.length; t < i; t++) n.aoData[t].idx = t
        }), this
    });
    f("rows.add()", function(t) {
        var r = this.iterator("table", function(n) {
                for (var i, u = [], r = 0, f = t.length; r < f; r++) i = t[r], i.nodeName && i.nodeName.toUpperCase() === "TR" ? u.push(si(n, i)[0]) : u.push(it(n, i));
                return u
            }, 1),
            i = this.rows(-1);
        return i.pop(), n.merge(i, r), i
    });
    f("row()", function(n, t) {
        return fu(this.rows(n, t))
    });
    f("row().data()", function(n) {
        var t = this.context;
        return n === r ? t.length && this.length ? t[0].aoData[this[0]]._aData : r : (t[0].aoData[this[0]]._aData = n, bt(t[0], this[0], "data"), this)
    });
    f("row().node()", function() {
        var n = this.context;
        return n.length && this.length ? n[0].aoData[this[0]].nTr || null : null
    });
    f("row.add()", function(t) {
        t instanceof n && t.length && (t = t[0]);
        var i = this.iterator("table", function(n) {
            return t.nodeName && t.nodeName.toUpperCase() === "TR" ? si(n, t)[0] : it(n, t)
        });
        return this.row(i[0])
    });
    var io = function(t, i, r, u) {
            var f = [],
                e = function(i, r) {
                    var u, s, o;
                    if (n.isArray(i) || i instanceof n) {
                        for (u = 0, s = i.length; u < s; u++) e(i[u], r);
                        return
                    }
                    i.nodeName && i.nodeName.toLowerCase() === "tr" ? f.push(i) : (o = n("<tr><td/><\/tr>").addClass(r), n("td", o).addClass(r).html(i)[0].colSpan = wt(t), f.push(o[0]))
                };
            e(r, u);
            i._details && i._details.detach();
            i._details = n(f);
            i._detailsShow && i._details.insertAfter(i.nTr)
        },
        eu = function(n, t) {
            var u = n.context,
                i;
            u.length && (i = u[0].aoData[t !== r ? t : n[0]], i && i._details && (i._details.remove(), i._detailsShow = r, i._details = r))
        },
        he = function(n, t) {
            var r = n.context,
                i;
            r.length && n.length && (i = r[0].aoData[n[0]], i._details && (i._detailsShow = t, t ? i._details.insertAfter(i.nTr) : i._details.detach(), ro(r[0])))
        },
        ro = function(n) {
            var t = new e(n),
                r = ".dt.DT_details",
                u = "draw" + r,
                f = "column-visibility" + r,
                o = "destroy" + r,
                i = n.aoData;
            if (t.off(u + " " + f + " " + o), w(i, "_details").length > 0) {
                t.on(u, function(r, u) {
                    n === u && t.rows({
                        page: "current"
                    }).eq(0).each(function(n) {
                        var t = i[n];
                        t._detailsShow && t._details.insertAfter(t.nTr)
                    })
                });
                t.on(f, function(t, r) {
                    var f, e, u, o;
                    if (n === r)
                        for (e = wt(r), u = 0, o = i.length; u < o; u++) f = i[u], f._details && f._details.children("td[colspan]").attr("colspan", e)
                });
                t.on(o, function(r, u) {
                    if (n === u)
                        for (var f = 0, e = i.length; f < e; f++) i[f]._details && eu(t, f)
                })
            }
        },
        ti = "row().child",
        tr = ti + "()";
    f(tr, function(n, t) {
        var i = this.context;
        return n === r ? i.length && this.length ? i[0].aoData[this[0]]._details : r : (n === !0 ? this.child.show() : n === !1 ? eu(this) : i.length && this.length && io(i[0], i[0].aoData[this[0]], n, t), this)
    });
    f([ti + ".show()", tr + ".show()"], function() {
        return he(this, !0), this
    });
    f([ti + ".hide()", tr + ".hide()"], function() {
        return he(this, !1), this
    });
    f([ti + ".remove()", tr + ".remove()"], function() {
        return eu(this), this
    });
    f(ti + ".isShown()", function() {
        var n = this.context;
        return n.length && this.length ? n[0].aoData[this[0]]._detailsShow || !1 : !1
    });
    var uo = /^([^:]+):(name|visIdx|visible)$/,
        ce = function(n, t, i, r, u) {
            for (var e = [], f = 0, o = u.length; f < o; f++) e.push(p(n, u[f], t));
            return e
        },
        fo = function(t, i, r) {
            var u = t.aoColumns,
                e = w(u, "sName"),
                f = w(u, "nTh"),
                o = function(i) {
                    var s = cu(i),
                        v, o, h, c, l, a;
                    if (i === "") return st(u.length);
                    if (s !== null) return [s >= 0 ? s : u.length + s];
                    if (typeof i == "function") return v = nr(t, r), n.map(u, function(n, r) {
                        return i(r, ce(t, r, 0, 0, v), f[r]) ? r : null
                    });
                    if (o = typeof i == "string" ? i.match(uo) : "", o) switch (o[2]) {
                        case "visIdx":
                        case "visible":
                            return (h = parseInt(o[1], 10), h < 0) ? (c = n.map(u, function(n, t) {
                                return n.bVisible ? t : null
                            }), [c[c.length + h]]) : [yt(t, h)];
                        case "name":
                            return n.map(e, function(n, t) {
                                return n === o[1] ? t : null
                            });
                        default:
                            return []
                    }
                    return i.nodeName && i._DT_CellIndex ? [i._DT_CellIndex.column] : (l = n(f).filter(i).map(function() {
                        return n.inArray(this, f)
                    }).toArray(), l.length || !i.nodeName) ? l : (a = n(i).closest("*[data-dt-column]"), a.length ? [a.data("dt-column")] : [])
                };
            return ru("column", i, o, t, r)
        },
        eo = function(t, i, u) {
            var c = t.aoColumns,
                e = c[i],
                o = t.aoData,
                s, f, l, h, a;
            if (u === r) return e.bVisible;
            if (e.bVisible !== u) {
                if (u)
                    for (a = n.inArray(!0, w(c, "bVisible"), i + 1), f = 0, l = o.length; f < l; f++) h = o[f].nTr, s = o[f].anCells, h && h.insertBefore(s[i], s[a] || null);
                else n(w(t.aoData, "anCells", i)).detach();
                e.bVisible = u;
                kt(t, t.aoHeader);
                kt(t, t.aoFooter);
                di(t)
            }
        };
    return f("columns()", function(t, i) {
            t === r ? t = "" : n.isPlainObject(t) && (i = t, t = "");
            i = uu(i);
            var u = this.iterator("table", function(n) {
                return fo(n, t, i)
            }, 1);
            return u.selector.cols = t, u.selector.opts = i, u
        }), s("columns().header()", "column().header()", function() {
            return this.iterator("column", function(n, t) {
                return n.aoColumns[t].nTh
            }, 1)
        }), s("columns().footer()", "column().footer()", function() {
            return this.iterator("column", function(n, t) {
                return n.aoColumns[t].nTf
            }, 1)
        }), s("columns().data()", "column().data()", function() {
            return this.iterator("column-rows", ce, 1)
        }), s("columns().dataSrc()", "column().dataSrc()", function() {
            return this.iterator("column", function(n, t) {
                return n.aoColumns[t].mData
            }, 1)
        }), s("columns().cache()", "column().cache()", function(n) {
            return this.iterator("column-rows", function(t, i, r, u, f) {
                return lt(t.aoData, f, n === "search" ? "_aFilterData" : "_aSortData", i)
            }, 1)
        }), s("columns().nodes()", "column().nodes()", function() {
            return this.iterator("column-rows", function(n, t, i, r, u) {
                return lt(n.aoData, u, "anCells", t)
            }, 1)
        }), s("columns().visible()", "column().visible()", function(n, t) {
            var i = this.iterator("column", function(t, i) {
                if (n === r) return t.aoColumns[i].bVisible;
                eo(t, i, n)
            });
            return n !== r && (this.iterator("column", function(i, r) {
                o(i, null, "column-visibility", [i, r, n, t])
            }), (t === r || t) && this.columns.adjust()), i
        }), s("columns().indexes()", "column().index()", function(n) {
            return this.iterator("column", function(t, i) {
                return n === "visible" ? pt(t, i) : i
            }, 1)
        }), f("columns.adjust()", function() {
            return this.iterator("table", function(n) {
                vt(n)
            }, 1)
        }), f("column.index()", function(n, t) {
            if (this.context.length !== 0) {
                var i = this.context[0];
                if (n === "fromVisible" || n === "toData") return yt(i, t);
                if (n === "fromData" || n === "toVisible") return pt(i, t)
            }
        }), f("column()", function(n, t) {
            return fu(this.columns(n, t))
        }), le = function(t, i, u) {
            var a = t.aoData,
                l = nr(t, u),
                y = vu(lt(a, l, "anCells")),
                w = n([].concat.apply([], y)),
                o, b = t.aoColumns.length,
                s, h, v, e, c, f, k = function(i) {
                    var y = typeof i == "function",
                        u;
                    if (i === null || i === r || y) {
                        for (s = [], h = 0, v = l.length; h < v; h++)
                            for (o = l[h], e = 0; e < b; e++) c = {
                                row: o,
                                column: e
                            }, y ? (f = a[o], i(c, p(t, o, e), f.anCells ? f.anCells[e] : null) && s.push(c)) : s.push(c);
                        return s
                    }
                    return n.isPlainObject(i) ? [i] : (u = w.filter(i).map(function(n, t) {
                        return {
                            row: t._DT_CellIndex.row,
                            column: t._DT_CellIndex.column
                        }
                    }).toArray(), u.length || !i.nodeName) ? u : (f = n(i).closest("*[data-dt-row]"), f.length ? [{
                        row: f.data("dt-row"),
                        column: f.data("dt-column")
                    }] : [])
                };
            return ru("cell", i, k, t, u)
        }, f("cells()", function(t, i, u) {
            if (n.isPlainObject(t) && (t.row === r ? (u = t, t = null) : (u = i, i = null)), n.isPlainObject(i) && (u = i, i = null), i === null || i === r) return this.iterator("table", function(n) {
                return le(n, t, uu(u))
            });
            var s = this.columns(i, u),
                h = this.rows(t, u),
                o, f, c, e, l, a = this.iterator("table", function(n, t) {
                    for (o = [], f = 0, c = h[t].length; f < c; f++)
                        for (e = 0, l = s[t].length; e < l; e++) o.push({
                            row: h[t][f],
                            column: s[t][e]
                        });
                    return o
                }, 1);
            return n.extend(a.selector, {
                cols: i,
                rows: t,
                opts: u
            }), a
        }), s("cells().nodes()", "cell().node()", function() {
            return this.iterator("cell", function(n, t, i) {
                var u = n.aoData[t];
                return u && u.anCells ? u.anCells[i] : r
            }, 1)
        }), f("cells().data()", function() {
            return this.iterator("cell", function(n, t, i) {
                return p(n, t, i)
            }, 1)
        }), s("cells().cache()", "cell().cache()", function(n) {
            return n = n === "search" ? "_aFilterData" : "_aSortData", this.iterator("cell", function(t, i, r) {
                return t.aoData[i][n][r]
            }, 1)
        }), s("cells().render()", "cell().render()", function(n) {
            return this.iterator("cell", function(t, i, r) {
                return p(t, i, r, n)
            }, 1)
        }), s("cells().indexes()", "cell().index()", function() {
            return this.iterator("cell", function(n, t, i) {
                return {
                    row: t,
                    column: i,
                    columnVisible: pt(n, i)
                }
            }, 1)
        }), s("cells().invalidate()", "cell().invalidate()", function(n) {
            return this.iterator("cell", function(t, i, r) {
                bt(t, i, n, r)
            })
        }), f("cell()", function(n, t, i) {
            return fu(this.cells(n, t, i))
        }), f("cell().data()", function(n) {
            var i = this.context,
                t = this[0];
            return n === r ? i.length && t.length ? p(i[0], t[0].row, t[0].column) : r : (du(i[0], t[0].row, t[0].column, n), bt(i[0], t[0].row, "data", t[0].column), this)
        }), f("order()", function(t, i) {
            var u = this.context;
            return t === r ? u.length !== 0 ? u[0].aaSorting : r : (typeof t == "number" ? t = [
                [t, i]
            ] : t.length && !n.isArray(t[0]) && (t = Array.prototype.slice.call(arguments)), this.iterator("table", function(n) {
                n.aaSorting = t.slice()
            }))
        }), f("order.listener()", function(n, t, i) {
            return this.iterator("table", function(r) {
                dr(r, n, t, i)
            })
        }), f("order.fixed()", function(t) {
            if (!t) {
                var u = this.context,
                    i = u.length ? u[0].aaSortingFixed : r;
                return n.isArray(i) ? {
                    pre: i
                } : i
            }
            return this.iterator("table", function(i) {
                i.aaSortingFixed = n.extend(!0, {}, t)
            })
        }), f(["columns().order()", "column().order()"], function(t) {
            var i = this;
            return this.iterator("table", function(r, u) {
                var f = [];
                n.each(i[u], function(n, i) {
                    f.push([i, t])
                });
                r.aaSorting = f
            })
        }), f("search()", function(t, i, u, f) {
            var e = this.context;
            return t === r ? e.length !== 0 ? e[0].oPreviousSearch.sSearch : r : this.iterator("table", function(r) {
                r.oFeatures.bFilter && gt(r, n.extend({}, r.oPreviousSearch, {
                    sSearch: t + "",
                    bRegex: i === null ? !1 : i,
                    bSmart: u === null ? !0 : u,
                    bCaseInsensitive: f === null ? !0 : f
                }), 1)
            })
        }), s("columns().search()", "column().search()", function(t, i, u, f) {
            return this.iterator("column", function(e, o) {
                var s = e.aoPreSearchCols;
                if (t === r) return s[o].sSearch;
                e.oFeatures.bFilter && (n.extend(s[o], {
                    sSearch: t + "",
                    bRegex: i === null ? !1 : i,
                    bSmart: u === null ? !0 : u,
                    bCaseInsensitive: f === null ? !0 : f
                }), gt(e, e.oPreviousSearch, 1))
            })
        }), f("state()", function() {
            return this.context.length ? this.context[0].oSavedState : null
        }), f("state.clear()", function() {
            return this.iterator("table", function(n) {
                n.fnStateSaveCallback.call(n.oInstance, n, {})
            })
        }), f("state.loaded()", function() {
            return this.context.length ? this.context[0].oLoadedState : null
        }), f("state.save()", function() {
            return this.iterator("table", function(n) {
                di(n)
            })
        }), u.versionCheck = u.fnVersionCheck = function(n) {
            for (var e = u.version.split("."), f = n.split("."), i, r, t = 0, o = f.length; t < o; t++)
                if (i = parseInt(e[t], 10) || 0, r = parseInt(f[t], 10) || 0, i !== r) return i > r;
            return !0
        }, u.isDataTable = u.fnIsDataTable = function(t) {
            var i = n(t).get(0),
                r = !1;
            return t instanceof u.Api ? !0 : (n.each(u.settings, function(t, u) {
                var f = u.nScrollHead ? n("table", u.nScrollHead)[0] : null,
                    e = u.nScrollFoot ? n("table", u.nScrollFoot)[0] : null;
                (u.nTable === i || f === i || e === i) && (r = !0)
            }), r)
        }, u.tables = u.fnTables = function(t) {
            var r = !1,
                i;
            return n.isPlainObject(t) && (r = t.api, t = t.visible), i = n.map(u.settings, function(i) {
                if (!t || t && n(i.nTable).is(":visible")) return i.nTable
            }), r ? new e(i) : i
        }, u.camelToHungarian = nt, f("$()", function(t, i) {
            var u = this.rows(i).nodes(),
                r = n(u);
            return n([].concat(r.filter(t).toArray(), r.find(t).toArray()))
        }), n.each(["on", "one", "off"], function(t, i) {
            f(i + "()", function() {
                var t = Array.prototype.slice.call(arguments),
                    r;
                return t[0] = n.map(t[0].split(/\s/), function(n) {
                    return n.match(/\.dt\b/) ? n : n + ".dt"
                }).join(" "), r = n(this.tables().nodes()), r[i].apply(r, t), this
            })
        }), f("clear()", function() {
            return this.iterator("table", function(n) {
                hi(n)
            })
        }), f("settings()", function() {
            return new e(this.context, this.context)
        }), f("init()", function() {
            var n = this.context;
            return n.length ? n[0].oInit : null
        }), f("data()", function() {
            return this.iterator("table", function(n) {
                return w(n.aoData, "_aData")
            }).flatten()
        }), f("destroy()", function(i) {
            return i = i || !1, this.iterator("table", function(r) {
                var w = r.nTableWrapper.parentNode,
                    f = r.oClasses,
                    c = r.nTable,
                    d = r.nTBody,
                    h = r.nTHead,
                    l = r.nTFoot,
                    s = n(c),
                    a = n(d),
                    b = n(r.nTableWrapper),
                    k = n.map(r.aoData, function(n) {
                        return n.nTr
                    }),
                    v, y, p;
                r.bDestroying = !0;
                o(r, "aoDestroyCallback", "destroy", [r]);
                i || new e(r).columns().visible(!0);
                b.off(".DT").find(":not(tbody *)").off(".DT");
                n(t).off(".DT-" + r.sInstance);
                c != h.parentNode && (s.children("thead").detach(), s.append(h));
                l && c != l.parentNode && (s.children("tfoot").detach(), s.append(l));
                r.aaSorting = [];
                r.aaSortingFixed = [];
                ki(r);
                n(k).removeClass(r.asStripeClasses.join(" "));
                n("th, td", h).removeClass(f.sSortable + " " + f.sSortableAsc + " " + f.sSortableDesc + " " + f.sSortableNone);
                r.bJUI && (n("th span." + f.sSortIcon + ", td span." + f.sSortIcon, h).detach(), n("th, td", h).each(function() {
                    var t = n("div." + f.sSortJUIWrapper, this);
                    n(this).append(t.contents());
                    t.detach()
                }));
                a.children().detach();
                a.append(k);
                y = i ? "remove" : "detach";
                s[y]();
                b[y]();
                !i && w && (w.insertBefore(c, r.nTableReinsertBefore), s.css("width", r.sDestroyWidth).removeClass(f.sTable), v = r.asDestroyStripes.length, v && a.children().each(function(t) {
                    n(this).addClass(r.asDestroyStripes[t % v])
                }));
                p = n.inArray(r, u.settings);
                p !== -1 && u.settings.splice(p, 1)
            })
        }), n.each(["column", "row", "cell"], function(n, t) {
            f(t + "s().every()", function(n) {
                var i = this.selector.opts,
                    u = this;
                return this.iterator(t, function(f, e, o, s, h) {
                    n.call(u[t](e, t === "cell" ? o : i, t === "cell" ? i : r), e, o, s, h)
                })
            })
        }), f("i18n()", function(t, i, u) {
            var e = this.context[0],
                f = ft(t)(e.oLanguage);
            return f === r && (f = i), u !== r && n.isPlainObject(f) && (f = f[u] !== r ? f[u] : f._), f.replace("%d", u)
        }), u.version = "1.10.13", u.settings = [], u.models = {}, u.models.oSearch = {
            bCaseInsensitive: !0,
            sSearch: "",
            bRegex: !1,
            bSmart: !0
        }, u.models.oRow = {
            nTr: null,
            anCells: null,
            _aData: [],
            _aSortData: null,
            _aFilterData: null,
            _sFilterRow: null,
            _sRowStripe: "",
            src: null,
            idx: -1
        }, u.models.oColumn = {
            idx: null,
            aDataSort: null,
            asSorting: null,
            bSearchable: null,
            bSortable: null,
            bVisible: null,
            _sManualType: null,
            _bAttrSrc: !1,
            fnCreatedCell: null,
            fnGetData: null,
            fnSetData: null,
            mData: null,
            mRender: null,
            nTh: null,
            nTf: null,
            sClass: null,
            sContentPadding: null,
            sDefaultContent: null,
            sName: null,
            sSortDataType: "std",
            sSortingClass: null,
            sSortingClassJUI: null,
            sTitle: null,
            sType: null,
            sWidth: null,
            sWidthOrig: null
        }, u.defaults = {
            aaData: null,
            aaSorting: [
                [0, "asc"]
            ],
            aaSortingFixed: [],
            ajax: null,
            aLengthMenu: [10, 25, 50, 100],
            aoColumns: null,
            aoColumnDefs: null,
            aoSearchCols: [],
            asStripeClasses: null,
            bAutoWidth: !0,
            bDeferRender: !1,
            bDestroy: !1,
            bFilter: !0,
            bInfo: !0,
            bJQueryUI: !1,
            bLengthChange: !0,
            bPaginate: !0,
            bProcessing: !1,
            bRetrieve: !1,
            bScrollCollapse: !1,
            bServerSide: !1,
            bSort: !0,
            bSortMulti: !0,
            bSortCellsTop: !1,
            bSortClasses: !0,
            bStateSave: !1,
            fnCreatedRow: null,
            fnDrawCallback: null,
            fnFooterCallback: null,
            fnFormatNumber: function(n) {
                return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, this.oLanguage.sThousands)
            },
            fnHeaderCallback: null,
            fnInfoCallback: null,
            fnInitComplete: null,
            fnPreDrawCallback: null,
            fnRowCallback: null,
            fnServerData: null,
            fnServerParams: null,
            fnStateLoadCallback: function(n) {
                try {
                    return JSON.parse((n.iStateDuration === -1 ? sessionStorage : localStorage).getItem("DataTables_" + n.sInstance + "_" + location.pathname))
                } catch (t) {}
            },
            fnStateLoadParams: null,
            fnStateLoaded: null,
            fnStateSaveCallback: function(n, t) {
                try {
                    (n.iStateDuration === -1 ? sessionStorage : localStorage).setItem("DataTables_" + n.sInstance + "_" + location.pathname, JSON.stringify(t))
                } catch (i) {}
            },
            fnStateSaveParams: null,
            iStateDuration: 7200,
            iDeferLoading: null,
            //iDisplayLength: 10,
            iDisplayLength: 50,
            iDisplayStart: 0,
            iTabIndex: 0,
            oClasses: {},
            oLanguage: {
                oAria: {
                    sSortAscending: ": activate to sort column ascending",
                    sSortDescending: ": activate to sort column descending"
                },
                oPaginate: {
                    sFirst: "First",
                    sLast: "Last",
                    sNext: "Next",
                    sPrevious: "Previous"
                },
                sEmptyTable: "No data available in table",
                sInfo: "Showing _START_ to _END_ of _TOTAL_ entries",
                sInfoEmpty: "Showing 0 to 0 of 0 entries",
                sInfoFiltered: "(filtered from _MAX_ total entries)",
                sInfoPostFix: "",
                sDecimal: "",
                sThousands: ",",
                sLengthMenu: "Show _MENU_ entries",
                sLoadingRecords: "Loading...",
                sProcessing: "Processing...",
                sSearch: "Search:",
                sSearchPlaceholder: "",
                sUrl: "",
                sZeroRecords: "No matching records found"
            },
            oSearch: n.extend({}, u.models.oSearch),
            sAjaxDataProp: "data",
            sAjaxSource: null,
            sDom: "lfrtip",
            searchDelay: null,
            sPaginationType: "simple_numbers",
            sScrollX: "",
            sScrollXInner: "",
            sScrollY: "",
            sServerMethod: "GET",
            renderer: null,
            rowId: "DT_RowId"
        }, at(u.defaults), u.defaults.column = {
            aDataSort: null,
            iDataSort: -1,
            asSorting: ["asc", "desc"],
            bSearchable: !0,
            bSortable: !0,
            bVisible: !0,
            fnCreatedCell: null,
            mData: null,
            mRender: null,
            sCellType: "td",
            sClass: "",
            sContentPadding: "",
            sDefaultContent: null,
            sName: "",
            sSortDataType: "std",
            sTitle: null,
            sType: null,
            sWidth: null
        }, at(u.defaults.column), u.models.oSettings = {
            oFeatures: {
                bAutoWidth: null,
                bDeferRender: null,
                bFilter: null,
                bInfo: null,
                bLengthChange: null,
                bPaginate: null,
                bProcessing: null,
                bServerSide: null,
                bSort: null,
                bSortMulti: null,
                bSortClasses: null,
                bStateSave: null
            },
            oScroll: {
                bCollapse: null,
                iBarWidth: 0,
                sX: null,
                sXInner: null,
                sY: null
            },
            oLanguage: {
                fnInfoCallback: null
            },
            oBrowser: {
                bScrollOversize: !1,
                bScrollbarLeft: !1,
                bBounding: !1,
                barWidth: 0
            },
            ajax: null,
            aanFeatures: [],
            aoData: [],
            aiDisplay: [],
            aiDisplayMaster: [],
            aIds: {},
            aoColumns: [],
            aoHeader: [],
            aoFooter: [],
            oPreviousSearch: {},
            aoPreSearchCols: [],
            aaSorting: null,
            aaSortingFixed: [],
            asStripeClasses: null,
            asDestroyStripes: [],
            sDestroyWidth: 0,
            aoRowCallback: [],
            aoHeaderCallback: [],
            aoFooterCallback: [],
            aoDrawCallback: [],
            aoRowCreatedCallback: [],
            aoPreDrawCallback: [],
            aoInitComplete: [],
            aoStateSaveParams: [],
            aoStateLoadParams: [],
            aoStateLoaded: [],
            sTableId: "",
            nTable: null,
            nTHead: null,
            nTFoot: null,
            nTBody: null,
            nTableWrapper: null,
            bDeferLoading: !1,
            bInitialised: !1,
            aoOpenRows: [],
            sDom: null,
            searchDelay: null,
            sPaginationType: "two_button",
            iStateDuration: 0,
            aoStateSave: [],
            aoStateLoad: [],
            oSavedState: null,
            oLoadedState: null,
            sAjaxSource: null,
            sAjaxDataProp: null,
            bAjaxDataGet: !0,
            jqXHR: null,
            json: r,
            oAjaxData: r,
            fnServerData: null,
            aoServerParams: [],
            sServerMethod: null,
            fnFormatNumber: null,
            aLengthMenu: null,
            iDraw: 0,
            bDrawing: !1,
            iDrawError: -1,
            //_iDisplayLength: 10,
            _iDisplayLength: 50,
            _iDisplayStart: 0,
            _iRecordsTotal: 0,
            _iRecordsDisplay: 0,
            bJUI: null,
            oClasses: {},
            bFiltered: !1,
            bSorted: !1,
            bSortCellsTop: null,
            oInit: null,
            aoDestroyCallback: [],
            fnRecordsTotal: function() {
                return y(this) == "ssp" ? this._iRecordsTotal * 1 : this.aiDisplayMaster.length
            },
            fnRecordsDisplay: function() {
                return y(this) == "ssp" ? this._iRecordsDisplay * 1 : this.aiDisplay.length
            },
            fnDisplayEnd: function() {
                var n = this._iDisplayLength,
                    t = this._iDisplayStart,
                    r = t + n,
                    i = this.aiDisplay.length,
                    u = this.oFeatures,
                    f = u.bPaginate;
                return u.bServerSide ? f === !1 || n === -1 ? t + i : Math.min(t + n, this._iRecordsDisplay) : !f || r > i || n === -1 ? i : r
            },
            oInstance: null,
            sInstance: null,
            iTabIndex: 0,
            nScrollHead: null,
            nScrollFoot: null,
            aLastSort: [],
            oPlugins: {},
            rowIdFn: null,
            rowId: null
        }, u.ext = c = {
            buttons: {},
            classes: {},
            build: "bs/dt-1.10.13/b-1.2.4/b-colvis-1.2.4/fh-3.1.2/sc-1.4.2",
            errMode: "alert",
            feature: [],
            search: [],
            selector: {
                cell: [],
                column: [],
                row: []
            },
            internal: {},
            legacy: {
                ajax: null
            },
            pager: {},
            renderer: {
                pageButton: {},
                header: {}
            },
            order: {},
            type: {
                detect: [],
                search: {},
                order: {}
            },
            _unique: 0,
            fnVersionCheck: u.fnVersionCheck,
            iApiIndex: 0,
            oJUIClasses: {},
            sVersion: u.version
        }, n.extend(c, {
            afnFiltering: c.search,
            aTypes: c.type.detect,
            ofnSearch: c.type.search,
            oSort: c.type.order,
            afnSortData: c.order,
            aoFeatures: c.feature,
            oApi: c.internal,
            oStdClasses: c.classes,
            oPagination: c.pager
        }), n.extend(u.ext.classes, {
            sTable: "dataTable",
            sNoFooter: "no-footer",
            sPageButton: "paginate_button",
            sPageButtonActive: "current",
            sPageButtonDisabled: "disabled",
            sStripeOdd: "odd",
            sStripeEven: "even",
            sRowEmpty: "dataTables_empty",
            sWrapper: "dataTables_wrapper",
            sFilter: "dataTables_filter",
            sInfo: "dataTables_info",
            sPaging: "dataTables_paginate paging_",
            sLength: "dataTables_length",
            sProcessing: "dataTables_processing",
            sSortAsc: "sorting_asc",
            sSortDesc: "sorting_desc",
            sSortable: "sorting",
            sSortableAsc: "sorting_asc_disabled",
            sSortableDesc: "sorting_desc_disabled",
            sSortableNone: "sorting_disabled",
            sSortColumn: "sorting_",
            sFilterInput: "",
            sLengthSelect: "",
            sScrollWrapper: "dataTables_scroll",
            sScrollHead: "dataTables_scrollHead",
            sScrollHeadInner: "dataTables_scrollHeadInner",
            sScrollBody: "dataTables_scrollBody",
            sScrollFoot: "dataTables_scrollFoot",
            sScrollFootInner: "dataTables_scrollFootInner",
            sHeaderTH: "",
            sFooterTH: "",
            sSortJUIAsc: "",
            sSortJUIDesc: "",
            sSortJUI: "",
            sSortJUIAscAllowed: "",
            sSortJUIDescAllowed: "",
            sSortJUIWrapper: "",
            sSortIcon: "",
            sJUIHeader: "",
            sJUIFooter: ""
        }),
        function() {
            var r = "";
            var t = r + "ui-state-default",
                i = r + "css_right ui-icon ui-icon-",
                f = r + "fg-toolbar ui-toolbar ui-widget-header ui-helper-clearfix";
            n.extend(u.ext.oJUIClasses, u.ext.classes, {
                sPageButton: "fg-button ui-button " + t,
                sPageButtonActive: "ui-state-disabled",
                sPageButtonDisabled: "ui-state-disabled",
                sPaging: "dataTables_paginate fg-buttonset ui-buttonset fg-buttonset-multi ui-buttonset-multi paging_",
                sSortAsc: t + " sorting_asc",
                sSortDesc: t + " sorting_desc",
                sSortable: t + " sorting",
                sSortableAsc: t + " sorting_asc_disabled",
                sSortableDesc: t + " sorting_desc_disabled",
                sSortableNone: t + " sorting_disabled",
                sSortJUIAsc: i + "triangle-1-n",
                sSortJUIDesc: i + "triangle-1-s",
                sSortJUI: i + "carat-2-n-s",
                sSortJUIAscAllowed: i + "carat-1-n",
                sSortJUIDescAllowed: i + "carat-1-s",
                sSortJUIWrapper: "DataTables_sort_wrapper",
                sSortIcon: "DataTables_sort_icon",
                sScrollHead: "dataTables_scrollHead " + t,
                sScrollFoot: "dataTables_scrollFoot " + t,
                sHeaderTH: t,
                sFooterTH: t,
                sJUIHeader: f + " ui-corner-tl ui-corner-tr",
                sJUIFooter: f + " ui-corner-bl ui-corner-br"
            })
        }(), ou = u.ext.pager, n.extend(ou, {
            simple: function() {
                return ["previous", "next"]
            },
            full: function() {
                return ["first", "previous", "next", "last"]
            },
            numbers: function(n, t) {
                return [ii(n, t)]
            },
            simple_numbers: function(n, t) {
                return ["previous", ii(n, t), "next"]
            },
            full_numbers: function(n, t) {
                return ["first", "previous", ii(n, t), "next", "last"]
            },
            first_last_numbers: function(n, t) {
                return ["first", ii(n, t), "last"]
            },
            _numbers: ii,
            numbers_length: 7
        }), n.extend(!0, u.ext.renderer, {
            pageButton: {
                _: function(t, u, f, e, o, s) {
                    var l = t.oClasses,
                        a = t.oLanguage.oPaginate,
                        w = t.oLanguage.oAria.paginate || {},
                        h, c, y = 0,
                        p = function(i, r) {
                            for (var b, u, d = function(n) {
                                    wr(t, n.data.action, !0)
                                }, k, e = 0, v = r.length; e < v; e++)
                                if (u = r[e], n.isArray(u)) k = n("<" + (u.DT_el || "div") + "/>").appendTo(i), p(k, u);
                                else {
                                    h = null;
                                    c = "";
                                    switch (u) {
                                        case "ellipsis":
                                            i.append('<span class="ellipsis">&#x2026;<\/span>');
                                            break;
                                        case "first":
                                            h = a.sFirst;
                                            c = u + (o > 0 ? "" : " " + l.sPageButtonDisabled);
                                            break;
                                        case "previous":
                                            h = a.sPrevious;
                                            c = u + (o > 0 ? "" : " " + l.sPageButtonDisabled);
                                            break;
                                        case "next":
                                            h = a.sNext;
                                            c = u + (o < s - 1 ? "" : " " + l.sPageButtonDisabled);
                                            break;
                                        case "last":
                                            h = a.sLast;
                                            c = u + (o < s - 1 ? "" : " " + l.sPageButtonDisabled);
                                            break;
                                        default:
                                            h = u + 1;
                                            c = o === u ? l.sPageButtonActive : ""
                                    }
                                    h !== null && (b = n("<a>", {
                                        "class": l.sPageButton + " " + c,
                                        "aria-controls": t.sTableId,
                                        "aria-label": w[u],
                                        "data-dt-idx": y,
                                        tabindex: t.iTabIndex,
                                        id: f === 0 && typeof u == "string" ? t.sTableId + "_" + u : null
                                    }).html(h).appendTo(i), gr(b, {
                                        action: u
                                    }, d), y++)
                                }
                        },
                        v;
                    try {
                        v = n(u).find(i.activeElement).data("dt-idx")
                    } catch (b) {}
                    p(n(u).empty(), e);
                    v !== r && n(u).find("[data-dt-idx=" + v + "]").focus()
                }
            }
        }), n.extend(u.ext.type.detect, [function(n, t) {
            var i = t.oLanguage.sDecimal;
            return ur(n, i) ? "num" + i : null
        }, function(n) {
            if (n && !(n instanceof Date) && !ye.test(n)) return null;
            var t = Date.parse(n);
            return t !== null && !isNaN(t) || g(n) ? "date" : null
        }, function(n, t) {
            var i = t.oLanguage.sDecimal;
            return ur(n, i, !0) ? "num-fmt" + i : null
        }, function(n, t) {
            var i = t.oLanguage.sDecimal;
            return au(n, i) ? "html-num" + i : null
        }, function(n, t) {
            var i = t.oLanguage.sDecimal;
            return au(n, i, !0) ? "html-num-fmt" + i : null
        }, function(n) {
            return g(n) || typeof n == "string" && n.indexOf("<") !== -1 ? "html" : null
        }]), n.extend(u.ext.type.search, {
            html: function(n) {
                return g(n) ? n : typeof n == "string" ? n.replace(hu, " ").replace(ui, "") : ""
            },
            string: function(n) {
                return g(n) ? n : typeof n == "string" ? n.replace(hu, " ") : n
            }
        }), ri = function(n, t, i, r) {
            return n !== 0 && (!n || n === "-") ? -Infinity : (t && (n = lu(n, t)), n.replace && (i && (n = n.replace(i, "")), r && (n = n.replace(r, ""))), n * 1)
        }, n.extend(c.type.order, {
            "date-pre": function(n) {
                return Date.parse(n) || -Infinity
            },
            "html-pre": function(n) {
                return g(n) ? "" : n.replace ? n.replace(/<.*?>/g, "").toLowerCase() : n + ""
            },
            "string-pre": function(n) {
                return g(n) ? "" : typeof n == "string" ? n.toLowerCase() : n.toString ? n.toString() : ""
            },
            "string-asc": function(n, t) {
                return n < t ? -1 : n > t ? 1 : 0
            },
            "string-desc": function(n, t) {
                return n < t ? 1 : n > t ? -1 : 0
            }
        }), ae(""), n.extend(!0, u.ext.renderer, {
            header: {
                _: function(t, i, r, u) {
                    n(t.nTable).on("order.dt.DT", function(n, f, e, o) {
                        if (t === f) {
                            var s = r.idx;
                            i.removeClass(r.sSortingClass + " " + u.sSortAsc + " " + u.sSortDesc).addClass(o[s] == "asc" ? u.sSortAsc : o[s] == "desc" ? u.sSortDesc : r.sSortingClass)
                        }
                    })
                },
                jqueryui: function(t, i, r, u) {
                    n("<div/>").addClass(u.sSortJUIWrapper).append(i.contents()).append(n("<span/>").addClass(u.sSortIcon + " " + r.sSortingClassJUI)).appendTo(i);
                    n(t.nTable).on("order.dt.DT", function(n, f, e, o) {
                        if (t === f) {
                            var s = r.idx;
                            i.removeClass(u.sSortAsc + " " + u.sSortDesc).addClass(o[s] == "asc" ? u.sSortAsc : o[s] == "desc" ? u.sSortDesc : r.sSortingClass);
                            i.find("span." + u.sSortIcon).removeClass(u.sSortJUIAsc + " " + u.sSortJUIDesc + " " + u.sSortJUI + " " + u.sSortJUIAscAllowed + " " + u.sSortJUIDescAllowed).addClass(o[s] == "asc" ? u.sSortJUIAsc : o[s] == "desc" ? u.sSortJUIDesc : r.sSortingClassJUI)
                        }
                    })
                }
            }
        }), su = function(n) {
            return typeof n == "string" ? n.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;") : n
        }, u.render = {
            number: function(n, t, i, r, u) {
                return {
                    display: function(f) {
                        var s, e, o, h;
                        return typeof f != "number" && typeof f != "string" ? f : (s = f < 0 ? "-" : "", e = parseFloat(f), isNaN(e)) ? su(f) : (e = e.toFixed(i), f = Math.abs(e), o = parseInt(f, 10), h = i ? t + (f - o).toFixed(i).substring(2) : "", s + (r || "") + o.toString().replace(/\B(?=(\d{3})+(?!\d))/g, n) + h + (u || ""))
                    }
                }
            },
            text: function() {
                return {
                    display: su
                }
            }
        }, n.extend(u.ext.internal, {
            _fnExternApiFunc: ve,
            _fnBuildAjax: ai,
            _fnAjaxUpdate: tf,
            _fnAjaxParameters: rf,
            _fnAjaxUpdateDraw: uf,
            _fnAjaxDataSrc: vi,
            _fnAddColumn: er,
            _fnColumnOptions: ei,
            _fnAdjustColumnSizing: vt,
            _fnVisibleToColumnIndex: yt,
            _fnColumnIndexToVisible: pt,
            _fnVisbleColumns: wt,
            _fnGetColumns: oi,
            _fnColumnTypes: or,
            _fnApplyColumnDefs: ku,
            _fnHungarianMap: at,
            _fnCamelToHungarian: nt,
            _fnLanguageCompat: fr,
            _fnBrowserDetect: wu,
            _fnAddData: it,
            _fnAddTr: si,
            _fnNodeToDataIndex: ke,
            _fnNodeToColumnIndex: de,
            _fnGetCellData: p,
            _fnSetCellData: du,
            _fnSplitObjNotation: sr,
            _fnGetObjectDataFn: ft,
            _fnSetObjectDataFn: et,
            _fnGetDataMaster: hr,
            _fnClearTable: hi,
            _fnDeleteIndex: ci,
            _fnInvalidate: bt,
            _fnGetRowElements: cr,
            _fnCreateTr: lr,
            _fnBuildHead: gu,
            _fnDrawHead: kt,
            _fnDraw: rt,
            _fnReDraw: ot,
            _fnAddOptionsHtml: nf,
            _fnDetectHeader: dt,
            _fnGetUniqueThs: li,
            _fnFeatureHtmlFilter: ff,
            _fnFilterComplete: gt,
            _fnFilterCustom: ef,
            _fnFilterColumn: of,
            _fnFilter: sf,
            _fnFilterCreateSearch: vr,
            _fnEscapeRegex: yr,
            _fnFilterData: hf,
            _fnFeatureHtmlInfo: af,
            _fnUpdateInfo: vf,
            _fnInfoMacros: yf,
            _fnInitialise: ni,
            _fnInitComplete: pi,
            _fnLengthChange: pr,
            _fnFeatureHtmlLength: pf,
            _fnFeatureHtmlPaginate: wf,
            _fnPageChange: wr,
            _fnFeatureHtmlProcessing: bf,
            _fnProcessingDisplay: b,
            _fnFeatureHtmlTable: kf,
            _fnScrollDraw: wi,
            _fnApplyToChildren: d,
            _fnCalculateColumnWidths: br,
            _fnThrottle: bi,
            _fnConvertToWidth: gf,
            _fnGetWidestNode: ne,
            _fnGetMaxLenString: te,
            _fnStringToCss: h,
            _fnSortFlatten: ct,
            _fnSort: ie,
            _fnSortAria: re,
            _fnSortListener: kr,
            _fnSortAttachListener: dr,
            _fnSortingClasses: ki,
            _fnSortData: ue,
            _fnSaveState: di,
            _fnLoadState: fe,
            _fnSettingsFromNode: gi,
            _fnLog: tt,
            _fnMap: k,
            _fnBindAction: gr,
            _fnCallbackReg: v,
            _fnCallbackFire: o,
            _fnLengthOverflow: nu,
            _fnRenderer: tu,
            _fnDataSource: y,
            _fnRowAttributes: ar,
            _fnCalculateEnd: function() {}
        }), n.fn.dataTable = u, u.$ = n, n.fn.dataTableSettings = u.settings, n.fn.dataTableExt = u.ext, n.fn.DataTable = function(t) {
            return n(this).dataTable(t).api()
        }, n.each(u, function(t, i) {
            n.fn.DataTable[t] = i
        }), n.fn.dataTable
}),
function(n) {
    typeof define == "function" && define.amd ? define(["jquery", "datatables.net"], function(t) {
        return n(t, window, document)
    }) : typeof exports == "object" ? module.exports = function(t, i) {
        return t || (t = window), i && i.fn.dataTable || (i = require("datatables.net")(t, i).$), n(i, t, t.document)
    } : n(jQuery, window, document)
}(function(n, t, i, r) {
    "use strict";
    var u = n.fn.dataTable;
    return n.extend(!0, u.defaults, {
        dom: "<'row'<'col-sm-6'l><'col-sm-6'f>><'row'<'col-sm-12'tr>><'row'<'col-sm-5'i><'col-sm-7'p>>",
        renderer: "bootstrap"
    }), n.extend(u.ext.classes, {
        sWrapper: "dataTables_wrapper form-inline dt-bootstrap",
        sFilterInput: "form-control input-sm",
        sLengthSelect: "form-control input-sm",
        sProcessing: "dataTables_processing panel panel-default"
    }), u.ext.renderer.pageButton.bootstrap = function(t, f, e, o, s, h) {
        var y = new u.Api(t),
            b = t.oClasses,
            a = t.oLanguage.oPaginate,
            k = t.oLanguage.oAria.paginate || {},
            c, l, p = 0,
            w = function(i, r) {
                for (var v, u, d = function(t) {
                        t.preventDefault();
                        n(t.currentTarget).hasClass("disabled") || y.page() == t.data.action || y.page(t.data.action).draw("page")
                    }, f = 0, o = r.length; f < o; f++)
                    if (u = r[f], n.isArray(u)) w(i, u);
                    else {
                        c = "";
                        l = "";
                        switch (u) {
                            case "ellipsis":
                                c = "&#x2026;";
                                l = "disabled";
                                break;
                            case "first":
                                c = a.sFirst;
                                l = u + (s > 0 ? "" : " disabled");
                                break;
                            case "previous":
                                c = a.sPrevious;
                                l = u + (s > 0 ? "" : " disabled");
                                break;
                            case "next":
                                c = a.sNext;
                                l = u + (s < h - 1 ? "" : " disabled");
                                break;
                            case "last":
                                c = a.sLast;
                                l = u + (s < h - 1 ? "" : " disabled");
                                break;
                            default:
                                c = u + 1;
                                l = s === u ? "active" : ""
                        }
                        c && (v = n("<li>", {
                            "class": b.sPageButton + " " + l,
                            id: e === 0 && typeof u == "string" ? t.sTableId + "_" + u : null
                        }).append(n("<a>", {
                            href: "#",
                            "aria-controls": t.sTableId,
                            "aria-label": k[u],
                            "data-dt-idx": p,
                            tabindex: t.iTabIndex
                        }).html(c)).appendTo(i), t.oApi._fnBindAction(v, {
                            action: u
                        }, d), p++)
                    }
            },
            v;
        try {
            v = n(f).find(i.activeElement).data("dt-idx")
        } catch (d) {}
        w(n(f).empty().html('<ul class="pagination"/>').children("ul"), o);
        v !== r && n(f).find("[data-dt-idx=" + v + "]").focus()
    }, u
}),
function(n) {
    typeof define == "function" && define.amd ? define(["jquery", "datatables.net"], function(t) {
        return n(t, window, document)
    }) : typeof exports == "object" ? module.exports = function(t, i) {
        return t || (t = window), i && i.fn.dataTable || (i = require("datatables.net")(t, i).$), n(i, t, t.document)
    } : n(jQuery, window, document)
}(function(n, t, i, r) {
    "use strict";
    var u = n.fn.dataTable,
        c = 0,
        l = 0,
        f = u.ext.buttons,
        e = function(t, i) {
            i === !0 && (i = {});
            n.isArray(i) && (i = {
                buttons: i
            });
            this.c = n.extend(!0, {}, e.defaults, i);
            i.buttons && (this.c.buttons = i.buttons);
            this.s = {
                dt: new u.Api(t),
                buttons: [],
                listenKeys: "",
                namespace: "dtb" + c++
            };
            this.dom = {
                container: n("<" + this.c.dom.container.tag + "/>").addClass(this.c.dom.container.className)
            };
            this._constructor()
        },
        o, s, h;
    n.extend(e.prototype, {
        action: function(n, t) {
            var i = this._nodeToButton(n);
            return t === r ? i.conf.action : (i.conf.action = t, this)
        },
        active: function(t, i) {
            var e = this._nodeToButton(t),
                u = this.c.dom.button.active,
                f = n(e.node);
            return i === r ? f.hasClass(u) : (f.toggleClass(u, i === r ? !0 : i), this)
        },
        add: function(n, t) {
            var f = this.s.buttons,
                i, r, u, e;
            if (typeof t == "string") {
                for (i = t.split("-"), r = this.s, u = 0, e = i.length - 1; u < e; u++) r = r.buttons[i[u] * 1];
                f = r.buttons;
                t = i[i.length - 1] * 1
            }
            return this._expandButton(f, n, !1, t), this._draw(), this
        },
        container: function() {
            return this.dom.container
        },
        disable: function(t) {
            var i = this._nodeToButton(t);
            return n(i.node).addClass(this.c.dom.button.disabled), this
        },
        destroy: function() {
            var u, t, i, r;
            for (n("body").off("keyup." + this.s.namespace), u = this.s.buttons.slice(), t = 0, i = u.length; t < i; t++) this.remove(u[t].node);
            for (this.dom.container.remove(), r = this.s.dt.settings()[0], t = 0, i = r.length; t < i; t++)
                if (r.inst === this) {
                    r.splice(t, 1);
                    break
                }
            return this
        },
        enable: function(t, i) {
            if (i === !1) return this.disable(t);
            var r = this._nodeToButton(t);
            return n(r.node).removeClass(this.c.dom.button.disabled), this
        },
        name: function() {
            return this.c.name
        },
        node: function(t) {
            var i = this._nodeToButton(t);
            return n(i.node)
        },
        remove: function(t) {
            var i = this._nodeToButton(t),
                u = this._nodeToHost(t),
                f = this.s.dt,
                r, e;
            if (i.buttons.length)
                for (r = i.buttons.length - 1; r >= 0; r--) this.remove(i.buttons[r].node);
            return i.conf.destroy && i.conf.destroy.call(f.button(t), f, n(t), i.conf), this._removeKey(i.conf), n(i.node).remove(), e = n.inArray(i, u), u.splice(e, 1), this
        },
        text: function(t, i) {
            var u = this._nodeToButton(t),
                f = this.c.dom.collection.buttonLiner,
                s = u.inCollection && f && f.tag ? f.tag : this.c.dom.buttonLiner.tag,
                h = this.s.dt,
                e = n(u.node),
                o = function(n) {
                    return typeof n == "function" ? n(h, e, u.conf) : n
                };
            return i === r ? o(u.conf.text) : (u.conf.text = i, s ? e.children(s).html(o(i)) : e.html(o(i)), this)
        },
        _constructor: function() {
            var r = this,
                f = this.s.dt,
                u = f.settings()[0],
                e = this.c.buttons,
                t, o;
            for (u._buttons || (u._buttons = []), u._buttons.push({
                    inst: this,
                    name: this.c.name
                }), t = 0, o = e.length; t < o; t++) this.add(e[t]);
            f.on("destroy", function() {
                r.destroy()
            });
            n("body").on("keyup." + this.s.namespace, function(n) {
                if (!i.activeElement || i.activeElement === i.body) {
                    var t = String.fromCharCode(n.keyCode).toLowerCase();
                    r.s.listenKeys.toLowerCase().indexOf(t) !== -1 && r._keypress(t, n)
                }
            })
        },
        _addKey: function(t) {
            t.key && (this.s.listenKeys += n.isPlainObject(t.key) ? t.key.key : t.key)
        },
        _draw: function(n, t) {
            n || (n = this.dom.container, t = this.s.buttons);
            n.children().detach();
            for (var i = 0, r = t.length; i < r; i++) n.append(t[i].inserter), t[i].buttons && t[i].buttons.length && this._draw(t[i].collection, t[i].buttons)
        },
        _expandButton: function(t, i, u, f) {
            for (var o, e, h, c = this.s.dt, a = 0, l = n.isArray(i) ? i : [i], s = 0, v = l.length; s < v; s++)
                if (o = this._resolveExtends(l[s]), o) {
                    if (n.isArray(o)) {
                        this._expandButton(t, o, u, f);
                        continue
                    }(e = this._buildButton(o, u), e) && (f !== r ? (t.splice(f, 0, e), f++) : t.push(e), e.conf.buttons && (h = this.c.dom.collection, e.collection = n("<" + h.tag + "/>").addClass(h.className), e.conf._collection = e.collection, this._expandButton(e.buttons, e.conf.buttons, !0, f)), o.init && o.init.call(c.button(e.node), c, n(e.node), o), a++)
                }
        },
        _buildButton: function(t, i) {
            var u = this.c.dom.button,
                f = this.c.dom.buttonLiner,
                o = this.c.dom.collection,
                s = this.s.dt,
                a = function(n) {
                    return typeof n == "function" ? n(s, r, t) : n
                },
                h, r, c, e, v;
            return (i && o.button && (u = o.button), i && o.buttonLiner && (f = o.buttonLiner), t.available && !t.available(s, t)) ? !1 : (h = function(t, i, r, u) {
                u.action.call(i.button(r), t, i, r, u);
                n(i.table().node()).triggerHandler("buttons-action.dt", [i.button(r), i, r, u])
            }, r = n("<" + u.tag + "/>").addClass(u.className).attr("tabindex", this.s.dt.settings()[0].iTabIndex).attr("aria-controls", this.s.dt.table().node().id).on("click.dtb", function(n) {
                n.preventDefault();
                !r.hasClass(u.disabled) && t.action && h(n, s, r, t);
                r.blur()
            }).on("keyup.dtb", function(n) {
                n.keyCode === 13 && !r.hasClass(u.disabled) && t.action && h(n, s, r, t)
            }), u.tag.toLowerCase() === "a" && r.attr("href", "#"), f.tag ? (c = n("<" + f.tag + "/>").html(a(t.text)).addClass(f.className), f.tag.toLowerCase() === "a" && c.attr("href", "#"), r.append(c)) : r.html(a(t.text)), t.enabled === !1 && r.addClass(u.disabled), t.className && r.addClass(t.className), t.titleAttr && r.attr("title", t.titleAttr), t.namespace || (t.namespace = ".dt-button-" + l++), e = this.c.dom.buttonContainer, v = e && e.tag ? n("<" + e.tag + "/>").addClass(e.className).append(r) : r, this._addKey(t), {
                conf: t,
                node: r.get(0),
                inserter: v,
                buttons: [],
                inCollection: i,
                collection: null
            })
        },
        _nodeToButton: function(n, t) {
            var i, u, r;
            for (t || (t = this.s.buttons), i = 0, u = t.length; i < u; i++) {
                if (t[i].node === n) return t[i];
                if (t[i].buttons.length && (r = this._nodeToButton(n, t[i].buttons), r)) return r
            }
        },
        _nodeToHost: function(n, t) {
            var i, u, r;
            for (t || (t = this.s.buttons), i = 0, u = t.length; i < u; i++) {
                if (t[i].node === n) return t;
                if (t[i].buttons.length && (r = this._nodeToHost(n, t[i].buttons), r)) return r
            }
        },
        _keypress: function(t, i) {
            var u = function(r, u) {
                    if (r.key)
                        if (r.key === t) n(u).click();
                        else if (n.isPlainObject(r.key)) {
                        if (r.key.key !== t) return;
                        if (r.key.shiftKey && !i.shiftKey) return;
                        if (r.key.altKey && !i.altKey) return;
                        if (r.key.ctrlKey && !i.ctrlKey) return;
                        if (r.key.metaKey && !i.metaKey) return;
                        n(u).click()
                    }
                },
                r = function(n) {
                    for (var t = 0, i = n.length; t < i; t++) u(n[t].conf, n[t].node), n[t].buttons.length && r(n[t].buttons)
                };
            r(this.s.buttons)
        },
        _removeKey: function(t) {
            if (t.key) {
                var r = n.isPlainObject(t.key) ? t.key.key : t.key,
                    i = this.s.listenKeys.split(""),
                    u = n.inArray(r, i);
                i.splice(u, 1);
                this.s.listenKeys = i.join("")
            }
        },
        _resolveExtends: function(t) {
            var l = this.s.dt,
                i, e, c = function(i) {
                    for (var u = 0; !n.isPlainObject(i) && !n.isArray(i);) {
                        if (i === r) return;
                        if (typeof i == "function") {
                            if (i = i(l, t), !i) return !1
                        } else if (typeof i == "string") {
                            if (!f[i]) throw "Unknown button type: " + i;
                            i = f[i]
                        }
                        if (u++, u > 30) throw "Buttons: Too many iterations";
                    }
                    return n.isArray(i) ? i : n.extend({}, i)
                },
                u, o, s, h;
            for (t = c(t); t && t.extend;) {
                if (!f[t.extend]) throw "Cannot extend unknown button type: " + t.extend;
                if (u = c(f[t.extend]), n.isArray(u)) return u;
                if (!u) return !1;
                if (o = u.className, t = n.extend({}, u, t), o && t.className !== o && (t.className = o + " " + t.className), s = t.postfixButtons, s) {
                    for (t.buttons || (t.buttons = []), i = 0, e = s.length; i < e; i++) t.buttons.push(s[i]);
                    t.postfixButtons = null
                }
                if (h = t.prefixButtons, h) {
                    for (t.buttons || (t.buttons = []), i = 0, e = h.length; i < e; i++) t.buttons.splice(i, 0, h[i]);
                    t.prefixButtons = null
                }
                t.extend = u.extend
            }
            return t
        }
    });
    e.background = function(t, i, u) {
        u === r && (u = 400);
        t ? n("<div/>").addClass(i).css("display", "none").appendTo("body").fadeIn(u) : n("body > div." + i).fadeOut(u, function() {
            n(this).removeClass(i).remove()
        })
    };
    e.instanceSelector = function(t, i) {
        if (!t) return n.map(i, function(n) {
            return n.inst
        });
        var r = [],
            f = n.map(i, function(n) {
                return n.name
            }),
            u = function(t) {
                var e, s, o;
                if (n.isArray(t)) {
                    for (e = 0, s = t.length; e < s; e++) u(t[e]);
                    return
                }
                typeof t == "string" ? t.indexOf(",") !== -1 ? u(t.split(",")) : (o = n.inArray(n.trim(t), f), o !== -1 && r.push(i[o].inst)) : typeof t == "number" && r.push(i[t].inst)
            };
        return u(t), r
    };
    e.buttonSelector = function(t, i) {
        for (var s, u = [], o = function(n, t, i) {
                for (var u, e, f = 0, s = t.length; f < s; f++) u = t[f], u && (e = i !== r ? i + f : f + "", n.push({
                    node: u.node,
                    name: u.conf.name,
                    idx: e
                }), u.buttons && o(n, u.buttons, e + "-"))
            }, f = function(t, i) {
                var e, h, s = [],
                    c, l, v, y, a;
                if (o(s, i.s.buttons), c = n.map(s, function(n) {
                        return n.node
                    }), n.isArray(t) || t instanceof n) {
                    for (e = 0, h = t.length; e < h; e++) f(t[e], i);
                    return
                }
                if (t === null || t === r || t === "*")
                    for (e = 0, h = s.length; e < h; e++) u.push({
                        inst: i,
                        node: s[e].node
                    });
                else if (typeof t == "number") u.push({
                    inst: i,
                    node: i.s.buttons[t].node
                });
                else if (typeof t == "string")
                    if (t.indexOf(",") !== -1)
                        for (l = t.split(","), e = 0, h = l.length; e < h; e++) f(n.trim(l[e]), i);
                    else if (t.match(/^\d+(\-\d+)*$/)) v = n.map(s, function(n) {
                    return n.idx
                }), u.push({
                    inst: i,
                    node: s[n.inArray(t, v)].node
                });
                else if (t.indexOf(":name") !== -1)
                    for (y = t.replace(":name", ""), e = 0, h = s.length; e < h; e++) s[e].name === y && u.push({
                        inst: i,
                        node: s[e].node
                    });
                else n(c).filter(t).each(function() {
                    u.push({
                        inst: i,
                        node: this
                    })
                });
                else typeof t == "object" && t.nodeName && (a = n.inArray(t, c), a !== -1 && u.push({
                    inst: i,
                    node: c[a]
                }))
            }, e = 0, h = t.length; e < h; e++) s = t[e], f(i, s);
        return u
    };
    e.defaults = {
        buttons: ["copy", "excel", "csv", "pdf", "print"],
        name: "main",
        tabIndex: 0,
        dom: {
            container: {
                tag: "div",
                className: "dt-buttons"
            },
            collection: {
                tag: "div",
                className: "dt-button-collection"
            },
            button: {
                tag: "a",
                className: "dt-button",
                active: "active",
                disabled: "disabled"
            },
            buttonLiner: {
                tag: "span",
                className: ""
            }
        }
    };
    e.version = "1.2.4";
    n.extend(f, {
        collection: {
            text: function(n) {
                return n.i18n("buttons.collection", "Collection")
            },
            className: "buttons-collection",
            action: function(i, r, u, f) {
                var v = u,
                    o = v.offset(),
                    y = n(r.table().container()),
                    s = !1,
                    c, l, a, h;
                if (n("div.dt-button-background").length && (s = n(".dt-button-collection").offset(), n("body").trigger("click.dtb-collection")), f._collection.addClass(f.collectionLayout).css("display", "none").appendTo("body").fadeIn(f.fade), c = f._collection.css("position"), s && c === "absolute" ? f._collection.css({
                        top: s.top,
                        left: s.left
                    }) : c === "absolute" ? (f._collection.css({
                        top: o.top + v.outerHeight(),
                        left: o.left
                    }), l = o.left + f._collection.outerWidth(), a = y.offset().left + y.width(), l > a && f._collection.css("left", o.left - (l - a))) : (h = f._collection.height() / 2, h > n(t).height() / 2 && (h = n(t).height() / 2), f._collection.css("marginTop", h * -1)), f.background && e.background(!0, f.backgroundClassName, f.fade), setTimeout(function() {
                        n("div.dt-button-background").on("click.dtb-collection", function() {});
                        n("body").on("click.dtb-collection", function(t) {
                            var i = n.fn.addBack ? "addBack" : "andSelf";
                            n(t.target).parents()[i]().filter(f._collection).length || (f._collection.fadeOut(f.fade, function() {
                                f._collection.detach()
                            }), n("div.dt-button-background").off("click.dtb-collection"), e.background(!1, f.backgroundClassName, f.fade), n("body").off("click.dtb-collection"), r.off("buttons-action.b-internal"))
                        })
                    }, 10), f.autoClose) r.on("buttons-action.b-internal", function() {
                    n("div.dt-button-background").click()
                })
            },
            background: !0,
            collectionLayout: "",
            backgroundClassName: "dt-button-background",
            autoClose: !1,
            fade: 400
        },
        copy: function(n, t) {
            return f.copyHtml5 ? "copyHtml5" : f.copyFlash && f.copyFlash.available(n, t) ? "copyFlash" : void 0
        },
        csv: function(n, t) {
            return f.csvHtml5 && f.csvHtml5.available(n, t) ? "csvHtml5" : f.csvFlash && f.csvFlash.available(n, t) ? "csvFlash" : void 0
        },
        excel: function(n, t) {
            return f.excelHtml5 && f.excelHtml5.available(n, t) ? "excelHtml5" : f.excelFlash && f.excelFlash.available(n, t) ? "excelFlash" : void 0
        },
        pdf: function(n, t) {
            return f.pdfHtml5 && f.pdfHtml5.available(n, t) ? "pdfHtml5" : f.pdfFlash && f.pdfFlash.available(n, t) ? "pdfFlash" : void 0
        },
        pageLength: function(t) {
            var i = t.settings()[0].aLengthMenu,
                u = n.isArray(i[0]) ? i[0] : i,
                f = n.isArray(i[0]) ? i[1] : i,
                r = function(n) {
                    return n.i18n("buttons.pageLength", {
                        "-1": "Show all rows",
                        _: "Show %d rows"
                    }, n.page.len())
                };
            return {
                extend: "collection",
                text: r,
                className: "buttons-page-length",
                autoClose: !0,
                buttons: n.map(u, function(n, t) {
                    return {
                        text: f[t],
                        className: "button-page-length",
                        action: function(t, i) {
                            i.page.len(n).draw()
                        },
                        init: function(t, i, r) {
                            var f = this,
                                u = function() {
                                    f.active(t.page.len() === n)
                                };
                            t.on("length.dt" + r.namespace, u);
                            u()
                        },
                        destroy: function(n, t, i) {
                            n.off("length.dt" + i.namespace)
                        }
                    }
                }),
                init: function(n, t, i) {
                    var u = this;
                    n.on("length.dt" + i.namespace, function() {
                        u.text(r(n))
                    })
                },
                destroy: function(n, t, i) {
                    n.off("length.dt" + i.namespace)
                }
            }
        }
    });
    u.Api.register("buttons()", function(n, t) {
        t === r && (t = n, n = r);
        this.selector.buttonGroup = n;
        var i = this.iterator(!0, "table", function(i) {
            if (i._buttons) return e.buttonSelector(e.instanceSelector(n, i._buttons), t)
        }, !0);
        return i._groupSelector = n, i
    });
    u.Api.register("button()", function(n, t) {
        var i = this.buttons(n, t);
        return i.length > 1 && i.splice(1, i.length), i
    });
    u.Api.registerPlural("buttons().active()", "button().active()", function(n) {
        return n === r ? this.map(function(n) {
            return n.inst.active(n.node)
        }) : this.each(function(t) {
            t.inst.active(t.node, n)
        })
    });
    u.Api.registerPlural("buttons().action()", "button().action()", function(n) {
        return n === r ? this.map(function(n) {
            return n.inst.action(n.node)
        }) : this.each(function(t) {
            t.inst.action(t.node, n)
        })
    });
    u.Api.register(["buttons().enable()", "button().enable()"], function(n) {
        return this.each(function(t) {
            t.inst.enable(t.node, n)
        })
    });
    u.Api.register(["buttons().disable()", "button().disable()"], function() {
        return this.each(function(n) {
            n.inst.disable(n.node)
        })
    });
    u.Api.registerPlural("buttons().nodes()", "button().node()", function() {
        var t = n();
        return n(this.each(function(n) {
            t = t.add(n.inst.node(n.node))
        })), t
    });
    u.Api.registerPlural("buttons().text()", "button().text()", function(n) {
        return n === r ? this.map(function(n) {
            return n.inst.text(n.node)
        }) : this.each(function(t) {
            t.inst.text(t.node, n)
        })
    });
    u.Api.registerPlural("buttons().trigger()", "button().trigger()", function() {
        return this.each(function(n) {
            n.inst.node(n.node).trigger("click")
        })
    });
    u.Api.registerPlural("buttons().containers()", "buttons().container()", function() {
        var t = n(),
            i = this._groupSelector;
        return this.iterator(!0, "table", function(n) {
            var u, r, f;
            if (n._buttons)
                for (u = e.instanceSelector(i, n._buttons), r = 0, f = u.length; r < f; r++) t = t.add(u[r].container())
        }), t
    });
    u.Api.register("button().add()", function(n, t) {
        var r = this.context,
            i;
        return r.length && (i = e.instanceSelector(this._groupSelector, r[0]._buttons), i.length && i[0].add(t, n)), this.button(this._groupSelector, n)
    });
    u.Api.register("buttons().destroy()", function() {
        return this.pluck("inst").unique().each(function(n) {
            n.destroy()
        }), this
    });
    u.Api.registerPlural("buttons().remove()", "buttons().remove()", function() {
        return this.each(function(n) {
            n.inst.remove(n.node)
        }), this
    });
    u.Api.register("buttons.info()", function(t, i, u) {
        var f = this;
        return t === !1 ? (n("#datatables_buttons_info").fadeOut(function() {
            n(this).remove()
        }), clearTimeout(o), o = null, this) : (o && clearTimeout(o), n("#datatables_buttons_info").length && n("#datatables_buttons_info").remove(), t = t ? "<h2>" + t + "<\/h2>" : "", n('<div id="datatables_buttons_info" class="dt-button-info"/>').html(t).append(n("<div/>")[typeof i == "string" ? "html" : "append"](i)).css("display", "none").appendTo("body").fadeIn(), u !== r && u !== 0 && (o = setTimeout(function() {
            f.buttons.info(!1)
        }, u)), this)
    });
    u.Api.register("buttons.exportData()", function(n) {
        if (this.context.length) return h(new u.Api(this.context[0]), n)
    });
    s = n("<textarea/>")[0];
    h = function(t, i) {
        for (var c, u, r = n.extend(!0, {}, {
                rows: null,
                columns: "",
                modifier: {
                    search: "applied",
                    order: "applied"
                },
                orthogonal: "display",
                stripHtml: !0,
                stripNewlines: !0,
                decodeEntities: !0,
                trim: !0,
                format: {
                    header: function(n) {
                        return o(n)
                    },
                    footer: function(n) {
                        return o(n)
                    },
                    body: function(n) {
                        return o(n)
                    }
                }
            }, i), o = function(n) {
                return typeof n != "string" ? n : (r.stripHtml && (n = n.replace(/<[^>]*>/g, "")), r.trim && (n = n.replace(/^\s+|\s+$/g, "")), r.stripNewlines && (n = n.replace(/\n/g, " ")), r.decodeEntities && (s.innerHTML = n, n = s.value), n)
            }, l = t.columns(r.columns).indexes().map(function(n) {
                var i = t.column(n).header();
                return r.format.header(i.innerHTML, n, i)
            }).toArray(), w = t.table().footer() ? t.columns(r.columns).indexes().map(function(n) {
                var i = t.column(n).footer();
                return r.format.footer(i ? i.innerHTML : "", n, i)
            }).toArray() : null, b = t.rows(r.rows, r.modifier).indexes().toArray(), a = t.cells(b, r.columns), v = a.render(r.orthogonal).toArray(), k = a.nodes().toArray(), f = l.length, y = f > 0 ? v.length / f : 0, p = new Array(y), h = 0, e = 0, d = y; e < d; e++) {
            for (c = new Array(f), u = 0; u < f; u++) c[u] = r.format.body(v[h], e, u, k[h]), h++;
            p[e] = c
        }
        return {
            header: l,
            footer: w,
            body: p
        }
    };
    n.fn.dataTable.Buttons = e;
    n.fn.DataTable.Buttons = e;
    n(i).on("init.dt plugin-init.dt", function(n, t) {
        if (n.namespace === "dt") {
            var i = t.oInit.buttons || u.defaults.buttons;
            i && !t._buttons && new e(t, i).container()
        }
    });
    return u.ext.feature.push({
        fnInit: function(n) {
            var t = new u.Api(n),
                i = t.init().buttons || u.defaults.buttons;
            return new e(t, i).container()
        },
        cFeature: "B"
    }), e
}),
function(n) {
    typeof define == "function" && define.amd ? define(["jquery", "datatables.net-bs", "datatables.net-buttons"], function(t) {
        return n(t, window, document)
    }) : typeof exports == "object" ? module.exports = function(t, i) {
        return t || (t = window), i && i.fn.dataTable || (i = require("datatables.net-bs")(t, i).$), i.fn.dataTable.Buttons || require("datatables.net-buttons")(t, i), n(i, t, t.document)
    } : n(jQuery, window, document)
}(function(n) {
    "use strict";
    var t = n.fn.dataTable;
    return n.extend(!0, t.Buttons.defaults, {
        dom: {
            container: {
                className: "dt-buttons btn-group"
            },
            button: {
                className: "btn btn-default"
            },
            collection: {
                tag: "ul",
                className: "dt-button-collection dropdown-menu",
                button: {
                    tag: "li",
                    className: "dt-button"
                },
                buttonLiner: {
                    tag: "a",
                    className: ""
                }
            }
        }
    }), t.ext.buttons.collection.text = function(n) {
        return n.i18n("buttons.collection", 'Collection <span class="caret"/>')
    }, t.Buttons
}),
function(n) {
    typeof define == "function" && define.amd ? define(["jquery", "datatables.net", "datatables.net-buttons"], function(t) {
        return n(t, window, document)
    }) : typeof exports == "object" ? module.exports = function(t, i) {
        return t || (t = window), i && i.fn.dataTable || (i = require("datatables.net")(t, i).$), i.fn.dataTable.Buttons || require("datatables.net-buttons")(t, i), n(i, t, t.document)
    } : n(jQuery, window, document)
}(function(n, t, i, r) {
    "use strict";
    var u = n.fn.dataTable;
    return n.extend(u.ext.buttons, {
        colvis: function(n, t) {
            return {
                extend: "collection",
                text: function(n) {
                    return n.i18n("buttons.colvis", "Column visibility")
                },
                className: "buttons-colvis",
                buttons: [{
                    extend: "columnsToggle",
                    columns: t.columns
                }]
            }
        },
        columnsToggle: function(n, t) {
            return n.columns(t.columns).indexes().map(function(n) {
                return {
                    extend: "columnToggle",
                    columns: n
                }
            }).toArray()
        },
        columnToggle: function(n, t) {
            return {
                extend: "columnVisibility",
                columns: t.columns
            }
        },
        columnsVisibility: function(n, t) {
            return n.columns(t.columns).indexes().map(function(n) {
                return {
                    extend: "columnVisibility",
                    columns: n,
                    visibility: t.visibility
                }
            }).toArray()
        },
        columnVisibility: {
            columns: r,
            text: function(n, t, i) {
                return i._columnText(n, i.columns)
            },
            className: "buttons-columnVisibility",
            action: function(n, t, i, u) {
                var f = t.columns(u.columns),
                    e = f.visible();
                f.visible(u.visibility !== r ? u.visibility : !(e.length ? e[0] : !1))
            },
            init: function(n, t, i) {
                var r = this;
                n.on("column-visibility.dt" + i.namespace, function(t, u) {
                    u.bDestroying || r.active(n.column(i.columns).visible())
                }).on("column-reorder.dt" + i.namespace, function(t, u, f) {
                    if (n.columns(i.columns).count() === 1) {
                        typeof i.columns == "number" && (i.columns = f.mapping[i.columns]);
                        var e = n.column(i.columns);
                        r.text(i._columnText(n, i.columns));
                        r.active(e.visible())
                    }
                });
                this.active(n.column(i.columns).visible())
            },
            destroy: function(n, t, i) {
                n.off("column-visibility.dt" + i.namespace).off("column-reorder.dt" + i.namespace)
            },
            _columnText: function(n, t) {
                var i = n.column(t).index();
                return n.settings()[0].aoColumns[i].sTitle.replace(/\n/g, " ").replace(/<.*?>/g, "").replace(/^\s+|\s+$/g, "")
            }
        },
        colvisRestore: {
            className: "buttons-colvisRestore",
            text: function(n) {
                return n.i18n("buttons.colvisRestore", "Restore visibility")
            },
            init: function(n, t, i) {
                i._visOriginal = n.columns().indexes().map(function(t) {
                    return n.column(t).visible()
                }).toArray()
            },
            action: function(n, t, i, r) {
                t.columns().every(function(n) {
                    var i = t.colReorder && t.colReorder.transpose ? t.colReorder.transpose(n, "toOriginal") : n;
                    this.visible(r._visOriginal[i])
                })
            }
        },
        colvisGroup: {
            className: "buttons-colvisGroup",
            action: function(n, t, i, r) {
                t.columns(r.show).visible(!0, !1);
                t.columns(r.hide).visible(!1, !1);
                t.columns.adjust()
            },
            show: [],
            hide: []
        }
    }), u.Buttons
}),
function(n) {
    typeof define == "function" && define.amd ? define(["jquery", "datatables.net"], function(t) {
        return n(t, window, document)
    }) : typeof exports == "object" ? module.exports = function(t, i) {
        return t || (t = window), i && i.fn.dataTable || (i = require("datatables.net")(t, i).$), n(i, t, t.document)
    } : n(jQuery, window, document)
}(function(n, t, i, r) {
    "use strict";
    var f = n.fn.dataTable,
        e = 0,
        u = function(i, r) {
            if (!(this instanceof u)) throw "FixedHeader must be initialised with the 'new' keyword.";
            r === !0 && (r = {});
            i = new f.Api(i);
            this.c = n.extend(!0, {}, u.defaults, r);
            this.s = {
                dt: i,
                position: {
                    theadTop: 0,
                    tbodyTop: 0,
                    tfootTop: 0,
                    tfootBottom: 0,
                    width: 0,
                    left: 0,
                    tfootHeight: 0,
                    theadHeight: 0,
                    windowHeight: n(t).height(),
                    visible: !0
                },
                headerMode: null,
                footerMode: null,
                autoWidth: i.settings()[0].oFeatures.bAutoWidth,
                namespace: ".dtfc" + e++,
                scrollLeft: {
                    header: -1,
                    footer: -1
                },
                enable: !0
            };
            this.dom = {
                floatingHeader: null,
                thead: n(i.table().header()),
                tbody: n(i.table().body()),
                tfoot: n(i.table().footer()),
                header: {
                    host: null,
                    floating: null,
                    placeholder: null
                },
                footer: {
                    host: null,
                    floating: null,
                    placeholder: null
                }
            };
            this.dom.header.host = this.dom.thead.parent();
            this.dom.footer.host = this.dom.tfoot.parent();
            var o = i.settings()[0];
            if (o._fixedHeader) throw "FixedHeader already initialised on table " + o.nTable.id;
            o._fixedHeader = this;
            this._constructor()
        };
    n.extend(u.prototype, {
        enable: function(n) {
            this.s.enable = n;
            this.c.header && this._modeChange("in-place", "header", !0);
            this.c.footer && this.dom.tfoot.length && this._modeChange("in-place", "footer", !0);
            this.update()
        },
        headerOffset: function(n) {
            return n !== r && (this.c.headerOffset = n, this.update()), this.c.headerOffset
        },
        footerOffset: function(n) {
            return n !== r && (this.c.footerOffset = n, this.update()), this.c.footerOffset
        },
        update: function() {
            this._positions();
            this._scroll(!0)
        },
        _constructor: function() {
            var i = this,
                r = this.s.dt,
                u, f;
            n(t).on("scroll" + this.s.namespace, function() {
                i._scroll()
            }).on("resize" + this.s.namespace, function() {
                i.s.position.windowHeight = n(t).height();
                i.update()
            });
            u = n(".fh-fixedHeader");
            !this.c.headerOffset && u.length && (this.c.headerOffset = u.outerHeight());
            f = n(".fh-fixedFooter");
            !this.c.footerOffset && f.length && (this.c.footerOffset = f.outerHeight());
            r.on("column-reorder.dt.dtfc column-visibility.dt.dtfc draw.dt.dtfc column-sizing.dt.dtfc", function() {
                i.update()
            });
            r.on("destroy.dtfc", function() {
                r.off(".dtfc");
                n(t).off(i.s.namespace)
            });
            this._positions();
            this._scroll()
        },
        _clone: function(t, i) {
            var f = this.s.dt,
                r = this.dom[t],
                u = t === "header" ? this.dom.thead : this.dom.tfoot;
            !i && r.floating ? r.floating.removeClass("fixedHeader-floating fixedHeader-locked") : (r.floating && (r.placeholder.remove(), this._unsize(t), r.floating.children().detach(), r.floating.remove()), r.floating = n(f.table().node().cloneNode(!1)).css("table-layout", "fixed").removeAttr("id").append(u).appendTo("body"), r.placeholder = u.clone(!1), r.host.prepend(r.placeholder), this._matchWidths(r.placeholder, r.floating))
        },
        _matchWidths: function(t, i) {
            var r = function(i) {
                    return n(i, t).map(function() {
                        return n(this).width()
                    }).toArray()
                },
                u = function(t, r) {
                    n(t, i).each(function(t) {
                        n(this).css({
                            width: r[t],
                            minWidth: r[t]
                        })
                    })
                },
                f = r("th"),
                e = r("td");
            u("th", f);
            u("td", e)
        },
        _unsize: function(t) {
            var i = this.dom[t].floating;
            i && (t === "footer" || t === "header" && !this.s.autoWidth) ? n("th, td", i).css({
                width: "",
                minWidth: ""
            }) : i && t === "header" && n("th, td", i).css("min-width", "")
        },
        _horizontal: function(n, t) {
            var i = this.dom[n],
                u = this.s.position,
                r = this.s.scrollLeft;
            i.floating && r[n] !== t && (i.floating.css("left", u.left - t), r[n] = t)
        },
        _modeChange: function(t, r, u) {
            var h = this.s.dt,
                f = this.dom[r],
                e = this.s.position,
                s = this.dom[r === "footer" ? "tfoot" : "thead"],
                o = n.contains(s[0], i.activeElement) ? i.activeElement : null;
            t === "in-place" ? (f.placeholder && (f.placeholder.remove(), f.placeholder = null), this._unsize(r), r === "header" ? f.host.prepend(this.dom.thead) : f.host.append(this.dom.tfoot), f.floating && (f.floating.remove(), f.floating = null)) : t === "in" ? (this._clone(r, u), f.floating.addClass("fixedHeader-floating").css(r === "header" ? "top" : "bottom", this.c[r + "Offset"]).css("left", e.left + "px").css("width", e.width + "px"), r === "footer" && f.floating.css("top", "")) : t === "below" ? (this._clone(r, u), f.floating.addClass("fixedHeader-locked").css("top", e.tfootTop - e.theadHeight).css("left", e.left + "px").css("width", e.width + "px")) : t === "above" && (this._clone(r, u), f.floating.addClass("fixedHeader-locked").css("top", e.tbodyTop).css("left", e.left + "px").css("width", e.width + "px"));
            o && o !== i.activeElement && o.focus();
            this.s.scrollLeft.header = -1;
            this.s.scrollLeft.footer = -1;
            this.s[r + "Mode"] = t
        },
        _positions: function() {
            var f = this.s.dt,
                e = f.table(),
                t = this.s.position,
                o = this.dom,
                i = n(e.node()),
                s = i.children("thead"),
                r = i.children("tfoot"),
                u = o.tbody;
            t.visible = i.is(":visible");
            t.width = i.outerWidth();
            t.left = i.offset().left;
            t.theadTop = s.offset().top;
            t.tbodyTop = u.offset().top;
            t.theadHeight = t.tbodyTop - t.theadTop;
            r.length ? (t.tfootTop = r.offset().top, t.tfootBottom = t.tfootTop + r.outerHeight(), t.tfootHeight = t.tfootBottom - t.tfootTop) : (t.tfootTop = t.tbodyTop + u.outerHeight(), t.tfootBottom = t.tfootTop, t.tfootHeight = t.tfootTop)
        },
        _scroll: function(t) {
            var u = n(i).scrollTop(),
                o = n(i).scrollLeft(),
                r = this.s.position,
                f, e;
            this.s.enable && (this.c.header && (f = !r.visible || u <= r.theadTop - this.c.headerOffset ? "in-place" : u <= r.tfootTop - r.theadHeight - this.c.headerOffset ? "in" : "below", (t || f !== this.s.headerMode) && this._modeChange(f, "header", t), this._horizontal("header", o)), this.c.footer && this.dom.tfoot.length && (e = !r.visible || u + r.windowHeight >= r.tfootBottom + this.c.footerOffset ? "in-place" : r.windowHeight + u > r.tbodyTop + r.tfootHeight + this.c.footerOffset ? "in" : "above", (t || e !== this.s.footerMode) && this._modeChange(e, "footer", t), this._horizontal("footer", o)))
        }
    });
    u.version = "3.1.2";
    u.defaults = {
        header: !0,
        footer: !1,
        headerOffset: 0,
        footerOffset: 0
    };
    n.fn.dataTable.FixedHeader = u;
    n.fn.DataTable.FixedHeader = u;
    n(i).on("init.dt.dtfh", function(t, i) {
        var r, e, o;
        t.namespace === "dt" && (r = i.oInit.fixedHeader, e = f.defaults.fixedHeader, (r || e) && !i._fixedHeader && (o = n.extend({}, e, r), r !== !1 && new u(i, o)))
    });
    return f.Api.register("fixedHeader()", function() {}), f.Api.register("fixedHeader.adjust()", function() {
        return this.iterator("table", function(n) {
            var t = n._fixedHeader;
            t && t.update()
        })
    }), f.Api.register("fixedHeader.enable()", function(n) {
        return this.iterator("table", function(t) {
            var i = t._fixedHeader;
            i && i.enable(n !== r ? n : !0)
        })
    }), f.Api.register("fixedHeader.disable()", function() {
        return this.iterator("table", function(n) {
            var t = n._fixedHeader;
            t && t.enable(!1)
        })
    }), n.each(["header", "footer"], function(n, t) {
        f.Api.register("fixedHeader." + t + "Offset()", function(n) {
            var i = this.context;
            return n === r ? i.length && i[0]._fixedHeader ? i[0]._fixedHeader[t + "Offset"]() : r : this.iterator("table", function(i) {
                var r = i._fixedHeader;
                r && r[t + "Offset"](n)
            })
        })
    }), u
}),
function(n) {
    typeof define == "function" && define.amd ? define(["jquery", "datatables.net"], function(t) {
        return n(t, window, document)
    }) : typeof exports == "object" ? module.exports = function(t, i) {
        return t || (t = window), i && i.fn.dataTable || (i = require("datatables.net")(t, i).$), n(i, t, t.document)
    } : n(jQuery, window, document)
}(function(n, t, i, r) {
    "use strict";
    var e = n.fn.dataTable,
        u = function(t, f) {
            if (!(this instanceof u)) {
                alert("Scroller warning: Scroller must be initialised with the 'new' keyword.");
                return
            }(f === r && (f = {}), this.s = {
                dt: n.fn.dataTable.Api(t).settings()[0],
                tableTop: 0,
                tableBottom: 0,
                redrawTop: 0,
                redrawBottom: 0,
                autoHeight: !0,
                viewportRows: 0,
                stateTO: null,
                drawTO: null,
                heights: {
                    jump: null,
                    page: null,
                    virtual: null,
                    scroll: null,
                    row: null,
                    viewport: null
                },
                topRowFloat: 0,
                scrollDrawDiff: null,
                loaderVisible: !1
            }, this.s = n.extend(this.s, u.oDefaults, f), this.s.heights.row = this.s.rowHeight, this.dom = {
                force: i.createElement("div"),
                scroller: null,
                table: null,
                loader: null
            }, this.s.dt.oScroller) || (this.s.dt.oScroller = this, this._fnConstruct())
        },
        f;
    n.extend(u.prototype, {
        fnRowToPixels: function(n, t, i) {
            var u, f;
            return i ? u = this._domain("virtualToPhysical", n * this.s.heights.row) : (f = n - this.s.baseRowTop, u = this.s.baseScrollTop + f * this.s.heights.row), t || t === r ? parseInt(u, 10) : u
        },
        fnPixelsToRow: function(n, t, i) {
            var f = n - this.s.baseScrollTop,
                u = i ? this._domain("physicalToVirtual", n) / this.s.heights.row : f / this.s.heights.row + this.s.baseRowTop;
            return t || t === r ? parseInt(u, 10) : u
        },
        fnScrollToRow: function(t, i) {
            var e = this,
                f = !1,
                r = this.fnRowToPixels(t),
                o = (this.s.displayBuffer - 1) / 2 * this.s.viewportRows,
                u = t - o;
            u < 0 && (u = 0);
            (r > this.s.redrawBottom || r < this.s.redrawTop) && this.s.dt._iDisplayStart !== u && (f = !0, r = this.fnRowToPixels(t, !1, !0));
            typeof i == "undefined" || i ? (this.s.ani = f, n(this.dom.scroller).animate({
                scrollTop: r
            }, function() {
                setTimeout(function() {
                    e.s.ani = !1
                }, 25)
            })) : n(this.dom.scroller).scrollTop(r)
        },
        fnMeasure: function(t) {
            this.s.autoHeight && this._fnCalcRowHeight();
            var i = this.s.heights;
            i.row && (i.viewport = n(this.dom.scroller).height(), this.s.viewportRows = parseInt(i.viewport / i.row, 10) + 1, this.s.dt._iDisplayLength = this.s.viewportRows * this.s.displayBuffer);
            (t === r || t) && this.s.dt.oInstance.fnDraw(!1)
        },
        fnPageInfo: function() {
            var r = this.s.dt,
                n = this.dom.scroller.scrollTop,
                t = r.fnRecordsDisplay(),
                i = Math.ceil(this.fnPixelsToRow(n + this.s.heights.viewport, !1, this.s.ani));
            return {
                start: Math.floor(this.fnPixelsToRow(n, !1, this.s.ani)),
                end: t < i ? t - 1 : i - 1
            }
        },
        _fnConstruct: function() {
            var i = this,
                r;
            if (!this.s.dt.oFeatures.bPaginate) {
                this.s.dt.oApi._fnLog(this.s.dt, 0, "Pagination must be enabled for Scroller");
                return
            }
            this.dom.force.style.position = "relative";
            this.dom.force.style.top = "0px";
            this.dom.force.style.left = "0px";
            this.dom.force.style.width = "1px";
            this.dom.scroller = n("div." + this.s.dt.oClasses.sScrollBody, this.s.dt.nTableWrapper)[0];
            this.dom.scroller.appendChild(this.dom.force);
            this.dom.scroller.style.position = "relative";
            this.dom.table = n(">table", this.dom.scroller)[0];
            this.dom.table.style.position = "absolute";
            this.dom.table.style.top = "0px";
            this.dom.table.style.left = "0px";
            n(this.s.dt.nTableWrapper).addClass("DTS");
            this.s.loadingIndicator && (this.dom.loader = n('<div class="dataTables_processing DTS_Loading">' + this.s.dt.oLanguage.sLoadingRecords + "<\/div>").css("display", "none"), n(this.dom.scroller.parentNode).css("position", "relative").append(this.dom.loader));
            this.s.heights.row && this.s.heights.row != "auto" && (this.s.autoHeight = !1);
            this.fnMeasure(!1);
            this.s.ingnoreScroll = !0;
            this.s.stateSaveThrottle = this.s.dt.oApi._fnThrottle(function() {
                i.s.dt.oApi._fnSaveState(i.s.dt)
            }, 500);
            n(this.dom.scroller).on("scroll.DTS", function() {
                i._fnScroll.call(i)
            });
            n(this.dom.scroller).on("touchstart.DTS", function() {
                i._fnScroll.call(i)
            });
            this.s.dt.aoDrawCallback.push({
                fn: function() {
                    i.s.dt.bInitialised && i._fnDrawCallback.call(i)
                },
                sName: "Scroller"
            });
            n(t).on("resize.DTS", function() {
                i.fnMeasure(!1);
                i._fnInfo()
            });
            r = !0;
            this.s.dt.oApi._fnCallbackReg(this.s.dt, "aoStateSaveParams", function(n, t) {
                r && i.s.dt.oLoadedState ? (t.iScroller = i.s.dt.oLoadedState.iScroller, t.iScrollerTopRow = i.s.dt.oLoadedState.iScrollerTopRow, r = !1) : (t.iScroller = i.dom.scroller.scrollTop, t.iScrollerTopRow = i.s.topRowFloat)
            }, "Scroller_State");
            this.s.dt.oLoadedState && (this.s.topRowFloat = this.s.dt.oLoadedState.iScrollerTopRow || 0);
            n(this.s.dt.nTable).one("init.dt", function() {
                i.fnMeasure()
            });
            this.s.dt.aoDestroyCallback.push({
                sName: "Scroller",
                fn: function() {
                    n(t).off("resize.DTS");
                    n(i.dom.scroller).off("touchstart.DTS scroll.DTS");
                    n(i.s.dt.nTableWrapper).removeClass("DTS");
                    n("div.DTS_Loading", i.dom.scroller.parentNode).remove();
                    n(i.s.dt.nTable).off("init.dt");
                    i.dom.table.style.position = "";
                    i.dom.table.style.top = "";
                    i.dom.table.style.left = ""
                }
            })
        },
        _fnScroll: function() {
            var r = this,
                u = this.s.heights,
                i = this.dom.scroller.scrollTop,
                t, f, e;
            if (!this.s.skip && !this.s.ingnoreScroll) {
                if (this.s.dt.bFiltered || this.s.dt.bSorted) {
                    this.s.lastScrollTop = 0;
                    return
                }
                this._fnInfo();
                clearTimeout(this.s.stateTO);
                this.s.stateTO = setTimeout(function() {
                    r.s.dt.oApi._fnSaveState(r.s.dt)
                }, 250);
                i < this.s.redrawTop || i > this.s.redrawBottom ? (f = Math.ceil((this.s.displayBuffer - 1) / 2 * this.s.viewportRows), Math.abs(i - this.s.lastScrollTop) > u.viewport || this.s.ani ? (t = parseInt(this._domain("physicalToVirtual", i) / u.row, 10) - f, this.s.topRowFloat = this._domain("physicalToVirtual", i) / u.row) : (t = this.fnPixelsToRow(i) - f, this.s.topRowFloat = this.fnPixelsToRow(i, !1)), t <= 0 ? t = 0 : t + this.s.dt._iDisplayLength > this.s.dt.fnRecordsDisplay() ? (t = this.s.dt.fnRecordsDisplay() - this.s.dt._iDisplayLength, t < 0 && (t = 0)) : t % 2 != 0 && t++, t != this.s.dt._iDisplayStart && (this.s.tableTop = n(this.s.dt.nTable).offset().top, this.s.tableBottom = n(this.s.dt.nTable).height() + this.s.tableTop, e = function() {
                    r.s.scrollDrawReq === null && (r.s.scrollDrawReq = i);
                    r.s.dt._iDisplayStart = t;
                    r.s.dt.oApi._fnDraw(r.s.dt)
                }, this.s.dt.oFeatures.bServerSide ? (clearTimeout(this.s.drawTO), this.s.drawTO = setTimeout(e, this.s.serverWait)) : e(), this.dom.loader && !this.s.loaderVisible && (this.dom.loader.css("display", "block"), this.s.loaderVisible = !0))) : this.s.topRowFloat = this._domain("physicalToVirtual", i) / u.row;
                this.s.lastScrollTop = i;
                this.s.stateSaveThrottle()
            }
        },
        _domain: function(n, t) {
            var i = this.s.heights,
                u, r, f;
            return i.virtual === i.scroll ? t : (r = (i.scroll - i.viewport) / 2, f = (i.virtual - i.viewport) / 2, u = f / (r * r), n === "virtualToPhysical") ? t < f ? Math.pow(t / u, .5) : (t = f * 2 - t, t < 0 ? i.scroll : r * 2 - Math.pow(t / u, .5)) : n === "physicalToVirtual" ? t < r ? t * t * u : (t = r * 2 - t, t < 0 ? i.virtual : f * 2 - t * t * u) : void 0
        },
        _fnDrawCallback: function() {
            var t = this,
                r = this.s.heights,
                i = this.dom.scroller.scrollTop,
                l = i,
                a = i + r.viewport,
                h = n(this.s.dt.nTable).height(),
                u = this.s.dt._iDisplayStart,
                c = this.s.dt._iDisplayLength,
                e = this.s.dt.fnRecordsDisplay(),
                f, o, s;
            this.s.skip = !0;
            this._fnScrollForce();
            i = u === 0 ? this.s.topRowFloat * r.row : u + c >= e ? r.scroll - (e - this.s.topRowFloat) * r.row : this._domain("virtualToPhysical", this.s.topRowFloat * r.row);
            this.dom.scroller.scrollTop = i;
            this.s.baseScrollTop = i;
            this.s.baseRowTop = this.s.topRowFloat;
            f = i - (this.s.topRowFloat - u) * r.row;
            u === 0 ? f = 0 : u + c >= e && (f = r.scroll - h);
            this.dom.table.style.top = f + "px";
            this.s.tableTop = f;
            this.s.tableBottom = h + this.s.tableTop;
            o = (i - this.s.tableTop) * this.s.boundaryScale;
            this.s.redrawTop = i - o;
            this.s.redrawBottom = i + o;
            this.s.skip = !1;
            this.s.dt.oFeatures.bStateSave && this.s.dt.oLoadedState !== null && typeof this.s.dt.oLoadedState.iScroller != "undefined" ? (s = (this.s.dt.sAjaxSource || t.s.dt.ajax) && !this.s.dt.oFeatures.bServerSide ? !0 : !1, (s && this.s.dt.iDraw == 2 || !s && this.s.dt.iDraw == 1) && setTimeout(function() {
                n(t.dom.scroller).scrollTop(t.s.dt.oLoadedState.iScroller);
                t.s.redrawTop = t.s.dt.oLoadedState.iScroller - r.viewport / 2;
                setTimeout(function() {
                    t.s.ingnoreScroll = !1
                }, 0)
            }, 0)) : t.s.ingnoreScroll = !1;
            this.s.dt.oFeatures.bInfo && setTimeout(function() {
                t._fnInfo.call(t)
            }, 0);
            this.dom.loader && this.s.loaderVisible && (this.dom.loader.css("display", "none"), this.s.loaderVisible = !1)
        },
        _fnScrollForce: function() {
            var n = this.s.heights,
                t = 1e6;
            n.virtual = n.row * this.s.dt.fnRecordsDisplay();
            n.scroll = n.virtual;
            n.scroll > t && (n.scroll = t);
            this.dom.force.style.height = n.scroll > this.s.heights.row ? n.scroll + "px" : this.s.heights.row + "px"
        },
        _fnCalcRowHeight: function() {
            var t = this.s.dt,
                u = t.nTable,
                e = u.cloneNode(!1),
                i = n("<tbody/>").appendTo(e),
                f = n('<div class="' + t.oClasses.sWrapper + ' DTS"><div class="' + t.oClasses.sScrollWrapper + '"><div class="' + t.oClasses.sScrollBody + '"><\/div><\/div><\/div>'),
                r;
            for (n("tbody tr:lt(4)", u).clone().appendTo(i); n("tr", i).length < 3;) i.append("<tr><td>&nbsp;<\/td><\/tr>");
            n("div." + t.oClasses.sScrollBody, f).append(e);
            r = this.s.dt.nHolding || u.parentNode;
            n(r).is(":visible") || (r = "body");
            f.appendTo(r);
            this.s.heights.row = n("tr", i).eq(1).outerHeight();
            f.remove()
        },
        _fnInfo: function() {
            var s, f, e, b;
            if (this.s.dt.oFeatures.bInfo) {
                var t = this.s.dt,
                    i = t.oLanguage,
                    h = this.dom.scroller.scrollTop,
                    c = Math.floor(this.fnPixelsToRow(h, !1, this.s.ani) + 1),
                    l = t.fnRecordsTotal(),
                    r = t.fnRecordsDisplay(),
                    a = Math.ceil(this.fnPixelsToRow(h + this.s.heights.viewport, !1, this.s.ani)),
                    v = r < a ? r : a,
                    y = t.fnFormatNumber(c),
                    p = t.fnFormatNumber(v),
                    o = t.fnFormatNumber(l),
                    w = t.fnFormatNumber(r),
                    u;
                if (u = t.fnRecordsDisplay() === 0 && t.fnRecordsDisplay() == t.fnRecordsTotal() ? i.sInfoEmpty + i.sInfoPostFix : t.fnRecordsDisplay() === 0 ? i.sInfoEmpty + " " + i.sInfoFiltered.replace("_MAX_", o) + i.sInfoPostFix : t.fnRecordsDisplay() == t.fnRecordsTotal() ? i.sInfo.replace("_START_", y).replace("_END_", p).replace("_MAX_", o).replace("_TOTAL_", w) + i.sInfoPostFix : i.sInfo.replace("_START_", y).replace("_END_", p).replace("_MAX_", o).replace("_TOTAL_", w) + " " + i.sInfoFiltered.replace("_MAX_", t.fnFormatNumber(t.fnRecordsTotal())) + i.sInfoPostFix, s = i.fnInfoCallback, s && (u = s.call(t.oInstance, t, c, v, l, r, u)), f = t.aanFeatures.i, typeof f != "undefined")
                    for (e = 0, b = f.length; e < b; e++) n(f[e]).html(u);
                n(t.nTable).triggerHandler("info.dt")
            }
        }
    });
    u.defaults = {
        trace: !1,
        rowHeight: "auto",
        serverWait: 200,
        displayBuffer: 9,
        boundaryScale: .5,
        loadingIndicator: !1
    };
    u.oDefaults = u.defaults;
    u.version = "1.4.2";
    typeof n.fn.dataTable == "function" && typeof n.fn.dataTableExt.fnVersionCheck == "function" && n.fn.dataTableExt.fnVersionCheck("1.10.0") ? n.fn.dataTableExt.aoFeatures.push({
        fnInit: function(n) {
            var t = n.oInit,
                i = t.scroller || t.oScroller || {};
            new u(n, i)
        },
        cFeature: "S",
        sFeature: "Scroller"
    }) : alert("Warning: Scroller requires DataTables 1.10.0 or greater - www.datatables.net/download");
    n(i).on("preInit.dt.dtscroller", function(t, i) {
        var r, f, o;
        t.namespace === "dt" && (r = i.oInit.scroller, f = e.defaults.scroller, (r || f) && (o = n.extend({}, r, f), r !== !1 && new u(i, o)))
    });
    return n.fn.dataTable.Scroller = u, n.fn.DataTable.Scroller = u, f = n.fn.dataTable.Api, f.register("scroller()", function() {
        return this
    }), f.register("scroller().rowToPixels()", function(n, t, i) {
        var r = this.context;
        if (r.length && r[0].oScroller) return r[0].oScroller.fnRowToPixels(n, t, i)
    }), f.register("scroller().pixelsToRow()", function(n, t, i) {
        var r = this.context;
        if (r.length && r[0].oScroller) return r[0].oScroller.fnPixelsToRow(n, t, i)
    }), f.register("scroller().scrollToRow()", function(n, t) {
        return this.iterator("table", function(i) {
            i.oScroller && i.oScroller.fnScrollToRow(n, t)
        }), this
    }), f.register("row().scrollTo()", function(n) {
        var t = this;
        return this.iterator("row", function(i, r) {
            if (i.oScroller) {
                var u = t.rows({
                    order: "applied",
                    search: "applied"
                }).indexes().indexOf(r);
                i.oScroller.fnScrollToRow(u, n)
            }
        }), this
    }), f.register("scroller.measure()", function(n) {
        return this.iterator("table", function(t) {
            t.oScroller && t.oScroller.fnMeasure(n)
        }), this
    }), f.register("scroller.page()", function() {
        var n = this.context;
        if (n.length && n[0].oScroller) return n[0].oScroller.fnPageInfo()
    }), u
});
! function(n) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], n) : "object" == typeof exports ? module.exports = n(require("jquery")) : n(jQuery)
}(function(n) {
    "use strict";

    function o() {
        var n = document.createElement("input");
        return n.setAttribute("type", "range"), "text" !== n.type
    }

    function s(n, t) {
        var i = Array.prototype.slice.call(arguments, 2);
        return setTimeout(function() {
            return n.apply(null, i)
        }, t)
    }

    function h(n, t) {
        return t = t || 100,
            function() {
                if (!n.debouncing) {
                    var i = Array.prototype.slice.apply(arguments);
                    n.lastReturnVal = n.apply(window, i);
                    n.debouncing = !0
                }
                return clearTimeout(n.debounceTimeout), n.debounceTimeout = setTimeout(function() {
                    n.debouncing = !1
                }, t), n.lastReturnVal
            }
    }

    function c(n) {
        return n && (0 === n.offsetWidth || 0 === n.offsetHeight || n.open === !1)
    }

    function l(n) {
        for (var i = [], t = n.parentNode; c(t);) i.push(t), t = t.parentNode;
        return i
    }

    function e(n, t) {
        function e(n) {
            "undefined" != typeof n.open && (n.open = !n.open)
        }
        var r = l(n),
            f = r.length,
            o = [],
            s = n[t],
            i, u;
        if (f) {
            for (i = 0; i < f; i++) o[i] = r[i].style.cssText, r[i].style.setProperty ? r[i].style.setProperty("display", "block", "important") : r[i].style.cssText += ";display: block !important", r[i].style.height = "0", r[i].style.overflow = "hidden", r[i].style.visibility = "hidden", e(r[i]);
            for (s = n[t], u = 0; u < f; u++) r[u].style.cssText = o[u], e(r[u])
        }
        return s
    }

    function r(n, t) {
        var i = parseFloat(n);
        return Number.isNaN(i) ? t : i
    }

    function f(n) {
        return n.charAt(0).toUpperCase() + n.substr(1)
    }

    function t(t, r) {
        if (this.$window = n(window), this.$document = n(document), this.$element = n(t), this.options = n.extend({}, y, r), this.polyfill = this.options.polyfill, this.orientation = this.$element[0].getAttribute("data-orientation") || this.options.orientation, this.onInit = this.options.onInit, this.onSlide = this.options.onSlide, this.onSlideEnd = this.options.onSlideEnd, this.DIMENSION = u.orientation[this.orientation].dimension, this.DIRECTION = u.orientation[this.orientation].direction, this.DIRECTION_STYLE = u.orientation[this.orientation].directionStyle, this.COORDINATE = u.orientation[this.orientation].coordinate, this.polyfill && v) return !1;
        this.identifier = "js-" + i + "-" + a++;
        this.startEvent = this.options.startEvent.join("." + this.identifier + " ") + "." + this.identifier;
        this.moveEvent = this.options.moveEvent.join("." + this.identifier + " ") + "." + this.identifier;
        this.endEvent = this.options.endEvent.join("." + this.identifier + " ") + "." + this.identifier;
        this.toFixed = (this.step + "").replace(".", "").length - 1;
        this.$fill = n('<div class="' + this.options.fillClass + '" />');
        this.$handle = n('<div class="' + this.options.handleClass + '" />');
        this.$range = n('<div class="' + this.options.rangeClass + " " + this.options[this.orientation + "Class"] + '" id="' + this.identifier + '" />').insertAfter(this.$element).prepend(this.$fill, this.$handle);
        this.$element.css({
            position: "absolute",
            width: "1px",
            height: "1px",
            overflow: "hidden",
            opacity: "0"
        });
        this.handleDown = n.proxy(this.handleDown, this);
        this.handleMove = n.proxy(this.handleMove, this);
        this.handleEnd = n.proxy(this.handleEnd, this);
        this.init();
        var f = this;
        this.$window.on("resize." + this.identifier, h(function() {
            s(function() {
                f.update(!1, !1)
            }, 300)
        }, 20));
        this.$document.on(this.startEvent, "#" + this.identifier + ":not(." + this.options.disabledClass + ")", this.handleDown);
        this.$element.on("change." + this.identifier, function(n, t) {
            if (!t || t.origin !== f.identifier) {
                var i = n.target.value,
                    r = f.getPositionFromValue(i);
                f.setPosition(r)
            }
        })
    }
    Number.isNaN = Number.isNaN || function(n) {
        return "number" == typeof n && n !== n
    };
    var i = "rangeslider",
        a = 0,
        v = o(),
        y = {
            polyfill: !0,
            orientation: "horizontal",
            rangeClass: "rangeslider",
            disabledClass: "rangeslider--disabled",
            activeClass: "rangeslider--active",
            horizontalClass: "rangeslider--horizontal",
            verticalClass: "rangeslider--vertical",
            fillClass: "rangeslider__fill",
            handleClass: "rangeslider__handle",
            startEvent: ["mousedown", "touchstart", "pointerdown"],
            moveEvent: ["mousemove", "touchmove", "pointermove"],
            endEvent: ["mouseup", "touchend", "pointerup"]
        },
        u = {
            orientation: {
                horizontal: {
                    dimension: "width",
                    direction: "left",
                    directionStyle: "left",
                    coordinate: "x"
                },
                vertical: {
                    dimension: "height",
                    direction: "top",
                    directionStyle: "bottom",
                    coordinate: "y"
                }
            }
        };
    return t.prototype.init = function() {
        this.update(!0, !1);
        this.onInit && "function" == typeof this.onInit && this.onInit()
    }, t.prototype.update = function(n, t) {
        n = n || !1;
        n && (this.min = r(this.$element[0].getAttribute("min"), 0), this.max = r(this.$element[0].getAttribute("max"), 100), this.value = r(this.$element[0].value, Math.round(this.min + (this.max - this.min) / 2)), this.step = r(this.$element[0].getAttribute("step"), 1));
        this.handleDimension = e(this.$handle[0], "offset" + f(this.DIMENSION));
        this.rangeDimension = e(this.$range[0], "offset" + f(this.DIMENSION));
        this.maxHandlePos = this.rangeDimension - this.handleDimension;
        this.grabPos = this.handleDimension / 2;
        this.position = this.getPositionFromValue(this.value);
        this.$element[0].disabled ? this.$range.addClass(this.options.disabledClass) : this.$range.removeClass(this.options.disabledClass);
        this.setPosition(this.position, t)
    }, t.prototype.handleDown = function(n) {
        if (n.preventDefault(), this.$document.on(this.moveEvent, this.handleMove), this.$document.on(this.endEvent, this.handleEnd), this.$range.addClass(this.options.activeClass), !((" " + n.target.className + " ").replace(/[\n\t]/g, " ").indexOf(this.options.handleClass) > -1)) {
            var t = this.getRelativePosition(n),
                r = this.$range[0].getBoundingClientRect()[this.DIRECTION],
                i = this.getPositionFromNode(this.$handle[0]) - r,
                u = "vertical" === this.orientation ? this.maxHandlePos - (t - this.grabPos) : t - this.grabPos;
            this.setPosition(u);
            t >= i && t < i + this.handleDimension && (this.grabPos = t - i)
        }
    }, t.prototype.handleMove = function(n) {
        n.preventDefault();
        var t = this.getRelativePosition(n),
            i = "vertical" === this.orientation ? this.maxHandlePos - (t - this.grabPos) : t - this.grabPos;
        this.setPosition(i)
    }, t.prototype.handleEnd = function(n) {
        n.preventDefault();
        this.$document.off(this.moveEvent, this.handleMove);
        this.$document.off(this.endEvent, this.handleEnd);
        this.$range.removeClass(this.options.activeClass);
        this.$element.trigger("change", {
            origin: this.identifier
        });
        this.onSlideEnd && "function" == typeof this.onSlideEnd && this.onSlideEnd(this.position, this.value)
    }, t.prototype.cap = function(n, t, i) {
        return n < t ? t : n > i ? i : n
    }, t.prototype.setPosition = function(n, t) {
        var i, r;
        void 0 === t && (t = !0);
        i = this.getValueFromPosition(this.cap(n, 0, this.maxHandlePos));
        r = this.getPositionFromValue(i);
        this.$fill[0].style[this.DIMENSION] = r + this.grabPos + "px";
        this.$handle[0].style[this.DIRECTION_STYLE] = r + "px";
        this.setValue(i);
        this.position = r;
        this.value = i;
        t && this.onSlide && "function" == typeof this.onSlide && this.onSlide(r, i)
    }, t.prototype.getPositionFromNode = function(n) {
        for (var t = 0; null !== n;) t += n.offsetLeft, n = n.offsetParent;
        return t
    }, t.prototype.getRelativePosition = function(n) {
        var t = f(this.COORDINATE),
            r = this.$range[0].getBoundingClientRect()[this.DIRECTION],
            i = 0;
        return "undefined" != typeof n.originalEvent["client" + t] ? i = n.originalEvent["client" + t] : n.originalEvent.touches && n.originalEvent.touches[0] && "undefined" != typeof n.originalEvent.touches[0]["client" + t] ? i = n.originalEvent.touches[0]["client" + t] : n.currentPoint && "undefined" != typeof n.currentPoint[this.COORDINATE] && (i = n.currentPoint[this.COORDINATE]), i - r
    }, t.prototype.getPositionFromValue = function(n) {
        var t, i;
        return t = (n - this.min) / (this.max - this.min), i = Number.isNaN(t) ? 0 : t * this.maxHandlePos
    }, t.prototype.getValueFromPosition = function(n) {
        var t, i;
        return t = n / (this.maxHandlePos || 1), i = this.step * Math.round(t * (this.max - this.min) / this.step) + this.min, Number(i.toFixed(this.toFixed))
    }, t.prototype.setValue = function(n) {
        n === this.value && "" !== this.$element[0].value || this.$element.val(n).trigger("input", {
            origin: this.identifier
        })
    }, t.prototype.destroy = function() {
        this.$document.off("." + this.identifier);
        this.$window.off("." + this.identifier);
        this.$element.off("." + this.identifier).removeAttr("style").removeData("plugin_" + i);
        this.$range && this.$range.length && this.$range[0].parentNode.removeChild(this.$range[0])
    }, n.fn[i] = function(r) {
        var u = Array.prototype.slice.call(arguments, 1);
        return this.each(function() {
            var e = n(this),
                f = e.data("plugin_" + i);
            f || e.data("plugin_" + i, f = new t(this, r));
            "string" == typeof r && f[r].apply(f, u)
        })
    }, "rangeslider.js is available in jQuery context e.g $(selector).rangeslider(options);"
});
! function(n) {
    var i = function() {
            var n, i = document.createElement("fakeelement"),
                t = {
                    transition: "transitionend",
                    OTransition: "oTransitionEnd",
                    MozTransition: "transitionend",
                    WebkitTransition: "webkitTransitionEnd"
                };
            for (n in t)
                if (void 0 !== i.style[n]) return t[n]
        },
        t = function(t, i, r) {
            this.setting = {
                axis: "y",
                reverse: !1,
                trigger: "click",
                speed: 500,
                forceHeight: !1,
                forceWidth: !1,
                autoSize: !0,
                front: ".front",
                back: ".back"
            };
            this.setting = n.extend(this.setting, i);
            "string" != typeof i.axis || "x" !== i.axis.toLowerCase() && "y" !== i.axis.toLowerCase() || (this.setting.axis = i.axis.toLowerCase());
            "boolean" == typeof i.reverse && (this.setting.reverse = i.reverse);
            "string" == typeof i.trigger && (this.setting.trigger = i.trigger.toLowerCase());
            var u = parseInt(i.speed);
            isNaN(u) || (this.setting.speed = u);
            "boolean" == typeof i.forceHeight && (this.setting.forceHeight = i.forceHeight);
            "boolean" == typeof i.forceWidth && (this.setting.forceWidth = i.forceWidth);
            "boolean" == typeof i.autoSize && (this.setting.autoSize = i.autoSize);
            ("string" == typeof i.front || i.front instanceof n) && (this.setting.front = i.front);
            ("string" == typeof i.back || i.back instanceof n) && (this.setting.back = i.back);
            this.element = t;
            this.frontElement = this.getFrontElement();
            this.backElement = this.getBackElement();
            this.isFlipped = !1;
            this.init(r)
        };
    n.extend(t.prototype, {
        flipDone: function(n) {
            var t = this;
            t.element.one(i(), function() {
                t.element.trigger("flip:done");
                "function" == typeof n && n.call(t.element)
            })
        },
        flip: function(n) {
            if (!this.isFlipped) {
                this.isFlipped = !0;
                var t = "rotate" + this.setting.axis;
                this.frontElement.css({
                    transform: t + (this.setting.reverse ? "(-180deg)" : "(180deg)"),
                    "z-index": "0"
                });
                this.backElement.css({
                    transform: t + "(0deg)",
                    "z-index": "1"
                });
                this.flipDone(n)
            }
        },
        unflip: function(n) {
            if (this.isFlipped) {
                this.isFlipped = !1;
                var t = "rotate" + this.setting.axis;
                this.frontElement.css({
                    transform: t + "(0deg)",
                    "z-index": "1"
                });
                this.backElement.css({
                    transform: t + (this.setting.reverse ? "(180deg)" : "(-180deg)"),
                    "z-index": "0"
                });
                this.flipDone(n)
            }
        },
        getFrontElement: function() {
            return this.setting.front instanceof n ? this.setting.front : this.element.find(this.setting.front)
        },
        getBackElement: function() {
            return this.setting.back instanceof n ? this.setting.back : this.element.find(this.setting.back)
        },
        init: function(n) {
            var t = this,
                i = t.frontElement.add(t.backElement),
                u = "rotate" + t.setting.axis,
                e = 2 * t.element["outer" + ("rotatex" === u ? "Height" : "Width")](),
                f = {
                    perspective: e,
                    position: "relative"
                },
                o = {
                    transform: u + "(" + (t.setting.reverse ? "180deg" : "-180deg") + ")",
                    "z-index": "0",
                    position: "relative"
                },
                r = {
                    "backface-visibility": "hidden",
                    "transform-style": "preserve-3d",
                    position: "absolute",
                    "z-index": "1"
                };
            t.setting.forceHeight ? i.outerHeight(t.element.height()) : t.setting.autoSize && (r.height = "100%");
            t.setting.forceWidth ? i.outerWidth(t.element.width()) : t.setting.autoSize && (r.width = "100%");
            (window.chrome || window.Intl && Intl.v8BreakIterator) && "CSS" in window && (f["-webkit-transform-style"] = "preserve-3d");
            i.css(r).find("*").css({
                "backface-visibility": "hidden"
            });
            t.element.css(f);
            t.backElement.css(o);
            setTimeout(function() {
                var r = t.setting.speed / 1e3 || .5;
                i.css({
                    transition: "all " + r + "s ease-out"
                });
                "function" == typeof n && n.call(t.element)
            }, 20);
            t.attachEvents()
        },
        clickHandler: function(t) {
            t || (t = window.event);
            this.element.find(n(t.target).closest('button, a, input[type="submit"]')).length || (this.isFlipped ? this.unflip() : this.flip())
        },
        hoverHandler: function() {
            var t = this;
            t.element.off("mouseleave.flip");
            t.flip();
            setTimeout(function() {
                t.element.on("mouseleave.flip", n.proxy(t.unflip, t));
                t.element.is(":hover") || t.unflip()
            }, t.setting.speed + 150)
        },
        attachEvents: function() {
            var t = this;
            "click" === t.setting.trigger ? t.element.on(n.fn.tap ? "tap.flip" : "click.flip", n.proxy(t.clickHandler, t)) : "hover" === t.setting.trigger && (t.element.on("mouseenter.flip", n.proxy(t.hoverHandler, t)), t.element.on("mouseleave.flip", n.proxy(t.unflip, t)))
        },
        flipChanged: function(n) {
            this.element.trigger("flip:change");
            "function" == typeof n && n.call(this.element)
        },
        changeSettings: function(n, t) {
            var i = this,
                u = !1,
                r, e, f;
            (void 0 !== n.axis && i.setting.axis !== n.axis.toLowerCase() && (i.setting.axis = n.axis.toLowerCase(), u = !0), void 0 !== n.reverse && i.setting.reverse !== n.reverse && (i.setting.reverse = n.reverse, u = !0), u) ? (r = i.frontElement.add(i.backElement), e = r.css(["transition-property", "transition-timing-function", "transition-duration", "transition-delay"]), r.css({
                transition: "none"
            }), f = "rotate" + i.setting.axis, i.isFlipped ? i.frontElement.css({
                transform: f + (i.setting.reverse ? "(-180deg)" : "(180deg)"),
                "z-index": "0"
            }) : i.backElement.css({
                transform: f + (i.setting.reverse ? "(180deg)" : "(-180deg)"),
                "z-index": "0"
            }), setTimeout(function() {
                r.css(e);
                i.flipChanged(t)
            }, 0)) : i.flipChanged(t)
        }
    });
    n.fn.flip = function(i, r) {
        return "function" == typeof i && (r = i), "string" == typeof i || "boolean" == typeof i ? this.each(function() {
            var t = n(this).data("flip-model");
            "toggle" === i && (i = !t.isFlipped);
            i ? t.flip(r) : t.unflip(r)
        }) : this.each(function() {
            if (n(this).data("flip-model")) {
                var u = n(this).data("flip-model");
                i && (void 0 !== i.axis || void 0 !== i.reverse) && u.changeSettings(i, r)
            } else n(this).data("flip-model", new t(n(this), i || {}, r))
        }), this
    }
}(jQuery);
! function(n, t) {
    "function" == typeof define && define.amd ? define("bloodhound", ["jquery"], function(i) {
        return n.Bloodhound = t(i)
    }) : "object" == typeof exports ? module.exports = t(require("jquery")) : n.Bloodhound = t(jQuery)
}(this, function(n) {
    var t = function() {
            "use strict";
            return {
                isMsie: function() {
                    return /(msie|trident)/i.test(navigator.userAgent) ? navigator.userAgent.match(/(msie |rv:)(\d+(.\d+)?)/i)[2] : !1
                },
                isBlankString: function(n) {
                    return !n || /^\s*$/.test(n)
                },
                escapeRegExChars: function(n) {
                    return n.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&")
                },
                isString: function(n) {
                    return "string" == typeof n
                },
                isNumber: function(n) {
                    return "number" == typeof n
                },
                isArray: n.isArray,
                isFunction: n.isFunction,
                isObject: n.isPlainObject,
                isUndefined: function(n) {
                    return "undefined" == typeof n
                },
                isElement: function(n) {
                    return !(!n || 1 !== n.nodeType)
                },
                isJQuery: function(t) {
                    return t instanceof n
                },
                toStr: function(n) {
                    return t.isUndefined(n) || null === n ? "" : n + ""
                },
                bind: n.proxy,
                each: function(t, i) {
                    function r(n, t) {
                        return i(t, n)
                    }
                    n.each(t, r)
                },
                map: n.map,
                filter: n.grep,
                every: function(t, i) {
                    var r = !0;
                    return t ? (n.each(t, function(n, u) {
                        if (!(r = i.call(null, u, n, t))) return !1
                    }), !!r) : r
                },
                some: function(t, i) {
                    var r = !1;
                    return t ? (n.each(t, function(n, u) {
                        if ((r = i.call(null, u, n, t))) return !1
                    }), !!r) : r
                },
                mixin: n.extend,
                identity: function(n) {
                    return n
                },
                clone: function(t) {
                    return n.extend(!0, {}, t)
                },
                getIdGenerator: function() {
                    var n = 0;
                    return function() {
                        return n++
                    }
                },
                templatify: function(t) {
                    function i() {
                        return String(t)
                    }
                    return n.isFunction(t) ? t : i
                },
                defer: function(n) {
                    setTimeout(n, 0)
                },
                debounce: function(n, t, i) {
                    var r, u;
                    return function() {
                        var f, e, o = this,
                            s = arguments;
                        return f = function() {
                            r = null;
                            i || (u = n.apply(o, s))
                        }, e = i && !r, clearTimeout(r), r = setTimeout(f, t), e && (u = n.apply(o, s)), u
                    }
                },
                throttle: function(n, t) {
                    var u, f, i, e, r, o;
                    return r = 0, o = function() {
                            r = new Date;
                            i = null;
                            e = n.apply(u, f)
                        },
                        function() {
                            var s = new Date,
                                h = t - (s - r);
                            return u = this, f = arguments, 0 >= h ? (clearTimeout(i), i = null, r = s, e = n.apply(u, f)) : i || (i = setTimeout(o, h)), e
                        }
                },
                stringify: function(n) {
                    return t.isString(n) ? n : JSON.stringify(n)
                },
                noop: function() {}
            }
        }(),
        u = "0.11.1",
        f = function() {
            "use strict";

            function n(n) {
                return n = t.toStr(n), n ? n.split(/\s+/) : []
            }

            function i(n) {
                return n = t.toStr(n), n ? n.split(/\W+/) : []
            }

            function r(n) {
                return function(i) {
                    return i = t.isArray(i) ? i : [].slice.call(arguments, 0),
                        function(r) {
                            var u = [];
                            return t.each(i, function(i) {
                                u = u.concat(n(t.toStr(r[i])))
                            }), u
                        }
                }
            }
            return {
                nonword: i,
                whitespace: n,
                obj: {
                    nonword: r(i),
                    whitespace: r(n)
                }
            }
        }(),
        i = function() {
            "use strict";

            function i(i) {
                this.maxSize = t.isNumber(i) ? i : 100;
                this.reset();
                this.maxSize <= 0 && (this.set = this.get = n.noop)
            }

            function r() {
                this.head = this.tail = null
            }

            function u(n, t) {
                this.key = n;
                this.val = t;
                this.prev = this.next = null
            }
            return t.mixin(i.prototype, {
                set: function(n, t) {
                    var i, r = this.list.tail;
                    this.size >= this.maxSize && (this.list.remove(r), delete this.hash[r.key], this.size--);
                    (i = this.hash[n]) ? (i.val = t, this.list.moveToFront(i)) : (i = new u(n, t), this.list.add(i), this.hash[n] = i, this.size++)
                },
                get: function(n) {
                    var t = this.hash[n];
                    if (t) return (this.list.moveToFront(t), t.val)
                },
                reset: function() {
                    this.size = 0;
                    this.hash = {};
                    this.list = new r
                }
            }), t.mixin(r.prototype, {
                add: function(n) {
                    this.head && (n.next = this.head, this.head.prev = n);
                    this.head = n;
                    this.tail = this.tail || n
                },
                remove: function(n) {
                    n.prev ? n.prev.next = n.next : this.head = n.next;
                    n.next ? n.next.prev = n.prev : this.tail = n.prev
                },
                moveToFront: function(n) {
                    this.remove(n);
                    this.add(n)
                }
            }), i
        }(),
        e = function() {
            "use strict";

            function r(n, r) {
                this.prefix = ["__", n, "__"].join("");
                this.ttlKey = "__ttl__";
                this.keyMatcher = new RegExp("^" + t.escapeRegExChars(this.prefix));
                this.ls = r || i;
                !this.ls && this._noop()
            }

            function u() {
                return (new Date).getTime()
            }

            function f(n) {
                return JSON.stringify(t.isUndefined(n) ? null : n)
            }

            function e(t) {
                return n.parseJSON(t)
            }

            function o(n) {
                for (var r, u = [], f = i.length, t = 0; f > t; t++)(r = i.key(t)).match(n) && u.push(r.replace(n, ""));
                return u
            }
            var i;
            try {
                i = window.localStorage;
                i.setItem("~~~", "!");
                i.removeItem("~~~")
            } catch (s) {
                i = null
            }
            return t.mixin(r.prototype, {
                _prefix: function(n) {
                    return this.prefix + n
                },
                _ttlKey: function(n) {
                    return this._prefix(n) + this.ttlKey
                },
                _noop: function() {
                    this.get = this.set = this.remove = this.clear = this.isExpired = t.noop
                },
                _safeSet: function(n, t) {
                    try {
                        this.ls.setItem(n, t)
                    } catch (i) {
                        "QuotaExceededError" === i.name && (this.clear(), this._noop())
                    }
                },
                get: function(n) {
                    return this.isExpired(n) && this.remove(n), e(this.ls.getItem(this._prefix(n)))
                },
                set: function(n, i, r) {
                    return t.isNumber(r) ? this._safeSet(this._ttlKey(n), f(u() + r)) : this.ls.removeItem(this._ttlKey(n)), this._safeSet(this._prefix(n), f(i))
                },
                remove: function(n) {
                    return this.ls.removeItem(this._ttlKey(n)), this.ls.removeItem(this._prefix(n)), this
                },
                clear: function() {
                    for (var t = o(this.keyMatcher), n = t.length; n--;) this.remove(t[n]);
                    return this
                },
                isExpired: function(n) {
                    var i = e(this.ls.getItem(this._ttlKey(n)));
                    return t.isNumber(i) && u() > i ? !0 : !1
                }
            }), r
        }(),
        r = function() {
            "use strict";

            function r(n) {
                n = n || {};
                this.cancelled = !1;
                this.lastReq = null;
                this._send = n.transport;
                this._get = n.limiter ? n.limiter(this._get) : this._get;
                this._cache = n.cache === !1 ? new i(0) : o
            }
            var u = 0,
                f = {},
                e = 6,
                o = new i(10);
            return r.setMaxPendingRequests = function(n) {
                e = n
            }, r.resetCache = function() {
                o.reset()
            }, t.mixin(r.prototype, {
                _fingerprint: function(t) {
                    return t = t || {}, t.url + t.type + n.param(t.data || {})
                },
                _get: function(n, t) {
                    function o(n) {
                        t(null, n);
                        r._cache.set(i, n)
                    }

                    function s() {
                        t(!0)
                    }

                    function c() {
                        u--;
                        delete f[i];
                        r.onDeckRequestArgs && (r._get.apply(r, r.onDeckRequestArgs), r.onDeckRequestArgs = null)
                    }
                    var i, h, r = this;
                    i = this._fingerprint(n);
                    this.cancelled || i !== this.lastReq || ((h = f[i]) ? h.done(o).fail(s) : e > u ? (u++, f[i] = this._send(n).done(o).fail(s).always(c)) : this.onDeckRequestArgs = [].slice.call(arguments, 0))
                },
                get: function(i, r) {
                    var f, u;
                    r = r || n.noop;
                    i = t.isString(i) ? {
                        url: i
                    } : i || {};
                    u = this._fingerprint(i);
                    this.cancelled = !1;
                    this.lastReq = u;
                    (f = this._cache.get(u)) ? r(null, f): this._get(i, r)
                },
                cancel: function() {
                    this.cancelled = !0
                }
            }), r
        }(),
        o = window.SearchIndex = function() {
            "use strict";

            function u(i) {
                i = i || {};
                i.datumTokenizer && i.queryTokenizer || n.error("datumTokenizer and queryTokenizer are both required");
                this.identify = i.identify || t.stringify;
                this.datumTokenizer = i.datumTokenizer;
                this.queryTokenizer = i.queryTokenizer;
                this.reset()
            }

            function f(n) {
                return n = t.filter(n, function(n) {
                    return !!n
                }), n = t.map(n, function(n) {
                    return n.toLowerCase()
                })
            }

            function e() {
                var n = {};
                return n[r] = [], n[i] = {}, n
            }

            function o(n) {
                for (var i = {}, r = [], t = 0, u = n.length; u > t; t++) i[n[t]] || (i[n[t]] = !0, r.push(n[t]));
                return r
            }

            function s(n, t) {
                var i = 0,
                    r = 0,
                    u = [],
                    f, e;
                for (n = n.sort(), t = t.sort(), f = n.length, e = t.length; f > i && e > r;) n[i] < t[r] ? i++ : n[i] > t[r] ? r++ : (u.push(n[i]), i++, r++);
                return u
            }
            var i = "c",
                r = "i";
            return t.mixin(u.prototype, {
                bootstrap: function(n) {
                    this.datums = n.datums;
                    this.trie = n.trie
                },
                add: function(n) {
                    var u = this;
                    n = t.isArray(n) ? n : [n];
                    t.each(n, function(n) {
                        var o, s;
                        u.datums[o = u.identify(n)] = n;
                        s = f(u.datumTokenizer(n));
                        t.each(s, function(n) {
                            for (var f, t = u.trie, s = n.split(""); f = s.shift();) t = t[i][f] || (t[i][f] = e()), t[r].push(o)
                        })
                    })
                },
                get: function(n) {
                    var i = this;
                    return t.map(n, function(n) {
                        return i.datums[n]
                    })
                },
                search: function(n) {
                    var e, u, h = this;
                    return e = f(this.queryTokenizer(n)), t.each(e, function(n) {
                        var t, f, o, e;
                        if (u && 0 === u.length) return !1;
                        for (t = h.trie, f = n.split(""); t && (o = f.shift());) t = t[i][o];
                        return t && 0 === f.length ? (e = t[r].slice(0), void(u = u ? s(u, e) : e)) : (u = [], !1)
                    }), u ? t.map(o(u), function(n) {
                        return h.datums[n]
                    }) : []
                },
                all: function() {
                    var n = [];
                    for (var t in this.datums) n.push(this.datums[t]);
                    return n
                },
                reset: function() {
                    this.datums = {};
                    this.trie = e()
                },
                serialize: function() {
                    return {
                        datums: this.datums,
                        trie: this.trie
                    }
                }
            }), u
        }(),
        s = function() {
            "use strict";

            function i(n) {
                this.url = n.url;
                this.ttl = n.ttl;
                this.cache = n.cache;
                this.prepare = n.prepare;
                this.transform = n.transform;
                this.transport = n.transport;
                this.thumbprint = n.thumbprint;
                this.storage = new e(n.cacheKey)
            }
            var n;
            return n = {
                data: "data",
                protocol: "protocol",
                thumbprint: "thumbprint"
            }, t.mixin(i.prototype, {
                _settings: function() {
                    return {
                        url: this.url,
                        type: "GET",
                        dataType: "json"
                    }
                },
                store: function(t) {
                    this.cache && (this.storage.set(n.data, t, this.ttl), this.storage.set(n.protocol, location.protocol, this.ttl), this.storage.set(n.thumbprint, this.thumbprint, this.ttl))
                },
                fromCache: function() {
                    var i, t = {};
                    return this.cache ? (t.data = this.storage.get(n.data), t.protocol = this.storage.get(n.protocol), t.thumbprint = this.storage.get(n.thumbprint), i = t.thumbprint !== this.thumbprint || t.protocol !== location.protocol, t.data && !i ? t.data : null) : null
                },
                fromNetwork: function(n) {
                    function i() {
                        n(!0)
                    }

                    function r(t) {
                        n(null, u.transform(t))
                    }
                    var t, u = this;
                    n && (t = this.prepare(this._settings()), this.transport(t).fail(i).done(r))
                },
                clear: function() {
                    return this.storage.clear(), this
                }
            }), i
        }(),
        h = function() {
            "use strict";

            function n(n) {
                this.url = n.url;
                this.prepare = n.prepare;
                this.transform = n.transform;
                this.transport = new r({
                    cache: n.cache,
                    limiter: n.limiter,
                    transport: n.transport
                })
            }
            return t.mixin(n.prototype, {
                _settings: function() {
                    return {
                        url: this.url,
                        type: "GET",
                        dataType: "json"
                    }
                },
                get: function(n, t) {
                    function r(n, i) {
                        t(n ? [] : u.transform(i))
                    }
                    var i, u = this;
                    if (t) return n = n || "", i = this.prepare(n, this._settings()), this.transport.get(i, r)
                },
                cancelLastRequest: function() {
                    this.transport.cancel()
                }
            }), n
        }(),
        c = function() {
            "use strict";

            function r(r) {
                var f;
                return r ? (f = {
                    url: null,
                    ttl: 864e5,
                    cache: !0,
                    cacheKey: null,
                    thumbprint: "",
                    prepare: t.identity,
                    transform: t.identity,
                    transport: null
                }, r = t.isString(r) ? {
                    url: r
                } : r, r = t.mixin(f, r), !r.url && n.error("prefetch requires url to be set"), r.transform = r.filter || r.transform, r.cacheKey = r.cacheKey || r.url, r.thumbprint = u + r.thumbprint, r.transport = r.transport ? i(r.transport) : n.ajax, r) : null
            }

            function f(r) {
                var u;
                if (r) return u = {
                    url: null,
                    cache: !0,
                    prepare: null,
                    replace: null,
                    wildcard: null,
                    limiter: null,
                    rateLimitBy: "debounce",
                    rateLimitWait: 300,
                    transform: t.identity,
                    transport: null
                }, r = t.isString(r) ? {
                    url: r
                } : r, r = t.mixin(u, r), !r.url && n.error("remote requires url to be set"), r.transform = r.filter || r.transform, r.prepare = e(r), r.limiter = o(r), r.transport = r.transport ? i(r.transport) : n.ajax, delete r.replace, delete r.wildcard, delete r.rateLimitBy, delete r.rateLimitWait, r
            }

            function e(n) {
                function u(n, t) {
                    return t.url = i(t.url, n), t
                }

                function f(n, t) {
                    return t.url = t.url.replace(r, encodeURIComponent(n)), t
                }

                function e(n, t) {
                    return t
                }
                var t, i, r;
                return t = n.prepare, i = n.replace, r = n.wildcard, t ? t : t = i ? u : n.wildcard ? f : e
            }

            function o(n) {
                function f(n) {
                    return function(i) {
                        return t.debounce(i, n)
                    }
                }

                function e(n) {
                    return function(i) {
                        return t.throttle(i, n)
                    }
                }
                var i, u, r;
                return i = n.limiter, u = n.rateLimitBy, r = n.rateLimitWait, i || (i = /^throttle$/i.test(u) ? e(r) : f(r)), i
            }

            function i(i) {
                return function(r) {
                    function f(n) {
                        t.defer(function() {
                            u.resolve(n)
                        })
                    }

                    function e(n) {
                        t.defer(function() {
                            u.reject(n)
                        })
                    }
                    var u = n.Deferred();
                    return i(r, f, e), u
                }
            }
            return function(i) {
                var e, u;
                return e = {
                    initialize: !0,
                    identify: t.stringify,
                    datumTokenizer: null,
                    queryTokenizer: null,
                    sufficient: 5,
                    sorter: null,
                    local: [],
                    prefetch: null,
                    remote: null
                }, i = t.mixin(e, i || {}), !i.datumTokenizer && n.error("datumTokenizer is required"), !i.queryTokenizer && n.error("queryTokenizer is required"), u = i.sorter, i.sorter = u ? function(n) {
                    return n.sort(u)
                } : t.identity, i.local = t.isFunction(i.local) ? i.local() : i.local, i.prefetch = r(i.prefetch), i.remote = f(i.remote), i
            }
        }();
    return function() {
        "use strict";

        function i(n) {
            n = c(n);
            this.sorter = n.sorter;
            this.identify = n.identify;
            this.sufficient = n.sufficient;
            this.local = n.local;
            this.remote = n.remote ? new h(n.remote) : null;
            this.prefetch = n.prefetch ? new s(n.prefetch) : null;
            this.index = new o({
                identify: this.identify,
                datumTokenizer: n.datumTokenizer,
                queryTokenizer: n.queryTokenizer
            });
            n.initialize !== !1 && this.initialize()
        }
        var u;
        return u = window && window.Bloodhound, i.noConflict = function() {
            return window && (window.Bloodhound = u), i
        }, i.tokenizers = f, t.mixin(i.prototype, {
            __ttAdapter: function() {
                function t(t, i, r) {
                    return n.search(t, i, r)
                }

                function i(t, i) {
                    return n.search(t, i)
                }
                var n = this;
                return this.remote ? t : i
            },
            _loadPrefetch: function() {
                function u(n, r) {
                    return n ? t.reject() : (i.add(r), i.prefetch.store(i.index.serialize()), void t.resolve())
                }
                var t, r, i = this;
                return t = n.Deferred(), this.prefetch ? (r = this.prefetch.fromCache()) ? (this.index.bootstrap(r), t.resolve()) : this.prefetch.fromNetwork(u) : t.resolve(), t.promise()
            },
            _initialize: function() {
                function t() {
                    n.add(n.local)
                }
                var n = this;
                return this.clear(), (this.initPromise = this._loadPrefetch()).done(t), this.initPromise
            },
            initialize: function(n) {
                return !this.initPromise || n ? this._initialize() : this.initPromise
            },
            add: function(n) {
                return this.index.add(n), this
            },
            get: function(n) {
                return n = t.isArray(n) ? n : [].slice.call(arguments), this.index.get(n)
            },
            search: function(n, i, r) {
                function e(n) {
                    var i = [];
                    t.each(n, function(n) {
                        t.some(u, function(t) {
                            return f.identify(n) === f.identify(t)
                        }) || i.push(n)
                    });
                    r && r(i)
                }
                var u, f = this;
                return u = this.sorter(this.index.search(n)), i(this.remote ? u.slice() : u), this.remote && u.length < this.sufficient ? this.remote.get(n, e) : this.remote && this.remote.cancelLastRequest(), this
            },
            all: function() {
                return this.index.all()
            },
            clear: function() {
                return this.index.reset(), this
            },
            clearPrefetchCache: function() {
                return this.prefetch && this.prefetch.clear(), this
            },
            clearRemoteCache: function() {
                return r.resetCache(), this
            },
            ttAdapter: function() {
                return this.__ttAdapter()
            }
        }), i
    }()
}),
function(n, t) {
    "function" == typeof define && define.amd ? define("typeahead.js", ["jquery"], function(n) {
        return t(n)
    }) : "object" == typeof exports ? module.exports = t(require("jquery")) : t(jQuery)
}(this, function(n) {
    var t = function() {
            "use strict";
            return {
                isMsie: function() {
                    return /(msie|trident)/i.test(navigator.userAgent) ? navigator.userAgent.match(/(msie |rv:)(\d+(.\d+)?)/i)[2] : !1
                },
                isBlankString: function(n) {
                    return !n || /^\s*$/.test(n)
                },
                escapeRegExChars: function(n) {
                    return n.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&")
                },
                isString: function(n) {
                    return "string" == typeof n
                },
                isNumber: function(n) {
                    return "number" == typeof n
                },
                isArray: n.isArray,
                isFunction: n.isFunction,
                isObject: n.isPlainObject,
                isUndefined: function(n) {
                    return "undefined" == typeof n
                },
                isElement: function(n) {
                    return !(!n || 1 !== n.nodeType)
                },
                isJQuery: function(t) {
                    return t instanceof n
                },
                toStr: function(n) {
                    return t.isUndefined(n) || null === n ? "" : n + ""
                },
                bind: n.proxy,
                each: function(t, i) {
                    function r(n, t) {
                        return i(t, n)
                    }
                    n.each(t, r)
                },
                map: n.map,
                filter: n.grep,
                every: function(t, i) {
                    var r = !0;
                    return t ? (n.each(t, function(n, u) {
                        if (!(r = i.call(null, u, n, t))) return !1
                    }), !!r) : r
                },
                some: function(t, i) {
                    var r = !1;
                    return t ? (n.each(t, function(n, u) {
                        if ((r = i.call(null, u, n, t))) return !1
                    }), !!r) : r
                },
                mixin: n.extend,
                identity: function(n) {
                    return n
                },
                clone: function(t) {
                    return n.extend(!0, {}, t)
                },
                getIdGenerator: function() {
                    var n = 0;
                    return function() {
                        return n++
                    }
                },
                templatify: function(t) {
                    function i() {
                        return String(t)
                    }
                    return n.isFunction(t) ? t : i
                },
                defer: function(n) {
                    setTimeout(n, 0)
                },
                debounce: function(n, t, i) {
                    var r, u;
                    return function() {
                        var f, e, o = this,
                            s = arguments;
                        return f = function() {
                            r = null;
                            i || (u = n.apply(o, s))
                        }, e = i && !r, clearTimeout(r), r = setTimeout(f, t), e && (u = n.apply(o, s)), u
                    }
                },
                throttle: function(n, t) {
                    var u, f, i, e, r, o;
                    return r = 0, o = function() {
                            r = new Date;
                            i = null;
                            e = n.apply(u, f)
                        },
                        function() {
                            var s = new Date,
                                h = t - (s - r);
                            return u = this, f = arguments, 0 >= h ? (clearTimeout(i), i = null, r = s, e = n.apply(u, f)) : i || (i = setTimeout(o, h)), e
                        }
                },
                stringify: function(n) {
                    return t.isString(n) ? n : JSON.stringify(n)
                },
                noop: function() {}
            }
        }(),
        e = function() {
            "use strict";

            function n(n) {
                var e, o;
                return o = t.mixin({}, f, n), e = {
                    css: u(),
                    classes: o,
                    html: i(o),
                    selectors: r(o)
                }, {
                    css: e.css,
                    html: e.html,
                    classes: e.classes,
                    selectors: e.selectors,
                    mixin: function(n) {
                        t.mixin(n, e)
                    }
                }
            }

            function i(n) {
                return {
                    wrapper: '<span class="' + n.wrapper + '"><\/span>',
                    menu: '<div class="' + n.menu + '"><\/div>'
                }
            }

            function r(n) {
                var i = {};
                return t.each(n, function(n, t) {
                    i[t] = "." + n
                }), i
            }

            function u() {
                var n = {
                    wrapper: {
                        position: "relative",
                        display: "inline-block"
                    },
                    hint: {
                        position: "absolute",
                        top: "0",
                        left: "0",
                        borderColor: "transparent",
                        boxShadow: "none",
                        opacity: "1"
                    },
                    input: {
                        position: "relative",
                        verticalAlign: "top",
                        backgroundColor: "transparent"
                    },
                    inputWithNoHint: {
                        position: "relative",
                        verticalAlign: "top"
                    },
                    menu: {
                        position: "absolute",
                        top: "100%",
                        left: "0",
                        zIndex: "100",
                        display: "none"
                    },
                    ltr: {
                        left: "0",
                        right: "auto"
                    },
                    rtl: {
                        left: "auto",
                        right: " 0"
                    }
                };
                return t.isMsie() && t.mixin(n.input, {
                    backgroundImage: "url(data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7)"
                }), n
            }
            var f = {
                wrapper: "twitter-typeahead",
                input: "tt-input",
                hint: "tt-hint",
                menu: "tt-menu",
                dataset: "tt-dataset",
                suggestion: "tt-suggestion",
                selectable: "tt-selectable",
                empty: "tt-empty",
                open: "tt-open",
                cursor: "tt-cursor",
                highlight: "tt-highlight"
            };
            return n
        }(),
        o = function() {
            "use strict";

            function i(t) {
                t && t.el || n.error("EventBus initialized without el");
                this.$el = n(t.el)
            }
            var r, u;
            return r = "typeahead:", u = {
                render: "rendered",
                cursorchange: "cursorchanged",
                select: "selected",
                autocomplete: "autocompleted"
            }, t.mixin(i.prototype, {
                _trigger: function(t, i) {
                    var u;
                    return u = n.Event(r + t), (i = i || []).unshift(u), this.$el.trigger.apply(this.$el, i), u
                },
                before: function(n) {
                    var t, i;
                    return t = [].slice.call(arguments, 1), i = this._trigger("before" + n, t), i.isDefaultPrevented()
                },
                trigger: function(n) {
                    var t;
                    this._trigger(n, [].slice.call(arguments, 1));
                    (t = u[n]) && this._trigger(t, [].slice.call(arguments, 1))
                }
            }), i
        }(),
        r = function() {
            "use strict";

            function t(t, i, r, u) {
                var f;
                if (!r) return this;
                for (i = i.split(n), r = u ? s(r, u) : r, this._callbacks = this._callbacks || {}; f = i.shift();) this._callbacks[f] = this._callbacks[f] || {
                    sync: [],
                    async: []
                }, this._callbacks[f][t].push(r);
                return this
            }

            function r(n, i, r) {
                return t.call(this, "async", n, i, r)
            }

            function u(n, i, r) {
                return t.call(this, "sync", n, i, r)
            }

            function f(t) {
                var i;
                if (!this._callbacks) return this;
                for (t = t.split(n); i = t.shift();) delete this._callbacks[i];
                return this
            }

            function e(t) {
                var r, u, f, e, o;
                if (!this._callbacks) return this;
                for (t = t.split(n), f = [].slice.call(arguments, 1);
                    (r = t.shift()) && (u = this._callbacks[r]);) e = i(u.sync, this, [r].concat(f)), o = i(u.async, this, [r].concat(f)), e() && h(o);
                return this
            }

            function i(n, t, i) {
                function r() {
                    for (var r, u = 0, f = n.length; !r && f > u; u += 1) r = n[u].apply(t, i) === !1;
                    return !r
                }
                return r
            }

            function o() {
                return window.setImmediate ? function(n) {
                    setImmediate(function() {
                        n()
                    })
                } : function(n) {
                    setTimeout(function() {
                        n()
                    }, 0)
                }
            }

            function s(n, t) {
                return n.bind ? n.bind(t) : function() {
                    n.apply(t, [].slice.call(arguments, 0))
                }
            }
            var n = /\s+/,
                h = o();
            return {
                onSync: u,
                onAsync: r,
                off: f,
                trigger: e
            }
        }(),
        s = function(n) {
            "use strict";

            function i(n, i, r) {
                for (var u, f = [], e = 0, o = n.length; o > e; e++) f.push(t.escapeRegExChars(n[e]));
                return u = r ? "\\b(" + f.join("|") + ")\\b" : "(" + f.join("|") + ")", i ? new RegExp(u) : new RegExp(u, "i")
            }
            var r = {
                node: null,
                pattern: null,
                tagName: "strong",
                className: null,
                wordsOnly: !1,
                caseSensitive: !1
            };
            return function(u) {
                function o(t) {
                    var i, r, f;
                    return (i = e.exec(t.data)) && (f = n.createElement(u.tagName), u.className && (f.className = u.className), r = t.splitText(i.index), r.splitText(i[0].length), f.appendChild(r.cloneNode(!0)), t.parentNode.replaceChild(f, r)), !!i
                }

                function f(n, t) {
                    for (var i, r = 0; r < n.childNodes.length; r++) i = n.childNodes[r], i.nodeType === 3 ? r += t(i) ? 1 : 0 : f(i, t)
                }
                var e;
                u = t.mixin({}, r, u);
                u.node && u.pattern && (u.pattern = t.isArray(u.pattern) ? u.pattern : [u.pattern], e = i(u.pattern, u.caseSensitive, u.wordsOnly), f(u.node, o))
            }
        }(window.document),
        u = function() {
            "use strict";

            function i(i, r) {
                i = i || {};
                i.input || n.error("input is missing");
                r.mixin(this);
                this.$hint = n(i.hint);
                this.$input = n(i.input);
                this.query = this.$input.val();
                this.queryWhenFocused = this.hasFocus() ? this.query : null;
                this.$overflowHelper = e(this.$input);
                this._checkLanguageDirection();
                0 === this.$hint.length && (this.setHint = this.getHint = this.clearHint = this.clearHintIfInvalid = t.noop)
            }

            function e(t) {
                return n('<pre aria-hidden="true"><\/pre>').css({
                    position: "absolute",
                    visibility: "hidden",
                    whiteSpace: "pre",
                    fontFamily: t.css("font-family"),
                    fontSize: t.css("font-size"),
                    fontStyle: t.css("font-style"),
                    fontVariant: t.css("font-variant"),
                    fontWeight: t.css("font-weight"),
                    wordSpacing: t.css("word-spacing"),
                    letterSpacing: t.css("letter-spacing"),
                    textIndent: t.css("text-indent"),
                    textRendering: t.css("text-rendering"),
                    textTransform: t.css("text-transform")
                }).insertAfter(t)
            }

            function o(n, t) {
                return i.normalizeQuery(n) === i.normalizeQuery(t)
            }

            function f(n) {
                return n.altKey || n.ctrlKey || n.metaKey || n.shiftKey
            }
            var u;
            return u = {
                9: "tab",
                27: "esc",
                37: "left",
                39: "right",
                13: "enter",
                38: "up",
                40: "down"
            }, i.normalizeQuery = function(n) {
                return t.toStr(n).replace(/^\s*/g, "").replace(/\s{2,}/g, " ")
            }, t.mixin(i.prototype, r, {
                _onBlur: function() {
                    this.resetInputValue();
                    this.trigger("blurred")
                },
                _onFocus: function() {
                    this.queryWhenFocused = this.query;
                    this.trigger("focused")
                },
                _onKeydown: function(n) {
                    var t = u[n.which || n.keyCode];
                    this._managePreventDefault(t, n);
                    t && this._shouldTrigger(t, n) && this.trigger(t + "Keyed", n)
                },
                _onInput: function() {
                    this._setQuery(this.getInputValue());
                    this.clearHintIfInvalid();
                    this._checkLanguageDirection()
                },
                _managePreventDefault: function(n, t) {
                    var i;
                    switch (n) {
                        case "up":
                        case "down":
                            i = !f(t);
                            break;
                        default:
                            i = !1
                    }
                    i && t.preventDefault()
                },
                _shouldTrigger: function(n, t) {
                    var i;
                    switch (n) {
                        case "tab":
                            i = !f(t);
                            break;
                        default:
                            i = !0
                    }
                    return i
                },
                _checkLanguageDirection: function() {
                    var n = (this.$input.css("direction") || "ltr").toLowerCase();
                    this.dir !== n && (this.dir = n, this.$hint.attr("dir", n), this.trigger("langDirChanged", n))
                },
                _setQuery: function(n, t) {
                    var i, r;
                    i = o(n, this.query);
                    r = i ? this.query.length !== n.length : !1;
                    this.query = n;
                    t || i ? !t && r && this.trigger("whitespaceChanged", this.query) : this.trigger("queryChanged", this.query)
                },
                bind: function() {
                    var n, i, r, f, e = this;
                    return n = t.bind(this._onBlur, this), i = t.bind(this._onFocus, this), r = t.bind(this._onKeydown, this), f = t.bind(this._onInput, this), this.$input.on("blur.tt", n).on("focus.tt", i).on("keydown.tt", r), !t.isMsie() || t.isMsie() > 9 ? this.$input.on("input.tt", f) : this.$input.on("keydown.tt keypress.tt cut.tt paste.tt", function(n) {
                        u[n.which || n.keyCode] || t.defer(t.bind(e._onInput, e, n))
                    }), this
                },
                focus: function() {
                    this.$input.focus()
                },
                blur: function() {
                    this.$input.blur()
                },
                getLangDir: function() {
                    return this.dir
                },
                getQuery: function() {
                    return this.query || ""
                },
                setQuery: function(n, t) {
                    this.setInputValue(n);
                    this._setQuery(n, t)
                },
                hasQueryChangedSinceLastFocus: function() {
                    return this.query !== this.queryWhenFocused
                },
                getInputValue: function() {
                    return this.$input.val()
                },
                setInputValue: function(n) {
                    this.$input.val(n);
                    this.clearHintIfInvalid();
                    this._checkLanguageDirection()
                },
                resetInputValue: function() {
                    this.setInputValue(this.query)
                },
                getHint: function() {
                    return this.$hint.val()
                },
                setHint: function(n) {
                    this.$hint.val(n)
                },
                clearHint: function() {
                    this.setHint("")
                },
                clearHintIfInvalid: function() {
                    var n, t, i, r;
                    n = this.getInputValue();
                    t = this.getHint();
                    i = n !== t && 0 === t.indexOf(n);
                    r = "" !== n && i && !this.hasOverflow();
                    !r && this.clearHint()
                },
                hasFocus: function() {
                    return this.$input.is(":focus")
                },
                hasOverflow: function() {
                    var n = this.$input.width() - 2;
                    return this.$overflowHelper.text(this.getInputValue()), this.$overflowHelper.width() >= n
                },
                isCursorAtEnd: function() {
                    var n, i, r;
                    return n = this.$input.val().length, i = this.$input[0].selectionStart, t.isNumber(i) ? i === n : document.selection ? (r = document.selection.createRange(), r.moveStart("character", -n), n === r.text.length) : !0
                },
                destroy: function() {
                    this.$hint.off(".tt");
                    this.$input.off(".tt");
                    this.$overflowHelper.remove();
                    this.$hint = this.$input = this.$overflowHelper = n("<div>")
                }
            }), i
        }(),
        f = function() {
            "use strict";

            function u(i, r) {
                i = i || {};
                i.templates = i.templates || {};
                i.templates.notFound = i.templates.notFound || i.templates.empty;
                i.source || n.error("missing source");
                i.node || n.error("missing node");
                i.name && !h(i.name) && n.error("invalid dataset name: " + i.name);
                r.mixin(this);
                this.highlight = !!i.highlight;
                this.name = i.name || f();
                this.limit = i.limit || 5;
                this.displayFn = e(i.display || i.displayKey);
                this.templates = o(i.templates, this.displayFn);
                this.source = i.source.__ttAdapter ? i.source.__ttAdapter() : i.source;
                this.async = t.isUndefined(i.async) ? this.source.length > 2 : !!i.async;
                this._resetLastSuggestion();
                this.$el = n(i.node).addClass(this.classes.dataset).addClass(this.classes.dataset + "-" + this.name)
            }

            function e(n) {
                function i(t) {
                    return t[n]
                }
                return n = n || t.stringify, t.isFunction(n) ? n : i
            }

            function o(i, r) {
                function u(t) {
                    return n("<div>").text(r(t))
                }
                return {
                    notFound: i.notFound && t.templatify(i.notFound),
                    pending: i.pending && t.templatify(i.pending),
                    header: i.header && t.templatify(i.header),
                    footer: i.footer && t.templatify(i.footer),
                    suggestion: i.suggestion || u
                }
            }

            function h(n) {
                return /^[_a-zA-Z0-9-]+$/.test(n)
            }
            var i, f;
            return i = {
                val: "tt-selectable-display",
                obj: "tt-selectable-object"
            }, f = t.getIdGenerator(), u.extractData = function(t) {
                var r = n(t);
                return r.data(i.obj) ? {
                    val: r.data(i.val) || "",
                    obj: r.data(i.obj) || null
                } : null
            }, t.mixin(u.prototype, r, {
                _overwrite: function(n, t) {
                    t = t || [];
                    t.length ? this._renderSuggestions(n, t) : this.async && this.templates.pending ? this._renderPending(n) : !this.async && this.templates.notFound ? this._renderNotFound(n) : this._empty();
                    this.trigger("rendered", this.name, t, !1)
                },
                _append: function(n, t) {
                    t = t || [];
                    t.length && this.$lastSuggestion.length ? this._appendSuggestions(n, t) : t.length ? this._renderSuggestions(n, t) : !this.$lastSuggestion.length && this.templates.notFound && this._renderNotFound(n);
                    this.trigger("rendered", this.name, t, !0)
                },
                _renderSuggestions: function(n, t) {
                    var i;
                    i = this._getSuggestionsFragment(n, t);
                    this.$lastSuggestion = i.children().last();
                    this.$el.html(i).prepend(this._getHeader(n, t)).append(this._getFooter(n, t))
                },
                _appendSuggestions: function(n, t) {
                    var i, r;
                    i = this._getSuggestionsFragment(n, t);
                    r = i.children().last();
                    this.$lastSuggestion.after(i);
                    this.$lastSuggestion = r
                },
                _renderPending: function(n) {
                    var t = this.templates.pending;
                    this._resetLastSuggestion();
                    t && this.$el.html(t({
                        query: n,
                        dataset: this.name
                    }))
                },
                _renderNotFound: function(n) {
                    var t = this.templates.notFound;
                    this._resetLastSuggestion();
                    t && this.$el.html(t({
                        query: n,
                        dataset: this.name
                    }))
                },
                _empty: function() {
                    this.$el.empty();
                    this._resetLastSuggestion()
                },
                _getSuggestionsFragment: function(r, u) {
                    var e, f = this;
                    return e = document.createDocumentFragment(), t.each(u, function(t) {
                        var u, o;
                        o = f._injectQuery(r, t);
                        u = n(f.templates.suggestion(o)).data(i.obj, t).data(i.val, f.displayFn(t)).addClass(f.classes.suggestion + " " + f.classes.selectable);
                        e.appendChild(u[0])
                    }), this.highlight && s({
                        className: this.classes.highlight,
                        node: e,
                        pattern: r
                    }), n(e)
                },
                _getFooter: function(n, t) {
                    return this.templates.footer ? this.templates.footer({
                        query: n,
                        suggestions: t,
                        dataset: this.name
                    }) : null
                },
                _getHeader: function(n, t) {
                    return this.templates.header ? this.templates.header({
                        query: n,
                        suggestions: t,
                        dataset: this.name
                    }) : null
                },
                _resetLastSuggestion: function() {
                    this.$lastSuggestion = n()
                },
                _injectQuery: function(n, i) {
                    return t.isObject(i) ? t.mixin({
                        _query: n
                    }, i) : i
                },
                update: function(t) {
                    function f(n) {
                        u || (u = !0, n = (n || []).slice(0, i.limit), r = n.length, i._overwrite(t, n), r < i.limit && i.async && i.trigger("asyncRequested", t))
                    }

                    function o(u) {
                        u = u || [];
                        !e && r < i.limit && (i.cancel = n.noop, r += u.length, i._append(t, u.slice(0, i.limit - r)), i.async && i.trigger("asyncReceived", t))
                    }
                    var i = this,
                        e = !1,
                        u = !1,
                        r = 0;
                    this.cancel();
                    this.cancel = function() {
                        e = !0;
                        i.cancel = n.noop;
                        i.async && i.trigger("asyncCanceled", t)
                    };
                    this.source(t, f, o);
                    !u && f([])
                },
                cancel: n.noop,
                clear: function() {
                    this._empty();
                    this.cancel();
                    this.trigger("cleared")
                },
                isEmpty: function() {
                    return this.$el.is(":empty")
                },
                destroy: function() {
                    this.$el = n("<div>")
                }
            }), u
        }(),
        i = function() {
            "use strict";

            function i(i, r) {
                function e(t) {
                    var i = u.$node.find(t.node).first();
                    return t.node = i.length ? i : n("<div>").appendTo(u.$node), new f(t, r)
                }
                var u = this;
                i = i || {};
                i.node || n.error("node is required");
                r.mixin(this);
                this.$node = n(i.node);
                this.query = null;
                this.datasets = t.map(i.datasets, e)
            }
            return t.mixin(i.prototype, r, {
                _onSelectableClick: function(t) {
                    this.trigger("selectableClicked", n(t.currentTarget))
                },
                _onRendered: function(n, t, i, r) {
                    this.$node.toggleClass(this.classes.empty, this._allDatasetsEmpty());
                    this.trigger("datasetRendered", t, i, r)
                },
                _onCleared: function() {
                    this.$node.toggleClass(this.classes.empty, this._allDatasetsEmpty());
                    this.trigger("datasetCleared")
                },
                _propagate: function() {
                    this.trigger.apply(this, arguments)
                },
                _allDatasetsEmpty: function() {
                    function n(n) {
                        return n.isEmpty()
                    }
                    return t.every(this.datasets, n)
                },
                _getSelectables: function() {
                    return this.$node.find(this.selectors.selectable)
                },
                _removeCursor: function() {
                    var n = this.getActiveSelectable();
                    n && n.removeClass(this.classes.cursor)
                },
                _ensureVisible: function(n) {
                    var t, i, r, u;
                    t = n.position().top;
                    i = t + n.outerHeight(!0);
                    r = this.$node.scrollTop();
                    u = this.$node.height() + parseInt(this.$node.css("paddingTop"), 10) + parseInt(this.$node.css("paddingBottom"), 10);
                    0 > t ? this.$node.scrollTop(r + t) : i > u && this.$node.scrollTop(r + (i - u))
                },
                bind: function() {
                    var i, n = this;
                    return i = t.bind(this._onSelectableClick, this), this.$node.on("click.tt", this.selectors.selectable, i), t.each(this.datasets, function(t) {
                        t.onSync("asyncRequested", n._propagate, n).onSync("asyncCanceled", n._propagate, n).onSync("asyncReceived", n._propagate, n).onSync("rendered", n._onRendered, n).onSync("cleared", n._onCleared, n)
                    }), this
                },
                isOpen: function() {
                    return this.$node.hasClass(this.classes.open)
                },
                open: function() {
                    this.$node.addClass(this.classes.open)
                },
                close: function() {
                    this.$node.removeClass(this.classes.open);
                    this._removeCursor()
                },
                setLanguageDirection: function(n) {
                    this.$node.attr("dir", n)
                },
                selectableRelativeToCursor: function(n) {
                    var i, r, u, t;
                    return r = this.getActiveSelectable(), i = this._getSelectables(), u = r ? i.index(r) : -1, t = u + n, t = (t + 1) % (i.length + 1) - 1, t = -1 > t ? i.length - 1 : t, -1 === t ? null : i.eq(t)
                },
                setCursor: function(n) {
                    this._removeCursor();
                    (n = n && n.first()) && (n.addClass(this.classes.cursor), this._ensureVisible(n))
                },
                getSelectableData: function(n) {
                    return n && n.length ? f.extractData(n) : null
                },
                getActiveSelectable: function() {
                    var n = this._getSelectables().filter(this.selectors.cursor).first();
                    return n.length ? n : null
                },
                getTopSelectable: function() {
                    var n = this._getSelectables().first();
                    return n.length ? n : null
                },
                update: function(n) {
                    function r(t) {
                        t.update(n)
                    }
                    var i = n !== this.query;
                    return i && (this.query = n, t.each(this.datasets, r)), i
                },
                empty: function() {
                    function n(n) {
                        n.clear()
                    }
                    t.each(this.datasets, n);
                    this.query = null;
                    this.$node.addClass(this.classes.empty)
                },
                destroy: function() {
                    function i(n) {
                        n.destroy()
                    }
                    this.$node.off(".tt");
                    this.$node = n("<div>");
                    t.each(this.datasets, i)
                }
            }), i
        }(),
        h = function() {
            "use strict";

            function r() {
                i.apply(this, [].slice.call(arguments, 0))
            }
            var n = i.prototype;
            return t.mixin(r.prototype, i.prototype, {
                open: function() {
                    return !this._allDatasetsEmpty() && this._show(), n.open.apply(this, [].slice.call(arguments, 0))
                },
                close: function() {
                    return this._hide(), n.close.apply(this, [].slice.call(arguments, 0))
                },
                _onRendered: function() {
                    return this._allDatasetsEmpty() ? this._hide() : this.isOpen() && this._show(), n._onRendered.apply(this, [].slice.call(arguments, 0))
                },
                _onCleared: function() {
                    return this._allDatasetsEmpty() ? this._hide() : this.isOpen() && this._show(), n._onCleared.apply(this, [].slice.call(arguments, 0))
                },
                setLanguageDirection: function(t) {
                    return this.$node.css("ltr" === t ? this.css.ltr : this.css.rtl), n.setLanguageDirection.apply(this, [].slice.call(arguments, 0))
                },
                _hide: function() {
                    this.$node.hide()
                },
                _show: function() {
                    this.$node.css("display", "block")
                }
            }), r
        }(),
        c = function() {
            "use strict";

            function r(r, u) {
                var f, e, o, s, h, c, l, a, v, y, p;
                r = r || {};
                r.input || n.error("missing input");
                r.menu || n.error("missing menu");
                r.eventBus || n.error("missing event bus");
                u.mixin(this);
                this.eventBus = r.eventBus;
                this.minLength = t.isNumber(r.minLength) ? r.minLength : 1;
                this.input = r.input;
                this.menu = r.menu;
                this.enabled = !0;
                this.active = !1;
                this.input.hasFocus() && this.activate();
                this.dir = this.input.getLangDir();
                this._hacks();
                this.menu.bind().onSync("selectableClicked", this._onSelectableClicked, this).onSync("asyncRequested", this._onAsyncRequested, this).onSync("asyncCanceled", this._onAsyncCanceled, this).onSync("asyncReceived", this._onAsyncReceived, this).onSync("datasetRendered", this._onDatasetRendered, this).onSync("datasetCleared", this._onDatasetCleared, this);
                f = i(this, "activate", "open", "_onFocused");
                e = i(this, "deactivate", "_onBlurred");
                o = i(this, "isActive", "isOpen", "_onEnterKeyed");
                s = i(this, "isActive", "isOpen", "_onTabKeyed");
                h = i(this, "isActive", "_onEscKeyed");
                c = i(this, "isActive", "open", "_onUpKeyed");
                l = i(this, "isActive", "open", "_onDownKeyed");
                a = i(this, "isActive", "isOpen", "_onLeftKeyed");
                v = i(this, "isActive", "isOpen", "_onRightKeyed");
                y = i(this, "_openIfActive", "_onQueryChanged");
                p = i(this, "_openIfActive", "_onWhitespaceChanged");
                this.input.bind().onSync("focused", f, this).onSync("blurred", e, this).onSync("enterKeyed", o, this).onSync("tabKeyed", s, this).onSync("escKeyed", h, this).onSync("upKeyed", c, this).onSync("downKeyed", l, this).onSync("leftKeyed", a, this).onSync("rightKeyed", v, this).onSync("queryChanged", y, this).onSync("whitespaceChanged", p, this).onSync("langDirChanged", this._onLangDirChanged, this)
            }

            function i(n) {
                var i = [].slice.call(arguments, 1);
                return function() {
                    var r = [].slice.call(arguments);
                    t.each(i, function(t) {
                        return n[t].apply(n, r)
                    })
                }
            }
            return t.mixin(r.prototype, {
                _hacks: function() {
                    var r, i;
                    r = this.input.$input || n("<div>");
                    i = this.menu.$node || n("<div>");
                    r.on("blur.tt", function(n) {
                        var u, f, e;
                        u = document.activeElement;
                        f = i.is(u);
                        e = i.has(u).length > 0;
                        t.isMsie() && (f || e) && (n.preventDefault(), n.stopImmediatePropagation(), t.defer(function() {
                            r.focus()
                        }))
                    });
                    i.on("mousedown.tt", function(n) {
                        n.preventDefault()
                    })
                },
                _onSelectableClicked: function(n, t) {
                    this.select(t)
                },
                _onDatasetCleared: function() {
                    this._updateHint()
                },
                _onDatasetRendered: function(n, t, i, r) {
                    this._updateHint();
                    this.eventBus.trigger("render", i, r, t)
                },
                _onAsyncRequested: function(n, t, i) {
                    this.eventBus.trigger("asyncrequest", i, t)
                },
                _onAsyncCanceled: function(n, t, i) {
                    this.eventBus.trigger("asynccancel", i, t)
                },
                _onAsyncReceived: function(n, t, i) {
                    this.eventBus.trigger("asyncreceive", i, t)
                },
                _onFocused: function() {
                    this._minLengthMet() && this.menu.update(this.input.getQuery())
                },
                _onBlurred: function() {
                    this.input.hasQueryChangedSinceLastFocus() && this.eventBus.trigger("change", this.input.getQuery())
                },
                _onEnterKeyed: function(n, t) {
                    var i;
                    (i = this.menu.getActiveSelectable()) && this.select(i) && t.preventDefault()
                },
                _onTabKeyed: function(n, t) {
                    var i;
                    (i = this.menu.getActiveSelectable()) ? this.select(i) && t.preventDefault(): (i = this.menu.getTopSelectable()) && this.autocomplete(i) && t.preventDefault()
                },
                _onEscKeyed: function() {
                    this.close()
                },
                _onUpKeyed: function() {
                    this.moveCursor(-1)
                },
                _onDownKeyed: function() {
                    this.moveCursor(1)
                },
                _onLeftKeyed: function() {
                    "rtl" === this.dir && this.input.isCursorAtEnd() && this.autocomplete(this.menu.getTopSelectable())
                },
                _onRightKeyed: function() {
                    "ltr" === this.dir && this.input.isCursorAtEnd() && this.autocomplete(this.menu.getTopSelectable())
                },
                _onQueryChanged: function(n, t) {
                    this._minLengthMet(t) ? this.menu.update(t) : this.menu.empty()
                },
                _onWhitespaceChanged: function() {
                    this._updateHint()
                },
                _onLangDirChanged: function(n, t) {
                    this.dir !== t && (this.dir = t, this.menu.setLanguageDirection(t))
                },
                _openIfActive: function() {
                    this.isActive() && this.open()
                },
                _minLengthMet: function(n) {
                    return n = t.isString(n) ? n : this.input.getQuery() || "", n.length >= this.minLength
                },
                _updateHint: function() {
                    var f, i, n, e, o, s, r;
                    f = this.menu.getTopSelectable();
                    i = this.menu.getSelectableData(f);
                    n = this.input.getInputValue();
                    !i || t.isBlankString(n) || this.input.hasOverflow() ? this.input.clearHint() : (e = u.normalizeQuery(n), o = t.escapeRegExChars(e), s = new RegExp("^(?:" + o + ")(.+$)", "i"), r = s.exec(i.val), r && this.input.setHint(n + r[1]))
                },
                isEnabled: function() {
                    return this.enabled
                },
                enable: function() {
                    this.enabled = !0
                },
                disable: function() {
                    this.enabled = !1
                },
                isActive: function() {
                    return this.active
                },
                activate: function() {
                    return this.isActive() ? !0 : !this.isEnabled() || this.eventBus.before("active") ? !1 : (this.active = !0, this.eventBus.trigger("active"), !0)
                },
                deactivate: function() {
                    return this.isActive() ? this.eventBus.before("idle") ? !1 : (this.active = !1, this.close(), this.eventBus.trigger("idle"), !0) : !0
                },
                isOpen: function() {
                    return this.menu.isOpen()
                },
                open: function() {
                    return this.isOpen() || this.eventBus.before("open") || (this.menu.open(), this._updateHint(), this.eventBus.trigger("open")), this.isOpen()
                },
                close: function() {
                    return this.isOpen() && !this.eventBus.before("close") && (this.menu.close(), this.input.clearHint(), this.input.resetInputValue(), this.eventBus.trigger("close")), !this.isOpen()
                },
                setVal: function(n) {
                    this.input.setQuery(t.toStr(n))
                },
                getVal: function() {
                    return this.input.getQuery()
                },
                select: function(n) {
                    var t = this.menu.getSelectableData(n);
                    return t && !this.eventBus.before("select", t.obj) ? (this.input.setQuery(t.val, !0), this.eventBus.trigger("select", t.obj), this.close(), !0) : !1
                },
                autocomplete: function(n) {
                    var i, t, r;
                    return i = this.input.getQuery(), t = this.menu.getSelectableData(n), r = t && i !== t.val, r && !this.eventBus.before("autocomplete", t.obj) ? (this.input.setQuery(t.val), this.eventBus.trigger("autocomplete", t.obj), !0) : !1
                },
                moveCursor: function(n) {
                    var u, i, t, r, f;
                    return u = this.input.getQuery(), i = this.menu.selectableRelativeToCursor(n), t = this.menu.getSelectableData(i), r = t ? t.obj : null, f = this._minLengthMet() && this.menu.update(u), f || this.eventBus.before("cursorchange", r) ? !1 : (this.menu.setCursor(i), t ? this.input.setInputValue(t.val) : (this.input.resetInputValue(), this._updateHint()), this.eventBus.trigger("cursorchange", r), !0)
                },
                destroy: function() {
                    this.input.destroy();
                    this.menu.destroy()
                }
            }), r
        }();
    ! function() {
        "use strict";

        function r(t, i) {
            t.each(function() {
                var t, r = n(this);
                (t = r.data(f.typeahead)) && i(t, r)
            })
        }

        function v(n, t) {
            return n.clone().addClass(t.classes.hint).removeData().css(t.css.hint).css(p(n)).prop("readonly", !0).removeAttr("id name placeholder required").attr({
                autocomplete: "off",
                spellcheck: "false",
                tabindex: -1
            })
        }

        function y(n, t) {
            n.data(f.attrs, {
                dir: n.attr("dir"),
                autocomplete: n.attr("autocomplete"),
                spellcheck: n.attr("spellcheck"),
                style: n.attr("style")
            });
            n.addClass(t.classes.input).attr({
                autocomplete: "off",
                spellcheck: !1
            });
            try {
                n.attr("dir") || n.attr("dir", "auto")
            } catch (i) {}
            return n
        }

        function p(n) {
            return {
                backgroundAttachment: n.css("background-attachment"),
                backgroundClip: n.css("background-clip"),
                backgroundColor: n.css("background-color"),
                backgroundImage: n.css("background-image"),
                backgroundOrigin: n.css("background-origin"),
                backgroundPosition: n.css("background-position"),
                backgroundRepeat: n.css("background-repeat"),
                backgroundSize: n.css("background-size")
            }
        }

        function w(n) {
            var r, i;
            r = n.data(f.www);
            i = n.parent().filter(r.selectors.wrapper);
            t.each(n.data(f.attrs), function(i, r) {
                t.isUndefined(i) ? n.removeAttr(r) : n.attr(r, i)
            });
            n.removeData(f.typeahead).removeData(f.www).removeData(f.attr).removeClass(r.classes.input);
            i.length && (n.detach().insertAfter(i), i.remove())
        }

        function l(i) {
            var u, r;
            return u = t.isJQuery(i) || t.isElement(i), r = u ? n(i).first() : [], r.length ? r : null
        }
        var a, f, s;
        a = n.fn.typeahead;
        f = {
            www: "tt-www",
            attrs: "tt-attrs",
            typeahead: "tt-typeahead"
        };
        s = {
            initialize: function(r, s) {
                function p() {
                    var e, d, p, w, b, k, g, nt, tt, it, rt;
                    t.each(s, function(n) {
                        n.highlight = !!r.highlight
                    });
                    e = n(this);
                    d = n(a.html.wrapper);
                    p = l(r.hint);
                    w = l(r.menu);
                    b = r.hint !== !1 && !p;
                    k = r.menu !== !1 && !w;
                    b && (p = v(e, a));
                    k && (w = n(a.html.menu).css(a.css.menu));
                    p && p.val("");
                    e = y(e, a);
                    (b || k) && (d.css(a.css.wrapper), e.css(b ? a.css.input : a.css.inputWithNoHint), e.wrap(d).parent().prepend(b ? p : null).append(k ? w : null));
                    rt = k ? h : i;
                    g = new o({
                        el: e
                    });
                    nt = new u({
                        hint: p,
                        input: e
                    }, a);
                    tt = new rt({
                        node: w,
                        datasets: s
                    }, a);
                    it = new c({
                        input: nt,
                        menu: tt,
                        eventBus: g,
                        minLength: r.minLength
                    }, a);
                    e.data(f.www, a);
                    e.data(f.typeahead, it)
                }
                var a;
                return s = t.isArray(s) ? s : [].slice.call(arguments, 1), r = r || {}, a = e(r.classNames), this.each(p)
            },
            isEnabled: function() {
                var n;
                return r(this.first(), function(t) {
                    n = t.isEnabled()
                }), n
            },
            enable: function() {
                return r(this, function(n) {
                    n.enable()
                }), this
            },
            disable: function() {
                return r(this, function(n) {
                    n.disable()
                }), this
            },
            isActive: function() {
                var n;
                return r(this.first(), function(t) {
                    n = t.isActive()
                }), n
            },
            activate: function() {
                return r(this, function(n) {
                    n.activate()
                }), this
            },
            deactivate: function() {
                return r(this, function(n) {
                    n.deactivate()
                }), this
            },
            isOpen: function() {
                var n;
                return r(this.first(), function(t) {
                    n = t.isOpen()
                }), n
            },
            open: function() {
                return r(this, function(n) {
                    n.open()
                }), this
            },
            close: function() {
                return r(this, function(n) {
                    n.close()
                }), this
            },
            select: function(t) {
                var i = !1,
                    u = n(t);
                return r(this.first(), function(n) {
                    i = n.select(u)
                }), i
            },
            autocomplete: function(t) {
                var i = !1,
                    u = n(t);
                return r(this.first(), function(n) {
                    i = n.autocomplete(u)
                }), i
            },
            moveCursor: function(n) {
                var t = !1;
                return r(this.first(), function(i) {
                    t = i.moveCursor(n)
                }), t
            },
            val: function(n) {
                var t;
                return arguments.length ? (r(this, function(t) {
                    t.setVal(n)
                }), this) : (r(this.first(), function(n) {
                    t = n.getVal()
                }), t)
            },
            destroy: function() {
                return r(this, function(n, t) {
                    w(t);
                    n.destroy()
                }), this
            }
        };
        n.fn.typeahead = function(n) {
            return s[n] ? s[n].apply(this, [].slice.call(arguments, 1)) : s.initialize.apply(this, arguments)
        };
        n.fn.typeahead.noConflict = function() {
            return n.fn.typeahead = a, this
        }
    }()
}),
function(n) {
    n.fn.accordionWidget = function(t) {
        var u, r = n.extend({
                url: null,
                type: null,
                height: 53
            }, t),
            i = this;
        i.init = function() {
            alert("init " + this.id)
        };
        i.testPub = function() {
            alert("public function")
        };
        var a = function() {
                alert("fgi " + u);
                u = ["test", "test2", "test3"];
                alert(u)
            },
            e = function() {
                n.ajax({
                    type: "GET",
                    url: r.url,
                    contentType: "application/json; charset=utf-8",
                    success: function(n) {
                        u = n;
                        c(u)
                    }
                })
            },
            o = function() {
                n.ajax({
                    type: "GET",
                    url: r.url,
                    contentType: "application/json; charset=utf-8",
                    success: function(n) {
                        u = n;
                        l(u)
                    }
                })
            },
            s = function() {
                e()
            },
            h = function() {
                o()
            },
            c = function(n) {
                var e, t, u;
                if (n != undefined) {
                    if (n.dataOD != undefined)
                        if (i.find("div#" + r.type + "-overdue").empty(), i.find("a#" + r.type + "-overdue-header .badge").text(n.dataOD.length), n.dataOD.length != 0)
                            for (i.find("a#" + r.type + "-overdue-header span:first").css({
                                    opacity: 1
                                }), i.find("a.not-overdue").addClass("overdue"), i.find("a.not-overdue").removeClass("not-overdue"), e = "div#" + r.type + "-overdue", t = 0; t < n.dataOD.length; t++) i.find(e).append('<a onclick="editActivityOpen(' + n.dataOD[t].activityID + ')" class="list-group-item"><span class="widget-date">' + moment(n.dataOD[t].dueDateTime).format("lll") + '<\/span> <br /> <span class="widget-name">' + n.dataOD[t].companyName + "<\/span><\/a>");
                        else i.find("a.overdue").addClass("not-overdue").removeClass("overdue"), i.find("a#" + r.type + "-overdue-header span:first").css({
                            opacity: 0
                        }), u = i.find("div#" + r.type + "-overdue"), u.attr("aria-expanded") === "true" && u.collapse("hide");
                    if (n.dataT != undefined)
                        if (i.find("div#" + r.type + "-today").empty(), i.find("a#" + r.type + "-today-header .badge").text(n.dataT.length), n.dataT.length != 0)
                            for (e = "div#" + r.type + "-today", i.find("a#" + r.type + "-today-header span:first").css({
                                    opacity: 1
                                }), t = 0; t < n.dataT.length; t++) i.find(e).append('<a onclick="editActivityOpen(' + n.dataT[t].activityID + ')" class="list-group-item"><span class="widget-date">' + moment(n.dataT[t].dueDateTime).format("lll") + '<\/span> <br /> <span class="widget-name">' + n.dataT[t].companyName + "<\/span><\/a>");
                        else u = i.find("div#" + r.type + "-today"), u.attr("aria-expanded") === "true" && i.find("div#" + r.type + "-today").collapse("hide"), i.find("a#" + r.type + "-today-header span:first").css({
                            opacity: 0
                        });
                    if (n.dataW != undefined)
                        if (i.find("div#" + r.type + "-week").empty(), i.find("a#" + r.type + "-week-header .badge").text(n.dataW.length), n.dataW.length != 0)
                            for (e = "div#" + r.type + "-week", i.find("a#" + r.type + "-week-header span:first").css({
                                    opacity: 1
                                }), t = 0; t < n.dataW.length; t++) i.find(e).append('<a onclick="editActivityOpen(' + n.dataW[t].activityID + ')" class="list-group-item"><span class="widget-date">' + moment(n.dataW[t].dueDateTime).format("lll") + '<\/span> <br /> <span class="widget-name">' + n.dataW[t].companyName + "<\/span><\/a>");
                        else u = i.find("div#" + r.type + "-week"), u.attr("aria-expanded") === "true" && i.find("div#" + r.type + "-week").collapse("hide"), i.find("a#" + r.type + "-week-header span:first").css({
                            opacity: 0
                        });
                    f()
                }
            },
            l = function(n) {
                var e, t, u, o;
                if (n != undefined) {
                    for (t = 0; t < n.length; t++)
                        if (n[t] != undefined)
                            if (e = "div#" + r.type + n[t].name, i.find(e).empty(), i.find("a#" + r.type + n[t].name + "-header .badge").text(n[t].data.length), n[t].data.length != 0)
                                for (i.find("a#" + r.type + n[t].name + "-header span:first").css({
                                        opacity: 1
                                    }), u = 0; u < n[t].data.length; u++) i.find(e).append('<a onclick="editOpportunity' + n[t].nyq + "(" + n[t].data[u].opportunityID + ')" class="list-group-item"><span class="widget-date">' + n[t].data[u].oppType + '<\/span> <br /> <span class="widget-name">' + n[t].data[u].companyName + "<\/span><\/a>");
                            else o = i.find(e), o.attr("aria-expanded") === "true" && o.collapse("hide"), i.find("a#" + r.type + n[t].name + "-header span:first").css({
                                opacity: 0
                            });
                    f()
                }
            },
            f = function() {
                var n = i.find("div.in").length;
                setTimeout(function() {
                    n += i.find("div.collapsing").length;
                    i.find("div.in, div.collapsing").css("max-height", r.height / n + "vh")
                }, 10)
            };
        i.find("div.panel-collapse").on("hidden.bs.collapse", function() {
            f(0)
        });
        i.find("div.panel-collapse").on("show.bs.collapse", function() {
            f(1)
        });
        return this.bind("update.acts", s), this.bind("update.opps", h), this
    }
}(jQuery);
! function(n, t) {
    "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : "object" == typeof exports ? exports.Handlebars = t() : n.Handlebars = t()
}(this, function() {
    return function(n) {
        function t(r) {
            if (i[r]) return i[r].exports;
            var u = i[r] = {
                exports: {},
                id: r,
                loaded: !1
            };
            return n[r].call(u.exports, u, u.exports, t), u.loaded = !0, u.exports
        }
        var i = {};
        return t.m = n, t.c = i, t.p = "", t(0)
    }([function(n, t, i) {
        "use strict";

        function e() {
            var n = k();
            return n.compile = function(t, i) {
                return f.compile(t, i, n)
            }, n.precompile = function(t, i) {
                return f.precompile(t, i, n)
            }, n.AST = l["default"], n.Compiler = f.Compiler, n.JavaScriptCompiler = v["default"], n.Parser = o.parser, n.parse = o.parse, n
        }
        var u = i(8)["default"];
        t.__esModule = !0;
        var s = i(1),
            h = u(s),
            c = i(2),
            l = u(c),
            o = i(3),
            f = i(4),
            a = i(5),
            v = u(a),
            y = i(6),
            p = u(y),
            w = i(7),
            b = u(w),
            k = h["default"].create,
            r = e();
        r.create = e;
        b["default"](r);
        r.Visitor = p["default"];
        r["default"] = r;
        t["default"] = r;
        n.exports = t["default"]
    }, function(n, t, i) {
        "use strict";

        function e() {
            var n = new o.HandlebarsEnvironment;
            return f.extend(n, o), n.SafeString = l["default"], n.Exception = v["default"], n.Utils = f, n.escapeExpression = f.escapeExpression, n.VM = s, n.template = function(t) {
                return s.template(t, n)
            }, n
        }
        var r = i(8)["default"];
        t.__esModule = !0;
        var h = i(9),
            o = r(h),
            c = i(10),
            l = r(c),
            a = i(11),
            v = r(a),
            y = i(12),
            f = r(y),
            p = i(13),
            s = r(p),
            w = i(7),
            b = r(w),
            u = e();
        u.create = e;
        b["default"](u);
        u["default"] = u;
        t["default"] = u;
        n.exports = t["default"]
    }, function(n, t) {
        "use strict";
        t.__esModule = !0;
        var i = {
            Program: function(n, t, i, r) {
                this.loc = r;
                this.type = "Program";
                this.body = n;
                this.blockParams = t;
                this.strip = i
            },
            MustacheStatement: function(n, t, i, r, u, f) {
                this.loc = f;
                this.type = "MustacheStatement";
                this.path = n;
                this.params = t || [];
                this.hash = i;
                this.escaped = r;
                this.strip = u
            },
            BlockStatement: function(n, t, i, r, u, f, e, o, s) {
                this.loc = s;
                this.type = "BlockStatement";
                this.path = n;
                this.params = t || [];
                this.hash = i;
                this.program = r;
                this.inverse = u;
                this.openStrip = f;
                this.inverseStrip = e;
                this.closeStrip = o
            },
            PartialStatement: function(n, t, i, r, u) {
                this.loc = u;
                this.type = "PartialStatement";
                this.name = n;
                this.params = t || [];
                this.hash = i;
                this.indent = "";
                this.strip = r
            },
            ContentStatement: function(n, t) {
                this.loc = t;
                this.type = "ContentStatement";
                this.original = this.value = n
            },
            CommentStatement: function(n, t, i) {
                this.loc = i;
                this.type = "CommentStatement";
                this.value = n;
                this.strip = t
            },
            SubExpression: function(n, t, i, r) {
                this.loc = r;
                this.type = "SubExpression";
                this.path = n;
                this.params = t || [];
                this.hash = i
            },
            PathExpression: function(n, t, i, r, u) {
                this.loc = u;
                this.type = "PathExpression";
                this.data = n;
                this.original = r;
                this.parts = i;
                this.depth = t
            },
            StringLiteral: function(n, t) {
                this.loc = t;
                this.type = "StringLiteral";
                this.original = this.value = n
            },
            NumberLiteral: function(n, t) {
                this.loc = t;
                this.type = "NumberLiteral";
                this.original = this.value = Number(n)
            },
            BooleanLiteral: function(n, t) {
                this.loc = t;
                this.type = "BooleanLiteral";
                this.original = this.value = "true" === n
            },
            UndefinedLiteral: function(n) {
                this.loc = n;
                this.type = "UndefinedLiteral";
                this.original = this.value = void 0
            },
            NullLiteral: function(n) {
                this.loc = n;
                this.type = "NullLiteral";
                this.original = this.value = null
            },
            Hash: function(n, t) {
                this.loc = t;
                this.type = "Hash";
                this.pairs = n
            },
            HashPair: function(n, t, i) {
                this.loc = i;
                this.type = "HashPair";
                this.key = n;
                this.value = t
            },
            helpers: {
                helperExpression: function(n) {
                    return !("SubExpression" !== n.type && !n.params.length && !n.hash)
                },
                scopedId: function(n) {
                    return /^\.|this\b/.test(n.original)
                },
                simpleId: function(n) {
                    return 1 === n.parts.length && !i.helpers.scopedId(n) && !n.depth
                }
            }
        };
        t["default"] = i;
        n.exports = t["default"]
    }, function(n, t, i) {
        "use strict";

        function e(n, t) {
            if ("Program" === n.type) return n;
            f["default"].yy = r;
            r.locInfo = function(n) {
                return new r.SourceLocation(t && t.srcName, n)
            };
            var i = new l["default"];
            return i.accept(f["default"].parse(n))
        }
        var u = i(8)["default"],
            r;
        t.__esModule = !0;
        t.parse = e;
        var o = i(14),
            f = u(o),
            s = i(2),
            h = u(s),
            c = i(15),
            l = u(c),
            a = i(16),
            v = u(a),
            y = i(12);
        t.parser = f["default"];
        r = {};
        y.extend(r, v, h["default"])
    }, function(n, t, i) {
        "use strict";

        function f() {}

        function c(n, t, i) {
            if (null == n || "string" != typeof n && "Program" !== n.type) throw new u["default"]("You must pass a string or Handlebars AST to Handlebars.precompile. You passed " + n);
            t = t || {};
            "data" in t || (t.data = !0);
            t.compat && (t.useDepths = !0);
            var r = i.parse(n, t),
                f = (new i.Compiler).compile(r, t);
            return (new i.JavaScriptCompiler).compile(f, t)
        }

        function l(n, t, i) {
            function e() {
                var t = i.parse(n, f),
                    r = (new i.Compiler).compile(t, f),
                    u = (new i.JavaScriptCompiler).compile(r, f, void 0, !0);
                return i.template(u)
            }

            function o(n, t) {
                return r || (r = e()), r.call(this, n, t)
            }
            var f = void 0 === arguments[1] ? {} : arguments[1],
                r;
            if (null == n || "string" != typeof n && "Program" !== n.type) throw new u["default"]("You must pass a string or Handlebars AST to Handlebars.compile. You passed " + n);
            return "data" in f || (f.data = !0), f.compat && (f.useDepths = !0), r = void 0, o._setup = function(n) {
                return r || (r = e()), r._setup(n)
            }, o._child = function(n, t, i, u) {
                return r || (r = e()), r._child(n, t, i, u)
            }, o
        }

        function o(n, t) {
            if (n === t) return !0;
            if (e.isArray(n) && e.isArray(t) && n.length === t.length) {
                for (var i = 0; i < n.length; i++)
                    if (!o(n[i], t[i])) return !1;
                return !0
            }
        }

        function s(n) {
            if (!n.path.parts) {
                var t = n.path;
                n.path = new r["default"].PathExpression(!1, 0, [t.original + ""], t.original + "", t.loc)
            }
        }
        var h = i(8)["default"];
        t.__esModule = !0;
        t.Compiler = f;
        t.precompile = c;
        t.compile = l;
        var a = i(11),
            u = h(a),
            e = i(12),
            v = i(2),
            r = h(v),
            y = [].slice;
        f.prototype = {
            compiler: f,
            equals: function(n) {
                var i = this.opcodes.length,
                    r, u, t;
                if (n.opcodes.length !== i) return !1;
                for (t = 0; i > t; t++)
                    if (r = this.opcodes[t], u = n.opcodes[t], r.opcode !== u.opcode || !o(r.args, u.args)) return !1;
                for (i = this.children.length, t = 0; i > t; t++)
                    if (!this.children[t].equals(n.children[t])) return !1;
                return !0
            },
            guid: 0,
            compile: function(n, t) {
                var i, r;
                if (this.sourceNode = [], this.opcodes = [], this.children = [], this.options = t, this.stringParams = t.stringParams, this.trackIds = t.trackIds, t.blockParams = t.blockParams || [], i = t.knownHelpers, t.knownHelpers = {
                        helperMissing: !0,
                        blockHelperMissing: !0,
                        each: !0,
                        "if": !0,
                        unless: !0,
                        "with": !0,
                        log: !0,
                        lookup: !0
                    }, i)
                    for (r in i) r in i && (t.knownHelpers[r] = i[r]);
                return this.accept(n)
            },
            compileProgram: function(n) {
                var r = new this.compiler,
                    t = r.compile(n, this.options),
                    i = this.guid++;
                return this.usePartial = this.usePartial || t.usePartial, this.children[i] = t, this.useDepths = this.useDepths || t.useDepths, i
            },
            accept: function(n) {
                this.sourceNode.unshift(n);
                var t = this[n.type](n);
                return this.sourceNode.shift(), t
            },
            Program: function(n) {
                this.options.blockParams.unshift(n.blockParams);
                for (var i = n.body, r = i.length, t = 0; r > t; t++) this.accept(i[t]);
                return this.options.blockParams.shift(), this.isSimple = 1 === r, this.blockParams = n.blockParams ? n.blockParams.length : 0, this
            },
            BlockStatement: function(n) {
                var t, i, r;
                s(n);
                t = n.program;
                i = n.inverse;
                t = t && this.compileProgram(t);
                i = i && this.compileProgram(i);
                r = this.classifySexpr(n);
                "helper" === r ? this.helperSexpr(n, t, i) : "simple" === r ? (this.simpleSexpr(n), this.opcode("pushProgram", t), this.opcode("pushProgram", i), this.opcode("emptyHash"), this.opcode("blockValue", n.path.original)) : (this.ambiguousSexpr(n, t, i), this.opcode("pushProgram", t), this.opcode("pushProgram", i), this.opcode("emptyHash"), this.opcode("ambiguousBlockValue"));
                this.opcode("append")
            },
            PartialStatement: function(n) {
                var t, f, r, i;
                if (this.usePartial = !0, t = n.params, t.length > 1) throw new u["default"]("Unsupported number of partial arguments: " + t.length, n);
                t.length || t.push({
                    type: "PathExpression",
                    parts: [],
                    depth: 0
                });
                f = n.name.original;
                r = "SubExpression" === n.name.type;
                r && this.accept(n.name);
                this.setupFullMustacheParams(n, void 0, void 0, !0);
                i = n.indent || "";
                this.options.preventIndent && i && (this.opcode("appendContent", i), i = "");
                this.opcode("invokePartial", r, f, i);
                this.opcode("append")
            },
            MustacheStatement: function(n) {
                this.SubExpression(n);
                this.opcode(n.escaped && !this.options.noEscape ? "appendEscaped" : "append")
            },
            ContentStatement: function(n) {
                n.value && this.opcode("appendContent", n.value)
            },
            CommentStatement: function() {},
            SubExpression: function(n) {
                s(n);
                var t = this.classifySexpr(n);
                "simple" === t ? this.simpleSexpr(n) : "helper" === t ? this.helperSexpr(n) : this.ambiguousSexpr(n)
            },
            ambiguousSexpr: function(n, t, i) {
                var r = n.path,
                    u = r.parts[0],
                    f = null != t || null != i;
                this.opcode("getContext", r.depth);
                this.opcode("pushProgram", t);
                this.opcode("pushProgram", i);
                this.accept(r);
                this.opcode("invokeAmbiguous", u, f)
            },
            simpleSexpr: function(n) {
                this.accept(n.path);
                this.opcode("resolvePossibleLambda")
            },
            helperSexpr: function(n, t, i) {
                var o = this.setupFullMustacheParams(n, t, i),
                    f = n.path,
                    e = f.parts[0];
                if (this.options.knownHelpers[e]) this.opcode("invokeKnownHelper", o.length, e);
                else {
                    if (this.options.knownHelpersOnly) throw new u["default"]("You specified knownHelpersOnly, but used the unknown helper " + e, n);
                    f.falsy = !0;
                    this.accept(f);
                    this.opcode("invokeHelper", o.length, f.original, r["default"].helpers.simpleId(f))
                }
            },
            PathExpression: function(n) {
                this.addDepth(n.depth);
                this.opcode("getContext", n.depth);
                var t = n.parts[0],
                    i = r["default"].helpers.scopedId(n),
                    u = !n.depth && !i && this.blockParamIndex(t);
                u ? this.opcode("lookupBlockParam", u, n.parts) : t ? n.data ? (this.options.data = !0, this.opcode("lookupData", n.depth, n.parts)) : this.opcode("lookupOnContext", n.parts, n.falsy, i) : this.opcode("pushContext")
            },
            StringLiteral: function(n) {
                this.opcode("pushString", n.value)
            },
            NumberLiteral: function(n) {
                this.opcode("pushLiteral", n.value)
            },
            BooleanLiteral: function(n) {
                this.opcode("pushLiteral", n.value)
            },
            UndefinedLiteral: function() {
                this.opcode("pushLiteral", "undefined")
            },
            NullLiteral: function() {
                this.opcode("pushLiteral", "null")
            },
            Hash: function(n) {
                var i = n.pairs,
                    t = 0,
                    r = i.length;
                for (this.opcode("pushHash"); r > t; t++) this.pushParam(i[t].value);
                for (; t--;) this.opcode("assignToHash", i[t].key);
                this.opcode("popHash")
            },
            opcode: function(n) {
                this.opcodes.push({
                    opcode: n,
                    args: y.call(arguments, 1),
                    loc: this.sourceNode[0].loc
                })
            },
            addDepth: function(n) {
                n && (this.useDepths = !0)
            },
            classifySexpr: function(n) {
                var f = r["default"].helpers.simpleId(n.path),
                    e = f && !!this.blockParamIndex(n.path.parts[0]),
                    t = !e && r["default"].helpers.helperExpression(n),
                    i = !e && (t || f),
                    o, u;
                return i && !t && (o = n.path.parts[0], u = this.options, u.knownHelpers[o] ? t = !0 : u.knownHelpersOnly && (i = !1)), t ? "helper" : i ? "ambiguous" : "simple"
            },
            pushParams: function(n) {
                for (var t = 0, i = n.length; i > t; t++) this.pushParam(n[t])
            },
            pushParam: function(n) {
                var t = null != n.value ? n.value : n.original || "",
                    i, u;
                this.stringParams ? (t.replace && (t = t.replace(/^(\.?\.\/)*/g, "").replace(/\//g, ".")), n.depth && this.addDepth(n.depth), this.opcode("getContext", n.depth || 0), this.opcode("pushStringParam", t, n.type), "SubExpression" === n.type && this.accept(n)) : (this.trackIds && (i = void 0, (!n.parts || r["default"].helpers.scopedId(n) || n.depth || (i = this.blockParamIndex(n.parts[0])), i) ? (u = n.parts.slice(1).join("."), this.opcode("pushId", "BlockParam", i, u)) : (t = n.original || t, t.replace && (t = t.replace(/^\.\//g, "").replace(/^\.$/g, "")), this.opcode("pushId", n.type, t))), this.accept(n))
            },
            setupFullMustacheParams: function(n, t, i, r) {
                var u = n.params;
                return this.pushParams(u), this.opcode("pushProgram", t), this.opcode("pushProgram", i), n.hash ? this.accept(n.hash) : this.opcode("emptyHash", r), u
            },
            blockParamIndex: function(n) {
                for (var i, r, t = 0, u = this.options.blockParams.length; u > t; t++)
                    if (i = this.options.blockParams[t], r = i && e.indexOf(i, n), i && r >= 0) return [t, r]
            }
        }
    }, function(n, t, i) {
        "use strict";

        function u(n) {
            this.value = n
        }

        function r() {}

        function s(n, t, i, r) {
            var u = t.popStack(),
                f = 0,
                e = i.length;
            for (n && e--; e > f; f++) u = t.nameLookup(u, i[f], r);
            return n ? [t.aliasable("this.strict"), "(", u, ", ", t.quotedString(i[f]), ")"] : u
        }
        var e = i(8)["default"];
        t.__esModule = !0;
        var o = i(9),
            h = i(11),
            f = e(h),
            c = i(12),
            l = i(17),
            a = e(l);
        r.prototype = {
                nameLookup: function(n, t) {
                    return r.isValidJavaScriptVariableName(t) ? [n, ".", t] : [n, "['", t, "']"]
                },
                depthedLookup: function(n) {
                    return [this.aliasable("this.lookup"), '(depths, "', n, '")']
                },
                compilerInfo: function() {
                    var n = o.COMPILER_REVISION,
                        t = o.REVISION_CHANGES[n];
                    return [n, t]
                },
                appendToBuffer: function(n, t, i) {
                    return c.isArray(n) || (n = [n]), n = this.source.wrap(n, t), this.environment.isSimple ? ["return ", n, ";"] : i ? ["buffer += ", n, ";"] : (n.appendToBuffer = !0, n)
                },
                initializeBuffer: function() {
                    return this.quotedString("")
                },
                compile: function(n, t, i, r) {
                    var l, u, h;
                    this.environment = n;
                    this.options = t;
                    this.stringParams = this.options.stringParams;
                    this.trackIds = this.options.trackIds;
                    this.precompile = !r;
                    this.name = this.environment.name;
                    this.isChild = !!i;
                    this.context = i || {
                        programs: [],
                        environments: []
                    };
                    this.preamble();
                    this.stackSlot = 0;
                    this.stackVars = [];
                    this.aliases = {};
                    this.registers = {
                        list: []
                    };
                    this.hashes = [];
                    this.compileStack = [];
                    this.inlineStack = [];
                    this.blockParams = [];
                    this.compileChildren(n, t);
                    this.useDepths = this.useDepths || n.useDepths || this.options.compat;
                    this.useBlockParams = this.useBlockParams || n.useBlockParams;
                    for (var a = n.opcodes, o = void 0, c = void 0, e = void 0, s = void 0, e = 0, s = a.length; s > e; e++) o = a[e], this.source.currentLocation = o.loc, c = c || o.loc, this[o.opcode].apply(this, o.args);
                    if (this.source.currentLocation = c, this.pushSource(""), this.stackSlot || this.inlineStack.length || this.compileStack.length) throw new f["default"]("Compile completed with content left on stack");
                    if (l = this.createFunctionContext(r), this.isChild) return l;
                    for (u = {
                            compiler: this.compilerInfo(),
                            main: l
                        }, h = this.context.programs, e = 0, s = h.length; s > e; e++) h[e] && (u[e] = h[e]);
                    return this.environment.usePartial && (u.usePartial = !0), this.options.data && (u.useData = !0), this.useDepths && (u.useDepths = !0), this.useBlockParams && (u.useBlockParams = !0), this.options.compat && (u.compat = !0), r ? u.compilerOptions = this.options : (u.compiler = JSON.stringify(u.compiler), this.source.currentLocation = {
                        start: {
                            line: 1,
                            column: 0
                        }
                    }, u = this.objectLiteral(u), t.srcName ? (u = u.toStringWithSourceMap({
                        file: t.destName
                    }), u.map = u.map && u.map.toString()) : u = u.toString()), u
                },
                preamble: function() {
                    this.lastContext = 0;
                    this.source = new a["default"](this.options.srcName)
                },
                createFunctionContext: function(n) {
                    var u = "",
                        o = this.stackVars.concat(this.registers.list),
                        f, i, r, t, e;
                    o.length > 0 && (u += ", " + o.join(", "));
                    f = 0;
                    for (i in this.aliases) r = this.aliases[i], this.aliases.hasOwnProperty(i) && r.children && r.referenceCount > 1 && (u += ", alias" + ++f + "=" + i, r.children[0] = "alias" + f);
                    return t = ["depth0", "helpers", "partials", "data"], (this.useBlockParams || this.useDepths) && t.push("blockParams"), this.useDepths && t.push("depths"), e = this.mergeSource(u), n ? (t.push(e), Function.apply(this, t)) : this.source.wrap(["function(", t.join(","), ") {\n  ", e, "}"])
                },
                mergeSource: function(n) {
                    var e = this.environment.isSimple,
                        f = !this.forceBuffer,
                        r = void 0,
                        u = void 0,
                        t = void 0,
                        i = void 0;
                    return this.source.each(function(n) {
                        n.appendToBuffer ? (t ? n.prepend("  + ") : t = n, i = n) : (t && (u ? t.prepend("buffer += ") : r = !0, i.add(";"), t = i = void 0), u = !0, e || (f = !1))
                    }), f ? t ? (t.prepend("return "), i.add(";")) : u || this.source.push('return "";') : (n += ", buffer = " + (r ? "" : this.initializeBuffer()), t ? (t.prepend("return buffer + "), i.add(";")) : this.source.push("return buffer;")), n && this.source.prepend("var " + n.substring(2) + (r ? "" : ";\n")), this.source.merge()
                },
                blockValue: function(n) {
                    var r = this.aliasable("helpers.blockHelperMissing"),
                        t = [this.contextName(0)],
                        i;
                    this.setupHelperArgs(n, 0, t);
                    i = this.popStack();
                    t.splice(1, 0, i);
                    this.push(this.source.functionCall(r, "call", t))
                },
                ambiguousBlockValue: function() {
                    var i = this.aliasable("helpers.blockHelperMissing"),
                        n = [this.contextName(0)],
                        t;
                    this.setupHelperArgs("", 0, n, !0);
                    this.flushInline();
                    t = this.topStack();
                    n.splice(1, 0, t);
                    this.pushSource(["if (!", this.lastHelper, ") { ", t, " = ", this.source.functionCall(i, "call", n), "}"])
                },
                appendContent: function(n) {
                    this.pendingContent ? n = this.pendingContent + n : this.pendingLocation = this.source.currentLocation;
                    this.pendingContent = n
                },
                append: function() {
                    if (this.isInline()) this.replaceStack(function(n) {
                        return [" != null ? ", n, ' : ""']
                    }), this.pushSource(this.appendToBuffer(this.popStack()));
                    else {
                        var n = this.popStack();
                        this.pushSource(["if (", n, " != null) { ", this.appendToBuffer(n, void 0, !0), " }"]);
                        this.environment.isSimple && this.pushSource(["else { ", this.appendToBuffer("''", void 0, !0), " }"])
                    }
                },
                appendEscaped: function() {
                    this.pushSource(this.appendToBuffer([this.aliasable("this.escapeExpression"), "(", this.popStack(), ")"]))
                },
                getContext: function(n) {
                    this.lastContext = n
                },
                pushContext: function() {
                    this.pushStackLiteral(this.contextName(this.lastContext))
                },
                lookupOnContext: function(n, t, i) {
                    var r = 0;
                    i || !this.options.compat || this.lastContext ? this.pushContext() : this.push(this.depthedLookup(n[r++]));
                    this.resolvePath("context", n, r, t)
                },
                lookupBlockParam: function(n, t) {
                    this.useBlockParams = !0;
                    this.push(["blockParams[", n[0], "][", n[1], "]"]);
                    this.resolvePath("context", t, 1)
                },
                lookupData: function(n, t) {
                    this.pushStackLiteral(n ? "this.data(data, " + n + ")" : "data");
                    this.resolvePath("data", t, 0, !0)
                },
                resolvePath: function(n, t, i, r) {
                    var f = this,
                        u;
                    if (this.options.strict || this.options.assumeObjects) return void this.push(s(this.options.strict, this, t, n));
                    for (u = t.length; u > i; i++) this.replaceStack(function(u) {
                        var e = f.nameLookup(u, t[i], n);
                        return r ? [" && ", e] : [" != null ? ", e, " : ", u]
                    })
                },
                resolvePossibleLambda: function() {
                    this.push([this.aliasable("this.lambda"), "(", this.popStack(), ", ", this.contextName(0), ")"])
                },
                pushStringParam: function(n, t) {
                    this.pushContext();
                    this.pushString(t);
                    "SubExpression" !== t && ("string" == typeof n ? this.pushString(n) : this.pushStackLiteral(n))
                },
                emptyHash: function(n) {
                    this.trackIds && this.push("{}");
                    this.stringParams && (this.push("{}"), this.push("{}"));
                    this.pushStackLiteral(n ? "undefined" : "{}")
                },
                pushHash: function() {
                    this.hash && this.hashes.push(this.hash);
                    this.hash = {
                        values: [],
                        types: [],
                        contexts: [],
                        ids: []
                    }
                },
                popHash: function() {
                    var n = this.hash;
                    this.hash = this.hashes.pop();
                    this.trackIds && this.push(this.objectLiteral(n.ids));
                    this.stringParams && (this.push(this.objectLiteral(n.contexts)), this.push(this.objectLiteral(n.types)));
                    this.push(this.objectLiteral(n.values))
                },
                pushString: function(n) {
                    this.pushStackLiteral(this.quotedString(n))
                },
                pushLiteral: function(n) {
                    this.pushStackLiteral(n)
                },
                pushProgram: function(n) {
                    this.pushStackLiteral(null != n ? this.programExpression(n) : null)
                },
                invokeHelper: function(n, t, i) {
                    var f = this.popStack(),
                        u = this.setupHelper(n, t),
                        e = i ? [u.name, " || "] : "",
                        r = ["("].concat(e, f);
                    this.options.strict || r.push(" || ", this.aliasable("helpers.helperMissing"));
                    r.push(")");
                    this.push(this.source.functionCall(r, "call", u.callParams))
                },
                invokeKnownHelper: function(n, t) {
                    var i = this.setupHelper(n, t);
                    this.push(this.source.functionCall(i.name, "call", i.callParams))
                },
                invokeAmbiguous: function(n, t) {
                    var u;
                    this.useRegister("helper");
                    u = this.popStack();
                    this.emptyHash();
                    var i = this.setupHelper(0, n, t),
                        f = this.lastHelper = this.nameLookup("helpers", n, "helper"),
                        r = ["(", "(helper = ", f, " || ", u, ")"];
                    this.options.strict || (r[0] = "(helper = ", r.push(" != null ? helper : ", this.aliasable("helpers.helperMissing")));
                    this.push(["(", r, i.paramsInit ? ["),(", i.paramsInit] : [], "),", "(typeof helper === ", this.aliasable('"function"'), " ? ", this.source.functionCall("helper", "call", i.callParams), " : helper))"])
                },
                invokePartial: function(n, t, i) {
                    var u = [],
                        r = this.setupParams(t, 1, u, !1);
                    n && (t = this.popStack(), delete r.name);
                    i && (r.indent = JSON.stringify(i));
                    r.helpers = "helpers";
                    r.partials = "partials";
                    u.unshift(n ? t : this.nameLookup("partials", t, "partial"));
                    this.options.compat && (r.depths = "depths");
                    r = this.objectLiteral(r);
                    u.push(r);
                    this.push(this.source.functionCall("this.invokePartial", "", u))
                },
                assignToHash: function(n) {
                    var f = this.popStack(),
                        i = void 0,
                        r = void 0,
                        u = void 0,
                        t;
                    this.trackIds && (u = this.popStack());
                    this.stringParams && (r = this.popStack(), i = this.popStack());
                    t = this.hash;
                    i && (t.contexts[n] = i);
                    r && (t.types[n] = r);
                    u && (t.ids[n] = u);
                    t.values[n] = f
                },
                pushId: function(n, t, i) {
                    "BlockParam" === n ? this.pushStackLiteral("blockParams[" + t[0] + "].path[" + t[1] + "]" + (i ? " + " + JSON.stringify("." + i) : "")) : "PathExpression" === n ? this.pushString(t) : this.pushStackLiteral("SubExpression" === n ? "true" : "null")
                },
                compiler: r,
                compileChildren: function(n, t) {
                    for (var r, e = n.children, i = void 0, u = void 0, f = 0, o = e.length; o > f; f++) i = e[f], u = new this.compiler, r = this.matchExistingProgram(i), null == r ? (this.context.programs.push(""), r = this.context.programs.length, i.index = r, i.name = "program" + r, this.context.programs[r] = u.compile(i, t, this.context, !this.precompile), this.context.environments[r] = i, this.useDepths = this.useDepths || u.useDepths, this.useBlockParams = this.useBlockParams || u.useBlockParams) : (i.index = r, i.name = "program" + r, this.useDepths = this.useDepths || i.useDepths, this.useBlockParams = this.useBlockParams || i.useBlockParams)
                },
                matchExistingProgram: function(n) {
                    for (var i, t = 0, r = this.context.environments.length; r > t; t++)
                        if (i = this.context.environments[t], i && i.equals(n)) return t
                },
                programExpression: function(n) {
                    var i = this.environment.children[n],
                        t = [i.index, "data", i.blockParams];
                    return (this.useBlockParams || this.useDepths) && t.push("blockParams"), this.useDepths && t.push("depths"), "this.program(" + t.join(", ") + ")"
                },
                useRegister: function(n) {
                    this.registers[n] || (this.registers[n] = !0, this.registers.list.push(n))
                },
                push: function(n) {
                    return n instanceof u || (n = this.source.wrap(n)), this.inlineStack.push(n), n
                },
                pushStackLiteral: function(n) {
                    this.push(new u(n))
                },
                pushSource: function(n) {
                    this.pendingContent && (this.source.push(this.appendToBuffer(this.source.quotedString(this.pendingContent), this.pendingLocation)), this.pendingContent = void 0);
                    n && this.source.push(n)
                },
                replaceStack: function(n) {
                    var r = ["("],
                        t = void 0,
                        e = void 0,
                        o = void 0,
                        i, s, h;
                    if (!this.isInline()) throw new f["default"]("replaceStack on non-inline");
                    i = this.popStack(!0);
                    i instanceof u ? (t = [i.value], r = ["(", t], o = !0) : (e = !0, s = this.incrStack(), r = ["((", this.push(s), " = ", i, ")"], t = this.topStack());
                    h = n.call(this, t);
                    o || this.popStack();
                    e && this.stackSlot--;
                    this.push(r.concat(h, ")"))
                },
                incrStack: function() {
                    return this.stackSlot++, this.stackSlot > this.stackVars.length && this.stackVars.push("stack" + this.stackSlot), this.topStackName()
                },
                topStackName: function() {
                    return "stack" + this.stackSlot
                },
                flushInline: function() {
                    var r = this.inlineStack,
                        n, f, t, i;
                    for (this.inlineStack = [], n = 0, f = r.length; f > n; n++) t = r[n], t instanceof u ? this.compileStack.push(t) : (i = this.incrStack(), this.pushSource([i, " = ", t, ";"]), this.compileStack.push(i))
                },
                isInline: function() {
                    return this.inlineStack.length
                },
                popStack: function(n) {
                    var i = this.isInline(),
                        t = (i ? this.inlineStack : this.compileStack).pop();
                    if (!n && t instanceof u) return t.value;
                    if (!i) {
                        if (!this.stackSlot) throw new f["default"]("Invalid stack pop");
                        this.stackSlot--
                    }
                    return t
                },
                topStack: function() {
                    var t = this.isInline() ? this.inlineStack : this.compileStack,
                        n = t[t.length - 1];
                    return n instanceof u ? n.value : n
                },
                contextName: function(n) {
                    return this.useDepths && n ? "depths[" + n + "]" : "depth" + n
                },
                quotedString: function(n) {
                    return this.source.quotedString(n)
                },
                objectLiteral: function(n) {
                    return this.source.objectLiteral(n)
                },
                aliasable: function(n) {
                    var t = this.aliases[n];
                    return t ? (t.referenceCount++, t) : (t = this.aliases[n] = this.source.wrap(n), t.aliasable = !0, t.referenceCount = 1, t)
                },
                setupHelper: function(n, t, i) {
                    var r = [],
                        u = this.setupHelperArgs(t, n, r, i),
                        f = this.nameLookup("helpers", t, "helper");
                    return {
                        params: r,
                        paramsInit: u,
                        name: f,
                        callParams: [this.contextName(0)].concat(r)
                    }
                },
                setupParams: function(n, t, i) {
                    var r = {},
                        o = [],
                        s = [],
                        h = [],
                        c = void 0,
                        f, e, u;
                    for (r.name = this.quotedString(n), r.hash = this.popStack(), this.trackIds && (r.hashIds = this.popStack()), this.stringParams && (r.hashTypes = this.popStack(), r.hashContexts = this.popStack()), f = this.popStack(), e = this.popStack(), (e || f) && (r.fn = e || "this.noop", r.inverse = f || "this.noop"), u = t; u--;) c = this.popStack(), i[u] = c, this.trackIds && (h[u] = this.popStack()), this.stringParams && (s[u] = this.popStack(), o[u] = this.popStack());
                    return this.trackIds && (r.ids = this.source.generateArray(h)), this.stringParams && (r.types = this.source.generateArray(s), r.contexts = this.source.generateArray(o)), this.options.data && (r.data = "data"), this.useBlockParams && (r.blockParams = "blockParams"), r
                },
                setupHelperArgs: function(n, t, i, r) {
                    var u = this.setupParams(n, t, i, !0);
                    return u = this.objectLiteral(u), r ? (this.useRegister("options"), i.push("options"), ["options=", u]) : (i.push(u), "")
                }
            },
            function() {
                for (var t = "break else new var case finally return void catch for switch while continue function this with default if throw delete in try do instanceof typeof abstract enum int short boolean export interface static byte extends long super char final native synchronized class float package throws const goto private transient debugger implements protected volatile double import public let yield await null true false".split(" "), i = r.RESERVED_WORDS = {}, n = 0, u = t.length; u > n; n++) i[t[n]] = !0
            }();
        r.isValidJavaScriptVariableName = function(n) {
            return !r.RESERVED_WORDS[n] && /^[a-zA-Z_$][0-9a-zA-Z_$]*$/.test(n)
        };
        t["default"] = r;
        n.exports = t["default"]
    }, function(n, t, i) {
        "use strict";

        function r() {
            this.parents = []
        }
        var u = i(8)["default"];
        t.__esModule = !0;
        var e = i(11),
            f = u(e),
            o = i(2),
            s = u(o);
        r.prototype = {
            constructor: r,
            mutating: !1,
            acceptKey: function(n, t) {
                var i = this.accept(n[t]);
                if (this.mutating) {
                    if (i && (!i.type || !s["default"][i.type])) throw new f["default"]('Unexpected node type "' + i.type + '" found when accepting ' + t + " on " + n.type);
                    n[t] = i
                }
            },
            acceptRequired: function(n, t) {
                if (this.acceptKey(n, t), !n[t]) throw new f["default"](n.type + " requires " + t);
            },
            acceptArray: function(n) {
                for (var t = 0, i = n.length; i > t; t++) this.acceptKey(n, t), n[t] || (n.splice(t, 1), t--, i--)
            },
            accept: function(n) {
                if (n) {
                    this.current && this.parents.unshift(this.current);
                    this.current = n;
                    var t = this[n.type](n);
                    return this.current = this.parents.shift(), !this.mutating || t ? t : t !== !1 ? n : void 0
                }
            },
            Program: function(n) {
                this.acceptArray(n.body)
            },
            MustacheStatement: function(n) {
                this.acceptRequired(n, "path");
                this.acceptArray(n.params);
                this.acceptKey(n, "hash")
            },
            BlockStatement: function(n) {
                this.acceptRequired(n, "path");
                this.acceptArray(n.params);
                this.acceptKey(n, "hash");
                this.acceptKey(n, "program");
                this.acceptKey(n, "inverse")
            },
            PartialStatement: function(n) {
                this.acceptRequired(n, "name");
                this.acceptArray(n.params);
                this.acceptKey(n, "hash")
            },
            ContentStatement: function() {},
            CommentStatement: function() {},
            SubExpression: function(n) {
                this.acceptRequired(n, "path");
                this.acceptArray(n.params);
                this.acceptKey(n, "hash")
            },
            PathExpression: function() {},
            StringLiteral: function() {},
            NumberLiteral: function() {},
            BooleanLiteral: function() {},
            UndefinedLiteral: function() {},
            NullLiteral: function() {},
            Hash: function(n) {
                this.acceptArray(n.pairs)
            },
            HashPair: function(n) {
                this.acceptRequired(n, "value")
            }
        };
        t["default"] = r;
        n.exports = t["default"]
    }, function(n, t) {
        (function(i) {
            "use strict";
            t.__esModule = !0;
            t["default"] = function(n) {
                var t = "undefined" != typeof i ? i : window,
                    r = t.Handlebars;
                n.noConflict = function() {
                    t.Handlebars === n && (t.Handlebars = r)
                }
            };
            n.exports = t["default"]
        }).call(t, function() {
            return this
        }())
    }, function(n, t) {
        "use strict";
        t["default"] = function(n) {
            return n && n.__esModule ? n : {
                "default": n
            }
        };
        t.__esModule = !0
    }, function(n, t, i) {
        "use strict";

        function o(n, t) {
            this.helpers = n || {};
            this.partials = t || {};
            w(this)
        }

        function w(n) {
            n.registerHelper("helperMissing", function() {
                if (1 === arguments.length) return void 0;
                throw new e["default"]('Missing helper: "' + arguments[arguments.length - 1].name + '"');
            });
            n.registerHelper("blockHelperMissing", function(t, i) {
                var e = i.inverse,
                    o = i.fn,
                    u;
                return t === !0 ? o(this) : t === !1 || null == t ? e(this) : v(t) ? t.length > 0 ? (i.ids && (i.ids = [i.name]), n.helpers.each(t, i)) : e(this) : (i.data && i.ids && (u = f(i.data), u.contextPath = r.appendContextPath(i.data.contextPath, i.name), i = {
                    data: u
                }), o(t, i))
            });
            n.registerHelper("each", function(n, t) {
                function c(t, i, f) {
                    u && (u.key = t, u.index = i, u.first = 0 === i, u.last = !!f, h && (u.contextPath = h + t));
                    l += p(n[t], {
                        data: u,
                        blockParams: r.blockParams([n[t], t], [h + t, null])
                    })
                }
                var y, o, a;
                if (!t) throw new e["default"]("Must pass iterator to #each");
                var p = t.fn,
                    w = t.inverse,
                    i = 0,
                    l = "",
                    u = void 0,
                    h = void 0;
                if (t.data && t.ids && (h = r.appendContextPath(t.data.contextPath, t.ids[0]) + "."), s(n) && (n = n.call(this)), t.data && (u = f(t.data)), n && "object" == typeof n)
                    if (v(n))
                        for (y = n.length; y > i; i++) c(i, i, i === n.length - 1);
                    else {
                        o = void 0;
                        for (a in n) n.hasOwnProperty(a) && (o && c(o, i - 1), o = a, i++);
                        o && c(o, i - 1, !0)
                    }
                return 0 === i && (l = w(this)), l
            });
            n.registerHelper("if", function(n, t) {
                return s(n) && (n = n.call(this)), !t.hash.includeZero && !n || r.isEmpty(n) ? t.inverse(this) : t.fn(this)
            });
            n.registerHelper("unless", function(t, i) {
                return n.helpers["if"].call(this, t, {
                    fn: i.inverse,
                    inverse: i.fn,
                    hash: i.hash
                })
            });
            n.registerHelper("with", function(n, t) {
                var u, i;
                return (s(n) && (n = n.call(this)), u = t.fn, r.isEmpty(n)) ? t.inverse(this) : (t.data && t.ids && (i = f(t.data), i.contextPath = r.appendContextPath(t.data.contextPath, t.ids[0]), t = {
                    data: i
                }), u(n, t))
            });
            n.registerHelper("log", function(t, i) {
                var r = i.data && null != i.data.level ? parseInt(i.data.level, 10) : 1;
                n.log(r, t)
            });
            n.registerHelper("lookup", function(n, t) {
                return n && n[t]
            })
        }

        function f(n) {
            var t = r.extend({}, n);
            return t._parent = n, t
        }
        var c = i(8)["default"],
            l, a, u, h;
        t.__esModule = !0;
        t.HandlebarsEnvironment = o;
        t.createFrame = f;
        var b = i(12),
            r = c(b),
            k = i(11),
            e = c(k);
        t.VERSION = "3.0.1";
        l = 6;
        t.COMPILER_REVISION = l;
        a = {
            1: "<= 1.0.rc.2",
            2: "== 1.0.0-rc.3",
            3: "== 1.0.0-rc.4",
            4: "== 1.x.x",
            5: "== 2.0.0-alpha.x",
            6: ">= 2.0.0-beta.1"
        };
        t.REVISION_CHANGES = a;
        var v = r.isArray,
            s = r.isFunction,
            y = r.toString,
            p = "[object Object]";
        o.prototype = {
            constructor: o,
            logger: u,
            log: h,
            registerHelper: function(n, t) {
                if (y.call(n) === p) {
                    if (t) throw new e["default"]("Arg not supported with multiple helpers");
                    r.extend(this.helpers, n)
                } else this.helpers[n] = t
            },
            unregisterHelper: function(n) {
                delete this.helpers[n]
            },
            registerPartial: function(n, t) {
                if (y.call(n) === p) r.extend(this.partials, n);
                else {
                    if ("undefined" == typeof t) throw new e["default"]("Attempting to register a partial as undefined");
                    this.partials[n] = t
                }
            },
            unregisterPartial: function(n) {
                delete this.partials[n]
            }
        };
        u = {
            methodMap: {
                0: "debug",
                1: "info",
                2: "warn",
                3: "error"
            },
            DEBUG: 0,
            INFO: 1,
            WARN: 2,
            ERROR: 3,
            level: 1,
            log: function(n, t) {
                if ("undefined" != typeof console && u.level <= n) {
                    var i = u.methodMap[n];
                    (console[i] || console.log).call(console, t)
                }
            }
        };
        t.logger = u;
        h = u.log;
        t.log = h
    }, function(n, t) {
        "use strict";

        function i(n) {
            this.string = n
        }
        t.__esModule = !0;
        i.prototype.toString = i.prototype.toHTML = function() {
            return "" + this.string
        };
        t["default"] = i;
        n.exports = t["default"]
    }, function(n, t) {
        "use strict";

        function i(n, t) {
            var f = t && t.loc,
                e = void 0,
                o = void 0,
                s, u;
            for (f && (e = f.start.line, o = f.start.column, n += " - " + e + ":" + o), s = Error.prototype.constructor.call(this, n), u = 0; u < r.length; u++) this[r[u]] = s[r[u]];
            Error.captureStackTrace && Error.captureStackTrace(this, i);
            f && (this.lineNumber = e, this.column = o)
        }
        t.__esModule = !0;
        var r = ["description", "fileName", "lineNumber", "message", "name", "number", "stack"];
        i.prototype = new Error;
        t["default"] = i;
        n.exports = t["default"]
    }, function(n, t) {
        "use strict";

        function f(n) {
            return a[n]
        }

        function e(n) {
            for (var i, t = 1; t < arguments.length; t++)
                for (i in arguments[t]) Object.prototype.hasOwnProperty.call(arguments[t], i) && (n[i] = arguments[t][i]);
            return n
        }

        function o(n, t) {
            for (var i = 0, r = n.length; r > i; i++)
                if (n[i] === t) return i;
            return -1
        }

        function s(n) {
            if ("string" != typeof n) {
                if (n && n.toHTML) return n.toHTML();
                if (null == n) return "";
                if (!n) return n + "";
                n = "" + n
            }
            return y.test(n) ? n.replace(v, f) : n
        }

        function h(n) {
            return n || 0 === n ? u(n) && 0 === n.length ? !0 : !1 : !0
        }

        function c(n, t) {
            return n.path = t, n
        }

        function l(n, t) {
            return (n ? n + "." : "") + t
        }
        var i, u;
        t.__esModule = !0;
        t.extend = e;
        t.indexOf = o;
        t.escapeExpression = s;
        t.isEmpty = h;
        t.blockParams = c;
        t.appendContextPath = l;
        var a = {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#x27;",
                "`": "&#x60;"
            },
            v = /[&<>"'`]/g,
            y = /[&<>"'`]/,
            r = Object.prototype.toString;
        t.toString = r;
        i = function(n) {
            return "function" == typeof n
        };
        i(/x/) && (t.isFunction = i = function(n) {
            return "function" == typeof n && "[object Function]" === r.call(n)
        });
        t.isFunction = i;
        u = Array.isArray || function(n) {
            return n && "object" == typeof n ? "[object Array]" === r.call(n) : !1
        };
        t.isArray = u
    }, function(n, t, i) {
        "use strict";

        function s(n) {
            var t = n && n[0] || 1,
                i = f.COMPILER_REVISION,
                u, e;
            if (t !== i) {
                if (i > t) {
                    u = f.REVISION_CHANGES[i];
                    e = f.REVISION_CHANGES[t];
                    throw new r["default"]("Template was precompiled with an older version of Handlebars than the current runtime. Please update your precompiler to a newer version (" + u + ") or downgrade your runtime to an older version (" + e + ").");
                }
                throw new r["default"]("Template was precompiled with a newer version of Handlebars than the current runtime. Please update your runtime to a newer version (" + n[1] + ").");
            }
        }

        function h(n, t) {
            function o(i, u, f) {
                var o;
                if (f.hash && (u = e.extend({}, u, f.hash)), i = t.VM.resolvePartial.call(this, i, u, f), o = t.VM.invokePartial.call(this, i, u, f), null == o && t.compile && (f.partials[f.name] = t.compile(i, n.compilerOptions, t), o = f.partials[f.name](u, f)), null != o) {
                    if (f.indent) {
                        for (var h = o.split("\n"), s = 0, c = h.length; c > s && (h[s] || s + 1 !== c); s++) h[s] = f.indent + h[s];
                        o = h.join("\n")
                    }
                    return o
                }
                throw new r["default"]("The partial " + f.name + " could not be compiled when running in runtime-only mode");
            }

            function f(t) {
                var r = void 0 === arguments[1] ? {} : arguments[1],
                    u = r.data,
                    e, o;
                return f._setup(r), !r.partial && n.useData && (u = v(t, u)), e = void 0, o = n.useBlockParams ? [] : void 0, n.useDepths && (e = r.depths ? [t].concat(r.depths) : [t]), n.main.call(i, t, i.helpers, i.partials, u, o, e)
            }
            if (!t) throw new r["default"]("No environment passed to template");
            if (!n || !n.main) throw new r["default"]("Unknown template object: " + typeof n);
            t.VM.checkRevision(n.compiler);
            var i = {
                strict: function(n, t) {
                    if (!(t in n)) throw new r["default"]('"' + t + '" not defined in ' + n);
                    return n[t]
                },
                lookup: function(n, t) {
                    for (var r = n.length, i = 0; r > i; i++)
                        if (n[i] && null != n[i][t]) return n[i][t]
                },
                lambda: function(n, t) {
                    return "function" == typeof n ? n.call(t) : n
                },
                escapeExpression: e.escapeExpression,
                invokePartial: o,
                fn: function(t) {
                    return n[t]
                },
                programs: [],
                program: function(n, t, i, r, f) {
                    var e = this.programs[n],
                        o = this.fn(n);
                    return t || f || r || i ? e = u(this, n, o, t, i, r, f) : e || (e = this.programs[n] = u(this, n, o)), e
                },
                data: function(n, t) {
                    for (; n && t--;) n = n._parent;
                    return n
                },
                merge: function(n, t) {
                    var i = n || t;
                    return n && t && n !== t && (i = e.extend({}, t, n)), i
                },
                noop: t.VM.noop,
                compilerInfo: n.compiler
            };
            return f.isTop = !0, f._setup = function(r) {
                r.partial ? (i.helpers = r.helpers, i.partials = r.partials) : (i.helpers = i.merge(r.helpers, t.helpers), n.usePartial && (i.partials = i.merge(r.partials, t.partials)))
            }, f._child = function(t, f, e, o) {
                if (n.useBlockParams && !e) throw new r["default"]("must pass block params");
                if (n.useDepths && !o) throw new r["default"]("must pass parent depths");
                return u(i, t, n[t], f, 0, e, o)
            }, f
        }

        function u(n, t, i, r, u, f, e) {
            function o(t) {
                var u = void 0 === arguments[1] ? {} : arguments[1];
                return i.call(n, t, n.helpers, n.partials, u.data || r, f && [u.blockParams].concat(f), e && [t].concat(e))
            }
            return o.program = t, o.depth = e ? e.length : 0, o.blockParams = u || 0, o
        }

        function c(n, t, i) {
            return n ? n.call || i.name || (i.name = n, n = i.partials[n]) : n = i.partials[i.name], n
        }

        function l(n, t, i) {
            if (i.partial = !0, void 0 === n) throw new r["default"]("The partial " + i.name + " could not be found");
            if (n instanceof Function) return n(t, i)
        }

        function a() {
            return ""
        }

        function v(n, t) {
            return t && "root" in t || (t = t ? f.createFrame(t) : {}, t.root = n), t
        }
        var o = i(8)["default"];
        t.__esModule = !0;
        t.checkRevision = s;
        t.template = h;
        t.wrapProgram = u;
        t.resolvePartial = c;
        t.invokePartial = l;
        t.noop = a;
        var y = i(12),
            e = o(y),
            p = i(11),
            r = o(p),
            f = i(9)
    }, function(n, t) {
        "use strict";
        t.__esModule = !0;
        var i = function() {
            function n() {
                this.yy = {}
            }
            var t = {
                    trace: function() {},
                    yy: {},
                    symbols_: {
                        error: 2,
                        root: 3,
                        program: 4,
                        EOF: 5,
                        program_repetition0: 6,
                        statement: 7,
                        mustache: 8,
                        block: 9,
                        rawBlock: 10,
                        partial: 11,
                        content: 12,
                        COMMENT: 13,
                        CONTENT: 14,
                        openRawBlock: 15,
                        END_RAW_BLOCK: 16,
                        OPEN_RAW_BLOCK: 17,
                        helperName: 18,
                        openRawBlock_repetition0: 19,
                        openRawBlock_option0: 20,
                        CLOSE_RAW_BLOCK: 21,
                        openBlock: 22,
                        block_option0: 23,
                        closeBlock: 24,
                        openInverse: 25,
                        block_option1: 26,
                        OPEN_BLOCK: 27,
                        openBlock_repetition0: 28,
                        openBlock_option0: 29,
                        openBlock_option1: 30,
                        CLOSE: 31,
                        OPEN_INVERSE: 32,
                        openInverse_repetition0: 33,
                        openInverse_option0: 34,
                        openInverse_option1: 35,
                        openInverseChain: 36,
                        OPEN_INVERSE_CHAIN: 37,
                        openInverseChain_repetition0: 38,
                        openInverseChain_option0: 39,
                        openInverseChain_option1: 40,
                        inverseAndProgram: 41,
                        INVERSE: 42,
                        inverseChain: 43,
                        inverseChain_option0: 44,
                        OPEN_ENDBLOCK: 45,
                        OPEN: 46,
                        mustache_repetition0: 47,
                        mustache_option0: 48,
                        OPEN_UNESCAPED: 49,
                        mustache_repetition1: 50,
                        mustache_option1: 51,
                        CLOSE_UNESCAPED: 52,
                        OPEN_PARTIAL: 53,
                        partialName: 54,
                        partial_repetition0: 55,
                        partial_option0: 56,
                        param: 57,
                        sexpr: 58,
                        OPEN_SEXPR: 59,
                        sexpr_repetition0: 60,
                        sexpr_option0: 61,
                        CLOSE_SEXPR: 62,
                        hash: 63,
                        hash_repetition_plus0: 64,
                        hashSegment: 65,
                        ID: 66,
                        EQUALS: 67,
                        blockParams: 68,
                        OPEN_BLOCK_PARAMS: 69,
                        blockParams_repetition_plus0: 70,
                        CLOSE_BLOCK_PARAMS: 71,
                        path: 72,
                        dataName: 73,
                        STRING: 74,
                        NUMBER: 75,
                        BOOLEAN: 76,
                        UNDEFINED: 77,
                        NULL: 78,
                        DATA: 79,
                        pathSegments: 80,
                        SEP: 81,
                        $accept: 0,
                        $end: 1
                    },
                    terminals_: {
                        2: "error",
                        5: "EOF",
                        13: "COMMENT",
                        14: "CONTENT",
                        16: "END_RAW_BLOCK",
                        17: "OPEN_RAW_BLOCK",
                        21: "CLOSE_RAW_BLOCK",
                        27: "OPEN_BLOCK",
                        31: "CLOSE",
                        32: "OPEN_INVERSE",
                        37: "OPEN_INVERSE_CHAIN",
                        42: "INVERSE",
                        45: "OPEN_ENDBLOCK",
                        46: "OPEN",
                        49: "OPEN_UNESCAPED",
                        52: "CLOSE_UNESCAPED",
                        53: "OPEN_PARTIAL",
                        59: "OPEN_SEXPR",
                        62: "CLOSE_SEXPR",
                        66: "ID",
                        67: "EQUALS",
                        69: "OPEN_BLOCK_PARAMS",
                        71: "CLOSE_BLOCK_PARAMS",
                        74: "STRING",
                        75: "NUMBER",
                        76: "BOOLEAN",
                        77: "UNDEFINED",
                        78: "NULL",
                        79: "DATA",
                        81: "SEP"
                    },
                    productions_: [0, [3, 2],
                        [4, 1],
                        [7, 1],
                        [7, 1],
                        [7, 1],
                        [7, 1],
                        [7, 1],
                        [7, 1],
                        [12, 1],
                        [10, 3],
                        [15, 5],
                        [9, 4],
                        [9, 4],
                        [22, 6],
                        [25, 6],
                        [36, 6],
                        [41, 2],
                        [43, 3],
                        [43, 1],
                        [24, 3],
                        [8, 5],
                        [8, 5],
                        [11, 5],
                        [57, 1],
                        [57, 1],
                        [58, 5],
                        [63, 1],
                        [65, 3],
                        [68, 3],
                        [18, 1],
                        [18, 1],
                        [18, 1],
                        [18, 1],
                        [18, 1],
                        [18, 1],
                        [18, 1],
                        [54, 1],
                        [54, 1],
                        [73, 2],
                        [72, 1],
                        [80, 3],
                        [80, 1],
                        [6, 0],
                        [6, 2],
                        [19, 0],
                        [19, 2],
                        [20, 0],
                        [20, 1],
                        [23, 0],
                        [23, 1],
                        [26, 0],
                        [26, 1],
                        [28, 0],
                        [28, 2],
                        [29, 0],
                        [29, 1],
                        [30, 0],
                        [30, 1],
                        [33, 0],
                        [33, 2],
                        [34, 0],
                        [34, 1],
                        [35, 0],
                        [35, 1],
                        [38, 0],
                        [38, 2],
                        [39, 0],
                        [39, 1],
                        [40, 0],
                        [40, 1],
                        [44, 0],
                        [44, 1],
                        [47, 0],
                        [47, 2],
                        [48, 0],
                        [48, 1],
                        [50, 0],
                        [50, 2],
                        [51, 0],
                        [51, 1],
                        [55, 0],
                        [55, 2],
                        [56, 0],
                        [56, 1],
                        [60, 0],
                        [60, 2],
                        [61, 0],
                        [61, 1],
                        [64, 1],
                        [64, 2],
                        [70, 1],
                        [70, 2]
                    ],
                    performAction: function(n, t, i, r, u, f) {
                        var e = f.length - 1,
                            s, o;
                        switch (u) {
                            case 1:
                                return f[e - 1];
                            case 2:
                                this.$ = new r.Program(f[e], null, {}, r.locInfo(this._$));
                                break;
                            case 3:
                                this.$ = f[e];
                                break;
                            case 4:
                                this.$ = f[e];
                                break;
                            case 5:
                                this.$ = f[e];
                                break;
                            case 6:
                                this.$ = f[e];
                                break;
                            case 7:
                                this.$ = f[e];
                                break;
                            case 8:
                                this.$ = new r.CommentStatement(r.stripComment(f[e]), r.stripFlags(f[e], f[e]), r.locInfo(this._$));
                                break;
                            case 9:
                                this.$ = new r.ContentStatement(f[e], r.locInfo(this._$));
                                break;
                            case 10:
                                this.$ = r.prepareRawBlock(f[e - 2], f[e - 1], f[e], this._$);
                                break;
                            case 11:
                                this.$ = {
                                    path: f[e - 3],
                                    params: f[e - 2],
                                    hash: f[e - 1]
                                };
                                break;
                            case 12:
                                this.$ = r.prepareBlock(f[e - 3], f[e - 2], f[e - 1], f[e], !1, this._$);
                                break;
                            case 13:
                                this.$ = r.prepareBlock(f[e - 3], f[e - 2], f[e - 1], f[e], !0, this._$);
                                break;
                            case 14:
                                this.$ = {
                                    path: f[e - 4],
                                    params: f[e - 3],
                                    hash: f[e - 2],
                                    blockParams: f[e - 1],
                                    strip: r.stripFlags(f[e - 5], f[e])
                                };
                                break;
                            case 15:
                                this.$ = {
                                    path: f[e - 4],
                                    params: f[e - 3],
                                    hash: f[e - 2],
                                    blockParams: f[e - 1],
                                    strip: r.stripFlags(f[e - 5], f[e])
                                };
                                break;
                            case 16:
                                this.$ = {
                                    path: f[e - 4],
                                    params: f[e - 3],
                                    hash: f[e - 2],
                                    blockParams: f[e - 1],
                                    strip: r.stripFlags(f[e - 5], f[e])
                                };
                                break;
                            case 17:
                                this.$ = {
                                    strip: r.stripFlags(f[e - 1], f[e - 1]),
                                    program: f[e]
                                };
                                break;
                            case 18:
                                s = r.prepareBlock(f[e - 2], f[e - 1], f[e], f[e], !1, this._$);
                                o = new r.Program([s], null, {}, r.locInfo(this._$));
                                o.chained = !0;
                                this.$ = {
                                    strip: f[e - 2].strip,
                                    program: o,
                                    chain: !0
                                };
                                break;
                            case 19:
                                this.$ = f[e];
                                break;
                            case 20:
                                this.$ = {
                                    path: f[e - 1],
                                    strip: r.stripFlags(f[e - 2], f[e])
                                };
                                break;
                            case 21:
                                this.$ = r.prepareMustache(f[e - 3], f[e - 2], f[e - 1], f[e - 4], r.stripFlags(f[e - 4], f[e]), this._$);
                                break;
                            case 22:
                                this.$ = r.prepareMustache(f[e - 3], f[e - 2], f[e - 1], f[e - 4], r.stripFlags(f[e - 4], f[e]), this._$);
                                break;
                            case 23:
                                this.$ = new r.PartialStatement(f[e - 3], f[e - 2], f[e - 1], r.stripFlags(f[e - 4], f[e]), r.locInfo(this._$));
                                break;
                            case 24:
                                this.$ = f[e];
                                break;
                            case 25:
                                this.$ = f[e];
                                break;
                            case 26:
                                this.$ = new r.SubExpression(f[e - 3], f[e - 2], f[e - 1], r.locInfo(this._$));
                                break;
                            case 27:
                                this.$ = new r.Hash(f[e], r.locInfo(this._$));
                                break;
                            case 28:
                                this.$ = new r.HashPair(r.id(f[e - 2]), f[e], r.locInfo(this._$));
                                break;
                            case 29:
                                this.$ = r.id(f[e - 1]);
                                break;
                            case 30:
                                this.$ = f[e];
                                break;
                            case 31:
                                this.$ = f[e];
                                break;
                            case 32:
                                this.$ = new r.StringLiteral(f[e], r.locInfo(this._$));
                                break;
                            case 33:
                                this.$ = new r.NumberLiteral(f[e], r.locInfo(this._$));
                                break;
                            case 34:
                                this.$ = new r.BooleanLiteral(f[e], r.locInfo(this._$));
                                break;
                            case 35:
                                this.$ = new r.UndefinedLiteral(r.locInfo(this._$));
                                break;
                            case 36:
                                this.$ = new r.NullLiteral(r.locInfo(this._$));
                                break;
                            case 37:
                                this.$ = f[e];
                                break;
                            case 38:
                                this.$ = f[e];
                                break;
                            case 39:
                                this.$ = r.preparePath(!0, f[e], this._$);
                                break;
                            case 40:
                                this.$ = r.preparePath(!1, f[e], this._$);
                                break;
                            case 41:
                                f[e - 2].push({
                                    part: r.id(f[e]),
                                    original: f[e],
                                    separator: f[e - 1]
                                });
                                this.$ = f[e - 2];
                                break;
                            case 42:
                                this.$ = [{
                                    part: r.id(f[e]),
                                    original: f[e]
                                }];
                                break;
                            case 43:
                                this.$ = [];
                                break;
                            case 44:
                                f[e - 1].push(f[e]);
                                break;
                            case 45:
                                this.$ = [];
                                break;
                            case 46:
                                f[e - 1].push(f[e]);
                                break;
                            case 53:
                                this.$ = [];
                                break;
                            case 54:
                                f[e - 1].push(f[e]);
                                break;
                            case 59:
                                this.$ = [];
                                break;
                            case 60:
                                f[e - 1].push(f[e]);
                                break;
                            case 65:
                                this.$ = [];
                                break;
                            case 66:
                                f[e - 1].push(f[e]);
                                break;
                            case 73:
                                this.$ = [];
                                break;
                            case 74:
                                f[e - 1].push(f[e]);
                                break;
                            case 77:
                                this.$ = [];
                                break;
                            case 78:
                                f[e - 1].push(f[e]);
                                break;
                            case 81:
                                this.$ = [];
                                break;
                            case 82:
                                f[e - 1].push(f[e]);
                                break;
                            case 85:
                                this.$ = [];
                                break;
                            case 86:
                                f[e - 1].push(f[e]);
                                break;
                            case 89:
                                this.$ = [f[e]];
                                break;
                            case 90:
                                f[e - 1].push(f[e]);
                                break;
                            case 91:
                                this.$ = [f[e]];
                                break;
                            case 92:
                                f[e - 1].push(f[e])
                        }
                    },
                    table: [{
                        3: 1,
                        4: 2,
                        5: [2, 43],
                        6: 3,
                        13: [2, 43],
                        14: [2, 43],
                        17: [2, 43],
                        27: [2, 43],
                        32: [2, 43],
                        46: [2, 43],
                        49: [2, 43],
                        53: [2, 43]
                    }, {
                        1: [3]
                    }, {
                        5: [1, 4]
                    }, {
                        5: [2, 2],
                        7: 5,
                        8: 6,
                        9: 7,
                        10: 8,
                        11: 9,
                        12: 10,
                        13: [1, 11],
                        14: [1, 18],
                        15: 16,
                        17: [1, 21],
                        22: 14,
                        25: 15,
                        27: [1, 19],
                        32: [1, 20],
                        37: [2, 2],
                        42: [2, 2],
                        45: [2, 2],
                        46: [1, 12],
                        49: [1, 13],
                        53: [1, 17]
                    }, {
                        1: [2, 1]
                    }, {
                        5: [2, 44],
                        13: [2, 44],
                        14: [2, 44],
                        17: [2, 44],
                        27: [2, 44],
                        32: [2, 44],
                        37: [2, 44],
                        42: [2, 44],
                        45: [2, 44],
                        46: [2, 44],
                        49: [2, 44],
                        53: [2, 44]
                    }, {
                        5: [2, 3],
                        13: [2, 3],
                        14: [2, 3],
                        17: [2, 3],
                        27: [2, 3],
                        32: [2, 3],
                        37: [2, 3],
                        42: [2, 3],
                        45: [2, 3],
                        46: [2, 3],
                        49: [2, 3],
                        53: [2, 3]
                    }, {
                        5: [2, 4],
                        13: [2, 4],
                        14: [2, 4],
                        17: [2, 4],
                        27: [2, 4],
                        32: [2, 4],
                        37: [2, 4],
                        42: [2, 4],
                        45: [2, 4],
                        46: [2, 4],
                        49: [2, 4],
                        53: [2, 4]
                    }, {
                        5: [2, 5],
                        13: [2, 5],
                        14: [2, 5],
                        17: [2, 5],
                        27: [2, 5],
                        32: [2, 5],
                        37: [2, 5],
                        42: [2, 5],
                        45: [2, 5],
                        46: [2, 5],
                        49: [2, 5],
                        53: [2, 5]
                    }, {
                        5: [2, 6],
                        13: [2, 6],
                        14: [2, 6],
                        17: [2, 6],
                        27: [2, 6],
                        32: [2, 6],
                        37: [2, 6],
                        42: [2, 6],
                        45: [2, 6],
                        46: [2, 6],
                        49: [2, 6],
                        53: [2, 6]
                    }, {
                        5: [2, 7],
                        13: [2, 7],
                        14: [2, 7],
                        17: [2, 7],
                        27: [2, 7],
                        32: [2, 7],
                        37: [2, 7],
                        42: [2, 7],
                        45: [2, 7],
                        46: [2, 7],
                        49: [2, 7],
                        53: [2, 7]
                    }, {
                        5: [2, 8],
                        13: [2, 8],
                        14: [2, 8],
                        17: [2, 8],
                        27: [2, 8],
                        32: [2, 8],
                        37: [2, 8],
                        42: [2, 8],
                        45: [2, 8],
                        46: [2, 8],
                        49: [2, 8],
                        53: [2, 8]
                    }, {
                        18: 22,
                        66: [1, 32],
                        72: 23,
                        73: 24,
                        74: [1, 25],
                        75: [1, 26],
                        76: [1, 27],
                        77: [1, 28],
                        78: [1, 29],
                        79: [1, 31],
                        80: 30
                    }, {
                        18: 33,
                        66: [1, 32],
                        72: 23,
                        73: 24,
                        74: [1, 25],
                        75: [1, 26],
                        76: [1, 27],
                        77: [1, 28],
                        78: [1, 29],
                        79: [1, 31],
                        80: 30
                    }, {
                        4: 34,
                        6: 3,
                        13: [2, 43],
                        14: [2, 43],
                        17: [2, 43],
                        27: [2, 43],
                        32: [2, 43],
                        37: [2, 43],
                        42: [2, 43],
                        45: [2, 43],
                        46: [2, 43],
                        49: [2, 43],
                        53: [2, 43]
                    }, {
                        4: 35,
                        6: 3,
                        13: [2, 43],
                        14: [2, 43],
                        17: [2, 43],
                        27: [2, 43],
                        32: [2, 43],
                        42: [2, 43],
                        45: [2, 43],
                        46: [2, 43],
                        49: [2, 43],
                        53: [2, 43]
                    }, {
                        12: 36,
                        14: [1, 18]
                    }, {
                        18: 38,
                        54: 37,
                        58: 39,
                        59: [1, 40],
                        66: [1, 32],
                        72: 23,
                        73: 24,
                        74: [1, 25],
                        75: [1, 26],
                        76: [1, 27],
                        77: [1, 28],
                        78: [1, 29],
                        79: [1, 31],
                        80: 30
                    }, {
                        5: [2, 9],
                        13: [2, 9],
                        14: [2, 9],
                        16: [2, 9],
                        17: [2, 9],
                        27: [2, 9],
                        32: [2, 9],
                        37: [2, 9],
                        42: [2, 9],
                        45: [2, 9],
                        46: [2, 9],
                        49: [2, 9],
                        53: [2, 9]
                    }, {
                        18: 41,
                        66: [1, 32],
                        72: 23,
                        73: 24,
                        74: [1, 25],
                        75: [1, 26],
                        76: [1, 27],
                        77: [1, 28],
                        78: [1, 29],
                        79: [1, 31],
                        80: 30
                    }, {
                        18: 42,
                        66: [1, 32],
                        72: 23,
                        73: 24,
                        74: [1, 25],
                        75: [1, 26],
                        76: [1, 27],
                        77: [1, 28],
                        78: [1, 29],
                        79: [1, 31],
                        80: 30
                    }, {
                        18: 43,
                        66: [1, 32],
                        72: 23,
                        73: 24,
                        74: [1, 25],
                        75: [1, 26],
                        76: [1, 27],
                        77: [1, 28],
                        78: [1, 29],
                        79: [1, 31],
                        80: 30
                    }, {
                        31: [2, 73],
                        47: 44,
                        59: [2, 73],
                        66: [2, 73],
                        74: [2, 73],
                        75: [2, 73],
                        76: [2, 73],
                        77: [2, 73],
                        78: [2, 73],
                        79: [2, 73]
                    }, {
                        21: [2, 30],
                        31: [2, 30],
                        52: [2, 30],
                        59: [2, 30],
                        62: [2, 30],
                        66: [2, 30],
                        69: [2, 30],
                        74: [2, 30],
                        75: [2, 30],
                        76: [2, 30],
                        77: [2, 30],
                        78: [2, 30],
                        79: [2, 30]
                    }, {
                        21: [2, 31],
                        31: [2, 31],
                        52: [2, 31],
                        59: [2, 31],
                        62: [2, 31],
                        66: [2, 31],
                        69: [2, 31],
                        74: [2, 31],
                        75: [2, 31],
                        76: [2, 31],
                        77: [2, 31],
                        78: [2, 31],
                        79: [2, 31]
                    }, {
                        21: [2, 32],
                        31: [2, 32],
                        52: [2, 32],
                        59: [2, 32],
                        62: [2, 32],
                        66: [2, 32],
                        69: [2, 32],
                        74: [2, 32],
                        75: [2, 32],
                        76: [2, 32],
                        77: [2, 32],
                        78: [2, 32],
                        79: [2, 32]
                    }, {
                        21: [2, 33],
                        31: [2, 33],
                        52: [2, 33],
                        59: [2, 33],
                        62: [2, 33],
                        66: [2, 33],
                        69: [2, 33],
                        74: [2, 33],
                        75: [2, 33],
                        76: [2, 33],
                        77: [2, 33],
                        78: [2, 33],
                        79: [2, 33]
                    }, {
                        21: [2, 34],
                        31: [2, 34],
                        52: [2, 34],
                        59: [2, 34],
                        62: [2, 34],
                        66: [2, 34],
                        69: [2, 34],
                        74: [2, 34],
                        75: [2, 34],
                        76: [2, 34],
                        77: [2, 34],
                        78: [2, 34],
                        79: [2, 34]
                    }, {
                        21: [2, 35],
                        31: [2, 35],
                        52: [2, 35],
                        59: [2, 35],
                        62: [2, 35],
                        66: [2, 35],
                        69: [2, 35],
                        74: [2, 35],
                        75: [2, 35],
                        76: [2, 35],
                        77: [2, 35],
                        78: [2, 35],
                        79: [2, 35]
                    }, {
                        21: [2, 36],
                        31: [2, 36],
                        52: [2, 36],
                        59: [2, 36],
                        62: [2, 36],
                        66: [2, 36],
                        69: [2, 36],
                        74: [2, 36],
                        75: [2, 36],
                        76: [2, 36],
                        77: [2, 36],
                        78: [2, 36],
                        79: [2, 36]
                    }, {
                        21: [2, 40],
                        31: [2, 40],
                        52: [2, 40],
                        59: [2, 40],
                        62: [2, 40],
                        66: [2, 40],
                        69: [2, 40],
                        74: [2, 40],
                        75: [2, 40],
                        76: [2, 40],
                        77: [2, 40],
                        78: [2, 40],
                        79: [2, 40],
                        81: [1, 45]
                    }, {
                        66: [1, 32],
                        80: 46
                    }, {
                        21: [2, 42],
                        31: [2, 42],
                        52: [2, 42],
                        59: [2, 42],
                        62: [2, 42],
                        66: [2, 42],
                        69: [2, 42],
                        74: [2, 42],
                        75: [2, 42],
                        76: [2, 42],
                        77: [2, 42],
                        78: [2, 42],
                        79: [2, 42],
                        81: [2, 42]
                    }, {
                        50: 47,
                        52: [2, 77],
                        59: [2, 77],
                        66: [2, 77],
                        74: [2, 77],
                        75: [2, 77],
                        76: [2, 77],
                        77: [2, 77],
                        78: [2, 77],
                        79: [2, 77]
                    }, {
                        23: 48,
                        36: 50,
                        37: [1, 52],
                        41: 51,
                        42: [1, 53],
                        43: 49,
                        45: [2, 49]
                    }, {
                        26: 54,
                        41: 55,
                        42: [1, 53],
                        45: [2, 51]
                    }, {
                        16: [1, 56]
                    }, {
                        31: [2, 81],
                        55: 57,
                        59: [2, 81],
                        66: [2, 81],
                        74: [2, 81],
                        75: [2, 81],
                        76: [2, 81],
                        77: [2, 81],
                        78: [2, 81],
                        79: [2, 81]
                    }, {
                        31: [2, 37],
                        59: [2, 37],
                        66: [2, 37],
                        74: [2, 37],
                        75: [2, 37],
                        76: [2, 37],
                        77: [2, 37],
                        78: [2, 37],
                        79: [2, 37]
                    }, {
                        31: [2, 38],
                        59: [2, 38],
                        66: [2, 38],
                        74: [2, 38],
                        75: [2, 38],
                        76: [2, 38],
                        77: [2, 38],
                        78: [2, 38],
                        79: [2, 38]
                    }, {
                        18: 58,
                        66: [1, 32],
                        72: 23,
                        73: 24,
                        74: [1, 25],
                        75: [1, 26],
                        76: [1, 27],
                        77: [1, 28],
                        78: [1, 29],
                        79: [1, 31],
                        80: 30
                    }, {
                        28: 59,
                        31: [2, 53],
                        59: [2, 53],
                        66: [2, 53],
                        69: [2, 53],
                        74: [2, 53],
                        75: [2, 53],
                        76: [2, 53],
                        77: [2, 53],
                        78: [2, 53],
                        79: [2, 53]
                    }, {
                        31: [2, 59],
                        33: 60,
                        59: [2, 59],
                        66: [2, 59],
                        69: [2, 59],
                        74: [2, 59],
                        75: [2, 59],
                        76: [2, 59],
                        77: [2, 59],
                        78: [2, 59],
                        79: [2, 59]
                    }, {
                        19: 61,
                        21: [2, 45],
                        59: [2, 45],
                        66: [2, 45],
                        74: [2, 45],
                        75: [2, 45],
                        76: [2, 45],
                        77: [2, 45],
                        78: [2, 45],
                        79: [2, 45]
                    }, {
                        18: 65,
                        31: [2, 75],
                        48: 62,
                        57: 63,
                        58: 66,
                        59: [1, 40],
                        63: 64,
                        64: 67,
                        65: 68,
                        66: [1, 69],
                        72: 23,
                        73: 24,
                        74: [1, 25],
                        75: [1, 26],
                        76: [1, 27],
                        77: [1, 28],
                        78: [1, 29],
                        79: [1, 31],
                        80: 30
                    }, {
                        66: [1, 70]
                    }, {
                        21: [2, 39],
                        31: [2, 39],
                        52: [2, 39],
                        59: [2, 39],
                        62: [2, 39],
                        66: [2, 39],
                        69: [2, 39],
                        74: [2, 39],
                        75: [2, 39],
                        76: [2, 39],
                        77: [2, 39],
                        78: [2, 39],
                        79: [2, 39],
                        81: [1, 45]
                    }, {
                        18: 65,
                        51: 71,
                        52: [2, 79],
                        57: 72,
                        58: 66,
                        59: [1, 40],
                        63: 73,
                        64: 67,
                        65: 68,
                        66: [1, 69],
                        72: 23,
                        73: 24,
                        74: [1, 25],
                        75: [1, 26],
                        76: [1, 27],
                        77: [1, 28],
                        78: [1, 29],
                        79: [1, 31],
                        80: 30
                    }, {
                        24: 74,
                        45: [1, 75]
                    }, {
                        45: [2, 50]
                    }, {
                        4: 76,
                        6: 3,
                        13: [2, 43],
                        14: [2, 43],
                        17: [2, 43],
                        27: [2, 43],
                        32: [2, 43],
                        37: [2, 43],
                        42: [2, 43],
                        45: [2, 43],
                        46: [2, 43],
                        49: [2, 43],
                        53: [2, 43]
                    }, {
                        45: [2, 19]
                    }, {
                        18: 77,
                        66: [1, 32],
                        72: 23,
                        73: 24,
                        74: [1, 25],
                        75: [1, 26],
                        76: [1, 27],
                        77: [1, 28],
                        78: [1, 29],
                        79: [1, 31],
                        80: 30
                    }, {
                        4: 78,
                        6: 3,
                        13: [2, 43],
                        14: [2, 43],
                        17: [2, 43],
                        27: [2, 43],
                        32: [2, 43],
                        45: [2, 43],
                        46: [2, 43],
                        49: [2, 43],
                        53: [2, 43]
                    }, {
                        24: 79,
                        45: [1, 75]
                    }, {
                        45: [2, 52]
                    }, {
                        5: [2, 10],
                        13: [2, 10],
                        14: [2, 10],
                        17: [2, 10],
                        27: [2, 10],
                        32: [2, 10],
                        37: [2, 10],
                        42: [2, 10],
                        45: [2, 10],
                        46: [2, 10],
                        49: [2, 10],
                        53: [2, 10]
                    }, {
                        18: 65,
                        31: [2, 83],
                        56: 80,
                        57: 81,
                        58: 66,
                        59: [1, 40],
                        63: 82,
                        64: 67,
                        65: 68,
                        66: [1, 69],
                        72: 23,
                        73: 24,
                        74: [1, 25],
                        75: [1, 26],
                        76: [1, 27],
                        77: [1, 28],
                        78: [1, 29],
                        79: [1, 31],
                        80: 30
                    }, {
                        59: [2, 85],
                        60: 83,
                        62: [2, 85],
                        66: [2, 85],
                        74: [2, 85],
                        75: [2, 85],
                        76: [2, 85],
                        77: [2, 85],
                        78: [2, 85],
                        79: [2, 85]
                    }, {
                        18: 65,
                        29: 84,
                        31: [2, 55],
                        57: 85,
                        58: 66,
                        59: [1, 40],
                        63: 86,
                        64: 67,
                        65: 68,
                        66: [1, 69],
                        69: [2, 55],
                        72: 23,
                        73: 24,
                        74: [1, 25],
                        75: [1, 26],
                        76: [1, 27],
                        77: [1, 28],
                        78: [1, 29],
                        79: [1, 31],
                        80: 30
                    }, {
                        18: 65,
                        31: [2, 61],
                        34: 87,
                        57: 88,
                        58: 66,
                        59: [1, 40],
                        63: 89,
                        64: 67,
                        65: 68,
                        66: [1, 69],
                        69: [2, 61],
                        72: 23,
                        73: 24,
                        74: [1, 25],
                        75: [1, 26],
                        76: [1, 27],
                        77: [1, 28],
                        78: [1, 29],
                        79: [1, 31],
                        80: 30
                    }, {
                        18: 65,
                        20: 90,
                        21: [2, 47],
                        57: 91,
                        58: 66,
                        59: [1, 40],
                        63: 92,
                        64: 67,
                        65: 68,
                        66: [1, 69],
                        72: 23,
                        73: 24,
                        74: [1, 25],
                        75: [1, 26],
                        76: [1, 27],
                        77: [1, 28],
                        78: [1, 29],
                        79: [1, 31],
                        80: 30
                    }, {
                        31: [1, 93]
                    }, {
                        31: [2, 74],
                        59: [2, 74],
                        66: [2, 74],
                        74: [2, 74],
                        75: [2, 74],
                        76: [2, 74],
                        77: [2, 74],
                        78: [2, 74],
                        79: [2, 74]
                    }, {
                        31: [2, 76]
                    }, {
                        21: [2, 24],
                        31: [2, 24],
                        52: [2, 24],
                        59: [2, 24],
                        62: [2, 24],
                        66: [2, 24],
                        69: [2, 24],
                        74: [2, 24],
                        75: [2, 24],
                        76: [2, 24],
                        77: [2, 24],
                        78: [2, 24],
                        79: [2, 24]
                    }, {
                        21: [2, 25],
                        31: [2, 25],
                        52: [2, 25],
                        59: [2, 25],
                        62: [2, 25],
                        66: [2, 25],
                        69: [2, 25],
                        74: [2, 25],
                        75: [2, 25],
                        76: [2, 25],
                        77: [2, 25],
                        78: [2, 25],
                        79: [2, 25]
                    }, {
                        21: [2, 27],
                        31: [2, 27],
                        52: [2, 27],
                        62: [2, 27],
                        65: 94,
                        66: [1, 95],
                        69: [2, 27]
                    }, {
                        21: [2, 89],
                        31: [2, 89],
                        52: [2, 89],
                        62: [2, 89],
                        66: [2, 89],
                        69: [2, 89]
                    }, {
                        21: [2, 42],
                        31: [2, 42],
                        52: [2, 42],
                        59: [2, 42],
                        62: [2, 42],
                        66: [2, 42],
                        67: [1, 96],
                        69: [2, 42],
                        74: [2, 42],
                        75: [2, 42],
                        76: [2, 42],
                        77: [2, 42],
                        78: [2, 42],
                        79: [2, 42],
                        81: [2, 42]
                    }, {
                        21: [2, 41],
                        31: [2, 41],
                        52: [2, 41],
                        59: [2, 41],
                        62: [2, 41],
                        66: [2, 41],
                        69: [2, 41],
                        74: [2, 41],
                        75: [2, 41],
                        76: [2, 41],
                        77: [2, 41],
                        78: [2, 41],
                        79: [2, 41],
                        81: [2, 41]
                    }, {
                        52: [1, 97]
                    }, {
                        52: [2, 78],
                        59: [2, 78],
                        66: [2, 78],
                        74: [2, 78],
                        75: [2, 78],
                        76: [2, 78],
                        77: [2, 78],
                        78: [2, 78],
                        79: [2, 78]
                    }, {
                        52: [2, 80]
                    }, {
                        5: [2, 12],
                        13: [2, 12],
                        14: [2, 12],
                        17: [2, 12],
                        27: [2, 12],
                        32: [2, 12],
                        37: [2, 12],
                        42: [2, 12],
                        45: [2, 12],
                        46: [2, 12],
                        49: [2, 12],
                        53: [2, 12]
                    }, {
                        18: 98,
                        66: [1, 32],
                        72: 23,
                        73: 24,
                        74: [1, 25],
                        75: [1, 26],
                        76: [1, 27],
                        77: [1, 28],
                        78: [1, 29],
                        79: [1, 31],
                        80: 30
                    }, {
                        36: 50,
                        37: [1, 52],
                        41: 51,
                        42: [1, 53],
                        43: 100,
                        44: 99,
                        45: [2, 71]
                    }, {
                        31: [2, 65],
                        38: 101,
                        59: [2, 65],
                        66: [2, 65],
                        69: [2, 65],
                        74: [2, 65],
                        75: [2, 65],
                        76: [2, 65],
                        77: [2, 65],
                        78: [2, 65],
                        79: [2, 65]
                    }, {
                        45: [2, 17]
                    }, {
                        5: [2, 13],
                        13: [2, 13],
                        14: [2, 13],
                        17: [2, 13],
                        27: [2, 13],
                        32: [2, 13],
                        37: [2, 13],
                        42: [2, 13],
                        45: [2, 13],
                        46: [2, 13],
                        49: [2, 13],
                        53: [2, 13]
                    }, {
                        31: [1, 102]
                    }, {
                        31: [2, 82],
                        59: [2, 82],
                        66: [2, 82],
                        74: [2, 82],
                        75: [2, 82],
                        76: [2, 82],
                        77: [2, 82],
                        78: [2, 82],
                        79: [2, 82]
                    }, {
                        31: [2, 84]
                    }, {
                        18: 65,
                        57: 104,
                        58: 66,
                        59: [1, 40],
                        61: 103,
                        62: [2, 87],
                        63: 105,
                        64: 67,
                        65: 68,
                        66: [1, 69],
                        72: 23,
                        73: 24,
                        74: [1, 25],
                        75: [1, 26],
                        76: [1, 27],
                        77: [1, 28],
                        78: [1, 29],
                        79: [1, 31],
                        80: 30
                    }, {
                        30: 106,
                        31: [2, 57],
                        68: 107,
                        69: [1, 108]
                    }, {
                        31: [2, 54],
                        59: [2, 54],
                        66: [2, 54],
                        69: [2, 54],
                        74: [2, 54],
                        75: [2, 54],
                        76: [2, 54],
                        77: [2, 54],
                        78: [2, 54],
                        79: [2, 54]
                    }, {
                        31: [2, 56],
                        69: [2, 56]
                    }, {
                        31: [2, 63],
                        35: 109,
                        68: 110,
                        69: [1, 108]
                    }, {
                        31: [2, 60],
                        59: [2, 60],
                        66: [2, 60],
                        69: [2, 60],
                        74: [2, 60],
                        75: [2, 60],
                        76: [2, 60],
                        77: [2, 60],
                        78: [2, 60],
                        79: [2, 60]
                    }, {
                        31: [2, 62],
                        69: [2, 62]
                    }, {
                        21: [1, 111]
                    }, {
                        21: [2, 46],
                        59: [2, 46],
                        66: [2, 46],
                        74: [2, 46],
                        75: [2, 46],
                        76: [2, 46],
                        77: [2, 46],
                        78: [2, 46],
                        79: [2, 46]
                    }, {
                        21: [2, 48]
                    }, {
                        5: [2, 21],
                        13: [2, 21],
                        14: [2, 21],
                        17: [2, 21],
                        27: [2, 21],
                        32: [2, 21],
                        37: [2, 21],
                        42: [2, 21],
                        45: [2, 21],
                        46: [2, 21],
                        49: [2, 21],
                        53: [2, 21]
                    }, {
                        21: [2, 90],
                        31: [2, 90],
                        52: [2, 90],
                        62: [2, 90],
                        66: [2, 90],
                        69: [2, 90]
                    }, {
                        67: [1, 96]
                    }, {
                        18: 65,
                        57: 112,
                        58: 66,
                        59: [1, 40],
                        66: [1, 32],
                        72: 23,
                        73: 24,
                        74: [1, 25],
                        75: [1, 26],
                        76: [1, 27],
                        77: [1, 28],
                        78: [1, 29],
                        79: [1, 31],
                        80: 30
                    }, {
                        5: [2, 22],
                        13: [2, 22],
                        14: [2, 22],
                        17: [2, 22],
                        27: [2, 22],
                        32: [2, 22],
                        37: [2, 22],
                        42: [2, 22],
                        45: [2, 22],
                        46: [2, 22],
                        49: [2, 22],
                        53: [2, 22]
                    }, {
                        31: [1, 113]
                    }, {
                        45: [2, 18]
                    }, {
                        45: [2, 72]
                    }, {
                        18: 65,
                        31: [2, 67],
                        39: 114,
                        57: 115,
                        58: 66,
                        59: [1, 40],
                        63: 116,
                        64: 67,
                        65: 68,
                        66: [1, 69],
                        69: [2, 67],
                        72: 23,
                        73: 24,
                        74: [1, 25],
                        75: [1, 26],
                        76: [1, 27],
                        77: [1, 28],
                        78: [1, 29],
                        79: [1, 31],
                        80: 30
                    }, {
                        5: [2, 23],
                        13: [2, 23],
                        14: [2, 23],
                        17: [2, 23],
                        27: [2, 23],
                        32: [2, 23],
                        37: [2, 23],
                        42: [2, 23],
                        45: [2, 23],
                        46: [2, 23],
                        49: [2, 23],
                        53: [2, 23]
                    }, {
                        62: [1, 117]
                    }, {
                        59: [2, 86],
                        62: [2, 86],
                        66: [2, 86],
                        74: [2, 86],
                        75: [2, 86],
                        76: [2, 86],
                        77: [2, 86],
                        78: [2, 86],
                        79: [2, 86]
                    }, {
                        62: [2, 88]
                    }, {
                        31: [1, 118]
                    }, {
                        31: [2, 58]
                    }, {
                        66: [1, 120],
                        70: 119
                    }, {
                        31: [1, 121]
                    }, {
                        31: [2, 64]
                    }, {
                        14: [2, 11]
                    }, {
                        21: [2, 28],
                        31: [2, 28],
                        52: [2, 28],
                        62: [2, 28],
                        66: [2, 28],
                        69: [2, 28]
                    }, {
                        5: [2, 20],
                        13: [2, 20],
                        14: [2, 20],
                        17: [2, 20],
                        27: [2, 20],
                        32: [2, 20],
                        37: [2, 20],
                        42: [2, 20],
                        45: [2, 20],
                        46: [2, 20],
                        49: [2, 20],
                        53: [2, 20]
                    }, {
                        31: [2, 69],
                        40: 122,
                        68: 123,
                        69: [1, 108]
                    }, {
                        31: [2, 66],
                        59: [2, 66],
                        66: [2, 66],
                        69: [2, 66],
                        74: [2, 66],
                        75: [2, 66],
                        76: [2, 66],
                        77: [2, 66],
                        78: [2, 66],
                        79: [2, 66]
                    }, {
                        31: [2, 68],
                        69: [2, 68]
                    }, {
                        21: [2, 26],
                        31: [2, 26],
                        52: [2, 26],
                        59: [2, 26],
                        62: [2, 26],
                        66: [2, 26],
                        69: [2, 26],
                        74: [2, 26],
                        75: [2, 26],
                        76: [2, 26],
                        77: [2, 26],
                        78: [2, 26],
                        79: [2, 26]
                    }, {
                        13: [2, 14],
                        14: [2, 14],
                        17: [2, 14],
                        27: [2, 14],
                        32: [2, 14],
                        37: [2, 14],
                        42: [2, 14],
                        45: [2, 14],
                        46: [2, 14],
                        49: [2, 14],
                        53: [2, 14]
                    }, {
                        66: [1, 125],
                        71: [1, 124]
                    }, {
                        66: [2, 91],
                        71: [2, 91]
                    }, {
                        13: [2, 15],
                        14: [2, 15],
                        17: [2, 15],
                        27: [2, 15],
                        32: [2, 15],
                        42: [2, 15],
                        45: [2, 15],
                        46: [2, 15],
                        49: [2, 15],
                        53: [2, 15]
                    }, {
                        31: [1, 126]
                    }, {
                        31: [2, 70]
                    }, {
                        31: [2, 29]
                    }, {
                        66: [2, 92],
                        71: [2, 92]
                    }, {
                        13: [2, 16],
                        14: [2, 16],
                        17: [2, 16],
                        27: [2, 16],
                        32: [2, 16],
                        37: [2, 16],
                        42: [2, 16],
                        45: [2, 16],
                        46: [2, 16],
                        49: [2, 16],
                        53: [2, 16]
                    }],
                    defaultActions: {
                        4: [2, 1],
                        49: [2, 50],
                        51: [2, 19],
                        55: [2, 52],
                        64: [2, 76],
                        73: [2, 80],
                        78: [2, 17],
                        82: [2, 84],
                        92: [2, 48],
                        99: [2, 18],
                        100: [2, 72],
                        105: [2, 88],
                        107: [2, 58],
                        110: [2, 64],
                        111: [2, 11],
                        123: [2, 70],
                        124: [2, 29]
                    },
                    parseError: function(n) {
                        throw new Error(n);
                    },
                    parse: function(n) {
                        function it() {
                            var n;
                            return n = k.lexer.lex() || 1, "number" != typeof n && (n = k.symbols_[n] || n), n
                        }
                        var k = this,
                            r = [0],
                            e = [null],
                            t = [],
                            h = this.table,
                            d = "",
                            c = 0,
                            g = 0,
                            y = 0,
                            l, nt, i, p, o, u, w, a, f, tt, v, s, b;
                        for (this.lexer.setInput(n), this.lexer.yy = this.yy, this.yy.lexer = this.lexer, this.yy.parser = this, "undefined" == typeof this.lexer.yylloc && (this.lexer.yylloc = {}), l = this.lexer.yylloc, t.push(l), nt = this.lexer.options && this.lexer.options.ranges, "function" == typeof this.yy.parseError && (this.parseError = this.yy.parseError), s = {};;) {
                            if ((o = r[r.length - 1], this.defaultActions[o] ? u = this.defaultActions[o] : ((null === i || "undefined" == typeof i) && (i = it()), u = h[o] && h[o][i]), "undefined" == typeof u || !u.length || !u[0]) && (b = "", !y)) {
                                v = [];
                                for (a in h[o]) this.terminals_[a] && a > 2 && v.push("'" + this.terminals_[a] + "'");
                                b = this.lexer.showPosition ? "Parse error on line " + (c + 1) + ":\n" + this.lexer.showPosition() + "\nExpecting " + v.join(", ") + ", got '" + (this.terminals_[i] || i) + "'" : "Parse error on line " + (c + 1) + ": Unexpected " + (1 == i ? "end of input" : "'" + (this.terminals_[i] || i) + "'");
                                this.parseError(b, {
                                    text: this.lexer.match,
                                    token: this.terminals_[i] || i,
                                    line: this.lexer.yylineno,
                                    loc: l,
                                    expected: v
                                })
                            }
                            if (u[0] instanceof Array && u.length > 1) throw new Error("Parse Error: multiple actions possible at state: " + o + ", token: " + i);
                            switch (u[0]) {
                                case 1:
                                    r.push(i);
                                    e.push(this.lexer.yytext);
                                    t.push(this.lexer.yylloc);
                                    r.push(u[1]);
                                    i = null;
                                    p ? (i = p, p = null) : (g = this.lexer.yyleng, d = this.lexer.yytext, c = this.lexer.yylineno, l = this.lexer.yylloc, y > 0 && y--);
                                    break;
                                case 2:
                                    if (f = this.productions_[u[1]][1], s.$ = e[e.length - f], s._$ = {
                                            first_line: t[t.length - (f || 1)].first_line,
                                            last_line: t[t.length - 1].last_line,
                                            first_column: t[t.length - (f || 1)].first_column,
                                            last_column: t[t.length - 1].last_column
                                        }, nt && (s._$.range = [t[t.length - (f || 1)].range[0], t[t.length - 1].range[1]]), w = this.performAction.call(s, d, g, c, this.yy, u[1], e, t), "undefined" != typeof w) return w;
                                    f && (r = r.slice(0, -2 * f), e = e.slice(0, -1 * f), t = t.slice(0, -1 * f));
                                    r.push(this.productions_[u[1]][0]);
                                    e.push(s.$);
                                    t.push(s._$);
                                    tt = h[r[r.length - 2]][r[r.length - 1]];
                                    r.push(tt);
                                    break;
                                case 3:
                                    return !0
                            }
                        }
                        return !0
                    }
                },
                i = function() {
                    var n = {
                        EOF: 1,
                        parseError: function(n, t) {
                            if (!this.yy.parser) throw new Error(n);
                            this.yy.parser.parseError(n, t)
                        },
                        setInput: function(n) {
                            return this._input = n, this._more = this._less = this.done = !1, this.yylineno = this.yyleng = 0, this.yytext = this.matched = this.match = "", this.conditionStack = ["INITIAL"], this.yylloc = {
                                first_line: 1,
                                first_column: 0,
                                last_line: 1,
                                last_column: 0
                            }, this.options.ranges && (this.yylloc.range = [0, 0]), this.offset = 0, this
                        },
                        input: function() {
                            var n = this._input[0],
                                t;
                            return this.yytext += n, this.yyleng++, this.offset++, this.match += n, this.matched += n, t = n.match(/(?:\r\n?|\n).*/g), t ? (this.yylineno++, this.yylloc.last_line++) : this.yylloc.last_column++, this.options.ranges && this.yylloc.range[1]++, this._input = this._input.slice(1), n
                        },
                        unput: function(n) {
                            var i = n.length,
                                t = n.split(/(?:\r\n?|\n)/g),
                                r, u;
                            return this._input = n + this._input, this.yytext = this.yytext.substr(0, this.yytext.length - i - 1), this.offset -= i, r = this.match.split(/(?:\r\n?|\n)/g), this.match = this.match.substr(0, this.match.length - 1), this.matched = this.matched.substr(0, this.matched.length - 1), t.length - 1 && (this.yylineno -= t.length - 1), u = this.yylloc.range, this.yylloc = {
                                first_line: this.yylloc.first_line,
                                last_line: this.yylineno + 1,
                                first_column: this.yylloc.first_column,
                                last_column: t ? (t.length === r.length ? this.yylloc.first_column : 0) + r[r.length - t.length].length - t[0].length : this.yylloc.first_column - i
                            }, this.options.ranges && (this.yylloc.range = [u[0], u[0] + this.yyleng - i]), this
                        },
                        more: function() {
                            return this._more = !0, this
                        },
                        less: function(n) {
                            this.unput(this.match.slice(n))
                        },
                        pastInput: function() {
                            var n = this.matched.substr(0, this.matched.length - this.match.length);
                            return (n.length > 20 ? "..." : "") + n.substr(-20).replace(/\n/g, "")
                        },
                        upcomingInput: function() {
                            var n = this.match;
                            return n.length < 20 && (n += this._input.substr(0, 20 - n.length)), (n.substr(0, 20) + (n.length > 20 ? "..." : "")).replace(/\n/g, "")
                        },
                        showPosition: function() {
                            var n = this.pastInput(),
                                t = new Array(n.length + 1).join("-");
                            return n + this.upcomingInput() + "\n" + t + "^"
                        },
                        next: function() {
                            var f, n, r, e, t, u, i;
                            if (this.done) return this.EOF;
                            for (this._input || (this.done = !0), this._more || (this.yytext = "", this.match = ""), u = this._currentRules(), i = 0; i < u.length && (r = this._input.match(this.rules[u[i]]), !r || n && !(r[0].length > n[0].length) || (n = r, e = i, this.options.flex)); i++);
                            return n ? (t = n[0].match(/(?:\r\n?|\n).*/g), t && (this.yylineno += t.length), this.yylloc = {
                                first_line: this.yylloc.last_line,
                                last_line: this.yylineno + 1,
                                first_column: this.yylloc.last_column,
                                last_column: t ? t[t.length - 1].length - t[t.length - 1].match(/\r?\n?/)[0].length : this.yylloc.last_column + n[0].length
                            }, this.yytext += n[0], this.match += n[0], this.matches = n, this.yyleng = this.yytext.length, this.options.ranges && (this.yylloc.range = [this.offset, this.offset += this.yyleng]), this._more = !1, this._input = this._input.slice(n[0].length), this.matched += n[0], f = this.performAction.call(this, this.yy, this, u[e], this.conditionStack[this.conditionStack.length - 1]), this.done && this._input && (this.done = !1), f ? f : void 0) : "" === this._input ? this.EOF : this.parseError("Lexical error on line " + (this.yylineno + 1) + ". Unrecognized text.\n" + this.showPosition(), {
                                text: "",
                                token: null,
                                line: this.yylineno
                            })
                        },
                        lex: function() {
                            var n = this.next();
                            return "undefined" != typeof n ? n : this.lex()
                        },
                        begin: function(n) {
                            this.conditionStack.push(n)
                        },
                        popState: function() {
                            return this.conditionStack.pop()
                        },
                        _currentRules: function() {
                            return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules
                        },
                        topState: function() {
                            return this.conditionStack[this.conditionStack.length - 2]
                        },
                        pushState: function(n) {
                            this.begin(n)
                        }
                    };
                    return n.options = {}, n.performAction = function(n, t, i) {
                        function r(n, i) {
                            return t.yytext = t.yytext.substr(n, t.yyleng - i)
                        }
                        switch (i) {
                            case 0:
                                if ("\\\\" === t.yytext.slice(-2) ? (r(0, 1), this.begin("mu")) : "\\" === t.yytext.slice(-1) ? (r(0, 1), this.begin("emu")) : this.begin("mu"), t.yytext) return 14;
                                break;
                            case 1:
                                return 14;
                            case 2:
                                return this.popState(), 14;
                            case 3:
                                return t.yytext = t.yytext.substr(5, t.yyleng - 9), this.popState(), 16;
                            case 4:
                                return 14;
                            case 5:
                                return this.popState(), 13;
                            case 6:
                                return 59;
                            case 7:
                                return 62;
                            case 8:
                                return 17;
                            case 9:
                                return this.popState(), this.begin("raw"), 21;
                            case 10:
                                return 53;
                            case 11:
                                return 27;
                            case 12:
                                return 45;
                            case 13:
                                return this.popState(), 42;
                            case 14:
                                return this.popState(), 42;
                            case 15:
                                return 32;
                            case 16:
                                return 37;
                            case 17:
                                return 49;
                            case 18:
                                return 46;
                            case 19:
                                this.unput(t.yytext);
                                this.popState();
                                this.begin("com");
                                break;
                            case 20:
                                return this.popState(), 13;
                            case 21:
                                return 46;
                            case 22:
                                return 67;
                            case 23:
                                return 66;
                            case 24:
                                return 66;
                            case 25:
                                return 81;
                            case 27:
                                return this.popState(), 52;
                            case 28:
                                return this.popState(), 31;
                            case 29:
                                return t.yytext = r(1, 2).replace(/\\"/g, '"'), 74;
                            case 30:
                                return t.yytext = r(1, 2).replace(/\\'/g, "'"), 74;
                            case 31:
                                return 79;
                            case 32:
                                return 76;
                            case 33:
                                return 76;
                            case 34:
                                return 77;
                            case 35:
                                return 78;
                            case 36:
                                return 75;
                            case 37:
                                return 69;
                            case 38:
                                return 71;
                            case 39:
                                return 66;
                            case 40:
                                return 66;
                            case 41:
                                return "INVALID";
                            case 42:
                                return 5
                        }
                    }, n.rules = [/^(?:[^\x00]*?(?=(\{\{)))/, /^(?:[^\x00]+)/, /^(?:[^\x00]{2,}?(?=(\{\{|\\\{\{|\\\\\{\{|$)))/, /^(?:\{\{\{\{\/[^\s!"#%-,\.\/;->@\[-\^`\{-~]+(?=[=}\s\/.])\}\}\}\})/, /^(?:[^\x00]*?(?=(\{\{\{\{\/)))/, /^(?:[\s\S]*?--(~)?\}\})/, /^(?:\()/, /^(?:\))/, /^(?:\{\{\{\{)/, /^(?:\}\}\}\})/, /^(?:\{\{(~)?>)/, /^(?:\{\{(~)?#)/, /^(?:\{\{(~)?\/)/, /^(?:\{\{(~)?\^\s*(~)?\}\})/, /^(?:\{\{(~)?\s*else\s*(~)?\}\})/, /^(?:\{\{(~)?\^)/, /^(?:\{\{(~)?\s*else\b)/, /^(?:\{\{(~)?\{)/, /^(?:\{\{(~)?&)/, /^(?:\{\{(~)?!--)/, /^(?:\{\{(~)?![\s\S]*?\}\})/, /^(?:\{\{(~)?)/, /^(?:=)/, /^(?:\.\.)/, /^(?:\.(?=([=~}\s\/.)|])))/, /^(?:[\/.])/, /^(?:\s+)/, /^(?:\}(~)?\}\})/, /^(?:(~)?\}\})/, /^(?:"(\\["]|[^"])*")/, /^(?:'(\\[']|[^'])*')/, /^(?:@)/, /^(?:true(?=([~}\s)])))/, /^(?:false(?=([~}\s)])))/, /^(?:undefined(?=([~}\s)])))/, /^(?:null(?=([~}\s)])))/, /^(?:-?[0-9]+(?:\.[0-9]+)?(?=([~}\s)])))/, /^(?:as\s+\|)/, /^(?:\|)/, /^(?:([^\s!"#%-,\.\/;->@\[-\^`\{-~]+(?=([=~}\s\/.)|]))))/, /^(?:\[[^\]]*\])/, /^(?:.)/, /^(?:$)/], n.conditions = {
                        mu: {
                            rules: [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42],
                            inclusive: !1
                        },
                        emu: {
                            rules: [2],
                            inclusive: !1
                        },
                        com: {
                            rules: [5],
                            inclusive: !1
                        },
                        raw: {
                            rules: [3, 4],
                            inclusive: !1
                        },
                        INITIAL: {
                            rules: [0, 1, 42],
                            inclusive: !0
                        }
                    }, n
                }();
            return t.lexer = i, n.prototype = t, t.Parser = n, new n
        }();
        t["default"] = i;
        n.exports = t["default"]
    }, function(n, t, i) {
        "use strict";

        function u() {}

        function e(n, t, i) {
            void 0 === t && (t = n.length);
            var r = n[t - 1],
                u = n[t - 2];
            return r ? "ContentStatement" === r.type ? (u || !i ? /\r?\n\s*?$/ : /(^|\r?\n)\s*?$/).test(r.original) : void 0 : i
        }

        function o(n, t, i) {
            void 0 === t && (t = -1);
            var r = n[t + 1],
                u = n[t + 2];
            return r ? "ContentStatement" === r.type ? (u || !i ? /^\s*?\r?\n/ : /^\s*?(\r?\n|$)/).test(r.original) : void 0 : i
        }

        function f(n, t, i) {
            var r = n[null == t ? 0 : t + 1],
                u;
            r && "ContentStatement" === r.type && (i || !r.rightStripped) && (u = r.value, r.value = r.value.replace(i ? /^\s+/ : /^[ \t]*\r?\n?/, ""), r.rightStripped = r.value !== u)
        }

        function r(n, t, i) {
            var r = n[null == t ? n.length - 1 : t - 1],
                u;
            if (r && "ContentStatement" === r.type && (i || !r.leftStripped)) return u = r.value, r.value = r.value.replace(i ? /\s+$/ : /[ \t]+$/, ""), r.leftStripped = r.value !== u, r.leftStripped
        }
        var c = i(8)["default"],
            s, h;
        t.__esModule = !0;
        s = i(6);
        h = c(s);
        u.prototype = new h["default"];
        u.prototype.Program = function(n) {
            var h = !this.isRootSeen,
                u, s;
            this.isRootSeen = !0;
            for (var i = n.body, t = 0, a = i.length; a > t; t++)
                if (u = i[t], s = this.accept(u), s) {
                    var c = e(i, t, h),
                        l = o(i, t, h),
                        v = s.openStandalone && c,
                        y = s.closeStandalone && l,
                        p = s.inlineStandalone && c && l;
                    s.close && f(i, t, !0);
                    s.open && r(i, t, !0);
                    p && (f(i, t), r(i, t) && "PartialStatement" === u.type && (u.indent = /([ \t]+$)/.exec(i[t - 1].original)[1]));
                    v && (f((u.program || u.inverse).body), r(i, t));
                    y && (f(i, t), r((u.inverse || u.program).body))
                }
            return n
        };
        u.prototype.BlockStatement = function(n) {
            var c, h;
            this.accept(n.program);
            this.accept(n.inverse);
            var t = n.program || n.inverse,
                i = n.program && n.inverse,
                u = i,
                s = i;
            if (i && i.chained)
                for (u = i.body[0].program; s.chained;) s = s.body[s.body.length - 1].program;
            return c = {
                open: n.openStrip.open,
                close: n.closeStrip.close,
                openStandalone: o(t.body),
                closeStandalone: e((u || t).body)
            }, (n.openStrip.close && f(t.body, null, !0), i) ? (h = n.inverseStrip, h.open && r(t.body, null, !0), h.close && f(u.body, null, !0), n.closeStrip.open && r(s.body, null, !0), e(t.body) && o(u.body) && (r(t.body), f(u.body))) : n.closeStrip.open && r(t.body, null, !0), c
        };
        u.prototype.MustacheStatement = function(n) {
            return n.strip
        };
        u.prototype.PartialStatement = u.prototype.CommentStatement = function(n) {
            var t = n.strip || {};
            return {
                inlineStandalone: !0,
                open: t.open,
                close: t.close
            }
        };
        t["default"] = u;
        n.exports = t["default"]
    }, function(n, t, i) {
        "use strict";

        function f(n, t) {
            this.source = n;
            this.start = {
                line: t.first_line,
                column: t.first_column
            };
            this.end = {
                line: t.last_line,
                column: t.last_column
            }
        }

        function e(n) {
            return /^\[.*\]$/.test(n) ? n.substr(1, n.length - 2) : n
        }

        function o(n, t) {
            return {
                open: "~" === n.charAt(2),
                close: "~" === t.charAt(t.length - 3)
            }
        }

        function s(n) {
            return n.replace(/^\{\{~?\!-?-?/, "").replace(/-?-?~?\}\}$/, "")
        }

        function h(n, t, i) {
            var u, h;
            i = this.locInfo(i);
            for (var e = n ? "@" : "", o = [], s = 0, c = "", f = 0, l = t.length; l > f; f++)
                if (u = t[f].part, h = t[f].original !== u, e += (t[f].separator || "") + u, h || ".." !== u && "." !== u && "this" !== u) o.push(u);
                else {
                    if (o.length > 0) throw new r["default"]("Invalid path: " + e, {
                        loc: i
                    });
                    ".." === u && (s++, c += "../")
                }
            return new this.PathExpression(n, s, o, e, i)
        }

        function c(n, t, i, r, u, f) {
            var e = r.charAt(3) || r.charAt(2),
                o = "{" !== e && "&" !== e;
            return new this.MustacheStatement(n, t, i, o, u, this.locInfo(f))
        }

        function l(n, t, i, u) {
            var f, e;
            if (n.path.original !== i) {
                f = {
                    loc: n.path.loc
                };
                throw new r["default"](n.path.original + " doesn't match " + i, f);
            }
            return u = this.locInfo(u), e = new this.Program([t], null, {}, u), new this.BlockStatement(n.path, n.params, n.hash, e, void 0, {}, {}, {}, u)
        }

        function a(n, t, i, u, f, e) {
            var h, o, s;
            if (u && u.path && n.path.original !== u.path.original) {
                h = {
                    loc: n.path.loc
                };
                throw new r["default"](n.path.original + " doesn't match " + u.path.original, h);
            }
            return t.blockParams = n.blockParams, o = void 0, s = void 0, i && (i.chain && (i.program.body[0].closeStrip = u.strip), s = i.strip, o = i.program), f && (f = o, o = t, t = f), new this.BlockStatement(n.path, n.params, n.hash, t, o, n.strip, s, u && u.strip, this.locInfo(e))
        }
        var v = i(8)["default"],
            u, r;
        t.__esModule = !0;
        t.SourceLocation = f;
        t.id = e;
        t.stripFlags = o;
        t.stripComment = s;
        t.preparePath = h;
        t.prepareMustache = c;
        t.prepareRawBlock = l;
        t.prepareBlock = a;
        u = i(11);
        r = v(u)
    }, function(n, t, i) {
        "use strict";

        function u(n, t, i) {
            if (f.isArray(n)) {
                for (var u = [], r = 0, e = n.length; e > r; r++) u.push(t.wrap(n[r], i));
                return u
            }
            return "boolean" == typeof n || "number" == typeof n ? n + "" : n
        }

        function e(n) {
            this.srcFile = n;
            this.source = []
        }
        t.__esModule = !0;
        var f = i(12),
            r = void 0;
        try {} catch (o) {}
        r || (r = function(n, t, i, r) {
            this.src = "";
            r && this.add(r)
        }, r.prototype = {
            add: function(n) {
                f.isArray(n) && (n = n.join(""));
                this.src += n
            },
            prepend: function(n) {
                f.isArray(n) && (n = n.join(""));
                this.src = n + this.src
            },
            toStringWithSourceMap: function() {
                return {
                    code: this.toString()
                }
            },
            toString: function() {
                return this.src
            }
        });
        e.prototype = {
            prepend: function(n, t) {
                this.source.unshift(this.wrap(n, t))
            },
            push: function(n, t) {
                this.source.push(this.wrap(n, t))
            },
            merge: function() {
                var n = this.empty();
                return this.each(function(t) {
                    n.add(["  ", t, "\n"])
                }), n
            },
            each: function(n) {
                for (var t = 0, i = this.source.length; i > t; t++) n(this.source[t])
            },
            empty: function() {
                var n = void 0 === arguments[0] ? this.currentLocation || {
                    start: {}
                } : arguments[0];
                return new r(n.start.line, n.start.column, this.srcFile)
            },
            wrap: function(n) {
                var t = void 0 === arguments[1] ? this.currentLocation || {
                    start: {}
                } : arguments[1];
                return n instanceof r ? n : (n = u(n, this, t), new r(t.start.line, t.start.column, this.srcFile, n))
            },
            functionCall: function(n, t, i) {
                return i = this.generateList(i), this.wrap([n, t ? "." + t + "(" : "(", i, ")"])
            },
            quotedString: function(n) {
                return '"' + (n + "").replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029") + '"'
            },
            objectLiteral: function(n) {
                var f = [],
                    t, r, i;
                for (t in n) n.hasOwnProperty(t) && (r = u(n[t], this), "undefined" !== r && f.push([this.quotedString(t), ":", r]));
                return i = this.generateList(f), i.prepend("{"), i.add("}"), i
            },
            generateList: function(n, t) {
                for (var r = this.empty(t), i = 0, f = n.length; f > i; i++) i && r.add(","), r.add(u(n[i], this, t));
                return r
            },
            generateArray: function(n, t) {
                var i = this.generateList(n, t);
                return i.prepend("["), i.add("]"), i
            }
        };
        t["default"] = e;
        n.exports = t["default"]
    }])
});
! function(n) {
    "use strict";
    if ("function" == typeof define && define.amd) define(["jquery", "moment"], n);
    else if ("object" == typeof exports) module.exports = n(require("jquery"), require("moment"));
    else {
        if ("undefined" == typeof jQuery) throw "bootstrap-datetimepicker requires jQuery to be loaded first";
        if ("undefined" == typeof moment) throw "bootstrap-datetimepicker requires Moment.js to be loaded first";
        n(jQuery, moment)
    }
}(function(n, t) {
    "use strict";
    if (!t) throw new Error("bootstrap-datetimepicker requires Moment.js to be loaded first");
    var i = function(i, r) {
        var e, o, s, k, y, rt, b, u = {},
            d = !0,
            l = !1,
            f = !1,
            nt = 0,
            ot = [{
                clsName: "days",
                navFnc: "M",
                navStep: 1
            }, {
                clsName: "months",
                navFnc: "y",
                navStep: 1
            }, {
                clsName: "years",
                navFnc: "y",
                navStep: 10
            }, {
                clsName: "decades",
                navFnc: "y",
                navStep: 100
            }],
            vt = ["days", "months", "years", "decades"],
            bt = ["top", "bottom", "auto"],
            kt = ["left", "right", "auto"],
            dt = ["default", "top", "bottom"],
            gt = {
                up: 38,
                38: "up",
                down: 40,
                40: "down",
                left: 37,
                37: "left",
                right: 39,
                39: "right",
                tab: 9,
                9: "tab",
                escape: 27,
                27: "escape",
                enter: 13,
                13: "enter",
                pageUp: 33,
                33: "pageUp",
                pageDown: 34,
                34: "pageDown",
                shift: 16,
                16: "shift",
                control: 17,
                17: "control",
                space: 32,
                32: "space",
                t: 84,
                84: "t",
                "delete": 46,
                46: "delete"
            },
            st = {},
            yt = function() {
                return void 0 !== t.tz && void 0 !== r.timeZone && null !== r.timeZone && "" !== r.timeZone
            },
            g = function(n) {
                var i;
                return i = void 0 === n || null === n ? t() : t.isDate(n) || t.isMoment(n) ? t(n) : yt() ? t.tz(n, rt, r.useStrict, r.timeZone) : t(n, rt, r.useStrict), yt() && i.tz(r.timeZone), i
            },
            p = function(n) {
                if ("string" != typeof n || n.length > 1) throw new TypeError("isEnabled expects a single character string parameter");
                switch (n) {
                    case "y":
                        return y.indexOf("Y") !== -1;
                    case "M":
                        return y.indexOf("M") !== -1;
                    case "d":
                        return y.toLowerCase().indexOf("d") !== -1;
                    case "h":
                    case "H":
                        return y.toLowerCase().indexOf("h") !== -1;
                    case "m":
                        return y.indexOf("m") !== -1;
                    case "s":
                        return y.indexOf("s") !== -1;
                    default:
                        return !1
                }
            },
            ht = function() {
                return p("h") || p("m") || p("s")
            },
            ct = function() {
                return p("y") || p("M") || p("d")
            },
            ei = function() {
                var t = n("<thead>").append(n("<tr>").append(n("<th>").addClass("prev").attr("data-action", "previous").append(n("<span>").addClass(r.icons.previous))).append(n("<th>").addClass("picker-switch").attr("data-action", "pickerSwitch").attr("colspan", r.calendarWeeks ? "6" : "5")).append(n("<th>").addClass("next").attr("data-action", "next").append(n("<span>").addClass(r.icons.next)))),
                    i = n("<tbody>").append(n("<tr>").append(n("<td>").attr("colspan", r.calendarWeeks ? "8" : "7")));
                return [n("<div>").addClass("datepicker-days").append(n("<table>").addClass("table-condensed").append(t).append(n("<tbody>"))), n("<div>").addClass("datepicker-months").append(n("<table>").addClass("table-condensed").append(t.clone()).append(i.clone())), n("<div>").addClass("datepicker-years").append(n("<table>").addClass("table-condensed").append(t.clone()).append(i.clone())), n("<div>").addClass("datepicker-decades").append(n("<table>").addClass("table-condensed").append(t.clone()).append(i.clone()))]
            },
            oi = function() {
                var t = n("<tr>"),
                    i = n("<tr>"),
                    u = n("<tr>");
                return p("h") && (t.append(n("<td>").append(n("<a>").attr({
                    href: "#",
                    tabindex: "-1",
                    title: r.tooltips.incrementHour
                }).addClass("btn").attr("data-action", "incrementHours").append(n("<span>").addClass(r.icons.up)))), i.append(n("<td>").append(n("<span>").addClass("timepicker-hour").attr({
                    "data-time-component": "hours",
                    title: r.tooltips.pickHour
                }).attr("data-action", "showHours"))), u.append(n("<td>").append(n("<a>").attr({
                    href: "#",
                    tabindex: "-1",
                    title: r.tooltips.decrementHour
                }).addClass("btn").attr("data-action", "decrementHours").append(n("<span>").addClass(r.icons.down))))), p("m") && (p("h") && (t.append(n("<td>").addClass("separator")), i.append(n("<td>").addClass("separator").html(":")), u.append(n("<td>").addClass("separator"))), t.append(n("<td>").append(n("<a>").attr({
                    href: "#",
                    tabindex: "-1",
                    title: r.tooltips.incrementMinute
                }).addClass("btn").attr("data-action", "incrementMinutes").append(n("<span>").addClass(r.icons.up)))), i.append(n("<td>").append(n("<span>").addClass("timepicker-minute").attr({
                    "data-time-component": "minutes",
                    title: r.tooltips.pickMinute
                }).attr("data-action", "showMinutes"))), u.append(n("<td>").append(n("<a>").attr({
                    href: "#",
                    tabindex: "-1",
                    title: r.tooltips.decrementMinute
                }).addClass("btn").attr("data-action", "decrementMinutes").append(n("<span>").addClass(r.icons.down))))), p("s") && (p("m") && (t.append(n("<td>").addClass("separator")), i.append(n("<td>").addClass("separator").html(":")), u.append(n("<td>").addClass("separator"))), t.append(n("<td>").append(n("<a>").attr({
                    href: "#",
                    tabindex: "-1",
                    title: r.tooltips.incrementSecond
                }).addClass("btn").attr("data-action", "incrementSeconds").append(n("<span>").addClass(r.icons.up)))), i.append(n("<td>").append(n("<span>").addClass("timepicker-second").attr({
                    "data-time-component": "seconds",
                    title: r.tooltips.pickSecond
                }).attr("data-action", "showSeconds"))), u.append(n("<td>").append(n("<a>").attr({
                    href: "#",
                    tabindex: "-1",
                    title: r.tooltips.decrementSecond
                }).addClass("btn").attr("data-action", "decrementSeconds").append(n("<span>").addClass(r.icons.down))))), k || (t.append(n("<td>").addClass("separator")), i.append(n("<td>").append(n("<button>").addClass("btn btn-primary").attr({
                    "data-action": "togglePeriod",
                    tabindex: "-1",
                    title: r.tooltips.togglePeriod
                }))), u.append(n("<td>").addClass("separator"))), n("<div>").addClass("timepicker-picker").append(n("<table>").addClass("table-condensed").append([t, i, u]))
            },
            si = function() {
                var i = n("<div>").addClass("timepicker-hours").append(n("<table>").addClass("table-condensed")),
                    r = n("<div>").addClass("timepicker-minutes").append(n("<table>").addClass("table-condensed")),
                    u = n("<div>").addClass("timepicker-seconds").append(n("<table>").addClass("table-condensed")),
                    t = [oi()];
                return p("h") && t.push(i), p("m") && t.push(r), p("s") && t.push(u), t
            },
            hi = function() {
                var t = [];
                return r.showTodayButton && t.push(n("<td>").append(n("<a>").attr({
                    "data-action": "today",
                    title: r.tooltips.today
                }).append(n("<span>").addClass(r.icons.today)))), !r.sideBySide && ct() && ht() && t.push(n("<td>").append(n("<a>").attr({
                    "data-action": "togglePicker",
                    title: r.tooltips.selectTime
                }).append(n("<span>").addClass(r.icons.time)))), r.showClear && t.push(n("<td>").append(n("<a>").attr({
                    "data-action": "clear",
                    title: r.tooltips.clear
                }).append(n("<span>").addClass(r.icons.clear)))), r.showClose && t.push(n("<td>").append(n("<a>").attr({
                    "data-action": "close",
                    title: r.tooltips.close
                }).append(n("<span>").addClass(r.icons.close)))), n("<table>").addClass("table-condensed").append(n("<tbody>").append(n("<tr>").append(t)))
            },
            ci = function() {
                var t = n("<div>").addClass("bootstrap-datetimepicker-widget dropdown-menu"),
                    f = n("<div>").addClass("datepicker").append(ei()),
                    e = n("<div>").addClass("timepicker").append(si()),
                    i = n("<ul>").addClass("list-unstyled"),
                    u = n("<li>").addClass("picker-switch" + (r.collapse ? " accordion-toggle" : "")).append(hi());
                return r.inline && t.removeClass("dropdown-menu"), k && t.addClass("usetwentyfour"), p("s") && !k && t.addClass("wider"), r.sideBySide && ct() && ht() ? (t.addClass("timepicker-sbs"), "top" === r.toolbarPlacement && t.append(u), t.append(n("<div>").addClass("row").append(f.addClass("col-md-6")).append(e.addClass("col-md-6"))), "bottom" === r.toolbarPlacement && t.append(u), t) : ("top" === r.toolbarPlacement && i.append(u), ct() && i.append(n("<li>").addClass(r.collapse && ht() ? "collapse in" : "").append(f)), "default" === r.toolbarPlacement && i.append(u), ht() && i.append(n("<li>").addClass(r.collapse && ct() ? "collapse" : "").append(e)), "bottom" === r.toolbarPlacement && i.append(u), t.append(i))
            },
            li = function() {
                var t, u = {};
                return t = i.is("input") || r.inline ? i.data() : i.find("input").data(), t.dateOptions && t.dateOptions instanceof Object && (u = n.extend(!0, u, t.dateOptions)), n.each(r, function(n) {
                    var i = "date" + n.charAt(0).toUpperCase() + n.slice(1);
                    void 0 !== t[i] && (u[n] = t[i])
                }), u
            },
            pt = function() {
                var t, o = (l || i).position(),
                    s = (l || i).offset(),
                    u = r.widgetPositioning.vertical,
                    e = r.widgetPositioning.horizontal;
                if (r.widgetParent) t = r.widgetParent.append(f);
                else if (i.is("input")) t = i.after(f).parent();
                else {
                    if (r.inline) return void(t = i.append(f));
                    t = i;
                    i.children().first().after(f)
                }
                if ("auto" === u && (u = s.top + 1.5 * f.height() >= n(window).height() + n(window).scrollTop() && f.height() + i.outerHeight() < s.top ? "top" : "bottom"), "auto" === e && (e = t.width() < s.left + f.outerWidth() / 2 && s.left + f.outerWidth() > n(window).width() ? "right" : "left"), "top" === u ? f.addClass("top").removeClass("bottom") : f.addClass("bottom").removeClass("top"), "right" === e ? f.addClass("pull-right") : f.removeClass("pull-right"), "static" === t.css("position") && (t = t.parents().filter(function() {
                        return "static" !== n(this).css("position")
                    }).first()), 0 === t.length) throw new Error("datetimepicker component should be placed within a non-static positioned container");
                f.css({
                    top: "top" === u ? "auto" : o.top + i.outerHeight(),
                    bottom: "top" === u ? t.outerHeight() - (t === i ? 0 : o.top) : "auto",
                    left: "left" === e ? t === i ? 0 : o.left : "auto",
                    right: "left" === e ? "auto" : t.outerWidth() - i.outerWidth() - (t === i ? 0 : o.left)
                })
            },
            it = function(n) {
                "dp.change" === n.type && (n.date && n.date.isSame(n.oldDate) || !n.date && !n.oldDate) || i.trigger(n)
            },
            ut = function(n) {
                "y" === n && (n = "YYYY");
                it({
                    type: "dp.update",
                    change: n,
                    viewDate: o.clone()
                })
            },
            ft = function(n) {
                f && (n && (b = Math.max(nt, Math.min(3, b + n))), f.find(".datepicker > div").hide().filter(".datepicker-" + ot[b].clsName).show())
            },
            ai = function() {
                var t = n("<tr>"),
                    i = o.clone().startOf("w").startOf("d");
                for (r.calendarWeeks === !0 && t.append(n("<th>").addClass("cw").text("#")); i.isBefore(o.clone().endOf("w"));) t.append(n("<th>").addClass("dow").text(i.format("dd"))), i.add(1, "d");
                f.find(".datepicker-days thead").append(t)
            },
            vi = function(n) {
                return r.disabledDates[n.format("YYYY-MM-DD")] === !0
            },
            yi = function(n) {
                return r.enabledDates[n.format("YYYY-MM-DD")] === !0
            },
            pi = function(n) {
                return r.disabledHours[n.format("H")] === !0
            },
            wi = function(n) {
                return r.enabledHours[n.format("H")] === !0
            },
            c = function(t, i) {
                if (!t.isValid() || r.disabledDates && "d" === i && vi(t) || r.enabledDates && "d" === i && !yi(t) || r.minDate && t.isBefore(r.minDate, i) || r.maxDate && t.isAfter(r.maxDate, i) || r.daysOfWeekDisabled && "d" === i && r.daysOfWeekDisabled.indexOf(t.day()) !== -1 || r.disabledHours && ("h" === i || "m" === i || "s" === i) && pi(t) || r.enabledHours && ("h" === i || "m" === i || "s" === i) && !wi(t)) return !1;
                if (r.disabledTimeIntervals && ("h" === i || "m" === i || "s" === i)) {
                    var u = !1;
                    if (n.each(r.disabledTimeIntervals, function() {
                            if (t.isBetween(this[0], this[1])) return u = !0, !1
                        }), u) return !1
                }
                return !0
            },
            bi = function() {
                for (var i = [], t = o.clone().startOf("y").startOf("d"); t.isSame(o, "y");) i.push(n("<span>").attr("data-action", "selectMonth").addClass("month").text(t.format("MMM"))), t.add(1, "M");
                f.find(".datepicker-months td").empty().append(i)
            },
            ki = function() {
                var i = f.find(".datepicker-months"),
                    t = i.find("th"),
                    u = i.find("tbody").find("span");
                t.eq(0).find("span").attr("title", r.tooltips.prevYear);
                t.eq(1).attr("title", r.tooltips.selectYear);
                t.eq(2).find("span").attr("title", r.tooltips.nextYear);
                i.find(".disabled").removeClass("disabled");
                c(o.clone().subtract(1, "y"), "y") || t.eq(0).addClass("disabled");
                t.eq(1).text(o.year());
                c(o.clone().add(1, "y"), "y") || t.eq(2).addClass("disabled");
                u.removeClass("active");
                e.isSame(o, "y") && !d && u.eq(e.month()).addClass("active");
                u.each(function(t) {
                    c(o.clone().month(t), "M") || n(this).addClass("disabled")
                })
            },
            di = function() {
                var i = f.find(".datepicker-years"),
                    t = i.find("th"),
                    n = o.clone().subtract(5, "y"),
                    u = o.clone().add(6, "y"),
                    s = "";
                for (t.eq(0).find("span").attr("title", r.tooltips.prevDecade), t.eq(1).attr("title", r.tooltips.selectDecade), t.eq(2).find("span").attr("title", r.tooltips.nextDecade), i.find(".disabled").removeClass("disabled"), r.minDate && r.minDate.isAfter(n, "y") && t.eq(0).addClass("disabled"), t.eq(1).text(n.year() + "-" + u.year()), r.maxDate && r.maxDate.isBefore(u, "y") && t.eq(2).addClass("disabled"); !n.isAfter(u, "y");) s += '<span data-action="selectYear" class="year' + (n.isSame(e, "y") && !d ? " active" : "") + (c(n, "y") ? "" : " disabled") + '">' + n.year() + "<\/span>", n.add(1, "y");
                i.find("td").html(s)
            },
            gi = function() {
                var u, s = f.find(".datepicker-decades"),
                    i = s.find("th"),
                    n = t({
                        y: o.year() - o.year() % 100 - 1
                    }),
                    h = n.clone().add(100, "y"),
                    y = n.clone(),
                    a = !1,
                    v = !1,
                    l = "";
                for (i.eq(0).find("span").attr("title", r.tooltips.prevCentury), i.eq(2).find("span").attr("title", r.tooltips.nextCentury), s.find(".disabled").removeClass("disabled"), (n.isSame(t({
                        y: 1900
                    })) || r.minDate && r.minDate.isAfter(n, "y")) && i.eq(0).addClass("disabled"), i.eq(1).text(n.year() + "-" + h.year()), (n.isSame(t({
                        y: 2e3
                    })) || r.maxDate && r.maxDate.isBefore(h, "y")) && i.eq(2).addClass("disabled"); !n.isAfter(h, "y");) u = n.year() + 12, a = r.minDate && r.minDate.isAfter(n, "y") && r.minDate.year() <= u, v = r.maxDate && r.maxDate.isAfter(n, "y") && r.maxDate.year() <= u, l += '<span data-action="selectDecade" class="decade' + (e.isAfter(n) && e.year() <= u ? " active" : "") + (c(n, "y") || a || v ? "" : " disabled") + '" data-selection="' + (n.year() + 6) + '">' + (n.year() + 1) + " - " + (n.year() + 12) + "<\/span>", n.add(12, "y");
                l += "<span><\/span><span><\/span><span><\/span>";
                s.find("td").html(l);
                i.eq(1).text(y.year() + 1 + "-" + n.year())
            },
            et = function() {
                var t, s, h, l = f.find(".datepicker-days"),
                    u = l.find("th"),
                    a = [],
                    i = [];
                if (ct()) {
                    for (u.eq(0).find("span").attr("title", r.tooltips.prevMonth), u.eq(1).attr("title", r.tooltips.selectMonth), u.eq(2).find("span").attr("title", r.tooltips.nextMonth), l.find(".disabled").removeClass("disabled"), u.eq(1).text(o.format(r.dayViewHeaderFormat)), c(o.clone().subtract(1, "M"), "M") || u.eq(0).addClass("disabled"), c(o.clone().add(1, "M"), "M") || u.eq(2).addClass("disabled"), t = o.clone().startOf("M").startOf("w").startOf("d"), h = 0; h < 42; h++) 0 === t.weekday() && (s = n("<tr>"), r.calendarWeeks && s.append('<td class="cw">' + t.week() + "<\/td>"), a.push(s)), i = ["day"], t.isBefore(o, "M") && i.push("old"), t.isAfter(o, "M") && i.push("new"), t.isSame(e, "d") && !d && i.push("active"), c(t, "d") || i.push("disabled"), t.isSame(g(), "d") && i.push("today"), 0 !== t.day() && 6 !== t.day() || i.push("weekend"), it({
                        type: "dp.classify",
                        date: t,
                        classNames: i
                    }), s.append('<td data-action="selectDay" data-day="' + t.format("L") + '" class="' + i.join(" ") + '">' + t.date() + "<\/td>"), t.add(1, "d");
                    l.find("tbody").empty().append(a);
                    ki();
                    di();
                    gi()
                }
            },
            nr = function() {
                var u = f.find(".timepicker-hours table"),
                    t = o.clone().startOf("d"),
                    r = [],
                    i = n("<tr>");
                for (o.hour() > 11 && !k && t.hour(12); t.isSame(o, "d") && (k || o.hour() < 12 && t.hour() < 12 || o.hour() > 11);) t.hour() % 4 == 0 && (i = n("<tr>"), r.push(i)), i.append('<td data-action="selectHour" class="hour' + (c(t, "h") ? "" : " disabled") + '">' + t.format(k ? "HH" : "hh") + "<\/td>"), t.add(1, "h");
                u.empty().append(r)
            },
            tr = function() {
                for (var s = f.find(".timepicker-minutes table"), t = o.clone().startOf("h"), u = [], i = n("<tr>"), e = 1 === r.stepping ? 5 : r.stepping; o.isSame(t, "h");) t.minute() % (4 * e) == 0 && (i = n("<tr>"), u.push(i)), i.append('<td data-action="selectMinute" class="minute' + (c(t, "m") ? "" : " disabled") + '">' + t.format("mm") + "<\/td>"), t.add(e, "m");
                s.empty().append(u)
            },
            ir = function() {
                for (var u = f.find(".timepicker-seconds table"), t = o.clone().startOf("m"), r = [], i = n("<tr>"); o.isSame(t, "m");) t.second() % 20 == 0 && (i = n("<tr>"), r.push(i)), i.append('<td data-action="selectSecond" class="second' + (c(t, "s") ? "" : " disabled") + '">' + t.format("ss") + "<\/td>"), t.add(5, "s");
                u.empty().append(r)
            },
            rr = function() {
                var n, i, t = f.find(".timepicker span[data-time-component]");
                k || (n = f.find(".timepicker [data-action=togglePeriod]"), i = e.clone().add(e.hours() >= 12 ? -12 : 12, "h"), n.text(e.format("A")), c(i, "h") ? n.removeClass("disabled") : n.addClass("disabled"));
                t.filter("[data-time-component=hours]").text(e.format(k ? "HH" : "hh"));
                t.filter("[data-time-component=minutes]").text(e.format("mm"));
                t.filter("[data-time-component=seconds]").text(e.format("ss"));
                nr();
                tr();
                ir()
            },
            a = function() {
                f && (et(), rr())
            },
            h = function(n) {
                var t = d ? null : e;
                if (!n) return d = !0, s.val(""), i.data("date", ""), it({
                    type: "dp.change",
                    date: !1,
                    oldDate: t
                }), void a();
                if (n = n.clone().locale(r.locale), yt() && n.tz(r.timeZone), 1 !== r.stepping)
                    for (n.minutes(Math.round(n.minutes() / r.stepping) * r.stepping).seconds(0); r.minDate && n.isBefore(r.minDate);) n.add(r.stepping, "minutes");
                c(n) ? (e = n, o = e.clone(), s.val(e.format(y)), i.data("date", e.format(y)), d = !1, a(), it({
                    type: "dp.change",
                    date: e.clone(),
                    oldDate: t
                })) : (r.keepInvalid ? it({
                    type: "dp.change",
                    date: n,
                    oldDate: t
                }) : s.val(d ? "" : e.format(y)), it({
                    type: "dp.error",
                    date: n,
                    oldDate: t
                }))
            },
            v = function() {
                var t = !1;
                return f ? (f.find(".collapse").each(function() {
                    var i = n(this).data("collapse");
                    return !i || !i.transitioning || (t = !0, !1)
                }), t ? u : (l && l.hasClass("btn") && l.toggleClass("active"), f.hide(), n(window).off("resize", pt), f.off("click", "[data-action]"), f.off("mousedown", !1), f.remove(), f = !1, it({
                    type: "dp.hide",
                    date: e.clone()
                }), s.blur(), o = e.clone(), u)) : u
            },
            ni = function() {
                h(null)
            },
            tt = function(n) {
                return void 0 === r.parseInputDate ? (!t.isMoment(n) || n instanceof Date) && (n = g(n)) : n = r.parseInputDate(n), n
            },
            lt = {
                next: function() {
                    var n = ot[b].navFnc;
                    o.add(ot[b].navStep, n);
                    et();
                    ut(n)
                },
                previous: function() {
                    var n = ot[b].navFnc;
                    o.subtract(ot[b].navStep, n);
                    et();
                    ut(n)
                },
                pickerSwitch: function() {
                    ft(1)
                },
                selectMonth: function(t) {
                    var i = n(t.target).closest("tbody").find("span").index(n(t.target));
                    o.month(i);
                    b === nt ? (h(e.clone().year(o.year()).month(o.month())), r.inline || v()) : (ft(-1), et());
                    ut("M")
                },
                selectYear: function(t) {
                    var i = parseInt(n(t.target).text(), 10) || 0;
                    o.year(i);
                    b === nt ? (h(e.clone().year(o.year())), r.inline || v()) : (ft(-1), et());
                    ut("YYYY")
                },
                selectDecade: function(t) {
                    var i = parseInt(n(t.target).data("selection"), 10) || 0;
                    o.year(i);
                    b === nt ? (h(e.clone().year(o.year())), r.inline || v()) : (ft(-1), et());
                    ut("YYYY")
                },
                selectDay: function(t) {
                    var i = o.clone();
                    n(t.target).is(".old") && i.subtract(1, "M");
                    n(t.target).is(".new") && i.add(1, "M");
                    h(i.date(parseInt(n(t.target).text(), 10)));
                    ht() || r.keepOpen || r.inline || v()
                },
                incrementHours: function() {
                    var n = e.clone().add(1, "h");
                    c(n, "h") && h(n)
                },
                incrementMinutes: function() {
                    var n = e.clone().add(r.stepping, "m");
                    c(n, "m") && h(n)
                },
                incrementSeconds: function() {
                    var n = e.clone().add(1, "s");
                    c(n, "s") && h(n)
                },
                decrementHours: function() {
                    var n = e.clone().subtract(1, "h");
                    c(n, "h") && h(n)
                },
                decrementMinutes: function() {
                    var n = e.clone().subtract(r.stepping, "m");
                    c(n, "m") && h(n)
                },
                decrementSeconds: function() {
                    var n = e.clone().subtract(1, "s");
                    c(n, "s") && h(n)
                },
                togglePeriod: function() {
                    h(e.clone().add(e.hours() >= 12 ? -12 : 12, "h"))
                },
                togglePicker: function(t) {
                    var f, u = n(t.target),
                        e = u.closest("ul"),
                        i = e.find(".in"),
                        o = e.find(".collapse:not(.in)");
                    if (i && i.length) {
                        if (f = i.data("collapse"), f && f.transitioning) return;
                        i.collapse ? (i.collapse("hide"), o.collapse("show")) : (i.removeClass("in"), o.addClass("in"));
                        u.is("span") ? u.toggleClass(r.icons.time + " " + r.icons.date) : u.find("span").toggleClass(r.icons.time + " " + r.icons.date)
                    }
                },
                showPicker: function() {
                    f.find(".timepicker > div:not(.timepicker-picker)").hide();
                    f.find(".timepicker .timepicker-picker").show()
                },
                showHours: function() {
                    f.find(".timepicker .timepicker-picker").hide();
                    f.find(".timepicker .timepicker-hours").show()
                },
                showMinutes: function() {
                    f.find(".timepicker .timepicker-picker").hide();
                    f.find(".timepicker .timepicker-minutes").show()
                },
                showSeconds: function() {
                    f.find(".timepicker .timepicker-picker").hide();
                    f.find(".timepicker .timepicker-seconds").show()
                },
                selectHour: function(t) {
                    var i = parseInt(n(t.target).text(), 10);
                    k || (e.hours() >= 12 ? 12 !== i && (i += 12) : 12 === i && (i = 0));
                    h(e.clone().hours(i));
                    lt.showPicker.call(u)
                },
                selectMinute: function(t) {
                    h(e.clone().minutes(parseInt(n(t.target).text(), 10)));
                    lt.showPicker.call(u)
                },
                selectSecond: function(t) {
                    h(e.clone().seconds(parseInt(n(t.target).text(), 10)));
                    lt.showPicker.call(u)
                },
                clear: ni,
                today: function() {
                    var n = g();
                    c(n, "d") && h(n)
                },
                close: v
            },
            ur = function(t) {
                return !n(t.currentTarget).is(".disabled") && (lt[n(t.currentTarget).data("action")].apply(u, arguments), !1)
            },
            w = function() {
                var t, i = {
                    year: function(n) {
                        return n.month(0).date(1).hours(0).seconds(0).minutes(0)
                    },
                    month: function(n) {
                        return n.date(1).hours(0).seconds(0).minutes(0)
                    },
                    day: function(n) {
                        return n.hours(0).seconds(0).minutes(0)
                    },
                    hour: function(n) {
                        return n.seconds(0).minutes(0)
                    },
                    minute: function(n) {
                        return n.seconds(0)
                    }
                };
                return s.prop("disabled") || !r.ignoreReadonly && s.prop("readonly") || f ? u : (void 0 !== s.val() && 0 !== s.val().trim().length ? h(tt(s.val().trim())) : d && r.useCurrent && (r.inline || s.is("input") && 0 === s.val().trim().length) && (t = g(), "string" == typeof r.useCurrent && (t = i[r.useCurrent](t)), h(t)), f = ci(), ai(), bi(), f.find(".timepicker-hours").hide(), f.find(".timepicker-minutes").hide(), f.find(".timepicker-seconds").hide(), a(), ft(), n(window).on("resize", pt), f.on("click", "[data-action]", ur), f.on("mousedown", !1), l && l.hasClass("btn") && l.toggleClass("active"), pt(), f.show(), r.focusOnShow && !s.is(":focus") && s.focus(), it({
                    type: "dp.show"
                }), u)
            },
            wt = function() {
                return f ? v() : w()
            },
            ti = function(n) {
                var t, e, i, o, s = null,
                    c = [],
                    l = {},
                    h = n.which,
                    a = "p";
                st[h] = a;
                for (t in st) st.hasOwnProperty(t) && st[t] === a && (c.push(t), parseInt(t, 10) !== h && (l[t] = !0));
                for (t in r.keyBinds)
                    if (r.keyBinds.hasOwnProperty(t) && "function" == typeof r.keyBinds[t] && (i = t.split(" "), i.length === c.length && gt[h] === i[i.length - 1])) {
                        for (o = !0, e = i.length - 2; e >= 0; e--)
                            if (!(gt[i[e]] in l)) {
                                o = !1;
                                break
                            }
                        if (o) {
                            s = r.keyBinds[t];
                            break
                        }
                    }
                s && (s.call(u, f), n.stopPropagation(), n.preventDefault())
            },
            ii = function(n) {
                st[n.which] = "r";
                n.stopPropagation();
                n.preventDefault()
            },
            ri = function(t) {
                var i = n(t.target).val().trim(),
                    r = i ? tt(i) : null;
                return h(r), t.stopImmediatePropagation(), !1
            },
            fr = function() {
                s.on({
                    change: ri,
                    blur: r.debug ? "" : v,
                    keydown: ti,
                    keyup: ii,
                    focus: r.allowInputToggle ? w : ""
                });
                i.is("input") ? s.on({
                    focus: w
                }) : l && (l.on("click", wt), l.on("mousedown", !1))
            },
            er = function() {
                s.off({
                    change: ri,
                    blur: blur,
                    keydown: ti,
                    keyup: ii,
                    focus: r.allowInputToggle ? v : ""
                });
                i.is("input") ? s.off({
                    focus: w
                }) : l && (l.off("click", wt), l.off("mousedown", !1))
            },
            ui = function(t) {
                var i = {};
                return n.each(t, function() {
                    var n = tt(this);
                    n.isValid() && (i[n.format("YYYY-MM-DD")] = !0)
                }), !!Object.keys(i).length && i
            },
            fi = function(t) {
                var i = {};
                return n.each(t, function() {
                    i[this] = !0
                }), !!Object.keys(i).length && i
            },
            at = function() {
                var n = r.format || "L LT";
                y = n.replace(/(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g, function(n) {
                    var t = e.localeData().longDateFormat(n) || n;
                    return t.replace(/(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g, function(n) {
                        return e.localeData().longDateFormat(n) || n
                    })
                });
                rt = r.extraFormats ? r.extraFormats.slice() : [];
                rt.indexOf(n) < 0 && rt.indexOf(y) < 0 && rt.push(y);
                k = y.toLowerCase().indexOf("a") < 1 && y.replace(/\[.*?\]/g, "").indexOf("h") < 1;
                p("y") && (nt = 2);
                p("M") && (nt = 1);
                p("d") && (nt = 0);
                b = Math.max(nt, b);
                d || h(e)
            };
        if (u.destroy = function() {
                v();
                er();
                i.removeData("DateTimePicker");
                i.removeData("date")
            }, u.toggle = wt, u.show = w, u.hide = v, u.disable = function() {
                return v(), l && l.hasClass("btn") && l.addClass("disabled"), s.prop("disabled", !0), u
            }, u.enable = function() {
                return l && l.hasClass("btn") && l.removeClass("disabled"), s.prop("disabled", !1), u
            }, u.ignoreReadonly = function(n) {
                if (0 === arguments.length) return r.ignoreReadonly;
                if ("boolean" != typeof n) throw new TypeError("ignoreReadonly () expects a boolean parameter");
                return r.ignoreReadonly = n, u
            }, u.options = function(t) {
                if (0 === arguments.length) return n.extend(!0, {}, r);
                if (!(t instanceof Object)) throw new TypeError("options() options parameter should be an object");
                return n.extend(!0, r, t), n.each(r, function(n, t) {
                    if (void 0 === u[n]) throw new TypeError("option " + n + " is not recognized!");
                    u[n](t)
                }), u
            }, u.date = function(n) {
                if (0 === arguments.length) return d ? null : e.clone();
                if (!(null === n || "string" == typeof n || t.isMoment(n) || n instanceof Date)) throw new TypeError("date() parameter must be one of [null, string, moment or Date]");
                return h(null === n ? null : tt(n)), u
            }, u.format = function(n) {
                if (0 === arguments.length) return r.format;
                if ("string" != typeof n && ("boolean" != typeof n || n !== !1)) throw new TypeError("format() expects a string or boolean:false parameter " + n);
                return r.format = n, y && at(), u
            }, u.timeZone = function(n) {
                if (0 === arguments.length) return r.timeZone;
                if ("string" != typeof n) throw new TypeError("newZone() expects a string parameter");
                return r.timeZone = n, u
            }, u.dayViewHeaderFormat = function(n) {
                if (0 === arguments.length) return r.dayViewHeaderFormat;
                if ("string" != typeof n) throw new TypeError("dayViewHeaderFormat() expects a string parameter");
                return r.dayViewHeaderFormat = n, u
            }, u.extraFormats = function(n) {
                if (0 === arguments.length) return r.extraFormats;
                if (n !== !1 && !(n instanceof Array)) throw new TypeError("extraFormats() expects an array or false parameter");
                return r.extraFormats = n, rt && at(), u
            }, u.disabledDates = function(t) {
                if (0 === arguments.length) return r.disabledDates ? n.extend({}, r.disabledDates) : r.disabledDates;
                if (!t) return r.disabledDates = !1, a(), u;
                if (!(t instanceof Array)) throw new TypeError("disabledDates() expects an array parameter");
                return r.disabledDates = ui(t), r.enabledDates = !1, a(), u
            }, u.enabledDates = function(t) {
                if (0 === arguments.length) return r.enabledDates ? n.extend({}, r.enabledDates) : r.enabledDates;
                if (!t) return r.enabledDates = !1, a(), u;
                if (!(t instanceof Array)) throw new TypeError("enabledDates() expects an array parameter");
                return r.enabledDates = ui(t), r.disabledDates = !1, a(), u
            }, u.daysOfWeekDisabled = function(n) {
                if (0 === arguments.length) return r.daysOfWeekDisabled.splice(0);
                if ("boolean" == typeof n && !n) return r.daysOfWeekDisabled = !1, a(), u;
                if (!(n instanceof Array)) throw new TypeError("daysOfWeekDisabled() expects an array parameter");
                if (r.daysOfWeekDisabled = n.reduce(function(n, t) {
                        return t = parseInt(t, 10), t > 6 || t < 0 || isNaN(t) ? n : (n.indexOf(t) === -1 && n.push(t), n)
                    }, []).sort(), r.useCurrent && !r.keepInvalid) {
                    for (var t = 0; !c(e, "d");) {
                        if (e.add(1, "d"), 31 === t) throw "Tried 31 times to find a valid date";
                        t++
                    }
                    h(e)
                }
                return a(), u
            }, u.maxDate = function(n) {
                if (0 === arguments.length) return r.maxDate ? r.maxDate.clone() : r.maxDate;
                if ("boolean" == typeof n && n === !1) return r.maxDate = !1, a(), u;
                "string" == typeof n && ("now" !== n && "moment" !== n || (n = g()));
                var t = tt(n);
                if (!t.isValid()) throw new TypeError("maxDate() Could not parse date parameter: " + n);
                if (r.minDate && t.isBefore(r.minDate)) throw new TypeError("maxDate() date parameter is before options.minDate: " + t.format(y));
                return r.maxDate = t, r.useCurrent && !r.keepInvalid && e.isAfter(n) && h(r.maxDate), o.isAfter(t) && (o = t.clone().subtract(r.stepping, "m")), a(), u
            }, u.minDate = function(n) {
                if (0 === arguments.length) return r.minDate ? r.minDate.clone() : r.minDate;
                if ("boolean" == typeof n && n === !1) return r.minDate = !1, a(), u;
                "string" == typeof n && ("now" !== n && "moment" !== n || (n = g()));
                var t = tt(n);
                if (!t.isValid()) throw new TypeError("minDate() Could not parse date parameter: " + n);
                if (r.maxDate && t.isAfter(r.maxDate)) throw new TypeError("minDate() date parameter is after options.maxDate: " + t.format(y));
                return r.minDate = t, r.useCurrent && !r.keepInvalid && e.isBefore(n) && h(r.minDate), o.isBefore(t) && (o = t.clone().add(r.stepping, "m")), a(), u
            }, u.defaultDate = function(n) {
                if (0 === arguments.length) return r.defaultDate ? r.defaultDate.clone() : r.defaultDate;
                if (!n) return r.defaultDate = !1, u;
                "string" == typeof n && (n = "now" === n || "moment" === n ? g() : g(n));
                var t = tt(n);
                if (!t.isValid()) throw new TypeError("defaultDate() Could not parse date parameter: " + n);
                if (!c(t)) throw new TypeError("defaultDate() date passed is invalid according to component setup validations");
                return r.defaultDate = t, (r.defaultDate && r.inline || "" === s.val().trim()) && h(r.defaultDate), u
            }, u.locale = function(n) {
                if (0 === arguments.length) return r.locale;
                if (!t.localeData(n)) throw new TypeError("locale() locale " + n + " is not loaded from moment locales!");
                return r.locale = n, e.locale(r.locale), o.locale(r.locale), y && at(), f && (v(), w()), u
            }, u.stepping = function(n) {
                return 0 === arguments.length ? r.stepping : (n = parseInt(n, 10), (isNaN(n) || n < 1) && (n = 1), r.stepping = n, u)
            }, u.useCurrent = function(n) {
                var t = ["year", "month", "day", "hour", "minute"];
                if (0 === arguments.length) return r.useCurrent;
                if ("boolean" != typeof n && "string" != typeof n) throw new TypeError("useCurrent() expects a boolean or string parameter");
                if ("string" == typeof n && t.indexOf(n.toLowerCase()) === -1) throw new TypeError("useCurrent() expects a string parameter of " + t.join(", "));
                return r.useCurrent = n, u
            }, u.collapse = function(n) {
                if (0 === arguments.length) return r.collapse;
                if ("boolean" != typeof n) throw new TypeError("collapse() expects a boolean parameter");
                return r.collapse === n ? u : (r.collapse = n, f && (v(), w()), u)
            }, u.icons = function(t) {
                if (0 === arguments.length) return n.extend({}, r.icons);
                if (!(t instanceof Object)) throw new TypeError("icons() expects parameter to be an Object");
                return n.extend(r.icons, t), f && (v(), w()), u
            }, u.tooltips = function(t) {
                if (0 === arguments.length) return n.extend({}, r.tooltips);
                if (!(t instanceof Object)) throw new TypeError("tooltips() expects parameter to be an Object");
                return n.extend(r.tooltips, t), f && (v(), w()), u
            }, u.useStrict = function(n) {
                if (0 === arguments.length) return r.useStrict;
                if ("boolean" != typeof n) throw new TypeError("useStrict() expects a boolean parameter");
                return r.useStrict = n, u
            }, u.sideBySide = function(n) {
                if (0 === arguments.length) return r.sideBySide;
                if ("boolean" != typeof n) throw new TypeError("sideBySide() expects a boolean parameter");
                return r.sideBySide = n, f && (v(), w()), u
            }, u.viewMode = function(n) {
                if (0 === arguments.length) return r.viewMode;
                if ("string" != typeof n) throw new TypeError("viewMode() expects a string parameter");
                if (vt.indexOf(n) === -1) throw new TypeError("viewMode() parameter must be one of (" + vt.join(", ") + ") value");
                return r.viewMode = n, b = Math.max(vt.indexOf(n), nt), ft(), u
            }, u.toolbarPlacement = function(n) {
                if (0 === arguments.length) return r.toolbarPlacement;
                if ("string" != typeof n) throw new TypeError("toolbarPlacement() expects a string parameter");
                if (dt.indexOf(n) === -1) throw new TypeError("toolbarPlacement() parameter must be one of (" + dt.join(", ") + ") value");
                return r.toolbarPlacement = n, f && (v(), w()), u
            }, u.widgetPositioning = function(t) {
                if (0 === arguments.length) return n.extend({}, r.widgetPositioning);
                if ("[object Object]" !== {}.toString.call(t)) throw new TypeError("widgetPositioning() expects an object variable");
                if (t.horizontal) {
                    if ("string" != typeof t.horizontal) throw new TypeError("widgetPositioning() horizontal variable must be a string");
                    if (t.horizontal = t.horizontal.toLowerCase(), kt.indexOf(t.horizontal) === -1) throw new TypeError("widgetPositioning() expects horizontal parameter to be one of (" + kt.join(", ") + ")");
                    r.widgetPositioning.horizontal = t.horizontal
                }
                if (t.vertical) {
                    if ("string" != typeof t.vertical) throw new TypeError("widgetPositioning() vertical variable must be a string");
                    if (t.vertical = t.vertical.toLowerCase(), bt.indexOf(t.vertical) === -1) throw new TypeError("widgetPositioning() expects vertical parameter to be one of (" + bt.join(", ") + ")");
                    r.widgetPositioning.vertical = t.vertical
                }
                return a(), u
            }, u.calendarWeeks = function(n) {
                if (0 === arguments.length) return r.calendarWeeks;
                if ("boolean" != typeof n) throw new TypeError("calendarWeeks() expects parameter to be a boolean value");
                return r.calendarWeeks = n, a(), u
            }, u.showTodayButton = function(n) {
                if (0 === arguments.length) return r.showTodayButton;
                if ("boolean" != typeof n) throw new TypeError("showTodayButton() expects a boolean parameter");
                return r.showTodayButton = n, f && (v(), w()), u
            }, u.showClear = function(n) {
                if (0 === arguments.length) return r.showClear;
                if ("boolean" != typeof n) throw new TypeError("showClear() expects a boolean parameter");
                return r.showClear = n, f && (v(), w()), u
            }, u.widgetParent = function(t) {
                if (0 === arguments.length) return r.widgetParent;
                if ("string" == typeof t && (t = n(t)), null !== t && "string" != typeof t && !(t instanceof n)) throw new TypeError("widgetParent() expects a string or a jQuery object parameter");
                return r.widgetParent = t, f && (v(), w()), u
            }, u.keepOpen = function(n) {
                if (0 === arguments.length) return r.keepOpen;
                if ("boolean" != typeof n) throw new TypeError("keepOpen() expects a boolean parameter");
                return r.keepOpen = n, u
            }, u.focusOnShow = function(n) {
                if (0 === arguments.length) return r.focusOnShow;
                if ("boolean" != typeof n) throw new TypeError("focusOnShow() expects a boolean parameter");
                return r.focusOnShow = n, u
            }, u.inline = function(n) {
                if (0 === arguments.length) return r.inline;
                if ("boolean" != typeof n) throw new TypeError("inline() expects a boolean parameter");
                return r.inline = n, u
            }, u.clear = function() {
                return ni(), u
            }, u.keyBinds = function(n) {
                return 0 === arguments.length ? r.keyBinds : (r.keyBinds = n, u)
            }, u.getMoment = function(n) {
                return g(n)
            }, u.debug = function(n) {
                if ("boolean" != typeof n) throw new TypeError("debug() expects a boolean parameter");
                return r.debug = n, u
            }, u.allowInputToggle = function(n) {
                if (0 === arguments.length) return r.allowInputToggle;
                if ("boolean" != typeof n) throw new TypeError("allowInputToggle() expects a boolean parameter");
                return r.allowInputToggle = n, u
            }, u.showClose = function(n) {
                if (0 === arguments.length) return r.showClose;
                if ("boolean" != typeof n) throw new TypeError("showClose() expects a boolean parameter");
                return r.showClose = n, u
            }, u.keepInvalid = function(n) {
                if (0 === arguments.length) return r.keepInvalid;
                if ("boolean" != typeof n) throw new TypeError("keepInvalid() expects a boolean parameter");
                return r.keepInvalid = n, u
            }, u.datepickerInput = function(n) {
                if (0 === arguments.length) return r.datepickerInput;
                if ("string" != typeof n) throw new TypeError("datepickerInput() expects a string parameter");
                return r.datepickerInput = n, u
            }, u.parseInputDate = function(n) {
                if (0 === arguments.length) return r.parseInputDate;
                if ("function" != typeof n) throw new TypeError("parseInputDate() sholud be as function");
                return r.parseInputDate = n, u
            }, u.disabledTimeIntervals = function(t) {
                if (0 === arguments.length) return r.disabledTimeIntervals ? n.extend({}, r.disabledTimeIntervals) : r.disabledTimeIntervals;
                if (!t) return r.disabledTimeIntervals = !1, a(), u;
                if (!(t instanceof Array)) throw new TypeError("disabledTimeIntervals() expects an array parameter");
                return r.disabledTimeIntervals = t, a(), u
            }, u.disabledHours = function(t) {
                if (0 === arguments.length) return r.disabledHours ? n.extend({}, r.disabledHours) : r.disabledHours;
                if (!t) return r.disabledHours = !1, a(), u;
                if (!(t instanceof Array)) throw new TypeError("disabledHours() expects an array parameter");
                if (r.disabledHours = fi(t), r.enabledHours = !1, r.useCurrent && !r.keepInvalid) {
                    for (var i = 0; !c(e, "h");) {
                        if (e.add(1, "h"), 24 === i) throw "Tried 24 times to find a valid date";
                        i++
                    }
                    h(e)
                }
                return a(), u
            }, u.enabledHours = function(t) {
                if (0 === arguments.length) return r.enabledHours ? n.extend({}, r.enabledHours) : r.enabledHours;
                if (!t) return r.enabledHours = !1, a(), u;
                if (!(t instanceof Array)) throw new TypeError("enabledHours() expects an array parameter");
                if (r.enabledHours = fi(t), r.disabledHours = !1, r.useCurrent && !r.keepInvalid) {
                    for (var i = 0; !c(e, "h");) {
                        if (e.add(1, "h"), 24 === i) throw "Tried 24 times to find a valid date";
                        i++
                    }
                    h(e)
                }
                return a(), u
            }, u.viewDate = function(n) {
                if (0 === arguments.length) return o.clone();
                if (!n) return o = e.clone(), u;
                if (!("string" == typeof n || t.isMoment(n) || n instanceof Date)) throw new TypeError("viewDate() parameter must be one of [string, moment or Date]");
                return o = tt(n), ut(), u
            }, i.is("input")) s = i;
        else if (s = i.find(r.datepickerInput), 0 === s.length) s = i.find("input");
        else if (!s.is("input")) throw new Error('CSS class "' + r.datepickerInput + '" cannot be applied to non input element');
        if (i.hasClass("input-group") && (l = 0 === i.find(".datepickerbutton").length ? i.find(".input-group-addon") : i.find(".datepickerbutton")), !r.inline && !s.is("input")) throw new Error("Could not initialize DateTimePicker without an input element");
        return e = g(), o = e.clone(), n.extend(!0, r, li()), u.options(r), at(), fr(), s.prop("disabled") && u.disable(), s.is("input") && 0 !== s.val().trim().length ? h(tt(s.val().trim())) : r.defaultDate && void 0 === s.attr("placeholder") && h(r.defaultDate), r.inline && w(), u
    };
    return n.fn.datetimepicker = function(t) {
        t = t || {};
        var r, f = Array.prototype.slice.call(arguments, 1),
            u = !0;
        if ("object" == typeof t) return this.each(function() {
            var u, r = n(this);
            r.data("DateTimePicker") || (u = n.extend(!0, {}, n.fn.datetimepicker.defaults, t), r.data("DateTimePicker", i(r, u)))
        });
        if ("string" == typeof t) return this.each(function() {
            var e = n(this),
                i = e.data("DateTimePicker");
            if (!i) throw new Error('bootstrap-datetimepicker("' + t + '") method was called on an element that is not using DateTimePicker');
            r = i[t].apply(i, f);
            u = r === i
        }), u || n.inArray(t, ["destroy", "hide", "show", "toggle"]) > -1 ? this : r;
        throw new TypeError("Invalid arguments for DateTimePicker: " + t);
    }, n.fn.datetimepicker.defaults = {
        timeZone: "",
        format: !1,
        dayViewHeaderFormat: "MMMM YYYY",
        extraFormats: !1,
        stepping: 1,
        minDate: !1,
        maxDate: !1,
        useCurrent: !0,
        collapse: !0,
        locale: t.locale(),
        defaultDate: !1,
        disabledDates: !1,
        enabledDates: !1,
        icons: {
            time: "glyphicon glyphicon-time",
            date: "glyphicon glyphicon-calendar",
            up: "glyphicon glyphicon-chevron-up",
            down: "glyphicon glyphicon-chevron-down",
            previous: "glyphicon glyphicon-chevron-left",
            next: "glyphicon glyphicon-chevron-right",
            today: "glyphicon glyphicon-screenshot",
            clear: "glyphicon glyphicon-trash",
            close: "glyphicon glyphicon-remove"
        },
        tooltips: {
            today: "Go to today",
            clear: "Clear selection",
            close: "Close the picker",
            selectMonth: "Select Month",
            prevMonth: "Previous Month",
            nextMonth: "Next Month",
            selectYear: "Select Year",
            prevYear: "Previous Year",
            nextYear: "Next Year",
            selectDecade: "Select Decade",
            prevDecade: "Previous Decade",
            nextDecade: "Next Decade",
            prevCentury: "Previous Century",
            nextCentury: "Next Century",
            pickHour: "Pick Hour",
            incrementHour: "Increment Hour",
            decrementHour: "Decrement Hour",
            pickMinute: "Pick Minute",
            incrementMinute: "Increment Minute",
            decrementMinute: "Decrement Minute",
            pickSecond: "Pick Second",
            incrementSecond: "Increment Second",
            decrementSecond: "Decrement Second",
            togglePeriod: "Toggle Period",
            selectTime: "Select Time"
        },
        useStrict: !1,
        sideBySide: !1,
        daysOfWeekDisabled: !1,
        calendarWeeks: !1,
        viewMode: "days",
        toolbarPlacement: "default",
        showTodayButton: !1,
        showClear: !1,
        showClose: !1,
        widgetPositioning: {
            horizontal: "auto",
            vertical: "auto"
        },
        widgetParent: null,
        ignoreReadonly: !1,
        keepOpen: !1,
        focusOnShow: !0,
        inline: !1,
        keepInvalid: !1,
        datepickerInput: ".datepickerinput",
        keyBinds: {
            up: function(n) {
                if (n) {
                    var t = this.date() || this.getMoment();
                    n.find(".datepicker").is(":visible") ? this.date(t.clone().subtract(7, "d")) : this.date(t.clone().add(this.stepping(), "m"))
                }
            },
            down: function(n) {
                if (!n) return void this.show();
                var t = this.date() || this.getMoment();
                n.find(".datepicker").is(":visible") ? this.date(t.clone().add(7, "d")) : this.date(t.clone().subtract(this.stepping(), "m"))
            },
            "control up": function(n) {
                if (n) {
                    var t = this.date() || this.getMoment();
                    n.find(".datepicker").is(":visible") ? this.date(t.clone().subtract(1, "y")) : this.date(t.clone().add(1, "h"))
                }
            },
            "control down": function(n) {
                if (n) {
                    var t = this.date() || this.getMoment();
                    n.find(".datepicker").is(":visible") ? this.date(t.clone().add(1, "y")) : this.date(t.clone().subtract(1, "h"))
                }
            },
            left: function(n) {
                if (n) {
                    var t = this.date() || this.getMoment();
                    n.find(".datepicker").is(":visible") && this.date(t.clone().subtract(1, "d"))
                }
            },
            right: function(n) {
                if (n) {
                    var t = this.date() || this.getMoment();
                    n.find(".datepicker").is(":visible") && this.date(t.clone().add(1, "d"))
                }
            },
            pageUp: function(n) {
                if (n) {
                    var t = this.date() || this.getMoment();
                    n.find(".datepicker").is(":visible") && this.date(t.clone().subtract(1, "M"))
                }
            },
            pageDown: function(n) {
                if (n) {
                    var t = this.date() || this.getMoment();
                    n.find(".datepicker").is(":visible") && this.date(t.clone().add(1, "M"))
                }
            },
            enter: function() {
                this.hide()
            },
            escape: function() {
                this.hide()
            },
            "control space": function(n) {
                n && n.find(".timepicker").is(":visible") && n.find('.btn[data-action="togglePeriod"]').click()
            },
            t: function() {
                this.date(this.getMoment())
            },
            "delete": function() {
                this.clear()
            }
        },
        debug: !1,
        allowInputToggle: !1,
        disabledTimeIntervals: !1,
        disabledHours: !1,
        enabledHours: !1,
        viewDate: !1
    }, n.fn.datetimepicker
})